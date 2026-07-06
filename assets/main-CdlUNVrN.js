import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as Z,a as j,m as ee}from"./footer-mount-30YMGat2.js";import{g as te,a as ne,A as Q,p as M}from"./projects-B_Hol3vP.js";const re="#33D17A",oe="#3FA0E0",N="#E8A33D",ae=1200,ie=2800,W=.022,ce=160,G=7.5,X=.96,z=.06,le=9;function se(t){const e=t.getContext("2d"),i=window.devicePixelRatio||1;let o=0,l=0,u=0;function f(){const r=t.parentElement.getBoundingClientRect();o=r.width,l=r.height,t.width=o*i,t.height=l*i,e.setTransform(i,0,0,i,0,0)}f();const c=[...Array.from({length:3},(r,a)=>({type:"circle",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:10,color:re,phase:a*2.1})),...Array.from({length:3},(r,a)=>({type:"square",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:9,color:oe,phase:a*1.7+1})),{type:"triangle",x:o/2,y:l/2,vx:0,vy:0,r:12,color:N,phase:0}],h=c.findIndex(r=>r.type==="triangle"),g=[];let v=-1,w=0,L=0,R=Date.now(),D=Date.now(),T=0;function K(r){switch(e.save(),e.strokeStyle=r.color,e.lineWidth=1.3,e.shadowColor=r.color,e.shadowBlur=le,r.type){case"circle":e.beginPath(),e.arc(r.x,r.y,r.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const a=r.r*.95;e.roundRect?e.roundRect(r.x-a,r.y-a,a*2,a*2,4):e.rect(r.x-a,r.y-a,a*2,a*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(r.x,r.y-r.r),e.lineTo(r.x+r.r*.95,r.y+r.r*.8),e.lineTo(r.x-r.r*.95,r.y+r.r*.8),e.closePath(),e.stroke();break}e.restore()}function O(){T++;const r=Date.now(),a=r-R>ae;if(c.forEach((n,d)=>{d!==v&&(n.x+=Math.sin(T*.02+n.phase)*z,n.y+=Math.cos(T*.025+n.phase)*z,a&&d!==h&&c.forEach((s,m)=>{if(d===m||s.type!==n.type)return;const p=s.x-n.x,x=s.y-n.y,y=Math.hypot(p,x)||1;y>n.r+s.r+4&&y<ce&&(n.vx+=p/y*W,n.vy+=x/y*W)}),n.vx*=X,n.vy*=X,n.x+=n.vx,n.y+=n.vy,n.x<n.r&&(n.x=n.r,n.vx*=-.5),n.x>o-n.r&&(n.x=o-n.r,n.vx*=-.5),n.y<n.r&&(n.y=n.r,n.vy*=-.5),n.y>l-n.r&&(n.y=l-n.r,n.vy*=-.5))}),a&&r-D>ie){D=r;const n=c.filter((y,S)=>S!==h),d=n[Math.floor(Math.random()*n.length)],s=c[h],m=d.x-s.x,p=d.y-s.y,x=Math.hypot(m,p)||1;s.vx=m/x*G,s.vy=p/x*G}for(let n=0;n<c.length;n++)for(let d=n+1;d<c.length;d++){const s=c[n],m=c[d],p=s.x-m.x,x=s.y-m.y,y=Math.hypot(p,x),S=s.r+m.r;if(y<S&&y>0){const k=p/y,q=x/y,F=(S-y)/2,H=s.type==="triangle"||m.type==="triangle",U=H?F+3:F,C=H?1.3:.15;n!==v&&(s.x+=k*U,s.vx+=k*C,s.vy+=q*C*.3),d!==v&&(m.x-=k*U,m.vx-=k*C,m.vy-=q*C*.3)}}g.push({x:c[h].x,y:c[h].y}),g.length>6&&g.shift(),e.clearRect(0,0,o,l),g.forEach((n,d)=>{const s=d/g.length*.35;e.save(),e.globalAlpha=s,e.fillStyle=N,e.beginPath(),e.arc(n.x,n.y,3,0,Math.PI*2),e.fill(),e.restore()}),c.forEach(K),u=requestAnimationFrame(O)}function B(r){const a=t.getBoundingClientRect();if("touches"in r&&r.touches.length>0)return{x:r.touches[0].clientX-a.left,y:r.touches[0].clientY-a.top};if("changedTouches"in r&&r.changedTouches.length>0)return{x:r.changedTouches[0].clientX-a.left,y:r.changedTouches[0].clientY-a.top};const n=r;return{x:n.clientX-a.left,y:n.clientY-a.top}}function _(r){"touches"in r&&r.preventDefault();const{x:a,y:n}=B(r);c.forEach((d,s)=>{const m="touches"in r?d.r+16:d.r+8;Math.hypot(a-d.x,n-d.y)<m&&(v=s,w=a-d.x,L=n-d.y,R=Date.now())})}function b(r){if(v<0)return;"touches"in r&&r.preventDefault();const{x:a,y:n}=B(r);c[v].x=a-w,c[v].y=n-L,c[v].vx=0,c[v].vy=0,R=Date.now()}function E(){v=-1}const $=new ResizeObserver(f);return $.observe(t.parentElement),t.addEventListener("mousedown",_),window.addEventListener("mousemove",b),window.addEventListener("mouseup",E),t.addEventListener("touchstart",_,{passive:!1}),window.addEventListener("touchmove",b,{passive:!1}),window.addEventListener("touchend",E),window.addEventListener("touchcancel",E),u=requestAnimationFrame(O),()=>{cancelAnimationFrame(u),$.disconnect(),t.removeEventListener("mousedown",_),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",E),t.removeEventListener("touchstart",_),window.removeEventListener("touchmove",b),window.removeEventListener("touchend",E),window.removeEventListener("touchcancel",E)}}function de(t,e,i){switch(t.save(),t.strokeStyle=i,t.lineWidth=1.2,t.globalAlpha=.45,e.type){case"circle":t.beginPath(),t.arc(e.x,e.y,e.r,0,Math.PI*2),t.stroke();break;case"square":{t.beginPath();const o=e.r*.9;t.rect(e.x-o,e.y-o,o*2,o*2),t.stroke();break}case"triangle":t.beginPath(),t.moveTo(e.x,e.y-e.r),t.lineTo(e.x+e.r*.9,e.y+e.r*.7),t.lineTo(e.x-e.r*.9,e.y+e.r*.7),t.closePath(),t.stroke();break}t.restore()}function Y(t,e){const i=window.devicePixelRatio||1,o=t.parentElement,l=o.clientWidth,u=o.clientHeight;if(!l||!u)return;t.width=l*i,t.height=u*i,t.style.width=l+"px",t.style.height=u+"px";const f=t.getContext("2d"),c=Q[e.accent],h=Z(j(e.slug));f.setTransform(i,0,0,i,0,0);const g=["circle","square","triangle"],v=2+Math.floor(h()*2),w=Array.from({length:v},()=>({type:g[Math.floor(h()*3)],x:l*(.2+h()*.6),y:u*(.2+h()*.6),r:6+h()*8}));f.clearRect(0,0,l,u),w.forEach(L=>de(f,L,c))}function he(t){const e=te(t.slug),i=ne(t.slug),o=String(t.index).padStart(2,"0");return`
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
          <p class="card__index" aria-hidden="true">${o}</p>
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
  `.trim()}function ue(t,e,i=6){const o=Math.max(1,Math.ceil(t.length/i)),l=Math.min(Math.max(1,e),o),u=(l-1)*i;return{items:t.slice(u,u+i),page:l,totalPages:o,hasPrev:l>1,hasNext:l<o}}const fe=6;let P=1,I="all";const ve={all:[],canvas:["Canvas 2D","Canvas API"],three:["Three.js","GLSL","Simplex Noise"],css:["CSS","CSS 3D","HTML"]};function J(){return{grid:document.getElementById("card-grid"),prevBtn:document.getElementById("page-prev"),nextBtn:document.getElementById("page-next"),indicator:document.getElementById("page-indicator")}}function me(){if(I==="all")return M;const t=ve[I];return M.filter(e=>e.stack.some(i=>t.includes(i)))}function ye(){document.querySelectorAll(".card").forEach(t=>{const e=t.dataset.slug,i=M.find(o=>o.slug===e);i&&t.style.setProperty("--card-accent",Q[i.accent]),t.addEventListener("click",()=>{window.location.href=`/impractical-series/project.html#${e}`}),t.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),window.location.href=`/impractical-series/project.html#${e}`)}),t.querySelectorAll(".card__source, .card__live").forEach(o=>{o.addEventListener("click",l=>l.stopPropagation())})})}function A(t){const{grid:e,prevBtn:i,nextBtn:o,indicator:l}=J(),u=me(),f=ue(u,t,fe);e.innerHTML=f.items.map(he).join(""),requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.querySelectorAll(".card-thumb-canvas").forEach(c=>{const h=M.find(v=>v.slug===c.dataset.slug);if(!h)return;Y(c,h),new ResizeObserver(()=>Y(c,h)).observe(c.parentElement)}),ye()})}),i.disabled=!f.hasPrev,o.disabled=!f.hasNext,l.textContent=`${f.page} of ${f.totalPages}`,P=f.page}function ge(){const t=document.getElementById("filter-row");t&&t.querySelectorAll("[data-filter]").forEach(e=>{e.addEventListener("click",()=>{I=e.dataset.filter,P=1,t.querySelectorAll("[data-filter]").forEach(i=>i.classList.remove("filter-pill--active")),e.classList.add("filter-pill--active"),A(1)})})}function pe(){const{prevBtn:t,nextBtn:e}=J();t.addEventListener("click",()=>A(P-1)),e.addEventListener("click",()=>A(P+1)),ge(),A(1)}function V(){const t=document.getElementById("hero-canvas");t&&se(t),pe(),ee(10)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",V):V();
