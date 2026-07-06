import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as m,a as p,m as f}from"./footer-mount-30YMGat2.js";import{A as g,p as b,g as v,a as y}from"./projects-BSTU5Vh6.js";function w(e,t,a,i){const n=["circle","square","triangle"];return Array.from({length:i},()=>({type:n[Math.floor(e()*3)],x:e()*t,y:e()*a,r:4+e()*8,opacity:.2+e()*.5}))}function k(e,t,a){switch(e.save(),e.globalAlpha=t.opacity,e.strokeStyle=a,e.lineWidth=1,e.shadowColor=a,e.shadowBlur=4,t.type){case"circle":e.beginPath(),e.arc(t.x,t.y,t.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const i=t.r*.9;e.rect(t.x-i,t.y-i,i*2,i*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(t.x,t.y-t.r),e.lineTo(t.x+t.r*.9,t.y+t.r*.7),e.lineTo(t.x-t.r*.9,t.y+t.r*.7),e.closePath(),e.stroke();break}e.restore()}function c(e,t){const a=window.devicePixelRatio||1,i=e.getBoundingClientRect(),n=i.width||e.offsetWidth||120,s=i.height||e.offsetHeight||80;e.width=n*a,e.height=s*a;const l=e.getContext("2d");l.setTransform(a,0,0,a,0,0);const r=m(p(t.slug)),o=g[t.accent],u=w(r,n,s,8);l.clearRect(0,0,n,s),u.forEach(h=>k(l,h,o))}function $(){return window.location.hash.replace("#","")}function S(){window.location.href="/impractical-series/"}function P(e){const t=String(e.index).padStart(2,"0"),a=v(e.slug),i=y(e.slug),n=g[e.accent],s=e.stack.map(r=>`<span class="stack-pill" role="listitem">${r}</span>`).join(""),l=document.getElementById("project-main");l.innerHTML=`
    <section class="detail-grid" aria-label="${e.title} details">

      <div class="detail-card">
      <div
          class="detail-card__backing card__backing--${e.accent}"
          style="--accent:${n};"
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
          ${s}
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
  `,document.title=`${e.title} — Impractical Series`,requestAnimationFrame(()=>{const r=document.getElementById("detail-preview");if(!r)return;c(r,e),new ResizeObserver(()=>c(r,e)).observe(r.parentElement)})}function d(){const e=$(),t=b.find(a=>a.slug===e);if(!e||!t){S();return}P(t),f(15)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d();
