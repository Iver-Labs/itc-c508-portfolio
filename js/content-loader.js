/* ITC C508 Portfolio — content loader
   Fetches content.md (the single edit-document) and fills in the page's
   data-role / data-activity-id hooks before handing off to main.js's UI init.
   If content.md can't be loaded (e.g. opened via file:// instead of a local
   server), the page's existing hard-coded content is left untouched. */

(function () {
  'use strict';

  function parseContent(text) {
    text = text.replace(/<!--[\s\S]*?-->/g, '');
    var lines = text.split(/\r?\n/);
    var data = { profile: {}, hero: {}, activities: {} };
    var section = null;
    var currentTarget = null;
    var currentKey = null;

    lines.forEach(function (line) {
      var h1 = line.match(/^#\s+(.+?)\s*$/);
      var h2 = !h1 && line.match(/^##\s+(.+?)\s*$/);
      var bullet = !h1 && !h2 && line.match(/^-\s*([^:]+):\s*(.*)$/);

      if (h1) {
        currentKey = null;
        section = h1[1].trim();
        if (section === 'Profile') currentTarget = data.profile;
        else if (section === 'Home Hero Images') currentTarget = data.hero;
        else currentTarget = null;
        return;
      }
      if (h2) {
        currentKey = null;
        var id = h2[1].trim();
        currentTarget = { period: section };
        data.activities[id] = currentTarget;
        return;
      }
      if (bullet) {
        currentKey = bullet[1].trim();
        if (currentTarget) currentTarget[currentKey] = bullet[2].trim();
        return;
      }
      if (!line.trim()) {
        currentKey = null;
        return;
      }
      if (currentTarget && currentKey) {
        currentTarget[currentKey] = (currentTarget[currentKey] + ' ' + line.trim()).trim();
      }
    });

    return data;
  }

  function fillText(el, text) {
    if (el && text) el.textContent = text;
  }

  function resolveImagePath(path) {
    if (/^([a-z]+:)?\/\//i.test(path) || path.charAt(0) === '/') return path;
    return siteRoot + path;
  }

  function applyImage(el, path) {
    if (!el || !path) return;
    el.innerHTML = '';
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    var img = document.createElement('img');
    img.src = resolveImagePath(path);
    img.alt = el.getAttribute('aria-label') || '';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;';
    el.appendChild(img);
  }

  function metaText(a) {
    return a['Activity Number'] && a['Week'] ? a['Activity Number'] + ' · ' + a['Week'] : null;
  }

  function renderProfile(data) {
    var p = data.profile;
    fillText(document.querySelector('[data-role="profile-name"]'), p['Name']);
    var gh = document.querySelector('[data-role="profile-github"]');
    if (gh && p['GitHub Username']) {
      gh.textContent = 'github.com/' + p['GitHub Username'];
      gh.href = 'https://github.com/' + p['GitHub Username'];
    }
    applyImage(document.querySelector('[data-role="profile-photo"]'), p['Photo']);
    applyImage(document.querySelector('[data-role="snapshot-1"]'), p['Snapshot 1']);
    applyImage(document.querySelector('[data-role="snapshot-2"]'), p['Snapshot 2']);
    applyImage(document.querySelector('[data-role="snapshot-3"]'), p['Snapshot 3']);
  }

  function renderHero(data) {
    var h = data.hero;
    applyImage(document.querySelector('[data-role="hero-collage-1"]'), h['Image 1']);
    applyImage(document.querySelector('[data-role="hero-collage-2"]'), h['Image 2']);
    applyImage(document.querySelector('[data-role="hero-collage-3"]'), h['Image 3']);
  }

  function renderActivityCards(data) {
    document.querySelectorAll('.activity-card[data-activity-id]').forEach(function (card) {
      var a = data.activities[card.dataset.activityId];
      if (!a) return;
      var meta = card.querySelector('.activity-meta');
      var metaStr = metaText(a);
      if (meta && metaStr) meta.textContent = metaStr;
      fillText(card.querySelector('h3'), a['Title']);
      fillText(card.querySelector('p'), a['Description']);
      var tagsWrap = card.querySelector('.tags');
      if (tagsWrap && a['Tags']) {
        tagsWrap.innerHTML = '';
        a['Tags'].split(',').map(function (t) { return t.trim(); }).filter(Boolean).forEach(function (t) {
          var span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t;
          tagsWrap.appendChild(span);
        });
      }
      applyImage(card.querySelector('.img-placeholder'), a['Screenshot 1']);
    });
  }

  function renderReportIndex(data) {
    document.querySelectorAll('.report-list li[data-activity-id]').forEach(function (li) {
      var a = data.activities[li.dataset.activityId];
      if (!a) return;
      var meta = li.querySelector('.activity-meta');
      var metaStr = metaText(a);
      if (meta && metaStr) meta.textContent = metaStr;
      fillText(li.querySelector('h3'), a['Title']);
      if (a['Tags']) li.dataset.tags = a['Tags'];
    });
  }

  function renderReportDetail(data) {
    var id = document.body.dataset.activityId;
    if (!id) return;
    var a = data.activities[id];
    if (!a) return;

    var kicker = document.querySelector('.kicker');
    var metaStr = metaText(a);
    if (kicker && a.period && metaStr) kicker.textContent = a.period + ' · ' + metaStr;

    fillText(document.querySelector('main h1'), a['Title']);

    var shots = document.querySelectorAll('.report-gallery .img-placeholder');
    applyImage(shots[0], a['Screenshot 1']);
    applyImage(shots[1], a['Screenshot 2']);

    document.querySelectorAll('.report-section').forEach(function (sec) {
      var h2 = sec.querySelector('h2');
      var p = sec.querySelector('p');
      if (!h2 || !p) return;
      var label = h2.textContent.trim();
      if (label === 'Description' && a['Description']) p.textContent = a['Description'];
      if (label === 'Reflection' && a['Reflection']) p.textContent = a['Reflection'];
    });
  }

  var siteRoot = (function () {
    var script = document.currentScript;
    if (script && script.src) {
      return script.src.replace(/js\/content-loader\.js(?:\?.*)?$/, '');
    }
    return '';
  })();

  function resolveContentPath() {
    return siteRoot + 'content.md';
  }

  function finish() {
    if (window.initPortfolioUI) window.initPortfolioUI();
  }

  fetch(resolveContentPath())
    .then(function (res) {
      if (!res.ok) throw new Error('content.md request failed: ' + res.status);
      return res.text();
    })
    .then(function (text) {
      var data = parseContent(text);
      renderProfile(data);
      renderHero(data);
      renderActivityCards(data);
      renderReportIndex(data);
      renderReportDetail(data);
    })
    .catch(function (err) {
      console.warn('content-loader: could not load content.md, showing default page content.', err);
    })
    .then(finish);
})();
