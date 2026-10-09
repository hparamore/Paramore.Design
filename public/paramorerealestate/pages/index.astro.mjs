import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Base, a as agent } from '../chunks/Base_BQ8RIMgF.mjs';
import { l as listings, $ as $$ListingCard } from '../chunks/listings_D1X_lj93.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  const forSale = listings.filter((l) => l.status !== "sold");
  const featured = forSale.slice(0, 6);
  const sold = listings.filter((l) => l.status === "sold").slice(0, 3);
  forSale.find((l) => l.kind === "ranch" || l.acres > 50) ?? forSale[0];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <img class="hero-img"${addAttribute(`${base}/brand/hero-background.jpg`, "src")} alt="" width="1920" height="834" loading="eager" fetchpriority="high" data-astro-cid-j7pv25f6> <div class="container hero-copy" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Homes and land in Harney County.</h1> <p class="lede" data-astro-cid-j7pv25f6>Robert Paramore, broker in Burns and Hines since 2005.</p> <div class="actions" data-astro-cid-j7pv25f6><a class="btn btn-primary"${addAttribute(`${base}/properties/#for-sale`, "href")} data-astro-cid-j7pv25f6>See what's for sale</a><a class="btn btn-ghost"${addAttribute(agent.phoneHref, "href")} data-astro-cid-j7pv25f6>Call ${agent.phone}</a></div> </div> </section> <section class="section container" data-astro-cid-j7pv25f6> <div class="section-head" data-astro-cid-j7pv25f6><div data-astro-cid-j7pv25f6><p class="eyebrow" data-astro-cid-j7pv25f6>For sale now</p><h2 data-astro-cid-j7pv25f6>${forSale.length} properties on the market</h2></div><a class="btn btn-ink"${addAttribute(`${base}/properties/`, "href")} data-astro-cid-j7pv25f6>All properties</a></div> <div class="grid-cards" data-astro-cid-j7pv25f6>${featured.map((l, i) => renderTemplate`${renderComponent($$result2, "ListingCard", $$ListingCard, { "l": l, "eager": i < 3, "data-astro-cid-j7pv25f6": true })}`)}</div> </section> <section class="section container about" data-astro-cid-j7pv25f6> <img class="portrait"${addAttribute(`${base}${agent.photo}`, "src")}${addAttribute(`${agent.name}, ${agent.title}`, "alt")} width="700" height="1073" loading="lazy" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <p class="eyebrow" data-astro-cid-j7pv25f6>Meet your broker</p> <h2 data-astro-cid-j7pv25f6>${agent.name}</h2> <p class="muted" data-astro-cid-j7pv25f6>${agent.title} · Paramore Real Estate, est. 2008</p> <p data-astro-cid-j7pv25f6>${agent.bio[1]}</p> <blockquote data-astro-cid-j7pv25f6><p data-astro-cid-j7pv25f6>“${agent.testimonial.quote}”</p><footer data-astro-cid-j7pv25f6>— ${agent.testimonial.who}</footer></blockquote> <a class="btn btn-ghost"${addAttribute(`${base}/about/`, "href")} data-astro-cid-j7pv25f6>More about Robert</a> </div> </section> ${sold.length > 0 && renderTemplate`<section class="section container" data-astro-cid-j7pv25f6> <div class="section-head" data-astro-cid-j7pv25f6><div data-astro-cid-j7pv25f6><p class="eyebrow" data-astro-cid-j7pv25f6>Recently sold</p><h2 data-astro-cid-j7pv25f6>Handshakes we're proud of</h2></div><a${addAttribute(`${base}/properties/#sold`, "href")} data-astro-cid-j7pv25f6>See all sold</a></div> <div class="grid-cards" data-astro-cid-j7pv25f6>${sold.map((l) => renderTemplate`${renderComponent($$result2, "ListingCard", $$ListingCard, { "l": l, "data-astro-cid-j7pv25f6": true })}`)}</div> </section>`}<section class="section container cta" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6><p class="eyebrow" data-astro-cid-j7pv25f6>Thinking of selling?</p><h2 data-astro-cid-j7pv25f6>Let's talk about what your place is worth.</h2><p class="muted" data-astro-cid-j7pv25f6>A quick call, no obligation. Robert knows what's moving in Burns and Hines this month.</p></div> <div class="actions" data-astro-cid-j7pv25f6><a class="btn btn-primary"${addAttribute(agent.phoneHref, "href")} data-astro-cid-j7pv25f6>Call ${agent.phone}</a><a class="btn btn-ghost"${addAttribute(`${base}/contact/`, "href")} data-astro-cid-j7pv25f6>Send a note</a></div> </section> ` })} `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/index.astro", void 0);
const $$file = "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/index.astro";
const $$url = "/paramorerealestate/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
