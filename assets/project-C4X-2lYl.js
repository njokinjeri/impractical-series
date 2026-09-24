var p=Object.defineProperty;var n=(e,t)=>p(e,"name",{value:t,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";import{s as f,b,A as g,p as v,m as y,a as w,g as k,c as P}from"./footer-mount-CR22wMNK.js";function $(e,t,a,i){const s=["circle","square","triangle"];return Array.from({length:i},()=>({type:s[Math.floor(e()*3)],x:e()*t,y:e()*a,r:4+e()*8,opacity:.2+e()*.5}))}n($,"buildShapes");function S(e,t,a){switch(e.save(),e.globalAlpha=t.opacity,e.strokeStyle=a,e.lineWidth=1,e.shadowColor=a,e.shadowBlur=4,t.type){case"circle":e.beginPath(),e.arc(t.x,t.y,t.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const i=t.r*.9;e.rect(t.x-i,t.y-i,i*2,i*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(t.x,t.y-t.r),e.lineTo(t.x+t.r*.9,t.y+t.r*.7),e.lineTo(t.x-t.r*.9,t.y+t.r*.7),e.closePath(),e.stroke();break}e.restore()}n(S,"drawShape");function d(e,t){const a=window.devicePixelRatio||1,i=e.getBoundingClientRect(),s=i.width||e.offsetWidth||120,o=i.height||e.offsetHeight||80;e.width=s*a,e.height=o*a;const l=e.getContext("2d");l.setTransform(a,0,0,a,0,0);const r=f(b(t.slug)),c=g[t.accent],h=$(r,s,o,8);l.clearRect(0,0,s,o),h.forEach(m=>S(l,m,c))}n(d,"renderCardPreview");function _(){return window.location.hash.replace("#","")}n(_,"getSlugFromHash");function C(){window.location.href="/impractical-series/"}n(C,"redirectHome");function E(e){const t=w(e.slug),a=k(e.slug),i=P(e.slug),s=g[e.accent],o=e.stack.map(r=>`<span class="stack-pill" role="listitem">${r}</span>`).join(""),l=document.getElementById("project-main");l.innerHTML=`
    <section class="detail-grid" aria-label="${e.title} details">

      <div class="detail-card">
      <div
          class="detail-card__backing card__backing--${e.accent}"
          style="--accent:${s};"
          aria-hidden="true"
      ></div>

        <div class="detail-card__front">
          <video
            class="card-thumb-video"
            src="${t}"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            aria-hidden="true"
          ></video>        
        </div>
      </div>

      <div class="detail-meta">
        <h1 class="page-title">${e.title}</h1>
        <p class="page-desc">${e.description}</p>

        <p class="stack-label">stack</p>
        <div class="stack-pills" role="list" aria-label="Technologies used">
          ${o}
        </div>

        <div class="detail-actions">
          <a
            class="btn btn--primary"
            href="${a}"
            target="_blank"
            rel="noopener noreferrer"
          >View</a>
          <a
            class="btn btn--ghost"
            href="${i}"
            target="_blank"
            rel="noopener noreferrer"
          >Source</a>
        </div>
      </div>

    </section>
  `,document.title=`${e.title} — Impractical Series`,requestAnimationFrame(()=>{const r=document.getElementById("detail-preview");if(!r)return;d(r,e),new ResizeObserver(()=>d(r,e)).observe(r.parentElement)})}n(E,"renderProject");function u(){const e=_(),t=v.find(a=>a.slug===e);if(!e||!t){C();return}E(t),y(15)}n(u,"init");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u();
