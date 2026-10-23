/*
 * GoatCounter page-view analytics for paramore.design (no cookies, no personal data).
 *
 * Loaded on every page: Base.astro covers the Astro pages; the standalone pages in public/
 * and the Lehi concept page include this file directly.
 *
 * Off until GOATCOUNTER_CODE is set to the site code from goatcounter.com
 * (the "xyz" in https://xyz.goatcounter.com).
 *
 * Skip your own visits: open any page with #toggle-goatcounter on the end
 * (e.g. paramore.design/#toggle-goatcounter) once in each browser you use.
 * Do the same again to turn counting back on for that browser.
 */
(function () {
  var GOATCOUNTER_CODE = '';
  var SKIP_KEY = 'skipgc';

  var storage;
  try { storage = window.localStorage; } catch (e) { storage = null; }

  if (window.location.hash === '#toggle-goatcounter' && storage) {
    if (storage.getItem(SKIP_KEY) === 't') {
      storage.removeItem(SKIP_KEY);
      alert('GoatCounter: your visits in this browser will be counted again.');
    } else {
      storage.setItem(SKIP_KEY, 't');
      alert('GoatCounter: your visits in this browser will no longer be counted.');
    }
  }

  if (!GOATCOUNTER_CODE) return;
  if (storage && storage.getItem(SKIP_KEY) === 't') return;
  // Local dev and previews shouldn't count as visits
  if (!/(^|\.)paramore\.design$/.test(window.location.hostname)) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
  document.head.appendChild(s);
})();
