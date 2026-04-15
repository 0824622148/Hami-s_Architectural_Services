/* ============================================================
   HAMI'S ARCHITECTURAL SERVICES — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Header ─────────────────────────────────────── */
  const header = document.querySelector('.site-header');

  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once immediately

  /* ── 2. Mobile Nav Toggle ─────────────────────────────────── */
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileMenu  = document.querySelector('.nav__mobile-menu');
  const mobileClose = document.querySelector('.nav__mobile-close');
  const nav         = document.querySelector('.nav');

  function openMenu() {
    if (!nav || !mobileMenu) return;
    nav.classList.add('nav--open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!nav || !mobileMenu) return;
    nav.classList.remove('nav--open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // Close on mobile link click
  document.querySelectorAll('.nav__mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── 3. Active Nav Link ───────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var hrefPage = href.split('/').pop().split('#')[0];
    if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 4. Smooth Scroll for In-Page Anchors ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = header ? header.offsetHeight + 16 : 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── 5. Scroll Fade-In (IntersectionObserver) ─────────────── */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback for older browsers
    fadeEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── 6. Contact Form Success Message ─────────────────────── */
  // Formspree redirects back to the same URL with ?success appended.
  // We detect that param and show the success message.
  if (window.location.search.indexOf('success') !== -1) {
    var successMsg = document.querySelector('.form-success');
    var form       = document.querySelector('.contact-form');
    if (successMsg) successMsg.classList.add('show');
    if (form)       form.style.display = 'none';
  }

  /* ── 7. Current Year in Footer ───────────────────────────── */
  var yearEl = document.querySelector('.footer__year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
