/* ============================================================
   PLUG — the web app store
   SPA router + renderers. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  const S = window.STORE;
  const view = document.getElementById("view");
  const mini = document.getElementById("miniheader");
  const tabbar = document.getElementById("tabbar");

  /* ---------------- helpers ---------------- */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const app = (id) => S.apps.find((a) => a.id === id);
  const cat = (id) => S.categories.find((c) => c.id === id);
  const fmtCount = (n) =>
    n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(n);

  function stars(value, size, blue) {
    const pct = Math.max(0, Math.min(100, (value / 5) * 100));
    return `<span class="stars${blue ? " blue" : ""}" style="font-size:${size}px" aria-label="${value} out of 5">
      <span aria-hidden="true">★★★★★</span>
      <span class="on" aria-hidden="true" style="width:${pct}%">★★★★★</span>
    </span>`;
  }

  function icon(a, extra) {
    return `<div class="appicon ${extra || ""}" style="background:${a.icon.bg}"><span>${a.icon.emoji}</span></div>`;
  }

  function getBtn(a, solid, withNote) {
    const isLive = a.url && a.url !== "#";
    return `<div>
      <button class="getbtn ${solid ? "solid" : ""}" data-open="${esc(a.url)}">${isLive ? "OPEN" : "GET"}</button>
      ${withNote ? `<div class="getnote">Web App</div>` : ""}
    </div>`;
  }

  function appRow(a, opts = {}) {
    return `<div class="approw" data-app="${a.id}">
      ${opts.rank ? `<div class="rank">${opts.rank}</div>` : ""}
      ${icon(a)}
      <div class="meta">
        <div class="n">${esc(a.name)}</div>
        <div class="s">${esc(a.subtitle)}</div>
        ${opts.rating ? `<div class="r">${stars(a.rating, 10)} <span>${fmtCount(a.ratingCount)}</span></div>` : ""}
      </div>
      ${getBtn(a)}
    </div>`;
  }

  /* Horizontal pager of stacked rows, App Store style (3 per page) */
  function pagedRows(apps, opts = {}) {
    const per = opts.per || 3;
    const pages = [];
    for (let i = 0; i < apps.length; i += per) pages.push(apps.slice(i, i + per));
    return `<div class="pagedrows hscroll">
      ${pages
        .map(
          (pg, pi) =>
            `<div class="rowpage">${pg
              .map((id, ri) =>
                appRow(app(id), {
                  rank: opts.ranked ? pi * per + ri + 1 : null,
                  rating: opts.rating,
                })
              )
              .join("")}</div>`
        )
        .join("")}
    </div>`;
  }

  function sechead(title, sub, seeAllHash, noRule) {
    return `<div class="sechead ${noRule ? "no-rule" : ""}">
      <div><h2>${esc(title)}</h2>${sub ? `<div class="sub">${esc(sub)}</div>` : ""}</div>
      ${seeAllHash ? `<a class="seeall" href="${seeAllHash}">See All</a>` : ""}
    </div>`;
  }

  function todayDate() {
    return new Date()
      .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
      .toUpperCase();
  }

  function pagehead(title, opts = {}) {
    return `<header class="pagehead">
      <div>
        ${opts.date ? `<div class="date">${todayDate()}</div>` : ""}
        <h1>${esc(title)}</h1>
      </div>
      ${opts.avatar ? `<div class="avatar">HP</div>` : ""}
    </header>`;
  }

  function footerNote() {
    return `<div class="footer-note">
      ${esc(S.name)} — ${esc(S.tagline)}.<br>
      Every app here is a link to a live web app. Nothing to install.<br>
      <a href="#/submit">Submit your app&nbsp;→</a>
    </div>`;
  }

  /* ---------------- screenshot mocks ---------------- */
  const SHOT_TPL = {
    feed: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="card hl"><div class="rowline"><div class="dot"></div><div class="bar"></div></div><div class="bar"></div></div>
      <div class="card"><div class="rowline"><div class="dot"></div><div class="bar"></div></div><div class="bar"></div></div>
      <div class="card"><div class="rowline"><div class="dot"></div><div class="bar"></div></div><div class="bar"></div></div>
      <div class="card"><div class="rowline"><div class="dot"></div><div class="bar"></div></div><div class="bar"></div></div>
      <div class="card"><div class="rowline"><div class="dot"></div><div class="bar"></div></div><div class="bar"></div></div>`,
    dashboard: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="bignum">128</div>
      <div class="chartrow"><i style="height:34%"></i><i style="height:58%"></i><i style="height:42%"></i><i style="height:88%"></i><i style="height:64%"></i><i style="height:100%"></i><i style="height:52%"></i></div>
      <div class="card"><div class="bar"></div><div class="bar"></div></div>`,
    chat: `<div class="bar b-title"></div>
      <div class="bubble them"><div class="bar"></div><div class="bar" style="width:70px"></div></div>
      <div class="bubble me"><div class="bar"></div></div>
      <div class="bubble them"><div class="bar" style="width:130px"></div><div class="bar" style="width:90px"></div></div>
      <div class="bubble me"><div class="bar" style="width:80px"></div><div class="bar" style="width:120px"></div></div>
      <div class="bubble them"><div class="bar" style="width:100px"></div></div>
      <div class="bubble me"><div class="bar" style="width:126px"></div><div class="bar" style="width:70px"></div></div>
      <div class="card" style="margin-top:auto"><div class="bar" style="width:60%"></div></div>`,
    list: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="card"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>
      <div class="card hl"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>
      <div class="card"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>
      <div class="card"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>
      <div class="card"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>
      <div class="card"><div class="rowline"><div class="sq"></div><div class="bar"></div></div></div>`,
    game: `<div class="center"><div class="bar b-title" style="width:44%"></div></div>
      <div class="gamecircle"></div>
      <div class="center" style="margin-top:14px"><div class="bignum" style="font-size:30px">2,480</div><div class="bar" style="width:80px;height:7px"></div></div>
      <div class="card" style="margin-top:auto"><div class="rowline"><div class="dot"></div><div class="bar"></div></div></div>`,
    profile: `<div class="avatarbig"></div>
      <div class="center"><div class="bar b-title" style="width:50%"></div><div class="bar" style="width:34%;height:7px"></div></div>
      <div class="tilegrid" style="margin-top:10px"><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
    editor: `<div class="toolbar"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="canvas"></div>
      <div class="toolbar" style="justify-content:center"><i></i><i></i><i></i></div>`,
    cards: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="stackcard"><div class="dot"></div><div class="bar" style="width:75%"></div><div class="bar" style="width:50%"></div></div>
      <div class="card" style="margin-top:22px"><div class="bar"></div><div class="bar"></div></div>`,
    grid: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="tilegrid"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>`,
    stats: `<div class="bar b-title"></div><div class="bar b-sub"></div>
      <div class="bignum" style="font-size:34px">+64%</div>
      <svg class="spark" viewBox="0 0 200 74" preserveAspectRatio="none">
        <polygon points="0,74 0,58 30,50 60,60 90,34 120,40 150,18 180,26 200,8 200,74"></polygon>
        <polyline points="0,58 30,50 60,60 90,34 120,40 150,18 180,26 200,8"></polyline>
      </svg>
      <div class="card"><div class="bar"></div><div class="bar"></div></div>
      <div class="ring"></div>`,
  };

  function shots(a) {
    // Real screenshots (image paths) take precedence over procedural mocks
    if (a.screenshots && a.screenshots.length) {
      return `<div class="shots hscroll">
        ${a.screenshots
          .map((src) => `<div class="shot imgshot"><img src="${esc(src)}" alt="${esc(a.name)} screenshot" loading="lazy"></div>`)
          .join("")}
      </div>`;
    }
    return `<div class="shots hscroll">
      ${a.shots
        .map(
          (v) => `<div class="shot" style="--a:${a.theme[0]};--b:${a.theme[1]}">
            ${SHOT_TPL[v] || SHOT_TPL.feed}
            <div class="shotlabel">Preview</div>
          </div>`
        )
        .join("")}
    </div>`;
  }

  /* ---------------- Today ---------------- */
  function renderToday() {
    const cards = S.today
      .map((c) => {
        if (c.type === "hero") {
          const a = app(c.app);
          return `<article class="tcard" data-app="${a.id}">
            <div class="tcard-cover" style="background:${a.icon.bg};color:#fff">
              <div class="kicker">${esc(c.kicker)}</div>
              <h3>${esc(c.title)}</h3>
              <div class="blurb">${esc(c.blurb)}</div>
              <div class="bigemoji">${a.icon.emoji}</div>
            </div>
            <div class="tcard-foot">
              ${icon(a)}
              <div class="meta"><div class="n">${esc(a.name)}</div><div class="s">${esc(a.subtitle)}</div></div>
              ${getBtn(a, false, true)}
            </div>
          </article>`;
        }
        // list card
        return `<article class="tcard">
          <div class="tcard-list">
            <div class="kicker">${esc(c.kicker)}</div>
            <h3>${esc(c.title)}</h3>
            <div class="blurb">${esc(c.blurb)}</div>
            <div class="rows">${c.apps.map((id) => appRow(app(id))).join("")}</div>
          </div>
        </article>`;
      })
      .join("");

    return `<div class="page" data-title="Today">
      ${pagehead("Today", { date: true, avatar: true })}
      <div class="today-cards">${cards}</div>
      ${footerNote()}
    </div>`;
  }

  /* ---------------- Apps / Games tabs ---------------- */
  function banners(ids) {
    return `<div class="banners hscroll">
      ${ids
        .map((id) => {
          const a = app(id);
          return `<div class="banner" data-app="${a.id}">
            <div class="art" style="background:${a.icon.bg};color:#fff">
              <div class="bigemoji">${a.icon.emoji}</div>
              <div class="kicker">FEATURED</div>
              <h3>${esc(a.name)}</h3>
            </div>
            <div class="foot">
              ${icon(a)}
              <div class="meta"><div class="n">${esc(a.name)}</div><div class="s">${esc(a.subtitle)}</div></div>
              ${getBtn(a)}
            </div>
          </div>`;
        })
        .join("")}
    </div>`;
  }

  function renderStoreTab(title, cfg) {
    const rows = cfg.rows
      .map(
        (r) =>
          sechead(r.title, r.subtitle, `#/section/${encodeURIComponent(r.title)}`) +
          pagedRows(r.apps)
      )
      .join("");
    return `<div class="page" data-title="${esc(title)}">
      ${pagehead(title, { avatar: true })}
      ${banners(cfg.banners)}
      ${rows}
      ${sechead(cfg.chart.title, "The most-loved on " + S.name, `#/section/${encodeURIComponent(cfg.chart.title)}`)}
      ${pagedRows(cfg.chart.apps, { ranked: true, rating: true })}
      ${footerNote()}
    </div>`;
  }

  /* ---------------- See All section ---------------- */
  function renderSection(name) {
    const all = [
      ...S.appsTab.rows,
      ...S.gamesTab.rows,
      { title: S.appsTab.chart.title, apps: S.appsTab.chart.apps, ranked: true },
      { title: S.gamesTab.chart.title, apps: S.gamesTab.chart.apps, ranked: true },
    ];
    let sec = all.find((r) => r.title === name);
    const c = cat(name);
    let title = name, appIds;
    if (sec) {
      appIds = sec.apps;
    } else if (c) {
      title = c.name;
      appIds = S.apps.filter((a) => a.category === c.id).map((a) => a.id);
    } else {
      appIds = S.apps.map((a) => a.id);
      title = "All Apps";
    }
    return `<div class="page detail" data-title="${esc(title)}">
      ${backbar(state.backLabel || "Back")}
      ${pagehead(title)}
      <div class="resultlist">
        ${appIds.map((id, i) => appRow(app(id), { rank: sec && sec.ranked ? i + 1 : null, rating: true })).join("")}
      </div>
      ${footerNote()}
    </div>`;
  }

  /* ---------------- Search ---------------- */
  function renderSearch() {
    return `<div class="page" data-title="Search">
      ${pagehead("Search", { avatar: true })}
      <div class="searchwrap">
        <div class="searchbox">
          <svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.8"/><line x1="13" y1="13" x2="18" y2="18"/></svg>
          <input id="searchinput" type="search" placeholder="Apps, games, tools…" autocomplete="off">
        </div>
      </div>
      <div id="searchresults"></div>
      <div id="searchbrowse">
        ${sechead("Trending", null, null)}
        <div class="trend">
          ${["venture generator", "word game", "budget", "pixel art", "focus timer"]
            .map(
              (t) => `<div class="trendrow" data-q="${esc(t)}">
                <svg viewBox="0 0 16 16"><polyline points="1,11 6,6 9,9 15,3"/><polyline points="10,3 15,3 15,8"/></svg>${esc(t)}
              </div>`
            )
            .join("")}
        </div>
        ${sechead("Browse Categories", null, null)}
        <div class="catgrid">
          ${S.categories
            .map(
              (c) => `<div class="cattile" style="background:${c.bg}" data-cat="${c.id}">
                <div class="n">${esc(c.name)}</div><div class="e">${c.emoji}</div>
              </div>`
            )
            .join("")}
        </div>
      </div>
      ${footerNote()}
    </div>`;
  }

  function doSearch(q) {
    const res = document.getElementById("searchresults");
    const browse = document.getElementById("searchbrowse");
    q = q.trim().toLowerCase();
    if (!q) {
      res.innerHTML = "";
      browse.style.display = "";
      return;
    }
    browse.style.display = "none";
    const words = q.split(/\s+/);
    const hits = S.apps.filter((a) => {
      const hay = (
        a.name + " " + a.subtitle + " " + a.developer + " " +
        (cat(a.category) || {}).name + " " + a.description.join(" ")
      ).toLowerCase();
      return words.every((w) => hay.includes(w));
    });
    res.innerHTML = hits.length
      ? `<div class="resultlist">${hits.map((a) => appRow(a, { rating: true })).join("")}</div>`
      : `<div class="noresults">No results for “${esc(q)}”.<br>Try a category below — or <a href="#/submit">submit it yourself</a>.</div>`;
    if (!hits.length) browse.style.display = "";
  }

  /* ---------------- Detail page ---------------- */
  function backbar(label, a) {
    return `<div class="backbar" id="backbar">
      <button class="backbtn" data-back>
        <svg viewBox="0 0 12 20"><polyline points="10,2 3,10 10,18"/></svg>${esc(label)}
      </button>
      ${a ? `<div class="mini">${icon(a)}</div>
      <button class="getbtn solid mini-open" data-open="${esc(a.url)}">${a.url !== "#" ? "OPEN" : "GET"}</button>` : "<span></span>"}
    </div>`;
  }

  function renderDetail(id) {
    const a = app(id);
    if (!a) return `<div class="page">${backbar("Back")}<div class="noresults">App not found.</div></div>`;
    const c = cat(a.category);
    const reviews = (a.reviews && a.reviews.length ? a.reviews : S.defaultReviews);
    const related = S.apps
      .filter((x) => x.id !== a.id && (x.category === a.category || x.developer === a.developer))
      .slice(0, 6)
      .map((x) => x.id);
    const moreDev = S.apps.filter((x) => x.developer === a.developer && x.id !== a.id);

    return `<div class="page detail" data-title="${esc(a.name)}">
      ${backbar(state.backLabel || "Today", a)}

      <div class="dhead">
        ${icon(a)}
        <div class="meta">
          <h1>${esc(a.name)}</h1>
          <div class="sub">${esc(a.subtitle)}</div>
          <div class="actions">
            ${getBtn(a, true)}
            <button class="sharebtn" data-share="${a.id}" aria-label="Share">
              <svg viewBox="0 0 20 24"><path d="M10 1 v13"/><polyline points="5.5,5.5 10,1 14.5,5.5"/><path d="M4 9 H2.8 A1.8 1.8 0 0 0 1 10.8 V21.2 A1.8 1.8 0 0 0 2.8 23 H17.2 A1.8 1.8 0 0 0 19 21.2 V10.8 A1.8 1.8 0 0 0 17.2 9 H16"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="dstats hscroll">
        <div class="dstat"><div class="k">${fmtCount(a.ratingCount)} Ratings</div><div class="v">${a.rating.toFixed(1)}</div><div class="u">${stars(a.rating, 11)}</div></div>
        <div class="dstat"><div class="k">Age</div><div class="v">${a.age}</div><div class="u">Years Old</div></div>
        <div class="dstat"><div class="k">Category</div><div class="v">${c.emoji}</div><div class="u">${esc(c.name)}</div></div>
        <div class="dstat"><div class="k">Developer</div><div class="v">👤</div><div class="u">${esc(a.developer)}</div></div>
        <div class="dstat"><div class="k">Type</div><div class="v">PWA</div><div class="u">No install</div></div>
      </div>

      ${shots(a)}

      <div class="ddesc clamped" id="ddesc">${a.description.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <div class="ddev">
        <div class="dl"><div class="a">${esc(a.developer)}</div><div class="b">Developer</div></div>
        <svg width="8" height="14" viewBox="0 0 8 14" style="stroke:var(--text-3);fill:none;stroke-width:2;stroke-linecap:round"><polyline points="1,1 7,7 1,13"/></svg>
      </div>

      ${sechead("Ratings & Reviews", null, null)}
      <div class="ratingsblock">
        <div class="ratingrow">
          <div class="ratingbig"><div class="num">${a.rating.toFixed(1)}</div><div class="outof">out of 5</div></div>
          <div class="ratingbars">
            ${a.ratingDist
              .map(
                (p, i) => `<div class="rbar">
                  <span class="stars5">${"★".repeat(5 - i)}</span>
                  <div class="track"><div class="fill" style="width:${p}%"></div></div>
                </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="ratingcount">${fmtCount(a.ratingCount)} Ratings</div>
      </div>
      <div class="reviews hscroll">
        ${reviews
          .map(
            (r) => `<div class="review">
              <div class="rh"><div class="rt">${esc(r.title)}</div><div class="rd">${esc(r.date)}</div></div>
              <div class="rm">${stars(r.stars, 12)}<div class="ra">${esc(r.author)}</div></div>
              <div class="rb">${esc(r.body)}</div>
            </div>`
          )
          .join("")}
      </div>

      ${sechead("Information", null, null)}
      <div class="infolist">
        <div class="inforow"><span class="k">Developer</span><span class="v">${esc(a.developer)}</span></div>
        <div class="inforow"><span class="k">Category</span><span class="v">${esc(c.name)}</span></div>
        <div class="inforow"><span class="k">Type</span><span class="v">Progressive Web App</span></div>
        <div class="inforow"><span class="k">Size</span><span class="v">None — it's a link</span></div>
        <div class="inforow"><span class="k">Price</span><span class="v">Free</span></div>
        <div class="inforow"><span class="k">Age Rating</span><span class="v">${a.age}</span></div>
        <div class="inforow"><span class="k">Website</span><span class="v">${a.url !== "#" ? `<a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.url.replace(/^https?:\/\//, ""))}</a>` : "Coming soon"}</span></div>
      </div>

      ${moreDev.length ? sechead("More by " + a.developer, null, null) + pagedRows(moreDev.map((x) => x.id)) : ""}
      ${related.length ? sechead("You Might Also Like", null, null) + pagedRows(related) : ""}
      ${footerNote()}
    </div>`;
  }

  /* ---------------- Submit ---------------- */
  const GRADS = [
    "linear-gradient(135deg,#FF6B00,#c93900)",
    "linear-gradient(135deg,#00c6ff,#0041c9)",
    "linear-gradient(135deg,#0F9D58,#075c33)",
    "linear-gradient(135deg,#7b2ff7,#3d0a8f)",
    "linear-gradient(135deg,#ff512f,#a3125f)",
    "linear-gradient(135deg,#ffd200,#c98a00)",
    "linear-gradient(135deg,#c31432,#240b36)",
    "linear-gradient(135deg,#485563,#1c2228)",
  ];
  const EMOJIS = ["🚀", "✨", "🛠️", "🎮", "🤖", "🎨", "💸", "🫀", "💬", "🎧", "📚", "🧭"];

  function renderSubmit() {
    return `<div class="page" data-title="Submit">
      ${pagehead("Submit", { avatar: true })}
      <div class="submit-intro">
        Built something? <b>Get it on ${esc(S.name)}.</b> Your app stays hosted wherever
        it lives — we just link to it. Every submission is reviewed by a human
        before it appears in the store.
      </div>
      <form class="form" id="submitform">
        <div class="field"><label>App name</label><input name="name" required maxlength="30" placeholder="e.g. RocketNotes"></div>
        <div class="field"><label>Tagline</label><input name="subtitle" required maxlength="40" placeholder="One line. Make it count."></div>
        <div class="field"><label>App URL</label><input name="url" type="url" required placeholder="https://your-app.example.com"><div class="hint">Where your app lives. Must be publicly reachable.</div></div>
        <div class="field"><label>Developer / studio name</label><input name="developer" required maxlength="30" placeholder="e.g. Night Shift Labs"></div>
        <div class="field"><label>Category</label>
          <select name="category">${S.categories.map((c) => `<option value="${c.id}">${c.emoji} ${esc(c.name)}</option>`).join("")}</select>
        </div>
        <div class="field"><label>Icon emoji</label>
          <div class="emoji-row" id="emojirow">${EMOJIS.map((e, i) => `<button type="button" data-e="${e}" class="${i === 0 ? "sel" : ""}">${e}</button>`).join("")}</div>
        </div>
        <div class="field"><label>Icon color</label>
          <div class="grad-row" id="gradrow">${GRADS.map((g, i) => `<button type="button" data-g="${esc(g)}" class="${i === 0 ? "sel" : ""}" style="background:${g}"></button>`).join("")}</div>
        </div>
        <div class="field"><label>Description</label><textarea name="description" required placeholder="What does it do? Who is it for? Why is it great?"></textarea></div>
        <div class="preview-block">
          <div class="plabel">Live preview</div>
          <div id="submitpreview"></div>
        </div>
        <button class="bigsubmit" type="submit">Submit for Review</button>
      </form>
      <div class="submit-out" id="submitout" hidden></div>
      ${footerNote()}
    </div>`;
  }

  function submitPreview() {
    const f = document.getElementById("submitform");
    if (!f) return;
    const e = f.querySelector("#emojirow .sel");
    const g = f.querySelector("#gradrow .sel");
    const a = {
      id: "preview",
      name: f.name.value || "Your App",
      subtitle: f.subtitle.value || "Your tagline here",
      url: f.url.value || "#",
      icon: { emoji: e ? e.dataset.e : "🚀", bg: g ? g.dataset.g : GRADS[0] },
    };
    document.getElementById("submitpreview").innerHTML = appRow(a);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const f = ev.target;
    const e = f.querySelector("#emojirow .sel");
    const g = f.querySelector("#gradrow .sel");
    const entry = {
      id: (f.name.value || "app").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      name: f.name.value,
      subtitle: f.subtitle.value,
      developer: f.developer.value,
      category: f.category.value,
      url: f.url.value,
      icon: { emoji: e ? e.dataset.e : "🚀", bg: g ? g.dataset.g : GRADS[0] },
      theme: ["#8ea0ff", "#0c1024"],
      shots: ["feed", "list", "dashboard"],
      rating: 5.0,
      ratingCount: 1,
      ratingDist: [100, 0, 0, 0, 0],
      age: "4+",
      description: f.description.value.split(/\n{2,}/),
    };
    const out = document.getElementById("submitout");
    out.hidden = false;
    out.innerHTML = `
      <div class="okmsg"><b>🎉 Almost there.</b> Store submissions aren't wired to a backend yet —
      this is the catalog entry for your app. Copy it and send it to the store
      curator, or paste it into <b>js/data.js</b> if you have access.</div>
      <pre id="submitjson">${esc(JSON.stringify(entry, null, 2))}</pre>
      <button class="copybtn" id="copyjson" type="button">Copy entry</button>`;
    out.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("copyjson").addEventListener("click", () => {
      navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
      document.getElementById("copyjson").textContent = "Copied ✓";
    });
  }

  /* ---------------- Tab bar ---------------- */
  const TABS = [
    {
      id: "today", label: "Today", hash: "#/today",
      svg: '<svg viewBox="0 0 26 26"><path d="M4 3.5h18a1.5 1.5 0 0 1 1.5 1.5v16a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 21V5A1.5 1.5 0 0 1 4 3.5Z" fill="none" stroke="currentColor" stroke-width="2"/><text x="13" y="18" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor" font-family="-apple-system,sans-serif">18</text></svg>',
    },
    {
      id: "apps", label: "Apps", hash: "#/apps",
      svg: '<svg viewBox="0 0 26 26"><rect x="3" y="3" width="9" height="9" rx="2.4"/><rect x="14" y="3" width="9" height="9" rx="2.4"/><rect x="3" y="14" width="9" height="9" rx="2.4"/><rect x="14" y="14" width="9" height="9" rx="2.4"/></svg>',
    },
    {
      id: "games", label: "Games", hash: "#/games",
      svg: '<svg viewBox="0 0 26 26"><path d="M8 6h10a6.5 6.5 0 0 1 6.4 7.7l-.9 4.8a3.4 3.4 0 0 1-6 1.5L15.6 18h-5.2l-1.9 2a3.4 3.4 0 0 1-6-1.5l-.9-4.8A6.5 6.5 0 0 1 8 6Z"/><circle cx="8.4" cy="12" r="1.6" fill="var(--bg,#fff)"/><circle cx="18" cy="10.6" r="1.3" fill="var(--bg,#fff)"/><circle cx="20.4" cy="13.4" r="1.3" fill="var(--bg,#fff)"/></svg>',
    },
    {
      id: "search", label: "Search", hash: "#/search",
      svg: '<svg viewBox="0 0 26 26"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="16.2" y1="16.2" x2="23" y2="23" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
    },
    {
      id: "submit", label: "Submit", hash: "#/submit",
      svg: '<svg viewBox="0 0 26 26"><rect x="3" y="3" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="13" y1="8.5" x2="13" y2="17.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><line x1="8.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    },
  ];

  function renderTabbar(active) {
    tabbar.innerHTML = TABS.map(
      (t) => `<button data-hash="${t.hash}" class="${t.id === active ? "active" : ""}" aria-label="${t.label}">${t.svg}${t.label}</button>`
    ).join("");
  }

  /* ---------------- Router ---------------- */
  const state = { tab: "today", backLabel: "Today" };
  const scrollMemory = {};

  function route() {
    const hash = location.hash || "#/today";
    const [, path, arg] = hash.match(/^#\/([^/]*)\/?(.*)$/) || [null, "today", ""];
    let html = "", tab = state.tab;

    switch (path) {
      case "today": html = renderToday(); tab = "today"; break;
      case "apps": html = renderStoreTab("Apps", S.appsTab); tab = "apps"; break;
      case "games": html = renderStoreTab("Games", S.gamesTab); tab = "games"; break;
      case "search": html = renderSearch(); tab = "search"; break;
      case "submit": html = renderSubmit(); tab = "submit"; break;
      case "app": html = renderDetail(decodeURIComponent(arg)); break;
      case "section": html = renderSection(decodeURIComponent(arg)); break;
      default: html = renderToday(); tab = "today";
    }

    const isSub = path === "app" || path === "section";
    if (!isSub) {
      state.tab = tab;
      state.backLabel = TABS.find((t) => t.id === tab)?.label || "Back";
    }
    view.innerHTML = html;
    renderTabbar(state.tab);
    mini.textContent = view.querySelector(".page")?.dataset.title || "";
    mini.classList.remove("show");
    window.scrollTo(0, isSub ? 0 : scrollMemory[tab] || 0);

    // page-specific wiring
    if (path === "search") {
      const inp = document.getElementById("searchinput");
      inp.addEventListener("input", () => doSearch(inp.value));
    }
    if (path === "submit") {
      const f = document.getElementById("submitform");
      f.addEventListener("submit", handleSubmit);
      f.addEventListener("input", submitPreview);
      ["emojirow", "gradrow"].forEach((id) => {
        document.getElementById(id).addEventListener("click", (e) => {
          const b = e.target.closest("button");
          if (!b) return;
          b.parentElement.querySelectorAll(".sel").forEach((x) => x.classList.remove("sel"));
          b.classList.add("sel");
          submitPreview();
        });
      });
      submitPreview();
    }
    if (path === "app") {
      const d = document.getElementById("ddesc");
      if (d && d.scrollHeight <= 100) d.classList.remove("clamped");
    }
  }

  /* ---------------- Global events ---------------- */
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) {
      e.stopPropagation();
      const url = open.dataset.open;
      if (url && url !== "#") window.open(url, "_blank", "noopener");
      else {
        open.textContent = "SOON";
        setTimeout(() => (open.textContent = "GET"), 900);
      }
      return;
    }
    if (e.target.closest("[data-back]")) {
      if (history.length > 1) history.back();
      else location.hash = "#/" + state.tab;
      return;
    }
    const share = e.target.closest("[data-share]");
    if (share) {
      const a = app(share.dataset.share);
      const data = { title: a.name, text: `${a.name} — ${a.subtitle}`, url: a.url !== "#" ? a.url : location.href };
      if (navigator.share) navigator.share(data).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(data.url);
      return;
    }
    const tabBtn = e.target.closest("[data-hash]");
    if (tabBtn) {
      const target = tabBtn.dataset.hash;
      if (location.hash === target) window.scrollTo({ top: 0, behavior: "smooth" });
      else location.hash = target;
      return;
    }
    const catTile = e.target.closest("[data-cat]");
    if (catTile) {
      location.hash = "#/section/" + encodeURIComponent(catTile.dataset.cat);
      return;
    }
    const trend = e.target.closest("[data-q]");
    if (trend) {
      const inp = document.getElementById("searchinput");
      inp.value = trend.dataset.q;
      doSearch(inp.value);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const desc = e.target.closest("#ddesc.clamped");
    if (desc) { desc.classList.remove("clamped"); return; }
    const row = e.target.closest("[data-app]");
    if (row) location.hash = "#/app/" + row.dataset.app;
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const isSub = /^#\/(app|section)\//.test(location.hash);
    if (!isSub) {
      scrollMemory[state.tab] = y;
      mini.classList.toggle("show", y > 52);
    } else {
      mini.classList.remove("show");
    }
    const bb = document.getElementById("backbar");
    if (bb) bb.classList.toggle("scrolled", y > 120);
  }, { passive: true });

  window.addEventListener("hashchange", route);

  /* today tab icon shows real date */
  TABS[0].svg = TABS[0].svg.replace(">18<", ">" + new Date().getDate() + "<");

  route();
})();
