const ApprovalCircuits={_ensureStore(){return AppState.companySettings||(AppState.companySettings={}),(!AppState.companySettings.approvalCircuits||typeof AppState.companySettings.approvalCircuits!="object")&&(AppState.companySettings.approvalCircuits={}),AppState.companySettings.approvalCircuits},_normalizeOwnerKey(e){return!e||e==="__default__"?"__default__":String(e)},getAll(){return this._ensureStore()},getCircuit(e){const a=this.getAll(),r=this._normalizeOwnerKey(e);return a[r]||null},getCircuitForUser(e){const a=this.getAll(),r=this._normalizeOwnerKey(e);return r!=="__default__"&&a[r]?a[r]:a.__default__||null},listOwners(){const e=this.getAll();return Object.keys(e)},createEmptyCircuit(e="__default__"){return{id:Utils.generateId("CIR"),ownerId:this._normalizeOwnerKey(e),name:e==="__default__"?"\u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629":"",steps:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}},saveCircuit(e){if(!e||!e.ownerId)return;const a=this.getAll(),r=this._normalizeOwnerKey(e.ownerId);a[r]=Object.assign({},e,{ownerId:r,updatedAt:new Date().toISOString()}),DataManager.saveCompanySettings(),DataManager.save()},deleteCircuit(e){const a=this.getAll(),r=this._normalizeOwnerKey(e);a[r]&&(delete a[r],DataManager.saveCompanySettings(),DataManager.save())},getUsersList(){return(Array.isArray(AppState.appData.users)?[...AppState.appData.users]:[]).sort((a,r)=>(a.name||"").localeCompare(r.name||"","ar",{sensitivity:"base"}))},getUserById(e){return e?(Array.isArray(AppState.appData.users)?AppState.appData.users:[]).find(r=>r&&(r.id===e||r.email===e)):null},toCandidate(e){return e?{id:e.id||e.email||"",name:e.name||e.fullName||e.displayName||e.email||"",email:e.email||"",role:e.role||""}:null},buildUserSnapshot(e){return e?{id:e.id||"",name:e.name||e.fullName||e.displayName||"",email:e.email||"",role:e.role||""}:null},_createApprovalFromStep(e,a=0,r="__default__"){const s=(Array.isArray(e?.userIds)?e.userIds.filter(Boolean):[]).map(n=>this.toCandidate(this.getUserById(n))).filter(Boolean),i=s.length===1?s[0]:null;return{role:e?.name||e?.role||"",required:e?.required!==!1,status:"pending",order:a,approverId:i?.id||"",approver:i?.name||"",approverEmail:i?.email||"",candidates:s,history:[],assignedAt:i?new Date().toISOString():"",assignedBy:null,isSafetyOfficer:e?.isSafetyOfficer===!0,circuitOwnerId:r}},enrichApprovals(e=[],a="__default__"){return e.map((r,t)=>this._attachMetadataToApproval(r,t,a))},_attachMetadataToApproval(e,a=0,r="__default__"){const t=Object.assign({},e);if(t.order=typeof t.order=="number"?t.order:a,t.status=t.status||(t.approved?"approved":t.rejected?"rejected":"pending"),t.required=t.required!==!1,t.circuitOwnerId=t.circuitOwnerId||r,Array.isArray(t.candidates)?t.candidates=t.candidates.map(s=>s?s.id&&s.name&&s.email!==void 0?s:this.toCandidate(this.getUserById(s.id||s)):null).filter(Boolean):t.candidates=[],t.approverId&&!t.approver){const s=this.getUserById(t.approverId);s&&(t.approver=s.name||"",t.approverEmail=s.email||"")}if(!t.approverId&&t.approverEmail){const s=t.candidates.find(i=>i.email&&i.email.toLowerCase()===t.approverEmail.toLowerCase());s&&(t.approverId=s.id)}return t.history=Array.isArray(t.history)?t.history:[],t.assignedAt=t.assignedAt||"",t.assignedBy=t.assignedBy||null,t},generateApprovalsForUser(e){const a=this.getCircuitForUser(e);return!a||!Array.isArray(a.steps)||a.steps.length===0?typeof PTW<"u"&&PTW.getDefaultApprovals?{approvals:this.enrichApprovals(PTW.getDefaultApprovals(),"__default__"),circuitOwnerId:"__default__",circuitName:"\u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629"}:{approvals:[],circuitOwnerId:"__default__",circuitName:"\u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0627\u0644\u0639\u0627\u0645\u0629"}:{approvals:[...a.steps].sort((s,i)=>(s.order||0)-(i.order||0)).map((s,i)=>this._attachMetadataToApproval(this._createApprovalFromStep(s,i,a.ownerId||"__default__"),i,a.ownerId||"__default__")),circuitOwnerId:a.ownerId||"__default__",circuitName:a.name||""}},buildHistoryEntry(e,a={}){return Object.assign({id:Utils.generateId("APRLOG"),action:e,timestamp:new Date().toISOString()},a)},renderManager(e="ptw"){try{const a=this.getAll(),r=this.listOwners(),t=this.getUsersList();return!r||r.length===0||r.length===1&&r[0]==="__default__"&&!a.__default__?`
                    <div class="text-center py-8">
                        <div class="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-route text-purple-400 text-2xl"></i>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">\u0625\u062F\u0627\u0631\u0629 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</h3>
                        <p class="text-gray-500 text-sm max-w-md mx-auto mb-4">
                            \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u062A\u0643\u0648\u064A\u0646\u0627\u062A \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u064A\u0646 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0642\u0633\u0645 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A.
                        </p>
                        <a href="javascript:void(0)" onclick="if(typeof AppUI !== 'undefined' && typeof Settings !== 'undefined') { AppUI.switchModule('settings'); setTimeout(() => { const settingsTab = document.querySelector('[data-tab="approval-circuits"]'); if(settingsTab) settingsTab.click(); }, 300); }" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                            <i class="fas fa-cog ml-2"></i>
                            \u0627\u0644\u0630\u0647\u0627\u0628 \u0625\u0644\u0649 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A
                        </a>
                    </div>
                `:`
                <div class="space-y-4">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">\u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0643\u0648\u0646\u0629</h3>
                            <p class="text-sm text-gray-600 mt-1">\u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</p>
                        </div>
                        <a href="javascript:void(0)" onclick="if(typeof AppUI !== 'undefined' && typeof Settings !== 'undefined') { AppUI.switchModule('settings'); setTimeout(() => { const settingsTab = document.querySelector('[data-tab="approval-circuits"]'); if(settingsTab) settingsTab.click(); }, 300); }" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                            <i class="fas fa-cog ml-2"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A
                        </a>
                    </div>
                    <div class="space-y-3">
                        ${r.filter(i=>a[i]).map(i=>{const n=a[i],p=i==="__default__"?null:this.getUserById(i),d=i==="__default__"?"\u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A (\u064A\u0637\u0628\u0642 \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646)":p?.name||p?.email||`\u0645\u0633\u062A\u062E\u062F\u0645 ${i}`,l=Array.isArray(n.steps)?n.steps.length:0;return`
                        <div class="border border-gray-200 rounded-lg p-4 mb-4 bg-white hover:shadow-md transition-shadow">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <h4 class="font-semibold text-gray-800 mb-1">${Utils.escapeHTML(n.name||d)}</h4>
                                    <p class="text-sm text-gray-600">
                                        ${i==="__default__"?"":`\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${Utils.escapeHTML(d)} \u2022 `}
                                        \u0639\u062F\u062F \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A: <span class="font-medium">${l}</span>
                                    </p>
                                </div>
                                <div class="ml-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${l>0?"bg-green-100 text-green-800":"bg-gray-100 text-gray-600"}">
                                        ${l>0?"\u0645\u0641\u0639\u0644":"\u063A\u064A\u0631 \u0645\u0641\u0639\u0644"}
                                    </span>
                                </div>
                            </div>
                            ${l>0?`
                                <div class="mt-3 pt-3 border-t border-gray-100">
                                    <div class="flex flex-wrap gap-2">
                                        ${n.steps.map((o,c)=>`
                                            <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                                                ${c+1}. ${Utils.escapeHTML(o.name||o.role||"\u0645\u0633\u062A\u0648\u0649 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                                                ${o.isSafetyOfficer?' <i class="fas fa-shield-alt mr-1 text-orange-500"></i>':""}
                                            </span>
                                        `).join("")}
                                    </div>
                                </div>
                            `:""}
                        </div>
                    `}).join("")||'<p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0643\u0648\u0646\u0629</p>'}
                    </div>
                </div>
            `}catch(a){return Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0639\u0631\u0636 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",a),`
                <div class="text-center py-8">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <i class="fas fa-exclamation-triangle text-yellow-600 text-2xl mb-2"></i>
                        <p class="text-yellow-800 text-sm">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0631 \u0645\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>
                    </div>
                </div>
            `}}};typeof window<"u"&&(window.ApprovalCircuits=ApprovalCircuits);
