(function(){"use strict";const m=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.search.includes("dev=true"),u=(...e)=>{try{if(window.Utils&&typeof window.Utils.safeLog=="function"){window.Utils.safeLog(...e);return}}catch{}};let i=null;function c(){const e=Array.from(document.styleSheets);let o=!0;for(let t=0;t<e.length;t++)try{e[t].cssRules||e[t].rules}catch{o=!1;break}o||document.readyState==="complete"?requestAnimationFrame(()=>{h()}):setTimeout(c,50)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c();function h(){const e=document.getElementById("dashboard-section");e&&(y(e),g(e),E(e),k(e),w(e))}function y(e){if(e.querySelectorAll(".kpi-grid > .kpi-card").forEach(t=>{t.style.opacity="1",t.style.transform="none",t.style.transition="none",t.addEventListener("click",function(s){const n=document.createElement("div");n.style.position="absolute",n.style.borderRadius="50%",n.style.background="rgba(255, 255, 255, 0.5)",n.style.width="20px",n.style.height="20px",n.style.pointerEvents="none",n.style.animation="rippleEffect 0.6s ease-out";const r=t.getBoundingClientRect();n.style.left=s.clientX-r.left-10+"px",n.style.top=s.clientY-r.top-10+"px",t.appendChild(n),setTimeout(()=>n.remove(),600)})}),!document.getElementById("ripple-animation-style")){const t=document.createElement("style");t.id="ripple-animation-style",t.textContent=`
                @keyframes rippleEffect {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(20);
                        opacity: 0;
                    }
                }
            `,document.head.appendChild(t)}}function g(e){const o=e.querySelectorAll(".content-card"),t=["reports-statistics-section","safety-metrics-section"];o.forEach((s,n)=>{t.some(a=>s.classList.contains(a))||(s.style.opacity="0",s.style.transform="translateY(30px)",setTimeout(()=>{s.style.transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",s.style.opacity="1",s.style.transform="translateY(0)"},(n+5)*100),s.addEventListener("mouseenter",function(){this.style.boxShadow="0 20px 60px rgba(102, 126, 234, 0.2), 0 5px 20px rgba(102, 126, 234, 0.15)"}),s.addEventListener("mouseleave",function(){this.style.boxShadow=""}))})}function S(){const e=document.getElementById("dashboard-section");e&&window.addEventListener("scroll",()=>{const o=window.pageYOffset;e.querySelectorAll(".kpi-card, .content-card").forEach((s,n)=>{const r=(n%3+1)*.05,a=-(o*r);s.style.transform=`translateY(${a}px)`})})}function I(){const e=document.querySelectorAll(".kpi-value"),o={threshold:.5,rootMargin:"0px"},t=new IntersectionObserver(s=>{s.forEach(n=>{n.isIntersecting&&!n.target.dataset.animated&&(b(n.target),n.target.dataset.animated="true")})},o);e.forEach(s=>t.observe(s))}function b(e){const o=e.textContent.trim(),t=o.includes("%"),s=parseFloat(o.replace(/[^\d.-]/g,""));if(isNaN(s))return;const n=2e3,r=60,a=s/r,l=n/r;let d=0,p=0;const A=setInterval(()=>{p++,d+=a,p>=r&&(d=s,clearInterval(A));const f=Math.round(d);e.textContent=t?`${f}%`:f},l)}function L(){document.querySelectorAll(".kpi-card").forEach(o=>{const t=document.createElement("div");t.style.position="absolute",t.style.bottom="0",t.style.left="0",t.style.height="3px",t.style.width="0%",t.style.background="linear-gradient(90deg, #667eea 0%, #764ba2 100%)",t.style.transition="width 1s ease-out",t.style.borderRadius="0 0 24px 24px",o.appendChild(t),new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&setTimeout(()=>{t.style.width="100%"},300)})},{threshold:.5}).observe(o)})}function E(e){e.querySelectorAll(".kpi-grid > .kpi-card").forEach(t=>{t.addEventListener("mouseenter",()=>{})})}function k(e){e.querySelectorAll(".kpi-grid > .kpi-card").forEach(t=>{t.addEventListener("dblclick",function(){this.style.transform="rotateY(180deg)",setTimeout(()=>{this.style.transform="rotateY(0deg)"},600)})})}function w(e){const o=e.querySelectorAll(".kpi-grid > .kpi-card.kpi-danger, .kpi-grid > .kpi-card.kpi-warning"),t=e.querySelectorAll(".reports-statistics-section, .safety-metrics-section");o.forEach(s=>{const n=Array.from(t).some(a=>a.contains(s)),r=s.parentElement&&s.parentElement.classList.contains("kpi-grid");n||r||s.classList.add("hse-pulse-glow")})}function T(){document.querySelectorAll(".kpi-card, .content-card").forEach(o=>{const t=document.createElement("div");t.className="skeleton-loader",t.style.cssText=`
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: inherit;
                z-index: 10;
            `,o.style.position="relative",o.appendChild(t),setTimeout(()=>{t.style.opacity="0",setTimeout(()=>t.remove(),300)},1e3)})}function v(){const e=document.getElementById("dashboard-section");if(!e)return;const o=document.createElement("div");o.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;for(let t=0;t<20;t++){const s=document.createElement("div");s.style.cssText=`
                position: absolute;
                width: ${Math.random()*10+5}px;
                height: ${Math.random()*10+5}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random()*100}%;
                top: ${Math.random()*100}%;
                animation: float ${Math.random()*10+10}s ease-in-out infinite;
                animation-delay: ${Math.random()*5}s;
            `,o.appendChild(s)}if(e.insertBefore(o,e.firstChild),!document.getElementById("particle-animation-style")){const t=document.createElement("style");t.id="particle-animation-style",t.textContent=`
                @keyframes float {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(20px, -20px);
                    }
                    50% {
                        transform: translate(-20px, 20px);
                    }
                    75% {
                        transform: translate(20px, 20px);
                    }
                }
            `,document.head.appendChild(t)}}function q(){document.querySelectorAll(".kpi-card").forEach(o=>{const t=o.querySelector(".kpi-icon");if(!t)return;const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("width","100"),s.setAttribute("height","100"),s.style.cssText=`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-90deg);
                pointer-events: none;
            `;const n=document.createElementNS("http://www.w3.org/2000/svg","circle");n.setAttribute("cx","50"),n.setAttribute("cy","50"),n.setAttribute("r","45"),n.setAttribute("fill","none"),n.setAttribute("stroke","rgba(255, 255, 255, 0.3)"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-dasharray","283"),n.setAttribute("stroke-dashoffset","283"),n.style.transition="stroke-dashoffset 2s ease-out",s.appendChild(n),t.style.position="relative",t.appendChild(s),new IntersectionObserver(a=>{a.forEach(l=>{l.isIntersecting&&setTimeout(()=>{n.setAttribute("stroke-dashoffset","0")},500)})},{threshold:.5}).observe(o)})}function x(){i&&(clearInterval(i),i=null)}function C(){i&&(clearInterval(i),i=null),u("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Dashboard enhancements")}typeof window<"u"&&(window.cleanupDashboardEnhancements=C),setTimeout(()=>{v(),x()},1e3),u("\u2728 Dashboard enhancements loaded successfully!")})();
