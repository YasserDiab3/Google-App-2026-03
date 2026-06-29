const RiskAssessment=(()=>{const r={filters:{query:"",status:"all",riskBracket:"all"},sort:{field:"updatedAt",direction:"desc"},listenersBound:!1,initialized:!1,scheduleHandle:null},y={section:"#risk-assessment-section",content:"#risk-assessment-content",summary:"#risk-assessment-summary",filters:"#risk-assessment-filters",tableContainer:"#risk-assessment-table-container",tableBody:"#risk-assessment-table-body",emptyState:"#risk-assessment-empty-state",exportButton:"#export-risk-excel-btn"},H=[{id:"low",label:"\u0645\u0646\u062E\u0641\u0636\u0629 (\u22645)",min:0,max:5},{id:"medium",label:"\u0645\u062A\u0648\u0633\u0637\u0629 (6-10)",min:6,max:10},{id:"high",label:"\u0645\u0631\u062A\u0641\u0639\u0629 (11-15)",min:11,max:15},{id:"critical",label:"\u062D\u0631\u062C\u0629 (\u226516)",min:16,max:1/0}],M=()=>(AppState.appData||(AppState.appData={}),Array.isArray(AppState.appData.riskAssessments)||(AppState.appData.riskAssessments=[]),AppState.appData.riskAssessments),B=()=>M().slice(),p=e=>typeof e=="string"?e.trim():e??"",k=e=>{if(e==null||e==="")return NaN;const t=Number(e);return Number.isFinite(t)?t:NaN},U=(e,t)=>{const s=k(e),i=k(t);return Number.isNaN(s)||Number.isNaN(i)?"":s*i},R=e=>e===""||e===null||e===void 0?"":String(e),w=(e,t)=>e!==""&&e!==null&&e!==void 0?e:t,A=e=>{const t=k(e?.residualRiskRate);if(!Number.isNaN(t))return t;const s=k(e?.riskLevel);if(!Number.isNaN(s))return s;const i=k(e?.initialRiskRate);return Number.isNaN(i)?NaN:i},C=e=>{const t=k(e);return Number.isNaN(t)?"secondary":t<=5?"success":t<=10?"info":t<=15?"warning":"danger"},q=e=>{switch(e){case"\u0645\u0643\u062A\u0645\u0644":return"success";case"\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621":return"danger";case"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":default:return"warning"}},b=e=>{if(!e)return"-";try{return Utils.formatDate(e)}catch(t){return Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E",t),"-"}},I=(e,t)=>{if(t==="all")return!0;const s=H.find(l=>l.id===t);if(!s)return!0;const i=k(e);return Number.isNaN(i)?!1:i>=s.min&&i<=s.max},P=e=>{if(!e.length)return e;const{query:t,status:s,riskBracket:i}=r.filters,l=t.trim().toLowerCase();return e.filter(n=>{const a=p(n.activity).toLowerCase(),o=p(n.location).toLowerCase(),c=p(n.processDescription).toLowerCase(),m=p(n.hazard).toLowerCase(),v=p(n.riskDescription).toLowerCase(),f=p(n.existingControlMeasure).toLowerCase(),h=p(n.requiredControlMeasure).toLowerCase(),L=p(n.additionalControl).toLowerCase(),u=p(n.actionRequired).toLowerCase(),d=p(n.responsiblePerson).toLowerCase(),g=s==="all"||p(n.status)===s,W=I(A(n),i),K=[a,o,c,m,v,f,h,L,u,d,p(n.correctiveActions).toLowerCase()],G=!l||K.some(V=>V.includes(l));return g&&W&&G})},z=e=>{const{field:t,direction:s}=r.sort,i=s==="asc"?1:-1;return e.sort((l,n)=>{const a=p(l[t]),o=p(n[t]);if(t==="date"||t==="createdAt"||t==="updatedAt"){const c=a?new Date(a).getTime():0,m=o?new Date(o).getTime():0;return(c-m)*i}if(t==="riskLevel"){const c=A(l),m=A(n),v=Number.isNaN(c)?-1/0:c,f=Number.isNaN(m)?-1/0:m;return v===f?0:(v-f)*i}return!Number.isNaN(Number(a))&&!Number.isNaN(Number(o))?(Number(a)-Number(o))*i:a.localeCompare(o,"ar",{sensitivity:"base"})*i})},S=()=>{const e=P(B());return z(e)},F=async e=>{e.innerHTML=`
            <div class="section-header">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-shield-alt ml-3"></i>
                            \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                        </h1>
                        <p class="section-subtitle">
                            \u0625\u062F\u0627\u0631\u0629 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631\u060C \u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u0635\u062D\u064A\u062D\u064A\u0629\u060C \u0648\u062A\u062D\u0644\u064A\u0644 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0644\u062D\u0638\u064A\u064B\u0627
                        </p>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap">
                        <button id="add-risk-assessment-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u062C\u062F\u064A\u062F
                        </button>
                        <button id="export-risk-excel-btn" class="btn-success">
                            <i class="fas fa-file-excel ml-2"></i>
                            \u062A\u0635\u062F\u064A\u0631 Excel
                        </button>
                    </div>
                </div>
            </div>
            <div class="space-y-6 mt-6" id="risk-assessment-content">
                <div id="risk-assessment-summary" class="grid gap-4 md:grid-cols-2 xl:grid-cols-4"></div>
                
                <!-- \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u0631\u062C\u0639\u064A\u0629 -->
                <div class="content-card">
                    <div class="card-header">
                        <h2 class="card-title flex items-center">
                            <i class="fas fa-th ml-2"></i>
                            \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 (\u0645\u0631\u062C\u0639)
                        </h2>
                    </div>
                    <div class="card-body flex justify-center">
                        ${typeof RiskMatrix<"u"?RiskMatrix.generate("risk-matrix-display",{showLegend:!0,interactive:!1}):""}
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="card-header">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <h2 class="card-title flex items-center">
                                <i class="fas fa-list ml-2"></i>
                                \u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                            </h2>
                            <form id="risk-assessment-filters" class="grid gap-3 md:grid-cols-4 w-full">
                                <label class="input-group col-span-2">
                                    <span class="input-group-icon"><i class="fas fa-search"></i></span>
                                    <input type="search"
                                           class="form-input"
                                           placeholder="\u0628\u062D\u062B \u0639\u0646 \u0646\u0634\u0627\u0637\u060C \u0645\u0648\u0642\u0639\u060C \u0623\u0648 \u0625\u062C\u0631\u0627\u0621 \u062A\u0635\u062D\u064A\u062D\u064A..."
                                           data-filter="query"
                                           value="${r.filters.query}">
                                </label>
                                <select class="form-input" data-filter="status">
                                    <option value="all" ${r.filters.status==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                                    <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${r.filters.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                    <option value="\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621" ${r.filters.status==="\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621"?"selected":""}>\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621</option>
                                    <option value="\u0645\u0643\u062A\u0645\u0644" ${r.filters.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                </select>
                                <select class="form-input" data-filter="riskBracket">
                                    <option value="all" ${r.filters.riskBracket==="all"?"selected":""}>\u062C\u0645\u064A\u0639 \u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631</option>
                                    ${H.map(t=>`
                                        <option value="${t.id}" ${r.filters.riskBracket===t.id?"selected":""}>
                                            ${t.label}
                                        </option>
                                    `).join("")}
                                </select>
                            </form>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="flex items-center justify-between mb-4">
                            <div class="text-sm text-gray-500">
                                <i class="fas fa-sort ml-1"></i>
                                \u062A\u0631\u062A\u064A\u0628 \u062D\u0633\u0628:
                                <select class="form-input inline-block w-auto ml-2" data-sort-field>
                                    <option value="updatedAt" ${r.sort.field==="updatedAt"?"selected":""}>\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</option>
                                    <option value="date" ${r.sort.field==="date"?"selected":""}>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</option>
                                    <option value="riskLevel" ${r.sort.field==="riskLevel"?"selected":""}>\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</option>
                                    <option value="status" ${r.sort.field==="status"?"selected":""}>\u0627\u0644\u062D\u0627\u0644\u0629</option>
                                </select>
                                <button type="button" class="btn-icon ml-2" data-sort-direction>
                                    <i class="fas fa-sort-amount-${r.sort.direction==="asc"?"up":"down"}"></i>
                                </button>
                            </div>
                            <button type="button" class="btn-secondary btn-sm" data-action="reset-filters">
                                <i class="fas fa-undo ml-1"></i>
                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0636\u0628\u0637
                            </button>
                        </div>
                        <div id="risk-assessment-table-container" class="relative">
                            <div class="empty-state" id="risk-assessment-empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},D=e=>{if(!e&&e!==0)return"-";const t=Number(e);return`<span class="badge badge-${C(t)}">${Number.isNaN(t)?Utils.escapeHTML(e):t}</span>`},j=e=>{const t=w(e.riskLevel,""),s=w(e.initialRiskRate,t),i=w(e.residualRiskRate,t);return`
            <tr data-id="${e.id}">
                <td>
                    <div class="font-semibold text-gray-800">${Utils.escapeHTML(e.activity||"-")}</div>
                    <div class="text-xs text-gray-500">${b(e.createdAt)}</div>
                </td>
                <td>${Utils.escapeHTML(e.location||"-")}</td>
                <td>
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-500">\u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645:</span>
                            ${D(s)}
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-gray-500">\u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645:</span>
                            ${D(i)}
                        </div>
                    </div>
                </td>
                <td>${b(e.date)}</td>
                <td>
                    <span class="badge badge-${q(e.status)}">
                        ${e.status||"-"}
                    </span>
                </td>
                <td class="w-32">
                    <div class="flex items-center gap-2 justify-end">
                        <button class="btn-icon btn-icon-info" data-action="view" data-id="${e.id}" title="\u0639\u0631\u0636">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon btn-icon-primary" data-action="edit" data-id="${e.id}" title="\u062A\u0639\u062F\u064A\u0644">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon btn-icon-danger" data-action="delete" data-id="${e.id}" title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `},N=e=>{const t=document.querySelector(y.tableContainer);if(!t)return;if(!e.length){t.innerHTML=`
                <div class="empty-state" id="risk-assessment-empty-state">
                    <i class="fas fa-shield-alt text-4xl text-gray-300 mb-4"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u062E\u0627\u0637\u0631 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0645\u0631\u0634\u062D\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                    <button class="btn-primary mt-4" data-action="create">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u062C\u062F\u064A\u062F
                    </button>
                </div>
            `;return}const s=document.createElement("template");s.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0646\u0634\u0627\u0637/\u0627\u0644\u0645\u0647\u0645\u0629</th>
                            <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                            <th>\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th class="text-right">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody id="risk-assessment-table-body">
                        ${e.map(j).join("")}
                    </tbody>
                </table>
            </div>
        `,t.innerHTML="",t.appendChild(s.content)},T=e=>{const t=document.querySelector(y.summary);if(!t)return;const s=e.length,i=e.filter(o=>o.status==="\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621").length,l=e.filter(o=>o.status==="\u0645\u0643\u062A\u0645\u0644").length,n=e.filter(o=>{const c=A(o);return!Number.isNaN(c)&&c>=15}).length,a=e.map(o=>o.updatedAt).filter(Boolean).sort((o,c)=>new Date(c)-new Date(o))[0]||null;t.innerHTML=`
            <div class="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div class="text-sm text-gray-500 mb-2">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</div>
                <div class="text-3xl font-bold text-gray-800">${s}</div>
            </div>
            <div class="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm text-gray-500 mb-2">\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621</div>
                        <div class="text-2xl font-semibold text-red-600">${i}</div>
                    </div>
                    <span class="badge badge-danger">${(i/(s||1)*100).toFixed(0)}%</span>
                </div>
            </div>
            <div class="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div class="text-sm text-gray-500 mb-2">\u0645\u0643\u062A\u0645\u0644</div>
                <div class="text-2xl font-semibold text-emerald-600">${l}</div>
            </div>
            <div class="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                <div class="text-sm text-gray-500 mb-2">\u0645\u062E\u0627\u0637\u0631 \u0639\u0627\u0644\u064A\u0629/\u062D\u0631\u062C\u0629</div>
                <div class="text-2xl font-semibold text-orange-600">${n}</div>
                ${a?`<div class="text-xs text-gray-400 mt-2">
                    <i class="fas fa-history ml-1"></i> \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B ${b(a)}
                </div>`:""}
            </div>
        `},$=()=>{r.scheduleHandle&&cancelAnimationFrame(r.scheduleHandle),r.scheduleHandle=requestAnimationFrame(()=>{r.scheduleHandle=null,x.loadRiskAssessmentsList()})},E=e=>{const t=e.target;t&&(t.dataset.filter==="query"&&(r.filters.query=t.value||"",$()),t.dataset.filter==="status"&&(r.filters.status=t.value||"all",$()),t.dataset.filter==="riskBracket"&&(r.filters.riskBracket=t.value||"all",$()))},O=e=>{const t=e.target.closest("[data-sort-field], [data-sort-direction]");t&&(t.matches("[data-sort-field]")?(r.sort.field=t.value,$()):t.matches("[data-sort-direction]")&&(r.sort.direction=r.sort.direction==="asc"?"desc":"asc",$()))},X=e=>{const t=e.target.closest("[data-action]");if(!t)return;const{action:s,id:i}=t.dataset;switch(s){case"view":x.viewAssessment(i);break;case"edit":x.editAssessment(i);break;case"delete":x.deleteAssessment(i);break;case"create":x.showForm();break;case"reset-filters":r.filters={query:"",status:"all",riskBracket:"all"},r.sort={field:"updatedAt",direction:"desc"},x.load(!0);break;default:break}},_=e=>{r.listenersBound||(e.addEventListener("input",E),e.addEventListener("change",E),e.addEventListener("change",O),e.addEventListener("click",X),r.listenersBound=!0)},x={async load(e=!1){const t=document.querySelector(y.section);if(t){M(),e&&(r.initialized=!1);try{await F(t),_(t);try{setTimeout(()=>{x.loadRiskAssessmentsList().catch(s=>{if(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0623\u0648\u0644\u064A:",s),document.querySelector(y.tableContainer)){const l=S();T(l),N(l)}})},0)}catch(s){if(Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",s),document.querySelector(y.tableContainer)){const l=S();T(l),N(l)}else{const l=document.querySelector("#risk-assessment-content");l&&(l.innerHTML=`
                                <div class="content-card">
                                    <div class="card-body">
                                        <div class="empty-state">
                                            <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                            <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                            <p class="text-sm text-gray-400 mb-4">${s&&s.message?Utils.escapeHTML(s.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                            <button onclick="RiskAssessment.load()" class="btn-primary">
                                                <i class="fas fa-redo ml-2"></i>
                                                \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `)}}r.initialized=!0}catch(s){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",s);const i=document.querySelector(y.section);i&&(i.innerHTML=`
                        <div class="section-header">
                            <div>
                                <h1 class="section-title">
                                    <i class="fas fa-shield-alt ml-3"></i>
                                    \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631
                                </h1>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div class="content-card">
                                <div class="card-body">
                                    <div class="empty-state">
                                        <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                        <p class="text-gray-500 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                        <p class="text-sm text-gray-400 mb-4">${s&&s.message?Utils.escapeHTML(s.message):"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                        <button onclick="RiskAssessment.load()" class="btn-primary">
                                            <i class="fas fa-redo ml-2"></i>
                                            \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `),typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631. \u064A\u064F\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",{duration:5e3})}}},async loadRiskAssessmentsList(){const e=S();T(e),N(e);const t=document.getElementById("add-risk-assessment-btn");t&&(t.onclick=()=>this.showForm());const s=document.querySelector(y.exportButton);s&&(s.onclick=()=>this.exportToExcel(e));const i=document.querySelector('[data-action="create"]');i&&i.addEventListener("click",()=>this.showForm(),{once:!0})},getRiskLevelBadgeClass:C,async exportToExcel(e=null){const t=e??S();if(!t.length){Notification?.info?.("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627 \u0641\u064A \u0627\u0644\u0645\u0631\u0634\u062D\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629");return}try{if(Loading.show(),typeof XLSX>"u")throw new Error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");const s=t.map(a=>({"\u0627\u0644\u0646\u0634\u0627\u0637/\u0627\u0644\u0645\u0647\u0645\u0629":a.activity||"",\u0627\u0644\u0645\u0648\u0642\u0639:a.location||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645":a.date?Utils.formatDate(a.date):"",\u0627\u0644\u062D\u0627\u0644\u0629:a.status||"","\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629":a.processDescription||"",\u0627\u0644\u062E\u0637\u0631:a.hazard||"",\u0627\u0644\u062E\u0637\u0648\u0631\u0629:a.riskDescription||"","\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629":a.existingControlMeasure||"","\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 (P)":a.initialProbability||"","\u0627\u0644\u0634\u062F\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 (S)":a.initialSeverity||"","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 (R)":a.initialRiskRate||"","\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629":a.requiredControlMeasure||"","\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630":a.responsiblePerson||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637":a.planningDate?Utils.formatDate(a.planningDate):"","\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645 (P)":a.residualProbability||"","\u0627\u0644\u0634\u062F\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645 (S)":a.residualSeverity||"","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645 (R)":a.residualRiskRate||"","\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629":a.additionalControl||"","\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628":a.actionRequired||"",\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629:a.followUp||"","\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637 \u0644\u0644\u062A\u0646\u0641\u064A\u0630":a.actionPlannedDate?Utils.formatDate(a.actionPlannedDate):"",\u0627\u0644\u0645\u0633\u0624\u0648\u0644:a.actionResponsible||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":a.endDate?Utils.formatDate(a.endDate):"",\u0627\u0644\u0641\u0627\u0639\u0644\u064A\u0629:a.effectiveness||"",\u0627\u0633\u062A\u062F\u0627\u0645\u0629:a.sustainability||"","\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A":a.riskLevel||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621":a.createdAt?Utils.formatDate(a.createdAt):"","\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B":a.updatedAt?Utils.formatDate(a.updatedAt):""})),i=XLSX.utils.book_new(),l=XLSX.utils.json_to_sheet(s);l["!cols"]=[{wch:30},{wch:20},{wch:15},{wch:15},{wch:15},{wch:50},{wch:30},{wch:30},{wch:30},{wch:18},{wch:18},{wch:18},{wch:30},{wch:25},{wch:18},{wch:18},{wch:25},{wch:25},{wch:25},{wch:25},{wch:25},{wch:18},{wch:18},{wch:18},{wch:18},{wch:18}],XLSX.utils.book_append_sheet(i,l,"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631");const n=new Date().toISOString().slice(0,10);XLSX.writeFile(i,`\u0633\u062C\u0644_\u062A\u0642\u064A\u064A\u0645_\u0627\u0644\u0645\u062E\u0627\u0637\u0631_${n}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0628\u0646\u062C\u0627\u062D")}catch(s){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 Excel:",s),Notification.error("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 Excel: "+s.message)}finally{Loading.hide()}},async showForm(e=null){const t=!!e,s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
                <div class="modal-content" style="max-width: 1100px;">
                    <div class="modal-header">
                        <h2 class="modal-title">${t?"\u062A\u0639\u062F\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631":"\u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0645\u062E\u0627\u0637\u0631 \u062C\u062F\u064A\u062F"}</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body space-y-6">
                        <form id="risk-assessment-form" class="space-y-6">
                            <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0634\u0627\u0637/\u0627\u0644\u0645\u0647\u0645\u0629 *</label>
                                    <input type="text" id="risk-activity" required class="form-input"
                                        value="${Utils.escapeHTML(e?.activity||"")}" placeholder="\u0648\u0635\u0641 \u0627\u0644\u0646\u0634\u0627\u0637">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0648\u0642\u0639 *</label>
                                    <input type="text" id="risk-location" required class="form-input"
                                        value="${Utils.escapeHTML(e?.location||"")}" placeholder="\u0645\u0648\u0642\u0639 \u0627\u0644\u0639\u0645\u0644">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                                    <input type="date" id="risk-date" required class="form-input"
                                        value="${e?.date?new Date(e.date).toISOString().slice(0,10):""}">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                    <select id="risk-status" required class="form-input">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                        <option value="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" ${e?.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"?"selected":""}>\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                        <option value="\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621" ${e?.status==="\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621"?"selected":""}>\u064A\u062A\u0637\u0644\u0628 \u0625\u062C\u0631\u0627\u0621</option>
                                        <option value="\u0645\u0643\u062A\u0645\u0644" ${e?.status==="\u0645\u0643\u062A\u0645\u0644"?"selected":""}>\u0645\u0643\u062A\u0645\u0644</option>
                                    </select>
                                </div>
                            </section>

                            <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div class="lg:col-span-1">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</label>
                                    <textarea id="risk-process-description" class="form-input" rows="4"
                                        placeholder="\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0644\u0644\u0639\u0645\u0644\u064A\u0629 \u0623\u0648 \u0627\u0644\u0645\u0647\u0645\u0629">${Utils.escapeHTML(e?.processDescription||"")}</textarea>
                                </div>
                                <div class="lg:col-span-1">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062E\u0637\u0631</label>
                                    <textarea id="risk-hazard" class="form-input" rows="4"
                                        placeholder="\u062D\u062F\u062F \u0627\u0644\u062E\u0637\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A \u0627\u0644\u0645\u0631\u062A\u0628\u0637 \u0628\u0627\u0644\u0639\u0645\u0644\u064A\u0629">${Utils.escapeHTML(e?.hazard||"")}</textarea>
                                </div>
                                <div class="lg:col-span-1">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                    <textarea id="risk-risk-description" class="form-input" rows="4"
                                        placeholder="\u0648\u0635\u0641 \u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u062E\u0637\u0631 \u0648\u0639\u0648\u0627\u0642\u0628\u0647 \u0627\u0644\u0645\u062D\u062A\u0645\u0644\u0629">${Utils.escapeHTML(e?.riskDescription||"")}</textarea>
                                </div>
                            </section>

                            <!-- \u0645\u0635\u0641\u0648\u0641\u0629 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 -->
                            <section class="flex justify-center">
                                <div id="risk-matrix-initial-container">
                                    ${typeof RiskMatrix<"u"?RiskMatrix.generate("risk-matrix-initial",{selectedProbability:e?.initialProbability?parseInt(e.initialProbability):null,selectedSeverity:e?.initialSeverity?parseInt(e.initialSeverity):null,showLegend:!0,interactive:!0}):""}
                                </div>
                            </section>

                            <section class="border rounded-lg p-4 bg-gray-50 space-y-4">
                                <header class="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-800">\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u062D\u0627\u0644\u064A (\u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645)</h3>
                                        <p class="text-sm text-gray-500">\u062A\u062D\u062F\u064A\u062F \u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0648\u062D\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u0644\u064A</p>
                                    </div>
                                </header>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</label>
                                    <textarea id="risk-existing-control" class="form-input" rows="3"
                                        placeholder="\u0648\u0635\u0641 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629">${Utils.escapeHTML(e?.existingControlMeasure||"")}</textarea>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 (P)</label>
                                        <input type="number" id="risk-probability-initial" min="0" max="5" step="1" class="form-input"
                                            value="${Utils.escapeHTML(e?.initialProbability??"")}" placeholder="0 - 5">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0634\u062F\u0629 (S)</label>
                                        <input type="number" id="risk-severity-initial" min="0" max="5" step="1" class="form-input"
                                            value="${Utils.escapeHTML(e?.initialSeverity??"")}" placeholder="0 - 5">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 (R = S \xD7 P)</label>
                                        <input type="text" id="risk-rate-initial" readonly class="form-input bg-gray-100"
                                            value="${Utils.escapeHTML(e?.initialRiskRate??"")}" placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627">
                                    </div>
                                </div>
                            </section>

                            <section class="border rounded-lg p-4 bg-white space-y-4">
                                <header class="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h3 class="text-lg font-semibold text-gray-800">\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0648\u0627\u0644\u062A\u062E\u0637\u064A\u0637</h3>
                                        <p class="text-sm text-gray-500">\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0648\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0648\u0627\u0644\u062A\u0648\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637 \u0644\u0647\u0627</p>
                                    </div>
                                </header>
                                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</label>
                                        <textarea id="risk-required-control" class="form-input" rows="3"
                                            placeholder="\u0645\u0627 \u0627\u0644\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0644\u0644\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u062E\u0637\u0631\u061F">${Utils.escapeHTML(e?.requiredControlMeasure||"")}</textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629</label>
                                        <textarea id="risk-additional-control" class="form-input" rows="3"
                                            placeholder="\u0623\u064A \u0648\u0633\u0627\u0626\u0644 \u062A\u062D\u0643\u0645 \u0625\u0636\u0627\u0641\u064A\u0629 \u0645\u0642\u062A\u0631\u062D\u0629">${Utils.escapeHTML(e?.additionalControl||"")}</textarea>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</label>
                                        <input type="text" id="risk-responsible-person" class="form-input"
                                            value="${Utils.escapeHTML(e?.responsiblePerson||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</label>
                                        <input type="date" id="risk-planning-date" class="form-input"
                                            value="${e?.planningDate?new Date(e.planningDate).toISOString().slice(0,10):""}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629 (P)</label>
                                        <input type="number" id="risk-probability-residual" min="0" max="5" step="1" class="form-input"
                                            value="${Utils.escapeHTML(e?.residualProbability??"")}" placeholder="0 - 5">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0634\u062F\u0629 (S)</label>
                                        <input type="number" id="risk-severity-residual" min="0" max="5" step="1" class="form-input"
                                            value="${Utils.escapeHTML(e?.residualSeverity??"")}" placeholder="0 - 5">
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645</label>
                                        <input type="text" id="risk-rate-residual" readonly class="form-input bg-gray-100"
                                            value="${Utils.escapeHTML(e?.residualRiskRate??"")}" placeholder="\u0633\u064A\u062A\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 \u062A\u0644\u0642\u0627\u0626\u064A\u064B\u0627">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628</label>
                                        <textarea id="risk-action-required" class="form-input" rows="3"
                                            placeholder="\u062D\u062F\u062F \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629">${Utils.escapeHTML(e?.actionRequired||"")}</textarea>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</label>
                                        <textarea id="risk-follow-up" class="form-input" rows="3"
                                            placeholder="\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629">${Utils.escapeHTML(e?.followUp||"")}</textarea>
                                    </div>
                                </div>
                            </section>

                            <section class="border rounded-lg p-4 bg-gray-50 space-y-4">
                                <header>
                                    <h3 class="text-lg font-semibold text-gray-800">\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0633\u064A\u0637\u0631\u0629 \u0648\u0642\u064A\u0627\u0633 \u0627\u0644\u0641\u0627\u0639\u0644\u064A\u0629</h3>
                                    <p class="text-sm text-gray-500">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0641\u0639\u0644\u064A\u0629 \u0648\u0627\u0644\u0646\u062A\u0627\u0626\u062C</p>
                                </header>
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u062E\u0637\u0637</label>
                                        <input type="date" id="risk-planned-date" class="form-input"
                                            value="${e?.actionPlannedDate?new Date(e.actionPlannedDate).toISOString().slice(0,10):""}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                        <input type="text" id="risk-action-responsible" class="form-input"
                                            value="${Utils.escapeHTML(e?.actionResponsible||"")}" placeholder="\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629/\u0627\u0644\u062A\u0646\u0641\u064A\u0630">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</label>
                                        <input type="date" id="risk-end-date" class="form-input"
                                            value="${e?.endDate?new Date(e.endDate).toISOString().slice(0,10):""}">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0641\u0627\u0639\u0644\u064A\u0629</label>
                                        <select id="risk-effective" class="form-input">
                                            <option value="">\u0627\u062E\u062A\u0631</option>
                                            <option value="\u0641\u0639\u0651\u0627\u0644" ${e?.effectiveness==="\u0641\u0639\u0651\u0627\u0644"?"selected":""}>\u0641\u0639\u0651\u0627\u0644</option>
                                            <option value="\u062C\u0632\u0626\u064A" ${e?.effectiveness==="\u062C\u0632\u0626\u064A"?"selected":""}>\u062C\u0632\u0626\u064A</option>
                                            <option value="\u063A\u064A\u0631 \u0641\u0639\u0651\u0627\u0644" ${e?.effectiveness==="\u063A\u064A\u0631 \u0641\u0639\u0651\u0627\u0644"?"selected":""}>\u063A\u064A\u0631 \u0641\u0639\u0651\u0627\u0644</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u062A\u062F\u0627\u0645\u0629</label>
                                    <textarea id="risk-sustain" class="form-input" rows="3"
                                        placeholder="\u0643\u064A\u0641 \u0633\u064A\u062A\u0645 \u0636\u0645\u0627\u0646 \u0627\u0633\u062A\u062F\u0627\u0645\u0629 \u0627\u0644\u062A\u062D\u0643\u0645\u061F">${Utils.escapeHTML(e?.sustainability||"")}</textarea>
                                </div>
                            </section>

                            <input type="hidden" id="risk-level"
                                value="${Utils.escapeHTML(e?.residualRiskRate??e?.initialRiskRate??e?.riskLevel??"")}">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" form="risk-assessment-form" class="btn-primary">${t?"\u062A\u062D\u062F\u064A\u062B":"\u062D\u0641\u0638"}</button>
                    </div>
                </div>
            `,document.body.appendChild(s),s.querySelector("#risk-assessment-form").addEventListener("submit",n=>{n.preventDefault(),this.handleSubmit(e?.id??null,s)}),s.addEventListener("click",n=>{n.target===s&&s.remove()});const l=(n,a,o,c=!1)=>{const m=document.getElementById(n),v=document.getElementById(a),f=document.getElementById(o),h=()=>{if(!f)return;const L=U(m?.value,v?.value),u=R(L);if(f.value=u,c){const d=document.getElementById("risk-level");d&&(d.value=u)}};m?.addEventListener("input",h),v?.addEventListener("input",h),h()};l("risk-probability-initial","risk-severity-initial","risk-rate-initial",!1),l("risk-probability-residual","risk-severity-residual","risk-rate-residual",!0)},async handleSubmit(e,t){M();const s=d=>{const g=document.getElementById(d);return g?g.value.trim():""},i=d=>{const g=s(d);return g?new Date(g).toISOString():""},l=s("risk-probability-initial"),n=s("risk-severity-initial"),a=s("risk-probability-residual"),o=s("risk-severity-residual"),c=U(l,n),m=U(a,o),v=R(c),f=R(m),h=R(w(f,v)),L=document.getElementById("risk-level");L&&(L.value=h);const u={id:e||(window.crypto?.randomUUID?.()??Utils.generateId("RISK")),activity:s("risk-activity"),location:s("risk-location"),date:i("risk-date"),status:s("risk-status"),processDescription:s("risk-process-description"),hazard:s("risk-hazard"),riskDescription:s("risk-risk-description"),existingControlMeasure:s("risk-existing-control"),initialProbability:l,initialSeverity:n,initialRiskRate:v,requiredControlMeasure:s("risk-required-control"),responsiblePerson:s("risk-responsible-person"),planningDate:i("risk-planning-date"),residualProbability:a,residualSeverity:o,residualRiskRate:f,additionalControl:s("risk-additional-control"),actionRequired:s("risk-action-required"),followUp:s("risk-follow-up"),actionPlannedDate:i("risk-planned-date"),actionResponsible:s("risk-action-responsible"),endDate:i("risk-end-date"),effectiveness:s("risk-effective"),sustainability:s("risk-sustain"),riskLevel:h,correctiveActions:s("risk-action-required"),likelihood:w(a,l),consequence:w(o,n),createdAt:e?AppState.appData.riskAssessments.find(d=>d.id===e)?.createdAt??new Date().toISOString():new Date().toISOString(),updatedAt:new Date().toISOString()};if(!u.activity||!u.location||!u.date||!u.status){Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0625\u062C\u0628\u0627\u0631\u064A\u0629");return}if(!(!u.riskLevel&&!confirm("\u0644\u0645 \u064A\u062A\u0645 \u0627\u062D\u062A\u0633\u0627\u0628 \u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629\u060C \u0647\u0644 \u062A\u0631\u063A\u0628 \u0641\u064A \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"))){Loading.show();try{if(e){const d=AppState.appData.riskAssessments.findIndex(g=>g.id===e);d!==-1&&(AppState.appData.riskAssessments[d]={...AppState.appData.riskAssessments[d],...u},Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D"))}else AppState.appData.riskAssessments.push(u),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D");typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave?.("RiskAssessments",AppState.appData.riskAssessments),t.remove(),await this.loadRiskAssessmentsList()}catch(d){Utils.safeError("\u0641\u0634\u0644 \u062D\u0641\u0638 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",d),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+d.message)}finally{Loading.hide()}}},async editAssessment(e){const t=AppState.appData.riskAssessments.find(s=>s.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}await this.showForm(t)},async viewAssessment(e){const t=AppState.appData.riskAssessments.find(l=>l.id===e);if(!t){Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628");return}const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
                <div class="modal-content" style="max-width: 920px;">
                    <div class="modal-header">
                        <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631</h2>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body space-y-6">
                        <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0644\u0646\u0634\u0627\u0637/\u0627\u0644\u0645\u0647\u0645\u0629</span>
                                <div class="font-semibold text-gray-800 mt-1">${Utils.escapeHTML(t.activity||"-")}</div>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0644\u0645\u0648\u0642\u0639</span>
                                <div class="font-semibold text-gray-800 mt-1">${Utils.escapeHTML(t.location||"-")}</div>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</span>
                                <div class="font-semibold text-gray-800 mt-1">${b(t.date)}</div>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0644\u062D\u0627\u0644\u0629</span>
                                <div class="mt-1">
                                    <span class="badge badge-${q(t.status)}">
                                        ${t.status||"-"}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
                            <div>
                                <span class="text-sm text-gray-500">\u0648\u0635\u0641 \u0627\u0644\u0639\u0645\u0644\u064A\u0629</span>
                                <p class="text-gray-800 whitespace-pre-line mt-1">
                                    ${Utils.escapeHTML(t.processDescription||"\u2014")}
                                </p>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0644\u062E\u0637\u0631</span>
                                <p class="text-gray-800 whitespace-pre-line mt-1">
                                    ${Utils.escapeHTML(t.hazard||"\u2014")}
                                </p>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0644\u062E\u0637\u0648\u0631\u0629</span>
                                <p class="text-gray-800 whitespace-pre-line mt-1">
                                    ${Utils.escapeHTML(t.riskDescription||"\u2014")}
                                </p>
                            </div>
                        </section>

                        <section class="border rounded-lg p-4 space-y-4">
                            <header>
                                <h3 class="text-lg font-semibold text-gray-800">\u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629</h3>
                                <p class="text-sm text-gray-500">\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u064A\u0646 \u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u062E\u0637\u0648\u0631\u0629 \u0642\u0628\u0644 \u0648\u0628\u0639\u062F \u062A\u0637\u0628\u064A\u0642 \u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u062A\u062D\u0643\u0645</p>
                            </header>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="border rounded-md p-4 bg-white space-y-3">
                                    <h4 class="font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fas fa-exclamation-triangle text-amber-500"></i>
                                        \u0642\u0628\u0644 \u0627\u0644\u062A\u062D\u0643\u0645
                                    </h4>
                                    <div class="text-sm text-gray-500">\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</div>
                                    <p class="text-gray-800 whitespace-pre-line">
                                        ${Utils.escapeHTML(t.existingControlMeasure||"\u2014")}
                                    </p>
                                    <div class="grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <div class="text-xs text-gray-500">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629</div>
                                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.initialProbability||"\u2014")}</div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">\u0627\u0644\u0634\u062F\u0629</div>
                                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.initialSeverity||"\u2014")}</div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                                            <div>${D(t.initialRiskRate)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border rounded-md p-4 bg-white space-y-3">
                                    <h4 class="font-semibold text-gray-700 flex items-center gap-2">
                                        <i class="fas fa-check-circle text-emerald-500"></i>
                                        \u0628\u0639\u062F \u0627\u0644\u062A\u062D\u0643\u0645
                                    </h4>
                                    <div class="text-sm text-gray-500">\u0648\u0633\u064A\u0644\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629</div>
                                    <p class="text-gray-800 whitespace-pre-line">
                                        ${Utils.escapeHTML(t.requiredControlMeasure||"\u2014")}
                                    </p>
                                    <div class="grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <div class="text-xs text-gray-500">\u0627\u0644\u0627\u062D\u062A\u0645\u0627\u0644\u064A\u0629</div>
                                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.residualProbability||"\u2014")}</div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">\u0627\u0644\u0634\u062F\u0629</div>
                                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(t.residualSeverity||"\u2014")}</div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500">\u0645\u0639\u062F\u0644 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                                            <div>${D(t.residualRiskRate||t.riskLevel)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="border rounded-lg p-4 space-y-4">
                            <header>
                                <h3 class="text-lg font-semibold text-gray-800">\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0648\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</h3>
                            </header>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0627\u0644\u062A\u0646\u0641\u064A\u0630</span>
                                    <div class="font-semibold text-gray-800 mt-1">${Utils.escapeHTML(t.responsiblePerson||"\u2014")}</div>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637</span>
                                    <div class="font-semibold text-gray-800 mt-1">${b(t.planningDate)}</div>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u0625\u062C\u0631\u0627\u0621 \u0627\u0644\u0645\u0637\u0644\u0648\u0628</span>
                                    <p class="text-gray-800 whitespace-pre-line mt-1">
                                        ${Utils.escapeHTML(t.actionRequired||"\u2014")}
                                    </p>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629</span>
                                    <p class="text-gray-800 whitespace-pre-line mt-1">
                                        ${Utils.escapeHTML(t.followUp||"\u2014")}
                                    </p>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u062E\u0637\u0637 \u0644\u0644\u062A\u0646\u0641\u064A\u0630</span>
                                    <div class="font-semibold text-gray-800 mt-1">${b(t.actionPlannedDate)}</div>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u0645\u0633\u0624\u0648\u0644</span>
                                    <div class="font-semibold text-gray-800 mt-1">${Utils.escapeHTML(t.actionResponsible||"\u2014")}</div>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</span>
                                    <div class="font-semibold text-gray-800 mt-1">${b(t.endDate)}</div>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500">\u0627\u0644\u0641\u0627\u0639\u0644\u064A\u0629</span>
                                    <div class="font-semibold text-gray-800 mt-1">${Utils.escapeHTML(t.effectiveness||"\u2014")}</div>
                                </div>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500">\u0627\u0633\u062A\u062F\u0627\u0645\u0629</span>
                                <p class="text-gray-800 whitespace-pre-line mt-1">
                                    ${Utils.escapeHTML(t.sustainability||"\u2014")}
                                </p>
                            </div>
                        </section>

                        <div class="text-xs text-gray-400 border-t pt-3">
                            <i class="fas fa-clock ml-1"></i>
                            \u062A\u0645 \u0627\u0644\u0625\u0646\u0634\u0627\u0621 \u0641\u064A ${b(t.createdAt)} \u2014 \u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B ${b(t.updatedAt)}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                        <div class="flex-1"></div>
                        <button type="button" class="btn-primary" data-action="view-edit" data-id="${t.id}">
                            <i class="fas fa-edit ml-1"></i>
                            \u062A\u0639\u062F\u064A\u0644
                        </button>
                    </div>
                </div>
            `,document.body.appendChild(s),s.addEventListener("click",l=>{l.target===s&&s.remove()});const i=s.querySelector('[data-action="view-edit"]');i&&i.addEventListener("click",()=>{s.remove(),this.editAssessment(t.id)})},async deleteAssessment(e){const t=AppState.appData.riskAssessments.find(i=>i.id===e);if(!t){Notification.error("\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647 \u0628\u0627\u0644\u0641\u0639\u0644");return}if(confirm(`\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0644\u0644\u0646\u0634\u0627\u0637 "${t.activity}"\u061F`)){Loading.show();try{AppState.appData.riskAssessments=AppState.appData.riskAssessments.filter(i=>i.id!==e),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave?.("RiskAssessments",AppState.appData.riskAssessments),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D"),await this.loadRiskAssessmentsList()}catch(i){Utils.safeError("\u0641\u0634\u0644 \u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+i.message)}finally{Loading.hide()}}}};return x})();(function(){"use strict";try{typeof window<"u"&&typeof RiskAssessment<"u"&&(window.RiskAssessment=RiskAssessment,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 RiskAssessment module loaded and available on window.RiskAssessment"))}catch{if(typeof window<"u"&&typeof RiskAssessment<"u")try{window.RiskAssessment=RiskAssessment}catch{}}})();
