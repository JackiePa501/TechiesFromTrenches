import { useRef, useEffect } from 'react';
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  Vector2,
  Vector3,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  NearestFilter,
  RGBAFormat,
  UnsignedByteType,
  WebGLRenderTarget,
  CanvasTexture,
} from 'three';

const fullscreenVS = `
  attribute vec2 aPos;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    gl_Position = vec4(aPos, 0.0, 1.0);
    vUv = uv;
  }
`;

const particleVS = `
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uPointSize;
  uniform float uMaxDist;
  uniform vec2 uMouse;
  attribute float aSpeed;
  attribute float aAngle;
  attribute float aRandom;
  attribute float aRandom2;
  varying float vAlpha;
  varying float vRand2;

  void main() {
    vRand2 = aRandom2;
    vec2 p = vec2(position.x, position.y);
    vec2 d = vec2(cos(aAngle + aRandom * 6.28 + uTime * 0.2 * aSpeed), sin(aAngle + aRandom * 6.28 + uTime * 0.2 * aSpeed)) * 0.014 * aSpeed;
    p += d;
    p = fract(p);
    vec2 pos = (p * 2.0 - 1.0);
    float m = length((p - uMouse) * uRes);
    float md = uMaxDist * 3.0;
    float mA = smoothstep(md, md * 0.05, m);
    vAlpha = clamp(mA + 0.15, 0.0, 1.0);
    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = uPointSize * (1.0 + (1.0 - mA) * 2.0);
  }
`;

const particleFS = `
  uniform sampler2D uSprite;
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vRand2;

  void main() {
    vec2 uv = gl_PointCoord.xy - 0.5;
    vec2 rUV = vec2(
      uv.x * cos(6.28318 * vRand2) - uv.y * sin(6.28318 * vRand2),
      uv.x * sin(6.28318 * vRand2) + uv.y * cos(6.28318 * vRand2)
    );
    vec4 t = texture2D(uSprite, rUV + 0.5);
    if (t.a < 0.05) discard;
    gl_FragColor = vec4(uColor, t.a * vAlpha * 0.9);
  }
`;

const lineVS = `
  uniform vec2 uRes;
  uniform float uMaxDist;
  varying float vAlpha;

  void main() {
    vec2 pos = position.xy * 2.0 - 1.0;
    float m = length((position.xy - uMouse) * uRes);
    float md = uMaxDist * 3.0;
    vAlpha = smoothstep(md, md * 0.05, m);
    gl_Position = vec4(pos, 0.0, 1.0);
    gl_PointSize = 3.0 * uRes.x / 1000.0;
  }
`;

const lineFS = `
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * 0.15);
  }
`;

const passthroughFS = `
  uniform sampler2D uMap;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uMap, vUv);
  }
`;

const blurFS = `
  uniform sampler2D uMap;
  uniform vec2 uResolution;
  uniform vec2 uDir;
  uniform float uGains[3];
  varying vec2 vUv;

  void main() {
    vec2 pixel = uDir / uResolution;
    vec2 uv = floor(vUv * uResolution) / uResolution + pixel * 0.5;
    vec3 color = vec3(0.0);
    color += texture2D(uMap, uv + pixel * -4.0).rgb * uGains[2];
    color += texture2D(uMap, uv + pixel * -3.0).rgb * uGains[1];
    color += texture2D(uMap, uv + pixel * -2.0).rgb * uGains[0];
    color += texture2D(uMap, uv + pixel * -1.0).rgb * uGains[1];
    color += texture2D(uMap, uv                 ).rgb * uGains[0];
    color += texture2D(uMap, uv + pixel *  1.0).rgb * uGains[1];
    color += texture2D(uMap, uv + pixel *  2.0).rgb * uGains[0];
    color += texture2D(uMap, uv + pixel *  3.0).rgb * uGains[1];
    color += texture2D(uMap, uv + pixel *  4.0).rgb * uGains[2];
    gl_FragColor = vec4(color, 1.0);
  }
`;

const bloomFS = `
  uniform sampler2D uOriginal;
  uniform sampler2D uBloom;
  varying vec2 vUv;
  void main() {
    gl_FragColor = texture2D(uOriginal, vUv) + texture2D(uBloom, vUv);
  }
`;

class AnimatedCanvas {
  canvas: HTMLCanvasElement;
  prefersReduced: boolean;
  isVisible: boolean = true;
  dpr: number;
  W: number;
  H: number;
  N: number = 1200;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: OrthographicCamera;
  particlePoints!: Points;
  linePoints!: Points;
  positions!: Float32Array;
  speeds!: Float32Array;
  angles!: Float32Array;
  randoms!: Float32Array;
  randoms2!: Float32Array;
  mouse!: Vector2;
  smoothMouse!: Vector2;
  mouseDown: boolean = false;
  mouseActive: boolean = false;
  trailLen: number = 14;
  mouseHist: Float32Array;
  mouseIdx: number = 0;
  rt0!: WebGLRenderTarget;
  rt1!: WebGLRenderTarget;
  passthroughMat!: ShaderMaterial;
  blurMat!: ShaderMaterial;
  bloomMat!: ShaderMaterial;
  time: number = 0;
  particleSprite!: CanvasTexture;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.dpr = this.prefersReduced ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    this.W = canvas.clientWidth;
    this.H = canvas.clientHeight;
    this.mouseHist = new Float32Array(this.trailLen * 2).fill(0);
    this.buildSprite();
    this.initScene();
    this.setSize(this.W, this.H);
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVis);
    window.addEventListener('mousemove', this.handleMM);
    this.loop();
  }

  buildSprite() {
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const ctx = spriteCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad as CanvasGradient;
    ctx.fillRect(0, 0, 64, 64);
    this.particleSprite = new CanvasTexture(spriteCanvas);
    this.particleSprite.needsUpdate = true;
  }

  initScene() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    this.renderer.setPixelRatio(this.dpr);
    this.scene = new Scene();
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.mouse = new Vector2(-9999, -9999);
    this.smoothMouse = new Vector2(-9999, -9999);

    const isMobile = this.W < 768;
    this.N = isMobile ? 600 : 1200;

    this.positions = new Float32Array(this.N * 2);
    this.speeds = new Float32Array(this.N);
    this.angles = new Float32Array(this.N);
    this.randoms = new Float32Array(this.N);
    this.randoms2 = new Float32Array(this.N);

    for (let i = 0; i < this.N; i++) {
      const idx = i * 2;
      this.positions[idx] = Math.random();
      this.positions[idx + 1] = Math.random();
      this.speeds[i] = 0.1 + Math.random() * 0.3;
      this.angles[i] = Math.random() * Math.PI * 2;
      this.randoms[i] = Math.random();
      this.randoms2[i] = Math.random();
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(this.positions, 2));
    geometry.setAttribute('aSpeed', new Float32BufferAttribute(this.speeds, 1));
    geometry.setAttribute('aAngle', new Float32BufferAttribute(this.angles, 1));
    geometry.setAttribute('aRandom', new Float32BufferAttribute(this.randoms, 1));
    geometry.setAttribute('aRandom2', new Float32BufferAttribute(this.randoms2, 1));

    const particleMat = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vector2(this.W, this.H) },
        uPointSize: { value: 5 * this.dpr },
        uColor: { value: new Vector3(0.95, 0.94, 1.0) },
        uMaxDist: { value: 150 },
        uMouse: { value: new Vector2(-10, -10) },
        uSprite: { value: this.particleSprite },
      },
      vertexShader: particleVS,
      fragmentShader: particleFS,
      transparent: true,
      depthTest: false,
      blending: 2, // AdditiveBlending
    });

    this.particlePoints = new Points(geometry, particleMat);
    this.particlePoints.frustumCulled = false;
    this.scene.add(this.particlePoints);

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute('position', new Float32BufferAttribute(new Float32Array(this.trailLen * 2), 2));

    const lineMat = new ShaderMaterial({
      uniforms: {
        uRes: { value: new Vector2(this.W, this.H) },
        uMaxDist: { value: 150 },
        uMouse: { value: new Vector2(-10, -10) },
      },
      vertexShader: lineVS,
      fragmentShader: lineFS,
      transparent: true,
      depthTest: false,
      blending: 2,
    });

    this.linePoints = new Points(lineGeometry, lineMat);
    this.linePoints.frustumCulled = false;
    this.scene.add(this.linePoints);

    this.rt0 = new WebGLRenderTarget(1, 1, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      format: RGBAFormat,
      type: UnsignedByteType,
    });
    this.rt1 = new WebGLRenderTarget(1, 1, {
      minFilter: NearestFilter,
      magFilter: NearestFilter,
      format: RGBAFormat,
      type: UnsignedByteType,
    });

    this.initPost();
  }

  initPost() {
    this.passthroughMat = new ShaderMaterial({
      uniforms: { uMap: { value: null } },
      vertexShader: fullscreenVS,
      fragmentShader: passthroughFS,
    });

    this.blurMat = new ShaderMaterial({
      uniforms: {
        uMap: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uDir: { value: new Vector2(1, 0) },
        uGains: { value: [0.06, 0.07, 0.05] },
      },
      vertexShader: fullscreenVS,
      fragmentShader: blurFS,
    });

    this.bloomMat = new ShaderMaterial({
      uniforms: {
        uOriginal: { value: null },
        uBloom: { value: null },
      },
      vertexShader: fullscreenVS,
      fragmentShader: bloomFS,
    });
  }

  setSize(w: number, h: number) {
    this.W = w;
    this.H = h;
    if (w === 0 || h === 0) return;
    const bw = Math.floor(w * 0.5);
    const bh = Math.floor(h * 0.5);
    this.renderer.setSize(w, h, false);
    this.rt0.setSize(bw, bh);
    this.rt1.setSize(bw, bh);
    (this.particlePoints.material as ShaderMaterial).uniforms.uRes.value.set(w, h);
    (this.linePoints.material as ShaderMaterial).uniforms.uRes.value.set(w, h);
    this.blurMat.uniforms.uResolution.value.set(bw, bh);
  }

  drawQuad(target: WebGLRenderTarget | null, mat: ShaderMaterial) {
    const mesh = new Mesh(new PlaneGeometry(2, 2), mat);
    this.renderer.setRenderTarget(target);
    this.renderer.render(mesh, this.camera);
    mesh.geometry.dispose();
    (mesh.material as ShaderMaterial).dispose();
  }

  bloom() {
    this.blurMat.uniforms.uDir.value.set(1, 0);
    this.drawQuad(this.rt1, this.passthroughMat);
    this.blurMat.uniforms.uMap.value = this.rt0.texture;
    this.drawQuad(this.rt0, this.blurMat);
    this.blurMat.uniforms.uDir.value.set(0, 1);
    this.blurMat.uniforms.uMap.value = this.rt1.texture;
    this.drawQuad(this.rt1, this.blurMat);
    this.bloomMat.uniforms.uOriginal.value = this.rt1.texture;
    this.bloomMat.uniforms.uBloom.value = this.rt0.texture;
    this.drawQuad(this.rt1, this.bloomMat);
  }

  loop = () => {
    if (!this.isVisible) return;
    if (!this.prefersReduced) this.time += 0.005;

    this.mouseHist[this.mouseIdx] = this.mouse.x;
    this.mouseHist[this.mouseIdx + 1] = this.mouse.y;
    this.mouseIdx = (this.mouseIdx + 2) % (this.trailLen * 2);

    if (this.smoothMouse.x === -9999) {
      this.smoothMouse.copy(this.mouse);
    } else {
      this.smoothMouse.lerp(this.mouse, 0.15);
    }

    const pMat = this.particlePoints.material as ShaderMaterial;
    const lMat = this.linePoints.material as ShaderMaterial;

    pMat.uniforms.uTime.value = this.time;
    pMat.uniforms.uMouse.value.copy(this.smoothMouse);
    lMat.uniforms.uMouse.value.copy(this.smoothMouse);

    const linePos = this.linePoints.geometry.attributes.position;
    (linePos.array as Float32Array).set(this.mouseHist);
    linePos.needsUpdate = true;

    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
    this.bloom();

    requestAnimationFrame(this.loop);
  };

  handleResize = () => {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (w !== this.W || h !== this.H) this.setSize(w, h);
  };

  handleVis = () => {
    this.isVisible = !document.hidden;
    if (this.isVisible) this.loop();
  };

  handleMM = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.set(
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height
    );
    if (!this.mouseActive) {
      this.mouseActive = true;
      this.smoothMouse.copy(this.mouse);
    }
  };

  destroy() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVis);
    window.removeEventListener('mousemove', this.handleMM);
    this.renderer.dispose();
    this.rt0.dispose();
    this.rt1.dispose();
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<AnimatedCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    instanceRef.current = new AnimatedCanvas(canvasRef.current);
    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}