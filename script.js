(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var menuButton = document.querySelector(".menu-toggle");
  var navLinks = document.querySelectorAll(".site-nav a");
  var progressBar = document.getElementById("progressBar");

  /* ---------- Header & progress ---------- */
  function onScroll() {
    var y = window.scrollY || 0;
    header.classList.toggle("scrolled", y > 16);
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? y / max : 0;
    progressBar.style.transform = "scaleX(" + ratio + ")";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  menuButton.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("zh-CN");
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("zh-CN");
    }
    requestAnimationFrame(step);
  }
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-count]").forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ---------- Course tabs ---------- */
  var tabs = document.querySelectorAll(".course-tab");
  var panels = document.querySelectorAll(".course-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var key = tab.getAttribute("data-course");
      panels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-panel") === key);
      });
    });
  });

  /* ---------- Support counter ---------- */
  var supportCount = 68;
  var supportBtn = document.getElementById("supportBtn");
  var supportFill = document.getElementById("supportFill");
  var supportPercent = document.getElementById("supportPercent");
  var supportNum = document.getElementById("supportCount");
  supportBtn.addEventListener("click", function () {
    supportCount += 1;
    var pct = Math.min(100, supportCount);
    supportNum.textContent = supportCount;
    supportPercent.textContent = pct + "%";
    supportFill.style.width = pct + "%";
    supportFill.setAttribute("aria-valuenow", pct);
    supportBtn.classList.add("pulse-once");
    window.setTimeout(function () {
      supportBtn.classList.remove("pulse-once");
    }, 400);
  });

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var img = galleryItems[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = galleryItems[currentIndex].getAttribute("data-caption") || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function moveLightbox(dir) {
    openLightbox(currentIndex + dir);
  }
  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
      openLightbox(index);
    });
  });
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", function () { moveLightbox(-1); });
  document.getElementById("lightboxNext").addEventListener("click", function () { moveLightbox(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });

  /* ---------- Testimonial carousel ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".voice-slide"));
  var dotsWrap = document.querySelector(".carousel-dots");
  var activeSlide = 0;
  var autoTimer = null;

  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "切换到第 " + (i + 1) + " 条感言");
    dot.addEventListener("click", function () { goToSlide(i); restartAuto(); });
    dotsWrap.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);

  function goToSlide(i) {
    activeSlide = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      s.classList.toggle("is-active", idx === activeSlide);
    });
    dots.forEach(function (d, idx) {
      d.classList.toggle("is-active", idx === activeSlide);
    });
  }
  function restartAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () { goToSlide(activeSlide + 1); }, 5200);
  }
  document.querySelectorAll(".carousel-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      goToSlide(activeSlide + parseInt(btn.getAttribute("data-dir"), 10));
      restartAuto();
    });
  });
  goToSlide(0);
  restartAuto();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-question").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.parentElement;
      var answer = item.querySelector(".faq-answer");
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
      answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- Join form ---------- */
  var form = document.getElementById("joinForm");
  var formNote = document.getElementById("formNote");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var btn = form.querySelector("button[type=submit]");
    var original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = "提交成功，感谢你！ <span>✓</span>";
    formNote.textContent = "演示表单：信息已收到（不会真实发送）。我们会尽快与你联系。";
    window.setTimeout(function () {
      btn.disabled = false;
      btn.innerHTML = original;
      form.reset();
      formNote.textContent = "这是演示表单，提交后不会发送真实信息。";
    }, 3200);
  });

  /* ---------- Back to top ---------- */
  var backTop = document.getElementById("backTop");
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
