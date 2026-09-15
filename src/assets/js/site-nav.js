/*
  InSME Calculators — shared top navigation.
  Included as the very first tag in <body> on every page:
    <script src="../assets/js/site-nav.js"></script>
  Inserts the same nav markup everywhere (menu tabs + dark/light toggle),
  highlights the current page's tab, and wires up the theme toggle.
  Pair with the inline theme-init snippet in <head> (sets data-theme before
  first paint, so there's no flash of the wrong theme).
*/
(function () {
  // Home (index.html) lives at the project root; every other page lives
  // in src/pages/, one directory deeper — so each entry carries both a
  // same-directory path (used when the current page is in src/pages/) and
  // a from-root path (used when the current page is index.html itself).
  var PAGES = [
    { file: 'index.html', label: 'Home', fromPages: '../../index.html', fromRoot: 'index.html' },
    { file: 'momoinsure.html', label: 'MoMo Insure', fromPages: 'momoinsure.html', fromRoot: 'src/pages/momoinsure.html' },
    { file: 'motor.html', label: 'Motor', fromPages: 'motor.html', fromRoot: 'src/pages/motor.html' },
    { file: 'ahotopii.html', label: 'Ahotopii', fromPages: 'ahotopii.html', fromRoot: 'src/pages/ahotopii.html' },
    { file: 'commission.html', label: 'Commission', fromPages: 'commission.html', fromRoot: 'src/pages/commission.html' },
    { file: 'date-age.html', label: 'Date & Age', fromPages: 'date-age.html', fromRoot: 'src/pages/date-age.html' },
    { file: 'sme-insure.html', label: 'SME Insure', fromPages: 'sme-insure.html', fromRoot: 'src/pages/sme-insure.html' }
  ];

  var inPages = location.pathname.indexOf('/src/pages/') !== -1;
  var current = (location.pathname.split('/').pop() || 'index.html');

  var linksHtml = PAGES.map(function (p) {
    var active = p.file === current ? ' active' : '';
    var href = inPages ? p.fromPages : p.fromRoot;
    return '<a href="' + href + '" class="tab' + active + '">' + p.label + '</a>';
  }).join('');

  var homeHref = inPages ? '../../index.html' : 'index.html';

  var html =
    '<header class="insme-nav">' +
      '<div class="insme-nav-inner">' +
        '<a class="insme-nav-brand" href="' + homeHref + '">' +
          '<img src="https://scinsurance.my.enterprisegroup.net.gh/assets/Uploads/enterprise-insurance__ScaleWidthWzQwMF0.png" alt="Enterprise Insurance">' +
          '<span>InSME Calculators</span>' +
        '</a>' +
        '<nav class="insme-nav-links">' + linksHtml + '</nav>' +
        '<button type="button" class="insme-theme-toggle" id="insme-theme-toggle" aria-label="Toggle dark mode">' +
          '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>' +
          '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  var thisScript = document.currentScript;
  thisScript.insertAdjacentHTML('afterend', html);

  var nav = document.querySelector('.insme-nav');

  function applyOffset() {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
  }
  applyOffset();
  window.addEventListener('resize', applyOffset);

  var toggle = document.getElementById('insme-theme-toggle');
  toggle.addEventListener('click', function () {
    var root = document.documentElement;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('insme-theme', next); } catch (e) {}
  });
})();
