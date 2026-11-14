import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// Dev-only middleware to mock Cloudflare Pages Function `/api/discovery-intake` on localhost
const localDevIntakePlugin = (): Plugin => ({
  name: 'local-dev-discovery-intake',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/discovery-intake' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const currentYear = new Date().getFullYear();
            const randomSeq = String(Math.floor(1000 + Math.random() * 9000)).padStart(5, '0');
            const leadReference = `AAA-DEV-${currentYear}-${randomSeq}`;
            const responseBody = {
              statusCode: 201,
              success: true,
              id: `dev-${Date.now()}`,
              leadReference,
              leadUID: leadReference,
              message: 'Discovery session request registered successfully (Local Dev).',
              createdAt: new Date().toISOString(),
            };
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            res.end(JSON.stringify(responseBody));
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid payload' }));
          }
        });
        return;
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    base: "/",
    plugins: [react(), tailwindcss(), localDevIntakePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 600,
      modulePreload: {
        resolveDependencies: (filename, deps, { hostType }) => {
          return deps.filter(dep => 
            !dep.includes('vendor-pdf') && 
            !dep.includes('vendor-purify') &&
            !dep.includes('locale-parent-guides') &&
            !dep.includes('locale-blog-content')
          );
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('translations_parent_guides') || id.includes('translations_guide_')) {
              return 'locale-parent-guides';
            }
            if (id.includes('blogContentTranslations') || id.includes('blogChapterGlances')) {
              return 'locale-blog-content';
            }
            if (id.includes('translations')) {
              return 'locale-core';
            }
            if (id.includes('node_modules')) {
              if (id.includes('jspdf') || id.includes('html2canvas')) {
                return 'vendor-pdf';
              }
              if (id.includes('dompurify')) {
                return 'vendor-purify';
              }
              if (id.includes('motion')) {
                return 'vendor-motion';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
