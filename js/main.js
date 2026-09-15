/* ITC C508 Portfolio — shared UX enhancements
   Dependency-free. Each init* function feature-detects its own DOM,
   so this one file is safe to include unchanged on every page. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Feature 1: Mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function isOpen() {
      return nav.classList.contains('is-open');
    }
    function open() {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (isOpen()) { close(); } else { open(); }
    });

    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        close();
        toggle.focus();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
  }

  /* ---------- Feature 2: Image lightbox ---------- */
  function initLightbox() {
    var gallerySelector = '.report-gallery, .hero-collage, .snapshot-grid';
    var triggerSelector = '.img-placeholder, img';

    var modal = null;
    var closeBtn = null;
    var body = null;
    var caption = null;
    var lastFocused = null;

    function build() {
      modal = document.createElement('div');
      modal.className = 'lightbox';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Image preview');
      modal.hidden = true;

      var backdrop = document.createElement('div');
      backdrop.className = 'lightbox-backdrop';

      var dialog = document.createElement('div');
      dialog.className = 'lightbox-dialog';

      closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'lightbox-close';
      closeBtn.setAttribute('aria-label', 'Close preview');
      closeBtn.textContent = '✕';

      body = document.createElement('div');
      body.className = 'lightbox-body';

      caption = document.createElement('p');
      caption.className = 'lightbox-caption mono';

      dialog.appendChild(closeBtn);
      dialog.appendChild(body);
      dialog.appendChild(caption);
      modal.appendChild(backdrop);
      modal.appendChild(dialog);
      document.body.appendChild(modal);

      backdrop.addEventListener('click', close);
      closeBtn.addEventListener('click', close);
      modal.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          close();
        } else if (e.key === 'Tab') {
          e.preventDefault();
          closeBtn.focus();
        }
      });
    }

    function open(trigger) {
      if (!modal) build();
      lastFocused = trigger;
      body.innerHTML = '';

      var clone = trigger.cloneNode(true);
      clone.removeAttribute('id');
      body.appendChild(clone);

      var label = trigger.tagName === 'IMG'
        ? (trigger.getAttribute('alt') || '')
        : (trigger.getAttribute('aria-label') || '');
      caption.textContent = label;
      caption.hidden = !label;

      modal.hidden = false;
      document.body.classList.add('lightbox-open');
      closeBtn.focus();
    }

    function close() {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest(triggerSelector);
      if (!trigger || !trigger.closest(gallerySelector)) return;
      open(trigger);
    });
  }

  /* ---------- Feature 3: Report-gallery carousel ---------- */
  function initCarousels() {
    document.querySelectorAll('.report-gallery').forEach(function (gallery) {
      var slides = Array.prototype.slice.call(gallery.children);
      if (!slides.length) return;

      var track = document.createElement('div');
      track.className = 'carousel-track';
      slides.forEach(function (slide) {
        slide.classList.add('carousel-slide');
        track.appendChild(slide);
      });

      var viewport = document.createElement('div');
      viewport.className = 'carousel-viewport';
      viewport.appendChild(track);

      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'carousel-btn carousel-prev';
      prevBtn.setAttribute('aria-label', 'Previous slide');
      prevBtn.innerHTML = '&#8592;';

      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'carousel-btn carousel-next';
      nextBtn.setAttribute('aria-label', 'Next slide');
      nextBtn.innerHTML = '&#8594;';

      var dots = document.createElement('div');
      dots.className = 'carousel-dots';
      var dotBtns = slides.map(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dots.appendChild(dot);
        return dot;
      });

      var status = document.createElement('div');
      status.className = 'carousel-status mono sr-only';
      status.setAttribute('aria-live', 'polite');

      gallery.innerHTML = '';
      gallery.classList.add('carousel');
      gallery.setAttribute('role', 'region');
      gallery.setAttribute('aria-roledescription', 'carousel');
      gallery.setAttribute('aria-label', 'Screenshot gallery');
      gallery.setAttribute('tabindex', '0');
      gallery.appendChild(viewport);
      gallery.appendChild(prevBtn);
      gallery.appendChild(nextBtn);
      gallery.appendChild(dots);
      gallery.appendChild(status);

      var current = 0;

      function goTo(i) {
        current = (i + slides.length) % slides.length;
        update();
      }

      function update() {
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dotBtns.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === current);
          dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
        status.textContent = 'Slide ' + (current + 1) + ' of ' + slides.length;
      }

      if (slides.length <= 1) {
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        dots.hidden = true;
      } else {
        prevBtn.addEventListener('click', function () { goTo(current - 1); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); });
        gallery.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowLeft') { goTo(current - 1); e.preventDefault(); }
          else if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
        });
      }

      update();
    });
  }

  /* ---------- Feature 4: Tag-based filtering ---------- */
  function uniqueTags(tagLists) {
    var out = [];
    tagLists.forEach(function (list) {
      list.forEach(function (tag) {
        if (out.indexOf(tag) === -1) out.push(tag);
      });
    });
    return out;
  }

  function buildFilterBar(tags, onSelect) {
    var bar = document.createElement('div');
    bar.className = 'tag-filter';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Filter by tag');

    var allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'tag tag-filter-btn is-active';
    allBtn.textContent = 'All';
    allBtn.dataset.tag = '';
    bar.appendChild(allBtn);

    tags.forEach(function (tag) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag tag-filter-btn';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      bar.appendChild(btn);
    });

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.tag-filter-btn');
      if (!btn) return;
      bar.querySelectorAll('.tag-filter-btn').forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
      });
      onSelect(btn.dataset.tag);
    });

    return bar;
  }

  function initTagFilter() {
    var activityList = document.querySelector('.activity-list');
    if (activityList) {
      var cards = Array.prototype.slice.call(activityList.querySelectorAll('.activity-card'));
      var cardTags = cards.map(function (card) {
        return Array.prototype.slice.call(card.querySelectorAll('.tag')).map(function (t) {
          return t.textContent.trim();
        });
      });
      var tags = uniqueTags(cardTags);
      if (tags.length) {
        var bar = buildFilterBar(tags, function (tag) {
          cards.forEach(function (card, i) {
            card.hidden = !!tag && cardTags[i].indexOf(tag) === -1;
          });
        });
        activityList.parentNode.insertBefore(bar, activityList);
      }
    }

    var reportGroups = document.querySelectorAll('.report-group');
    if (reportGroups.length) {
      var items = [];
      reportGroups.forEach(function (group) {
        items = items.concat(Array.prototype.slice.call(group.querySelectorAll('li[data-tags]')));
      });
      if (items.length) {
        var itemTags = items.map(function (li) {
          return (li.dataset.tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
        });
        var repTags = uniqueTags(itemTags);
        if (repTags.length) {
          var repBar = buildFilterBar(repTags, function (tag) {
            items.forEach(function (li, i) {
              li.hidden = !!tag && itemTags[i].indexOf(tag) === -1;
            });
          });
          reportGroups[0].parentNode.insertBefore(repBar, reportGroups[0]);
        }
      }
    }
  }

  /* ---------- Feature 5: Scroll polish ---------- */
  function initScrollReveal() {
    if (reduceMotion.matches) return;
    var targets = document.querySelectorAll('.activity-card, .report-list li, .report-section');
    if (!targets.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  function initBackToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '&#8593;';
    btn.hidden = true;
    document.body.appendChild(btn);

    var hero = document.querySelector('.hero');
    var threshold = hero ? hero.offsetHeight : 400;

    function onScroll() {
      btn.hidden = window.scrollY < threshold;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  }

  function initReadingProgress() {
    var main = document.querySelector('main');
    if (!main || !document.querySelector('.report-section')) return;

    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    var fill = document.createElement('div');
    fill.className = 'reading-progress-fill';
    bar.appendChild(fill);
    document.body.insertBefore(bar, document.body.firstChild);

    function update() {
      var rect = main.getBoundingClientRect();
      var mainTop = window.scrollY + rect.top;
      var start = mainTop;
      var end = mainTop + main.offsetHeight - window.innerHeight;
      var progress = end > start ? (window.scrollY - start) / (end - start) : 0;
      progress = Math.min(1, Math.max(0, progress));
      fill.style.width = (progress * 100) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  var initialized = false;
  window.initPortfolioUI = function () {
    if (initialized) return;
    initialized = true;
    initNavToggle();
    initLightbox();
    initCarousels();
    initTagFilter();
    initScrollReveal();
    initBackToTop();
    initReadingProgress();
  };
})();
