// Minimal static server for local preview: node serve.mjs [port]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT) || Number(process.argv[2]) || 5173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.otf': 'font/otf', '.ttf': 'font/ttf',
};

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    const type = types[extname(file)] || 'application/octet-stream';
    // Byte ranges, like GitHub Pages: videos need them to seek (scrubbing back and forth)
    const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (range) {
      const size = body.length;
      let start = range[1] ? Number(range[1]) : size - Number(range[2]);
      let end = range[1] && range[2] ? Number(range[2]) : size - 1;
      start = Math.max(0, start); end = Math.min(size - 1, end);
      if (start > end) return res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end();
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1, 'Cache-Control': 'no-cache' });
      return res.end(body.subarray(start, end + 1));
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch {
    // Page addresses (/work/branding, /work/branding/aakara) are drawn by the app, so
    // anything without a file extension gets the homepage
    if (extname(path)) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'Content-Type': types['.html'], 'Cache-Control': 'no-cache' });
    res.end(await readFile(join(root, 'index.html')));
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
