import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Base, a as agent } from '../chunks/Base_BQ8RIMgF.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "About Robert Paramore", "description": "Robert Paramore has sold real estate in Harney County since 2005 and opened Paramore Real Estate in Burns in 2008.", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section container about" data-astro-cid-kh7btl4r> <img${addAttribute(`${base}${agent.photo}`, "src")}${addAttribute(agent.name, "alt")} width="700" height="1073" data-astro-cid-kh7btl4r> <div data-astro-cid-kh7btl4r> <p class="eyebrow" data-astro-cid-kh7btl4r>About</p> <h1 data-astro-cid-kh7btl4r>${agent.name}</h1> <p class="muted" data-astro-cid-kh7btl4r>${agent.title} · Licensed in Oregon · Selling here since ${agent.since}</p> <div class="prose" data-astro-cid-kh7btl4r>${agent.bio.map((p) => renderTemplate`<p data-astro-cid-kh7btl4r>${p}</p>`)}</div> <blockquote data-astro-cid-kh7btl4r><p data-astro-cid-kh7btl4r>“${agent.testimonial.quote}”</p><footer data-astro-cid-kh7btl4r>— ${agent.testimonial.who}</footer></blockquote> <a class="btn btn-primary"${addAttribute(agent.phoneHref, "href")} data-astro-cid-kh7btl4r>Call ${agent.phone}</a> </div> </section> ` })} `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/about.astro", void 0);

const $$file = "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/about.astro";
const $$url = "/paramorerealestate/about/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
