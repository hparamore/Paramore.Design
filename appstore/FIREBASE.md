# Going Live on Firebase

One-time setup, roughly 10 minutes. When you're done: the Submit page writes
real submissions to a review queue, `admin.html` is your moderation dashboard,
and approved apps appear in the store automatically under **From the
Community** — no redeploys needed to publish an app.

Until you do this, nothing breaks: the store runs fully static and the Submit
page falls back to generating a catalog-entry JSON for manual review.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project**
   (e.g. `plug-store`). Analytics: off is fine.
2. In the project: **Build → Firestore Database → Create database** →
   Start in **production mode** (our rules file replaces the defaults) →
   pick a region near you.
3. **Build → Authentication → Get started → Sign-in method** → enable
   **Google**. (This is only for you, the admin — submitters don't sign in.)
4. **Project settings (gear) → General → Your apps → Web (`</>`)** →
   register an app (no hosting needed yet) → copy the `firebaseConfig` object.

## 2. Wire up the code

1. Paste that config into `js/firebase-config.js`, set `enabled: true`,
   and put your Google account email in `adminEmails`.
2. Put the **same email** in the admin list inside `firestore.rules`
   (the rules are the real enforcement; the JS list only gates the UI).

## 3. Deploy the rules

```bash
npm install -g firebase-tools
firebase login
cd appstore
# put your project id in .firebaserc first, then:
firebase deploy --only firestore:rules
```

## 4. Host it (pick one)

**Option A — Firebase Hosting** (free tier, custom domains, one command):
```bash
cd appstore
firebase deploy            # rules + hosting together
# → https://YOUR-PROJECT-ID.web.app
```

**Option B — anywhere static** (GitHub Pages, Netlify, your own server):
just upload the `appstore/` folder. Firestore is reached client-side, so
hosting and backend are independent. If you host outside Firebase, add your
domain under **Authentication → Settings → Authorized domains** so the
admin sign-in popup works.

## 5. Use it

- Makers submit via the **Submit** tab → lands in Firestore as `pending`.
- You open **`/admin.html`**, sign in with Google, and Approve / Reject /
  Delete. The queue updates live.
- Approved apps show up in the store for everyone on next load — sanitized
  client-side (URLs, gradients, emoji are whitelisted) on top of the
  server-side field validation in the rules.

## How it's secured

- `firestore.rules` allows anyone to **create** only a well-formed `pending`
  submission (typed fields, length caps, http(s) URL, no extra keys).
- Only `approved` docs are publicly readable; the pending/rejected queue is
  admin-only.
- Approve/reject/delete require a signed-in, email-verified admin account.
- The client additionally sanitizes everything before render (see
  `sanitizeApp` in `js/backend.js`) so a malicious gradient/URL/emoji can't
  inject markup even if it somehow got approved.

## Costs

The free Spark plan covers this comfortably (Firestore: 50K reads,
20K writes per day). Each visitor load costs ~1 read per approved community
app. If the store gets big, cache the approved list in a single document or
move reads behind Hosting CDN — a problem you'll be happy to have.

## Later / optional

- **Spam throttling**: Firestore App Check (reCAPTCHA v3) is a checkbox in
  the console + one snippet, worth adding before promoting the store widely.
- **Email on new submission**: the "Trigger Email" Firebase extension, or a
  tiny Cloud Function on `submissions` create.
- **Screenshots for community apps**: Firebase Storage upload in the submit
  form (rules-capped file sizes) — currently community apps get procedural
  placeholder screenshots.
