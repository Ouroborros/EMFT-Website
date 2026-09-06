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

    // Same-page anchor navigation: close the menu so it doesn't cover content.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeNav(false);
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 980) closeNav(false);
      }, 150);
    });
  }

  /* Animated count-up stats ---------------------------------------------- */
  // The HTML ships with final values as text, so no-JS and reduced-motion
  // visitors always see the real numbers.
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var stats = document.querySelectorAll('[data-countup]');
  if (motionOK && 'IntersectionObserver' in window && stats.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-countup'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var duration = 1400;
        var tick = function (now) {
          var p = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-US') + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { observer.observe(el); });
  }

  /* Draw-on when seen ---------------------------------------------------- */
  // The hero line-art band and, in browsers without scroll-driven animations,
  // the other reveals are flagged as they enter the viewport; the CSS runs a
  // time-based animation from that moment. Without JS nothing is hidden.
  var seen = document.querySelectorAll(
    '.hero-lineart, section h2, section h3, .service-row, .case-card, .program-card, ' +
    '.stat, .usecase, .model-figure, .quote-panel, .process-step, .office, .contact-block'
  );
  if (seen.length) {
    if (motionOK && 'IntersectionObserver' in window) {
      var seer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          seer.unobserve(entry.target);
          entry.target.classList.add('is-seen');
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
      seen.forEach(function (el) { seer.observe(el); });
    } else {
      seen.forEach(function (el) { el.classList.add('is-seen'); });
    }
  }

  /* Footer year ---------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
