/* ==========================================================================
   Paramore.Design — Main JavaScript
   Nav scroll, mobile menu, canvas dot grid with glow/shine, easter egg
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
    handleScroll();
  }


  /* ---------- Mobile nav drawer ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openNav() {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';

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

    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';

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
      navLinks.classList.contains('open') ? closeNav() : openNav();
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }


  /* ==========================================================================
     Canvas Dot Grid — per-dot glow and shine
     Replaces CSS background-image dots so effects only color the dots
     themselves, not the space between them.
     ========================================================================== */

  const dotCanvas = document.createElement('canvas');
  dotCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1';
  document.body.appendChild(dotCanvas);
  const ctx = dotCanvas.getContext('2d');

  // Grid config
  const GRID = 28;
  const DOT_RADIUS = 0.8;

  // Colors
  const BASE_R = 36, BASE_G = 36, BASE_B = 36;    // #242424 (default dot)
  const GLOW_R = 255, GLOW_G = 107, GLOW_B = 0;   // #FF6B00 (accent orange)

  // Cursor glow config
  const GLOW_REACH = 200;     // radius in px
  const GLOW_POWER = 0.55;    // max blend intensity

  // Shine sweep config
  const SHINE_BAND = 180;     // width of the diagonal band in px
  const SHINE_POWER = 0.4;    // max blend intensity
  const SHINE_DELAY = 6000;   // ms before first sweep
  const SHINE_SWEEP = 2200;   // ms for sweep to cross screen
  const SHINE_IDLE = 19800;   // ms pause between sweeps
  const SHINE_TOTAL = SHINE_SWEEP + SHINE_IDLE;

  // State
  let dpr, cW, cH;
  let mX = -9999, mY = -9999;   // raw mouse
  let sX = -9999, sY = -9999;   // smoothed mouse
  let needsRedraw = true;
  let prevScrollY = -1;
  let prevSX = -9999, prevSY = -9999;
  const hasMouse = window.matchMedia('(pointer: fine)').matches;
  const shineEpoch = performance.now() + SHINE_DELAY;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    cW = window.innerWidth;
    cH = window.innerHeight;
    dotCanvas.width = cW * dpr;
    dotCanvas.height = cH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    needsRedraw = true;
  }

  resize();
  window.addEventListener('resize', resize);

  if (hasMouse) {
    document.addEventListener('mousemove', function (e) {
      mX = e.clientX;
      mY = e.clientY;
    });
  }

  // Pre-compute the default fill style
  var defaultFill = '#242424';

  function frame(now) {
    // Smooth mouse position (slight trailing lag)
    if (hasMouse) {
      sX += (mX - sX) * 0.12;
      sY += (mY - sY) * 0.12;
    }

    // Shine progress: -1 = inactive, 0–1 = sweeping
    var shineProg = -1;
    var elapsed = now - shineEpoch;
    if (elapsed >= 0) {
      var inCycle = elapsed % SHINE_TOTAL;
      if (inCycle < SHINE_SWEEP) {
        shineProg = inCycle / SHINE_SWEEP;
      }
    }

    // Only redraw if something visual changed
    var scrollY = window.scrollY || 0;
    var scrollChanged = scrollY !== prevScrollY;
    var mouseMoving = hasMouse && (Math.abs(sX - prevSX) > 0.3 || Math.abs(sY - prevSY) > 0.3);
    var shineActive = shineProg >= 0;

    if (!needsRedraw && !scrollChanged && !mouseMoving && !shineActive) {
      requestAnimationFrame(frame);
      return;
    }

    prevScrollY = scrollY;
    prevSX = sX;
    prevSY = sY;
    needsRedraw = false;

    // Clear
    ctx.clearRect(0, 0, cW, cH);

    // Grid offset for scroll (dots move with page, matching original CSS behavior)
    var oY = -(scrollY % GRID);

    var cols = Math.ceil(cW / GRID) + 1;
    var rows = Math.ceil(cH / GRID) + 1;
    var diagLen = cW + cH;

    // Pre-calculate shine position
    var shinePos = -99999;
    if (shineActive) {
      shinePos = shineProg * (diagLen + SHINE_BAND * 2) - SHINE_BAND;
    }

    for (var r = 0; r < rows; r++) {
      var y = oY + r * GRID;

      for (var c = 0; c < cols; c++) {
        var x = c * GRID;
        var t = 0;

        // Cursor glow — quadratic falloff for soft edge
        if (hasMouse && sX > -9000) {
          var dx = x - sX;
          var dy = y - sY;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < GLOW_REACH) {
            var f = 1 - d / GLOW_REACH;
            t += f * f * GLOW_POWER;
          }
        }

        // Shine sweep — diagonal band
        if (shineActive) {
          var sd = Math.abs(x + y - shinePos);
          if (sd < SHINE_BAND) {
            var sf = 1 - sd / SHINE_BAND;
            t += sf * sf * SHINE_POWER;
          }
        }

        // Set dot color
        if (t > 0.01) {
          if (t > 1) t = 1;
          var cr = BASE_R + (GLOW_R - BASE_R) * t | 0;
          var cg = BASE_G + (GLOW_G - BASE_G) * t | 0;
          var cb = BASE_B + (GLOW_B - BASE_B) * t | 0;
          ctx.fillStyle = 'rgb(' + cr + ',' + cg + ',' + cb + ')';
        } else {
          ctx.fillStyle = defaultFill;
        }

        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS, 0, 6.283);
        ctx.fill();
      }
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);


  /* ---------- Console Easter Egg 🔥 ---------- */
  var f = 'font-size:14px;line-height:1.15;';
  var fire = f + 'color:#FF6B00;';
  var logs = f + 'color:#8B4513;';
  console.log(
    '%c⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⢱⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡄⠀⠀⡀⠀⠀⠀⢸⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⠇⠀⠀⣷⣦⣤⣴⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⢠⣾⣷⡀⠀⠀⣸⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣷⣿⣿⣿⡟⢿⠿⠋⣿⣿⠀⠀⠀⠀⠰⣄⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⣿⣿⣦⡀⠀⠀⢀⣿⣧⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⢹⣿⣿⣿⠙⠻⠟⠋⠁⠀⠀⠀⠀⢿⣿⣿⣿⣶⣶⣿⣿⣿⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠈⣿⣿⣿⡆⠀⠀⢀⣠⡤⠀⠀⠀⠈⠻⣿⡿⣿⣿⣿⣿⡟⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠘⠟⠋⣁⣤⡾⢟⣩⣴⣶⣆⠀⠀⠀⠀⢠⣿⣿⣿⠟⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⢀⣠⣴⣿⣿⣿⣿⠟⢉⣁⣀⣉⠀⢹⣶⣶⣤⣄⣈⡁⠀⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⢸⣿⣿⣿⣿⢿⣿⠇⢰⡟⣫⣦⠙⢷⡀⣿⣿⣯⣍⣛⠛⠋⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠛⢋⣡⡾⠟⠋⠀⠸⣧⣙⡟⢁⡾⠁⠿⢿⣿⣿⣭⡉⠁⠀⠀⠀⠀\n' +
    '%c⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀⠈⠙⠛⠋⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀',
    fire,  fire,  fire,  fire,   // flame tips
    fire,  fire,  fire,  fire,   // flame body
    fire,  fire,  fire,          // lower flame / embers
    logs,  logs,  logs,  logs    // logs
  );
  console.log(
    '%c  Paramore.Design',
    'color: #FF6B00; font-size: 18px; font-weight: bold; font-family: monospace; padding: 8px 0 4px;'
  );
  console.log(
    '%cBuilt with craft, not with templates.\n' +
    'You check the console? We should talk.\n\n' +
    '→ hparamore@gmail.com',
    'color: #AAAAAA; font-size: 13px; line-height: 1.8; padding-bottom: 10px;'
  );

})();
