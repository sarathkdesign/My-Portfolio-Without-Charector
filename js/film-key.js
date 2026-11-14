/* The menu's pixel-art film, drawn without its flat cream background.

   The film is a cream frame with the character in it. Laid over the menu's see-through, blurred
   background, any cream left in the frame shows as a box with an edge. So each frame is redrawn on
   a canvas with its background made transparent, and only the character is drawn.

   Plain colour keying isn't enough: the brightest skin highlights are the same cream as the
   background and would turn into holes. So the background is found by flood-filling the cream
   inward from the frame's top and sides (on a small 480×270 copy). Only cream reached that way
   becomes transparent, and the outline pixels get a soft key with the cream taken out of their
   colour, so no light halo is left. Anything enclosed by the character stays solid.

   If WebGL isn't available, nothing changes: the video plays as before, with its soft CSS fades. */

const MATTE_W = 480, MATTE_H = 270; // the small copy the background is found on
const MAX_W = 1280; // drawing width; the menu never shows the film larger than this
const FLOOD = 16; // how close (0–255 RGB distance) to the cream a pixel must be to count as background

const VERT = `
attribute vec2 p;
varying vec2 uv;
void main() { uv = vec2(p.x, -p.y) * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision mediump float;
uniform sampler2D frame, matte;
varying vec2 uv;
void main() {
  // the cream, read from the frame's own top corners (so it matches however this browser decodes colour)
  vec3 key = 0.5 * (texture2D(frame, vec2(0.02, 0.03)).rgb + texture2D(frame, vec2(0.98, 0.03)).rgb);
  vec3 c = texture2D(frame, uv).rgb;
  float bg = texture2D(matte, uv).a; // 1 where the background was reached, 0 inside the character
  float a = mix(1.0, smoothstep(10.0 / 255.0, 60.0 / 255.0, distance(c, key)), bg);
  gl_FragColor = vec4(clamp(c - (1.0 - a) * key, 0.0, a), a); // premultiplied, cream taken out
}`;

export function keyFilm(video) {
  const canvas = document.createElement('canvas');
  canvas.className = 'menu__film-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
  if (!gl) return null;

  const shader = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const texture = (unit, name) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(prog, name), unit);
  };
  texture(0, 'frame');
  texture(1, 'matte');
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

  // The background, found on a small copy of the frame
  const small = document.createElement('canvas');
  small.width = MATTE_W;
  small.height = MATTE_H;
  const sctx = small.getContext('2d', { willReadFrequently: true });
  const reached = new Uint8Array(MATTE_W * MATTE_H);
  const matte = new Uint8Array(MATTE_W * MATTE_H);
  const queue = new Int32Array(MATTE_W * MATTE_H);
  const findBackground = (source) => {
    sctx.drawImage(source, 0, 0, MATTE_W, MATTE_H);
    const px = sctx.getImageData(0, 0, MATTE_W, MATTE_H).data;
    // the cream: the average of two small patches at the top corners
    let r = 0, g = 0, b = 0, n = 0;
    for (const x0 of [2, MATTE_W - 8]) for (let y = 2; y < 8; y++) for (let x = x0; x < x0 + 6; x++) {
      const i = (y * MATTE_W + x) * 4;
      r += px[i]; g += px[i + 1]; b += px[i + 2]; n++;
    }
    r /= n; g /= n; b /= n;
    const limit = FLOOD * FLOOD;
    reached.fill(0);
    let head = 0, tail = 0;
    const visit = (p) => {
      if (reached[p]) return;
      const i = p * 4, dr = px[i] - r, dg = px[i + 1] - g, db = px[i + 2] - b;
      if (dr * dr + dg * dg + db * db > limit) return;
      reached[p] = 1;
      queue[tail++] = p;
    };
    // from the top and both sides; not the bottom, where the character runs off the frame
    for (let x = 0; x < MATTE_W; x++) visit(x);
    for (let y = 0; y < MATTE_H; y++) { visit(y * MATTE_W); visit(y * MATTE_W + MATTE_W - 1); }
    while (head < tail) {
      const p = queue[head++], x = p % MATTE_W;
      if (x > 0) visit(p - 1);
      if (x < MATTE_W - 1) visit(p + 1);
      if (p >= MATTE_W) visit(p - MATTE_W);
      if (p < MATTE_W * (MATTE_H - 1)) visit(p + MATTE_W);
    }
    // one cell wider, so the soft key decides the character's outline pixels
    for (let p = 0; p < matte.length; p++) {
      const x = p % MATTE_W;
      matte[p] = reached[p] || (x > 0 && reached[p - 1]) || (x < MATTE_W - 1 && reached[p + 1])
        || (p >= MATTE_W && reached[p - MATTE_W]) || (p < MATTE_W * (MATTE_H - 1) && reached[p + MATTE_W]) ? 255 : 0;
    }
  };

  const draw = (source, w, h) => {
    if (!w || !h) return;
    const cw = Math.min(w, MAX_W), ch = Math.round((cw * h) / w);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      gl.viewport(0, 0, cw, ch);
    }
    findBackground(source);
    gl.activeTexture(gl.TEXTURE0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
    gl.activeTexture(gl.TEXTURE1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.ALPHA, MATTE_W, MATTE_H, 0, gl.ALPHA, gl.UNSIGNED_BYTE, matte);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  let hasFrame = false;
  const drawVideo = () => {
    if (video.readyState < 2) return;
    try {
      draw(video, video.videoWidth, video.videoHeight);
      hasFrame = true;
    } catch {
      // a frame the browser won't hand over: show the plain video instead
      stop();
    }
  };
  // Until the first frame is decoded, the still frame (the poster), keyed the same way
  if (video.poster) {
    const still = new Image();
    still.src = video.poster;
    still.decode().then(() => { if (!hasFrame) draw(still, still.naturalWidth, still.naturalHeight); }).catch(() => {});
  }

  // Draw each new frame as it's shown. requestVideoFrameCallback fires only while the film plays,
  // so the closed menu costs nothing; older browsers use animation frames while it plays.
  let stopped = false;
  if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
    const onFrame = () => { if (stopped) return; drawVideo(); video.requestVideoFrameCallback(onFrame); };
    video.requestVideoFrameCallback(onFrame);
  } else {
    const tick = () => { if (stopped || video.paused) return; drawVideo(); requestAnimationFrame(tick); };
    video.addEventListener('play', () => requestAnimationFrame(tick));
  }
  video.addEventListener('loadeddata', drawVideo);

  const wrap = video.parentElement, film = wrap.closest('.menu__film');
  wrap.append(canvas);
  film?.classList.add('is-keyed');
  function stop() {
    stopped = true;
    canvas.remove();
    film?.classList.remove('is-keyed');
  }
  return { stop };
}
