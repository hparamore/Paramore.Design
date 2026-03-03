/* ==========================================================================
   Paramore.Design — Main JavaScript
   Nav scroll behavior, mobile menu, dot grid effects, easter eggs
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

    // Show overlay
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

    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }


  /* ---------- Dot grid cursor glow (desktop only) ---------- */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      // Smooth lerp for slight trailing feel
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      const mask = `radial-gradient(350px circle at ${glowX}px ${glowY}px, black, transparent 70%)`;
      glow.style.webkitMaskImage = mask;
      glow.style.maskImage = mask;
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }


  /* ---------- Dot grid shine sweep ---------- */
  const shine = document.createElement('div');
  shine.className = 'dot-shine';
  document.body.appendChild(shine);


  /* ---------- Console easter egg 🔥 ---------- */
  console.log(
    '%c🔥 Paramore.Design',
    'color: #FF6B00; font-size: 20px; font-weight: bold; padding: 10px 0;'
  );
  console.log(
    '%cBuilt with craft, not with templates.\n' +
    'You check the console? We should talk.\n\n' +
    '→ hunter@paramore.design',
    'color: #AAAAAA; font-size: 13px; line-height: 1.8; padding-bottom: 10px;'
  );

})();
