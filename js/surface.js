/*
  Surface: draws the opening screen (tiles + introduction text) into WebGL and
  passes it through one full-screen distortion pass:

  · lens  — a soft bulge that follows the cursor; it swells with cursor speed
            and relaxes when the cursor rests
  · bend  — the whole screen bows sideways while the tiles travel fast
  · pulse — a ring-shaped ripple sent out from a click

  The real page stays underneath for layout, clicks, focus and screen readers;
  this canvas only paints over it. Anything that cannot run here (no WebGL2,
  reduced motion, keyboard use) simply shows the page as it is.
*/

const LENS_RADIUS = 520; // px
const LENS_STRENGTH = 0.14;
const LENS_FULL_SPEED = 2000; // cursor px/s at which the lens is fully swollen
const BEND_MAX = 60; // px of sideways bow at full speed
const BEND_THRESHOLD = 260; // tile speed (px/s) before the screen starts to bend
const BEND_RANGE = 900; // px/s from threshold to full bend
const BEND_EDGE = 90; // px over which the bend fades out at the screen edges
const PULSE_LIFE = 1.05; // s
const SPEED_SMOOTHING = 0.09; // s over which cursor speed is averaged
const FOLLOW = 0.045; // s for the lens centre to catch up with the cursor

const QUAD_VS = `#version 300 es
uniform vec2 uView;
uniform vec4 uRect;
out vec2 vLocal;
void main() {
  vec2 corner = vec2(gl_VertexID % 2, gl_VertexID / 2);
  vLocal = corner;
  vec2 p = uRect.xy + corner * uRect.zw;
  gl_Position = vec4(p.x / uView.x * 2.0 - 1.0, 1.0 - p.y / uView.y * 2.0, 0.0, 1.0);
}`;

const QUAD_FS = `#version 300 es
precision highp float;
in vec2 vLocal;
uniform sampler2D uImage;
uniform vec4 uUv;
out vec4 color;
void main() {
  color = texture(uImage, uUv.xy + vLocal * uUv.zw);
}`;

const WARP_VS = `#version 300 es
uniform vec2 uView;
out vec2 vPoint;
void main() {
  // One oversized triangle covers the screen
  vec2 clip = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
  vPoint = vec2((clip.x + 1.0) * 0.5, (1.0 - clip.y) * 0.5) * uView;
  gl_Position = vec4(clip, 0.0, 1.0);
}`;

const WARP_FS = `#version 300 es
precision highp float;
in vec2 vPoint;
uniform sampler2D uScene;
uniform vec2 uView;
uniform vec2 uPointer;
uniform float uLensRadius;
uniform float uLens;
uniform float uBend;
uniform float uBendEdge;
uniform vec4 uPulse; // centre x, centre y, ring radius, amplitude
uniform float uPulseWidth;
out vec4 color;

const float PI = 3.14159265;

void main() {
  // Lens: pull samples toward the cursor, which magnifies what sits under it
  vec2 fromPointer = vPoint - uPointer;
  float reach = length(fromPointer) / uLensRadius;
  vec2 lens = fromPointer * exp(-2.0 * reach * reach) * uLens;

  // Bend: rows in the middle of the screen shift sideways, top and bottom stay put
  float bend = 0.0;
  if (uBend != 0.0) {
    float rows = max(sin(PI * vPoint.y / uView.y), 0.0);
    float edges = smoothstep(0.0, uBendEdge, vPoint.x) * smoothstep(0.0, uBendEdge, uView.x - vPoint.x);
    bend = uBend * rows * edges;
  }

  // Pulse: a thin ring that pushes content outward as it expands
  vec2 ring = vec2(0.0);
  if (uPulse.w != 0.0) {
    vec2 fromCentre = vPoint - uPulse.xy;
    float dist = length(fromCentre);
    float band = (dist - uPulse.z) / max(uPulseWidth * uPulse.z, 1.0);
    ring = fromCentre / max(dist, 1.0) * uPulse.w * exp(-band * band);
  }

  vec2 source = vPoint - lens - vec2(bend, 0.0) - ring;
  vec2 uv = vec2(source.x / uView.x, 1.0 - source.y / uView.y);
  color = vec4(texture(uScene, clamp(uv, vec2(0.0), vec2(1.0))).rgb, 1.0);
}`;

function compile(gl, vs, fs) {
  const make = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  };
  const v = make(gl.VERTEX_SHADER, vs);
  const f = make(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const program = gl.createProgram();
  gl.attachShader(program, v);
  gl.attachShader(program, f);
  gl.linkProgram(program);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const uniforms = {};
  for (let i = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i--;) {
    const { name } = gl.getActiveUniform(program, i);
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
}

const parseColor = (css) => {
  const hex = css.trim().replace('#', '');
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, '$&$&') : hex, 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

/**
 * @param {object} o
 * @param {HTMLCanvasElement} o.canvas
 * @param {() => number} o.tileSpeed  current tile velocity in px/s (negative = moving left)
 * @param {() => void} [o.onFail]     called if the device cannot keep up
 */
export function createSurface({ canvas, tileSpeed, onFail }) {
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false });
  if (!gl) return null;
  const quad = compile(gl, QUAD_VS, QUAD_FS);
  const warp = compile(gl, WARP_VS, WARP_FS);
  if (!quad || !warp) return null;

  const vao = gl.createVertexArray();
  const sceneTex = gl.createTexture();
  const sceneFbo = gl.createFramebuffer();
  const textTex = gl.createTexture();
  const textCanvas = document.createElement('canvas');
  const ctx = textCanvas.getContext('2d');
  const range = document.createRange();
  const images = new Map(); // src → { tex, w, h }

  const hero = document.querySelector('.hero');
  const intro = document.querySelector('.hero__intro');
  const wordmark = document.querySelector('.wordmark');
  const textRoots = [
    document.querySelector('[data-wordmark-text]'),
    document.querySelector('[data-scramble-source="role"]'),
    document.querySelector('.hero__para'),
  ];
  const cream = parseColor(getComputedStyle(document.documentElement).getPropertyValue('--cream') || '#eeebe1');

  let W = 0, H = 0, dpr = 1;
  let running = false, raf = 0, last = 0;
  let textDirty = true, labelsShown = false, warmUntil = 0;
  // x/y: where the cursor is; lx/ly: where the lens is (glides after it); travel: distance since last frame
  const pointer = { x: -1e4, y: -1e4, lx: -1e4, ly: -1e4, travel: 0, inside: false, speed: 0 };
  let lens = 0, bend = 0, pulse = null, slowFrames = 0;
  let maxDpr = 2, frameAvg = 1 / 60, framesSinceResize = 0;

  const setTexParams = (tex, mip) => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  setTexParams(sceneTex, false);
  setTexParams(textTex, false);

  const resize = () => {
    dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
    W = document.documentElement.clientWidth;
    H = document.documentElement.clientHeight;
    canvas.width = textCanvas.width = Math.round(W * dpr);
    canvas.height = textCanvas.height = Math.round(H * dpr);
    gl.bindTexture(gl.TEXTURE_2D, sceneTex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sceneTex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    textDirty = true;
  };

  const imageTexture = (img) => {
    const key = img.currentSrc || img.src;
    let entry = images.get(key);
    if (entry) return entry;
    if (!img.complete || !img.naturalWidth) return null;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    setTexParams(tex, true);
    entry = { tex, w: img.naturalWidth, h: img.naturalHeight };
    images.set(key, entry);
    return entry;
  };

  // A tile video: its texture is refreshed with the current frame every time it is drawn
  const videos = new Map();
  const videoTexture = (v) => {
    if (v.readyState < 2 || !v.videoWidth) return null;
    let entry = videos.get(v);
    if (!entry) {
      const tex = gl.createTexture();
      setTexParams(tex, false);
      entry = { tex, w: v.videoWidth, h: v.videoHeight };
      videos.set(v, entry);
    }
    // Upload only when the video has moved on to a new frame (it runs at ~30fps; the screen at 60–120)
    if (entry.t === v.currentTime) return entry;
    entry.t = v.currentTime;
    gl.bindTexture(gl.TEXTURE_2D, entry.tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v);
    return entry;
  };

  // A one-pixel texture of a flat colour (behind a tile's picture shown whole)
  const colours = new Map();
  const colourTexture = (css) => {
    let tex = colours.get(css);
    if (tex) return tex;
    const [r, g, b] = (css.match(/[\d.]+/g) || [0, 0, 0]).map(Number);
    tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([r, g, b, 255]));
    setTexParams(tex, false);
    colours.set(css, tex);
    return tex;
  };

  /* ── Text: painted glyph by glyph at the exact spot the page lays it out ── */
  const ascents = new Map();
  const ascentFor = (font, size) => {
    if (!ascents.has(font)) {
      const m = ctx.measureText('Hg');
      ascents.set(font, m.fontBoundingBoxAscent || size * 0.92);
    }
    return ascents.get(font);
  };
  const alphaOf = (el) => {
    let a = 1;
    for (let n = el; n && n !== hero; n = n.parentElement) a *= parseFloat(getComputedStyle(n).opacity);
    return a;
  };

  const paintText = (root, clip) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    ctx.save();
    if (clip) {
      const r = clip.getBoundingClientRect();
      ctx.beginPath();
      ctx.rect(r.left, r.top, r.width, r.height);
      ctx.clip();
    }
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      if (!node.data.trim() || el.closest('.sr-only')) continue;
      const cs = getComputedStyle(el);
      const alpha = alphaOf(el);
      if (alpha < 0.01) continue;
      const size = parseFloat(cs.fontSize);
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      ctx.font = font;
      ctx.fillStyle = cs.color;
      ctx.globalAlpha = alpha;
      const ascent = ascentFor(font, size);
      const upper = cs.textTransform === 'uppercase';
      for (let i = 0; i < node.data.length; i++) {
        const ch = node.data[i];
        if (/\s/.test(ch)) continue;
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const r = range.getClientRects()[0];
        if (!r || !r.width) continue;
        ctx.fillText(upper ? ch.toUpperCase() : ch, r.left, r.top + ascent);
      }
    }
    ctx.restore();
  };

  const paintTextLayer = (labels) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.textBaseline = 'alphabetic';
    textRoots.forEach((root, i) => root && paintText(root, i === 0 ? wordmark : null));
    labels.forEach((label) => paintText(label));
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  };

  new MutationObserver(() => (textDirty = true)).observe(intro, {
    subtree: true, childList: true, characterData: true, attributes: true,
  });
  // CSS transitions (the opening fade and rise) change the text without touching the DOM,
  // so keep repainting for as long as any of them is running, however late it runs
  let transitions = 0;
  intro.addEventListener('transitionrun', () => transitions++);
  const settle = () => { transitions = Math.max(0, transitions - 1); textDirty = true; };
  intro.addEventListener('transitionend', settle);
  intro.addEventListener('transitioncancel', settle);
  document.fonts?.addEventListener?.('loadingdone', () => { ascents.clear(); textDirty = true; });

  /* ── Tiles: the image as the page crops it (cover, parallax shift, 1.1 zoom) ── */
  const drawTile = (item) => {
    const media = item.firstElementChild?.firstElementChild;
    const video = media?.querySelector('video');
    const img = media?.querySelector('img');
    if (!img) return null;
    const r = media.getBoundingClientRect();
    if (r.right < 0 || r.left > W) return null;
    const vEntry = video && videoTexture(video);
    const entry = vEntry || imageTexture(img);
    if (!entry) return r;
    const f = parseFloat(item.style.getPropertyValue('--f')) || 0.8;
    const w = r.width, box = r.height, visible = box * f;
    if (vEntry && video.dataset.zoom) {
      const k = parseFloat(video.dataset.zoom);
      gl.uniform4f(quad.uniforms.uRect, r.left, r.top, w, visible);
      gl.uniform4f(quad.uniforms.uUv, 0, 0, 1, 1);
      gl.bindTexture(gl.TEXTURE_2D, colourTexture('rgb(0, 0, 0)'));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      const s0 = Math.max(w / entry.w, box / entry.h) * k;
      const dw = entry.w * s0, dh = entry.h * s0;
      const shift = (parseFloat(video.style.getPropertyValue('--px')) || 0) / 100 * w;
      const ix = (w - dw) / 2 + shift, iy = (box - dh) * 0.35;
      const x0 = Math.max(0, ix), y0 = Math.max(0, iy), x1 = Math.min(w, ix + dw), y1 = Math.min(visible, iy + dh);
      if (x1 > x0 && y1 > y0) {
        gl.uniform4f(quad.uniforms.uRect, r.left + x0, r.top + y0, x1 - x0, y1 - y0);
        gl.uniform4f(quad.uniforms.uUv, (x0 - ix) / dw, (y0 - iy) / dh, (x1 - x0) / dw, (y1 - y0) / dh);
        gl.bindTexture(gl.TEXTURE_2D, entry.tex);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      return r;
    }
    if (media.hasAttribute('data-whole')) {
      gl.uniform4f(quad.uniforms.uRect, r.left, r.top, w, visible);
      gl.uniform4f(quad.uniforms.uUv, 0, 0, 1, 1);
      gl.bindTexture(gl.TEXTURE_2D, colourTexture(getComputedStyle(media).backgroundColor));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      const s = Math.min(w / entry.w, visible / entry.h);
      const dw = entry.w * s, dh = entry.h * s;
      gl.uniform4f(quad.uniforms.uRect, r.left + (w - dw) / 2, r.top + (visible - dh) / 2, dw, dh);
      gl.bindTexture(gl.TEXTURE_2D, entry.tex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      return r;
    }
    const s = Math.max(w / entry.w, box / entry.h);
    const dw = entry.w * s, dh = entry.h * s;
    const ox = (w - dw) * 0.5, oy = (box - dh) * 0.35;
    const shift = (parseFloat(img.style.getPropertyValue('--px')) || 0) / 100 * w;
    const toUv = (lx, ly) => {
      const px = w / 2 + (lx - w / 2 - shift) / 1.14;
      const py = box / 2 + (ly - box / 2) / 1.14;
      return [(px - ox) / dw, (py - oy) / dh];
    };
    const [u0, v0] = toUv(0, 0);
    const [u1, v1] = toUv(w, visible);
    gl.uniform4f(quad.uniforms.uRect, r.left, r.top, w, visible);
    gl.uniform4f(quad.uniforms.uUv, u0, v0, u1 - u0, v1 - v0);
    gl.bindTexture(gl.TEXTURE_2D, entry.tex);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return r;
  };

  /* ── Motion inputs ── */
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (pointer.inside) pointer.travel += Math.hypot(e.clientX - pointer.x, e.clientY - pointer.y);
    else { pointer.lx = e.clientX; pointer.ly = e.clientY; }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.inside = true;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => (pointer.inside = false));

  const ease = (current, target, rateUp, rateDown, dt) => {
    const rate = Math.abs(target) > Math.abs(current) ? rateUp : rateDown;
    return current + (target - current) * (1 - Math.pow(1 - rate, dt * 60));
  };

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, (now - last) / 1000 || 1 / 60);
    last = now;

    // A screen that can't hold ~45fps first drops the drawing resolution (2× → 1.5× → 1×),
    // which costs a little sharpness, before the effect is given up altogether
    frameAvg += (dt - frameAvg) * 0.05;
    if (++framesSinceResize > 90 && frameAvg > 1 / 45 && maxDpr > 1) {
      maxDpr = maxDpr > 1.5 ? 1.5 : 1;
      framesSinceResize = 0;
      frameAvg = 1 / 60;
      resize();
    }

    // Give up gracefully on a device that cannot keep the frame rate
    slowFrames = dt > 0.05 ? slowFrames + 1 : 0;
    if (slowFrames > 45) { stop(); onFail?.(); return; }

    // Cursor speed drives the lens; it swells with quick moves and relaxes at rest
    // Speed from the real distance the cursor covered, averaged over a short window, so
    // uneven mouse-event timing doesn't make the lens pulse
    const instant = pointer.inside ? pointer.travel / dt : 0;
    pointer.travel = 0;
    pointer.speed += (instant - pointer.speed) * (1 - Math.exp(-dt / SPEED_SMOOTHING));
    if (pointer.speed < 1) pointer.speed = 0;
    const follow = 1 - Math.exp(-dt / FOLLOW);
    pointer.lx += (pointer.x - pointer.lx) * follow;
    pointer.ly += (pointer.y - pointer.ly) * follow;
    const lensTarget = Math.pow(Math.min(pointer.speed / LENS_FULL_SPEED, 1), 3);
    lens += (lensTarget - lens) * (1 - Math.pow(0.92, dt * 60));
    if (!lensTarget && lens < 0.01) lens = 0;

    // Fast tile travel bows the screen, trailing behind the motion
    const v = tileSpeed();
    const bendTarget = Math.max(-1, Math.min(1, -Math.sign(v) * Math.max(Math.abs(v) - BEND_THRESHOLD, 0) / BEND_RANGE));
    bend = ease(bend, bendTarget, 0.25, 0.07, dt);
    if (!bendTarget && Math.abs(bend) < 0.01) bend = 0;

    let pulseUniform = [0, 0, 0, 0];
    if (pulse) {
      const t = (now - pulse.start) / 1000;
      if (t > PULSE_LIFE) pulse = null;
      else {
        const grow = Math.min(t / 0.06, 1);
        const fade = 1 - Math.max(0, Math.min(1, (t - 0.06) / (PULSE_LIFE - 0.06)));
        const radius = 80 + 400 * (1 - Math.pow(1 - t / PULSE_LIFE, 3));
        pulseUniform = [pulse.x, pulse.y, radius, 45 * grow * fade * fade];
      }
    }

    /* Scene → offscreen texture */
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFbo);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(cream[0], cream[1], cream[2], 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindVertexArray(vao);
    gl.useProgram(quad.program);
    gl.uniform2f(quad.uniforms.uView, W, H);
    gl.uniform1i(quad.uniforms.uImage, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.disable(gl.BLEND);

    const labels = [];
    for (const item of document.querySelectorAll('.strip__item')) {
      const r = drawTile(item);
      if (!r) continue;
      const label = item.querySelector('.card__label');
      if (label && parseFloat(getComputedStyle(label).opacity) > 0.01) labels.push(label);
    }

    // Text is repainted only when something about it changed
    const showing = labels.length > 0;
    if (textDirty || showing || labelsShown || transitions > 0 || now < warmUntil) {
      paintTextLayer(labels);
      textDirty = false;
    }
    labelsShown = showing;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform4f(quad.uniforms.uRect, 0, 0, W, H);
    gl.uniform4f(quad.uniforms.uUv, 0, 0, 1, 1);
    gl.bindTexture(gl.TEXTURE_2D, textTex);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.disable(gl.BLEND);

    /* Offscreen texture → screen, through the distortion */
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(warp.program);
    const u = warp.uniforms;
    gl.uniform2f(u.uView, W, H);
    gl.uniform2f(u.uPointer, pointer.lx, pointer.ly);
    gl.uniform1f(u.uLensRadius, LENS_RADIUS);
    gl.uniform1f(u.uLens, LENS_STRENGTH * lens);
    gl.uniform1f(u.uBend, BEND_MAX * bend);
    gl.uniform1f(u.uBendEdge, BEND_EDGE);
    gl.uniform4f(u.uPulse, ...pulseUniform);
    gl.uniform1f(u.uPulseWidth, 0.32);
    gl.uniform1i(u.uScene, 0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTex);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  };

  function start() {
    if (running) return;
    running = true;
    resize();
    // The opening sequence animates without touching the DOM text, so keep repainting through it
    warmUntil = performance.now() + 2600;
    last = performance.now();
    raf = requestAnimationFrame(frame);
    canvas.classList.add('is-on');
  }
  function stop() {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
    canvas.classList.remove('is-on');
  }

  window.addEventListener('resize', () => running && resize());

  return {
    start,
    stop,
    get running() { return running; },
    pulse(x, y) { if (running) pulse = { x, y, start: performance.now() }; },
  };
}
