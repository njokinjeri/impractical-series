var Z=Object.defineProperty;var h=(t,e)=>Z(t,"name",{value:e,configurable:!0});import"./modulepreload-polyfill-BdX5DvLD.js";import{s as ee,a as te,m as ne}from"./footer-mount-BRz2agx6.js";import{g as re,a as oe,A as j,p as P}from"./projects-DTDXaTcI.js";const ae="#33D17A",ie="#3FA0E0",W="#E8A33D",ce=1200,le=2800,G=.022,se=160,X=7.5,z=.96,Y=.06,de=9;function he(t){const e=t.getContext("2d"),i=window.devicePixelRatio||1;let o=0,l=0,f=0;function v(){const r=t.parentElement.getBoundingClientRect();o=r.width,l=r.height,t.width=o*i,t.height=l*i,e.setTransform(i,0,0,i,0,0)}h(v,"resize"),v();const c=[...Array.from({length:3},(r,a)=>({type:"circle",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:10,color:ae,phase:a*2.1})),...Array.from({length:3},(r,a)=>({type:"square",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:9,color:ie,phase:a*1.7+1})),{type:"triangle",x:o/2,y:l/2,vx:0,vy:0,r:12,color:W,phase:0}],u=c.findIndex(r=>r.type==="triangle"),p=[];let m=-1,L=0,_=0,T=Date.now(),O=Date.now(),I=0;function K(r){switch(e.save(),e.strokeStyle=r.color,e.lineWidth=1.3,e.shadowColor=r.color,e.shadowBlur=de,r.type){case"circle":e.beginPath(),e.arc(r.x,r.y,r.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const a=r.r*.95;e.roundRect?e.roundRect(r.x-a,r.y-a,a*2,a*2,4):e.rect(r.x-a,r.y-a,a*2,a*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(r.x,r.y-r.r),e.lineTo(r.x+r.r*.95,r.y+r.r*.8),e.lineTo(r.x-r.r*.95,r.y+r.r*.8),e.closePath(),e.stroke();break}e.restore()}h(K,"drawShape");function B(){I++;const r=Date.now(),a=r-T>ce;if(c.forEach((n,d)=>{d!==m&&(n.x+=Math.sin(I*.02+n.phase)*Y,n.y+=Math.cos(I*.025+n.phase)*Y,a&&d!==u&&c.forEach((s,y)=>{if(d===y||s.type!==n.type)return;const x=s.x-n.x,E=s.y-n.y,g=Math.hypot(x,E)||1;g>n.r+s.r+4&&g<se&&(n.vx+=x/g*G,n.vy+=E/g*G)}),n.vx*=z,n.vy*=z,n.x+=n.vx,n.y+=n.vy,n.x<n.r&&(n.x=n.r,n.vx*=-.5),n.x>o-n.r&&(n.x=o-n.r,n.vx*=-.5),n.y<n.r&&(n.y=n.r,n.vy*=-.5),n.y>l-n.r&&(n.y=l-n.r,n.vy*=-.5))}),a&&r-O>le){O=r;const n=c.filter((g,C)=>C!==u),d=n[Math.floor(Math.random()*n.length)],s=c[u],y=d.x-s.x,x=d.y-s.y,E=Math.hypot(y,x)||1;s.vx=y/E*X,s.vy=x/E*X}for(let n=0;n<c.length;n++)for(let d=n+1;d<c.length;d++){const s=c[n],y=c[d],x=s.x-y.x,E=s.y-y.y,g=Math.hypot(x,E),C=s.r+y.r;if(g<C&&g>0){const A=x/g,F=E/g,H=(C-g)/2,U=s.type==="triangle"||y.type==="triangle",N=U?H+3:H,S=U?1.3:.15;n!==m&&(s.x+=A*N,s.vx+=A*S,s.vy+=F*S*.3),d!==m&&(y.x-=A*N,y.vx-=A*S,y.vy-=F*S*.3)}}p.push({x:c[u].x,y:c[u].y}),p.length>6&&p.shift(),e.clearRect(0,0,o,l),p.forEach((n,d)=>{const s=d/p.length*.35;e.save(),e.globalAlpha=s,e.fillStyle=W,e.beginPath(),e.arc(n.x,n.y,3,0,Math.PI*2),e.fill(),e.restore()}),c.forEach(K),f=requestAnimationFrame(B)}h(B,"tick");function q(r){const a=t.getBoundingClientRect();if("touches"in r&&r.touches.length>0)return{x:r.touches[0].clientX-a.left,y:r.touches[0].clientY-a.top};if("changedTouches"in r&&r.changedTouches.length>0)return{x:r.changedTouches[0].clientX-a.left,y:r.changedTouches[0].clientY-a.top};const n=r;return{x:n.clientX-a.left,y:n.clientY-a.top}}h(q,"getCanvasPos");function b(r){"touches"in r&&r.preventDefault();const{x:a,y:n}=q(r);c.forEach((d,s)=>{const y="touches"in r?d.r+16:d.r+8;Math.hypot(a-d.x,n-d.y)<y&&(m=s,L=a-d.x,_=n-d.y,T=Date.now())})}h(b,"onStart");function k(r){if(m<0)return;"touches"in r&&r.preventDefault();const{x:a,y:n}=q(r);c[m].x=a-L,c[m].y=n-_,c[m].vx=0,c[m].vy=0,T=Date.now()}h(k,"onMove");function w(){m=-1}h(w,"onEnd");const $=new ResizeObserver(v);return $.observe(t.parentElement),t.addEventListener("mousedown",b),window.addEventListener("mousemove",k),window.addEventListener("mouseup",w),t.addEventListener("touchstart",b,{passive:!1}),window.addEventListener("touchmove",k,{passive:!1}),window.addEventListener("touchend",w),window.addEventListener("touchcancel",w),f=requestAnimationFrame(B),()=>{cancelAnimationFrame(f),$.disconnect(),t.removeEventListener("mousedown",b),window.removeEventListener("mousemove",k),window.removeEventListener("mouseup",w),t.removeEventListener("touchstart",b),window.removeEventListener("touchmove",k),window.removeEventListener("touchend",w),window.removeEventListener("touchcancel",w)}}h(he,"mountHeroSandbox");function ue(t,e,i){switch(t.save(),t.strokeStyle=i,t.lineWidth=1.2,t.globalAlpha=.45,e.type){case"circle":t.beginPath(),t.arc(e.x,e.y,e.r,0,Math.PI*2),t.stroke();break;case"square":{t.beginPath();const o=e.r*.9;t.rect(e.x-o,e.y-o,o*2,o*2),t.stroke();break}case"triangle":t.beginPath(),t.moveTo(e.x,e.y-e.r),t.lineTo(e.x+e.r*.9,e.y+e.r*.7),t.lineTo(e.x-e.r*.9,e.y+e.r*.7),t.closePath(),t.stroke();break}t.restore()}h(ue,"drawThumbShape");function V(t,e){const i=window.devicePixelRatio||1,o=t.parentElement,l=o.clientWidth,f=o.clientHeight;if(!l||!f)return;t.width=l*i,t.height=f*i,t.style.width=l+"px",t.style.height=f+"px";const v=t.getContext("2d"),c=j[e.accent],u=ee(te(e.slug));v.setTransform(i,0,0,i,0,0);const p=["circle","square","triangle"],m=2+Math.floor(u()*2),L=Array.from({length:m},()=>({type:p[Math.floor(u()*3)],x:l*(.2+u()*.6),y:f*(.2+u()*.6),r:6+u()*8}));v.clearRect(0,0,l,f),L.forEach(_=>ue(v,_,c))}h(V,"drawCardThumb");function fe(t){const e=re(t.slug),i=oe(t.slug);return`
    <article
      class="card"
      role="listitem"
      data-slug="${t.slug}"
      tabindex="0"
      aria-label="${t.title} - click to view details"
    >
      <div class="card__backing" aria-hidden="true"></div>
      <div class="card__front">

        <div class="card__thumb">
          <canvas
            class="card-thumb-canvas"
            data-slug="${t.slug}"
            aria-hidden="true"
          ></canvas>
        </div>

        <div class="card__body">
          <p class="card__title">${t.title}</p>
          <p class="card__desc">${t.description}</p>
        </div>

        <div class="card__actions">
          <a
            class="card__source"
            href="${i}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source for ${t.title}"
            title="source"
          >&lt;/&gt;</a>
          <a
            class="card__live"
            href="${e}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live experiment: ${t.title}"
            title="live"
          > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

      </div>
    </article>
  `.trim()}h(fe,"renderCard");function ve(t,e,i=6){const o=Math.max(1,Math.ceil(t.length/i)),l=Math.min(Math.max(1,e),o),f=(l-1)*i;return{items:t.slice(f,f+i),page:l,totalPages:o,hasPrev:l>1,hasNext:l<o}}h(ve,"paginate");const me=6;let R=1,D="all";const ye={all:[],canvas:["Canvas 2D","Canvas API"],three:["Three.js","GLSL","Simplex Noise"],css:["CSS","CSS 3D","HTML"]};function J(){return{grid:document.getElementById("card-grid"),prevBtn:document.getElementById("page-prev"),nextBtn:document.getElementById("page-next"),indicator:document.getElementById("page-indicator")}}h(J,"getElements");function ge(){if(D==="all")return P;const t=ye[D];return P.filter(e=>e.stack.some(i=>t.includes(i)))}h(ge,"filterProjects");function pe(){document.querySelectorAll(".card").forEach(t=>{const e=t.dataset.slug,i=P.find(o=>o.slug===e);i&&t.style.setProperty("--card-accent",j[i.accent]),t.addEventListener("click",()=>{window.location.href=`/impractical-series/project.html#${e}`}),t.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),window.location.href=`/impractical-series/project.html#${e}`)}),t.querySelectorAll(".card__source, .card__live").forEach(o=>{o.addEventListener("click",l=>l.stopPropagation())})})}h(pe,"wireCards");function M(t){const{grid:e,prevBtn:i,nextBtn:o,indicator:l}=J(),f=ge(),v=ve(f,t,me);e.innerHTML=v.items.map(fe).join(""),requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.querySelectorAll(".card-thumb-canvas").forEach(c=>{const u=P.find(m=>m.slug===c.dataset.slug);if(!u)return;V(c,u),new ResizeObserver(()=>V(c,u)).observe(c.parentElement)}),pe()})}),i.disabled=!v.hasPrev,o.disabled=!v.hasNext,l.textContent=`${v.page} of ${v.totalPages}`,R=v.page}h(M,"render");function xe(){const t=document.getElementById("filter-row");t&&t.querySelectorAll("[data-filter]").forEach(e=>{e.addEventListener("click",()=>{D=e.dataset.filter,R=1,t.querySelectorAll("[data-filter]").forEach(i=>i.classList.remove("filter-pill--active")),e.classList.add("filter-pill--active"),M(1)})})}h(xe,"mountFilters");function Ee(){const{prevBtn:t,nextBtn:e}=J();t.addEventListener("click",()=>M(R-1)),e.addEventListener("click",()=>M(R+1)),xe(),M(1)}h(Ee,"mountCardGrid");function Q(){const t=document.getElementById("hero-canvas");t&&he(t),Ee(),ne(10)}h(Q,"init");document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Q):Q();
