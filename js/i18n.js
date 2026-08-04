/* EMFT — site-wide English/Arabic toggle.
   Owns the header, footer and consent-banner strings, the document's lang/dir,
   the toggle button and the stored preference. Pages with their own copy (the
   program catalog) keep their own dictionary and listen for `emft:langchange`.

   Every translator pass is guarded on the key existing, so an element whose
   string has not been translated yet keeps its English text rather than
   blanking out. */
(function () {
  'use strict';

  var STORE = 'emft-lang';

  var CHROME = {
    en: {
      dir: 'ltr', lang: 'en', langLabel: 'العربية',
      navSolutions: 'Solutions', navPrograms: 'Programs', navCases: 'Case Studies',
      navAbout: 'About', navPortal: 'Learning Portal', navContact: 'Contact',
      navCoaching: 'Coaching &amp; Technical Mentoring', navAssessments: 'Assessments',
      navSpeakers: 'Keynote Speakers', navDigital: 'Digital Learning', navServices: 'Services',
      footCompany: 'Company', footOffices: 'Offices', footRights: 'All rights reserved.',
      footPrivacy: 'Privacy Policy', footTerms: 'Terms of Use',
      footBlurb: 'Practitioner-led training, assessment and coaching for financial institutions, government entities and corporates.',
      cookieText: "This site stores your language choice and this notice's dismissal in your browser. Nothing is shared with advertisers.",
      cookieOk: 'Got it', cookieMore: 'Read more'
    },
    ar: {
      dir: 'rtl', lang: 'ar', langLabel: 'English',
      navSolutions: 'الحلول', navPrograms: 'البرامج', navCases: 'دراسات الحالة',
      navAbout: 'عن الشركة', navPortal: 'منصة التعلّم', navContact: 'تواصل معنا',
      navCoaching: 'الإرشاد والتوجيه الفني', navAssessments: 'التقييمات',
      navSpeakers: 'المتحدثون الرئيسيون', navDigital: 'التعلّم الرقمي', navServices: 'الخدمات',
      footCompany: 'الشركة', footOffices: 'المكاتب', footRights: 'جميع الحقوق محفوظة.',
      footPrivacy: 'سياسة الخصوصية', footTerms: 'شروط الاستخدام',
      footBlurb: 'تدريب وتقييم وإرشاد يقدّمه ممارسون للمؤسسات المالية والجهات الحكومية والشركات.',
      cookieText: 'يحفظ هذا الموقع اختيارك للغة وإغلاقك لهذا الإشعار في متصفحك. لا تتم مشاركة أي بيانات مع المعلنين.',
      cookieOk: 'حسناً', cookieMore: 'اقرأ المزيد'
    }
  };

  var dicts = [CHROME];
  var lang = 'en';

  try {
    var saved = window.localStorage.getItem(STORE);
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch (e) { /* private mode — fall back to English */ }

  var lookup = function (key) {
    for (var i = dicts.length - 1; i >= 0; i--) {
      var v = dicts[i][lang] && dicts[i][lang][key];
      // An empty string means "not translated yet" — fall through so the
      // element keeps its English rather than blanking out.
      if (v) return v;
    }
    return undefined;
  };

  var apply = function () {
    var root = document.documentElement;
    root.setAttribute('lang', CHROME[lang].lang);
    root.setAttribute('dir', CHROME[lang].dir);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var value = lookup(el.getAttribute('data-i18n'));
      // Entities are written in the dictionary the way they appear in the
      // markup, so decode the handful that show up before assigning text.
      if (value !== undefined) el.textContent = value.replace(/&amp;/g, '&');
    });

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.textContent = CHROME[lang].langLabel;
      toggle.setAttribute('lang', lang === 'en' ? 'ar' : 'en');
      toggle.setAttribute('aria-label', lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English');
    }

    document.dispatchEvent(new CustomEvent('emft:langchange', { detail: { lang: lang } }));
  };

  window.EMFT_I18N = {
    get lang() { return lang; },
    register: function (dict) { dicts.push(dict); apply(); },
    apply: apply,
    set: function (next) {
      if (next !== 'en' && next !== 'ar') return;
      lang = next;
      try { window.localStorage.setItem(STORE, lang); } catch (e) { /* ignore */ }
      apply();
    }
  };

  document.addEventListener('click', function (event) {
    if (!event.target.closest('#lang-toggle')) return;
    window.EMFT_I18N.set(lang === 'en' ? 'ar' : 'en');
  });

  apply();
})();
