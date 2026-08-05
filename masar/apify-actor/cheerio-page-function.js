// Page function for Apify's stock `apify/cheerio-scraper` Actor.
//
// JS port of src/extract.py so the scrape can run on Apify WITHOUT deploying
// our custom Actor — paste this into Cheerio Scraper's "Page function" field
// (or generate the whole run input with make-cheerio-input.py). Keep in sync
// with src/extract.py: the COLUMNS contract is what ties the dataset to
// spreadsheet-to-batch.py → merge-catalogue.py.
async function pageFunction(context) {
    const { $, request } = context;

    const COLUMNS = [
        'source_url', 'school', 'school_city', 'school_country',
        'title', 'title_ar', 'summary', 'summary_ar',
        'subject', 'format', 'start', 'days', 'price', 'currency', 'langs',
        'audience', 'audience_ar', 'highlights', 'highlights_ar',
        'rating', 'reviews', 'scraped_at',
    ];
    const COURSE_TYPES = ['course', 'courseinstance', 'event', 'educationevent', 'product'];

    const text = (v) => {
        if (v == null) return '';
        if (Array.isArray(v)) return v.filter(Boolean).map(text).join(' | ');
        if (typeof v === 'object') return text(v.name || v['@value'] || '');
        return String(v).replace(/\s+/g, ' ').trim();
    };
    const first = (node, ...keys) => {
        for (const k of keys) {
            if (node && typeof node === 'object' && node[k]) return node[k];
        }
        return null;
    };
    // JSON-LD freely wraps single values in lists; unwrap to the first.
    const one = (v) => (Array.isArray(v) ? (v[0] || {}) : (v || {}));

    const nodes = [];
    $('script[type="application/ld+json"]').each((i, el) => {
        const raw = ($(el).html() || '').trim();
        if (!raw) return;
        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            try { // several objects back to back
                data = JSON.parse('[' + raw.replace(/}\s*{/g, '},{') + ']');
            } catch (e2) { return; }
        }
        for (const n of Array.isArray(data) ? data : [data]) {
            if (!n || typeof n !== 'object') continue;
            if (Array.isArray(n['@graph'])) {
                nodes.push(...n['@graph'].filter((x) => x && typeof x === 'object'));
            } else {
                nodes.push(n);
            }
        }
    });

    const isCourse = (n) => {
        const t = n['@type'] || '';
        return (Array.isArray(t) ? t : [t])
            .some((x) => COURSE_TYPES.includes(String(x).toLowerCase()));
    };

    const row = {};
    for (const c of COLUMNS) row[c] = '';
    row.source_url = request.url;
    row.scraped_at = new Date().toISOString();

    const node = nodes.find(isCourse);
    if (node) {
        row.title = text(first(node, 'name', 'headline'));
        row.summary = text(first(node, 'description', 'abstract'));

        const provider = one(first(node, 'provider', 'organizer', 'brand', 'publisher'));
        if (provider && typeof provider === 'object') {
            row.school = text(provider.name);
            const addr = provider.address || {};
            if (addr && typeof addr === 'object') {
                row.school_city = text(addr.addressLocality);
                row.school_country = text(addr.addressCountry);
            }
        }

        const offers = one(first(node, 'offers'));
        if (offers && typeof offers === 'object') {
            row.price = text(first(offers, 'price', 'lowPrice'));
            row.currency = text(offers.priceCurrency);
        }

        const instance = one(first(node, 'hasCourseInstance'));
        const source = (instance && typeof instance === 'object'
            && Object.keys(instance).length) ? instance : node;
        // Sites split these fields between the Course node and its
        // CourseInstance inconsistently; check the instance first, then
        // fall back to the node.
        const pick = (...keys) => text(first(source, ...keys) || first(node, ...keys));

        const start = pick('startDate', 'courseSchedule');
        row.start = /^\d{4}-\d{2}-\d{2}/.test(start) ? start.slice(0, 10) : start;
        row.format = pick('courseMode', 'eventAttendanceMode');
        row.langs = pick('inLanguage', 'availableLanguage');
        row.days = pick('timeRequired', 'duration');

        const rating = first(node, 'aggregateRating') || {};
        if (rating && typeof rating === 'object') {
            row.rating = text(rating.ratingValue);
            row.reviews = text(first(rating, 'reviewCount', 'ratingCount'));
        }

        const location = one(first(source, 'location'));
        if (location && typeof location === 'object' && !row.school_city) {
            const addr = location.address || {};
            if (addr && typeof addr === 'object') {
                row.school_city = text(addr.addressLocality);
                row.school_country = text(addr.addressCountry);
            }
        }

        if (row.title) return { ...row, extraction: 'json-ld' };
    }

    // Metadata fallback — low confidence: a page whose only signal is
    // og:title is probably not a course page; downstream filters on
    // `extraction`, so keep the row but label it.
    const meta = (...names) => {
        for (const name of names) {
            const v = $('meta[property="' + name + '"]').attr('content')
                || $('meta[name="' + name + '"]').attr('content');
            if (v && v.trim()) return v.trim();
        }
        return '';
    };
    const title = meta('og:title', 'twitter:title') || $('title').first().text().trim();
    if (!title) return null;
    row.title = title;
    row.summary = meta('og:description', 'description');
    row.school = meta('og:site_name');
    return { ...row, extraction: 'meta' };
}
