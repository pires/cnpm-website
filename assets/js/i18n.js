(function () {
  "use strict";

  // English translations. Portuguese (pt-PT) is the markup default in index.html.
  var EN = {
    "meta.description": "Clube Náutico da Praia de Mira — rowing and canoeing on the shores of the Barrinha de Mira lagoon. A school of values and a house of champions.",
    "a11y.skip": "Skip to content",

    "nav.about": "The Club",
    "nav.history": "History",
    "nav.disciplines": "Disciplines",
    "nav.contact": "Contact",

    "hero.title": "Clube Náutico da Praia de Mira",
    "hero.tagline": "Where the passion for rowing and canoeing defies every tide.",
    "hero.ctaHistory": "Our history",
    "hero.ctaContact": "Get in touch",

    "about.eyebrow": "The Club",
    "about.title": "A school of values, a house of champions",
    "about.p1": "Clube Náutico da Praia de Mira is a sports club dedicated to rowing and canoeing, based on the shores of the Barrinha lagoon in Praia de Mira. Much more than a club, it is a community that shapes people on and off the water, nurturing discipline, team spirit and a love for the sea and the lagoon.",
    "about.p2": "Year after year, our athletes collect podiums, victories and regional and national titles, carrying the name of Praia de Mira to the country's most important competitions.",
    "about.stat1": "Founded on 21 May",
    "about.stat2": "Disciplines — rowing and canoeing",
    "about.stat3": "Passion for the water",

    "history.eyebrow": "History",
    "history.title": "A tradition on the shores of the lagoon",
    "history.p1": "Founded on 21 May 1992, Clube Náutico da Praia de Mira was born from Praia de Mira's centuries-old bond with the water — the labour of the arte xávega beach fishing and life around the Barrinha lagoon — and turned that heritage into a sporting passion. The sheltered waters of the Barrinha offer an ideal stretch of water for rowing and canoeing, and soon became the natural stage for generations of young rowers and paddlers.",
    "history.p2": "Over the years, the Club has established itself as a benchmark for nautical sport in the region, keeping close cooperation with the schools of the Mira municipality, the Town Council and the parish councils through sports training centres that introduce the youngest to nautical activities.",
    "history.p3": "Its development work has produced athletes of national merit. Among the feats that mark the Club's history is the unprecedented capture of both the junior and senior skiff titles of Portuguese rowing, bringing to Praia de Mira the very first edition of the Henrique Baixinho Trophy.",
    "history.p4": "Today, Clube Náutico da Praia de Mira keeps rowing against the current of every hardship with the same determination as ever, true to its motto of being a school of values and a house of champions.",

    "disc.eyebrow": "Disciplines",
    "disc.title": "What we do on the water",
    "disc.rowTitle": "Rowing",
    "disc.rowText": "From indoor rowing to on-water regattas, we train athletes across every age group, from under-11s to veterans, with a regular presence at the national championships.",
    "disc.canoeTitle": "Canoeing",
    "disc.canoeText": "Canoeing is the heart of the Club: a school that defies every tide and carries our athletes to regional and national podiums.",
    "disc.schoolTitle": "Training & school",
    "disc.schoolText": "In partnership with local schools, we introduce children and young people to nautical sports in a safe environment full of values.",

    "contact.eyebrow": "Contact",
    "contact.title": "Get in touch",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.nif": "Tax No. (NIF)",
    "contact.callCost": "Call to the national mobile network.",
    "contact.viewMap": "View larger map",

    "footer.rights": "All rights reserved."
  };

  var STORAGE_KEY = "cnpm-lang";
  var SUPPORTED = ["pt", "en"];

  // Store the original Portuguese text (the markup default) once, so we can restore it.
  var ptCache = {};
  function cachePortuguese() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in ptCache)) {
        ptCache[key] = key === "meta.description" ? el.getAttribute("content") : el.innerHTML;
      }
    });
  }

  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var langs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "pt"];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || "").toLowerCase();
      if (code.indexOf("pt") === 0) return "pt";
      if (code.indexOf("en") === 0) return "en";
    }
    return "pt"; // fallback: club's home language
  }

  function applyLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "pt";
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = lang === "en" ? EN[key] : ptCache[key];
      if (value == null) return;
      if (key === "meta.description") {
        el.setAttribute("content", value);
      } else {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    cachePortuguese();

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initNav();
    applyLang(detectLang());
  });
})();
