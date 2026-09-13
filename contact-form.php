<?php
/**
 * EMFT — enquiry form handler.
 *
 * Receives the JSON that js/site.js POSTs from contact.html and emails it to
 * the general inbox. Nothing is stored. Runs only on the production host
 * (the GitHub Pages preview excludes it, and the form falls back to a
 * pre-filled mail there).
 *
 * Safeguards, in order: POST only; same-site origin; honeypot; a per-address
 * limit on mail actually sent; size and field caps; header-injection stripping;
 * the visitor's text is sent as plain text, never as HTML or as the envelope
 * sender. The visitor's IP address is never written into the mail.
 */

declare(strict_types=1);

// The answer must be JSON and nothing else. A notice printed ahead of it would
// make the browser fall back to the mail client for an enquiry we had already
// sent, so warnings go to the log instead of the response body.
ini_set('display_errors', '0');
ini_set('html_errors', '0');

const INBOX      = 'info@emergingmarketft.com';
// The envelope and From address. It must be a real mailbox on the domain so
// SPF and DKIM line up and the mail is not treated as a forgery; info@ is one,
// so the enquiry arrives from the inbox it lands in. Reply-To carries the
// visitor's address, so Reply goes to them and not back to ourselves.
const SENDER     = 'info@emergingmarketft.com';
const SITE_HOSTS = ['www.emergingmarketft.com', 'emergingmarketft.com'];
const MAX_BODY   = 16384;   // bytes
const RATE_MAX   = 5;       // enquiries delivered ...
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

/**
 * The rate limit counts mail we actually sent, not attempts. A visitor who
 * mistypes their address several times must not lock themselves out of the
 * form, and a bot posting rubbish sends nothing to count. Only the one-way
 * fingerprint of the address is written, and only recent sends are kept.
 */
function rate_file(): string
{
    $addr = $_SERVER['REMOTE_ADDR'] ?? '';
    return $addr === '' ? '' : sys_get_temp_dir() . '/emft-enquiry-' . hash('sha256', $addr);
}

/** @return int[] recent sends from this address, expired entries dropped */
function rate_hits(string $file): array
{
    if ($file === '' || !is_file($file)) {
        return [];
    }
    $now  = time();
    $hits = array_values(array_filter(
        array_map('intval', file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: []),
        static fn (int $t): bool => $t > $now - RATE_WIN
    ));
    if (!$hits) {
        @unlink($file); // nothing recent left, so keep nothing
    }
    return $hits;
}

/** @param int[] $hits */
function rate_record(string $file, array $hits): void
{
    if ($file === '') {
        return;
    }
    $hits[] = time();
    @file_put_contents($file, implode("\n", $hits) . "\n", LOCK_EX);
}

/**
 * An RFC 2047 encoded-word may not exceed 75 characters, so a long subject has
 * to be split across several of them folded onto continuation lines. Chunks are
 * cut on character boundaries, so no multibyte sequence is broken in half and
 * no Arabic letter arrives as mojibake.
 */
function encode_header(string $text): string
{
    $chars = preg_split('//u', $text, -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $chunks = [];
    $current = '';
    foreach ($chars as $char) {
        // 45 octets encode to 60 base64 characters, which leaves room for the
        // =?UTF-8?B? prefix and the ?= suffix inside the 75-character limit.
        if (strlen($current) + strlen($char) > 45) {
            $chunks[] = $current;
            $current = '';
        }
        $current .= $char;
    }
    if ($current !== '') {
        $chunks[] = $current;
    }
    if (!$chunks) {
        $chunks = [''];
    }
    return implode("\r\n ", array_map(
        static fn (string $c): string => '=?UTF-8?B?' . base64_encode($c) . '?=',
        $chunks
    ));
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
$rateFile = rate_file();
$rateHits = rate_hits($rateFile);
if (count($rateHits) >= RATE_MAX) {
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
// A pasted paragraph can run to thousands of characters without a newline,
// and a body line over 998 octets is beyond what SMTP guarantees to carry.
$lines[] = $clean['message'] !== '' ? wordwrap($clean['message'], 76, "\n", true) : '(none)';
$lines[] = "";
$lines[] = "Sent " . gmdate('Y-m-d H:i') . " UTC from the website contact form.";

$subject  = encode_header('Enquiry — ' . ($clean['organization'] !== '' ? $clean['organization'] : $clean['name']));
$fromName = encode_header('EMFT website');

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
rate_record($rateFile, $rateHits);
reply(200, true);
