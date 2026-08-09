import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dev-only middleware: serves the Netlify endorsements function at
 * /.netlify/functions/endorsements (and /api/endorsements) directly from the
 * Vite dev server, so plain `npm run dev` on localhost:5173 works without the
 * Netlify CLI. In production the real Netlify Function handles these routes.
 */
const endorsementsDevApi = (): Plugin => ({
  name: 'dev-endorsements-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const rawUrl = req.url ?? '';
      const pathname = rawUrl.split('?')[0];
      if (
        pathname !== '/.netlify/functions/endorsements' &&
        pathname !== '/api/endorsements'
      ) {
        return next();
      }
      try {
        const { handler } = await import('./netlify/functions/endorsements/endorsements.mjs');
        const url = new URL(rawUrl, 'http://localhost');
        const queryStringParameters: Record<string, string> = {};
        url.searchParams.forEach((value, key) => {
          queryStringParameters[key] = value;
        });
        const body = await new Promise<string | undefined>((resolve) => {
          let data = '';
          req.on('data', (chunk: Buffer) => {
            data += chunk.toString();
          });
          req.on('end', () => resolve(data || undefined));
          req.on('error', () => resolve(undefined));
        });
        const result = await handler({
          httpMethod: req.method ?? 'GET',
          path: pathname,
          rawUrl,
          queryStringParameters,
          headers: req.headers,
          body,
          isBase64Encoded: false,
        });
        res.statusCode = result.statusCode ?? 200;
        for (const [key, value] of Object.entries(result.headers ?? {})) {
          res.setHeader(key, String(value));
        }
        res.end(result.body ?? '');
      } catch (err) {
        console.error('[dev-endorsements-api]', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), endorsementsDevApi()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
});
