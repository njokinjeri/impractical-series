import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as Z,a as j,m as ee}from"./footer-mount-BjPsgH-9.js";import{g as te,a as ne,A as Q,p as C}from"./projects-BSTU5Vh6.js";const re="#33D17A",oe="#3FA0E0",N="#E8A33D",ae=1200,ie=2800,W=.022,le=160,G=7.5,z=.96,X=.06,ce=9;function se(t){const e=t.getContext("2d"),a=window.devicePixelRatio||1;let o=0,l=0,u=0;function f(){const r=t.parentElement.getBoundingClientRect();o=r.width,l=r.height,t.width=o*a,t.height=l*a,e.setTransform(a,0,0,a,0,0)}f();const i=[...Array.from({length:3},(r,c)=>({type:"circle",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:10,color:re,phase:c*2.1})),...Array.from({length:3},(r,c)=>({type:"square",x:Math.random()*o,y:Math.random()*l*.6,vx:0,vy:0,r:9,color:oe,phase:c*1.7+1})),{type:"triangle",x:o/2,y:l/2,vx:0,vy:0,r:12,color:N,phase:0}],h=i.findIndex(r=>r.type==="triangle"),v=[];let y=-1,E=0,w=0,S=Date.now(),R=Date.now(),A=0;function K(r){switch(e.save(),e.strokeStyle=r.color,e.lineWidth=1.3,e.shadowColor=r.color,e.shadowBlur=ce,r.type){case"circle":e.beginPath(),e.arc(r.x,r.y,r.r,0,Math.PI*2),e.stroke();break;case"square":{e.beginPath();const c=r.r*.95;e.roundRect?e.roundRect(r.x-c,r.y-c,c*2,c*2,4):e.rect(r.x-c,r.y-c,c*2,c*2),e.stroke();break}case"triangle":e.beginPath(),e.moveTo(r.x,r.y-r.r),e.lineTo(r.x+r.r*.95,r.y+r.r*.8),e.lineTo(r.x-r.r*.95,r.y+r.r*.8),e.closePath(),e.stroke();break}e.restore()}function I(){A++;const r=Date.now(),c=r-S>ae;if(i.forEach((n,d)=>{d!==y&&(n.x+=Math.sin(A*.02+n.phase)*X,n.y+=Math.cos(A*.025+n.phase)*X,c&&d!==h&&i.forEach((s,m)=>{if(d===m||s.type!==n.type)return;const p=s.x-n.x,x=s.y-n.y,g=Math.hypot(p,x)||1;g>n.r+s.r+4&&g<le&&(n.vx+=p/g*W,n.vy+=x/g*W)}),n.vx*=z,n.vy*=z,n.x+=n.vx,n.y+=n.vy,n.x<n.r&&(n.x=n.r,n.vx*=-.5),n.x>o-n.r&&(n.x=o-n.r,n.vx*=-.5),n.y<n.r&&(n.y=n.r,n.vy*=-.5),n.y>l-n.r&&(n.y=l-n.r,n.vy*=-.5))}),c&&r-R>ie){R=r;const n=i.filter((g,_)=>_!==h),d=n[Math.floor(Math.random()*n.length)],s=i[h],m=d.x-s.x,p=d.y-s.y,x=Math.hypot(m,p)||1;s.vx=m/x*G,s.vy=p/x*G}for(let n=0;n<i.length;n++)for(let d=n+1;d<i.length;d++){const s=i[n],m=i[d],p=s.x-m.x,x=s.y-m.y,g=Math.hypot(p,x),_=s.r+m.r;if(g<_&&g>0){const b=p/g,q=x/g,F=(_-g)/2,H=s.type==="triangle"||m.type==="triangle",U=H?F+3:F,L=H?1.3:.15;n!==y&&(s.x+=b*U,s.vx+=b*L,s.vy+=q*L*.3),d!==y&&(m.x-=b*U,m.vx-=b*L,m.vy-=q*L*.3)}}v.push({x:i[h].x,y:i[h].y}),v.length>6&&v.shift(),e.clearRect(0,0,o,l),v.forEach((n,d)=>{const s=d/v.length*.35;e.save(),e.globalAlpha=s,e.fillStyle=N,e.beginPath(),e.arc(n.x,n.y,3,0,Math.PI*2),e.fill(),e.restore()}),i.forEach(K),u=requestAnimationFrame(I)}function T(r){const c=t.getBoundingClientRect();return{x:r.clientX-c.left,y:r.clientY-c.top}}function D(r){const{x:c,y:n}=T(r);i.forEach((d,s)=>{Math.hypot(c-d.x,n-d.y)<d.r+8&&(y=s,E=c-d.x,w=n-d.y,S=Date.now())})}function O(r){if(y<0)return;const{x:c,y:n}=T(r);i[y].x=c-E,i[y].y=n-w,i[y].vx=0,i[y].vy=0,S=Date.now()}function B(){y=-1}const $=new ResizeObserver(f);return $.observe(t.parentElement),t.addEventListener("mousedown",D),window.addEventListener("mousemove",O),window.addEventListener("mouseup",B),u=requestAnimationFrame(I),()=>{cancelAnimationFrame(u),$.disconnect(),t.removeEventListener("mousedown",D),window.removeEventListener("mousemove",O),window.removeEventListener("mouseup",B)}}function de(t,e,a){switch(t.save(),t.strokeStyle=a,t.lineWidth=1.2,t.globalAlpha=.45,e.type){case"circle":t.beginPath(),t.arc(e.x,e.y,e.r,0,Math.PI*2),t.stroke();break;case"square":{t.beginPath();const o=e.r*.9;t.rect(e.x-o,e.y-o,o*2,o*2),t.stroke();break}case"triangle":t.beginPath(),t.moveTo(e.x,e.y-e.r),t.lineTo(e.x+e.r*.9,e.y+e.r*.7),t.lineTo(e.x-e.r*.9,e.y+e.r*.7),t.closePath(),t.stroke();break}t.restore()}function V(t,e){const a=window.devicePixelRatio||1,o=t.parentElement,l=o.clientWidth,u=o.clientHeight;if(!l||!u)return;t.width=l*a,t.height=u*a,t.style.width=l+"px",t.style.height=u+"px";const f=t.getContext("2d"),i=Q[e.accent],h=Z(j(e.slug));f.setTransform(a,0,0,a,0,0);const v=["circle","square","triangle"],y=2+Math.floor(h()*2),E=Array.from({length:y},()=>({type:v[Math.floor(h()*3)],x:l*(.2+h()*.6),y:u*(.2+h()*.6),r:6+h()*8}));f.clearRect(0,0,l,u),E.forEach(w=>de(f,w,i))}function he(t){const e=te(t.slug),a=ne(t.slug),o=String(t.index).padStart(2,"0");return`
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
            href="${a}"
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
  `.trim()}function ue(t,e,a=6){const o=Math.max(1,Math.ceil(t.length/a)),l=Math.min(Math.max(1,e),o),u=(l-1)*a;return{items:t.slice(u,u+a),page:l,totalPages:o,hasPrev:l>1,hasNext:l<o}}const fe=6;let M=1,P="all";const ye={all:[],canvas:["Canvas 2D","Canvas API"],three:["Three.js","GLSL","Simplex Noise"],css:["CSS","CSS 3D","HTML"]};function J(){return{grid:document.getElementById("card-grid"),prevBtn:document.getElementById("page-prev"),nextBtn:document.getElementById("page-next"),indicator:document.getElementById("page-indicator")}}function me(){if(P==="all")return C;const t=ye[P];return C.filter(e=>e.stack.some(a=>t.includes(a)))}function ge(){document.querySelectorAll(".card").forEach(t=>{const e=t.dataset.slug,a=C.find(o=>o.slug===e);a&&t.style.setProperty("--card-accent",Q[a.accent]),t.addEventListener("click",()=>{window.location.href=`/impractical-series/project.html#${e}`}),t.addEventListener("keydown",o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),window.location.href=`/impractical-series/project.html#${e}`)}),t.querySelectorAll(".card__source, .card__live").forEach(o=>{o.addEventListener("click",l=>l.stopPropagation())})})}function k(t){const{grid:e,prevBtn:a,nextBtn:o,indicator:l}=J(),u=me(),f=ue(u,t,fe);e.innerHTML=f.items.map(he).join(""),requestAnimationFrame(()=>{requestAnimationFrame(()=>{document.querySelectorAll(".card-thumb-canvas").forEach(i=>{const h=C.find(y=>y.slug===i.dataset.slug);if(!h)return;V(i,h),new ResizeObserver(()=>V(i,h)).observe(i.parentElement)}),ge()})}),a.disabled=!f.hasPrev,o.disabled=!f.hasNext,l.textContent=`${f.page} of ${f.totalPages}`,M=f.page}function ve(){const t=document.getElementById("filter-row");t&&t.querySelectorAll("[data-filter]").forEach(e=>{e.addEventListener("click",()=>{P=e.dataset.filter,M=1,t.querySelectorAll("[data-filter]").forEach(a=>a.classList.remove("filter-pill--active")),e.classList.add("filter-pill--active"),k(1)})})}function pe(){const{prevBtn:t,nextBtn:e}=J();t.addEventListener("click",()=>k(M-1)),e.addEventListener("click",()=>k(M+1)),ve(),k(1)}function Y(){const t=document.getElementById("hero-canvas");t&&se(t),pe(),ee(10)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Y):Y();
