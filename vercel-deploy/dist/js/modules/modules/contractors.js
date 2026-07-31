const APPROVED_ENTITY_STATUS_OPTIONS={approved:"\u0645\u0639\u062A\u0645\u062F",under_review:"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",rejected:"\u0645\u0631\u0641\u0648\u0636",pending:"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644"},APPROVED_ENTITY_TYPE_OPTIONS={contractor:"\u0645\u0642\u0627\u0648\u0644",supplier:"\u0645\u0648\u0631\u062F"},CONTRACTOR_EVALUATION_DEFAULT_ITEMS=["\u064A\u0644\u062A\u0632\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649","\u064A\u0644\u062A\u0632\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639","\u062A\u0648\u0641\u0631 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062F\u0631\u0628\u0629 \u0648\u0627\u0644\u0645\u0624\u0647\u0644\u0629","\u062A\u0648\u0641\u0631 \u0645\u0634\u0631\u0641 \u0645\u0624\u0647\u0644 \u0637\u0648\u0627\u0644 \u0641\u062A\u0631\u0629 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (\u0644\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062A\u064A \u062A\u062A\u062C\u0627\u0648\u0632 \u0623\u0633\u0628\u0648\u0639 \u0639\u0645\u0644)","\u062A\u0648\u0641\u0631 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0628\u062D\u0627\u0644\u0629 \u062C\u064A\u062F\u0629","\u062A\u0648\u0641\u0631 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u0642\u0642 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u062A\u0648\u0641\u0631 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 (\u0646\u0648\u0639\u064B\u0627 \u0648\u062D\u062C\u0645\u064B\u0627) \u0637\u0628\u0642\u064B\u0627 \u0644\u0644\u062A\u0639\u0627\u0642\u062F","\u064A\u0644\u062A\u0632\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u0631\u0627\u062C \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627 \u0645\u0646 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0622\u0645\u0646 \u0648\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629","\u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u062E\u0644\u0635 \u0627\u0644\u0622\u0645\u0646 \u0645\u0646 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A","\u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0641\u0648\u0631\u064A \u0639\u0646 \u0623\u064A \u062D\u0627\u062F\u062B \u0648\u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0644\u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631\u0647","\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0637\u0628\u0642\u064B\u0627 \u0644\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F","\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0628\u064A\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0646 \u064A\u0645\u062B\u0644\u0647 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639","\u0633\u0631\u0639\u0629 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0631\u0623\u064A \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u0634\u0631\u0641 \u0639\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629 / \u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u0634\u0631\u0648\u0639"],REQUIREMENT_CATEGORIES={legal:{id:"legal",label:"\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629",icon:"fa-file-contract",color:"#3b82f6"},safety:{id:"safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",icon:"fa-hard-hat",color:"#ef4444"},training:{id:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A",icon:"fa-graduation-cap",color:"#10b981"},equipment:{id:"equipment",label:"\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F",icon:"fa-tools",color:"#f59e0b"},financial:{id:"financial",label:"\u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",icon:"fa-dollar-sign",color:"#8b5cf6"},quality:{id:"quality",label:"\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644",icon:"fa-award",color:"#06b6d4"},other:{id:"other",label:"\u0623\u062E\u0631\u0649",icon:"fa-folder",color:"#6b7280"}},REQUIREMENT_PRIORITIES={critical:{id:"critical",label:"\u062D\u0631\u062C",color:"#ef4444",order:1},high:{id:"high",label:"\u0639\u0627\u0644\u064A",color:"#f59e0b",order:2},medium:{id:"medium",label:"\u0645\u062A\u0648\u0633\u0637",color:"#3b82f6",order:3},low:{id:"low",label:"\u0645\u0646\u062E\u0641\u0636",color:"#6b7280",order:4}},CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT=[{id:"req_1",label:"\u062A\u0642\u062F\u064A\u0645 \u0645\u0644\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0634\u0631\u0643\u0629 (HSE Profile)",type:"document",required:!0,order:1,category:"safety",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u0645\u0644\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u0644\u0634\u0631\u0643\u0629",applicableTypes:["contractor","supplier"]},{id:"req_2",label:"\u062A\u0642\u062F\u064A\u0645 \u0634\u0647\u0627\u062F\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0639\u0644\u0649 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0645\u0648\u0642\u0639",type:"document",required:!0,order:2,category:"training",priority:"high",hasExpiry:!0,expiryMonths:24,description:"\u0634\u0647\u0627\u062F\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0645\u0648\u0642\u0639",applicableTypes:["contractor"]},{id:"req_3",label:"\u062A\u0642\u062F\u064A\u0645 \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0622\u062E\u0631 12 \u0634\u0647\u0631 (Incident Log)",type:"document",required:!0,order:3,category:"safety",priority:"critical",hasExpiry:!1,description:"\u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0644\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u0627\u0636\u064A\u0629",applicableTypes:["contractor","supplier"]},{id:"req_4",label:"\u0648\u062C\u0648\u062F \u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644",type:"document",required:!0,order:4,category:"safety",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0644\u0644\u0645\u0634\u0631\u0648\u0639",applicableTypes:["contractor"]},{id:"req_5",label:"\u062A\u0642\u062F\u064A\u0645 \u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0639\u0645\u0644 \u0623\u0648 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A",type:"document",required:!0,order:5,category:"legal",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A",applicableTypes:["contractor","supplier"]},{id:"req_6",label:"\u062A\u0642\u062F\u064A\u0645 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0644\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 (Risk Assessment)",type:"document",required:!0,order:6,category:"safety",priority:"high",hasExpiry:!0,expiryMonths:6,description:"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0644\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644",applicableTypes:["contractor"]},{id:"req_7",label:"\u062A\u0648\u0641\u064A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062A\u0645\u062F \u0644\u0644\u0645\u0634\u0631\u0648\u0639",type:"text",required:!0,order:7,category:"safety",priority:"high",hasExpiry:!1,description:"\u0627\u0633\u0645 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F",applicableTypes:["contractor"]},{id:"req_8",label:"\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u062A\u0632\u0627\u0645 \u0627\u0644\u062C\u0647\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",type:"checkbox",required:!0,order:8,category:"safety",priority:"high",hasExpiry:!1,description:"\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0648\u0641\u0631 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629",applicableTypes:["contractor"]},{id:"req_9",label:"\u062A\u0648\u0641\u064A\u0631 \u0634\u0647\u0627\u062F\u0627\u062A \u0645\u0639\u0627\u064A\u0631\u0629 \u0644\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0645\u0637\u0644\u0648\u0628\u0629",type:"document",required:!1,order:9,category:"equipment",priority:"medium",hasExpiry:!0,expiryMonths:12,description:"\u0634\u0647\u0627\u062F\u0627\u062A \u0645\u0639\u0627\u064A\u0631\u0629 \u0648\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0639\u062F\u0627\u062A",applicableTypes:["contractor"]}],Contractors={currentTab:"approval-request",_abortController:null,_eventListeners:[],applyModuleI18n(t){const e=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!e)return;const a=t||document.getElementById("contractors-section")||document;e.applyI18n(a),typeof e.applyLiteralTranslations=="function"&&e.applyLiteralTranslations(a)},cleanup(){try{if(this._abortController&&(this._abortController.abort(),this._abortController=null),this._abortController=new AbortController,document.querySelectorAll("[data-listener-attached]").forEach(e=>{e.removeAttribute("data-listener-attached")}),this._broadcastListener&&typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.state?.broadcastChannel)try{RealtimeSyncManager.state.broadcastChannel.removeEventListener("message",this._broadcastListener),this._broadcastListener=null}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 broadcast listener:",e)}this._isLoading=!1,this._isBootstrapping=!1,this._bootstrapScheduled=!1,this._isRefreshingApprovalRequests=!1,this._eventListenersAttached=!1,this._realtimeListenersSetup=!1,this._syncListenerAttached=!1,this._isSwitchingTab=!1,this._refreshApprovalTimeout&&(clearTimeout(this._refreshApprovalTimeout),this._refreshApprovalTimeout=null),this._refreshApprovalRAF&&(cancelAnimationFrame(this._refreshApprovalRAF),this._refreshApprovalRAF=null),this._approvalRefreshRetryTimeout&&(clearTimeout(this._approvalRefreshRetryTimeout),this._approvalRefreshRetryTimeout=null),this._switchTabTimeout&&(clearTimeout(this._switchTabTimeout),this._switchTabTimeout=null),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u062C\u0645\u064A\u0639 event listeners \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A cleanup:",t)}},safeGetElementById(t){try{if(!t)return null;const e=document.getElementById(t);return e&&document.contains(e)?e:null}catch(e){return Utils.safeWarn("\u26A0\uFE0F safeGetElementById error for id="+t+":",e),null}},safeSetInnerHTML(t,e){try{return t?document.contains(t)?(t.innerHTML=e,this.applyModuleI18n(t),!0):(Utils.safeWarn("\u26A0\uFE0F safeSetInnerHTML: element is not in DOM. id="+(t.id||"unknown")),!1):(Utils.safeWarn("\u26A0\uFE0F safeSetInnerHTML: element is null or undefined"),!1)}catch(a){return Utils.safeError("\u274C safeSetInnerHTML error:",a),!1}},safeQuerySelector(t,e){try{return!t||!e?null:document.contains(t)?t.querySelector(e):(Utils.safeWarn("\u26A0\uFE0F safeQuerySelector: container is not in DOM"),null)}catch(a){return Utils.safeWarn("\u26A0\uFE0F safeQuerySelector error:",a),null}},currentEvaluationFilter:"",approvedFilters:{search:"",status:"",type:"",validity:""},async loadContractorsTabContent(t,e={}){const a=this.isContractorApprovalAdminUser(),o={"approval-request":"contractors-approval-request-content",approved:"contractors-approved-content",evaluations:"contractors-evaluations-content",requirements:"contractors-requirements-content",analytics:"contractors-analytics-content"}[t];if(!o)return;const i=document.getElementById(o);if(!i)return;const s=(n,l)=>(typeof Utils<"u"&&Utils.safeError&&Utils.safeError(`\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 ${n}:`,l),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                            <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 ${n}</p>
                            <button onclick="Contractors.loadContractorsTabContent('${t}', { forceData: true })" class="btn-secondary mt-3">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button>
                        </div>
                    </div>
                </div>
            `);try{if(t==="approval-request"){e.fetchData!==!1&&await this.ensureApprovalRequestsDataLoaded({force:e.forceData===!0||this.isContractorApprovalAdminUser()}).catch(()=>{}),this.safeSetInnerHTML(i,this.renderApprovalRequestSection()),this._attachSendApprovalRequestBtn();return}if(t==="approved"){this.ensureApprovedTabContentLoaded(!0),this.ensureApprovedTabEventListeners(),e.fetchData!==!1&&this.ensureApprovedContractorsDataLoaded({force:e.forceData===!0,reconcile:e.reconcile===!0}).then(()=>{this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()}).catch(()=>{});return}if(t==="evaluations"){const n=await Promise.resolve(this.renderEvaluationsSection()).catch(l=>s("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",l));this.safeSetInnerHTML(i,n),this.ensureEvaluationsEventListeners(),e.fetchData!==!1&&(this.ensureEvaluationsDataLoaded(),this.ensureEvaluationApprovalRequestsDataLoaded({force:e.forceData===!0}).then(()=>{this.currentTab==="evaluations"&&this.refreshEvaluationApprovalRequestsSection()}).catch(()=>{}));return}if(t==="requirements"){const n=await Promise.resolve(this.renderRequirementsManagementSection()).catch(l=>s("\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A",l));this.safeSetInnerHTML(i,n);return}if(t==="analytics"&&a){const n=await Promise.resolve(this.renderAnalyticsSection()).catch(c=>s("\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A",c));this.safeSetInnerHTML(i,n);const l=document.getElementById("ctr-analytics-root");l&&(l.dataset.bound=""),this.bindContractorAnalyticsEvents(),e.fetchData!==!1&&this.loadContractorAnalytics()}}catch(n){this.safeSetInnerHTML(i,s(t,n))}},_attachSendApprovalRequestBtn(){const t=document.getElementById("send-approval-request-btn");t&&!t.hasAttribute("data-listener-attached")&&(t.setAttribute("data-listener-attached","true"),t.addEventListener("click",()=>this.showApprovalRequestForm()))},_scheduleContractorsBackgroundPrefetch(t){const e=[];this.shouldLoadContractorApprovalRequests()&&e.push(this.ensureApprovalRequestsDataLoaded({force:this.isContractorApprovalAdminUser()})),typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&Permissions.hasAccess("contractors")&&e.push(this.ensureApprovedContractorsDataLoaded({force:!1,reconcile:!1})),e.length&&Promise.allSettled(e).then(()=>{this.currentTab===t&&(t==="approval-request"?this.refreshApprovalRequestsSection():t==="approved"?(this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()):t==="evaluations"?this.ensureEvaluationApprovalRequestsDataLoaded({force:!1}).then(()=>this.refreshEvaluationApprovalRequestsSection()).catch(()=>{}):t==="analytics"&&this.loadContractorAnalytics())}).catch(()=>{})},_loadRemainingContractorsTabsInBackground(t){const e=this.isContractorApprovalAdminUser(),a=["approval-request","approved","evaluations","requirements"];e&&a.push("analytics");const r=a.filter(i=>i!==t&&!this._tabsLoaded?.[i]);if(!r.length)return;(async()=>{for(const i of r)if(!this._tabsLoaded?.[i]){try{await this.loadContractorsTabContent(i,{fetchData:!1,background:!0}),this._tabsLoaded[i]=!0}catch{}await new Promise(s=>setTimeout(s,0))}})().catch(()=>{})},async load(t=!1){if(this._isLoading){Utils.safeLog("\u26A0\uFE0F load() \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621");return}this._isLoading=!0;try{try{this._abortController?.abort()}catch{}this._abortController=new AbortController,this._eventListenersAttached=!1;const e=document.getElementById("contractors-section");if(!e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 contractors-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),this._isLoading=!1;return}e.classList.add("contractors-identity");const a=this.currentTab||"approval-request",r=t?a:"approval-request";this.currentTab=r,this.injectAntiShakeStyles(),this.ensureApprovedSetup(),this.ensureEvaluationSetup(),this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this._tabsLoaded={},AppState||(window.AppState=window.AppState||{}),AppState.appData||(AppState.appData={});const o=this.isContractorApprovalAdminUser(),i=`
                <div class="content-card">
                    <div class="card-body">
                        <div class="flex items-center justify-center py-8">
                            <div class="text-center">
                                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                                <p class="text-gray-500 text-sm">\u062C\u0627\u0631\u064A \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0642\u0633\u0645...</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,s=this.currentTab||"approval-request",n=u=>s===u?"contractors-tab-btn active px-6 py-3 font-semibold text-blue-600 border-b-2 border-blue-600":"contractors-tab-btn px-6 py-3 font-semibold text-gray-500 hover:text-blue-600",l=u=>{const d=s===u;return`id="contractors-${u}-content" class="contractors-tab-content${d?" active":""}" style="display: ${d?"block":"none"};"`},c=s==="approval-request"?this.renderApprovalRequestSection():i,p=s==="approved"?this.renderApprovedEntitiesSection():i,f=`
                <section class="contractors-module-hero" aria-labelledby="contractors-module-title">
                    <div class="contractors-module-hero__copy">
                        <span class="contractors-module-hero__icon"><i class="fas fa-building-shield"></i></span>
                        <div>
                            <span class="contractors-module-hero__eyebrow">\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u062D\u0648\u0643\u0645\u0629 \u0648\u0627\u0644\u062A\u0623\u0647\u064A\u0644</span>
                            <h1 id="contractors-module-title">\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0645\u0642\u062F\u0645\u064A \u0627\u0644\u062E\u062F\u0645\u0627\u062A</h1>
                            <p>\u062F\u0648\u0631\u0629 \u0645\u0648\u062D\u062F\u0629 \u0644\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0648\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0648\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0627\u0621</p>
                        </div>
                    </div>
                    <div class="contractors-module-hero__meta" aria-label="\u0645\u0632\u0627\u064A\u0627 \u0627\u0644\u0645\u062F\u064A\u0648\u0644">
                        <span><i class="fas fa-route"></i>\u0645\u0633\u0627\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0646\u0636\u0628\u0637</span>
                        <span><i class="fas fa-shield-check"></i>\u062A\u0623\u0647\u064A\u0644 \u0642\u0627\u0626\u0645 \u0639\u0644\u0649 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A</span>
                        <span><i class="fas fa-chart-line"></i>\u062A\u062D\u0644\u064A\u0644 \u0623\u062F\u0627\u0621 \u0645\u0628\u0627\u0634\u0631</span>
                    </div>
                </section>
            
            <div class="mt-6 mb-4">
                <div class="contractors-tabs-wrapper">
                    <div class="contractors-tabs-container">
                        <button id="contractors-tab-approval-request" class="${n("approval-request")}" onclick="Contractors.switchTab('approval-request')">
                            <i class="fas fa-paper-plane ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u062E\u062F\u0645\u0629
                        </button>
                        <button id="contractors-tab-approved" class="${n("approved")}" onclick="Contractors.switchTab('approved')">
                            <i class="fas fa-check-circle ml-2"></i>
                            \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646
                        </button>
                        <button id="contractors-tab-evaluations" class="${n("evaluations")}" onclick="Contractors.switchTab('evaluations')">
                            <i class="fas fa-clipboard-check ml-2"></i>
                            \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </button>
                        ${o?`
                        <button id="contractors-tab-analytics" class="${n("analytics")}" onclick="Contractors.switchTab('analytics')">
                            <i class="fas fa-chart-line ml-2"></i>
                            \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </button>
                        `:""}
                        <button id="contractors-tab-requirements" class="${n("requirements")}" onclick="Contractors.switchTab('requirements')">
                            <i class="fas fa-cog ml-2"></i>
                            \u0625\u062F\u0627\u0631\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                        </button>
                        <button id="contractors-btn-refresh" type="button" class="contractors-tab-btn px-6 py-3 font-semibold text-gray-500 hover:text-blue-600" onclick="Contractors.refreshModule()" title="\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A">
                            <i class="fas fa-sync-alt ml-2"></i>
                            \u062A\u062D\u062F\u064A\u062B
                        </button>
                    </div>
                </div>
            </div>
            
            <div id="contractors-tab-content">
                <div ${l("approval-request")}>
                    ${c}
                </div>
                <div ${l("approved")}>
                    ${p}
                </div>
                <div ${l("evaluations")}>
                    ${i}
                </div>
                ${o?`
                <div ${l("analytics")}>
                    ${i}
                </div>
                `:""}
                <div ${l("requirements")}>
                    ${i}
                </div>
            </div>
        `;if(this.safeSetInnerHTML(e,f),this.applyModuleI18n(e),this.setupEventListeners(),this.setupRealtimeListeners(),this._attachSendApprovalRequestBtn(),this._isLoading=!1,await this.loadContractorsTabContent(s,{fetchData:!0,forceData:s==="approval-request"||this.isContractorApprovalAdminUser(),reconcile:s==="approved"}),this._tabsLoaded[s]=!0,this._scheduleContractorsBackgroundPrefetch(s),this._loadRemainingContractorsTabsInBackground(s),s==="evaluations")try{this.ensureEvaluationsEventListeners()}catch{}}catch(e){this._isLoading=!1;const a=document.getElementById("contractors-section");if(typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u0627\u062F\u062D \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",e),a){const r=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</h3>
                                <p class="text-gray-500 mb-4">${e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="Contractors.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `;this.safeSetInnerHTML(a,r),this.applyModuleI18n(a)}}},refreshModule(){const t=document.getElementById("contractors-btn-refresh");if(t){t.disabled=!0;const a=t.querySelector("i.fa-sync-alt");a&&a.classList.add("fa-spin")}const e=()=>{const a=document.getElementById("contractors-btn-refresh");if(a){a.disabled=!1;const r=a.querySelector("i.fa-sync-alt");r&&r.classList.remove("fa-spin")}};this.ensureApprovalRequestsDataLoaded({force:!0}).catch(()=>{}).finally(()=>{this.load(!0).finally(e)})},normalizeApprovalRequestStatus(t){const e=String(t||"").trim();if(!e)return"pending";const a=e.toLowerCase().replace(/\s+/g,"_").replace(/-/g,"_"),r={\u062A\u0645_\u0627\u0644\u0625\u0631\u0633\u0627\u0644:"pending",\u0642\u064A\u062F_\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:"under_review",\u062A\u062D\u062A_\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:"under_review",\u0641\u064A_\u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631:"pending",\u0628\u0627\u0646\u062A\u0638\u0627\u0631_\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:"pending",\u0628\u0627\u0646\u062A\u0638\u0627\u0631_\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:"pending",\u0642\u064A\u062F_\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:"pending",\u062C\u062F\u064A\u062F:"pending",new:"pending",awaiting:"pending",awaiting_approval:"pending",open:"pending",\u0645\u0639\u062A\u0645\u062F:"approved",approved:"approved",\u0645\u0631\u0641\u0648\u0636:"rejected",rejected:"rejected",submitted:"pending",in_progress:"under_review",under_review:"under_review",pending:"pending"};return r[a]?r[a]:a==="approved"||a==="rejected"?a:"pending"},extractApprovalRequestRowsFromResponse(t){return!t||t.success===!1?null:Array.isArray(t.data)?t.data:Array.isArray(t)?t:t.data&&Array.isArray(t.data.data)?t.data.data:null},shouldLoadContractorApprovalRequests(){return this.isContractorApprovalAdminUser()?!0:typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess("contractors"):!1},_approvalRequestApiPayload(){const t=AppState?.googleConfig?.sheets?.spreadsheetId,e={forceRefresh:!0,skipCache:!0};return t&&String(t).trim()&&t!=="YOUR_SPREADSHEET_ID_HERE"&&(e.spreadsheetId=String(t).trim()),e},_clearApprovalRequestReadCaches(){if(typeof GoogleIntegration>"u")return;[["getAllContractorApprovalRequests",{forceRefresh:!0,skipCache:!0}],["getAllContractorDeletionRequests",{forceRefresh:!0,skipCache:!0}],["readFromSheet",{sheetName:"ContractorApprovalRequests",skipCache:!0}],["readFromSheet",{sheetName:"ContractorDeletionRequests",skipCache:!0}]].forEach(([e,a])=>{try{typeof GoogleIntegration._invalidateSmartCacheForRead_=="function"&&GoogleIntegration._invalidateSmartCacheForRead_(e,a),typeof GoogleIntegration._buildLocalDataStorageKey=="function"&&localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey(e,a));const r=`${e}_${JSON.stringify(a)}`;GoogleIntegration._cache?.data?.delete(r),GoogleIntegration._cache?.timestamps?.delete(r)}catch{}})},async _fetchApprovalRequestRowsFromBackend(){if(typeof GoogleIntegration>"u")return null;const t=this._approvalRequestApiPayload();try{const a=await GoogleIntegration.sendRequest({action:"getAllContractorApprovalRequests",data:t}),r=this.extractApprovalRequestRowsFromResponse(a);if(Array.isArray(r)&&r.length>0)return r}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F getAllContractorApprovalRequests \u0641\u0634\u0644:",a?.message||a)}if(typeof GoogleIntegration.readFromSheets=="function")try{const a=await GoogleIntegration.readFromSheets("ContractorApprovalRequests",45e3);if(Array.isArray(a)&&a.length>0)return a}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F readFromSheets(ContractorApprovalRequests) \u0641\u0634\u0644:",a?.message||a)}const e=AppState?.appData?.contractorApprovalRequests;return Array.isArray(e)&&e.length>0?e.slice():null},async _fetchDeletionRequestRowsFromBackend(){if(typeof GoogleIntegration>"u")return null;const t=this._approvalRequestApiPayload();try{const a=await GoogleIntegration.sendRequest({action:"getAllContractorDeletionRequests",data:t}),r=this.extractApprovalRequestRowsFromResponse(a);if(Array.isArray(r)&&r.length>0)return r}catch{}if(typeof GoogleIntegration.readFromSheets=="function")try{const a=await GoogleIntegration.readFromSheets("ContractorDeletionRequests",45e3);if(Array.isArray(a)&&a.length>0)return a}catch{}const e=AppState?.appData?.contractorDeletionRequests;return Array.isArray(e)&&e.length>0?e.slice():null},ingestApprovalRequestsFromSync(t,e={}){if(!Array.isArray(t)||t.length===0)return!1;this.ensureApprovalRequestsSetup();const a=Array.isArray(AppState.appData.contractorApprovalRequests)?AppState.appData.contractorApprovalRequests.slice():[],r=t.map(o=>this.normalizeApprovalRequestRecord(o));return AppState.appData.contractorApprovalRequests=this.mergeApprovalRequestsWithLocalOnly(r,a),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),e.refreshUi!==!1&&(this.currentTab==="approval-request"&&this.mountApprovalRequestSection(),typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge()),!0},prefetchApprovalRequestsForNotifications(){const t=[];return typeof this.syncPendingEvaluationApprovalRequests=="function"&&t.push(this.syncPendingEvaluationApprovalRequests()),typeof this.fetchEvaluationApprovalRequestsFromBackend=="function"&&t.push(this.fetchEvaluationApprovalRequestsFromBackend()),this.shouldLoadContractorApprovalRequests()&&t.push(this.ensureApprovalRequestsDataLoaded({force:!0}).catch(()=>!1)),t.length?Promise.allSettled(t).then(()=>(typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge(),!0)):Promise.resolve(!1)},normalizeCompanyNameForApprovalMatch(t){return String(t||"").replace(/\s+/g," ").trim().toLowerCase()},validateNewApprovalRequest(t){if(!t)return{ok:!1,message:"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629"};const e=String(t.companyName||"").trim(),a=String(t.licenseNumber||"").trim(),r=String(t.requestType||"").trim();if(!e||!t.serviceType||!r)return{ok:!1,message:"\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"};if(!a)return{ok:!1,message:"\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635 \u0645\u0637\u0644\u0648\u0628"};const o=this.normalizeCompanyNameForApprovalMatch(e),i=r==="supplier"?"supplier":"contractor",n=(AppState.appData.approvedContractors||[]).find(u=>{if(!u)return!1;const d=String(u.licenseNumber||"").trim(),m=this.normalizeCompanyNameForApprovalMatch(u.companyName);if(a&&d&&d===a)return!0;if(o&&m===o){const v=this.normalizeApprovedEntityType(u.entityType||u.type);return!i||v===i}return!1});if(n)return{ok:!1,message:`\u0627\u0644\u062C\u0647\u0629 \u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 (${n.companyName||e}).`};const c=(AppState.appData.contractors||[]).find(u=>{if(!u)return!1;const d=this.normalizeCompanyNameForApprovalMatch(u.name||u.companyName||u.company),m=String(u.licenseNumber||u.contractNumber||"").trim();return a&&m&&m===a?!0:o&&d&&d===o});if(c)return{ok:!1,message:`\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 (${c.name||c.companyName||e}).`};const f=(AppState.appData.contractorApprovalRequests||[]).map(u=>this.normalizeApprovalRequestRecord(u)).filter(u=>u&&this.isApprovalRequestPendingForReview(u)).find(u=>{const d=String(u.requestType||"contractor").trim();if(d!=="contractor"&&d!=="supplier"||r&&d!==r)return!1;const m=this.normalizeCompanyNameForApprovalMatch(u.companyName),v=String(u.licenseNumber||"").trim();return o&&m&&m===o?!0:!!(a&&v&&v===a)});return f?{ok:!1,message:`\u064A\u0648\u062C\u062F \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 (${f.id||""}).`}:{ok:!0}},_closeApprovalRequestModal(t){try{t&&t.parentNode&&t.remove()}catch(e){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",e),t&&t.parentNode&&t.parentNode.removeChild(t)}},_scheduleApprovalNotificationsRefresh(){typeof AppUI<"u"&&typeof AppUI.scheduleContractorApprovalNotificationsRefresh=="function"?AppUI.scheduleContractorApprovalNotificationsRefresh():typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge()},_removeLocalApprovalRequestById(t){!t||!Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=AppState.appData.contractorApprovalRequests.filter(e=>e&&e.id!==t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},async diagnoseApprovalRequests(){const t=AppState?.googleConfig?.sheets?.spreadsheetId||"";let e=null,a=null;if(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function")try{const n=await GoogleIntegration.readFromSheets("ContractorApprovalRequests",45e3);e=Array.isArray(n)?n.length:null}catch(n){e="error: "+(n?.message||n)}try{const n=this._approvalRequestApiPayload(),l=await GoogleIntegration.sendRequest({action:"getAllContractorApprovalRequests",data:n}),c=this.extractApprovalRequestRowsFromResponse(l);a=Array.isArray(c)?c.length:null}catch(n){a="error: "+(n?.message||n)}const r=await this.fetchContractorApprovalRequestsFromBackend(),o=AppState.appData.contractorApprovalRequests||[],i=this.getPendingApprovalRequests();return{loaded:r,spreadsheetId:t,readFromSheetCount:e,apiCount:a,total:o.length,pendingForAdmin:i.length,isAdmin:this.isContractorApprovalAdminUser(),currentUserId:AppState.currentUser?.id||"",sampleIds:o.slice(0,5).map(n=>n&&n.id).filter(Boolean),pendingIds:i.slice(0,10).map(n=>n&&n.id).filter(Boolean)}},normalizeApprovalRequestRecord(t){if(!t||typeof t!="object")return t;const e={...t};if(!e.status||!String(e.status).trim())if(e.Status)e.status=String(e.Status).trim();else{const a=Object.keys(e).find(r=>{const o=String(r||"").trim().toLowerCase();return o==="status"||o==="\u0627\u0644\u062D\u0627\u0644\u0629"||o==="state"});a&&e[a]!=null&&String(e[a]).trim()&&(e.status=String(e[a]).trim())}return(!e.createdBy||!String(e.createdBy).trim())&&e.CreatedBy&&(e.createdBy=String(e.CreatedBy).trim()),(!e.createdAt||!String(e.createdAt).trim())&&e.CreatedAt&&(e.createdAt=e.CreatedAt),(!e.id||!String(e.id).trim())&&e.ID&&(e.id=String(e.ID).trim()),(!e.companyName||!String(e.companyName).trim())&&e.CompanyName&&(e.companyName=String(e.CompanyName).trim()),e.status=this.normalizeApprovalRequestStatus(e.status),e},mergeApprovalRequestsWithLocalOnly(t,e){const a=Array.isArray(t)?t:[],r=Array.isArray(e)?e:[],o=new Set(a.map(s=>s&&s.id).filter(Boolean)),i=r.filter(s=>{if(!s)return!1;const n=String(s.id||"");return n.startsWith("TEMP_")||s._isPendingSync?!o.has(n):!1});return[...a,...i]},async fetchContractorApprovalRequestsFromBackend(){try{this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup();const t=Array.isArray(AppState.appData.contractorApprovalRequests)?AppState.appData.contractorApprovalRequests.slice():[],e=Array.isArray(AppState.appData.contractorDeletionRequests)?AppState.appData.contractorDeletionRequests.slice():[],[a,r]=await Promise.all([this._fetchApprovalRequestRowsFromBackend(),this._fetchDeletionRequestRowsFromBackend()]);let o=!1;if(Array.isArray(a)&&a.length>0){const i=a.map(s=>this.normalizeApprovalRequestRecord(s));AppState.appData.contractorApprovalRequests=this.mergeApprovalRequestsWithLocalOnly(i,t),o=!0}else t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0627\u0644\u062E\u0627\u062F\u0645 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0637\u0644\u0628 \u0645\u062D\u0644\u064A");if(Array.isArray(r)&&r.length>0){const i=r.map(s=>this.normalizeApprovalRequestRecord(s));AppState.appData.contractorDeletionRequests=this.mergeApprovalRequestsWithLocalOnly(i,e),o=!0}return o&&typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.currentTab==="approval-request"&&this.mountApprovalRequestSection(),typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge(),o}catch(t){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t),!1}},extractApprovedContractorRowsFromResponse(t){return!t||t.success===!1?null:Array.isArray(t.data)?t.data:Array.isArray(t)?t:t.data&&Array.isArray(t.data.data)?t.data.data:null},mergeApprovedContractorsWithLocalOnly(t,e){const a=Array.isArray(t)?t:[],r=Array.isArray(e)?e:[],o=new Set(a.map(n=>n&&n.id).filter(Boolean)),i=new Set(a.map(n=>{const l=n&&(n.code||n.isoCode);return l?String(l).trim():""}).filter(Boolean)),s=r.filter(n=>{if(!n)return!1;const l=String(n.id||"").trim();if(l.startsWith("TEMP_")||n._isPendingSync)return!o.has(l);if(l&&!o.has(l)){const c=String(n.code||n.isoCode||"").trim();return!(c&&i.has(c))}return!1});return[...a,...s]},async _fetchApprovedContractorsFromBackend(){if(typeof GoogleIntegration>"u")return null;if(typeof GoogleIntegration.readFromSheets=="function")try{const a=await GoogleIntegration.readFromSheets("ApprovedContractors",45e3);if(Array.isArray(a)&&a.length>0)return a}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F readFromSheets(ApprovedContractors) \u0641\u0634\u0644:",a?.message||a)}const t=this._approvalRequestApiPayload();try{const a=await GoogleIntegration.sendRequest({action:"getAllApprovedContractors",data:t}),r=this.extractApprovedContractorRowsFromResponse(a);if(Array.isArray(r)&&r.length>0)return r}catch(a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F getAllApprovedContractors \u0641\u0634\u0644:",a?.message||a)}const e=AppState?.appData?.approvedContractors;return Array.isArray(e)&&e.length>0?e.slice():null},ingestApprovedContractorsFromSync(t,e={}){if(!Array.isArray(t)||t.length===0)return!1;this.ensureApprovedSetup();const a=Array.isArray(AppState.appData.approvedContractors)?AppState.appData.approvedContractors.slice():[];return AppState.appData.approvedContractors=this.mergeApprovedContractorsWithLocalOnly(t,a),this.ensureApprovedSetup(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),e.refreshUi!==!1&&this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),!0},async fetchApprovedContractorsFromBackend(){try{this.ensureApprovedSetup();const t=Array.isArray(AppState.appData.approvedContractors)?AppState.appData.approvedContractors.slice():[],e=await this._fetchApprovedContractorsFromBackend();return Array.isArray(e)&&e.length>0?(AppState.appData.approvedContractors=this.mergeApprovedContractorsWithLocalOnly(e,t),this.ensureApprovedSetup(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),!0):(t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0633\u062C\u0644 \u0645\u062D\u0644\u064A"),!1)}catch(t){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t),!1}},ensureApprovedContractorsDataLoaded(t={}){const e=t.force===!0,a=3e4,r=Date.now();if(!e&&this._approvedContractorsLastLoadAt&&r-this._approvedContractorsLastLoadAt<a)return Promise.resolve();if(this._approvedContractorsSyncInFlight)return this._approvedContractorsSyncInFlight;if(!(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()))return Promise.resolve();if(e&&typeof GoogleIntegration._buildLocalDataStorageKey=="function")try{localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey("getAllApprovedContractors",{})),localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey("readFromSheet",{sheetName:"ApprovedContractors"}))}catch{}const i=async()=>(this.isContractorApprovalAdminUser()&&t.reconcile===!0&&await this.reconcileMissingApprovedContractors(t),this.fetchApprovedContractorsFromBackend());return this._approvedContractorsSyncInFlight=i().then(s=>(s&&(this._approvedContractorsLastLoadAt=Date.now()),s)).catch(()=>!1).finally(()=>{this._approvedContractorsSyncInFlight=null}),this._approvedContractorsSyncInFlight},async reconcileMissingApprovedContractors(t={}){if(!this.isContractorApprovalAdminUser()||typeof GoogleIntegration>"u")return!1;try{const e={...this._approvalRequestApiPayload()};t.requestId&&(e.requestId=t.requestId);const a=await GoogleIntegration.sendRequest({action:"reconcileMissingApprovedContractors",data:e});return a&&a.success&&a.createdCount>0&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 reconcileMissingApprovedContractors: \u0623\u064F\u0646\u0634\u0626 "+a.createdCount+" \u0633\u062C\u0644 \u0645\u0639\u062A\u0645\u062F"),a&&a.errors&&a.errors.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F reconcileMissingApprovedContractors \u0623\u062E\u0637\u0627\u0621:",a.errors),!!(a&&a.success)}catch(e){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F reconcileMissingApprovedContractors \u0641\u0634\u0644:",e?.message||e),!1}},isCurrentUserApprovalRequestOwner(t){if(!t)return!1;const e=AppState.currentUser||{},a=String(e.id||"").trim(),r=String(e.email||"").trim().toLowerCase(),o=String(t.createdBy||"").trim();if(!o)return!1;const i=o.toLowerCase();return a&&o===a||r&&i===r||a&&i===a.toLowerCase()},isContractorApprovalAdminUser(){if(typeof Permissions<"u"&&(typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()||typeof Permissions.isCurrentUserAdmin=="function"&&Permissions.isCurrentUserAdmin()||typeof Permissions.isAdmin=="function"&&Permissions.isAdmin()||typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(AppState.currentUser?.role)))return!0;const t=String(AppState.currentUser?.role||"").trim().toLowerCase();return t==="admin"||t==="administrator"||t==="\u0645\u062F\u064A\u0631"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"},isApprovalRequestPendingForReview(t){if(!t)return!1;const e=this.normalizeApprovalRequestStatus(t.status);return e!=="approved"&&e!=="rejected"},ensureApprovalRequestsDataLoaded(t={}){const e=t.force===!0,a=3e4,r=Date.now();return!e&&this._approvalRequestsLastLoadAt&&r-this._approvalRequestsLastLoadAt<a?Promise.resolve():this._approvalRequestsSyncInFlight?this._approvalRequestsSyncInFlight:typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?(e&&typeof GoogleIntegration._buildLocalDataStorageKey=="function"&&this._clearApprovalRequestReadCaches(),this._approvalRequestsSyncInFlight=this.fetchContractorApprovalRequestsFromBackend().then(i=>(i&&(this._approvalRequestsLastLoadAt=Date.now()),i)).catch(i=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",i),!1)).finally(()=>{this._approvalRequestsSyncInFlight=null}),this._approvalRequestsSyncInFlight):e?this._waitForBackendThenLoadApprovalRequests(t):Promise.resolve()},async _waitForBackendThenLoadApprovalRequests(t,e=0){return e>=24?!1:typeof GoogleIntegration<"u"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?this._approvalRequestsSyncInFlight?this._approvalRequestsSyncInFlight:(this._approvalRequestsSyncInFlight=this.fetchContractorApprovalRequestsFromBackend().finally(()=>{this._approvalRequestsSyncInFlight=null}),this._approvalRequestsSyncInFlight):(await new Promise(o=>setTimeout(o,250)),this._waitForBackendThenLoadApprovalRequests(t,e+1))},async bootstrapApprovalRequestsData(){return this.ensureApprovalRequestsDataLoaded({force:!0})},switchTab(t){if(!t||this.currentTab===t)return;this.currentTab=t,document.querySelectorAll(".contractors-tab-btn").forEach(i=>{i.classList.remove("active","text-blue-600","border-b-2","border-blue-600"),i.classList.add("text-gray-500")});const a=document.getElementById(`contractors-tab-${t}`);a&&(a.classList.add("active","text-blue-600","border-b-2","border-blue-600"),a.classList.remove("text-gray-500")),document.querySelectorAll(".contractors-tab-content").forEach(i=>{i.classList.remove("active"),i.style.display="none"});const o=document.getElementById(`contractors-${t}-content`);o&&(o.classList.add("active"),o.style.display="block"),t==="approved"&&(this._tabsLoaded?.approved?this.ensureApprovedContractorsDataLoaded({force:!0,reconcile:!0}).then(()=>{this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()}).catch(()=>{this.ensureApprovedTabContentLoaded(!0)}):(this.loadContractorsTabContent("approved",{fetchData:!0,forceData:!0,reconcile:!0}),this._tabsLoaded.approved=!0)),t==="approval-request"&&(this._tabsLoaded?.["approval-request"]?this.ensureApprovalRequestsDataLoaded({force:!0}).then(()=>this.refreshApprovalRequestsSection()).catch(()=>{}):(this.loadContractorsTabContent("approval-request",{fetchData:!0,forceData:!0}),this._tabsLoaded["approval-request"]=!0)),t==="evaluations"&&(this._tabsLoaded?.evaluations?(this.ensureEvaluationsEventListeners(),this.ensureEvaluationsDataLoaded(),this.ensureEvaluationApprovalRequestsDataLoaded({force:!1}).then(()=>{this.currentTab==="evaluations"&&this.refreshEvaluationApprovalRequestsSection()}).catch(()=>{})):(this.loadContractorsTabContent("evaluations",{fetchData:!0,forceData:!0}),this._tabsLoaded.evaluations=!0)),t==="requirements"&&!this._tabsLoaded?.requirements&&(this.loadContractorsTabContent("requirements",{fetchData:!1}),this._tabsLoaded.requirements=!0),t==="analytics"&&(this.bindContractorAnalyticsEvents(),this._tabsLoaded?.analytics?this.loadContractorAnalytics():(this.loadContractorsTabContent("analytics",{fetchData:!0,forceData:!0}),this._tabsLoaded.analytics=!0))},ensureEvaluationsDataLoaded(){const t=AppState.appData.contractorEvaluations;Array.isArray(t)&&t.length>0||!(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncData=="function"&&AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl)||GoogleIntegration.syncData({sheets:["ContractorEvaluations"],silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0}).then(()=>{const r=AppState.appData.contractorEvaluations||[];Array.isArray(r)&&r.length>0&&this.refreshEvaluationsList(this.currentEvaluationFilter||"")}).catch(()=>{})},loadApprovalRequestTab(t,e=!1){try{if(!t||e&&t.innerHTML.trim()!=="")return;this.ensureData();const a=this.renderApprovalRequestSection();this.safeSetInnerHTML(t,a);const r=document.getElementById("send-approval-request-btn");r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),r.addEventListener("click",()=>this.showApprovalRequestForm()))}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",a),t&&document.contains(t)&&this.safeSetInnerHTML(t,`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                                <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Contractors.switchTab('approval-request')" class="btn-secondary mt-3">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button>
                            </div>
                        </div>
                    </div>
                `)}},getContractorsStats(){const t=AppState.appData.contractors||[],e={};t.forEach(s=>{const n=s.serviceType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";e[n]=(e[n]||0)+1});let a=0,r=0,o=0;t.forEach(s=>{const n=this.getContractorRequirementsStatus(s.id);n.allMet?a++:n.completed>0?r++:o++});const i={\u0646\u0634\u0637:0,\u0645\u0646\u062A\u0647\u064A:0,\u0645\u0639\u0644\u0642:0,\u0623\u062E\u0631\u0649:0};return t.forEach(s=>{const n=s.status||"\u0623\u062E\u0631\u0649";i.hasOwnProperty(n)?i[n]++:i.\u0623\u062E\u0631\u0649++}),{total:t.length,serviceTypes:e,requirements:{met:a,partial:r,notMet:o},status:i}},renderContractorsStats(){const t=this.getContractorsStats(),e=Object.entries(t.serviceTypes).sort((a,r)=>r[1]-a[1]).slice(0,3);return`
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-2xl font-bold text-blue-600">${t.total}</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-users-cog text-blue-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0623\u0643\u062B\u0631 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u062E\u062F\u0645\u0627\u062A</p>
                            <p class="text-lg font-semibold text-green-600">
                                ${e.length>0?e[0][0]:"\u0644\u0627 \u064A\u0648\u062C\u062F"}
                            </p>
                            <p class="text-xs text-gray-500">${e.length>0?e[0][1]:0} \u0645\u0642\u0627\u0648\u0644</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-tools text-green-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A</p>
                            <p class="text-lg font-semibold text-purple-600">
                                ${t.requirements.met} \u0645\u0633\u062A\u0648\u0641\u064A
                            </p>
                            <p class="text-xs text-gray-500">
                                ${t.requirements.partial} \u062C\u0632\u0626\u064A / ${t.requirements.notMet} \u063A\u064A\u0631 \u0645\u0633\u062A\u0648\u0641\u064A
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-clipboard-check text-purple-600 text-xl"></i>
                        </div>
                    </div>
                </div>
                
                <div class="content-card">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u062D\u0627\u0644\u0629</p>
                            <p class="text-lg font-semibold text-orange-600">
                                ${t.status.\u0646\u0634\u0637} \u0646\u0634\u0637
                            </p>
                            <p class="text-xs text-gray-500">
                                ${t.status.\u0645\u0646\u062A\u0647\u064A} \u0645\u0646\u062A\u0647\u064A / ${t.status.\u0645\u0639\u0644\u0642} \u0645\u0639\u0644\u0642
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-chart-line text-orange-600 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `},generateContractorCode(){const t=AppState.appData.contractors||[];let e=0;t.forEach(r=>{if(r.code){const o=r.code.match(/CON-(\d+)/);if(o){const i=parseInt(o[1],10);i>e&&(e=i)}}});const a=e+1;return`CON-${String(a).padStart(3,"0")}`},extractContractorCodeNumber(t){if(!t)return 0;const e=String(t).match(/CON-(\d+)/);return e?parseInt(e[1],10):0},sortByContractorCode(t,e){const a=t.code||t.contractorCode||"",r=e.code||e.contractorCode||"",o=Contractors.extractContractorCodeNumber(a),i=Contractors.extractContractorCodeNumber(r);if(o>0&&i>0)return o-i;if(o>0)return-1;if(i>0)return 1;const s=t.companyName||t.name||"",n=e.companyName||e.name||"";return s.localeCompare(n,"ar",{sensitivity:"base"})},normalizeApprovedStatus(t){const e=(t||"").toString().trim().toLowerCase();return e?["approved","\u0645\u0639\u062A\u0645\u062F","accept","accepted","active","valid","pass"].includes(e)?"approved":["rejected","\u0645\u0631\u0641\u0648\u0636","\u0631\u0641\u0636","cancelled","canceled","denied","invalid","expired"].includes(e)?"rejected":"under_review":"under_review"},normalizeApprovedEntityType(t){const e=(t||"").toString().trim().toLowerCase();return["supplier","\u0645\u0648\u0631\u062F","\u0645\u0648\u0631\u0651\u062F","vendor"].includes(e)?"supplier":"contractor"},getApprovedStatusLabel(t){return APPROVED_ENTITY_STATUS_OPTIONS[t]||"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"},getApprovedTypeLabel(t){return APPROVED_ENTITY_TYPE_OPTIONS[t]||APPROVED_ENTITY_TYPE_OPTIONS.contractor},normalizeApprovedSearchText(t){let e=String(t||"").trim().toLowerCase();return e=e.replace(/[٠١٢٣٤٥٦٧٨٩]/g,a=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(a))),e=e.replace(/[۰۱۲۳۴۵۶۷۸۹]/g,a=>String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(a))),e.replace(/\s+/g," ").trim()},extractSearchDigitsOnly(t){return String(t||"").replace(/[٠١٢٣٤٥٦٧٨٩]/g,e=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e))).replace(/[۰۱۲۳۴۵۶۷۸۹]/g,e=>String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(e))).replace(/\D/g,"")},buildApprovedEntitySearchBlob(t){if(!t)return"";let e=t.code||t.isoCode||t.contractorCode||t["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||t.\u0643\u0648\u062F||t.codeNumber||"";if(!e&&t.contractorId){const i=(AppState.appData.contractors||[]).find(s=>s.id===t.contractorId);i&&(e=i.code||i.isoCode||i.contractorCode||"")}const a=this.normalizeApprovedStatus(t.status),r=this.normalizeApprovedEntityType(t.entityType||t.type),o=[t.companyName,t.name,t.serviceType,t.licenseNumber,t.safetyReviewer,t.notes,t.contractNumber,e,t.isoCode,t.code,t.phone,t.mobile,t.email,t.contactPerson,t.contactName,this.getApprovedStatusLabel(a),this.getApprovedTypeLabel(r),a,r,t.approvalDate?Utils.formatDate(t.approvalDate):"",t.expiryDate?Utils.formatDate(t.expiryDate):"",t.id,t.contractorId];return this.normalizeApprovedSearchText(o.filter(i=>i!=null&&String(i).trim()!=="").join(" "))},matchesApprovedEntitySearch(t,e){const a=this.normalizeApprovedSearchText(e);if(!a)return!0;const r=this.buildApprovedEntitySearchBlob(t),o=a.split(" ").filter(Boolean);if(o.length>0&&o.every(s=>r.includes(s)))return!0;const i=this.extractSearchDigitsOnly(a);if(i.length>=1){const s=[t.licenseNumber,t.contractNumber,t.code,t.isoCode,t.contractorCode,t.phone,t.mobile,t.companyName,t.id,t.contractorId];if(t.contractorId){const l=(AppState.appData.contractors||[]).find(c=>c.id===t.contractorId);l&&s.push(l.code,l.licenseNumber,l.contractNumber,l.phone)}if(s.map(l=>this.extractSearchDigitsOnly(l)).filter(Boolean).join("").includes(i))return!0}return!1},getApprovedStatusBadgeClass(t){return t==="approved"?"badge-success":t==="under_review"?"badge-warning":"badge-danger"},isApprovalExpired(t){if(!t?.expiryDate)return!1;const e=new Date(t.expiryDate);if(Number.isNaN(e.getTime()))return!1;const a=new Date;return e.setHours(0,0,0,0),a.setHours(0,0,0,0),e<a},isApprovalActive(t,e=!1){if(!t||!this.isEntityEnabled(t))return!1;const a=(t.status||"").toString().toLowerCase().trim(),r=["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""];return t.status&&!r.includes(a)?!1:e?!0:!this.isApprovalExpired(t)},isEntityEnabled(t){if(!t||typeof t!="object")return!0;const e=t.isActive;return!(e==="inactive"||e===!1||e==="false"||e==="FALSE"||e===0||e==="0")},debugContractorVisibility(t){const a=(AppState.appData.approvedContractors||[]).find(d=>d.code&&d.code===t||d.isoCode&&d.isoCode===t||d.companyName&&d.companyName.includes(t));if(!a)return{found:!1,message:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646"};const r=(a.status||"").toString().toLowerCase().trim(),i=["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""].includes(r),s=this.isApprovalExpired(a),n=this.isApprovalActive(a,!1);let l=!0;a.contractorId&&(l=this.checkAllRequirementsMet(a.contractorId));const p=this.getAllContractorsForModules().some(d=>d.id===a.id||d.id===a.contractorId||d.name&&a.companyName&&d.name===a.companyName),u=this.getContractorOptionsForModules().some(d=>d.id===a.id||d.id===a.contractorId||d.name&&a.companyName&&d.name===a.companyName);return{found:!0,approved:a,checks:{isApproved:i,isExpired:s,isActive:n,requirementsMet:l,appearsInList:p,appearsInForms:u},shouldAppear:n,message:n?"\u064A\u062C\u0628 \u0623\u0646 \u064A\u0638\u0647\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0644\u0627 \u064A\u0633\u062A\u0648\u0641\u064A \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0638\u0647\u0648\u0631"}},debugAllContractorsVisibility(){const t=AppState.appData.approvedContractors||[],e=this.getContractorOptionsForModules(),a=this.getAllContractorsForModules(),r={total:t.length,visible:0,hidden:0,reasons:{statusNotApproved:[],expired:[],noName:[],notInForms:[]}};return t.forEach((o,i)=>{const s=o.companyName||o.name||"(\u0628\u062F\u0648\u0646 \u0627\u0633\u0645)",n=o.code||o.isoCode||"(\u0628\u062F\u0648\u0646 \u0643\u0648\u062F)",l=(o.status||"").toString(),c=this.isApprovalActive(o,!0),p=this.isApprovalExpired(o);if(e.some(u=>u.id===o.id||u.id===o.contractorId||u.name&&o.companyName&&u.name===o.companyName))r.visible++;else{r.hidden++;let u="";if(!c){const d=l.toLowerCase().trim();["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""].includes(d)||(u=`\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0645\u0639\u062A\u0645\u062F\u0629: "${l}"`,r.reasons.statusNotApproved.push({name:s,code:n,status:l}))}p&&(u=`\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629: ${o.expiryDate}`,r.reasons.expired.push({name:s,code:n,expiryDate:o.expiryDate})),(!s||s==="(\u0628\u062F\u0648\u0646 \u0627\u0633\u0645)")&&(u="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645",r.reasons.noName.push({id:o.id,code:n})),u||(u="\u0633\u0628\u0628 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641 - \u064A\u062D\u062A\u0627\u062C \u0641\u062D\u0635 \u064A\u062F\u0648\u064A",r.reasons.notInForms.push({name:s,code:n,record:o}))}}),r.reasons.statusNotApproved.length>0,r.reasons.expired.length>0,r.reasons.noName.length>0,r.reasons.notInForms.length>0&&r.reasons.notInForms.forEach(o=>{}),r},ensureApprovedSetup(){if(!AppState||!AppState.appData)if(typeof window<"u")window.AppState=window.AppState||{},window.AppState.appData=window.AppState.appData||{};else return;const t=AppState.appData.approvedContractors;if(!Array.isArray(t)){AppState.appData.approvedContractors=[];return}let e=!1;AppState.appData.approvedContractors=t.map(a=>{const r=Object.assign({},a);r.id||(r.id=Utils.generateId("APPCON"),e=!0);const o=(r.companyName||r.name||"").trim();o!==r.companyName&&(r.companyName=o,e=!0);const i=this.normalizeApprovedEntityType(r.entityType||r.type);i!==r.entityType&&(r.entityType=i,e=!0);const s=(r.serviceType||r.activity||r.service||"").trim();s!==r.serviceType&&(r.serviceType=s,e=!0);const n=(r.licenseNumber||r.commercialNumber||r.license||"").trim();n!==r.licenseNumber&&(r.licenseNumber=n,e=!0);const l=(r.safetyReviewer||r.reviewer||"").trim();l!==r.safetyReviewer&&(r.safetyReviewer=l,e=!0);const c=(r.notes||r.remark||"").trim();c!==r.notes&&(r.notes=c,e=!0);const p=this.normalizeApprovedStatus(r.status||r.statusLabel);p!==r.status&&(r.status=p,e=!0),r.approvalDate=r.approvalDate||r.accreditationDate||"",r.expiryDate=r.expiryDate||r.expirationDate||"",r.createdAt=r.createdAt||new Date().toISOString(),r.updatedAt=r.updatedAt||new Date().toISOString();let f=r.isoCode||r.code||r.contractorCode||r["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||r.\u0643\u0648\u062F||r.codeNumber||"";if(!f&&r.contractorId){const d=(AppState.appData.contractors||[]).find(m=>m.id===r.contractorId);d&&d.code&&(f=d.code)}return r.isoCode=f||r.isoCode||"",r.code=f||r.code||"",r.isoCode!==r.code&&(r.code=r.isoCode,e=!0),r}),e&&(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},convertOldApprovedCodes(){const t=AppState.appData.approvedContractors||[],e=AppState.appData.contractors||[];let a=!1;t.forEach(r=>{const o=r.isoCode||r.code;if(o&&o.match(/^APP-(\d+)$/)){const i=o.match(/^APP-(\d+)$/);if(i){const s=`CON-${i[1]}`;if(!(e.find(l=>l.code===s)||t.find(l=>(l.isoCode===s||l.code===s)&&l.id!==r.id)))r.isoCode=s,r.code=s,a=!0;else{let l=0;e.forEach(f=>{if(f.code){const u=f.code.match(/CON-(\d+)/);if(u){const d=parseInt(u[1],10);d>l&&(l=d)}}}),t.forEach(f=>{const u=f.isoCode||f.code;if(u){let d=u.match(/CON-(\d+)/);if(d){const m=parseInt(d[1],10);m>l&&(l=m)}}});const c=l+1,p=`CON-${String(c).padStart(3,"0")}`;r.isoCode=p,r.code=p,a=!0}}}}),a&&(AppState.appData.approvedContractors=t,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},getFilteredApprovedEntities(){this.ensureApprovedSetup();const t=(AppState.appData.approvedContractors||[]).slice(),a=(AppState.appData.contractors||[]).slice().map(u=>{u.code||(u.code=this.generateContractorCode());const d=t.find(m=>m.contractorId===u.id);return{id:u.id,contractorId:u.id,companyName:u.name||u.company||"",entityType:"contractor",serviceType:u.serviceType||"",licenseNumber:u.licenseNumber||u.contractNumber||"",approvalDate:d?.approvalDate||u.startDate||"",expiryDate:d?.expiryDate||u.endDate||"",safetyReviewer:d?.safetyReviewer||"",notes:d?.notes||u.notes||"",status:d?.status||(u.status==="\u0646\u0634\u0637"?"approved":"under_review"),createdAt:u.createdAt||new Date().toISOString(),updatedAt:u.updatedAt||new Date().toISOString(),code:u.code,contractNumber:u.contractNumber,isRegularContractor:!0,isActive:this.isEntityEnabled(u)?!(d&&!this.isEntityEnabled(d)):!1,requirementsStatus:this.getContractorRequirementsStatus(u.id)}}),r=[...t],o=new Set(t.map(u=>u.contractorId||u.id).filter(Boolean));if(a.forEach(u=>{if(u.contractorId&&o.has(u.contractorId))return;const d=u.code||u.isoCode;if(d&&r.find(h=>{const w=h.code||h.isoCode;return w&&w===d}))return;const m=(u.companyName||"").trim().toLowerCase();m&&r.find(h=>{const w=(h.companyName||"").trim().toLowerCase();return w&&w===m&&h.entityType===u.entityType})||(r.push(u),u.contractorId&&o.add(u.contractorId))}),r.length===0)return this._approvedFilterCounts={total:0,filtered:0},[];const{search:i,status:s,type:n,validity:l}=this.approvedFilters,c=this.normalizeApprovedSearchText(i||""),p=c.length>0,f=r.filter(u=>!(s&&this.normalizeApprovedStatus(u.status)!==s||n&&this.normalizeApprovedEntityType(u.entityType||u.type)!==n||l==="valid"&&this.isApprovalExpired(u)||l==="expired"&&(!u.expiryDate||!this.isApprovalExpired(u))||p&&!this.matchesApprovedEntitySearch(u,c)));return this._approvedFilterCounts={total:r.length,filtered:f.length},f.sort((u,d)=>Contractors.sortByContractorCode(u,d))},getApprovedEntityStatsKey(t){if(!t)return"";const e=this.normalizeApprovedEntityType(t.entityType||t.type),a=String(t.companyName||t.name||"").replace(/\s+/g," ").trim().toLowerCase(),r=String(t.code||t.isoCode||"").replace(/\s+/g," ").trim().toLowerCase(),o=String(t.contractorId||t.id||"").replace(/\s+/g," ").trim().toLowerCase();return`${e}::${a||r||o}`},getApprovedEntitiesStatsSource(){const t=this.getFilteredApprovedEntities().filter(a=>!a.isRegularContractor),e=new Set;return t.filter(a=>{const r=this.getApprovedEntityStatsKey(a);return!r||e.has(r)?!1:(e.add(r),!0)})},getApprovedEntitiesStats(){const t=this.getApprovedEntitiesStatsSource(),e=t.filter(f=>this.isEntityEnabled(f)),a=t.filter(f=>!this.isEntityEnabled(f)),r=e.filter(f=>this.normalizeApprovedEntityType(f.entityType||f.type)==="contractor").length,o=e.filter(f=>this.normalizeApprovedEntityType(f.entityType||f.type)==="supplier").length,i=t.filter(f=>this.normalizeApprovedEntityType(f.entityType||f.type)==="contractor").length,s=t.filter(f=>this.normalizeApprovedEntityType(f.entityType||f.type)==="supplier").length,n={\u0645\u0642\u0627\u0648\u0644:i,\u0645\u0648\u0631\u062F:s};let l=0,c=0;t.forEach(f=>{if(f.approvalDate&&f.createdAt){const u=new Date(f.approvalDate),d=new Date(f.createdAt);if(!isNaN(u.getTime())&&!isNaN(d.getTime())&&u>=d){const v=(u-d)/(1e3*60*60*24);l+=v,c++}}});const p=c>0?Math.round(l/c):0;return{contractorsCount:r,suppliersCount:o,total:t.length,activeCount:e.length,inactiveCount:a.length,entityTypeDistribution:n,avgApprovalTime:p}},renderApprovedEntitiesStats(){const t=this.getApprovedEntitiesStats();return`
            <div style="overflow-x:auto;margin-bottom:1.5rem;">
                <div class="contractors-kpi-grid" style="display:grid;grid-template-columns:repeat(5,minmax(170px,1fr));gap:1rem;align-items:stretch;">
                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #bfdbfe;border-radius:14px;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(30,64,175,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#1e3a8a;margin:0 0 .5rem;">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#1d4ed8;margin:0;">${t.contractorsCount}</p>
                                <p style="font-size:.74rem;color:#1e40af;margin:.5rem 0 0;">\u0646\u0634\u0637</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#dbeafe,#bfdbfe);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-users-cog" style="color:#1d4ed8;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #bbf7d0;border-radius:14px;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(22,101,52,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#14532d;margin:0 0 .5rem;">\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#15803d;margin:0;">${t.suppliersCount}</p>
                                <p style="font-size:.74rem;color:#166534;margin:.5rem 0 0;">\u0646\u0634\u0637</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#dcfce7,#bbf7d0);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-truck" style="color:#15803d;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #a7f3d0;border-radius:14px;background:linear-gradient(135deg,#ecfdf5 0%,#ffffff 50%,#fff1f2 100%);box-shadow:0 2px 8px rgba(13,148,136,.1);padding:1rem;">
                        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;">
                            <p style="font-size:.9rem;font-weight:800;color:#374151;margin:0 0 .5rem;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 - \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646</p>
                            <div style="font-size:1rem;font-weight:700;color:#374151;line-height:1.8;">
                                \u0646\u0634\u0637 <span style="font-size:2rem;font-weight:900;color:#059669;vertical-align:middle;">${t.activeCount}</span>
                                <span style="margin:0 .4rem;font-size:1.2rem;font-weight:900;color:#6b7280;vertical-align:middle;">*</span>
                                \u063A\u064A\u0631 \u0646\u0634\u0637 <span style="font-size:2rem;font-weight:900;color:#dc2626;vertical-align:middle;">${t.inactiveCount}</span>
                            </div>
                            <div style="width:40px;height:40px;margin-top:.35rem;border-radius:999px;background:linear-gradient(135deg,#d1fae5,#a7f3d0);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-chart-pie" style="color:#047857;font-size:1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #ddd6fe;border-radius:14px;background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(109,40,217,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#5b21b6;margin:0 0 .5rem;">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</p>
                                <p style="font-size:1.35rem;font-weight:900;line-height:1;color:#6d28d9;margin:0;">
                                    ${t.entityTypeDistribution.\u0645\u0642\u0627\u0648\u0644>t.entityTypeDistribution.\u0645\u0648\u0631\u062F?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0648\u0631\u062F"}
                                </p>
                                <p style="font-size:.74rem;color:#6d28d9;margin:.5rem 0 0;">
                                    ${t.entityTypeDistribution.\u0645\u0642\u0627\u0648\u0644} \u0645\u0642\u0627\u0648\u0644 / ${t.entityTypeDistribution.\u0645\u0648\u0631\u062F} \u0645\u0648\u0631\u062F
                                </p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-building" style="color:#6d28d9;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>

                    <div class="content-card" style="height:100%;min-height:132px;border:2px solid #fed7aa;border-radius:14px;background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 55%,#ffffff 100%);box-shadow:0 2px 8px rgba(194,65,12,.08);padding:1rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;height:100%;">
                            <div>
                                <p style="font-size:.78rem;font-weight:700;color:#9a3412;margin:0 0 .5rem;">\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u063A\u0631\u0642\u0629 \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F</p>
                                <p style="font-size:2rem;font-weight:900;line-height:1;color:#c2410c;margin:0;">${t.avgApprovalTime}</p>
                                <p style="font-size:.74rem;color:#c2410c;margin:.5rem 0 0;">\u064A\u0648\u0645 (\u0645\u062A\u0648\u0633\u0637)</p>
                            </div>
                            <div style="width:46px;height:46px;border-radius:999px;background:linear-gradient(135deg,#ffedd5,#fdba74);display:flex;align-items:center;justify-content:center;">
                                <i class="fas fa-clock" style="color:#c2410c;font-size:1.1rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `},countActiveApprovedFilters(){const t=this.approvedFilters||{};let e=0;return String(t.search||"").trim()&&e++,t.status&&e++,t.type&&e++,t.validity&&e++,e},updateApprovedFiltersMeta(){const t=this._approvedFilterCounts||{total:0,filtered:0},e=document.getElementById("approved-contractors-filter-meta"),a=document.getElementById("approved-contractors-filter-badge"),r=document.getElementById("approved-contractors-reset"),o=document.getElementById("approved-contractors-search-clear"),i=this.countActiveApprovedFilters(),s=t.total||0,n=t.filtered??s;e&&(e.textContent=i?`\u0639\u0631\u0636 ${n} \u0645\u0646 ${s} \u062C\u0647\u0629`:`\u0625\u062C\u0645\u0627\u0644\u064A ${s} \u062C\u0647\u0629`),a&&(a.textContent=String(i),a.style.display=i>0?"inline-flex":"none"),r&&(r.disabled=i===0,r.setAttribute("aria-disabled",i===0?"true":"false")),o&&(o.style.display=String(this.approvedFilters.search||"").trim()?"inline-flex":"none")},renderApprovedFiltersBar(){const t=this.approvedFilters||{},e=this.countActiveApprovedFilters(),a=this._approvedFilterCounts||{total:0,filtered:0},r=a.total||0,o=a.filtered??r,i=e?`\u0639\u0631\u0636 ${o} \u0645\u0646 ${r} \u062C\u0647\u0629`:`\u0625\u062C\u0645\u0627\u0644\u064A ${r} \u062C\u0647\u0629`,s=String(t.search||"").trim().length>0,n=Object.entries(APPROVED_ENTITY_STATUS_OPTIONS).map(([c,p])=>`
            <option value="${c}" ${t.status===c?"selected":""}>${p}</option>
        `).join(""),l=Object.entries(APPROVED_ENTITY_TYPE_OPTIONS).map(([c,p])=>`
            <option value="${c}" ${t.type===c?"selected":""}>${p}</option>
        `).join("");return`
            <div class="approved-filters-bar" role="search" aria-label="\u062A\u0635\u0641\u064A\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646">
                <div class="approved-filters-bar__header">
                    <div class="approved-filters-bar__title">
                        <i class="fas fa-sliders-h" aria-hidden="true"></i>
                        <span>\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</span>
                        <span id="approved-contractors-filter-badge" class="approved-filters-bar__badge" style="display:${e?"inline-flex":"none"}">${e}</span>
                    </div>
                    <span id="approved-contractors-filter-meta" class="approved-filters-bar__meta">${i}</span>
                </div>
                <div class="approved-filters-bar__row">
                    <div class="approved-filters-bar__search-wrap">
                        <i class="fas fa-search approved-filters-bar__search-icon" aria-hidden="true"></i>
                        <input
                            type="search"
                            id="approved-contractors-search"
                            class="approved-filters-bar__search-input"
                            placeholder="\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0643\u0648\u062F\u060C \u0627\u0644\u0631\u0642\u0645\u060C \u0627\u0644\u062A\u0631\u062E\u064A\u0635\u060C \u0627\u0644\u062E\u062F\u0645\u0629..."
                            value="${Utils.escapeHTML(t.search||"")}"
                            autocomplete="off"
                            enterkeyhint="search"
                        >
                        <button
                            type="button"
                            id="approved-contractors-search-clear"
                            class="approved-filters-bar__search-clear"
                            title="\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B"
                            aria-label="\u0645\u0633\u062D \u0627\u0644\u0628\u062D\u062B"
                            style="display:${s?"inline-flex":"none"}"
                        >
                            <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <select id="approved-contractors-status" class="approved-filters-bar__select" aria-label="\u0641\u0644\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629">
                        <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A</option>
                        ${n}
                    </select>
                    <select id="approved-contractors-type" class="approved-filters-bar__select" aria-label="\u0641\u0644\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629">
                        <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                        ${l}
                    </select>
                    <select id="approved-contractors-validity" class="approved-filters-bar__select" aria-label="\u0641\u0644\u062A\u0631 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F">
                        <option value="" ${t.validity?"":"selected"}>\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</option>
                        <option value="valid" ${t.validity==="valid"?"selected":""}>\u0633\u0627\u0631\u064A</option>
                        <option value="expired" ${t.validity==="expired"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                    </select>
                    <button
                        type="button"
                        id="approved-contractors-reset"
                        class="approved-filters-bar__reset btn-secondary btn-sm"
                        ${e===0?'disabled aria-disabled="true"':""}
                    >
                        <i class="fas fa-undo-alt ml-1" aria-hidden="true"></i>
                        \u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                    </button>
                </div>
            </div>
        `},renderApprovedEntitiesSection(){const t=this.isContractorApprovalAdminUser(),e=this.getFilteredApprovedEntities(),a=this.renderApprovedEntitiesTable(e,t);return`
            <div class="content-card contractors-approved-card" id="approved-contractors-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div><h2 class="card-title flex items-center gap-2"><i class="fas fa-check-circle ml-2"></i>\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0631\u062C\u0639\u064A \u0644\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0624\u0647\u0644\u0629 \u0648\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A</p></div>
                        <div class="flex items-center gap-2 flex-wrap">
                            ${t?`
                            <input type="file" id="import-approved-contractors-input" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" tabindex="-1" aria-hidden="true" style="position:absolute;width:1px;height:1px;opacity:0;left:-9999px;">
                            <button type="button" id="import-approved-contractors-excel-btn" class="btn-secondary" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0645\u0646 \u0645\u0644\u0641 Excel (\u0646\u0641\u0633 \u0623\u0639\u0645\u062F\u0629 \u0627\u0644\u062A\u0635\u062F\u064A\u0631)">
                                <i class="fas fa-file-import ml-2"></i>
                                \u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel
                            </button>
                            `:""}
                            <button type="button" id="export-approved-contractors-pdf-btn" class="btn-secondary">
                                <i class="fas fa-file-pdf ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 PDF
                            </button>
                            <button type="button" id="export-approved-contractors-excel-btn" class="btn-success">
                                <i class="fas fa-file-excel ml-2"></i>
                                \u062A\u0635\u062F\u064A\u0631 Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-4">
                    <div id="approved-contractors-stats-container">
                        ${this.renderApprovedEntitiesStats()}
                    </div>
                    ${this.renderApprovedFiltersBar()}
                    <div id="approved-contractors-container">
                        ${a}
                    </div>
                </div>
            </div>
        `},renderApprovedEntitiesTable(t,e=!1){if(!t||t.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0647\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B.</p>
                </div>
            `;const a=t.map(r=>{const o=this.getApprovedStatusBadgeClass(r.status),i=this.getApprovedStatusLabel(r.status),s=this.getApprovedTypeLabel(r.entityType),n=r.approvalDate?Utils.formatDate(r.approvalDate):"\u2014",l=r.expiryDate?Utils.formatDate(r.expiryDate):"\u2014",p=this.isApprovalExpired(r)?'<span class="badge badge-danger ml-2">\u0645\u0646\u062A\u0647\u064A</span>':"";let f=r.code||r.isoCode||r.contractorCode||r["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||r.\u0643\u0648\u062F||r.codeNumber||"";if(!f&&r.contractorId){const C=(AppState.appData.contractors||[]).find(k=>k.id===r.contractorId);C&&C.code&&(f=C.code)}let u="";if(r.isRegularContractor&&r.requirementsStatus){const A=r.requirementsStatus;u=A.allMet?'<span class="badge badge-success ml-2" data-i18n-literal>\u0645\u0633\u062A\u0648\u0641\u064A</span>':`<span class="badge badge-warning ml-2">${A.completed}/${A.total}</span>`}const d=this.isEntityEnabled(r),m=d?"":'<span class="badge badge-danger ml-2" data-i18n-literal>\u063A\u064A\u0631 \u0646\u0634\u0637</span>',v=r.isRegularContractor,h=r.contractorId||r.id,w=e?d?`<button class="btn-icon btn-icon-warning" title="\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" data-i18n-title="module.contractors.disable" onclick="Contractors.toggleEntityActive('${r.id}', 'inactive')">
                        <i class="fas fa-toggle-off"></i>
                    </button>`:`<button class="btn-icon btn-icon-success" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" data-i18n-title="module.contractors.enable" onclick="Contractors.toggleEntityActive('${r.id}', 'active')">
                        <i class="fas fa-toggle-on"></i>
                    </button>`:"",b=v?`
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.viewContractor('${h}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.editContractor('${h}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="\u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645" onclick="Contractors.showEvaluationForm('${h}')">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="\u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A" onclick="Contractors.openEvaluationHistory('${h}')">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${w}
                    ${e?`
                    <button class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.requestDeleteContractor('${h}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    `:""}
                </div>
            `:`
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovedEntity('${r.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644" onclick="Contractors.showApprovedEntityForm('${r.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="\u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645" onclick="Contractors.showEvaluationFormForApproved('${r.id}')">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="\u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A" onclick="Contractors.openEvaluationHistoryForApproved('${r.id}')">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${w}
                    ${e?`
                    <button class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" onclick="Contractors.requestDeleteApprovedEntity('${r.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    `:""}
                </div>
            `;return`
                <tr>
                    <td>
                        ${f?`
                            <span class="font-mono text-sm font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
                                ${Utils.escapeHTML(f)}
                            </span>
                        `:'<span class="text-gray-400">\u2014</span>'}
                    </td>
                    <td>
                        <div class="font-semibold text-gray-800">${Utils.escapeHTML(r.companyName||"")}</div>
                        <div class="text-xs text-gray-500 mt-1">
                            ${Utils.escapeHTML(r.serviceType||"")}
                        </div>
                    </td>
                    <td>${s}</td>
                    <td>${Utils.escapeHTML(r.licenseNumber||r.contractNumber||"")||"\u2014"}</td>
                    <td>${n}</td>
                    <td>${l} ${p}</td>
                    <td>${Utils.escapeHTML(r.safetyReviewer||"")||"\u2014"}</td>
                    <td>
                        <span class="badge ${o}">
                            ${i}
                        </span>
                        ${u}
                        ${m}
                    </td>
                    <td>${Utils.escapeHTML(r.notes||"")||"\u2014"}</td>
                    <td>${b}</td>
                </tr>
            `}).join("");return`
            <div class="table-wrapper">
                <table class="data-table table-header-orange">
                    <thead>
                        <tr>
                            <th>${this.t("module.contractors.code","\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644")}</th>
                            <th>${this.t("module.contractors.companyName","\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644")}</th>
                            <th>${this.t("module.contractors.entityType","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629")}</th>
                            <th>${this.t("module.contractors.license","\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635")}</th>
                            <th>${this.t("module.contractors.approvalDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</th>
                            <th>${this.t("module.contractors.expiryDate","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}</th>
                            <th>${this.t("module.contractors.safetyOfficer","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629")}</th>
                            <th>${this.t("module.contractors.status","\u0627\u0644\u062D\u0627\u0644\u0629")}</th>
                            <th>${this.t("module.contractors.notes","\u0645\u0644\u0627\u062D\u0638\u0627\u062A")}</th>
                            <th>${this.t("module.contractors.actions","\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${a}
                    </tbody>
                </table>
            </div>
        `},refreshApprovedEntitiesList(){const t=document.getElementById("approved-contractors-container"),e=document.getElementById("approved-contractors-stats-container");if(!t)return;const a=this.isContractorApprovalAdminUser(),r=this.getFilteredApprovedEntities();e&&this.safeSetInnerHTML(e,this.renderApprovedEntitiesStats());const o=this.renderApprovedEntitiesTable(r,a);this.safeSetInnerHTML(t,o),this.updateApprovedFiltersMeta()},ensureApprovedTabContentLoaded(t=!1){const e=document.getElementById("contractors-approved-content");if(!e)return;const a=!!e.querySelector("#approved-contractors-card");!t&&a||(this.safeSetInnerHTML(e,this.renderApprovedEntitiesSection()),this.ensureApprovedTabEventListeners())},handleApprovedFilterChange(t,e){Object.prototype.hasOwnProperty.call(this.approvedFilters,t)&&(this.approvedFilters[t]=e,this.refreshApprovedEntitiesList())},resetApprovedFilters(){this.approvedFilters={search:"",status:"",type:"",validity:""};const t=document.getElementById("approved-contractors-search"),e=document.getElementById("approved-contractors-status"),a=document.getElementById("approved-contractors-type"),r=document.getElementById("approved-contractors-validity");t&&(t.value=""),e&&(e.value=""),a&&(a.value=""),r&&(r.value=""),this.refreshApprovedEntitiesList()},getActiveApprovedEntities(t={}){this.ensureApprovedSetup();const e=t.includeExpired===!0,a=t.checkRequirements===!0;let r=(AppState.appData.approvedContractors||[]).filter(o=>this.isApprovalActive(o,e));return a&&(r=r.filter(o=>o.contractorId?this.checkAllRequirementsMet(o.contractorId):!0)),r.sort((o,i)=>Contractors.sortByContractorCode(o,i))},getApprovedOptions(t=!1){return this.getActiveApprovedEntities({includeExpired:t}).map(e=>({id:e.id,name:e.companyName,entityType:e.entityType,serviceType:e.serviceType,licenseNumber:e.licenseNumber,contractorId:e.contractorId||null}))},getContractorById(t){if(!t)return null;const e=AppState.appData.contractors||[];let a=e.find(i=>i.id===t);if(a)return a;this.ensureApprovedSetup();const o=(AppState.appData.approvedContractors||[]).find(i=>i.id===t||i.contractorId===t);return o?o.contractorId&&(a=e.find(i=>i.id===o.contractorId),a)?a:{id:o.id,name:o.companyName,serviceType:o.serviceType,contractNumber:o.licenseNumber,entityType:o.entityType,approvedEntityId:o.id}:null},getContractorByName(t){if(!t)return null;const e=t.trim().toLowerCase(),a=AppState.appData.contractors||[];let r=a.find(s=>(s.name||"").toLowerCase()===e||(s.company||"").toLowerCase()===e||(s.contractorName||"").toLowerCase()===e);if(r)return r;this.ensureApprovedSetup();const i=(AppState.appData.approvedContractors||[]).find(s=>(s.companyName||"").toLowerCase()===e);return i?i.contractorId&&(r=a.find(s=>s.id===i.contractorId),r)?r:{id:i.id,name:i.companyName,serviceType:i.serviceType,contractNumber:i.licenseNumber,entityType:i.entityType,approvedEntityId:i.id}:null},getAllContractorsForModules(){if(!AppState||!AppState.appData)if(typeof window<"u")window.AppState=window.AppState||{},window.AppState.appData=window.AppState.appData||{};else return[];const t=new Map,e=d=>(d??"").toString().trim(),a=d=>e(d).toUpperCase(),r=d=>e(d),o=d=>e(d).toLowerCase(),i=d=>{if(!d||typeof d!="object")return[];const m=[d.id,d.contractorId,d.code,d.isoCode,d.contractorCode,d.approvedEntityId,d.licenseNumber,d.contractNumber];return["aliasIds","identityIds","legacyIds","altIds"].forEach(v=>{Array.isArray(d[v])&&m.push(...d[v])}),Array.from(new Set(m.map(e).filter(Boolean)))},s=d=>{const m=a(d.code||d.isoCode||d.contractorCode);if(/^CON-\d+$/i.test(m))return`CODE:${m}`;const v=r(d.licenseNumber||d.contractNumber);if(v)return`LIC:${v}`;const h=e(d.contractorId);if(h)return`CID:${h}`;const w=e(d.id);if(w)return`ID:${w}`;const b=o(d.name||d.companyName||d.company||d.contractorName);return b?`NAME:${b}`:""},n=(d,m)=>{if(!d)return m;if(!m)return d;const v={...d,...m};v.aliasIds=Array.from(new Set([...i(d),...i(m)])),(d.approvedEntityId||m.approvedEntityId)&&(v.approvedEntityId=d.approvedEntityId||m.approvedEntityId);const h=e(d.name),w=e(m.name),b=h&&h!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";return w&&w!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"&&!b?v.name=m.name:b&&(v.name=d.name),e(m.code)?v.code=m.code:e(d.code)&&(v.code=d.code),e(m.licenseNumber)?v.licenseNumber=m.licenseNumber:e(d.licenseNumber)&&(v.licenseNumber=d.licenseNumber),v},l=d=>{const m=s(d);if(!m)return;Array.isArray(d.aliasIds)||(d.aliasIds=i(d));const v=t.get(m);t.set(m,n(v,d))},c=new Set;(AppState.appData.approvedContractors||[]).forEach(d=>{d&&!this.isEntityEnabled(d)&&(d.contractorId&&c.add(String(d.contractorId).trim()),d.id&&c.add(String(d.id).trim()))}),(AppState.appData.contractors||[]).forEach(d=>{if(!d||!this.isEntityEnabled(d))return;const m=String(d.id||d.contractorId||"").trim();if(m&&c.has(m))return;const v=d.id||d.contractorId||"",h=d.name||d.company||d.contractorName||d.companyName||"";!v&&!h||l({id:v,contractorId:d.contractorId||null,name:h||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",serviceType:d.serviceType||"",licenseNumber:d.licenseNumber||d.contractNumber||"",entityType:d.entityType||"contractor",approvedEntityId:d.approvedEntityId||null,code:d.code||d.isoCode||""})}),this.ensureApprovedSetup();const f=this.getActiveApprovedEntities({includeExpired:!0});AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 getAllContractorsForModules: approved=${f.length}, contractorsSheet=${(AppState.appData.contractors||[]).length}`),f.forEach(d=>{if(!d)return;const m=d.companyName||d.name||"";m&&l({id:d.contractorId||d.id,contractorId:d.contractorId||null,name:m,serviceType:d.serviceType||"",licenseNumber:d.licenseNumber||"",entityType:d.entityType||"contractor",approvedEntityId:d.id,code:d.code||d.isoCode||""})});const u=Array.from(t.values()).filter(d=>d&&e(d.name)).sort((d,m)=>Contractors.sortByContractorCode(d,m));return AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 getAllContractorsForModules: \u0625\u062C\u0645\u0627\u0644\u064A ${u.length} \u0645\u0642\u0627\u0648\u0644 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A`),u},getContractorOptionsForModules(t={}){const e=t.includeSuppliers!==!1,a=t.approvedOnly!==!1;return(this.getAllContractorsForModules()||[]).filter(o=>!o||a&&!o.approvedEntityId?!1:e?!0:(o.entityType||"contractor")==="contractor").map(o=>({id:(o.id||"").toString(),name:(o.name||o.companyName||"").toString().trim(),serviceType:(o.serviceType||"").toString().trim(),licenseNumber:(o.licenseNumber||o.contractNumber||"").toString().trim(),code:(o.code||o.isoCode||"").toString().trim(),entityType:(o.entityType||"contractor").toString(),approvedEntityId:o.approvedEntityId||null})).filter(o=>o.name)},populateContractorSelect(t,e={}){if(!t||t.tagName!=="SELECT")return;const a=e.placeholder||"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",r=(e.selectedValue||"").toString(),o=(e.selectedContractorId||"").toString(),i=e.valueMode==="id"?"id":"name",s=e.showServiceType!==!1,n=e.includeSuppliers!==!1,l=e.approvedOnly!==!1,c=this.getContractorOptionsForModules({includeSuppliers:n,approvedOnly:l});t.innerHTML=`<option value="">${Utils.escapeHTML(a)}</option>`;const p=document.createDocumentFragment();c.forEach(f=>{const u=document.createElement("option");u.value=i==="id"?f.id||"":f.name||"",u.textContent=f.name,s&&f.serviceType&&(u.textContent+=` - ${f.serviceType}`),u.dataset.contractorId=f.id||"",f.code&&(u.dataset.contractorCode=f.code),o&&f.id===o?u.selected=!0:r&&(i==="name"&&f.name===r&&(u.selected=!0),i==="id"&&f.id===r&&(u.selected=!0)),p.appendChild(u)}),t.appendChild(p)},getApprovedEntityMap(t=!1){return new Map(this.getApprovedOptions(t).map(e=>[e.id,e]))},showApprovedEntityForm(t=null){this.ensureApprovedSetup();const e=t?(AppState.appData.approvedContractors||[]).find(o=>o.id===t):null,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-check-circle ml-2"></i>
                        ${e?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="approved-contractor-form" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                            <input type="text" id="approved-company-name" class="form-input" required value="${Utils.escapeHTML(e?.companyName||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0634\u0631\u0643\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629 *</label>
                            <select id="approved-entity-type" class="form-input" required>
                                <option value="contractor" ${e?.entityType==="supplier"?"":"selected"}>\u0645\u0642\u0627\u0648\u0644</option>
                                <option value="supplier" ${e?.entityType==="supplier"?"selected":""}>\u0645\u0648\u0631\u062F</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629 *</label>
                            <input type="text" id="approved-service-type" class="form-input" required value="${Utils.escapeHTML(e?.serviceType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635</label>
                            <input type="text" id="approved-license-number" class="form-input" value="${Utils.escapeHTML(e?.licenseNumber||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0623\u0648 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u062E\u064A\u0635">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <input type="date" id="approved-approval-date" class="form-input" required value="${e?.approvalDate?new Date(e.approvalDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <input type="date" id="approved-expiry-date" class="form-input" required value="${e?.expiryDate?new Date(e.expiryDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</label>
                            <input type="text" id="approved-safety-reviewer" class="form-input" value="${Utils.escapeHTML(e?.safetyReviewer||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <select id="approved-status" class="form-input" required>
                                <option value="approved" ${e?.status==="approved"?"selected":""}>\u0645\u0639\u062A\u0645\u062F</option>
                                <option value="under_review" ${e?.status==="under_review"||!e?"selected":""}>\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                <option value="rejected" ${e?.status==="rejected"?"selected":""}>\u0645\u0631\u0641\u0648\u0636</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <textarea id="approved-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(e?.notes||"")}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${e?"\u062A\u062D\u062F\u064A\u062B":"\u062D\u0641\u0638"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#approved-contractor-form");r?.addEventListener("submit",o=>{if(o.preventDefault(),!a||!document.contains(a)){Utils.safeWarn("\u26A0\uFE0F submit approved-contractor-form: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}if(!r||!document.contains(r)){Utils.safeWarn("\u26A0\uFE0F submit approved-contractor-form: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}try{const i=r.querySelector("#approved-company-name"),s=r.querySelector("#approved-entity-type"),n=r.querySelector("#approved-service-type"),l=r.querySelector("#approved-license-number"),c=r.querySelector("#approved-approval-date"),p=r.querySelector("#approved-expiry-date"),f=r.querySelector("#approved-safety-reviewer"),u=r.querySelector("#approved-status"),d=r.querySelector("#approved-notes"),m=i?.value.trim()||"",v=s?.value||"",h=n?.value.trim()||"",w=l?.value.trim()||"",b=c?.value||"",A=p?.value||"",C=f?.value.trim()||"",k=u?.value||"",q=d?.value.trim()||"";if(!m||!h||!b||!A){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 (\u0627\u0644\u0627\u0633\u0645\u060C \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621)");return}const $=new Date(b).toISOString(),y=new Date(A).toISOString();if(new Date(y)<new Date($)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F");return}if(!e){const T=AppState.appData.approvedContractors||[],_=m.trim().toLowerCase(),I=this.normalizeApprovedEntityType(v),L=w.trim();if(T.find(x=>x.companyName&&x.companyName.trim().toLowerCase()===_&&this.normalizeApprovedEntityType(x.entityType)===I&&(!e||x.id!==e.id))){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 (${m}) \u0648\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.`);return}if(L&&T.find(E=>E.licenseNumber&&E.licenseNumber.trim()===L&&(!e||E.id!==e.id))){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A (${w}). \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.`);return}}let S=e?.isoCode||e?.code||"";if(S){if(!e){const T=AppState.appData.approvedContractors||[];if(T.find(I=>{const L=I.isoCode||I.code;return L&&L===S&&(!e||I.id!==e.id)})){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0643\u0648\u062F (${S}). \u0633\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0643\u0648\u062F \u062C\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.`);const I=AppState.appData.contractors||[];let L=0;I.forEach(x=>{if(x.code){const E=x.code.match(/CON-(\d+)/);if(E){const R=parseInt(E[1],10);R>L&&(L=R)}}}),T.forEach(x=>{const E=x.isoCode||x.code;if(E){let R=E.match(/CON-(\d+)/);if(R){const M=parseInt(R[1],10);M>L&&(L=M)}if(R=E.match(/APP-(\d+)/),R){const M=parseInt(R[1],10);M>L&&(L=M)}}});const g=L+1;S=`CON-${String(g).padStart(3,"0")}`}}}else{const T=AppState.appData.contractors||[],_=T.find(I=>I.name===m||w&&I.contractNumber===w);if(_&&_.code)S=_.code;else{const I=AppState.appData.approvedContractors||[];let L=0;T.forEach(x=>{if(x.code){const E=x.code.match(/CON-(\d+)/);if(E){const R=parseInt(E[1],10);R>L&&(L=R)}}}),I.forEach(x=>{const E=x.isoCode||x.code;if(E){let R=E.match(/CON-(\d+)/);if(R){const M=parseInt(R[1],10);M>L&&(L=M)}if(R=E.match(/APP-(\d+)/),R){const M=parseInt(R[1],10);M>L&&(L=M)}}});const g=L+1;S=`CON-${String(g).padStart(3,"0")}`}}const D={id:e?.id||Utils.generateId("APPCON"),companyName:m,entityType:this.normalizeApprovedEntityType(v),serviceType:h,licenseNumber:w,approvalDate:$,expiryDate:y,safetyReviewer:C,status:this.normalizeApprovedStatus(k),notes:q,isoCode:S,code:S,createdAt:e?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(this.persistApprovedEntity(D,e),Notification.success(e?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),a&&document.contains(a))try{a.remove()}catch(T){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 modal:",T);const _=a.parentNode;if(_)try{_.removeChild(a)}catch(I){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629 \u0644\u0625\u0632\u0627\u0644\u0629 modal:",I)}}}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",i),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0629: "+i.message)}}),a.addEventListener("click",o=>{o.target===a&&a.remove()})},viewApprovedEntity(t){this.injectAntiShakeStyles(),this.ensureApprovedSetup();const e=(AppState.appData.approvedContractors||[]).find(c=>c.id===t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=this.getApprovedStatusLabel(e.status),r=this.getApprovedTypeLabel(e.entityType),o=e.approvalDate?Utils.formatDate(e.approvalDate):"\u2014",i=e.expiryDate?Utils.formatDate(e.expiryDate):"\u2014",s=this.isApprovalExpired(e)?'<span class="badge badge-danger ml-2">\u0645\u0646\u062A\u0647\u064A</span>':"",n=e.code||e.isoCode||e.contractorCode||e["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||e.\u0643\u0648\u062F||e.codeNumber||"",l=document.createElement("div");l.id="contractor-approved-entity-details-modal",l.className="modal-overlay ctr-detail-modal",l.innerHTML=`
            <div class="modal-content ctr-detail-dialog">
                <div class="modal-header ctr-detail-head">
                    <div class="ctr-detail-head__copy">
                        <span class="ctr-detail-head__icon"><i class="fas fa-building-shield"></i></span>
                        <div>
                            <span class="ctr-detail-head__eyebrow">\u0633\u062C\u0644 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0627\u0644\u062A\u0623\u0647\u064A\u0644</span>
                            <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</h2>
                            <p>${Utils.escapeHTML(e.companyName||"\u062C\u0647\u0629 \u063A\u064A\u0631 \u0645\u0633\u0645\u0627\u0629")}</p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ctr-detail-body">
                    <div class="ctr-detail-summary">
                        <div><span>\u0643\u0648\u062F \u0627\u0644\u062C\u0647\u0629</span><strong class="ctr-detail-code">${n?Utils.escapeHTML(n):"\u2014"}</strong></div>
                        <div><span>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</span><strong>${r}</strong></div>
                        <div><span>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span><strong><span class="badge ${this.getApprovedStatusBadgeClass(e.status)}">${a}</span></strong></div>
                    </div>
                    <section class="ctr-detail-section">
                        <h3><i class="fas fa-address-card"></i>\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0629</h3>
                        <div class="ctr-detail-grid">
                            <div class="ctr-detail-field"><label>\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644</label><p>${Utils.escapeHTML(e.companyName||"")||"\u2014"}</p></div>
                            <div class="ctr-detail-field"><label>\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629</label><p>${Utils.escapeHTML(e.serviceType||"")||"\u2014"}</p></div>
                            <div class="ctr-detail-field"><label>\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635</label><p>${Utils.escapeHTML(e.licenseNumber||"")||"\u2014"}</p></div>
                            <div class="ctr-detail-field"><label>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</label><p>${Utils.escapeHTML(e.safetyReviewer||"")||"\u2014"}</p></div>
                        </div>
                    </section>
                    <section class="ctr-detail-section ctr-detail-section--dates">
                        <h3><i class="fas fa-calendar-check"></i>\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</h3>
                        <div class="ctr-detail-grid">
                            <div class="ctr-detail-field"><label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label><p>${o}</p></div>
                            <div class="ctr-detail-field"><label>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label><p>${i} ${s}</p></div>
                        </div>
                    </section>
                    ${e.notes?`
                        <section class="ctr-detail-section ctr-detail-note">
                            <h3><i class="fas fa-note-sticky"></i>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</h3>
                            <p>${Utils.escapeHTML(e.notes)}</p>
                        </section>
                    `:""}
                </div>
                <div class="modal-footer ctr-detail-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-xmark ml-2"></i>\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-success" onclick="Contractors.exportApprovedEntitiesPDF('${e.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>
                        \u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    <button class="btn-primary" onclick="Contractors.showApprovedEntityForm('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>
                        \u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l),this.applyModuleI18n(l),l.addEventListener("click",c=>{c.target===l&&l.remove()})},persistApprovedEntity(t,e=null){this.ensureApprovedSetup();let a=AppState.appData.approvedContractors||[];if(!Array.isArray(a)||a.length===0)try{typeof GoogleIntegration<"u"&&GoogleIntegration.syncData&&GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1,sheets:["ApprovedContractors"]}).then(()=>{a=AppState.appData.approvedContractors||[],Array.isArray(a)&&a.length>0&&this.persistApprovedEntity(t,e)}).catch(()=>{})}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r)}if(a=[...a],e){const r=a.findIndex(o=>o.id===e.id);r!==-1?a[r]={...t}:a.push({...t})}else{if(!t.isoCode&&!t.code){let o=0;a.forEach(s=>{const n=s.isoCode||s.code;if(n){const l=n.match(/APP-(\d+)/);if(l){const c=parseInt(l[1],10);c>o&&(o=c)}}});const i=o+1;t.isoCode=`APP-${String(i).padStart(3,"0")}`,t.code=t.isoCode}const r=a.findIndex(o=>{if(o.id===t.id)return!0;if(t.isoCode||t.code){const i=t.isoCode||t.code,s=o.isoCode||o.code;if(i&&s&&i===s)return!0}return!!(t.companyName&&o.companyName&&t.companyName.trim().toLowerCase()===o.companyName.trim().toLowerCase()&&t.entityType===o.entityType||t.licenseNumber&&o.licenseNumber&&t.licenseNumber.trim()===o.licenseNumber.trim())});if(r!==-1){const o=a[r];a[r]={...t,id:o.id,createdAt:o.createdAt||t.createdAt},Utils.safeWarn(`\u26A0\uFE0F \u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u062A\u0643\u0631\u0627\u0631 \u0644\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F: ${t.companyName} - \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0625\u0636\u0627\u0641\u0629`)}else a.push({...t})}AppState.appData.approvedContractors=a,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("ApprovedContractors",AppState.appData.approvedContractors).catch(r=>{Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)})}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)}this.refreshApprovedEntitiesList()},async requestDeleteApprovedEntity(t){if(!t)return;if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u061F")?this.deleteApprovedEntity(t):void 0;this.ensureApprovedSetup();const a=(AppState.appData.approvedContractors||[]).find(i=>i.id===t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"))return;const r=AppState.currentUser,o={id:Utils.generateId("DELRQ"),requestType:"approved_entity",entityId:t,entityName:a.companyName||a.name||"",entityType:a.entityType||"contractor",reason:prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:")||"\u0637\u0644\u0628 \u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",createdBy:r?.id||"",createdByName:r?.name||"",createdAt:new Date().toISOString(),status:"pending"};await this.submitDeletionRequest(o),this.refreshApprovalRequestsSection()},async deleteApprovedEntity(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647\u0627 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."))return;this.ensureApprovedSetup();const e=AppState.appData.approvedContractors||[],a=e.findIndex(o=>o.id===t);if(a===-1){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const r=e[a];if(e.splice(a,1),AppState.appData.approvedContractors=e,r.contractorId){const o=AppState.appData.contractors||[],i=o.findIndex(s=>s.id===r.contractorId);i!==-1&&(o.splice(i,1),AppState.appData.contractors=o)}try{Loading.show();const o=await GoogleIntegration.sendToAppsScript("deleteApprovedContractor",{approvedContractorId:t,__timeoutMs:45e3});if(o.success)Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.load(!0);else throw new Error(o.message)}catch(o){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: "+o.message),this.load(!0)}finally{Loading.hide(),this.refreshApprovedEntitiesList()}},async toggleEntityActive(t,e){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644");return}this.ensureApprovedSetup();const a=AppState.appData.approvedContractors||[],r=a.findIndex(d=>d&&d.id===t);if(r===-1){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=e==="inactive"||e===!1?"inactive":"active",i=o==="active",s=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null,n=(d,m)=>{try{return s&&s.t(d)||m}catch{return m}},l=i?n("module.contractors.confirmEnable","\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0641\u0639\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u0639\u0648\u062F \u0644\u0644\u0638\u0647\u0648\u0631 \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C."):n("module.contractors.confirmDisable","\u0647\u0644 \u062A\u0631\u064A\u062F \u062A\u0639\u0637\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0644\u0646 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0645\u0639 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0643\u0627\u0645\u0644 \u0628\u064A\u0627\u0646\u0627\u062A\u0647.");if(!confirm(l))return;const c=a[r],p=c.isActive;c.isActive=o,a[r]=c,AppState.appData.approvedContractors=a;let f=null,u=null;if(c.contractorId){const d=AppState.appData.contractors||[],m=d.findIndex(v=>v&&v.id===c.contractorId);m!==-1&&(f=d[m],u=f.isActive,f.isActive=o,d[m]=f,AppState.appData.contractors=d)}this.refreshApprovedEntitiesList();try{typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript&&await GoogleIntegration.sendToAppsScript("updateApprovedContractor",{approvedContractorId:c.id,updateData:{isActive:o,updatedAt:new Date().toISOString()}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(i?n("module.contractors.toggleEnableSuccess","\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"):n("module.contractors.toggleDisableSuccess","\u062A\u0645 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"))}catch(d){c.isActive=p,a[r]=c,AppState.appData.approvedContractors=a,f&&(f.isActive=u),this.refreshApprovedEntitiesList(),typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0645\u0639 Backend\u060C \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637:",d),Notification.warning("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645")}},exportApprovedEntitiesExcel(){this.ensureApprovedSetup();const t=this.getFilteredApprovedEntities();if(!t.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}const e=t.map(i=>({"\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644":i.companyName||"","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629":this.getApprovedTypeLabel(i.entityType),"\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629":i.serviceType||"","\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635":i.licenseNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":i.approvalDate&&typeof Utils.formatDateForInput=="function"?Utils.formatDateForInput(i.approvalDate):i.approvalDate?Utils.formatDate(i.approvalDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":i.expiryDate&&typeof Utils.formatDateForInput=="function"?Utils.formatDateForInput(i.expiryDate):i.expiryDate?Utils.formatDate(i.expiryDate):"","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":i.safetyReviewer||"",\u0627\u0644\u062D\u0627\u0644\u0629:this.getApprovedStatusLabel(i.status),\u0645\u0644\u0627\u062D\u0638\u0627\u062A:i.notes||""})),a=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(e);r["!cols"]=[{wch:30},{wch:16},{wch:28},{wch:24},{wch:16},{wch:18},{wch:22},{wch:16},{wch:40}],XLSX.utils.book_append_sheet(a,r,"\u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629");const o=`\u0627\u0644\u062C\u0647\u0627\u062A_\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(a,o),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D")},parseApprovedImportDate(t){if(t==null||t==="")return"";if(t instanceof Date)return isNaN(t.getTime())?"":t.toISOString();if(typeof t=="number"&&!Number.isNaN(t)){const r=Math.round((t-25569)*86400*1e3),o=new Date(r);return isNaN(o.getTime())?"":o.toISOString()}const e=String(t).trim();if(!e||e==="-")return"";if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const r=new Date(e+"T00:00:00");return isNaN(r.getTime())?"":r.toISOString()}const a=new Date(e);return isNaN(a.getTime())?"":a.toISOString()},getApprovedImportCell(t,...e){if(!t||typeof t!="object")return"";for(let r=0;r<e.length;r++){const o=e[r];if(o in t&&t[o]!==void 0&&t[o]!==null&&String(t[o]).trim()!=="")return t[o]}const a=Object.keys(t);for(let r=0;r<a.length;r++){const o=a[r];for(let i=0;i<e.length;i++)if(o&&o.replace(/\s+/g," ").trim()===e[i])return t[o]}return""},async importApprovedEntitiesFromExcelFile(t){if(this.ensureApprovedSetup(),!Permissions.isAdmin()){Notification.warning("\u064A\u064F\u0633\u0645\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u0628\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0626\u0645\u0629.");return}if(!t)return;if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.");return}const e={type:"array"};let a;try{const c=await t.arrayBuffer();a=XLSX.read(c,{type:"array",cellDates:!0})}catch{Notification.error("\u062A\u0639\u0630\u0631 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel.");return}const r=a.SheetNames[0],o=a.Sheets[r];if(!o){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0648\u0631\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const i=XLSX.utils.sheet_to_json(o,{defval:"",raw:!0});if(!Array.isArray(i)||i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0641\u064A \u0627\u0644\u0645\u0644\u0641.");return}let s=0,n=0,l=0;Loading.show();try{for(let c=0;c<i.length;c++){const p=i[c],f=String(this.getApprovedImportCell(p,"\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629","companyName")).trim();if(!f){l++;continue}const u=String(this.getApprovedImportCell(p,"\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629","entityType")).trim(),d=String(this.getApprovedImportCell(p,"\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629","\u0627\u0644\u0646\u0634\u0627\u0637","serviceType")).trim(),m=String(this.getApprovedImportCell(p,"\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635","\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A","licenseNumber")).trim(),v=this.parseApprovedImportDate(this.getApprovedImportCell(p,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F","approvalDate")),h=this.parseApprovedImportDate(this.getApprovedImportCell(p,"\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F","expiryDate"));if(!d||!v||!h){l++;continue}if(new Date(h)<new Date(v)){l++;continue}const w=String(this.getApprovedImportCell(p,"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","safetyReviewer")).trim(),b=String(this.getApprovedImportCell(p,"\u0627\u0644\u062D\u0627\u0644\u0629","status")).trim(),A=String(this.getApprovedImportCell(p,"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","notes")).trim(),C=this.normalizeApprovedEntityType(u||"\u0645\u0642\u0627\u0648\u0644"),k=this.normalizeApprovedStatus(b||"\u0645\u0639\u062A\u0645\u062F"),$=(AppState.appData.approvedContractors||[]).find(S=>S.companyName&&S.companyName.trim().toLowerCase()===f.toLowerCase()&&this.normalizeApprovedEntityType(S.entityType)===C),y={id:$?.id||Utils.generateId("APPCON"),companyName:f,entityType:C,serviceType:d,licenseNumber:m,approvalDate:v,expiryDate:h,safetyReviewer:w,status:k,notes:A,isoCode:$?.isoCode||$?.code||"",code:$?.code||$?.isoCode||"",createdAt:$?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};$?n++:s++,this.persistApprovedEntity(y,$||null)}Notification.success(`\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u0635\u0641\u0648\u0641 \u062C\u062F\u064A\u062F\u0629 ${s}\u060C \u062A\u062D\u062F\u064A\u062B ${n}\u060C \u062A\u062E\u0637\u064A ${l}.`),this.currentTab==="approved"&&this.refreshApprovedEntitiesList()}catch(c){Utils.safeError("\u0641\u0634\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",c),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(c.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{Loading.hide()}},exportApprovedEntitiesPDF(t=null){this.ensureApprovedSetup();const e=t?(AppState.appData.approvedContractors||[]).filter(a=>a.id===t):this.getFilteredApprovedEntities();if(!e.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Loading.show();const r=`
                <div class="section-title">\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>\u0627\u0644\u062C\u0647\u0629</th>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0627\u0644\u0646\u0634\u0627\u0637 / \u0627\u0644\u062E\u062F\u0645\u0629</th>
                            <th>\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                            <th>\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${e.map((c,p)=>`
                <tr>
                    <td>${p+1}</td>
                    <td>${Utils.escapeHTML(c.companyName||"")}</td>
                    <td>${this.getApprovedTypeLabel(c.entityType)}</td>
                    <td>${Utils.escapeHTML(c.serviceType||"")}</td>
                    <td>${Utils.escapeHTML(c.licenseNumber||"")}</td>
                    <td>${c.approvalDate?Utils.formatDate(c.approvalDate):"-"}</td>
                    <td>${c.expiryDate?Utils.formatDate(c.expiryDate):"-"}</td>
                    <td>${Utils.escapeHTML(c.safetyReviewer||"")}</td>
                    <td>${this.getApprovedStatusLabel(c.status)}</td>
                    <td>${Utils.escapeHTML(c.notes||"")}</td>
                </tr>
            `).join("")}
                    </tbody>
                </table>
            `,o=t?e[0]?.isoCode||`APPCON-${e[0]?.id?.substring(0,6)||""}`:`APPCON-LIST-${new Date().toISOString().slice(0,10)}`,i=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(o,t?"\u0646\u0645\u0648\u0630\u062C \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629":"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",r,!1,!0,{version:"1.0",qrData:t?`approved-contractor:${t}`:"approved-contractors:list"},e.reduce((c,p)=>{const f=new Date(p.createdAt||p.approvalDate||new Date);return!c||f<c?f:c},null)||new Date,new Date):r,s=new Blob([i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(s),l=window.open(n,"_blank");l?l.onload=()=>{setTimeout(()=>{l.print(),setTimeout(()=>{URL.revokeObjectURL(n)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(n),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(a){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",a),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: "+a.message)}},async renderEvaluationsSection(){const t=this.getApprovedOptions(!0),e=AppState.appData.contractors||[],a=t.length>0?t:e.map(c=>({id:c.id,name:c.name||c.company||c.contractorName||""})),r=a.length?a.map(c=>`<option value="${c.id}">${Utils.escapeHTML(c.name||"")}</option>`).join(""):"",o=a.length>0,i=this.renderEvaluationsTable(this.currentEvaluationFilter||""),s=this.isContractorApprovalAdminUser();this.ensureEvaluationApprovalRequestsSetup();const n=this.getMyEvaluationApprovalRequests(),l=s?this.getPendingEvaluationApprovalRequests():[];return`
            <div class="content-card contractors-evaluation-card" id="contractor-evaluation-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-4">
                        <div><h2 class="card-title flex items-center gap-2"><i class="fas fa-clipboard-check ml-2"></i>\u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">\u0642\u064A\u0627\u0633 \u0627\u0644\u0623\u062F\u0627\u0621\u060C \u0645\u0631\u0627\u062C\u0639\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u060C \u0648\u062A\u0648\u062B\u064A\u0642 \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u062A\u0623\u0647\u064A\u0644</p></div>
                        <div class="flex items-center gap-3 flex-wrap">
                            <select id="contractor-evaluation-filter" class="form-input" style="min-width: 220px;">
                                <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</option>
                                ${r}
                            </select>
                            <button id="add-contractor-evaluation-btn" class="btn-primary" ${o?"":"disabled"}>
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645
                            </button>
                            ${s?`
                                <button id="contractor-evaluation-settings-btn" class="btn-secondary">
                                    <i class="fas fa-sliders-h ml-2"></i>
                                    \u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645
                                </button>
                            `:""}
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-6">
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-list"></i>\u0637\u0644\u0628\u0627\u062A \u062A\u0642\u064A\u064A\u0645\u064A</h3>
                        <div id="my-evaluation-approval-requests-container">
                            ${this.renderApprovalRequestsTable(n,!1)}
                        </div>
                    </div>
                    ${s?`
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-clipboard-check"></i>\u0637\u0644\u0628\u0627\u062A \u062A\u0642\u064A\u064A\u0645 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0644\u0644\u0645\u062F\u064A\u0631)</h3>
                        <div id="pending-evaluation-approval-requests-container">
                            ${this.renderApprovalRequestsTable(l,!0)}
                        </div>
                    </div>
                    `:""}
                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-table"></i>\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629</h3>
                        <div id="contractor-evaluations-container">
                            ${i}
                        </div>
                    </div>
                </div>
            </div>
        `},renderEvaluationsTable(t=""){const e=AppState.appData.contractorEvaluations||[],a=new Map;e.forEach(o=>{const i=o.id||o.evaluationId;if(!i||t&&!this.evaluationMatchesContractorFilter(o,t))return;if(!a.has(i)){let n=o.finalScore;typeof n=="string"&&n!==""?(n=parseFloat(n),isNaN(n)&&(n=null)):typeof n!="number"&&(n=null);let l=o.compliantCount;typeof l=="string"&&(l=parseInt(l)||0);let c=o.totalItems;typeof c=="string"&&(c=parseInt(c)||0),n===null&&l>0&&c>0&&(n=Math.round(l/c*100));const p=Array.isArray(o.items)?o.items.map(f=>({criteriaId:f.criteriaId||f.id||"",title:f.title||f.label||"",status:f.status||"",notes:f.notes||""})):[];a.set(i,{id:i,contractorId:o.contractorId,contractorName:o.contractorName,evaluationDate:o.evaluationDate,evaluatorName:o.evaluatorName,projectName:o.projectName,location:o.location,generalNotes:o.generalNotes,compliantCount:l??0,totalItems:c??0,finalScore:n,finalRating:o.finalRating||"",isoCode:o.isoCode,createdAt:o.createdAt,updatedAt:o.updatedAt,createdBy:o.createdBy,updatedBy:o.updatedBy,items:p})}const s=a.get(i);(o.criteriaId||o.title)&&s.items.push({criteriaId:o.criteriaId,title:o.title,status:o.status,notes:o.notes})});const r=Array.from(a.values()).sort((o,i)=>{const s=new Date(o.evaluationDate||o.createdAt||0);return new Date(i.evaluationDate||i.createdAt||0)-s});return r.length===0?`
                <div class="empty-state">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629${t?" \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":""}</p>
                </div>
            `:`
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                            <th>\u0627\u0644\u0645\u0642\u064A\u0651\u0645</th>
                            <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                            <th>\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</th>
                            <th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F</th>
                            <th>\u0627\u0644\u0646\u0633\u0628\u0629</th>
                            <th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${r.map(o=>`
                            <tr>
                                <td>${Utils.escapeHTML(o.contractorName||"")}</td>
                                <td>${o.evaluationDate?Utils.formatDate(o.evaluationDate):"-"}</td>
                                <td>${Utils.escapeHTML(o.evaluatorName||"")}</td>
                                <td>${Utils.escapeHTML(this.formatEvaluationLocationDisplay(o))}</td>
                                <td>${o.compliantCount??0}</td>
                                <td>${o.totalItems??(Array.isArray(o.items)?o.items.length:o.items?Object.keys(o.items).length:0)}</td>
                                <td>${typeof o.finalScore=="number"?o.finalScore.toFixed(0)+"%":"-"}</td>
                                <td>
                                    <span class="badge ${o.finalScore>=90?"badge-success":o.finalScore>=75?"badge-info":o.finalScore>=60?"badge-warning":"badge-danger"}">
                                        ${Utils.escapeHTML(o.finalRating||"")}
                                    </span>
                                </td>
                                <td>
                                    <div class="flex items-center gap-2">
                                        <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewEvaluation('${o.id}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${Permissions.isAdmin()?`
                                        <button class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" onclick="Contractors.showEvaluationForm('${o.contractorId}', ${JSON.stringify(o).replace(/"/g,"&quot;")})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" onclick="Contractors.requestDeleteEvaluation('${o.id}')">
                                            <i class="fas fa-trash"></i>
                                            </button>
                                        `:""}
                                        <button class="btn-icon btn-icon-success" title="\u062A\u0635\u062F\u064A\u0631 PDF" onclick="Contractors.exportEvaluationPDF('${o.id}')">
                                            <i class="fas fa-file-pdf"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},async renderRequirementsManagementSection(){if(!(AppState.currentUser&&AppState.currentUser.role==="admin"))return`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637</p>
                        </div>
                    </div>
                </div>
            `;this.ensureRequirementsSetup();const e=this.getApprovalRequirements(),a={};e.forEach(o=>{const i=o.category||"other";a[i]||(a[i]=[]),a[i].push(o)});const r={total:e.length,required:e.filter(o=>o.required).length,withExpiry:e.filter(o=>o.hasExpiry).length,critical:e.filter(o=>o.priority==="critical").length};return`
            <div class="content-card contractors-requirements-card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div><h2 class="card-title"><i class="fas fa-cog ml-2"></i>\u0625\u062F\u0627\u0631\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2><p style="margin:4px 0 0;color:#d9ebf3;font-size:.68rem;">\u062D\u0648\u0643\u0645\u0629 \u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0625\u0644\u0632\u0627\u0645\u064A\u0629 \u0648\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A \u0648\u0645\u062F\u062F \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</p></div>
                        <div class="flex items-center gap-3">
                            <button onclick="Contractors.exportRequirementsTemplate()" class="btn-secondary btn-sm">
                                <i class="fas fa-file-excel ml-2 text-green-600"></i>
                                \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0644\u0628 Excel
                            </button>
                            <button onclick="Contractors.importRequirementsTemplate()" class="btn-secondary btn-sm">
                                <i class="fas fa-file-import ml-2"></i>
                                \u0627\u0633\u062A\u064A\u0631\u0627\u062F Excel
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0633\u0631\u064A\u0639\u0629 -->
                    <div class="contractors-requirements-kpis mb-6">
                        <div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-blue-600 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A</p>
                                    <p class="text-2xl font-bold text-blue-800">${r.total}</p>
                                </div>
                                <i class="fas fa-list text-3xl text-blue-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-red-600 mb-1">\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0637\u0644\u0648\u0628\u0629</p>
                                    <p class="text-2xl font-bold text-red-800">${r.required}</p>
                                </div>
                                <i class="fas fa-exclamation-circle text-3xl text-red-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-orange-600 mb-1">\u0645\u0639 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621</p>
                                    <p class="text-2xl font-bold text-orange-800">${r.withExpiry}</p>
                                </div>
                                <i class="fas fa-calendar-times text-3xl text-orange-400"></i>
                            </div>
                        </div>
                        <div class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-purple-600 mb-1">\u0623\u0648\u0644\u0648\u064A\u0629 \u062D\u0631\u062C\u0629</p>
                                    <p class="text-2xl font-bold text-purple-800">${r.critical}</p>
                                </div>
                                <i class="fas fa-exclamation-triangle text-3xl text-purple-400"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <div class="flex items-start gap-3">
                            <i class="fas fa-info-circle text-blue-600 text-xl mt-1"></i>
                            <div class="flex-1">
                                <p class="text-sm font-semibold text-blue-900 mb-1">\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u062A\u0642\u062F\u0645</p>
                                <p class="text-sm text-blue-700">
                                    \u064A\u0645\u0643\u0646\u0643 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0628\u0634\u0643\u0644 \u0645\u062A\u0637\u0648\u0631 \u0645\u0639 \u062F\u0639\u0645 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A\u060C \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A\u060C \u0648\u062A\u0648\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621. 
                                    \u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0633\u062D\u0628 \u0648\u0627\u0644\u0625\u0641\u0644\u0627\u062A \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- \u0641\u0644\u062A\u0631 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629 -->
                    <div class="mb-4 flex items-center gap-3 flex-wrap">
                        <label class="text-sm font-semibold text-gray-700">\u0641\u0644\u062A\u0631 \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629:</label>
                        <button onclick="Contractors.filterRequirementsByCategory('all')" 
                            class="requirement-category-filter active px-4 py-2 rounded-lg text-sm font-medium transition-all"
                            data-category="all">
                            <i class="fas fa-th ml-2"></i>
                            \u0627\u0644\u0643\u0644
                        </button>
                        ${Object.values(REQUIREMENT_CATEGORIES).map(o=>`
                            <button onclick="Contractors.filterRequirementsByCategory('${o.id}')" 
                                class="requirement-category-filter px-4 py-2 rounded-lg text-sm font-medium transition-all"
                                data-category="${o.id}"
                                style="border: 2px solid ${o.color}; color: ${o.color};">
                                <i class="fas ${o.icon} ml-2"></i>
                                ${o.label}
                            </button>
                        `).join("")}
                    </div>
                    
                    <!-- \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0639 \u0627\u0644\u062A\u0635\u0646\u064A\u0641\u0627\u062A -->
                    <div id="requirements-list" class="space-y-4 mb-4">
                        ${Object.keys(a).map(o=>{const i=REQUIREMENT_CATEGORIES[o]||REQUIREMENT_CATEGORIES.other,s=a[o];return`
                                <div class="requirement-category-group" data-category="${o}">
                                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div class="w-1 h-8 rounded" style="background: ${i.color};"></div>
                                        <i class="fas ${i.icon} text-xl" style="color: ${i.color};"></i>
                                        <h3 class="text-lg font-bold text-gray-800">${i.label}</h3>
                                        <span class="badge badge-info">${s.length} \u0627\u0634\u062A\u0631\u0627\u0637</span>
                                    </div>
                                    <div class="space-y-3 ml-6">
                                        ${s.map((n,l)=>{const c=REQUIREMENT_PRIORITIES[n.priority]||REQUIREMENT_PRIORITIES.medium;return`
                                                <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                                                     data-requirement-id="${n.id}"
                                                     data-category="${o}"
                                                     draggable="true"
                                                     style="border-color: ${c.color}20;">
                                                    <div class="flex items-start gap-4">
                                                        <!-- Handle for drag -->
                                                        <div class="drag-handle cursor-grab active:cursor-grabbing pt-1">
                                                            <i class="fas fa-grip-vertical text-gray-400 text-xl"></i>
                                                        </div>
                                                        
                                                        <div class="flex-1">
                                                            <div class="flex items-center gap-3 mb-3">
                                                                <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${c.color}20; color: ${c.color};">
                                                                    ${c.label}
                                                                </span>
                                                                <span class="text-sm font-semibold text-gray-500">#${n.order}</span>
                                                                ${n.required?'<span class="badge badge-danger text-xs">\u0645\u0637\u0644\u0648\u0628</span>':'<span class="badge badge-secondary text-xs">\u0627\u062E\u062A\u064A\u0627\u0631\u064A</span>'}
                                                                ${n.hasExpiry?`<span class="badge badge-warning text-xs"><i class="fas fa-calendar ml-1"></i> ${n.expiryMonths} \u0634\u0647\u0631</span>`:""}
                                                            </div>
                                                            
                                                            <input type="text" 
                                                                class="form-input mb-3 font-semibold text-gray-800" 
                                                                value="${Utils.escapeHTML(n.label)}"
                                                                data-field="label"
                                                                placeholder="\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637">
                                                            
                                                            ${n.description?`
                                                                <textarea class="form-input mb-3 text-sm" 
                                                                    data-field="description"
                                                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637"
                                                                    rows="2">${Utils.escapeHTML(n.description||"")}</textarea>
                                                            `:`
                                                                <textarea class="form-input mb-3 text-sm" 
                                                                    data-field="description"
                                                                    placeholder="\u0648\u0635\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"
                                                                    rows="2"></textarea>
                                                            `}
                                                            
                                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                                <select class="form-input text-sm" data-field="type">
                                                                    <option value="document" ${n.type==="document"?"selected":""}>\u{1F4C4} \u0645\u0633\u062A\u0646\u062F</option>
                                                                    <option value="checkbox" ${n.type==="checkbox"?"selected":""}>\u2611\uFE0F \u0645\u0631\u0628\u0639 \u0627\u062E\u062A\u064A\u0627\u0631</option>
                                                                    <option value="text" ${n.type==="text"?"selected":""}>\u{1F4DD} \u0646\u0635</option>
                                                                </select>
                                                                
                                                                <select class="form-input text-sm" data-field="category">
                                                                    ${Object.values(REQUIREMENT_CATEGORIES).map(p=>`
                                                                        <option value="${p.id}" ${n.category===p.id?"selected":""}>${p.label}</option>
                                                                    `).join("")}
                                                                </select>
                                                                
                                                                <select class="form-input text-sm" data-field="priority">
                                                                    ${Object.values(REQUIREMENT_PRIORITIES).map(p=>`
                                                                        <option value="${p.id}" ${n.priority===p.id?"selected":""}>${p.label}</option>
                                                                    `).join("")}
                                                                </select>
                                                                
                                                                <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                                    <input type="checkbox" 
                                                                        data-field="required" 
                                                                        ${n.required?"checked":""}
                                                                        class="cursor-pointer">
                                                                    <span class="text-sm text-gray-700">\u0645\u0637\u0644\u0648\u0628</span>
                                                                </label>
                                                            </div>
                                                            
                                                            <div class="grid grid-cols-2 gap-3 mt-3">
                                                                <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                                    <input type="checkbox" 
                                                                        data-field="hasExpiry" 
                                                                        ${n.hasExpiry?"checked":""}
                                                                        class="cursor-pointer"
                                                                        onchange="Contractors.toggleExpiryFields(this)">
                                                                    <span class="text-sm text-gray-700">\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621</span>
                                                                </label>
                                                                ${n.hasExpiry?`
                                                                    <div class="expiry-fields">
                                                                        <input type="number" 
                                                                            class="form-input text-sm" 
                                                                            value="${n.expiryMonths||12}"
                                                                            data-field="expiryMonths"
                                                                            placeholder="\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u0647\u0631"
                                                                            min="1" max="60">
                                                                    </div>
                                                                `:`
                                                                    <div class="expiry-fields" style="display: none;">
                                                                        <input type="number" 
                                                                            class="form-input text-sm" 
                                                                            value="12"
                                                                            data-field="expiryMonths"
                                                                            placeholder="\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u0647\u0631"
                                                                            min="1" max="60">
                                                                    </div>
                                                                `}
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="flex flex-col gap-2">
                                                            <button onclick="Contractors.moveRequirementUp('${n.id}')" 
                                                                class="btn-icon btn-icon-info" 
                                                                title="\u0646\u0642\u0644 \u0644\u0623\u0639\u0644\u0649"
                                                                ${l===0?"disabled":""}>
                                                                <i class="fas fa-arrow-up"></i>
                                                            </button>
                                                            <button onclick="Contractors.moveRequirementDown('${n.id}')" 
                                                                class="btn-icon btn-icon-info" 
                                                                title="\u0646\u0642\u0644 \u0644\u0623\u0633\u0641\u0644"
                                                                ${l===s.length-1?"disabled":""}>
                                                                <i class="fas fa-arrow-down"></i>
                                                            </button>
                                                            <button onclick="Contractors.deleteRequirement('${n.id}')" 
                                                                class="btn-icon btn-icon-danger" 
                                                                title="\u062D\u0630\u0641">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            `}).join("")}
                                    </div>
                                </div>
                            `}).join("")}
                    </div>
                    
                    <div class="flex items-center justify-between pt-4 border-t">
                        <div class="flex items-center gap-3">
                            <button onclick="Contractors.addNewRequirement()" class="btn-secondary">
                                <i class="fas fa-plus ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u0627\u0634\u062A\u0631\u0627\u0637 \u062C\u062F\u064A\u062F
                            </button>
                            <button onclick="Contractors.bulkEditRequirements()" class="btn-secondary">
                                <i class="fas fa-edit ml-2"></i>
                                \u062A\u0639\u062F\u064A\u0644 \u062C\u0645\u0627\u0639\u064A
                            </button>
                        </div>
                        <button onclick="Contractors.saveRequirements()" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            \u062D\u0641\u0638 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A
                        </button>
                    </div>
                </div>
            </div>
        `},ensureApprovedTabEventListeners(){const t=(n,l)=>{const c=document.getElementById(n);!c||c.hasAttribute("data-listener-attached")||(c.setAttribute("data-listener-attached","true"),c.addEventListener("click",l))};t("export-approved-contractors-excel-btn",()=>this.exportApprovedEntitiesExcel()),t("export-approved-contractors-pdf-btn",()=>this.exportApprovedEntitiesPDF());const e=document.getElementById("import-approved-contractors-excel-btn"),a=document.getElementById("import-approved-contractors-input");e&&a&&!e.hasAttribute("data-listener-attached")&&(e.setAttribute("data-listener-attached","true"),e.addEventListener("click",()=>{try{a.value="",a.click()}catch{}}),a.hasAttribute("data-listener-attached")||(a.setAttribute("data-listener-attached","true"),a.addEventListener("change",n=>{const l=n.target?.files?.[0];l&&this.importApprovedEntitiesFromExcelFile(l).finally(()=>{try{n.target.value=""}catch{}})})));const r=document.getElementById("approved-contractors-search");r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),this.approvedFilters?.search&&(r.value=this.approvedFilters.search),r.addEventListener("input",n=>{const l=n.target.value||"";this.approvedFilters.search=l,this.updateApprovedFiltersMeta(),clearTimeout(this._approvedSearchFilterTimer),this._approvedSearchFilterTimer=setTimeout(()=>{this.currentTab==="approved"&&this.refreshApprovedEntitiesList()},180)})),t("approved-contractors-search-clear",()=>{const n=document.getElementById("approved-contractors-search");n&&(n.value=""),clearTimeout(this._approvedSearchFilterTimer),this.handleApprovedFilterChange("search","")});const o=document.getElementById("approved-contractors-status");o&&!o.hasAttribute("data-listener-attached")&&(o.setAttribute("data-listener-attached","true"),o.addEventListener("change",n=>{this.handleApprovedFilterChange("status",n.target.value||"")}));const i=document.getElementById("approved-contractors-type");i&&!i.hasAttribute("data-listener-attached")&&(i.setAttribute("data-listener-attached","true"),i.addEventListener("change",n=>{this.handleApprovedFilterChange("type",n.target.value||"")}));const s=document.getElementById("approved-contractors-validity");s&&!s.hasAttribute("data-listener-attached")&&(s.setAttribute("data-listener-attached","true"),s.addEventListener("change",n=>{this.handleApprovedFilterChange("validity",n.target.value||"")})),t("approved-contractors-reset",()=>this.resetApprovedFilters())},setupEventListeners(){const t=this._abortController?.signal;if(!t)return;this._eventListenersAttached=!0,this.ensureApprovedTabEventListeners();const e=document.getElementById("add-contractor-evaluation-btn");e&&e.addEventListener("click",()=>this.handleAddEvaluationClick(),{signal:t});const a=document.getElementById("contractor-evaluation-filter");a&&(this.currentEvaluationFilter&&(a.value=this.currentEvaluationFilter),a.addEventListener("change",s=>{this.currentEvaluationFilter=s.target.value||"",this.refreshEvaluationsList(this.currentEvaluationFilter)},{signal:t}));const r=document.getElementById("contractor-evaluation-settings-btn");r&&r.addEventListener("click",()=>this.openEvaluationSettings(),{signal:t});const o=document.getElementById("manage-requirements-btn");o&&o.addEventListener("click",()=>this.openRequirementsManagement(),{signal:t});const i=document.getElementById("send-approval-request-btn");i&&i.addEventListener("click",()=>this.showApprovalRequestForm(),{signal:t})},setupRealtimeListeners(){},ensureEvaluationsEventListeners(){const t=document.getElementById("add-contractor-evaluation-btn");t&&!t.hasAttribute("data-listener-attached")&&(t.setAttribute("data-listener-attached","true"),t.addEventListener("click",()=>this.handleAddEvaluationClick()));const e=document.getElementById("contractor-evaluation-settings-btn");e&&!e.hasAttribute("data-listener-attached")&&(e.setAttribute("data-listener-attached","true"),e.addEventListener("click",()=>this.openEvaluationSettings()));const a=document.getElementById("contractor-evaluation-filter");a&&!a.hasAttribute("data-listener-attached")&&(a.setAttribute("data-listener-attached","true"),this.currentEvaluationFilter&&(a.value=this.currentEvaluationFilter),a.addEventListener("change",r=>{this.currentEvaluationFilter=r.target.value||"",this.refreshEvaluationsList(this.currentEvaluationFilter)}))},handleAddEvaluationClick(){const t=this.getApprovedOptions(!0),e=AppState.appData.contractors||[],a=t.length>0?t:e.map(i=>({id:i.id,name:i.name||i.company||i.contractorName||""}));if(a.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B.");return}const o=document.getElementById("contractor-evaluation-filter")?.value||"";if(o){this.showEvaluationForm(o);return}if(a.length===1){this.showEvaluationForm(a[0].id);return}this.showEvaluationContractorPicker()},showEvaluationContractorPicker(){const t=this.getApprovedOptions(!0),e=AppState.appData.contractors||[],a=t.length>0?t:e.map(i=>({id:i.id,name:i.name||i.company||i.contractorName||""}));if(a.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B.");return}const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
            <div class="modal-content" style="max-width: 480px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-evaluation-picker" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</label>
                            <select id="contractor-evaluation-picker-select" class="form-input" required>
                                <option value="">-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --</option>
                                ${a.map(i=>`
                                    <option value="${i.id}">${Utils.escapeHTML(i.name||"")}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div class="flex items-center justify-end gap-3">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-arrow-right ml-2"></i>
                                \u0645\u062A\u0627\u0628\u0639\u0629
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(r),this.applyModuleI18n(r),r.querySelector("#contractor-evaluation-picker")?.addEventListener("submit",i=>{i.preventDefault();const n=r.querySelector("#contractor-evaluation-picker-select")?.value||"";if(!n){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B");return}r.remove(),this.showEvaluationForm(n)}),r.addEventListener("click",i=>{i.target===r&&r.remove()})},ensureEvaluationSetup(){let t=!1;Array.isArray(AppState.appData.contractorEvaluations)||(AppState.appData.contractorEvaluations=[],t=!0);const e=AppState.appData.contractorEvaluationCriteria;if(!Array.isArray(e)||e.length===0)AppState.appData.contractorEvaluationCriteria=CONTRACTOR_EVALUATION_DEFAULT_ITEMS.map((a,r)=>({id:`criteria_${r+1}`,label:a})),t=!0;else{const a=e.map((r,o)=>typeof r=="string"?(t=!0,{id:`criteria_${o+1}`,label:r.trim()}):{id:r.id||`criteria_${o+1}`,label:(r.label||r.title||"").trim()}).filter(r=>r.label);a.length!==e.length&&(t=!0),AppState.appData.contractorEvaluationCriteria=a}t&&(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},getEvaluationCriteria(){return this.ensureEvaluationSetup(),(AppState.appData.contractorEvaluationCriteria||[]).map((t,e)=>({id:t.id||`criteria_${e+1}`,label:t.label||t.title||""})).filter(t=>t.label)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,e)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${e+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0627\u0646\u0639:",t),[]}},getPlaceOptions(t){try{if(!t)return[];const e=String(t);if(typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)){const a=Permissions.formSettingsState.sites.find(r=>String(r.id)===e);if(a&&Array.isArray(a.places))return a.places.map(r=>({id:r.id,name:r.name}))}if(Array.isArray(AppState.appData?.observationSites)){const a=AppState.appData.observationSites.find(r=>String(r.id||r.siteId)===e);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((o,i)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${i+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const a=DailyObservations.DEFAULT_SITES.find(r=>String(r.id||r.siteId)===e);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((o,i)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${i+1}`}))}return[]}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:",e),[]}},resolveEvaluationFactoryId(t){if(!t)return"";const e=t.factoryId||t.locationId;if(e)return String(e);const a=String(t.projectName||"").trim();if(!a)return"";const r=this.getSiteOptions().find(o=>o.name===a||String(o.id)===a);return r?String(r.id):""},resolveEvaluationSubLocationId(t,e){if(!t)return"";const a=t.subLocationId;if(a)return String(a);const r=String(t.location||"").trim();if(!r||!e)return"";const o=this.getPlaceOptions(e).find(i=>i.name===r||String(i.id)===r);return o?String(o.id):""},evaluationMatchesContractorFilter(t,e){if(!e)return!0;if(!t)return!1;if(t.contractorId===e)return!0;const r=(AppState.appData.approvedContractors||[]).find(i=>i.id===e||i.contractorId===e);if(r){if(t.contractorId===r.id||t.contractorId===r.contractorId)return!0;const i=String(t.contractorName||"").trim().toLowerCase(),s=String(r.companyName||"").trim().toLowerCase();if(i&&s&&i===s)return!0}const o=(AppState.appData.contractors||[]).find(i=>i.id===e);if(o){const i=String(t.contractorName||"").trim().toLowerCase(),s=String(o.name||o.company||o.contractorName||"").trim().toLowerCase();if(t.contractorId===o.id||i&&s&&i===s)return!0}return!1},formatEvaluationLocationDisplay(t){if(!t)return"";const e=t.projectName||"",a=t.location||"";return e&&a?`${e} \u2014 ${a}`:e||a||""},collectEvaluationLocationFromForm(t){const e=t?.querySelector("#contractor-evaluation-factory"),a=t?.querySelector("#contractor-evaluation-sub-location"),r=e?.value||"",o=a?.value||"",i=e?.options[e.selectedIndex],s=a?.options[a.selectedIndex];return{factoryId:r,locationId:r,projectName:i?.text?.trim()||"",subLocationId:o,location:s?.text?.trim()||""}},bindEvaluationLocationSelects(t){if(!t)return;const e=t.querySelector("#contractor-evaluation-factory"),a=t.querySelector("#contractor-evaluation-sub-location");if(!e||!a)return;const r=o=>{const i=e.value||"",s=o?a.value:"";a.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',this.getPlaceOptions(i).forEach(n=>{const l=document.createElement("option");l.value=String(n.id),l.textContent=n.name,a.appendChild(l)}),s&&Array.from(a.options).some(n=>n.value===s)&&(a.value=s)};e.addEventListener("change",()=>r(!1)),e.value&&a.options.length<=1&&r(!0)},prepareApprovalRequestPayloadForBackend(t){const e=JSON.parse(JSON.stringify(t||{}));delete e._isPendingSync,delete e._syncError,delete e._syncErrorMessage,delete e.attachmentFiles;const a=AppState?.googleConfig?.sheets?.spreadsheetId;if(a&&String(a).trim()&&a!=="YOUR_SPREADSHEET_ID_HERE"&&(e.spreadsheetId=String(a).trim()),e.requestType==="evaluation"&&e.evaluationData&&typeof e.evaluationData=="object"){const r=e.evaluationData;Array.isArray(r.items)&&(r.totalItems=r.totalItems??r.items.length)}return e},parseEvaluationDataFromRequest(t){if(!t)return null;let e=t.evaluationData,a=0;for(;e&&typeof e=="string"&&a<3;)try{e=JSON.parse(e),a++}catch{break}(!e||typeof e!="object")&&(e={});let r=0;for(;e.items&&typeof e.items=="string"&&r<3;)try{e.items=JSON.parse(e.items),r++}catch{e.items=[];break}return Array.isArray(e.items)||(e.items=e.items?Object.values(e.items):[]),e.id=e.id||t.entityId||t.evaluationId||Utils.generateId("CTREVAL"),e.contractorId=e.contractorId||t.contractorId||"",e.contractorName=e.contractorName||t.contractorName||t.companyName||"",e.evaluationDate=e.evaluationDate||t.evaluationDate||new Date().toISOString(),e.evaluatorName=e.evaluatorName||t.evaluatorName||t.createdByName||"",e.projectName=e.projectName||t.projectName||"",e.location=e.location||t.location||"",e.compliantCount=e.compliantCount??t.compliantCount??0,e.totalItems=e.totalItems??t.totalItems??e.items.length,e.finalScore=e.finalScore??t.finalScore??null,e.finalRating=e.finalRating||t.finalRating||"",e.generalNotes=e.generalNotes||t.generalNotes||t.notes||"",e},collectEvaluationItems(t){if(!t||!document.contains(t))return[];try{return Array.from(t.querySelectorAll("tbody tr[data-criteria-id]")).map(e=>{if(!document.contains(e))return null;const a=e.getAttribute("data-criteria-id")||"",r=e.getAttribute("data-criteria-label")||"",o=e.querySelector('input[type="radio"]:checked'),i=o&&document.contains(o)?o.value:"",s=e.querySelector("textarea"),n=s&&document.contains(s)?s.value.trim():"";return{criteriaId:a,title:r,status:i,notes:n}}).filter(e=>e!==null)}catch(e){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A collectEvaluationItems:",e),[]}},calculateEvaluationSummary(t){const e=t.filter(s=>s.status==="compliant"||s.status==="non_compliant"),a=e.filter(s=>s.status==="compliant").length,r=e.length,o=r>0?Math.round(a/r*100):null,i=this.getFinalRating(o,r);return{compliantCount:a,totalItems:r,finalScore:o,finalRating:i}},bindEvaluationFormInteractions(t){if(!t)return;const e=()=>{if(!t||!document.contains(t)){Utils.safeLog("\u26A0\uFE0F updateSummary: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}const r=this.collectEvaluationItems(t),o=this.calculateEvaluationSummary(r),i=t.querySelector("#contractor-evaluation-compliant"),s=t.querySelector("#contractor-evaluation-total"),n=t.querySelector("#contractor-evaluation-final-score"),l=t.querySelector("#contractor-evaluation-final-rating");if(!i||!s||!n||!l){Utils.safeLog("\u26A0\uFE0F updateSummary: \u0628\u0639\u0636 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(i&&(i.value=o.compliantCount??0),s&&(s.value=o.totalItems??0),n&&(n.value=o.finalScore!==null?o.finalScore.toFixed(0)+"%":""),l&&(l.value=o.finalRating||""),i){const c=parseInt(i.value)||0;i.style.background=c>0?"#dcfce7":"#f1f5f9",i.style.borderColor=c>0?"#10b981":"#cbd5e1",i.style.color=c>0?"#059669":"#64748b"}if(n){const c=parseFloat(n.value)||0;let p="#f1f5f9",f="#cbd5e1",u="#64748b";c>=80?(p="#dcfce7",f="#10b981",u="#059669"):c>=60?(p="#fef3c7",f="#f59e0b",u="#d97706"):c>0&&(p="#fee2e2",f="#ef4444",u="#dc2626"),n.style.background=p,n.style.borderColor=f,n.style.color=u}if(l){const c=l.value.toLowerCase();let p="#f1f5f9",f="#cbd5e1",u="#64748b";c.includes("\u0645\u0645\u062A\u0627\u0632")||c.includes("excellent")?(p="#dcfce7",f="#10b981",u="#059669"):c.includes("\u062C\u064A\u062F")||c.includes("good")?(p="#dbeafe",f="#3b82f6",u="#1e40af"):c.includes("\u0645\u0642\u0628\u0648\u0644")||c.includes("acceptable")?(p="#fef3c7",f="#f59e0b",u="#d97706"):(c.includes("\u0636\u0639\u064A\u0641")||c.includes("poor"))&&(p="#fee2e2",f="#ef4444",u="#dc2626"),l.style.background=p,l.style.borderColor=f,l.style.color=u}},a=()=>{if(!(!t||!document.contains(t)))try{t.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(r=>{if(!document.contains(r))return;const o=r.closest("label"),i=r.closest("tr"),s=r.value==="compliant"&&r.checked,n=r.value==="non_compliant"&&r.checked;if(o&&document.contains(o))if(s){o.style.background="#dcfce7",o.style.border="2px solid #10b981";const l=o.querySelector("span");l&&(l.style.color="#059669")}else if(n){o.style.background="#fee2e2",o.style.border="2px solid #ef4444";const l=o.querySelector("span");l&&(l.style.color="#dc2626")}else{o.style.background="#f1f5f9",o.style.border="2px solid #cbd5e1";const l=o.querySelector("span");l&&(l.style.color="#64748b")}})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A updateRadioButtonStyles:",r)}};try{t.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(r=>{r.addEventListener("change",()=>{if(!t||!document.contains(t))return;const o=r.closest("tr");o&&document.contains(o)&&o.querySelectorAll('input[type="radio"]').forEach(i=>{if(!document.contains(i))return;const s=i.closest("label");if(s&&document.contains(s)&&!i.checked){s.style.background="#f1f5f9",s.style.border="2px solid #cbd5e1";const n=s.querySelector("span");n&&(n.style.color="#64748b")}}),a(),e()})})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F event listeners \u0644\u0631\u0627\u062F\u064A\u0648 buttons:",r)}try{t.querySelectorAll("label").forEach(r=>{if(!document.contains(r))return;const o=r.querySelector('input[type="radio"]');o&&document.contains(o)&&(r.addEventListener("mouseenter",()=>{!document.contains(r)||!document.contains(o)||o.checked||(r.style.transform="scale(1.05)",r.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)")}),r.addEventListener("mouseleave",()=>{!document.contains(r)||!document.contains(o)||o.checked||(r.style.transform="scale(1)",r.style.boxShadow="none")}))})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F hover effects:",r)}try{t.querySelectorAll(".form-input").forEach(r=>{document.contains(r)&&(r.addEventListener("focus",()=>{document.contains(r)&&(r.style.borderColor="#2563eb",r.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)")}),r.addEventListener("blur",()=>{document.contains(r)&&(r.style.boxShadow="none")}))})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F focus styles:",r)}a(),e()},showEvaluationForm(t,e=null,a=null){this.ensureEvaluationSetup();const r=AppState.appData.contractors||[];let o=r.find(y=>y.id===t)||null;if(!o){this.ensureApprovedSetup();const S=(AppState.appData.approvedContractors||[]).find(D=>D.id===t||D.contractorId===t);S&&(o={id:S.contractorId||S.id,name:S.companyName,company:S.companyName,contractorName:S.companyName,serviceType:S.serviceType,isFromApproved:!0})}if(!o&&e){const y=e.contractorId;if(y&&(o=r.find(S=>S.id===y)||null,!o)){this.ensureApprovedSetup();const D=(AppState.appData.approvedContractors||[]).find(T=>T.id===y||T.contractorId===y);D&&(o={id:D.contractorId||D.id,name:D.companyName,company:D.companyName,contractorName:D.companyName,serviceType:D.serviceType,isFromApproved:!0})}}if(!o&&e){const y=e.contractorId;if(y&&(o=r.find(S=>S.id===y)||null,!o)){this.ensureApprovedSetup();const D=(AppState.appData.approvedContractors||[]).find(T=>T.id===y||T.contractorId===y);D&&(o={id:D.contractorId||D.id,name:D.companyName,company:D.companyName,contractorName:D.companyName,serviceType:D.serviceType,isFromApproved:!0})}}if(!o&&!e){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.getEvaluationCriteria();if(i.length===0){Notification.error("\u0642\u0627\u0626\u0645\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}let s=e;if(e&&e.id){const y=this.getEvaluationWithItems(e.id);y&&(s=y)}const n=Array.isArray(s?.items)?s.items:[],l=new Map(n.map(y=>[(y.criteriaId||y.id||y.title||"").toString(),y])),c=i.map(y=>{const S=l.get(y.id)||l.get(y.label)||null;return{criteriaId:y.id,title:y.label,status:S?.status||"",notes:S?.notes||""}}),p=this.calculateEvaluationSummary(c),f=s?.evaluationDate?new Date(s.evaluationDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),u=s?.evaluatorName||AppState.currentUser?.name||"",d=s?.generalNotes||s?.notes||"",m=this.resolveEvaluationFactoryId(s),v=this.resolveEvaluationSubLocationId(s,m),h=this.getSiteOptions(),w=m?this.getPlaceOptions(m):[],b=a||s?.contractorName||o?.name||o?.company||o?.contractorName||"",A=document.createElement("div");A.className="modal-overlay",A.innerHTML=`
            <div class="modal-content" style="max-width: 95vw; width: 1400px; max-height: 95vh;">
                <div class="modal-header" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-bottom: none; padding: 1.75rem 2rem;">
                    <h2 class="modal-title" style="color: #ffffff; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-clipboard-check" style="font-size: 1.5rem;"></i>
                        ${e?"\u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u062A\u0623\u0647\u064A\u0644\u0647"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="color: #ffffff; background: rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 0.5rem 0.75rem; transition: all 0.3s ease;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="padding: 2rem; background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);">
                    <form id="contractor-evaluation-form" class="space-y-6">
                        <div style="background: #ffffff; border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                                \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644</label>
                                    <input type="text" class="form-input" value="${Utils.escapeHTML(b)}" readonly style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645 <span style="color: #ef4444;">*</span></label>
                                    <input type="date" id="contractor-evaluation-date" class="form-input" required value="${f}" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645 <span style="color: #ef4444;">*</span></label>
                                    <input type="text" id="contractor-evaluation-evaluator" class="form-input" required value="${Utils.escapeHTML(u)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0630\u064A \u0642\u0627\u0645 \u0628\u0627\u0644\u062A\u0642\u064A\u064A\u0645" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                    <select id="contractor-evaluation-factory" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                        ${h.map(y=>`
                                            <option value="${Utils.escapeHTML(String(y.id))}" ${String(y.id)===String(m)?"selected":""}>${Utils.escapeHTML(y.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="contractor-evaluation-sub-location" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${w.map(y=>`
                                            <option value="${Utils.escapeHTML(String(y.id))}" ${String(y.id)===String(v)?"selected":""}>${Utils.escapeHTML(y.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629</label>
                                    <textarea id="contractor-evaluation-general-notes" class="form-input" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629 \u062D\u0648\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">${Utils.escapeHTML(d)}</textarea>
                                </div>
                            </div>
                        </div>

                        <div style="background: #ffffff; border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #1e293b; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-list-check" style="color: #2563eb;"></i>
                                \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645
                            </h3>
                            <div class="table-wrapper" style="overflow-x: auto; border-radius: 8px; border: 1px solid #e2e8f0;">
                                <table class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                    <thead>
                                        <tr style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);">
                                            <th style="width: 60px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">#</th>
                                            <th style="padding: 1rem; text-align: right; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">\u0628\u0646\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                                            <th style="width: 140px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">\u0645\u0637\u0627\u0628\u0642</th>
                                            <th style="width: 140px; padding: 1rem; text-align: center; color: #ffffff; font-weight: 700; border: none; border-right: 1px solid rgba(255, 255, 255, 0.2);">\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</th>
                                            <th style="padding: 1rem; text-align: right; color: #ffffff; font-weight: 700; border: none;">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${c.map((y,S)=>`
                                            <tr data-criteria-id="${y.criteriaId}" data-criteria-label="${Utils.escapeHTML(y.title).replace(/"/g,"&quot;")}" style="border-bottom: 1px solid #e2e8f0; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='#ffffff'">
                                                <td style="padding: 1rem; text-align: center; font-weight: 600; color: #64748b; background: #f8fafc; border-right: 1px solid #e2e8f0;">${S+1}</td>
                                                <td style="padding: 1rem; text-align: right; color: #1e293b; font-weight: 500; border-right: 1px solid #e2e8f0;">${Utils.escapeHTML(y.title)}</td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${y.status==="compliant"?"background: #dcfce7; border: 2px solid #10b981;":"background: #f1f5f9; border: 2px solid #cbd5e1;"}">
                                                        <input type="radio" name="criteria-${S}" value="compliant" ${y.status==="compliant"?"checked":""} style="width: 20px; height: 20px; cursor: pointer; accent-color: #10b981;">
                                                        <span style="color: ${y.status==="compliant"?"#059669":"#64748b"}; font-weight: 600;">\u0645\u0637\u0627\u0628\u0642</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${y.status==="non_compliant"?"background: #fee2e2; border: 2px solid #ef4444;":"background: #f1f5f9; border: 2px solid #cbd5e1;"}">
                                                        <input type="radio" name="criteria-${S}" value="non_compliant" ${y.status==="non_compliant"?"checked":""} style="width: 20px; height: 20px; cursor: pointer; accent-color: #ef4444;">
                                                        <span style="color: ${y.status==="non_compliant"?"#dc2626":"#64748b"}; font-weight: 600;">\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem;">
                                                    <textarea class="form-input" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 (\u0625\u0646 \u0648\u062C\u062F\u062A)" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.75rem; width: 100%; resize: vertical; transition: all 0.3s ease;">${Utils.escapeHTML(y.notes||"")}</textarea>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 12px; padding: 1.75rem; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 2px solid #0ea5e9;">
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: #0c4a6e; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-chart-line" style="color: #0ea5e9;"></i>
                                \u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u064A\u064A\u0645
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</label>
                                    <input type="text" id="contractor-evaluation-compliant" class="form-input" readonly value="${p.compliantCount??0}" style="background: #dcfce7; border: 2px solid #10b981; color: #059669; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">\u0625\u062C\u0645\u0627\u0644\u064A \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <input type="text" id="contractor-evaluation-total" class="form-input" readonly value="${p.totalItems??0}" style="background: #f1f5f9; border: 2px solid #64748b; color: #475569; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <input type="text" id="contractor-evaluation-final-score" class="form-input" readonly value="${p.finalScore!==null?p.finalScore.toFixed(0)+"%":""}" style="background: #fef3c7; border: 2px solid #f59e0b; color: #d97706; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                                <div style="background: #ffffff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); border: 1px solid #bae6fd;">
                                    <label class="block text-sm font-semibold mb-2" style="color: #0369a1; font-weight: 600; margin-bottom: 0.75rem;">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</label>
                                    <input type="text" id="contractor-evaluation-final-rating" class="form-input" readonly value="${p.finalRating||""}" style="background: #ddd6fe; border: 2px solid #8b5cf6; color: #7c3aed; font-weight: 700; font-size: 1.25rem; text-align: center; padding: 0.75rem;">
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer" style="background: #f8fafc; border-top: 2px solid #e2e8f0; padding: 1.5rem 2rem; margin: 0 -2rem -2rem -2rem; border-radius: 0 0 12px 12px;">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; transition: all 0.3s ease;">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; border: none; padding: 0.75rem 2rem; border-radius: 8px; font-weight: 700; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3); transition: all 0.3s ease;">
                                <i class="fas fa-save ml-2"></i>
                                ${e?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0642\u064A\u064A\u0645":"\u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u064A\u064A\u0645"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(A),this.applyModuleI18n(A),this.bindEvaluationLocationSelects(A);let C=!1;const k=()=>{if(!C&&(C=!0,A&&document.contains(A)))try{A.remove()}catch(y){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",y);const S=A.parentNode;if(S)try{S.removeChild(A)}catch{}}},q=y=>{k(),typeof y=="function"&&setTimeout(y,0)},$=A.querySelector("#contractor-evaluation-form");$?.addEventListener("submit",y=>{y.preventDefault();try{const S=$.querySelector('button[type="submit"]');if(S?.disabled)return;const D=$.querySelector("#contractor-evaluation-date")?.value,T=$.querySelector("#contractor-evaluation-evaluator")?.value.trim();if(!D||!T){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062A\u0642\u064A\u064A\u0645 (\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645)");return}const _=this.collectEvaluationItems($),I=this.calculateEvaluationSummary(_),L=this.collectEvaluationLocationFromForm($),g={id:s?.id||Utils.generateId("CTREVAL"),contractorId:o?.id||s?.contractorId||t,contractorName:b,evaluationDate:new Date(D).toISOString(),evaluatorName:T,factoryId:L.factoryId,locationId:L.locationId,projectName:L.projectName,subLocationId:L.subLocationId,location:L.location,generalNotes:$.querySelector("#contractor-evaluation-general-notes")?.value.trim()||"",items:_,compliantCount:I.compliantCount??0,totalItems:I.totalItems??0,finalScore:I.finalScore,finalRating:I.finalRating||"",isoCode:s?.isoCode||(typeof generateISOCode=="function"?generateISOCode("CTREV",AppState.appData.contractorEvaluations):""),createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:s?.createdBy||AppState.currentUser?.id||"",updatedBy:AppState.currentUser?.id||""};if(!g.contractorId){Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0628\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644.");return}S&&(S.disabled=!0);const x=this.isContractorApprovalAdminUser();if(s){if(!x){S&&(S.disabled=!1),Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}q(()=>{Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),this.persistEvaluation(g,s)})}else{const E={requestType:"evaluation",contractorId:g.contractorId,contractorName:g.contractorName,companyName:g.contractorName,evaluationData:g,status:"pending",createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""};this.ensureEvaluationApprovalRequestsSetup();const R="TEMP_"+Date.now()+"_"+Math.random().toString(36).substr(2,9);E.id=R,E._isPendingSync=!0,AppState.appData.contractorEvaluationApprovalRequests.push(E),q(()=>{Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D. \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645..."),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),this.syncEvaluationApprovalRequestToBackend(E,R).then(()=>{this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}).catch(M=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",M),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")})})}}catch(S){const D=$.querySelector('button[type="submit"]');D&&(D.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",S),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+S.message)}}),A.addEventListener("click",y=>{y.target===A&&A.remove()}),this.bindEvaluationFormInteractions(A)},persistEvaluation(t,e=null,a={}){const r=a.skipAutoSave===!0;Array.isArray(AppState.appData.contractorEvaluations)||(AppState.appData.contractorEvaluations=[]);const o=t.id,i={id:o,contractorId:t.contractorId,contractorName:t.contractorName,evaluationDate:t.evaluationDate,evaluatorName:t.evaluatorName,projectName:t.projectName||"",location:t.location||"",factoryId:t.factoryId||t.locationId||"",locationId:t.locationId||t.factoryId||"",subLocationId:t.subLocationId||"",generalNotes:t.generalNotes||"",compliantCount:t.compliantCount??0,totalItems:t.totalItems??0,finalScore:t.finalScore,finalRating:t.finalRating||"",isoCode:t.isoCode||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString(),createdBy:t.createdBy||AppState.currentUser?.id||"",updatedBy:t.updatedBy||AppState.currentUser?.id||""};(e||a.replaceExisting)&&(AppState.appData.contractorEvaluations=AppState.appData.contractorEvaluations.filter(c=>c.id!==o&&c.evaluationId!==o));const s=Array.isArray(t.items)?t.items:[],n=new Date().toISOString(),l=AppState.currentUser?.id||"";s.forEach((c,p)=>{const f={...i,criteriaId:c.criteriaId||"",title:c.title||c.label||"",status:c.status||"",notes:c.notes||"",itemIndex:p+1,createdAt:e?c.createdAt||i.createdAt:n,updatedAt:n,createdBy:e?c.createdBy||i.createdBy:l,updatedBy:l,rowId:e&&c.rowId?c.rowId:Utils.generateId("CEVROW")};AppState.appData.contractorEvaluations.push(f)}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{r||GoogleIntegration.autoSave?.("ContractorEvaluations",AppState.appData.contractorEvaluations)}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",c)}this.refreshEvaluationsList(this.currentEvaluationFilter||""),this.updateContractorEvaluationSummary(t.contractorId)},refreshEvaluationsList(t=""){const e=document.getElementById("contractor-evaluations-container");if(!e)return;const a=this.renderEvaluationsTable(t);this.safeSetInnerHTML(e,a)},openEvaluationHistory(t){if(!t)return;this.currentEvaluationFilter=t;const e=document.getElementById("contractor-evaluation-filter");e&&(e.value=t),this.refreshEvaluationsList(t);const a=document.getElementById("contractor-evaluation-card");a&&requestAnimationFrame(()=>{const r=window.scrollY;a.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{const o=window.scrollY;Math.abs(o-r)>window.innerHeight&&window.scrollTo({top:r,behavior:"auto"})})})},showEvaluationFormForApproved(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.ensureApprovedSetup();const a=(AppState.appData.approvedContractors||[]).find(i=>i.id===t);if(!a){Notification.error("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let r=a.contractorId,o=a.companyName||"";if(r){const s=(AppState.appData.contractors||[]).find(n=>n.id===r);s&&(o=s.name||s.company||o)}else{const s=(AppState.appData.contractors||[]).find(n=>n.name===a.companyName||n.approvedEntityId===t||n.company===a.companyName);s?(r=s.id,o=s.name||s.company||o):r=t}this.showEvaluationForm(r,null,o)},openEvaluationHistoryForApproved(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.ensureApprovedSetup();const a=(AppState.appData.approvedContractors||[]).find(o=>o.id===t);if(!a){Notification.error("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let r=a.contractorId;if(!r){const i=(AppState.appData.contractors||[]).find(s=>s.name===a.companyName||s.approvedEntityId===t);if(i)r=i.id;else{Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637. \u0633\u064A\u062A\u0645 \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0627\u0633\u0645.");const n=(AppState.appData.contractorEvaluations||[]).find(l=>l.contractorName===a.companyName);if(n&&n.contractorId)r=n.contractorId;else{Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629");return}}}this.openEvaluationHistory(r),this.currentTab!=="evaluations"&&this.switchTab("evaluations")},renderEvaluationDetails(t){if(!t)return"";const e=o=>o==="compliant"?"\u0645\u0637\u0627\u0628\u0642":o==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"-";let a=[];Array.isArray(t.items)?a=t.items:t.items&&typeof t.items=="object"&&(a=Object.values(t.items)),a=a.filter(o=>{if(!o||typeof o!="object")return!1;const i=o.title||o.label||o.criteriaId,s=o.status&&(o.status==="compliant"||o.status==="non_compliant");return i||s});const r=a.length>0?a.map((o,i)=>{let s=o.title||o.label||"";if(!s&&o.criteriaId){const p=this.getEvaluationCriteria().find(f=>f.id===o.criteriaId);p&&(s=p.label||p.title||"")}s||(s=o.criteriaId||`\u0628\u0646\u062F ${i+1}`);const n=o.status||"",l=o.notes||"";return`
            <tr>
                <td>${i+1}</td>
                <td>${Utils.escapeHTML(s)}</td>
                <td>${e(n)}</td>
                <td>${Utils.escapeHTML(l)}</td>
            </tr>
        `}).join(""):'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0633\u062C\u0644\u0629</td></tr>';return`
            <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0642\u0627\u0648\u0644</label>
                        <p class="text-gray-800">${Utils.escapeHTML(t.contractorName||"")}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                        <p class="text-gray-800">${t.evaluationDate?Utils.formatDate(t.evaluationDate):"-"}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645</label>
                        <p class="text-gray-800">${Utils.escapeHTML(t.evaluatorName||"")}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                        <p class="text-gray-800">${Utils.escapeHTML(t.projectName||"\u2014")}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                        <p class="text-gray-800">${Utils.escapeHTML(t.location||"\u2014")}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</label>
                        <p class="text-gray-800">${t.compliantCount??0}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F</label>
                        <p class="text-gray-800">${t.totalItems??(Array.isArray(t.items)?t.items.length:t.items?Object.keys(t.items).length:0)}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                        <p class="text-gray-800">${typeof t.finalScore=="number"?t.finalScore.toFixed(0)+"%":"-"}</p>
                    </div>
                    <div>
                        <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</label>
                        <p class="text-gray-800">${Utils.escapeHTML(t.finalRating||"")}</p>
                    </div>
                </div>

                ${t.generalNotes?`
                    <div class="bg-gray-50 border border-gray-200 rounded p-3">
                        <label class="text-sm font-semibold text-gray-600 block mb-1">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629</label>
                        <p class="text-gray-700 whitespace-pre-line">${Utils.escapeHTML(t.generalNotes)}</p>
                    </div>
                `:""}

                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th>\u0628\u0646\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                                <th style="width: 140px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${r||'<tr><td colspan="4" class="text-center text-gray-500 py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0633\u062C\u0644\u0629</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        `},getEvaluationWithItems(t){const a=(AppState.appData.contractorEvaluations||[]).filter(l=>l.id===t||l.evaluationId===t);if(a.length===0)return null;const r=a[0];let o=r.finalScore;typeof o=="string"&&o!==""?(o=parseFloat(o),isNaN(o)&&(o=null)):typeof o!="number"&&(o=null);let i=r.compliantCount;typeof i=="string"&&(i=parseInt(i)||0);let s=r.totalItems;typeof s=="string"&&(s=parseInt(s)||0),o===null&&i>0&&s>0&&(o=Math.round(i/s*100));const n={id:r.id||r.evaluationId,contractorId:r.contractorId,contractorName:r.contractorName,evaluationDate:r.evaluationDate,evaluatorName:r.evaluatorName,projectName:r.projectName,location:r.location,generalNotes:r.generalNotes,compliantCount:i??0,totalItems:s??0,finalScore:o,finalRating:r.finalRating||"",isoCode:r.isoCode,createdAt:r.createdAt,updatedAt:r.updatedAt,createdBy:r.createdBy,updatedBy:r.updatedBy,items:[]};return a.forEach(l=>{(l.criteriaId||l.title)&&n.items.push({criteriaId:l.criteriaId,title:l.title,status:l.status,notes:l.notes})}),n},viewEvaluation(t){const e=this.getEvaluationWithItems(t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderEvaluationDetails(e)}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-success" onclick="Contractors.exportEvaluationPDF('${e.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    ${Permissions.isAdmin()?`
                    <button class="btn-primary" onclick="Contractors.showEvaluationForm('${e.contractorId}', ${JSON.stringify(e).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a),a.addEventListener("click",r=>{r.target===a&&a.remove()})},exportEvaluationPDF(t){const e=this.getEvaluationWithItems(t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();const a=d=>d==="compliant"?"\u0645\u0637\u0627\u0628\u0642":d==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"-",r=`
                <table>
                    <tr><th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th><td>${Utils.escapeHTML(e.contractorName||"")}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${e.evaluationDate?Utils.formatDate(e.evaluationDate):"-"}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645</th><td>${Utils.escapeHTML(e.evaluatorName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(e.projectName||"-")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(e.location||"-")}</td></tr>
                    <tr><th>\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</th><td>${e.compliantCount??0}</td></tr>
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0641\u0639\u0644\u064A\u0629</th><td>${e.totalItems??(Array.isArray(e.items)?e.items.length:e.items?Object.keys(e.items).length:0)}</td></tr>
                    <tr><th>\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${typeof e.finalScore=="number"?e.finalScore.toFixed(0)+"%":"-"}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</th><td>${Utils.escapeHTML(e.finalRating||"")}</td></tr>
                </table>
            `;let o=[];Array.isArray(e.items)?o=e.items:e.items&&typeof e.items=="object"&&(o=Object.values(e.items)),o=o.filter(d=>{if(!d||typeof d!="object")return!1;const m=d.title||d.label||d.criteriaId,v=d.status&&(d.status==="compliant"||d.status==="non_compliant");return m||v});const i=o.length>0?`
                <div class="section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 50px;">#</th>
                            <th>\u0627\u0644\u0628\u0646\u062F</th>
                            <th style="width: 140px;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o.map((d,m)=>{let v=d.title||d.label||"";if(!v&&d.criteriaId){const A=this.getEvaluationCriteria().find(C=>C.id===d.criteriaId);A&&(v=A.label||A.title||"")}v||(v=d.criteriaId||`\u0628\u0646\u062F ${m+1}`);const h=d.status||"",w=d.notes||"";return`
                            <tr>
                                <td>${m+1}</td>
                                <td>${Utils.escapeHTML(v)}</td>
                                <td>${a(h)}</td>
                                <td>${Utils.escapeHTML(w)}</td>
                            </tr>
                        `}).join("")}
                    </tbody>
                </table>
            `:'<div class="section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</div><p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0633\u062C\u0644\u0629</p>',s=e.generalNotes?`
                    <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629</div>
                    <p>${Utils.escapeHTML(e.generalNotes)}</p>
                `:"",n=`
                <div class="section-title">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645</div>
                ${r}
                ${s}
                ${i}
            `,l=e.isoCode||`CTREVAL-${e.id?.substring(0,6)||""}`,c=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(l,"\u0646\u0645\u0648\u0630\u062C \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",n,!1,!0,{version:"1.0",qrData:`contractor-evaluation:${e.id}`},e.createdAt,e.updatedAt):n,p=new Blob([c],{type:"text/html;charset=utf-8"}),f=URL.createObjectURL(p),u=window.open(f,"_blank");u?u.onload=()=>{setTimeout(()=>{u.print(),setTimeout(()=>{URL.revokeObjectURL(f)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(f),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(a){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",a),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+a.message)}},async requestDeleteEvaluation(t){if(t){if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.")?this.deleteEvaluation(t):void 0;Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.")}},deleteEvaluation(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629."))return;const e=AppState.appData.contractorEvaluations||[],a=e.filter(o=>o.id===t||o.evaluationId===t);if(a.length===0){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const r=a[0]?.contractorId;for(let o=e.length-1;o>=0;o--)(e[o].id===t||e[o].evaluationId===t)&&e.splice(o,1);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("ContractorEvaluations",AppState.appData.contractorEvaluations)}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A:",o)}this.refreshEvaluationsList(this.currentEvaluationFilter||""),this.updateContractorEvaluationSummary(r),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D")},getFinalRating(t,e=0){return t===null||e===0?"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0639\u062F":t>=90?"\u0645\u0645\u062A\u0627\u0632":t>=75?"\u062C\u064A\u062F \u062C\u062F\u0627\u064B":t>=60?"\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u062A\u062D\u0633\u064A\u0646":"\u063A\u064A\u0631 \u0645\u0624\u0647\u0644"},openEvaluationSettings(){const t=AppState.currentUser;if(!t||t.role!=="admin"){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637.");return}this.ensureEvaluationSetup();const e=this.getEvaluationCriteria(),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 640px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-sliders-h ml-2"></i>\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u0648\u062F \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-evaluation-settings-form" class="space-y-4">
                        <div class="bg-blue-50 border border-blue-200 text-blue-800 rounded p-3 text-sm">
                            <p class="font-semibold mb-1">\u062A\u0639\u0644\u064A\u0645\u0627\u062A:</p>
                            <ul class="list-disc mr-6 space-y-1">
                                <li>\u0623\u062F\u062E\u0644 \u0643\u0644 \u0628\u0646\u062F \u062A\u0642\u064A\u064A\u0645 \u0641\u064A \u0633\u0637\u0631 \u0645\u0646\u0641\u0635\u0644.</li>
                                <li>\u0633\u064A\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629 \u0641\u0642\u0637. \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0633\u062A\u0638\u0644 \u0645\u062D\u0641\u0648\u0638\u0629 \u0643\u0645\u0627 \u0647\u064A.</li>
                                <li>\u062A\u0623\u0643\u062F \u0645\u0646 \u0634\u0645\u0648\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646.</li>
                            </ul>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                            <textarea id="contractor-evaluation-settings-textarea" class="form-input" rows="12" placeholder="\u0623\u062F\u062E\u0644 \u0643\u0644 \u0628\u0646\u062F \u0641\u064A \u0633\u0637\u0631 \u062C\u062F\u064A\u062F">${e.map(o=>o.label).join("\\n")}</textarea>
                        </div>
                        <div class="flex items-center justify-end gap-3">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a),a.querySelector("#contractor-evaluation-settings-form")?.addEventListener("submit",o=>{o.preventDefault();const s=a.querySelector("#contractor-evaluation-settings-textarea")?.value||"";this.saveEvaluationCriteriaFromInput(s)&&(Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D"),a.remove())}),a.addEventListener("click",o=>{o.target===a&&a.remove()})},saveEvaluationCriteriaFromInput(t){const e=(t||"").split(`
`).map(a=>a.trim()).filter(Boolean);return e.length===0?(Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0641\u0627\u0631\u063A\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644."),!1):(AppState.appData.contractorEvaluationCriteria=e.map((a,r)=>({id:`criteria_${r+1}`,label:a})),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.ensureEvaluationSetup(),this.refreshEvaluationsList(this.currentEvaluationFilter||""),!0)},buildContractorEvaluationSummary(t){const e=(AppState.appData.contractorEvaluations||[]).filter(s=>s.contractorId===t).sort((s,n)=>new Date(n.evaluationDate||n.createdAt||0)-new Date(s.evaluationDate||s.createdAt||0));if(e.length===0)return'<div class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644.</div>';const a=e[0],r=typeof a.finalScore=="number"?a.finalScore:null,o=r===null?"badge-info":r>=90?"badge-success":r>=75?"badge-info":r>=60?"badge-warning":"badge-danger",i=Math.max(...e.map(s=>typeof s.finalScore=="number"?s.finalScore:0));return`
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold text-gray-700">\u0622\u062E\u0631 \u062A\u0642\u064A\u064A\u0645</div>
                        <div class="text-sm text-gray-600">${a.evaluationDate?Utils.formatDate(a.evaluationDate):"-"}</div>
                    </div>
                    <div>
                        <span class="badge ${o}">
                            ${Utils.escapeHTML(a.finalRating||"")}
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</div>
                        <div class="text-lg">${e.length}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0623\u0639\u0644\u0649 \u0646\u0633\u0628\u0629</div>
                        <div class="text-lg">${isFinite(i)?i.toFixed(0)+"%":"-"}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0622\u062E\u0631 \u0645\u0642\u064A\u0645</div>
                        <div>${Utils.escapeHTML(a.evaluatorName||"")}</div>
                    </div>
                </div>
                <button class="btn-secondary text-sm" onclick="Contractors.openEvaluationHistory('${t}')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A
                </button>
            </div>
        `},updateContractorEvaluationSummary(t){if(!t)return;const e=this.safeGetElementById(`contractor-evaluation-summary-${t}`);if(!e)return;const a=this.buildContractorEvaluationSummary(t);this.safeSetInnerHTML(e,a)},async showContractorForm(t=null){const e=!!t,a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0642\u0627\u0648\u0644":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u062C\u062F\u064A\u062F"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contractor-form" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                                <input type="text" id="contractor-name" required class="form-input"
                                    value="${t?.name||""}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629 *</label>
                                <input type="text" id="contractor-service-type" required class="form-input"
                                    value="${t?.serviceType||""}" placeholder="\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0639\u0642\u062F *</label>
                                <input type="text" id="contractor-contract-number" required class="form-input"
                                    value="${t?.contractNumber||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0639\u0642\u062F">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621 *</label>
                                <input type="date" id="contractor-start-date" required class="form-input"
                                    value="${t?.startDate?new Date(t.startDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 *</label>
                                <input type="date" id="contractor-end-date" required class="form-input"
                                    value="${t?.endDate?new Date(t.endDate).toISOString().slice(0,10):""}">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="contractor-status" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629</option>
                                    <option value="\u0646\u0634\u0637" ${t?.status==="\u0646\u0634\u0637"?"selected":""}>\u0646\u0634\u0637</option>
                                    <option value="\u0645\u0646\u062A\u0647\u064A" ${t?.status==="\u0645\u0646\u062A\u0647\u064A"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                                    <option value="\u0645\u0639\u0644\u0642" ${t?.status==="\u0645\u0639\u0644\u0642"?"selected":""}>\u0645\u0639\u0644\u0642</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                <input type="text" id="contractor-contact-person" class="form-input"
                                    value="${t?.contactPerson||""}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0647\u0627\u062A</label>
                                <input type="tel" id="contractor-phone" class="form-input"
                                    value="${t?.phone||""}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A">
                            </div>
                            <div class="col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                <input type="email" id="contractor-email" class="form-input"
                                    value="${t?.email||""}" placeholder="\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A">
                            </div>
                        </div>
                        
                        ${e?`
                        <div class="border-t pt-4 mt-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                <i class="fas fa-clipboard-check ml-2"></i>
                                \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                            </h3>
                            <div id="contractor-requirements-section" class="space-y-3">
                                ${this.renderRequirementsSection(t?.id||"")}
                            </div>
                        </div>
                        `:""}
                        
                        <div class="flex items-center justify-end gap-4 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a);const r=a.querySelector("#contractor-form");r.addEventListener("submit",async o=>{o.preventDefault();const i=r?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(i&&i.disabled)return;let s="";i&&(s=i.innerHTML,i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const n=t?.id||Utils.generateId("CONTRACTOR");let l=t?.code;l||(l=this.generateContractorCode());const c=document.getElementById("contractor-name"),p=document.getElementById("contractor-service-type"),f=document.getElementById("contractor-contract-number"),u=document.getElementById("contractor-start-date"),d=document.getElementById("contractor-end-date"),m=document.getElementById("contractor-status"),v=document.getElementById("contractor-contact-person"),h=document.getElementById("contractor-phone"),w=document.getElementById("contractor-email");if(!c||!p||!f||!u||!d||!m||!v||!h||!w){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),i&&(i.disabled=!1,i.innerHTML=s);return}const b={id:n,code:l,name:c.value.trim(),serviceType:p.value.trim(),contractNumber:f.value.trim(),startDate:new Date(u.value).toISOString(),endDate:new Date(d.value).toISOString(),status:m.value,contactPerson:v.value.trim(),phone:h.value.trim(),email:w.value.trim(),createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};t?.approvalRequirements&&(b.approvalRequirements=t.approvalRequirements),Loading.show();try{if(e){const A=AppState.appData.contractors.findIndex(C=>C.id===t.id);A!==-1&&(AppState.appData.contractors[A].approvalRequirements&&(b.approvalRequirements=AppState.appData.contractors[A].approvalRequirements),AppState.appData.contractors[A]=b),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),b.approvalRequirements&&this.updateContractorApprovalStatus(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),i&&(i.disabled=!1,i.innerHTML=s),a.remove(),this.load(!0)}else{const A={requestType:"contractor",companyName:b.name,serviceType:b.serviceType,licenseNumber:b.contractNumber,contactPerson:b.contactPerson,phone:b.phone,email:b.email,notes:`\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u062C\u062F\u064A\u062F: ${b.name}`,status:"pending",contractorData:b,createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""};this.ensureApprovalRequestsSetup();try{const C=await GoogleIntegration.sendRequest({action:"addContractorApprovalRequest",data:A});if(C&&C.success){const k=C.data?{...A,...C.data}:A;AppState.appData.contractorApprovalRequests.push(k),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.contractorApprovalRequests.push(A),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets\u060C \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637")}catch(C){AppState.appData.contractorApprovalRequests.push(A),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets:",C)}Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),i&&(i.disabled=!1,i.innerHTML=s),a.remove(),this.load(!0)}}catch(A){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+A.message),i&&(i.disabled=!1,i.innerHTML=s)}}),a.addEventListener("click",o=>{o.target===a&&a.remove()})},async viewContractor(t){const e=AppState.appData.contractors.find(r=>r.id===t);if(!e)return;e.code||(e.code=this.generateContractorCode(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.autoSave?.("Contractors",AppState.appData.contractors).catch(()=>{}));const a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            ${e.code?`
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
                                <p class="text-gray-800 font-mono">${Utils.escapeHTML(e.code)}</p>
                            </div>
                            `:""}
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.name||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.serviceType||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0639\u0642\u062F:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.contractNumber||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0621:</label>
                                <p class="text-gray-800">${e.startDate?Utils.formatDate(e.startDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621:</label>
                                <p class="text-gray-800">${e.endDate?Utils.formatDate(e.endDate):"-"}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629:</label>
                                <span class="badge badge-${e.status==="\u0646\u0634\u0637"?"success":e.status==="\u0645\u0646\u062A\u0647\u064A"?"danger":"warning"}">
                                    ${e.status||"-"}
                                </span>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.contactPerson||"")}</p>
                            </div>
                            <div>
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0647\u0627\u062A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.phone||"")}</p>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:</label>
                                <p class="text-gray-800">${Utils.escapeHTML(e.email||"")}</p>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u0633\u062C\u0644 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644:</label>
                                <div id="contractor-evaluation-summary-${e.id}" class="mt-2">
                                    ${this.buildContractorEvaluationSummary(e.id)}
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="text-sm font-semibold text-gray-600">\u062D\u0627\u0644\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:</label>
                                <div id="contractor-requirements-summary-${e.id}" class="mt-2">
                                    ${this.renderRequirementsSummary(e.id)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-success" onclick="Contractors.showEvaluationForm('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-clipboard-check ml-2"></i>
                        \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                    </button>
                    <button class="btn-primary" onclick="Contractors.showContractorForm(${JSON.stringify(e).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a),a.addEventListener("click",r=>{r.target===a&&a.remove()})},async editContractor(t){const e=AppState.appData.contractors.find(a=>a.id===t);e&&await this.showContractorForm(e)},async requestDeleteContractor(t){if(!t)return;const e=AppState.appData.contractors.find(o=>o.id===t);if(!e){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646. \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.")?this.deleteContractor(t):void 0;if(!confirm("\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"))return;const a=AppState.currentUser,r={id:Utils.generateId("DELRQ"),requestType:"contractor",entityId:t,entityName:e.name||"",reason:prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:")||"\u0637\u0644\u0628 \u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",createdBy:a?.id||"",createdByName:a?.name||"",createdAt:new Date().toISOString(),status:"pending"};await this.submitDeletionRequest(r),this.refreshApprovalRequestsSection()},async deleteContractor(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631");return}const e=AppState.appData.contractors||[],a=e.findIndex(i=>i.id===t);if(a===-1){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646."))return;e.splice(a,1),AppState.appData.contractors=e;const r=AppState.appData.approvedContractors||[],o=r.findIndex(i=>i.contractorId===t||i.id===t);o!==-1&&(r.splice(o,1),AppState.appData.approvedContractors=r);try{Loading.show();const i=await GoogleIntegration.sendToAppsScript("deleteContractor",{contractorId:t});if(i.success)Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.load(!0);else throw new Error(i.message)}catch(i){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+i.message),this.load(!0)}finally{Loading.hide()}},ensureRequirementsSetup(){AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.contractorApprovalRequirements)||(AppState.companySettings.contractorApprovalRequirements=CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT.map(t=>({...t})),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},getApprovalRequirements(t=null){this.ensureRequirementsSetup();let e=(AppState.companySettings.contractorApprovalRequirements||[]).slice().sort((a,r)=>(a.order||0)-(r.order||0));return t&&(e=e.filter(a=>(a.applicableTypes||["contractor","supplier"]).includes(t))),e.map(a=>({...a,category:a.category||"other",priority:a.priority||"medium",hasExpiry:a.hasExpiry||!1,expiryMonths:a.expiryMonths||12,description:a.description||"",applicableTypes:a.applicableTypes||["contractor","supplier"]}))},checkAllRequirementsMet(t){const e=this.getContractorById(t);if(!e)return Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0645\u0639\u0631\u0641 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646`),!0;const a=this.getApprovalRequirements(),r=e.approvalRequirements||{};for(const o of a){if(!o.required)continue;const i=r[o.id];if(o.type==="document"){if(!i||!i.documentLink||!i.completed)return!1}else if(o.type==="checkbox"){if(!i||!i.completed)return!1}else if(o.type==="text"&&(!i||!i.value||!i.completed))return!1}return!0},getContractorRequirementsStatus(t){const e=(AppState.appData.contractors||[]).find(p=>p.id===t);if(!e)return{allMet:!1,completed:0,total:0,requirements:[],expiring:0,expired:0};const a=this.getApprovalRequirements(),r=e.approvalRequirements||{};let o=0,i=0;const s=a.map(p=>{const f=r[p.id];let u=!1,d=!1,m=!1;if(p.type==="document"){if(u=!!(f&&f.documentLink&&f.completed),p.hasExpiry&&f&&f.expiryDate){const v=new Date(f.expiryDate),w=Math.ceil((v-new Date)/(1e3*60*60*24));w<0?(m=!0,i++):w<=30&&(d=!0,o++)}}else p.type==="checkbox"?u=!!(f&&f.completed):p.type==="text"&&(u=!!(f&&f.value&&f.completed));return{id:p.id,label:p.label,type:p.type,required:p.required,completed:u,isExpiring:d,isExpired:m,expiryDate:f?.expiryDate||null,data:f||null}}),n=s.filter(p=>p.required).length,l=s.filter(p=>p.required&&p.completed&&!p.isExpired).length;return{allMet:l===n&&i===0,completed:l,total:n,requirements:s,expiring:o,expired:i}},getExpiringRequirements(t=null){const e=t?[(AppState.appData.contractors||[]).find(o=>o.id===t)].filter(Boolean):AppState.appData.contractors||[],a=[],r=new Date;return e.forEach(o=>{if(!o.approvalRequirements)return;this.getApprovalRequirements().forEach(s=>{if(s.type!=="document"||!s.hasExpiry)return;const n=o.approvalRequirements[s.id];if(!n||!n.expiryDate)return;const l=new Date(n.expiryDate),c=Math.ceil((l-r)/(1e3*60*60*24));c<=60&&a.push({contractorId:o.id,contractorName:o.name,requirementId:s.id,requirementLabel:s.label,expiryDate:n.expiryDate,daysUntilExpiry:c,isExpired:c<0,documentLink:n.documentLink,fileName:n.fileName})})}),a.sort((o,i)=>o.daysUntilExpiry-i.daysUntilExpiry)},renderRequirementsSummary(t){const e=this.getContractorRequirementsStatus(t);if(e.total===0)return'<div class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u062D\u062F\u062F\u0629</div>';const a=e.allMet?"bg-green-50":"bg-orange-50",r=e.allMet?"border-green-200":"border-orange-200",o=e.allMet?"text-green-800":"text-orange-800",i=e.allMet?"badge-success":"badge-warning",s=e.allMet?"\u2705 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0633\u062A\u0648\u0641\u0627\u0629":"\u26A0\uFE0F \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629";return`
            <div class="space-y-2">
                <div class="flex items-center justify-between p-2 ${a} border ${r} rounded">
                    <span class="text-sm font-semibold ${o}">
                        ${s}
                    </span>
                    <span class="badge ${i}">
                        ${e.completed} / ${e.total}
                    </span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                    ${e.requirements.filter(n=>n.required).map(n=>{const l=n.completed?"fas fa-check-circle text-green-600":"fas fa-times-circle text-red-600",c=n.completed?"text-green-700":"text-red-700";return`
                        <div class="flex items-center gap-2">
                            <i class="${l}"></i>
                            <span class="${c}">${Utils.escapeHTML(n.label)}</span>
                        </div>
                    `}).join("")}
                </div>
            </div>
        `},renderRequirementsSection(t){const e=t?(AppState.appData.contractors||[]).find(l=>l.id===t):null,a=e?.type||"contractor",r=this.getApprovalRequirements(a),o=e?.approvalRequirements||{},i=this.getContractorRequirementsStatus(t),s={};r.forEach(l=>{const c=l.category||"other";s[c]||(s[c]=[]),s[c].push(l)});const n=i.total>0?i.completed/i.total*100:0;return`
            <!-- \u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0639 \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0642\u062F\u0645 -->
            <div class="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-blue-100 rounded-lg">
                            <i class="fas fa-clipboard-check text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold text-gray-800">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A</h4>
                            <p class="text-sm text-gray-600">${i.completed} \u0645\u0646 ${i.total} \u0627\u0634\u062A\u0631\u0627\u0637 \u0645\u0643\u062A\u0645\u0644</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-3xl font-bold ${i.allMet?"text-green-600":"text-orange-600"}">
                            ${Math.round(n)}%
                        </div>
                        <span class="badge ${i.allMet?"badge-success":"badge-warning"} text-sm">
                            ${i.allMet?"\u062C\u0627\u0647\u0632 \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F":"\u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644"}
                        </span>
                    </div>
                </div>
                
                <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0642\u062F\u0645 -->
                <div class="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div class="h-3 rounded-full transition-all duration-500 ${i.allMet?"bg-green-500":"bg-orange-500"}" 
                         style="width: ${n}%"></div>
                </div>
                
                ${i.allMet?`
                    <div class="flex items-center gap-2 text-green-700">
                        <i class="fas fa-check-circle"></i>
                        <span class="text-sm font-semibold">\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0633\u062A\u0648\u0641\u0627\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u062C\u0627\u0647\u0632 \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>
                    </div>
                `:`
                    <div class="flex items-center gap-2 text-orange-700">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span class="text-sm font-semibold">\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 ${i.total-i.completed} \u0627\u0634\u062A\u0631\u0627\u0637 \u0645\u062A\u0628\u0642\u064A \u0644\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>
                    </div>
                `}
            </div>
            
            <!-- \u0639\u0631\u0636 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0641\u0626\u0629 -->
            <div class="space-y-6">
                ${Object.keys(s).map(l=>{const c=REQUIREMENT_CATEGORIES[l]||REQUIREMENT_CATEGORIES.other,p=s[l],f=p.filter(d=>{const m=o[d.id]||{};return d.type==="document"?!!(m&&m.documentLink&&m.completed):d.type==="checkbox"?!!(m&&m.completed):d.type==="text"?!!(m&&m.value&&m.completed):!1}).length,u=p.length>0?f/p.length*100:0;return`
                        <div class="requirement-category-section border-2 rounded-lg overflow-hidden" style="border-color: ${c.color}40;">
                            <!-- \u0631\u0623\u0633 \u0627\u0644\u0641\u0626\u0629 -->
                            <div class="p-4 bg-gradient-to-r" style="background: linear-gradient(135deg, ${c.color}15, ${c.color}05);">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="p-2 rounded-lg" style="background: ${c.color}20;">
                                            <i class="fas ${c.icon} text-xl" style="color: ${c.color};"></i>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-gray-800">${c.label}</h5>
                                            <p class="text-xs text-gray-600">${f} / ${p.length} \u0645\u0643\u062A\u0645\u0644</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-bold" style="color: ${c.color};">
                                            ${Math.round(u)}%
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all" 
                                         style="width: ${u}%; background: ${c.color};"></div>
                                </div>
                            </div>
                            
                            <!-- \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0641\u0626\u0629 -->
                            <div class="p-4 space-y-3 bg-white">
                                ${p.map(d=>{const m=o[d.id]||{},v=m.completed||!1,h=REQUIREMENT_PRIORITIES[d.priority]||REQUIREMENT_PRIORITIES.medium;let w="";if(d.hasExpiry&&m.documentLink&&m.expiryDate){const A=new Date(m.expiryDate),k=Math.ceil((A-new Date)/(1e3*60*60*24));k<0?w='<span class="badge badge-danger text-xs"><i class="fas fa-exclamation-triangle ml-1"></i> \u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</span>':k<=30&&(w=`<span class="badge badge-warning text-xs"><i class="fas fa-clock ml-1"></i> \u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${k} \u064A\u0648\u0645</span>`)}let b="";return d.type==="document"?b=`
                                            <div class="space-y-2">
                                                <input type="file" 
                                                    id="req-${d.id}-file" 
                                                    class="form-input" 
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                    onchange="Contractors.handleRequirementFileChange('${t}', '${d.id}', this)">
                                                ${m.documentLink?`
                                                    <div class="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                        <i class="fas fa-check-circle text-green-600"></i>
                                                        <a href="${m.documentLink}" target="_blank" 
                                                           class="flex-1 text-sm text-green-700 hover:underline font-medium">
                                                            <i class="fas fa-file ml-1"></i>
                                                            ${m.fileName||"\u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0627\u0644\u0645\u0631\u0641\u0648\u0639"}
                                                        </a>
                                                        ${m.uploadedAt?`
                                                            <span class="text-xs text-gray-500">
                                                                ${Utils.formatDate(m.uploadedAt)}
                                                            </span>
                                                        `:""}
                                                        ${w}
                                                        <button onclick="Contractors.removeRequirementDocument('${t}', '${d.id}')" 
                                                            class="btn-icon btn-icon-danger btn-sm" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                `:""}
                                            </div>
                                        `:d.type==="checkbox"?b=`
                                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                <input type="checkbox" 
                                                    id="req-${d.id}-checkbox" 
                                                    ${v?"checked":""}
                                                    onchange="Contractors.handleRequirementCheckboxChange('${t}', '${d.id}', this.checked)"
                                                    class="cursor-pointer">
                                                <span class="text-sm text-gray-700">\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621</span>
                                            </label>
                                        `:d.type==="text"&&(b=`
                                            <div class="space-y-2">
                                                <input type="text" 
                                                    id="req-${d.id}-text" 
                                                    class="form-input" 
                                                    value="${Utils.escapeHTML(m.value||"")}"
                                                    placeholder="\u0623\u062F\u062E\u0644 ${d.label.toLowerCase()}"
                                                    onchange="Contractors.handleRequirementTextChange('${t}', '${d.id}', this.value)">
                                                ${m.value&&v?`
                                                    <div class="text-xs text-green-600 flex items-center gap-1">
                                                        <i class="fas fa-check-circle"></i>
                                                        \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A
                                                    </div>
                                                `:""}
                                            </div>
                                        `),`
                                        <div class="p-4 border-2 rounded-lg transition-all ${v?"bg-green-50 border-green-300":"bg-gray-50 border-gray-200"}" 
                                             data-requirement-id="${d.id}"
                                             style="border-left: 4px solid ${h.color};">
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex-1">
                                                    <div class="flex items-center gap-2 mb-2 flex-wrap">
                                                        <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${h.color}20; color: ${h.color};">
                                                            ${h.label}
                                                        </span>
                                                        ${d.required?'<span class="badge badge-danger text-xs">\u0645\u0637\u0644\u0648\u0628</span>':'<span class="badge badge-secondary text-xs">\u0627\u062E\u062A\u064A\u0627\u0631\u064A</span>'}
                                                        ${d.hasExpiry?`<span class="badge badge-info text-xs"><i class="fas fa-calendar ml-1"></i> ${d.expiryMonths} \u0634\u0647\u0631</span>`:""}
                                                        ${w}
                                                    </div>
                                                    <label class="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                        ${d.required?'<span class="text-red-500 text-lg">*</span>':""}
                                                        ${d.label}
                                                    </label>
                                                    ${d.description?`
                                                        <p class="text-xs text-gray-600 mt-1">${Utils.escapeHTML(d.description)}</p>
                                                    `:""}
                                                </div>
                                                <span class="badge ${v?"badge-success":"badge-warning"} text-xs">
                                                    ${v?"\u2713 \u0645\u0643\u062A\u0645\u0644":"\u2717 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644"}
                                                </span>
                                            </div>
                                            ${b}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `},async handleRequirementFileChange(t,e,a){if(!t||!e||!a){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}if(!a.files||a.files.length===0)return;const r=a.files[0],o=10*1024*1024;if(r.size>o){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A"),a.value="";return}Loading.show();try{const i=new FileReader;i.onload=async s=>{try{const n=s.target.result.split(",")[1],l=r.type,c=r.name,p=await GoogleIntegration.uploadFileToDrive(n,c,l,"Contractors");if(p&&p.success){const f=(AppState.appData.contractors||[]).find(u=>u.id===t);if(f){f.approvalRequirements||(f.approvalRequirements={});const d=this.getApprovalRequirements().find(h=>h.id===e);let m=null;if(d&&d.hasExpiry&&d.expiryMonths){const h=new Date;h.setMonth(h.getMonth()+d.expiryMonths),m=h.toISOString()}f.approvalRequirements[e]={completed:!0,documentLink:p.shareableLink||p.directLink,fileName:c,fileId:p.fileId,uploadedAt:new Date().toISOString(),expiryDate:m,expiryMonths:d?.expiryMonths||null},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),this.updateContractorApprovalStatus(t);const v=this.safeGetElementById("contractor-requirements-section");if(v){const h=this.renderRequirementsSection(t);this.safeSetInnerHTML(v,h)}Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")}else Notification.error("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F: "+(p?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0641:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{Loading.hide()}},i.onerror=()=>{Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641")},i.readAsDataURL(r)}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async handleRequirementCheckboxChange(t,e,a){if(!t||!e){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}const r=(AppState.appData.contractors||[]).find(o=>o.id===t);if(r){r.approvalRequirements||(r.approvalRequirements={}),r.approvalRequirements[e]={completed:a,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors)}catch(i){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",i)}this.updateContractorApprovalStatus(t);const o=this.safeGetElementById("contractor-requirements-section");if(o){const i=this.renderRequirementsSection(t);this.safeSetInnerHTML(o,i)}}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async handleRequirementTextChange(t,e,a){if(!t||!e){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}const r=(AppState.appData.contractors||[]).find(o=>o.id===t);if(r){r.approvalRequirements||(r.approvalRequirements={});const o=(a||"").trim();r.approvalRequirements[e]={completed:o.length>0,value:o,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors)}catch(s){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",s)}this.updateContractorApprovalStatus(t);const i=this.safeGetElementById("contractor-requirements-section");if(i){const s=this.renderRequirementsSection(t);this.safeSetInnerHTML(i,s)}}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async removeRequirementDocument(t,e){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u061F"))return;const a=(AppState.appData.contractors||[]).find(r=>r.id===t);if(a&&a.approvalRequirements&&a.approvalRequirements[e]){delete a.approvalRequirements[e],typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),this.updateContractorApprovalStatus(t);const r=this.safeGetElementById("contractor-requirements-section");if(r){const o=this.renderRequirementsSection(t);this.safeSetInnerHTML(r,o)}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F")}},updateContractorApprovalStatus(t){const e=(AppState.appData.contractors||[]).find(r=>r.id===t);if(!e)return;const a=this.checkAllRequirementsMet(t);if(a&&e.approvalStatus!=="approved"){e.approvalStatus="approved",e.approvedAt=new Date().toISOString(),this.ensureApprovedSetup();const r=AppState.appData.approvedContractors||[],o=e.name||"",i=o.trim().toLowerCase(),s=e.contractNumber?e.contractNumber.trim():"";if(!r.find(l=>!!(l.contractorId===t||l.companyName&&l.companyName.trim().toLowerCase()===i&&l.entityType==="contractor"||s&&l.licenseNumber&&l.licenseNumber.trim()===s))){let l=e.code||"";if(!l){const p=AppState.appData.contractors||[];let f=0;p.forEach(d=>{if(d.code){const m=d.code.match(/CON-(\d+)/);if(m){const v=parseInt(m[1],10);v>f&&(f=v)}}}),r.forEach(d=>{const m=d.isoCode||d.code;if(m){let v=m.match(/CON-(\d+)/);if(v){const h=parseInt(v[1],10);h>f&&(f=h)}if(v=m.match(/APP-(\d+)/),v){const h=parseInt(v[1],10);h>f&&(f=h)}}});const u=f+1;l=`CON-${String(u).padStart(3,"0")}`,e.code=l}const c={id:Utils.generateId("APPCON"),contractorId:t,companyName:o,entityType:"contractor",serviceType:e.serviceType||"",licenseNumber:e.contractNumber||"",approvalDate:new Date().toISOString(),expiryDate:e.endDate||"",safetyReviewer:e.contactPerson||"",status:"approved",notes:"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A",isoCode:l,code:l,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};r.push(c),AppState.appData.approvedContractors=r}}else!a&&e.approvalStatus==="approved"&&(e.approvalStatus="pending",e.approvedAt=null);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("Contractors",AppState.appData.contractors),GoogleIntegration.autoSave?.("ApprovedContractors",AppState.appData.approvedContractors)}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",r)}},openRequirementsManagement(){if(!(AppState.currentUser&&AppState.currentUser.role==="admin")){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}this.ensureRequirementsSetup();const e=this.getApprovalRequirements(),a=document.createElement("div");a.className="modal-overlay",a.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-cog ml-2"></i>
                        \u0625\u062F\u0627\u0631\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            \u064A\u0645\u0643\u0646\u0643 \u0625\u0636\u0627\u0641\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0623\u0648 \u062D\u0630\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646. 
                            \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0644\u0646 \u064A\u0638\u0647\u0631\u0648\u0646 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0625\u0644\u0627 \u0628\u0639\u062F \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.
                        </p>
                    </div>
                    
                    <div id="requirements-list" class="space-y-3 mb-4">
                        ${e.map((r,o)=>`
                            <div class="p-3 border rounded bg-white" data-requirement-id="${r.id}">
                                <div class="flex items-start gap-3">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-sm font-semibold text-gray-600">#${o+1}</span>
                                            <label for="req-label-${r.id}" class="sr-only">\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637</label>
                                            <input type="text" 
                                                id="req-label-${r.id}"
                                                class="form-input flex-1" 
                                                value="${Utils.escapeHTML(r.label)}"
                                                data-field="label"
                                                placeholder="\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637">
                                        </div>
                                        <div class="grid grid-cols-2 gap-2 mt-2">
                                            <label for="req-type-${r.id}" class="sr-only">\u0646\u0648\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637</label>
                                            <select id="req-type-${r.id}" class="form-input" data-field="type">
                                                <option value="document" ${r.type==="document"?"selected":""}>\u0645\u0633\u062A\u0646\u062F</option>
                                                <option value="checkbox" ${r.type==="checkbox"?"selected":""}>\u0645\u0631\u0628\u0639 \u0627\u062E\u062A\u064A\u0627\u0631</option>
                                                <option value="text" ${r.type==="text"?"selected":""}>\u0646\u0635</option>
                                            </select>
                                            <label class="flex items-center gap-2">
                                                <input type="checkbox" 
                                                    data-field="required" 
                                                    ${r.required?"checked":""}>
                                                <span class="text-sm text-gray-700">\u0645\u0637\u0644\u0648\u0628</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <button onclick="Contractors.moveRequirementUp('${r.id}')" 
                                            class="btn-icon btn-icon-info" 
                                            title="\u0646\u0642\u0644 \u0644\u0623\u0639\u0644\u0649"
                                            ${o===0?"disabled":""}>
                                            <i class="fas fa-arrow-up"></i>
                                        </button>
                                        <button onclick="Contractors.moveRequirementDown('${r.id}')" 
                                            class="btn-icon btn-icon-info" 
                                            title="\u0646\u0642\u0644 \u0644\u0623\u0633\u0641\u0644"
                                            ${o===e.length-1?"disabled":""}>
                                            <i class="fas fa-arrow-down"></i>
                                        </button>
                                        <button onclick="Contractors.deleteRequirement('${r.id}')" 
                                            class="btn-icon btn-icon-danger" 
                                            title="\u062D\u0630\u0641">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                    
                    <button onclick="Contractors.addNewRequirement()" class="btn-secondary w-full">
                        <i class="fas fa-plus ml-2"></i>
                        \u0625\u0636\u0627\u0641\u0629 \u0627\u0634\u062A\u0631\u0627\u0637 \u062C\u062F\u064A\u062F
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button onclick="Contractors.saveRequirements()" class="btn-primary">
                        <i class="fas fa-save ml-2"></i>
                        \u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A
                    </button>
                </div>
            </div>
        `,document.body.appendChild(a),this.applyModuleI18n(a),a.addEventListener("click",r=>{r.target===a&&a.remove()})},addNewRequirement(){const t=document.getElementById("requirements-list");if(!t)return;let e=t.querySelector(".requirement-category-group");if(!e){const l=REQUIREMENT_CATEGORIES.other,c=`
                <div class="requirement-category-group" data-category="other">
                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div class="w-1 h-8 rounded" style="background: ${l.color};"></div>
                        <i class="fas ${l.icon} text-xl" style="color: ${l.color};"></i>
                        <h3 class="text-lg font-bold text-gray-800">${l.label}</h3>
                        <span class="badge badge-info">0 \u0627\u0634\u062A\u0631\u0627\u0637</span>
                    </div>
                    <div class="space-y-3 ml-6"></div>
                </div>
            `;t.insertAdjacentHTML("beforeend",c),e=t.querySelector(".requirement-category-group")}const a=e.querySelector(".space-y-3"),r=a.querySelectorAll(".requirement-item").length,o=`req_${Date.now()}`,i=REQUIREMENT_PRIORITIES.medium,s=`
            <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                 data-requirement-id="${o}"
                 data-category="${e.getAttribute("data-category")}"
                 draggable="true"
                 style="border-color: ${i.color}20;">
                <div class="flex items-start gap-4">
                    <div class="drag-handle cursor-grab active:cursor-grabbing pt-1">
                        <i class="fas fa-grip-vertical text-gray-400 text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${i.color}20; color: ${i.color};">
                                ${i.label}
                            </span>
                            <span class="text-sm font-semibold text-gray-500">#${r+1}</span>
                            <span class="badge badge-danger text-xs">\u0645\u0637\u0644\u0648\u0628</span>
                        </div>
                        <input type="text" 
                            class="form-input mb-3 font-semibold text-gray-800" 
                            value="\u0627\u0634\u062A\u0631\u0627\u0637 \u062C\u062F\u064A\u062F"
                            data-field="label"
                            placeholder="\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637">
                        <textarea class="form-input mb-3 text-sm" 
                            data-field="description"
                            placeholder="\u0648\u0635\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"
                            rows="2"></textarea>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <select class="form-input text-sm" data-field="type">
                                <option value="document" selected>\u{1F4C4} \u0645\u0633\u062A\u0646\u062F</option>
                                <option value="checkbox">\u2611\uFE0F \u0645\u0631\u0628\u0639 \u0627\u062E\u062A\u064A\u0627\u0631</option>
                                <option value="text">\u{1F4DD} \u0646\u0635</option>
                            </select>
                            <select class="form-input text-sm" data-field="category">
                                ${Object.values(REQUIREMENT_CATEGORIES).map(l=>`
                                    <option value="${l.id}" ${l.id===e.getAttribute("data-category")?"selected":""}>${l.label}</option>
                                `).join("")}
                            </select>
                            <select class="form-input text-sm" data-field="priority">
                                ${Object.values(REQUIREMENT_PRIORITIES).map(l=>`
                                    <option value="${l.id}" ${l.id==="medium"?"selected":""}>${l.label}</option>
                                `).join("")}
                            </select>
                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="checkbox" 
                                    data-field="required" 
                                    checked
                                    class="cursor-pointer">
                                <span class="text-sm text-gray-700">\u0645\u0637\u0644\u0648\u0628</span>
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-3 mt-3">
                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="checkbox" 
                                    data-field="hasExpiry" 
                                    class="cursor-pointer"
                                    onchange="Contractors.toggleExpiryFields(this)">
                                <span class="text-sm text-gray-700">\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621</span>
                            </label>
                            <div class="expiry-fields" style="display: none;">
                                <input type="number" 
                                    class="form-input text-sm" 
                                    value="12"
                                    data-field="expiryMonths"
                                    placeholder="\u0639\u062F\u062F \u0627\u0644\u0623\u0634\u0647\u0631"
                                    min="1" max="60">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <button onclick="Contractors.moveRequirementUp('${o}')" 
                            class="btn-icon btn-icon-info" 
                            title="\u0646\u0642\u0644 \u0644\u0623\u0639\u0644\u0649">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button onclick="Contractors.moveRequirementDown('${o}')" 
                            class="btn-icon btn-icon-info" 
                            title="\u0646\u0642\u0644 \u0644\u0623\u0633\u0641\u0644">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                        <button onclick="Contractors.deleteRequirement('${o}')" 
                            class="btn-icon btn-icon-danger" 
                            title="\u062D\u0630\u0641">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;a.insertAdjacentHTML("beforeend",s);const n=e.querySelector(".badge");if(n){const l=a.querySelectorAll(".requirement-item").length;n.textContent=`${l} \u0627\u0634\u062A\u0631\u0627\u0637`}this.setupDragAndDropForItem(a.querySelector(`[data-requirement-id="${o}"]`))},setupDragAndDrop(){const t=document.getElementById("requirements-list");t&&t.querySelectorAll(".requirement-item").forEach(e=>{this.setupDragAndDropForItem(e)})},setupDragAndDropForItem(t){t&&(t.addEventListener("dragstart",e=>{e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/html",t.outerHTML),e.dataTransfer.setData("text/plain",t.getAttribute("data-requirement-id")),t.classList.add("dragging")}),t.addEventListener("dragend",()=>{t.classList.remove("dragging")}),t.addEventListener("dragover",e=>{e.preventDefault(),e.dataTransfer.dropEffect="move";const a=this.getDragAfterElement(t.parentElement,e.clientY),r=document.querySelector(".dragging");a==null?t.parentElement.appendChild(r):t.parentElement.insertBefore(r,a)}),t.addEventListener("drop",e=>{e.preventDefault(),this.saveRequirements()}))},getDragAfterElement(t,e){return[...t.querySelectorAll(".requirement-item:not(.dragging)")].reduce((r,o)=>{const i=o.getBoundingClientRect(),s=e-i.top-i.height/2;return s<0&&s>r.offset?{offset:s,element:o}:r},{offset:Number.NEGATIVE_INFINITY}).element},saveRequirements(){const t=document.getElementById("requirements-list");if(!t)return;const e=[];t.querySelectorAll(".requirement-category-group").forEach(i=>{i.querySelectorAll(".requirement-item").forEach(s=>{e.push(s)})});const a=e.map((i,s)=>{const n=i.getAttribute("data-requirement-id"),l=i.querySelector('[data-field="label"]'),c=i.querySelector('[data-field="type"]'),p=i.querySelector('[data-field="required"]'),f=i.querySelector('[data-field="category"]'),u=i.querySelector('[data-field="priority"]'),d=i.querySelector('[data-field="hasExpiry"]'),m=i.querySelector('[data-field="expiryMonths"]'),v=i.querySelector('[data-field="description"]');return{id:n,label:l?.value.trim()||"",type:c?.value||"document",required:p?.checked||!1,order:s+1,category:f?.value||"other",priority:u?.value||"medium",hasExpiry:d?.checked||!1,expiryMonths:d?.checked?parseInt(m?.value||12):null,description:v?.value.trim()||"",applicableTypes:["contractor","supplier"]}}).filter(i=>i.label.length>0);if(a.length===0){Notification.warning("\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0627\u0634\u062A\u0631\u0627\u0637 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}this.ensureRequirementsSetup(),AppState.companySettings.contractorApprovalRequirements=a,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success(`\u062A\u0645 \u062D\u0641\u0638 ${a.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0628\u0646\u062C\u0627\u062D`);const r=this.safeGetElementById("contractors-requirements-content");r&&this.currentTab==="requirements"&&this.renderRequirementsManagementSection().then(i=>{this.safeSetInnerHTML(r,i)&&this.setupDragAndDrop()});const o=document.querySelector(".modal-overlay");o&&o.remove()},moveRequirementUp(t){const e=document.getElementById("requirements-list");if(!e)return;const a=Array.from(e.children),r=a.findIndex(o=>o.getAttribute("data-requirement-id")===t);if(r>0){const o=a[r],i=a[r-1];e.insertBefore(o,i)}},moveRequirementDown(t){const e=document.getElementById("requirements-list");if(!e)return;const a=Array.from(e.children),r=a.findIndex(o=>o.getAttribute("data-requirement-id")===t);if(r<a.length-1){const o=a[r],i=a[r+1];e.insertBefore(o,i.nextSibling)}},deleteRequirement(t){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u061F"))return;const e=document.getElementById("requirements-list");if(!e)return;const a=e.querySelector(`[data-requirement-id="${t}"]`);a&&a.remove()},filterRequirementsByCategory(t){document.querySelectorAll(".requirement-category-filter").forEach(e=>{e.classList.remove("active"),e.getAttribute("data-category")===t&&e.classList.add("active")}),document.querySelectorAll(".requirement-category-group").forEach(e=>{t==="all"||e.getAttribute("data-category")===t?(e.style.display="block",e.style.animation="fadeIn 0.3s ease-in"):e.style.display="none"})},toggleExpiryFields(t){const e=t.closest(".requirement-item");if(!e)return;const a=e.querySelector(".expiry-fields");if(a)if(t.checked){a.style.display="block";const r=a.querySelector("input");r&&(r.value=r.value||"12")}else a.style.display="none"},exportRequirementsTemplate(){this.ensureRequirementsSetup();const t=this.getApprovalRequirements();if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u064B\u0627.");return}const e=t.map((s,n)=>({\u0627\u0644\u062A\u0631\u062A\u064A\u0628:Number(s.order)||n+1,"\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637":s.id||"","\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637":s.label||"",\u0627\u0644\u0648\u0635\u0641:s.description||"","\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644":s.type||"document",\u0627\u0644\u0641\u0626\u0629:(REQUIREMENT_CATEGORIES[s.category]||REQUIREMENT_CATEGORIES.other).label,\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:(REQUIREMENT_PRIORITIES[s.priority]||REQUIREMENT_PRIORITIES.medium).label,\u0625\u0644\u0632\u0627\u0645\u064A:s.required===!1?"\u0644\u0627":"\u0646\u0639\u0645","\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621":s.hasExpiry?"\u0646\u0639\u0645":"\u0644\u0627","\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0628\u0627\u0644\u0623\u0634\u0647\u0631":s.hasExpiry?Number(s.expiryMonths)||12:"","\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649":Array.isArray(s.applicableTypes)&&s.applicableTypes.length===1?s.applicableTypes[0]==="supplier"?"\u0645\u0648\u0631\u062F":"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0642\u0627\u0648\u0644 \u0648\u0645\u0648\u0631\u062F"})),a=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(e);r["!cols"]=[{wch:10},{wch:20},{wch:45},{wch:55},{wch:16},{wch:27},{wch:14},{wch:12},{wch:18},{wch:24},{wch:18}],r["!autofilter"]={ref:r["!ref"]||"A1:K1"},XLSX.utils.book_append_sheet(a,r,"\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A");const o=[["\u062F\u0644\u064A\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0642\u0627\u0644\u0628 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"],["\u0627\u0644\u062D\u0642\u0644","\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0629 / \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A"],["\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0625\u0644\u0632\u0627\u0645\u064A\u060C \u0648\u0644\u0627 \u064A\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0635\u0641 \u0628\u062F\u0648\u0646\u0647"],["\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","document \u0623\u0648 text \u0623\u0648 checkbox"],["\u0627\u0644\u0641\u0626\u0629",Object.values(REQUIREMENT_CATEGORIES).map(s=>`${s.label} (${s.id})`).join("\u060C ")],["\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629",Object.values(REQUIREMENT_PRIORITIES).map(s=>`${s.label} (${s.id})`).join("\u060C ")],["\u0625\u0644\u0632\u0627\u0645\u064A / \u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621","\u0646\u0639\u0645 \u0623\u0648 \u0644\u0627"],["\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649","\u0645\u0642\u0627\u0648\u0644\u060C \u0645\u0648\u0631\u062F\u060C \u0623\u0648 \u0645\u0642\u0627\u0648\u0644 \u0648\u0645\u0648\u0631\u062F"],["\u0645\u0644\u0627\u062D\u0638\u0629","\u0644\u0627 \u062A\u063A\u064A\u0651\u0631 \u0623\u0633\u0645\u0627\u0621 \u0623\u0639\u0645\u062F\u0629 \u0648\u0631\u0642\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0635\u0641\u0648\u0641 \u062C\u062F\u064A\u062F\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629."]],i=XLSX.utils.aoa_to_sheet(o);i["!cols"]=[{wch:28},{wch:100}],i["!merges"]=[{s:{r:0,c:0},e:{r:0,c:1}}],XLSX.utils.book_append_sheet(a,i,"\u062F\u0644\u064A\u0644 \u0627\u0644\u0642\u064A\u0645"),a.Workbook=a.Workbook||{},a.Workbook.Views=[{RTL:!0}],XLSX.writeFile(a,`\u0642\u0627\u0644\u0628_\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0644\u0628 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0628\u0635\u064A\u063A\u0629 Excel \u0628\u0646\u062C\u0627\u062D")},getRequirementImportCell(t,...e){return this.getApprovedImportCell(t,...e)},parseRequirementImportBoolean(t,e=!1){if(typeof t=="boolean")return t;if(typeof t=="number")return t!==0;const a=String(t??"").trim().toLowerCase();return a?["\u0646\u0639\u0645","yes","true","1","\u0625\u0644\u0632\u0627\u0645\u064A"].includes(a):e},mapRequirementImportOption(t,e,a){const r=String(t??"").trim().toLowerCase();if(!r)return a;const o=Object.values(e).find(i=>i.id.toLowerCase()===r||i.label.toLowerCase()===r);return o?o.id:a},importRequirementsTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u064B\u0627.");return}const t=document.createElement("input");t.type="file",t.accept=".xlsx,.xls",t.onchange=async e=>{const a=e.target.files[0];if(a)try{const r=await a.arrayBuffer(),o=XLSX.read(r,{type:"array",cellDates:!0}),i=o.Sheets[o.SheetNames[0]];if(!i){Notification.error("\u0645\u0644\u0641 Excel \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0648\u0631\u0642\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A");return}const n=XLSX.utils.sheet_to_json(i,{defval:"",raw:!0}).map((l,c)=>{const p=String(this.getRequirementImportCell(l,"\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","label","name")).trim();if(!p)return null;const f=String(this.getRequirementImportCell(l,"\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649","applicableTypes")).trim().toLowerCase(),u=f==="\u0645\u0648\u0631\u062F"||f==="supplier"?["supplier"]:f==="\u0645\u0642\u0627\u0648\u0644"||f==="contractor"?["contractor"]:["contractor","supplier"],d=this.parseRequirementImportBoolean(this.getRequirementImportCell(l,"\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621","hasExpiry"),!1);return{id:String(this.getRequirementImportCell(l,"\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0627\u0644\u0645\u0639\u0631\u0641","id")).trim()||`req_${Date.now()}_${c}`,label:p,description:String(this.getRequirementImportCell(l,"\u0627\u0644\u0648\u0635\u0641","description")).trim(),type:["document","text","checkbox"].includes(String(this.getRequirementImportCell(l,"\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","type")).trim().toLowerCase())?String(this.getRequirementImportCell(l,"\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","type")).trim().toLowerCase():"document",category:this.mapRequirementImportOption(this.getRequirementImportCell(l,"\u0627\u0644\u0641\u0626\u0629","category"),REQUIREMENT_CATEGORIES,"other"),priority:this.mapRequirementImportOption(this.getRequirementImportCell(l,"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629","priority"),REQUIREMENT_PRIORITIES,"medium"),required:this.parseRequirementImportBoolean(this.getRequirementImportCell(l,"\u0625\u0644\u0632\u0627\u0645\u064A","\u0645\u0637\u0644\u0648\u0628","required"),!0),hasExpiry:d,expiryMonths:d?Math.max(1,Number(this.getRequirementImportCell(l,"\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0628\u0627\u0644\u0623\u0634\u0647\u0631","expiryMonths"))||12):12,applicableTypes:u,order:Number(this.getRequirementImportCell(l,"\u0627\u0644\u062A\u0631\u062A\u064A\u0628","order"))||c+1}}).filter(Boolean).sort((l,c)=>l.order-c.order).map((l,c)=>({...l,order:c+1}));if(!n.length){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0635\u0627\u0644\u062D\u0629. \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u062C\u0648\u062F \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\xBB.");return}if(!confirm(`\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${n.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0635\u0627\u0644\u062D. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629\u061F`))return;if(this.ensureRequirementsSetup(),AppState.companySettings.contractorApprovalRequirements=n,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${n.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0645\u0646 Excel \u0628\u0646\u062C\u0627\u062D`),this.currentTab==="requirements"){const l=this.safeGetElementById("contractors-requirements-content");l&&this.renderRequirementsManagementSection().then(c=>{this.safeSetInnerHTML(l,c)})}}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0644\u0628: "+r.message)}},t.click()},bulkEditRequirements(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">\u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062C\u0645\u0627\u0639\u064A</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0641\u0626\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629:</label>
                            <select id="bulk-category" class="form-input">
                                <option value="">\u0644\u0627 \u062A\u063A\u064A\u064A\u0631</option>
                                ${Object.values(REQUIREMENT_CATEGORIES).map(e=>`
                                    <option value="${e.id}">${e.label}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629:</label>
                            <select id="bulk-priority" class="form-input">
                                <option value="">\u0644\u0627 \u062A\u063A\u064A\u064A\u0631</option>
                                ${Object.values(REQUIREMENT_PRIORITIES).map(e=>`
                                    <option value="${e.id}">${e.label}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" id="bulk-required">
                                <span class="text-sm text-gray-700">\u062A\u0639\u064A\u064A\u0646 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0643\u0645\u0637\u0644\u0648\u0628\u0629</span>
                            </label>
                        </div>
                        <div>
                            <label class="flex items-center gap-2">
                                <input type="checkbox" id="bulk-has-expiry">
                                <span class="text-sm text-gray-700">\u0625\u0636\u0627\u0641\u0629 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A</span>
                            </label>
                        </div>
                        ${document.getElementById("bulk-has-expiry")?"":`
                            <div id="bulk-expiry-months-container" style="display: none;">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u062F\u062F \u0623\u0634\u0647\u0631 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629:</label>
                                <input type="number" id="bulk-expiry-months" class="form-input" value="12" min="1" max="60">
                            </div>
                        `}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                    <button class="btn-primary" onclick="Contractors.applyBulkEdit()">\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A</button>
                </div>
            </div>
        `,document.body.appendChild(t),this.applyModuleI18n(t),setTimeout(()=>{const e=document.getElementById("bulk-has-expiry"),a=document.getElementById("bulk-expiry-months-container");e&&a&&e.addEventListener("change",r=>{a.style.display=r.target.checked?"block":"none"})},100)},applyBulkEdit(){const t=document.getElementById("requirements-list");if(!t)return;const e=document.getElementById("bulk-category")?.value,a=document.getElementById("bulk-priority")?.value,r=document.getElementById("bulk-required")?.checked,o=document.getElementById("bulk-has-expiry")?.checked,i=document.getElementById("bulk-expiry-months")?.value,s=t.querySelectorAll(".requirement-item");let n=0;s.forEach(l=>{if(e){const c=l.querySelector('[data-field="category"]');c&&(c.value=e)}if(a){const c=l.querySelector('[data-field="priority"]');c&&(c.value=a)}if(r!==void 0){const c=l.querySelector('[data-field="required"]');c&&(c.checked=r)}if(o!==void 0){const c=l.querySelector('[data-field="hasExpiry"]');if(c&&(c.checked=o,this.toggleExpiryFields(c),o&&i)){const p=l.querySelector('[data-field="expiryMonths"]');p&&(p.value=i)}}n++}),Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${n} \u0627\u0634\u062A\u0631\u0627\u0637`),document.querySelector(".modal-overlay")?.remove()},ensureData(){if(!AppState){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const t=AppState.appData||{};let e=!1;if(Array.isArray(t.contractorApprovalRequests)||(t.contractorApprovalRequests=[],e=!0),Array.isArray(t.contractorDeletionRequests)||(t.contractorDeletionRequests=[],e=!0),Array.isArray(t.contractorEvaluationApprovalRequests)||(t.contractorEvaluationApprovalRequests=[],e=!0),Array.isArray(t.approvedContractors)||(t.approvedContractors=[],e=!0),Array.isArray(t.contractorEvaluations)||(t.contractorEvaluations=[],e=!0),Array.isArray(t.contractors)||(t.contractors=[],e=!0),AppState.appData=t,e&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0639\u0646\u062F \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",a)}},ensureApprovalRequestsSetup(){this.ensureData()},ensureDeletionRequestsSetup(){this.ensureData()},ensureEvaluationApprovalRequestsSetup(){this.ensureData(),this.migrateLegacyEvaluationApprovalRequestsLocally_()},migrateLegacyEvaluationApprovalRequestsLocally_(){if(!AppState?.appData)return;const t=AppState.appData.contractorApprovalRequests;if(!Array.isArray(t))return;Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)||(AppState.appData.contractorEvaluationApprovalRequests=[]);const e=AppState.appData.contractorEvaluationApprovalRequests,a=new Set(e.map(o=>o&&o.id).filter(Boolean)),r=t.filter(o=>o&&String(o.requestType||"").trim()==="evaluation");r.length&&(r.forEach(o=>{!o.id||a.has(o.id)||(e.push({...o,requestType:"evaluation"}),a.add(o.id))}),AppState.appData.contractorApprovalRequests=t.filter(o=>!o||String(o.requestType||"").trim()!=="evaluation"))},findEvaluationApprovalRequest(t){this.ensureEvaluationApprovalRequestsSetup();const e=String(t||"").trim();return e&&(AppState.appData.contractorEvaluationApprovalRequests||[]).find(a=>a?String(a.id||"").trim()===e?!0:String(a.legacyTempId||a._tempId||"").trim()===e:!1)||null},mergeEvaluationApprovalRequestsWithLocalOnly(t,e){const a=Array.isArray(t)?t:[],r=Array.isArray(e)?e:[],o=new Set(a.map(s=>s&&String(s.id||"").trim()).filter(Boolean)),i=r.filter(s=>{if(!s)return!1;const n=String(s.id||"").trim();return n?!o.has(n):!1});return[...a,...i]},async fetchEvaluationApprovalRequestsFromBackend(){try{this.ensureEvaluationApprovalRequestsSetup();const t=Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)?AppState.appData.contractorEvaluationApprovalRequests.slice():[];if(typeof GoogleIntegration>"u")return!1;const e=await GoogleIntegration.sendRequest({action:"getAllContractorEvaluationApprovalRequests",data:{forceRefresh:!0,skipCache:!0}});if(e?.success&&Array.isArray(e.data))return AppState.appData.contractorEvaluationApprovalRequests=this.mergeEvaluationApprovalRequestsWithLocalOnly(e.data,t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),!0;t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0641\u0634\u0644 \u0623\u0648 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0637\u0644\u0628 \u0645\u062D\u0644\u064A")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",t)}return!1},async syncPendingEvaluationApprovalRequests(t){this.ensureEvaluationApprovalRequestsSetup();const e=t?String(t).trim():"",r=(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(s=>{if(!s)return!1;const n=String(s.id||"").trim();if(e){const l=String(s.legacyTempId||s._tempId||"").trim();if(n!==e&&l!==e)return!1}return s._isPendingSync||n.startsWith("TEMP_")||s._syncError});if(!r.length)return{synced:0,failed:0};let o=0,i=0;for(const s of r){const n=String(s.id||"").startsWith("TEMP_")?s.id:s.legacyTempId||s._tempId||s.id;try{await this.syncEvaluationApprovalRequestToBackend(s,n),o++}catch{i++}}return(o||i)&&(this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()),{synced:o,failed:i}},ensureEvaluationApprovalRequestsDataLoaded(t={}){const e=t.force===!0,a=3e4,r=Date.now();return!e&&this._evaluationApprovalRequestsLastLoadAt&&r-this._evaluationApprovalRequestsLastLoadAt<a?Promise.resolve(!1):this._evaluationApprovalRequestsSyncInFlight?this._evaluationApprovalRequestsSyncInFlight:typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?(this.ensureEvaluationApprovalRequestsSetup(),this._evaluationApprovalRequestsSyncInFlight=this.syncPendingEvaluationApprovalRequests().then(()=>this.fetchEvaluationApprovalRequestsFromBackend()).then(i=>(i&&(this._evaluationApprovalRequestsLastLoadAt=Date.now()),i)).catch(i=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",i),!1)).finally(()=>{this._evaluationApprovalRequestsSyncInFlight=null}),this._evaluationApprovalRequestsSyncInFlight):Promise.resolve(!1)},getMyEvaluationApprovalRequests(){this.ensureEvaluationApprovalRequestsSetup();const t=AppState.currentUser||{},e=String(t.id||"").trim(),a=String(t.email||"").trim().toLowerCase();return!e&&!a?[]:(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(r=>r&&this.isCurrentUserApprovalRequestOwner(r)).map(r=>({...r,requestType:"evaluation",requestCategory:"evaluation_approval"}))},getPendingEvaluationApprovalRequests(){return this.ensureEvaluationApprovalRequestsSetup(),this.isContractorApprovalAdminUser()?(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(t=>{if(!t||!this.isApprovalRequestPendingForReview(t)||this.isCurrentUserApprovalRequestOwner(t))return!1;const e=String(t.id||"").trim();return!(t._isPendingSync||e.startsWith("TEMP_"))}).map(t=>({...t,requestType:"evaluation",requestCategory:"evaluation_approval"})):[]},refreshEvaluationApprovalRequestsSection(){if(!(this.currentTab!=="evaluations"&&this.currentTab!=="approval-request"))try{const t=document.getElementById("my-evaluation-approval-requests-container"),e=document.getElementById("pending-evaluation-approval-requests-container"),a=document.getElementById("pending-evaluation-approval-admin-container");if(t&&(t.innerHTML=this.renderApprovalRequestsTable(this.getMyEvaluationApprovalRequests(),!1)),this.isContractorApprovalAdminUser()){const r=this.getPendingEvaluationApprovalRequests();e&&(e.innerHTML=this.renderApprovalRequestsTable(r,!0)),a&&(a.innerHTML=this.renderApprovalRequestsTable(r,!0))}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",t)}},async submitDeletionRequest(t){this.ensureDeletionRequestsSetup(),AppState.appData.contractorDeletionRequests.push(t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const e=await GoogleIntegration.callBackend("addContractorDeletionRequest",t);return e&&e.success?(Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),!0):(Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A."),!1)}catch(e){return Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",e),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A."),!1}},renderApprovalRequestSection(){if(this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),!AppState||!AppState.appData)return this.renderApprovalRequestSectionPlaceholder();const t=this.isContractorApprovalAdminUser();let e=[],a=[];try{Array.isArray(AppState.appData.contractorApprovalRequests)&&Array.isArray(AppState.appData.contractorDeletionRequests)&&(e=this.getMyApprovalRequests())}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A\u064A:",r),e=[]}if(t)try{Array.isArray(AppState.appData.contractorApprovalRequests)&&Array.isArray(AppState.appData.contractorDeletionRequests)&&(a=this.getPendingApprovalRequests())}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:",r),a=[]}return`
            <div class="content-card contractors-workflow-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <h2 class="card-title"><i class="fas fa-paper-plane ml-2"></i>\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u062E\u062F\u0645\u0629</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-folder-open ml-1"></i>${e.length} \u0637\u0644\u0628 \u062E\u0627\u0635 \u0628\u0643</span>
                            ${t?`<span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-hourglass-half ml-1"></i>${a.length} \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</span>`:""}
                        </div>
                    </div>
                </div>
                <div class="card-body space-y-6">
                    <div class="contractors-request-intro">
                        <div>
                            <h3><i class="fas fa-file-signature ml-2" style="color:#0f8b83;"></i>\u0628\u062F\u0621 \u0645\u0644\u0641 \u0627\u0639\u062A\u0645\u0627\u062F \u062C\u062F\u064A\u062F</h3>
                            <p>\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u0627\u0644\u062E\u062F\u0645\u0629\u060C \u0648\u0623\u0631\u0641\u0642 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A\u060C \u062B\u0645 \u0623\u0631\u0633\u0644\u0647 \u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F.</p>
                        </div>
                        <button id="send-approval-request-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u062C\u062F\u064A\u062F
                        </button>
                    </div>

                    <div class="contractors-subsection">
                        <h3 class="contractors-subsection__title"><i class="fas fa-list"></i>\u0637\u0644\u0628\u0627\u062A\u064A</h3>
                        <div id="my-approval-requests-container">
                            ${this.renderApprovalRequestsTable(e,!1)}
                        </div>
                    </div>

                    <div class="contractors-subsection" id="pending-approval-requests-section" style="display: ${t?"block":"none"};">
                        <h3 class="contractors-subsection__title"><i class="fas fa-clipboard-check"></i>\u0637\u0644\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0644\u0644\u0645\u062F\u064A\u0631)</h3>
                        <div id="pending-approval-requests-container">
                            ${t?this.renderApprovalRequestsTable(a,!0):""}
                        </div>
                    </div>
                </div>
            </div>
        `},renderApprovalRequestSectionPlaceholder(){const t=this.isContractorApprovalAdminUser(),e=typeof GoogleIntegration<"u"&&GoogleIntegration?._circuitBreaker?.isOpen,a=e&&GoogleIntegration?._circuitBreaker?.openUntil?Math.max(0,Math.ceil((GoogleIntegration._circuitBreaker.openUntil-Date.now())/1e3)):null;return`
            <div class="content-card">
                <div class="card-header">
                    <h2 class="card-title">
                        <i class="fas fa-paper-plane ml-2"></i>
                        \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u062E\u062F\u0645\u0629
                    </h2>
                </div>
                <div class="card-body space-y-6">
                    <div class="bg-blue-50 border border-blue-200 rounded p-4">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle ml-2"></i>
                            \u064A\u0645\u0643\u0646\u0643 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F. \u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629.
                        </p>
                    </div>

                    ${e?`
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                            <p class="text-sm text-yellow-800">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0645\u0624\u0642\u062A\u0627\u064B (Circuit Breaker \u0645\u0641\u062A\u0648\u062D)
                                ${a!==null?`- \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F ${a} \u062B\u0627\u0646\u064A\u0629`:""}
                            </p>
                            <div class="mt-3">
                                <button type="button" class="btn-secondary" onclick="Contractors.bootstrapApprovalRequestsData()">
                                    <i class="fas fa-sync ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    `:""}
                    
                    <div>
                        <button id="send-approval-request-btn" class="btn-primary">
                            <i class="fas fa-plus ml-2"></i>
                            \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u062C\u062F\u064A\u062F
                        </button>
                    </div>

                    <div class="border-t pt-4">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">
                            <i class="fas fa-list ml-2"></i>
                            \u0637\u0644\u0628\u0627\u062A\u064A
                        </h3>
                        <div id="my-approval-requests-container">
                            <div class="empty-state">
                                <div style="width: 300px; margin: 0 auto 16px;">
                                    <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                        <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                    </div>
                                </div>
                                <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                            </div>
                        </div>
                    </div>

                    ${t?`
                        <div class="border-t pt-4">
                            <h3 class="text-lg font-semibold text-gray-800 mb-4">
                                <i class="fas fa-clipboard-check ml-2"></i>
                                \u0637\u0644\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0644\u0644\u0645\u062F\u064A\u0631)
                            </h3>
                            <div id="pending-approval-requests-container">
                                <div class="empty-state">
                                    <div style="width: 300px; margin: 0 auto 16px;">
                                        <div style="width: 100%; height: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 3px; overflow: hidden;">
                                            <div style="height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb, #3b82f6); background-size: 200% 100%; border-radius: 3px; animation: loadingProgress 1.5s ease-in-out infinite;"></div>
                                        </div>
                                    </div>
                                    <p class="text-gray-500">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...</p>
                                </div>
                            </div>
                        </div>
                    `:""}
                </div>
            </div>
        `},renderApprovalRequestsTable(t,e=!1){return!t||t.length===0?`
                <div class="empty-state">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A ${e?"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"\u0645\u0633\u062C\u0644\u0629"}</p>
                </div>
            `:`
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</th>
                            <th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u062C\u0647\u0629</th>
                            <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0631\u0633\u0627\u0644</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            ${e?"<th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>":"<th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th>"}
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>{let r="";a._isPendingSync?r='<span class="badge badge-info" title="\u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645"><i class="fas fa-sync fa-spin ml-1"></i> \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629</span>':a._syncError&&(r='<span class="badge badge-warning" title="'+(a._syncErrorMessage||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")+'"><i class="fas fa-exclamation-triangle ml-1"></i> \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629</span>');const o=this.getApprovalRequestStatusBadge(a.status),i=a.requestCategory==="deletion",s=a.requestCategory==="evaluation_approval"||!i&&a.requestType==="evaluation",n=i?"deletion":s?"evaluation_approval":"approval";let l;i?l=a.requestType==="contractor"?"\u062D\u0630\u0641 \u0645\u0642\u0627\u0648\u0644":a.requestType==="approved_entity"?"\u062D\u0630\u0641 \u0645\u0639\u062A\u0645\u062F":a.requestType==="evaluation"?"\u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645":"\u062D\u0630\u0641":s?l="\u0637\u0644\u0628 \u062A\u0642\u064A\u064A\u0645":l=a.requestType==="contractor"?"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644":"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u0631\u062F";const c=i?a.entityName||a.companyName||"":s?a.contractorName||"":a.companyName||a.contractorName||"";return`
                                <tr ${a._isPendingSync?'style="opacity: 0.8;"':""}>
                                    <td>
                                        ${i?'<span class="badge badge-warning">\u062D\u0630\u0641</span> ':""}
                                        ${s?'<span class="badge badge-info">\u062A\u0642\u064A\u064A\u0645</span> ':""}
                                        ${l}
                                    </td>
                                    <td>${Utils.escapeHTML(c)}</td>
                                    <td>${a.createdAt?Utils.formatDate(a.createdAt):"-"}</td>
                                    <td>
                                        ${o}
                                        ${r?"<br>"+r:""}
                                    </td>
                                    <td>
                                        ${e?`
                                            <div class="flex items-center gap-2">
                                                <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovalRequest('${a.id}', '${n}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                ${this.isApprovalRequestPendingForReview(a)?`
                                                    <button class="btn-icon btn-icon-success" title="\u0627\u0639\u062A\u0645\u0627\u062F" onclick="Contractors.approveRequest('${a.id}', '${n}')">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger" title="\u0631\u0641\u0636" onclick="Contractors.rejectRequest('${a.id}', '${n}')">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                `:""}
                                            </div>
                                        `:`
                                            <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovalRequest('${a.id}', '${n}')">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        `}
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},getMyApprovalRequests(){Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=[]),Array.isArray(AppState.appData.contractorDeletionRequests)||(AppState.appData.contractorDeletionRequests=[]);const t=AppState.currentUser||{},e=String(t.id||"").trim(),a=String(t.email||"").trim().toLowerCase();if(!e&&!a)return[];const r=new Date;r.setDate(r.getDate()-7);const o=AppState.appData.contractorApprovalRequests.map(n=>this.normalizeApprovalRequestRecord(n)).filter(n=>n&&this.isCurrentUserApprovalRequestOwner(n)).filter(n=>String(n.requestType||"").trim()!=="evaluation").filter(n=>this.normalizeApprovalRequestStatus(n.status)==="approved"&&n.approvedAt?new Date(n.approvedAt)>=r:!0).map(n=>({...n,requestCategory:"approval"})),i=AppState.appData.contractorDeletionRequests.map(n=>this.normalizeApprovalRequestRecord(n)).filter(n=>n&&this.isCurrentUserApprovalRequestOwner(n)).filter(n=>this.normalizeApprovalRequestStatus(n.status)==="approved"&&n.approvedAt?new Date(n.approvedAt)>=r:!0).map(n=>({...n,requestCategory:"deletion"}));return[...o,...i,...this.getMyEvaluationApprovalRequests()].sort((n,l)=>{const c=n.createdAt?new Date(n.createdAt).getTime():0;return(l.createdAt?new Date(l.createdAt).getTime():0)-c})},getPendingApprovalRequests(){Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=[]),Array.isArray(AppState.appData.contractorDeletionRequests)||(AppState.appData.contractorDeletionRequests=[]);const t=AppState.appData.contractorApprovalRequests.map(o=>this.normalizeApprovalRequestRecord(o)).filter(o=>o&&this.isApprovalRequestPendingForReview(o)).filter(o=>String(o.requestType||"").trim()!=="evaluation").map(o=>({...o,requestCategory:"approval"})),e=AppState.appData.contractorDeletionRequests.map(o=>this.normalizeApprovalRequestRecord(o)).filter(o=>o&&this.isApprovalRequestPendingForReview(o)).map(o=>({...o,requestCategory:"deletion"})),a=this.getPendingEvaluationApprovalRequests();return[...t,...e,...a].sort((o,i)=>{const s=o.createdAt?new Date(o.createdAt).getTime():0,n=i.createdAt?new Date(i.createdAt).getTime():0;return s-n})},getApprovalRequestStatusBadge(t){const e=this.normalizeApprovalRequestStatus(t),r={pending:{label:"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644",class:"badge-warning"},under_review:{label:"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",class:"badge-info"},approved:{label:"\u0645\u0639\u062A\u0645\u062F",class:"badge-success"},rejected:{label:"\u0645\u0631\u0641\u0648\u0636",class:"badge-danger"}}[e]||{label:"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",class:"badge-secondary"};return`<span class="badge ${r.class}">${r.label}</span>`},showApprovalRequestForm(){const t=document.createElement("div");t.className="modal-overlay",t.id="contractor-approval-request-modal",t.innerHTML=`
            <div class="approval-premium-content" style="max-width:880px;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(15,23,42,0.2);background:#f8fafc;">

                <!-- HEADER: Deep navy gradient with micro-pattern -->
                <div class="approval-premium-header">
                    <div class="approval-premium-header-shine"></div>
                    <div style="position:relative;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                <i class="fas fa-paper-plane" style="font-size:16px;color:#fff;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>
                            </div>
                            <div>
                                <h2 style="margin:0;font-size:1rem;font-weight:700;color:#fff;letter-spacing:0.01em;">\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 / \u0645\u0648\u0631\u062F</h2>
                                <p style="margin:2px 0 0;font-size:0.75rem;color:rgba(255,255,255,0.65);font-weight:400;">\u064A\u064F\u0631\u0641\u0639 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0648\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</p>
                            </div>
                        </div>
                        <button type="button" class="modal-close" style="color:rgba(255,255,255,0.5);width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);transition:all 0.2s;flex-shrink:0;" onmouseover="this.style.background='rgba(255,255,255,0.18)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.5)'" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times" style="font-size:12px;"></i>
                        </button>
                    </div>
                </div>

                <!-- BODY compact -->
                <div class="approval-premium-body approval-body-compact">
                    <div id="approval-request-validation-hint" style="display:none;margin-bottom:10px;padding:10px 14px;border-radius:8px;background:linear-gradient(135deg,#fef2f2,#fff5f5);border:1px solid #fecaca;color:#b91c1c;font-size:0.82rem;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-circle" style="font-size:14px;color:#ef4444;flex-shrink:0;"></i>
                        <span id="approval-request-validation-message"></span>
                    </div>
                    <form id="approval-request-form">

                        <!-- COMBINED SECTION: \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644 -->
                        <div class="approval-premium-section approval-section-compact">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-clipboard-list" style="color:#3b82f6;font-size:12px;"></i>
                                \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0648\u0627\u0644\u062A\u0648\u0627\u0635\u0644
                            </h3>
                            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
                                <div style="grid-column:1/-1;">
                                    <label class="approval-premium-label">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628 *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-tag approval-premium-input-icon"></i>
                                        <select id="approval-request-type" class="approval-premium-select" required>
                                            <option value="">\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</option>
                                            <option value="contractor">\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u062C\u062F\u064A\u062F</option>
                                            <option value="supplier">\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u0631\u062F \u062C\u062F\u064A\u062F</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-building approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-company-name" class="approval-premium-input" required placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" autocomplete="organization">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0631\u0642\u0645 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-receipt approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-license" class="approval-premium-input" required placeholder="\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629 *</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-wrench approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-service-type" class="approval-premium-input" required placeholder="\u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u0645\u0637\u0644\u0648\u0628">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-user approval-premium-input-icon"></i>
                                        <input type="text" id="approval-request-contact-person" class="approval-premium-input" placeholder="\u0627\u0644\u0627\u0633\u0645">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-phone approval-premium-input-icon"></i>
                                        <input type="tel" id="approval-request-phone" class="approval-premium-input" placeholder="05X XXX XXXX" dir="ltr">
                                    </div>
                                </div>
                                <div>
                                    <label class="approval-premium-label">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                    <div class="approval-premium-input-wrapper">
                                        <i class="fas fa-envelope approval-premium-input-icon"></i>
                                        <input type="email" id="approval-request-email" class="approval-premium-input" placeholder="email@example.com" dir="ltr">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- COMPACT SECTION: \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0645\u0631\u0641\u0642\u0627\u062A -->
                        <div class="approval-premium-section approval-section-compact">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-sticky-note" style="color:#f59e0b;font-size:12px;"></i>
                                \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0648\u0645\u0631\u0641\u0642\u0627\u062A
                            </h3>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                <div>
                                    <textarea id="approval-request-notes" class="approval-premium-textarea" rows="2" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629..."></textarea>
                                </div>
                                <div>
                                    <div class="approval-premium-dropzone-compact" id="approval-dropzone">
                                        <i class="fas fa-cloud-upload-alt" style="font-size:18px;color:#94a3b8;flex-shrink:0;"></i>
                                        <span style="flex:1;font-size:0.82rem;color:#64748b;">\u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0641\u0642\u0627\u062A</span>
                                        <button type="button" class="btn-secondary btn-sm" id="approval-upload-btn" style="font-size:0.75rem;padding:4px 12px;border-radius:6px;">
                                            <i class="fas fa-folder-open ml-1"></i>
                                            \u062A\u0635\u0641\u062D
                                        </button>
                                        <input type="file" id="approval-request-attachments" style="display:none;" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx">
                                    </div>
                                    <p style="margin:4px 0 0;font-size:0.68rem;color:#94a3b8;">PDF, Word, Excel, \u0635\u0648\u0631 \u2014 \u062D\u062F 5MB</p>
                                    <div id="approval-request-attachments-list" style="margin-top:6px;display:flex;flex-direction:column;gap:4px;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- SECTION 5: Admin Custom Fields -->
                        ${Permissions.isAdmin()?`
                        <div class="approval-premium-section approval-section-compact" style="border-color:#e0e7ff;">
                            <h3 class="approval-premium-section-title">
                                <i class="fas fa-cog" style="color:#6366f1;font-size:12px;"></i>
                                \u0628\u0646\u0648\u062F \u0625\u0636\u0627\u0641\u064A\u0629 (\u0644\u0644\u0645\u062F\u064A\u0631)
                            </h3>
                            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                                <span style="font-size:0.78rem;color:#64748b;">\u0623\u0636\u0641 \u0628\u0646\u0648\u062F\u0627\u064B \u0625\u0636\u0627\u0641\u064A\u0629 \u0644\u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>
                                <button type="button" id="add-custom-field-btn" class="btn-secondary btn-sm" style="font-size:0.75rem;padding:4px 12px;border-radius:6px;">
                                    <i class="fas fa-plus ml-1"></i>
                                    \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F
                                </button>
                            </div>
                            <div id="custom-fields-container" style="display:flex;flex-direction:column;gap:6px;"></div>
                        </div>
                        `:""}

                        <!-- FOOTER compact -->
                        <div style="display:flex;justify-content:flex-end;align-items:center;gap:8px;padding-top:8px;border-top:1px solid #e2e8f0;">
                            <button type="button" class="btn-secondary" id="approval-request-cancel-btn" style="padding:7px 18px;border-radius:8px;font-size:0.82rem;">
                                \u0625\u0644\u063A\u0627\u0621
                            </button>
                            <button type="submit" class="btn-primary" id="approval-request-submit-btn" style="padding:7px 22px;border-radius:8px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border:none;font-weight:600;font-size:0.82rem;">
                                <i class="fas fa-paper-plane ml-1"></i>
                                <span class="submit-text">\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628</span>
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),this.applyModuleI18n(t);const e=t.querySelector("#approval-request-attachments"),a=t.querySelector("#approval-request-attachments-list"),r=t.querySelector("#approval-upload-btn"),o=t.querySelector("#approval-dropzone"),i=[],s=new Set,n=f=>{if(f.size>5*1024*1024)return Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${f.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D (5MB)`),!1;if(s.has(f.name))return!1;s.add(f.name),i.push(f);const u=document.createElement("div");u.className="approval-premium-file-item approval-premium-file-item-compact",u.setAttribute("data-file-name",f.name);const d=f.type.startsWith("image/");return u.innerHTML=`
                <div style="display:flex;align-items:center;gap:8px;">
                    <i class="fas ${d?"fa-file-image":"fa-file"}" style="color:${d?"#10b981":"#3b82f6"};font-size:13px;"></i>
                    <div>
                        <p style="margin:0;font-weight:500;color:#1e293b;line-height:1.3;">${Utils.escapeHTML(f.name)}</p>
                        <p class="file-size" style="margin:0;color:#94a3b8;">${(f.size/1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button type="button" class="remove-attachment-btn" style="width:24px;height:24px;border-radius:6px;border:none;background:transparent;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444'" onmouseout="this.style.background='transparent';this.style.color='#94a3b8'">
                    <i class="fas fa-times" style="font-size:10px;"></i>
                </button>
            `,u.querySelector(".remove-attachment-btn").addEventListener("click",()=>{s.delete(f.name);const m=i.indexOf(f);m!==-1&&i.splice(m,1),u.remove()}),a.appendChild(u),!0};if(r&&e&&r.addEventListener("click",()=>e.click()),o&&(["dragenter","dragover"].forEach(f=>{o.addEventListener(f,u=>{u.preventDefault(),u.stopPropagation(),o.classList.add("drag-over")})}),["dragleave","drop"].forEach(f=>{o.addEventListener(f,u=>{u.preventDefault(),u.stopPropagation(),o.classList.remove("drag-over")})}),o.addEventListener("drop",f=>{Array.from(f.dataTransfer.files).forEach(u=>n(u))})),e&&e.addEventListener("change",f=>{Array.from(f.target.files).forEach(u=>n(u)),f.target.value=""}),Permissions.isAdmin()){const f=t.querySelector("#add-custom-field-btn"),u=t.querySelector("#custom-fields-container");let d=0;f&&u&&f.addEventListener("click",()=>{const m=`custom-field-${d++}`,v=document.createElement("div");v.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;",v.innerHTML=`
                        <input type="text" class="approval-premium-input" style="padding:5px 10px;font-size:0.8rem;border-radius:6px;padding-right:10px;flex:1;" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0628\u0646\u062F" data-field-id="${m}">
                        <select class="approval-premium-select" style="width:90px;padding:5px 10px;font-size:0.78rem;border-radius:6px;padding-right:10px;" data-field-type="${m}">
                            <option value="text">\u0646\u0635</option>
                            <option value="document">\u0645\u0633\u062A\u0646\u062F</option>
                            <option value="checkbox">\u062E\u0627\u0646\u0629</option>
                        </select>
                        <label style="display:flex;align-items:center;gap:3px;font-size:0.76rem;color:#64748b;white-space:nowrap;">
                            <input type="checkbox" data-field-required="${m}">
                            \u0625\u0644\u0632\u0627\u0645\u064A
                        </label>
                        <button type="button" style="width:22px;height:22px;border-radius:5px;border:none;background:transparent;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444'" onmouseout="this.style.background='transparent';this.style.color='#94a3b8'" onclick="this.parentElement.remove()">
                            <i class="fas fa-times" style="font-size:9px;"></i>
                        </button>
                    `,u.appendChild(v)})}const l=t.querySelector("#approval-request-form"),c=t.querySelector("#approval-request-cancel-btn");let p=!1;if(!l){Utils.safeWarn("\u26A0\uFE0F showApprovalRequestForm: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),t.remove();return}c&&c.addEventListener("click",()=>t.remove()),l.addEventListener("submit",f=>{if(f.preventDefault(),!t||!document.contains(t)){Utils.safeWarn("\u26A0\uFE0F submit: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}if(p){Utils.safeLog("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0631\u0633\u0627\u0644 \u0645\u0643\u0631\u0631\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647\u0627");return}p=!0;const u=t.querySelector("#approval-request-validation-hint");if(u){u.style.display="none";const d=u.querySelector("#approval-request-validation-message");d&&(d.textContent="")}this.submitApprovalRequest(t,i).finally(()=>{p=!1})}),t.addEventListener("click",f=>{f.target===t&&t.remove()})},async submitApprovalRequest(t,e=[]){try{if(!t||!t.parentNode){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}const a=t.querySelector("#approval-request-form");if(!a){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const r=[];if(Permissions.isAdmin()){const v=a.querySelector("#custom-fields-container");v&&v.querySelectorAll("[data-field-id]").forEach(w=>{const b=w.getAttribute("data-field-id"),A=w.value.trim();if(A){const C=a.querySelector(`[data-field-type="${b}"]`)?.value||"text",k=a.querySelector(`[data-field-required="${b}"]`)?.checked||!1;r.push({id:Utils.generateId("CUSTOM"),name:A,type:C,required:k})}})}const o=a.querySelector("#approval-request-type"),i=a.querySelector("#approval-request-company-name"),s=a.querySelector("#approval-request-service-type"),n=a.querySelector("#approval-request-license"),l=a.querySelector("#approval-request-contact-person"),c=a.querySelector("#approval-request-phone"),p=a.querySelector("#approval-request-email"),f=a.querySelector("#approval-request-notes");if(!o||!i||!s||!n){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const u={requestType:o.value,companyName:i.value.trim(),serviceType:s.value.trim(),licenseNumber:n.value.trim(),contactPerson:(l?.value||"").trim(),phone:(c?.value||"").trim(),email:(p?.value||"").trim(),notes:(f?.value||"").trim(),attachments:[],attachmentFiles:e,customFields:r,status:"pending",createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""},d=this.validateNewApprovalRequest(u);if(!d.ok){const v=t.querySelector("#approval-request-validation-hint");if(v){const h=v.querySelector("#approval-request-validation-message");h?h.textContent=d.message:v.textContent=d.message,v.style.display="flex"}Notification.error(d.message);return}this.ensureApprovalRequestsSetup();const m="TEMP_"+Date.now()+"_"+Math.random().toString(36).substr(2,9);u.id=m,u._isPendingSync=!0,AppState.appData.contractorApprovalRequests.push(u),this._closeApprovalRequestModal(t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. ID \u0645\u0624\u0642\u062A: "+m),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628. \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645..."),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh(),this.syncApprovalRequestToBackend(u,e,m).then(()=>{Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D."),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh()}).catch(v=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 Backend:",v)})}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",a),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: "+a.message)}},async syncApprovalRequestToBackend(t,e=[],a){const r=t;if(String(r?.requestType||"").trim()==="evaluation")return this.syncEvaluationApprovalRequestToBackend(r,a);t=this.prepareApprovalRequestPayloadForBackend(r);const o=`sync_${a||r?.id||Date.now()}`;if(this._activeSyncs&&this._activeSyncs[o]){Utils.safeLog("\u26A0\uFE0F syncApprovalRequestToBackend: \u0645\u0632\u0627\u0645\u0646\u0629 \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0637\u0644\u0628 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0627\u0644\u0645\u0643\u0631\u0631");return}this._activeSyncs||(this._activeSyncs={}),this._activeSyncs[o]=!0;try{let i=[];if(e&&e.length>0)try{const l=e.map(async p=>{try{const f=await new Promise((d,m)=>{const v=new FileReader;v.onload=()=>{const h=v.result.split(",")[1];d(h)},v.onerror=m,v.readAsDataURL(p)}),u=await GoogleIntegration.uploadFileToDrive(f,p.name,p.type,"contractor-approval-attachments");return u&&u.url?{name:p.name,url:u.url,size:p.size,type:p.type}:null}catch(f){return Utils.safeWarn("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 "+p.name+":",f),null}});i=(await Promise.all(l)).filter(p=>p!==null),i.length<e.length&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A. \u062A\u0645 \u0631\u0641\u0639 "+i.length+" \u0645\u0646 "+e.length)}catch(l){Utils.safeWarn("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",l)}t.attachments=i,delete t.attachmentFiles;const s=a||r?.id||t.id;delete t.id,Utils.safeLog("\u{1F504} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649 Backend \u0628\u062F\u0648\u0646 ID (tempId="+s+" \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644\u0647 \u0628\u0640 CAR_... \u0645\u0646 Backend)");const n=await GoogleIntegration.sendRequest({action:"addContractorApprovalRequest",data:t});if(n&&n.success){const l=n.data||t;(!l.id||l.id.startsWith("TEMP_"))&&(Utils.safeError("\u274C \u062E\u0637\u0623: Backend \u0644\u0645 \u064A\u0648\u0644\u062F ID \u062C\u062F\u064A\u062F. savedRequest.id="+(l.id||"undefined")),l.id="CAR_"+Date.now()),(!l.id||!l.id.startsWith("CAR_"))&&Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: ID \u0627\u0644\u0645\u064F\u0648\u0644\u062F \u0644\u0627 \u064A\u0628\u062F\u0623 \u0628\u0640 CAR_. ID="+(l.id||"undefined")),Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 tempId="+s+" \u0628\u0627\u0644\u0640 ID \u0627\u0644\u0641\u0639\u0644\u064A="+l.id);let c=AppState.appData.contractorApprovalRequests.findIndex(p=>p.id===s);if(c===-1&&s!==a&&(c=AppState.appData.contractorApprovalRequests.findIndex(p=>p.id===a)),c===-1&&(c=AppState.appData.contractorApprovalRequests.findIndex(p=>p.status!=="pending"||!(p.id?.startsWith("TEMP_")||p._isPendingSync)?!1:t.requestType==="evaluation"?p.requestType==="evaluation"&&(p.contractorId===t.contractorId||p.contractorName===t.contractorName):p.companyName===t.companyName)),c!==-1){const p=AppState.appData.contractorApprovalRequests[c].id,f=AppState.appData.contractorApprovalRequests[c].evaluationData;AppState.appData.contractorApprovalRequests[c]={...AppState.appData.contractorApprovalRequests[c],...l,id:l.id,evaluationData:l.evaluationData||f,_isPendingSync:!1,_syncError:!1},delete AppState.appData.contractorApprovalRequests[c]._isPendingSync,delete AppState.appData.contractorApprovalRequests[c]._syncError,delete AppState.appData.contractorApprovalRequests[c]._syncErrorMessage,Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0624\u0642\u062A \u0641\u064A AppState. oldID="+p+" -> newID="+l.id+", tempIndex="+c)}else Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0624\u0642\u062A \u0641\u064A AppState. tempId="+s),(!l.id||l.id.startsWith("TEMP_"))&&(Utils.safeError("\u274C \u062E\u0637\u0623: savedRequest.id \u063A\u064A\u0631 \u0635\u062D\u064A\u062D. savedRequest.id="+(l.id||"undefined")),l.id="CAR_"+Date.now()),l._isPendingSync=!1,AppState.appData.contractorApprovalRequests.push(l),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u062C\u062F\u064A\u062F \u0645\u0628\u0627\u0634\u0631\u0629 \u0625\u0644\u0649 AppState. newID="+l.id);Object.assign(t,l),t.id=l.id,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend \u0628\u0646\u062C\u0627\u062D. ID: "+(t.id||"N/A")),this.currentTab==="approval-request"&&this.refreshApprovalRequestsSection();try{typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&(RealtimeSyncManager.notifyChange("contractorApprovalRequests","add",t.id),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 Real-time \u0628\u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u062C\u062F\u064A\u062F")),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.state&&RealtimeSyncManager.state.broadcastChannel&&(RealtimeSyncManager.state.broadcastChannel.postMessage({type:"DATA_CHANGED",module:"contractors",action:"approvalRequestAdded",data:{requestId:t.id,companyName:t.companyName,createdBy:AppState.currentUser?.id||""}}),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 Broadcast \u0644\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629"))}catch(p){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A Real-time:",p)}this.notifyAdminsAboutApprovalRequest(t).catch(p=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",p)}),this._scheduleApprovalNotificationsRefresh(),t.requestType==="evaluation"?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D."):Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.")}else{const l=n?.message||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629",c=!!n?.duplicateInfo||/مسجلة بالفعل|قيد المراجعة|مطلوب|غير مدعوم/i.test(l),p=a||s;if(c)Utils.safeWarn("\u26A0\uFE0F \u0631\u0641\u0636 Backend \u0644\u0637\u0644\u0628 \u0645\u0643\u0631\u0631 \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D: "+l),this._removeLocalApprovalRequestById(p),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.error(l),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh();else{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend\u060C \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637");const f=AppState.appData.contractorApprovalRequests.findIndex(u=>u.id===p);f!==-1&&(AppState.appData.contractorApprovalRequests[f]._syncError=!0,AppState.appData.contractorApprovalRequests[f]._syncErrorMessage=l),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")}}}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend:",i);const s=AppState.appData.contractorApprovalRequests.findIndex(n=>n.id===a);throw s!==-1&&(AppState.appData.contractorApprovalRequests[s]._syncError=!0,AppState.appData.contractorApprovalRequests[s]._syncErrorMessage=i.message||"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),i}finally{this._activeSyncs&&this._activeSyncs[o]&&delete this._activeSyncs[o]}},async syncEvaluationApprovalRequestToBackend(t,e){const a=t,r=`sync_eval_${e||a?.id||Date.now()}`;if(!(this._activeSyncs&&this._activeSyncs[r])){this._activeSyncs||(this._activeSyncs={}),this._activeSyncs[r]=!0;try{this.ensureEvaluationApprovalRequestsSetup();const o={...a},i=e||o.id,s=i&&String(i).startsWith("TEMP_");s?delete o.id:i&&(o.id=i),delete o._isPendingSync,delete o._syncError,delete o._syncErrorMessage,delete o.legacyTempId,delete o._tempId,o.requestType="evaluation",o.evaluationData&&typeof o.evaluationData=="object"&&(o.evaluationData=JSON.stringify(o.evaluationData));const n=await GoogleIntegration.sendRequest({action:"addContractorEvaluationApprovalRequest",data:o});if(n?.success){const l=n.data||o;if((!l.id||l.id.startsWith("TEMP_"))&&(l.id="CEAR_"+Date.now()),l.evaluationData&&typeof l.evaluationData=="string")try{l.evaluationData=JSON.parse(l.evaluationData)}catch{}let c=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(p=>{if(!p)return!1;const f=String(p.id||"").trim(),u=String(p.legacyTempId||p._tempId||"").trim(),d=String(i||"").trim();return f===d||u===d});if(c!==-1){const p=AppState.appData.contractorEvaluationApprovalRequests[c].evaluationData,f=s?String(i).trim():AppState.appData.contractorEvaluationApprovalRequests[c].legacyTempId||"";AppState.appData.contractorEvaluationApprovalRequests[c]={...AppState.appData.contractorEvaluationApprovalRequests[c],...l,id:l.id,evaluationData:l.evaluationData||p,requestType:"evaluation",legacyTempId:f||void 0,_isPendingSync:!1},delete AppState.appData.contractorEvaluationApprovalRequests[c]._syncError}else l.requestType="evaluation",AppState.appData.contractorEvaluationApprovalRequests.push(l);window.DataManager?.save&&window.DataManager.save(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("contractorEvaluationApprovalRequests","add",l.id),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D.")}else{const l=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(c=>c.id===i);l!==-1&&(AppState.appData.contractorEvaluationApprovalRequests[l]._syncError=!0,AppState.appData.contractorEvaluationApprovalRequests[l]._syncErrorMessage=n?.message||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),window.DataManager?.save&&window.DataManager.save(),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",o);const i=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(s=>s.id===e);throw i!==-1&&(AppState.appData.contractorEvaluationApprovalRequests[i]._syncError=!0,AppState.appData.contractorEvaluationApprovalRequests[i]._syncErrorMessage=o.message||"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),o}finally{this._activeSyncs?.[r]&&delete this._activeSyncs[r]}}},async notifyAdminsAboutApprovalRequest(t){try{const a=(AppState.appData.users||[]).filter(o=>{if(!o||o.active===!1)return!1;const i=(o.role||"").toLowerCase();return i==="admin"||i==="\u0645\u062F\u064A\u0631"||o.permissions&&(o.permissions.isAdmin===!0||o.permissions.admin===!0)});if(a.length===0)try{const o=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});o&&o.success&&Array.isArray(o.data)&&a.push(...o.data.filter(i=>{if(!i||i.active===!1)return!1;const s=(i.role||"").toLowerCase();return s==="admin"||s==="\u0645\u062F\u064A\u0631"}))}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 Google Sheets:",o)}const r={contractor:"\u0645\u0642\u0627\u0648\u0644",supplier:"\u0645\u0648\u0631\u062F",evaluation:"\u062A\u0642\u064A\u064A\u0645"}[t.requestType]||t.requestType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const o of a)if(o.id||o.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:o.id||o.email,title:"\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u062C\u062F\u064A\u062F \u064A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0639\u062A\u0645\u0627\u062F ${r}: "${t.companyName||""}"`,type:"contractor_approval",priority:"high",link:"#contractors-section",data:{module:"contractors",action:"approval_request",requestId:t.id,requestType:t.requestType}}}).catch(i=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)})}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)}}catch(e){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",e)}},mountApprovalRequestSection(){const t=document.getElementById("contractors-approval-request-content");if(!t)return;const e=this.renderApprovalRequestSection();typeof this.safeSetInnerHTML=="function"?this.safeSetInnerHTML(t,e):t.innerHTML=e;const a=document.getElementById("send-approval-request-btn");a&&!a.hasAttribute("data-listener-attached")&&(a.setAttribute("data-listener-attached","true"),a.addEventListener("click",()=>this.showApprovalRequestForm()))},refreshApprovalRequestsSection(){if(this.currentTab!=="approval-request")return;const t=this.isContractorApprovalAdminUser(),e=document.getElementById("pending-approval-requests-section"),a=document.getElementById("pending-approval-requests-container");if(t&&!a){this.mountApprovalRequestSection();return}if(!this._isRefreshingApprovalRequests){this._isRefreshingApprovalRequests=!0;try{const r=document.getElementById("my-approval-requests-container");if(r){const o=this.getMyApprovalRequests();r.innerHTML=this.renderApprovalRequestsTable(o,!1)}if(e&&(e.style.display=t?"block":"none"),t&&a){const o=this.getPendingApprovalRequests();a.innerHTML=this.renderApprovalRequestsTable(o,!0)}}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)}finally{this._isRefreshingApprovalRequests=!1}}},async viewApprovalRequest(t,e="approval"){this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();const a=String(t||"").trim();let r;if(e==="deletion"?r=(AppState.appData.contractorDeletionRequests||[]).find(w=>w&&String(w.id||"").trim()===a):e==="evaluation_approval"?(await this.syncPendingEvaluationApprovalRequests(a),r=this.findEvaluationApprovalRequest(a),r||(await this.fetchEvaluationApprovalRequestsFromBackend(),r=this.findEvaluationApprovalRequest(a))):r=(AppState.appData.contractorApprovalRequests||[]).find(w=>w&&String(w.id||"").trim()===a),r||(r=this.findEvaluationApprovalRequest(a),r&&(e="evaluation_approval")),!r){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=this.isContractorApprovalAdminUser(),i=this.getApprovalRequestStatusBadge(r.status),s=e==="deletion",n=e==="evaluation_approval"||!s&&r.requestType==="evaluation",l=o&&!s&&this.isApprovalRequestPendingForReview(r);let c=null;if(n){c=r.evaluationData;let w=0;for(;c&&typeof c=="string"&&w<3;)try{c=JSON.parse(c),w++}catch(C){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 evaluationData \u0645\u0646 \u0627\u0644\u0646\u0635 (\u0645\u062D\u0627\u0648\u0644\u0629 "+w+"):",C);break}c&&typeof c!="object"&&(Utils.safeWarn("\u26A0\uFE0F evaluationData \u0644\u064A\u0633 \u0643\u0627\u0626\u0646\u0627\u064B \u0635\u0627\u0644\u062D\u0627\u064B:",typeof c),c=null),c&&(c.evaluationDate||c.evaluatorName||c.projectName||c.location||c.finalScore!==void 0||c.items&&c.items.length>0)||(Utils.safeLog("\u{1F4CB} evaluationData \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0645\u0628\u0627\u0634\u0631\u0629"),c={evaluationDate:r.evaluationDate||c?.evaluationDate||null,evaluatorName:r.evaluatorName||c?.evaluatorName||r.createdByName||"",projectName:r.projectName||c?.projectName||r.location||"",location:r.location||c?.location||r.projectName||"",compliantCount:r.compliantCount??c?.compliantCount??0,totalItems:r.totalItems??c?.totalItems??0,finalScore:r.finalScore??c?.finalScore??null,finalRating:r.finalRating||c?.finalRating||"",generalNotes:r.generalNotes||c?.generalNotes||r.notes||"",items:r.items||c?.items||[],id:r.entityId||r.evaluationId||c?.id||null});let A=0;for(;c?.items&&typeof c.items=="string"&&A<3;)try{c.items=JSON.parse(c.items),A++}catch(C){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u0646\u0635:",C),c.items=[];break}Utils.safeLog("\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u0631\u062C\u0629:",c),Utils.safeLog("\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",r)}const p=Array.isArray(c?.items)?c.items:c?.items&&typeof c.items=="object"?Object.values(c.items):[],f=c?.finalScore,u=typeof f=="number"?f:f!=null&&!isNaN(parseFloat(f))?parseFloat(f):null;let d,m;s?(d=r.requestType==="contractor"?"\u062D\u0630\u0641 \u0645\u0642\u0627\u0648\u0644":r.requestType==="approved_entity"?"\u062D\u0630\u0641 \u0645\u0639\u062A\u0645\u062F":r.requestType==="evaluation"?"\u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645":"\u062D\u0630\u0641",m=r.entityName||r.companyName||""):n?(d="\u0637\u0644\u0628 \u062A\u0642\u064A\u064A\u0645 \u0645\u0642\u0627\u0648\u0644",m=r.contractorName||""):(d=r.requestType==="contractor"?"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644":"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u0631\u062F",m=r.companyName||r.contractorName||""),this.injectAntiShakeStyles();const v=document.createElement("div");v.id="contractor-approval-request-details-modal",v.className="modal-overlay ctr-detail-modal",v.innerHTML=`
            <div class="modal-content ctr-detail-dialog ctr-detail-dialog--wide">
                <div class="modal-header ctr-detail-head">
                    <div class="ctr-detail-head__copy">
                        <span class="ctr-detail-head__icon"><i class="fas ${s?"fa-trash-can":n?"fa-clipboard-check":"fa-file-signature"}"></i></span>
                        <div>
                            <span class="ctr-detail-head__eyebrow">${Utils.escapeHTML(d)}</span>
                            <h2 class="modal-title">${s?"\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641":"\u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"}</h2>
                            <p>${Utils.escapeHTML(m||"\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0633\u0645\u0649")} \xB7 ${Utils.escapeHTML(String(r.id||""))}</p>
                        </div>
                    </div>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body ctr-detail-body ctr-request-detail-body">
                    ${l?`
                        <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-blue-800">
                                    <i class="fas fa-info-circle ml-2"></i>
                                    \u064A\u0645\u0643\u0646\u0643 \u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0642\u0628\u0644 \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u064A\u0647
                                </p>
                                <button id="toggle-edit-mode-btn" class="btn-sm btn-secondary" onclick="Contractors.toggleEditMode()">
                                    <i class="fas fa-edit ml-1"></i>
                                    \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0639\u062F\u064A\u0644
                                </button>
                            </div>
                        </div>
                    `:""}
                    <form id="request-details-form">
                        <div class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u0637\u0644\u0628</label>
                                    <p class="text-gray-800">${d}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                    <p>${i}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">${s?"\u0627\u0633\u0645 \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u0631\u0627\u062F \u062D\u0630\u0641\u0647":n?"\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644"}</label>
                                    ${n?l?`
                                    <input type="text" id="edit-companyName" class="form-input edit-field" value="${Utils.escapeHTML(m)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(m)}</p>
                                    `:`
                                    <p class="text-gray-800">${Utils.escapeHTML(m)}</p>
                                    `:`
                                    <input type="text" id="edit-companyName" class="form-input edit-field" disabled value="${Utils.escapeHTML(m)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(m)}</p>
                                    `}
                                </div>
                                ${n&&c?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <input type="date" id="edit-evaluationDate" class="form-input edit-field" disabled value="${c.evaluationDate?typeof c.evaluationDate=="string"?c.evaluationDate.slice(0,10):new Date(c.evaluationDate).toISOString().slice(0,10):""}" style="display: none;" />
                                    <p id="view-evaluationDate" class="text-gray-800 view-field" style="display: block;">${c.evaluationDate?Utils.formatDate(c.evaluationDate):"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0651\u0645</label>
                                    <input type="text" id="edit-evaluatorName" class="form-input edit-field" disabled value="${Utils.escapeHTML(c.evaluatorName||"")}" style="display: none;" />
                                    <p id="view-evaluatorName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(c.evaluatorName||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(c.projectName||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(c.location||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</label>
                                    <p class="text-gray-800">${c.compliantCount??0} \u0645\u0646 ${c.totalItems??p.length??0}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <p class="text-gray-800 font-bold ${u>=90?"text-green-600":u>=75?"text-blue-600":u>=60?"text-yellow-600":u===null?"text-gray-500":"text-red-600"}">${typeof u=="number"?u.toFixed(0)+"%":"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</label>
                                    <span class="badge ${u>=90?"badge-success":u>=75?"badge-info":u>=60?"badge-warning":u===null?"badge-secondary":"badge-danger"}">${Utils.escapeHTML(c.finalRating||"")}</span>
                                </div>
                                `:""}
                                ${s&&r.reason?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(r.reason)}</p>
                                </div>
                                `:""}
                                ${!s&&!n?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629 / \u0627\u0644\u0646\u0634\u0627\u0637</label>
                                    <input type="text" id="edit-serviceType" class="form-input edit-field" disabled value="${Utils.escapeHTML(r.serviceType||"")}" style="display: none;" />
                                    <p id="view-serviceType" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(r.serviceType||"")}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635</label>
                                    <input type="text" id="edit-licenseNumber" class="form-input edit-field" disabled value="${Utils.escapeHTML(r.licenseNumber||"")}" style="display: none;" />
                                    <p id="view-licenseNumber" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(r.licenseNumber||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</label>
                                    <input type="text" id="edit-contactPerson" class="form-input edit-field" disabled value="${Utils.escapeHTML(r.contactPerson||"")}" style="display: none;" />
                                    <p id="view-contactPerson" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(r.contactPerson||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641</label>
                                    <input type="text" id="edit-phone" class="form-input edit-field" disabled value="${Utils.escapeHTML(r.phone||"")}" style="display: none;" />
                                    <p id="view-phone" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(r.phone||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A</label>
                                    <input type="email" id="edit-email" class="form-input edit-field" disabled value="${Utils.escapeHTML(r.email||"")}" style="display: none;" />
                                    <p id="view-email" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(r.email||"")||"\u2014"}</p>
                                </div>
                                `:""}
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0631\u0633\u0627\u0644</label>
                                    <p class="text-gray-800">${r.createdAt?Utils.formatDate(r.createdAt):"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0623\u0631\u0633\u0644 \u0628\u0648\u0627\u0633\u0637\u0629</label>
                                    <p class="text-gray-800">${Utils.escapeHTML(r.createdByName||"")||"\u2014"}</p>
                                </div>
                            </div>
                            ${n&&p.length>0?`
                                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                                    <label class="text-sm font-semibold text-gray-600 block mb-3">
                                        <i class="fas fa-clipboard-list ml-2"></i>
                                        \u062A\u0641\u0627\u0635\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 (${p.length} \u0628\u0646\u062F)
                                    </label>
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-100">
                                                <tr>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">\u0627\u0644\u0628\u0646\u062F</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                ${p.map((w,b)=>{const A=w.status==="compliant"?"\u0645\u0637\u0627\u0628\u0642":w.status==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"\u2014",C=w.status==="compliant"?"text-green-600":w.status==="non_compliant"?"text-red-600":"text-gray-500",k=w.status==="compliant"?"fa-check-circle":w.status==="non_compliant"?"fa-times-circle":"fa-minus-circle";return`
                                                    <tr>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-700">${b+1}</td>
                                                        <td class="px-3 py-2 text-sm text-gray-700">${Utils.escapeHTML(w.title||w.label||"")}</td>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm ${C}">
                                                            <i class="fas ${k} ml-1"></i>
                                                            ${A}
                                                        </td>
                                                        <td class="px-3 py-2 text-sm text-gray-600">${Utils.escapeHTML(w.notes||"\u2014")}</td>
                                                    </tr>
                                                    `}).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            `:""}
                            ${n&&c?`
                                <div class="bg-blue-50 border border-blue-200 rounded p-3">
                                    <label class="text-sm font-semibold text-blue-800 block mb-2">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629</label>
                                    <textarea id="edit-generalNotes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(c.generalNotes||"")}</textarea>
                                    <p id="view-generalNotes" class="text-blue-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(c.generalNotes||"")||"\u2014"}</p>
                                </div>
                            `:""}
                            ${!s&&!n&&r.notes?`
                                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                                    <label class="text-sm font-semibold text-gray-600 block mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                    <textarea id="edit-notes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(r.notes)}</textarea>
                                    <p id="view-notes" class="text-gray-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(r.notes)}</p>
                                </div>
                            `:""}
                            ${l?`
                                <div id="save-changes-section" class="border-t pt-4" style="display: none;">
                                    <button type="button" id="save-changes-btn" class="btn-primary">
                                        <i class="fas fa-save ml-2"></i>
                                        \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A
                                    </button>
                                    <button type="button" class="btn-secondary" onclick="Contractors.toggleEditMode()">
                                        <i class="fas fa-times ml-2"></i>
                                        \u0625\u0644\u063A\u0627\u0621
                                    </button>
                                </div>
                            `:""}
                        </div>
                    </form>
                    ${!s&&r.attachments&&r.attachments.length>0?`
                            <div class="bg-blue-50 border border-blue-200 rounded p-3">
                                <label class="text-sm font-semibold text-blue-800 block mb-2">
                                    <i class="fas fa-paperclip ml-2"></i>
                                    \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A (${r.attachments.length})
                                </label>
                                <div class="space-y-2">
                                    ${r.attachments.map(w=>`
                                        <div class="flex items-center justify-between p-2 bg-white rounded border">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-file text-blue-600"></i>
                                                <span class="text-sm text-gray-700">${Utils.escapeHTML(w.name)}</span>
                                                ${w.size?`<span class="text-xs text-gray-500">(${(w.size/1024/1024).toFixed(2)} MB)</span>`:""}
                                            </div>
                                            ${w.url?`
                                                <a href="${w.url}" target="_blank" class="btn-secondary btn-sm">
                                                    <i class="fas fa-download ml-1"></i>
                                                    \u062A\u062D\u0645\u064A\u0644
                                                </a>
                                            `:""}
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `:""}
                        ${!s&&r.customFields&&r.customFields.length>0?`
                            <div class="bg-purple-50 border border-purple-200 rounded p-3">
                                <label class="text-sm font-semibold text-purple-800 block mb-2">
                                    <i class="fas fa-list-check ml-2"></i>
                                    \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 (${r.customFields.length})
                                </label>
                                <div class="space-y-2">
                                    ${r.customFields.map(w=>`
                                        <div class="flex items-center gap-2 p-2 bg-white rounded border">
                                            <span class="text-sm text-gray-700">${Utils.escapeHTML(w.name)}</span>
                                            <span class="badge badge-info text-xs">${w.type==="text"?"\u0646\u0635":w.type==="document"?"\u0645\u0633\u062A\u0646\u062F":"\u062E\u0627\u0646\u0629 \u0627\u062E\u062A\u064A\u0627\u0631"}</span>
                                            ${w.required?'<span class="badge badge-warning text-xs">\u0625\u0644\u0632\u0627\u0645\u064A</span>':""}
                                        </div>
                                    `).join("")}
                                </div>
                            </div>
                        `:""}
                        ${s&&r.reason?`
                            <div class="bg-yellow-50 border border-yellow-200 rounded p-3">
                                <label class="text-sm font-semibold text-yellow-800 block mb-2">\u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641</label>
                                <p class="text-yellow-700 whitespace-pre-line">${Utils.escapeHTML(r.reason)}</p>
                            </div>
                        `:""}
                        ${r.approvedAt?`
                            <div class="bg-green-50 border border-green-200 rounded p-3">
                                <label class="text-sm font-semibold text-green-800 block mb-2">${s?"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0648\u0627\u0633\u0637\u0629":"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F"}</label>
                                <p class="text-green-700">${s?Utils.escapeHTML(r.approvedByName||"")+" - ":""}${Utils.formatDate(r.approvedAt)}</p>
                            </div>
                        `:""}
                        ${r.rejectedAt?`
                            <div class="bg-red-50 border border-red-200 rounded p-3">
                                <label class="text-sm font-semibold text-red-800 block mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0636</label>
                                <p class="text-red-700">${Utils.formatDate(r.rejectedAt)}</p>
                                ${r.rejectionReason?`
                                    <label class="text-sm font-semibold text-red-800 block mb-2 mt-2">\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636</label>
                                    <p class="text-red-700">${Utils.escapeHTML(r.rejectionReason)}</p>
                                `:""}
                            </div>
                        `:""}
                    </div>
                <div class="modal-footer ctr-detail-footer" style="margin-top: auto; flex-shrink: 0; width: 100%;">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-xmark ml-2"></i>\u0625\u063A\u0644\u0627\u0642</button>
                    ${n&&c?.id?`
                        <button class="btn-info" onclick="Contractors.viewEvaluation('${c.id}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-clipboard-check ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0643\u0627\u0645\u0644\u0627\u064B
                        </button>
                    `:""}
                    ${o&&this.isApprovalRequestPendingForReview(r)?`
                        <button class="btn-success" onclick="Contractors.approveRequest('${r.id}', '${e}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-check ml-2"></i>\u0627\u0639\u062A\u0645\u0627\u062F
                        </button>
                        <button class="btn-danger" onclick="Contractors.rejectRequest('${r.id}', '${e}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-times ml-2"></i>\u0631\u0641\u0636
                        </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(v);const h=v.querySelector("#save-changes-btn");h&&h.addEventListener("click",async()=>{await this.saveRequestChanges(t,e)}),v.addEventListener("click",w=>{w.target===v&&v.remove()})},toggleEditMode(){const t=document.querySelectorAll(".edit-field"),e=document.querySelectorAll(".view-field"),a=document.getElementById("save-changes-section"),r=document.getElementById("toggle-edit-mode-btn");if(!t.length)return;const o=!t[0].disabled;t.forEach(i=>{i.disabled=o,i.style.display=o?"none":"block"}),e.forEach(i=>{i.style.display=o?"block":"none"}),a&&(a.style.display=o?"none":"block"),r&&(o?r.innerHTML='<i class="fas fa-edit ml-1"></i> \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0639\u062F\u064A\u0644':r.innerHTML='<i class="fas fa-eye ml-1"></i> \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u062F\u064A\u0644')},async saveRequestChanges(t,e="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}Loading.show();try{let a;if(e==="deletion"?a=(AppState.appData.contractorDeletionRequests||[]).find(n=>n.id===t):a=(AppState.appData.contractorApprovalRequests||[]).find(n=>n.id===t),!a)throw new Error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");const r=a.requestType==="evaluation";let o;if(r){const n=document.getElementById("edit-companyName")?.value?.trim()??"",l=document.getElementById("edit-evaluationDate")?.value?.trim()||null,c=document.getElementById("edit-evaluatorName")?.value?.trim()??"",p=document.getElementById("edit-generalNotes")?.value?.trim()??"";let f=a.evaluationData;if(typeof f=="string")try{f=JSON.parse(f)}catch{f={}}f=f||{},f.evaluationDate=l?new Date(l).toISOString():f.evaluationDate||null,f.evaluatorName=c,f.generalNotes=p,a.contractorName=n,a.evaluationData=f,a.updatedAt=new Date().toISOString(),a.updatedBy=AppState.currentUser?.id||"",a.updatedByName=AppState.currentUser?.name||"",o={contractorName:n,evaluationData:f,updatedAt:a.updatedAt,updatedBy:a.updatedBy,updatedByName:a.updatedByName}}else{const n=document.getElementById("edit-companyName")?.value?.trim(),l=document.getElementById("edit-serviceType")?.value?.trim(),c=document.getElementById("edit-licenseNumber")?.value?.trim(),p=document.getElementById("edit-contactPerson")?.value?.trim(),f=document.getElementById("edit-phone")?.value?.trim(),u=document.getElementById("edit-email")?.value?.trim(),d=document.getElementById("edit-notes")?.value?.trim();if(!n){Notification.error("\u064A\u062C\u0628 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629/\u0627\u0644\u0645\u0642\u0627\u0648\u0644"),Loading.hide();return}a.companyName=n,l!==void 0&&(a.serviceType=l),c!==void 0&&(a.licenseNumber=c),p!==void 0&&(a.contactPerson=p),f!==void 0&&(a.phone=f),u!==void 0&&(a.email=u),d!==void 0&&(a.notes=d),a.updatedAt=new Date().toISOString(),a.updatedBy=AppState.currentUser?.id||"",a.updatedByName=AppState.currentUser?.name||"",o={companyName:n,serviceType:l,licenseNumber:c,contactPerson:p,phone:f,email:u,notes:d,updatedAt:a.updatedAt,updatedBy:a.updatedBy,updatedByName:a.updatedByName}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const i=e==="deletion"?"updateContractorDeletionRequest":"updateContractorApprovalRequest",s=await GoogleIntegration.sendRequest({action:i,data:{requestId:t,updateData:o}});if(s&&s.success){Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D");const n=document.querySelector(".modal-overlay");n&&n.remove(),this.refreshApprovalRequestsSection()}else throw new Error(s?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A")}catch(a){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A:",a),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A: "+a.message)}finally{Loading.hide()}},async approveRequest(t,e="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();let a;if(e==="deletion"){if(a=(AppState.appData.contractorDeletionRequests||[]).find(i=>i.id===t),!a){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631 \u0646\u0647\u0627\u0626\u064A\u0627\u064B."))return;try{Loading.show();const i=await GoogleIntegration.callBackend("approveContractorDeletionRequest",{requestId:t,userData:AppState.currentUser});if(i&&i.success){if(a.status="approved",a.approvedAt=new Date().toISOString(),a.approvedBy=AppState.currentUser?.id||"",a.approvedByName=AppState.currentUser?.name||"",a.requestType==="contractor"){const s=AppState.appData.contractors||[],n=s.findIndex(p=>p.id===a.entityId);n!==-1&&(s.splice(n,1),AppState.appData.contractors=s);const l=AppState.appData.approvedContractors||[],c=l.findIndex(p=>p.contractorId===a.entityId||p.id===a.entityId);c!==-1&&(l.splice(c,1),AppState.appData.approvedContractors=l)}else if(a.requestType==="approved_entity"){const s=AppState.appData.approvedContractors||[],n=s.findIndex(l=>l.id===a.entityId);if(n!==-1){const l=s[n];if(s.splice(n,1),AppState.appData.approvedContractors=s,l.contractorId){const c=AppState.appData.contractors||[],p=c.findIndex(f=>f.id===l.contractorId);p!==-1&&(c.splice(p,1),AppState.appData.contractors=c)}}}else if(a.requestType==="evaluation"){const s=AppState.appData.contractorEvaluations||[],n=s.findIndex(l=>l.id===a.entityId);n!==-1&&(s.splice(n,1),AppState.appData.contractorEvaluations=s)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D"),this.refreshApprovalRequestsSection(),this.load(!0),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}else Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+i.message)}return}if(e==="evaluation_approval"){if(await this.syncPendingEvaluationApprovalRequests(t),a=this.findEvaluationApprovalRequest(t),a||(await this.fetchEvaluationApprovalRequestsFromBackend(),a=this.findEvaluationApprovalRequest(t)),!a){Notification.error("\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=String(a.id||"").trim();if(a._isPendingSync||i.startsWith("TEMP_")||a._syncError){Notification.error(a._syncErrorMessage||"\u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0633\u064A\u064F\u0636\u0627\u0641 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."))return;try{Loading.show();const s=await GoogleIntegration.callBackend("approveContractorEvaluationApprovalRequest",{requestId:a.id||t,userData:AppState.currentUser});if(!s?.success){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+(s?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}a.status="approved",a.approvedAt=new Date().toISOString(),a.approvedBy=AppState.currentUser?.id||"",a.approvedByName=AppState.currentUser?.name||"";const n=this.parseEvaluationDataFromRequest(a);n&&(n.status="approved",n.approvedAt=new Date().toISOString(),n.approvedBy=AppState.currentUser?.id||"",this.persistEvaluation(n,null,{skipAutoSave:!0,replaceExisting:!0})),window.DataManager?.save&&window.DataManager.save();try{await GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0,sheets:["ContractorEvaluationApprovalRequests","ContractorEvaluations"]})}catch{}Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D."),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),this.refreshEvaluationsList(this.currentEvaluationFilter||""),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",s),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+s.message)}return}if(a=(AppState.appData.contractorApprovalRequests||[]).find(i=>i.id===t),!a&&this.findEvaluationApprovalRequest(t))return this.approveRequest(t,"evaluation_approval");if(!a&&t.startsWith("TEMP_")){Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0627 \u064A\u0632\u0627\u0644 \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0642\u0644\u064A\u0644\u0627\u064B \u062B\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."),Utils.safeWarn("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0628\u0645\u064F\u0639\u0631\u0641 \u0645\u0624\u0642\u062A (tempId="+t+") - \u064A\u062C\u0628 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u062D\u062A\u0649 \u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629");return}if(!a){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Utils.safeError("\u274C \u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628. requestId="+t);return}if(String(a.requestType||"").trim()==="evaluation")return this.approveRequest(t,"evaluation_approval");if(a.id&&String(a.id).startsWith("TEMP_")){a._isPendingSync?Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0627 \u064A\u0632\u0627\u0644 \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0642\u0644\u064A\u0644\u0627\u064B \u062B\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."):a._syncError?Notification.error("\u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0623\u0648\u0644\u0627\u064B."):Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0645 \u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0623\u0648\u0644\u0627\u064B."),Utils.safeWarn("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0628\u0645\u064F\u0639\u0631\u0641 \u0645\u0624\u0642\u062A (tempId="+a.id+")");return}const o=a.requestType==="evaluation"?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0633\u064A\u064F\u0636\u0627\u0641 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646.":"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F \u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646.";if(confirm(o))try{Loading.show();const i=a.id||t;Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628. requestId="+i+", type="+(a.requestType||"N/A"));const s=await GoogleIntegration.callBackend("approveContractorApprovalRequest",{requestId:i,userData:AppState.currentUser});if(!s||!s.success){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend: "+(s?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}a.status="approved",a.approvedAt=new Date().toISOString(),a.approvedBy=AppState.currentUser?.id||"",a.approvedByName=AppState.currentUser?.name||"",a.updatedAt=new Date().toISOString();const n=u=>String(u||"").trim().toLowerCase(),l=n(a.requestType),c=n(a.companyName||a.entityName),p=n(a.serviceType),f=n(a.licenseNumber);if((AppState.appData.contractorApprovalRequests||[]).forEach(u=>{if(!u||u===a||!(u.status==="pending"||u.status==="under_review")||!(n(u.requestType)===l))return;const v=n(u.companyName||u.entityName),h=n(u.serviceType),w=n(u.licenseNumber);(c&&v&&c===v||f&&w&&f===w)&&(!p||!h||p===h)&&(u.status="approved",u.approvedAt=a.approvedAt,u.approvedBy=a.approvedBy,u.approvedByName=a.approvedByName,u.updatedAt=a.updatedAt)}),s.approvedEntity){this.ensureApprovedSetup();let u=AppState.appData.approvedContractors||[];Array.isArray(u)||(u=[]);const d=s.approvedEntity;Utils.safeLog("\u2705 Received approvedEntity from Backend: id="+(d.id||"N/A")+", companyName="+(d.companyName||"N/A")+", code="+(d.code||d.isoCode||"N/A")),d.id||Utils.safeWarn("\u26A0\uFE0F Warning: approvedEntity does not have an ID - this may cause issues");const m=u.findIndex(h=>h.id===d.id);m!==-1?(u[m]=d,Utils.safeLog("\u2705 Updated existing approved contractor in AppState: id="+d.id)):(u.push(d),Utils.safeLog("\u2705 Added new approved contractor to AppState: id="+d.id+", companyName="+d.companyName)),AppState.appData.approvedContractors=u,AppState.appData.approvedContractors.find(h=>h.id===d.id)?Utils.safeLog("\u2705 Verified: Approved contractor added successfully to AppState.approvedContractors"):Utils.safeError("\u274C Error: Failed to add approved contractor to AppState.approvedContractors")}else Utils.safeWarn("\u26A0\uFE0F Warning: backendResult.approvedEntity is null or undefined - approved entity was not returned from Backend"),(a.requestType==="contractor"||a.requestType==="supplier")&&Utils.safeError("\u274C Error: approvedEntity should not be null for contractor/supplier requests");if(s.contractor){let u=AppState.appData.contractors||[];Array.isArray(u)||(u=[]);const d=u.findIndex(m=>m.id===s.contractor.id);d!==-1?u[d]=s.contractor:u.push(s.contractor),AppState.appData.contractors=u,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${s.contractor.name}`)}if(a.requestType==="evaluation"){const u=this.parseEvaluationDataFromRequest(a);u?(u.status="approved",u.approvedAt=new Date().toISOString(),u.approvedBy=AppState.currentUser?.id||"",this.persistEvaluation(u,null,{skipAutoSave:!0,replaceExisting:!0})):Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0639\u062A\u0645\u062F")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 Backend...");const u=a.requestType==="evaluation"?["ContractorApprovalRequests","ContractorEvaluations"]:["ContractorApprovalRequests","ApprovedContractors","Contractors"];if(await GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0,sheets:u}),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 Backend \u0628\u0646\u062C\u0627\u062D"),a.requestType==="evaluation"&&this.refreshEvaluationsList(this.currentEvaluationFilter||""),a.requestType==="contractor"||a.requestType==="supplier"){const d=AppState.appData.approvedContractors?.find(m=>m.companyName===a.companyName&&m.entityType===(a.requestType==="contractor"?"contractor":"supplier"));d?Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${d.companyName}" \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 (ID: ${d.id}, Code: ${d.code||d.isoCode})`):Utils.safeWarn(`\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${a.companyName}" \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629`)}}catch(u){Utils.safeError("\u274C \u062E\u0637\u0623: \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",u),Notification.warning("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u0641\u064A Backend\u060C \u0644\u0643\u0646 \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0638\u0647\u0648\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}if(Loading.hide(),a.requestType==="contractor"||a.requestType==="supplier"){const u=AppState.appData.approvedContractors?.find(m=>m.companyName===a.companyName&&m.entityType===(a.requestType==="contractor"?"contractor":"supplier"))||s.approvedEntity,d=AppState.appData.contractors?.find(m=>m.name===a.companyName||u&&m.id===u.contractorId||u&&m.approvedEntityId===u.id);d&&u?u.contractorId===d.id||d.approvedEntityId===u.id?Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 ${a.requestType==="supplier"?"\u0627\u0644\u0645\u0648\u0631\u062F":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644"} "${d.name}" \u0628\u0646\u062C\u0627\u062D \u0648\u0627\u0644\u0631\u0628\u0637 \u0645\u0648\u062C\u0648\u062F (Contractor ID: ${d.id}, Approved ID: ${u.id})`):Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0645\u0648\u062C\u0648\u062F\u0627\u0646 \u0644\u0643\u0646 \u0627\u0644\u0631\u0628\u0637 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644"):Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0644\u0645 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0628\u0639\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}a.requestType==="evaluation"?Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D. \u064A\u0638\u0647\u0631 \u0627\u0644\u0622\u0646 \u0641\u064A \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."):Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D. \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."),this.refreshApprovalRequestsSection(),a.requestType==="evaluation"&&this.refreshEvaluationsList(this.currentEvaluationFilter||""),await this.ensureApprovedContractorsDataLoaded({force:!0}),this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628: "+i.message)}},async rejectRequest(t,e="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();let a;if(e==="deletion"){if(a=(AppState.appData.contractorDeletionRequests||[]).find(i=>i.id===t),!a){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:")||"\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u062F\u064A\u0631";if(o===null)return;try{Loading.show();const i=await GoogleIntegration.callBackend("rejectContractorDeletionRequest",{requestId:t,rejectionReason:o,userData:AppState.currentUser});i&&i.success?(a.status="rejected",a.rejectedAt=new Date().toISOString(),a.rejectedBy=AppState.currentUser?.id||"",a.rejectedByName=AppState.currentUser?.name||"",a.rejectionReason=o,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D"),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()):(Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+i.message)}return}if(e==="evaluation_approval"){const o=this.findEvaluationApprovalRequest(t);if(!o){Notification.error("\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(i===null)return;try{Loading.show(),(await GoogleIntegration.sendRequest({action:"rejectContractorEvaluationApprovalRequest",data:{requestId:t,rejectionReason:i||"",userData:AppState.currentUser}}))?.success&&(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=i||"",window.DataManager?.save&&window.DataManager.save()),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D."),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(s){Loading.hide(),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+s.message)}return}const r=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(r!==null)try{Loading.show();const o=(AppState.appData.contractorApprovalRequests||[]).find(s=>s.id===t);if(!o){if(this.findEvaluationApprovalRequest(t))return Loading.hide(),this.rejectRequest(t,"evaluation_approval");Loading.hide(),Notification.error("\u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=await GoogleIntegration.sendRequest({action:"rejectContractorApprovalRequest",data:{requestId:t,rejectionReason:r||"",userData:AppState.currentUser}});i&&i.success?(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=r||"",o.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Utils.safeLog("\u2705 \u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D")):(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=r||"",o.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A Google Sheets\u060C \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637"),Notification.warning("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D."),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",o),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628: "+o.message)}},getContractorsForAnalyticsList(){return(typeof this.getApprovedEntitiesStatsSource=="function"?this.getApprovedEntitiesStatsSource():AppState.appData.approvedContractors||[]).filter(e=>this.normalizeApprovedEntityType(e.entityType||e.type)==="contractor").map(e=>({...e,id:e.contractorId||e.id,contractorId:e.contractorId||e.id,name:e.companyName||e.name||"",companyName:e.companyName||e.name||"",endDate:e.expiryDate||e.endDate,expiryDate:e.expiryDate||e.endDate,approvedEntityId:e.id,isActive:e.isActive,status:this.isEntityEnabled(e)?e.status||"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637",entityType:e.entityType||"contractor",code:e.code||e.isoCode||"",serviceType:e.serviceType||""}))},_ctrGetApprovedContractorsForAnalytics(){return this.getContractorsForAnalyticsList()},_ctrGetViolationPlaceLabel(t){const e=String(t?.violationPlace||t?.place||"").trim(),a=String(t?.violationLocation||t?.location||"").trim();return e&&a?`${a} \u2014 ${e}`:e||a||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_ctrPdfArStyle_(){return"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;"},_getContractorViolationsAnalysisData_(t,e,a=0){const r=Array.isArray(t)&&t.length>0?t:this.getContractorsForAnalyticsList();if(!Array.isArray(e)||e.length===0)return{rows:[],summary:null,overallResolution:0};const o=(r||[]).map(l=>{const c=this.prepareContractorForAnalytics(l),p=this.getPreferredContractorAnalyticsKey(c,l.id||l.contractorId||l.code||l.isoCode),f=this.buildContractorAnalyticsMatchers(c,p),u=this.dedupeContractorRecords(e.filter(f.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]),d={total:0,high:0,medium:0,low:0,resolved:0,pending:0};return u.forEach(m=>{d.total++;const v=(m.severity||"").toString().trim();v==="\u0639\u0627\u0644\u064A\u0629"||v==="high"||v==="\u062D\u0631\u062C\u0629"?d.high++:v==="\u0645\u062A\u0648\u0633\u0637\u0629"||v==="medium"?d.medium++:d.low++;const h=(m.status||"").toString().trim();h==="\u0645\u062D\u0644\u0648\u0644"||h==="resolved"||h==="\u062A\u0645 \u0627\u0644\u062D\u0644"?d.resolved++:d.pending++}),{name:c.name||c.companyName||l.name||l.companyName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",stats:d}}).filter(l=>l.stats.total>0).sort((l,c)=>c.stats.total-l.stats.total),i=a>0?o.slice(0,a):o,s=i.reduce((l,c)=>(l.total+=c.stats.total,l.high+=c.stats.high,l.resolved+=c.stats.resolved,l.pending+=c.stats.pending,l),{total:0,high:0,resolved:0,pending:0}),n=s.total>0?Math.round(s.resolved/s.total*100):0;return{rows:i,summary:s,overallResolution:n,allCount:o.length}},_getContractorLocationAnalysisData_(t,e,a=12){const r=Array.isArray(t)?t:[],o=Array.isArray(e)?e:[],i={};return o.forEach(s=>{const n=this._ctrGetViolationPlaceLabel(s);i[n]||(i[n]={violations:0,contractorCounts:{}});const l=i[n];l.violations++;let c=String(s.contractorName||"").trim();if(!c&&r.length)for(const p of r){const f=this.prepareContractorForAnalytics(p),u=this.getPreferredContractorAnalyticsKey(f,p.id||p.contractorId);if(this.buildContractorAnalyticsMatchers(f,u).violationBelongsToContractor(s)){c=f.name||f.companyName||p.name||p.companyName||"";break}}c&&(l.contractorCounts[c]=(l.contractorCounts[c]||0)+1)}),Object.entries(i).map(([s,n])=>{const l=Object.entries(n.contractorCounts).sort((c,p)=>p[1]-c[1])[0]||null;return{label:s,violations:n.violations,contractorsCount:Object.keys(n.contractorCounts).length,topContractor:l?{name:l[0],count:l[1]}:null}}).sort((s,n)=>n.violations-s.violations||n.contractorsCount-s.contractorsCount).slice(0,a)},async _ctrDownloadAnalyticsPdf_(t,e){return typeof Violations<"u"&&typeof Violations._downloadHtmlReportAsPdf=="function"?Violations._downloadHtmlReportAsPdf(t,e):typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"?(await FormHeader.generatePDF(t,e),!0):this._ctrOpenAnalyticsPrintReport(t)},_renderContractorAnalyticsShellHTML(){const t=String(this._ctrAnalysisPeriod??"0"),e=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"];return`
        <div id="ctr-analytics-root" style="font-family:inherit;">
            <div id="ctr-analytics-toolbar" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;padding:16px 20px;background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);border-radius:14px;color:#fff;box-shadow:0 4px 20px rgba(99,102,241,0.35);">
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="width:44px;height:44px;background:rgba(255,255,255,0.18);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-chart-line" style="font-size:20px;"></i>
                    </div>
                    <div>
                        <h2 style="margin:0;font-size:1.15rem;font-weight:700;">\u0644\u0648\u062D\u0629 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</h2>
                        <p style="margin:0;font-size:0.75rem;opacity:0.85;">\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u2022 \u0645\u0637\u0627\u0628\u0642 \u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u2022 \u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2022 \u062A\u0635\u062F\u064A\u0631 PDF</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                    <span style="font-size:0.72rem;opacity:0.85;margin-left:2px;">\u0627\u0644\u0641\u062A\u0631\u0629:</span>
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">${["30","90","180","365","0"].map((o,i)=>{const s=t===o;return`<button type="button" class="ctr-period-btn" data-period="${o}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.15)"};color:${s?"#0b2d4f":"#fff"};">${e[i]}</button>`}).join("")}</div>
                    <button type="button" id="ctr-toggle-filters-btn" title="\u0641\u0644\u0627\u062A\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);cursor:pointer;background:rgba(255,255,255,0.12);color:#fff;font-size:0.78rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-sliders-h"></i><span>\u0641\u0644\u0627\u062A\u0631</span><span id="ctr-filter-active-badge" style="display:none;background:#ef4444;color:#fff;font-size:0.65rem;padding:1px 5px;border-radius:10px;margin-right:2px;">\u2022</span>
                    </button>
                    <button type="button" id="ctr-export-pdf-btn" title="\u062A\u0635\u062F\u064A\u0631 PDF" style="padding:6px 14px;border-radius:8px;border:none;cursor:pointer;background:rgba(239,68,68,0.85);color:#fff;font-size:0.78rem;font-weight:600;display:flex;align-items:center;gap:5px;">
                        <i class="fas fa-file-pdf"></i><span>PDF</span>
                    </button>
                    <button type="button" id="ctr-analytics-refresh" title="\u062A\u062D\u062F\u064A\u062B" style="padding:6px 10px;border-radius:8px;border:none;cursor:pointer;background:rgba(255,255,255,0.15);color:#fff;font-size:0.78rem;">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>

            <div id="ctr-filter-panel" style="display:none;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:16px;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-sliders-h" style="color:#0f8b83;font-size:14px;"></i>
                        <span style="font-weight:700;font-size:0.9rem;color:#0b2d4f;">\u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</span>
                        <span id="ctr-filter-results-count" style="background:#dff4f1;color:#0f766e;padding:2px 8px;border-radius:12px;font-size:0.72rem;font-weight:600;"></span>
                    </div>
                    <button type="button" id="ctr-filter-reset-btn" style="padding:4px 12px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font-size:0.75rem;cursor:pointer;">
                        <i class="fas fa-times ml-1"></i>\u0645\u0633\u062D \u0627\u0644\u0643\u0644
                    </button>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px;">
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</label>
                        <select id="ctr-af-entity" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="contractor">\u0645\u0642\u0627\u0648\u0644</option>
                            <option value="supplier">\u0645\u0648\u0631\u062F</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</label>
                        <select id="ctr-af-status" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="active">\u0646\u0634\u0637</option>
                            <option value="inactive">\u063A\u064A\u0631 \u0646\u0634\u0637</option>
                            <option value="expired">\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0639\u0642\u062F</option>
                        </select>
                    </div>
                    <div>
                        <label style="font-size:0.72rem;font-weight:700;color:#64748b;display:block;margin-bottom:5px;">\u0634\u062F\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</label>
                        <select id="ctr-af-severity" style="width:100%;padding:7px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.82rem;background:#fff;">
                            <option value="">\u0627\u0644\u0643\u0644</option>
                            <option value="high">\u0639\u0627\u0644\u064A\u0629</option>
                            <option value="medium">\u0645\u062A\u0648\u0633\u0637\u0629</option>
                            <option value="low">\u0645\u0646\u062E\u0641\u0636\u0629</option>
                        </select>
                    </div>
                </div>
            </div>

            <div id="ctr-kpi-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin-bottom:20px;">
                <div style="text-align:center;padding:8px;color:#94a3b8;"><i class="fas fa-spinner fa-spin"></i></div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-circle-notch" style="color:#6366f1;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ctr-chart-status"></canvas>
                        <div id="ctr-chart-status-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-exclamation-triangle" style="color:#ef4444;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629</span>
                    </div>
                    <div style="padding:12px;position:relative;height:240px;">
                        <canvas id="ctr-chart-severity"></canvas>
                        <div id="ctr-chart-severity-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-chart-area" style="color:#8b5cf6;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0622\u062E\u0631 12 \u0634\u0647\u0631)</span>
                </div>
                <div style="padding:12px;position:relative;height:260px;">
                    <canvas id="ctr-chart-trend"></canvas>
                    <div id="ctr-chart-trend-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <div class="content-card" style="padding:0;overflow:hidden;margin-bottom:16px;">
                <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                    <i class="fas fa-user-hard-hat" style="color:#f59e0b;"></i>
                    <span style="font-weight:700;font-size:0.88rem;">\u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0627\u062A (8)</span>
                </div>
                <div style="padding:12px;position:relative;height:280px;">
                    <canvas id="ctr-chart-top-violators"></canvas>
                    <div id="ctr-chart-top-violators-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;margin-bottom:16px;">
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-marker-alt" style="color:#3b82f6;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ctr-chart-location"></canvas>
                        <div id="ctr-chart-location-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
                <div class="content-card" style="padding:0;overflow:hidden;">
                    <div style="padding:13px 18px 10px;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-map-pin" style="color:#d97706;"></i>
                        <span style="font-weight:700;font-size:0.88rem;">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0623\u0639\u0644\u0649 8)</span>
                    </div>
                    <div style="padding:12px;position:relative;height:280px;">
                        <canvas id="ctr-chart-place"></canvas>
                        <div id="ctr-chart-place-empty" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;color:#94a3b8;font-size:0.85rem;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</div>
                    </div>
                </div>
            </div>

            <div id="ctr-locations-analysis"></div>

            <div id="ctr-violations-analysis"></div>
            <div id="ctr-expiring-contracts"></div>
            <div id="ctr-detailed-analysis"></div>
            <style>
                #ctr-analytics-root .ctr-panel { margin-bottom:16px;border-radius:14px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;box-shadow:0 4px 20px rgba(15,23,42,.06); }
                #ctr-analytics-root .ctr-panel-header { padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;color:#fff; }
                #ctr-analytics-root .ctr-panel-header-icon { width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0; }
                #ctr-analytics-root .ctr-panel-badge { background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.35);padding:4px 12px;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap; }
                #ctr-analytics-root .ctr-panel-summary { display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;padding:14px 16px;border-bottom:1px solid #f1f5f9; }
                #ctr-analytics-root .ctr-panel-summary-item { border-radius:10px;padding:10px 12px;text-align:center; }
                #ctr-analytics-root .ctr-panel-summary-item .val { font-size:1.35rem;font-weight:800;line-height:1.1; }
                #ctr-analytics-root .ctr-panel-summary-item .lbl { font-size:.68rem;color:#64748b;margin-top:4px;font-weight:600; }
                #ctr-analytics-root .ctr-data-table { width:100%;border-collapse:collapse;font-size:.82rem; }
                #ctr-analytics-root .ctr-data-table thead th { padding:11px 14px;font-weight:700;font-size:.74rem;white-space:nowrap;border-bottom:2px solid;position:sticky;top:0;z-index:2; }
                #ctr-analytics-root .ctr-data-table tbody td { padding:11px 14px;border-bottom:1px solid #f1f5f9;vertical-align:middle; }
                #ctr-analytics-root .ctr-data-table tbody tr:hover { background:#f8fafc; }
                #ctr-analytics-root .ctr-data-table-wrap { overflow-x:auto;max-height:65vh;overflow-y:auto; }
                #ctr-analytics-root .ctr-sev-pill { display:inline-flex;align-items:center;justify-content:center;min-width:28px;padding:3px 8px;border-radius:999px;font-size:.72rem;font-weight:800; }
                #ctr-analytics-root .ctr-sev-high { background:#fee2e2;color:#b91c1c;border:1px solid #fecaca; }
                #ctr-analytics-root .ctr-sev-med { background:#fef3c7;color:#b45309;border:1px solid #fde68a; }
                #ctr-analytics-root .ctr-sev-low { background:#dcfce7;color:#15803d;border:1px solid #bbf7d0; }
                #ctr-analytics-root .ctr-progress { width:72px;height:6px;background:#e2e8f0;border-radius:999px;overflow:hidden;margin:0 auto 4px; }
                #ctr-analytics-root .ctr-progress > span { display:block;height:100%;border-radius:999px;transition:width .3s; }
                #ctr-analytics-root .ctr-rank { width:30px;height:30px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:.78rem;flex-shrink:0; }
                #ctr-analytics-root .ctr-act-active { display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:.68rem;font-weight:700;background:#dcfce7;color:#15803d;border:1px solid #bbf7d0; }
                #ctr-analytics-root .ctr-act-inactive { display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:.68rem;font-weight:700;background:#fee2e2;color:#b91c1c;border:1px solid #fecaca; }
                #ctr-analytics-root .ctr-empty-state { padding:48px 24px;text-align:center; }
                #ctr-analytics-root .ctr-empty-state i { font-size:2.8rem;margin-bottom:12px;display:block; }
            </style>
        </div>`},async renderAnalyticsSection(){return this.isContractorApprovalAdminUser()?(this._ctrAnalysisPeriod===void 0&&(this._ctrAnalysisPeriod="0"),this.ensureContractorChartJSLoaded().catch(()=>{}),this._renderContractorAnalyticsShellHTML()):`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-lock text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637</p>
                        </div>
                    </div>
                </div>
            `},async ensureContractorChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(e=>{const a=setInterval(()=>{typeof Chart<"u"&&(clearInterval(a),e(!0))},100);setTimeout(()=>{clearInterval(a),e(!1)},5e3)}):new Promise(e=>{const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",a.crossOrigin="anonymous",a.onload=()=>e(typeof Chart<"u"),a.onerror=()=>e(!1),document.head.appendChild(a)})},_ctrFilterRecordsByPeriod(t,e,a){if(!e||e===0)return t;const r=new Date;return r.setDate(r.getDate()-e),(t||[]).filter(o=>{const i=typeof a=="function"?a(o):o?.date;if(!i)return!0;const s=new Date(i);return!isNaN(s.getTime())&&s>=r})},_ctrGetContractorContractState(t){const e=t?.endDate||t?.expiryDate;if(!e)return"unknown";try{const a=new Date(e),r=new Date;r.setHours(0,0,0,0),a.setHours(0,0,0,0);const o=Math.ceil((a-r)/(1e3*60*60*24));return o<0?"expired":o<=30?"expiring":"active"}catch{return"unknown"}},_ctrApplyAnalyticsFilters(t,e){const a=document.getElementById("ctr-af-entity")?.value||"",r=document.getElementById("ctr-af-status")?.value||"",o=document.getElementById("ctr-af-severity")?.value||"";let i=Array.isArray(t)?[...t]:[];a==="contractor"?i=i.filter(c=>this.normalizeApprovedEntityType(c.entityType||c.type)==="contractor"):a==="supplier"&&(i=i.filter(c=>this.normalizeApprovedEntityType(c.entityType||c.type)==="supplier")),r==="active"?i=i.filter(c=>this.isEntityEnabled(c)):r==="inactive"?i=i.filter(c=>!this.isEntityEnabled(c)):r==="expired"&&(i=i.filter(c=>this._ctrGetContractorContractState(c)==="expired"));let s=Array.isArray(e)?[...e]:[];o==="high"?s=s.filter(c=>["\u0639\u0627\u0644\u064A\u0629","high","\u062D\u0631\u062C\u0629"].includes(String(c.severity||"").trim())):o==="medium"?s=s.filter(c=>["\u0645\u062A\u0648\u0633\u0637\u0629","medium"].includes(String(c.severity||"").trim())):o==="low"&&(s=s.filter(c=>["\u0645\u0646\u062E\u0641\u0636\u0629","low","\u0642\u0644\u064A\u0644\u0629","\u0645\u0646\u062E\u0636\u0629"].includes(String(c.severity||"").trim())));const n=!!(a||r||o),l=document.getElementById("ctr-filter-active-badge");return l&&(l.style.display=n?"inline":"none"),{filteredContractors:i,filteredViolations:s,hasFilters:n}},_ctrGroupByField(t,e,a=0){const r={};(t||[]).forEach(i=>{const s=String(typeof e=="function"?e(i):i?.label||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[s]=(r[s]||0)+1});let o=Object.entries(r).sort((i,s)=>s[1]-i[1]);return a>0&&(o=o.slice(0,a)),{labels:o.map(i=>i[0]),data:o.map(i=>i[1])}},_ctrChartColors(t){const e=["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#0ea5e9","#ec4899","#14b8a6","#f97316","#64748b"];return Array.from({length:t},(a,r)=>e[r%e.length])},_ctrDestroyChart(t){const e=this._ctrAnalyticsCharts&&this._ctrAnalyticsCharts[t];if(e){try{e.destroy()}catch{}delete this._ctrAnalyticsCharts[t]}},_ctrDrawDoughnut(t,e,a,r){const o=document.getElementById(t),i=document.getElementById(t+"-empty");if(!o)return;if(!a.length||a.reduce((l,c)=>l+c,0)===0){o.style.display="none",i&&(i.style.display="flex"),this._ctrDestroyChart(t);return}if(o.style.display="block",i&&(i.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const s=a.reduce((l,c)=>l+c,0),n=new Chart(o,{type:"doughnut",data:{labels:e,datasets:[{data:a,backgroundColor:r||this._ctrChartColors(a.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:l=>` ${l.label}: ${l.parsed} (${s>0?(l.parsed/s*100).toFixed(1):0}%)`}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=n},_ctrDrawHBar(t,e,a,r){const o=document.getElementById(t),i=document.getElementById(t+"-empty");if(!o)return;if(!a.length||a.reduce((n,l)=>n+l,0)===0){o.style.display="none",i&&(i.style.display="flex"),this._ctrDestroyChart(t);return}if(o.style.display="block",i&&(i.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const s=new Chart(o,{type:"bar",data:{labels:e,datasets:[{data:a,backgroundColor:r||"rgba(99,102,241,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>{const l=String(e[n]||"");return l.length>18?`${l.slice(0,17)}\u2026`:l}}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=s},_ctrDrawTrend(t,e){const a=document.getElementById(t),r=document.getElementById(t+"-empty");if(!a)return;const o=[],i=[],s=new Date;for(let l=11;l>=0;l--){const c=new Date(s.getFullYear(),s.getMonth()-l,1);o.push(c.toLocaleDateString("ar-SA",{month:"short",year:"2-digit"}));const p=c.getFullYear(),f=c.getMonth();i.push((e||[]).filter(u=>{const d=u.violationDate||u.date||u.createdAt;if(!d)return!1;const m=new Date(d);return!isNaN(m.getTime())&&m.getFullYear()===p&&m.getMonth()===f}).length)}if(i.reduce((l,c)=>l+c,0)===0){a.style.display="none",r&&(r.style.display="flex"),this._ctrDestroyChart(t);return}if(a.style.display="block",r&&(r.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const n=new Chart(a,{type:"line",data:{labels:o,datasets:[{data:i,borderColor:"#6366f1",backgroundColor:"rgba(99,102,241,0.12)",fill:!0,tension:.35,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{precision:0}},x:{ticks:{font:{size:10}}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=n},async _fetchContractorAnalyticsData(){if(!(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!AppState.googleConfig?.appsScript?.enabled))try{const[t,e]=await Promise.all([GoogleIntegration.readFromSheets("Violations"),GoogleIntegration.readFromSheets("ContractorEvaluations")]);Array.isArray(t)&&(AppState.appData.violations=t),Array.isArray(e)&&(AppState.appData.contractorEvaluations=e)}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",t)}},bindContractorAnalyticsEvents(){const t=document.getElementById("ctr-analytics-root");if(!t||t.dataset.bound==="1")return;t.dataset.bound="1",t.querySelectorAll(".ctr-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._ctrAnalysisPeriod=r.getAttribute("data-period")||"0",t.querySelectorAll(".ctr-period-btn").forEach(o=>{const i=o===r;o.style.background=i?"#fff":"rgba(255,255,255,0.15)",o.style.color=i?"#4338ca":"#fff"}),this.updateContractorAnalyticsResults()})}),document.getElementById("ctr-analytics-refresh")?.addEventListener("click",()=>this.loadContractorAnalytics()),document.getElementById("ctr-export-pdf-btn")?.addEventListener("click",()=>this.exportContractorAnalyticsPDF());const e=document.getElementById("ctr-toggle-filters-btn"),a=document.getElementById("ctr-filter-panel");e?.addEventListener("click",()=>{if(!a)return;const r=a.style.display!=="none";a.style.display=r?"none":"block"}),document.getElementById("ctr-filter-reset-btn")?.addEventListener("click",()=>{["ctr-af-entity","ctr-af-status","ctr-af-severity"].forEach(r=>{const o=document.getElementById(r);o&&(o.value="")}),this.updateContractorAnalyticsResults()}),["ctr-af-entity","ctr-af-status","ctr-af-severity"].forEach(r=>{document.getElementById(r)?.addEventListener("change",()=>this.updateContractorAnalyticsResults())})},async loadContractorAnalytics(){if(document.getElementById("ctr-analytics-root")){try{await Promise.allSettled([this.ensureApprovedContractorsDataLoaded({force:!1}),this._fetchContractorAnalyticsData()])}catch{}await this.updateContractorAnalyticsResults()}},_getCtrAnalysisPeriodLabel(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._ctrAnalysisPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_ctrFilterApprovedContractors(t,e,a){let r=Array.isArray(t)?[...t]:[];return e==="contractor"?r=r.filter(o=>this.normalizeApprovedEntityType(o.entityType||o.type)==="contractor"):e==="supplier"&&(r=r.filter(o=>this.normalizeApprovedEntityType(o.entityType||o.type)==="supplier")),a==="active"?r=r.filter(o=>this.isEntityEnabled(o)):a==="inactive"?r=r.filter(o=>!this.isEntityEnabled(o)):a==="expired"&&(r=r.filter(o=>this._ctrGetContractorContractState(o)==="expired")),r},_ctrScopeRecordsToContractors(t,e,a){if(!Array.isArray(t)||!Array.isArray(e)||e.length===0)return[];const r=a==="evaluation"?"evaluationBelongsToContractor":"violationBelongsToContractor",o=a==="evaluation"?["evaluationId","id","isoCode"]:["isoCode","id"],i=a==="evaluation"?["contractorId","contractorName","evaluationDate","projectName","finalScore"]:["contractorId","contractorName","violationType","violationDate","violationTime"],s=[];return e.forEach(n=>{const l=this.prepareContractorForAnalytics(n),c=this.getPreferredContractorAnalyticsKey(l,n.id||n.contractorId),p=this.buildContractorAnalyticsMatchers(l,c);s.push(...t.filter(f=>p[r](f)))}),this.dedupeContractorRecords(s,o,i)},buildContractorDetailedStatsList(t,e,a){return!Array.isArray(t)||t.length===0?[]:t.map(r=>{const o=this.prepareContractorForAnalytics(r),i=this.getPreferredContractorAnalyticsKey(o,r.id||r.contractorId),s=this.buildContractorAnalyticsMatchers(o,i),n=this.dedupeContractorRecords((e||[]).filter(s.evaluationBelongsToContractor),["evaluationId","id","isoCode"],["contractorId","contractorName","evaluationDate","projectName","finalScore"]),l=new Set(n.map(b=>String(b?.evaluationId||b?.id||"").trim()).filter(Boolean)),c=l.size>0?l.size:n.length,p=this.dedupeContractorRecords((a||[]).filter(s.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]);let f=0;if(n.length>0){const b=n.map(A=>parseFloat(A.finalScore)||parseFloat(A.score)||0).filter(A=>!isNaN(A)&&A>=0&&A<=100);b.length>0&&(f=Math.round(b.reduce((A,C)=>A+C,0)/b.length*100)/100)}const u=p.filter(b=>{const A=(b.severity||"").toString().trim();return A==="\u0639\u0627\u0644\u064A\u0629"||A==="high"||A==="\u062D\u0631\u062C\u0629"}).length,d=p.filter(b=>{const A=(b.status||"").toString().trim();return A==="\u0645\u062D\u0644\u0648\u0644"||A==="resolved"||A==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,m=p.length>0?Math.round(d/p.length*100):100;let v="active",h=null;const w=r.endDate||r.expiryDate;if(w)try{const b=new Date(w),C=Math.ceil((b-new Date)/(1e3*60*60*24));h=C,C<0?v="expired":C<=30&&(v="expiring")}catch{v="unknown"}return{...r,analyticsLookupKey:i,analyticsDisplayName:o.name||o.companyName||r.name||r.companyName||"",evaluationsCount:c,violationsCount:p.length,avgScore:f,highViolations:u,resolvedViolations:d,resolutionRate:m,contractStatus:v,daysRemaining:h}}).sort((r,o)=>{const i=r.avgScore-r.violationsCount*5-r.highViolations*10;return o.avgScore-o.violationsCount*5-o.highViolations*10-i})},_collectContractorAnalyticsSnapshot(){const t=parseInt(this._ctrAnalysisPeriod||"0",10),e=this.getContractorsForAnalyticsList(),a=typeof this.getApprovedEntitiesStatsSource=="function"?this.getApprovedEntitiesStatsSource():AppState.appData.approvedContractors||[];let r=AppState.appData.contractorEvaluations||[],o=(AppState.appData.violations||[]).filter(v=>v.contractorName||v.contractorId||v.personType&&(v.personType==="contractor"||v.personType==="\u0645\u0642\u0627\u0648\u0644"));r=this._ctrFilterRecordsByPeriod(r,t,v=>v.evaluationDate||v.createdAt||v.date),o=this._ctrFilterRecordsByPeriod(o,t,v=>v.violationDate||v.date||v.createdAt);const{filteredContractors:i,filteredViolations:s}=this._ctrApplyAnalyticsFilters(e,o),n=document.getElementById("ctr-af-entity")?.value||"",l=document.getElementById("ctr-af-status")?.value||"",c=this._ctrFilterApprovedContractors(a,n,l),p=this._ctrScopeRecordsToContractors(r,i,"evaluation"),f=this._ctrScopeRecordsToContractors(s,i,"violation"),u=this.buildContractorDetailedStatsList(i,p,f),d=this.buildContractorAnalyticsKpis(i,c,u,f),m=this.getExpiringContracts(i,c);return{period:t,periodLabel:this._getCtrAnalysisPeriodLabel(),filteredContractors:i,filteredApproved:c,evaluations:p,violations:f,analytics:d,expiringContracts:m,detailedStats:u,resultsCountText:i.length+" \u0645\u0642\u0627\u0648\u0644 \u2022 "+u.reduce((v,h)=>v+(h.violationsCount||0),0)+" \u0645\u062E\u0627\u0644\u0641\u0629"}},_ctrContractorIsApproved(t,e){if(!t)return!1;if(t.approvedEntityId)return!0;const a=this.prepareContractorForAnalytics(t),r=this.getPreferredContractorAnalyticsKey(a,t.id||t.contractorId);return(e||[]).some(o=>{if(!this.isApprovalActive(o,!0))return!1;if(String(o.id||"")===String(t.approvedEntityId||"")||String(o.contractorId||"")&&String(o.contractorId)===String(t.id||t.contractorId||""))return!0;const i=this.prepareContractorForAnalytics({...o,name:o.companyName||o.name||"",companyName:o.companyName||o.name||""}),s=this.getPreferredContractorAnalyticsKey(i,o.contractorId||o.id);return!!(r&&s&&r===s)})},buildContractorAnalyticsKpis(t,e,a,r){const o=Array.isArray(t)?t:[],i=Array.isArray(a)?a:[],s=Array.isArray(r)?r:[],n=Array.isArray(e)?e:[],l=o.length,c=o.filter(g=>g.approvedEntityId||this._ctrContractorIsApproved(g,n)||this.isApprovalActive(g,!0)).length,p=o.filter(g=>this.isEntityEnabled(g)).length,f=o.filter(g=>!this.isEntityEnabled(g)).length,u=i.reduce((g,x)=>g+(x.evaluationsCount||0),0),d=i.reduce((g,x)=>g+(x.violationsCount||0),0),m=i.reduce((g,x)=>g+(x.resolvedViolations||0),0);let v=0,h=0;i.forEach(g=>{const x=g.evaluationsCount||0;x>0&&!isNaN(g.avgScore)&&(v+=g.avgScore*x,h+=x)});const w=h>0?Math.round(v/h*100)/100:0,b=d>0?Math.round(m/d*1e4)/100:0,A=new Date;A.setHours(0,0,0,0);const C=new Date(A.getTime()+720*60*60*1e3);let k=0,q=0;o.forEach(g=>{const x=this._ctrGetContractorContractState(g);x==="expired"?k++:x==="expiring"&&q++});const $=l>0?Math.round(c/l*1e4)/100:0,y=l>0?Math.round(p/l*1e4)/100:0,S=l>0?Math.round(f/l*1e4)/100:0,D=l>0?Math.round(d/l*100)/100:0,T=s.filter(g=>g.contractorName||g.contractorId||g.personType&&(g.personType==="contractor"||g.personType==="\u0645\u0642\u0627\u0648\u0644")),_=T.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0639\u0627\u0644\u064A\u0629"||x==="high"||x==="\u062D\u0631\u062C\u0629"}).length,I=T.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0645\u062A\u0648\u0633\u0637\u0629"||x==="medium"}).length,L=T.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0645\u0646\u062E\u0641\u0636\u0629"||x==="low"||x==="\u0642\u0644\u064A\u0644\u0629"}).length;return{totalContractors:l,totalApproved:c,totalEvaluations:u,totalViolations:d,avgScore:w,activeContractors:p,inactiveContractors:f,expiredContractors:k,expiringSoon:q,approvalRate:$,violationsPerContractor:D,activeRate:y,inactiveRate:S,violationResolutionRate:b,resolvedViolations:m,highSeverityViolations:_,mediumSeverityViolations:I,lowSeverityViolations:L}},calculateContractorAnalytics(t,e,a,r){const o=this.buildContractorDetailedStatsList(Array.isArray(t)?t:[],Array.isArray(a)?a:[],Array.isArray(r)?r:[]);return this.buildContractorAnalyticsKpis(Array.isArray(t)?t:[],Array.isArray(e)?e:[],o,Array.isArray(r)?r:[])},_buildCtrAnalyticsExportLegend_(t){const e=r=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(r):String(r??""),a=e(new Date().toLocaleString("ar-SA",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return['<div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;">','<div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>','<div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">','<div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ',e(t.periodLabel),"</div>",'<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ',e(t.resultsCountText),"</div>",'<div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ',a,"</div>","</div></div>"].join("")},_buildCtrAnalyticsExportHtml_(t){const e=y=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(y??"")):String(y??""),a=this._ctrPdfArStyle_(),r=t.analytics,o=t.filteredContractors||[],i=t.violations||[],s={\u0646\u0634\u0637:0,"\u063A\u064A\u0631 \u0646\u0634\u0637":0,"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":0,\u0645\u0646\u062A\u0647\u064A:0};o.forEach(y=>{const S=this._ctrGetContractorContractState(y);S==="expired"?s.\u0645\u0646\u062A\u0647\u064A++:S==="expiring"?s["\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"]++:this.isEntityEnabled(y)?s.\u0646\u0634\u0637++:s["\u063A\u064A\u0631 \u0646\u0634\u0637"]++});const n=(y,S,D,T,_)=>`
            <div style="flex:1 1 140px;min-width:130px;padding:12px 14px;border-radius:10px;background:${D};border:1px solid ${T};">
                <div style="font-size:11px;font-weight:700;color:${_};margin-bottom:6px;${a}">${e(y)}</div>
                <div style="font-size:22px;font-weight:800;color:${_};line-height:1;${a}">${e(S)}</div>
            </div>`,l=this._getContractorViolationsAnalysisData_(o,i,0),c=l.rows,p=l.summary||{total:0,high:0,resolved:0,pending:0},f=l.overallResolution||0,u=this._getContractorLocationAnalysisData_(o,i,12),d=this._ctrGroupByField(i,y=>String(y.violationLocation||y.location||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),m=this._ctrGroupByField(i,y=>String(y.violationPlace||y.place||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),v=c.map((y,S)=>{const D=y.stats.total>0?Math.round(y.stats.resolved/y.stats.total*100):0;return`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y.name)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${a}">${y.stats.total}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${a}">${y.stats.high}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b45309;${a}">${y.stats.medium}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${a}">${y.stats.low}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${a}">${y.stats.resolved}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#c2410c;${a}">${y.stats.pending}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${a}">${D}%</td>
            </tr>`}).join(""),h=u.map((y,S)=>{const D=o.length>0?Math.round(y.contractorsCount/o.length*100):0;return`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y.label)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;color:#dc2626;${a}">${y.violations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${y.contractorsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${D}%</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${y.topContractor?e(y.topContractor.name)+" ("+y.topContractor.count+")":"\u2014"}</td>
            </tr>`}).join(""),w=d.labels.map((y,S)=>`<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${a}">${d.data[S]}</td>
        </tr>`).join(""),b=m.labels.map((y,S)=>`<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${a}">${m.data[S]}</td>
        </tr>`).join(""),A=(t.detailedStats||[]).filter(y=>y.violationsCount>0).sort((y,S)=>S.violationsCount-y.violationsCount).slice(0,10).map((y,S)=>`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y.analyticsDisplayName||y.name||y.companyName)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${a}">${y.violationsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${a}">${y.highViolations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${y.resolutionRate}%</td>
            </tr>`).join(""),C=(t.detailedStats||[]).map((y,S)=>{let D="\u0646\u0634\u0637";y.contractStatus==="expired"?D="\u0645\u0646\u062A\u0647\u064A":y.contractStatus==="expiring"?D="\u0642\u0631\u064A\u0628 ("+y.daysRemaining+" \u064A\u0648\u0645)":y.contractStatus==="unknown"&&(D="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const T=this.isEntityEnabled(y)?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637";return`<tr>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${S+1}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:10px;${a}">${e(y.analyticsDisplayName||y.name||y.companyName)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${e(T)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${e(y.serviceType||y.entityType||"-")}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${e(D)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${y.evaluationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${y.avgScore}%</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${y.violationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${y.highViolations}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${a}">${y.resolutionRate}%</td>
            </tr>`}).join(""),k=(t.expiringContracts||[]).map(y=>`<tr>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${a}">${e(y.name)}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${y.daysRemaining}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${a}">${e(y.endDate?new Date(y.endDate).toLocaleDateString("ar-SA"):"-")}</td>
        </tr>`).join(""),q=(y,S="#312e81",D="#c7d2fe")=>`
            <h3 dir="rtl" style="font-size:16px;font-weight:800;color:${S};margin:22px 0 10px;padding-bottom:8px;border-bottom:2px solid ${D};${a}">${e(y)}</h3>`,$=(y,S="#312e81")=>`<tr style="background:${S};color:#fff;">${y.map(D=>`<th dir="rtl" style="padding:10px 8px;border:1px solid ${S};text-align:center;font-weight:700;font-size:11px;white-space:nowrap;${a}">${D}</th>`).join("")}</tr>`;return`
            <div dir="rtl" style="direction:rtl;${a}">
                ${q("\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629","#1e3a8a","#bfdbfe")}
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:8px;">
                    ${n("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",r.totalContractors,"#eff6ff","#bfdbfe","#1d4ed8")}
                    ${n("\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646",r.totalApproved,"#ecfdf5","#a7f3d0","#15803d")}
                    ${n("\u0646\u0634\u0637\u0648\u0646",r.activeContractors,"#fff7ed","#fed7aa","#c2410c")}
                    ${n("\u063A\u064A\u0631 \u0646\u0634\u0637",r.inactiveContractors||0,"#fef2f2","#fecaca","#dc2626")}
                    ${n("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",r.totalEvaluations,"#fefce8","#fde047","#a16207")}
                    ${n("\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",r.totalViolations,"#fef2f2","#fecaca","#b91c1c")}
                    ${n("\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645",r.avgScore+"%","#eef2ff","#c7d2fe","#4338ca")}
                    ${n("\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",r.violationResolutionRate+"%","#f5f3ff","#ddd6fe","#7c3aed")}
                    ${n("\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",r.expiringSoon||0,"#f0fdfa","#99f6e4","#0f766e")}
                </div>

                ${q("\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","#991b1b","#fecaca")}
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                    ${n("\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0645\u062E\u0627\u0644\u0650\u0641\u0648\u0646",c.length,"#fef2f2","#fecaca","#b91c1c")}
                    ${n("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",p.total,"#fff7ed","#fed7aa","#c2410c")}
                    ${n("\u0634\u062F\u0629 \u0639\u0627\u0644\u064A\u0629",p.high,"#fef2f2","#fecaca","#991b1b")}
                    ${n("\u0645\u062D\u0644\u0648\u0644\u0629",p.resolved,"#ecfdf5","#bbf7d0","#15803d")}
                    ${n("\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",p.pending,"#fffbeb","#fde68a","#b45309")}
                    ${n("\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644",f+"%","#f5f3ff","#ddd6fe","#6d28d9")}
                </div>
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${a}">
                    <thead>${$(["#","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0639\u0627\u0644\u064A\u0629","\u0645\u062A\u0648\u0633\u0637\u0629","\u0645\u0646\u062E\u0641\u0636\u0629","\u0645\u062D\u0644\u0648\u0644\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#b91c1c")}</thead>
                    <tbody>${v||`<tr><td colspan="9" style="padding:16px;text-align:center;color:#64748b;${a}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</td></tr>`}</tbody>
                </table>

                ${q("\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","#1e40af","#bfdbfe")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${a}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","% \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0623\u0639\u0644\u0649 \u0645\u0642\u0627\u0648\u0644"],"#1d4ed8")}</thead>
                    <tbody>${h||`<tr><td colspan="6" style="padding:16px;text-align:center;color:#64748b;${a}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0645\u0627\u0643\u0646</td></tr>`}</tbody>
                </table>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:8px;">
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 8px;${a}">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${a}">
                            <thead>${$(["\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0639\u062F\u062F"],"#3b82f6")}</thead>
                            <tbody>${w||`<tr><td colspan="2" style="padding:12px;text-align:center;${a}">\u2014</td></tr>`}</tbody>
                        </table>
                    </div>
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#b45309;margin:0 0 8px;${a}">\u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0623\u0639\u0644\u0649 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${a}">
                            <thead>${$(["\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0639\u062F\u062F"],"#d97706")}</thead>
                            <tbody>${b||`<tr><td colspan="2" style="padding:12px;text-align:center;${a}">\u2014</td></tr>`}</tbody>
                        </table>
                    </div>
                </div>

                ${A?`${q("\u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0627\u062A","#9a3412","#fed7aa")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${a}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#c2410c")}</thead>
                    <tbody>${A}</tbody>
                </table>`:""}

                ${q("\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0644\u0643\u0644 \u0645\u0642\u0627\u0648\u0644","#4338ca","#c7d2fe")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${a}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u062A\u0641\u0639\u064A\u0644","\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629","\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0642\u062F","\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A","\u0645\u062A\u0648\u0633\u0637","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#4f46e5")}</thead>
                    <tbody>${C||`<tr><td colspan="10" style="padding:16px;text-align:center;color:#64748b;${a}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>`}</tbody>
                </table>

                ${k?`${q("\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 (30 \u064A\u0648\u0645)","#0f766e","#99f6e4")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;${a}">
                    <thead>${$(["\u0627\u0644\u062C\u0647\u0629","\u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"],"#0d9488")}</thead>
                    <tbody>${k}</tbody>
                </table>`:""}
            </div>`},_ctrOpenAnalyticsPrintReport(t){try{const e=new Blob([t],{type:"text/html;charset=utf-8"}),a=URL.createObjectURL(e),r=window.open(a,"_blank");return r?(r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>URL.revokeObjectURL(a),1e3)},450)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629..."),!0):(Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"),!1)}catch(e){return Utils.safeError("\u0641\u0634\u0644 \u0641\u062A\u062D \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",e),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A"),!1}},async updateContractorAnalyticsResults(){if(!document.getElementById("ctr-analytics-root"))return;const e=this._collectContractorAnalyticsSnapshot(),{filteredContractors:a,filteredApproved:r,evaluations:o,violations:i,analytics:s,expiringContracts:n}=e,l=document.getElementById("ctr-filter-results-count");l&&(l.textContent=e.resultsCountText);const c=document.getElementById("ctr-kpi-strip");if(c){const v=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:s.totalContractors,icon:"fas fa-users",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646",value:s.totalApproved,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0646\u0634\u0637\u0648\u0646",value:s.activeContractors,icon:"fas fa-bolt",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u063A\u064A\u0631 \u0646\u0634\u0637",value:s.inactiveContractors||0,icon:"fas fa-ban",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",value:s.totalEvaluations,icon:"fas fa-clipboard-check",color:"#eab308",bg:"#fefce8",border:"#fde047"},{label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",value:s.totalViolations,icon:"fas fa-exclamation-triangle",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645",value:`${s.avgScore}%`,icon:"fas fa-star",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",value:`${s.violationResolutionRate}%`,icon:"fas fa-check-double",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:s.expiringSoon||0,icon:"fas fa-hourglass-half",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"}];c.innerHTML=v.map(h=>`
                <div style="background:${h.bg};border:1px solid ${h.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;">
                    <div style="width:38px;height:38px;background:${h.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${h.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${h.color};line-height:1;">${h.value}</div>
                        <div style="font-size:0.7rem;color:#64748b;margin-top:2px;white-space:nowrap;">${h.label}</div>
                    </div>
                </div>`).join("")}if(await this.ensureContractorChartJSLoaded()&&typeof Chart<"u"){const v={\u0646\u0634\u0637:0,"\u063A\u064A\u0631 \u0646\u0634\u0637":0,"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":0,\u0645\u0646\u062A\u0647\u064A:0};a.forEach(q=>{const $=this._ctrGetContractorContractState(q);$==="expired"?v.\u0645\u0646\u062A\u0647\u064A++:$==="expiring"?v["\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"]++:this.isEntityEnabled(q)?v.\u0646\u0634\u0637++:v["\u063A\u064A\u0631 \u0646\u0634\u0637"]++});const h=Object.entries(v).filter(([,q])=>q>0);this._ctrDrawDoughnut("ctr-chart-status",h.map(q=>q[0]),h.map(q=>q[1]),["#10b981","#ef4444","#f59e0b","#94a3b8"]);const w=this._ctrGroupByField(i,q=>{const $=String(q.severity||"").trim();return["\u0639\u0627\u0644\u064A\u0629","high","\u062D\u0631\u062C\u0629"].includes($)?"\u0639\u0627\u0644\u064A\u0629":["\u0645\u062A\u0648\u0633\u0637\u0629","medium"].includes($)?"\u0645\u062A\u0648\u0633\u0637\u0629":["\u0645\u0646\u062E\u0641\u0636\u0629","low","\u0642\u0644\u064A\u0644\u0629","\u0645\u0646\u062E\u0636\u0629"].includes($)?"\u0645\u0646\u062E\u0641\u0636\u0629":$||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"});this._ctrDrawDoughnut("ctr-chart-severity",w.labels,w.data,["#ef4444","#f59e0b","#10b981","#94a3b8"]),this._ctrDrawTrend("ctr-chart-trend",i);const b={};a.forEach(q=>{const $=this.prepareContractorForAnalytics(q),y=this.getPreferredContractorAnalyticsKey($,q.id||q.contractorId),S=this.buildContractorAnalyticsMatchers($,y),D=this.dedupeContractorRecords(i.filter(S.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate"]).length;if(D>0){const T=$.name||$.companyName||q.name||q.companyName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";b[T]=D}});const A=Object.entries(b).sort((q,$)=>$[1]-q[1]).slice(0,8);this._ctrDrawHBar("ctr-chart-top-violators",A.map(q=>q[0]),A.map(q=>q[1]),"rgba(245,158,11,0.8)");const C=this._ctrGroupByField(i,q=>String(q.violationLocation||q.location||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._ctrDrawHBar("ctr-chart-location",C.labels,C.data,"rgba(59,130,246,0.78)");const k=this._ctrGroupByField(i,q=>String(q.violationPlace||q.place||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._ctrDrawHBar("ctr-chart-place",k.labels,k.data,"rgba(217,119,6,0.78)")}const f=document.getElementById("ctr-locations-analysis");f&&this.safeSetInnerHTML(f,this.renderContractorViolationsByLocationAnalysis(a,i));const u=document.getElementById("ctr-violations-analysis");u&&this.safeSetInnerHTML(u,this.renderContractorViolationsAnalysis(a,i));const d=document.getElementById("ctr-expiring-contracts");d&&this.safeSetInnerHTML(d,this.renderExpiringContractsAlert(n));const m=document.getElementById("ctr-detailed-analysis");m&&this.safeSetInnerHTML(m,this.renderDetailedContractorAnalysis(a,r,o,i))},exportContractorAnalyticsPDF(){const t=document.getElementById("ctr-export-pdf-btn"),e=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),(async()=>{try{typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 PDF...");const r=this._collectContractorAnalyticsSnapshot(),o=this._buildCtrAnalyticsExportHtml_(r),i="CONTRACTORS-ANALYTICS-"+new Date().toISOString().slice(0,10),s="\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",n=new Date().toISOString(),l=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,s,o,!1,!0,{source:"ContractorsAnalytics",titleEn:"Contractors Analysis Report",titleAr:s,includeQRCode:!1,compactPdfFooter:!0,headerLayoutLtr:!0,footerLegendHtml:this._buildCtrAnalyticsExportLegend_(r)},n,n):'<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>'+s+"</title></head><body>"+o+"</body></html>",c=`Contractors-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;await this._ctrDownloadAnalyticsPdf_(l,c)?Notification?.success?.("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 PDF \u0628\u0646\u062C\u0627\u062D"):Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 PDF \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0628\u062F\u064A\u0644")}catch(r){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A: "+(r.message||""))}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide(),t&&(t.disabled=!1,t.innerHTML=e)}})()},renderAnalyticsOverview(t){const e=Math.min(t.approvalRate,100),a=Math.min(t.activeRate,100),r=Math.min(t.violationResolutionRate,100),o=Math.min(t.avgScore,100),i=n=>n>=80?"text-green-600":n>=60?"text-yellow-600":"text-red-600",s=n=>n>=80?"bg-gradient-to-br from-green-50 to-green-100 border-green-300":n>=60?"bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300":"bg-gradient-to-br from-red-50 to-red-100 border-red-300";return`
            <style>
                .analytics-card {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .analytics-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .analytics-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
                }
                .progress-bar-container {
                    height: 8px;
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-top: 8px;
                }
                .progress-bar {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.6s ease;
                    background: linear-gradient(90deg, var(--bar-start), var(--bar-end));
                }
                .stat-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                }
                .trend-indicator {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    margin-top: 4px;
                }
            </style>
            
            <!-- \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 -->
                <div class="analytics-card bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg" 
                     style="--gradient-start: #3b82f6; --gradient-end: #60a5fa;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                            <p class="text-3xl font-bold text-blue-700">${t.totalContractors}</p>
                        </div>
                        <div class="stat-icon bg-blue-200 text-blue-700">
                            <i class="fas fa-users"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <i class="fas fa-info-circle ml-1"></i>
                        \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0633\u062C\u0644\u064A\u0646
                    </div>
                </div>

                <!-- \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 -->
                <div class="analytics-card bg-gradient-to-br from-green-50 via-green-100 to-green-50 border-2 border-green-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #10b981; --gradient-end: #34d399;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646</p>
                            <p class="text-3xl font-bold text-green-700">${t.totalApproved}</p>
                        </div>
                        <div class="stat-icon bg-green-200 text-green-700">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${e}%; --bar-start: #10b981; --bar-end: #34d399;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-green-700">${t.approvalRate}%</span> \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </div>
                </div>

                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A -->
                <div class="analytics-card bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 border-2 border-yellow-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #f59e0b; --gradient-end: #fbbf24;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</p>
                            <p class="text-3xl font-bold text-yellow-700">${t.totalEvaluations}</p>
                        </div>
                        <div class="stat-icon bg-yellow-200 text-yellow-700">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <i class="fas fa-chart-line ml-1"></i>
                        \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u062A\u0645 \u0625\u062C\u0631\u0627\u0624\u0647\u0627
                    </div>
                </div>

                <!-- \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A -->
                <div class="analytics-card bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-2 border-red-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #ef4444; --gradient-end: #f87171;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-red-700">${t.totalViolations}</p>
                        </div>
                        <div class="stat-icon bg-red-200 text-red-700">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-red-700">${t.violationsPerContractor}</span> \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0643\u0644 \u0645\u0642\u0627\u0648\u0644
                    </div>
                </div>
            </div>

            <!-- \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062B\u0627\u0646\u0648\u064A\u0629 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <!-- \u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 -->
                <div class="analytics-card ${s(t.avgScore)} border-2 rounded-xl p-6 shadow-lg">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</p>
                            <p class="text-3xl font-bold ${i(t.avgScore)}">${t.avgScore}%</p>
                        </div>
                        <div class="stat-icon ${t.avgScore>=80?"bg-green-200 text-green-700":t.avgScore>=60?"bg-yellow-200 text-yellow-700":"bg-red-200 text-red-700"}">
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${o}%; --bar-start: ${t.avgScore>=80?"#10b981":t.avgScore>=60?"#f59e0b":"#ef4444"}; --bar-end: ${t.avgScore>=80?"#34d399":t.avgScore>=60?"#fbbf24":"#f87171"};"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${t.totalEvaluations>0?`\u0645\u0646 ${t.totalEvaluations} \u062A\u0642\u064A\u064A\u0645`:"\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A"}
                    </div>
                </div>

                <!-- \u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F -->
                <div class="analytics-card bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 border-2 border-indigo-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #6366f1; --gradient-end: #818cf8;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0646\u0633\u0628\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</p>
                            <p class="text-3xl font-bold text-indigo-700">${t.approvalRate}%</p>
                        </div>
                        <div class="stat-icon bg-indigo-200 text-indigo-700">
                            <i class="fas fa-certificate"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${e}%; --bar-start: #6366f1; --bar-end: #818cf8;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${t.totalApproved} \u0645\u0646 ${t.totalContractors} \u0645\u0642\u0627\u0648\u0644
                    </div>
                </div>

                <!-- \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 -->
                <div class="analytics-card bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border-2 border-orange-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #f97316; --gradient-end: #fb923c;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646</p>
                            <p class="text-3xl font-bold text-orange-700">${t.activeContractors}</p>
                        </div>
                        <div class="stat-icon bg-orange-200 text-orange-700">
                            <i class="fas fa-bolt"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${a}%; --bar-start: #f97316; --bar-end: #fb923c;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        <span class="font-semibold text-orange-700">${t.activeRate}%</span> \u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646
                    </div>
                </div>

                <!-- \u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A -->
                <div class="analytics-card bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 border-2 border-purple-300 rounded-xl p-6 shadow-lg"
                     style="--gradient-start: #a855f7; --gradient-end: #c084fc;">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700 mb-1">\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-purple-700">${t.violationResolutionRate}%</p>
                        </div>
                        <div class="stat-icon bg-purple-200 text-purple-700">
                            <i class="fas fa-check-double"></i>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${r}%; --bar-start: #a855f7; --bar-end: #c084fc;"></div>
                    </div>
                    <div class="text-xs text-gray-600 mt-2">
                        ${t.resolvedViolations} \u0645\u0646 ${t.totalViolations} \u0645\u062E\u0627\u0644\u0641\u0629 \u0645\u062D\u0644\u0648\u0644\u0629
                    </div>
                </div>
            </div>

            <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <!-- \u0627\u0644\u0639\u0642\u0648\u062F \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629 -->
                <div class="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-5 shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u0627\u0644\u0639\u0642\u0648\u062F \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629</p>
                            <p class="text-2xl font-bold text-gray-700">${t.expiredContractors}</p>
                        </div>
                        <i class="fas fa-calendar-times text-3xl text-gray-400"></i>
                    </div>
                </div>

                <!-- \u0627\u0644\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 -->
                <div class="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-xl p-5 shadow-md">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600 mb-1">\u0642\u0631\u064A\u0628\u0629 \u0645\u0646 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</p>
                            <p class="text-2xl font-bold text-amber-700">${t.expiringSoon||0}</p>
                        </div>
                        <i class="fas fa-hourglass-half text-3xl text-amber-400"></i>
                    </div>
                </div>

                <!-- \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A -->
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-xl p-5 shadow-md">
                    <p class="text-sm font-medium text-gray-600 mb-3">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0634\u062F\u0629</p>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-red-600 font-medium">\u0639\u0627\u0644\u064A\u0629:</span>
                            <span class="font-bold">${t.highSeverityViolations}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-yellow-600 font-medium">\u0645\u062A\u0648\u0633\u0637\u0629:</span>
                            <span class="font-bold">${t.mediumSeverityViolations}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-green-600 font-medium">\u0645\u0646\u062E\u0641\u0636\u0629:</span>
                            <span class="font-bold">${t.lowSeverityViolations}</span>
                        </div>
                    </div>
                </div>
            </div>
        `},dedupeContractorRecords(t,e=[],a=[]){const r=[],o=new Set,i=new Set;return(Array.isArray(t)?t:[]).forEach(n=>{if(!n||typeof n!="object")return;const l=(Array.isArray(e)?e:[]).map(p=>String(n?.[p]||"").trim().toLowerCase()).find(Boolean);if(l){if(o.has(l))return;o.add(l),r.push(n);return}const c=(Array.isArray(a)?a:[]).map(p=>String(n?.[p]||"").trim().toLowerCase()).join("|");!c||i.has(c)||(i.add(c),r.push(n))}),r},_ctrAnalyticsActivationBadge(t){return this.isEntityEnabled(t)?'<span class="ctr-act-active"><i class="fas fa-circle" style="font-size:5px;"></i>\u0646\u0634\u0637</span>':'<span class="ctr-act-inactive"><i class="fas fa-circle" style="font-size:5px;"></i>\u063A\u064A\u0631 \u0646\u0634\u0637</span>'},_ctrAnalyticsResolutionBar(t){const e=Math.min(Math.max(Number(t)||0,0),100),a=e>=80?"#10b981":e>=50?"#f59e0b":"#ef4444",r=e>=80?"#15803d":e>=50?"#b45309":"#b91c1c";return`<div class="ctr-progress"><span style="width:${e}%;background:${a};"></span></div><span style="font-size:.72rem;font-weight:700;color:${r};">${e}%</span>`},_ctrAnalyticsViolationsEmptyPanel(){return`
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#166534 0%,#22c55e 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-check-circle"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629</div>
                        </div>
                    </div>
                </div>
                <div class="ctr-empty-state">
                    <i class="fas fa-check-circle" style="color:#22c55e;"></i>
                    <p style="font-size:.95rem;font-weight:700;color:#374151;margin:0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</p>
                    <p style="font-size:.78rem;color:#64748b;margin-top:6px;">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u064A\u0644\u062A\u0632\u0645\u0648\u0646 \u0628\u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0636\u0645\u0646 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                </div>
            </div>`},renderContractorViolationsByLocationAnalysis(t,e){const a=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??""),r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[];if(!r.length)return`
                <div class="ctr-panel">
                    <div class="ctr-panel-header" style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%);">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div class="ctr-panel-header-icon"><i class="fas fa-map-marked-alt"></i></div>
                            <div>
                                <div style="font-size:1rem;font-weight:800;margin:0;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                                <div style="font-size:.74rem;opacity:.88;margin-top:2px;">\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u0643\u0627\u0646 \u0628\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                            </div>
                        </div>
                    </div>
                    <div class="ctr-empty-state">
                        <i class="fas fa-map" style="color:#94a3b8;"></i>
                        <p style="font-size:.9rem;font-weight:700;color:#374151;margin:0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0639\u0631\u0636 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u0645\u0627\u0643\u0646</p>
                    </div>
                </div>`;const i={};r.forEach(p=>{const f=this._ctrGetViolationPlaceLabel(p);i[f]||(i[f]={violations:0,contractorCounts:{}});const u=i[f];u.violations++;let d=String(p.contractorName||"").trim();if(!d&&o.length)for(const m of o){const v=this.prepareContractorForAnalytics(m),h=this.getPreferredContractorAnalyticsKey(v,m.id||m.contractorId);if(this.buildContractorAnalyticsMatchers(v,h).violationBelongsToContractor(p)){d=v.name||v.companyName||m.name||m.companyName||"";break}}d&&(u.contractorCounts[d]=(u.contractorCounts[d]||0)+1)});const s=Object.entries(i).map(([p,f])=>{const u=Object.entries(f.contractorCounts).sort((d,m)=>m[1]-d[1])[0]||null;return{label:p,violations:f.violations,contractorsCount:Object.keys(f.contractorCounts).length,topContractor:u?{name:u[0],count:u[1]}:null}}).sort((p,f)=>f.violations-p.violations||f.contractorsCount-p.contractorsCount).slice(0,12),n=s.map((p,f)=>{const u=o.length>0?Math.round(p.contractorsCount/o.length*100):0,d=f<3?"#eff6ff":"#f8fafc",m=f<3?"#1d4ed8":"#64748b";return`
                <tr>
                    <td style="text-align:center;"><span class="ctr-rank" style="background:${d};color:${m};">${f+1}</span></td>
                    <td><strong style="color:#1e293b;font-size:.84rem;">${a(p.label)}</strong></td>
                    <td style="text-align:center;"><span style="font-weight:800;color:#dc2626;font-size:.95rem;">${p.violations}</span></td>
                    <td style="text-align:center;"><span style="font-weight:700;color:#4338ca;">${p.contractorsCount}</span></td>
                    <td style="text-align:center;"><span style="font-size:.78rem;font-weight:700;color:#64748b;">${u}%</span></td>
                    <td>${p.topContractor?.name?`<span style="font-size:.8rem;color:#334155;">${a(p.topContractor.name)}</span> <span class="ctr-sev-pill ctr-sev-high" style="margin-right:6px;">${p.topContractor.count||0}</span>`:'<span style="color:#cbd5e1;">\u2014</span>'}</td>
                </tr>`}).join(""),l=s.length,c=s.reduce((p,f)=>p+f.violations,0);return`
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 55%,#60a5fa 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-map-marked-alt"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u0643\u0627\u0646 \u0628\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u064A\u0646</div>
                        </div>
                    </div>
                    <span class="ctr-panel-badge">${l} \u0645\u0643\u0627\u0646 \u2022 ${c} \u0645\u062E\u0627\u0644\u0641\u0629</span>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#eff6ff 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#1d4ed8;">${o.length}</div>
                        <div class="lbl">\u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u062A\u062D\u0644\u064A\u0644</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#dc2626;">${r.length}</div>
                        <div class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #bfdbfe;">
                        <div class="val" style="color:#7c3aed;">${l}</div>
                        <div class="lbl">\u0623\u0645\u0627\u0643\u0646 \u0628\u0645\u062E\u0627\u0644\u0641\u0627\u062A (\u0623\u0639\u0644\u0649 12)</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table">
                        <thead>
                            <tr style="background:#eff6ff;">
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;width:44px;">#</th>
                                <th style="text-align:right;color:#1e40af;border-color:#bfdbfe;">\u0627\u0644\u0645\u0648\u0642\u0639 / \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th>
                                <th style="text-align:center;color:#1e40af;border-color:#bfdbfe;">% \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</th>
                                <th style="text-align:right;color:#1e40af;border-color:#bfdbfe;">\u0623\u0639\u0644\u0649 \u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0645\u0643\u0627\u0646</th>
                            </tr>
                        </thead>
                        <tbody>${n||'<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:24px;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>'}</tbody>
                    </table>
                </div>
            </div>`},renderContractorViolationsAnalysis(t,e){const a=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??""),r=Array.isArray(t)&&t.length>0?t:this.getContractorsForAnalyticsList();if(!e||e.length===0)return this._ctrAnalyticsViolationsEmptyPanel();const o=this._getContractorViolationsAnalysisData_(r,e,10),i=o.rows;if(i.length===0)return this._ctrAnalyticsViolationsEmptyPanel();const s=p=>p.total>0?Math.round(p.resolved/p.total*100):0,n=o.summary||{total:0,high:0,resolved:0,pending:0},l=o.overallResolution||0,c=i.map((p,f)=>{const{name:u,stats:d}=p,m=s(d);return`
                <tr>
                    <td>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span class="ctr-rank" style="background:${f===0?"#fee2e2":f===1?"#ffedd5":f===2?"#fef9c3":"#f1f5f9"};color:${f===0?"#b91c1c":f===1?"#c2410c":f===2?"#a16207":"#64748b"};">${f+1}</span>
                            <strong style="color:#1e293b;font-size:.84rem;">${a(u)}</strong>
                        </div>
                    </td>
                    <td style="text-align:center;"><span style="font-size:1rem;font-weight:800;color:#1d4ed8;">${d.total}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-high">${d.high}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-med">${d.medium}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-low">${d.low}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-low">${d.resolved}</span></td>
                    <td style="text-align:center;"><span class="ctr-sev-pill ctr-sev-med" style="background:#ffedd5;color:#c2410c;border-color:#fed7aa;">${d.pending}</span></td>
                    <td style="text-align:center;">${this._ctrAnalyticsResolutionBar(m)}</td>
                </tr>`}).join("");return`
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 55%,#ef4444 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">\u0623\u0639\u0644\u0649 ${i.length} \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u2014 \u0645\u0637\u0627\u0628\u0642 \u0644\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0641\u0635\u0644</div>
                        </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                        <span class="ctr-panel-badge">${n.total} \u0645\u062E\u0627\u0644\u0641\u0629</span>
                        <button type="button" onclick="Contractors.exportContractorAnalyticsPDF()" title="\u062A\u0635\u062F\u064A\u0631 PDF" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.4);cursor:pointer;background:rgba(255,255,255,.18);color:#fff;font-size:.72rem;font-weight:700;display:inline-flex;align-items:center;gap:5px;">
                            <i class="fas fa-file-pdf"></i><span>PDF</span>
                        </button>
                    </div>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#fef2f2 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#dc2626;">${i.length}</div>
                        <div class="lbl">\u0645\u0642\u0627\u0648\u0644 \u0645\u062E\u0627\u0644\u0650\u0641</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#1d4ed8;">${n.total}</div>
                        <div class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#b91c1c;">${n.high}</div>
                        <div class="lbl">\u0634\u062F\u0629 \u0639\u0627\u0644\u064A\u0629</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#15803d;">${n.resolved}</div>
                        <div class="lbl">\u0645\u062D\u0644\u0648\u0644\u0629</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#c2410c;">${n.pending}</div>
                        <div class="lbl">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #fecaca;">
                        <div class="val" style="color:#7c3aed;">${l}%</div>
                        <div class="lbl">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table">
                        <thead>
                            <tr style="background:#fef2f2;">
                                <th style="text-align:right;color:#991b1b;border-color:#fecaca;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0639\u0627\u0644\u064A\u0629</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0645\u062A\u0648\u0633\u0637\u0629</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0645\u0646\u062E\u0641\u0636\u0629</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0645\u062D\u0644\u0648\u0644\u0629</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</th>
                                <th style="text-align:center;color:#991b1b;border-color:#fecaca;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</th>
                            </tr>
                        </thead>
                        <tbody>${c}</tbody>
                    </table>
                </div>
            </div>`},getExpiringContracts(t,e){const a=new Date,r=new Date(a.getTime()+720*60*60*1e3),o=[];return t.forEach(i=>{if(i.endDate){const s=new Date(i.endDate);s>=a&&s<=r&&o.push({id:i.id,name:i.name,type:"contractor",endDate:i.endDate,daysRemaining:Math.ceil((s-a)/(1e3*60*60*24))})}}),e.forEach(i=>{if(i.expiryDate){const s=new Date(i.expiryDate);s>=a&&s<=r&&o.push({id:i.id,name:i.companyName||i.name,type:"approved",endDate:i.expiryDate,daysRemaining:Math.ceil((s-a)/(1e3*60*60*24))})}}),o.sort((i,s)=>i.daysRemaining-s.daysRemaining)},renderExpiringContractsAlert(t){if(t.length===0)return"";const e=t.filter(s=>s.daysRemaining<=7),a=t.filter(s=>s.daysRemaining>7&&s.daysRemaining<=15),r=t.filter(s=>s.daysRemaining>15),o=s=>s<=7?'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border-2 border-red-300"><i class="fas fa-exclamation-circle ml-1"></i>\u062D\u0631\u062C</span>':s<=15?'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border-2 border-yellow-300"><i class="fas fa-exclamation-triangle ml-1"></i>\u062A\u062D\u0630\u064A\u0631</span>':'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border-2 border-blue-300"><i class="fas fa-info-circle ml-1"></i>\u0639\u0627\u062F\u064A</span>',i=s=>s<=7?"badge-danger":s<=15?"badge-warning":"badge-info";return`
            <div class="content-card mb-6 border-2 border-yellow-400 rounded-xl shadow-lg overflow-hidden">
                <div class="card-header bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 border-b-2 border-yellow-300">
                    <div class="flex items-center justify-between p-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-exclamation-circle text-white text-xl"></i>
                            </div>
                            <div>
                                <h3 class="card-title text-lg font-bold text-yellow-900">
                                    \u062A\u0646\u0628\u064A\u0647: \u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0645\u0646 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621
                                </h3>
                                <p class="text-sm text-yellow-700 mt-1">\u064A\u0648\u062C\u062F ${t.length} \u0639\u0642\u062F \u064A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u0645\u062A\u0627\u0628\u0639\u0629</p>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            ${e.length>0?`<span class="badge badge-danger text-sm px-3 py-1">${e.length} \u062D\u0631\u062C</span>`:""}
                            ${a.length>0?`<span class="badge badge-warning text-sm px-3 py-1">${a.length} \u062A\u062D\u0630\u064A\u0631</span>`:""}
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="overflow-x-auto">
                        <table class="data-table w-full">
                            <thead class="bg-yellow-100">
                                <tr>
                                    <th class="px-6 py-4 text-right font-bold text-yellow-900 border-b border-yellow-200">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u062C\u0647\u0629</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">\u0646\u0648\u0639 \u0627\u0644\u0639\u0642\u062F</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">\u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629</th>
                                    <th class="px-6 py-4 text-center font-bold text-yellow-900 border-b border-yellow-200">\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-yellow-100">
                                ${t.map((s,n)=>{const l=s.daysRemaining<=7,c=s.daysRemaining>7&&s.daysRemaining<=15;return`
                                    <tr class="hover:bg-yellow-50 transition-colors ${l?"bg-red-50":c?"bg-yellow-50":"bg-white"} ${n%2===0?"":"bg-opacity-50"}">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10 ${l?"bg-red-200":c?"bg-yellow-200":"bg-blue-200"} rounded-full flex items-center justify-center ml-3">
                                                    <i class="fas ${s.type==="contractor"?"fa-hammer":"fa-building"} ${l?"text-red-600":c?"text-yellow-600":"text-blue-600"}"></i>
                                                </div>
                                                <strong class="text-gray-800 font-semibold">${Utils.escapeHTML(s.name)}</strong>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${s.type==="contractor"?"bg-blue-100 text-blue-700":"bg-green-100 text-green-700"}">
                                                <i class="fas ${s.type==="contractor"?"fa-hammer":"fa-check-circle"} ml-1"></i>
                                                ${s.type==="contractor"?"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0639\u062A\u0645\u062F"}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <div class="flex flex-col items-center">
                                                <span class="text-gray-700 font-medium">${Utils.formatDate(s.endDate)}</span>
                                                <span class="text-xs text-gray-500 mt-1">
                                                    <i class="far fa-calendar ml-1"></i>
                                                    ${new Date(s.endDate).toLocaleDateString("ar-SA",{weekday:"long"})}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            <div class="flex flex-col items-center">
                                                <span class="badge ${i(s.daysRemaining)} text-lg font-bold px-4 py-2 mb-1">
                                                    ${s.daysRemaining}
                                                </span>
                                                <span class="text-xs text-gray-600">\u064A\u0648\u0645 \u0645\u062A\u0628\u0642\u064A</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 text-center">
                                            ${o(s.daysRemaining)}
                                        </td>
                                    </tr>
                                `}).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `},prepareContractorForAnalytics(t){return typeof Utils<"u"&&typeof Utils.sanitizeContractorIdentity=="function"?Utils.sanitizeContractorIdentity(t):t&&typeof t=="object"?{...t}:{}},getPreferredContractorAnalyticsKey(t,e=""){return typeof Utils<"u"&&typeof Utils.getPreferredContractorLookupKey=="function"?Utils.getPreferredContractorLookupKey(t,e):String(t?.code||t?.isoCode||t?.contractorCode||t?.contractorId||t?.id||e||"").trim()},resolveContractorForAnalytics(t,e=""){const a=p=>typeof Utils<"u"&&typeof Utils.normalizeContractorIdentityValue=="function"?Utils.normalizeContractorIdentityValue(p):String(p??"").trim().toLowerCase(),r=p=>typeof Utils<"u"&&typeof Utils.canonicalizeContractorName=="function"?Utils.canonicalizeContractorName(p):a(p),o=a(t),i=r(e),n=[...typeof this.getAllContractorsForModules=="function"?this.getAllContractorsForModules():[],...AppState.appData.approvedContractors||[],...AppState.appData.contractors||[]].filter(Boolean);let l=null,c=-1;return n.forEach(p=>{const f=this.prepareContractorForAnalytics(p);let u=0;if(o){const m=[f.code,f.isoCode,f.contractorCode,f.entityCode],v=[f.licenseNumber,f.contractNumber,f.approvedEntityId],h=[f.contractorId,f.id],w=[...Array.isArray(f.aliasIds)?f.aliasIds:[],...Array.isArray(f.identityIds)?f.identityIds:[],...Array.isArray(f.legacyIds)?f.legacyIds:[],...Array.isArray(f.altIds)?f.altIds:[]];m.some(b=>a(b)===o)?u=Math.max(u,100):v.some(b=>a(b)===o)?u=Math.max(u,80):h.some(b=>a(b)===o)?u=Math.max(u,50):w.some(b=>a(b)===o)&&(u=Math.max(u,40))}const d=r(f.name||f.companyName||f.contractorName||f.company||"");i&&d&&d===i&&(u+=o?25:90),u>c&&(c=u,l=f)}),c>0?l:null},buildContractorAnalyticsMatchers(t,e){if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(t,e);const a=b=>String(b??"").trim().toLowerCase(),r=b=>a(b),o=this.prepareContractorForAnalytics(t),i=String(o.name||o.companyName||o.contractorName||o.company||"").trim(),s=new Set,n=[o.code,o.isoCode,o.contractorCode,o.entityCode],l=[o.licenseNumber,o.contractNumber,o.approvedEntityId],c=[o.contractorId,o.id],p=[...Array.isArray(o.aliasIds)?o.aliasIds:[],...Array.isArray(o.identityIds)?o.identityIds:[],...Array.isArray(o.legacyIds)?o.legacyIds:[],...Array.isArray(o.altIds)?o.altIds:[]];[...n,...l,...c,...p].filter(Boolean).forEach(b=>s.add(a(b)));const f=new Set,u=new Set;[o.name,o.companyName,o.contractorName,o.company,o.entityName,o.externalName].filter(Boolean).map(b=>String(b).trim()).forEach(b=>{f.add(a(b)),u.add(r(b))});const m=b=>!b||typeof b!="object"?[]:[b.contractorId,b.code,b.isoCode,b.contractorCode,b.entityCode,b.licenseNumber,b.contractNumber,b.approvedEntityId].filter(A=>A!=null&&String(A).trim()!=="").map(A=>a(A)).filter(Boolean),v=b=>!b||typeof b!="object"?[]:["contractorName","companyName","company","contractorCompany","name","externalName","entityName","violatorCompany","contractor","requestingParty","authorizedParty"].map(C=>b[C]).filter(C=>C!=null&&String(C).trim()!=="").map(C=>String(C).replace(/\s+/g," ").trim()).filter(Boolean),h=b=>{if(b==null)return!1;const A=a(b);if(A&&f.has(A))return!0;const C=r(b);return!!(C&&u.has(C))},w=b=>!b||typeof b!="object"?!1:m(b).some(k=>s.has(k))?!0:v(b).some(h);return{normalize:a,idsSet:s,exactNameSet:f,canonicalNameSet:u,contractorName:i,matchesContractor:w,hasAnyRecordIds(b){return m(b).length>0},matchesNameValue:h,matchFieldsByName(b){if(!b||typeof b!="object")return null;const A=v(b);return A.length===0?null:A.find(h)||null},violationBelongsToContractor(b){if(!b||typeof b!="object")return!1;const A=a(b.personType);if((A==="employee"||A==="\u0645\u0648\u0638\u0641")&&!b.contractorName&&!b.contractorId&&!b.contractorCode&&!b.code&&!b.isoCode)return!1;const C=m(b);if(C.length>0&&C.some(q=>s.has(q)))return!0;const k=v(b);return k.length>0&&k.some(h)?!0:w(b)},evaluationBelongsToContractor(b){if(!b||typeof b!="object")return!1;const A=m(b);if(A.length>0&&A.some(k=>s.has(k)))return!0;const C=v(b);return C.length>0&&C.some(h)?!0:w(b)}}},renderDetailedContractorAnalysis(t,e,a,r){const o=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??"");if(!t||!Array.isArray(t)||t.length===0)return`
                <div class="ctr-panel">
                    <div class="ctr-panel-header" style="background:linear-gradient(135deg,#312e81 0%,#6366f1 100%);">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <div class="ctr-panel-header-icon"><i class="fas fa-list-alt"></i></div>
                            <div>
                                <div style="font-size:1rem;font-weight:800;margin:0;">\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0644\u0643\u0644 \u0645\u0642\u0627\u0648\u0644</div>
                                <div style="font-size:.74rem;opacity:.88;margin-top:2px;">0 \u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</div>
                            </div>
                        </div>
                    </div>
                    <div class="ctr-empty-state">
                        <i class="fas fa-inbox" style="color:#94a3b8;"></i>
                        <p style="font-size:.95rem;font-weight:700;color:#374151;margin:0;">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645</p>
                        <p style="font-size:.78rem;color:#64748b;margin-top:6px;">\u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0644\u0639\u0631\u0636 \u0627\u0644\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0641\u0635\u0644</p>
                    </div>
                </div>`;const i=this.buildContractorDetailedStatsList(t,a,r),s={total:i.length,active:i.filter(p=>this.isEntityEnabled(p)).length,inactive:i.filter(p=>!this.isEntityEnabled(p)).length,withViolations:i.filter(p=>p.violationsCount>0).length,withEvaluations:i.filter(p=>p.evaluationsCount>0).length},n=p=>p>=80?"#15803d":p>=60?"#b45309":"#b91c1c",l=(p,f)=>p==="expired"?'<span class="ctr-sev-pill ctr-sev-high"><i class="fas fa-times-circle" style="font-size:9px;margin-left:3px;"></i>\u0645\u0646\u062A\u0647\u064A</span>':p==="expiring"?`<span class="ctr-sev-pill ctr-sev-med"><i class="fas fa-hourglass-half" style="font-size:9px;margin-left:3px;"></i>${f} \u064A\u0648\u0645</span>`:p==="active"?'<span class="ctr-sev-pill ctr-sev-low"><i class="fas fa-check-circle" style="font-size:9px;margin-left:3px;"></i>\u0646\u0634\u0637</span>':'<span class="ctr-sev-pill" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',c=i.map((p,f)=>{const u=encodeURIComponent(p.analyticsLookupKey||p.id||p.contractorId||""),d=encodeURIComponent(p.analyticsDisplayName||p.name||p.companyName||""),m=n(p.avgScore);return`
                <tr style="border-right:3px solid ${p.violationsCount>0?"#fecaca":p.evaluationsCount>0?"#bbf7d0":"#e2e8f0"};">
                    <td style="text-align:center;"><span class="ctr-rank" style="background:#eef2ff;color:#4338ca;">${f+1}</span></td>
                    <td>
                        <div style="min-width:0;">
                            <strong style="color:#1e293b;font-size:.84rem;display:block;margin-bottom:4px;">${o(p.name||p.companyName||"")}</strong>
                            ${this._ctrAnalyticsActivationBadge(p)}
                        </div>
                    </td>
                    <td style="text-align:center;color:#475569;font-size:.78rem;">${o((p.serviceType||p.entityType||"-").toString())}</td>
                    <td style="text-align:center;">${l(p.contractStatus,p.daysRemaining)}</td>
                    <td style="text-align:center;">
                        <span style="font-weight:700;font-size:.9rem;color:${p.evaluationsCount>0?"#b45309":"#94a3b8"};">${p.evaluationsCount}</span>
                    </td>
                    <td style="text-align:center;">
                        <div style="font-weight:800;font-size:.9rem;color:${m};">${p.avgScore}%</div>
                        <div class="ctr-progress" style="width:56px;margin-top:4px;"><span style="width:${Math.min(p.avgScore,100)}%;background:${m};"></span></div>
                    </td>
                    <td style="text-align:center;">
                        <span style="font-weight:700;font-size:.9rem;color:${p.violationsCount>0?"#b91c1c":"#15803d"};">${p.violationsCount}</span>
                    </td>
                    <td style="text-align:center;">
                        ${p.highViolations>0?`<span class="ctr-sev-pill ctr-sev-high">${p.highViolations}</span>`:'<span style="color:#cbd5e1;">\u2014</span>'}
                    </td>
                    <td style="text-align:center;">${this._ctrAnalyticsResolutionBar(p.resolutionRate)}</td>
                    <td style="text-align:center;">
                        <button onclick="Contractors.viewContractorAnalytics(decodeURIComponent('${u}'), decodeURIComponent('${d}'))"
                                class="contractor-analytics-view-btn"
                                style="display:inline-flex;align-items:center;gap:5px;padding:6px 12px;border-radius:8px;border:none;cursor:pointer;background:#eef2ff;color:#4338ca;font-size:.74rem;font-weight:700;"
                                title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                            <i class="fas fa-eye"></i><span>\u0639\u0631\u0636</span>
                        </button>
                    </td>
                </tr>`}).join("");return`
            <style>
                .contractor-analytics-view-btn:hover { background:#c7d2fe !important; }
                [data-theme="dark"] .contractor-analytics-view-btn { background:#4b5563 !important; color:#f3f4f6 !important; }
            </style>
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#312e81 0%,#6366f1 55%,#818cf8 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-list-alt"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0644\u0643\u0644 \u0645\u0642\u0627\u0648\u0644</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">${s.total} \u0645\u0642\u0627\u0648\u0644 \u2014 \u062A\u0631\u062A\u064A\u0628 \u062D\u0633\u0628 \u0627\u0644\u0623\u062F\u0627\u0621 \u0648\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                        </div>
                    </div>
                    <span class="ctr-panel-badge">${s.withViolations} \u0628\u0645\u062E\u0627\u0644\u0641\u0627\u062A</span>
                </div>
                <div class="ctr-panel-summary" style="background:linear-gradient(180deg,#eef2ff 0%,#fff 100%);">
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#4338ca;">${s.total}</div>
                        <div class="lbl">\u0625\u062C\u0645\u0627\u0644\u064A</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#15803d;">${s.active}</div>
                        <div class="lbl">\u0646\u0634\u0637</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#dc2626;">${s.inactive}</div>
                        <div class="lbl">\u063A\u064A\u0631 \u0646\u0634\u0637</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#b45309;">${s.withEvaluations}</div>
                        <div class="lbl">\u0644\u062F\u064A\u0647\u0645 \u062A\u0642\u064A\u064A\u0645</div>
                    </div>
                    <div class="ctr-panel-summary-item" style="background:#fff;border:1px solid #c7d2fe;">
                        <div class="val" style="color:#b91c1c;">${s.withViolations}</div>
                        <div class="lbl">\u0644\u062F\u064A\u0647\u0645 \u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                    </div>
                </div>
                <div class="ctr-data-table-wrap">
                    <table class="ctr-data-table" style="min-width:960px;">
                        <thead>
                            <tr style="background:#eef2ff;">
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;width:44px;">#</th>
                                <th style="text-align:right;color:#3730a3;border-color:#c7d2fe;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0642\u062F</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0639\u0627\u0644\u064A\u0629</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</th>
                                <th style="text-align:center;color:#3730a3;border-color:#c7d2fe;">\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                            </tr>
                        </thead>
                        <tbody>${c}</tbody>
                    </table>
                </div>
            </div>`},async viewContractorAnalytics(t,e=""){let a=this.resolveContractorForAnalytics(t,e);if(a||(a=(AppState.appData.contractors||[]).find(g=>g.id===t||g.contractorId===t||g.code===t||g.isoCode===t)),a||(a=(AppState.appData.approvedContractors||[]).find(g=>g.id===t||g.contractorId===t||g.code===t||g.isoCode===t)),!a){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}a=this.prepareContractorForAnalytics(a);const r=this.getPreferredContractorAnalyticsKey(a,t||e),o=(a.name||a.companyName||"").trim(),i=this.buildContractorAnalyticsMatchers(a,r),s=i.matchesContractor,n=g=>{if(!g)return!1;if(s(g))return!0;if(i.hasAnyRecordIds(g))return!1;const x=String(g.requestingParty||"").replace(/\s+/g," ").trim(),E=String(g.authorizedParty||"").replace(/\s+/g," ").trim(),R=String(g.responsible||"").replace(/\s+/g," ").trim();return i.matchFieldsByName([x,E,R])},l=(g,x)=>{let E=x||(AppState.appData.contractorEvaluations||[]).filter(i.evaluationBelongsToContractor),R=g||(AppState.appData.violations||[]).filter(i.violationBelongsToContractor),M=0;if(E.length>0){const F=E.map(N=>parseFloat(N.finalScore)||parseFloat(N.score)||0).filter(N=>!isNaN(N)&&N>=0&&N<=100);if(F.length>0){const N=F.reduce((z,H)=>z+H,0);M=Math.round(N/F.length*100)/100}}const P=R.filter(F=>{const N=(F.severity||"").toString().trim();return N==="\u0639\u0627\u0644\u064A\u0629"||N==="high"||N==="\u062D\u0631\u062C\u0629"}).length,j=R.filter(F=>{const N=(F.status||"").toString().trim();return N==="\u0645\u062D\u0644\u0648\u0644"||N==="resolved"||N==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,B=R.length>0?Math.round(j/R.length*100):100,U=new Set(E.map(F=>F.id||F.evaluationId).filter(Boolean)),O=U.size>0?U.size:E.length;return{evaluations:E,violations:R,evaluationsCountDisplay:O,avgScore:M,highViolations:P,resolvedViolations:j,resolutionRate:B}};let c=l();const f=(AppState.appData.training||[]).filter(g=>{if(!g)return!1;if((g.contractorName||g.contractorId||g.contractorCode)&&s(g))return!0;let x=g.participants;if(typeof x=="string"&&x.trim())try{x=JSON.parse(x)}catch{x=null}return x&&Array.isArray(x)?x.some(E=>E&&(E.personType==="contractor"||E.type==="contractor"||E.contractorName||E.companyName||E.company)&&s(E)):!1}),d=(AppState.appData.contractorTrainings||[]).filter(g=>{if(!g)return!1;if(s(g))return!0;const x=String(g.contractorName||g.companyName||"").replace(/\s+/g," ").trim();return!i.hasAnyRecordIds(g)&&i.matchesNameValue(x)}),m=new Set;f.forEach(g=>{const x=g.id||String(g.startDate||"")+String(g.name||g.trainingType||"");x&&m.add(x)});let v=f.length;d.forEach(g=>{const x=g.id||String(g.date||"")+String(g.topic||g.trainingName||g.name||"");x&&!m.has(x)?(m.add(x),v+=1):x||(v+=1)});let w=(AppState.appData.ptw||[]).concat(Array.isArray(AppState.appData.ptwRegistry)?AppState.appData.ptwRegistry:[]).filter(n).length;const b=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),A=new Set;let k=b.filter(g=>{if(!g)return!1;const x=String(g.id||"").trim();return x?A.has(x)?!1:(A.add(x),!0):!0}).filter(g=>(g.personType==="contractor"||g.personType==="external"||g.contractorName)&&s(g)).length,$=(AppState.appData.injuries||[]).filter(g=>{if(!g||(g.personType||"").toString().toLowerCase()!=="contractor")return!1;if(s(g))return!0;const x=String(g.personName||g.employeeName||g.contractorName||"").trim();return!i.hasAnyRecordIds(g)&&i.matchesNameValue(x)}).length,y=(AppState.appData.incidents||[]).filter(g=>g?(g.personType==="contractor"||g.contractorName||g.affiliation==="contractor"||g.contractorId!=null&&g.contractorId!=="")&&s(g):!1).length,S=(AppState.appData.sickLeave||[]).filter(g=>(g.personType==="contractor"||g.contractorName)&&s(g)).length;const D=g=>g>=80?"text-green-600 bg-green-100":g>=60?"text-yellow-600 bg-yellow-100":"text-red-600 bg-red-100",T=g=>!Array.isArray(g)||g.length===0?`
                    <tr>
                        <td colspan="4" class="px-6 py-6 text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631</td>
                    </tr>
                `:g.map((x,E)=>{const R=(x.severity||"").toString().trim(),M=(x.status||"").toString().trim(),P=R==="\u0639\u0627\u0644\u064A\u0629"||R==="high"||R==="\u062D\u0631\u062C\u0629"?"badge-danger":R==="\u0645\u062A\u0648\u0633\u0637\u0629"||R==="medium"?"badge-warning":"badge-info",j=M==="\u0645\u062D\u0644\u0648\u0644"||M==="resolved"||M==="\u062A\u0645 \u0627\u0644\u062D\u0644"?"badge-success":"badge-warning";return`
                    <tr class="hover:bg-gray-50 transition-colors ${E%2===0?"bg-white":"bg-gray-50"}">
                        <td class="px-6 py-4 text-gray-700">${x.violationDate?Utils.formatDate(x.violationDate):"-"}</td>
                        <td class="px-6 py-4 text-gray-800 font-medium">${Utils.escapeHTML(x.violationType||"-")}</td>
                        <td class="px-6 py-4 text-center">
                            <span class="badge ${P} text-sm font-bold px-3 py-1">${x.severity||"-"}</span>
                        </td>
                        <td class="px-6 py-4 text-center">
                            <span class="badge ${j} text-sm font-bold px-3 py-1">${x.status||"-"}</span>
                        </td>
                    </tr>
                `}).join(""),_=(g,x,E)=>!Array.isArray(g)||g.length===0?`
                    <div class="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                        <i class="fas fa-check-circle text-5xl text-green-500 mb-4"></i>
                        <p class="text-lg font-semibold text-green-700">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629</p>
                        <p class="text-sm text-green-600 mt-2">\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u064A\u0644\u062A\u0632\u0645 \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631</p>
                    </div>
                `:`
                <div class="border-2 border-gray-200 rounded-xl overflow-hidden shadow-md">
                    <div class="bg-gradient-to-r from-red-50 to-red-100 border-b-2 border-red-200 p-4">
                        <div class="flex items-center justify-between gap-3 flex-wrap">
                            <h3 class="text-lg font-bold text-red-800 flex items-center">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A (<span id="contractor-violations-count">${g.length}</span>)
                            </h3>
                            <button type="button" class="btn-primary" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-color: #b91c1c;" onclick="Contractors.exportContractorViolationsReport('${encodeURIComponent(String(r||a.id||a.contractorId||""))}', '${encodeURIComponent(String(o||a.name||a.companyName||""))}')">
                                <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A
                            </button>
                        </div>
                    </div>
                    <div class="p-4 bg-gray-50 border-b border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0628\u062D\u062B</label>
                                <div class="relative">
                                    <input type="text" id="contractor-violations-search" class="form-input pr-10 border-2 border-indigo-200 bg-white shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300" placeholder="\u0627\u0628\u062D\u062B \u0641\u064A \u0643\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062C\u062F\u0648\u0644...">
                                    <i class="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none"></i>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0634\u062E\u0635</label>
                                <select id="contractor-violations-person-type" class="form-input">
                                    <option value="">\u0627\u0644\u0643\u0644</option>
                                    <option value="employee">\u0645\u0648\u0638\u0641</option>
                                    <option value="contractor">\u0645\u0642\u0627\u0648\u0644 / \u0634\u0631\u0643\u0629 \u062E\u0627\u0631\u062C\u064A\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</label>
                                <select id="contractor-violations-type" class="form-input">
                                    <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639</option>
                                    ${x.map(R=>`<option value="${Utils.escapeHTML(R)}">${Utils.escapeHTML(R)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062F\u0631\u062C\u0629</label>
                                <select id="contractor-violations-severity" class="form-input">
                                    <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062F\u0631\u062C\u0627\u062A</option>
                                    ${E.map(R=>`<option value="${Utils.escapeHTML(R)}">${Utils.escapeHTML(R)}</option>`).join("")}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="data-table w-full">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="px-6 py-3 text-right font-bold text-gray-700">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                    <th class="px-6 py-3 text-right font-bold text-gray-700">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                    <th class="px-6 py-3 text-center font-bold text-gray-700">\u0627\u0644\u0634\u062F\u0629</th>
                                    <th class="px-6 py-3 text-center font-bold text-gray-700">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                </tr>
                            </thead>
                            <tbody id="contractor-violations-tbody" class="divide-y divide-gray-100">
                                ${T(g)}
                            </tbody>
                        </table>
                    </div>
                </div>
            `,I=document.createElement("div");I.className="modal-overlay",I.innerHTML=`
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-chart-bar text-xl"></i>
                            </div>
                            <div>
                                <h2 class="modal-title text-xl font-bold flex items-center">
                                    \u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644: ${Utils.escapeHTML(o||a.name||a.companyName||"")}
                                    <span id="live-loader-indicator" class="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 animate-pulse">
                                        <i class="fas fa-sync fa-spin ml-1 text-xs"></i>
                                        \u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...
                                    </span>
                                </h2>
                                <p class="text-sm text-indigo-100 mt-1">${Utils.escapeHTML(a.serviceType||a.entityType||"")}</p>
                            </div>
                        </div>
                        <button class="modal-close bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-colors" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body p-6">
                    <!-- \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 -->
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-clipboard-check text-3xl text-blue-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</p>
                            <p class="text-3xl font-bold text-blue-700" id="evals-count-val">${c.evaluationsCountDisplay}</p>
                        </div>
                        <div class="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-red-700" id="viols-count-val">${c.violations.length}</p>
                        </div>
                        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-star text-3xl text-yellow-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</p>
                            <p class="text-3xl font-bold ${D(c.avgScore).split(" ")[0]}" id="avg-score-val">${c.avgScore}%</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-check-double text-3xl text-green-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-green-700" id="res-rate-val">${c.resolutionRate}%</p>
                        </div>
                    </div>

                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</p>
                            <p class="text-2xl font-bold text-red-600" id="high-viols-val">${c.highViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u062D\u0644\u0648\u0644\u0629</p>
                            <p class="text-2xl font-bold text-green-600" id="resolved-viols-val">${c.resolvedViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</p>
                            <p class="text-2xl font-bold text-orange-600" id="pending-viols-val">${c.violations.length-c.resolvedViolations}</p>
                        </div>
                    </div>

                    <!-- \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A - \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D - \u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629 - \u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-graduation-cap text-2xl text-teal-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u062F \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u0627\u062A</p>
                            <p class="text-2xl font-bold text-teal-700" id="trainings-count-val">${v}</p>
                        </div>
                        <div class="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-file-signature text-2xl text-cyan-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u062F \u0627\u0644\u062A\u0635\u0627\u0631\u064A\u062D</p>
                            <p class="text-2xl font-bold text-cyan-700" id="permits-count-val">${w}</p>
                        </div>
                        <div class="bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-violet-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-stethoscope text-2xl text-violet-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u062A\u0631\u062F\u062F \u0639\u0644\u0649 \u0627\u0644\u0639\u064A\u0627\u062F\u0629</p>
                            <p class="text-2xl font-bold text-violet-700" id="clinic-visits-count-val">${k}</p>
                        </div>
                        <div class="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-band-aid text-2xl text-amber-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A</p>
                            <p class="text-2xl font-bold text-amber-700" id="injuries-count-val">${$}</p>
                        </div>
                        <div class="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-exclamation-circle text-2xl text-orange-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u062D\u0648\u0627\u062F\u062B</p>
                            <p class="text-2xl font-bold text-orange-700" id="incidents-count-val">${y}</p>
                        </div>
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-notes-medical text-2xl text-blue-600"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0631\u0636\u064A\u0629</p>
                            <p class="text-2xl font-bold text-blue-700" id="sick-leave-count-val">${S}</p>
                        </div>
                    </div>

                    <!-- \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A -->
                    <div id="violations-container-placeholder">
                        ${_(c.violations,Array.from(new Set(c.violations.map(g=>String(g?.violationType||"").trim()).filter(Boolean))),Array.from(new Set(c.violations.map(g=>String(g?.severity||"").trim()).filter(Boolean))))}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(I);const L=g=>{const x=I.querySelector("#contractor-violations-search"),E=I.querySelector("#contractor-violations-person-type"),R=I.querySelector("#contractor-violations-type"),M=I.querySelector("#contractor-violations-severity"),P=I.querySelector("#contractor-violations-tbody"),j=I.querySelector("#contractor-violations-count");if(!P)return;const B=N=>String(N||"").trim().toLowerCase(),U=N=>{const z=B(N?.personType);return z||(N?.contractorName?"contractor":"employee")},O=N=>!N||typeof N!="object"?"":Object.values(N).map(z=>String(z||"")).join(" ").toLowerCase(),F=()=>{const N=B(x?.value),z=B(E?.value),H=B(R?.value),V=B(M?.value),K=g.filter(W=>{if(z){const G=U(W);if(z==="contractor"&&!(G==="contractor"||G==="supplier"||G==="external")||z==="employee"&&G!=="employee")return!1}return!(H&&B(W?.violationType)!==H||V&&B(W?.severity)!==V||N&&!O(W).includes(N))});P&&(P.innerHTML=T(K)),j&&(j.textContent=String(K.length))};[x,E,R,M].forEach(N=>{if(!N)return;const z=N.tagName==="SELECT"?"change":"input";N.addEventListener(z,F)})};c.violations.length>0&&L(c.violations),I.addEventListener("click",g=>{g.target===I&&I.remove()}),(async()=>{try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.syncData&&AppState.googleConfig?.appsScript?.enabled){const x=!AppState.appData.contractorTrainings?.length,E=!AppState.appData.training?.length,R=(!AppState.appData.ptw||!AppState.appData.ptw.length)&&(!AppState.appData.ptwRegistry||!AppState.appData.ptwRegistry.length),M=!AppState.appData.violations?.length,P=!AppState.appData.contractorEvaluations?.length,j=!AppState.appData.clinicVisits?.length,B=!AppState.appData.injuries?.length;if(x||E||R||M||P||j||B){const U=[];x&&U.push("ContractorTrainings"),E&&U.push("Training"),R&&U.push("PTW","PTWRegistry"),M&&U.push("Violations"),P&&U.push("ContractorEvaluations"),j&&U.push("ClinicVisits","ClinicContractorVisits"),B&&U.push("Injuries","ClinicContractorInjuries"),U.length&&GoogleIntegration.syncData({sheets:[...new Set(U)],silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1}).catch(O=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0647\u0627\u062F\u0626\u0629 \u0641\u0634\u0644\u062A:",O)})}}let g=null;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState.googleConfig?.appsScript?.enabled){const x=await GoogleIntegration.sendRequest({action:"getContractorDetailedAnalytics",data:{contractor:a,contractorId:r}});x&&x.success&&x.data&&(g=x.data)}if(g){const x=l(g.violations,g.evaluations);typeof g.avgScore=="number"&&(x.avgScore=g.avgScore),typeof g.highViolations=="number"&&(x.highViolations=g.highViolations),typeof g.resolvedViolations=="number"&&(x.resolvedViolations=g.resolvedViolations),typeof g.resolutionRate=="number"&&(x.resolutionRate=g.resolutionRate),typeof g.trainingsCount=="number"&&(v=g.trainingsCount),typeof g.ptwCount=="number"&&(w=g.ptwCount),typeof g.clinicVisitsCount=="number"&&(k=g.clinicVisitsCount),typeof g.injuriesCount=="number"&&($=g.injuriesCount),typeof g.incidentsCount=="number"&&(y=g.incidentsCount),typeof g.sickLeaveCount=="number"&&(S=g.sickLeaveCount);const E=I.querySelector("#evals-count-val");E&&(E.textContent=x.evaluationsCountDisplay);const R=I.querySelector("#viols-count-val");R&&(R.textContent=x.violations.length);const M=I.querySelector("#avg-score-val");M&&(M.textContent=`${x.avgScore}%`,M.className=`text-3xl font-bold ${D(x.avgScore).split(" ")[0]}`);const P=I.querySelector("#res-rate-val");P&&(P.textContent=`${x.resolutionRate}%`);const j=I.querySelector("#high-viols-val");j&&(j.textContent=x.highViolations);const B=I.querySelector("#resolved-viols-val");B&&(B.textContent=x.resolvedViolations);const U=I.querySelector("#pending-viols-val");U&&(U.textContent=x.violations.length-x.resolvedViolations);const O=I.querySelector("#trainings-count-val");O&&(O.textContent=v);const F=I.querySelector("#permits-count-val");F&&(F.textContent=w);const N=I.querySelector("#clinic-visits-count-val");N&&(N.textContent=k);const z=I.querySelector("#injuries-count-val");z&&(z.textContent=$);const H=I.querySelector("#incidents-count-val");H&&(H.textContent=y);const V=I.querySelector("#sick-leave-count-val");V&&(V.textContent=S);const K=I.querySelector("#violations-container-placeholder");if(K){const W=Array.from(new Set(x.violations.map(X=>String(X?.violationType||"").trim()).filter(Boolean))),G=Array.from(new Set(x.violations.map(X=>String(X?.severity||"").trim()).filter(Boolean)));K.innerHTML=_(x.violations,W,G),L(x.violations)}}}catch(g){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}finally{const g=I.querySelector("#live-loader-indicator");g&&(g.style.transition="opacity 0.5s",g.style.opacity="0",setTimeout(()=>g.remove(),500))}})()},injectAntiShakeStyles(){const t="contractors-anti-shake-styles";if(!document.getElementById(t)){const o=document.createElement("style");o.id=t,o.textContent=`
            .contractors-tab-content {
                display: none;
            }
            .contractors-tab-content.active {
                display: block;
            }
        `,document.head.appendChild(o)}const e="contractors-identity-styles";if(!document.getElementById(e)){const o=document.createElement("style");o.id=e,o.textContent=`
                #contractors-section.contractors-identity{--ctr-navy:#0b2d4f;--ctr-blue:#174d78;--ctr-teal:#0f8b83;--ctr-gold:#d99a22;--ctr-ink:#183047;--ctr-muted:#64748b;--ctr-line:#d8e5ec;--ctr-pale:#f4f9fb;color:var(--ctr-ink)}
                #contractors-section.contractors-identity *{box-sizing:border-box}
                .contractors-module-hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:22px 24px;border:1px solid rgba(15,139,131,.28);border-radius:18px;background:linear-gradient(125deg,var(--ctr-navy),var(--ctr-blue) 61%,#126c68);color:#fff;box-shadow:0 12px 32px rgba(11,45,79,.2)}
                .contractors-module-hero:after{content:"";position:absolute;inset-inline-end:-74px;top:-112px;width:230px;height:230px;border:31px solid rgba(255,255,255,.055);border-radius:50%;pointer-events:none}
                .contractors-module-hero__copy{position:relative;z-index:1;display:flex;align-items:center;gap:15px;min-width:min(100%,360px)}
                .contractors-module-hero__icon{flex:0 0 auto;width:54px;height:54px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.24);border-radius:15px;background:rgba(255,255,255,.12);font-size:23px}
                .contractors-module-hero__eyebrow{display:block;margin-bottom:3px;color:#8ce9df;font-size:.68rem;font-weight:800;letter-spacing:.04em}
                .contractors-module-hero h1{margin:0;color:#fff;font-size:1.25rem;font-weight:900;line-height:1.35}
                .contractors-module-hero p{margin:5px 0 0;color:#d9ebf3;font-size:.76rem}
                .contractors-module-hero__meta{position:relative;z-index:1;display:flex;align-items:center;gap:7px;flex-wrap:wrap}
                .contractors-module-hero__meta span{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border:1px solid rgba(255,255,255,.2);border-radius:9px;background:rgba(255,255,255,.1);font-size:.69rem;font-weight:750}
                .contractors-module-hero__meta i{color:#8ce9df}
                #contractors-section .contractors-tabs-wrapper{position:sticky;top:0;z-index:20;padding:7px;border:1px solid var(--ctr-line);border-radius:14px;background:rgba(248,252,253,.94);box-shadow:0 5px 18px rgba(15,46,72,.08);backdrop-filter:blur(12px)}
                #contractors-section .contractors-tabs-container{display:flex;align-items:center;gap:6px;overflow-x:auto;scrollbar-width:thin;padding:1px}
                #contractors-section .contractors-tab-btn{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:42px;padding:9px 13px!important;border:1px solid transparent!important;border-radius:10px!important;background:transparent;color:#546b7d!important;font-size:.75rem;font-weight:780!important;white-space:nowrap;transition:background .18s,color .18s,border-color .18s,box-shadow .18s}
                #contractors-section .contractors-tab-btn:hover{border-color:#c7dce4!important;background:#fff;color:var(--ctr-navy)!important}
                #contractors-section .contractors-tab-btn.active{border-color:var(--ctr-navy)!important;background:linear-gradient(135deg,var(--ctr-navy),var(--ctr-blue));color:#fff!important;box-shadow:0 5px 13px rgba(11,45,79,.2)}
                #contractors-section .contractors-tab-btn.active i{color:#76e0d5}
                #contractors-section #contractors-btn-refresh{margin-inline-start:auto;border-color:#b8d9d6!important;color:var(--ctr-teal)!important;background:#f0fdfa}
                #contractors-section .contractors-tab-content>.content-card{overflow:hidden;border:1px solid var(--ctr-line);border-radius:16px;background:#fff;box-shadow:0 7px 24px rgba(15,46,72,.07)}
                #contractors-section .contractors-tab-content>.content-card>.card-header{padding:15px 18px;border:0;background:linear-gradient(125deg,var(--ctr-navy),var(--ctr-blue));color:#fff}
                #contractors-section .contractors-tab-content>.content-card>.card-header .card-title{margin:0;color:#fff;font-size:.98rem;font-weight:850}
                #contractors-section .contractors-tab-content>.content-card>.card-header .card-title i{color:#76e0d5}
                #contractors-section .contractors-tab-content>.content-card>.card-header .btn-secondary{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;box-shadow:none}
                #contractors-section .contractors-tab-content>.content-card>.card-header .btn-success{border-color:#fff;background:#fff;color:#047857;box-shadow:none}
                #contractors-section .contractors-tab-content>.content-card>.card-header .form-input{min-height:38px;border-color:rgba(255,255,255,.35);background:#fff;color:#263e50}
                #contractors-section .contractors-tab-content>.content-card>.card-body{padding:18px;background:linear-gradient(180deg,#fff,#fbfdfe)}
                #contractors-section .contractors-subsection{padding:15px;border:1px solid #e0eaf0;border-radius:13px;background:#fff}
                #contractors-section .contractors-subsection+.contractors-subsection{margin-top:14px}
                #contractors-section .contractors-subsection__title{display:flex;align-items:center;gap:8px;margin:0 0 12px;color:var(--ctr-navy);font-size:.86rem;font-weight:850}
                #contractors-section .contractors-subsection__title i{color:var(--ctr-teal)}
                #contractors-section .contractors-request-intro{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;padding:17px 18px;border:1px solid #b8ded9;border-radius:14px;background:linear-gradient(135deg,#effaf8,#f7fbfd)}
                #contractors-section .contractors-request-intro h3{margin:0 0 4px;color:var(--ctr-navy);font-size:.92rem;font-weight:850}
                #contractors-section .contractors-request-intro p{margin:0;color:#536b7c;font-size:.74rem}
                #contractors-section .contractors-request-intro .btn-primary{flex:0 0 auto;background:linear-gradient(135deg,var(--ctr-teal),#0d746e);box-shadow:0 5px 14px rgba(15,139,131,.22)}
                #contractors-section .table-wrapper{overflow:auto;border:1px solid var(--ctr-line);border-radius:12px;background:#fff;max-height:68vh}
                #contractors-section .data-table{width:100%;min-width:850px;border-collapse:separate;border-spacing:0}
                #contractors-section .data-table thead{position:sticky;top:0;z-index:3}
                #contractors-section .data-table th{padding:12px 10px;border-inline-start:1px solid rgba(255,255,255,.09);border-bottom:2px solid #1fb8ad;background:linear-gradient(180deg,#173f61,#0e324f);color:#fff;font-size:.7rem;font-weight:800;white-space:nowrap;text-align:right}
                #contractors-section .data-table td{padding:11px 10px;border-bottom:1px solid #e7eef3;color:#344b5f;font-size:.76rem;vertical-align:middle}
                #contractors-section .data-table tbody tr:nth-child(even){background:#f8fbfd}
                #contractors-section .data-table tbody tr:hover{background:#edf8f7}
                #contractors-section .empty-state{padding:42px 18px;text-align:center;color:var(--ctr-muted)}
                #contractors-section .empty-state i{display:grid;place-items:center;width:56px;height:56px;margin:0 auto 10px;border-radius:16px;background:#e8f5f3;color:var(--ctr-teal)!important;font-size:22px!important}
                #contractors-section .approved-filters-bar{border:1px solid #e2e8f0;background:#ffffff;border-radius:12px;padding:10px 14px;margin-bottom:12px}
                #contractors-section .approved-filters-bar__title{color:var(--ctr-navy)}
                #contractors-section .approved-filters-bar__title i{color:var(--ctr-teal)}
                #contractors-section .approved-filters-bar__badge{background:var(--ctr-teal)}
                #contractors-section .approved-filters-bar__search-input:focus,#contractors-section .approved-filters-bar__select:focus{border-color:var(--ctr-teal);box-shadow:0 0 0 3px rgba(15,139,131,.12)}
                #contractors-section .contractors-kpi-grid{display:grid!important;grid-template-columns:repeat(5,minmax(170px,1fr))!important;min-width:0!important;gap:10px!important}
                #contractors-section .contractors-kpi-grid>.content-card{min-height:116px!important;border-width:1px!important;border-radius:13px!important;box-shadow:0 4px 14px rgba(15,46,72,.06)!important;contain:none}
                #contractors-section .contractors-requirements-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
                #contractors-section .requirement-category-group{overflow:hidden;border:1px solid #dce8ee;border-radius:13px;background:#fbfdfe;padding:12px}
                #contractors-section .requirement-item{border-width:1px!important;border-color:#d9e6ec!important;border-radius:11px!important;box-shadow:0 3px 10px rgba(15,46,72,.05)!important}
                #contractors-section .requirement-category-filter{border-width:1px!important;background:#fff}
                #contractors-section .requirement-category-filter.active{background:var(--ctr-navy)!important;border-color:var(--ctr-navy)!important;color:#fff!important}
                #ctr-analytics-toolbar{background:linear-gradient(125deg,#0b2d4f 0%,#174d78 62%,#126c68 100%)!important;box-shadow:0 8px 24px rgba(11,45,79,.19)!important}
                #ctr-filter-panel{border-color:#bcd9df!important;background:linear-gradient(180deg,#f9fcfd,#f1f8fa)!important}
                #ctr-analytics-root .ctr-panel{border-color:#d8e5ec!important;box-shadow:0 5px 18px rgba(15,46,72,.06)!important}
                #contractor-approval-request-modal .approval-premium-content{border:1px solid #b9d1dc}
                #contractor-approval-request-modal .approval-premium-header{background:linear-gradient(125deg,#0b2d4f,#174d78 64%,#126c68)!important}
                #contractor-approval-request-modal .approval-premium-input:focus,#contractor-approval-request-modal .approval-premium-select:focus,#contractor-approval-request-modal .approval-premium-textarea:focus{border-color:#0f8b83!important;box-shadow:0 0 0 3px rgba(15,139,131,.12)!important}
                .ctr-detail-modal{padding:18px;background:rgba(4,22,38,.7);backdrop-filter:blur(5px)}
                .ctr-detail-dialog{width:min(760px,96vw)!important;max-width:760px!important;max-height:min(90vh,900px);overflow:hidden;border:1px solid #bcd3df!important;border-radius:18px!important;background:#f7fafc!important;box-shadow:0 26px 80px rgba(4,25,42,.32)!important}
                .ctr-detail-dialog--wide{width:min(920px,96vw)!important;max-width:920px!important}
                .ctr-detail-head{position:relative;overflow:hidden;display:flex!important;align-items:center!important;justify-content:space-between!important;min-height:104px;padding:19px 22px!important;border:0!important;background:linear-gradient(125deg,#0b2d4f,#174d78 64%,#126c68)!important;color:#fff!important}
                .ctr-detail-head:after{content:"";position:absolute;inset-inline-end:-42px;top:-88px;width:190px;height:190px;border:25px solid rgba(255,255,255,.06);border-radius:50%;pointer-events:none}
                .ctr-detail-head__copy{position:relative;z-index:1;display:flex;align-items:center;gap:14px;min-width:0}
                .ctr-detail-head__icon{flex:0 0 auto;display:grid;place-items:center;width:50px;height:50px;border:1px solid rgba(255,255,255,.26);border-radius:14px;background:rgba(255,255,255,.12);color:#83e5dc;font-size:20px}
                .ctr-detail-head__eyebrow{display:block;margin-bottom:3px;color:#8ce9df;font-size:.69rem;font-weight:800;letter-spacing:.03em}
                .ctr-detail-head .modal-title{margin:0!important;color:#fff!important;font-size:1.12rem!important;font-weight:900!important;line-height:1.4}
                .ctr-detail-head p{max-width:620px;margin:4px 0 0;color:#d5e8f0;font-size:.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
                .ctr-detail-head .modal-close{position:relative;z-index:2;flex:0 0 auto;display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,255,255,.25);border-radius:10px;background:rgba(255,255,255,.1)!important;color:#fff!important}
                .ctr-detail-head .modal-close:hover{background:rgba(255,255,255,.2)!important}
                .ctr-detail-body{overflow-y:auto!important;padding:18px!important;background:linear-gradient(180deg,#f8fbfc,#eef5f7)!important}
                .ctr-detail-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px}
                .ctr-detail-summary>div{min-height:75px;padding:12px 14px;border:1px solid #d8e6ec;border-radius:12px;background:#fff;box-shadow:0 3px 10px rgba(15,46,72,.05)}
                .ctr-detail-summary span:first-child{display:block;margin-bottom:7px;color:#718596;font-size:.68rem;font-weight:750}
                .ctr-detail-summary strong{display:block;color:#153b5b;font-size:.84rem;font-weight:850;overflow-wrap:anywhere}
                .ctr-detail-code{color:#0b70c7!important;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;direction:ltr;text-align:right}
                .ctr-detail-section{margin-top:12px;padding:15px;border:1px solid #d7e5eb;border-radius:13px;background:#fff;box-shadow:0 4px 14px rgba(15,46,72,.045)}
                .ctr-detail-section h3{display:flex;align-items:center;gap:8px;margin:0 0 13px;padding-bottom:10px;border-bottom:1px solid #e5edf1;color:#0b2d4f;font-size:.84rem;font-weight:900}
                .ctr-detail-section h3 i{display:grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#e7f5f3;color:#0f8b83;font-size:.72rem}
                .ctr-detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
                .ctr-detail-field{min-width:0;padding:10px 12px;border:1px solid #e1eaf0;border-radius:10px;background:#f9fbfc}
                .ctr-detail-field label{display:block;margin-bottom:5px;color:#718394;font-size:.68rem;font-weight:780}
                .ctr-detail-field p{margin:0;color:#213b51;font-size:.82rem;font-weight:700;line-height:1.65;overflow-wrap:anywhere}
                .ctr-detail-section--dates{border-inline-start:4px solid #0f8b83}
                .ctr-detail-note{border-inline-start:4px solid #d99a22}
                .ctr-detail-note>p{margin:0;color:#41596c;font-size:.8rem;line-height:1.8;white-space:pre-line}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid{gap:10px!important}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div{min-width:0;padding:11px 12px;border:1px solid #dfe9ee;border-radius:10px;background:#fff}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div label{display:block;margin-bottom:6px!important;color:#6c8191!important;font-size:.68rem!important;font-weight:780!important}
                .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div p{margin:0;color:#213b51!important;font-size:.81rem;font-weight:700;line-height:1.6;overflow-wrap:anywhere}
                .ctr-request-detail-body #request-details-form>.space-y-4>div:not(.grid){border-radius:12px!important;box-shadow:none!important}
                .ctr-request-detail-body table{border:1px solid #d8e5eb;border-radius:9px;overflow:hidden}
                .ctr-request-detail-body table thead{background:linear-gradient(180deg,#173f61,#0e324f)!important}
                .ctr-request-detail-body table th{background:transparent!important;color:#fff!important;font-weight:800!important}
                .ctr-detail-footer{display:flex!important;align-items:center;gap:8px;flex-wrap:wrap;padding:13px 18px!important;border-top:1px solid #d8e5eb!important;background:#fff!important}
                .ctr-detail-footer button{min-height:39px;border-radius:9px!important;font-size:.76rem!important;font-weight:800!important}
                @media(max-width:1180px){#contractors-section .contractors-kpi-grid{grid-template-columns:repeat(3,minmax(170px,1fr))!important}.contractors-module-hero__meta{width:100%}}
                @media(max-width:820px){#contractors-section .contractors-requirements-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}#contractors-section .contractors-tab-content>.content-card>.card-header>div{align-items:flex-start;flex-direction:column}#contractors-section .contractors-tab-content>.content-card>.card-header>div>div{width:100%}.contractors-module-hero{padding:18px}.contractors-module-hero__meta span{flex:1;justify-content:center}#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr 1fr"]{grid-template-columns:repeat(2,minmax(0,1fr))!important}.ctr-detail-summary{grid-template-columns:repeat(2,minmax(0,1fr))}}
                @media(max-width:620px){.contractors-module-hero__copy{align-items:flex-start}.contractors-module-hero__icon{width:46px;height:46px}.contractors-module-hero h1{font-size:1.05rem}.contractors-module-hero__meta{display:grid;grid-template-columns:1fr}.contractors-module-hero__meta span{width:100%}#contractors-section .contractors-kpi-grid,#contractors-section .contractors-requirements-kpis{grid-template-columns:1fr!important}#contractors-section .contractors-tab-content>.content-card>.card-body{padding:12px}#contractors-section .contractors-request-intro .btn-primary{width:100%}#contractor-approval-request-modal .approval-premium-content{max-width:96vw!important}#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr 1fr"],#contractor-approval-request-modal form div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}.ctr-detail-modal{padding:8px}.ctr-detail-dialog{max-height:96vh}.ctr-detail-head{min-height:92px;padding:15px!important}.ctr-detail-head__icon{width:42px;height:42px}.ctr-detail-head p{max-width:66vw}.ctr-detail-body{padding:11px!important}.ctr-detail-summary,.ctr-detail-grid{grid-template-columns:1fr}.ctr-request-detail-body #request-details-form>.space-y-4>.grid{grid-template-columns:1fr!important}.ctr-detail-footer button{flex:1 1 auto}}
                @media(prefers-reduced-motion:reduce){#contractors-section .contractors-tab-btn{transition:none}}
                [data-theme="dark"] #contractors-section.contractors-identity{--ctr-ink:#e6eef5;--ctr-muted:#a7bac9;--ctr-line:#324859}
                [data-theme="dark"] #contractors-section .contractors-tabs-wrapper,[data-theme="dark"] #contractors-section .contractors-tab-content>.content-card,[data-theme="dark"] #contractors-section .contractors-subsection,[data-theme="dark"] #contractors-section .table-wrapper{background:#132638;border-color:#324859}
                [data-theme="dark"] #contractors-section .contractors-tab-content>.content-card>.card-body{background:#14283a}
                [data-theme="dark"] #contractors-section .data-table td{border-color:#31485a;color:#dbe7ef}[data-theme="dark"] #contractors-section .data-table tbody tr:nth-child(even){background:#192f42}[data-theme="dark"] #contractors-section .data-table tbody tr:hover{background:#1b3b42}
                [data-theme="dark"] #contractors-section .contractors-request-intro,[data-theme="dark"] #contractors-section .approved-filters-bar,[data-theme="dark"] #ctr-filter-panel{background:#183443!important;border-color:#35606a!important}
                [data-theme="dark"] #contractors-section .contractors-request-intro h3,[data-theme="dark"] #contractors-section .contractors-subsection__title,[data-theme="dark"] #contractors-section .approved-filters-bar__title{color:#e6eef5}
                [data-theme="dark"] #contractors-section .contractors-request-intro p,[data-theme="dark"] #contractors-section .approved-filters-bar__meta{color:#afc2cf}
                [data-theme="dark"] #contractors-section .contractors-kpi-grid>.content-card{background:#193549!important;border-color:#3b596b!important}
                [data-theme="dark"] #contractors-section .contractors-kpi-grid>.content-card p{color:#e4edf4!important}
                [data-theme="dark"] #contractors-section .contractors-requirements-kpis>div{background:#193549!important;border-color:#3b596b!important}
                [data-theme="dark"] #contractors-section .contractors-requirements-kpis p{color:#e4edf4!important}
                [data-theme="dark"] #contractors-section .requirement-category-group,[data-theme="dark"] #contractors-section .requirement-item{background:#183044!important;border-color:#365064!important}
                [data-theme="dark"] .ctr-detail-dialog,[data-theme="dark"] .ctr-detail-body{background:#102536!important}
                [data-theme="dark"] .ctr-detail-summary>div,[data-theme="dark"] .ctr-detail-section,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div,[data-theme="dark"] .ctr-detail-footer{background:#183044!important;border-color:#365064!important}
                [data-theme="dark"] .ctr-detail-summary span:first-child,[data-theme="dark"] .ctr-detail-field label,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div label{color:#a9bdca!important}
                [data-theme="dark"] .ctr-detail-summary strong,[data-theme="dark"] .ctr-detail-section h3,[data-theme="dark"] .ctr-detail-field p,[data-theme="dark"] .ctr-request-detail-body #request-details-form>.space-y-4>.grid>div p{color:#e7f0f6!important}
                [data-theme="dark"] .ctr-detail-field{background:#142b3d;border-color:#365064}
            `,document.head.appendChild(o)}const a="approved-filters-bar-styles";if(document.getElementById(a))return;const r=document.createElement("style");r.id=a,r.textContent=`
            .approved-filters-bar {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 10px 14px;
                margin-bottom: 12px;
                box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
                overflow-x: auto;
                scrollbar-width: thin;
                scrollbar-color: #cbd5e1 transparent;
            }
            .approved-filters-bar::-webkit-scrollbar {
                height: 4px;
            }
            .approved-filters-bar::-webkit-scrollbar-track {
                background: transparent;
            }
            .approved-filters-bar::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 4px;
            }
            .approved-filters-bar__header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 8px;
            }
            .approved-filters-bar__title {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-size: 0.85rem;
                font-weight: 700;
                color: #334155;
            }
            .approved-filters-bar__title i {
                color: #3b82f6;
                font-size: 12px;
            }
            .approved-filters-bar__badge {
                min-width: 20px;
                height: 18px;
                padding: 0 6px;
                border-radius: 999px;
                background: #3b82f6;
                color: #fff;
                font-size: 0.7rem;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                justify-content: center;
            }
            .approved-filters-bar__meta {
                font-size: 0.78rem;
                font-weight: 600;
                color: #64748b;
            }
            .approved-filters-bar__row {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: nowrap;
                width: 100%;
                min-width: max-content;
            }
            .approved-filters-bar__search-wrap {
                position: relative;
                display: flex;
                align-items: center;
                flex: 2;
                min-width: 180px;
            }
            .approved-filters-bar__search-icon {
                position: absolute;
                right: 10px;
                color: #3b82f6;
                pointer-events: none;
                font-size: 13px;
            }
            .approved-filters-bar__search-input {
                width: 100%;
                height: 36px;
                padding: 0 32px 0 30px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                background: #f8fafc;
                font-size: 13px;
                color: #0f172a;
                transition: all 0.2s ease;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .approved-filters-bar__search-input:focus {
                outline: none;
                background: #ffffff;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            .approved-filters-bar__search-clear {
                position: absolute;
                left: 6px;
                width: 24px;
                height: 24px;
                border: none;
                border-radius: 6px;
                background: #e2e8f0;
                color: #475569;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 11px;
            }
            .approved-filters-bar__search-clear:hover {
                background: #cbd5e1;
            }
            .approved-filters-bar__select {
                height: 36px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                background: #f8fafc;
                padding: 0 10px;
                font-size: 13px;
                color: #0f172a;
                flex: 1;
                min-width: 110px;
                transition: all 0.2s ease;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .approved-filters-bar__select:hover {
                background: #ffffff;
                border-color: #94a3b8;
            }
            .approved-filters-bar__select:focus {
                outline: none;
                background: #ffffff;
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
            }
            .approved-filters-bar__reset {
                height: 36px;
                padding: 0 14px;
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 700;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                white-space: nowrap;
                flex: 0 0 auto;
                transition: all 0.2s ease;
            }
            .approved-filters-bar__reset:hover:not(:disabled) {
                background: #e2e8f0;
                color: #0f172a;
                border-color: #94a3b8;
                transform: translateY(-1px);
            }
            .approved-filters-bar__reset:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        `,document.head.appendChild(r)},async exportContractorViolationsReport(t="",e=""){try{const a=decodeURIComponent(String(t||"")),r=decodeURIComponent(String(e||"")),o=this.buildContractorAnalyticsMatchers({id:a,contractorId:a,name:r,companyName:r},a),i=(AppState.appData.violations||[]).filter(o.violationBelongsToContractor);if(!i.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");return}const s=i.filter(v=>{const h=String(v.severity||"").trim();return h==="\u0639\u0627\u0644\u064A\u0629"||h==="high"||h==="\u062D\u0631\u062C\u0629"}).length,n=i.filter(v=>{const h=String(v.status||"").trim();return h==="\u0645\u062D\u0644\u0648\u0644"||h==="resolved"||h==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,l=Math.max(0,i.length-n),c=i.length>0?Math.round(n/i.length*100):0;Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A...");const p=i.map((v,h)=>`
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${h+1}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${v.violationDate?Utils.formatDate(v.violationDate):"-"}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.violationType||v.title||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.severity||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.status||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(this._ctrGetViolationPlaceLabel(v)||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.description||v.details||v.notes||"-")}</td>
                </tr>
            `).join(""),f=`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${Utils.escapeHTML(r||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}`,u=`
                <div style="margin-bottom: 24px;">
                    <h2 style="font-size: 20px; margin-bottom: 12px; color: #991B1B; font-weight: 700;">\u0645\u0644\u062E\u0635 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644</h2>
                    <div style="margin-bottom: 16px; padding: 12px; background: #FEF2F2; border-right: 4px solid #DC2626; border-radius: 8px;">
                        <strong style="color: #991B1B;">\u0627\u0644\u0645\u0642\u0627\u0648\u0644:</strong> <span style="color: #1F2937;">${Utils.escapeHTML(r||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA;">
                            <div style="font-size: 12px; color: #B91C1C; margin-bottom: 6px; font-weight: 600;">\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</div>
                            <div style="font-size: 26px; font-weight: 700; color: #991B1B;">${i.length}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FFF7ED; border: 1px solid #FED7AA;">
                            <div style="font-size: 12px; color: #C2410C; margin-bottom: 6px; font-weight: 600;">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</div>
                            <div style="font-size: 26px; font-weight: 700; color: #9A3412;">${s}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #ECFDF5; border: 1px solid #BBF7D0;">
                            <div style="font-size: 12px; color: #047857; margin-bottom: 6px; font-weight: 600;">\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u0648\u0644\u0629</div>
                            <div style="font-size: 26px; font-weight: 700; color: #065F46;">${n}</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE;">
                            <div style="font-size: 12px; color: #1D4ED8; margin-bottom: 6px; font-weight: 600;">\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644</div>
                            <div style="font-size: 26px; font-weight: 700; color: #1E3A8A;">${c}%</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;">
                            <div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</div>
                            <div style="font-size: 26px; font-weight: 700; color: #92400E;">${l}</div>
                        </div>
                    </div>
                </div>
                <div style="margin-bottom: 16px;">
                    <h3 style="font-size: 18px; margin-bottom: 12px; color: #991B1B; font-weight: 700; border-bottom: 2px solid #DC2626; padding-bottom: 8px;">\u0633\u062C\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</h3>
                </div>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; direction: rtl;">
                        <thead>
                            <tr style="background: #B91C1C; color: #FFFFFF;">
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">#</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u062A\u0627\u0631\u064A\u062E</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0646\u0648\u0639 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0634\u062F\u0629</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u062D\u0627\u0644\u0629</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0645\u0648\u0642\u0639</th>
                                <th style="padding: 12px 8px; border: 1px solid #991B1B; text-align: center; font-weight: 700; white-space: nowrap;">\u0627\u0644\u0648\u0635\u0641</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${p}
                        </tbody>
                    </table>
                </div>
            `,d=`CON-VIOL-${String(a||r||"NA").substring(0,8)}-${new Date().toISOString().slice(0,10)}`,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(d,f,u,!1,!0,{source:"ContractorViolations",contractorId:a,contractorName:r},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${f}</title></head><body>${u}</body></html>`;if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function")await FormHeader.generatePDF(m,`${f}.pdf`);else{const v=new Blob([m],{type:"text/html;charset=utf-8"}),h=URL.createObjectURL(v),w=document.createElement("a");w.href=h,w.download=`${f.replace(/\s+/g,"_")}.html`,document.body.appendChild(w),w.click(),document.body.removeChild(w),URL.revokeObjectURL(h)}Loading.hide(),Notification.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${r||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch(a){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644:",a),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+(a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}};(function(){"use strict";try{typeof window<"u"&&typeof Contractors<"u"&&(window.Contractors=Contractors,window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS=APPROVED_ENTITY_STATUS_OPTIONS,window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS=APPROVED_ENTITY_TYPE_OPTIONS,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Contractors module loaded and available on window.Contractors"))}catch{if(typeof window<"u"&&typeof Contractors<"u")try{window.Contractors=Contractors,window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS=APPROVED_ENTITY_STATUS_OPTIONS,window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS=APPROVED_ENTITY_TYPE_OPTIONS}catch{}}})();
