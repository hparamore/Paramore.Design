import { d as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute, F as Fragment } from '../../chunks/astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Base, a as agent } from '../../chunks/Base_BQ8RIMgF.mjs';
import { l as listings, $ as $$ListingCard } from '../../chunks/listings_D1X_lj93.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://paramore.design");
function getStaticPaths() {
  return listings.map((l) => ({ params: { slug: l.slug }, props: { l } }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  const { l } = Astro2.props;
  const label = { "for-sale": "For sale", reduced: "Price reduced", sold: "Sold" }[l.status];
  const fmt = (n) => n == null ? null : Number.isInteger(n) ? n.toLocaleString() : n;
  const more = listings.filter((x) => x.slug !== l.slug && x.status !== "sold" && x.kind === l.kind).slice(0, 3);
  const [hero, ...rest] = l.photos;
  const gallery = rest.slice(0, 4);
  const mapHref = l.lat ? `https://www.google.com/maps/search/?api=1&query=${l.lat},${l.lng}` : null;
  const flyerName = `${l.slug}-flyer.pdf`;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": `${l.title} · ${l.price}`, "description": l.description[0]?.slice(0, 155), "image": hero?.large, "data-astro-cid-yrsiy5sn": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="container listing" data-astro-cid-yrsiy5sn> <nav class="crumbs" aria-label="Breadcrumb" data-astro-cid-yrsiy5sn><a${addAttribute(`${base}/properties/`, "href")} data-astro-cid-yrsiy5sn>Properties</a> <span aria-hidden="true" data-astro-cid-yrsiy5sn>/</span> <span data-astro-cid-yrsiy5sn>${l.city}</span></nav> <header class="head" data-astro-cid-yrsiy5sn> <div data-astro-cid-yrsiy5sn> <span${addAttribute(`tag tag-${l.status}`, "class")} data-astro-cid-yrsiy5sn>${label}</span> <h1 data-astro-cid-yrsiy5sn>${l.title}</h1> <p class="addr muted" data-astro-cid-yrsiy5sn>${l.address}, ${l.city}, Oregon ${mapHref && renderTemplate`<a${addAttribute(mapHref, "href")} target="_blank" rel="noopener" data-astro-cid-yrsiy5sn>Map ↗</a>`}</p> </div> <div class="price-block" data-astro-cid-yrsiy5sn><span class="price" data-astro-cid-yrsiy5sn>${l.price}</span>${l.sqft > 100 && l.priceNumber && renderTemplate`<span class="muted" data-astro-cid-yrsiy5sn>$${Math.round(l.priceNumber / l.sqft)} / sq ft</span>`}</div> </header> <section class="gallery" aria-label="Photos" data-astro-cid-yrsiy5sn> ${hero && renderTemplate`<a class="hero"${addAttribute(hero.large, "href")} target="_blank" rel="noopener" data-astro-cid-yrsiy5sn><img${addAttribute(hero.large, "src")}${addAttribute(`${l.title} — main photo`, "alt")} width="1800" height="1200" loading="eager" fetchpriority="high" data-astro-cid-yrsiy5sn></a>`} ${gallery.map((p, i) => renderTemplate`<a class="thumb"${addAttribute(p.large, "href")} target="_blank" rel="noopener" data-astro-cid-yrsiy5sn><img${addAttribute(p.card, "src")}${addAttribute(`${l.title} — photo ${i + 2}`, "alt")} width="900" height="640" loading="lazy" data-astro-cid-yrsiy5sn></a>`)} ${l.photos.length > 5 && renderTemplate`<a class="btn btn-ink all" href="#all-photos" data-astro-cid-yrsiy5sn>All ${l.photos.length} photos</a>`} </section> <div class="cols" data-astro-cid-yrsiy5sn> <div class="main" data-astro-cid-yrsiy5sn> <ul class="stats big" data-astro-cid-yrsiy5sn> ${l.beds != null && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${fmt(l.beds)}</b><span data-astro-cid-yrsiy5sn>Bedrooms</span></li>`} ${l.baths != null && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${fmt(l.baths)}</b><span data-astro-cid-yrsiy5sn>Bathrooms</span></li>`} ${l.sqft != null && l.sqft > 100 && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${fmt(l.sqft)}</b><span data-astro-cid-yrsiy5sn>Sq ft</span></li>`} ${l.acres != null && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${fmt(l.acres)}</b><span data-astro-cid-yrsiy5sn>Acres</span></li>`} ${l.built && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${l.built}</b><span data-astro-cid-yrsiy5sn>Built</span></li>`} ${l.garage && renderTemplate`<li data-astro-cid-yrsiy5sn><b data-astro-cid-yrsiy5sn>${l.garage}</b><span data-astro-cid-yrsiy5sn>Garage</span></li>`} </ul> <h2 data-astro-cid-yrsiy5sn>About this property</h2> <div class="prose" data-astro-cid-yrsiy5sn>${l.description.map((p) => renderTemplate`<p data-astro-cid-yrsiy5sn>${p}</p>`)}</div> ${l.features.length > 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-yrsiy5sn": true }, { "default": ($$result3) => renderTemplate`<h2 data-astro-cid-yrsiy5sn>Features</h2><ul class="features" data-astro-cid-yrsiy5sn>${l.features.map((f) => renderTemplate`<li data-astro-cid-yrsiy5sn>${f}</li>`)}</ul>` })}`} ${l.photos.length > 5 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-yrsiy5sn": true }, { "default": ($$result3) => renderTemplate`<h2 id="all-photos" data-astro-cid-yrsiy5sn>All photos</h2><div class="all-grid" data-astro-cid-yrsiy5sn>${l.photos.map((p, i) => renderTemplate`<a${addAttribute(p.large, "href")} target="_blank" rel="noopener" data-astro-cid-yrsiy5sn><img${addAttribute(p.thumb, "src")}${addAttribute(`Photo ${i + 1}`, "alt")} width="480" height="340" loading="lazy" data-astro-cid-yrsiy5sn></a>`)}</div>` })}`} </div> <aside class="side" data-astro-cid-yrsiy5sn> <div class="agent-card" data-astro-cid-yrsiy5sn> <img${addAttribute(`${base}${agent.photo}`, "src")} alt="" width="96" height="96" data-astro-cid-yrsiy5sn> <p class="eyebrow" data-astro-cid-yrsiy5sn>Listed by</p> <h3 data-astro-cid-yrsiy5sn>${agent.name}</h3> <p class="muted" data-astro-cid-yrsiy5sn>${agent.title}</p> <a class="btn btn-primary"${addAttribute(agent.phoneHref, "href")} data-astro-cid-yrsiy5sn>Call ${agent.phone}</a> <a class="btn btn-ghost"${addAttribute(`mailto:${agent.email}?subject=${encodeURIComponent(l.title)}`, "href")} data-astro-cid-yrsiy5sn>Email about this listing</a> <a class="btn btn-ghost"${addAttribute(`${base}/flyers/${flyerName}`, "href")} download data-astro-cid-yrsiy5sn>Download flyer (PDF)</a> <p class="fine muted" data-astro-cid-yrsiy5sn>Flyers are generated automatically from this listing's photos and description.</p> </div> </aside> </div> ${more.length > 0 && renderTemplate`<section class="section" data-astro-cid-yrsiy5sn><div class="section-head" data-astro-cid-yrsiy5sn><h2 data-astro-cid-yrsiy5sn>More like this</h2><a${addAttribute(`${base}/properties/`, "href")} data-astro-cid-yrsiy5sn>All properties</a></div><div class="grid-cards" data-astro-cid-yrsiy5sn>${more.map((x) => renderTemplate`${renderComponent($$result2, "ListingCard", $$ListingCard, { "l": x, "data-astro-cid-yrsiy5sn": true })}`)}</div></section>`} </article> ` })} `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/[slug].astro", void 0);
const $$file = "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/[slug].astro";
const $$url = "/paramorerealestate/properties/[slug]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
