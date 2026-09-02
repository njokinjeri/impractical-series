var p=Object.defineProperty;var n=(e,t)=>p(e,"name",{value:t,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";import{s as f,a as v,m as b}from"./footer-mount-BRz2agx6.js";import{A as g,p as y,g as w,a as k}from"./projects-DTDXaTcI.js";function $(e,t,a,i){const s=["circle","square","triangle"];return Array.from({length:i},()=>({type:s[Math.floor(e()*3)],x:e()*t,y:e()*a,r:4+e()*8,opacity:.2+e()*.5}))}n($,"buildShapes");function P(e,t,a){switch(e.save(),e.globalAlpha=t.opacity,e.strokeStyle=a,e.lineWidth=1,e.shadowColor=a,e.shadowBlur=4,t.type){case"circle":e.beginPath(),e.arc(t.x,t.y,t.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const i=t.r*.9;e.rect(t.x-i,t.y-i,i*2,i*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(t.x,t.y-t.r),e.lineTo(t.x+t.r*.9,t.y+t.r*.7),e.lineTo(t.x-t.r*.9,t.y+t.r*.7),e.closePath(),e.stroke();break}e.restore()}n(P,"drawShape");function c(e,t){const a=window.devicePixelRatio||1,i=e.getBoundingClientRect(),s=i.width||e.offsetWidth||120,l=i.height||e.offsetHeight||80;e.width=s*a,e.height=l*a;const r=e.getContext("2d");r.setTransform(a,0,0,a,0,0);const o=f(v(t.slug)),h=g[t.accent],u=$(o,s,l,8);r.clearRect(0,0,s,l),u.forEach(m=>P(r,m,h))}n(c,"renderCardPreview");function S(){return window.location.hash.replace("#","")}n(S,"getSlugFromHash");function _(){window.location.href="/impractical-series/"}n(_,"redirectHome");function C(e){const t=w(e.slug),a=k(e.slug),i=g[e.accent],s=e.stack.map(r=>`<span class="stack-pill" role="listitem">${r}</span>`).join(""),l=document.getElementById("project-main");l.innerHTML=`
    <section class="detail-grid" aria-label="${e.title} details">

      <div class="detail-card">
      <div
          class="detail-card__backing card__backing--${e.accent}"
          style="--accent:${i};"
          aria-hidden="true"
      ></div>

        <div class="detail-card__front">
          <canvas id="detail-preview" aria-label="${e.title} generative preview"></canvas>
        </div>
      </div>

      <div class="detail-meta">
        <h1 class="page-title">${e.title}</h1>
        <p class="page-desc">${e.description}</p>

        <p class="stack-label">stack</p>
        <div class="stack-pills" role="list" aria-label="Technologies used">
          ${s}
        </div>

        <div class="detail-actions">
          <a
            class="btn btn--primary"
            href="${t}"
            target="_blank"
            rel="noopener noreferrer"
          >Live</a>
          <a
            class="btn btn--ghost"
            href="${a}"
            target="_blank"
            rel="noopener noreferrer"
          >Source</a>
        </div>
      </div>

    </section>
  `,document.title=`${e.title} — Impractical Series`,requestAnimationFrame(()=>{const r=document.getElementById("detail-preview");if(!r)return;c(r,e),new ResizeObserver(()=>c(r,e)).observe(r.parentElement)})}n(C,"renderProject");function d(){const e=S(),t=y.find(a=>a.slug===e);if(!e||!t){_();return}C(t),b(15)}n(d,"init");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
