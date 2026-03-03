/* ==========================================================================
   Paramore.Design — Main JavaScript
   Nav scroll behavior, mobile menu, and minimal interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Nav scroll effect ---------- */
  const nav = document.getElementById('nav');

  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
  }


  /* ---------- Mobile nav drawer ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openNav() {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';

    // Show overlay (slight delay so display:block is set before opacity transition)
    if (navOverlay) {
      navOverlay.style.display = 'block';
      requestAnimationFrame(() => {
        navOverlay.classList.add('visible');
      });
    }
  }

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Reset hamburger
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';

    // Hide overlay
    if (navOverlay) {
      navOverlay.classList.remove('visible');
      // Wait for fade-out transition before hiding
      setTimeout(() => {
        if (!navOverlay.classList.contains('visible')) {
          navOverlay.style.display = '';
        }
      }, 300);
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close when overlay is tapped
    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    // Close when a link is clicked
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

})();
