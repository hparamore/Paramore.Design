// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://paramore.design',

  // Emit /work/index.html rather than /work.html so existing absolute links
  // like /work.html keep working via the redirects below, and new URLs are clean.
  build: { format: 'directory' },

  // Old .html URLs stay alive — they're in the wild (LinkedIn, the Medium post,
  // and every internal href written before the migration).
  redirects: {
    '/work.html': '/work',
    '/about.html': '/about',
    '/build.html': '/build',
    '/super-com.html': '/super-com',
    '/projects/spnkr.html': '/projects/spnkr',
    '/projects/mutual.html': '/projects/mutual',
    '/projects/game-ui.html': '/projects/game-ui',
    '/projects/the-tree-service.html': '/projects/the-tree-service',
  },
});
