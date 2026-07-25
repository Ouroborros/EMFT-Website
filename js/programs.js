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
      navPrograms: 'Programs', navCoaching: 'Coaching', navSpeakers: 'Speakers', navElearning: 'Learning Portal',
      navAbout: 'About', navContact: 'Contact Us',
      eyebrow: 'Program Catalog',
      title: 'Every program. One standard.',
      subtitle: 'Filter by domain, or browse the eleven groups below. Every program is customized to your institution before delivery — this catalog is the starting point, not the limit.',
      domainLabel: 'Domain',
      programsWord: 'programs',
      ctaTitle: "Don't see exactly what you need?",
      ctaSub: 'Most of our engagements are built to order. Tell us the capability you want to build.',
      footer: 'All rights reserved.', backHome: '← Back to Home',
      domains: { all: 'All', fin: 'Financial', tech: 'Emerging Tech', skills: 'Professional Skills' },
      groups: {
        leadership: 'Leadership & Management',
        skills: 'Professional Skills',
        frontline: 'Retail & Frontline Banking',
        credit: 'Credit & Corporate Banking',
        finance: 'Finance, Accounting & Reporting',
        risk: 'Risk, Regulation & Compliance',
        investment: 'Investment & Markets',
        tech: 'Data, AI & Technology',
        digital: 'Digital Banking & FinTech',
        qualifications: 'Qualifications & Exam Training',
        talent: 'Talent & Graduates'
      }
    },
    ar: {
      dir: 'rtl', lang: 'ar', langLabel: 'English',
      navServices: 'الخدمات', navCases: 'دراسات الحالة', navAssessments: 'التقييمات',
      navPrograms: 'البرامج', navCoaching: 'التدريب الفردي', navSpeakers: 'المتحدثون', navElearning: 'بوابة التعلم',
      navAbout: 'من نحن', navContact: 'اتصل بنا',
      eyebrow: 'دليل البرامج',
      title: 'كل البرامج. معيار واحد.',
      subtitle: 'صفِّ البرامج حسب المجال، أو تصفح المجموعات الإحدى عشرة أدناه. كل برنامج يُصمَّم خصيصاً لمؤسستك قبل التنفيذ — هذا الدليل نقطة البداية، وليس الحد.',
      domainLabel: 'المجال',
      programsWord: 'برنامجاً',
      ctaTitle: 'لم تجد ما تبحث عنه بالضبط؟',
      ctaSub: 'معظم برامجنا تُبنى حسب الطلب. أخبرنا عن القدرات التي تريد بناءها.',
      footer: 'جميع الحقوق محفوظة.', backHome: '→ العودة إلى الرئيسية',
      domains: { all: 'الكل', fin: 'مالي', tech: 'التقنيات الناشئة', skills: 'المهارات المهنية' },
      groups: {
        leadership: 'القيادة والإدارة',
        skills: 'المهارات المهنية',
        frontline: 'الخدمات المصرفية للأفراد والفروع',
        credit: 'الائتمان والخدمات المصرفية للشركات',
        finance: 'المالية والمحاسبة والتقارير',
        risk: 'المخاطر والرقابة والامتثال',
        investment: 'الاستثمار والأسواق',
        tech: 'البيانات والذكاء الاصطناعي والتقنية',
        digital: 'الخدمات المصرفية الرقمية والتقنية المالية',
        qualifications: 'المؤهلات المهنية والتدريب على الامتحانات',
        talent: 'المواهب والخريجون'
      }
    }
  };

  var state = { lang: 'en', domain: 'all' };

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
  };

  var GROUP_ORDER = ['leadership','skills','frontline','credit','finance','risk',
                    'investment','tech','digital','qualifications','talent'];

  var renderCatalog = function () {
    var t = T[state.lang];
    var filtered = PROGRAMS.filter(function (p) {
      return state.domain === 'all' || p.d === state.domain;
    });

    catalog.textContent = '';
    GROUP_ORDER.forEach(function (key) {
      var items = filtered.filter(function (p) { return p.g === key; });
      if (!items.length) return;           // hide empty groups while filtering

      var section = document.createElement('section');
      section.className = 'catalog-group';
      section.id = key;            // deep links from the homepage services list

      var heading = document.createElement('h2');
      heading.className = 'catalog-group-title';
      heading.textContent = t.groups[key] || key;

      var count = document.createElement('span');
      count.className = 'catalog-group-count';
      count.textContent = items.length;
      heading.appendChild(count);
      section.appendChild(heading);

      items.forEach(function (p) {
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
        section.appendChild(row);
      });

      catalog.appendChild(section);
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

  // The static rows are replaced above, which drops whatever the browser had
  // already scrolled to. Re-honour the group anchor once, after first paint.
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
