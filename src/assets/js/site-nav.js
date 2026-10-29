/*
  InSME Calculators — shared top navigation.
  Included as the very first tag in <body> on every page:
    <script src="../assets/js/site-nav.js"></script>
  Nav: Home | Calculators (hover dropdown) | Support (hover dropdown), plus the dark/light toggle.
  Highlights the current page, and wires up the dropdown + theme toggle.
  Pair with the inline theme-init snippet in <head> (sets data-theme before
  first paint, so there's no flash of the wrong theme).
*/
(function () {
  // Home (index.html) lives at the project root; every other page lives
  // in src/pages/, one directory deeper — so each entry carries both paths.
  var HOME = {
    file: "index.html",
    label: "Home",
    fromPages: "../../index.html",
    fromRoot: "index.html",
  };

  var CALCULATORS = [
    { file: "momoinsure.html", label: "MoMo Insure", fromPages: "momoinsure.html", fromRoot: "src/pages/momoinsure.html" },
    { file: "motor.html", label: "Motor", fromPages: "motor.html", fromRoot: "src/pages/motor.html" },
    { file: "ahotopii.html", label: "Ahotopii", fromPages: "ahotopii.html", fromRoot: "src/pages/ahotopii.html" },
    { file: "commission.html", label: "Commission", fromPages: "commission.html", fromRoot: "src/pages/commission.html" },
    { file: "travel-insurance.html", label: "Travel", fromPages: "travel-insurance.html", fromRoot: "src/pages/travel-insurance.html" },
    { file: "sme-insure.html", label: "SME Insure", fromPages: "sme-insure.html", fromRoot: "src/pages/sme-insure.html" },
  ];

  var SUPPORT_WHATSAPP = "https://wa.me/233552375066?text=I%20need%20help%20with%20...";
  var SUPPORT_EMAIL = "eicinformalmarket@gmail.com";

  var inPages = location.pathname.indexOf("/src/pages/") !== -1;
  var current = location.pathname.split("/").pop() || "index.html";
  function href(p) { return inPages ? p.fromPages : p.fromRoot; }

  var calcActive = false;
  var menuHtml = CALCULATORS.map(function (p) {
    var on = p.file === current;
    if (on) calcActive = true;
    return '<a href="' + href(p) + '" role="menuitem" class="' + (on ? "active" : "") + '">' + p.label + "</a>";
  }).join("");

  var homeHref = href(HOME);
  var homeActive = HOME.file === current ? " active" : "";

  var chevron =
    '<svg class="insme-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>';

  var html =
    '<header class="insme-nav">' +
    '<div class="insme-nav-inner">' +
    '<a class="insme-nav-brand" href="' + homeHref + '">' +
    '<img src="https://myenterprisegroup.io/gh-insurance/wp-content/uploads/sites/2/2025/07/Enterprise-Insurance-logo_Blue.png" alt="Enterprise Insurance">' +
    "<span>InSME Calculators</span>" +
    "</a>" +
    '<nav class="insme-nav-links">' +
    '<a href="' + homeHref + '" class="tab' + homeActive + '">Home</a>' +
    '<div class="insme-dd' + (calcActive ? " active" : "") + '">' +
    '<button type="button" class="tab insme-dd-btn" aria-haspopup="true" aria-expanded="false">Calculators' + chevron + "</button>" +
    '<div class="insme-dd-menu" role="menu">' + menuHtml + "</div>" +
    "</div>" +
    '<div class="insme-dd insme-dd-right">' +
    '<button type="button" class="tab insme-dd-btn" aria-haspopup="true" aria-expanded="false">Support' + chevron + "</button>" +
    '<div class="insme-dd-menu" role="menu">' +
    '<a href="' + SUPPORT_WHATSAPP + '" role="menuitem" target="_blank" rel="noopener"><strong>WhatsApp</strong><small>Chat with us now</small></a>' +
    '<a href="mailto:' + SUPPORT_EMAIL + '" role="menuitem"><strong>Email</strong><small>' + SUPPORT_EMAIL + "</small></a>" +
    "</div>" +
    "</div>" +
    "</nav>" +
    '<button type="button" class="insme-theme-toggle" id="insme-theme-toggle" aria-label="Toggle dark mode">' +
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path></svg>' +
    "</button>" +
    "</div>" +
    "</header>";

  var thisScript = document.currentScript;
  thisScript.insertAdjacentHTML("afterend", html);

  var nav = document.querySelector(".insme-nav");

  function applyOffset() {
    document.body.style.paddingTop = nav.offsetHeight + "px";
  }
  applyOffset();
  window.addEventListener("resize", applyOffset);

  // Dropdowns: open on hover/focus via CSS; click/tap toggles them for touch + keyboard.
  var dds = Array.prototype.slice.call(nav.querySelectorAll(".insme-dd"));
  function setOpen(dd, open) {
    dd.classList.toggle("open", open);
    dd.querySelector(".insme-dd-btn").setAttribute("aria-expanded", open ? "true" : "false");
  }
  dds.forEach(function (dd) {
    dd.querySelector(".insme-dd-btn").addEventListener("click", function (e) {
      e.stopPropagation();
      var willOpen = !dd.classList.contains("open");
      dds.forEach(function (o) { setOpen(o, false); });
      setOpen(dd, willOpen);
    });
  });
  document.addEventListener("click", function (e) {
    dds.forEach(function (dd) { if (!dd.contains(e.target)) setOpen(dd, false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dds.forEach(function (dd) { setOpen(dd, false); });
      if (document.activeElement) document.activeElement.blur();
    }
  });

  var toggle = document.getElementById("insme-theme-toggle");
  toggle.addEventListener("click", function () {
    var root = document.documentElement;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("insme-theme", next);
    } catch (e) {}
  });
})();