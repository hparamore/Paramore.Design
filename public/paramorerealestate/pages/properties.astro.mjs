import { c as createComponent, r as renderComponent, e as renderScript, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Base } from '../chunks/Base_BQ8RIMgF.mjs';
import { l as listings, $ as $$ListingCard } from '../chunks/listings_D1X_lj93.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  const forSale = listings.filter((l) => l.status !== "sold");
  const sold = listings.filter((l) => l.status === "sold");
  const kinds = [["all", "Everything"], ["home", "Homes"], ["land", "Land"], ["ranch", "Ranches & acreage"], ["commercial", "Commercial"]];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Properties", "description": "Every home, lot, ranch and commercial property listed by Paramore Real Estate in Burns, Hines and Harney County, Oregon.", "data-astro-cid-egeukbqw": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section container" data-astro-cid-egeukbqw> <p class="eyebrow" data-astro-cid-egeukbqw>Properties</p> <h1 data-astro-cid-egeukbqw>${forSale.length} for sale in Harney County</h1> <div class="filters" role="group" aria-label="Filter by property type" data-astro-cid-egeukbqw> ${kinds.map(([k, label], i) => renderTemplate`<button type="button" class="chip"${addAttribute(k, "data-kind")}${addAttribute(i === 0 ? "true" : "false", "aria-pressed")} data-astro-cid-egeukbqw>${label}</button>`)} </div> <h2 id="for-sale" class="sub" data-astro-cid-egeukbqw>For sale</h2> <div class="grid-cards" id="grid-sale" data-astro-cid-egeukbqw>${forSale.map((l, i) => renderTemplate`${renderComponent($$result2, "ListingCard", $$ListingCard, { "l": l, "eager": i < 3, "data-astro-cid-egeukbqw": true })}`)}</div> <p class="empty" hidden data-astro-cid-egeukbqw>Nothing in that category right now. <a${addAttribute(`${base}/contact/`, "href")} data-astro-cid-egeukbqw>Tell Robert what you're after</a> and he'll keep an eye out.</p> <h2 id="sold" class="sub sold" data-astro-cid-egeukbqw>Recently sold</h2> <div class="grid-cards" id="grid-sold" data-astro-cid-egeukbqw>${sold.map((l) => renderTemplate`${renderComponent($$result2, "ListingCard", $$ListingCard, { "l": l, "data-astro-cid-egeukbqw": true })}`)}</div> </section> ` })} ${renderScript($$result, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro", void 0);
const $$file = "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro";
const $$url = "/paramorerealestate/properties/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
