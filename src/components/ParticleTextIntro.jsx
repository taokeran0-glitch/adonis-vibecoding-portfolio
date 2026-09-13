import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 5600;
const ASSEMBLE_DURATION = 2300;

const vertexShaderSource = `
  attribute vec2 a_origin;
  attribute vec2 a_scatter;
  attribute vec3 a_color;
  attribute float a_seed;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_intro;
  uniform float u_mouse_active;
  uniform float u_pixel_ratio;

  varying vec3 v_color;
  varying float v_alpha;

  void main() {
    float assembled = 1.0 - pow(1.0 - u_intro, 3.0);
    vec2 position = mix(a_scatter, a_origin, assembled);

    float drift = (1.0 - assembled) * 12.0;
    position.x += sin(u_time * 0.0011 + a_seed * 31.0) * drift;
    position.y += cos(u_time * 0.0009 + a_seed * 23.0) * drift;

    vec2 fromMouse = position - u_mouse;
    float mouseDistance = length(fromMouse);
    float radius = 145.0 * u_pixel_ratio;
    float pressure = smoothstep(radius, 0.0, mouseDistance) * u_mouse_active;
    position += normalize(fromMouse + vec2(0.001)) * pressure * radius * 0.55;

    vec2 clip = (position / u_resolution) * 2.0 - 1.0;
    clip.y *= -1.0;
    float depth = sin(u_time * 0.00045 + a_seed * 18.0) * 0.006;
    clip *= 1.0 + depth;
    gl_Position = vec4(clip, depth, 1.0);
    gl_PointSize = (1.95 + sin(a_seed * 70.0 + u_time * 0.002) * 0.4) * (1.0 + depth * 4.0) * u_pixel_ratio;
    v_color = a_color;
    v_alpha = 0.58 + assembled * 0.42;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec3 v_color;
  varying float v_alpha;

  void main() {
    vec2 center = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(center);
    float edge = 1.0 - smoothstep(0.28, 0.5, distanceToCenter);
    gl_FragColor = vec4(v_color, edge * v_alpha);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function makeParticleData(width, height, pixelRatio) {
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const context = offscreen.getContext("2d", { willReadFrequently: true });

  let fontSize = Math.min(218 * pixelRatio, width / 4.15);
  const maxTextWidth = width - Math.min(120 * pixelRatio, width * 0.1);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`;
  const measuredWidth = context.measureText("ADONIS").width;
  if (measuredWidth > maxTextWidth) {
    fontSize *= maxTextWidth / measuredWidth;
    context.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`;
  }
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("ADONIS", width / 2, height / 2 - 10 * pixelRatio);

  const image = context.getImageData(0, 0, width, height).data;
  const gap = (window.innerWidth < 720 ? 4.5 : 3.5) * pixelRatio;
  const origins = [];
  const scatters = [];
  const colors = [];
  const seeds = [];
  const palette = [
    [0.93, 0.91, 0.85],
    [0.09, 0.29, 0.88],
    [0.9, 0.29, 0.19],
    [0.7, 0.84, 0.11],
  ];

  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      const alpha = image[(Math.floor(y) * width + Math.floor(x)) * 4 + 3];
      if (alpha < 110) continue;

      const seed = Math.random();
      const color = seed > 0.975 ? palette[2] : seed > 0.94 ? palette[3] : seed > 0.82 ? palette[1] : palette[0];
      origins.push(x, y);
      scatters.push(Math.random() * width, Math.random() * height);
      colors.push(...color);
      seeds.push(seed);
    }
  }

  return {
    origins: new Float32Array(origins),
    scatters: new Float32Array(scatters),
    colors: new Float32Array(colors),
    seeds: new Float32Array(seeds),
    count: seeds.length,
  };
}

function bindAttribute(gl, program, name, values, size) {
  const location = gl.getAttribLocation(program, name);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  return buffer;
}

export function ParticleTextIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const enterRef = useRef(null);
  const completedRef = useRef(false);
  const [phase, setPhase] = useState("assembling");
  const [fallback, setFallback] = useState(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase("leaving");
    window.setTimeout(onComplete, 760);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-locked");
    enterRef.current?.focus({ preventScroll: true });
    const readyTimer = window.setTimeout(() => setPhase("ready"), reducedMotion ? 100 : ASSEMBLE_DURATION);
    const finishTimer = window.setTimeout(finish, reducedMotion ? 1200 : INTRO_DURATION);
    const onKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(finishTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    const program = gl ? createProgram(gl) : null;

    if (!gl || !program) {
      setFallback(true);
      return undefined;
    }

    let animationFrame = 0;
    let buffers = [];
    let particleCount = 0;
    let startTime = performance.now();
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const introLocation = gl.getUniformLocation(program, "u_intro");
    const mouseActiveLocation = gl.getUniformLocation(program, "u_mouse_active");
    const pixelRatioLocation = gl.getUniformLocation(program, "u_pixel_ratio");

    const rebuild = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      mouse.targetX = mouse.x;
      mouse.targetY = mouse.y;
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));

      const data = makeParticleData(canvas.width, canvas.height, pixelRatio);
      buffers = [
        bindAttribute(gl, program, "a_origin", data.origins, 2),
        bindAttribute(gl, program, "a_scatter", data.scatters, 2),
        bindAttribute(gl, program, "a_color", data.colors, 3),
        bindAttribute(gl, program, "a_seed", data.seeds, 1),
      ];
      particleCount = data.count;
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(pixelRatioLocation, pixelRatio);
    };

    const draw = (now) => {
      const elapsed = now - startTime;
      const intro = reducedMotion ? 1 : Math.min(1, elapsed / ASSEMBLE_DURATION);
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;
      mouse.active += (mouse.targetActive - mouse.active) * 0.12;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.useProgram(program);
      gl.uniform1f(timeLocation, elapsed);
      gl.uniform1f(introLocation, intro);
      gl.uniform2f(mouseLocation, mouse.x, mouse.y);
      gl.uniform1f(mouseActiveLocation, mouse.active);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      animationFrame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = canvas.width / rect.width;
      mouse.targetX = (event.clientX - rect.left) * pixelRatio;
      mouse.targetY = (event.clientY - rect.top) * pixelRatio;
      mouse.targetActive = event.pointerType === "touch" ? 0 : 1;
    };
    const onPointerLeave = () => {
      mouse.targetActive = 0;
    };
    const onResize = () => {
      rebuild();
      startTime = performance.now() - ASSEMBLE_DURATION;
    };

    gl.useProgram(program);
    rebuild();
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      className={`particle-intro particle-intro--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Adonis 作品集开场动画"
    >
      <div className="particle-intro__grain" aria-hidden="true" />
      <div className="particle-intro__meta particle-intro__meta--top">
        <span>PORTFOLIO / INTERACTIVE ARCHIVE</span>
        <span>00 / 07</span>
      </div>

      <canvas ref={canvasRef} className="particle-intro__canvas" aria-hidden="true" />
      {fallback && <div className="particle-intro__fallback" aria-hidden="true">ADONIS</div>}

      <div className="particle-intro__caption">
        <span>PLAYER CULTURE</span>
        <i aria-hidden="true" />
        <span>VISUAL CONTENT</span>
        <i aria-hidden="true" />
        <span>GROWTH</span>
      </div>

      <div className="particle-intro__meta particle-intro__meta--bottom">
        <span className="particle-intro__status">
          {phase === "assembling" ? "ASSEMBLING SIGNALS" : "ARCHIVE READY"}
        </span>
        <button ref={enterRef} type="button" className="particle-intro__enter" onClick={finish}>
          {phase === "assembling" ? "SKIP INTRO" : "ENTER ARCHIVE"} <span aria-hidden="true">↘</span>
        </button>
      </div>
      <span className="particle-intro__progress" aria-hidden="true" />
    </div>
  );
}
