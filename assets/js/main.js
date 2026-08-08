/* PebbleFlowRV.com — motion & interaction (no dependencies) */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  // Header condenses on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Staggered scroll reveal
  var faders = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && faders.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (en.isIntersecting) {
          var el = en.target;
          setTimeout(function () { el.classList.add("in"); }, i * 90);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    faders.forEach(function (el) { io.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add("in"); });
  }

  // Subtle hero parallax (desktop, motion-safe only)
  var heroImg = document.querySelector(".hero-bg img");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroImg && !reduce && window.innerWidth > 900) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight) {
          heroImg.style.transform = "scale(1.04) translate3d(0," + (y * 0.16) + "px,0)";
        }
        ticking = false;
      });
    }, { passive: true });
  }

  // Card pointer glow
  document.querySelectorAll(".card.hover").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
    });
  });

  // Newsletter (demo — wire to your email provider)
  document.querySelectorAll("form.subscribe").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.getAttribute("data-success") || "Thanks — you're on the list!";
      form.innerHTML = '<p style="margin:0;color:#c9b8ff;font-weight:600">' + msg + "</p>";
    });
  });

  // ===== Pebble AI gallery: filters =====
  var chips = document.querySelectorAll(".chip[data-filter]");
  var tiles = document.querySelectorAll("#gallery .tile");
  if (chips.length && tiles.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        var n = 0;
        tiles.forEach(function (t) {
          var cats = (t.getAttribute("data-cat") || "").split(/\s+/);
          var show = f === "all" || cats.indexOf(f) !== -1;
          t.classList.toggle("is-hidden", !show);
          if (show) { t.style.animation = "none"; void t.offsetWidth; t.style.animation = ""; t.style.animationDelay = (n * 40) + "ms"; n++; }
        });
      });
    });
  }

  // ===== Pebble AI gallery: lightbox =====
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = document.getElementById("lb-img");
    var lbCap = document.getElementById("lb-cap");
    var openLb = function (src, alt, cap) {
      lbImg.src = src; lbImg.alt = alt || ""; lbCap.textContent = cap || "";
      lb.classList.add("open"); document.body.style.overflow = "hidden";
    };
    var closeLb = function () {
      lb.classList.remove("open"); document.body.style.overflow = "";
      setTimeout(function () { lbImg.src = ""; }, 200);
    };
    document.querySelectorAll("[data-lightbox]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var img = a.querySelector("img");
        var tile = a.closest(".tile");
        var h3 = tile && tile.querySelector("h3");
        openLb(a.getAttribute("href"), img && img.alt, h3 ? h3.textContent.trim() : "");
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLb();
    });
  }

  // ===== Pebble AI gallery: copy prompt =====
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.parentElement.querySelector(".tile-prompt");
      if (!box) return;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(box.textContent.trim()).then(done, done);
      } else {
        var r = document.createRange(); r.selectNodeContents(box);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand("copy"); } catch (e) {}
        s.removeAllRanges(); done();
      }
    });
  });

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
