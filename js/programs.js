/* EMFT Program Catalog — filters + English/Arabic toggle (progressive
   enhancement over the static English list shipped in the HTML). */
(function () {
  'use strict';

  var PROGRAMS = window.EMFT_PROGRAMS || [];
  var catalog = document.getElementById('catalog');
  var countEl = document.getElementById('filter-count');
  if (!catalog || !PROGRAMS.length) return;

  var T = {
    en: {
      dir: 'ltr', lang: 'en', langLabel: 'العربية',
      navServices: 'Services', navCases: 'Case Studies', navAssessments: 'Assessments',
      navPrograms: 'Programs', navAbout: 'About', navContact: 'Contact Us',
      eyebrow: 'Program Catalog',
      title: 'Every program. One standard.',
      subtitle: 'Filter by domain and audience. Every program is customized to your institution before delivery — this catalog is the starting point, not the limit.',
      domainLabel: 'Domain', audienceLabel: 'Audience',
      programsWord: 'programs',
      ctaTitle: "Don't see exactly what you need?",
      ctaSub: 'Most of our engagements are built to order. Tell us the capability you want to build.',
      footer: 'All rights reserved.', backHome: '← Back to Home',
      domains: { all: 'All', fin: 'Financial', tech: 'Emerging Tech', skills: 'Professional Skills' },
      audiences: { all: 'All', banks: 'Banks', cb: 'Central Banks & Regulators', swf: 'Sovereign Wealth Funds', grad: 'Graduates', exec: 'Executives' }
    },
    ar: {
      dir: 'rtl', lang: 'ar', langLabel: 'English',
      navServices: 'الخدمات', navCases: 'دراسات الحالة', navAssessments: 'التقييمات',
      navPrograms: 'البرامج', navAbout: 'من نحن', navContact: 'اتصل بنا',
      eyebrow: 'دليل البرامج',
      title: 'كل البرامج. معيار واحد.',
      subtitle: 'صفِّ البرامج حسب المجال والجمهور. كل برنامج يُصمَّم خصيصاً لمؤسستك قبل التنفيذ — هذا الدليل نقطة البداية، وليس الحد.',
      domainLabel: 'المجال', audienceLabel: 'الجمهور',
      programsWord: 'برنامجاً',
      ctaTitle: 'لم تجد ما تبحث عنه بالضبط؟',
      ctaSub: 'معظم برامجنا تُبنى حسب الطلب. أخبرنا عن القدرات التي تريد بناءها.',
      footer: 'جميع الحقوق محفوظة.', backHome: '→ العودة إلى الرئيسية',
      domains: { all: 'الكل', fin: 'مالي', tech: 'التقنيات الناشئة', skills: 'المهارات المهنية' },
      audiences: { all: 'الكل', banks: 'البنوك', cb: 'البنوك المركزية والجهات الرقابية', swf: 'صناديق الثروة السيادية', grad: 'الخريجون', exec: 'التنفيذيون' }
    }
  };

  var state = { lang: 'en', domain: 'all', audience: 'all' };

  var renderFilters = function () {
    var t = T[state.lang];
    var build = function (rowId, options, current, key) {
      var row = document.getElementById(rowId);
      if (!row) return;
      row.textContent = '';
      Object.keys(options).forEach(function (value) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-btn';
        btn.textContent = options[value];
        btn.setAttribute('aria-pressed', String(value === current));
        btn.addEventListener('click', function () {
          state[key] = value;
          render();
        });
        row.appendChild(btn);
      });
    };
    build('domain-filters', t.domains, state.domain, 'domain');
    build('audience-filters', t.audiences, state.audience, 'audience');
  };

  var renderCatalog = function () {
    var t = T[state.lang];
    var filtered = PROGRAMS.filter(function (p) {
      return (state.domain === 'all' || p.d === state.domain) &&
             (state.audience === 'all' || p.a.indexOf(state.audience) !== -1);
    });

    catalog.textContent = '';
    filtered.forEach(function (p) {
      var item = p[state.lang];
      var row = document.createElement('a');
      row.className = 'program-row';
      row.href = 'index.html#contact';

      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = item.tag;

      var name = document.createElement('span');
      name.className = 'name';
      name.textContent = item.name;

      var outcome = document.createElement('span');
      outcome.className = 'outcome';
      outcome.textContent = item.outcome;

      row.appendChild(tag);
      row.appendChild(name);
      row.appendChild(outcome);
      catalog.appendChild(row);
    });

    if (countEl) countEl.textContent = filtered.length + ' ' + t.programsWord;
  };

  var renderText = function () {
    var t = T[state.lang];
    document.documentElement.setAttribute('lang', t.lang);
    document.documentElement.setAttribute('dir', t.dir);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
  };

  var langToggle = document.getElementById('lang-toggle');

  var render = function () {
    renderText();
    renderFilters();
    renderCatalog();
    if (langToggle) {
      langToggle.textContent = T[state.lang].langLabel;
      langToggle.setAttribute('lang', state.lang === 'en' ? 'ar' : 'en');
    }
  };
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      state.lang = state.lang === 'en' ? 'ar' : 'en';
      render();
    });
  }

  render();
})();
