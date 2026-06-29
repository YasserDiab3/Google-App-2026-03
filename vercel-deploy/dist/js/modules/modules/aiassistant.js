typeof AIAssistant>"u"&&(window.AIAssistant={}),Object.assign(window.AIAssistant,{async analyzeData(i){try{Loading.show();let t="",e=[];switch(i){case"incidents":const n=AppState.appData.incidents||[],m=n.filter(r=>r.severity==="\u0639\u0627\u0644\u064A\u0629").length,u=n.filter(r=>{const g=new Date(r.date||r.createdAt);return(Date.now()-g.getTime())/(1e3*60*60*24)<=30}).length;t=`\u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${n.length} \u062D\u0627\u062F\u062B.`,t+=`
- \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629: ${m}`,t+=`
- \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062E\u0644\u0627\u0644 \u0622\u062E\u0631 30 \u064A\u0648\u0645: ${u}`,m>n.length*.2&&e.push({type:"critical",message:"\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0645\u0631\u062A\u0639\u0629. \u064A\u0648\u0635\u0649 \u0628\u0645\u0631\u0627\u062C\u0639\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0628\u0631\u0648\u062A\u0648\u0643\u0648\u0644\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629"}),u>5&&e.push({type:"warning",message:"\u0639\u062F\u062F \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0641\u064A \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0623\u062E\u064A\u0631 \u0645\u0631\u062A\u0641\u0639. \u064A\u0648\u0635\u0649 \u0628\u0632\u064A\u0627\u062F\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629"});break;case"training":const a=AppState.appData.training||[],l=a.filter(r=>r.status==="\u0645\u0643\u062A\u0645\u0644").length,o=a.filter(r=>r.status==="\u0645\u062E\u0637\u0637").length,c=typeof Training<"u"&&Training.getParticipantsCount?a.reduce((r,g)=>r+Training.getParticipantsCount(g),0):a.reduce((r,g)=>r+(g.participants?.length||g.participantsCount||0),0);t=`\u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${a.length} \u0628\u0631\u0646\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A.`,t+=`
- \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629: ${l}`,t+=`
- \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u062E\u0637\u0637\u0629: ${o}`,t+=`
- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646: ${c}`,o>l&&e.push({type:"info",message:"\u0647\u0646\u0627\u0643 \u0628\u0631\u0627\u0645\u062C \u062A\u062F\u0631\u064A\u0628\u064A\u0629 \u0645\u062E\u0637\u0637\u0629 \u0623\u0643\u062B\u0631 \u0645\u0646 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629. \u062A\u0623\u0643\u062F \u0645\u0646 \u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0646\u0641\u064A\u0630\u0647\u0627"});break;case"risk":const p=AppState.appData.riskAssessments||[],f=p.filter(r=>parseInt(r.riskLevel||"0")>10).length;t=`\u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ${p.length} \u062A\u0642\u064A\u064A\u0645 \u0645\u062E\u0627\u0637\u0631.`,t+=`
- \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u0645\u062E\u0627\u0637\u0631: ${f}`,f>0&&e.push({type:"critical",message:"\u064A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u062E\u0627\u0637\u0631 \u0639\u0627\u0644\u064A\u0629. \u064A\u0648\u0635\u0649 \u0628\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0631\u064A\u0629 \u0648\u0627\u062A\u062E\u0627\u0630 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u062A\u0635\u062D\u064A\u062D\u064A\u0629"});break;case"comprehensive":const v=AppState.appData.incidents||[],b=AppState.appData.training||[],h=AppState.appData.riskAssessments||[],y=AppState.appData.violations||[];t=`\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0644\u0646\u0638\u0627\u0645:
`,t+=`- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0648\u0627\u062F\u062B: ${v.length}
`,t+=`- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A: ${b.length}
`,t+=`- \u0625\u062C\u0645\u0627\u0644\u064A \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631: ${h.length}
`,t+=`- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A: ${y.length}
`,v.length/30>.5&&e.push({type:"warning",message:"\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0645\u0631\u062A\u0639. \u064A\u0648\u0635\u0649 \u0628\u062A\u0639\u0632\u064A\u0632 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0633\u0644\u0627\u0645\u0629"}),b.filter(r=>r.status==="\u0645\u0643\u062A\u0645\u0644").length/(b.length||1)<.7&&e.push({type:"warning",message:"\u0646\u0633\u0628\u0629 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A \u0645\u0646\u062E\u0641\u0636\u0629. \u064A\u0648\u0635\u0649 \u0628\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0628\u0631\u0627\u0645\u062C \u0627\u0644\u0645\u062E\u0637\u0637\u0629"});break}Loading.hide();let s="";try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const n=`\u0642\u062F\u0645 \u062A\u062D\u0644\u064A\u0644\u0627\u064B \u0630\u0643\u064A\u0627\u064B \u0644\u0640 ${i==="incidents"?"\u0627\u0644\u062D\u0648\u0627\u062F\u062B":i==="training"?"\u0627\u0644\u062A\u062F\u0631\u064A\u0628":i==="risk"?"\u0627\u0644\u0645\u062E\u0627\u0637\u0631":"\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"} \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649: ${t}`,m=await GoogleIntegration.sendToAppsScript("processAIQuestion",{question:n,context:{userId:AppState.currentUser?.id,userName:AppState.currentUser?.name,userRole:AppState.currentUser?.role}});m&&m.success&&m.text&&(s=m.text)}}catch{}const d=document.createElement("div");d.className="modal-overlay",d.innerHTML=`
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h2 class="modal-title">
                            <i class="fas fa-robot ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A
                        </h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="space-y-4">
                            ${s?`
                                <div class="content-card" style="border-right: 3px solid #3b82f6;">
                                    <h3 class="card-title" style="color:#1d4ed8;">
                                        <i class="fas fa-robot ml-2"></i>
                                        \u062A\u062D\u0644\u064A\u0644 Gemini \u0627\u0644\u0630\u0643\u064A
                                    </h3>
                                    <div class="card-body">
                                        <pre class="whitespace-pre-wrap text-sm text-gray-700">${Utils.escapeHTML(s)}</pre>
                                    </div>
                                </div>
                            `:""}
                            <div class="content-card">
                                <h3 class="card-title">\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0629</h3>
                                <div class="card-body">
                                    <pre class="whitespace-pre-wrap text-sm">${Utils.escapeHTML(t)}</pre>
                                </div>
                            </div>
                            
                            ${e.length>0?`
                                <div class="content-card">
                                    <h3 class="card-title">\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A</h3>
                                    <div class="card-body space-y-2">
                                        ${e.map(n=>`
                                            <div class="p-3 rounded border-l-4 ${n.type==="critical"?"bg-red-50 border-red-500":n.type==="warning"?"bg-yellow-50 border-yellow-500":"bg-blue-50 border-blue-500"}">
                                                <div class="flex items-start">
                                                    <i class="fas fa-${n.type==="critical"?"exclamation-circle text-red-600":n.type==="warning"?"exclamation-triangle text-yellow-600":"info-circle text-blue-600"} ml-2 mt-1"></i>
                                                    <span class="text-sm">${Utils.escapeHTML(n.message)}</span>
                                                </div>
                                            </div>
                                        `).join("")}
                                    </div>
                                </div>
                            `:""}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            `,document.body.appendChild(d),d.addEventListener("click",n=>{n.target===d&&d.remove()})}catch(t){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",t),Notification.error("\u0634\u0644 \u0627\u0644\u062A\u062D\u0644\u064A\u0644: "+t.message)}},async askGeminiDirect(){const i=document.getElementById("admin-ai-question-input"),t=document.getElementById("admin-ai-answer"),e=document.getElementById("admin-ai-answer-text"),s=document.getElementById("admin-ai-loading");if(!i||!i.value.trim())return;const d=i.value.trim();t&&t.classList.add("hidden"),s&&s.classList.remove("hidden");try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript){const n=await GoogleIntegration.sendToAppsScript("processAIQuestion",{question:d,context:{userId:AppState.currentUser?.id||null,userName:AppState.currentUser?.name||null,userRole:AppState.currentUser?.role||null}});s&&s.classList.add("hidden"),n&&n.success&&n.text?(e&&(e.textContent=n.text),t&&t.classList.remove("hidden")):(e&&(e.textContent="\u0644\u0645 \u064A\u062A\u0645\u0643\u0646 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0645\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),t&&t.classList.remove("hidden"))}else{const n=await AIAssistant.ask(d);s&&s.classList.add("hidden"),n&&n.success&&(e&&(e.textContent=n.text||n.message),t&&t.classList.remove("hidden"))}}catch(n){s&&s.classList.add("hidden"),e&&(e.textContent="\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0644\u0627\u062D\u0642\u0627\u064B."),t&&t.classList.remove("hidden"),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A askGeminiDirect:",n)}},async load(){if(this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0),typeof Utils>"u")return;if(typeof AppState>"u"){Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}let i=document.getElementById("ai-assistant-section");if(i||(i=document.getElementById("aiassistant-section")),!i){Utils.safeWarn("\u26A0\uFE0F AIAssistant: \u0642\u0633\u0645 ai-assistant-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{const t=typeof i18n<"u"&&i18n.translate?i18n.translate("ai.title"):"\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A",e=typeof i18n<"u"&&i18n.translate?i18n.translate("ai.subtitle"):"\u062A\u062D\u0644\u064A\u0644 \u0630\u0643\u064A \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0648\u062A\u0648\u0635\u064A\u0627\u062A \u062A\u0644\u0642\u0627\u0626\u064A\u0629",s=AppState.appData?.userAILog||[],d=s.length,n=new Set(s.map(o=>o.userId)).size,m=s.filter(o=>{try{const c=new Date(o.timestamp),p=new Date;return c.toDateString()===p.toDateString()}catch{return!1}}).length,u=s.filter(o=>{try{const c=new Date(o.timestamp),p=new Date;return p.setDate(p.getDate()-7),c>=p}catch{return!1}}).length,a={};s.forEach(o=>{try{const c=o.question?.toLowerCase().trim()||"";c&&(a[c]=(a[c]||0)+1)}catch{}});const l=Object.entries(a).sort((o,c)=>c[1]-o[1]).slice(0,5);i.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-robot ml-3"></i>
                            ${t}
                        </h1>
                        <p class="section-subtitle">${e}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <span style="display:inline-flex;align-items:center;gap:6px;background:#f0fdf4;border:1px solid #86efac;border-radius:9999px;padding:4px 14px;font-size:0.8rem;color:#16a34a;font-weight:600;">
                            <i class="fas fa-circle" style="font-size:0.5rem;color:#22c55e;"></i>
                            Gemini 1.5 Flash \u0645\u062A\u0635\u0644
                        </span>
                        <button onclick="AIAssistant.showSettings()" class="btn-secondary">
                            <i class="fas fa-cog ml-2"></i>
                            \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </button>
                        <button onclick="AIAssistant.showUserLogs()" class="btn-primary">
                            <i class="fas fa-list ml-2"></i>
                            \u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0623\u0633\u0626\u0644\u0629</p>
                            <p class="text-2xl font-bold text-blue-600">${d}</p>
                        </div>
                        <div class="text-3xl text-blue-200">
                            <i class="fas fa-question-circle"></i>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646</p>
                            <p class="text-2xl font-bold text-green-600">${n}</p>
                        </div>
                        <div class="text-3xl text-green-200">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u064A\u0648\u0645</p>
                            <p class="text-2xl font-bold text-orange-600">${m}</p>
                        </div>
                        <div class="text-3xl text-orange-200">
                            <i class="fas fa-calendar-day"></i>
                        </div>
                    </div>
                </div>
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0623\u0633\u0626\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0623\u0633\u0628\u0648\u0639</p>
                            <p class="text-2xl font-bold text-purple-600">${u}</p>
                        </div>
                        <div class="text-3xl text-purple-200">
                            <i class="fas fa-calendar-week"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B -->
            ${l.length>0?`
                <div class="content-card mt-6">
                    <div class="card-header">
                        <h2 class="card-title">
                            <i class="fas fa-chart-bar ml-2"></i>
                            \u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0634\u064A\u0648\u0639\u0627\u064B
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="space-y-2">
                            ${l.map(([o,c],p)=>`
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div class="flex items-center gap-3">
                                        <span class="text-lg font-bold text-gray-400">${p+1}</span>
                                        <span class="text-sm text-gray-700">${Utils.escapeHTML(o.substring(0,60))}${o.length>60?"...":""}</span>
                                    </div>
                                    <span class="badge badge-primary">${c} \u0645\u0631\u0629</span>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `:""}
            
            <!-- \u0645\u0631\u0628\u0639 \u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u0644\u0640 Gemini -->
            <div class="content-card mt-6" style="border: 2px solid #3b82f6; border-radius: 12px;">
                <div class="card-body">
                    <div class="flex items-center gap-2 mb-3">
                        <i class="fas fa-robot" style="color:#3b82f6;font-size:1.2rem;"></i>
                        <h2 class="text-lg font-bold" style="color:#1e40af;">\u0627\u0633\u0623\u0644 Gemini \u0645\u0628\u0627\u0634\u0631\u0629</h2>
                        <span style="background:#dbeafe;color:#1d4ed8;border-radius:9999px;padding:2px 10px;font-size:0.75rem;font-weight:600;">AI</span>
                    </div>
                    <p class="text-gray-500 text-sm mb-3">\u0627\u0637\u0631\u062D \u0623\u064A \u0633\u0624\u0627\u0644 \u0639\u0646 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u2014 Gemini \u0633\u064A\u062C\u064A\u0628\u0643 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0641\u0639\u0644\u064A\u0629</p>
                    <div class="flex gap-2">
                        <input type="text" id="admin-ai-question-input"
                            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="\u0645\u062B\u0627\u0644: \u0645\u0627 \u0647\u064A \u0623\u0643\u062B\u0631 \u0623\u0633\u0628\u0627\u0628 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u062A\u0643\u0631\u0627\u0631\u0627\u064B\u061F \u0623\u0648 \u0643\u064A\u0641 \u0646\u062D\u0633\u0646 \u0645\u0639\u062F\u0644 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u061F"
                            onkeydown="if(event.key==='Enter') AIAssistant.askGeminiDirect()">
                        <button onclick="AIAssistant.askGeminiDirect()" class="btn-primary" style="white-space:nowrap;">
                            <i class="fas fa-paper-plane ml-1"></i>
                            \u0625\u0631\u0633\u0627\u0644
                        </button>
                    </div>
                    <div id="admin-ai-answer" class="mt-3 hidden">
                        <div style="background:#f8fafc;border-right:3px solid #3b82f6;border-radius:6px;padding:12px 16px;">
                            <div class="flex items-center gap-2 mb-2">
                                <i class="fas fa-robot" style="color:#3b82f6;font-size:0.85rem;"></i>
                                <span class="text-xs font-semibold" style="color:#3b82f6;">Gemini</span>
                            </div>
                            <p id="admin-ai-answer-text" class="text-sm text-gray-700 whitespace-pre-wrap"></p>
                        </div>
                    </div>
                    <div id="admin-ai-loading" class="mt-3 hidden text-center py-3">
                        <i class="fas fa-spinner fa-spin" style="color:#3b82f6;"></i>
                        <span class="text-sm text-gray-500 mr-2">Gemini \u064A\u0641\u0643\u0631...</span>
                    </div>
                    <!-- \u0623\u0633\u0626\u0644\u0629 \u0645\u0642\u062A\u0631\u062D\u0629 -->
                    <div class="flex flex-wrap gap-2 mt-3">
                        <span class="text-xs text-gray-400 ml-1">\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A:</span>
                        ${["\u0645\u0627 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u061F","\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631","\u0645\u0627 \u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A \u0644\u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0633\u0644\u0627\u0645\u0629\u061F","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629"].map(o=>`<button onclick="document.getElementById('admin-ai-question-input').value='${o}';AIAssistant.askGeminiDirect()"
                            style="background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;border-radius:9999px;padding:3px 12px;font-size:0.75rem;cursor:pointer;">${o}</button>`).join("")}
                    </div>
                </div>
            </div>

            <!-- \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 -->
            <div class="mt-6">
                <h2 class="text-xl font-bold mb-4">
                    <i class="fas fa-brain ml-2"></i>
                    \u0623\u062F\u0648\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0630\u0643\u064A
                    <span style="background:#dbeafe;color:#1d4ed8;border-radius:9999px;padding:2px 10px;font-size:0.8rem;font-weight:600;margin-right:8px;">\u0645\u062F\u0639\u0648\u0645 \u0628\u0640 Gemini</span>
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                            </h2>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-600 mb-4">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0644\u062D\u0648\u0627\u062F\u062B \u0645\u0639 \u062A\u0648\u0635\u064A\u0627\u062A \u0630\u0643\u064A\u0629</p>
                            <button onclick="AIAssistant.analyzeData('incidents')" class="btn-primary w-full">
                                <i class="fas fa-brain ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B
                            </button>
                        </div>
                    </div>
                    
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-graduation-cap ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A
                            </h2>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-600 mb-4">\u062A\u062D\u0644\u064A\u0644 \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064A\u0646</p>
                            <button onclick="AIAssistant.analyzeData('training')" class="btn-primary w-full">
                                <i class="fas fa-brain ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A
                            </button>
                        </div>
                    </div>
                    
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-shield-alt ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                            </h2>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-600 mb-4">\u062A\u062D\u0644\u064A\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</p>
                            <button onclick="AIAssistant.analyzeData('risk')" class="btn-primary w-full">
                                <i class="fas fa-brain ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                            </button>
                        </div>
                    </div>
                    
                    <div class="content-card">
                        <div class="card-header">
                            <h2 class="card-title">
                                <i class="fas fa-chart-line ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644
                            </h2>
                        </div>
                        <div class="card-body">
                            <p class="text-gray-600 mb-4">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645</p>
                            <button onclick="AIAssistant.analyzeData('comprehensive')" class="btn-primary w-full">
                                <i class="fas fa-brain ml-2"></i>
                                \u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 AIAssistant:",t),i.innerHTML=`
                <div class="section-header">
                    <h1 class="section-title">
                        <i class="fas fa-robot ml-3"></i>
                        \u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A
                    </h1>
                </div>
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                            <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</p>
                            <p class="text-sm text-gray-400 mt-2">${t.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                            <button onclick="AIAssistant.load()" class="btn-primary mt-4">
                                <i class="fas fa-redo ml-2"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                            </button>
                        </div>
                    </div>
                </div>
            `}},showSettings(){const i=AppState.appData?.aiAssistantSettings||{enabled:!0,autoAlerts:!0,logQuestions:!0,maxLogEntries:1e3,alertThresholds:{budgetPercentage:80,expiredPermits:!0,highSeverityIncidents:!0}},t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="ai-assistant-settings-form" class="space-y-6">
                        <div class="content-card">
                            <h3 class="card-title mb-4">\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629</h3>
                            <div class="space-y-4">
                                <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                                    <div>
                                        <span class="font-semibold">\u062A\u0641\u0639\u064A\u0644 \u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</span>
                                        <p class="text-xs text-gray-600 mt-1">\u062A\u0641\u0639\u064A\u0644/\u062A\u0639\u0637\u064A\u0644 \u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0630\u0643\u064A</p>
                                    </div>
                                    <input type="checkbox" id="ai-enabled" ${i.enabled?"checked":""} class="form-checkbox">
                                </label>
                                
                                <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                                    <div>
                                        <span class="font-semibold">\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0623\u0633\u0626\u0644\u0629</span>
                                        <p class="text-xs text-gray-600 mt-1">\u062A\u0633\u062C\u064A\u0644 \u062C\u0645\u064A\u0639 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0641\u064A \u0627\u0644\u0633\u062C\u0644</p>
                                    </div>
                                    <input type="checkbox" id="ai-log-questions" ${i.logQuestions?"checked":""} class="form-checkbox">
                                </label>
                                
                                <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                                    <div>
                                        <span class="font-semibold">\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629</span>
                                        <p class="text-xs text-gray-600 mt-1">\u0639\u0631\u0636 \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0630\u0643\u064A\u0629 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u0645\u0634\u0627\u0643\u0644</p>
                                    </div>
                                    <input type="checkbox" id="ai-auto-alerts" ${i.autoAlerts?"checked":""} class="form-checkbox">
                                </label>
                            </div>
                        </div>
                        
                        <div class="content-card">
                            <h3 class="card-title mb-4">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0633\u062C\u0644</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A
                                    </label>
                                    <input type="number" id="ai-max-log-entries" class="form-input" 
                                        value="${i.maxLogEntries||1e3}" min="100" max="10000" step="100">
                                    <p class="text-xs text-gray-600 mt-1">\u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0622\u062E\u0631 N \u0633\u062C\u0644 \u0641\u0642\u0637</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="content-card">
                            <h3 class="card-title mb-4">\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A</h3>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        \u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u0641\u0627\u0642 \u0644\u0644\u0645\u064A\u0632\u0627\u0646\u064A\u0629 (\u0644\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u062A\u0646\u0628\u064A\u0647)
                                    </label>
                                    <input type="number" id="ai-budget-threshold" class="form-input" 
                                        value="${i.alertThresholds?.budgetPercentage||80}" min="0" max="100" step="5">
                                    <p class="text-xs text-gray-600 mt-1">\u0633\u064A\u062A\u0645 \u0625\u0638\u0647\u0627\u0631 \u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u062A\u062C\u0627\u0648\u0632 \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u0628\u0629</p>
                                </div>
                                
                                <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                                    <div>
                                        <span class="font-semibold">\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629</span>
                                        <p class="text-xs text-gray-600 mt-1">\u0625\u0638\u0647\u0627\u0631 \u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062A\u0635\u0627\u0631\u064A\u062D \u0645\u0646\u062A\u0647\u064A\u0629</p>
                                    </div>
                                    <input type="checkbox" id="ai-alert-expired-permits" ${i.alertThresholds?.expiredPermits?"checked":""} class="form-checkbox">
                                </label>
                                
                                <label class="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                                    <div>
                                        <span class="font-semibold">\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</span>
                                        <p class="text-xs text-gray-600 mt-1">\u0625\u0638\u0647\u0627\u0631 \u062A\u0646\u0628\u064A\u0647 \u0639\u0646\u062F \u0648\u062C\u0648\u062F \u062D\u0648\u0627\u062F\u062B \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</p>
                                    </div>
                                    <input type="checkbox" id="ai-alert-high-severity" ${i.alertThresholds?.highSeverityIncidents?"checked":""} class="form-checkbox">
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button type="button" id="save-ai-settings-btn" class="btn-primary">\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A</button>
                </div>
            </div>
        `,document.body.appendChild(t),t.querySelector("#save-ai-settings-btn").addEventListener("click",()=>{this.saveSettings(t)}),t.addEventListener("click",s=>{s.target===t&&t.remove()})},async saveSettings(i){AppState.appData||(AppState.appData={});const t={enabled:document.getElementById("ai-enabled").checked,autoAlerts:document.getElementById("ai-auto-alerts").checked,logQuestions:document.getElementById("ai-log-questions").checked,maxLogEntries:parseInt(document.getElementById("ai-max-log-entries").value)||1e3,alertThresholds:{budgetPercentage:parseInt(document.getElementById("ai-budget-threshold").value)||80,expiredPermits:document.getElementById("ai-alert-expired-permits").checked,highSeverityIncidents:document.getElementById("ai-alert-high-severity").checked},updatedAt:new Date().toISOString(),updatedBy:AppState.currentUser?.email||"unknown"};AppState.appData.aiAssistantSettings=t,Loading.show();try{typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("AIAssistantSettings",[t]),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0628\u0646\u062C\u0627\u062D"),i.remove(),this.load()}catch(e){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+e.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A:",e)}finally{Loading.hide()}},showUserLogs(){const i=AppState.appData?.userAILog||[],t=[...i].sort((a,l)=>new Date(l.timestamp)-new Date(a.timestamp)),e={};i.forEach(a=>{const l=a.userId||"unknown";e[l]||(e[l]={userName:a.userName||"\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",email:l,totalQuestions:0,lastActivity:null}),e[l].totalQuestions++;const o=new Date(a.timestamp);(!e[l].lastActivity||o>new Date(e[l].lastActivity))&&(e[l].lastActivity=a.timestamp)});const s=document.createElement("div");s.className="modal-overlay",s.style.zIndex="10000",s.innerHTML=`
            <div class="modal-content" style="max-width: 1200px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-list ml-2"></i>
                        \u0633\u062C\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0630\u0643\u064A
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 flex items-center justify-between flex-wrap gap-4">
                        <div class="flex items-center gap-4">
                            <input type="text" id="ai-log-search" class="form-input" placeholder="\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0633\u062C\u0644..." style="min-width: 300px;">
                            <select id="ai-log-user-filter" class="form-input">
                                <option value="all">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646</option>
                                ${Object.entries(e).map(([a,l])=>`
                                    <option value="${a}">${Utils.escapeHTML(l.userName)} (${l.totalQuestions})</option>
                                `).join("")}
                            </select>
                        </div>
                        <div class="flex items-center gap-2">
                            <button onclick="AIAssistant.exportLogs()" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                            <button onclick="AIAssistant.clearOldLogs()" class="btn-danger">
                                <i class="fas fa-trash ml-2"></i>
                                \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629
                            </button>
                        </div>
                    </div>
                    
                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        ${Object.entries(e).slice(0,3).map(([a,l])=>`
                            <div class="content-card">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-sm font-semibold text-gray-700">${Utils.escapeHTML(l.userName)}</p>
                                        <p class="text-xs text-gray-500">${Utils.escapeHTML(l.email)}</p>
                                        <p class="text-sm text-gray-600 mt-2">
                                            <i class="fas fa-question-circle ml-1"></i>
                                            ${l.totalQuestions} \u0633\u0624\u0627\u0644
                                        </p>
                                    </div>
                                    <div class="text-2xl text-blue-200">
                                        <i class="fas fa-user"></i>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    
                    <!-- \u062C\u062F\u0648\u0644 \u0627\u0644\u0633\u062C\u0644\u0627\u062A -->
                    <div class="content-card">
                        <div class="card-header">
                            <h3 class="card-title">\u0633\u062C\u0644 \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0648\u0627\u0644\u0623\u062C\u0648\u0628\u0629</h3>
                            <span class="badge badge-primary">${t.length} \u0633\u062C\u0644</span>
                        </div>
                        <div class="card-body">
                            <div class="overflow-x-auto">
                                <table class="data-table" id="ai-log-table">
                                    <thead>
                                        <tr>
                                            <th>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A</th>
                                            <th>\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</th>
                                            <th>\u0627\u0644\u0633\u0624\u0627\u0644</th>
                                            <th>\u0627\u0644\u0625\u062C\u0627\u0628\u0629</th>
                                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${t.slice(0,100).map(a=>`
                                            <tr>
                                                <td>${Utils.formatDateTime(a.timestamp)}</td>
                                                <td>
                                                    <div>
                                                        <div class="font-semibold">${Utils.escapeHTML(a.userName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</div>
                                                        <div class="text-xs text-gray-500">${Utils.escapeHTML(a.userId||"")}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="max-w-md truncate" title="${Utils.escapeHTML(a.question||"")}">
                                                        ${Utils.escapeHTML((a.question||"").substring(0,80))}${(a.question||"").length>80?"...":""}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="max-w-md truncate" title="${Utils.escapeHTML(a.response||"")}">
                                                        ${Utils.escapeHTML((a.response||"").substring(0,80))}${(a.response||"").length>80?"...":""}
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onclick="AIAssistant.viewLogDetail('${a.id}')" class="btn-sm btn-primary">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                                ${t.length>100?`
                                    <div class="mt-4 text-center text-gray-600">
                                        <p>\u0639\u0631\u0636 \u0623\u0648\u0644 100 \u0633\u062C\u0644 \u0645\u0646 \u0623\u0635\u0644 ${t.length} \u0633\u062C\u0644</p>
                                    </div>
                                `:""}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(s);const d=s.querySelector("#ai-log-search"),n=s.querySelector("#ai-log-user-filter"),m=s.querySelector("#ai-log-table"),u=()=>{const a=d.value.toLowerCase(),l=n.value;m.querySelectorAll("tbody tr").forEach(c=>{const p=c.textContent.toLowerCase(),f=!a||p.includes(a),v=l==="all"||c.textContent.includes(l);c.style.display=f&&v?"":"none"})};d.addEventListener("input",u),n.addEventListener("change",u),s.addEventListener("click",a=>{a.target===s&&s.remove()})},viewLogDetail(i){const t=AppState.appData?.userAILog?.find(s=>s.id===i);if(!t){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-info-circle ml-2"></i>
                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0633\u062C\u0644
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="content-card">
                            <h3 class="card-title mb-3">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645</h3>
                            <div class="space-y-2">
                                <div><strong>\u0627\u0644\u0627\u0633\u0645:</strong> ${Utils.escapeHTML(t.userName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")}</div>
                                <div><strong>\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:</strong> ${Utils.escapeHTML(t.userId||"")}</div>
                                <div><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A:</strong> ${Utils.formatDateTime(t.timestamp)}</div>
                            </div>
                        </div>
                        
                        <div class="content-card">
                            <h3 class="card-title mb-3">\u0627\u0644\u0633\u0624\u0627\u0644</h3>
                            <div class="p-4 bg-gray-50 rounded-lg">
                                <p class="text-gray-700">${Utils.escapeHTML(t.question||"")}</p>
                            </div>
                        </div>
                        
                        <div class="content-card">
                            <h3 class="card-title mb-3">\u0627\u0644\u0625\u062C\u0627\u0628\u0629</h3>
                            <div class="p-4 bg-blue-50 rounded-lg">
                                <pre class="whitespace-pre-wrap text-sm text-gray-700">${Utils.escapeHTML(t.response||"")}</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                </div>
            </div>
        `,document.body.appendChild(e),e.addEventListener("click",s=>{s.target===e&&e.remove()})},async exportLogs(){const i=AppState.appData?.userAILog||[];if(i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0644\u0644\u062A\u0635\u062F\u064A\u0631");return}Loading.show();try{const t=i.map(e=>({"\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A":Utils.formatDateTime(e.timestamp),\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:e.userName||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641","\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A":e.userId||"",\u0627\u0644\u0633\u0624\u0627\u0644:e.question||"",\u0627\u0644\u0625\u062C\u0627\u0628\u0629:e.response||""}));if(typeof Utils<"u"&&Utils.exportToExcel)Utils.exportToExcel(t,"\u0633\u062C\u0644_\u0627\u0633\u062A\u062E\u062F\u0627\u0645_\u0627\u0644\u0645\u0633\u0627\u0639\u062F_\u0627\u0644\u0630\u0643\u064A");else{const e=XLSX.utils.json_to_sheet(t),s=XLSX.utils.book_new();XLSX.utils.book_append_sheet(s,e,"\u0633\u062C\u0644 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645"),XLSX.writeFile(s,`\u0633\u062C\u0644_\u0627\u0633\u062A\u062E\u062F\u0627\u0645_\u0627\u0644\u0645\u0633\u0627\u0639\u062F_\u0627\u0644\u0630\u0643\u064A_${new Date().toISOString().slice(0,10)}.xlsx`)}Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D")}catch(t){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0635\u062F\u064A\u0631: "+t.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u0635\u062F\u064A\u0631:",t)}finally{Loading.hide()}},async clearOldLogs(){const t=(AppState.appData?.aiAssistantSettings||{}).maxLogEntries||1e3,e=AppState.appData?.userAILog||[];if(e.length<=t){Notification.info(`\u0639\u062F\u062F \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A (${e.length}) \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 (${t})`);return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0642\u062F\u064A\u0645\u0629\u061F \u0633\u064A\u062A\u0645 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0622\u062E\u0631 ${t} \u0633\u062C\u0644 \u0641\u0642\u0637.`)){Loading.show();try{const s=[...e].sort((d,n)=>new Date(n.timestamp)-new Date(d.timestamp));AppState.appData.userAILog=s.slice(0,t),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),typeof GoogleIntegration<"u"&&GoogleIntegration.autoSave&&await GoogleIntegration.autoSave("UserAILog",AppState.appData.userAILog),Notification.success(`\u062A\u0645 \u062D\u0630\u0641 ${e.length-t} \u0633\u062C\u0644 \u0642\u062F\u064A\u0645`),this.showUserLogs()}catch(s){Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+s.message),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0630\u0641 \u0627\u0644\u0633\u062C\u0644\u0627\u062A:",s)}finally{Loading.hide()}}}}),(function(){"use strict";try{typeof window<"u"&&(typeof window.AIAssistant>"u"&&(window.AIAssistant={}),typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 AIAssistant module loaded and available on window.AIAssistant"))}catch{if(typeof window<"u")try{typeof window.AIAssistant>"u"&&(window.AIAssistant={})}catch{}}})();
