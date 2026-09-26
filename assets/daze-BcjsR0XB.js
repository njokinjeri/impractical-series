var y=Object.defineProperty;var u=(l,t)=>y(l,"name",{value:t,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";class T{static{u(this,"Renderer")}canvas;gl;positionBuffer=null;constructor(t){const e=document.getElementById(t);if(!e)throw new Error(`Canvas with id "${t}" not found.`);this.canvas=e;const i=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl");if(!i)throw new Error("WebGL is not supported in this browser.");this.gl=i,this.initBuffers(),this.resize(),window.addEventListener("resize",()=>this.resize())}initBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer);const t=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);this.gl.bufferData(this.gl.ARRAY_BUFFER,t,this.gl.STATIC_DRAW)}resize(){const t=Math.min(window.devicePixelRatio,1.5);this.canvas.width=window.innerWidth*t,this.canvas.height=window.innerHeight*t,this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}bindQuad(t){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.enableVertexAttribArray(t),this.gl.vertexAttribPointer(t,2,this.gl.FLOAT,!1,0,0)}draw(){this.gl.drawArrays(this.gl.TRIANGLES,0,6)}}class x{static{u(this,"ShaderProgram")}gl;program=null;uniforms={uResolution:null,uTime:null,uTouch:null,uTouchDelta:null,uTouchActive:null,uGrain:null,uPalette:null,uPatternIndex:null};constructor(t,e,i){this.gl=t,this.init(e,i)}compileShader(t,e){const i=this.gl.createShader(t);return i?(this.gl.shaderSource(i,e),this.gl.compileShader(i),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)?i:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(i)),this.gl.deleteShader(i),null)):null}init(t,e){const i=this.compileShader(this.gl.VERTEX_SHADER,t),a=this.compileShader(this.gl.FRAGMENT_SHADER,e);if(!i||!a)return;const o=this.gl.createProgram();if(o){if(this.gl.attachShader(o,i),this.gl.attachShader(o,a),this.gl.linkProgram(o),!this.gl.getProgramParameter(o,this.gl.LINK_STATUS)){console.error("Program linking error:",this.gl.getProgramInfoLog(o));return}this.program=o,this.cacheUniforms()}}cacheUniforms(){this.program&&(this.uniforms={uResolution:this.gl.getUniformLocation(this.program,"uResolution"),uTime:this.gl.getUniformLocation(this.program,"uTime"),uTouch:this.gl.getUniformLocation(this.program,"uTouch"),uTouchDelta:this.gl.getUniformLocation(this.program,"uTouchDelta"),uTouchActive:this.gl.getUniformLocation(this.program,"uTouchActive"),uGrain:this.gl.getUniformLocation(this.program,"uGrain"),uPalette:this.gl.getUniformLocation(this.program,"uPalette"),uPatternIndex:this.gl.getUniformLocation(this.program,"uPatternIndex")})}use(){this.program&&this.gl.useProgram(this.program)}dispose(){this.program&&(this.gl.deleteProgram(this.program),this.program=null)}}class M{static{u(this,"InputManager")}touchPos=[0,0];touchDelta=[0,0];lastTouchPos=[0,0];touchActive=0;onInteract=null;lastInteractTime=0;constructor(){this.initListeners()}triggerInteract(){const t=performance.now();t-this.lastInteractTime>250&&(this.lastInteractTime=t,this.onInteract&&this.onInteract())}initListeners(){const t=u((e,i,a)=>{const o=Math.min(window.devicePixelRatio,1.5),r=e*o,s=(window.innerHeight-i)*o;this.touchDelta[0]=r-this.lastTouchPos[0],this.touchDelta[1]=s-this.lastTouchPos[1],this.lastTouchPos[0]=r,this.lastTouchPos[1]=s,this.touchPos[0]=r,this.touchPos[1]=s,this.touchActive=a},"updatePointer");window.addEventListener("mousemove",e=>{t(e.clientX,e.clientY,e.buttons>0?1:.4)}),window.addEventListener("mousedown",e=>{const i=e.target;i.closest(".hud-card")||i.closest("button")||i.closest("input")||(t(e.clientX,e.clientY,1),this.triggerInteract())}),window.addEventListener("mouseup",()=>{this.touchActive=.4}),window.addEventListener("touchstart",e=>{const i=e.target;i.closest(".hud-card")||i.closest("button")||i.closest("input")||(e.touches.length>0&&t(e.touches[0].clientX,e.touches[0].clientY,1),this.triggerInteract())},{passive:!0}),window.addEventListener("touchmove",e=>{e.touches.length>0&&t(e.touches[0].clientX,e.touches[0].clientY,1)},{passive:!0}),window.addEventListener("touchend",()=>{this.touchActive=0})}update(){this.touchDelta[0]*=.8,this.touchDelta[1]*=.8}}class E{static{u(this,"PaletteManager")}currentPalette=0;onPaletteChange;constructor(t){this.onPaletteChange=t,this.initListeners()}initListeners(){const t=document.getElementById("pal-mono"),e=document.getElementById("pal-crimson"),i=document.getElementById("pal-cyber"),a=u((o,r)=>{this.currentPalette=o,[t,e,i].forEach(s=>s?.classList.remove("active")),r.classList.add("active"),document.body.classList.remove("theme-mono","theme-crimson","theme-cyber"),o===0?document.body.classList.add("theme-mono"):o===1?document.body.classList.add("theme-crimson"):o===2&&document.body.classList.add("theme-cyber"),this.onPaletteChange(o)},"setPalette");t&&t.addEventListener("click",()=>a(0,t)),e&&e.addEventListener("click",()=>a(1,e)),i&&i.addEventListener("click",()=>a(2,i))}getPalette(){return this.currentPalette}}class R{static{u(this,"HUDController")}isCollapsed=!1;onSpeedChange;onGrainChange;onFullscreenToggle;currentX=15;currentY=25;targetX=15;targetY=25;isAnimating=!1;constructor(t,e,i){this.onSpeedChange=t,this.onGrainChange=e,this.onFullscreenToggle=i,this.initHUDControls(),this.startCubeLoop()}initHUDControls(){const t=document.getElementById("slider-speed");t&&t.addEventListener("input",d=>{this.onSpeedChange(parseFloat(d.target.value))});const e=document.getElementById("slider-grain");e&&e.addEventListener("input",d=>{this.onGrainChange(parseFloat(d.target.value))});const i=document.getElementById("btn-fullscreen");i&&i.addEventListener("click",()=>{this.onFullscreenToggle()});const a=document.getElementById("btn-toggle-hud"),o=document.getElementById("hud-bottom-panel"),r=document.getElementById("toggle-label"),s=document.getElementById("toggle-icon");a&&o&&a.addEventListener("click",()=>{this.isCollapsed=!this.isCollapsed,this.isCollapsed?(o.style.maxHeight="0px",o.style.paddingTop="0px",o.style.paddingBottom="0px",o.style.opacity="0",o.style.borderWidth="0px",r&&(r.innerText="EXPAND CONTROLS"),s&&(s.style.transform="rotate(0deg)")):(o.style.maxHeight="250px",o.style.paddingTop="0.75rem",o.style.paddingBottom="0.75rem",o.style.opacity="1",o.style.borderWidth="1px",r&&(r.innerText="COLLAPSE CONTROLS"),s&&(s.style.transform="rotate(180deg)"))})}startCubeLoop(){const t=u(()=>{const e=document.getElementById("nav-cube");e&&(this.isAnimating||(this.targetY+=.4,this.targetX+=.15),this.currentX+=(this.targetX-this.currentX)*.1,this.currentY+=(this.targetY-this.currentY)*.1,e.style.transform=`rotateX(${this.currentX}deg) rotateY(${this.currentY}deg)`),requestAnimationFrame(t)},"renderLoop");requestAnimationFrame(t)}updateShaderNav(t,e,i,a){const o=document.getElementById("shader-title-display");o&&(o.innerText=e),this.isAnimating=!0,this.targetX=t*90+15,this.targetY=t*120+180,setTimeout(()=>{this.isAnimating=!1},800);const r=document.getElementById("pattern-subtitle");r&&(a?r.classList.remove("hidden"):r.classList.add("hidden")),document.querySelectorAll("#shader-buttons button").forEach((s,d)=>{d===t?s.classList.add("active"):s.classList.remove("active")})}updatePatternDisplay(t,e){const i=String(t+1).padStart(2,"0"),a=document.getElementById("pattern-index-display"),o=document.getElementById("pattern-name-display");a&&(a.innerText=`[${i}]`),o&&(o.innerText=e)}}const h=`
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uTouch;
  uniform vec2 uTouchDelta;
  uniform float uTouchActive;
  uniform float uGrain;
  uniform int uPalette;
  uniform int uPatternIndex;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 hash2(vec2 p) {
    return vec2(hash(p), hash(p + vec2(37.1, 17.4)));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec3 applyPalette(float t, float paletteShift) {
    t = clamp(t + paletteShift, 0.0, 1.0);
    if (uPalette == 1) { 
      vec3 black = vec3(0.02, 0.02, 0.03);
      vec3 crimson = vec3(0.9, 0.08, 0.12);
      vec3 white = vec3(0.98, 0.95, 0.95);
      if (t < 0.5) return mix(black, crimson, t * 2.0);
      return mix(crimson, white, (t - 0.5) * 2.0);
    } else if (uPalette == 2) { 
      vec3 dark = vec3(0.03, 0.05, 0.1);
      vec3 cyan = vec3(0.0, 0.85, 0.9);
      vec3 magenta = vec3(0.95, 0.1, 0.6);
      if (t < 0.5) return mix(dark, cyan, t * 2.0);
      return mix(cyan, magenta, (t - 0.5) * 2.0);
    }
    return vec3(t);
  }

  vec3 applyDuotone(float val) {
    val = clamp(val, 0.0, 1.0);
    if (uPalette == 1) {
      vec3 black = vec3(0.02, 0.02, 0.03);
      vec3 crimson = vec3(0.9, 0.08, 0.12);
      return mix(black, crimson, val);
    } else if (uPalette == 2) {
      vec3 dark = vec3(0.03, 0.05, 0.1);
      vec3 cyan = vec3(0.0, 0.85, 0.9);
      return mix(dark, cyan, val);
    }
    return vec3(val);
  }

  float addGrain(vec2 uv) {
    return (hash(uv + fract(uTime)) - 0.5) * uGrain;
  }

  vec2 getTouchNorm() {
    return (uTouch * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  }

  float touchDisplacement(vec2 st) {
    vec2 tNorm = getTouchNorm();
    float d = length(st - tNorm);
    return smoothstep(0.4, 0.0, d) * uTouchActive * sin(d * 20.0 - uTime * 5.0);
  }
`,b=h+`
  float bayer8(vec2 uv) {
    ivec2 p = ivec2(mod(uv, 8.0));
    int x = p.x; int y = p.y;
    int M[64];
    M[0]=0;  M[1]=32; M[2]=8;  M[3]=40; M[4]=2;  M[5]=34; M[6]=10; M[7]=42;
    M[8]=48; M[9]=16; M[10]=56;M[11]=24;M[12]=50;M[13]=18;M[14]=58;M[15]=26;
    M[16]=12;M[17]=44;M[18]=4; M[19]=36;M[20]=14;M[21]=46;M[22]=6; M[23]=38;
    M[24]=60;M[25]=28;M[26]=52;M[27]=20;M[28]=62;M[29]=30;M[30]=54;M[31]=22;
    M[32]=3; M[33]=35;M[34]=11;M[35]=43;M[36]=1; M[37]=33;M[38]=9; M[39]=41;
    M[40]=51;M[41]=19;M[42]=59;M[43]=27;M[44]=49;M[45]=17;M[46]=57;M[47]=25;
    M[48]=15;M[49]=47;M[50]=7; M[51]=39;M[52]=13;M[53]=45;M[54]=5; M[55]=37;
    M[56]=63;M[57]=31;M[58]=55;M[59]=23;M[60]=61;M[61]=29;M[62]=53;M[63]=21;
    for(int i=0; i<64; i++) {
      if (i == y * 8 + x) return float(M[i]) / 64.0;
    }
    return 0.0;
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    
    float d = length(st - tNorm);
    float touchRipple = sin(d * 25.0 - uTime * 6.0) * smoothstep(0.5, 0.0, d) * uTouchActive;
    
    float wave = sin(st.x * 4.0 + uTime + touchRipple * 2.5 + fbm(st * 2.0) * 4.0) * 0.5 + 0.5;
    vec2 bayerCoord = gl_FragCoord.xy - (uTouchDelta * 10.0) + (touchRipple * 20.0);
    float bayer = bayer8(bayerCoord);
    
    float quantized = step(bayer, wave);
    quantized += addGrain(vUv);
    
    gl_FragColor = vec4(applyDuotone(quantized), 1.0);
  }
`,P=h+`
  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float ripple = touchDisplacement(st);
    
    vec3 ro = vec3(0.0, 1.5, uTime * 0.8);
    vec3 rd = normalize(vec3(st.x, st.y - 0.3, 1.0));
    
    float t = 0.0;
    float accum = 0.0;
    
    for (int i = 0; i < 24; i++) {
      vec3 pos = ro + rd * t;
      float h = fbm(pos.xz * 0.5) * 1.2 + ripple * 0.4;
      float dist = pos.y - h;
      if (dist < 0.02) {
        accum = 1.0 - (float(i) / 24.0);
        break;
      }
      t += max(dist * 0.5, 0.05);
    }
    
    accum = clamp(accum, 0.0, 1.0);
    accum += addGrain(vUv);
    gl_FragColor = vec4(applyPalette(accum, 0.0), 1.0);
  }
`,S=h+`
  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    
    vec2 rel = st - tNorm;
    float d = length(rel);
    float swirlForce = exp(-d * 3.0) * uTouchActive * 2.5;
    float theta = swirlForce * 3.14159;
    mat2 rot = mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
    vec2 warpedSt = tNorm + rot * rel;
    
    vec2 q = vec2(0.0);
    q.x = fbm(warpedSt + uTime * 0.1);
    q.y = fbm(warpedSt + vec2(5.2, 1.3) + uTime * 0.15);
    
    vec2 r = vec2(0.0);
    r.x = fbm(warpedSt + 4.0 * q + vec2(1.7, 9.2));
    r.y = fbm(warpedSt + 4.0 * q + vec2(8.3, 2.8));
    
    float f = fbm(warpedSt + 4.0 * r);
    f = pow(f, 2.0);
    f += addGrain(vUv);
    gl_FragColor = vec4(applyPalette(f, 0.0), 1.0);
  }
`,w=h+`
  float pattern0_ThickChevronWeave(vec2 p) {
    p *= 4.0;
    p.y += uTime * 0.3;
    vec2 k = floor(p);
    vec2 f = fract(p);
    float zig = abs(f.x - 0.5) + (f.y * 0.5);
    if (mod(k.x + k.y, 2.0) > 0.5) {
      zig = abs((1.0 - f.x) - 0.5) + (f.y * 0.5);
    }
    return step(0.35, mod(zig * 4.0, 1.0));
  }

  float pattern1_RetroRibbons(vec2 p) {
    p *= 4.0;
    p.x += sin(floor(p.y) + uTime * 0.5) * 0.5;
    vec2 grid = fract(p) - 0.5;
    vec2 id = floor(p);
    float bend = mix(abs(grid.x), abs(grid.y), step(hash(id), 0.5));
    return step(0.0, sin(bend * 30.0 + uTime * 2.0));
  }

  float pattern2_ConcentricArcs(vec2 p) {
    p *= 5.0;
    p.y += uTime * 0.3;
    float d1 = length(fract(p) - 0.5);
    float d2 = length(fract(p + 0.5) - 0.5);
    return step(0.0, sin(min(d1, d2) * 24.0 + uTime * 1.5));
  }

  float pattern3_HalftoneMatrix(vec2 p) {
    p *= 8.0;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float wave = sin(id.x * 0.3 + id.y * 0.3 + uTime * 2.0) * 0.5 + 0.5;
    return step(length(f), wave * 0.45);
  }

  float pattern4_CitrusSlices(vec2 p) {
    p *= 3.5;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float r = length(f);
    float angle = atan(f.y, f.x) + uTime * 0.2 + hash(id);
    float outerRim = step(r, 0.42) * step(0.08, r);
    float spokes = step(0.1, sin(angle * 10.0)) * outerRim;
    float rind = step(0.42, r) * step(r, 0.46);
    return clamp(spokes + rind, 0.0, 1.0);
  }

  float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }

  float pattern5_ScatterSprinkles(vec2 p) {
    p *= 4.5;
    vec2 g = floor(p);
    vec2 f = fract(p) - 0.5;
    float mask = 0.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 cell = g + vec2(float(x), float(y));
        vec2 randVal = hash2(cell);
        float speed = 0.4 + randVal.x * 0.6;
        vec2 drift = vec2(cos(randVal.y * 6.28), sin(randVal.y * 6.28)) * sin(uTime * speed + randVal.x * 10.0) * 0.25;
        vec2 pos = vec2(float(x), float(y)) + (randVal - 0.5) * 0.5 + drift;
        float pulse = 1.0 + 0.2 * sin(uTime * 2.0 + randVal.y * 6.28);
        if (randVal.x > 0.35) {
          vec2 dir = vec2(cos(randVal.y * 6.28), sin(randVal.y * 6.28)) * 0.22 * pulse;
          if (sdCapsule(f - pos, -dir, dir, 0.055 * pulse) < 0.0) mask = 1.0;
        } else {
          if (length(f - pos) - ((0.06 + randVal.y * 0.04) * pulse) < 0.0) mask = 1.0;
        }
      }
    }
    return mask;
  }

  float pattern6_VoronoiJigsaw(vec2 p) {
    p *= 5.0;
    vec2 g = floor(p);
    vec2 f = fract(p);
    float md = 8.0;
    vec2 mr;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 lattice = vec2(float(x), float(y));
        vec2 offset = 0.5 + 0.35 * sin(uTime * 0.8 + 6.2831 * hash2(g + lattice));
        vec2 r = lattice + offset - f;
        if (dot(r, r) < md) { md = dot(r, r); mr = r; }
      }
    }
    md = 8.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 lattice = vec2(float(x), float(y));
        vec2 offset = 0.5 + 0.35 * sin(uTime * 0.8 + 6.2831 * hash2(g + lattice));
        vec2 r = lattice + offset - f;
        if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    }
    return 1.0 - smoothstep(0.03, 0.06, md);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    float lensRadius = 0.35;
    float distToLens = length(st - tNorm);
    float lensMask = smoothstep(lensRadius, lensRadius - 0.05, distToLens) * uTouchActive;
    vec2 p = mix(st, tNorm + normalize(st - tNorm) * sin(distToLens * 3.14159 / lensRadius) * 0.15, lensMask);

    float val = 0.0;
    if (uPatternIndex == 0) val = pattern0_ThickChevronWeave(p);
    else if (uPatternIndex == 1) val = pattern1_RetroRibbons(p);
    else if (uPatternIndex == 2) val = pattern2_ConcentricArcs(p);
    else if (uPatternIndex == 3) val = pattern3_HalftoneMatrix(p);
    else if (uPatternIndex == 4) val = pattern4_CitrusSlices(p);
    else if (uPatternIndex == 5) val = pattern5_ScatterSprinkles(p);
    else if (uPatternIndex == 6) val = pattern6_VoronoiJigsaw(p);

    float rim = smoothstep(lensRadius - 0.03, lensRadius, distToLens) * smoothstep(lensRadius, lensRadius - 0.08, distToLens) * uTouchActive * 0.6;
    val = clamp(val + rim, 0.0, 1.0);
    val += addGrain(vUv);
    
    gl_FragColor = vec4(applyDuotone(val), 1.0);
  }
`,L=`
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`,I=[b,P,S,w],A=["Dither Liquid","Volumetric Horizon","Viscous Dispersion","Generative Patterns"],m=["CHEVRON","RIBBONS","RINGS","DOTS","SLICES","SPARKS","CELLS"];document.addEventListener("DOMContentLoaded",()=>{const l=new T("webgl-canvas"),t=new M;let e=null,i=3,a=1,o=2,r=1,s=.15;const d=performance.now(),f=u(n=>{e&&e.dispose(),e=new x(l.gl,L,I[n]),i=n;const c=n===3;p.updateShaderNav(n,A[n],m[a],c)},"loadShaderEnvironment");new E(n=>{o=n});const p=new R(n=>{r=n},n=>{s=n},()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()});t.onInteract=()=>{i===3&&(a=(a+1)%m.length,p.updatePatternDisplay(a,m[a]))},document.querySelectorAll("#shader-buttons button").forEach(n=>{n.addEventListener("click",()=>{const c=parseInt(n.getAttribute("data-index")||"0",10);f(c)})}),window.addEventListener("keydown",n=>{n.key>="1"&&n.key<="4"&&f(parseInt(n.key,10)-1)}),f(3);const g=u(()=>{if(e&&e.program){e.use(),l.bindQuad(0);const n=l.gl,c=e.uniforms,v=(performance.now()-d)*.001*r;n.uniform2f(c.uResolution,l.canvas.width,l.canvas.height),n.uniform1f(c.uTime,v),n.uniform2f(c.uTouch,t.touchPos[0],t.touchPos[1]),n.uniform2f(c.uTouchDelta,t.touchDelta[0],t.touchDelta[1]),n.uniform1f(c.uTouchActive,t.touchActive),n.uniform1f(c.uGrain,s),n.uniform1i(c.uPalette,o),n.uniform1i(c.uPatternIndex,a),t.update(),l.draw()}requestAnimationFrame(g)},"render");requestAnimationFrame(g)});
