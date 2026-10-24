import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin kustom untuk menyajikan folder game/dist di path /game/
function serveGameDist() {
  const gameDistPath = path.resolve(__dirname, 'game/dist');

  return {
    name: 'serve-game-dist',
    configureServer(server) {
      server.middlewares.use('/game/dist', (req, res, next) => {
        // Strip prefix /game/dist dari URL → cari di game/dist/
        const filePath = path.join(gameDistPath, req.url === '/' ? 'index.html' : req.url);

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', getMimeType(filePath));
          fs.createReadStream(filePath).pipe(res);
        } else {
          // Fallback ke index.html untuk SPA routing
          const indexPath = path.join(gameDistPath, 'index.html');
          if (fs.existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(indexPath).pipe(res);
          } else {
            next();
          }
        }
      });
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveGameDist()],
  server: {
    allowedHosts: ['https://pappose-unprim-jaden.ngrok-free.dev'],
    host: true,
    port: 3001,
    open: false,
  },
});
