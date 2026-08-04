/* ==========================================================================
   Masar — app.js
   Vanilla JS, no build step. Each page mounts only the pieces it declares
   through data-* hooks, so one script serves every page in both locales.
   ========================================================================== */
(function () {
  'use strict';

  const D = window.MASAR_DATA;
  const I = window.MASAR_I18N;
  const t = I.t, pick = I.pick;

  /* --- Lookups ----------------------------------------------------------- */
  const byId = (arr) => arr.reduce((m, x) => (m[x.id] = x, m), {});
  const SCHOOL = byId(D.schools);
  const SUBJECT = byId(D.subjects);
  const FORMAT = byId(D.formats);
  const LANGUAGE = byId(D.languages);
  const REGION = byId(D.regions);
  const COURSE = byId(D.courses);
  const LIST = byId(D.lists);

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  const SEP = I.LANG === 'ar' ? '، ' : ', ';
  const schoolOf = (c) => SCHOOL[c.school];

  /* City-states list the same name twice ("Singapore, Singapore") — say it once. */
  function cityCountry(s) {
    const city = pick(s.city), country = pick(s.country);
    return city === country ? city : city + SEP + country;
  }
  /* Where the school is. Used on cards, where the format is shown separately. */
  const homeOf = (c) => cityCountry(schoolOf(c));
  /* Where you would actually be. Used for the "Location" fact on detail pages. */
  const placeOf = (c) => (c.format === 'online' ? t('misc.online') : cityCountry(schoolOf(c)));
  const subjectLabel = (id) => pick(SUBJECT[id]);
  const formatLabel = (id) => pick(FORMAT[id]);
  const regionLabel = (id) => pick(REGION[id]);
  const langLabel = (id) => pick(LANGUAGE[id]);

  const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

  /* --- Shortlist (shared between locales via one storage key) ------------- */
  const STORE_KEY = 'masar:shortlist';
  const Shortlist = {
    read() {
      /* Anything at all can be sitting under this key — another app, an old
         format, a half-written value. JSON.parse succeeding is not enough:
         a parsed string or object would sail past the catch and then throw
         on .filter() deep inside a render. */
      try {
        const raw = JSON.parse(localStorage.getItem(STORE_KEY));
        return Array.isArray(raw) ? raw.filter((id) => typeof id === 'string') : [];
      } catch (e) {
        return [];
      }
    },
    write(ids) {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(ids)); } catch (e) { /* private mode */ }
      Shortlist.sync();
    },
    has(id) { return Shortlist.read().indexOf(id) !== -1; },
    toggle(id) {
      const ids = Shortlist.read();
      const i = ids.indexOf(id);
      if (i === -1) ids.push(id); else ids.splice(i, 1);
      Shortlist.write(ids);
      return i === -1;
    },
    remove(id) { Shortlist.write(Shortlist.read().filter((x) => x !== id)); },
    clear() { Shortlist.write([]); },
    sync() {
      const ids = Shortlist.read();
      document.querySelectorAll('[data-shortlist-count]').forEach((el) => {
        el.textContent = I.num(ids.length);
        if (ids.length) el.setAttribute('data-has', ''); else el.removeAttribute('data-has');
      });
      document.querySelectorAll('.save-btn[data-course]').forEach((btn) => {
        const on = ids.indexOf(btn.getAttribute('data-course')) !== -1;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.title = on ? t('card.saved') : t('card.save');
      });
      renderDrawer();
    }
  };

  const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5S3.5 15 3.5 9.2A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 2.6c0 5.8-8.5 11.3-8.5 11.3Z"/></svg>';

  function saveButton(c) {
    return '<button class="save-btn" type="button" data-course="' + c.id + '" aria-pressed="false"' +
      ' aria-label="' + esc(t('card.saveA11y', { title: pick(c.title) })) + '">' + HEART + '</button>';
  }

  /* --- Cards -------------------------------------------------------------- */
  function courseCard(c) {
    const s = schoolOf(c);
    return '' +
      '<article class="course-card">' +
        '<div class="course-card__top">' +
          '<div>' +
            '<a class="course-card__school" href="school.html?id=' + s.id + '">' + esc(pick(s.name)) + '</a>' +
            '<div class="course-card__place">' + esc(homeOf(c)) + ' · ' + esc(formatLabel(c.format)) + '</div>' +
          '</div>' +
          saveButton(c) +
        '</div>' +
        '<h3><a href="course.html?id=' + c.id + '">' + esc(pick(c.title)) + '</a></h3>' +
        '<p class="course-card__summary">' + esc(pick(c.summary)) + '</p>' +
        '<div class="course-card__meta">' +
          '<span class="pill pill--brand">' + esc(subjectLabel(c.subject)) + '</span>' +
          '<span class="pill">' + esc(I.dayCount(c.days)) + '</span>' +
          '<span class="pill">' + esc(c.langs.map(langLabel).join(' · ')) + '</span>' +
        '</div>' +
        '<div class="course-card__foot">' +
          '<div class="course-card__price"><small>' + esc(t('card.from')) + '</small>' + esc(I.money(c.price)) + '</div>' +
          '<div class="course-card__date">' +
            esc(t('card.starts', { date: I.shortDate(c.start) })) +
            '<br><span class="rating"><span class="stars" aria-hidden="true">' + stars(c.rating) + '</span>' +
            '<span class="sr-only">' + c.rating + '/5</span>' +
            '<span class="count">' + esc(I.num(c.reviews)) + '</span></span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function schoolCard(s) {
    const n = D.courses.filter((c) => c.school === s.id).length;
    return '' +
      '<article class="school-card">' +
        '<h3><a href="school.html?id=' + s.id + '">' + esc(pick(s.name)) + '</a></h3>' +
        '<div class="school-card__place">' + esc(cityCountry(s)) + '</div>' +
        '<p class="muted" style="font-size:.9rem">' + esc(pick(s.about)) + '</p>' +
        '<div class="school-card__foot">' +
          '<span class="pill pill--brand">' + esc(I.courseCount(n)) + '</span>' +
          s.accreditation.map((a) => '<span class="pill pill--ltr">' + esc(a) + '</span>').join('') +
        '</div>' +
      '</article>';
  }

  function listCard(l) {
    return '' +
      '<article class="list-card">' +
        '<span class="list-card__n">' + esc(I.courseCount(l.courses.length)) + '</span>' +
        '<h3><a href="list.html?id=' + l.id + '">' + esc(pick(l.title)) + '</a></h3>' +
        '<p>' + esc(pick(l.blurb)) + '</p>' +
      '</article>';
  }

  /* --- Chrome: theme, nav, drawer ---------------------------------------- */
  function initChrome() {
    const themeBtn = document.querySelector('[data-theme-toggle]');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('masar:theme', next); } catch (e) { /* ignore */ }
        themeBtn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      });
      themeBtn.setAttribute('aria-pressed',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
    }

    const navBtn = document.querySelector('[data-nav-toggle]');
    const nav = document.getElementById('main-nav');
    if (navBtn && nav) {
      navBtn.addEventListener('click', function () {
        const open = nav.hasAttribute('data-open');
        if (open) nav.removeAttribute('data-open'); else nav.setAttribute('data-open', '');
        navBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    }

    /* Shortlist drawer */
    const drawer = document.querySelector('[data-drawer]');
    const backdrop = document.querySelector('[data-drawer-backdrop]');
    const openBtns = document.querySelectorAll('[data-drawer-open]');
    if (drawer && backdrop) {
      let opener = null;

      const open = (e) => {
        opener = (e && e.currentTarget) || document.activeElement;
        drawer.setAttribute('data-open', ''); backdrop.setAttribute('data-open', '');
        drawer.removeAttribute('aria-hidden');
        drawer.removeAttribute('inert');
        openBtns.forEach((b) => b.setAttribute('aria-expanded', 'true'));
        const closeBtn = drawer.querySelector('[data-drawer-close]');
        if (closeBtn) closeBtn.focus();
      };

      const close = () => {
        if (!drawer.hasAttribute('data-open')) return;
        drawer.removeAttribute('data-open'); backdrop.removeAttribute('data-open');
        openBtns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
        /* Focus has to leave before the panel is hidden — aria-hidden and
           inert must never be applied to a subtree that still holds focus. */
        if (drawer.contains(document.activeElement)) {
          if (opener && document.contains(opener)) opener.focus();
          else document.body.focus();
        }
        drawer.setAttribute('aria-hidden', 'true');
        drawer.setAttribute('inert', '');
        opener = null;
      };

      openBtns.forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        b.addEventListener('click', open);
      });
      backdrop.addEventListener('click', close);
      drawer.querySelectorAll('[data-drawer-close]').forEach((b) => b.addEventListener('click', close));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
      const clearBtn = drawer.querySelector('[data-shortlist-clear]');
      if (clearBtn) clearBtn.addEventListener('click', () => Shortlist.clear());
    }

    /* Save buttons are delegated so dynamically rendered cards work too. */
    document.addEventListener('click', function (e) {
      const btn = e.target.closest ? e.target.closest('.save-btn[data-course]') : null;
      if (!btn) return;
      e.preventDefault();
      Shortlist.toggle(btn.getAttribute('data-course'));
    });

    /* Carry search/filter state across the language switch. There are two of
       these — the header pill and the footer link — and missing the second one
       drops ?id= on detail pages, landing the reader on "not found". */
    if (location.search) {
      document.querySelectorAll('[data-lang-switch]').forEach(function (link) {
        link.href = link.getAttribute('href') + location.search;
      });
    }

    const yr = document.querySelector('[data-year]');
    if (yr) yr.textContent = I.num(new Date().getFullYear());

    /* The shortlist is a nicety; the catalogue is the site. Never let a
       storage problem here abort boot() and leave every page empty. */
    try { Shortlist.sync(); } catch (e) { /* badge and drawer only */ }
  }

  function renderDrawer() {
    const body = document.querySelector('[data-drawer-body]');
    if (!body) return;
    const ids = Shortlist.read().filter((id) => COURSE[id]);
    if (!ids.length) {
      body.innerHTML = '<p class="muted" style="padding-block:20px">' + esc(t('shortlist.empty')) + '</p>';
      return;
    }
    body.innerHTML = ids.map(function (id) {
      const c = COURSE[id];
      return '<div class="drawer-item">' +
        '<div class="drawer-item__body">' +
          '<h4><a href="course.html?id=' + c.id + '">' + esc(pick(c.title)) + '</a></h4>' +
          '<p>' + esc(pick(schoolOf(c).name)) + ' · ' + esc(I.money(c.price)) + '</p>' +
        '</div>' +
        '<button type="button" data-remove="' + c.id + '">' + esc(t('shortlist.remove')) + '</button>' +
      '</div>';
    }).join('');
    body.querySelectorAll('[data-remove]').forEach((b) => {
      b.addEventListener('click', () => Shortlist.remove(b.getAttribute('data-remove')));
    });
  }

  /* --- Home --------------------------------------------------------------- */
  function initHome() {
    const featured = document.querySelector('[data-home-featured]');
    if (!featured) return;

    /* Eight fills two clean rows of the four-column grid; six leaves a gap. */
    featured.innerHTML = D.courses.filter((c) => c.featured).slice(0, 8).map(courseCard).join('');

    const upcoming = document.querySelector('[data-home-upcoming]');
    if (upcoming) {
      upcoming.innerHTML = D.courses.slice()
        .sort((a, b) => a.start.localeCompare(b.start))
        .slice(0, 6).map(courseCard).join('');
    }

    const subjects = document.querySelector('[data-home-subjects]');
    if (subjects) {
      subjects.innerHTML = D.subjects.map(function (s) {
        const n = D.courses.filter((c) => c.subject === s.id).length;
        return '<a class="subject-tile" href="courses.html?subject=' + s.id + '">' +
          '<span>' + esc(pick(s)) + '</span><span class="n">' + esc(I.num(n)) + '</span></a>';
      }).join('');
    }

    const lists = document.querySelector('[data-home-lists]');
    if (lists) lists.innerHTML = D.lists.slice(0, 3).map(listCard).join('');

    const schools = document.querySelector('[data-home-schools]');
    if (schools) {
      schools.innerHTML = D.schools.slice(0, 6).map(function (s) {
        return '<a class="subject-tile" href="school.html?id=' + s.id + '">' +
          '<span>' + esc(pick(s.name)) + '</span>' +
          '<span class="n">' + esc(pick(s.city)) + '</span></a>';
      }).join('');
    }

    document.querySelectorAll('[data-stat]').forEach(function (el) {
      const key = el.getAttribute('data-stat');
      const values = {
        courses: D.courses.length,
        schools: D.schools.length,
        subjects: D.subjects.length,
        countries: new Set(D.schools.map((s) => pick(s.country))).size
      };
      if (values[key] != null) el.textContent = I.num(values[key]) + '+';
    });

    /* Hero search dropdowns are filled from the data so they cannot drift. */
    const subjSel = document.querySelector('[data-hero-subject]');
    if (subjSel) {
      subjSel.innerHTML = '<option value="">' + esc(t('search.subject')) + '</option>' +
        D.subjects.map((s) => '<option value="' + s.id + '">' + esc(pick(s)) + '</option>').join('');
    }
    const regSel = document.querySelector('[data-hero-region]');
    if (regSel) {
      regSel.innerHTML = '<option value="">' + esc(t('search.location')) + '</option>' +
        D.regions.map((r) => '<option value="' + r.id + '">' + esc(pick(r)) + '</option>').join('');
    }
  }

  /* --- Catalogue ---------------------------------------------------------- */
  const FACETS = [
    { key: 'subject', source: () => D.subjects, label: 'filters.subject', of: (c) => [c.subject] },
    { key: 'format',  source: () => D.formats,  label: 'filters.format',  of: (c) => [c.format] },
    { key: 'region',  source: () => D.regions,  label: 'filters.region',  of: (c) => [schoolOf(c).region] },
    { key: 'lang',    source: () => D.languages, label: 'filters.language', of: (c) => c.langs },
    {
      key: 'dur',
      source: () => [
        { id: 'short', en: '1–3 days', ar: '1–3 أيام' },
        { id: 'mid', en: '4–7 days', ar: '4–7 أيام' },
        { id: 'long', en: '8+ days', ar: '8 أيام فأكثر' }
      ],
      label: 'filters.duration',
      of: (c) => [c.days <= 3 ? 'short' : c.days <= 7 ? 'mid' : 'long']
    }
  ];

  const MAX_PRICE = 25000;

  function initCatalogue() {
    const results = document.querySelector('[data-results]');
    if (!results) return;

    const filtersEl = document.querySelector('[data-filters]');
    const countEl = document.querySelector('[data-results-count]');
    const chipsEl = document.querySelector('[data-active-filters]');
    const sortEl = document.querySelector('[data-sort]');
    const searchInput = document.querySelector('[data-catalogue-search]');

    const params = new URLSearchParams(location.search);
    const state = {
      q: params.get('q') || '',
      sort: params.get('sort') || 'date',
      max: parseInt(params.get('max'), 10) || MAX_PRICE
    };
    FACETS.forEach(function (f) {
      const raw = params.get(f.key);
      state[f.key] = raw ? raw.split(',').filter(Boolean) : [];
    });
    /* A single ?school= from a school page acts as an extra filter. */
    state.school = params.get('school') ? params.get('school').split(',') : [];

    if (searchInput) searchInput.value = state.q;
    if (sortEl) sortEl.value = state.sort;

    function matches(c, skipKey) {
      if (state.q) {
        const hay = [pick(c.title), pick(c.summary), pick(schoolOf(c).name),
          subjectLabel(c.subject), pick(schoolOf(c).city), pick(schoolOf(c).country)]
          .join(' ').toLowerCase();
        if (hay.indexOf(state.q.toLowerCase().trim()) === -1) return false;
      }
      if (state.school.length && state.school.indexOf(c.school) === -1) return false;
      if (skipKey !== 'price' && c.price > state.max) return false;
      for (let i = 0; i < FACETS.length; i++) {
        const f = FACETS[i];
        if (f.key === skipKey) continue;
        const sel = state[f.key];
        if (!sel.length) continue;
        const vals = f.of(c);
        if (!vals.some((v) => sel.indexOf(v) !== -1)) return false;
      }
      return true;
    }

    const SORTERS = {
      date: (a, b) => a.start.localeCompare(b.start),
      popular: (a, b) => b.popularity - a.popularity,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price
    };

    function syncUrl() {
      const p = new URLSearchParams();
      if (state.q) p.set('q', state.q);
      FACETS.forEach((f) => { if (state[f.key].length) p.set(f.key, state[f.key].join(',')); });
      if (state.school.length) p.set('school', state.school.join(','));
      if (state.max < MAX_PRICE) p.set('max', state.max);
      if (state.sort !== 'date') p.set('sort', state.sort);
      const qs = p.toString();
      history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    }

    function renderFilters() {
      if (!filtersEl) return;
      const groups = FACETS.map(function (f) {
        const opts = f.source().map(function (o) {
          /* Faceted counts: everything else applied, this facet ignored. */
          const n = D.courses.filter((c) => matches(c, f.key) && f.of(c).indexOf(o.id) !== -1).length;
          const on = state[f.key].indexOf(o.id) !== -1;
          if (!n && !on) return '';
          return '<label class="check">' +
            '<input type="checkbox" data-facet="' + f.key + '" value="' + o.id + '"' + (on ? ' checked' : '') + '>' +
            '<span>' + esc(pick(o)) + '</span><span class="n">' + esc(I.num(n)) + '</span></label>';
        }).join('');
        return '<fieldset class="filter-group"><legend>' + esc(t(f.label)) + '</legend>' + opts + '</fieldset>';
      }).join('');

      const priceGroup = '<div class="filter-group"><h3>' + esc(t('filters.price')) + '</h3>' +
        '<div class="range-row"><span>' +
          (state.max >= MAX_PRICE ? esc(t('filters.noMax')) : esc(t('filters.upTo', { n: I.money(state.max) }))) +
        '</span></div>' +
        '<input type="range" data-price min="1000" max="' + MAX_PRICE + '" step="500" value="' + state.max + '" ' +
        'aria-label="' + esc(t('filters.price')) + '"></div>';

      filtersEl.querySelector('[data-filter-body]').innerHTML = groups + priceGroup;

      filtersEl.querySelectorAll('[data-facet]').forEach(function (input) {
        input.addEventListener('change', function () {
          const key = input.getAttribute('data-facet');
          const val = input.value;
          const i = state[key].indexOf(val);
          if (input.checked && i === -1) state[key].push(val);
          if (!input.checked && i !== -1) state[key].splice(i, 1);
          update();
        });
      });
      const range = filtersEl.querySelector('[data-price]');
      if (range) {
        range.addEventListener('input', function () { state.max = parseInt(range.value, 10); update(true); });
      }
    }

    function renderChips() {
      if (!chipsEl) return;
      const chips = [];
      FACETS.forEach(function (f) {
        state[f.key].forEach(function (v) {
          const o = f.source().filter((x) => x.id === v)[0];
          if (o) chips.push({ key: f.key, val: v, label: pick(o) });
        });
      });
      state.school.forEach(function (v) {
        if (SCHOOL[v]) chips.push({ key: 'school', val: v, label: pick(SCHOOL[v].name) });
      });
      if (state.q) chips.push({ key: 'q', val: state.q, label: '“' + state.q + '”' });
      if (state.max < MAX_PRICE) chips.push({ key: 'price', val: '', label: t('filters.upTo', { n: I.money(state.max) }) });

      chipsEl.innerHTML = chips.map(function (c) {
        return '<button class="chip" type="button" data-chip="' + esc(c.key) + '" data-val="' + esc(c.val) + '">' +
          esc(c.label) + '<span class="x" aria-hidden="true">×</span>' +
          '<span class="sr-only">' + esc(t('filters.clear')) + '</span></button>';
      }).join('') + (chips.length > 1
        ? '<button class="chip" type="button" data-chip="all">' + esc(t('filters.clear')) + '</button>' : '');

      chipsEl.querySelectorAll('[data-chip]').forEach(function (b) {
        b.addEventListener('click', function () {
          const key = b.getAttribute('data-chip');
          const val = b.getAttribute('data-val');
          if (key === 'all') {
            FACETS.forEach((f) => { state[f.key] = []; });
            state.school = []; state.q = ''; state.max = MAX_PRICE;
            if (searchInput) searchInput.value = '';
          } else if (key === 'q') {
            state.q = ''; if (searchInput) searchInput.value = '';
          } else if (key === 'price') {
            state.max = MAX_PRICE;
          } else if (key === 'school') {
            state.school = state.school.filter((x) => x !== val);
          } else {
            state[key] = state[key].filter((x) => x !== val);
          }
          update();
        });
      });
    }

    function update(skipFilterRerender) {
      const list = D.courses.filter((c) => matches(c));
      list.sort(SORTERS[state.sort] || SORTERS.date);

      results.innerHTML = list.length
        ? list.map(courseCard).join('')
        : '<div class="empty-state"><h3>' + esc(t('results.none.title')) + '</h3>' +
          '<p>' + esc(t('results.none.body')) + '</p>' +
          '<button class="btn btn--ghost" type="button" data-reset>' + esc(t('results.reset')) + '</button></div>';

      const resetBtn = results.querySelector('[data-reset]');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          FACETS.forEach((f) => { state[f.key] = []; });
          state.school = []; state.q = ''; state.max = MAX_PRICE;
          if (searchInput) searchInput.value = '';
          update();
        });
      }

      if (countEl) countEl.textContent = I.courseCount(list.length);
      renderChips();
      if (!skipFilterRerender) renderFilters();
      else {
        const row = filtersEl && filtersEl.querySelector('.range-row span');
        if (row) row.textContent = state.max >= MAX_PRICE ? t('filters.noMax') : t('filters.upTo', { n: I.money(state.max) });
      }
      syncUrl();
      Shortlist.sync();
    }

    if (searchInput) {
      let timer;
      searchInput.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () { state.q = searchInput.value; update(); }, 200);
      });
      const form = searchInput.closest('form');
      if (form) form.addEventListener('submit', function (e) { e.preventDefault(); state.q = searchInput.value; update(); });
    }
    if (sortEl) sortEl.addEventListener('change', function () { state.sort = sortEl.value; update(); });

    /* Mobile filter sheet */
    const openFilters = document.querySelector('[data-filters-open]');
    if (openFilters && filtersEl) {
      const openSheet = function () {
        filtersEl.setAttribute('data-open', '');
        document.body.style.overflow = 'hidden';
        openFilters.setAttribute('aria-expanded', 'true');
      };
      const closeSheet = function () {
        filtersEl.removeAttribute('data-open');
        document.body.style.overflow = '';
        openFilters.setAttribute('aria-expanded', 'false');
      };

      openFilters.setAttribute('aria-expanded', 'false');
      openFilters.addEventListener('click', openSheet);
      filtersEl.querySelectorAll('[data-filters-close]').forEach(function (b) {
        b.addEventListener('click', closeSheet);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeSheet();
      });

      /* Above 900px the sheet becomes a static sidebar and every control that
         could close it is display:none. Without this the scroll lock survives
         the breakpoint and the page can only be freed by reloading. */
      const desktop = window.matchMedia('(min-width: 901px)');
      const onBreakpoint = function (ev) { if (ev.matches) closeSheet(); };
      if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
      else if (desktop.addListener) desktop.addListener(onBreakpoint);
    }

    update();
  }

  /* --- Course detail ------------------------------------------------------ */
  function initCourseDetail() {
    const mount = document.querySelector('[data-course-detail]');
    if (!mount) return;
    const id = new URLSearchParams(location.search).get('id');
    const c = COURSE[id];

    if (!c) {
      mount.innerHTML = '<div class="empty-state"><h3>' + esc(t('course.notFound')) + '</h3>' +
        '<p><a class="link-arrow" href="courses.html">' + esc(t('course.back')) + '</a></p></div>';
      return;
    }

    const s = schoolOf(c);
    document.title = pick(c.title) + ' — ' + pick(s.name) + ' | Masar';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', pick(c.summary));

    const crumbs = document.querySelector('[data-course-crumb]');
    if (crumbs) crumbs.textContent = pick(c.title);

    mount.innerHTML = '' +
      '<div class="detail-head">' +
        '<span class="eyebrow">' + esc(subjectLabel(c.subject)) + '</span>' +
        '<h1>' + esc(pick(c.title)) + '</h1>' +
        '<p class="lede">' + esc(pick(c.summary)) + '</p>' +
        '<div class="detail-meta">' +
          '<span class="pill pill--brand">' + esc(formatLabel(c.format)) + '</span>' +
          '<span class="pill">' + esc(homeOf(c)) + '</span>' +
          '<span class="pill">' + esc(I.dayCount(c.days)) + '</span>' +
          '<span class="pill pill--accent">★ ' + c.rating + ' · ' + esc(t('card.reviews', { n: I.num(c.reviews) })) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="detail">' +
        '<div class="detail-body prose">' +
          '<h2>' + esc(t('course.about')) + '</h2>' +
          /* Composed from the record rather than repeating the lede above it. */
          '<p>' + esc(t('course.blurb', {
            school: pick(s.name),
            days: I.dayCount(c.days),
            format: formatLabel(c.format),
            place: homeOf(c),
            langs: c.langs.map(langLabel).join(' · '),
            date: I.shortDate(c.start)
          })) + '</p>' +
          '<h2>' + esc(t('course.highlights')) + '</h2>' +
          '<ul class="ticks">' + pick(c.highlights).map((h) => '<li>' + esc(h) + '</li>').join('') + '</ul>' +
          '<h2>' + esc(t('course.audience')) + '</h2>' +
          '<p>' + esc(pick(c.audience)) + '</p>' +
          '<div class="school-strip">' +
            '<div class="school-strip__body">' +
              '<span class="eyebrow">' + esc(t('course.school')) + '</span>' +
              '<h3>' + esc(pick(s.name)) + '</h3>' +
              '<p>' + esc(pick(s.about)) + '</p>' +
            '</div>' +
            '<a class="btn btn--ghost btn--sm" href="school.html?id=' + s.id + '">' + esc(t('course.schoolLink')) + '</a>' +
          '</div>' +
        '</div>' +
        '<aside class="booking-card">' +
          '<div class="price">' + esc(I.money(c.price)) + '</div>' +
          '<div class="price-note">' + esc(t('card.from')) + ' · ' + esc(I.dayCount(c.days)) + '</div>' +
          '<ul class="fact-list">' +
            fact(t('course.start'), I.shortDate(c.start)) +
            fact(t('course.format'), formatLabel(c.format)) +
            fact(t('course.location'), placeOf(c)) +
            fact(t('course.language'), c.langs.map(langLabel).join(' · ')) +
            fact(t('course.subject'), subjectLabel(c.subject)) +
          '</ul>' +
          '<a class="btn btn--primary btn--block" href="contact.html?course=' + c.id + '">' + esc(t('course.request')) + '</a>' +
          '<div style="height:10px"></div>' +
          '<button class="btn btn--ghost btn--block save-btn-wide" type="button" data-save-wide="' + c.id + '"></button>' +
        '</aside>' +
      '</div>';

    /* Wide save button mirrors the shortlist state of the card buttons. */
    const wide = mount.querySelector('[data-save-wide]');
    function paintWide() {
      const on = Shortlist.has(c.id);
      wide.textContent = on ? t('card.saved') : t('card.save');
      wide.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    wide.addEventListener('click', function () { Shortlist.toggle(c.id); paintWide(); });
    paintWide();

    const similar = document.querySelector('[data-similar]');
    if (similar) {
      const rel = D.courses
        .filter((x) => x.id !== c.id && (x.subject === c.subject || x.school === c.school))
        .sort((a, b) => b.popularity - a.popularity).slice(0, 3);
      similar.innerHTML = rel.map(courseCard).join('');
    }
    Shortlist.sync();
  }

  function fact(k, v) {
    return '<li><span class="k">' + esc(k) + '</span><span class="v">' + esc(v) + '</span></li>';
  }

  /* --- Schools ------------------------------------------------------------ */
  function initSchools() {
    const mount = document.querySelector('[data-schools]');
    if (!mount) return;
    let region = new URLSearchParams(location.search).get('region') || '';

    const nav = document.querySelector('[data-region-filter]');
    function paint() {
      const list = D.schools.filter((s) => !region || s.region === region);
      mount.innerHTML = list.map(schoolCard).join('');
      if (nav) {
        nav.querySelectorAll('[data-region]').forEach(function (b) {
          b.setAttribute('aria-pressed', b.getAttribute('data-region') === region ? 'true' : 'false');
          b.classList.toggle('btn--primary', b.getAttribute('data-region') === region);
          b.classList.toggle('btn--ghost', b.getAttribute('data-region') !== region);
        });
      }
    }
    if (nav) {
      nav.innerHTML = '<button class="btn btn--ghost btn--sm" type="button" data-region="">' + esc(t('filters.any')) + '</button>' +
        D.regions.map(function (r) {
          const n = D.schools.filter((s) => s.region === r.id).length;
          if (!n) return '';
          return '<button class="btn btn--ghost btn--sm" type="button" data-region="' + r.id + '">' + esc(pick(r)) + '</button>';
        }).join('');
      nav.querySelectorAll('[data-region]').forEach(function (b) {
        b.addEventListener('click', function () {
          region = b.getAttribute('data-region');
          const p = new URLSearchParams();
          if (region) p.set('region', region);
          history.replaceState(null, '', p.toString() ? '?' + p : location.pathname);
          paint();
        });
      });
    }
    paint();
  }

  function initSchoolDetail() {
    const mount = document.querySelector('[data-school-detail]');
    if (!mount) return;
    const id = new URLSearchParams(location.search).get('id');
    const s = SCHOOL[id];

    if (!s) {
      mount.innerHTML = '<div class="empty-state"><h3>' + esc(t('school.notFound')) + '</h3>' +
        '<p><a class="link-arrow" href="schools.html">' + esc(t('school.back')) + '</a></p></div>';
      return;
    }

    document.title = pick(s.name) + ' | Masar';
    const crumb = document.querySelector('[data-school-crumb]');
    if (crumb) crumb.textContent = pick(s.name);

    const courses = D.courses.filter((c) => c.school === s.id).sort((a, b) => a.start.localeCompare(b.start));

    mount.innerHTML = '' +
      '<div class="detail-head">' +
        '<span class="eyebrow">' + esc(cityCountry(s)) + '</span>' +
        '<h1>' + esc(pick(s.name)) + '</h1>' +
        '<p class="lede">' + esc(pick(s.about)) + '</p>' +
        '<div class="detail-meta">' +
          '<span class="pill pill--brand">' + esc(I.courseCount(courses.length)) + '</span>' +
          '<span class="pill">' + esc(t('school.founded')) + ' ' + esc(I.num(s.founded)) + '</span>' +
          s.accreditation.map((a) => '<span class="pill pill--ltr">' + esc(a) + '</span>').join('') +
        '</div>' +
      '</div>' +
      '<h2 class="h3" style="margin-block:12px 18px">' + esc(t('school.courses')) + '</h2>' +
      '<div class="card-grid">' + courses.map(courseCard).join('') + '</div>';
    Shortlist.sync();
  }

  /* --- Collections -------------------------------------------------------- */
  function initLists() {
    const mount = document.querySelector('[data-lists]');
    if (!mount) return;
    mount.innerHTML = D.lists.map(listCard).join('');
  }

  function initListDetail() {
    const mount = document.querySelector('[data-list-detail]');
    if (!mount) return;
    const id = new URLSearchParams(location.search).get('id');
    const l = LIST[id];

    if (!l) {
      mount.innerHTML = '<div class="empty-state"><h3>' + esc(t('list.notFound')) + '</h3>' +
        '<p><a class="link-arrow" href="lists.html">' + esc(t('list.back')) + '</a></p></div>';
      return;
    }

    document.title = pick(l.title) + ' | Masar';
    const crumb = document.querySelector('[data-list-crumb]');
    if (crumb) crumb.textContent = pick(l.title);

    const courses = l.courses.map((cid) => COURSE[cid]).filter(Boolean);
    mount.innerHTML = '' +
      '<div class="detail-head">' +
        '<span class="eyebrow">' + esc(I.courseCount(courses.length)) + '</span>' +
        '<h1>' + esc(pick(l.title)) + '</h1>' +
        '<p class="lede">' + esc(pick(l.blurb)) + '</p>' +
      '</div>' +
      '<div class="card-grid">' + courses.map(courseCard).join('') + '</div>';
    Shortlist.sync();
  }

  /* --- Contact ------------------------------------------------------------ */
  function initContact() {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;

    const courseSel = form.querySelector('[data-course-select]');
    if (courseSel) {
      const preset = new URLSearchParams(location.search).get('course');
      courseSel.innerHTML = '<option value="">—</option>' + D.courses
        .slice().sort((a, b) => pick(a.title).localeCompare(pick(b.title)))
        .map((c) => '<option value="' + c.id + '"' + (c.id === preset ? ' selected' : '') + '>' +
          esc(pick(c.title)) + ' — ' + esc(pick(schoolOf(c).name)) + '</option>').join('');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      /* The form carries novalidate so the timing is ours, but the required
         fields still have to be honoured — reporting success on an empty
         form and then disabling every control is a dead end for the reader. */
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const note = form.querySelector('[data-form-status]');
      if (note) {
        note.hidden = false;
        note.focus();
      }
      form.querySelectorAll('input, textarea, select, button').forEach((el) => { el.disabled = true; });
    });
  }

  /* --- Boot --------------------------------------------------------------- */

  /* Page-level wiring. Split out from boot() because the header, the drawer
     and the delegated save-button listener must only ever be bound once,
     while the page body can be swapped and re-mounted (the single-file demo
     build in tools/bundle.py does exactly that). */
  function mount() {
    initHome();
    initCatalogue();
    initCourseDetail();
    initSchools();
    initSchoolDetail();
    initLists();
    initListDetail();
    initContact();
  }

  function boot() {
    initChrome();
    mount();
  }

  window.MASAR_APP = { boot: boot, mount: mount };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
