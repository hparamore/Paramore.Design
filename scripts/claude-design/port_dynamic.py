"""Port the two artboards with live data (Home's pinned work panel, Mutual's gallery)."""
import json, re, sys, os, urllib.parse
sys.argv = [sys.argv[0], sys.argv[1], sys.argv[2]]
import port
SRC, REPO = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
P = port.PAGES
route = lambda h: P[h[:-8]][1] if h.endswith('.dc.html') else port.ABS.get(h, h)
asset = lambda b: urllib.parse.quote(port.ASSETS[b.split('/')[-1]])

# ---------- Home ----------
projects = json.load(open(os.path.join(HERE, 'main-projects.json')))
for p in projects:
    p['href'] = route(p['href']); p['img'] = asset(p['img']); p['external'] = p['href'].startswith('http')
s = open(os.path.join(SRC, 'Main.dc.html')).read()
a = s.index('    <div class="home-work">'); b = s.index('    <div style="border-top: var(--pd-rule); padding: 20px 0;', a)
work = '''    <div class="home-work">
      <div>
        <div class="home-work__panel" aria-live="polite">
          <div class="home-work__num" aria-hidden="true" data-f="num">{p0.num}</div>
          <div class="home-work__text">
            <div class="pd-kicker" data-f="kicker">{p0.kicker}</div>
            <h2 class="pd-h2" style="font-size: clamp(34px, 4vw, 52px)" data-f="title">{p0.title}</h2>
            <p class="pd-body" style="margin-top: 6px" data-f="desc">{p0.desc}</p>
            <a href={p0.href} class="pd-arrow-link" data-f="link"><span data-f="linkLabel">{p0.linkLabel}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </a>
          </div>
          <div class="pd-cells" style="border-left: 0; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr))" data-f="stats">
            {p0.stats.map((s) => (
              <div style="padding: 18px 16px 18px 0">
                <div class="pd-stat__value" style="font-size: 36px">{s.value}</div>
                <div class="pd-stat__label" style="font-size: 11px">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div class="home-work__list">
        {projects.map((p, i) => (
          <a href={p.href} class={'home-work__item' + (i ? ' is-dim' : '')} data-proj={i} style="display: block; text-decoration: none; color: var(--color-text)" target={p.external ? '_blank' : undefined} rel={p.external ? 'noopener' : undefined}>
            <div class="pd-frame">
              <img src={p.img} alt={p.alt} style={'width: 100%; aspect-ratio: ' + p.aspect + '; object-fit: cover'} loading={i ? 'lazy' : 'eager'}>
              <div class="pd-caption"><span>{p.title}</span><span>{p.platform}</span></div>
            </div>
            <div class="home-work__mobile">
              <div class="pd-kicker">{p.kicker}</div>
              <div class="pd-h3">{p.title}</div>
              <p class="pd-body">{p.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
'''
s = s[:a] + work + s[b:]
s = s.replace('<span class="pd-head__count">{{ num }} / {{ total }}</span>', '<span class="pd-head__count"><span data-f="num">{p0.num}</span> / {total}</span>')
s = s.replace('onClick="{{ goTop }}"', 'data-secnav="top"').replace('onClick="{{ goPrev }}"', 'data-secnav="prev"').replace('onClick="{{ goNext }}"', 'data-secnav="next"')
tmp = os.path.join(HERE, '_Main.dc.html'); open(tmp, 'w').write(s)
port.SRC = HERE; os.rename(tmp, os.path.join(HERE, 'Main.dc.html'))
body, styles = port.convert('Main')
front = ("import projects from '../data/home-projects.json';\n"
         "const p0 = projects[0];\nconst total = String(projects.length).padStart(2, '0');\n")
tail = '''<script is:inline type="application/json" id="home-projects" set:html={JSON.stringify(projects)}></script>
<script>
  // Pinned panel follows whichever project image is nearest 42% down the viewport.
  const data = JSON.parse(document.getElementById('home-projects').textContent);
  const items = [...document.querySelectorAll('[data-proj]')];
  const f = (k) => document.querySelectorAll(`[data-f="${k}"]`);
  let active = 0;
  const show = (i) => {
    if (i === active) return; active = i; const p = data[i];
    f('num').forEach((el) => (el.textContent = p.num));
    f('kicker').forEach((el) => (el.textContent = p.kicker));
    f('title').forEach((el) => (el.textContent = p.title));
    f('desc').forEach((el) => (el.textContent = p.desc));
    f('linkLabel').forEach((el) => (el.textContent = p.linkLabel));
    f('link').forEach((el) => { el.href = p.href; if (p.external) { el.target = '_blank'; el.rel = 'noopener'; } else { el.removeAttribute('target'); el.removeAttribute('rel'); } });
    f('stats').forEach((el) => {
      el.replaceChildren(...p.stats.map((s) => {
        const c = document.createElement('div'); c.style.padding = '18px 16px 18px 0';
        const v = document.createElement('div'); v.className = 'pd-stat__value'; v.style.fontSize = '36px'; v.textContent = s.value;
        const l = document.createElement('div'); l.className = 'pd-stat__label'; l.style.fontSize = '11px'; l.textContent = s.label;
        c.append(v, l); return c;
      }));
    });
    items.forEach((el, j) => el.classList.toggle('is-dim', j !== i));
  };
  const onScroll = () => {
    const mid = innerHeight * 0.42; let best = 0, bestD = Infinity;
    items.forEach((el, i) => { const r = el.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    show(best);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  // Section stepper.
  const go = (dir) => {
    const tops = [...document.querySelectorAll('[data-screen-label], [data-proj]')].map((el) => el.getBoundingClientRect().top + scrollY - 90).sort((a, b) => a - b);
    const t = dir > 0 ? tops.find((v) => v > scrollY + 10) : [...tops].reverse().find((v) => v < scrollY - 10);
    if (t !== undefined) scrollTo({ top: Math.max(0, t), behavior: 'smooth' });
  };
  document.querySelector('[data-secnav="top"]')?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelector('[data-secnav="prev"]')?.addEventListener('click', () => go(-1));
  document.querySelector('[data-secnav="next"]')?.addEventListener('click', () => go(1));
</script>
'''
os.makedirs(os.path.join(REPO, 'src/data'), exist_ok=True)
json.dump(projects, open(os.path.join(REPO, 'src/data/home-projects.json'), 'w'), indent=1, ensure_ascii=False)
port.write('Main', body, styles, extra_front=front, extra_tail=tail)
os.remove(os.path.join(HERE, 'Main.dc.html'))

# ---------- Mutual ----------
g = json.load(open(os.path.join(HERE, 'mutual-shots.json')))
s = open(os.path.join(SRC, 'CaseMutual.dc.html')).read()
a = s.index('      <sc-for list="{{ shots }}"'); b = s.index('</sc-for>', a) + len('</sc-for>')
s = s[:a] + '''      {shots.map((s) => (
        <figure style="margin: 0" class={s.featured ? 'is-featured' : undefined}>
          <div class="pd-frame pd-frame--contain" style="aspect-ratio: 4 / 5"><img src={s.src} alt={s.title} loading="lazy"></div>
          <figcaption class="pd-figcap">{s.title}</figcaption>
        </figure>
      ))}''' + s[b:]
s = s.replace('class="pd-gallery pd-gallery--phones"', 'class="pd-gallery pd-gallery--phones mutual-gallery" data-gallery')
s = s.replace('onClick="{{ toggleAll }}" aria-expanded="{{ showAllStr }}">{{ toggleLabel }}</button>', 'data-toggle aria-expanded="false">Show all {shots.length} screens</button>')
s = s.replace('<span class="pd-kicker">{{ countLabel }}</span>', '<span class="pd-kicker" data-count>{featuredCount} of {shots.length} screens</span>')
s = s.replace('<style>body{margin:0}</style>', '<style>body{margin:0} .mutual-gallery:not(.is-all) > figure:not(.is-featured){display:none}</style>')
open(os.path.join(HERE, 'CaseMutual.dc.html'), 'w').write(s)
body, styles = port.convert('CaseMutual')
shots = [{'src': urllib.parse.quote(port.ASSETS[i]), 'title': t, 'featured': i in g['featured']} for i, t in g['shots']]
json.dump(shots, open(os.path.join(REPO, 'src/data/mutual-shots.json'), 'w'), indent=1, ensure_ascii=False)
front = "import shots from '../../data/mutual-shots.json';\nconst featuredCount = shots.filter((s) => s.featured).length;\n"
tail = '''<script>
  // Curated nine by default; the full archive is one click away.
  const grid = document.querySelector('[data-gallery]');
  const btn = document.querySelector('[data-toggle]');
  const count = document.querySelector('[data-count]');
  const total = grid.children.length, nine = grid.querySelectorAll('.is-featured').length;
  btn?.addEventListener('click', () => {
    const all = grid.classList.toggle('is-all');
    btn.setAttribute('aria-expanded', String(all));
    btn.textContent = all ? 'Show the curated ' + nine : 'Show all ' + total + ' screens';
    count.textContent = all ? total + ' screens, newest last' : nine + ' of ' + total + ' screens';
  });
</script>
'''
port.write('CaseMutual', body, styles, extra_front=front, extra_tail=tail)
os.remove(os.path.join(HERE, 'CaseMutual.dc.html'))
