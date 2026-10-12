"""Port Claude Design canvas artboards (.dc.html) into Astro pages using BaseV2.
Usage: python3 port.py <canvas_project_dir> <repo_dir>"""
import json, re, sys, os, urllib.parse
SRC, REPO = sys.argv[1], sys.argv[2]
ASSETS = json.load(open(os.path.join(REPO, 'docs/claude-design-assets.json'))) if os.path.exists(os.path.join(REPO,'docs/claude-design-assets.json')) else json.load(open('/Users/hunterparamore/Documents/ParamoreDesign/docs/claude-design-assets.json'))

PAGES = {  # artboard -> (output file, route, title, description)
 'Main':           ('src/pages/index.astro', '/', 'Hunter Paramore · Design Engineer', 'Design engineer for consumer apps and design systems. I design the product, then I ship the code.'),
 'Work':           ('src/pages/work.astro', '/work', 'Work · Paramore.Design', 'Five case studies and a lab of side builds by Hunter Paramore, design engineer.'),
 'About':          ('src/pages/about.astro', '/about', 'About · Paramore.Design', 'About Hunter Paramore: 13 years designing and shipping product, ten as the sole designer of Mutual.'),
 'Blog':           ('src/pages/blog/index.astro', '/blog/', 'Blog · Paramore.Design', 'Notes on design, building products, and things I’m learning along the way.'),
 'Build':          ('src/pages/build.astro', '/build', 'For Business · Paramore.Design', 'Custom AI-powered tools that replace the stack of half-used SaaS small businesses pay for.'),
 'PostTain':       ('src/pages/blog/posts/building-tain.astro', '/blog/posts/building-tain', 'I Kept Forgetting the Things I Loved, So I Built an App to Remember Them · Paramore.Design', 'Why I built Tain, a diary of everything I’ve loved, ranked by comparison.'),
 'PostFable':      ('src/pages/blog/posts/building-with-fable-5.astro', '/blog/posts/building-with-fable-5', 'It’s Easy to Have AI Build Things That Look Finished · Paramore.Design', 'I gave Fable 5 a game I’d failed to build for years, and learned what AI quietly skips.'),
 'CaseMutual':     ('src/pages/projects/mutual.astro', '/projects/mutual', 'Mutual · Paramore.Design', 'Ten years as the sole founding designer of Mutual, the #1 LDS dating app.'),
 'CaseMutualDS':   ('src/pages/projects/mutual-design-system-case-study.astro', '/projects/mutual-design-system-case-study', 'Mutual Design System · Paramore.Design', 'One token layer, three brands, six themes, built for engineers and AI agents.'),
 'CaseTreeService':('src/pages/projects/the-tree-service.astro', '/projects/the-tree-service', 'The Tree Service · Paramore.Design', 'A field-ops tool that replaced four SaaS subscriptions, designed and built solo in four weeks.'),
 'CaseTava':       ('src/pages/projects/tava.astro', '/projects/tava', 'Tava Health · Paramore.Design', 'A post-session check-in that turns a silent exit from therapy into a conversation.'),
 'CaseSpnkr':      ('src/pages/projects/spnkr.astro', '/projects/spnkr', 'SPNKr · Paramore.Design', 'Self-hosted game servers, and a dashboard redesigned out of default AI output.'),
 'CaseGameUI':     ('src/pages/projects/game-ui.astro', '/projects/game-ui', 'Game UI Kits · Paramore.Design', 'Zelda, Satisfactory and Raid Rush rebuilt as Figma UI kits.'),
 'CaseRealEstate': ('src/pages/projects/paramore-real-estate.astro', '/projects/paramore-real-estate', 'Paramore Real Estate · Paramore.Design', 'Rebranding a family real estate business in Burns, Oregon.'),
 'CaseKeeper':     ('src/pages/projects/keeper.astro', '/projects/keeper', 'Keeper · Paramore.Design', 'Keeper: remember every birthday.'),
 'CaseKillTheFish':('src/pages/projects/kill-the-fish.astro', '/projects/kill-the-fish', 'Kill The Fish · Paramore.Design', 'A whiteboard game from school, finally built as an app.'),
 'CaseMagnet':     ('src/pages/projects/magnet.astro', '/projects/magnet', 'Magnet · Paramore.Design', 'Fridge magnet poetry, with friends.'),
 'CaseTain':       ('src/pages/projects/tain.astro', '/projects/tain', 'Tain · Paramore.Design', 'Everything you loved, in order.'),
}
ABS = {'https://paramore.design/resume': '/resume',
       'https://paramore.design/projects/mutual-design-system.html': '/projects/mutual-design-system.html',
       'https://paramore.design/prototypes/tava/index.html': '/prototypes/tava/index.html'}

def blob(m):
    path = ASSETS.get(m.group(1))
    if not path: raise SystemExit('unmapped blob ' + m.group(1))
    return urllib.parse.quote(path)

def link(m):
    stem, frag = m.group(1), m.group(2) or ''
    return 'href="' + PAGES[stem][1] + frag + '"'

def convert(stem):
    s = open(os.path.join(SRC, stem + '.dc.html')).read()
    helmet = re.search(r'<helmet>(.*?)</helmet>', s, re.S).group(1)
    styles = '\n'.join(re.findall(r'<style>(.*?)</style>', helmet, re.S))
    styles = re.sub(r'body\{margin:0\}\s*', '', styles).strip()
    body = re.search(r'<div class="pd-page"[^>]*>(.*)</div>\s*</x-dc>', s, re.S).group(1)
    body = re.sub(r'\s*<dc-import name="Site(Nav|Footer)"[^>]*></dc-import>\n?', '\n', body)
    body = re.sub(r'/_blob/([0-9a-f]{32})', blob, body)
    body = re.sub(r'href="([A-Za-z]+)\.dc\.html(#[^"]*)?"', link, body)
    for a, b in ABS.items(): body = body.replace('href="' + a + '"', 'href="' + b + '"')
    # Hand edits from the canvas that use fixed px widths would overflow phones.
    body = re.sub(r'style="width: (\d+)px"', r'style="max-width: \1px"', body)
    # External links open in a new tab, per the site convention.
    body = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener"', body)
    return body.strip('\n'), styles

def write(stem, body, styles, extra_front='', extra_tail=''):
    out, route, title, desc = PAGES[stem]
    depth = out.count('/') - 2
    rel = '../' * depth + ('layouts/BaseV2.astro' if depth else 'layouts/BaseV2.astro')
    imp = os.path.relpath(os.path.join(REPO, 'src/layouts/BaseV2.astro'), os.path.dirname(os.path.join(REPO, out)))
    front = f"---\n// Ported from the Claude Design canvas artboard {stem}.dc.html. Edit the canvas, then re-port.\nimport BaseV2 from '{imp}';\n{extra_front}---\n"
    style = f"\n<style is:global>\n{styles}\n</style>\n" if styles else ''
    page = f"{front}<BaseV2 title={json.dumps(title, ensure_ascii=False)} description={json.dumps(desc, ensure_ascii=False)}>\n{body}\n{extra_tail}</BaseV2>\n{style}"
    if '{{' in page: raise SystemExit(stem + ': unported template hole')
    os.makedirs(os.path.dirname(os.path.join(REPO, out)), exist_ok=True)
    open(os.path.join(REPO, out), 'w').write(page)
    print('wrote', out)

if __name__ == '__main__':
    only = sys.argv[3:] or [k for k in PAGES if k not in ('Main', 'CaseMutual')]
    TAILS = {'CaseTava': '''<script>
  // Videos load and play only while on screen: four loops are ~5MB, too much for first paint.
  const vids = document.querySelectorAll('video[data-lazy]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window)) {
    vids.forEach((v) => { v.preload = 'auto'; if (!reduce) v.play().catch(() => {}); });
  } else {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { v.preload = 'auto'; if (!reduce) v.play().catch(() => {}); }
      else v.pause();
    }), { rootMargin: '200px' });
    vids.forEach((v) => io.observe(v));
  }
</script>
'''}
    for stem in only:
        b, st = convert(stem); write(stem, b, st, extra_tail=TAILS.get(stem, ''))
