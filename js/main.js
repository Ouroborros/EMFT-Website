(function () {
  'use strict';

  /* Mobile navigation toggle -------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var closeNav = function (returnFocus) {
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      if (returnFocus) toggle.focus();
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      document.body.classList.toggle('nav-open', !open);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
        closeNav(true);
      }
    });

    document.addEventListener('click', function (event) {
      if (
        document.body.classList.contains('nav-open') &&
        !event.target.closest('.site-header')
      ) {
        closeNav(false);
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 860) closeNav(false);
      }, 150);
    });
  }

  /* Header scrolled state ------------------------------------------------ */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Scroll reveal (progressive enhancement) ------------------------------ */
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (motionOK && 'IntersectionObserver' in window) {
    document.body.classList.add('js-reveal');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Footer year ---------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Contact form validation + client-side submit ------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    // Set to a real endpoint (Formspree/Netlify Forms/Basin/your API) to make
    // the form actually transmit, e.g. 'https://formspree.io/f/XXXXXXXX'.
    // While empty, submissions are not sent anywhere; the success message
    // points visitors at the direct email address as a fallback.
    var FORM_ENDPOINT = '';

    // Take over validation only when JS runs — the no-JS path keeps native
    // required/type=email constraint validation.
    form.setAttribute('novalidate', '');

    var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var validators = {
      name: function (value) {
        if (!value.trim()) return 'Enter your full name.';
        return '';
      },
      email: function (value) {
        if (!value.trim()) return 'Enter your email address.';
        if (!EMAIL_PATTERN.test(value.trim())) {
          return 'Enter a valid email address, like name@example.com.';
        }
        return '';
      },
      subject: function (value) {
        if (!value) return 'Select a topic.';
        return '';
      },
      message: function (value) {
        if (!value.trim()) return 'Enter a message.';
        if (value.trim().length < 10) return 'Your message needs at least 10 characters.';
        return '';
      }
    };

    var setFieldState = function (field, message) {
      var errorEl = document.getElementById(field.id + '-error');
      if (message) {
        field.setAttribute('aria-invalid', 'true');
        if (errorEl) errorEl.textContent = message;
      } else {
        field.removeAttribute('aria-invalid');
        if (errorEl) errorEl.textContent = '';
      }
    };

    var validateField = function (field) {
      var validate = validators[field.name];
      if (!validate) return true;
      var message = validate(field.value);
      setFieldState(field, message);
      return !message;
    };

    Object.keys(validators).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener('blur', function () {
        validateField(field);
      });
      // Re-validate live only once the field has been marked invalid.
      field.addEventListener('input', function () {
        if (field.hasAttribute('aria-invalid')) validateField(field);
      });
    });

    var showSuccess = function () {
      var success = document.getElementById('form-success');
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    };

    var showError = function () {
      var errorEl = document.getElementById('form-error');
      if (errorEl) {
        errorEl.textContent =
          'Something went wrong sending your message. Please email us directly at info@emft.com.';
      }
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Honeypot filled → silently pretend success, transmit nothing.
      if (form.elements.company_website && form.elements.company_website.value) {
        showSuccess();
        return;
      }

      var firstInvalid = null;
      Object.keys(validators).forEach(function (name) {
        var field = form.elements[name];
        if (field && !validateField(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      if (FORM_ENDPOINT) {
        fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        })
          .then(function (response) {
            if (response.ok) showSuccess();
            else showError();
          })
          .catch(showError);
      } else {
        showSuccess();
      }
    });
  }
})();
