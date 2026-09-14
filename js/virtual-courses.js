/* EMFT — the schedule on virtual-courses.html.
 *
 * scripts/build-virtual-courses.py writes the same rows into the page as plain
 * HTML, so the schedule is there without JavaScript and search engines can read
 * it. This file replaces those rows with ones built in the reader's language,
 * and rebuilds them again whenever the language changes.
 *
 * Rows are assembled with createElement and textContent. Nothing here writes
 * markup from data, so a course name cannot turn into an element.
 */
(function () {
  'use strict';

  var list = document.getElementById('session-list');
  var empty = document.getElementById('no-sessions');
  if (!list) return;

  var COURSES = window.EMFT_VIRTUAL_COURSES || [];
  var ENQUIRY = 'contact.html?interest=' + encodeURIComponent('Virtual Courses');

  var SEAT_KEY = { open: 'vc25', filling: 'vc26', waitlist: 'vc27', full: 'vc28' };

  function t(key) {
    var dict = window.EMFT_I18N;
    return (dict && dict.lookup && dict.lookup(key)) || '';
  }

  function lang() {
    return (window.EMFT_I18N && window.EMFT_I18N.lang) || 'en';
  }

  /* Gregorian months and Latin digits in both languages: the rest of the site
     writes numbers that way, and a Hijri date would not match the invoice. */
  function locale() {
    return lang() === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-GB';
  }

  function parseDay(value) {
    var parts = String(value || '').split('-');
    if (parts.length !== 3) return null;
    var date = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    return isNaN(date.getTime()) ? null : date;
  }

  function part(date, opts) {
    try {
      opts.timeZone = 'UTC';
      return new Intl.DateTimeFormat(locale(), opts).format(date);
    } catch (e) {
      return date.toISOString().slice(0, 10);
    }
  }

  /* "9-12 November 2026", "30 November - 3 December 2026", "9 November 2026".
     Only the parts that differ between the two ends are repeated. */
  function range(startValue, endValue) {
    var start = parseDay(startValue);
    var end = parseDay(endValue) || start;
    if (!start) return '';
    var full = { day: 'numeric', month: 'long', year: 'numeric' };
    if (start.getTime() === end.getTime()) return part(start, full);

    var dash = ' – ';
    if (start.getUTCFullYear() !== end.getUTCFullYear()) {
      return part(start, full) + dash + part(end, full);
    }
    if (start.getUTCMonth() !== end.getUTCMonth()) {
      return part(start, { day: 'numeric', month: 'long' }) + dash + part(end, full);
    }
    return part(start, { day: 'numeric' }) + '–' + part(end, full);
  }

  /* The same symbols scripts/build-virtual-courses.py writes, so the fee reads
     identically before and after this script runs, and in both languages. Only
     the thousands separator is localised; the dd carries unicode-bidi: isolate
     so the amount still reads left to right inside an Arabic sentence. */
  var SYMBOL = { USD: '$', GBP: '\u00a3', EUR: '\u20ac', AED: 'AED ', SAR: 'SAR ' };

  function fee(value) {
    if (!value || typeof value.amount !== 'number') return t('vc22');
    var currency = value.currency || 'USD';
    var symbol = SYMBOL[currency] || currency + ' ';
    var amount;
    try {
      amount = new Intl.NumberFormat(lang() === 'ar' ? 'ar-u-nu-latn' : 'en-GB', {
        maximumFractionDigits: 0
      }).format(value.amount);
    } catch (e) {
      amount = String(Math.round(value.amount));
    }
    return symbol + amount;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function factRow(label, value) {
    var wrap = el('div', 'session-fact');
    wrap.appendChild(el('dt', null, label));
    var dd = el('dd');
    // "09:00-13:00 Gulf Standard Time" is Latin text around neutral digits. Left
    // to itself inside an Arabic paragraph it reorders into "Gulf Standard Time
    // 13:00-09:00", which reverses the range. dir="auto" lets each value take
    // the direction of its own first strong character, so an Arabic date stays
    // right to left and a Latin time stays left to right, while the cell keeps
    // the page's alignment.
    var span = el('span', null, value);
    span.setAttribute('dir', 'auto');
    dd.appendChild(span);
    wrap.appendChild(dd);
    return wrap;
  }

  function buildRow(course) {
    var copy = course[lang()] || course.en || {};
    var seats = SEAT_KEY[course.seats] ? course.seats : 'open';
    var closed = seats === 'full' || seats === 'waitlist';

    var row = el('article', 'session');
    if (course.id) row.id = String(course.id);

    var main = el('div', 'session-main');
    if (copy.tag) main.appendChild(el('span', 'session-tag', copy.tag));
    // Browsers without scroll-driven animations reveal headings when an
    // observer in home.js marks them seen. That observer runs once, over the
    // rows the build script wrote, so a row built here — or rebuilt on a
    // language switch — would keep the hidden state for ever. Mark it seen as
    // it is created. Where scroll timelines do work, the class is inert and
    // the reveal still plays.
    var name = el('h3', 'session-name', copy.name || '');
    name.classList.add('is-seen');
    main.appendChild(name);
    if (copy.summary) main.appendChild(el('p', 'session-summary', copy.summary));
    row.appendChild(main);

    var facts = el('dl', 'session-facts');
    facts.appendChild(factRow(t('vc19'), range(course.start, course.end)));
    if (course.time) facts.appendChild(factRow(t('vc20'), course.time));
    var money = factRow(t('vc21'), fee(course.fee));
    if (course.fee && typeof course.fee.amount === 'number') {
      money.querySelector('dd').appendChild(el('span', 'session-per', t('vc29')));
    }
    facts.appendChild(money);
    row.appendChild(facts);

    var act = el('div', 'session-act');
    act.appendChild(el('span', 'session-seats seats-' + seats, t(SEAT_KEY[seats])));

    var cta;
    if (course.pay && !closed) {
      // A Stripe payment link is another origin, so it opens in its own tab and
      // is told nothing about this one.
      cta = el('a', 'btn-solid', t('vc23'));
      cta.href = String(course.pay);
      cta.target = '_blank';
      cta.rel = 'noopener';
    } else {
      cta = el('a', 'btn-outline', t('vc24'));
      cta.href = ENQUIRY;
    }
    act.appendChild(cta);
    row.appendChild(act);
    return row;
  }

  function render() {
    var usable = COURSES.filter(function (course) {
      return course && (course.en || course.ar) && course.start;
    });

    list.textContent = '';
    if (!usable.length) {
      list.hidden = true;
      if (empty) empty.hidden = false;
      return;
    }

    // Soonest first, so the next thing a reader can join is at the top.
    usable.sort(function (a, b) {
      return String(a.start).localeCompare(String(b.start));
    });

    if (empty) empty.hidden = true;
    list.hidden = false;
    usable.forEach(function (course) {
      list.appendChild(buildRow(course));
    });
  }

  try {
    render();
    document.addEventListener('emft:langchange', function () {
      try { render(); } catch (e) { /* keep the page, lose only the rebuild */ }
    });
  } catch (e) {
    // Leave the rows the build script wrote rather than show nothing at all.
  }
})();
