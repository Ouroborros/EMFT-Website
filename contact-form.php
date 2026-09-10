<?php
/**
 * EMFT — enquiry form handler.
 *
 * Receives the JSON that js/site.js POSTs from contact.html and emails it to
 * the general inbox. Nothing is stored. Runs only on the production host
 * (the GitHub Pages preview excludes it, and the form falls back to a
 * pre-filled mail there).
 *
 * Safeguards, in order: POST only; same-site origin; honeypot; per-address
 * rate limit; size and field caps; header-injection stripping; the visitor's
 * text is sent as plain text, never as HTML or as the envelope sender.
 */

declare(strict_types=1);

const INBOX      = 'info@emergingmarketft.com';
const SENDER     = 'website@emergingmarketft.com'; // must be a mailbox or alias on the domain so SPF/DKIM align
const SITE_HOSTS = ['www.emergingmarketft.com', 'emergingmarketft.com'];
const MAX_BODY   = 16384;   // bytes
const RATE_MAX   = 5;       // submissions ...
const RATE_WIN   = 600;     // ... per this many seconds, per address

const FIELDS = [
    // name             => [required, max length]
    'name'             => [true,  120],
    'job_title'        => [false, 120],
    'organization'     => [true,  160],
    'work_email'       => [true,  254],
    'telephone'        => [false, 40],
    'country'          => [false, 80],
    'area_of_interest' => [true,  120],
    'participants'     => [false, 40],
    'delivery_period'  => [false, 40],
    'message'          => [false, 4000],
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, bool $ok, string $reason = ''): never
{
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'reason' => $reason]);
    exit;
}

function same_site(): bool
{
    foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $key) {
        if (!empty($_SERVER[$key])) {
            $host = strtolower((string) parse_url($_SERVER[$key], PHP_URL_HOST));
            return in_array($host, SITE_HOSTS, true);
        }
    }
    return false; // browsers always send one of the two on a fetch POST
}

function rate_limited(): bool
{
    $addr = $_SERVER['REMOTE_ADDR'] ?? '';
    if ($addr === '') {
        return false;
    }
    $file = sys_get_temp_dir() . '/emft-enquiry-' . hash('sha256', $addr);
    $now  = time();
    $hits = [];
    if (is_file($file)) {
        $hits = array_filter(
            array_map('intval', file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: []),
            static fn (int $t): bool => $t > $now - RATE_WIN
        );
    }
    if (count($hits) >= RATE_MAX) {
        return true;
    }
    $hits[] = $now;
    @file_put_contents($file, implode("\n", $hits) . "\n", LOCK_EX);
    return false;
}

/** One line of header-safe text: no CR/LF, no control characters, trimmed. */
function line(string $s, int $max): string
{
    $s = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

/** Multi-line body text: keeps newlines, drops other control characters. */
function block(string $s, int $max): string
{
    $s = str_replace(["\r\n", "\r"], "\n", $s);
    $s = preg_replace('/[^\P{C}\n]+/u', ' ', $s) ?? '';
    return mb_substr(trim($s), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, false, 'method');
}
if (!same_site()) {
    reply(403, false, 'origin');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY) {
    reply(413, false, 'size');
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if ($raw === false || strlen($raw) > MAX_BODY) {
    reply(413, false, 'size');
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    reply(400, false, 'json');
}

// A real person never fills a field they cannot see.
if (!empty($data['company_website'])) {
    reply(200, true); // tell the bot it worked, send nothing
}
if (rate_limited()) {
    reply(429, false, 'rate');
}

$clean = [];
foreach (FIELDS as $key => [$required, $max]) {
    $value = $data[$key] ?? '';
    if (!is_string($value)) {
        $value = '';
    }
    $value = $key === 'message' ? block($value, $max) : line($value, $max);
    if ($required && $value === '') {
        reply(422, false, 'required:' . $key);
    }
    $clean[$key] = $value;
}
if (!filter_var($clean['work_email'], FILTER_VALIDATE_EMAIL)) {
    reply(422, false, 'email');
}
$replyTo = $clean['work_email'];

$labels = [
    'name'             => 'Name',
    'job_title'        => 'Job title',
    'organization'     => 'Organization',
    'work_email'       => 'Work email',
    'telephone'        => 'Telephone',
    'country'          => 'Country',
    'area_of_interest' => 'Area of interest',
    'participants'     => 'Participants',
    'delivery_period'  => 'Delivery period',
];
$lines = ["New enquiry from the EMFT website", ""];
foreach ($labels as $key => $label) {
    if ($clean[$key] !== '') {
        $lines[] = str_pad($label . ':', 18) . $clean[$key];
    }
}
$lines[] = "";
$lines[] = "Message:";
$lines[] = $clean['message'] !== '' ? $clean['message'] : '(none)';
$lines[] = "";
$lines[] = "Sent " . gmdate('Y-m-d H:i') . " UTC from " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$subject = 'Enquiry — ' . ($clean['organization'] !== '' ? $clean['organization'] : $clean['name']);
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$fromName = '=?UTF-8?B?' . base64_encode('EMFT website') . '?=';

$headers = [
    'From: ' . $fromName . ' <' . SENDER . '>',
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: EMFT-site',
];

$sent = @mail(INBOX, $subject, implode("\n", $lines), implode("\r\n", $headers), '-f' . SENDER);
if (!$sent) {
    error_log('EMFT enquiry: mail() failed for ' . $replyTo);
    reply(502, false, 'mail');
}
reply(200, true);
