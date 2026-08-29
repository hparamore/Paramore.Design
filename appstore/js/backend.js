/* ============================================================
   PLUG — Firebase backend glue
   Loads the Firebase SDK only when FIREBASE_CONFIG.enabled is
   true, and degrades gracefully when it isn't (or when the SDK
   can't load / the network is down): every call resolves with a
   harmless fallback instead of throwing.

   Data model (Firestore):
     submissions/{autoId} = {
       ...catalog entry fields...,
       status: "pending" | "approved" | "rejected",
       submittedAt: serverTimestamp,
       reviewedAt?: serverTimestamp,
     }
   Approved submissions are merged into the storefront at load.
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.FIREBASE_CONFIG || {};
  const SDK_VERSION = "10.14.1";
  let initPromise = null;

  function enabled() {
    return !!(
      CFG.enabled &&
      CFG.config &&
      CFG.config.projectId &&
      CFG.config.projectId !== "PASTE_ME"
    );
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("failed to load " + src));
      document.head.appendChild(s);
    });
  }

  function withTimeout(promise, ms, fallback) {
    return Promise.race([
      promise,
      new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
    ]);
  }

  /* Initialize app + Firestore (and optionally Auth for admin.html).
     Resolves to the firestore instance, or null on any failure. */
  function init(needAuth) {
    if (!enabled()) return Promise.resolve(null);
    if (initPromise) return initPromise;
    initPromise = (async () => {
      const base = "https://www.gstatic.com/firebasejs/" + SDK_VERSION + "/";
      await loadScript(base + "firebase-app-compat.js");
      await loadScript(base + "firebase-firestore-compat.js");
      if (needAuth) await loadScript(base + "firebase-auth-compat.js");
      window.firebase.initializeApp(CFG.config);
      return window.firebase.firestore();
    })().catch((e) => {
      console.warn("[Plug] Firebase unavailable:", e && e.message);
      initPromise = null;
      return null;
    });
    return initPromise;
  }

  /* ---------- sanitization ----------
     Community data renders inside the storefront, so everything
     that ends up in an attribute/style/URL is whitelisted here.
     (Text nodes are additionally HTML-escaped at render time.) */
  const GRAD_RE = /^linear-gradient\(\s*\d{1,3}deg\s*(,\s*#[0-9a-fA-F]{3,8}\s*){2,4}\)$/;
  const SHOT_VARIANTS = ["feed", "dashboard", "chat", "list", "game", "profile", "editor", "cards", "grid", "stats"];

  function cleanText(v, max) {
    return String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
  }
  function cleanUrl(v) {
    const s = String(v == null ? "" : v).trim().slice(0, 300);
    return /^https:\/\/[^\s"'<>]+$/i.test(s) || /^http:\/\/[^\s"'<>]+$/i.test(s) ? s : "#";
  }
  function cleanEmoji(v) {
    const s = String(v == null ? "" : v).trim();
    return s && s.length <= 8 && !/[<>&"'`]/.test(s) ? s : "📦";
  }
  function cleanGradient(v) {
    return GRAD_RE.test(String(v == null ? "" : v).trim()) ? String(v).trim() : "linear-gradient(135deg,#636fa4,#2c3357)";
  }

  /* Normalize an arbitrary submission document into a safe,
     render-ready catalog entry. Returns null if hopeless. */
  function sanitizeApp(raw, docId, existingIds, categories) {
    if (!raw || typeof raw !== "object") return null;
    const name = cleanText(raw.name, 30);
    if (!name) return null;

    let id = cleanText(raw.id, 40).toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!id) id = "app-" + String(docId).slice(0, 8);
    if (existingIds.has(id)) id = id + "-" + String(docId).slice(0, 6);

    const catIds = categories.map((c) => c.id);
    const icon = raw.icon && typeof raw.icon === "object" ? raw.icon : {};
    const shots = Array.isArray(raw.shots) ? raw.shots.filter((s) => SHOT_VARIANTS.includes(s)).slice(0, 3) : [];
    const desc = (Array.isArray(raw.description) ? raw.description : [raw.description])
      .map((p) => cleanText(p, 600))
      .filter(Boolean)
      .slice(0, 5);

    return {
      id,
      docId: String(docId),
      community: true,
      name,
      subtitle: cleanText(raw.subtitle, 40) || "A community web app",
      developer: cleanText(raw.developer, 30) || "Independent maker",
      category: catIds.includes(raw.category) ? raw.category : "tools",
      url: cleanUrl(raw.url),
      icon: { emoji: cleanEmoji(icon.emoji), bg: cleanGradient(icon.bg) },
      theme: ["#8ea0ff", "#0c1024"],
      shots: shots.length ? shots : ["feed", "list", "dashboard"],
      rating: 5.0,
      ratingCount: 1,
      ratingDist: [100, 0, 0, 0, 0],
      age: "4+",
      description: desc.length ? desc : ["No description provided yet."],
    };
  }

  /* ---------- public API ---------- */

  /* Create a pending submission. Resolves {ok, id?, offline?, error?}. */
  async function submitApp(entry) {
    const db = await withTimeout(init(false), 8000, null);
    if (!db) return { ok: false, offline: true };
    try {
      const doc = await withTimeout(
        db.collection("submissions").add({
          ...entry,
          status: "pending",
          submittedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
        }),
        8000,
        null
      );
      return doc ? { ok: true, id: doc.id } : { ok: false, offline: true };
    } catch (e) {
      return { ok: false, error: (e && e.message) || "unknown error" };
    }
  }

  /* Fetch approved community apps, sanitized and ready to merge.
     Never rejects; resolves [] on any problem. */
  async function fetchApproved(existingIds, categories) {
    const db = await withTimeout(init(false), 6000, null);
    if (!db) return [];
    try {
      const snap = await withTimeout(
        db.collection("submissions").where("status", "==", "approved").limit(100).get(),
        6000,
        null
      );
      if (!snap) return [];
      const ids = new Set(existingIds);
      const out = [];
      snap.docs
        .sort((a, b) => {
          const ta = a.data().submittedAt, tb = b.data().submittedAt;
          return (tb && tb.seconds ? tb.seconds : 0) - (ta && ta.seconds ? ta.seconds : 0);
        })
        .forEach((d) => {
          const app = sanitizeApp(d.data(), d.id, ids, categories);
          if (app) { ids.add(app.id); out.push(app); }
        });
      return out;
    } catch (e) {
      console.warn("[Plug] fetchApproved failed:", e && e.message);
      return [];
    }
  }

  window.Backend = { enabled, init, submitApp, fetchApproved, sanitizeApp };
})();
