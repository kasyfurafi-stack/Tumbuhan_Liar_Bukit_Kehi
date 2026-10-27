import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin kustom untuk menyajikan folder game/dist di server dev dan menyalinnya ke dist/game saat build
function gameIntegrationPlugin() {
  const gameDistPath = path.resolve(__dirname, 'game/dist');

  return {
    name: 'game-integration-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        let subPath = null;

        // Mendukung path /game, /game/dist, dan subpath bila memakai BASE_URL
        if (url.startsWith('/game/dist/')) {
          subPath = url.slice('/game/dist/'.length);
        } else if (url === '/game/dist' || url === '/game/dist/') {
          subPath = 'index.html';
        } else if (url.startsWith('/game/')) {
          subPath = url.slice('/game/'.length);
        } else if (url === '/game') {
          res.writeHead(302, { Location: '/game/' });
          return res.end();
        }

        if (subPath !== null) {
          const cleanSubPath = subPath === '' ? 'index.html' : subPath.split('?')[0];
          const filePath = path.join(gameDistPath, cleanSubPath);

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', getMimeType(filePath));
            return fs.createReadStream(filePath).pipe(res);
          } else {
            const indexPath = path.join(gameDistPath, 'index.html');
            if (fs.existsSync(indexPath)) {
              res.setHeader('Content-Type', 'text/html');
              return fs.createReadStream(indexPath).pipe(res);
            }
          }
        }
        next();
      });
    },
    closeBundle() {
      // Salin hasil build game ke folder dist utama setelah vite build selesai
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(gameDistPath) && fs.existsSync(distDir)) {
        const targetGame = path.join(distDir, 'game');
        const targetGameDist = path.join(distDir, 'game', 'dist');

        try {
          fs.cpSync(gameDistPath, targetGame, { recursive: true });
          fs.cpSync(gameDistPath, targetGameDist, { recursive: true });
          console.log('\n✓ Berhasil menyalin game/dist ke dist/game dan dist/game/dist');
        } catch (err) {
          console.error('Gagal menyalin folder game ke dist:', err);
        }
      }
    },
  };
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf':  'font/ttf',
    '.json': 'application/json',
    '.mp3':  'audio/mpeg',
    '.ogg':  'audio/ogg',
    '.mp4':  'video/mp4',
    '.webm': 'video/webm',
    '.glb':  'model/gltf-binary',
    '.gltf': 'model/gltf+json',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// GitHub Pages path diatur jika di GitHub Actions atau environment GITHUB_PAGES
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';
const basePath = process.env.BASE_URL || (isGitHubPages ? '/Tumbuhan_Liar_Bukit_Kehi/' : './');

// https://vitejs.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react(), gameIntegrationPlugin()],
  server: {
    allowedHosts: ['https://pappose-unprim-jaden.ngrok-free.dev'],
    host: true,
    port: 3001,
    open: false,
  },
});
