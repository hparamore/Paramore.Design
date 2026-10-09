import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
import { $ as $$Base, a as agent } from '../chunks/Base_BQ8RIMgF.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Contact", "description": "Call, email or visit Paramore Real Estate at 398 N. Broadway in Burns, Oregon.", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section container contact" data-astro-cid-uw5kdbxl> <div data-astro-cid-uw5kdbxl> <p class="eyebrow" data-astro-cid-uw5kdbxl>Contact</p> <h1 data-astro-cid-uw5kdbxl>Call, write, or stop by the office.</h1> <p class="muted" data-astro-cid-uw5kdbxl>Robert answers his own phone. If he's out showing a place, leave a message and he'll call back the same day.</p> <dl data-astro-cid-uw5kdbxl> <dt data-astro-cid-uw5kdbxl>Phone</dt><dd data-astro-cid-uw5kdbxl><a${addAttribute(agent.phoneHref, "href")} data-astro-cid-uw5kdbxl>${agent.phone}</a></dd> <dt data-astro-cid-uw5kdbxl>Email</dt><dd data-astro-cid-uw5kdbxl><a${addAttribute(`mailto:${agent.email}`, "href")} data-astro-cid-uw5kdbxl>${agent.email}</a></dd> <dt data-astro-cid-uw5kdbxl>Office</dt><dd data-astro-cid-uw5kdbxl>${agent.address}</dd> </dl> </div> <form class="form"${addAttribute(`mailto:${agent.email}`, "action")} method="post" enctype="text/plain" data-astro-cid-uw5kdbxl> <label data-astro-cid-uw5kdbxl>Your name <input name="name" autocomplete="name" required data-astro-cid-uw5kdbxl></label> <label data-astro-cid-uw5kdbxl>Phone or email <input name="contact" autocomplete="tel" required data-astro-cid-uw5kdbxl></label> <label data-astro-cid-uw5kdbxl>What are you looking for? <textarea name="message" rows="5" placeholder="Buying, selling, or just curious what your place is worth…" data-astro-cid-uw5kdbxl></textarea></label> <button class="btn btn-primary" type="submit" data-astro-cid-uw5kdbxl>Send to Robert</button> <p class="fine muted" data-astro-cid-uw5kdbxl>Prototype note: this opens your email app. The production site will send through a form service.</p> </form> </section> ` })} `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/contact.astro", void 0);

const $$file = "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/contact.astro";
const $$url = "/paramorerealestate/contact/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
