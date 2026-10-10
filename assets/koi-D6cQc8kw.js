var ae=Object.defineProperty;var d=(e,t)=>ae(e,"name",{value:t,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";import{dw as re,dx as se,B as J,b as O,v as ie,q as Y,V as _,cz as j,S as le,dy as ce,P as ue,W as pe,dz as fe,G as de,g as me,dl as he,au as ge,Y as Se,aq as xe,ak as ee,av as te,j as ve,e as we,m as be,db as ye,s as Te,t as Ce}from"./three.module-IUh8fgFM.js";import{O as Pe}from"./OrbitControls-Bp6KJa_X.js";class Fe extends re{static{d(this,"STLLoader")}constructor(t){super(t)}load(t,o,i,p){const l=this,c=new se(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(s){try{o(l.parse(s))}catch(h){p?p(h):console.error(h),l.manager.itemError(t)}},i,p)}parse(t){function o(r){const a=new DataView(r),u=32/8*3+32/8*3*3+16/8,f=a.getUint32(80,!0);if(80+32/8+f*u===a.byteLength)return!0;const x=[115,111,108,105,100];for(let m=0;m<5;m++)if(i(x,a,m))return!1;return!0}d(o,"isBinary");function i(r,a,u){for(let f=0,S=r.length;f<S;f++)if(r[f]!==a.getUint8(u+f))return!1;return!0}d(i,"matchDataViewAt");function p(r){const a=new DataView(r),u=a.getUint32(80,!0);let f,S,x,m=!1,v,D,N,T,C;for(let g=0;g<70;g++)a.getUint32(g,!1)==1129270351&&a.getUint8(g+4)==82&&a.getUint8(g+5)==61&&(m=!0,v=new Float32Array(u*3*3),D=a.getUint8(g+6)/255,N=a.getUint8(g+7)/255,T=a.getUint8(g+8)/255,C=a.getUint8(g+9)/255);const y=84,n=50,P=new J,z=new Float32Array(u*3*3),E=new Float32Array(u*3*3),R=new O;for(let g=0;g<u;g++){const L=y+g*n,K=a.getFloat32(L,!0),I=a.getFloat32(L+4,!0),G=a.getFloat32(L+8,!0);if(m){const w=a.getUint16(L+48,!0);(w&32768)===0?(f=(w&31)/31,S=(w>>5&31)/31,x=(w>>10&31)/31):(f=D,S=N,x=T)}for(let w=1;w<=3;w++){const X=L+w*12,F=g*3*3+(w-1)*3;z[F]=a.getFloat32(X,!0),z[F+1]=a.getFloat32(X+4,!0),z[F+2]=a.getFloat32(X+8,!0),E[F]=K,E[F+1]=I,E[F+2]=G,m&&(R.setRGB(f,S,x,ie),v[F]=R.r,v[F+1]=R.g,v[F+2]=R.b)}}return P.setAttribute("position",new Y(z,3)),P.setAttribute("normal",new Y(E,3)),m&&(P.setAttribute("color",new Y(v,3)),P.hasColors=!0,P.alpha=C),P}d(p,"parseBinary");function l(r){const a=new J,u=/solid([\s\S]*?)endsolid/g,f=/facet([\s\S]*?)endfacet/g,S=/solid\s(.+)/;let x=0;const m=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,v=new RegExp("vertex"+m+m+m,"g"),D=new RegExp("normal"+m+m+m,"g"),N=[],T=[],C=[],y=new _;let n,P=0,z=0,E=0;for(;(n=u.exec(r))!==null;){z=E;const R=n[0],g=(n=S.exec(R))!==null?n[1]:"";for(C.push(g);(n=f.exec(R))!==null;){let I=0,G=0;const w=n[0];for(;(n=D.exec(w))!==null;)y.x=parseFloat(n[1]),y.y=parseFloat(n[2]),y.z=parseFloat(n[3]),G++;for(;(n=v.exec(w))!==null;)N.push(parseFloat(n[1]),parseFloat(n[2]),parseFloat(n[3])),T.push(y.x,y.y,y.z),I++,E++;G!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+x),I!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+x),x++}const L=z,K=E-z;a.userData.groupNames=C,a.addGroup(L,K,P),P++}return a.setAttribute("position",new j(N,3)),a.setAttribute("normal",new j(T,3)),a}d(l,"parseASCII");function c(r){return typeof r!="string"?new TextDecoder().decode(r):r}d(c,"ensureString");function s(r){if(typeof r=="string"){const a=new Uint8Array(r.length);for(let u=0;u<r.length;u++)a[u]=r.charCodeAt(u)&255;return a.buffer||a}else return r}d(s,"ensureBinary");const h=s(t);return o(h)?p(h):l(c(t))}}const H={night:{key:"night",bg:663080,bgCSS:"#0a1e28",bodyClass:"",palette:[8377568,5937880,10143976,7194816,11057392,9099480,13678824,9494736,15790328,13150432]},day:{key:"day",bg:15659510,bgCSS:"#eef1f6",bodyClass:"day",palette:[9064652,3832008,14498442,14527010,2795605,14505250,2271931,13395626,8939195,13382536]}};function Me(e,t){return e==="circle"?t>=1600?24:t>=1200?20:t>=900?16:t>=600?12:6:t>=1600?36:t>=1200?30:t>=900?24:t>=600?18:9}d(Me,"pickFishCount");const ze="./fish.stl",Ee=.08,q=511,A=new le;A.background=new O(H.night.bg);A.fog=new ce(H.night.bg,200,520);const U=new ue(58,window.innerWidth/window.innerHeight,.1,900);U.position.set(0,-15,165);const M=new pe({antialias:!0});M.setClearColor(H.night.bg);M.setSize(window.innerWidth,window.innerHeight);M.setPixelRatio(Math.min(window.devicePixelRatio,2));document.body.appendChild(M.domElement);const B=new Pe(U,M.domElement);B.maxDistance=300;B.minDistance=80;B.enableDamping=!0;B.dampingFactor=.05;B.autoRotate=!0;B.autoRotateSpeed=.08;let ne=performance.now(),oe=0;function Ae(){const e=performance.now(),t=Math.min((e-ne)/1e3,.05);return ne=e,oe+=t,oe}d(Ae,"tick");window.addEventListener("resize",()=>{U.aspect=window.innerWidth/window.innerHeight,U.updateProjectionMatrix(),M.setSize(window.innerWidth,window.innerHeight)});const De=`
uniform sampler2D uSpatialTexture;
uniform vec2 uTextureSize;
uniform float uTime;
uniform float uLengthRatio;
uniform vec3 uObjSize;
uniform float uPhase;
uniform float uSpeedMul;

struct splineData { vec3 point; vec3 binormal; vec3 normal; };

splineData getSplineData(float t){
  float step = 1.0 / uTextureSize.y;
  float halfStep = step * 0.5;
  splineData sd;
  sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0.0 + halfStep)).rgb;
  sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1.0 + halfStep)).rgb;
  sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2.0 + halfStep)).rgb;
  return sd;
}
`,Ne=`
#include <begin_vertex>
vec3 pos = position;
float wStep = 1.0 / uTextureSize.x;
float hWStep = wStep * 0.5;
float d = pos.z / uObjSize.z;
float t = fract((uTime * 0.1 * uSpeedMul) + uPhase + (d * uLengthRatio));
float numPrev = floor(t / wStep);
float numNext = numPrev + 1.0;
float tPrev = numPrev * wStep + hWStep;
float tNext = numNext * wStep + hWStep;
splineData splinePrev = getSplineData(tPrev);
splineData splineNext = getSplineData(tNext);
float f = (t - tPrev) / wStep;
vec3 P = mix(splinePrev.point, splineNext.point, f);
vec3 B = mix(splinePrev.binormal, splineNext.binormal, f);
vec3 N = mix(splinePrev.normal, splineNext.normal, f);
transformed = P + (N * pos.x) + (B * pos.y);
`,Re=`
attribute float aSeed;
uniform sampler2D uSpatialTexture;
uniform vec2 uTextureSize;
uniform float uTime;
uniform float uLengthRatio;
uniform vec3 uObjSize;
uniform float uPhase;
uniform float uSpeedMul;
uniform float uStarSize;
varying float vTwinkle;
varying float vBright;

struct splineData { vec3 point; vec3 binormal; vec3 normal; };

splineData getSplineData(float t){
  float step = 1.0 / uTextureSize.y;
  float halfStep = step * 0.5;
  splineData sd;
  sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0.0 + halfStep)).rgb;
  sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1.0 + halfStep)).rgb;
  sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2.0 + halfStep)).rgb;
  return sd;
}

void main() {
  vec3 pos = position;
  float wStep = 1.0 / uTextureSize.x;
  float hWStep = wStep * 0.5;
  float d = pos.z / uObjSize.z;
  float t = fract((uTime * 0.1 * uSpeedMul) + uPhase + (d * uLengthRatio));
  float numPrev = floor(t / wStep);
  float numNext = numPrev + 1.0;
  float tPrev = numPrev * wStep + hWStep;
  float tNext = numNext * wStep + hWStep;
  splineData splinePrev = getSplineData(tPrev);
  splineData splineNext = getSplineData(tNext);
  float f = (t - tPrev) / wStep;
  vec3 P = mix(splinePrev.point, splineNext.point, f);
  vec3 B = mix(splinePrev.binormal, splineNext.binormal, f);
  vec3 N = mix(splinePrev.normal, splineNext.normal, f);
  vec3 transformed = P + (N * pos.x) + (B * pos.y);
  vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uStarSize * (280.0 / -mv.z);
  vTwinkle = sin(uTime * 1.6 + aSeed * 8.0) * 0.5 + 0.5;
  vBright = 0.5 + fract(aSeed * 13.37) * 0.6;
}
`,Le=`
uniform vec3 uAccentColor;
uniform float uStarAlpha;
varying float vTwinkle;
varying float vBright;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float sharp = smoothstep(0.5, 0.18, d);
  float halo = smoothstep(0.5, 0.0, d) * 0.28;
  float glow = sharp + halo;
  vec3 col = uAccentColor * (0.85 + vTwinkle * 0.5) * vBright;
  float alpha = glow * uStarAlpha * (0.6 + vTwinkle * 0.3);
  gl_FragColor = vec4(col, alpha);
}
`;let V=[],W=null;const Q=new _,Z={};function Be(e){W=e,new fe().setFromBufferAttribute(e.getAttribute("position")).getSize(Q)}d(Be,"setGeometry");function Ve(e){const t=e.toFixed(3);if(Z[t])return Z[t];if(!W)throw new Error("geometry not set");const o=W.getAttribute("position").array,i=o.length/3,p=[],l=[];for(let s=0;s<i;s++){const h=Math.abs(Math.sin(s*12.9898+78.233))%1;h<e&&(p.push(o[s*3],o[s*3+1],o[s*3+2]),l.push(h*10))}const c=new J;return c.setAttribute("position",new j(p,3)),c.setAttribute("aSeed",new j(l,1)),Z[t]=c,c}d(Ve,"getStarGeometry");function We(e){const t=[];for(let o=0;o<e;o++){const i=(o-(e-1)/2)*14;t.push({cx:0,cy:i,cz:0,radius:40,yRange:8,phaseOffset:Math.random()*Math.PI*2,speedMul:.75+o%5*.06})}return t}d(We,"circleSlots");function _e(e){let t,o;e<=6?(t=3,o=2):e<=9?(t=3,o=3):e<=12?(t=4,o=3):e<=16?(t=4,o=4):e<=20?(t=5,o=4):e<=24?(t=6,o=4):e<=30?(t=6,o=5):e<=36?(t=7,o=6):(t=8,o=6);const i=300,p=180,l=120,c=i/t,s=p/o,h=[];let r=0;for(let a=0;a<o&&r<e;a++)for(let u=0;u<t&&r<e;u++){const f=((u+a)%2-.5)*l,S=Math.min(c,s)*.42;h.push({cx:-i/2+c*(u+.5),cy:-p/2+s*(a+.5),cz:f,radius:Math.max(45,S),yRange:12,phaseOffset:Math.random()*Math.PI*2,speedMul:.75+r%4*.08}),r++}return h}d(_e,"freeSlots");function ke(e,t,o){const i=new de,p=new _(e.radius,0,0),l=new _(0,1,0),c=6,s=Math.PI*2/c,h=[];for(let n=0;n<c;n++)h.push(new _().copy(p).applyAxisAngle(l,s*n).setY(me.randFloat(-e.yRange,e.yRange)));const r=new he(h);r.closed=!0;const a=r.getSpacedPoints(q),u=r.computeFrenetFrames(q,!0),f=[];a.forEach(n=>f.push(n.x,n.y,n.z)),u.binormals.forEach(n=>f.push(n.x,n.y,n.z)),u.normals.forEach(n=>f.push(n.x,n.y,n.z));const S=q+1,x=new Float32Array(S*3*4);let m=0;for(let n=0;n<S*3;n++)x[n*4+0]=f[m++],x[n*4+1]=f[m++],x[n*4+2]=f[m++],x[n*4+3]=1;const v=new ge(x,S,3,Se,xe);v.magFilter=ee,v.minFilter=ee,v.wrapS=te,v.wrapT=te,v.needsUpdate=!0;const D=r.getLengths(200),N=D[D.length-1],T={uSpatialTexture:{value:v},uTextureSize:{value:new we(S,3)},uTime:{value:0},uLengthRatio:{value:Q.z/N},uObjSize:{value:Q},uPhase:{value:e.phaseOffset},uSpeedMul:{value:e.speedMul}},C=new ve({color:t,wireframe:!0,transparent:!0,opacity:.55,depthWrite:!1});C.onBeforeCompile=n=>{Object.assign(n.uniforms,T),n.vertexShader=De+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",Ne)},W&&i.add(new be(W,C));const y=new ye({transparent:!0,depthWrite:!1,blending:Te,uniforms:{...T,uAccentColor:{value:new O(t)},uStarAlpha:{value:.9},uStarSize:{value:1.2}},vertexShader:Re,fragmentShader:Le});return i.add(new Ce(o,y)),i.position.set(e.cx,e.cy,e.cz),{group:i,uniforms:T,lineMat:C,ptsMat:y}}d(ke,"createFish");function Oe(e,t){if(!W)return 0;for(const l of V)A.remove(l.group),l.group.traverse(c=>{const s=c;s.material&&s.material.dispose()}),l.uniforms.uSpatialTexture.value.dispose();V=[];const o=Me(e,window.innerWidth),i=Ve(Ee),p=e==="circle"?We(o):_e(o);for(let l=0;l<p.length;l++){const c=t[l%t.length],s=ke(p[l],c,i);V.push(s),A.add(s.group)}return p.length}d(Oe,"rebuildSchool");function Ue(e){for(const t of V)t.uniforms.uTime.value=e}d(Ue,"updateFishTime");function He(e){for(let t=0;t<V.length;t++){const o=V[t],i=e[t%e.length];o.lineMat.color.setHex(i),o.ptsMat.uniforms.uAccentColor.value.setHex(i)}}d(He,"recolorFish");const b={themeKey:"night",viewMode:"circle",expandedView:!0};function $(){const e=H[b.themeKey];return Oe(b.viewMode,e.palette)}d($,"rebuild");function Ie(){b.themeKey=b.themeKey==="night"?"day":"night";const e=H[b.themeKey];A.background=new O(e.bg),A.fog&&(A.fog.color=new O(e.bg)),M.setClearColor(e.bg),document.body.style.background=e.bgCSS,document.body.className=e.bodyClass,He(e.palette),k()}d(Ie,"toggleTheme");function k(){const e=document.getElementById("panel");if(!e)return;e.innerHTML="";const t=document.createElement("div");t.className="card";const o=document.createElement("button");o.className="icon-btn",o.textContent=b.themeKey==="night"?"☀":"☾",o.title="Toggle theme",o.addEventListener("click",Ie),t.appendChild(o),e.appendChild(t);const i=document.createElement("div");i.className="card";const p=document.createElement("button");p.className="primary",p.innerHTML='View <span style="font-size:9px;opacity:0.6">▾</span>',p.addEventListener("click",()=>{b.expandedView=!b.expandedView,k()}),i.appendChild(p);const l=document.createElement("div");l.className="submenu"+(b.expandedView?" open":"");const c=[{label:"Circle",value:"circle"},{label:"Free",value:"free"}];for(const h of c){const r=document.createElement("button");r.textContent=h.label,b.viewMode===h.value&&r.classList.add("active"),r.addEventListener("click",()=>{b.viewMode=h.value,$(),k()}),l.appendChild(r)}const s=document.createElement("button");s.className="close-btn",s.textContent="✕",s.title="Close",s.addEventListener("click",()=>{b.expandedView=!1,k()}),l.appendChild(s),i.appendChild(l),e.appendChild(i)}d(k,"buildUI");const Ge=new Fe;Ge.load(ze,e=>{e.center(),e.rotateX(-Math.PI*.5),e.scale(.5,.5,.5),Be(e),$(),k(),window.addEventListener("resize",()=>{$()}),M.setAnimationLoop(()=>{B.update();const t=Ae();Ue(t),M.render(A,U)})},void 0,e=>{console.error("Failed to load fish STL:",e)});
