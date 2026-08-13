var p=Object.defineProperty;var n=(e,t)=>p(e,"name",{value:t,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";import{s as f,a as b,m as v}from"./footer-mount-BRz2agx6.js";import{A as u,p as y,g as w,a as k}from"./projects-0thjQsIe.js";function $(e,t,a,i){const s=["circle","square","triangle"];return Array.from({length:i},()=>({type:s[Math.floor(e()*3)],x:e()*t,y:e()*a,r:4+e()*8,opacity:.2+e()*.5}))}n($,"buildShapes");function S(e,t,a){switch(e.save(),e.globalAlpha=t.opacity,e.strokeStyle=a,e.lineWidth=1,e.shadowColor=a,e.shadowBlur=4,t.type){case"circle":e.beginPath(),e.arc(t.x,t.y,t.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const i=t.r*.9;e.rect(t.x-i,t.y-i,i*2,i*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(t.x,t.y-t.r),e.lineTo(t.x+t.r*.9,t.y+t.r*.7),e.lineTo(t.x-t.r*.9,t.y+t.r*.7),e.closePath(),e.stroke();break}e.restore()}n(S,"drawShape");function d(e,t){const a=window.devicePixelRatio||1,i=e.getBoundingClientRect(),s=i.width||e.offsetWidth||120,l=i.height||e.offsetHeight||80;e.width=s*a,e.height=l*a;const o=e.getContext("2d");o.setTransform(a,0,0,a,0,0);const r=f(b(t.slug)),c=u[t.accent],h=$(r,s,l,8);o.clearRect(0,0,s,l),h.forEach(m=>S(o,m,c))}n(d,"renderCardPreview");function P(){return window.location.hash.replace("#","")}n(P,"getSlugFromHash");function _(){window.location.href="/impractical-series/"}n(_,"redirectHome");function C(e){const t=String(e.index).padStart(2,"0"),a=w(e.slug),i=k(e.slug),s=u[e.accent],l=e.stack.map(r=>`<span class="stack-pill" role="listitem">${r}</span>`).join(""),o=document.getElementById("project-main");o.innerHTML=`
    <section class="detail-grid" aria-label="${e.title} details">

      <div class="detail-card">
      <div
          class="detail-card__backing card__backing--${e.accent}"
          style="--accent:${s};"
          aria-hidden="true"
      ></div>

        <div class="detail-card__front">
          <canvas id="detail-preview" aria-label="${e.title} generative preview"></canvas>
        </div>
      </div>

      <div class="detail-meta">
        <p class="detail-index" aria-label="Experiment number">${t}</p>
        <h1 class="page-title">${e.title}</h1>
        <p class="page-desc">${e.description}</p>

        <p class="stack-label">stack</p>
        <div class="stack-pills" role="list" aria-label="Technologies used">
          ${l}
        </div>

        <div class="detail-actions">
          <a
            class="btn btn--primary"
            href="${a}"
            target="_blank"
            rel="noopener noreferrer"
          >Live</a>
          <a
            class="btn btn--ghost"
            href="${i}"
            target="_blank"
            rel="noopener noreferrer"
          >Source</a>
        </div>
      </div>

    </section>
  `,document.title=`${e.title} — Impractical Series`,requestAnimationFrame(()=>{const r=document.getElementById("detail-preview");if(!r)return;d(r,e),new ResizeObserver(()=>d(r,e)).observe(r.parentElement)})}n(C,"renderProject");function g(){const e=P(),t=y.find(a=>a.slug===e);if(!e||!t){_();return}C(t),v(15)}n(g,"init");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g();
