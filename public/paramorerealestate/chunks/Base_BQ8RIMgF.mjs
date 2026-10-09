import { d as createAstro, c as createComponent, m as maybeRenderHead, b as addAttribute, a as renderTemplate, f as renderHead, r as renderComponent, g as renderSlot } from './astro/server_CCPoNTIn.mjs';
import 'piccolore';
import 'html-escaper';
/* empty css                         */
import 'clsx';

const name = "Robert Paramore";
const title = "Principal Broker & Owner";
const phone = "541.413.1717";
const phoneHref = "tel:+15414131717";
const email = "rparamore@gmail.com";
const address = "398 N. Broadway, Burns, OR 97720";
const photo = "/brand/robert-paramore.png";
const since = 2005;
const bio = ["After my wife and I were married and finished college in Utah, we moved to Burns, Oregon in 1990 and have never left. We love it here. We have six children and love spending time with them.","I started in real estate in 2005 with United Country Real Estate and was the top-selling agent in the country in 2007. In 2008 I opened Paramore Real Estate. I'll do my best to represent you as a seller or a buyer. I love this area and look forward to working with the great, hard-working people of Harney County for many years to come.","We work with every agency in town and will find what you're looking for, no matter who has it for sale."];
const testimonial = {"quote":"The professionalism and personalized care that was given to my family was amazing. Rob took the time to get to know my family and our needs, working diligently and patiently with us to find the perfect home. He never once put pressure on us. I couldn't have asked for a better first home-buying experience.","who":"Mike Allen, Hines"};
const agent = {
  name,
  title,
  phone,
  phoneHref,
  email,
  address,
  photo,
  since,
  bio,
  testimonial,
};

const $$Astro$1 = createAstro("https://paramore.design");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  const path = Astro2.url.pathname.replace(base, "") || "/";
  const nav = [["/", "Home"], ["/properties/", "Properties"], ["/about/", "About Robert"], ["/contact/", "Contact"]];
  const active = (href) => href === "/" ? path === "/" : path.startsWith(href);
  return renderTemplate`${maybeRenderHead()}<header class="site-header" data-astro-cid-3ef6ksr2> <div class="container bar" data-astro-cid-3ef6ksr2> <a class="brand"${addAttribute(`${base}/`, "href")} aria-label="Paramore Real Estate home" data-astro-cid-3ef6ksr2><picture data-astro-cid-3ef6ksr2> <source${addAttribute(`${base}/brand/logo-h-white-color.svg`, "srcset")} media="(prefers-color-scheme: dark)" data-astro-cid-3ef6ksr2> <img${addAttribute(`${base}/brand/logo-h-color.svg`, "src")} alt="Paramore Real Estate" width="190" height="64" data-astro-cid-3ef6ksr2> </picture></a> <nav aria-label="Primary" data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2>${nav.map(([href, label]) => renderTemplate`<li data-astro-cid-3ef6ksr2><a${addAttribute(`${base}${href === "/" ? "/" : href}`, "href")}${addAttribute(active(href) ? "page" : void 0, "aria-current")} data-astro-cid-3ef6ksr2>${label}</a></li>`)}</ul> </nav> <a class="btn btn-primary call"${addAttribute(agent.phoneHref, "href")} data-astro-cid-3ef6ksr2><span aria-hidden="true" data-astro-cid-3ef6ksr2>☏</span> ${agent.phone}</a> </div> </header> `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-sz7xmlte> <div class="container cols" data-astro-cid-sz7xmlte> <div data-astro-cid-sz7xmlte> <img${addAttribute(`${base}/brand/logo-h-white-color.svg`, "src")} alt="Paramore Real Estate" width="200" height="68" data-astro-cid-sz7xmlte> <p class="muted" data-astro-cid-sz7xmlte>Serving Burns, Hines and all of Harney County, Oregon since 2008.</p> </div> <div data-astro-cid-sz7xmlte> <p class="eyebrow" data-astro-cid-sz7xmlte>Office</p> <p data-astro-cid-sz7xmlte>${agent.address}<br data-astro-cid-sz7xmlte><a${addAttribute(agent.phoneHref, "href")} data-astro-cid-sz7xmlte>${agent.phone}</a><br data-astro-cid-sz7xmlte><a${addAttribute(`mailto:${agent.email}`, "href")} data-astro-cid-sz7xmlte>${agent.email}</a></p> </div> <div data-astro-cid-sz7xmlte> <p class="eyebrow" data-astro-cid-sz7xmlte>Browse</p> <p data-astro-cid-sz7xmlte><a${addAttribute(`${base}/properties/`, "href")} data-astro-cid-sz7xmlte>All properties</a><br data-astro-cid-sz7xmlte><a${addAttribute(`${base}/properties/#for-sale`, "href")} data-astro-cid-sz7xmlte>For sale</a><br data-astro-cid-sz7xmlte><a${addAttribute(`${base}/about/`, "href")} data-astro-cid-sz7xmlte>About Robert</a><br data-astro-cid-sz7xmlte><a${addAttribute(`${base}/contact/`, "href")} data-astro-cid-sz7xmlte>Contact</a></p> </div> </div> <div class="container legal muted" data-astro-cid-sz7xmlte>© ${(/* @__PURE__ */ new Date()).getFullYear()} Paramore Real Estate · Licensed in the State of Oregon · Equal Housing Opportunity</div> </footer> `;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://paramore.design");
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const base = "/paramorerealestate/".endsWith("/") ? "/paramorerealestate/".slice(0, -1) : "/paramorerealestate/";
  const { title, description = "Paramore Real Estate — homes, land and ranches in Burns, Hines and all of Harney County, Oregon.", image } = Astro2.props;
  const fullTitle = title ? `${title} · Paramore Real Estate` : "Paramore Real Estate · Burns & Hines, Oregon";
  return renderTemplate`<html lang="en" data-astro-cid-5hce7sga> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}>${image && renderTemplate`<meta property="og:image"${addAttribute(image, "content")}>`}<link rel="icon"${addAttribute(`${base}/brand/mark-color.svg`, "href")} type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600,100&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-5hce7sga> <a class="skip" href="#main" data-astro-cid-5hce7sga>Skip to content</a> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-5hce7sga": true })} <main id="main" data-astro-cid-5hce7sga>${renderSlot($$result, $$slots["default"])}</main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-5hce7sga": true })}  </body> </html>`;
}, "/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/layouts/Base.astro", void 0);

export { $$Base as $, agent as a };
