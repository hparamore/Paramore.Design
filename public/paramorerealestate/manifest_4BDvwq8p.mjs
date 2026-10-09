import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_CCPoNTIn.mjs';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/","cacheDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/node_modules/.astro/","outDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/","srcDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/src/","publicDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/public/","buildClientDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/client/","buildServerDir":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/server/","adapterName":"","routes":[{"file":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/about/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/paramorerealestate/_astro/about.DB7WxFgw.css"},{"type":"inline","content":".about[data-astro-cid-kh7btl4r]{display:grid;grid-template-columns:minmax(220px,1fr) 2fr;gap:var(--space-8);align-items:start}.about[data-astro-cid-kh7btl4r] img[data-astro-cid-kh7btl4r]{width:100%;max-width:420px;border-radius:var(--radius-lg)}.prose[data-astro-cid-kh7btl4r]{max-width:var(--measure);margin:var(--space-5) 0}blockquote[data-astro-cid-kh7btl4r]{margin:var(--space-6) 0;padding-left:var(--space-5);border-left:3px solid var(--color-orange);font-family:var(--font-display);font-size:var(--text-lg);max-width:60ch}blockquote[data-astro-cid-kh7btl4r] footer[data-astro-cid-kh7btl4r]{font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-text-muted)}@media(max-width:720px){.about[data-astro-cid-kh7btl4r]{grid-template-columns:1fr}.about[data-astro-cid-kh7btl4r] img[data-astro-cid-kh7btl4r]{max-width:260px}}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/contact/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/paramorerealestate/_astro/about.DB7WxFgw.css"},{"type":"inline","content":".contact[data-astro-cid-uw5kdbxl]{display:grid;grid-template-columns:1fr 1fr;gap:var(--space-8);align-items:start}dl[data-astro-cid-uw5kdbxl]{display:grid;grid-template-columns:auto 1fr;gap:var(--space-2) var(--space-5);margin-top:var(--space-6)}dt[data-astro-cid-uw5kdbxl]{font-weight:600}dd[data-astro-cid-uw5kdbxl]{margin:0}.form[data-astro-cid-uw5kdbxl]{background:var(--color-surface);padding:var(--space-6);border-radius:var(--radius-lg);box-shadow:var(--shadow-card);display:flex;flex-direction:column;gap:var(--space-4)}label[data-astro-cid-uw5kdbxl]{display:flex;flex-direction:column;gap:var(--space-2);font-weight:600;font-size:var(--text-sm)}input[data-astro-cid-uw5kdbxl],textarea[data-astro-cid-uw5kdbxl]{font:inherit;padding:12px 14px;border:1.5px solid var(--color-line);border-radius:var(--radius-sm);background:var(--color-bg);color:var(--color-text);min-height:44px}.fine[data-astro-cid-uw5kdbxl]{font-size:var(--text-xs)}@media(max-width:720px){.contact[data-astro-cid-uw5kdbxl]{grid-template-columns:1fr}}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/properties/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/paramorerealestate/_astro/about.DB7WxFgw.css"},{"type":"inline","content":".card[data-astro-cid-m5gpva63]{display:flex;flex-direction:column;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;text-decoration:none;box-shadow:var(--shadow-card);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)}.card[data-astro-cid-m5gpva63]:hover{transform:translateY(-3px);box-shadow:var(--shadow-lift)}.media[data-astro-cid-m5gpva63]{position:relative;aspect-ratio:3 / 2;background:var(--color-sand)}.media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease-out)}.card[data-astro-cid-m5gpva63]:hover .media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{transform:scale(1.03)}.card[data-astro-cid-m5gpva63][data-status=sold] .media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{filter:saturate(.75)}.tag[data-astro-cid-m5gpva63]{position:absolute;top:12px;left:12px}.body[data-astro-cid-m5gpva63]{padding:var(--space-4) var(--space-5) var(--space-5);display:flex;flex-direction:column;gap:var(--space-2)}.price-row[data-astro-cid-m5gpva63]{display:flex;justify-content:space-between;align-items:baseline;gap:var(--space-3)}.price[data-astro-cid-m5gpva63]{font-family:var(--font-display);font-size:var(--text-xl);font-weight:600}.city[data-astro-cid-m5gpva63]{font-size:var(--text-sm)}h3[data-astro-cid-m5gpva63]{font-family:var(--font-body);font-size:var(--text-base);font-weight:500;line-height:var(--leading-snug);color:var(--color-text)}.facts[data-astro-cid-m5gpva63]{display:flex;gap:var(--space-4);list-style:none;margin:var(--space-1) 0 0;padding:0;font-size:var(--text-sm);color:var(--color-text-muted)}.facts[data-astro-cid-m5gpva63] b[data-astro-cid-m5gpva63]{color:var(--color-text);font-weight:600}\n.filters[data-astro-cid-egeukbqw]{display:flex;gap:var(--space-2);flex-wrap:wrap;margin:var(--space-5) 0 var(--space-6)}.chip[data-astro-cid-egeukbqw]{border:1.5px solid var(--color-line);background:var(--color-surface);color:var(--color-text);padding:10px 16px;border-radius:var(--radius-pill);font:600 var(--text-sm)/1 var(--font-body);cursor:pointer;min-height:44px}.chip[data-astro-cid-egeukbqw][aria-pressed=true]{background:var(--color-charcoal);color:#fff;border-color:var(--color-charcoal)}.sub[data-astro-cid-egeukbqw]{font-size:var(--text-xl);margin:var(--space-7) 0 var(--space-5);padding-top:var(--space-5);border-top:1px solid var(--color-line)}.sub[data-astro-cid-egeukbqw].sold{color:var(--color-text-muted)}.empty[data-astro-cid-egeukbqw]{padding:var(--space-6);background:var(--color-surface);border-radius:var(--radius-md)}\n"}],"routeData":{"route":"/properties","isIndex":true,"type":"page","pattern":"^\\/properties\\/$","segments":[[{"content":"properties","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/properties/index.astro","pathname":"/properties","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/paramorerealestate/_astro/about.DB7WxFgw.css"},{"type":"inline","content":".card[data-astro-cid-m5gpva63]{display:flex;flex-direction:column;background:var(--color-surface);border-radius:var(--radius-lg);overflow:hidden;text-decoration:none;box-shadow:var(--shadow-card);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out)}.card[data-astro-cid-m5gpva63]:hover{transform:translateY(-3px);box-shadow:var(--shadow-lift)}.media[data-astro-cid-m5gpva63]{position:relative;aspect-ratio:3 / 2;background:var(--color-sand)}.media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease-out)}.card[data-astro-cid-m5gpva63]:hover .media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{transform:scale(1.03)}.card[data-astro-cid-m5gpva63][data-status=sold] .media[data-astro-cid-m5gpva63] img[data-astro-cid-m5gpva63]{filter:saturate(.75)}.tag[data-astro-cid-m5gpva63]{position:absolute;top:12px;left:12px}.body[data-astro-cid-m5gpva63]{padding:var(--space-4) var(--space-5) var(--space-5);display:flex;flex-direction:column;gap:var(--space-2)}.price-row[data-astro-cid-m5gpva63]{display:flex;justify-content:space-between;align-items:baseline;gap:var(--space-3)}.price[data-astro-cid-m5gpva63]{font-family:var(--font-display);font-size:var(--text-xl);font-weight:600}.city[data-astro-cid-m5gpva63]{font-size:var(--text-sm)}h3[data-astro-cid-m5gpva63]{font-family:var(--font-body);font-size:var(--text-base);font-weight:500;line-height:var(--leading-snug);color:var(--color-text)}.facts[data-astro-cid-m5gpva63]{display:flex;gap:var(--space-4);list-style:none;margin:var(--space-1) 0 0;padding:0;font-size:var(--text-sm);color:var(--color-text-muted)}.facts[data-astro-cid-m5gpva63] b[data-astro-cid-m5gpva63]{color:var(--color-text);font-weight:600}\n.hero[data-astro-cid-j7pv25f6]{position:relative;min-height:min(78vh,760px);display:grid;align-items:end;color:#fff;overflow:hidden;background:var(--color-charcoal)}.hero-img[data-astro-cid-j7pv25f6]{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9}.hero[data-astro-cid-j7pv25f6]:after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,#2b2a2c26,#2b2a2cb8)}.hero-copy[data-astro-cid-j7pv25f6]{position:relative;z-index:1;padding:var(--space-9) 0 var(--space-8);max-width:1100px}.hero[data-astro-cid-j7pv25f6] h1[data-astro-cid-j7pv25f6]{font-size:var(--text-hero);font-weight:500;margin:0 0 var(--space-4);max-width:18ch}.lede[data-astro-cid-j7pv25f6]{font-size:var(--text-xl);color:#ede8e1;margin:0}.actions[data-astro-cid-j7pv25f6]{display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-5)}.hero[data-astro-cid-j7pv25f6] .btn-ghost[data-astro-cid-j7pv25f6]{color:#fff}.about[data-astro-cid-j7pv25f6]{display:grid;grid-template-columns:minmax(220px,1fr) 2fr;gap:var(--space-7);align-items:center}.portrait[data-astro-cid-j7pv25f6]{width:100%;max-width:360px;border-radius:var(--radius-lg);object-fit:cover;aspect-ratio:4 / 5}blockquote[data-astro-cid-j7pv25f6]{margin:var(--space-5) 0;padding-left:var(--space-5);border-left:3px solid var(--color-orange);font-family:var(--font-display);font-size:var(--text-lg)}blockquote[data-astro-cid-j7pv25f6] footer[data-astro-cid-j7pv25f6]{font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-text-muted)}.cta[data-astro-cid-j7pv25f6]{display:flex;justify-content:space-between;align-items:center;gap:var(--space-6);flex-wrap:wrap;background:var(--color-surface);border-radius:var(--radius-lg);padding:var(--space-7);box-shadow:var(--shadow-card)}@media(max-width:720px){.about[data-astro-cid-j7pv25f6]{grid-template-columns:1fr}.portrait[data-astro-cid-j7pv25f6]{max-width:260px}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}}],"site":"https://paramore.design","base":"/paramorerealestate/","trailingSlash":"always","compressHTML":true,"componentMetadata":[["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/properties/[slug]@_@astro":"pages/properties/_slug_.astro.mjs","\u0000@astro-page:src/pages/properties/index@_@astro":"pages/properties.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astrojs-manifest":"manifest_4BDvwq8p.mjs","/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.DhP20Jtl.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/hunterparamore/Documents/Claude/Projects/Paramore Real Estate/site/src/pages/properties/index.astro?astro&type=script&index=0&lang.ts","const c=document.querySelectorAll(\".chip\"),d=document.querySelectorAll(\".card\"),a=document.querySelector(\".empty\");c.forEach(e=>e.addEventListener(\"click\",()=>{c.forEach(t=>t.setAttribute(\"aria-pressed\",String(t===e)));const s=e.dataset.kind;let n=0;d.forEach(t=>{const o=s===\"all\"||t.dataset.kind===s;t.hidden=!o,o&&t.dataset.status!==\"sold\"&&n++}),a.hidden=n>0}));"]],"assets":["/paramorerealestate/file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/about/index.html","/paramorerealestate/file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/contact/index.html","/paramorerealestate/file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/properties/index.html","/paramorerealestate/file:///Users/hunterparamore/Documents/Claude/Projects/Paramore%20Real%20Estate/site/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"PdMBE0J8yqoxH//tb9iW7UxKwGlF4j4FOrK8+xzjBjY="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
