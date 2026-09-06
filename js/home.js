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

  /* Rolling odometer stats --------------------------------------------- */
  // The HTML ships with the final value as text, so no-JS and reduced-motion
  // visitors always see the real number. With motion on, each digit becomes
  // a strip of 0–9 that rolls up to its target, right to left; the strips
  // are aria-hidden and a visually hidden copy keeps the value readable.
  var motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var stats = document.querySelectorAll('[data-countup]');
  if (motionOK && 'IntersectionObserver' in window && stats.length) {
    var buildOdometer = function (el) {
      var value = el.textContent.trim();
      el.textContent = '';
      var hidden = document.createElement('span');
      hidden.className = 'visually-hidden';
      hidden.textContent = value;
      el.appendChild(hidden);
      var roll = document.createElement('span');
      roll.className = 'odo-roll';
      roll.setAttribute('aria-hidden', 'true');
      var digits = [];
      value.split('').forEach(function (ch) {
        var cell = document.createElement('span');
        if (/\d/.test(ch)) {
          cell.className = 'odo';
          var strip = document.createElement('span');
          strip.className = 'odo-strip';
          for (var d = 0; d <= 9; d++) {
            var digit = document.createElement('span');
            digit.textContent = String(d);
            strip.appendChild(digit);
          }
          cell.appendChild(strip);
          digits.push({ strip: strip, target: +ch });
        } else {
          cell.textContent = ch;
        }
        roll.appendChild(cell);
      });
      el.appendChild(roll);
      el.classList.add('is-odo');
      return digits;
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        var digits = buildOdometer(entry.target);
        // Two frames: the strips need a painted starting state to roll from.
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            digits.forEach(function (d, i) {
              d.strip.style.transitionDelay = ((digits.length - 1 - i) * 110) + 'ms';
              d.strip.style.transform = 'translateY(-' + (d.target * 10) + '%)';
            });
          });
        });
      });
    }, { threshold: 0.4 });
    stats.forEach(function (el) { observer.observe(el); });
  }

  /* Word reveal ------------------------------------------------------------ */
  // Display headings arrive a word at a time. The split only happens with
  // motion on, so the markup itself never changes for anyone else; the
  // translator replaces textContent on a language change, so the heading is
  // split again and re-shown.
  var SPLIT = '.display-xl, section h2.display-lg, .page-hero h1, .quote-statement';
  var splitWords = function (el) {
    if (el.children.length && !el.classList.contains('is-split')) return;
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    if (!text) return;
    el.textContent = '';
    var words = text.split(' ');
    words.forEach(function (word, i) {
      var w = document.createElement('span');
      w.className = 'w';
      w.style.setProperty('--d', (i * 70) + 'ms');
      w.textContent = word;
      el.appendChild(w);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.classList.add('is-split');
  };
  var heads = motionOK ? Array.prototype.slice.call(document.querySelectorAll(SPLIT)) : [];
  heads.forEach(splitWords);
  if (heads.length) {
    document.addEventListener('emft:langchange', function () {
      heads.forEach(function (el) {
        el.classList.remove('is-seen');
        el.classList.remove('is-split');
        splitWords(el);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.add('is-seen'); });
        });
      });
    });
  }

  /* Hero rotator ----------------------------------------------------------- */
  // The items are separate translated spans stacked in one grid cell; this
  // only moves the active class, so the translator and the rotator never
  // touch the same node.
  var rotator = document.querySelector('.rotator');
  if (rotator) {
    var items = rotator.querySelectorAll('.rotator-item');
    var current = 0;
    items[0].classList.add('is-active');
    if (motionOK && items.length > 1) {
      setInterval(function () {
        items[current].classList.remove('is-active');
        current = (current + 1) % items.length;
        items[current].classList.add('is-active');
      }, 2800);
    }
  }

  /* Sector marquee --------------------------------------------------------- */
  // A second, aria-hidden copy of the chips makes the loop seamless. Built
  // only with motion on; otherwise the chips stay a centred, wrapping row.
  var chips = document.querySelector('.serve-chips');
  if (chips && motionOK) {
    var marquee = document.createElement('div');
    marquee.className = 'marquee';
    var track = document.createElement('div');
    track.className = 'marquee-track';
    chips.parentNode.insertBefore(marquee, chips);
    marquee.appendChild(track);
    track.appendChild(chips);
    var copy = chips.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.appendChild(copy);
  }

  /* Scroll progress -------------------------------------------------------- */
  // A gold hairline along the header's bottom edge that tracks how far down
  // the page the reader is. Not an animation: it follows the scroll position.
  var header = document.querySelector('.site-header');
  if (header) {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    header.appendChild(bar);
    var pending = false;
    var paint = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ')';
      pending = false;
    };
    window.addEventListener('scroll', function () {
      if (!pending) { pending = true; requestAnimationFrame(paint); }
    }, { passive: true });
    paint();
  }

  /* Draw-on when seen ---------------------------------------------------- */
  // The hero line-art band and, in browsers without scroll-driven animations,
  // the other reveals are flagged as they enter the viewport; the CSS runs a
  // time-based animation from that moment. Without JS nothing is hidden.
  var seen = document.querySelectorAll(
    '.hero-lineart, section h2, section h3, .service-row, .case-card, .program-card, ' +
    '.stat, .usecase, .model-figure, .quote-panel, .process-step, .office, .contact-block, ' +
    '.display-xl, .page-hero h1, .quote-statement, .media-frame'
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
