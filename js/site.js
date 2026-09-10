/* EMFT — shared behaviour that is not the mobile nav or the translator:
   the Solutions dropdown, the privacy notice, and the enquiry form. */
(function () {
  'use strict';

  /* Solutions dropdown ---------------------------------------------------- */
  // CSS already opens the menu on hover and on focus-within, so this only has
  // to serve click and touch, and to keep aria-expanded honest for screen
  // readers. Below the header breakpoint the menu is always laid out open, so
  // the button becomes an inert group label.
  var groupToggle = document.querySelector('.nav-group-toggle');
  var groupMenu = document.getElementById('solutions-menu');
  var stacked = function () { return window.matchMedia('(max-width: 1120px)').matches; };

  if (groupToggle && groupMenu) {
    var closeGroup = function () { groupToggle.setAttribute('aria-expanded', 'false'); };

    groupToggle.addEventListener('click', function (event) {
      if (stacked()) return;
      event.stopPropagation();
      var open = groupToggle.getAttribute('aria-expanded') === 'true';
      groupToggle.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.nav-group')) closeGroup();
    });

    // Keyboard: the menu must not stay open once focus has moved past it.
    var group = groupToggle.closest('.nav-group');
    group.addEventListener('focusout', function (event) {
      if (!event.relatedTarget || !group.contains(event.relatedTarget)) closeGroup();
    });
    // Pointer: CSS opens the menu on hover; keep the attribute in step.
    group.addEventListener('mouseenter', function () { if (!stacked()) groupToggle.setAttribute('aria-expanded', 'true'); });
    group.addEventListener('mouseleave', function () { if (!stacked()) closeGroup(); });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (groupToggle.getAttribute('aria-expanded') !== 'true') return;
      closeGroup();
      groupToggle.focus();
    });

    // The stacked menu has no disclosure semantics — drop them so a screen
    // reader is not told about a control that does nothing.
    var syncGroupRole = function () {
      if (stacked()) {
        groupToggle.setAttribute('aria-hidden', 'true');
        groupToggle.setAttribute('tabindex', '-1');
        groupToggle.removeAttribute('aria-expanded');
      } else {
        groupToggle.removeAttribute('aria-hidden');
        groupToggle.removeAttribute('tabindex');
        if (!groupToggle.hasAttribute('aria-expanded')) {
          groupToggle.setAttribute('aria-expanded', 'false');
        }
      }
    };
    syncGroupRole();
    window.addEventListener('resize', syncGroupRole);
  }

  /* Privacy notice --------------------------------------------------------- */
  var banner = document.getElementById('cookie-banner');
  var accept = document.getElementById('cookie-accept');
  if (banner && accept) {
    var seen = false;
    try { seen = window.localStorage.getItem('emft-privacy-ack') === '1'; } catch (e) { seen = true; }
    if (!seen) banner.hidden = false;
    accept.addEventListener('click', function () {
      banner.hidden = true;
      try { window.localStorage.setItem('emft-privacy-ack', '1'); } catch (e) { /* ignore */ }
    });
  }

  /* Enquiry form ----------------------------------------------------------- */
  // contact-form.php on the production host emails the submission to the
  // general inbox. Where it is absent (the GitHub Pages preview) or fails,
  // the form falls back to opening a pre-filled mail to that inbox, so the
  // flow never dead-ends. The success panel says which of the two happened.
  var ENDPOINT = 'contact-form.php';
  var INBOX = 'info@emergingmarketft.com';

  // Messages the form generates rather than renders from markup.
  var MSG = {
    en: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      sending: 'Sending…',
      send: 'Send enquiry',
      failed: 'That did not send. Please email ' + INBOX + ' instead.'
    },
    ar: {
      required: 'هذا الحقل مطلوب.',
      email: 'أدخل بريداً إلكترونياً صحيحاً.',
      sending: 'جارٍ الإرسال…',
      send: 'إرسال الاستفسار',
      failed: 'تعذّر الإرسال. يُرجى مراسلتنا على ' + INBOX + ' بدلاً من ذلك.'
    }
  };
  var t = function (key) {
    var lang = (window.EMFT_I18N && window.EMFT_I18N.lang) || 'en';
    return (MSG[lang] || MSG.en)[key];
  };

  var form = document.getElementById('enquiry-form');
  if (!form) return;

  // Program detail pages link here as contact.html?interest=<option value>,
  // so the form opens with the right area of interest already chosen.
  try {
    var wanted = new URLSearchParams(window.location.search).get('interest');
    var interest = document.getElementById('f-interest');
    if (wanted && interest) interest.value = wanted;
  } catch (e) { /* very old browser — the visitor just picks it manually */ }

  var success = document.getElementById('form-success');
  var submit = form.querySelector('button[type="submit"]');

  var setError = function (field, message) {
    var input = field.querySelector('input, select, textarea');
    var slot = field.querySelector('.field-error');
    if (!input || !slot) return;
    slot.textContent = message || '';
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  };

  var validate = function () {
    var firstBad = null;
    form.querySelectorAll('.field').forEach(function (field) {
      var input = field.querySelector('input, select, textarea');
      if (!input || input.type === 'hidden') return;
      var message = '';
      if (input.required && !input.value.trim()) {
        message = t('required');
      } else if (input.type === 'email' && input.value && !input.checkValidity()) {
        message = t('email');
      }
      setError(field, message);
      if (message && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  };

  document.addEventListener('emft:langchange', function () {
    form.querySelectorAll('.field').forEach(function (field) { setError(field, ''); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Honeypot: a real person never fills a field they cannot see.
    var trap = form.querySelector('input[name="company_website"]');
    if (trap && trap.value) return;

    if (!validate()) return;

    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (key !== 'company_website') data[key] = value;
    });

    var done = function (how) {
      form.hidden = true;
      if (success) {
        var sent = document.getElementById('success-sent');
        var mail = document.getElementById('success-mail');
        if (sent) sent.hidden = how !== 'sent';
        if (mail) mail.hidden = how === 'sent';
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({ block: 'center' });
      }
    };

    var byMail = function () {
      var lines = Object.keys(data).map(function (key) {
        return key.replace(/_/g, ' ') + ': ' + data[key];
      });
      window.location.href =
        'mailto:' + INBOX +
        '?subject=' + encodeURIComponent('Enquiry — ' + (data.organization || data.name || 'EMFT website')) +
        '&body=' + encodeURIComponent(lines.join('\n'));
      done('mail');
    };

    if (!ENDPOINT || typeof window.fetch !== 'function') { byMail(); return; }

    if (submit) { submit.disabled = true; submit.textContent = t('sending'); }
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'same-origin'
    }).then(function (res) {
      if (!res.ok) throw new Error('status ' + res.status);
      return res.json();
    }).then(function (body) {
      if (!body || body.ok !== true) throw new Error('not accepted');
      done('sent');
    }).catch(function () {
      if (submit) { submit.disabled = false; submit.textContent = t('send'); }
      byMail();
    });
  });
})();
