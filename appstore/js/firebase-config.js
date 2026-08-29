/* ============================================================
   PLUG — Firebase configuration
   The store works WITHOUT this: submissions fall back to
   generating a catalog-entry JSON for manual review.

   To go live:
   1. Follow FIREBASE.md (one-time setup, ~10 minutes)
   2. Paste your web app config from the Firebase console below
   3. Flip enabled to true
   ============================================================ */

window.FIREBASE_CONFIG = {
  enabled: false,

  // Firebase console → Project settings → General → Your apps → Web app → Config
  config: {
    apiKey: "PASTE_ME",
    authDomain: "PASTE_ME.firebaseapp.com",
    projectId: "PASTE_ME",
    storageBucket: "PASTE_ME.appspot.com",
    messagingSenderId: "PASTE_ME",
    appId: "PASTE_ME",
  },

  // Emails allowed to use admin.html. This only controls the admin UI;
  // real enforcement lives in firestore.rules — keep both lists in sync.
  adminEmails: ["you@example.com"],
};
