const APPROVED_ENTITY_STATUS_OPTIONS={approved:"\u0645\u0639\u062A\u0645\u062F",under_review:"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",rejected:"\u0645\u0631\u0641\u0648\u0636",pending:"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644"},APPROVED_ENTITY_TYPE_OPTIONS={contractor:"\u0645\u0642\u0627\u0648\u0644",supplier:"\u0645\u0648\u0631\u062F"},CONTRACTOR_EVALUATION_DEFAULT_ITEMS=["\u064A\u0644\u062A\u0632\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0642\u0648\u0627\u0646\u064A\u0646 \u0648\u0627\u0644\u062A\u0634\u0631\u064A\u0639\u0627\u062A \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0623\u062E\u0631\u0649","\u064A\u0644\u062A\u0632\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0648\u0627\u0644\u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639","\u062A\u0648\u0641\u0631 \u0627\u0644\u0639\u0645\u0627\u0644\u0629 \u0627\u0644\u0645\u062F\u0631\u0628\u0629 \u0648\u0627\u0644\u0645\u0624\u0647\u0644\u0629","\u062A\u0648\u0641\u0631 \u0645\u0634\u0631\u0641 \u0645\u0624\u0647\u0644 \u0637\u0648\u0627\u0644 \u0641\u062A\u0631\u0629 \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 (\u0644\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062A\u064A \u062A\u062A\u062C\u0627\u0648\u0632 \u0623\u0633\u0628\u0648\u0639 \u0639\u0645\u0644)","\u062A\u0648\u0641\u0631 \u0645\u0647\u0645\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0628\u062D\u0627\u0644\u0629 \u062C\u064A\u062F\u0629","\u062A\u0648\u0641\u0631 \u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0639\u0645\u0644 \u0648\u062A\u062D\u0642\u0642 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u062A\u0648\u0641\u0631 \u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0625\u0637\u0641\u0627\u0621 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 (\u0646\u0648\u0639\u064B\u0627 \u0648\u062D\u062C\u0645\u064B\u0627) \u0637\u0628\u0642\u064B\u0627 \u0644\u0644\u062A\u0639\u0627\u0642\u062F","\u064A\u0644\u062A\u0632\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0633\u062A\u062E\u0631\u0627\u062C \u062A\u0635\u0627\u0631\u064A\u062D \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0644\u0627\u0632\u0645\u0629 \u0648\u0627\u0639\u062A\u0645\u0627\u062F\u0647\u0627 \u0645\u0646 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0622\u0645\u0646 \u0648\u062A\u062E\u0632\u064A\u0646 \u0627\u0644\u0645\u0648\u0627\u062F \u0648\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0641\u064A \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629","\u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0641\u0629 \u0648\u0627\u0644\u062A\u062E\u0644\u0635 \u0627\u0644\u0622\u0645\u0646 \u0645\u0646 \u0627\u0644\u0645\u062E\u0644\u0641\u0627\u062A","\u0627\u0644\u0625\u0628\u0644\u0627\u063A \u0627\u0644\u0641\u0648\u0631\u064A \u0639\u0646 \u0623\u064A \u062D\u0627\u062F\u062B \u0648\u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0644\u0645\u0646\u0639 \u062A\u0643\u0631\u0627\u0631\u0647","\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0637\u0628\u0642\u064B\u0627 \u0644\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0632\u0645\u0646\u064A \u0627\u0644\u0645\u0639\u062A\u0645\u062F","\u0633\u0631\u0639\u0629 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0628\u064A\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0646 \u064A\u0645\u062B\u0644\u0647 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639","\u0633\u0631\u0639\u0629 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0633\u0624\u0648\u0644\u064A \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0628\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0631\u0623\u064A \u0627\u0644\u0639\u0627\u0645 \u0644\u0644\u0645\u0634\u0631\u0641 \u0639\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644 / \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0639\u0646\u064A\u0629 / \u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u0634\u0631\u0648\u0639"],REQUIREMENT_CATEGORIES={legal:{id:"legal",label:"\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629",icon:"fa-file-contract",color:"#3b82f6"},safety:{id:"safety",label:"\u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629",icon:"fa-hard-hat",color:"#ef4444"},training:{id:"training",label:"\u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062A",icon:"fa-graduation-cap",color:"#10b981"},equipment:{id:"equipment",label:"\u0627\u0644\u0645\u0639\u062F\u0627\u062A \u0648\u0627\u0644\u0645\u0648\u0627\u0631\u062F",icon:"fa-tools",color:"#f59e0b"},financial:{id:"financial",label:"\u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0645\u0627\u0644\u064A\u0629",icon:"fa-dollar-sign",color:"#8b5cf6"},quality:{id:"quality",label:"\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0627\u0645\u062A\u062B\u0627\u0644",icon:"fa-award",color:"#06b6d4"},other:{id:"other",label:"\u0623\u062E\u0631\u0649",icon:"fa-folder",color:"#6b7280"}},REQUIREMENT_PRIORITIES={critical:{id:"critical",label:"\u062D\u0631\u062C",color:"#ef4444",order:1},high:{id:"high",label:"\u0639\u0627\u0644\u064A",color:"#f59e0b",order:2},medium:{id:"medium",label:"\u0645\u062A\u0648\u0633\u0637",color:"#3b82f6",order:3},low:{id:"low",label:"\u0645\u0646\u062E\u0641\u0636",color:"#6b7280",order:4}},CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT=[{id:"req_1",label:"\u062A\u0642\u062F\u064A\u0645 \u0645\u0644\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u062E\u0627\u0635 \u0628\u0627\u0644\u0634\u0631\u0643\u0629 (HSE Profile)",type:"document",required:!0,order:1,category:"safety",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u0645\u0644\u0641 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0627\u0644\u0634\u0627\u0645\u0644 \u0644\u0644\u0634\u0631\u0643\u0629",applicableTypes:["contractor","supplier"]},{id:"req_2",label:"\u062A\u0642\u062F\u064A\u0645 \u0634\u0647\u0627\u062F\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0639\u0644\u0649 \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0645\u0648\u0642\u0639",type:"document",required:!0,order:2,category:"training",priority:"high",hasExpiry:!0,expiryMonths:24,description:"\u0634\u0647\u0627\u062F\u0627\u062A \u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0639\u0627\u0645\u0644\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0645\u0648\u0642\u0639",applicableTypes:["contractor"]},{id:"req_3",label:"\u062A\u0642\u062F\u064A\u0645 \u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0622\u062E\u0631 12 \u0634\u0647\u0631 (Incident Log)",type:"document",required:!0,order:3,category:"safety",priority:"critical",hasExpiry:!1,description:"\u0633\u062C\u0644 \u0627\u0644\u062D\u0648\u0627\u062F\u062B \u0648\u0627\u0644\u0625\u0635\u0627\u0628\u0627\u062A \u0644\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u0627\u0636\u064A\u0629",applicableTypes:["contractor","supplier"]},{id:"req_4",label:"\u0648\u062C\u0648\u062F \u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644",type:"document",required:!0,order:4,category:"safety",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0648\u0627\u0644\u0625\u062E\u0644\u0627\u0621 \u0644\u0644\u0645\u0634\u0631\u0648\u0639",applicableTypes:["contractor"]},{id:"req_5",label:"\u062A\u0642\u062F\u064A\u0645 \u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0639\u0645\u0644 \u0623\u0648 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A",type:"document",required:!0,order:5,category:"legal",priority:"critical",hasExpiry:!0,expiryMonths:12,description:"\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629 \u0648\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A",applicableTypes:["contractor","supplier"]},{id:"req_6",label:"\u062A\u0642\u062F\u064A\u0645 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0644\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 (Risk Assessment)",type:"document",required:!0,order:6,category:"safety",priority:"high",hasExpiry:!0,expiryMonths:6,description:"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u062E\u0627\u0637\u0631 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0644\u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644",applicableTypes:["contractor"]},{id:"req_7",label:"\u062A\u0648\u0641\u064A\u0631 \u0645\u0633\u0624\u0648\u0644 \u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062A\u0645\u062F \u0644\u0644\u0645\u0634\u0631\u0648\u0639",type:"text",required:!0,order:7,category:"safety",priority:"high",hasExpiry:!1,description:"\u0627\u0633\u0645 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F",applicableTypes:["contractor"]},{id:"req_8",label:"\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u062A\u0632\u0627\u0645 \u0627\u0644\u062C\u0647\u0629 \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629",type:"checkbox",required:!0,order:8,category:"safety",priority:"high",hasExpiry:!1,description:"\u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0648\u0641\u0631 \u0648\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0648\u0642\u0627\u064A\u0629 \u0627\u0644\u0634\u062E\u0635\u064A\u0629",applicableTypes:["contractor"]},{id:"req_9",label:"\u062A\u0648\u0641\u064A\u0631 \u0634\u0647\u0627\u062F\u0627\u062A \u0645\u0639\u0627\u064A\u0631\u0629 \u0644\u0644\u0645\u0639\u062F\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629 \u0625\u0630\u0627 \u0643\u0627\u0646\u062A \u0645\u0637\u0644\u0648\u0628\u0629",type:"document",required:!1,order:9,category:"equipment",priority:"medium",hasExpiry:!0,expiryMonths:12,description:"\u0634\u0647\u0627\u062F\u0627\u062A \u0645\u0639\u0627\u064A\u0631\u0629 \u0648\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0639\u062F\u0627\u062A",applicableTypes:["contractor"]}],Contractors={currentTab:"approval-request",_abortController:null,_eventListeners:[],applyModuleI18n(t){const a=window.AppI18n&&typeof window.AppI18n.applyI18n=="function"?window.AppI18n:window.I18n&&typeof window.I18n.applyI18n=="function"?window.I18n:null;if(!a)return;const e=t||document.getElementById("contractors-section")||document;a.applyI18n(e),typeof a.applyLiteralTranslations=="function"&&a.applyLiteralTranslations(e)},t(t,a=""){try{const e=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null;if(e){const r=e.t(t,null,a!=null?String(a):"");if(r!=null&&String(r).trim()!==""&&r!==t)return String(r)}}catch{}return a!=null?String(a):""},cleanup(){try{if(this._abortController&&(this._abortController.abort(),this._abortController=null),this._abortController=new AbortController,document.querySelectorAll("[data-listener-attached]").forEach(a=>{a.removeAttribute("data-listener-attached")}),this._broadcastListener&&typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.state?.broadcastChannel)try{RealtimeSyncManager.state.broadcastChannel.removeEventListener("message",this._broadcastListener),this._broadcastListener=null}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 broadcast listener:",a)}this._isLoading=!1,this._isBootstrapping=!1,this._bootstrapScheduled=!1,this._isRefreshingApprovalRequests=!1,this._eventListenersAttached=!1,this._realtimeListenersSetup=!1,this._syncListenerAttached=!1,this._isSwitchingTab=!1,this._refreshApprovalTimeout&&(clearTimeout(this._refreshApprovalTimeout),this._refreshApprovalTimeout=null),this._refreshApprovalRAF&&(cancelAnimationFrame(this._refreshApprovalRAF),this._refreshApprovalRAF=null),this._approvalRefreshRetryTimeout&&(clearTimeout(this._approvalRefreshRetryTimeout),this._approvalRefreshRetryTimeout=null),this._switchTabTimeout&&(clearTimeout(this._switchTabTimeout),this._switchTabTimeout=null),Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u062C\u0645\u064A\u0639 event listeners \u0648\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629 \u0628\u0646\u062C\u0627\u062D")}catch(t){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A cleanup:",t)}},safeGetElementById(t){try{if(!t)return null;const a=document.getElementById(t);return a&&document.contains(a)?a:null}catch(a){return Utils.safeWarn("\u26A0\uFE0F safeGetElementById error for id="+t+":",a),null}},safeSetInnerHTML(t,a){try{return t?document.contains(t)?(t.innerHTML=a,this.applyModuleI18n(t),!0):(Utils.safeWarn("\u26A0\uFE0F safeSetInnerHTML: element is not in DOM. id="+(t.id||"unknown")),!1):(Utils.safeWarn("\u26A0\uFE0F safeSetInnerHTML: element is null or undefined"),!1)}catch(e){return Utils.safeError("\u274C safeSetInnerHTML error:",e),!1}},safeQuerySelector(t,a){try{return!t||!a?null:document.contains(t)?t.querySelector(a):(Utils.safeWarn("\u26A0\uFE0F safeQuerySelector: container is not in DOM"),null)}catch(e){return Utils.safeWarn("\u26A0\uFE0F safeQuerySelector error:",e),null}},currentEvaluationFilter:"",approvedFilters:{search:"",status:"",type:"",validity:"",activeState:""},async loadContractorsTabContent(t,a={}){const e=this.isContractorApprovalAdminUser(),o={"approval-request":"contractors-approval-request-content",approved:"contractors-approved-content",evaluations:"contractors-evaluations-content",requirements:"contractors-requirements-content",analytics:"contractors-analytics-content"}[t];if(!o)return;const i=document.getElementById(o);if(!i)return;const s={approved:"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646","approval-request":"\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F",evaluations:"\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",requirements:"\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A",analytics:"\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A"},n=(c,l)=>{const p=s[c]||c;return typeof Utils<"u"&&Utils.safeError&&Utils.safeError(`\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 ${p}:`,l),`
                <div class="content-card">
                    <div class="card-body">
                        <div class="empty-state">
                            <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                            <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 ${p}</p>
                            <button onclick="Contractors.loadContractorsTabContent('${t}', { forceData: true })" class="btn-secondary mt-3">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button>
                        </div>
                    </div>
                </div>
            `};try{if(t==="approval-request"){a.fetchData!==!1&&await this.ensureApprovalRequestsDataLoaded({force:a.forceData===!0||this.isContractorApprovalAdminUser()}).catch(()=>{}),this.safeSetInnerHTML(i,this.renderApprovalRequestSection()),this._attachSendApprovalRequestBtn();return}if(t==="approved"){this.ensureApprovedTabContentLoaded(!0),this.ensureApprovedTabEventListeners(),a.fetchData!==!1&&this.ensureApprovedContractorsDataLoaded({force:a.forceData===!0,reconcile:a.reconcile===!0}).then(()=>{this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()}).catch(()=>{});return}if(t==="evaluations"){const c=await Promise.resolve(this.renderEvaluationsSection()).catch(l=>n("\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",l));this.safeSetInnerHTML(i,c),this.ensureEvaluationsEventListeners(),a.fetchData!==!1&&(this.ensureEvaluationsDataLoaded(),this.ensureEvaluationApprovalRequestsDataLoaded({force:a.forceData===!0}).then(()=>{this.currentTab==="evaluations"&&this.refreshEvaluationApprovalRequestsSection()}).catch(()=>{}));return}if(t==="requirements"){const c=await Promise.resolve(this.renderRequirementsManagementSection()).catch(l=>n("\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A",l));this.safeSetInnerHTML(i,c);return}if(t==="analytics"&&e){const c=await Promise.resolve(this.renderAnalyticsSection()).catch(p=>n("\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A",p));this.safeSetInnerHTML(i,c);const l=document.getElementById("ctr-analytics-root");l&&(l.dataset.bound=""),this.bindContractorAnalyticsEvents(),a.fetchData!==!1&&this.loadContractorAnalytics()}}catch(c){this.safeSetInnerHTML(i,n(t,c))}},_attachSendApprovalRequestBtn(){const t=document.getElementById("send-approval-request-btn");t&&!t.hasAttribute("data-listener-attached")&&(t.setAttribute("data-listener-attached","true"),t.addEventListener("click",()=>this.showApprovalRequestForm()))},_scheduleContractorsBackgroundPrefetch(t){const a=[];this.shouldLoadContractorApprovalRequests()&&a.push(this.ensureApprovalRequestsDataLoaded({force:this.isContractorApprovalAdminUser()})),typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"&&Permissions.hasAccess("contractors")&&a.push(this.ensureApprovedContractorsDataLoaded({force:!1,reconcile:!1})),a.length&&Promise.allSettled(a).then(()=>{this.currentTab===t&&(t==="approval-request"?this.refreshApprovalRequestsSection():t==="approved"?(this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()):t==="evaluations"?this.ensureEvaluationApprovalRequestsDataLoaded({force:!1}).then(()=>this.refreshEvaluationApprovalRequestsSection()).catch(()=>{}):t==="analytics"&&this.loadContractorAnalytics())}).catch(()=>{})},_loadRemainingContractorsTabsInBackground(t){const a=this.isContractorApprovalAdminUser(),e=["approval-request","approved","evaluations","requirements"];a&&e.push("analytics");const r=e.filter(i=>i!==t&&!this._tabsLoaded?.[i]);if(!r.length)return;(async()=>{for(const i of r)if(!this._tabsLoaded?.[i]){try{await this.loadContractorsTabContent(i,{fetchData:!1,background:!0}),this._tabsLoaded[i]=!0}catch{}await new Promise(s=>setTimeout(s,0))}})().catch(()=>{})},async load(t=!1){if(this._isLoading){Utils.safeLog("\u26A0\uFE0F load() \u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0628\u0627\u0644\u0641\u0639\u0644 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621");return}this._isLoading=!0;try{try{this._abortController?.abort()}catch{}this._abortController=new AbortController,this._eventListenersAttached=!1;const a=document.getElementById("contractors-section");if(!a){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0642\u0633\u0645 contractors-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),this._isLoading=!1;return}a.classList.add("contractors-identity");const e=this.currentTab||"approval-request",r=t?e:"approval-request";this.currentTab=r,this.injectAntiShakeStyles(),this.ensureApprovedSetup(),this.ensureEvaluationSetup(),this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this._tabsLoaded={},AppState||(window.AppState=window.AppState||{}),AppState.appData||(AppState.appData={});const o=this.isContractorApprovalAdminUser(),i=`
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
            `,s=this.currentTab||"approval-request",n=f=>s===f?"contractors-tab-btn active px-6 py-3 font-semibold text-blue-600 border-b-2 border-blue-600":"contractors-tab-btn px-6 py-3 font-semibold text-gray-500 hover:text-blue-600",c=f=>{const d=s===f;return`id="contractors-${f}-content" class="contractors-tab-content${d?" active":""}" style="display: ${d?"block":"none"};"`},l=s==="approval-request"?this.renderApprovalRequestSection():i,p=s==="approved"?this.renderApprovedEntitiesSection():i,u=`
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
                <div ${c("approval-request")}>
                    ${l}
                </div>
                <div ${c("approved")}>
                    ${p}
                </div>
                <div ${c("evaluations")}>
                    ${i}
                </div>
                ${o?`
                <div ${c("analytics")}>
                    ${i}
                </div>
                `:""}
                <div ${c("requirements")}>
                    ${i}
                </div>
            </div>
        `;if(this.safeSetInnerHTML(a,u),this.applyModuleI18n(a),this.setupEventListeners(),this.setupRealtimeListeners(),this._attachSendApprovalRequestBtn(),this._isLoading=!1,await this.loadContractorsTabContent(s,{fetchData:!0,forceData:s==="approval-request"||this.isContractorApprovalAdminUser(),reconcile:s==="approved"}),this._tabsLoaded[s]=!0,this._scheduleContractorsBackgroundPrefetch(s),this._loadRemainingContractorsTabsInBackground(s),s==="evaluations")try{this.ensureEvaluationsEventListeners()}catch{}}catch(a){this._isLoading=!1;const e=document.getElementById("contractors-section");if(typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u062E\u0637\u0623 \u0641\u0627\u062F\u062D \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u0648\u062F\u064A\u0648\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",a),e){const r=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-circle text-4xl text-red-400 mb-3"></i>
                                <h3 class="text-lg font-semibold text-gray-800 mb-2">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u062F\u064A\u0648\u0644</h3>
                                <p class="text-gray-500 mb-4">${a.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}</p>
                                <button onclick="Contractors.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `;this.safeSetInnerHTML(e,r),this.applyModuleI18n(e)}}},refreshModule(){const t=document.getElementById("contractors-btn-refresh");if(t){t.disabled=!0;const e=t.querySelector("i.fa-sync-alt");e&&e.classList.add("fa-spin")}const a=()=>{const e=document.getElementById("contractors-btn-refresh");if(e){e.disabled=!1;const r=e.querySelector("i.fa-sync-alt");r&&r.classList.remove("fa-spin")}};this.ensureApprovalRequestsDataLoaded({force:!0}).catch(()=>{}).finally(()=>{this.load(!0).finally(a)})},normalizeApprovalRequestStatus(t){const a=String(t||"").trim();if(!a)return"pending";const e=a.toLowerCase().replace(/\s+/g,"_").replace(/-/g,"_"),r={\u062A\u0645_\u0627\u0644\u0625\u0631\u0633\u0627\u0644:"pending",\u0642\u064A\u062F_\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:"under_review",\u062A\u062D\u062A_\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:"under_review",\u0641\u064A_\u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631:"pending",\u0628\u0627\u0646\u062A\u0638\u0627\u0631_\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:"pending",\u0628\u0627\u0646\u062A\u0638\u0627\u0631_\u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629:"pending",\u0642\u064A\u062F_\u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:"pending",\u062C\u062F\u064A\u062F:"pending",new:"pending",awaiting:"pending",awaiting_approval:"pending",open:"pending",\u0645\u0639\u062A\u0645\u062F:"approved",approved:"approved",\u0645\u0631\u0641\u0648\u0636:"rejected",rejected:"rejected",submitted:"pending",in_progress:"under_review",under_review:"under_review",pending:"pending"};return r[e]?r[e]:e==="approved"||e==="rejected"?e:"pending"},extractApprovalRequestRowsFromResponse(t){return!t||t.success===!1?null:Array.isArray(t.data)?t.data:Array.isArray(t)?t:t.data&&Array.isArray(t.data.data)?t.data.data:null},shouldLoadContractorApprovalRequests(){return this.isContractorApprovalAdminUser()?!0:typeof Permissions<"u"&&typeof Permissions.hasAccess=="function"?Permissions.hasAccess("contractors"):!1},_approvalRequestApiPayload(){const t=AppState?.googleConfig?.sheets?.spreadsheetId,a={forceRefresh:!0,skipCache:!0};return t&&String(t).trim()&&t!=="YOUR_SPREADSHEET_ID_HERE"&&(a.spreadsheetId=String(t).trim()),a},_clearApprovalRequestReadCaches(){if(typeof GoogleIntegration>"u")return;[["getAllContractorApprovalRequests",{forceRefresh:!0,skipCache:!0}],["getAllContractorDeletionRequests",{forceRefresh:!0,skipCache:!0}],["readFromSheet",{sheetName:"ContractorApprovalRequests",skipCache:!0}],["readFromSheet",{sheetName:"ContractorDeletionRequests",skipCache:!0}]].forEach(([a,e])=>{try{typeof GoogleIntegration._invalidateSmartCacheForRead_=="function"&&GoogleIntegration._invalidateSmartCacheForRead_(a,e),typeof GoogleIntegration._buildLocalDataStorageKey=="function"&&localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey(a,e));const r=`${a}_${JSON.stringify(e)}`;GoogleIntegration._cache?.data?.delete(r),GoogleIntegration._cache?.timestamps?.delete(r)}catch{}})},async _fetchApprovalRequestRowsFromBackend(){if(typeof GoogleIntegration>"u")return null;const t=this._approvalRequestApiPayload();try{const e=await GoogleIntegration.sendRequest({action:"getAllContractorApprovalRequests",data:t}),r=this.extractApprovalRequestRowsFromResponse(e);if(Array.isArray(r)&&r.length>0)return r}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F getAllContractorApprovalRequests \u0641\u0634\u0644:",e?.message||e)}if(typeof GoogleIntegration.readFromSheets=="function")try{const e=await GoogleIntegration.readFromSheets("ContractorApprovalRequests",45e3);if(Array.isArray(e)&&e.length>0)return e}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F readFromSheets(ContractorApprovalRequests) \u0641\u0634\u0644:",e?.message||e)}const a=AppState?.appData?.contractorApprovalRequests;return Array.isArray(a)&&a.length>0?a.slice():null},async _fetchDeletionRequestRowsFromBackend(){if(typeof GoogleIntegration>"u")return null;const t=this._approvalRequestApiPayload();try{const e=await GoogleIntegration.sendRequest({action:"getAllContractorDeletionRequests",data:t}),r=this.extractApprovalRequestRowsFromResponse(e);if(Array.isArray(r)&&r.length>0)return r}catch{}if(typeof GoogleIntegration.readFromSheets=="function")try{const e=await GoogleIntegration.readFromSheets("ContractorDeletionRequests",45e3);if(Array.isArray(e)&&e.length>0)return e}catch{}const a=AppState?.appData?.contractorDeletionRequests;return Array.isArray(a)&&a.length>0?a.slice():null},ingestApprovalRequestsFromSync(t,a={}){if(!Array.isArray(t)||t.length===0)return!1;this.ensureApprovalRequestsSetup();const e=Array.isArray(AppState.appData.contractorApprovalRequests)?AppState.appData.contractorApprovalRequests.slice():[],r=t.map(o=>this.normalizeApprovalRequestRecord(o));return AppState.appData.contractorApprovalRequests=this.mergeApprovalRequestsWithLocalOnly(r,e),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),a.refreshUi!==!1&&(this.currentTab==="approval-request"&&this.mountApprovalRequestSection(),typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge()),!0},prefetchApprovalRequestsForNotifications(){const t=[];return typeof this.syncPendingEvaluationApprovalRequests=="function"&&t.push(this.syncPendingEvaluationApprovalRequests()),typeof this.fetchEvaluationApprovalRequestsFromBackend=="function"&&t.push(this.fetchEvaluationApprovalRequestsFromBackend()),this.shouldLoadContractorApprovalRequests()&&t.push(this.ensureApprovalRequestsDataLoaded({force:!0}).catch(()=>!1)),t.length?Promise.allSettled(t).then(()=>(typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge(),!0)):Promise.resolve(!1)},normalizeCompanyNameForApprovalMatch(t){return String(t||"").replace(/\s+/g," ").trim().toLowerCase()},validateNewApprovalRequest(t){if(!t)return{ok:!1,message:"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629"};const a=String(t.companyName||"").trim(),e=String(t.licenseNumber||"").trim(),r=String(t.requestType||"").trim();if(!a||!t.serviceType||!r)return{ok:!1,message:"\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629"};if(!e)return{ok:!1,message:"\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635 \u0645\u0637\u0644\u0648\u0628"};const o=this.normalizeCompanyNameForApprovalMatch(a),i=r==="supplier"?"supplier":"contractor",n=(AppState.appData.approvedContractors||[]).find(f=>{if(!f)return!1;const d=String(f.licenseNumber||"").trim(),m=this.normalizeCompanyNameForApprovalMatch(f.companyName);if(e&&d&&d===e)return!0;if(o&&m===o){const v=this.normalizeApprovedEntityType(f.entityType||f.type);return!i||v===i}return!1});if(n)return{ok:!1,message:`\u0627\u0644\u062C\u0647\u0629 \u0645\u0633\u062C\u0644\u0629 \u0628\u0627\u0644\u0641\u0639\u0644 \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 (${n.companyName||a}).`};const l=(AppState.appData.contractors||[]).find(f=>{if(!f)return!1;const d=this.normalizeCompanyNameForApprovalMatch(f.name||f.companyName||f.company),m=String(f.licenseNumber||f.contractNumber||"").trim();return e&&m&&m===e?!0:o&&d&&d===o});if(l)return{ok:!1,message:`\u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 (${l.name||l.companyName||a}).`};const u=(AppState.appData.contractorApprovalRequests||[]).map(f=>this.normalizeApprovalRequestRecord(f)).filter(f=>f&&this.isApprovalRequestPendingForReview(f)).find(f=>{const d=String(f.requestType||"contractor").trim();if(d!=="contractor"&&d!=="supplier"||r&&d!==r)return!1;const m=this.normalizeCompanyNameForApprovalMatch(f.companyName),v=String(f.licenseNumber||"").trim();return o&&m&&m===o?!0:!!(e&&v&&v===e)});return u?{ok:!1,message:`\u064A\u0648\u062C\u062F \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u0631\u0643\u0629 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 (${u.id||""}).`}:{ok:!0}},_closeApprovalRequestModal(t){try{t&&t.parentNode&&t.remove()}catch(a){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C:",a),t&&t.parentNode&&t.parentNode.removeChild(t)}},_scheduleApprovalNotificationsRefresh(){typeof AppUI<"u"&&typeof AppUI.scheduleContractorApprovalNotificationsRefresh=="function"?AppUI.scheduleContractorApprovalNotificationsRefresh():typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge()},_removeLocalApprovalRequestById(t){!t||!Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=AppState.appData.contractorApprovalRequests.filter(a=>a&&a.id!==t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},async diagnoseApprovalRequests(){const t=AppState?.googleConfig?.sheets?.spreadsheetId||"";let a=null,e=null;if(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.readFromSheets=="function")try{const n=await GoogleIntegration.readFromSheets("ContractorApprovalRequests",45e3);a=Array.isArray(n)?n.length:null}catch(n){a="error: "+(n?.message||n)}try{const n=this._approvalRequestApiPayload(),c=await GoogleIntegration.sendRequest({action:"getAllContractorApprovalRequests",data:n}),l=this.extractApprovalRequestRowsFromResponse(c);e=Array.isArray(l)?l.length:null}catch(n){e="error: "+(n?.message||n)}const r=await this.fetchContractorApprovalRequestsFromBackend(),o=AppState.appData.contractorApprovalRequests||[],i=this.getPendingApprovalRequests();return{loaded:r,spreadsheetId:t,readFromSheetCount:a,apiCount:e,total:o.length,pendingForAdmin:i.length,isAdmin:this.isContractorApprovalAdminUser(),currentUserId:AppState.currentUser?.id||"",sampleIds:o.slice(0,5).map(n=>n&&n.id).filter(Boolean),pendingIds:i.slice(0,10).map(n=>n&&n.id).filter(Boolean)}},normalizeApprovalRequestRecord(t){if(!t||typeof t!="object")return t;const a={...t};if(!a.status||!String(a.status).trim())if(a.Status)a.status=String(a.Status).trim();else{const e=Object.keys(a).find(r=>{const o=String(r||"").trim().toLowerCase();return o==="status"||o==="\u0627\u0644\u062D\u0627\u0644\u0629"||o==="state"});e&&a[e]!=null&&String(a[e]).trim()&&(a.status=String(a[e]).trim())}return(!a.createdBy||!String(a.createdBy).trim())&&a.CreatedBy&&(a.createdBy=String(a.CreatedBy).trim()),(!a.createdAt||!String(a.createdAt).trim())&&a.CreatedAt&&(a.createdAt=a.CreatedAt),(!a.id||!String(a.id).trim())&&a.ID&&(a.id=String(a.ID).trim()),(!a.companyName||!String(a.companyName).trim())&&a.CompanyName&&(a.companyName=String(a.CompanyName).trim()),a.status=this.normalizeApprovalRequestStatus(a.status),a},mergeApprovalRequestsWithLocalOnly(t,a){const e=Array.isArray(t)?t:[],r=Array.isArray(a)?a:[],o=new Set(e.map(s=>s&&s.id).filter(Boolean)),i=r.filter(s=>{if(!s)return!1;const n=String(s.id||"");return n.startsWith("TEMP_")||s._isPendingSync?!o.has(n):!1});return[...e,...i]},async fetchContractorApprovalRequestsFromBackend(){try{this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup();const t=Array.isArray(AppState.appData.contractorApprovalRequests)?AppState.appData.contractorApprovalRequests.slice():[],a=Array.isArray(AppState.appData.contractorDeletionRequests)?AppState.appData.contractorDeletionRequests.slice():[],[e,r]=await Promise.all([this._fetchApprovalRequestRowsFromBackend(),this._fetchDeletionRequestRowsFromBackend()]);let o=!1;if(Array.isArray(e)&&e.length>0){const i=e.map(s=>this.normalizeApprovalRequestRecord(s));AppState.appData.contractorApprovalRequests=this.mergeApprovalRequestsWithLocalOnly(i,t),o=!0}else t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0627\u0644\u062E\u0627\u062F\u0645 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0637\u0644\u0628 \u0645\u062D\u0644\u064A");if(Array.isArray(r)&&r.length>0){const i=r.map(s=>this.normalizeApprovalRequestRecord(s));AppState.appData.contractorDeletionRequests=this.mergeApprovalRequestsWithLocalOnly(i,a),o=!0}return o&&typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.currentTab==="approval-request"&&this.mountApprovalRequestSection(),typeof AppUI<"u"&&typeof AppUI.updateNotificationsBadge=="function"&&AppUI.updateNotificationsBadge(),o}catch(t){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t),!1}},extractApprovedContractorRowsFromResponse(t){return!t||t.success===!1?null:Array.isArray(t.data)?t.data:Array.isArray(t)?t:t.data&&Array.isArray(t.data.data)?t.data.data:null},mergeApprovedContractorsWithLocalOnly(t,a){const e=Array.isArray(t)?t:[],r=Array.isArray(a)?a:[],o=new Set(e.map(n=>n&&n.id).filter(Boolean)),i=new Set(e.map(n=>{const c=n&&(n.code||n.isoCode);return c?String(c).trim():""}).filter(Boolean)),s=r.filter(n=>{if(!n)return!1;const c=String(n.id||"").trim();if(c.startsWith("TEMP_")||n._isPendingSync)return!o.has(c);if(c&&!o.has(c)){const l=String(n.code||n.isoCode||"").trim();return!(l&&i.has(l))}return!1});return[...e,...s]},async _fetchApprovedContractorsFromBackend(){if(typeof GoogleIntegration>"u")return null;if(typeof GoogleIntegration.readFromSheets=="function")try{const e=await GoogleIntegration.readFromSheets("ApprovedContractors",45e3);if(Array.isArray(e)&&e.length>0)return e}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F readFromSheets(ApprovedContractors) \u0641\u0634\u0644:",e?.message||e)}const t=this._approvalRequestApiPayload();try{const e=await GoogleIntegration.sendRequest({action:"getAllApprovedContractors",data:t}),r=this.extractApprovedContractorRowsFromResponse(e);if(Array.isArray(r)&&r.length>0)return r}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F getAllApprovedContractors \u0641\u0634\u0644:",e?.message||e)}const a=AppState?.appData?.approvedContractors;return Array.isArray(a)&&a.length>0?a.slice():null},ingestApprovedContractorsFromSync(t,a={}){if(!Array.isArray(t)||t.length===0)return!1;this.ensureApprovedSetup();const e=Array.isArray(AppState.appData.approvedContractors)?AppState.appData.approvedContractors.slice():[];return AppState.appData.approvedContractors=this.mergeApprovedContractorsWithLocalOnly(t,e),this.ensureApprovedSetup(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),a.refreshUi!==!1&&this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),!0},async fetchApprovedContractorsFromBackend(){try{this.ensureApprovedSetup();const t=Array.isArray(AppState.appData.approvedContractors)?AppState.appData.approvedContractors.slice():[],a=await this._fetchApprovedContractorsFromBackend();return Array.isArray(a)&&a.length>0?(AppState.appData.approvedContractors=this.mergeApprovedContractorsWithLocalOnly(a,t),this.ensureApprovedSetup(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),!0):(t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0633\u062C\u0644 \u0645\u062D\u0644\u064A"),!1)}catch(t){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",t),!1}},ensureApprovedContractorsDataLoaded(t={}){const a=t.force===!0,e=3e4,r=Date.now();if(!a&&this._approvedContractorsLastLoadAt&&r-this._approvedContractorsLastLoadAt<e)return Promise.resolve();if(this._approvedContractorsSyncInFlight)return this._approvedContractorsSyncInFlight;if(!(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()))return Promise.resolve();if(a&&typeof GoogleIntegration._buildLocalDataStorageKey=="function")try{localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey("getAllApprovedContractors",{})),localStorage.removeItem(GoogleIntegration._buildLocalDataStorageKey("readFromSheet",{sheetName:"ApprovedContractors"}))}catch{}const i=async()=>(this.isContractorApprovalAdminUser()&&t.reconcile===!0&&await this.reconcileMissingApprovedContractors(t),this.fetchApprovedContractorsFromBackend());return this._approvedContractorsSyncInFlight=i().then(s=>(s&&(this._approvedContractorsLastLoadAt=Date.now()),s)).catch(()=>!1).finally(()=>{this._approvedContractorsSyncInFlight=null}),this._approvedContractorsSyncInFlight},async reconcileMissingApprovedContractors(t={}){if(!this.isContractorApprovalAdminUser()||typeof GoogleIntegration>"u")return!1;try{const a={...this._approvalRequestApiPayload()};t.requestId&&(a.requestId=t.requestId);const e=await GoogleIntegration.sendRequest({action:"reconcileMissingApprovedContractors",data:a});return e&&e.success&&e.createdCount>0&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 reconcileMissingApprovedContractors: \u0623\u064F\u0646\u0634\u0626 "+e.createdCount+" \u0633\u062C\u0644 \u0645\u0639\u062A\u0645\u062F"),e&&e.errors&&e.errors.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F reconcileMissingApprovedContractors \u0623\u062E\u0637\u0627\u0621:",e.errors),!!(e&&e.success)}catch(a){return typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F reconcileMissingApprovedContractors \u0641\u0634\u0644:",a?.message||a),!1}},isCurrentUserApprovalRequestOwner(t){if(!t)return!1;const a=AppState.currentUser||{},e=String(a.id||"").trim(),r=String(a.email||"").trim().toLowerCase(),o=String(t.createdBy||"").trim();if(!o)return!1;const i=o.toLowerCase();return e&&o===e||r&&i===r||e&&i===e.toLowerCase()},isContractorApprovalAdminUser(){if(typeof Permissions<"u"&&(typeof Permissions.isCurrentUserEffectiveAdmin=="function"&&Permissions.isCurrentUserEffectiveAdmin()||typeof Permissions.isCurrentUserAdmin=="function"&&Permissions.isCurrentUserAdmin()||typeof Permissions.isAdmin=="function"&&Permissions.isAdmin()||typeof Permissions.isAdminRole=="function"&&Permissions.isAdminRole(AppState.currentUser?.role)))return!0;const t=String(AppState.currentUser?.role||"").trim().toLowerCase();return t==="admin"||t==="administrator"||t==="\u0645\u062F\u064A\u0631"||t==="\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645"},isApprovalRequestPendingForReview(t){if(!t)return!1;const a=this.normalizeApprovalRequestStatus(t.status);return a!=="approved"&&a!=="rejected"},ensureApprovalRequestsDataLoaded(t={}){const a=t.force===!0,e=3e4,r=Date.now();return!a&&this._approvalRequestsLastLoadAt&&r-this._approvalRequestsLastLoadAt<e?Promise.resolve():this._approvalRequestsSyncInFlight?this._approvalRequestsSyncInFlight:typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?(a&&typeof GoogleIntegration._buildLocalDataStorageKey=="function"&&this._clearApprovalRequestReadCaches(),this._approvalRequestsSyncInFlight=this.fetchContractorApprovalRequestsFromBackend().then(i=>(i&&(this._approvalRequestsLastLoadAt=Date.now()),i)).catch(i=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",i),!1)).finally(()=>{this._approvalRequestsSyncInFlight=null}),this._approvalRequestsSyncInFlight):a?this._waitForBackendThenLoadApprovalRequests(t):Promise.resolve()},async _waitForBackendThenLoadApprovalRequests(t,a=0){return a>=24?!1:typeof GoogleIntegration<"u"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?this._approvalRequestsSyncInFlight?this._approvalRequestsSyncInFlight:(this._approvalRequestsSyncInFlight=this.fetchContractorApprovalRequestsFromBackend().finally(()=>{this._approvalRequestsSyncInFlight=null}),this._approvalRequestsSyncInFlight):(await new Promise(o=>setTimeout(o,250)),this._waitForBackendThenLoadApprovalRequests(t,a+1))},async bootstrapApprovalRequestsData(){return this.ensureApprovalRequestsDataLoaded({force:!0})},switchTab(t){if(!t||this.currentTab===t)return;this.currentTab=t,document.querySelectorAll(".contractors-tab-btn").forEach(i=>{i.classList.remove("active","text-blue-600","border-b-2","border-blue-600"),i.classList.add("text-gray-500")});const e=document.getElementById(`contractors-tab-${t}`);e&&(e.classList.add("active","text-blue-600","border-b-2","border-blue-600"),e.classList.remove("text-gray-500")),document.querySelectorAll(".contractors-tab-content").forEach(i=>{i.classList.remove("active"),i.style.display="none"});const o=document.getElementById(`contractors-${t}-content`);o&&(o.classList.add("active"),o.style.display="block"),t==="approved"&&(this._tabsLoaded?.approved?this.ensureApprovedContractorsDataLoaded({force:!0,reconcile:!0}).then(()=>{this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList()}).catch(()=>{this.ensureApprovedTabContentLoaded(!0)}):(this.loadContractorsTabContent("approved",{fetchData:!0,forceData:!0,reconcile:!0}),this._tabsLoaded.approved=!0)),t==="approval-request"&&(this._tabsLoaded?.["approval-request"]?this.ensureApprovalRequestsDataLoaded({force:!0}).then(()=>this.refreshApprovalRequestsSection()).catch(()=>{}):(this.loadContractorsTabContent("approval-request",{fetchData:!0,forceData:!0}),this._tabsLoaded["approval-request"]=!0)),t==="evaluations"&&(this._tabsLoaded?.evaluations?(this.ensureEvaluationsEventListeners(),this.ensureEvaluationsDataLoaded(),this.ensureEvaluationApprovalRequestsDataLoaded({force:!1}).then(()=>{this.currentTab==="evaluations"&&this.refreshEvaluationApprovalRequestsSection()}).catch(()=>{})):(this.loadContractorsTabContent("evaluations",{fetchData:!0,forceData:!0}),this._tabsLoaded.evaluations=!0)),t==="requirements"&&!this._tabsLoaded?.requirements&&(this.loadContractorsTabContent("requirements",{fetchData:!1}),this._tabsLoaded.requirements=!0),t==="analytics"&&(this.bindContractorAnalyticsEvents(),this._tabsLoaded?.analytics?this.loadContractorAnalytics():(this.loadContractorsTabContent("analytics",{fetchData:!0,forceData:!0}),this._tabsLoaded.analytics=!0))},ensureEvaluationsDataLoaded(){const t=AppState.appData.contractorEvaluations;Array.isArray(t)&&t.length>0||!(typeof GoogleIntegration<"u"&&typeof GoogleIntegration.syncData=="function"&&AppState.googleConfig?.appsScript?.enabled&&AppState.googleConfig?.appsScript?.scriptUrl)||GoogleIntegration.syncData({sheets:["ContractorEvaluations"],silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0}).then(()=>{const r=AppState.appData.contractorEvaluations||[];Array.isArray(r)&&r.length>0&&this.refreshEvaluationsList(this.currentEvaluationFilter||"")}).catch(()=>{})},loadApprovalRequestTab(t,a=!1){try{if(!t||a&&t.innerHTML.trim()!=="")return;this.ensureData();const e=this.renderApprovalRequestSection();this.safeSetInnerHTML(t,e);const r=document.getElementById("send-approval-request-btn");r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),r.addEventListener("click",()=>this.showApprovalRequestForm()))}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0628\u0648\u064A\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",e),t&&document.contains(t)&&this.safeSetInnerHTML(t,`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-4xl text-yellow-400 mb-3"></i>
                                <p class="text-gray-500">\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Contractors.switchTab('approval-request')" class="btn-secondary mt-3">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button>
                            </div>
                        </div>
                    </div>
                `)}},getContractorsStats(){const t=AppState.appData.contractors||[],a={};t.forEach(s=>{const n=s.serviceType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";a[n]=(a[n]||0)+1});let e=0,r=0,o=0;t.forEach(s=>{const n=this.getContractorRequirementsStatus(s.id);n.allMet?e++:n.completed>0?r++:o++});const i={\u0646\u0634\u0637:0,\u0645\u0646\u062A\u0647\u064A:0,\u0645\u0639\u0644\u0642:0,\u0623\u062E\u0631\u0649:0};return t.forEach(s=>{const n=s.status||"\u0623\u062E\u0631\u0649";i.hasOwnProperty(n)?i[n]++:i.\u0623\u062E\u0631\u0649++}),{total:t.length,serviceTypes:a,requirements:{met:e,partial:r,notMet:o},status:i}},renderContractorsStats(){const t=this.getContractorsStats(),a=Object.entries(t.serviceTypes).sort((e,r)=>r[1]-e[1]).slice(0,3);return`
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
                                ${a.length>0?a[0][0]:"\u0644\u0627 \u064A\u0648\u062C\u062F"}
                            </p>
                            <p class="text-xs text-gray-500">${a.length>0?a[0][1]:0} \u0645\u0642\u0627\u0648\u0644</p>
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
        `},generateContractorCode(){const t=AppState.appData.contractors||[];let a=0;t.forEach(r=>{if(r.code){const o=r.code.match(/CON-(\d+)/);if(o){const i=parseInt(o[1],10);i>a&&(a=i)}}});const e=a+1;return`CON-${String(e).padStart(3,"0")}`},extractContractorCodeNumber(t){if(!t)return 0;const a=String(t).match(/CON-(\d+)/);return a?parseInt(a[1],10):0},sortByContractorCode(t,a){const e=t.code||t.contractorCode||"",r=a.code||a.contractorCode||"",o=Contractors.extractContractorCodeNumber(e),i=Contractors.extractContractorCodeNumber(r);if(o>0&&i>0)return o-i;if(o>0)return-1;if(i>0)return 1;const s=t.companyName||t.name||"",n=a.companyName||a.name||"";return s.localeCompare(n,"ar",{sensitivity:"base"})},normalizeApprovedStatus(t){const a=(t||"").toString().trim().toLowerCase();return a?["approved","\u0645\u0639\u062A\u0645\u062F","accept","accepted","active","valid","pass"].includes(a)?"approved":["rejected","\u0645\u0631\u0641\u0648\u0636","\u0631\u0641\u0636","cancelled","canceled","denied","invalid","expired"].includes(a)?"rejected":"under_review":"under_review"},normalizeApprovedEntityType(t){const a=(t||"").toString().trim().toLowerCase();return["supplier","\u0645\u0648\u0631\u062F","\u0645\u0648\u0631\u0651\u062F","vendor"].includes(a)?"supplier":"contractor"},getApprovedStatusLabel(t){return APPROVED_ENTITY_STATUS_OPTIONS[t]||"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629"},getApprovedTypeLabel(t){return APPROVED_ENTITY_TYPE_OPTIONS[t]||APPROVED_ENTITY_TYPE_OPTIONS.contractor},normalizeApprovedSearchText(t){let a=String(t||"").trim().toLowerCase();return a=a.replace(/[٠١٢٣٤٥٦٧٨٩]/g,e=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e))),a=a.replace(/[۰۱۲۳۴۵۶۷۸۹]/g,e=>String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(e))),a.replace(/\s+/g," ").trim()},extractSearchDigitsOnly(t){return String(t||"").replace(/[٠١٢٣٤٥٦٧٨٩]/g,a=>String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(a))).replace(/[۰۱۲۳۴۵۶۷۸۹]/g,a=>String("\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9".indexOf(a))).replace(/\D/g,"")},buildApprovedEntitySearchBlob(t){if(!t)return"";let a=t.code||t.isoCode||t.contractorCode||t["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||t.\u0643\u0648\u062F||t.codeNumber||"";if(!a&&t.contractorId){const i=(AppState.appData.contractors||[]).find(s=>s.id===t.contractorId);i&&(a=i.code||i.isoCode||i.contractorCode||"")}const e=this.normalizeApprovedStatus(t.status),r=this.normalizeApprovedEntityType(t.entityType||t.type),o=[t.companyName,t.name,t.serviceType,t.licenseNumber,t.safetyReviewer,t.notes,t.contractNumber,a,t.isoCode,t.code,t.phone,t.mobile,t.email,t.contactPerson,t.contactName,this.getApprovedStatusLabel(e),this.getApprovedTypeLabel(r),e,r,t.approvalDate?Utils.formatDate(t.approvalDate):"",t.expiryDate?Utils.formatDate(t.expiryDate):"",t.id,t.contractorId];return this.normalizeApprovedSearchText(o.filter(i=>i!=null&&String(i).trim()!=="").join(" "))},matchesApprovedEntitySearch(t,a){const e=this.normalizeApprovedSearchText(a);if(!e)return!0;const r=this.buildApprovedEntitySearchBlob(t),o=e.split(" ").filter(Boolean);if(o.length>0&&o.every(s=>r.includes(s)))return!0;const i=this.extractSearchDigitsOnly(e);if(i.length>=1){const s=[t.licenseNumber,t.contractNumber,t.code,t.isoCode,t.contractorCode,t.phone,t.mobile,t.companyName,t.id,t.contractorId];if(t.contractorId){const c=(AppState.appData.contractors||[]).find(l=>l.id===t.contractorId);c&&s.push(c.code,c.licenseNumber,c.contractNumber,c.phone)}if(s.map(c=>this.extractSearchDigitsOnly(c)).filter(Boolean).join("").includes(i))return!0}return!1},getApprovedStatusBadgeClass(t){return t==="approved"?"badge-success":t==="under_review"?"badge-warning":"badge-danger"},isApprovalExpired(t){if(!t?.expiryDate)return!1;const a=new Date(t.expiryDate);if(Number.isNaN(a.getTime()))return!1;const e=new Date;return a.setHours(0,0,0,0),e.setHours(0,0,0,0),a<e},isApprovalActive(t,a=!1){if(!t||!this.isEntityEnabled(t))return!1;const e=(t.status||"").toString().toLowerCase().trim(),r=["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""];return t.status&&!r.includes(e)?!1:a?!0:!this.isApprovalExpired(t)},isEntityEnabled(t){if(!t||typeof t!="object")return!0;const a=t.isActive;return!(a==="inactive"||a===!1||a==="false"||a==="FALSE"||a===0||a==="0")},debugContractorVisibility(t){const e=(AppState.appData.approvedContractors||[]).find(d=>d.code&&d.code===t||d.isoCode&&d.isoCode===t||d.companyName&&d.companyName.includes(t));if(!e)return{found:!1,message:"\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646"};const r=(e.status||"").toString().toLowerCase().trim(),i=["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""].includes(r),s=this.isApprovalExpired(e),n=this.isApprovalActive(e,!1);let c=!0;e.contractorId&&(c=this.checkAllRequirementsMet(e.contractorId));const p=this.getAllContractorsForModules().some(d=>d.id===e.id||d.id===e.contractorId||d.name&&e.companyName&&d.name===e.companyName),f=this.getContractorOptionsForModules().some(d=>d.id===e.id||d.id===e.contractorId||d.name&&e.companyName&&d.name===e.companyName);return{found:!0,approved:e,checks:{isApproved:i,isExpired:s,isActive:n,requirementsMet:c,appearsInList:p,appearsInForms:f},shouldAppear:n,message:n?"\u064A\u062C\u0628 \u0623\u0646 \u064A\u0638\u0647\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0644\u0627 \u064A\u0633\u062A\u0648\u0641\u064A \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0638\u0647\u0648\u0631"}},debugAllContractorsVisibility(){const t=AppState.appData.approvedContractors||[],a=this.getContractorOptionsForModules(),e=this.getAllContractorsForModules(),r={total:t.length,visible:0,hidden:0,reasons:{statusNotApproved:[],expired:[],noName:[],notInForms:[]}};return t.forEach((o,i)=>{const s=o.companyName||o.name||"(\u0628\u062F\u0648\u0646 \u0627\u0633\u0645)",n=o.code||o.isoCode||"(\u0628\u062F\u0648\u0646 \u0643\u0648\u062F)",c=(o.status||"").toString(),l=this.isApprovalActive(o,!0),p=this.isApprovalExpired(o);if(a.some(f=>f.id===o.id||f.id===o.contractorId||f.name&&o.companyName&&f.name===o.companyName))r.visible++;else{r.hidden++;let f="";if(!l){const d=c.toLowerCase().trim();["approved","\u0645\u0639\u062A\u0645\u062F","\u0646\u0634\u0637","active","\u0645\u0641\u0639\u0644","\u0645\u0641\u0639\u0651\u0644",""].includes(d)||(f=`\u062D\u0627\u0644\u0629 \u063A\u064A\u0631 \u0645\u0639\u062A\u0645\u062F\u0629: "${c}"`,r.reasons.statusNotApproved.push({name:s,code:n,status:c}))}p&&(f=`\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629: ${o.expiryDate}`,r.reasons.expired.push({name:s,code:n,expiryDate:o.expiryDate})),(!s||s==="(\u0628\u062F\u0648\u0646 \u0627\u0633\u0645)")&&(f="\u0628\u062F\u0648\u0646 \u0627\u0633\u0645",r.reasons.noName.push({id:o.id,code:n})),f||(f="\u0633\u0628\u0628 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641 - \u064A\u062D\u062A\u0627\u062C \u0641\u062D\u0635 \u064A\u062F\u0648\u064A",r.reasons.notInForms.push({name:s,code:n,record:o}))}}),r.reasons.statusNotApproved.length>0,r.reasons.expired.length>0,r.reasons.noName.length>0,r.reasons.notInForms.length>0&&r.reasons.notInForms.forEach(o=>{}),r},ensureApprovedSetup(){if(!AppState||!AppState.appData)if(typeof window<"u")window.AppState=window.AppState||{},window.AppState.appData=window.AppState.appData||{};else return;const t=AppState.appData.approvedContractors;if(!Array.isArray(t)){AppState.appData.approvedContractors=[];return}let a=!1;AppState.appData.approvedContractors=t.filter(e=>e&&typeof e=="object").map(e=>{const r=Object.assign({},e);r.id||(r.id=typeof Utils<"u"&&Utils.generateId?Utils.generateId("APPCON"):`APPCON_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=!0);const o=(r.companyName||r.name||"").trim();o!==r.companyName&&(r.companyName=o,a=!0);const i=this.normalizeApprovedEntityType(r.entityType||r.type);i!==r.entityType&&(r.entityType=i,a=!0);const s=(r.serviceType||r.activity||r.service||"").trim();s!==r.serviceType&&(r.serviceType=s,a=!0);const n=(r.licenseNumber||r.commercialNumber||r.license||"").trim();n!==r.licenseNumber&&(r.licenseNumber=n,a=!0);const c=(r.safetyReviewer||r.reviewer||"").trim();c!==r.safetyReviewer&&(r.safetyReviewer=c,a=!0);const l=(r.notes||r.remark||"").trim();l!==r.notes&&(r.notes=l,a=!0);const p=this.normalizeApprovedStatus(r.status||r.statusLabel);p!==r.status&&(r.status=p,a=!0),r.approvalDate=r.approvalDate||r.accreditationDate||"",r.expiryDate=r.expiryDate||r.expirationDate||"",r.createdAt=r.createdAt||new Date().toISOString(),r.updatedAt=r.updatedAt||new Date().toISOString();let u=r.isoCode||r.code||r.contractorCode||r["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||r.\u0643\u0648\u062F||r.codeNumber||"";if(!u&&r.contractorId){const d=(AppState.appData.contractors||[]).find(m=>m.id===r.contractorId);d&&d.code&&(u=d.code)}return r.isoCode=u||r.isoCode||"",r.code=u||r.code||"",r.isoCode!==r.code&&(r.code=r.isoCode,a=!0),r}),a&&(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},convertOldApprovedCodes(){const t=AppState.appData.approvedContractors||[],a=AppState.appData.contractors||[];let e=!1;t.forEach(r=>{const o=r.isoCode||r.code;if(o&&o.match(/^APP-(\d+)$/)){const i=o.match(/^APP-(\d+)$/);if(i){const s=`CON-${i[1]}`;if(!(a.find(c=>c.code===s)||t.find(c=>(c.isoCode===s||c.code===s)&&c.id!==r.id)))r.isoCode=s,r.code=s,e=!0;else{let c=0;a.forEach(u=>{if(u.code){const f=u.code.match(/CON-(\d+)/);if(f){const d=parseInt(f[1],10);d>c&&(c=d)}}}),t.forEach(u=>{const f=u.isoCode||u.code;if(f){let d=f.match(/CON-(\d+)/);if(d){const m=parseInt(d[1],10);m>c&&(c=m)}}});const l=c+1,p=`CON-${String(l).padStart(3,"0")}`;r.isoCode=p,r.code=p,e=!0}}}}),e&&(AppState.appData.approvedContractors=t,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save())},getFilteredApprovedEntities(){this.ensureApprovedSetup();const t=(AppState.appData.approvedContractors||[]).slice(),e=(AppState.appData.contractors||[]).slice().filter(d=>d&&typeof d=="object").map(d=>{d.code||(d.code=this.generateContractorCode());const m=t.find(v=>v.contractorId===d.id);return{id:d.id,contractorId:d.id,companyName:d.name||d.company||"",entityType:"contractor",serviceType:d.serviceType||"",licenseNumber:d.licenseNumber||d.contractNumber||"",approvalDate:m?.approvalDate||d.startDate||"",expiryDate:m?.expiryDate||d.endDate||"",safetyReviewer:m?.safetyReviewer||"",notes:m?.notes||d.notes||"",status:m?.status||(d.status==="\u0646\u0634\u0637"?"approved":"under_review"),createdAt:d.createdAt||new Date().toISOString(),updatedAt:d.updatedAt||new Date().toISOString(),code:d.code,contractNumber:d.contractNumber,isRegularContractor:!0,isActive:this.isEntityEnabled(d)?!(m&&!this.isEntityEnabled(m)):!1,requirementsStatus:this.getContractorRequirementsStatus(d.id)}}),r=[...t],o=new Set(t.map(d=>d.contractorId||d.id).filter(Boolean));if(e.forEach(d=>{if(d.contractorId&&o.has(d.contractorId))return;const m=d.code||d.isoCode;if(m&&r.find(A=>{const y=A.code||A.isoCode;return y&&y===m}))return;const v=(d.companyName||"").trim().toLowerCase();v&&r.find(A=>{const y=(A.companyName||"").trim().toLowerCase();return y&&y===v&&A.entityType===d.entityType})||(r.push(d),d.contractorId&&o.add(d.contractorId))}),r.length===0)return this._approvedFilterCounts={total:0,filtered:0},[];const{search:i,status:s,type:n,validity:c,activeState:l}=this.approvedFilters,p=this.normalizeApprovedSearchText(i||""),u=p.length>0,f=r.filter(d=>!(s&&this.normalizeApprovedStatus(d.status)!==s||n&&this.normalizeApprovedEntityType(d.entityType||d.type)!==n||c==="valid"&&this.isApprovalExpired(d)||c==="expired"&&(!d.expiryDate||!this.isApprovalExpired(d))||l==="active"&&!this.isEntityEnabled(d)||l==="inactive"&&this.isEntityEnabled(d)||u&&!this.matchesApprovedEntitySearch(d,p)));return this._approvedFilterCounts={total:r.length,filtered:f.length},f.sort((d,m)=>Contractors.sortByContractorCode(d,m))},getApprovedEntityStatsKey(t){if(!t)return"";const a=this.normalizeApprovedEntityType(t.entityType||t.type),e=String(t.companyName||t.name||"").replace(/\s+/g," ").trim().toLowerCase(),r=String(t.code||t.isoCode||"").replace(/\s+/g," ").trim().toLowerCase(),o=String(t.contractorId||t.id||"").replace(/\s+/g," ").trim().toLowerCase();return`${a}::${e||r||o}`},getApprovedEntitiesStatsSource(){const t=this.getFilteredApprovedEntities().filter(e=>!e.isRegularContractor),a=new Set;return t.filter(e=>{const r=this.getApprovedEntityStatsKey(e);return!r||a.has(r)?!1:(a.add(r),!0)})},getApprovedEntitiesStats(){const t=this.getApprovedEntitiesStatsSource(),a=t.filter(u=>this.isEntityEnabled(u)),e=t.filter(u=>!this.isEntityEnabled(u)),r=a.filter(u=>this.normalizeApprovedEntityType(u.entityType||u.type)==="contractor").length,o=a.filter(u=>this.normalizeApprovedEntityType(u.entityType||u.type)==="supplier").length,i=t.filter(u=>this.normalizeApprovedEntityType(u.entityType||u.type)==="contractor").length,s=t.filter(u=>this.normalizeApprovedEntityType(u.entityType||u.type)==="supplier").length,n={\u0645\u0642\u0627\u0648\u0644:i,\u0645\u0648\u0631\u062F:s};let c=0,l=0;t.forEach(u=>{if(u.approvalDate&&u.createdAt){const f=new Date(u.approvalDate),d=new Date(u.createdAt);if(!isNaN(f.getTime())&&!isNaN(d.getTime())&&f>=d){const v=(f-d)/(1e3*60*60*24);c+=v,l++}}});const p=l>0?Math.round(c/l):0;return{contractorsCount:r,suppliersCount:o,total:t.length,activeCount:a.length,inactiveCount:e.length,entityTypeDistribution:n,avgApprovalTime:p}},renderApprovedEntitiesStats(){const t=this.getApprovedEntitiesStats();return`
            <div style="overflow-x:auto;margin-bottom:1.25rem;">
                <div class="contractors-kpi-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0.85rem;align-items:stretch;">
                    
                    <!-- \u0643\u0627\u0631\u062A 1: \u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 -->
                    <div class="contractors-kpi-card" 
                         style="background:linear-gradient(135deg,#eef2ff 0%,#e0e7ff 60%,#ffffff 100%);border:1px solid #c7d2fe;border-radius:14px;padding:1rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);cursor:default;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px -5px rgba(79,70,229,0.18)'" 
                         onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div>
                            <div style="font-size:0.75rem;font-weight:700;color:#3730a3;margin-bottom:0.35rem;display:flex;align-items:center;gap:5px;">
                                <span>\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0627\u0644\u0646\u0634\u0637\u0648\u0646</span>
                            </div>
                            <div style="font-size:1.85rem;font-weight:900;line-height:1.1;color:#4338ca;">${t.contractorsCount}</div>
                            <div style="font-size:0.69rem;color:#475569;margin-top:0.4rem;font-weight:600;">\u0645\u0642\u0627\u0648\u0644 \u0645\u0639\u062A\u0645\u062F \u0648\u0646\u0634\u0637</div>
                        </div>
                        <div style="width:44px;height:44px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(79,70,229,0.25);">
                            <i class="fas fa-users-cog" style="color:#ffffff;font-size:1.1rem;"></i>
                        </div>
                    </div>

                    <!-- \u0643\u0627\u0631\u062A 2: \u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0631\u062F\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646 -->
                    <div class="contractors-kpi-card" 
                         style="background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 60%,#ffffff 100%);border:1px solid #a7f3d0;border-radius:14px;padding:1rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);cursor:default;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px -5px rgba(16,185,129,0.18)'" 
                         onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div>
                            <div style="font-size:0.75rem;font-weight:700;color:#065f46;margin-bottom:0.35rem;display:flex;align-items:center;gap:5px;">
                                <span>\u0627\u0644\u0645\u0648\u0631\u062F\u0648\u0646 \u0627\u0644\u0646\u0634\u0637\u0648\u0646</span>
                            </div>
                            <div style="font-size:1.85rem;font-weight:900;line-height:1.1;color:#059669;">${t.suppliersCount}</div>
                            <div style="font-size:0.69rem;color:#475569;margin-top:0.4rem;font-weight:600;">\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0648\u0646\u0634\u0637</div>
                        </div>
                        <div style="width:44px;height:44px;background:linear-gradient(135deg,#10b981,#059669);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(16,185,129,0.25);">
                            <i class="fas fa-truck-loading" style="color:#ffffff;font-size:1.1rem;"></i>
                        </div>
                    </div>

                    <!-- \u0643\u0627\u0631\u062A 3: \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A -->
                    <div class="contractors-kpi-card" 
                         style="background:linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 60%,#ffffff 100%);border:1px solid #99f6e4;border-radius:14px;padding:1rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);cursor:default;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px -5px rgba(13,148,136,0.18)'" 
                         onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div>
                            <div style="font-size:0.75rem;font-weight:700;color:#115e59;margin-bottom:0.35rem;">\u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0634\u063A\u064A\u0644\u064A</div>
                            <div style="font-size:1.15rem;font-weight:900;line-height:1.2;color:#134e4a;">
                                <span style="color:#059669;font-size:1.4rem;">${t.activeCount}</span> \u0646\u0634\u0637
                                <span style="color:#94a3b8;margin:0 2px;">|</span>
                                <span style="color:#e11d48;font-size:1.1rem;">${t.inactiveCount}</span> \u063A\u064A\u0631 \u0646\u0634\u0637
                            </div>
                            <div style="font-size:0.69rem;color:#475569;margin-top:0.4rem;font-weight:600;">\u0645\u0646 \u0625\u062C\u0645\u0627\u0644\u064A ${t.total} \u062C\u0647\u0629</div>
                        </div>
                        <div style="width:44px;height:44px;background:linear-gradient(135deg,#14b8a6,#0d9488);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(13,148,136,0.25);">
                            <i class="fas fa-toggle-on" style="color:#ffffff;font-size:1.1rem;"></i>
                        </div>
                    </div>

                    <!-- \u0643\u0627\u0631\u062A 4: \u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629 -->
                    <div class="contractors-kpi-card" 
                         style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 60%,#ffffff 100%);border:1px solid #ddd6fe;border-radius:14px;padding:1rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);cursor:default;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px -5px rgba(139,92,246,0.18)'" 
                         onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div>
                            <div style="font-size:0.75rem;font-weight:700;color:#5b21b6;margin-bottom:0.35rem;">\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A</div>
                            <div style="font-size:1.15rem;font-weight:900;line-height:1.2;color:#6d28d9;">
                                ${t.entityTypeDistribution.\u0645\u0642\u0627\u0648\u0644||0} <span style="font-size:0.75rem;font-weight:700;">\u0645\u0642\u0627\u0648\u0644</span>
                                <span style="color:#c4b5fd;margin:0 2px;">/</span>
                                ${t.entityTypeDistribution.\u0645\u0648\u0631\u062F||0} <span style="font-size:0.75rem;font-weight:700;">\u0645\u0648\u0631\u062F</span>
                            </div>
                            <div style="font-size:0.69rem;color:#475569;margin-top:0.4rem;font-weight:600;">
                                \u0627\u0644\u0633\u0627\u0626\u062F: ${t.entityTypeDistribution.\u0645\u0642\u0627\u0648\u0644>=t.entityTypeDistribution.\u0645\u0648\u0631\u062F?"\u0645\u0642\u0627\u0648\u0644\u0648\u0646":"\u0645\u0648\u0631\u062F\u0648\u0646"}
                            </div>
                        </div>
                        <div style="width:44px;height:44px;background:linear-gradient(135deg,#8b5cf6,#7c3aed);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(139,92,246,0.25);">
                            <i class="fas fa-building" style="color:#ffffff;font-size:1.1rem;"></i>
                        </div>
                    </div>

                    <!-- \u0643\u0627\u0631\u062A 5: \u0645\u062A\u0648\u0633\u0637 \u0632\u0645\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F -->
                    <div class="contractors-kpi-card" 
                         style="background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 60%,#ffffff 100%);border:1px solid #fde68a;border-radius:14px;padding:1rem;display:flex;align-items:center;justify-content:space-between;transition:all 0.25s cubic-bezier(0.4,0,0.2,1);cursor:default;"
                         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 10px 22px -5px rgba(245,158,11,0.18)'" 
                         onmouseout="this.style.transform='';this.style.boxShadow=''">
                        <div>
                            <div style="font-size:0.75rem;font-weight:700;color:#92400e;margin-bottom:0.35rem;">\u0645\u062A\u0648\u0633\u0637 \u0632\u0645\u0646 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                            <div style="font-size:1.85rem;font-weight:900;line-height:1.1;color:#d97706;">
                                ${t.avgApprovalTime} <span style="font-size:0.8rem;font-weight:700;">\u064A\u0648\u0645</span>
                            </div>
                            <div style="font-size:0.69rem;color:#475569;margin-top:0.4rem;font-weight:600;">\u0645\u0646 \u0627\u0644\u0637\u0644\u0628 \u062D\u062A\u0649 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</div>
                        </div>
                        <div style="width:44px;height:44px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(245,158,11,0.25);">
                            <i class="fas fa-clock-history" style="color:#ffffff;font-size:1.1rem;"></i>
                        </div>
                    </div>

                </div>
            </div>
        `},countActiveApprovedFilters(){const t=this.approvedFilters||{};let a=0;return String(t.search||"").trim()&&a++,t.status&&a++,t.type&&a++,t.validity&&a++,t.activeState&&a++,a},updateApprovedFiltersMeta(){const t=this._approvedFilterCounts||{total:0,filtered:0},a=document.getElementById("approved-contractors-filter-meta"),e=document.getElementById("approved-contractors-filter-badge"),r=document.getElementById("approved-contractors-reset"),o=document.getElementById("approved-contractors-search-clear"),i=this.countActiveApprovedFilters(),s=t.total||0,n=t.filtered??s;a&&(a.textContent=i?`\u0639\u0631\u0636 ${n} \u0645\u0646 ${s} \u062C\u0647\u0629`:`\u0625\u062C\u0645\u0627\u0644\u064A ${s} \u062C\u0647\u0629`),e&&(e.textContent=String(i),e.style.display=i>0?"inline-flex":"none"),r&&(r.disabled=i===0,r.setAttribute("aria-disabled",i===0?"true":"false")),o&&(o.style.display=String(this.approvedFilters.search||"").trim()?"inline-flex":"none")},renderApprovedFiltersBar(){const t=this.approvedFilters||{},a=this.countActiveApprovedFilters(),e=this._approvedFilterCounts||{total:0,filtered:0},r=e.total||0,o=e.filtered??r,i=a?`\u0639\u0631\u0636 ${o} \u0645\u0646 ${r} \u062C\u0647\u0629`:`\u0625\u062C\u0645\u0627\u0644\u064A ${r} \u062C\u0647\u0629`,s=String(t.search||"").trim().length>0,n=Object.entries(APPROVED_ENTITY_STATUS_OPTIONS).map(([l,p])=>`
            <option value="${l}" ${t.status===l?"selected":""}>${p}</option>
        `).join(""),c=Object.entries(APPROVED_ENTITY_TYPE_OPTIONS).map(([l,p])=>`
            <option value="${l}" ${t.type===l?"selected":""}>${p}</option>
        `).join("");return`
            <div class="approved-filters-bar" role="search" aria-label="\u062A\u0635\u0641\u064A\u0629 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646">
                <div class="approved-filters-bar__header">
                    <div class="approved-filters-bar__title">
                        <i class="fas fa-sliders-h" aria-hidden="true"></i>
                        <span>\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0642\u0627\u0626\u0645\u0629</span>
                        <span id="approved-contractors-filter-badge" class="approved-filters-bar__badge" style="display:${a?"inline-flex":"none"}">${a}</span>
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
                        ${c}
                    </select>
                    <select id="approved-contractors-validity" class="approved-filters-bar__select" aria-label="\u0641\u0644\u062A\u0631 \u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F">
                        <option value="" ${t.validity?"":"selected"}>\u0635\u0644\u0627\u062D\u064A\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</option>
                        <option value="valid" ${t.validity==="valid"?"selected":""}>\u0633\u0627\u0631\u064A</option>
                        <option value="expired" ${t.validity==="expired"?"selected":""}>\u0645\u0646\u062A\u0647\u064A</option>
                    </select>
                    <select id="approved-contractors-activestate" class="approved-filters-bar__select" aria-label="\u0641\u0644\u062A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644">
                        <option value="" ${t.activeState?"":"selected"}>\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A (\u062A\u0641\u0639\u064A\u0644)</option>
                        <option value="active" ${t.activeState==="active"?"selected":""}>\u0646\u0634\u0637 \u0641\u0642\u0637</option>
                        <option value="inactive" ${t.activeState==="inactive"?"selected":""}>\u063A\u064A\u0631 \u0646\u0634\u0637 \u0641\u0642\u0637</option>
                    </select>
                    <button
                        type="button"
                        id="approved-contractors-reset"
                        class="approved-filters-bar__reset btn-secondary btn-sm"
                        ${a===0?'disabled aria-disabled="true"':""}
                    >
                        <i class="fas fa-undo-alt ml-1" aria-hidden="true"></i>
                        \u0645\u0633\u062D \u0627\u0644\u0641\u0644\u0627\u062A\u0631
                    </button>
                </div>
            </div>
        `},renderApprovedEntitiesSection(){const t=this.isContractorApprovalAdminUser(),a=this.getFilteredApprovedEntities(),e=this.renderApprovedEntitiesTable(a,t);return`
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
                        ${e}
                    </div>
                </div>
            </div>
        `},renderApprovedEntitiesTable(t,a=!1){if(!t||t.length===0)return`
                <div class="empty-state">
                    <i class="fas fa-clipboard-check text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062C\u0647\u0627\u062A \u0645\u0639\u062A\u0645\u062F\u0629 \u0623\u0648 \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B.</p>
                </div>
            `;const e=t.map(r=>{const o=this.getApprovedStatusBadgeClass(r.status),i=this.getApprovedStatusLabel(r.status),s=this.getApprovedTypeLabel(r.entityType),n=r.approvalDate?Utils.formatDate(r.approvalDate):"\u2014",c=r.expiryDate?Utils.formatDate(r.expiryDate):"\u2014",p=this.isApprovalExpired(r)?'<span class="badge badge-danger ml-2">\u0645\u0646\u062A\u0647\u064A</span>':"";let u=r.code||r.isoCode||r.contractorCode||r["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||r.\u0643\u0648\u062F||r.codeNumber||"";if(!u&&r.contractorId){const D=(AppState.appData.contractors||[]).find($=>$.id===r.contractorId);D&&D.code&&(u=D.code)}let f="";if(r.isRegularContractor&&r.requirementsStatus){const k=r.requirementsStatus;f=k.allMet?'<span class="badge badge-success ml-2" data-i18n-literal>\u0645\u0633\u062A\u0648\u0641\u064A</span>':`<span class="badge badge-warning ml-2">${k.completed}/${k.total}</span>`}const d=this.isEntityEnabled(r),m=d?"":'<span class="badge badge-danger ml-2" data-i18n-literal>\u063A\u064A\u0631 \u0646\u0634\u0637</span>',v=r.isRegularContractor,h=r.contractorId||r.id,A=String(r.id||"").replace(/'/g,"\\'"),y=String(h||"").replace(/'/g,"\\'"),w=a?d?`<button class="btn-icon btn-icon-warning" title="\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" data-i18n-title="module.contractors.disable" onclick="Contractors.toggleEntityActive('${A}', 'inactive')">
                        <i class="fas fa-toggle-off"></i>
                    </button>`:`<button class="btn-icon btn-icon-success" title="\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" data-i18n-title="module.contractors.enable" onclick="Contractors.toggleEntityActive('${A}', 'active')">
                        <i class="fas fa-toggle-on"></i>
                    </button>`:"",C=v?`
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-primary" title="\u0639\u0631\u0636 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.viewContractor('${y}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-info" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.editContractor('${y}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="\u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645" onclick="Contractors.showEvaluationForm('${y}')">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="\u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A" onclick="Contractors.openEvaluationHistory('${y}')">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${w}
                    ${a?`
                    <button class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644" onclick="Contractors.requestDeleteContractor('${y}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    `:""}
                </div>
            `:`
                <div class="flex items-center gap-2">
                    <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovedEntity('${A}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644" onclick="Contractors.showApprovedEntityForm('${A}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-icon-success" title="\u0625\u0636\u0627\u0641\u0629 \u062A\u0642\u064A\u064A\u0645" onclick="Contractors.showEvaluationFormForApproved('${A}')">
                        <i class="fas fa-clipboard-check"></i>
                    </button>
                    <button class="btn-icon btn-icon-warning" title="\u0633\u062C\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A" onclick="Contractors.openEvaluationHistoryForApproved('${A}')">
                        <i class="fas fa-clipboard-list"></i>
                    </button>
                    ${w}
                    ${a?`
                    <button class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641" onclick="Contractors.requestDeleteApprovedEntity('${A}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    `:""}
                </div>
            `;return`
                <tr>
                    <td>
                        ${u?`
                            <span class="font-mono text-sm font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded inline-block">
                                ${Utils.escapeHTML(u)}
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
                    <td>${c} ${p}</td>
                    <td>${Utils.escapeHTML(r.safetyReviewer||"")||"\u2014"}</td>
                    <td>
                        <span class="badge ${o}">
                            ${i}
                        </span>
                        ${f}
                        ${m}
                    </td>
                    <td>${Utils.escapeHTML(r.notes||"")||"\u2014"}</td>
                    <td>${C}</td>
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
                        ${e}
                    </tbody>
                </table>
            </div>
        `},refreshApprovedEntitiesList(){const t=document.getElementById("approved-contractors-container"),a=document.getElementById("approved-contractors-stats-container");if(!t)return;const e=this.isContractorApprovalAdminUser(),r=this.getFilteredApprovedEntities();a&&this.safeSetInnerHTML(a,this.renderApprovedEntitiesStats());const o=this.renderApprovedEntitiesTable(r,e);this.safeSetInnerHTML(t,o),this.updateApprovedFiltersMeta()},ensureApprovedTabContentLoaded(t=!1){const a=document.getElementById("contractors-approved-content");if(!a)return;const e=!!a.querySelector("#approved-contractors-card");!t&&e||(this.safeSetInnerHTML(a,this.renderApprovedEntitiesSection()),this.ensureApprovedTabEventListeners())},handleApprovedFilterChange(t,a){Object.prototype.hasOwnProperty.call(this.approvedFilters,t)&&(this.approvedFilters[t]=a,this.refreshApprovedEntitiesList())},resetApprovedFilters(){this.approvedFilters={search:"",status:"",type:"",validity:"",activeState:""};const t=document.getElementById("approved-contractors-search"),a=document.getElementById("approved-contractors-status"),e=document.getElementById("approved-contractors-type"),r=document.getElementById("approved-contractors-validity"),o=document.getElementById("approved-contractors-activestate");t&&(t.value=""),a&&(a.value=""),e&&(e.value=""),r&&(r.value=""),o&&(o.value=""),this.refreshApprovedEntitiesList()},getActiveApprovedEntities(t={}){this.ensureApprovedSetup();const a=t.includeExpired===!0,e=t.checkRequirements===!0;let r=(AppState.appData.approvedContractors||[]).filter(o=>this.isApprovalActive(o,a));return e&&(r=r.filter(o=>o.contractorId?this.checkAllRequirementsMet(o.contractorId):!0)),r.sort((o,i)=>Contractors.sortByContractorCode(o,i))},getApprovedOptions(t=!1){return this.getActiveApprovedEntities({includeExpired:t}).map(a=>({id:a.id,name:a.companyName,entityType:a.entityType,serviceType:a.serviceType,licenseNumber:a.licenseNumber,contractorId:a.contractorId||null}))},getContractorById(t){if(!t)return null;const a=AppState.appData.contractors||[];let e=a.find(i=>i.id===t);if(e)return e;this.ensureApprovedSetup();const o=(AppState.appData.approvedContractors||[]).find(i=>i.id===t||i.contractorId===t);return o?o.contractorId&&(e=a.find(i=>i.id===o.contractorId),e)?e:{id:o.id,name:o.companyName,serviceType:o.serviceType,contractNumber:o.licenseNumber,entityType:o.entityType,approvedEntityId:o.id}:null},getContractorByName(t){if(!t)return null;const a=t.trim().toLowerCase(),e=AppState.appData.contractors||[];let r=e.find(s=>(s.name||"").toLowerCase()===a||(s.company||"").toLowerCase()===a||(s.contractorName||"").toLowerCase()===a);if(r)return r;this.ensureApprovedSetup();const i=(AppState.appData.approvedContractors||[]).find(s=>(s.companyName||"").toLowerCase()===a);return i?i.contractorId&&(r=e.find(s=>s.id===i.contractorId),r)?r:{id:i.id,name:i.companyName,serviceType:i.serviceType,contractNumber:i.licenseNumber,entityType:i.entityType,approvedEntityId:i.id}:null},getAllContractorsForModules(){if(!AppState||!AppState.appData)if(typeof window<"u")window.AppState=window.AppState||{},window.AppState.appData=window.AppState.appData||{};else return[];const t=new Map,a=d=>(d??"").toString().trim(),e=d=>a(d).toUpperCase(),r=d=>a(d),o=d=>a(d).toLowerCase(),i=d=>{if(!d||typeof d!="object")return[];const m=[d.id,d.contractorId,d.code,d.isoCode,d.contractorCode,d.approvedEntityId,d.licenseNumber,d.contractNumber];return["aliasIds","identityIds","legacyIds","altIds"].forEach(v=>{Array.isArray(d[v])&&m.push(...d[v])}),Array.from(new Set(m.map(a).filter(Boolean)))},s=d=>{const m=e(d.code||d.isoCode||d.contractorCode);if(/^CON-\d+$/i.test(m))return`CODE:${m}`;const v=r(d.licenseNumber||d.contractNumber);if(v)return`LIC:${v}`;const h=a(d.contractorId);if(h)return`CID:${h}`;const A=a(d.id);if(A)return`ID:${A}`;const y=o(d.name||d.companyName||d.company||d.contractorName);return y?`NAME:${y}`:""},n=(d,m)=>{if(!d)return m;if(!m)return d;const v={...d,...m};v.aliasIds=Array.from(new Set([...i(d),...i(m)])),(d.approvedEntityId||m.approvedEntityId)&&(v.approvedEntityId=d.approvedEntityId||m.approvedEntityId);const h=a(d.name),A=a(m.name),y=h&&h!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";return A&&A!=="\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"&&!y?v.name=m.name:y&&(v.name=d.name),a(m.code)?v.code=m.code:a(d.code)&&(v.code=d.code),a(m.licenseNumber)?v.licenseNumber=m.licenseNumber:a(d.licenseNumber)&&(v.licenseNumber=d.licenseNumber),v},c=d=>{const m=s(d);if(!m)return;Array.isArray(d.aliasIds)||(d.aliasIds=i(d));const v=t.get(m);t.set(m,n(v,d))},l=new Set;(AppState.appData.approvedContractors||[]).forEach(d=>{d&&!this.isEntityEnabled(d)&&(d.contractorId&&l.add(String(d.contractorId).trim()),d.id&&l.add(String(d.id).trim()))}),(AppState.appData.contractors||[]).forEach(d=>{if(!d||!this.isEntityEnabled(d))return;const m=String(d.id||d.contractorId||"").trim();if(m&&l.has(m))return;const v=d.id||d.contractorId||"",h=d.name||d.company||d.contractorName||d.companyName||"";!v&&!h||c({id:v,contractorId:d.contractorId||null,name:h||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",serviceType:d.serviceType||"",licenseNumber:d.licenseNumber||d.contractNumber||"",entityType:d.entityType||"contractor",approvedEntityId:d.approvedEntityId||null,code:d.code||d.isoCode||""})}),this.ensureApprovedSetup();const u=this.getActiveApprovedEntities({includeExpired:!0});AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 getAllContractorsForModules: approved=${u.length}, contractorsSheet=${(AppState.appData.contractors||[]).length}`),u.forEach(d=>{if(!d)return;const m=d.companyName||d.name||"";m&&c({id:d.contractorId||d.id,contractorId:d.contractorId||null,name:m,serviceType:d.serviceType||"",licenseNumber:d.licenseNumber||"",entityType:d.entityType||"contractor",approvedEntityId:d.id,code:d.code||d.isoCode||""})});const f=Array.from(t.values()).filter(d=>d&&a(d.name)).sort((d,m)=>Contractors.sortByContractorCode(d,m));return AppState?.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog(`\u2705 getAllContractorsForModules: \u0625\u062C\u0645\u0627\u0644\u064A ${f.length} \u0645\u0642\u0627\u0648\u0644 \u0645\u062A\u0627\u062D \u0644\u0644\u0645\u062F\u064A\u0648\u0644\u0627\u062A`),f},getContractorOptionsForModules(t={}){const a=t.includeSuppliers!==!1,e=t.approvedOnly!==!1;return(this.getAllContractorsForModules()||[]).filter(o=>!o||e&&!o.approvedEntityId?!1:a?!0:(o.entityType||"contractor")==="contractor").map(o=>({id:(o.id||"").toString(),name:(o.name||o.companyName||"").toString().trim(),serviceType:(o.serviceType||"").toString().trim(),licenseNumber:(o.licenseNumber||o.contractNumber||"").toString().trim(),code:(o.code||o.isoCode||"").toString().trim(),entityType:(o.entityType||"contractor").toString(),approvedEntityId:o.approvedEntityId||null})).filter(o=>o.name)},populateContractorSelect(t,a={}){if(!t||t.tagName!=="SELECT")return;const e=a.placeholder||"-- \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 --",r=(a.selectedValue||"").toString(),o=(a.selectedContractorId||"").toString(),i=a.valueMode==="id"?"id":"name",s=a.showServiceType!==!1,n=a.includeSuppliers!==!1,c=a.approvedOnly!==!1,l=this.getContractorOptionsForModules({includeSuppliers:n,approvedOnly:c});t.innerHTML=`<option value="">${Utils.escapeHTML(e)}</option>`;const p=document.createDocumentFragment();l.forEach(u=>{const f=document.createElement("option");f.value=i==="id"?u.id||"":u.name||"",f.textContent=u.name,s&&u.serviceType&&(f.textContent+=` - ${u.serviceType}`),f.dataset.contractorId=u.id||"",u.code&&(f.dataset.contractorCode=u.code),o&&u.id===o?f.selected=!0:r&&(i==="name"&&u.name===r&&(f.selected=!0),i==="id"&&u.id===r&&(f.selected=!0)),p.appendChild(f)}),t.appendChild(p)},getApprovedEntityMap(t=!1){return new Map(this.getApprovedOptions(t).map(a=>[a.id,a]))},showApprovedEntityForm(t=null){this.ensureApprovedSetup();const a=t?(AppState.appData.approvedContractors||[]).find(o=>o.id===t):null,e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 720px;">
                <div class="modal-header">
                    <h2 class="modal-title">
                        <i class="fas fa-check-circle ml-2"></i>
                        ${a?"\u062A\u0639\u062F\u064A\u0644 \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629":"\u0625\u0636\u0627\u0641\u0629 \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629"}
                    </h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="approved-contractor-form" class="space-y-5">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644 *</label>
                            <input type="text" id="approved-company-name" class="form-input" required value="${Utils.escapeHTML(a?.companyName||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0634\u0631\u0643\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629 *</label>
                            <select id="approved-entity-type" class="form-input" required>
                                <option value="contractor" ${a?.entityType==="supplier"?"":"selected"}>\u0645\u0642\u0627\u0648\u0644</option>
                                <option value="supplier" ${a?.entityType==="supplier"?"selected":""}>\u0645\u0648\u0631\u062F</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629 *</label>
                            <input type="text" id="approved-service-type" class="form-input" required value="${Utils.escapeHTML(a?.serviceType||"")}" placeholder="\u0645\u062B\u0627\u0644: \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635</label>
                            <input type="text" id="approved-license-number" class="form-input" value="${Utils.escapeHTML(a?.licenseNumber||"")}" placeholder="\u0631\u0642\u0645 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0623\u0648 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0631\u062E\u064A\u0635">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <input type="date" id="approved-approval-date" class="form-input" required value="${a?.approvalDate?new Date(a.approvalDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <input type="date" id="approved-expiry-date" class="form-input" required value="${a?.expiryDate?new Date(a.expiryDate).toISOString().slice(0,10):""}">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</label>
                            <input type="text" id="approved-safety-reviewer" class="form-input" value="${Utils.escapeHTML(a?.safetyReviewer||"")}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u0624\u0648\u0644 \u0639\u0646 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F *</label>
                            <select id="approved-status" class="form-input" required>
                                <option value="approved" ${a?.status==="approved"?"selected":""}>\u0645\u0639\u062A\u0645\u062F</option>
                                <option value="under_review" ${a?.status==="under_review"||!a?"selected":""}>\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629</option>
                                <option value="rejected" ${a?.status==="rejected"?"selected":""}>\u0645\u0631\u0641\u0648\u0636</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                        <textarea id="approved-notes" class="form-input" rows="3" placeholder="\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629">${Utils.escapeHTML(a?.notes||"")}</textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-save ml-2"></i>
                            ${a?"\u062A\u062D\u062F\u064A\u062B":"\u062D\u0641\u0638"}
                        </button>
                    </div>
                </form>
            </div>
        `,document.body.appendChild(e),this.applyModuleI18n(e);const r=e.querySelector("#approved-contractor-form");r?.addEventListener("submit",o=>{if(o.preventDefault(),!e||!document.contains(e)){Utils.safeWarn("\u26A0\uFE0F submit approved-contractor-form: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}if(!r||!document.contains(r)){Utils.safeWarn("\u26A0\uFE0F submit approved-contractor-form: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}try{const i=r.querySelector("#approved-company-name"),s=r.querySelector("#approved-entity-type"),n=r.querySelector("#approved-service-type"),c=r.querySelector("#approved-license-number"),l=r.querySelector("#approved-approval-date"),p=r.querySelector("#approved-expiry-date"),u=r.querySelector("#approved-safety-reviewer"),f=r.querySelector("#approved-status"),d=r.querySelector("#approved-notes"),m=i?.value.trim()||"",v=s?.value||"",h=n?.value.trim()||"",A=c?.value.trim()||"",y=l?.value||"",w=p?.value||"",C=u?.value.trim()||"",k=f?.value||"",D=d?.value.trim()||"";if(!m||!h||!y||!w){Notification.warning("\u064A\u0631\u062C\u0649 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 (\u0627\u0644\u0627\u0633\u0645\u060C \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u060C \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621)");return}const $=new Date(y).toISOString(),b=new Date(w).toISOString();if(new Date(b)<new Date($)){Notification.warning("\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0628\u0639\u062F \u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F");return}if(!a){const L=AppState.appData.approvedContractors||[],M=m.trim().toLowerCase(),R=this.normalizeApprovedEntityType(v),T=A.trim();if(L.find(x=>x.companyName&&x.companyName.trim().toLowerCase()===M&&this.normalizeApprovedEntityType(x.entityType)===R&&(!a||x.id!==a.id))){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0627\u0633\u0645 (${m}) \u0648\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.`);return}if(T&&L.find(E=>E.licenseNumber&&E.licenseNumber.trim()===T&&(!a||E.id!==a.id))){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A (${A}). \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.`);return}}let S=a?.isoCode||a?.code||"";if(S){if(!a){const L=AppState.appData.approvedContractors||[];if(L.find(R=>{const T=R.isoCode||R.code;return T&&T===S&&(!a||R.id!==a.id)})){Notification.error(`\u064A\u0648\u062C\u062F \u0628\u0627\u0644\u0641\u0639\u0644 \u0645\u0642\u0627\u0648\u0644/\u0645\u0648\u0631\u062F \u0645\u0639\u062A\u0645\u062F \u0628\u0646\u0641\u0633 \u0627\u0644\u0643\u0648\u062F (${S}). \u0633\u064A\u062A\u0645 \u062A\u0648\u0644\u064A\u062F \u0643\u0648\u062F \u062C\u062F\u064A\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.`);const R=AppState.appData.contractors||[];let T=0;R.forEach(x=>{if(x.code){const E=x.code.match(/CON-(\d+)/);if(E){const q=parseInt(E[1],10);q>T&&(T=q)}}}),L.forEach(x=>{const E=x.isoCode||x.code;if(E){let q=E.match(/CON-(\d+)/);if(q){const _=parseInt(q[1],10);_>T&&(T=_)}if(q=E.match(/APP-(\d+)/),q){const _=parseInt(q[1],10);_>T&&(T=_)}}});const g=T+1;S=`CON-${String(g).padStart(3,"0")}`}}}else{const L=AppState.appData.contractors||[],M=L.find(R=>R.name===m||A&&R.contractNumber===A);if(M&&M.code)S=M.code;else{const R=AppState.appData.approvedContractors||[];let T=0;L.forEach(x=>{if(x.code){const E=x.code.match(/CON-(\d+)/);if(E){const q=parseInt(E[1],10);q>T&&(T=q)}}}),R.forEach(x=>{const E=x.isoCode||x.code;if(E){let q=E.match(/CON-(\d+)/);if(q){const _=parseInt(q[1],10);_>T&&(T=_)}if(q=E.match(/APP-(\d+)/),q){const _=parseInt(q[1],10);_>T&&(T=_)}}});const g=T+1;S=`CON-${String(g).padStart(3,"0")}`}}const I={id:a?.id||Utils.generateId("APPCON"),companyName:m,entityType:this.normalizeApprovedEntityType(v),serviceType:h,licenseNumber:A,approvalDate:$,expiryDate:b,safetyReviewer:C,status:this.normalizeApprovedStatus(k),notes:D,isoCode:S,code:S,createdAt:a?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(this.persistApprovedEntity(I,a),Notification.success(a?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629":"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),this.currentTab==="approved"&&this.refreshApprovedEntitiesList(),e&&document.contains(e))try{e.remove()}catch(L){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 modal:",L);const M=e.parentNode;if(M)try{M.removeChild(e)}catch(R){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644\u062A \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u0628\u062F\u064A\u0644\u0629 \u0644\u0625\u0632\u0627\u0644\u0629 modal:",R)}}}catch(i){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",i),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062C\u0647\u0629: "+i.message)}}),e.addEventListener("click",o=>{o.target===e&&e.remove()})},viewApprovedEntity(t){this.injectAntiShakeStyles(),this.ensureApprovedSetup();const e=(AppState.appData.approvedContractors||[]).find(p=>p&&(p.id===t||String(p.id)===String(t)));if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const r=this.getApprovedStatusLabel(e.status),o=this.getApprovedTypeLabel(e.entityType),i=e.approvalDate?Utils.formatDate(e.approvalDate):"\u2014",s=e.expiryDate?Utils.formatDate(e.expiryDate):"\u2014",n=this.isApprovalExpired(e)?'<span class="badge badge-danger ml-2">\u0645\u0646\u062A\u0647\u064A</span>':"",c=e.code||e.isoCode||e.contractorCode||e["\u0643\u0648\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644"]||e.\u0643\u0648\u062F||e.codeNumber||"",l=document.createElement("div");l.id="contractor-approved-entity-details-modal",l.className="modal-overlay ctr-detail-modal",l.innerHTML=`
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
                        <div><span>\u0643\u0648\u062F \u0627\u0644\u062C\u0647\u0629</span><strong class="ctr-detail-code">${c?Utils.escapeHTML(c):"\u2014"}</strong></div>
                        <div><span>\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629</span><strong>${o}</strong></div>
                        <div><span>\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span><strong><span class="badge ${this.getApprovedStatusBadgeClass(e.status)}">${r}</span></strong></div>
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
                            <div class="ctr-detail-field"><label>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label><p>${i}</p></div>
                            <div class="ctr-detail-field"><label>\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</label><p>${s} ${n}</p></div>
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
        `,document.body.appendChild(l),this.applyModuleI18n(l),l.addEventListener("click",p=>{p.target===l&&l.remove()})},persistApprovedEntity(t,a=null){this.ensureApprovedSetup();let e=AppState.appData.approvedContractors||[];if(!Array.isArray(e)||e.length===0)try{typeof GoogleIntegration<"u"&&GoogleIntegration.syncData&&GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1,sheets:["ApprovedContractors"]}).then(()=>{e=AppState.appData.approvedContractors||[],Array.isArray(e)&&e.length>0&&this.persistApprovedEntity(t,a)}).catch(()=>{})}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A:",r)}if(e=[...e],a){const r=e.findIndex(o=>o.id===a.id);r!==-1?e[r]={...t}:e.push({...t})}else{if(!t.isoCode&&!t.code){let o=0;e.forEach(s=>{const n=s.isoCode||s.code;if(n){const c=n.match(/APP-(\d+)/);if(c){const l=parseInt(c[1],10);l>o&&(o=l)}}});const i=o+1;t.isoCode=`APP-${String(i).padStart(3,"0")}`,t.code=t.isoCode}const r=e.findIndex(o=>{if(o.id===t.id)return!0;if(t.isoCode||t.code){const i=t.isoCode||t.code,s=o.isoCode||o.code;if(i&&s&&i===s)return!0}return!!(t.companyName&&o.companyName&&t.companyName.trim().toLowerCase()===o.companyName.trim().toLowerCase()&&t.entityType===o.entityType||t.licenseNumber&&o.licenseNumber&&t.licenseNumber.trim()===o.licenseNumber.trim())});if(r!==-1){const o=e[r];e[r]={...t,id:o.id,createdAt:o.createdAt||t.createdAt},Utils.safeWarn(`\u26A0\uFE0F \u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u062A\u0643\u0631\u0627\u0631 \u0644\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F: ${t.companyName} - \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0625\u0636\u0627\u0641\u0629`)}else e.push({...t})}AppState.appData.approvedContractors=e,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("ApprovedContractors",AppState.appData.approvedContractors).catch(r=>{Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)})}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)}this.refreshApprovedEntitiesList()},async requestDeleteApprovedEntity(t){if(!t)return;if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F\u061F")?this.deleteApprovedEntity(t):void 0;this.ensureApprovedSetup();const e=(AppState.appData.approvedContractors||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"))return;const r=AppState.currentUser,o={id:Utils.generateId("DELRQ"),requestType:"approved_entity",entityId:t,entityName:e.companyName||e.name||"",entityType:e.entityType||"contractor",reason:prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:")||"\u0637\u0644\u0628 \u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",createdBy:r?.id||"",createdByName:r?.name||"",createdAt:new Date().toISOString(),status:"pending"};await this.submitDeletionRequest(o),this.refreshApprovalRequestsSection()},async deleteApprovedEntity(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647\u0627 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."))return;this.ensureApprovedSetup();const a=AppState.appData.approvedContractors||[],e=a.findIndex(o=>o.id===t);if(e===-1){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const r=a[e];if(a.splice(e,1),AppState.appData.approvedContractors=a,r.contractorId){const o=AppState.appData.contractors||[],i=o.findIndex(s=>s.id===r.contractorId);i!==-1&&(o.splice(i,1),AppState.appData.contractors=o)}try{Loading.show();const o=await GoogleIntegration.sendToAppsScript("deleteApprovedContractor",{approvedContractorId:t,__timeoutMs:45e3});if(o.success)Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.load(!0);else throw new Error(o.message)}catch(o){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: "+o.message),this.load(!0)}finally{Loading.hide(),this.refreshApprovedEntitiesList()}},async toggleEntityActive(t,a){if(!t)return;if(typeof Permissions>"u"||!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u063A\u064A\u064A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644");return}this.ensureApprovedSetup();const e=AppState.appData.approvedContractors||[],r=e.findIndex(d=>d&&d.id===t);if(r===-1){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=a==="inactive"||a===!1?"inactive":"active",i=o==="active",s=window.AppI18n&&typeof window.AppI18n.t=="function"?window.AppI18n:window.I18n&&typeof window.I18n.t=="function"?window.I18n:null,n=(d,m)=>{try{return s&&s.t(d)||m}catch{return m}},c=i?n("module.contractors.confirmEnable","\u0647\u0644 \u062A\u0631\u064A\u062F \u0625\u0639\u0627\u062F\u0629 \u062A\u0641\u0639\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u0639\u0648\u062F \u0644\u0644\u0638\u0647\u0648\u0631 \u0641\u064A \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C."):n("module.contractors.confirmDisable","\u0647\u0644 \u062A\u0631\u064A\u062F \u062A\u0639\u0637\u064A\u0644 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0644\u0646 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0641\u0644\u0627\u062A\u0631 \u0648\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0645\u0639 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0643\u0627\u0645\u0644 \u0628\u064A\u0627\u0646\u0627\u062A\u0647.");if(!confirm(c))return;const l=e[r],p=l.isActive;l.isActive=o,e[r]=l,AppState.appData.approvedContractors=e;let u=null,f=null;if(l.contractorId){const d=AppState.appData.contractors||[],m=d.findIndex(v=>v&&v.id===l.contractorId);m!==-1&&(u=d[m],f=u.isActive,u.isActive=o,d[m]=u,AppState.appData.contractors=d)}this.refreshApprovedEntitiesList();try{typeof GoogleIntegration<"u"&&GoogleIntegration.sendToAppsScript&&await GoogleIntegration.sendToAppsScript("updateApprovedContractor",{approvedContractorId:l.id,updateData:{isActive:o,updatedAt:new Date().toISOString()}}),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(i?n("module.contractors.toggleEnableSuccess","\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"):n("module.contractors.toggleDisableSuccess","\u062A\u0645 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"))}catch(d){l.isActive=p,e[r]=l,AppState.appData.approvedContractors=e,u&&(u.isActive=f),this.refreshApprovedEntitiesList(),typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0651\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0645\u0639 Backend\u060C \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637:",d),Notification.warning("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062D\u0627\u0644\u0629 \u0645\u062D\u0644\u064A\u0627\u064B\u060C \u0644\u0643\u0646 \u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645")}},exportApprovedEntitiesExcel(){this.ensureApprovedSetup();const t=this.getFilteredApprovedEntities();if(!t.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0623\u0648 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.");return}const a=t.map(i=>({"\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644":i.companyName||"","\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629":this.getApprovedTypeLabel(i.entityType),"\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629":i.serviceType||"","\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635":i.licenseNumber||"","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":i.approvalDate&&typeof Utils.formatDateForInput=="function"?Utils.formatDateForInput(i.approvalDate):i.approvalDate?Utils.formatDate(i.approvalDate):"","\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F":i.expiryDate&&typeof Utils.formatDateForInput=="function"?Utils.formatDateForInput(i.expiryDate):i.expiryDate?Utils.formatDate(i.expiryDate):"","\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629":i.safetyReviewer||"",\u0627\u0644\u062D\u0627\u0644\u0629:this.getApprovedStatusLabel(i.status),\u0645\u0644\u0627\u062D\u0638\u0627\u062A:i.notes||""})),e=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(a);r["!cols"]=[{wch:30},{wch:16},{wch:28},{wch:24},{wch:16},{wch:18},{wch:22},{wch:16},{wch:40}],XLSX.utils.book_append_sheet(e,r,"\u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629");const o=`\u0627\u0644\u062C\u0647\u0627\u062A_\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629_${new Date().toISOString().slice(0,10)}.xlsx`;XLSX.writeFile(e,o),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0628\u0646\u062C\u0627\u062D")},parseApprovedImportDate(t){if(t==null||t==="")return"";if(t instanceof Date)return isNaN(t.getTime())?"":t.toISOString();if(typeof t=="number"&&!Number.isNaN(t)){const r=Math.round((t-25569)*86400*1e3),o=new Date(r);return isNaN(o.getTime())?"":o.toISOString()}const a=String(t).trim();if(!a||a==="-")return"";if(/^\d{4}-\d{2}-\d{2}$/.test(a)){const r=new Date(a+"T00:00:00");return isNaN(r.getTime())?"":r.toISOString()}const e=new Date(a);return isNaN(e.getTime())?"":e.toISOString()},getApprovedImportCell(t,...a){if(!t||typeof t!="object")return"";for(let r=0;r<a.length;r++){const o=a[r];if(o in t&&t[o]!==void 0&&t[o]!==null&&String(t[o]).trim()!=="")return t[o]}const e=Object.keys(t);for(let r=0;r<e.length;r++){const o=e[r];for(let i=0;i<a.length;i++)if(o&&o.replace(/\s+/g," ").trim()===a[i])return t[o]}return""},async importApprovedEntitiesFromExcelFile(t){if(this.ensureApprovedSetup(),!Permissions.isAdmin()){Notification.warning("\u064A\u064F\u0633\u0645\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637 \u0628\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0626\u0645\u0629.");return}if(!t)return;if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 SheetJS \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629.");return}const a={type:"array"};let e;try{const l=await t.arrayBuffer();e=XLSX.read(l,{type:"array",cellDates:!0})}catch{Notification.error("\u062A\u0639\u0630\u0631 \u0642\u0631\u0627\u0621\u0629 \u0645\u0644\u0641 Excel.");return}const r=e.SheetNames[0],o=e.Sheets[r];if(!o){Notification.error("\u0627\u0644\u0645\u0644\u0641 \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0648\u0631\u0642\u0629 \u0628\u064A\u0627\u0646\u0627\u062A.");return}const i=XLSX.utils.sheet_to_json(o,{defval:"",raw:!0});if(!Array.isArray(i)||i.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0641\u0648\u0641 \u0641\u064A \u0627\u0644\u0645\u0644\u0641.");return}let s=0,n=0,c=0;Loading.show();try{for(let l=0;l<i.length;l++){const p=i[l],u=String(this.getApprovedImportCell(p,"\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 / \u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629","companyName")).trim();if(!u){c++;continue}const f=String(this.getApprovedImportCell(p,"\u0646\u0648\u0639 \u0627\u0644\u062C\u0647\u0629","entityType")).trim(),d=String(this.getApprovedImportCell(p,"\u0627\u0644\u0646\u0634\u0627\u0637 / \u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629","\u0627\u0644\u0646\u0634\u0627\u0637","serviceType")).trim(),m=String(this.getApprovedImportCell(p,"\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A / \u0627\u0644\u062A\u0631\u062E\u064A\u0635","\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A","licenseNumber")).trim(),v=this.parseApprovedImportDate(this.getApprovedImportCell(p,"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F","approvalDate")),h=this.parseApprovedImportDate(this.getApprovedImportCell(p,"\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F","expiryDate"));if(!d||!v||!h){c++;continue}if(new Date(h)<new Date(v)){c++;continue}const A=String(this.getApprovedImportCell(p,"\u0645\u0633\u0624\u0648\u0644 \u0627\u0644\u0633\u0644\u0627\u0645\u0629","safetyReviewer")).trim(),y=String(this.getApprovedImportCell(p,"\u0627\u0644\u062D\u0627\u0644\u0629","status")).trim(),w=String(this.getApprovedImportCell(p,"\u0645\u0644\u0627\u062D\u0638\u0627\u062A","notes")).trim(),C=this.normalizeApprovedEntityType(f||"\u0645\u0642\u0627\u0648\u0644"),k=this.normalizeApprovedStatus(y||"\u0645\u0639\u062A\u0645\u062F"),$=(AppState.appData.approvedContractors||[]).find(S=>S.companyName&&S.companyName.trim().toLowerCase()===u.toLowerCase()&&this.normalizeApprovedEntityType(S.entityType)===C),b={id:$?.id||Utils.generateId("APPCON"),companyName:u,entityType:C,serviceType:d,licenseNumber:m,approvalDate:v,expiryDate:h,safetyReviewer:A,status:k,notes:w,isoCode:$?.isoCode||$?.code||"",code:$?.code||$?.isoCode||"",createdAt:$?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};$?n++:s++,this.persistApprovedEntity(b,$||null)}Notification.success(`\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: \u0635\u0641\u0648\u0641 \u062C\u062F\u064A\u062F\u0629 ${s}\u060C \u062A\u062D\u062F\u064A\u062B ${n}\u060C \u062A\u062E\u0637\u064A ${c}.`),this.currentTab==="approved"&&this.refreshApprovedEntitiesList()}catch(l){Utils.safeError("\u0641\u0634\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",l),Notification.error("\u0641\u0634\u0644 \u0627\u0644\u0627\u0633\u062A\u064A\u0631\u0627\u062F: "+(l.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{Loading.hide()}},exportApprovedEntitiesPDF(t=null){this.ensureApprovedSetup();const a=t?(AppState.appData.approvedContractors||[]).filter(e=>e.id===t):this.getFilteredApprovedEntities();if(!a.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062A\u0635\u062F\u064A\u0631\u0647\u0627");return}try{Loading.show();const r=`
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
                        ${a.map((l,p)=>`
                <tr>
                    <td>${p+1}</td>
                    <td>${Utils.escapeHTML(l.companyName||"")}</td>
                    <td>${this.getApprovedTypeLabel(l.entityType)}</td>
                    <td>${Utils.escapeHTML(l.serviceType||"")}</td>
                    <td>${Utils.escapeHTML(l.licenseNumber||"")}</td>
                    <td>${l.approvalDate?Utils.formatDate(l.approvalDate):"-"}</td>
                    <td>${l.expiryDate?Utils.formatDate(l.expiryDate):"-"}</td>
                    <td>${Utils.escapeHTML(l.safetyReviewer||"")}</td>
                    <td>${this.getApprovedStatusLabel(l.status)}</td>
                    <td>${Utils.escapeHTML(l.notes||"")}</td>
                </tr>
            `).join("")}
                    </tbody>
                </table>
            `,o=t?a[0]?.isoCode||`APPCON-${a[0]?.id?.substring(0,6)||""}`:`APPCON-LIST-${new Date().toISOString().slice(0,10)}`,i=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(o,t?"\u0646\u0645\u0648\u0630\u062C \u062C\u0647\u0629 \u0645\u0639\u062A\u0645\u062F\u0629":"\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629",r,!1,!0,{version:"1.0",qrData:t?`approved-contractor:${t}`:"approved-contractors:list"},a.reduce((l,p)=>{const u=new Date(p.createdAt||p.approvalDate||new Date);return!l||u<l?u:l},null)||new Date,new Date):r,s=new Blob([i],{type:"text/html;charset=utf-8"}),n=URL.createObjectURL(s),c=window.open(n,"_blank");c?c.onload=()=>{setTimeout(()=>{c.print(),setTimeout(()=>{URL.revokeObjectURL(n)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(n),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0646\u0648\u0627\u0641\u0630 \u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(e){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062C\u0647\u0627\u062A \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: "+e.message)}},async renderEvaluationsSection(){const t=this.getApprovedOptions(!0),a=AppState.appData.contractors||[],e=t.length>0?t:a.map(l=>({id:l.id,name:l.name||l.company||l.contractorName||""})),r=e.length?e.map(l=>`<option value="${l.id}">${Utils.escapeHTML(l.name||"")}</option>`).join(""):"",o=e.length>0,i=this.renderEvaluationsTable(this.currentEvaluationFilter||""),s=this.isContractorApprovalAdminUser();this.ensureEvaluationApprovalRequestsSetup();const n=this.getMyEvaluationApprovalRequests(),c=s?this.getPendingEvaluationApprovalRequests():[];return`
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
                            ${this.renderApprovalRequestsTable(c,!0)}
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
        `},renderEvaluationsTable(t=""){const a=AppState.appData.contractorEvaluations||[],e=new Map;a.forEach(o=>{const i=o.id||o.evaluationId;if(!i||t&&!this.evaluationMatchesContractorFilter(o,t))return;if(!e.has(i)){let n=o.finalScore;typeof n=="string"&&n!==""?(n=parseFloat(n),isNaN(n)&&(n=null)):typeof n!="number"&&(n=null);let c=o.compliantCount;typeof c=="string"&&(c=parseInt(c)||0);let l=o.totalItems;typeof l=="string"&&(l=parseInt(l)||0),n===null&&c>0&&l>0&&(n=Math.round(c/l*100));const p=Array.isArray(o.items)?o.items.map(u=>({criteriaId:u.criteriaId||u.id||"",title:u.title||u.label||"",status:u.status||"",notes:u.notes||""})):[];e.set(i,{id:i,contractorId:o.contractorId,contractorName:o.contractorName,evaluationDate:o.evaluationDate,evaluatorName:o.evaluatorName,projectName:o.projectName,location:o.location,generalNotes:o.generalNotes,compliantCount:c??0,totalItems:l??0,finalScore:n,finalRating:o.finalRating||"",isoCode:o.isoCode,createdAt:o.createdAt,updatedAt:o.updatedAt,createdBy:o.createdBy,updatedBy:o.updatedBy,items:p})}const s=e.get(i);(o.criteriaId||o.title)&&s.items.push({criteriaId:o.criteriaId,title:o.title,status:o.status,notes:o.notes})});const r=Array.from(e.values()).sort((o,i)=>{const s=new Date(o.evaluationDate||o.createdAt||0);return new Date(i.evaluationDate||i.createdAt||0)-s});return r.length===0?`
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
            `;this.ensureRequirementsSetup();const a=this.getApprovalRequirements(),e={};a.forEach(o=>{const i=o.category||"other";e[i]||(e[i]=[]),e[i].push(o)});const r={total:a.length,required:a.filter(o=>o.required).length,withExpiry:a.filter(o=>o.hasExpiry).length,critical:a.filter(o=>o.priority==="critical").length};return`
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
                        ${Object.keys(e).map(o=>{const i=REQUIREMENT_CATEGORIES[o]||REQUIREMENT_CATEGORIES.other,s=e[o];return`
                                <div class="requirement-category-group" data-category="${o}">
                                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div class="w-1 h-8 rounded" style="background: ${i.color};"></div>
                                        <i class="fas ${i.icon} text-xl" style="color: ${i.color};"></i>
                                        <h3 class="text-lg font-bold text-gray-800">${i.label}</h3>
                                        <span class="badge badge-info">${s.length} \u0627\u0634\u062A\u0631\u0627\u0637</span>
                                    </div>
                                    <div class="space-y-3 ml-6">
                                        ${s.map((n,c)=>{const l=REQUIREMENT_PRIORITIES[n.priority]||REQUIREMENT_PRIORITIES.medium;return`
                                                <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                                                     data-requirement-id="${n.id}"
                                                     data-category="${o}"
                                                     draggable="true"
                                                     style="border-color: ${l.color}20;">
                                                    <div class="flex items-start gap-4">
                                                        <!-- Handle for drag -->
                                                        <div class="drag-handle cursor-grab active:cursor-grabbing pt-1">
                                                            <i class="fas fa-grip-vertical text-gray-400 text-xl"></i>
                                                        </div>
                                                        
                                                        <div class="flex-1">
                                                            <div class="flex items-center gap-3 mb-3">
                                                                <span class="px-2 py-1 text-xs font-bold rounded" style="background: ${l.color}20; color: ${l.color};">
                                                                    ${l.label}
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
                                                                ${c===0?"disabled":""}>
                                                                <i class="fas fa-arrow-up"></i>
                                                            </button>
                                                            <button onclick="Contractors.moveRequirementDown('${n.id}')" 
                                                                class="btn-icon btn-icon-info" 
                                                                title="\u0646\u0642\u0644 \u0644\u0623\u0633\u0641\u0644"
                                                                ${c===s.length-1?"disabled":""}>
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
        `},ensureApprovedTabEventListeners(){const t=(c,l)=>{const p=document.getElementById(c);!p||p.hasAttribute("data-listener-attached")||(p.setAttribute("data-listener-attached","true"),p.addEventListener("click",l))};t("export-approved-contractors-excel-btn",()=>this.exportApprovedEntitiesExcel()),t("export-approved-contractors-pdf-btn",()=>this.exportApprovedEntitiesPDF());const a=document.getElementById("import-approved-contractors-excel-btn"),e=document.getElementById("import-approved-contractors-input");a&&e&&!a.hasAttribute("data-listener-attached")&&(a.setAttribute("data-listener-attached","true"),a.addEventListener("click",()=>{try{e.value="",e.click()}catch{}}),e.hasAttribute("data-listener-attached")||(e.setAttribute("data-listener-attached","true"),e.addEventListener("change",c=>{const l=c.target?.files?.[0];l&&this.importApprovedEntitiesFromExcelFile(l).finally(()=>{try{c.target.value=""}catch{}})})));const r=document.getElementById("approved-contractors-search");r&&!r.hasAttribute("data-listener-attached")&&(r.setAttribute("data-listener-attached","true"),this.approvedFilters?.search&&(r.value=this.approvedFilters.search),r.addEventListener("input",c=>{const l=c.target.value||"";this.approvedFilters.search=l,this.updateApprovedFiltersMeta(),clearTimeout(this._approvedSearchFilterTimer),this._approvedSearchFilterTimer=setTimeout(()=>{this.currentTab==="approved"&&this.refreshApprovedEntitiesList()},180)})),t("approved-contractors-search-clear",()=>{const c=document.getElementById("approved-contractors-search");c&&(c.value=""),clearTimeout(this._approvedSearchFilterTimer),this.handleApprovedFilterChange("search","")});const o=document.getElementById("approved-contractors-status");o&&!o.hasAttribute("data-listener-attached")&&(o.setAttribute("data-listener-attached","true"),o.addEventListener("change",c=>{this.handleApprovedFilterChange("status",c.target.value||"")}));const i=document.getElementById("approved-contractors-type");i&&!i.hasAttribute("data-listener-attached")&&(i.setAttribute("data-listener-attached","true"),i.addEventListener("change",c=>{this.handleApprovedFilterChange("type",c.target.value||"")}));const s=document.getElementById("approved-contractors-validity");s&&!s.hasAttribute("data-listener-attached")&&(s.setAttribute("data-listener-attached","true"),s.addEventListener("change",c=>{this.handleApprovedFilterChange("validity",c.target.value||"")}));const n=document.getElementById("approved-contractors-activestate");n&&!n.hasAttribute("data-listener-attached")&&(n.setAttribute("data-listener-attached","true"),n.addEventListener("change",c=>{this.handleApprovedFilterChange("activeState",c.target.value||"")})),t("approved-contractors-reset",()=>this.resetApprovedFilters())},setupEventListeners(){const t=this._abortController?.signal;if(!t)return;this._eventListenersAttached=!0,this.ensureApprovedTabEventListeners();const a=document.getElementById("add-contractor-evaluation-btn");a&&a.addEventListener("click",()=>this.handleAddEvaluationClick(),{signal:t});const e=document.getElementById("contractor-evaluation-filter");e&&(this.currentEvaluationFilter&&(e.value=this.currentEvaluationFilter),e.addEventListener("change",s=>{this.currentEvaluationFilter=s.target.value||"",this.refreshEvaluationsList(this.currentEvaluationFilter)},{signal:t}));const r=document.getElementById("contractor-evaluation-settings-btn");r&&r.addEventListener("click",()=>this.openEvaluationSettings(),{signal:t});const o=document.getElementById("manage-requirements-btn");o&&o.addEventListener("click",()=>this.openRequirementsManagement(),{signal:t});const i=document.getElementById("send-approval-request-btn");i&&i.addEventListener("click",()=>this.showApprovalRequestForm(),{signal:t})},setupRealtimeListeners(){},ensureEvaluationsEventListeners(){const t=document.getElementById("add-contractor-evaluation-btn");t&&!t.hasAttribute("data-listener-attached")&&(t.setAttribute("data-listener-attached","true"),t.addEventListener("click",()=>this.handleAddEvaluationClick()));const a=document.getElementById("contractor-evaluation-settings-btn");a&&!a.hasAttribute("data-listener-attached")&&(a.setAttribute("data-listener-attached","true"),a.addEventListener("click",()=>this.openEvaluationSettings()));const e=document.getElementById("contractor-evaluation-filter");e&&!e.hasAttribute("data-listener-attached")&&(e.setAttribute("data-listener-attached","true"),this.currentEvaluationFilter&&(e.value=this.currentEvaluationFilter),e.addEventListener("change",r=>{this.currentEvaluationFilter=r.target.value||"",this.refreshEvaluationsList(this.currentEvaluationFilter)}))},handleAddEvaluationClick(){const t=this.getApprovedOptions(!0),a=AppState.appData.contractors||[],e=t.length>0?t:a.map(i=>({id:i.id,name:i.name||i.company||i.contractorName||""}));if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B.");return}const o=document.getElementById("contractor-evaluation-filter")?.value||"";if(o){this.showEvaluationForm(o);return}if(e.length===1){this.showEvaluationForm(e[0].id);return}this.showEvaluationContractorPicker()},showEvaluationContractorPicker(){const t=this.getApprovedOptions(!0),a=AppState.appData.contractors||[],e=t.length>0?t:a.map(i=>({id:i.id,name:i.name||i.company||i.contractorName||""}));if(e.length===0){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A \u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0633\u062C\u0644\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B.");return}const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                                ${e.map(i=>`
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
        `,document.body.appendChild(r),this.applyModuleI18n(r),r.querySelector("#contractor-evaluation-picker")?.addEventListener("submit",i=>{i.preventDefault();const n=r.querySelector("#contractor-evaluation-picker-select")?.value||"";if(!n){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648\u0644\u0627\u064B");return}r.remove(),this.showEvaluationForm(n)}),r.addEventListener("click",i=>{i.target===r&&r.remove()})},ensureEvaluationSetup(){let t=!1;Array.isArray(AppState.appData.contractorEvaluations)||(AppState.appData.contractorEvaluations=[],t=!0);const a=AppState.appData.contractorEvaluationCriteria;if(!Array.isArray(a)||a.length===0)AppState.appData.contractorEvaluationCriteria=CONTRACTOR_EVALUATION_DEFAULT_ITEMS.map((e,r)=>({id:`criteria_${r+1}`,label:e})),t=!0;else{const e=a.map((r,o)=>typeof r=="string"?(t=!0,{id:`criteria_${o+1}`,label:r.trim()}):{id:r.id||`criteria_${o+1}`,label:(r.label||r.title||"").trim()}).filter(r=>r.label);e.length!==a.length&&(t=!0),AppState.appData.contractorEvaluationCriteria=e}t&&(typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},getEvaluationCriteria(){return this.ensureEvaluationSetup(),(AppState.appData.contractorEvaluationCriteria||[]).map((t,a)=>({id:t.id||`criteria_${a+1}`,label:t.label||t.title||""})).filter(t=>t.label)},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)?Permissions.formSettingsState.sites.map(t=>({id:t.id,name:t.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(t=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)?DailyObservations.DEFAULT_SITES.map((t,a)=>({id:t.id||t.siteId||Utils.generateId("SITE"),name:t.name||t.title||t.label||`\u0645\u0648\u0642\u0639 ${a+1}`})):[]}catch(t){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0635\u0627\u0646\u0639:",t),[]}},getPlaceOptions(t){try{if(!t)return[];const a=String(t);if(typeof Permissions<"u"&&Permissions.formSettingsState&&Array.isArray(Permissions.formSettingsState.sites)){const e=Permissions.formSettingsState.sites.find(r=>String(r.id)===a);if(e&&Array.isArray(e.places))return e.places.map(r=>({id:r.id,name:r.name}))}if(Array.isArray(AppState.appData?.observationSites)){const e=AppState.appData.observationSites.find(r=>String(r.id||r.siteId)===a);if(e)return(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((o,i)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${i+1}`}))}if(typeof DailyObservations<"u"&&Array.isArray(DailyObservations.DEFAULT_SITES)){const e=DailyObservations.DEFAULT_SITES.find(r=>String(r.id||r.siteId)===a);if(e)return(Array.isArray(e.places)?e.places:Array.isArray(e.locations)?e.locations:Array.isArray(e.children)?e.children:Array.isArray(e.areas)?e.areas:[]).map((o,i)=>({id:o.id||o.placeId||o.value||Utils.generateId("PLACE"),name:o.name||o.placeName||o.title||o.label||o.locationName||`\u0645\u0643\u0627\u0646 ${i+1}`}))}return[]}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:",a),[]}},resolveEvaluationFactoryId(t){if(!t)return"";const a=t.factoryId||t.locationId;if(a)return String(a);const e=String(t.projectName||"").trim();if(!e)return"";const r=this.getSiteOptions().find(o=>o.name===e||String(o.id)===e);return r?String(r.id):""},resolveEvaluationSubLocationId(t,a){if(!t)return"";const e=t.subLocationId;if(e)return String(e);const r=String(t.location||"").trim();if(!r||!a)return"";const o=this.getPlaceOptions(a).find(i=>i.name===r||String(i.id)===r);return o?String(o.id):""},evaluationMatchesContractorFilter(t,a){if(!a)return!0;if(!t)return!1;if(t.contractorId===a)return!0;const r=(AppState.appData.approvedContractors||[]).find(i=>i.id===a||i.contractorId===a);if(r){if(t.contractorId===r.id||t.contractorId===r.contractorId)return!0;const i=String(t.contractorName||"").trim().toLowerCase(),s=String(r.companyName||"").trim().toLowerCase();if(i&&s&&i===s)return!0}const o=(AppState.appData.contractors||[]).find(i=>i.id===a);if(o){const i=String(t.contractorName||"").trim().toLowerCase(),s=String(o.name||o.company||o.contractorName||"").trim().toLowerCase();if(t.contractorId===o.id||i&&s&&i===s)return!0}return!1},formatEvaluationLocationDisplay(t){if(!t)return"";const a=t.projectName||"",e=t.location||"";return a&&e?`${a} \u2014 ${e}`:a||e||""},collectEvaluationLocationFromForm(t){const a=t?.querySelector("#contractor-evaluation-factory"),e=t?.querySelector("#contractor-evaluation-sub-location"),r=a?.value||"",o=e?.value||"",i=a?.options[a.selectedIndex],s=e?.options[e.selectedIndex];return{factoryId:r,locationId:r,projectName:i?.text?.trim()||"",subLocationId:o,location:s?.text?.trim()||""}},bindEvaluationLocationSelects(t){if(!t)return;const a=t.querySelector("#contractor-evaluation-factory"),e=t.querySelector("#contractor-evaluation-sub-location");if(!a||!e)return;const r=o=>{const i=a.value||"",s=o?e.value:"";e.innerHTML='<option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>',this.getPlaceOptions(i).forEach(n=>{const c=document.createElement("option");c.value=String(n.id),c.textContent=n.name,e.appendChild(c)}),s&&Array.from(e.options).some(n=>n.value===s)&&(e.value=s)};a.addEventListener("change",()=>r(!1)),a.value&&e.options.length<=1&&r(!0)},prepareApprovalRequestPayloadForBackend(t){const a=JSON.parse(JSON.stringify(t||{}));delete a._isPendingSync,delete a._syncError,delete a._syncErrorMessage,delete a.attachmentFiles;const e=AppState?.googleConfig?.sheets?.spreadsheetId;if(e&&String(e).trim()&&e!=="YOUR_SPREADSHEET_ID_HERE"&&(a.spreadsheetId=String(e).trim()),a.requestType==="evaluation"&&a.evaluationData&&typeof a.evaluationData=="object"){const r=a.evaluationData;Array.isArray(r.items)&&(r.totalItems=r.totalItems??r.items.length)}return a},parseEvaluationDataFromRequest(t){if(!t)return null;let a=t.evaluationData,e=0;for(;a&&typeof a=="string"&&e<3;)try{a=JSON.parse(a),e++}catch{break}(!a||typeof a!="object")&&(a={});let r=0;for(;a.items&&typeof a.items=="string"&&r<3;)try{a.items=JSON.parse(a.items),r++}catch{a.items=[];break}return Array.isArray(a.items)||(a.items=a.items?Object.values(a.items):[]),a.id=a.id||t.entityId||t.evaluationId||Utils.generateId("CTREVAL"),a.contractorId=a.contractorId||t.contractorId||"",a.contractorName=a.contractorName||t.contractorName||t.companyName||"",a.evaluationDate=a.evaluationDate||t.evaluationDate||new Date().toISOString(),a.evaluatorName=a.evaluatorName||t.evaluatorName||t.createdByName||"",a.projectName=a.projectName||t.projectName||"",a.location=a.location||t.location||"",a.compliantCount=a.compliantCount??t.compliantCount??0,a.totalItems=a.totalItems??t.totalItems??a.items.length,a.finalScore=a.finalScore??t.finalScore??null,a.finalRating=a.finalRating||t.finalRating||"",a.generalNotes=a.generalNotes||t.generalNotes||t.notes||"",a},collectEvaluationItems(t){if(!t||!document.contains(t))return[];try{return Array.from(t.querySelectorAll("tbody tr[data-criteria-id]")).map(a=>{if(!document.contains(a))return null;const e=a.getAttribute("data-criteria-id")||"",r=a.getAttribute("data-criteria-label")||"",o=a.querySelector('input[type="radio"]:checked'),i=o&&document.contains(o)?o.value:"",s=a.querySelector("textarea"),n=s&&document.contains(s)?s.value.trim():"";return{criteriaId:e,title:r,status:i,notes:n}}).filter(a=>a!==null)}catch(a){return Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A collectEvaluationItems:",a),[]}},calculateEvaluationSummary(t){const a=t.filter(s=>s.status==="compliant"||s.status==="non_compliant"),e=a.filter(s=>s.status==="compliant").length,r=a.length,o=r>0?Math.round(e/r*100):null,i=this.getFinalRating(o,r);return{compliantCount:e,totalItems:r,finalScore:o,finalRating:i}},bindEvaluationFormInteractions(t){if(!t)return;const a=()=>{if(!t||!document.contains(t)){Utils.safeLog("\u26A0\uFE0F updateSummary: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}const r=this.collectEvaluationItems(t),o=this.calculateEvaluationSummary(r),i=t.querySelector("#contractor-evaluation-compliant"),s=t.querySelector("#contractor-evaluation-total"),n=t.querySelector("#contractor-evaluation-final-score"),c=t.querySelector("#contractor-evaluation-final-rating");if(!i||!s||!n||!c){Utils.safeLog("\u26A0\uFE0F updateSummary: \u0628\u0639\u0636 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}if(i&&(i.value=o.compliantCount??0),s&&(s.value=o.totalItems??0),n&&(n.value=o.finalScore!==null?o.finalScore.toFixed(0)+"%":""),c&&(c.value=o.finalRating||""),i){const l=parseInt(i.value)||0;i.style.background=l>0?"#dcfce7":"#f1f5f9",i.style.borderColor=l>0?"#10b981":"#cbd5e1",i.style.color=l>0?"#059669":"#64748b"}if(n){const l=parseFloat(n.value)||0;let p="#f1f5f9",u="#cbd5e1",f="#64748b";l>=80?(p="#dcfce7",u="#10b981",f="#059669"):l>=60?(p="#fef3c7",u="#f59e0b",f="#d97706"):l>0&&(p="#fee2e2",u="#ef4444",f="#dc2626"),n.style.background=p,n.style.borderColor=u,n.style.color=f}if(c){const l=c.value.toLowerCase();let p="#f1f5f9",u="#cbd5e1",f="#64748b";l.includes("\u0645\u0645\u062A\u0627\u0632")||l.includes("excellent")?(p="#dcfce7",u="#10b981",f="#059669"):l.includes("\u062C\u064A\u062F")||l.includes("good")?(p="#dbeafe",u="#3b82f6",f="#1e40af"):l.includes("\u0645\u0642\u0628\u0648\u0644")||l.includes("acceptable")?(p="#fef3c7",u="#f59e0b",f="#d97706"):(l.includes("\u0636\u0639\u064A\u0641")||l.includes("poor"))&&(p="#fee2e2",u="#ef4444",f="#dc2626"),c.style.background=p,c.style.borderColor=u,c.style.color=f}},e=()=>{if(!(!t||!document.contains(t)))try{t.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(r=>{if(!document.contains(r))return;const o=r.closest("label"),i=r.closest("tr"),s=r.value==="compliant"&&r.checked,n=r.value==="non_compliant"&&r.checked;if(o&&document.contains(o))if(s){o.style.background="#dcfce7",o.style.border="2px solid #10b981";const c=o.querySelector("span");c&&(c.style.color="#059669")}else if(n){o.style.background="#fee2e2",o.style.border="2px solid #ef4444";const c=o.querySelector("span");c&&(c.style.color="#dc2626")}else{o.style.background="#f1f5f9",o.style.border="2px solid #cbd5e1";const c=o.querySelector("span");c&&(c.style.color="#64748b")}})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A updateRadioButtonStyles:",r)}};try{t.querySelectorAll('input[type="radio"][name^="criteria-"]').forEach(r=>{r.addEventListener("change",()=>{if(!t||!document.contains(t))return;const o=r.closest("tr");o&&document.contains(o)&&o.querySelectorAll('input[type="radio"]').forEach(i=>{if(!document.contains(i))return;const s=i.closest("label");if(s&&document.contains(s)&&!i.checked){s.style.background="#f1f5f9",s.style.border="2px solid #cbd5e1";const n=s.querySelector("span");n&&(n.style.color="#64748b")}}),e(),a()})})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F event listeners \u0644\u0631\u0627\u062F\u064A\u0648 buttons:",r)}try{t.querySelectorAll("label").forEach(r=>{if(!document.contains(r))return;const o=r.querySelector('input[type="radio"]');o&&document.contains(o)&&(r.addEventListener("mouseenter",()=>{!document.contains(r)||!document.contains(o)||o.checked||(r.style.transform="scale(1.05)",r.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)")}),r.addEventListener("mouseleave",()=>{!document.contains(r)||!document.contains(o)||o.checked||(r.style.transform="scale(1)",r.style.boxShadow="none")}))})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F hover effects:",r)}try{t.querySelectorAll(".form-input").forEach(r=>{document.contains(r)&&(r.addEventListener("focus",()=>{document.contains(r)&&(r.style.borderColor="#2563eb",r.style.boxShadow="0 0 0 3px rgba(37, 99, 235, 0.1)")}),r.addEventListener("blur",()=>{document.contains(r)&&(r.style.boxShadow="none")}))})}catch(r){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0639\u062F\u0627\u062F focus styles:",r)}e(),a()},showEvaluationForm(t,a=null,e=null){this.ensureEvaluationSetup();const r=AppState.appData.contractors||[];let o=r.find(b=>b.id===t)||null;if(!o){this.ensureApprovedSetup();const S=(AppState.appData.approvedContractors||[]).find(I=>I.id===t||I.contractorId===t);S&&(o={id:S.contractorId||S.id,name:S.companyName,company:S.companyName,contractorName:S.companyName,serviceType:S.serviceType,isFromApproved:!0})}if(!o&&a){const b=a.contractorId;if(b&&(o=r.find(S=>S.id===b)||null,!o)){this.ensureApprovedSetup();const I=(AppState.appData.approvedContractors||[]).find(L=>L.id===b||L.contractorId===b);I&&(o={id:I.contractorId||I.id,name:I.companyName,company:I.companyName,contractorName:I.companyName,serviceType:I.serviceType,isFromApproved:!0})}}if(!o&&a){const b=a.contractorId;if(b&&(o=r.find(S=>S.id===b)||null,!o)){this.ensureApprovedSetup();const I=(AppState.appData.approvedContractors||[]).find(L=>L.id===b||L.contractorId===b);I&&(o={id:I.contractorId||I.id,name:I.companyName,company:I.companyName,contractorName:I.companyName,serviceType:I.serviceType,isFromApproved:!0})}}if(!o&&!a){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=this.getEvaluationCriteria();if(i.length===0){Notification.error("\u0642\u0627\u0626\u0645\u0629 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}let s=a;if(a&&a.id){const b=this.getEvaluationWithItems(a.id);b&&(s=b)}const n=Array.isArray(s?.items)?s.items:[],c=new Map(n.map(b=>[(b.criteriaId||b.id||b.title||"").toString(),b])),l=i.map(b=>{const S=c.get(b.id)||c.get(b.label)||null;return{criteriaId:b.id,title:b.label,status:S?.status||"",notes:S?.notes||""}}),p=this.calculateEvaluationSummary(l),u=s?.evaluationDate?new Date(s.evaluationDate).toISOString().slice(0,10):new Date().toISOString().slice(0,10),f=s?.evaluatorName||AppState.currentUser?.name||"",d=s?.generalNotes||s?.notes||"",m=this.resolveEvaluationFactoryId(s),v=this.resolveEvaluationSubLocationId(s,m),h=this.getSiteOptions(),A=m?this.getPlaceOptions(m):[],y=e||s?.contractorName||o?.name||o?.company||o?.contractorName||"",w=document.createElement("div");w.className="modal-overlay",w.innerHTML=`
            <div class="modal-content" style="max-width: 95vw; width: 1400px; max-height: 95vh;">
                <div class="modal-header" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-bottom: none; padding: 1.75rem 2rem;">
                    <h2 class="modal-title" style="color: #ffffff; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem;">
                        <i class="fas fa-clipboard-check" style="font-size: 1.5rem;"></i>
                        ${a?"\u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644":"\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u062A\u0623\u0647\u064A\u0644\u0647"}
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
                                    <input type="text" class="form-input" value="${Utils.escapeHTML(y)}" readonly style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #475569; font-weight: 500;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645 <span style="color: #ef4444;">*</span></label>
                                    <input type="date" id="contractor-evaluation-date" class="form-input" required value="${u}" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645 <span style="color: #ef4444;">*</span></label>
                                    <input type="text" id="contractor-evaluation-evaluator" class="form-input" required value="${Utils.escapeHTML(f)}" placeholder="\u0627\u0633\u0645 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0630\u064A \u0642\u0627\u0645 \u0628\u0627\u0644\u062A\u0642\u064A\u064A\u0645" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                    <select id="contractor-evaluation-factory" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639</option>
                                        ${h.map(b=>`
                                            <option value="${Utils.escapeHTML(String(b.id))}" ${String(b.id)===String(m)?"selected":""}>${Utils.escapeHTML(b.name)}</option>
                                        `).join("")}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-800 mb-2" style="color: #334155; font-weight: 600;">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <select id="contractor-evaluation-sub-location" class="form-input" style="border: 1px solid #cbd5e1; transition: all 0.3s ease;">
                                        <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</option>
                                        ${A.map(b=>`
                                            <option value="${Utils.escapeHTML(String(b.id))}" ${String(b.id)===String(v)?"selected":""}>${Utils.escapeHTML(b.name)}</option>
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
                                        ${l.map((b,S)=>`
                                            <tr data-criteria-id="${b.criteriaId}" data-criteria-label="${Utils.escapeHTML(b.title).replace(/"/g,"&quot;")}" style="border-bottom: 1px solid #e2e8f0; transition: background-color 0.2s ease;" onmouseover="this.style.backgroundColor='#f8fafc'" onmouseout="this.style.backgroundColor='#ffffff'">
                                                <td style="padding: 1rem; text-align: center; font-weight: 600; color: #64748b; background: #f8fafc; border-right: 1px solid #e2e8f0;">${S+1}</td>
                                                <td style="padding: 1rem; text-align: right; color: #1e293b; font-weight: 500; border-right: 1px solid #e2e8f0;">${Utils.escapeHTML(b.title)}</td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${b.status==="compliant"?"background: #dcfce7; border: 2px solid #10b981;":"background: #f1f5f9; border: 2px solid #cbd5e1;"}">
                                                        <input type="radio" name="criteria-${S}" value="compliant" ${b.status==="compliant"?"checked":""} style="width: 20px; height: 20px; cursor: pointer; accent-color: #10b981;">
                                                        <span style="color: ${b.status==="compliant"?"#059669":"#64748b"}; font-weight: 600;">\u0645\u0637\u0627\u0628\u0642</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem; text-align: center; border-right: 1px solid #e2e8f0;">
                                                    <label class="inline-flex items-center justify-center gap-2" style="cursor: pointer; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.3s ease; ${b.status==="non_compliant"?"background: #fee2e2; border: 2px solid #ef4444;":"background: #f1f5f9; border: 2px solid #cbd5e1;"}">
                                                        <input type="radio" name="criteria-${S}" value="non_compliant" ${b.status==="non_compliant"?"checked":""} style="width: 20px; height: 20px; cursor: pointer; accent-color: #ef4444;">
                                                        <span style="color: ${b.status==="non_compliant"?"#dc2626":"#64748b"}; font-weight: 600;">\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642</span>
                                                    </label>
                                                </td>
                                                <td style="padding: 1rem;">
                                                    <textarea class="form-input" rows="2" placeholder="\u0623\u062F\u062E\u0644 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643 (\u0625\u0646 \u0648\u062C\u062F\u062A)" style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.75rem; width: 100%; resize: vertical; transition: all 0.3s ease;">${Utils.escapeHTML(b.notes||"")}</textarea>
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
                                ${a?"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0642\u064A\u064A\u0645":"\u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u064A\u064A\u0645"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(w),this.applyModuleI18n(w),this.bindEvaluationLocationSelects(w);let C=!1;const k=()=>{if(!C&&(C=!0,w&&document.contains(w)))try{w.remove()}catch(b){Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u0625\u0632\u0627\u0644\u0629 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",b);const S=w.parentNode;if(S)try{S.removeChild(w)}catch{}}},D=b=>{k(),typeof b=="function"&&setTimeout(b,0)},$=w.querySelector("#contractor-evaluation-form");$?.addEventListener("submit",b=>{b.preventDefault();try{const S=$.querySelector('button[type="submit"]');if(S?.disabled)return;const I=$.querySelector("#contractor-evaluation-date")?.value,L=$.querySelector("#contractor-evaluation-evaluator")?.value.trim();if(!I||!L){Notification.warning("\u064A\u0631\u062C\u0649 \u0627\u0633\u062A\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062A\u0642\u064A\u064A\u0645 (\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645)");return}const M=this.collectEvaluationItems($),R=this.calculateEvaluationSummary(M),T=this.collectEvaluationLocationFromForm($),g={id:s?.id||Utils.generateId("CTREVAL"),contractorId:o?.id||s?.contractorId||t,contractorName:y,evaluationDate:new Date(I).toISOString(),evaluatorName:L,factoryId:T.factoryId,locationId:T.locationId,projectName:T.projectName,subLocationId:T.subLocationId,location:T.location,generalNotes:$.querySelector("#contractor-evaluation-general-notes")?.value.trim()||"",items:M,compliantCount:R.compliantCount??0,totalItems:R.totalItems??0,finalScore:R.finalScore,finalRating:R.finalRating||"",isoCode:s?.isoCode||(typeof generateISOCode=="function"?generateISOCode("CTREV",AppState.appData.contractorEvaluations):""),createdAt:s?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),createdBy:s?.createdBy||AppState.currentUser?.id||"",updatedBy:AppState.currentUser?.id||""};if(!g.contractorId){Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0628\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0627\u0644\u0645\u0642\u0627\u0648\u0644.");return}S&&(S.disabled=!0);const x=this.isContractorApprovalAdminUser();if(s){if(!x){S&&(S.disabled=!1),Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}D(()=>{Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),this.persistEvaluation(g,s)})}else{const E={requestType:"evaluation",contractorId:g.contractorId,contractorName:g.contractorName,companyName:g.contractorName,evaluationData:g,status:"pending",createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""};this.ensureEvaluationApprovalRequestsSetup();const q="TEMP_"+Date.now()+"_"+Math.random().toString(36).substr(2,9);E.id=q,E._isPendingSync=!0,AppState.appData.contractorEvaluationApprovalRequests.push(E),D(()=>{Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D. \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645..."),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge(),this.syncEvaluationApprovalRequestToBackend(E,q).then(()=>{this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}).catch(_=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",_),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")})})}}catch(S){const I=$.querySelector('button[type="submit"]');I&&(I.disabled=!1),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",S),Notification.error("\u062A\u0639\u0630\u0631 \u062D\u0641\u0638 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+S.message)}}),w.addEventListener("click",b=>{b.target===w&&w.remove()}),this.bindEvaluationFormInteractions(w)},persistEvaluation(t,a=null,e={}){const r=e.skipAutoSave===!0;Array.isArray(AppState.appData.contractorEvaluations)||(AppState.appData.contractorEvaluations=[]);const o=t.id,i={id:o,contractorId:t.contractorId,contractorName:t.contractorName,evaluationDate:t.evaluationDate,evaluatorName:t.evaluatorName,projectName:t.projectName||"",location:t.location||"",factoryId:t.factoryId||t.locationId||"",locationId:t.locationId||t.factoryId||"",subLocationId:t.subLocationId||"",generalNotes:t.generalNotes||"",compliantCount:t.compliantCount??0,totalItems:t.totalItems??0,finalScore:t.finalScore,finalRating:t.finalRating||"",isoCode:t.isoCode||"",createdAt:t.createdAt||new Date().toISOString(),updatedAt:t.updatedAt||new Date().toISOString(),createdBy:t.createdBy||AppState.currentUser?.id||"",updatedBy:t.updatedBy||AppState.currentUser?.id||""};(a||e.replaceExisting)&&(AppState.appData.contractorEvaluations=AppState.appData.contractorEvaluations.filter(l=>l.id!==o&&l.evaluationId!==o));const s=Array.isArray(t.items)?t.items:[],n=new Date().toISOString(),c=AppState.currentUser?.id||"";s.forEach((l,p)=>{const u={...i,criteriaId:l.criteriaId||"",title:l.title||l.label||"",status:l.status||"",notes:l.notes||"",itemIndex:p+1,createdAt:a?l.createdAt||i.createdAt:n,updatedAt:n,createdBy:a?l.createdBy||i.createdBy:c,updatedBy:c,rowId:a&&l.rowId?l.rowId:Utils.generateId("CEVROW")};AppState.appData.contractorEvaluations.push(u)}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{r||GoogleIntegration.autoSave?.("ContractorEvaluations",AppState.appData.contractorEvaluations)}catch(l){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",l)}this.refreshEvaluationsList(this.currentEvaluationFilter||""),this.updateContractorEvaluationSummary(t.contractorId)},refreshEvaluationsList(t=""){const a=document.getElementById("contractor-evaluations-container");if(!a)return;const e=this.renderEvaluationsTable(t);this.safeSetInnerHTML(a,e)},openEvaluationHistory(t){if(!t)return;this.currentEvaluationFilter=t;const a=document.getElementById("contractor-evaluation-filter");a&&(a.value=t),this.refreshEvaluationsList(t);const e=document.getElementById("contractor-evaluation-card");e&&requestAnimationFrame(()=>{const r=window.scrollY;e.scrollIntoView({behavior:"smooth",block:"start"}),requestAnimationFrame(()=>{const o=window.scrollY;Math.abs(o-r)>window.innerHeight&&window.scrollTo({top:r,behavior:"auto"})})})},showEvaluationFormForApproved(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.ensureApprovedSetup();const e=(AppState.appData.approvedContractors||[]).find(i=>i.id===t);if(!e){Notification.error("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let r=e.contractorId,o=e.companyName||"";if(r){const s=(AppState.appData.contractors||[]).find(n=>n.id===r);s&&(o=s.name||s.company||o)}else{const s=(AppState.appData.contractors||[]).find(n=>n.name===e.companyName||n.approvedEntityId===t||n.company===e.companyName);s?(r=s.id,o=s.name||s.company||o):r=t}this.showEvaluationForm(r,null,o)},openEvaluationHistoryForApproved(t){if(!t){Notification.error("\u0645\u0639\u0631\u0641 \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F");return}this.ensureApprovedSetup();const e=(AppState.appData.approvedContractors||[]).find(o=>o.id===t);if(!e){Notification.error("\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629");return}let r=e.contractorId;if(!r){const i=(AppState.appData.contractors||[]).find(s=>s.name===e.companyName||s.approvedEntityId===t);if(i)r=i.id;else{Notification.warning("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0627\u0644\u0645\u0631\u062A\u0628\u0637. \u0633\u064A\u062A\u0645 \u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u0627\u0633\u0645.");const n=(AppState.appData.contractorEvaluations||[]).find(c=>c.contractorName===e.companyName);if(n&&n.contractorId)r=n.contractorId;else{Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647\u0630\u0647 \u0627\u0644\u062C\u0647\u0629");return}}}this.openEvaluationHistory(r),this.currentTab!=="evaluations"&&this.switchTab("evaluations")},renderEvaluationDetails(t){if(!t)return"";const a=o=>o==="compliant"?"\u0645\u0637\u0627\u0628\u0642":o==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"-";let e=[];Array.isArray(t.items)?e=t.items:t.items&&typeof t.items=="object"&&(e=Object.values(t.items)),e=e.filter(o=>{if(!o||typeof o!="object")return!1;const i=o.title||o.label||o.criteriaId,s=o.status&&(o.status==="compliant"||o.status==="non_compliant");return i||s});const r=e.length>0?e.map((o,i)=>{let s=o.title||o.label||"";if(!s&&o.criteriaId){const p=this.getEvaluationCriteria().find(u=>u.id===o.criteriaId);p&&(s=p.label||p.title||"")}s||(s=o.criteriaId||`\u0628\u0646\u062F ${i+1}`);const n=o.status||"",c=o.notes||"";return`
            <tr>
                <td>${i+1}</td>
                <td>${Utils.escapeHTML(s)}</td>
                <td>${a(n)}</td>
                <td>${Utils.escapeHTML(c)}</td>
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
        `},getEvaluationWithItems(t){const e=(AppState.appData.contractorEvaluations||[]).filter(c=>c.id===t||c.evaluationId===t);if(e.length===0)return null;const r=e[0];let o=r.finalScore;typeof o=="string"&&o!==""?(o=parseFloat(o),isNaN(o)&&(o=null)):typeof o!="number"&&(o=null);let i=r.compliantCount;typeof i=="string"&&(i=parseInt(i)||0);let s=r.totalItems;typeof s=="string"&&(s=parseInt(s)||0),o===null&&i>0&&s>0&&(o=Math.round(i/s*100));const n={id:r.id||r.evaluationId,contractorId:r.contractorId,contractorName:r.contractorName,evaluationDate:r.evaluationDate,evaluatorName:r.evaluatorName,projectName:r.projectName,location:r.location,generalNotes:r.generalNotes,compliantCount:i??0,totalItems:s??0,finalScore:o,finalRating:r.finalRating||"",isoCode:r.isoCode,createdAt:r.createdAt,updatedAt:r.updatedAt,createdBy:r.createdBy,updatedBy:r.updatedBy,items:[]};return e.forEach(c=>{(c.criteriaId||c.title)&&n.items.push({criteriaId:c.criteriaId,title:c.title,status:c.status,notes:c.notes})}),n},viewEvaluation(t){const a=this.getEvaluationWithItems(t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 900px;">
                <div class="modal-header">
                    <h2 class="modal-title"><i class="fas fa-clipboard-check ml-2"></i>\u062A\u0641\u0627\u0635\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${this.renderEvaluationDetails(a)}
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u063A\u0644\u0627\u0642</button>
                    <button class="btn-success" onclick="Contractors.exportEvaluationPDF('${a.id}')">
                        <i class="fas fa-file-pdf ml-2"></i>\u062A\u0635\u062F\u064A\u0631 PDF
                    </button>
                    ${Permissions.isAdmin()?`
                    <button class="btn-primary" onclick="Contractors.showEvaluationForm('${a.contractorId}', ${JSON.stringify(a).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(e),this.applyModuleI18n(e),e.addEventListener("click",r=>{r.target===e&&e.remove()})},exportEvaluationPDF(t){const a=this.getEvaluationWithItems(t);if(!a){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}try{Loading.show();const e=d=>d==="compliant"?"\u0645\u0637\u0627\u0628\u0642":d==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"-",r=`
                <table>
                    <tr><th>\u0627\u0644\u0645\u0642\u0627\u0648\u0644</th><td>${Utils.escapeHTML(a.contractorName||"")}</td></tr>
                    <tr><th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${a.evaluationDate?Utils.formatDate(a.evaluationDate):"-"}</td></tr>
                    <tr><th>\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0645</th><td>${Utils.escapeHTML(a.evaluatorName||"")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0635\u0646\u0639</th><td>${Utils.escapeHTML(a.projectName||"-")}</td></tr>
                    <tr><th>\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</th><td>${Utils.escapeHTML(a.location||"-")}</td></tr>
                    <tr><th>\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</th><td>${a.compliantCount??0}</td></tr>
                    <tr><th>\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0641\u0639\u0644\u064A\u0629</th><td>${a.totalItems??(Array.isArray(a.items)?a.items.length:a.items?Object.keys(a.items).length:0)}</td></tr>
                    <tr><th>\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</th><td>${typeof a.finalScore=="number"?a.finalScore.toFixed(0)+"%":"-"}</td></tr>
                    <tr><th>\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</th><td>${Utils.escapeHTML(a.finalRating||"")}</td></tr>
                </table>
            `;let o=[];Array.isArray(a.items)?o=a.items:a.items&&typeof a.items=="object"&&(o=Object.values(a.items)),o=o.filter(d=>{if(!d||typeof d!="object")return!1;const m=d.title||d.label||d.criteriaId,v=d.status&&(d.status==="compliant"||d.status==="non_compliant");return m||v});const i=o.length>0?`
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
                        ${o.map((d,m)=>{let v=d.title||d.label||"";if(!v&&d.criteriaId){const w=this.getEvaluationCriteria().find(C=>C.id===d.criteriaId);w&&(v=w.label||w.title||"")}v||(v=d.criteriaId||`\u0628\u0646\u062F ${m+1}`);const h=d.status||"",A=d.notes||"";return`
                            <tr>
                                <td>${m+1}</td>
                                <td>${Utils.escapeHTML(v)}</td>
                                <td>${e(h)}</td>
                                <td>${Utils.escapeHTML(A)}</td>
                            </tr>
                        `}).join("")}
                    </tbody>
                </table>
            `:'<div class="section-title">\u062A\u0641\u0627\u0635\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645</div><p class="text-gray-500 text-center py-4">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u0646\u0648\u062F \u0645\u0633\u062C\u0644\u0629</p>',s=a.generalNotes?`
                    <div class="section-title">\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0639\u0627\u0645\u0629</div>
                    <p>${Utils.escapeHTML(a.generalNotes)}</p>
                `:"",n=`
                <div class="section-title">\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645</div>
                ${r}
                ${s}
                ${i}
            `,c=a.isoCode||`CTREVAL-${a.id?.substring(0,6)||""}`,l=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(c,"\u0646\u0645\u0648\u0630\u062C \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",n,!1,!0,{version:"1.0",qrData:`contractor-evaluation:${a.id}`},a.createdAt,a.updatedAt):n,p=new Blob([l],{type:"text/html;charset=utf-8"}),u=URL.createObjectURL(p),f=window.open(u,"_blank");f?f.onload=()=>{setTimeout(()=>{f.print(),setTimeout(()=>{URL.revokeObjectURL(u)},1e3),Loading.hide()},500)}:(URL.revokeObjectURL(u),Loading.hide(),Notification.error("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0628\u0627\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u0644\u0637\u0628\u0627\u0639\u0629"))}catch(e){Loading.hide(),typeof url<"u"&&URL.revokeObjectURL(url),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",e),Notification.error("\u0641\u0634\u0644 \u0641\u064A \u062A\u0635\u062F\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+e.message)}},async requestDeleteEvaluation(t){if(t){if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.")?this.deleteEvaluation(t):void 0;Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.")}},deleteEvaluation(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629."))return;const a=AppState.appData.contractorEvaluations||[],e=a.filter(o=>o.id===t||o.evaluationId===t);if(e.length===0){Notification.error("\u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const r=e[0]?.contractorId;for(let o=a.length-1;o>=0;o--)(a[o].id===t||a[o].evaluationId===t)&&a.splice(o,1);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("ContractorEvaluations",AppState.appData.contractorEvaluations)}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u062A\u062D\u062F\u064A\u062B \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0641\u064A \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0633\u062D\u0627\u0628\u064A:",o)}this.refreshEvaluationsList(this.currentEvaluationFilter||""),this.updateContractorEvaluationSummary(r),Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D")},getFinalRating(t,a=0){return t===null||a===0?"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0639\u062F":t>=90?"\u0645\u0645\u062A\u0627\u0632":t>=75?"\u062C\u064A\u062F \u062C\u062F\u0627\u064B":t>=60?"\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u062A\u062D\u0633\u064A\u0646":"\u063A\u064A\u0631 \u0645\u0624\u0647\u0644"},openEvaluationSettings(){const t=AppState.currentUser;if(!t||t.role!=="admin"){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0645\u064A\u0632\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0641\u0642\u0637.");return}this.ensureEvaluationSetup();const a=this.getEvaluationCriteria(),e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
                            <textarea id="contractor-evaluation-settings-textarea" class="form-input" rows="12" placeholder="\u0623\u062F\u062E\u0644 \u0643\u0644 \u0628\u0646\u062F \u0641\u064A \u0633\u0637\u0631 \u062C\u062F\u064A\u062F">${a.map(o=>o.label).join("\\n")}</textarea>
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
        `,document.body.appendChild(e),this.applyModuleI18n(e),e.querySelector("#contractor-evaluation-settings-form")?.addEventListener("submit",o=>{o.preventDefault();const s=e.querySelector("#contractor-evaluation-settings-textarea")?.value||"";this.saveEvaluationCriteriaFromInput(s)&&(Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D"),e.remove())}),e.addEventListener("click",o=>{o.target===e&&e.remove()})},saveEvaluationCriteriaFromInput(t){const a=(t||"").split(`
`).map(e=>e.trim()).filter(Boolean);return a.length===0?(Notification.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062D\u0641\u0638 \u0642\u0627\u0626\u0645\u0629 \u0641\u0627\u0631\u063A\u0629. \u064A\u0631\u062C\u0649 \u0625\u0636\u0627\u0641\u0629 \u0628\u0646\u062F \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644."),!1):(AppState.appData.contractorEvaluationCriteria=a.map((e,r)=>({id:`criteria_${r+1}`,label:e})),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),this.ensureEvaluationSetup(),this.refreshEvaluationsList(this.currentEvaluationFilter||""),!0)},buildContractorEvaluationSummary(t){const a=(AppState.appData.contractorEvaluations||[]).filter(s=>s.contractorId===t).sort((s,n)=>new Date(n.evaluationDate||n.createdAt||0)-new Date(s.evaluationDate||s.createdAt||0));if(a.length===0)return'<div class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0642\u064A\u064A\u0645\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644.</div>';const e=a[0],r=typeof e.finalScore=="number"?e.finalScore:null,o=r===null?"badge-info":r>=90?"badge-success":r>=75?"badge-info":r>=60?"badge-warning":"badge-danger",i=Math.max(...a.map(s=>typeof s.finalScore=="number"?s.finalScore:0));return`
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm font-semibold text-gray-700">\u0622\u062E\u0631 \u062A\u0642\u064A\u064A\u0645</div>
                        <div class="text-sm text-gray-600">${e.evaluationDate?Utils.formatDate(e.evaluationDate):"-"}</div>
                    </div>
                    <div>
                        <span class="badge ${o}">
                            ${Utils.escapeHTML(e.finalRating||"")}
                        </span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A</div>
                        <div class="text-lg">${a.length}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0623\u0639\u0644\u0649 \u0646\u0633\u0628\u0629</div>
                        <div class="text-lg">${isFinite(i)?i.toFixed(0)+"%":"-"}</div>
                    </div>
                    <div class="p-2 border rounded bg-gray-50">
                        <div class="font-semibold text-gray-600">\u0622\u062E\u0631 \u0645\u0642\u064A\u0645</div>
                        <div>${Utils.escapeHTML(e.evaluatorName||"")}</div>
                    </div>
                </div>
                <button class="btn-secondary text-sm" onclick="Contractors.openEvaluationHistory('${t}')">
                    <i class="fas fa-clipboard-list ml-2"></i>
                    \u0639\u0631\u0636 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A
                </button>
            </div>
        `},updateContractorEvaluationSummary(t){if(!t)return;const a=this.safeGetElementById(`contractor-evaluation-summary-${t}`);if(!a)return;const e=this.buildContractorEvaluationSummary(t);this.safeSetInnerHTML(a,e)},async showContractorForm(t=null){const a=!!t,e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2 class="modal-title">${a?"\u062A\u0639\u062F\u064A\u0644 \u0645\u0642\u0627\u0648\u0644":"\u0625\u0636\u0627\u0641\u0629 \u0645\u0642\u0627\u0648\u0644 \u062C\u062F\u064A\u062F"}</h2>
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
                        
                        ${a?`
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
                                <i class="fas fa-save ml-2"></i>${a?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(e),this.applyModuleI18n(e);const r=e.querySelector("#contractor-form");r.addEventListener("submit",async o=>{o.preventDefault();const i=r?.querySelector('button[type="submit"]')||o.target?.querySelector('button[type="submit"]');if(i&&i.disabled)return;let s="";i&&(s=i.innerHTML,i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i> \u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');const n=t?.id||Utils.generateId("CONTRACTOR");let c=t?.code;c||(c=this.generateContractorCode());const l=document.getElementById("contractor-name"),p=document.getElementById("contractor-service-type"),u=document.getElementById("contractor-contract-number"),f=document.getElementById("contractor-start-date"),d=document.getElementById("contractor-end-date"),m=document.getElementById("contractor-status"),v=document.getElementById("contractor-contact-person"),h=document.getElementById("contractor-phone"),A=document.getElementById("contractor-email");if(!l||!p||!u||!f||!d||!m||!v||!h||!A){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649."),i&&(i.disabled=!1,i.innerHTML=s);return}const y={id:n,code:c,name:l.value.trim(),serviceType:p.value.trim(),contractNumber:u.value.trim(),startDate:new Date(f.value).toISOString(),endDate:new Date(d.value).toISOString(),status:m.value,contactPerson:v.value.trim(),phone:h.value.trim(),email:A.value.trim(),createdAt:t?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};t?.approvalRequirements&&(y.approvalRequirements=t.approvalRequirements),Loading.show();try{if(a){const w=AppState.appData.contractors.findIndex(C=>C.id===t.id);w!==-1&&(AppState.appData.contractors[w].approvalRequirements&&(y.approvalRequirements=AppState.appData.contractors[w].approvalRequirements),AppState.appData.contractors[w]=y),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),y.approvalRequirements&&this.updateContractorApprovalStatus(n),Loading.hide(),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),i&&(i.disabled=!1,i.innerHTML=s),e.remove(),this.load(!0)}else{const w={requestType:"contractor",companyName:y.name,serviceType:y.serviceType,licenseNumber:y.contractNumber,contactPerson:y.contactPerson,phone:y.phone,email:y.email,notes:`\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u062C\u062F\u064A\u062F: ${y.name}`,status:"pending",contractorData:y,createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""};this.ensureApprovalRequestsSetup();try{const C=await GoogleIntegration.sendRequest({action:"addContractorApprovalRequest",data:w});if(C&&C.success){const k=C.data?{...w,...C.data}:w;AppState.appData.contractorApprovalRequests.push(k),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D")}else AppState.appData.contractorApprovalRequests.push(w),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets\u060C \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637")}catch(C){AppState.appData.contractorApprovalRequests.push(w),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0641\u064A Google Sheets:",C)}Loading.hide(),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),i&&(i.disabled=!1,i.innerHTML=s),e.remove(),this.load(!0)}}catch(w){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+w.message),i&&(i.disabled=!1,i.innerHTML=s)}}),e.addEventListener("click",o=>{o.target===e&&e.remove()})},async viewContractor(t){const e=(AppState.appData.contractors||[]).find(o=>o.id===t);if(!e){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644");return}e.code||(e.code=this.generateContractorCode(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),GoogleIntegration.autoSave?.("Contractors",AppState.appData.contractors).catch(()=>{}));const r=document.createElement("div");r.className="modal-overlay",r.innerHTML=`
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
                    ${typeof EmailDispatch<"u"?EmailDispatch.renderFooterButtonHtml("contractors"):""}
                    <button class="btn-success" onclick="Contractors.showEvaluationForm('${e.id}'); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-clipboard-check ml-2"></i>
                        \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644
                    </button>
                    <button class="btn-primary" onclick="Contractors.showContractorForm(${JSON.stringify(e).replace(/"/g,"&quot;")}); this.closest('.modal-overlay').remove();">
                        <i class="fas fa-edit ml-2"></i>\u062A\u0639\u062F\u064A\u0644
                    </button>
                </div>
            </div>
        `,document.body.appendChild(r),typeof EmailDispatch<"u"&&EmailDispatch.bindFooterButtons(r,{moduleKey:"contractors",record:e,recordId:e.id||e.code||e.isoCode||""}),this.applyModuleI18n(r),r.addEventListener("click",o=>{o.target===r&&r.remove()})},async editContractor(t){const a=AppState.appData.contractors.find(e=>e.id===t);a&&await this.showContractorForm(a)},async requestDeleteContractor(t){if(!t)return;const a=AppState.appData.contractors.find(o=>o.id===t);if(!a){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(Permissions.isAdmin())return confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646. \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0647 \u0627\u0644\u0639\u0645\u0644\u064A\u0629.")?this.deleteContractor(t):void 0;if(!confirm("\u0633\u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0625\u0644\u0649 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645 \u0644\u0644\u0645\u0648\u0627\u0641\u0642\u0629. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u061F"))return;const e=AppState.currentUser,r={id:Utils.generateId("DELRQ"),requestType:"contractor",entityId:t,entityName:a.name||"",reason:prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:")||"\u0637\u0644\u0628 \u062D\u0630\u0641 \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",createdBy:e?.id||"",createdByName:e?.name||"",createdAt:new Date().toISOString(),status:"pending"};await this.submitDeletionRequest(r),this.refreshApprovalRequestsSection()},async deleteContractor(t){if(!t)return;if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u062D\u0630\u0641 \u0627\u0644\u0645\u0628\u0627\u0634\u0631");return}const a=AppState.appData.contractors||[],e=a.findIndex(i=>i.id===t);if(e===-1){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641\u0647 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0648\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646."))return;a.splice(e,1),AppState.appData.contractors=a;const r=AppState.appData.approvedContractors||[],o=r.findIndex(i=>i.contractorId===t||i.id===t);o!==-1&&(r.splice(o,1),AppState.appData.approvedContractors=r);try{Loading.show();const i=await GoogleIntegration.sendToAppsScript("deleteContractor",{contractorId:t});if(i.success)Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0646\u062C\u0627\u062D"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),this.load(!0);else throw new Error(i.message)}catch(i){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+i.message),this.load(!0)}finally{Loading.hide()}},ensureRequirementsSetup(){AppState.companySettings||(AppState.companySettings={}),Array.isArray(AppState.companySettings.contractorApprovalRequirements)||(AppState.companySettings.contractorApprovalRequirements=CONTRACTOR_APPROVAL_REQUIREMENTS_DEFAULT.map(t=>({...t})),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"))},getApprovalRequirements(t=null){this.ensureRequirementsSetup();let a=(AppState.companySettings.contractorApprovalRequirements||[]).slice().sort((e,r)=>(e.order||0)-(r.order||0));return t&&(a=a.filter(e=>(e.applicableTypes||["contractor","supplier"]).includes(t))),a.map(e=>({...e,category:e.category||"other",priority:e.priority||"medium",hasExpiry:e.hasExpiry||!1,expiryMonths:e.expiryMonths||12,description:e.description||"",applicableTypes:e.applicableTypes||["contractor","supplier"]}))},checkAllRequirementsMet(t){const a=this.getContractorById(t);if(!a)return Utils.safeWarn(`\u26A0\uFE0F \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0645\u0639\u0631\u0641 ${t} \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646`),!0;const e=this.getApprovalRequirements(),r=a.approvalRequirements||{};for(const o of e){if(!o.required)continue;const i=r[o.id];if(o.type==="document"){if(!i||!i.documentLink||!i.completed)return!1}else if(o.type==="checkbox"){if(!i||!i.completed)return!1}else if(o.type==="text"&&(!i||!i.value||!i.completed))return!1}return!0},getContractorRequirementsStatus(t){const a=(AppState.appData.contractors||[]).find(p=>p.id===t);if(!a)return{allMet:!1,completed:0,total:0,requirements:[],expiring:0,expired:0};const e=this.getApprovalRequirements(),r=a.approvalRequirements||{};let o=0,i=0;const s=e.map(p=>{const u=r[p.id];let f=!1,d=!1,m=!1;if(p.type==="document"){if(f=!!(u&&u.documentLink&&u.completed),p.hasExpiry&&u&&u.expiryDate){const v=new Date(u.expiryDate),A=Math.ceil((v-new Date)/(1e3*60*60*24));A<0?(m=!0,i++):A<=30&&(d=!0,o++)}}else p.type==="checkbox"?f=!!(u&&u.completed):p.type==="text"&&(f=!!(u&&u.value&&u.completed));return{id:p.id,label:p.label,type:p.type,required:p.required,completed:f,isExpiring:d,isExpired:m,expiryDate:u?.expiryDate||null,data:u||null}}),n=s.filter(p=>p.required).length,c=s.filter(p=>p.required&&p.completed&&!p.isExpired).length;return{allMet:c===n&&i===0,completed:c,total:n,requirements:s,expiring:o,expired:i}},getExpiringRequirements(t=null){const a=t?[(AppState.appData.contractors||[]).find(o=>o.id===t)].filter(Boolean):AppState.appData.contractors||[],e=[],r=new Date;return a.forEach(o=>{if(!o.approvalRequirements)return;this.getApprovalRequirements().forEach(s=>{if(s.type!=="document"||!s.hasExpiry)return;const n=o.approvalRequirements[s.id];if(!n||!n.expiryDate)return;const c=new Date(n.expiryDate),l=Math.ceil((c-r)/(1e3*60*60*24));l<=60&&e.push({contractorId:o.id,contractorName:o.name,requirementId:s.id,requirementLabel:s.label,expiryDate:n.expiryDate,daysUntilExpiry:l,isExpired:l<0,documentLink:n.documentLink,fileName:n.fileName})})}),e.sort((o,i)=>o.daysUntilExpiry-i.daysUntilExpiry)},renderRequirementsSummary(t){const a=this.getContractorRequirementsStatus(t);if(a.total===0)return'<div class="text-gray-500 text-sm">\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u062D\u062F\u062F\u0629</div>';const e=a.allMet?"bg-green-50":"bg-orange-50",r=a.allMet?"border-green-200":"border-orange-200",o=a.allMet?"text-green-800":"text-orange-800",i=a.allMet?"badge-success":"badge-warning",s=a.allMet?"\u2705 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0645\u0633\u062A\u0648\u0641\u0627\u0629":"\u26A0\uFE0F \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629";return`
            <div class="space-y-2">
                <div class="flex items-center justify-between p-2 ${e} border ${r} rounded">
                    <span class="text-sm font-semibold ${o}">
                        ${s}
                    </span>
                    <span class="badge ${i}">
                        ${a.completed} / ${a.total}
                    </span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                    ${a.requirements.filter(n=>n.required).map(n=>{const c=n.completed?"fas fa-check-circle text-green-600":"fas fa-times-circle text-red-600",l=n.completed?"text-green-700":"text-red-700";return`
                        <div class="flex items-center gap-2">
                            <i class="${c}"></i>
                            <span class="${l}">${Utils.escapeHTML(n.label)}</span>
                        </div>
                    `}).join("")}
                </div>
            </div>
        `},renderRequirementsSection(t){const a=t?(AppState.appData.contractors||[]).find(c=>c.id===t):null,e=a?.type||"contractor",r=this.getApprovalRequirements(e),o=a?.approvalRequirements||{},i=this.getContractorRequirementsStatus(t),s={};r.forEach(c=>{const l=c.category||"other";s[l]||(s[l]=[]),s[l].push(c)});const n=i.total>0?i.completed/i.total*100:0;return`
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
                ${Object.keys(s).map(c=>{const l=REQUIREMENT_CATEGORIES[c]||REQUIREMENT_CATEGORIES.other,p=s[c],u=p.filter(d=>{const m=o[d.id]||{};return d.type==="document"?!!(m&&m.documentLink&&m.completed):d.type==="checkbox"?!!(m&&m.completed):d.type==="text"?!!(m&&m.value&&m.completed):!1}).length,f=p.length>0?u/p.length*100:0;return`
                        <div class="requirement-category-section border-2 rounded-lg overflow-hidden" style="border-color: ${l.color}40;">
                            <!-- \u0631\u0623\u0633 \u0627\u0644\u0641\u0626\u0629 -->
                            <div class="p-4 bg-gradient-to-r" style="background: linear-gradient(135deg, ${l.color}15, ${l.color}05);">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="p-2 rounded-lg" style="background: ${l.color}20;">
                                            <i class="fas ${l.icon} text-xl" style="color: ${l.color};"></i>
                                        </div>
                                        <div>
                                            <h5 class="font-bold text-gray-800">${l.label}</h5>
                                            <p class="text-xs text-gray-600">${u} / ${p.length} \u0645\u0643\u062A\u0645\u0644</p>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-bold" style="color: ${l.color};">
                                            ${Math.round(f)}%
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div class="h-2 rounded-full transition-all" 
                                         style="width: ${f}%; background: ${l.color};"></div>
                                </div>
                            </div>
                            
                            <!-- \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0641\u0626\u0629 -->
                            <div class="p-4 space-y-3 bg-white">
                                ${p.map(d=>{const m=o[d.id]||{},v=m.completed||!1,h=REQUIREMENT_PRIORITIES[d.priority]||REQUIREMENT_PRIORITIES.medium;let A="";if(d.hasExpiry&&m.documentLink&&m.expiryDate){const w=new Date(m.expiryDate),k=Math.ceil((w-new Date)/(1e3*60*60*24));k<0?A='<span class="badge badge-danger text-xs"><i class="fas fa-exclamation-triangle ml-1"></i> \u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629</span>':k<=30&&(A=`<span class="badge badge-warning text-xs"><i class="fas fa-clock ml-1"></i> \u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ${k} \u064A\u0648\u0645</span>`)}let y="";return d.type==="document"?y=`
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
                                                        ${A}
                                                        <button onclick="Contractors.removeRequirementDocument('${t}', '${d.id}')" 
                                                            class="btn-icon btn-icon-danger btn-sm" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                `:""}
                                            </div>
                                        `:d.type==="checkbox"?y=`
                                            <label class="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                                                <input type="checkbox" 
                                                    id="req-${d.id}-checkbox" 
                                                    ${v?"checked":""}
                                                    onchange="Contractors.handleRequirementCheckboxChange('${t}', '${d.id}', this.checked)"
                                                    class="cursor-pointer">
                                                <span class="text-sm text-gray-700">\u062A\u0645 \u0627\u0644\u0627\u0633\u062A\u064A\u0641\u0627\u0621</span>
                                            </label>
                                        `:d.type==="text"&&(y=`
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
                                                        ${A}
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
                                            ${y}
                                        </div>
                                    `}).join("")}
                            </div>
                        </div>
                    `}).join("")}
            </div>
        `},async handleRequirementFileChange(t,a,e){if(!t||!a||!e){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}if(!e.files||e.files.length===0)return;const r=e.files[0],o=10*1024*1024;if(r.size>o){Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0645\u0644\u0641 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B. \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064A\u062C\u0627\u0628\u0627\u064A\u062A"),e.value="";return}Loading.show();try{const i=new FileReader;i.onload=async s=>{try{const n=s.target.result.split(",")[1],c=r.type,l=r.name,p=await GoogleIntegration.uploadFileToDrive(n,l,c,"Contractors");if(p&&p.success){const u=(AppState.appData.contractors||[]).find(f=>f.id===t);if(u){u.approvalRequirements||(u.approvalRequirements={});const d=this.getApprovalRequirements().find(h=>h.id===a);let m=null;if(d&&d.hasExpiry&&d.expiryMonths){const h=new Date;h.setMonth(h.getMonth()+d.expiryMonths),m=h.toISOString()}u.approvalRequirements[a]={completed:!0,documentLink:p.shareableLink||p.directLink,fileName:l,fileId:p.fileId,uploadedAt:new Date().toISOString(),expiryDate:m,expiryMonths:d?.expiryMonths||null},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),this.updateContractorApprovalStatus(t);const v=this.safeGetElementById("contractor-requirements-section");if(v){const h=this.renderRequirementsSection(t);this.safeSetInnerHTML(v,h)}Notification.success("\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F \u0628\u0646\u062C\u0627\u062D")}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")}else Notification.error("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F: "+(p?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(n){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0645\u0644\u0641:",n),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0631\u0641\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F: "+(n.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}finally{Loading.hide()}},i.onerror=()=>{Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641")},i.readAsDataURL(r)}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641:",i),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0644\u0641: "+(i.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}},async handleRequirementCheckboxChange(t,a,e){if(!t||!a){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}const r=(AppState.appData.contractors||[]).find(o=>o.id===t);if(r){r.approvalRequirements||(r.approvalRequirements={}),r.approvalRequirements[a]={completed:e,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors)}catch(i){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",i)}this.updateContractorApprovalStatus(t);const o=this.safeGetElementById("contractor-requirements-section");if(o){const i=this.renderRequirementsSection(t);this.safeSetInnerHTML(o,i)}}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async handleRequirementTextChange(t,a,e){if(!t||!a){Notification.error("\u0628\u064A\u0627\u0646\u0627\u062A \u063A\u064A\u0631 \u0643\u0627\u0645\u0644\u0629");return}const r=(AppState.appData.contractors||[]).find(o=>o.id===t);if(r){r.approvalRequirements||(r.approvalRequirements={});const o=(e||"").trim();r.approvalRequirements[a]={completed:o.length>0,value:o,updatedAt:new Date().toISOString()},typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors)}catch(s){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",s)}this.updateContractorApprovalStatus(t);const i=this.safeGetElementById("contractor-requirements-section");if(i){const s=this.renderRequirementsSection(t);this.safeSetInnerHTML(i,s)}}else Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F")},async removeRequirementDocument(t,a){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u061F"))return;const e=(AppState.appData.contractors||[]).find(r=>r.id===t);if(e&&e.approvalRequirements&&e.approvalRequirements[a]){delete e.approvalRequirements[a],typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("Contractors",AppState.appData.contractors),this.updateContractorApprovalStatus(t);const r=this.safeGetElementById("contractor-requirements-section");if(r){const o=this.renderRequirementsSection(t);this.safeSetInnerHTML(r,o)}Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F")}},updateContractorApprovalStatus(t){const a=(AppState.appData.contractors||[]).find(r=>r.id===t);if(!a)return;const e=this.checkAllRequirementsMet(t);if(e&&a.approvalStatus!=="approved"){a.approvalStatus="approved",a.approvedAt=new Date().toISOString(),this.ensureApprovedSetup();const r=AppState.appData.approvedContractors||[],o=a.name||"",i=o.trim().toLowerCase(),s=a.contractNumber?a.contractNumber.trim():"";if(!r.find(c=>!!(c.contractorId===t||c.companyName&&c.companyName.trim().toLowerCase()===i&&c.entityType==="contractor"||s&&c.licenseNumber&&c.licenseNumber.trim()===s))){let c=a.code||"";if(!c){const p=AppState.appData.contractors||[];let u=0;p.forEach(d=>{if(d.code){const m=d.code.match(/CON-(\d+)/);if(m){const v=parseInt(m[1],10);v>u&&(u=v)}}}),r.forEach(d=>{const m=d.isoCode||d.code;if(m){let v=m.match(/CON-(\d+)/);if(v){const h=parseInt(v[1],10);h>u&&(u=h)}if(v=m.match(/APP-(\d+)/),v){const h=parseInt(v[1],10);h>u&&(u=h)}}});const f=u+1;c=`CON-${String(f).padStart(3,"0")}`,a.code=c}const l={id:Utils.generateId("APPCON"),contractorId:t,companyName:o,entityType:"contractor",serviceType:a.serviceType||"",licenseNumber:a.contractNumber||"",approvalDate:new Date().toISOString(),expiryDate:a.endDate||"",safetyReviewer:a.contactPerson||"",status:"approved",notes:"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0633\u062A\u064A\u0641\u0627\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A",isoCode:c,code:c,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};r.push(l),AppState.appData.approvedContractors=r}}else!e&&a.approvalStatus==="approved"&&(a.approvalStatus="pending",a.approvedAt=null);typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{GoogleIntegration.autoSave?.("Contractors",AppState.appData.contractors),GoogleIntegration.autoSave?.("ApprovedContractors",AppState.appData.approvedContractors)}catch(r){Utils.safeWarn("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A:",r)}},openRequirementsManagement(){if(!(AppState.currentUser&&AppState.currentUser.role==="admin")){Notification.error("\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u0645\u062F\u064A\u0631 \u0641\u0642\u0637");return}this.ensureRequirementsSetup();const a=this.getApprovalRequirements(),e=document.createElement("div");e.className="modal-overlay",e.innerHTML=`
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
                        ${a.map((r,o)=>`
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
                                            ${o===a.length-1?"disabled":""}>
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
        `,document.body.appendChild(e),this.applyModuleI18n(e),e.addEventListener("click",r=>{r.target===e&&e.remove()})},addNewRequirement(){const t=document.getElementById("requirements-list");if(!t)return;let a=t.querySelector(".requirement-category-group");if(!a){const c=REQUIREMENT_CATEGORIES.other,l=`
                <div class="requirement-category-group" data-category="other">
                    <div class="flex items-center gap-3 mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div class="w-1 h-8 rounded" style="background: ${c.color};"></div>
                        <i class="fas ${c.icon} text-xl" style="color: ${c.color};"></i>
                        <h3 class="text-lg font-bold text-gray-800">${c.label}</h3>
                        <span class="badge badge-info">0 \u0627\u0634\u062A\u0631\u0627\u0637</span>
                    </div>
                    <div class="space-y-3 ml-6"></div>
                </div>
            `;t.insertAdjacentHTML("beforeend",l),a=t.querySelector(".requirement-category-group")}const e=a.querySelector(".space-y-3"),r=e.querySelectorAll(".requirement-item").length,o=`req_${Date.now()}`,i=REQUIREMENT_PRIORITIES.medium,s=`
            <div class="requirement-item p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-all cursor-move" 
                 data-requirement-id="${o}"
                 data-category="${a.getAttribute("data-category")}"
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
                                ${Object.values(REQUIREMENT_CATEGORIES).map(c=>`
                                    <option value="${c.id}" ${c.id===a.getAttribute("data-category")?"selected":""}>${c.label}</option>
                                `).join("")}
                            </select>
                            <select class="form-input text-sm" data-field="priority">
                                ${Object.values(REQUIREMENT_PRIORITIES).map(c=>`
                                    <option value="${c.id}" ${c.id==="medium"?"selected":""}>${c.label}</option>
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
        `;e.insertAdjacentHTML("beforeend",s);const n=a.querySelector(".badge");if(n){const c=e.querySelectorAll(".requirement-item").length;n.textContent=`${c} \u0627\u0634\u062A\u0631\u0627\u0637`}this.setupDragAndDropForItem(e.querySelector(`[data-requirement-id="${o}"]`))},setupDragAndDrop(){const t=document.getElementById("requirements-list");t&&t.querySelectorAll(".requirement-item").forEach(a=>{this.setupDragAndDropForItem(a)})},setupDragAndDropForItem(t){t&&(t.addEventListener("dragstart",a=>{a.dataTransfer.effectAllowed="move",a.dataTransfer.setData("text/html",t.outerHTML),a.dataTransfer.setData("text/plain",t.getAttribute("data-requirement-id")),t.classList.add("dragging")}),t.addEventListener("dragend",()=>{t.classList.remove("dragging")}),t.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move";const e=this.getDragAfterElement(t.parentElement,a.clientY),r=document.querySelector(".dragging");e==null?t.parentElement.appendChild(r):t.parentElement.insertBefore(r,e)}),t.addEventListener("drop",a=>{a.preventDefault(),this.saveRequirements()}))},getDragAfterElement(t,a){return[...t.querySelectorAll(".requirement-item:not(.dragging)")].reduce((r,o)=>{const i=o.getBoundingClientRect(),s=a-i.top-i.height/2;return s<0&&s>r.offset?{offset:s,element:o}:r},{offset:Number.NEGATIVE_INFINITY}).element},saveRequirements(){const t=document.getElementById("requirements-list");if(!t)return;const a=[];t.querySelectorAll(".requirement-category-group").forEach(i=>{i.querySelectorAll(".requirement-item").forEach(s=>{a.push(s)})});const e=a.map((i,s)=>{const n=i.getAttribute("data-requirement-id"),c=i.querySelector('[data-field="label"]'),l=i.querySelector('[data-field="type"]'),p=i.querySelector('[data-field="required"]'),u=i.querySelector('[data-field="category"]'),f=i.querySelector('[data-field="priority"]'),d=i.querySelector('[data-field="hasExpiry"]'),m=i.querySelector('[data-field="expiryMonths"]'),v=i.querySelector('[data-field="description"]');return{id:n,label:c?.value.trim()||"",type:l?.value||"document",required:p?.checked||!1,order:s+1,category:u?.value||"other",priority:f?.value||"medium",hasExpiry:d?.checked||!1,expiryMonths:d?.checked?parseInt(m?.value||12):null,description:v?.value.trim()||"",applicableTypes:["contractor","supplier"]}}).filter(i=>i.label.length>0);if(e.length===0){Notification.warning("\u064A\u062C\u0628 \u0625\u0636\u0627\u0641\u0629 \u0627\u0634\u062A\u0631\u0627\u0637 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644");return}this.ensureRequirementsSetup(),AppState.companySettings.contractorApprovalRequirements=e,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),Notification.success(`\u062A\u0645 \u062D\u0641\u0638 ${e.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0628\u0646\u062C\u0627\u062D`);const r=this.safeGetElementById("contractors-requirements-content");r&&this.currentTab==="requirements"&&this.renderRequirementsManagementSection().then(i=>{this.safeSetInnerHTML(r,i)&&this.setupDragAndDrop()});const o=document.querySelector(".modal-overlay");o&&o.remove()},moveRequirementUp(t){const a=document.getElementById("requirements-list");if(!a)return;const e=Array.from(a.children),r=e.findIndex(o=>o.getAttribute("data-requirement-id")===t);if(r>0){const o=e[r],i=e[r-1];a.insertBefore(o,i)}},moveRequirementDown(t){const a=document.getElementById("requirements-list");if(!a)return;const e=Array.from(a.children),r=e.findIndex(o=>o.getAttribute("data-requirement-id")===t);if(r<e.length-1){const o=e[r],i=e[r+1];a.insertBefore(o,i.nextSibling)}},deleteRequirement(t){if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u061F"))return;const a=document.getElementById("requirements-list");if(!a)return;const e=a.querySelector(`[data-requirement-id="${t}"]`);e&&e.remove()},filterRequirementsByCategory(t){document.querySelectorAll(".requirement-category-filter").forEach(a=>{a.classList.remove("active"),a.getAttribute("data-category")===t&&a.classList.add("active")}),document.querySelectorAll(".requirement-category-group").forEach(a=>{t==="all"||a.getAttribute("data-category")===t?(a.style.display="block",a.style.animation="fadeIn 0.3s ease-in"):a.style.display="none"})},toggleExpiryFields(t){const a=t.closest(".requirement-item");if(!a)return;const e=a.querySelector(".expiry-fields");if(e)if(t.checked){e.style.display="block";const r=e.querySelector("input");r&&(r.value=r.value||"12")}else e.style.display="none"},exportRequirementsTemplate(){this.ensureRequirementsSetup();const t=this.getApprovalRequirements();if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u064B\u0627.");return}const a=t.map((s,n)=>({\u0627\u0644\u062A\u0631\u062A\u064A\u0628:Number(s.order)||n+1,"\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637":s.id||"","\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637":s.label||"",\u0627\u0644\u0648\u0635\u0641:s.description||"","\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644":s.type||"document",\u0627\u0644\u0641\u0626\u0629:(REQUIREMENT_CATEGORIES[s.category]||REQUIREMENT_CATEGORIES.other).label,\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629:(REQUIREMENT_PRIORITIES[s.priority]||REQUIREMENT_PRIORITIES.medium).label,\u0625\u0644\u0632\u0627\u0645\u064A:s.required===!1?"\u0644\u0627":"\u0646\u0639\u0645","\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621":s.hasExpiry?"\u0646\u0639\u0645":"\u0644\u0627","\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0628\u0627\u0644\u0623\u0634\u0647\u0631":s.hasExpiry?Number(s.expiryMonths)||12:"","\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649":Array.isArray(s.applicableTypes)&&s.applicableTypes.length===1?s.applicableTypes[0]==="supplier"?"\u0645\u0648\u0631\u062F":"\u0645\u0642\u0627\u0648\u0644":"\u0645\u0642\u0627\u0648\u0644 \u0648\u0645\u0648\u0631\u062F"})),e=XLSX.utils.book_new(),r=XLSX.utils.json_to_sheet(a);r["!cols"]=[{wch:10},{wch:20},{wch:45},{wch:55},{wch:16},{wch:27},{wch:14},{wch:12},{wch:18},{wch:24},{wch:18}],r["!autofilter"]={ref:r["!ref"]||"A1:K1"},XLSX.utils.book_append_sheet(e,r,"\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A");const o=[["\u062F\u0644\u064A\u0644 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0642\u0627\u0644\u0628 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646"],["\u0627\u0644\u062D\u0642\u0644","\u0627\u0644\u0642\u064A\u0645 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0629 / \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A"],["\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0625\u0644\u0632\u0627\u0645\u064A\u060C \u0648\u0644\u0627 \u064A\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0635\u0641 \u0628\u062F\u0648\u0646\u0647"],["\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","document \u0623\u0648 text \u0623\u0648 checkbox"],["\u0627\u0644\u0641\u0626\u0629",Object.values(REQUIREMENT_CATEGORIES).map(s=>`${s.label} (${s.id})`).join("\u060C ")],["\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629",Object.values(REQUIREMENT_PRIORITIES).map(s=>`${s.label} (${s.id})`).join("\u060C ")],["\u0625\u0644\u0632\u0627\u0645\u064A / \u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621","\u0646\u0639\u0645 \u0623\u0648 \u0644\u0627"],["\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649","\u0645\u0642\u0627\u0648\u0644\u060C \u0645\u0648\u0631\u062F\u060C \u0623\u0648 \u0645\u0642\u0627\u0648\u0644 \u0648\u0645\u0648\u0631\u062F"],["\u0645\u0644\u0627\u062D\u0638\u0629","\u0644\u0627 \u062A\u063A\u064A\u0651\u0631 \u0623\u0633\u0645\u0627\u0621 \u0623\u0639\u0645\u062F\u0629 \u0648\u0631\u0642\u0629 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A. \u064A\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0635\u0641\u0648\u0641 \u062C\u062F\u064A\u062F\u0629 \u0623\u0648 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629."]],i=XLSX.utils.aoa_to_sheet(o);i["!cols"]=[{wch:28},{wch:100}],i["!merges"]=[{s:{r:0,c:0},e:{r:0,c:1}}],XLSX.utils.book_append_sheet(e,i,"\u062F\u0644\u064A\u0644 \u0627\u0644\u0642\u064A\u0645"),e.Workbook=e.Workbook||{},e.Workbook.Views=[{RTL:!0}],XLSX.writeFile(e,`\u0642\u0627\u0644\u0628_\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A_\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646_${new Date().toISOString().slice(0,10)}.xlsx`),Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0642\u0627\u0644\u0628 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0628\u0635\u064A\u063A\u0629 Excel \u0628\u0646\u062C\u0627\u062D")},getRequirementImportCell(t,...a){return this.getApprovedImportCell(t,...a)},parseRequirementImportBoolean(t,a=!1){if(typeof t=="boolean")return t;if(typeof t=="number")return t!==0;const e=String(t??"").trim().toLowerCase();return e?["\u0646\u0639\u0645","yes","true","1","\u0625\u0644\u0632\u0627\u0645\u064A"].includes(e):a},mapRequirementImportOption(t,a,e){const r=String(t??"").trim().toLowerCase();if(!r)return e;const o=Object.values(a).find(i=>i.id.toLowerCase()===r||i.label.toLowerCase()===r);return o?o.id:e},importRequirementsTemplate(){if(typeof XLSX>"u"){Notification.error("\u0645\u0643\u062A\u0628\u0629 Excel \u063A\u064A\u0631 \u0645\u062D\u0645\u0651\u0644\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u062B\u0645 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u062C\u062F\u062F\u064B\u0627.");return}const t=document.createElement("input");t.type="file",t.accept=".xlsx,.xls",t.onchange=async a=>{const e=a.target.files[0];if(e)try{const r=await e.arrayBuffer(),o=XLSX.read(r,{type:"array",cellDates:!0}),i=o.Sheets[o.SheetNames[0]];if(!i){Notification.error("\u0645\u0644\u0641 Excel \u0644\u0627 \u064A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0648\u0631\u0642\u0629 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A");return}const n=XLSX.utils.sheet_to_json(i,{defval:"",raw:!0}).map((c,l)=>{const p=String(this.getRequirementImportCell(c,"\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","label","name")).trim();if(!p)return null;const u=String(this.getRequirementImportCell(c,"\u064A\u0646\u0637\u0628\u0642 \u0639\u0644\u0649","applicableTypes")).trim().toLowerCase(),f=u==="\u0645\u0648\u0631\u062F"||u==="supplier"?["supplier"]:u==="\u0645\u0642\u0627\u0648\u0644"||u==="contractor"?["contractor"]:["contractor","supplier"],d=this.parseRequirementImportBoolean(this.getRequirementImportCell(c,"\u0644\u0647 \u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621","hasExpiry"),!1);return{id:String(this.getRequirementImportCell(c,"\u0645\u0639\u0631\u0641 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637","\u0627\u0644\u0645\u0639\u0631\u0641","id")).trim()||`req_${Date.now()}_${l}`,label:p,description:String(this.getRequirementImportCell(c,"\u0627\u0644\u0648\u0635\u0641","description")).trim(),type:["document","text","checkbox"].includes(String(this.getRequirementImportCell(c,"\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","type")).trim().toLowerCase())?String(this.getRequirementImportCell(c,"\u0646\u0648\u0639 \u0627\u0644\u062D\u0642\u0644","type")).trim().toLowerCase():"document",category:this.mapRequirementImportOption(this.getRequirementImportCell(c,"\u0627\u0644\u0641\u0626\u0629","category"),REQUIREMENT_CATEGORIES,"other"),priority:this.mapRequirementImportOption(this.getRequirementImportCell(c,"\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629","priority"),REQUIREMENT_PRIORITIES,"medium"),required:this.parseRequirementImportBoolean(this.getRequirementImportCell(c,"\u0625\u0644\u0632\u0627\u0645\u064A","\u0645\u0637\u0644\u0648\u0628","required"),!0),hasExpiry:d,expiryMonths:d?Math.max(1,Number(this.getRequirementImportCell(c,"\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 \u0628\u0627\u0644\u0623\u0634\u0647\u0631","expiryMonths"))||12):12,applicableTypes:f,order:Number(this.getRequirementImportCell(c,"\u0627\u0644\u062A\u0631\u062A\u064A\u0628","order"))||l+1}}).filter(Boolean).sort((c,l)=>c.order-l.order).map((c,l)=>({...c,order:l+1}));if(!n.length){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0635\u0627\u0644\u062D\u0629. \u062A\u0623\u0643\u062F \u0645\u0646 \u0648\u062C\u0648\u062F \u0639\u0645\u0648\u062F \xAB\u0627\u0633\u0645 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\xBB.");return}if(!confirm(`\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 ${n.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0635\u0627\u0644\u062D. \u0647\u0644 \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629\u061F`))return;if(this.ensureRequirementsSetup(),AppState.companySettings.contractorApprovalRequirements=n,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.success(`\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F ${n.length} \u0627\u0634\u062A\u0631\u0627\u0637 \u0645\u0646 Excel \u0628\u0646\u062C\u0627\u062D`),this.currentTab==="requirements"){const c=this.safeGetElementById("contractors-requirements-content");c&&this.renderRequirementsManagementSection().then(l=>{this.safeSetInnerHTML(c,l)})}}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0644\u0628:",r),Notification.error("\u0641\u0634\u0644 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0642\u0627\u0644\u0628: "+r.message)}},t.click()},bulkEditRequirements(){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
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
                                ${Object.values(REQUIREMENT_CATEGORIES).map(a=>`
                                    <option value="${a.id}">${a.label}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0637\u0627\u062A \u0627\u0644\u0645\u062D\u062F\u062F\u0629:</label>
                            <select id="bulk-priority" class="form-input">
                                <option value="">\u0644\u0627 \u062A\u063A\u064A\u064A\u0631</option>
                                ${Object.values(REQUIREMENT_PRIORITIES).map(a=>`
                                    <option value="${a.id}">${a.label}</option>
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
        `,document.body.appendChild(t),this.applyModuleI18n(t),setTimeout(()=>{const a=document.getElementById("bulk-has-expiry"),e=document.getElementById("bulk-expiry-months-container");a&&e&&a.addEventListener("change",r=>{e.style.display=r.target.checked?"block":"none"})},100)},applyBulkEdit(){const t=document.getElementById("requirements-list");if(!t)return;const a=document.getElementById("bulk-category")?.value,e=document.getElementById("bulk-priority")?.value,r=document.getElementById("bulk-required")?.checked,o=document.getElementById("bulk-has-expiry")?.checked,i=document.getElementById("bulk-expiry-months")?.value,s=t.querySelectorAll(".requirement-item");let n=0;s.forEach(c=>{if(a){const l=c.querySelector('[data-field="category"]');l&&(l.value=a)}if(e){const l=c.querySelector('[data-field="priority"]');l&&(l.value=e)}if(r!==void 0){const l=c.querySelector('[data-field="required"]');l&&(l.checked=r)}if(o!==void 0){const l=c.querySelector('[data-field="hasExpiry"]');if(l&&(l.checked=o,this.toggleExpiryFields(l),o&&i)){const p=c.querySelector('[data-field="expiryMonths"]');p&&(p.value=i)}}n++}),Notification.success(`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B ${n} \u0627\u0634\u062A\u0631\u0627\u0637`),document.querySelector(".modal-overlay")?.remove()},ensureData(){if(!AppState){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F AppState \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const t=AppState.appData||{};let a=!1;if(Array.isArray(t.contractorApprovalRequests)||(t.contractorApprovalRequests=[],a=!0),Array.isArray(t.contractorDeletionRequests)||(t.contractorDeletionRequests=[],a=!0),Array.isArray(t.contractorEvaluationApprovalRequests)||(t.contractorEvaluationApprovalRequests=[],a=!0),Array.isArray(t.approvedContractors)||(t.approvedContractors=[],a=!0),Array.isArray(t.contractorEvaluations)||(t.contractorEvaluations=[],a=!0),Array.isArray(t.contractors)||(t.contractors=[],a=!0),AppState.appData=t,a&&typeof window.DataManager<"u"&&window.DataManager.save)try{window.DataManager.save()}catch(e){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062D\u0644\u064A\u0629 \u0639\u0646\u062F \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",e)}},ensureApprovalRequestsSetup(){this.ensureData()},ensureDeletionRequestsSetup(){this.ensureData()},ensureEvaluationApprovalRequestsSetup(){this.ensureData(),this.migrateLegacyEvaluationApprovalRequestsLocally_()},migrateLegacyEvaluationApprovalRequestsLocally_(){if(!AppState?.appData)return;const t=AppState.appData.contractorApprovalRequests;if(!Array.isArray(t))return;Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)||(AppState.appData.contractorEvaluationApprovalRequests=[]);const a=AppState.appData.contractorEvaluationApprovalRequests,e=new Set(a.map(o=>o&&o.id).filter(Boolean)),r=t.filter(o=>o&&String(o.requestType||"").trim()==="evaluation");r.length&&(r.forEach(o=>{!o.id||e.has(o.id)||(a.push({...o,requestType:"evaluation"}),e.add(o.id))}),AppState.appData.contractorApprovalRequests=t.filter(o=>!o||String(o.requestType||"").trim()!=="evaluation"))},findEvaluationApprovalRequest(t){this.ensureEvaluationApprovalRequestsSetup();const a=String(t||"").trim();return a&&(AppState.appData.contractorEvaluationApprovalRequests||[]).find(e=>e?String(e.id||"").trim()===a?!0:String(e.legacyTempId||e._tempId||"").trim()===a:!1)||null},mergeEvaluationApprovalRequestsWithLocalOnly(t,a){const e=Array.isArray(t)?t:[],r=Array.isArray(a)?a:[],o=new Set(e.map(s=>s&&String(s.id||"").trim()).filter(Boolean)),i=r.filter(s=>{if(!s)return!1;const n=String(s.id||"").trim();return n?!o.has(n):!1});return[...e,...i]},async fetchEvaluationApprovalRequestsFromBackend(){try{this.ensureEvaluationApprovalRequestsSetup();const t=Array.isArray(AppState.appData.contractorEvaluationApprovalRequests)?AppState.appData.contractorEvaluationApprovalRequests.slice():[];if(typeof GoogleIntegration>"u")return!1;const a=await GoogleIntegration.sendRequest({action:"getAllContractorEvaluationApprovalRequests",data:{forceRefresh:!0,skipCache:!0}});if(a?.success&&Array.isArray(a.data))return AppState.appData.contractorEvaluationApprovalRequests=this.mergeEvaluationApprovalRequestsWithLocalOnly(a.data,t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),!0;t.length>0&&typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645 \u0641\u0634\u0644 \u0623\u0648 \u0641\u0627\u0631\u063A \u2014 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0640 "+t.length+" \u0637\u0644\u0628 \u0645\u062D\u0644\u064A")}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062C\u0644\u0628 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",t)}return!1},async syncPendingEvaluationApprovalRequests(t){this.ensureEvaluationApprovalRequestsSetup();const a=t?String(t).trim():"",r=(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(s=>{if(!s)return!1;const n=String(s.id||"").trim();if(a){const c=String(s.legacyTempId||s._tempId||"").trim();if(n!==a&&c!==a)return!1}return s._isPendingSync||n.startsWith("TEMP_")||s._syncError});if(!r.length)return{synced:0,failed:0};let o=0,i=0;for(const s of r){const n=String(s.id||"").startsWith("TEMP_")?s.id:s.legacyTempId||s._tempId||s.id;try{await this.syncEvaluationApprovalRequestToBackend(s,n),o++}catch{i++}}return(o||i)&&(this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()),{synced:o,failed:i}},ensureEvaluationApprovalRequestsDataLoaded(t={}){const a=t.force===!0,e=3e4,r=Date.now();return!a&&this._evaluationApprovalRequestsLastLoadAt&&r-this._evaluationApprovalRequestsLastLoadAt<e?Promise.resolve(!1):this._evaluationApprovalRequestsSyncInFlight?this._evaluationApprovalRequestsSyncInFlight:typeof GoogleIntegration<"u"&&typeof GoogleIntegration.sendRequest=="function"&&typeof GoogleIntegration._isBackendRpcConfigured=="function"&&GoogleIntegration._isBackendRpcConfigured()?(this.ensureEvaluationApprovalRequestsSetup(),this._evaluationApprovalRequestsSyncInFlight=this.syncPendingEvaluationApprovalRequests().then(()=>this.fetchEvaluationApprovalRequestsFromBackend()).then(i=>(i&&(this._evaluationApprovalRequestsLastLoadAt=Date.now()),i)).catch(i=>(typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",i),!1)).finally(()=>{this._evaluationApprovalRequestsSyncInFlight=null}),this._evaluationApprovalRequestsSyncInFlight):Promise.resolve(!1)},getMyEvaluationApprovalRequests(){this.ensureEvaluationApprovalRequestsSetup();const t=AppState.currentUser||{},a=String(t.id||"").trim(),e=String(t.email||"").trim().toLowerCase();return!a&&!e?[]:(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(r=>r&&this.isCurrentUserApprovalRequestOwner(r)).map(r=>({...r,requestType:"evaluation",requestCategory:"evaluation_approval"}))},getPendingEvaluationApprovalRequests(){return this.ensureEvaluationApprovalRequestsSetup(),this.isContractorApprovalAdminUser()?(AppState.appData.contractorEvaluationApprovalRequests||[]).filter(t=>{if(!t||!this.isApprovalRequestPendingForReview(t)||this.isCurrentUserApprovalRequestOwner(t))return!1;const a=String(t.id||"").trim();return!(t._isPendingSync||a.startsWith("TEMP_"))}).map(t=>({...t,requestType:"evaluation",requestCategory:"evaluation_approval"})):[]},refreshEvaluationApprovalRequestsSection(){if(!(this.currentTab!=="evaluations"&&this.currentTab!=="approval-request"))try{const t=document.getElementById("my-evaluation-approval-requests-container"),a=document.getElementById("pending-evaluation-approval-requests-container"),e=document.getElementById("pending-evaluation-approval-admin-container");if(t&&(t.innerHTML=this.renderApprovalRequestsTable(this.getMyEvaluationApprovalRequests(),!1)),this.isContractorApprovalAdminUser()){const r=this.getPendingEvaluationApprovalRequests();a&&(a.innerHTML=this.renderApprovalRequestsTable(r,!0)),e&&(e.innerHTML=this.renderApprovalRequestsTable(r,!0))}}catch(t){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0637\u0644\u0628\u0627\u062A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",t)}},async submitDeletionRequest(t){this.ensureDeletionRequestsSetup(),AppState.appData.contractorDeletionRequests.push(t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{const a=await GoogleIntegration.callBackend("addContractorDeletionRequest",t);return a&&a.success?(Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645."),!0):(Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A."),!1)}catch(a){return Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",a),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0639\u0646\u062F \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A."),!1}},renderApprovalRequestSection(){if(this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),!AppState||!AppState.appData)return this.renderApprovalRequestSectionPlaceholder();const t=this.isContractorApprovalAdminUser();let a=[],e=[];try{Array.isArray(AppState.appData.contractorApprovalRequests)&&Array.isArray(AppState.appData.contractorDeletionRequests)&&(a=this.getMyApprovalRequests())}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A\u064A:",r),a=[]}if(t)try{Array.isArray(AppState.appData.contractorApprovalRequests)&&Array.isArray(AppState.appData.contractorDeletionRequests)&&(e=this.getPendingApprovalRequests())}catch(r){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:",r),e=[]}return`
            <div class="content-card contractors-workflow-card">
                <div class="card-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <h2 class="card-title"><i class="fas fa-paper-plane ml-2"></i>\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0645\u0642\u062F\u0645 \u062E\u062F\u0645\u0629</h2>
                        <div class="flex items-center gap-2 flex-wrap">
                            <span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-folder-open ml-1"></i>${a.length} \u0637\u0644\u0628 \u062E\u0627\u0635 \u0628\u0643</span>
                            ${t?`<span style="padding:5px 9px;border:1px solid rgba(255,255,255,.2);border-radius:8px;background:rgba(255,255,255,.1);font-size:.68rem;font-weight:750;"><i class="fas fa-hourglass-half ml-1"></i>${e.length} \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629</span>`:""}
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
                            ${this.renderApprovalRequestsTable(a,!1)}
                        </div>
                    </div>

                    <div class="contractors-subsection" id="pending-approval-requests-section" style="display: ${t?"block":"none"};">
                        <h3 class="contractors-subsection__title"><i class="fas fa-clipboard-check"></i>\u0637\u0644\u0628\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 (\u0644\u0644\u0645\u062F\u064A\u0631)</h3>
                        <div id="pending-approval-requests-container">
                            ${t?this.renderApprovalRequestsTable(e,!0):""}
                        </div>
                    </div>
                </div>
            </div>
        `},renderApprovalRequestSectionPlaceholder(){const t=this.isContractorApprovalAdminUser(),a=typeof GoogleIntegration<"u"&&GoogleIntegration?._circuitBreaker?.isOpen,e=a&&GoogleIntegration?._circuitBreaker?.openUntil?Math.max(0,Math.ceil((GoogleIntegration._circuitBreaker.openUntil-Date.now())/1e3)):null;return`
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

                    ${a?`
                        <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                            <p class="text-sm text-yellow-800">
                                <i class="fas fa-exclamation-triangle ml-2"></i>
                                \u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645 \u0645\u0624\u0642\u062A\u0627\u064B (Circuit Breaker \u0645\u0641\u062A\u0648\u062D)
                                ${e!==null?`- \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0628\u0639\u062F ${e} \u062B\u0627\u0646\u064A\u0629`:""}
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
        `},renderApprovalRequestsTable(t,a=!1){return!t||t.length===0?`
                <div class="empty-state">
                    <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A ${a?"\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629":"\u0645\u0633\u062C\u0644\u0629"}</p>
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
                            ${a?"<th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>":"<th>\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</th>"}
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(e=>{let r="";e._isPendingSync?r='<span class="badge badge-info" title="\u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645"><i class="fas fa-sync fa-spin ml-1"></i> \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629</span>':e._syncError&&(r='<span class="badge badge-warning" title="'+(e._syncErrorMessage||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629")+'"><i class="fas fa-exclamation-triangle ml-1"></i> \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629</span>');const o=this.getApprovalRequestStatusBadge(e.status),i=e.requestCategory==="deletion",s=e.requestCategory==="evaluation_approval"||!i&&e.requestType==="evaluation",n=i?"deletion":s?"evaluation_approval":"approval";let c;i?c=e.requestType==="contractor"?"\u062D\u0630\u0641 \u0645\u0642\u0627\u0648\u0644":e.requestType==="approved_entity"?"\u062D\u0630\u0641 \u0645\u0639\u062A\u0645\u062F":e.requestType==="evaluation"?"\u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645":"\u062D\u0630\u0641":s?c="\u0637\u0644\u0628 \u062A\u0642\u064A\u064A\u0645":c=e.requestType==="contractor"?"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644":"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u0631\u062F";const l=i?e.entityName||e.companyName||"":s?e.contractorName||"":e.companyName||e.contractorName||"";return`
                                <tr ${e._isPendingSync?'style="opacity: 0.8;"':""}>
                                    <td>
                                        ${i?'<span class="badge badge-warning">\u062D\u0630\u0641</span> ':""}
                                        ${s?'<span class="badge badge-info">\u062A\u0642\u064A\u064A\u0645</span> ':""}
                                        ${c}
                                    </td>
                                    <td>${Utils.escapeHTML(l)}</td>
                                    <td>${e.createdAt?Utils.formatDate(e.createdAt):"-"}</td>
                                    <td>
                                        ${o}
                                        ${r?"<br>"+r:""}
                                    </td>
                                    <td>
                                        ${a?`
                                            <div class="flex items-center gap-2">
                                                <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovalRequest('${e.id}', '${n}')">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                ${this.isApprovalRequestPendingForReview(e)?`
                                                    <button class="btn-icon btn-icon-success" title="\u0627\u0639\u062A\u0645\u0627\u062F" onclick="Contractors.approveRequest('${e.id}', '${n}')">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button class="btn-icon btn-icon-danger" title="\u0631\u0641\u0636" onclick="Contractors.rejectRequest('${e.id}', '${n}')">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                `:""}
                                            </div>
                                        `:`
                                            <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Contractors.viewApprovalRequest('${e.id}', '${n}')">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                        `}
                                    </td>
                                </tr>
                            `}).join("")}
                    </tbody>
                </table>
            </div>
        `},getMyApprovalRequests(){Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=[]),Array.isArray(AppState.appData.contractorDeletionRequests)||(AppState.appData.contractorDeletionRequests=[]);const t=AppState.currentUser||{},a=String(t.id||"").trim(),e=String(t.email||"").trim().toLowerCase();if(!a&&!e)return[];const r=new Date;r.setDate(r.getDate()-7);const o=AppState.appData.contractorApprovalRequests.map(n=>this.normalizeApprovalRequestRecord(n)).filter(n=>n&&this.isCurrentUserApprovalRequestOwner(n)).filter(n=>String(n.requestType||"").trim()!=="evaluation").filter(n=>this.normalizeApprovalRequestStatus(n.status)==="approved"&&n.approvedAt?new Date(n.approvedAt)>=r:!0).map(n=>({...n,requestCategory:"approval"})),i=AppState.appData.contractorDeletionRequests.map(n=>this.normalizeApprovalRequestRecord(n)).filter(n=>n&&this.isCurrentUserApprovalRequestOwner(n)).filter(n=>this.normalizeApprovalRequestStatus(n.status)==="approved"&&n.approvedAt?new Date(n.approvedAt)>=r:!0).map(n=>({...n,requestCategory:"deletion"}));return[...o,...i,...this.getMyEvaluationApprovalRequests()].sort((n,c)=>{const l=n.createdAt?new Date(n.createdAt).getTime():0;return(c.createdAt?new Date(c.createdAt).getTime():0)-l})},getPendingApprovalRequests(){Array.isArray(AppState.appData.contractorApprovalRequests)||(AppState.appData.contractorApprovalRequests=[]),Array.isArray(AppState.appData.contractorDeletionRequests)||(AppState.appData.contractorDeletionRequests=[]);const t=AppState.appData.contractorApprovalRequests.map(o=>this.normalizeApprovalRequestRecord(o)).filter(o=>o&&this.isApprovalRequestPendingForReview(o)).filter(o=>String(o.requestType||"").trim()!=="evaluation").map(o=>({...o,requestCategory:"approval"})),a=AppState.appData.contractorDeletionRequests.map(o=>this.normalizeApprovalRequestRecord(o)).filter(o=>o&&this.isApprovalRequestPendingForReview(o)).map(o=>({...o,requestCategory:"deletion"})),e=this.getPendingEvaluationApprovalRequests();return[...t,...a,...e].sort((o,i)=>{const s=o.createdAt?new Date(o.createdAt).getTime():0,n=i.createdAt?new Date(i.createdAt).getTime():0;return s-n})},getApprovalRequestStatusBadge(t){const a=this.normalizeApprovalRequestStatus(t),r={pending:{label:"\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644",class:"badge-warning"},under_review:{label:"\u062A\u062D\u062A \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629",class:"badge-info"},approved:{label:"\u0645\u0639\u062A\u0645\u062F",class:"badge-success"},rejected:{label:"\u0645\u0631\u0641\u0648\u0636",class:"badge-danger"}}[a]||{label:"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",class:"badge-secondary"};return`<span class="badge ${r.class}">${r.label}</span>`},showApprovalRequestForm(){const t=document.createElement("div");t.className="modal-overlay",t.id="contractor-approval-request-modal",t.innerHTML=`
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
        `,document.body.appendChild(t),this.applyModuleI18n(t);const a=t.querySelector("#approval-request-attachments"),e=t.querySelector("#approval-request-attachments-list"),r=t.querySelector("#approval-upload-btn"),o=t.querySelector("#approval-dropzone"),i=[],s=new Set,n=u=>{if(u.size>5*1024*1024)return Notification.warning(`\u0627\u0644\u0645\u0644\u0641 ${u.name} \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0627\u0644\u0645\u0633\u0645\u0648\u062D (5MB)`),!1;if(s.has(u.name))return!1;s.add(u.name),i.push(u);const f=document.createElement("div");f.className="approval-premium-file-item approval-premium-file-item-compact",f.setAttribute("data-file-name",u.name);const d=u.type.startsWith("image/");return f.innerHTML=`
                <div style="display:flex;align-items:center;gap:8px;">
                    <i class="fas ${d?"fa-file-image":"fa-file"}" style="color:${d?"#10b981":"#3b82f6"};font-size:13px;"></i>
                    <div>
                        <p style="margin:0;font-weight:500;color:#1e293b;line-height:1.3;">${Utils.escapeHTML(u.name)}</p>
                        <p class="file-size" style="margin:0;color:#94a3b8;">${(u.size/1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button type="button" class="remove-attachment-btn" style="width:24px;height:24px;border-radius:6px;border:none;background:transparent;color:#94a3b8;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;" onmouseover="this.style.background='#fef2f2';this.style.color='#ef4444'" onmouseout="this.style.background='transparent';this.style.color='#94a3b8'">
                    <i class="fas fa-times" style="font-size:10px;"></i>
                </button>
            `,f.querySelector(".remove-attachment-btn").addEventListener("click",()=>{s.delete(u.name);const m=i.indexOf(u);m!==-1&&i.splice(m,1),f.remove()}),e.appendChild(f),!0};if(r&&a&&r.addEventListener("click",()=>a.click()),o&&(["dragenter","dragover"].forEach(u=>{o.addEventListener(u,f=>{f.preventDefault(),f.stopPropagation(),o.classList.add("drag-over")})}),["dragleave","drop"].forEach(u=>{o.addEventListener(u,f=>{f.preventDefault(),f.stopPropagation(),o.classList.remove("drag-over")})}),o.addEventListener("drop",u=>{Array.from(u.dataTransfer.files).forEach(f=>n(f))})),a&&a.addEventListener("change",u=>{Array.from(u.target.files).forEach(f=>n(f)),u.target.value=""}),Permissions.isAdmin()){const u=t.querySelector("#add-custom-field-btn"),f=t.querySelector("#custom-fields-container");let d=0;u&&f&&u.addEventListener("click",()=>{const m=`custom-field-${d++}`,v=document.createElement("div");v.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;",v.innerHTML=`
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
                    `,f.appendChild(v)})}const c=t.querySelector("#approval-request-form"),l=t.querySelector("#approval-request-cancel-btn");let p=!1;if(!c){Utils.safeWarn("\u26A0\uFE0F showApprovalRequestForm: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),t.remove();return}l&&l.addEventListener("click",()=>t.remove()),c.addEventListener("submit",u=>{if(u.preventDefault(),!t||!document.contains(t)){Utils.safeWarn("\u26A0\uFE0F submit: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}if(p){Utils.safeLog("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0625\u0631\u0633\u0627\u0644 \u0645\u0643\u0631\u0631\u0629 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644\u0647\u0627");return}p=!0;const f=t.querySelector("#approval-request-validation-hint");if(f){f.style.display="none";const d=f.querySelector("#approval-request-validation-message");d&&(d.textContent="")}this.submitApprovalRequest(t,i).finally(()=>{p=!1})}),t.addEventListener("click",u=>{u.target===t&&t.remove()})},async submitApprovalRequest(t,a=[]){try{if(!t||!t.parentNode){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: modal \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F \u0623\u0648 \u062A\u0645 \u062D\u0630\u0641\u0647");return}const e=t.querySelector("#approval-request-form");if(!e){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: form \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const r=[];if(Permissions.isAdmin()){const v=e.querySelector("#custom-fields-container");v&&v.querySelectorAll("[data-field-id]").forEach(A=>{const y=A.getAttribute("data-field-id"),w=A.value.trim();if(w){const C=e.querySelector(`[data-field-type="${y}"]`)?.value||"text",k=e.querySelector(`[data-field-required="${y}"]`)?.checked||!1;r.push({id:Utils.generateId("CUSTOM"),name:w,type:C,required:k})}})}const o=e.querySelector("#approval-request-type"),i=e.querySelector("#approval-request-company-name"),s=e.querySelector("#approval-request-service-type"),n=e.querySelector("#approval-request-license"),c=e.querySelector("#approval-request-contact-person"),l=e.querySelector("#approval-request-phone"),p=e.querySelector("#approval-request-email"),u=e.querySelector("#approval-request-notes");if(!o||!i||!s||!n){Utils.safeWarn("\u26A0\uFE0F submitApprovalRequest: \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629"),Notification.warning("\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}const f={requestType:o.value,companyName:i.value.trim(),serviceType:s.value.trim(),licenseNumber:n.value.trim(),contactPerson:(c?.value||"").trim(),phone:(l?.value||"").trim(),email:(p?.value||"").trim(),notes:(u?.value||"").trim(),attachments:[],attachmentFiles:a,customFields:r,status:"pending",createdAt:new Date().toISOString(),createdBy:AppState.currentUser?.id||"",createdByName:AppState.currentUser?.name||""},d=this.validateNewApprovalRequest(f);if(!d.ok){const v=t.querySelector("#approval-request-validation-hint");if(v){const h=v.querySelector("#approval-request-validation-message");h?h.textContent=d.message:v.textContent=d.message,v.style.display="flex"}Notification.error(d.message);return}this.ensureApprovalRequestsSetup();const m="TEMP_"+Date.now()+"_"+Math.random().toString(36).substr(2,9);f.id=m,f._isPendingSync=!0,AppState.appData.contractorApprovalRequests.push(f),this._closeApprovalRequestModal(t),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. ID \u0645\u0624\u0642\u062A: "+m),Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628. \u062C\u0627\u0631\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645..."),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh(),this.syncApprovalRequestToBackend(f,a,m).then(()=>{Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D."),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh()}).catch(v=>{Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 Backend:",v)})}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",e),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F: "+e.message)}},async syncApprovalRequestToBackend(t,a=[],e){const r=t;if(String(r?.requestType||"").trim()==="evaluation")return this.syncEvaluationApprovalRequestToBackend(r,e);t=this.prepareApprovalRequestPayloadForBackend(r);const o=`sync_${e||r?.id||Date.now()}`;if(this._activeSyncs&&this._activeSyncs[o]){Utils.safeLog("\u26A0\uFE0F syncApprovalRequestToBackend: \u0645\u0632\u0627\u0645\u0646\u0629 \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0644\u0646\u0641\u0633 \u0627\u0644\u0637\u0644\u0628 - \u062A\u0645 \u062A\u062C\u0627\u0647\u0644 \u0627\u0644\u0627\u0633\u062A\u062F\u0639\u0627\u0621 \u0627\u0644\u0645\u0643\u0631\u0631");return}this._activeSyncs||(this._activeSyncs={}),this._activeSyncs[o]=!0;try{let i=[];if(a&&a.length>0)try{const c=a.map(async p=>{try{const u=await new Promise((d,m)=>{const v=new FileReader;v.onload=()=>{const h=v.result.split(",")[1];d(h)},v.onerror=m,v.readAsDataURL(p)}),f=await GoogleIntegration.uploadFileToDrive(u,p.name,p.type,"contractor-approval-attachments");return f&&f.url?{name:p.name,url:f.url,size:p.size,type:p.type}:null}catch(u){return Utils.safeWarn("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641 "+p.name+":",u),null}});i=(await Promise.all(c)).filter(p=>p!==null),i.length<a.length&&Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A. \u062A\u0645 \u0631\u0641\u0639 "+i.length+" \u0645\u0646 "+a.length)}catch(c){Utils.safeWarn("\u0641\u0634\u0644 \u0631\u0641\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A:",c)}t.attachments=i,delete t.attachmentFiles;const s=e||r?.id||t.id;delete t.id,Utils.safeLog("\u{1F504} \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0625\u0644\u0649 Backend \u0628\u062F\u0648\u0646 ID (tempId="+s+" \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644\u0647 \u0628\u0640 CAR_... \u0645\u0646 Backend)");const n=await GoogleIntegration.sendRequest({action:"addContractorApprovalRequest",data:t});if(n&&n.success){const c=n.data||t;(!c.id||c.id.startsWith("TEMP_"))&&(Utils.safeError("\u274C \u062E\u0637\u0623: Backend \u0644\u0645 \u064A\u0648\u0644\u062F ID \u062C\u062F\u064A\u062F. savedRequest.id="+(c.id||"undefined")),c.id="CAR_"+Date.now()),(!c.id||!c.id.startsWith("CAR_"))&&Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: ID \u0627\u0644\u0645\u064F\u0648\u0644\u062F \u0644\u0627 \u064A\u0628\u062F\u0623 \u0628\u0640 CAR_. ID="+(c.id||"undefined")),Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 tempId="+s+" \u0628\u0627\u0644\u0640 ID \u0627\u0644\u0641\u0639\u0644\u064A="+c.id);let l=AppState.appData.contractorApprovalRequests.findIndex(p=>p.id===s);if(l===-1&&s!==e&&(l=AppState.appData.contractorApprovalRequests.findIndex(p=>p.id===e)),l===-1&&(l=AppState.appData.contractorApprovalRequests.findIndex(p=>p.status!=="pending"||!(p.id?.startsWith("TEMP_")||p._isPendingSync)?!1:t.requestType==="evaluation"?p.requestType==="evaluation"&&(p.contractorId===t.contractorId||p.contractorName===t.contractorName):p.companyName===t.companyName)),l!==-1){const p=AppState.appData.contractorApprovalRequests[l].id,u=AppState.appData.contractorApprovalRequests[l].evaluationData;AppState.appData.contractorApprovalRequests[l]={...AppState.appData.contractorApprovalRequests[l],...c,id:c.id,evaluationData:c.evaluationData||u,_isPendingSync:!1,_syncError:!1},delete AppState.appData.contractorApprovalRequests[l]._isPendingSync,delete AppState.appData.contractorApprovalRequests[l]._syncError,delete AppState.appData.contractorApprovalRequests[l]._syncErrorMessage,Utils.safeLog("\u2705 \u062A\u0645 \u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0624\u0642\u062A \u0641\u064A AppState. oldID="+p+" -> newID="+c.id+", tempIndex="+l)}else Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0624\u0642\u062A \u0641\u064A AppState. tempId="+s),(!c.id||c.id.startsWith("TEMP_"))&&(Utils.safeError("\u274C \u062E\u0637\u0623: savedRequest.id \u063A\u064A\u0631 \u0635\u062D\u064A\u062D. savedRequest.id="+(c.id||"undefined")),c.id="CAR_"+Date.now()),c._isPendingSync=!1,AppState.appData.contractorApprovalRequests.push(c),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u062C\u062F\u064A\u062F \u0645\u0628\u0627\u0634\u0631\u0629 \u0625\u0644\u0649 AppState. newID="+c.id);Object.assign(t,c),t.id=c.id,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Utils.safeLog("\u2705 \u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend \u0628\u0646\u062C\u0627\u062D. ID: "+(t.id||"N/A")),this.currentTab==="approval-request"&&this.refreshApprovalRequestsSection();try{typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&(RealtimeSyncManager.notifyChange("contractorApprovalRequests","add",t.id),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 Real-time \u0628\u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u062C\u062F\u064A\u062F")),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.state&&RealtimeSyncManager.state.broadcastChannel&&(RealtimeSyncManager.state.broadcastChannel.postMessage({type:"DATA_CHANGED",module:"contractors",action:"approvalRequestAdded",data:{requestId:t.id,companyName:t.companyName,createdBy:AppState.currentUser?.id||""}}),Utils.safeLog("\u2705 \u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631 Broadcast \u0644\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629"))}catch(p){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A Real-time:",p)}this.notifyAdminsAboutApprovalRequest(t).catch(p=>{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",p)}),this._scheduleApprovalNotificationsRefresh(),t.requestType==="evaluation"?Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D."):Notification.success("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0628\u0646\u062C\u0627\u062D. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u062A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0645\u062F\u064A\u0631 \u0627\u0644\u0646\u0638\u0627\u0645.")}else{const c=n?.message||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629",l=!!n?.duplicateInfo||/مسجلة بالفعل|قيد المراجعة|مطلوب|غير مدعوم/i.test(c),p=e||s;if(l)Utils.safeWarn("\u26A0\uFE0F \u0631\u0641\u0636 Backend \u0644\u0637\u0644\u0628 \u0645\u0643\u0631\u0631 \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D: "+c),this._removeLocalApprovalRequestById(p),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.error(c),this.refreshApprovalRequestsSection(),this._scheduleApprovalNotificationsRefresh();else{Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend\u060C \u062A\u0645 \u0627\u0644\u062D\u0641\u0638 \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637");const u=AppState.appData.contractorApprovalRequests.findIndex(f=>f.id===p);u!==-1&&(AppState.appData.contractorApprovalRequests[u]._syncError=!0,AppState.appData.contractorApprovalRequests[u]._syncErrorMessage=c),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B.")}}}catch(i){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0639 Backend:",i);const s=AppState.appData.contractorApprovalRequests.findIndex(n=>n.id===e);throw s!==-1&&(AppState.appData.contractorApprovalRequests[s]._syncError=!0,AppState.appData.contractorApprovalRequests[s]._syncErrorMessage=i.message||"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),i}finally{this._activeSyncs&&this._activeSyncs[o]&&delete this._activeSyncs[o]}},async syncEvaluationApprovalRequestToBackend(t,a){const e=t,r=`sync_eval_${a||e?.id||Date.now()}`;if(!(this._activeSyncs&&this._activeSyncs[r])){this._activeSyncs||(this._activeSyncs={}),this._activeSyncs[r]=!0;try{this.ensureEvaluationApprovalRequestsSetup();const o={...e},i=a||o.id,s=i&&String(i).startsWith("TEMP_");s?delete o.id:i&&(o.id=i),delete o._isPendingSync,delete o._syncError,delete o._syncErrorMessage,delete o.legacyTempId,delete o._tempId,o.requestType="evaluation",o.evaluationData&&typeof o.evaluationData=="object"&&(o.evaluationData=JSON.stringify(o.evaluationData));const n=await GoogleIntegration.sendRequest({action:"addContractorEvaluationApprovalRequest",data:o});if(n?.success){const c=n.data||o;if((!c.id||c.id.startsWith("TEMP_"))&&(c.id="CEAR_"+Date.now()),c.evaluationData&&typeof c.evaluationData=="string")try{c.evaluationData=JSON.parse(c.evaluationData)}catch{}let l=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(p=>{if(!p)return!1;const u=String(p.id||"").trim(),f=String(p.legacyTempId||p._tempId||"").trim(),d=String(i||"").trim();return u===d||f===d});if(l!==-1){const p=AppState.appData.contractorEvaluationApprovalRequests[l].evaluationData,u=s?String(i).trim():AppState.appData.contractorEvaluationApprovalRequests[l].legacyTempId||"";AppState.appData.contractorEvaluationApprovalRequests[l]={...AppState.appData.contractorEvaluationApprovalRequests[l],...c,id:c.id,evaluationData:c.evaluationData||p,requestType:"evaluation",legacyTempId:u||void 0,_isPendingSync:!1},delete AppState.appData.contractorEvaluationApprovalRequests[l]._syncError}else c.requestType="evaluation",AppState.appData.contractorEvaluationApprovalRequests.push(c);window.DataManager?.save&&window.DataManager.save(),typeof RealtimeSyncManager<"u"&&RealtimeSyncManager.notifyChange&&RealtimeSyncManager.notifyChange("contractorEvaluationApprovalRequests","add",c.id),Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0628\u0646\u062C\u0627\u062D.")}else{const c=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(l=>l.id===i);c!==-1&&(AppState.appData.contractorEvaluationApprovalRequests[c]._syncError=!0,AppState.appData.contractorEvaluationApprovalRequests[c]._syncErrorMessage=n?.message||"\u0641\u0634\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),window.DataManager?.save&&window.DataManager.save(),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")}}catch(o){Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",o);const i=(AppState.appData.contractorEvaluationApprovalRequests||[]).findIndex(s=>s.id===a);throw i!==-1&&(AppState.appData.contractorEvaluationApprovalRequests[i]._syncError=!0,AppState.appData.contractorEvaluationApprovalRequests[i]._syncErrorMessage=o.message||"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629"),o}finally{this._activeSyncs?.[r]&&delete this._activeSyncs[r]}}},async notifyAdminsAboutApprovalRequest(t){try{const e=(AppState.appData.users||[]).filter(o=>{if(!o||o.active===!1)return!1;const i=(o.role||"").toLowerCase();return i==="admin"||i==="\u0645\u062F\u064A\u0631"||o.permissions&&(o.permissions.isAdmin===!0||o.permissions.admin===!0)});if(e.length===0)try{const o=await GoogleIntegration.sendRequest({action:"readFromSheet",data:{sheetName:"Users"}});o&&o.success&&Array.isArray(o.data)&&e.push(...o.data.filter(i=>{if(!i||i.active===!1)return!1;const s=(i.role||"").toLowerCase();return s==="admin"||s==="\u0645\u062F\u064A\u0631"}))}catch(o){Utils.safeWarn("\u0641\u0634\u0644 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0645\u0646 Google Sheets:",o)}const r={contractor:"\u0645\u0642\u0627\u0648\u0644",supplier:"\u0645\u0648\u0631\u062F",evaluation:"\u062A\u0642\u064A\u064A\u0645"}[t.requestType]||t.requestType||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";for(const o of e)if(o.id||o.email)try{await GoogleIntegration.sendRequest({action:"addNotification",data:{userId:o.id||o.email,title:"\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u062C\u062F\u064A\u062F \u064A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629",message:`\u0637\u0644\u0628 ${AppState.currentUser?.name||"\u0645\u0633\u062A\u062E\u062F\u0645"} \u0627\u0639\u062A\u0645\u0627\u062F ${r}: "${t.companyName||""}"`,type:"contractor_approval",priority:"high",link:"#contractors-section",data:{module:"contractors",action:"approval_request",requestId:t.id,requestType:t.requestType}}}).catch(i=>{Utils.safeWarn("\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)})}catch(i){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0644\u0644\u0645\u062F\u064A\u0631:",i)}}catch(a){Utils.safeWarn("\u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u062F\u064A\u0631\u064A\u0646:",a)}},mountApprovalRequestSection(){const t=document.getElementById("contractors-approval-request-content");if(!t)return;const a=this.renderApprovalRequestSection();typeof this.safeSetInnerHTML=="function"?this.safeSetInnerHTML(t,a):t.innerHTML=a;const e=document.getElementById("send-approval-request-btn");e&&!e.hasAttribute("data-listener-attached")&&(e.setAttribute("data-listener-attached","true"),e.addEventListener("click",()=>this.showApprovalRequestForm()))},refreshApprovalRequestsSection(){if(this.currentTab!=="approval-request")return;const t=this.isContractorApprovalAdminUser(),a=document.getElementById("pending-approval-requests-section"),e=document.getElementById("pending-approval-requests-container");if(t&&!e){this.mountApprovalRequestSection();return}if(!this._isRefreshingApprovalRequests){this._isRefreshingApprovalRequests=!0;try{const r=document.getElementById("my-approval-requests-container");if(r){const o=this.getMyApprovalRequests();r.innerHTML=this.renderApprovalRequestsTable(o,!1)}if(a&&(a.style.display=t?"block":"none"),t&&e){const o=this.getPendingApprovalRequests();e.innerHTML=this.renderApprovalRequestsTable(o,!0)}}catch(r){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u062F\u064A\u062B \u0642\u0633\u0645 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",r)}finally{this._isRefreshingApprovalRequests=!1}}},async viewApprovalRequest(t,a="approval"){this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();const e=String(t||"").trim();let r;if(a==="deletion"?r=(AppState.appData.contractorDeletionRequests||[]).find(A=>A&&String(A.id||"").trim()===e):a==="evaluation_approval"?(await this.syncPendingEvaluationApprovalRequests(e),r=this.findEvaluationApprovalRequest(e),r||(await this.fetchEvaluationApprovalRequestsFromBackend(),r=this.findEvaluationApprovalRequest(e))):r=(AppState.appData.contractorApprovalRequests||[]).find(A=>A&&String(A.id||"").trim()===e),r||(r=this.findEvaluationApprovalRequest(e),r&&(a="evaluation_approval")),!r){Notification.error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=this.isContractorApprovalAdminUser(),i=this.getApprovalRequestStatusBadge(r.status),s=a==="deletion",n=a==="evaluation_approval"||!s&&r.requestType==="evaluation",c=o&&!s&&this.isApprovalRequestPendingForReview(r);let l=null;if(n){l=r.evaluationData;let A=0;for(;l&&typeof l=="string"&&A<3;)try{l=JSON.parse(l),A++}catch(C){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 evaluationData \u0645\u0646 \u0627\u0644\u0646\u0635 (\u0645\u062D\u0627\u0648\u0644\u0629 "+A+"):",C);break}l&&typeof l!="object"&&(Utils.safeWarn("\u26A0\uFE0F evaluationData \u0644\u064A\u0633 \u0643\u0627\u0626\u0646\u0627\u064B \u0635\u0627\u0644\u062D\u0627\u064B:",typeof l),l=null),l&&(l.evaluationDate||l.evaluatorName||l.projectName||l.location||l.finalScore!==void 0||l.items&&l.items.length>0)||(Utils.safeLog("\u{1F4CB} evaluationData \u0641\u0627\u0631\u063A \u0623\u0648 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u060C \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0645\u0628\u0627\u0634\u0631\u0629"),l={evaluationDate:r.evaluationDate||l?.evaluationDate||null,evaluatorName:r.evaluatorName||l?.evaluatorName||r.createdByName||"",projectName:r.projectName||l?.projectName||r.location||"",location:r.location||l?.location||r.projectName||"",compliantCount:r.compliantCount??l?.compliantCount??0,totalItems:r.totalItems??l?.totalItems??0,finalScore:r.finalScore??l?.finalScore??null,finalRating:r.finalRating||l?.finalRating||"",generalNotes:r.generalNotes||l?.generalNotes||r.notes||"",items:r.items||l?.items||[],id:r.entityId||r.evaluationId||l?.id||null});let w=0;for(;l?.items&&typeof l.items=="string"&&w<3;)try{l.items=JSON.parse(l.items),w++}catch(C){Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u062A\u062D\u0644\u064A\u0644 \u0628\u0646\u0648\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u0646\u0635:",C),l.items=[];break}Utils.safeLog("\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u0631\u062C\u0629:",l),Utils.safeLog("\u{1F4CB} \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0623\u0635\u0644\u064A\u0629:",r)}const p=Array.isArray(l?.items)?l.items:l?.items&&typeof l.items=="object"?Object.values(l.items):[],u=l?.finalScore,f=typeof u=="number"?u:u!=null&&!isNaN(parseFloat(u))?parseFloat(u):null;let d,m;s?(d=r.requestType==="contractor"?"\u062D\u0630\u0641 \u0645\u0642\u0627\u0648\u0644":r.requestType==="approved_entity"?"\u062D\u0630\u0641 \u0645\u0639\u062A\u0645\u062F":r.requestType==="evaluation"?"\u062D\u0630\u0641 \u062A\u0642\u064A\u064A\u0645":"\u062D\u0630\u0641",m=r.entityName||r.companyName||""):n?(d="\u0637\u0644\u0628 \u062A\u0642\u064A\u064A\u0645 \u0645\u0642\u0627\u0648\u0644",m=r.contractorName||""):(d=r.requestType==="contractor"?"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0642\u0627\u0648\u0644":"\u0627\u0639\u062A\u0645\u0627\u062F \u0645\u0648\u0631\u062F",m=r.companyName||r.contractorName||""),this.injectAntiShakeStyles();const v=document.createElement("div");v.id="contractor-approval-request-details-modal",v.className="modal-overlay ctr-detail-modal",v.innerHTML=`
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
                    ${c?`
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
                                    ${n?c?`
                                    <input type="text" id="edit-companyName" class="form-input edit-field" value="${Utils.escapeHTML(m)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(m)}</p>
                                    `:`
                                    <p class="text-gray-800">${Utils.escapeHTML(m)}</p>
                                    `:`
                                    <input type="text" id="edit-companyName" class="form-input edit-field" disabled value="${Utils.escapeHTML(m)}" style="display: none;" />
                                    <p id="view-companyName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(m)}</p>
                                    `}
                                </div>
                                ${n&&l?`
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <input type="date" id="edit-evaluationDate" class="form-input edit-field" disabled value="${l.evaluationDate?typeof l.evaluationDate=="string"?l.evaluationDate.slice(0,10):new Date(l.evaluationDate).toISOString().slice(0,10):""}" style="display: none;" />
                                    <p id="view-evaluationDate" class="text-gray-800 view-field" style="display: block;">${l.evaluationDate?Utils.formatDate(l.evaluationDate):"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u064A\u0651\u0645</label>
                                    <input type="text" id="edit-evaluatorName" class="form-input edit-field" disabled value="${Utils.escapeHTML(l.evaluatorName||"")}" style="display: none;" />
                                    <p id="view-evaluatorName" class="text-gray-800 view-field" style="display: block;">${Utils.escapeHTML(l.evaluatorName||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0635\u0646\u0639</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(l.projectName||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                    <p class="text-gray-800 view-field">${Utils.escapeHTML(l.location||"")||"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0639\u062F\u062F \u0627\u0644\u0628\u0646\u0648\u062F \u0627\u0644\u0645\u0637\u0627\u0628\u0642\u0629</label>
                                    <p class="text-gray-800">${l.compliantCount??0} \u0645\u0646 ${l.totalItems??p.length??0}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</label>
                                    <p class="text-gray-800 font-bold ${f>=90?"text-green-600":f>=75?"text-blue-600":f>=60?"text-yellow-600":f===null?"text-gray-500":"text-red-600"}">${typeof f=="number"?f.toFixed(0)+"%":"\u2014"}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-semibold text-gray-600">\u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A</label>
                                    <span class="badge ${f>=90?"badge-success":f>=75?"badge-info":f>=60?"badge-warning":f===null?"badge-secondary":"badge-danger"}">${Utils.escapeHTML(l.finalRating||"")}</span>
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
                                                ${p.map((A,y)=>{const w=A.status==="compliant"?"\u0645\u0637\u0627\u0628\u0642":A.status==="non_compliant"?"\u063A\u064A\u0631 \u0645\u0637\u0627\u0628\u0642":"\u2014",C=A.status==="compliant"?"text-green-600":A.status==="non_compliant"?"text-red-600":"text-gray-500",k=A.status==="compliant"?"fa-check-circle":A.status==="non_compliant"?"fa-times-circle":"fa-minus-circle";return`
                                                    <tr>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-700">${y+1}</td>
                                                        <td class="px-3 py-2 text-sm text-gray-700">${Utils.escapeHTML(A.title||A.label||"")}</td>
                                                        <td class="px-3 py-2 whitespace-nowrap text-sm ${C}">
                                                            <i class="fas ${k} ml-1"></i>
                                                            ${w}
                                                        </td>
                                                        <td class="px-3 py-2 text-sm text-gray-600">${Utils.escapeHTML(A.notes||"\u2014")}</td>
                                                    </tr>
                                                    `}).join("")}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            `:""}
                            ${n&&l?`
                                <div class="bg-blue-50 border border-blue-200 rounded p-3">
                                    <label class="text-sm font-semibold text-blue-800 block mb-2">\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u0639\u0627\u0645\u0629</label>
                                    <textarea id="edit-generalNotes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(l.generalNotes||"")}</textarea>
                                    <p id="view-generalNotes" class="text-blue-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(l.generalNotes||"")||"\u2014"}</p>
                                </div>
                            `:""}
                            ${!s&&!n&&r.notes?`
                                <div class="bg-gray-50 border border-gray-200 rounded p-3">
                                    <label class="text-sm font-semibold text-gray-600 block mb-2">\u0645\u0644\u0627\u062D\u0638\u0627\u062A</label>
                                    <textarea id="edit-notes" class="form-input edit-field" disabled rows="3" style="display: none;">${Utils.escapeHTML(r.notes)}</textarea>
                                    <p id="view-notes" class="text-gray-700 whitespace-pre-line view-field" style="display: block;">${Utils.escapeHTML(r.notes)}</p>
                                </div>
                            `:""}
                            ${c?`
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
                                    ${r.attachments.map(A=>`
                                        <div class="flex items-center justify-between p-2 bg-white rounded border">
                                            <div class="flex items-center gap-2">
                                                <i class="fas fa-file text-blue-600"></i>
                                                <span class="text-sm text-gray-700">${Utils.escapeHTML(A.name)}</span>
                                                ${A.size?`<span class="text-xs text-gray-500">(${(A.size/1024/1024).toFixed(2)} MB)</span>`:""}
                                            </div>
                                            ${A.url?`
                                                <a href="${A.url}" target="_blank" class="btn-secondary btn-sm">
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
                                    ${r.customFields.map(A=>`
                                        <div class="flex items-center gap-2 p-2 bg-white rounded border">
                                            <span class="text-sm text-gray-700">${Utils.escapeHTML(A.name)}</span>
                                            <span class="badge badge-info text-xs">${A.type==="text"?"\u0646\u0635":A.type==="document"?"\u0645\u0633\u062A\u0646\u062F":"\u062E\u0627\u0646\u0629 \u0627\u062E\u062A\u064A\u0627\u0631"}</span>
                                            ${A.required?'<span class="badge badge-warning text-xs">\u0625\u0644\u0632\u0627\u0645\u064A</span>':""}
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
                    ${n&&l?.id?`
                        <button class="btn-info" onclick="Contractors.viewEvaluation('${l.id}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-clipboard-check ml-2"></i>\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0643\u0627\u0645\u0644\u0627\u064B
                        </button>
                    `:""}
                    ${o&&this.isApprovalRequestPendingForReview(r)?`
                        <button class="btn-success" onclick="Contractors.approveRequest('${r.id}', '${a}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-check ml-2"></i>\u0627\u0639\u062A\u0645\u0627\u062F
                        </button>
                        <button class="btn-danger" onclick="Contractors.rejectRequest('${r.id}', '${a}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-times ml-2"></i>\u0631\u0641\u0636
                        </button>
                    `:""}
                </div>
            </div>
        `,document.body.appendChild(v);const h=v.querySelector("#save-changes-btn");h&&h.addEventListener("click",async()=>{await this.saveRequestChanges(t,a)}),v.addEventListener("click",A=>{A.target===v&&v.remove()})},toggleEditMode(){const t=document.querySelectorAll(".edit-field"),a=document.querySelectorAll(".view-field"),e=document.getElementById("save-changes-section"),r=document.getElementById("toggle-edit-mode-btn");if(!t.length)return;const o=!t[0].disabled;t.forEach(i=>{i.disabled=o,i.style.display=o?"none":"block"}),a.forEach(i=>{i.style.display=o?"block":"none"}),e&&(e.style.display=o?"none":"block"),r&&(o?r.innerHTML='<i class="fas fa-edit ml-1"></i> \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062A\u0639\u062F\u064A\u0644':r.innerHTML='<i class="fas fa-eye ml-1"></i> \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0639\u062F\u064A\u0644')},async saveRequestChanges(t,a="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}Loading.show();try{let e;if(a==="deletion"?e=(AppState.appData.contractorDeletionRequests||[]).find(n=>n.id===t):e=(AppState.appData.contractorApprovalRequests||[]).find(n=>n.id===t),!e)throw new Error("\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");const r=e.requestType==="evaluation";let o;if(r){const n=document.getElementById("edit-companyName")?.value?.trim()??"",c=document.getElementById("edit-evaluationDate")?.value?.trim()||null,l=document.getElementById("edit-evaluatorName")?.value?.trim()??"",p=document.getElementById("edit-generalNotes")?.value?.trim()??"";let u=e.evaluationData;if(typeof u=="string")try{u=JSON.parse(u)}catch{u={}}u=u||{},u.evaluationDate=c?new Date(c).toISOString():u.evaluationDate||null,u.evaluatorName=l,u.generalNotes=p,e.contractorName=n,e.evaluationData=u,e.updatedAt=new Date().toISOString(),e.updatedBy=AppState.currentUser?.id||"",e.updatedByName=AppState.currentUser?.name||"",o={contractorName:n,evaluationData:u,updatedAt:e.updatedAt,updatedBy:e.updatedBy,updatedByName:e.updatedByName}}else{const n=document.getElementById("edit-companyName")?.value?.trim(),c=document.getElementById("edit-serviceType")?.value?.trim(),l=document.getElementById("edit-licenseNumber")?.value?.trim(),p=document.getElementById("edit-contactPerson")?.value?.trim(),u=document.getElementById("edit-phone")?.value?.trim(),f=document.getElementById("edit-email")?.value?.trim(),d=document.getElementById("edit-notes")?.value?.trim();if(!n){Notification.error("\u064A\u062C\u0628 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629/\u0627\u0644\u0645\u0642\u0627\u0648\u0644"),Loading.hide();return}e.companyName=n,c!==void 0&&(e.serviceType=c),l!==void 0&&(e.licenseNumber=l),p!==void 0&&(e.contactPerson=p),u!==void 0&&(e.phone=u),f!==void 0&&(e.email=f),d!==void 0&&(e.notes=d),e.updatedAt=new Date().toISOString(),e.updatedBy=AppState.currentUser?.id||"",e.updatedByName=AppState.currentUser?.name||"",o={companyName:n,serviceType:c,licenseNumber:l,contactPerson:p,phone:u,email:f,notes:d,updatedAt:e.updatedAt,updatedBy:e.updatedBy,updatedByName:e.updatedByName}}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();const i=a==="deletion"?"updateContractorDeletionRequest":"updateContractorApprovalRequest",s=await GoogleIntegration.sendRequest({action:i,data:{requestId:t,updateData:o}});if(s&&s.success){Notification.success("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A \u0628\u0646\u062C\u0627\u062D");const n=document.querySelector(".modal-overlay");n&&n.remove(),this.refreshApprovalRequestsSection()}else throw new Error(s?.message||"\u0641\u0634\u0644 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A")}catch(e){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A:",e),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A: "+e.message)}finally{Loading.hide()}},async approveRequest(t,a="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();let e;if(a==="deletion"){if(e=(AppState.appData.contractorDeletionRequests||[]).find(i=>i.id===t),!e){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0639\u0646\u0635\u0631 \u0646\u0647\u0627\u0626\u064A\u0627\u064B."))return;try{Loading.show();const i=await GoogleIntegration.callBackend("approveContractorDeletionRequest",{requestId:t,userData:AppState.currentUser});if(i&&i.success){if(e.status="approved",e.approvedAt=new Date().toISOString(),e.approvedBy=AppState.currentUser?.id||"",e.approvedByName=AppState.currentUser?.name||"",e.requestType==="contractor"){const s=AppState.appData.contractors||[],n=s.findIndex(p=>p.id===e.entityId);n!==-1&&(s.splice(n,1),AppState.appData.contractors=s);const c=AppState.appData.approvedContractors||[],l=c.findIndex(p=>p.contractorId===e.entityId||p.id===e.entityId);l!==-1&&(c.splice(l,1),AppState.appData.approvedContractors=c)}else if(e.requestType==="approved_entity"){const s=AppState.appData.approvedContractors||[],n=s.findIndex(c=>c.id===e.entityId);if(n!==-1){const c=s[n];if(s.splice(n,1),AppState.appData.approvedContractors=s,c.contractorId){const l=AppState.appData.contractors||[],p=l.findIndex(u=>u.id===c.contractorId);p!==-1&&(l.splice(p,1),AppState.appData.contractors=l)}}}else if(e.requestType==="evaluation"){const s=AppState.appData.contractorEvaluations||[],n=s.findIndex(c=>c.id===e.entityId);n!==-1&&(s.splice(n,1),AppState.appData.contractorEvaluations=s)}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D"),this.refreshApprovalRequestsSection(),this.load(!0),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}else Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+i.message)}return}if(a==="evaluation_approval"){if(await this.syncPendingEvaluationApprovalRequests(t),e=this.findEvaluationApprovalRequest(t),e||(await this.fetchEvaluationApprovalRequestsFromBackend(),e=this.findEvaluationApprovalRequest(t)),!e){Notification.error("\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=String(e.id||"").trim();if(e._isPendingSync||i.startsWith("TEMP_")||e._syncError){Notification.error(e._syncErrorMessage||"\u062A\u0639\u0630\u0631 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A. \u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u062B\u0645 \u0623\u0639\u062F \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629.");return}if(!confirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0633\u064A\u064F\u0636\u0627\u0641 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."))return;try{Loading.show();const s=await GoogleIntegration.callBackend("approveContractorEvaluationApprovalRequest",{requestId:e.id||t,userData:AppState.currentUser});if(!s?.success){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+(s?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}e.status="approved",e.approvedAt=new Date().toISOString(),e.approvedBy=AppState.currentUser?.id||"",e.approvedByName=AppState.currentUser?.name||"";const n=this.parseEvaluationDataFromRequest(e);n&&(n.status="approved",n.approvedAt=new Date().toISOString(),n.approvedBy=AppState.currentUser?.id||"",this.persistEvaluation(n,null,{skipAutoSave:!0,replaceExisting:!0})),window.DataManager?.save&&window.DataManager.save();try{await GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0,sheets:["ContractorEvaluationApprovalRequests","ContractorEvaluations"]})}catch{}Loading.hide(),Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D."),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),this.refreshEvaluationsList(this.currentEvaluationFilter||""),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(s){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645:",s),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+s.message)}return}if(e=(AppState.appData.contractorApprovalRequests||[]).find(i=>i.id===t),!e&&this.findEvaluationApprovalRequest(t))return this.approveRequest(t,"evaluation_approval");if(!e&&t.startsWith("TEMP_")){Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0627 \u064A\u0632\u0627\u0644 \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0642\u0644\u064A\u0644\u0627\u064B \u062B\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."),Utils.safeWarn("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0628\u0645\u064F\u0639\u0631\u0641 \u0645\u0624\u0642\u062A (tempId="+t+") - \u064A\u062C\u0628 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u062D\u062A\u0649 \u0627\u0643\u062A\u0645\u0627\u0644 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629");return}if(!e){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),Utils.safeError("\u274C \u062E\u0637\u0623: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628. requestId="+t);return}if(String(e.requestType||"").trim()==="evaluation")return this.approveRequest(t,"evaluation_approval");if(e.id&&String(e.id).startsWith("TEMP_")){e._isPendingSync?Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0627 \u064A\u0632\u0627\u0644 \u0642\u064A\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631 \u0642\u0644\u064A\u0644\u0627\u064B \u062B\u0645 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629."):e._syncError?Notification.error("\u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0623\u0648\u0644\u0627\u064B."):Notification.warning("\u0627\u0644\u0637\u0644\u0628 \u0644\u0645 \u064A\u062A\u0645 \u0645\u0632\u0627\u0645\u0646\u062A\u0647 \u0645\u0639 \u0627\u0644\u062E\u0627\u062F\u0645 \u0628\u0639\u062F. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0623\u0648\u0644\u0627\u064B."),Utils.safeWarn("\u26A0\uFE0F \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0628\u0645\u064F\u0639\u0631\u0641 \u0645\u0624\u0642\u062A (tempId="+e.id+")");return}const o=e.requestType==="evaluation"?"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u061F \u0633\u064A\u064F\u0636\u0627\u0641 \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646.":"\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0639\u062A\u0645\u0627\u062F \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061F \u0633\u064A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646.";if(confirm(o))try{Loading.show();const i=e.id||t;Utils.safeLog("\u2705 \u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628. requestId="+i+", type="+(e.requestType||"N/A"));const s=await GoogleIntegration.callBackend("approveContractorApprovalRequest",{requestId:i,userData:AppState.currentUser});if(!s||!s.success){Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0641\u064A Backend: "+(s?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"));return}e.status="approved",e.approvedAt=new Date().toISOString(),e.approvedBy=AppState.currentUser?.id||"",e.approvedByName=AppState.currentUser?.name||"",e.updatedAt=new Date().toISOString();const n=f=>String(f||"").trim().toLowerCase(),c=n(e.requestType),l=n(e.companyName||e.entityName),p=n(e.serviceType),u=n(e.licenseNumber);if((AppState.appData.contractorApprovalRequests||[]).forEach(f=>{if(!f||f===e||!(f.status==="pending"||f.status==="under_review")||!(n(f.requestType)===c))return;const v=n(f.companyName||f.entityName),h=n(f.serviceType),A=n(f.licenseNumber);(l&&v&&l===v||u&&A&&u===A)&&(!p||!h||p===h)&&(f.status="approved",f.approvedAt=e.approvedAt,f.approvedBy=e.approvedBy,f.approvedByName=e.approvedByName,f.updatedAt=e.updatedAt)}),s.approvedEntity){this.ensureApprovedSetup();let f=AppState.appData.approvedContractors||[];Array.isArray(f)||(f=[]);const d=s.approvedEntity;Utils.safeLog("\u2705 Received approvedEntity from Backend: id="+(d.id||"N/A")+", companyName="+(d.companyName||"N/A")+", code="+(d.code||d.isoCode||"N/A")),d.id||Utils.safeWarn("\u26A0\uFE0F Warning: approvedEntity does not have an ID - this may cause issues");const m=f.findIndex(h=>h.id===d.id);m!==-1?(f[m]=d,Utils.safeLog("\u2705 Updated existing approved contractor in AppState: id="+d.id)):(f.push(d),Utils.safeLog("\u2705 Added new approved contractor to AppState: id="+d.id+", companyName="+d.companyName)),AppState.appData.approvedContractors=f,AppState.appData.approvedContractors.find(h=>h.id===d.id)?Utils.safeLog("\u2705 Verified: Approved contractor added successfully to AppState.approvedContractors"):Utils.safeError("\u274C Error: Failed to add approved contractor to AppState.approvedContractors")}else Utils.safeWarn("\u26A0\uFE0F Warning: backendResult.approvedEntity is null or undefined - approved entity was not returned from Backend"),(e.requestType==="contractor"||e.requestType==="supplier")&&Utils.safeError("\u274C Error: approvedEntity should not be null for contractor/supplier requests");if(s.contractor){let f=AppState.appData.contractors||[];Array.isArray(f)||(f=[]);const d=f.findIndex(m=>m.id===s.contractor.id);d!==-1?f[d]=s.contractor:f.push(s.contractor),AppState.appData.contractors=f,Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${s.contractor.name}`)}if(e.requestType==="evaluation"){const f=this.parseEvaluationDataFromRequest(e);f?(f.status="approved",f.approvedAt=new Date().toISOString(),f.approvedBy=AppState.currentUser?.id||"",this.persistEvaluation(f,null,{skipAutoSave:!0,replaceExisting:!0})):Utils.safeWarn("\u26A0\uFE0F \u062A\u0639\u0630\u0631 \u0627\u0633\u062A\u062E\u0631\u0627\u062C \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0645\u0646 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u0645\u0639\u062A\u0645\u062F")}typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save();try{Utils.safeLog("\u{1F504} \u0628\u062F\u0621 \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 Backend...");const f=e.requestType==="evaluation"?["ContractorApprovalRequests","ContractorEvaluations"]:["ContractorApprovalRequests","ApprovedContractors","Contractors"];if(await GoogleIntegration.syncData({silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!0,sheets:f}),Utils.safeLog("\u2705 \u062A\u0645\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u0646 Backend \u0628\u0646\u062C\u0627\u062D"),e.requestType==="evaluation"&&this.refreshEvaluationsList(this.currentEvaluationFilter||""),e.requestType==="contractor"||e.requestType==="supplier"){const d=AppState.appData.approvedContractors?.find(m=>m.companyName===e.companyName&&m.entityType===(e.requestType==="contractor"?"contractor":"supplier"));d?Utils.safeLog(`\u2705 \u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${d.companyName}" \u0645\u0648\u062C\u0648\u062F \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 (ID: ${d.id}, Code: ${d.code||d.isoCode})`):Utils.safeWarn(`\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 "${e.companyName}" \u0641\u064A \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0628\u0639\u062F \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629`)}}catch(f){Utils.safeError("\u274C \u062E\u0637\u0623: \u0641\u0634\u0644\u062A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646 Backend:",f),Notification.warning("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D \u0641\u064A Backend\u060C \u0644\u0643\u0646 \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0638\u0647\u0648\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A.")}if(Loading.hide(),e.requestType==="contractor"||e.requestType==="supplier"){const f=AppState.appData.approvedContractors?.find(m=>m.companyName===e.companyName&&m.entityType===(e.requestType==="contractor"?"contractor":"supplier"))||s.approvedEntity,d=AppState.appData.contractors?.find(m=>m.name===e.companyName||f&&m.id===f.contractorId||f&&m.approvedEntityId===f.id);d&&f?f.contractorId===d.id||d.approvedEntityId===f.id?Utils.safeLog(`\u2705 \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 ${e.requestType==="supplier"?"\u0627\u0644\u0645\u0648\u0631\u062F":"\u0627\u0644\u0645\u0642\u0627\u0648\u0644"} "${d.name}" \u0628\u0646\u062C\u0627\u062D \u0648\u0627\u0644\u0631\u0628\u0637 \u0645\u0648\u062C\u0648\u062F (Contractor ID: ${d.id}, Approved ID: ${f.id})`):Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0648\u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0645\u0648\u062C\u0648\u062F\u0627\u0646 \u0644\u0643\u0646 \u0627\u0644\u0631\u0628\u0637 \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644"):Utils.safeWarn("\u26A0\uFE0F \u062A\u062D\u0630\u064A\u0631: \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0623\u0648 \u0627\u0644\u0645\u0639\u062A\u0645\u062F \u0644\u0645 \u064A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0642\u0648\u0627\u0626\u0645 \u0628\u0639\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F")}e.requestType==="evaluation"?Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D. \u064A\u0638\u0647\u0631 \u0627\u0644\u0622\u0646 \u0641\u064A \u062A\u0642\u064A\u064A\u0645 \u0648\u062A\u0623\u0647\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."):Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D. \u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0627\u0648\u0644/\u0627\u0644\u0645\u0648\u0631\u062F \u0625\u0644\u0649 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0648\u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646."),this.refreshApprovalRequestsSection(),e.requestType==="evaluation"&&this.refreshEvaluationsList(this.currentEvaluationFilter||""),await this.ensureApprovedContractorsDataLoaded({force:!0}),this.ensureApprovedTabContentLoaded(!0),this.refreshApprovedEntitiesList(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u0637\u0644\u0628: "+i.message)}},async rejectRequest(t,a="approval"){if(!Permissions.isAdmin()){Notification.error("\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628\u0627\u062A");return}this.ensureApprovalRequestsSetup(),this.ensureDeletionRequestsSetup(),this.ensureEvaluationApprovalRequestsSetup();let e;if(a==="deletion"){if(e=(AppState.appData.contractorDeletionRequests||[]).find(i=>i.id===t),!e){Notification.error("\u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const o=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636:")||"\u062A\u0645 \u0627\u0644\u0631\u0641\u0636 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u062F\u064A\u0631";if(o===null)return;try{Loading.show();const i=await GoogleIntegration.callBackend("rejectContractorDeletionRequest",{requestId:t,rejectionReason:o,userData:AppState.currentUser});i&&i.success?(e.status="rejected",e.rejectedAt=new Date().toISOString(),e.rejectedBy=AppState.currentUser?.id||"",e.rejectedByName=AppState.currentUser?.name||"",e.rejectionReason=o,typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641 \u0628\u0646\u062C\u0627\u062D"),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()):(Loading.hide(),Notification.error("\u0641\u0634\u0644 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")))}catch(i){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641:",i),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062D\u0630\u0641: "+i.message)}return}if(a==="evaluation_approval"){const o=this.findEvaluationApprovalRequest(t);if(!o){Notification.error("\u0637\u0644\u0628 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(i===null)return;try{Loading.show(),(await GoogleIntegration.sendRequest({action:"rejectContractorEvaluationApprovalRequest",data:{requestId:t,rejectionReason:i||"",userData:AppState.currentUser}}))?.success&&(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=i||"",window.DataManager?.save&&window.DataManager.save()),Loading.hide(),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 \u0628\u0646\u062C\u0627\u062D."),this.refreshEvaluationApprovalRequestsSection(),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(s){Loading.hide(),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u062A\u0642\u064A\u064A\u0645: "+s.message)}return}const r=prompt("\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A):");if(r!==null)try{Loading.show();const o=(AppState.appData.contractorApprovalRequests||[]).find(s=>s.id===t);if(!o){if(this.findEvaluationApprovalRequest(t))return Loading.hide(),this.rejectRequest(t,"evaluation_approval");Loading.hide(),Notification.error("\u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}const i=await GoogleIntegration.sendRequest({action:"rejectContractorApprovalRequest",data:{requestId:t,rejectionReason:r||"",userData:AppState.currentUser}});i&&i.success?(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=r||"",o.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Utils.safeLog("\u2705 \u062A\u0645 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A Google Sheets \u0628\u0646\u062C\u0627\u062D")):(o.status="rejected",o.rejectedAt=new Date().toISOString(),o.rejectedBy=AppState.currentUser?.id||"",o.rejectedByName=AppState.currentUser?.name||"",o.rejectionReason=r||"",o.updatedAt=new Date().toISOString(),typeof window.DataManager<"u"&&window.DataManager.save&&window.DataManager.save(),Loading.hide(),Utils.safeWarn("\u26A0\uFE0F \u0641\u0634\u0644 \u0631\u0641\u0636 \u0637\u0644\u0628 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A Google Sheets\u060C \u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B \u0645\u062D\u0644\u064A\u0627\u064B \u0641\u0642\u0637"),Notification.warning("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0637\u0644\u0628 \u0645\u062D\u0644\u064A\u0627\u064B. \u0633\u064A\u062A\u0645 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.")),Notification.success("\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062C\u0627\u062D."),this.refreshApprovalRequestsSection(),typeof AppUI<"u"&&AppUI.updateNotificationsBadge&&AppUI.updateNotificationsBadge()}catch(o){Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628:",o),Notification.error("\u062A\u0639\u0630\u0631 \u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628: "+o.message)}},getContractorsForAnalyticsList(){return(typeof this.getApprovedEntitiesStatsSource=="function"?this.getApprovedEntitiesStatsSource():AppState.appData.approvedContractors||[]).filter(a=>this.normalizeApprovedEntityType(a.entityType||a.type)==="contractor").map(a=>({...a,id:a.contractorId||a.id,contractorId:a.contractorId||a.id,name:a.companyName||a.name||"",companyName:a.companyName||a.name||"",endDate:a.expiryDate||a.endDate,expiryDate:a.expiryDate||a.endDate,approvedEntityId:a.id,isActive:a.isActive,status:this.isEntityEnabled(a)?a.status||"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637",entityType:a.entityType||"contractor",code:a.code||a.isoCode||"",serviceType:a.serviceType||""}))},_ctrGetApprovedContractorsForAnalytics(){return this.getContractorsForAnalyticsList()},_ctrGetViolationPlaceLabel(t){const a=String(t?.violationPlace||t?.place||"").trim(),e=String(t?.violationLocation||t?.location||"").trim();return a&&e?`${e} \u2014 ${a}`:a||e||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"},_ctrPdfArStyle_(){return"font-family:'Cairo','Tahoma','Segoe UI',sans-serif;direction:rtl;unicode-bidi:embed;letter-spacing:0;word-spacing:normal;"},_getContractorViolationsAnalysisData_(t,a,e=0){const r=Array.isArray(t)&&t.length>0?t:this.getContractorsForAnalyticsList();if(!Array.isArray(a)||a.length===0)return{rows:[],summary:null,overallResolution:0};const o=(r||[]).map(c=>{const l=this.prepareContractorForAnalytics(c),p=this.getPreferredContractorAnalyticsKey(l,c.id||c.contractorId||c.code||c.isoCode),u=this.buildContractorAnalyticsMatchers(l,p),f=this.dedupeContractorRecords(a.filter(u.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]),d={total:0,high:0,medium:0,low:0,resolved:0,pending:0};return f.forEach(m=>{d.total++;const v=(m.severity||"").toString().trim();v==="\u0639\u0627\u0644\u064A\u0629"||v==="high"||v==="\u062D\u0631\u062C\u0629"?d.high++:v==="\u0645\u062A\u0648\u0633\u0637\u0629"||v==="medium"?d.medium++:d.low++;const h=(m.status||"").toString().trim();h==="\u0645\u062D\u0644\u0648\u0644"||h==="resolved"||h==="\u062A\u0645 \u0627\u0644\u062D\u0644"?d.resolved++:d.pending++}),{name:l.name||l.companyName||c.name||c.companyName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",stats:d}}).filter(c=>c.stats.total>0).sort((c,l)=>l.stats.total-c.stats.total),i=e>0?o.slice(0,e):o,s=i.reduce((c,l)=>(c.total+=l.stats.total,c.high+=l.stats.high,c.resolved+=l.stats.resolved,c.pending+=l.stats.pending,c),{total:0,high:0,resolved:0,pending:0}),n=s.total>0?Math.round(s.resolved/s.total*100):0;return{rows:i,summary:s,overallResolution:n,allCount:o.length}},_getContractorLocationAnalysisData_(t,a,e=12){const r=Array.isArray(t)?t:[],o=Array.isArray(a)?a:[],i={};return o.forEach(s=>{const n=this._ctrGetViolationPlaceLabel(s);i[n]||(i[n]={violations:0,contractorCounts:{}});const c=i[n];c.violations++;let l=String(s.contractorName||"").trim();if(!l&&r.length)for(const p of r){const u=this.prepareContractorForAnalytics(p),f=this.getPreferredContractorAnalyticsKey(u,p.id||p.contractorId);if(this.buildContractorAnalyticsMatchers(u,f).violationBelongsToContractor(s)){l=u.name||u.companyName||p.name||p.companyName||"";break}}l&&(c.contractorCounts[l]=(c.contractorCounts[l]||0)+1)}),Object.entries(i).map(([s,n])=>{const c=Object.entries(n.contractorCounts).sort((l,p)=>p[1]-l[1])[0]||null;return{label:s,violations:n.violations,contractorsCount:Object.keys(n.contractorCounts).length,topContractor:c?{name:c[0],count:c[1]}:null}}).sort((s,n)=>n.violations-s.violations||n.contractorsCount-s.contractorsCount).slice(0,e)},async _ctrDownloadAnalyticsPdf_(t,a){return typeof Violations<"u"&&typeof Violations._downloadHtmlReportAsPdf=="function"?Violations._downloadHtmlReportAsPdf(t,a):typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function"?(await FormHeader.generatePDF(t,a),!0):this._ctrOpenAnalyticsPrintReport(t)},_renderContractorAnalyticsShellHTML(){const t=String(this._ctrAnalysisPeriod??"0"),a=["30 \u064A\u0648\u0645","3 \u0623\u0634\u0647\u0631","6 \u0623\u0634\u0647\u0631","\u0633\u0646\u0629","\u0627\u0644\u0643\u0644"];return`
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
                    <div style="display:flex;gap:3px;flex-wrap:wrap;">${["30","90","180","365","0"].map((o,i)=>{const s=t===o;return`<button type="button" class="ctr-period-btn" data-period="${o}" style="padding:5px 10px;border-radius:8px;border:none;cursor:pointer;font-size:0.75rem;font-weight:600;transition:all .2s;background:${s?"#fff":"rgba(255,255,255,0.15)"};color:${s?"#0b2d4f":"#fff"};">${a[i]}</button>`}).join("")}</div>
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
            `},async ensureContractorChartJSLoaded(){return typeof Chart<"u"?!0:document.querySelector('script[src*="chart.js"], script[src*="chartjs"]')?new Promise(a=>{const e=setInterval(()=>{typeof Chart<"u"&&(clearInterval(e),a(!0))},100);setTimeout(()=>{clearInterval(e),a(!1)},5e3)}):new Promise(a=>{const e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",e.crossOrigin="anonymous",e.onload=()=>a(typeof Chart<"u"),e.onerror=()=>a(!1),document.head.appendChild(e)})},_ctrFilterRecordsByPeriod(t,a,e){if(!a||a===0)return t;const r=new Date;return r.setDate(r.getDate()-a),(t||[]).filter(o=>{const i=typeof e=="function"?e(o):o?.date;if(!i)return!0;const s=new Date(i);return!isNaN(s.getTime())&&s>=r})},_ctrGetContractorContractState(t){const a=t?.endDate||t?.expiryDate;if(!a)return"unknown";try{const e=new Date(a),r=new Date;r.setHours(0,0,0,0),e.setHours(0,0,0,0);const o=Math.ceil((e-r)/(1e3*60*60*24));return o<0?"expired":o<=30?"expiring":"active"}catch{return"unknown"}},_ctrApplyAnalyticsFilters(t,a){const e=document.getElementById("ctr-af-entity")?.value||"",r=document.getElementById("ctr-af-status")?.value||"",o=document.getElementById("ctr-af-severity")?.value||"";let i=Array.isArray(t)?[...t]:[];e==="contractor"?i=i.filter(l=>this.normalizeApprovedEntityType(l.entityType||l.type)==="contractor"):e==="supplier"&&(i=i.filter(l=>this.normalizeApprovedEntityType(l.entityType||l.type)==="supplier")),r==="active"?i=i.filter(l=>this.isEntityEnabled(l)):r==="inactive"?i=i.filter(l=>!this.isEntityEnabled(l)):r==="expired"&&(i=i.filter(l=>this._ctrGetContractorContractState(l)==="expired"));let s=Array.isArray(a)?[...a]:[];o==="high"?s=s.filter(l=>["\u0639\u0627\u0644\u064A\u0629","high","\u062D\u0631\u062C\u0629"].includes(String(l.severity||"").trim())):o==="medium"?s=s.filter(l=>["\u0645\u062A\u0648\u0633\u0637\u0629","medium"].includes(String(l.severity||"").trim())):o==="low"&&(s=s.filter(l=>["\u0645\u0646\u062E\u0641\u0636\u0629","low","\u0642\u0644\u064A\u0644\u0629","\u0645\u0646\u062E\u0636\u0629"].includes(String(l.severity||"").trim())));const n=!!(e||r||o),c=document.getElementById("ctr-filter-active-badge");return c&&(c.style.display=n?"inline":"none"),{filteredContractors:i,filteredViolations:s,hasFilters:n}},_ctrGroupByField(t,a,e=0){const r={};(t||[]).forEach(i=>{const s=String(typeof a=="function"?a(i):i?.label||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";r[s]=(r[s]||0)+1});let o=Object.entries(r).sort((i,s)=>s[1]-i[1]);return e>0&&(o=o.slice(0,e)),{labels:o.map(i=>i[0]),data:o.map(i=>i[1])}},_ctrChartColors(t){const a=["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#0ea5e9","#ec4899","#14b8a6","#f97316","#64748b"];return Array.from({length:t},(e,r)=>a[r%a.length])},_ctrDestroyChart(t){const a=this._ctrAnalyticsCharts&&this._ctrAnalyticsCharts[t];if(a){try{a.destroy()}catch{}delete this._ctrAnalyticsCharts[t]}},_ctrDrawDoughnut(t,a,e,r){const o=document.getElementById(t),i=document.getElementById(t+"-empty");if(!o)return;if(!e.length||e.reduce((c,l)=>c+l,0)===0){o.style.display="none",i&&(i.style.display="flex"),this._ctrDestroyChart(t);return}if(o.style.display="block",i&&(i.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const s=e.reduce((c,l)=>c+l,0),n=new Chart(o,{type:"doughnut",data:{labels:a,datasets:[{data:e,backgroundColor:r||this._ctrChartColors(e.length),borderWidth:2,borderColor:"#fff",hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"bottom",labels:{padding:10,font:{size:11},usePointStyle:!0,boxWidth:9}},tooltip:{callbacks:{label:c=>` ${c.label}: ${c.parsed} (${s>0?(c.parsed/s*100).toFixed(1):0}%)`}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=n},_ctrDrawHBar(t,a,e,r){const o=document.getElementById(t),i=document.getElementById(t+"-empty");if(!o)return;if(!e.length||e.reduce((n,c)=>n+c,0)===0){o.style.display="none",i&&(i.style.display="flex"),this._ctrDestroyChart(t);return}if(o.style.display="block",i&&(i.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const s=new Chart(o,{type:"bar",data:{labels:a,datasets:[{data:e,backgroundColor:r||"rgba(99,102,241,0.75)",borderRadius:5,borderSkipped:!1}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{beginAtZero:!0,ticks:{precision:0,font:{size:11}},grid:{color:"#f1f5f9"}},y:{ticks:{font:{size:11},callback:n=>{const c=String(a[n]||"");return c.length>18?`${c.slice(0,17)}\u2026`:c}}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=s},_ctrDrawTrend(t,a){const e=document.getElementById(t),r=document.getElementById(t+"-empty");if(!e)return;const o=[],i=[],s=new Date;for(let c=11;c>=0;c--){const l=new Date(s.getFullYear(),s.getMonth()-c,1);o.push(l.toLocaleDateString("ar-SA",{month:"short",year:"2-digit"}));const p=l.getFullYear(),u=l.getMonth();i.push((a||[]).filter(f=>{const d=f.violationDate||f.date||f.createdAt;if(!d)return!1;const m=new Date(d);return!isNaN(m.getTime())&&m.getFullYear()===p&&m.getMonth()===u}).length)}if(i.reduce((c,l)=>c+l,0)===0){e.style.display="none",r&&(r.style.display="flex"),this._ctrDestroyChart(t);return}if(e.style.display="block",r&&(r.style.display="none"),this._ctrDestroyChart(t),typeof Chart>"u")return;const n=new Chart(e,{type:"line",data:{labels:o,datasets:[{data:i,borderColor:"#6366f1",backgroundColor:"rgba(99,102,241,0.12)",fill:!0,tension:.35,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{y:{beginAtZero:!0,ticks:{precision:0}},x:{ticks:{font:{size:10}}}}}});this._ctrAnalyticsCharts||(this._ctrAnalyticsCharts={}),this._ctrAnalyticsCharts[t]=n},async _fetchContractorAnalyticsData(){if(!(typeof GoogleIntegration>"u"||!GoogleIntegration.readFromSheets||!AppState.googleConfig?.appsScript?.enabled))try{const[t,a]=await Promise.all([GoogleIntegration.readFromSheets("Violations"),GoogleIntegration.readFromSheets("ContractorEvaluations")]);Array.isArray(t)&&(AppState.appData.violations=t),Array.isArray(a)&&(AppState.appData.contractorEvaluations=a)}catch(t){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",t)}},bindContractorAnalyticsEvents(){const t=document.getElementById("ctr-analytics-root");if(!t||t.dataset.bound==="1")return;t.dataset.bound="1",t.querySelectorAll(".ctr-period-btn").forEach(r=>{r.addEventListener("click",()=>{this._ctrAnalysisPeriod=r.getAttribute("data-period")||"0",t.querySelectorAll(".ctr-period-btn").forEach(o=>{const i=o===r;o.style.background=i?"#fff":"rgba(255,255,255,0.15)",o.style.color=i?"#4338ca":"#fff"}),this.updateContractorAnalyticsResults()})}),document.getElementById("ctr-analytics-refresh")?.addEventListener("click",()=>this.loadContractorAnalytics()),document.getElementById("ctr-export-pdf-btn")?.addEventListener("click",()=>this.exportContractorAnalyticsPDF());const a=document.getElementById("ctr-toggle-filters-btn"),e=document.getElementById("ctr-filter-panel");a?.addEventListener("click",()=>{if(!e)return;const r=e.style.display!=="none";e.style.display=r?"none":"block"}),document.getElementById("ctr-filter-reset-btn")?.addEventListener("click",()=>{["ctr-af-entity","ctr-af-status","ctr-af-severity"].forEach(r=>{const o=document.getElementById(r);o&&(o.value="")}),this.updateContractorAnalyticsResults()}),["ctr-af-entity","ctr-af-status","ctr-af-severity"].forEach(r=>{document.getElementById(r)?.addEventListener("change",()=>this.updateContractorAnalyticsResults())})},async loadContractorAnalytics(){if(document.getElementById("ctr-analytics-root")){try{await Promise.allSettled([this.ensureApprovedContractorsDataLoaded({force:!1}),this._fetchContractorAnalyticsData()])}catch{}await this.updateContractorAnalyticsResults()}},_getCtrAnalysisPeriodLabel(){return{30:"30 \u064A\u0648\u0645",90:"3 \u0623\u0634\u0647\u0631",180:"6 \u0623\u0634\u0647\u0631",365:"\u0633\u0646\u0629",0:"\u0627\u0644\u0643\u0644"}[String(this._ctrAnalysisPeriod||"0")]||"\u0627\u0644\u0643\u0644"},_ctrFilterApprovedContractors(t,a,e){let r=Array.isArray(t)?[...t]:[];return a==="contractor"?r=r.filter(o=>this.normalizeApprovedEntityType(o.entityType||o.type)==="contractor"):a==="supplier"&&(r=r.filter(o=>this.normalizeApprovedEntityType(o.entityType||o.type)==="supplier")),e==="active"?r=r.filter(o=>this.isEntityEnabled(o)):e==="inactive"?r=r.filter(o=>!this.isEntityEnabled(o)):e==="expired"&&(r=r.filter(o=>this._ctrGetContractorContractState(o)==="expired")),r},_ctrScopeRecordsToContractors(t,a,e){if(!Array.isArray(t)||!Array.isArray(a)||a.length===0)return[];const r=e==="evaluation"?"evaluationBelongsToContractor":"violationBelongsToContractor",o=e==="evaluation"?["evaluationId","id","isoCode"]:["isoCode","id"],i=e==="evaluation"?["contractorId","contractorName","evaluationDate","projectName","finalScore"]:["contractorId","contractorName","violationType","violationDate","violationTime"],s=[];return a.forEach(n=>{const c=this.prepareContractorForAnalytics(n),l=this.getPreferredContractorAnalyticsKey(c,n.id||n.contractorId),p=this.buildContractorAnalyticsMatchers(c,l);s.push(...t.filter(u=>p[r](u)))}),this.dedupeContractorRecords(s,o,i)},buildContractorDetailedStatsList(t,a,e){return!Array.isArray(t)||t.length===0?[]:t.map(r=>{const o=this.prepareContractorForAnalytics(r),i=this.getPreferredContractorAnalyticsKey(o,r.id||r.contractorId),s=this.buildContractorAnalyticsMatchers(o,i),n=this.dedupeContractorRecords((a||[]).filter(s.evaluationBelongsToContractor),["evaluationId","id","isoCode"],["contractorId","contractorName","evaluationDate","projectName","finalScore"]),c=new Set(n.map(y=>String(y?.evaluationId||y?.id||"").trim()).filter(Boolean)),l=c.size>0?c.size:n.length,p=this.dedupeContractorRecords((e||[]).filter(s.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate","violationTime"]);let u=0;if(n.length>0){const y=n.map(w=>parseFloat(w.finalScore)||parseFloat(w.score)||0).filter(w=>!isNaN(w)&&w>=0&&w<=100);y.length>0&&(u=Math.round(y.reduce((w,C)=>w+C,0)/y.length*100)/100)}const f=p.filter(y=>{const w=(y.severity||"").toString().trim();return w==="\u0639\u0627\u0644\u064A\u0629"||w==="high"||w==="\u062D\u0631\u062C\u0629"}).length,d=p.filter(y=>{const w=(y.status||"").toString().trim();return w==="\u0645\u062D\u0644\u0648\u0644"||w==="resolved"||w==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,m=p.length>0?Math.round(d/p.length*100):100;let v="active",h=null;const A=r.endDate||r.expiryDate;if(A)try{const y=new Date(A),C=Math.ceil((y-new Date)/(1e3*60*60*24));h=C,C<0?v="expired":C<=30&&(v="expiring")}catch{v="unknown"}return{...r,analyticsLookupKey:i,analyticsDisplayName:o.name||o.companyName||r.name||r.companyName||"",evaluationsCount:l,violationsCount:p.length,avgScore:u,highViolations:f,resolvedViolations:d,resolutionRate:m,contractStatus:v,daysRemaining:h}}).sort((r,o)=>{const i=r.avgScore-r.violationsCount*5-r.highViolations*10;return o.avgScore-o.violationsCount*5-o.highViolations*10-i})},_collectContractorAnalyticsSnapshot(){const t=parseInt(this._ctrAnalysisPeriod||"0",10),a=this.getContractorsForAnalyticsList(),e=typeof this.getApprovedEntitiesStatsSource=="function"?this.getApprovedEntitiesStatsSource():AppState.appData.approvedContractors||[];let r=AppState.appData.contractorEvaluations||[],o=(AppState.appData.violations||[]).filter(v=>v.contractorName||v.contractorId||v.personType&&(v.personType==="contractor"||v.personType==="\u0645\u0642\u0627\u0648\u0644"));r=this._ctrFilterRecordsByPeriod(r,t,v=>v.evaluationDate||v.createdAt||v.date),o=this._ctrFilterRecordsByPeriod(o,t,v=>v.violationDate||v.date||v.createdAt);const{filteredContractors:i,filteredViolations:s}=this._ctrApplyAnalyticsFilters(a,o),n=document.getElementById("ctr-af-entity")?.value||"",c=document.getElementById("ctr-af-status")?.value||"",l=this._ctrFilterApprovedContractors(e,n,c),p=this._ctrScopeRecordsToContractors(r,i,"evaluation"),u=this._ctrScopeRecordsToContractors(s,i,"violation"),f=this.buildContractorDetailedStatsList(i,p,u),d=this.buildContractorAnalyticsKpis(i,l,f,u),m=this.getExpiringContracts(i,l);return{period:t,periodLabel:this._getCtrAnalysisPeriodLabel(),filteredContractors:i,filteredApproved:l,evaluations:p,violations:u,analytics:d,expiringContracts:m,detailedStats:f,resultsCountText:i.length+" \u0645\u0642\u0627\u0648\u0644 \u2022 "+f.reduce((v,h)=>v+(h.violationsCount||0),0)+" \u0645\u062E\u0627\u0644\u0641\u0629"}},_ctrContractorIsApproved(t,a){if(!t)return!1;if(t.approvedEntityId)return!0;const e=this.prepareContractorForAnalytics(t),r=this.getPreferredContractorAnalyticsKey(e,t.id||t.contractorId);return(a||[]).some(o=>{if(!this.isApprovalActive(o,!0))return!1;if(String(o.id||"")===String(t.approvedEntityId||"")||String(o.contractorId||"")&&String(o.contractorId)===String(t.id||t.contractorId||""))return!0;const i=this.prepareContractorForAnalytics({...o,name:o.companyName||o.name||"",companyName:o.companyName||o.name||""}),s=this.getPreferredContractorAnalyticsKey(i,o.contractorId||o.id);return!!(r&&s&&r===s)})},buildContractorAnalyticsKpis(t,a,e,r){const o=Array.isArray(t)?t:[],i=Array.isArray(e)?e:[],s=Array.isArray(r)?r:[],n=Array.isArray(a)?a:[],c=o.length,l=o.filter(g=>g.approvedEntityId||this._ctrContractorIsApproved(g,n)||this.isApprovalActive(g,!0)).length,p=o.filter(g=>this.isEntityEnabled(g)).length,u=o.filter(g=>!this.isEntityEnabled(g)).length,f=i.reduce((g,x)=>g+(x.evaluationsCount||0),0),d=i.reduce((g,x)=>g+(x.violationsCount||0),0),m=i.reduce((g,x)=>g+(x.resolvedViolations||0),0);let v=0,h=0;i.forEach(g=>{const x=g.evaluationsCount||0;x>0&&!isNaN(g.avgScore)&&(v+=g.avgScore*x,h+=x)});const A=h>0?Math.round(v/h*100)/100:0,y=d>0?Math.round(m/d*1e4)/100:0,w=new Date;w.setHours(0,0,0,0);const C=new Date(w.getTime()+720*60*60*1e3);let k=0,D=0;o.forEach(g=>{const x=this._ctrGetContractorContractState(g);x==="expired"?k++:x==="expiring"&&D++});const $=c>0?Math.round(l/c*1e4)/100:0,b=c>0?Math.round(p/c*1e4)/100:0,S=c>0?Math.round(u/c*1e4)/100:0,I=c>0?Math.round(d/c*100)/100:0,L=s.filter(g=>g.contractorName||g.contractorId||g.personType&&(g.personType==="contractor"||g.personType==="\u0645\u0642\u0627\u0648\u0644")),M=L.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0639\u0627\u0644\u064A\u0629"||x==="high"||x==="\u062D\u0631\u062C\u0629"}).length,R=L.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0645\u062A\u0648\u0633\u0637\u0629"||x==="medium"}).length,T=L.filter(g=>{const x=(g.severity||"").toString().trim();return x==="\u0645\u0646\u062E\u0641\u0636\u0629"||x==="low"||x==="\u0642\u0644\u064A\u0644\u0629"}).length;return{totalContractors:c,totalApproved:l,totalEvaluations:f,totalViolations:d,avgScore:A,activeContractors:p,inactiveContractors:u,expiredContractors:k,expiringSoon:D,approvalRate:$,violationsPerContractor:I,activeRate:b,inactiveRate:S,violationResolutionRate:y,resolvedViolations:m,highSeverityViolations:M,mediumSeverityViolations:R,lowSeverityViolations:T}},calculateContractorAnalytics(t,a,e,r){const o=this.buildContractorDetailedStatsList(Array.isArray(t)?t:[],Array.isArray(e)?e:[],Array.isArray(r)?r:[]);return this.buildContractorAnalyticsKpis(Array.isArray(t)?t:[],Array.isArray(a)?a:[],o,Array.isArray(r)?r:[])},_buildCtrAnalyticsExportLegend_(t){const a=r=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(r):String(r??""),e=a(new Date().toLocaleString("ar-SA",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"}));return['<div class="ia-export-legend" dir="rtl" style="margin-top:12px;padding:14px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;page-break-inside:avoid;">','<div style="font-weight:700;font-size:12px;color:#475569;margin-bottom:10px;">\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631</div>','<div style="display:flex;flex-wrap:wrap;gap:10px 18px;font-size:11px;line-height:1.55;color:#334155;">','<div><strong style="color:#64748b;">\u0627\u0644\u0641\u062A\u0631\u0629:</strong> ',a(t.periodLabel),"</div>",'<div><strong style="color:#64748b;">\u0627\u0644\u0633\u062C\u0644\u0627\u062A:</strong> ',a(t.resultsCountText),"</div>",'<div><strong style="color:#64748b;">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631:</strong> ',e,"</div>","</div></div>"].join("")},_buildCtrAnalyticsExportHtml_(t){const a=b=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(b??"")):String(b??""),e=this._ctrPdfArStyle_(),r=t.analytics,o=t.filteredContractors||[],i=t.violations||[],s={\u0646\u0634\u0637:0,"\u063A\u064A\u0631 \u0646\u0634\u0637":0,"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":0,\u0645\u0646\u062A\u0647\u064A:0};o.forEach(b=>{const S=this._ctrGetContractorContractState(b);S==="expired"?s.\u0645\u0646\u062A\u0647\u064A++:S==="expiring"?s["\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"]++:this.isEntityEnabled(b)?s.\u0646\u0634\u0637++:s["\u063A\u064A\u0631 \u0646\u0634\u0637"]++});const n=(b,S,I,L,M)=>`
            <div style="flex:1 1 140px;min-width:130px;padding:12px 14px;border-radius:10px;background:${I};border:1px solid ${L};">
                <div style="font-size:11px;font-weight:700;color:${M};margin-bottom:6px;${e}">${a(b)}</div>
                <div style="font-size:22px;font-weight:800;color:${M};line-height:1;${e}">${a(S)}</div>
            </div>`,c=this._getContractorViolationsAnalysisData_(o,i,0),l=c.rows,p=c.summary||{total:0,high:0,resolved:0,pending:0},u=c.overallResolution||0,f=this._getContractorLocationAnalysisData_(o,i,12),d=this._ctrGroupByField(i,b=>String(b.violationLocation||b.location||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),m=this._ctrGroupByField(i,b=>String(b.violationPlace||b.place||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8),v=l.map((b,S)=>{const I=b.stats.total>0?Math.round(b.stats.resolved/b.stats.total*100):0;return`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b.name)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${e}">${b.stats.total}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${e}">${b.stats.high}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b45309;${e}">${b.stats.medium}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${e}">${b.stats.low}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#15803d;${e}">${b.stats.resolved}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#c2410c;${e}">${b.stats.pending}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${e}">${I}%</td>
            </tr>`}).join(""),h=f.map((b,S)=>{const I=o.length>0?Math.round(b.contractorsCount/o.length*100):0;return`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b.label)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;color:#dc2626;${e}">${b.violations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${b.contractorsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${I}%</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${b.topContractor?a(b.topContractor.name)+" ("+b.topContractor.count+")":"\u2014"}</td>
            </tr>`}).join(""),A=d.labels.map((b,S)=>`<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${e}">${d.data[S]}</td>
        </tr>`).join(""),y=m.labels.map((b,S)=>`<tr>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b)}</td>
            <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${e}">${m.data[S]}</td>
        </tr>`).join(""),w=(t.detailedStats||[]).filter(b=>b.violationsCount>0).sort((b,S)=>S.violationsCount-b.violationsCount).slice(0,10).map((b,S)=>`<tr>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${S+1}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b.analyticsDisplayName||b.name||b.companyName)}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;font-weight:700;${e}">${b.violationsCount}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;color:#b91c1c;${e}">${b.highViolations}</td>
                <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${b.resolutionRate}%</td>
            </tr>`).join(""),C=(t.detailedStats||[]).map((b,S)=>{let I="\u0646\u0634\u0637";b.contractStatus==="expired"?I="\u0645\u0646\u062A\u0647\u064A":b.contractStatus==="expiring"?I="\u0642\u0631\u064A\u0628 ("+b.daysRemaining+" \u064A\u0648\u0645)":b.contractStatus==="unknown"&&(I="\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");const L=this.isEntityEnabled(b)?"\u0646\u0634\u0637":"\u063A\u064A\u0631 \u0646\u0634\u0637";return`<tr>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${S+1}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:right;font-size:10px;${e}">${a(b.analyticsDisplayName||b.name||b.companyName)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${a(L)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${a(b.serviceType||b.entityType||"-")}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${a(I)}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${b.evaluationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${b.avgScore}%</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${b.violationsCount}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${b.highViolations}</td>
                <td dir="rtl" style="padding:8px;border:1px solid #e5e7eb;text-align:center;font-size:10px;${e}">${b.resolutionRate}%</td>
            </tr>`}).join(""),k=(t.expiringContracts||[]).map(b=>`<tr>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:right;font-size:11px;${e}">${a(b.name)}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${b.daysRemaining}</td>
            <td dir="rtl" style="padding:9px 8px;border:1px solid #e5e7eb;text-align:center;font-size:11px;${e}">${a(b.endDate?new Date(b.endDate).toLocaleDateString("ar-SA"):"-")}</td>
        </tr>`).join(""),D=(b,S="#312e81",I="#c7d2fe")=>`
            <h3 dir="rtl" style="font-size:16px;font-weight:800;color:${S};margin:22px 0 10px;padding-bottom:8px;border-bottom:2px solid ${I};${e}">${a(b)}</h3>`,$=(b,S="#312e81")=>`<tr style="background:${S};color:#fff;">${b.map(I=>`<th dir="rtl" style="padding:10px 8px;border:1px solid ${S};text-align:center;font-weight:700;font-size:11px;white-space:nowrap;${e}">${I}</th>`).join("")}</tr>`;return`
            <div dir="rtl" style="direction:rtl;${e}">
                ${D("\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629","#1e3a8a","#bfdbfe")}
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

                ${D("\u062A\u062D\u0644\u064A\u0644 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","#991b1b","#fecaca")}
                <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
                    ${n("\u0645\u0642\u0627\u0648\u0644\u0648\u0646 \u0645\u062E\u0627\u0644\u0650\u0641\u0648\u0646",l.length,"#fef2f2","#fecaca","#b91c1c")}
                    ${n("\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",p.total,"#fff7ed","#fed7aa","#c2410c")}
                    ${n("\u0634\u062F\u0629 \u0639\u0627\u0644\u064A\u0629",p.high,"#fef2f2","#fecaca","#991b1b")}
                    ${n("\u0645\u062D\u0644\u0648\u0644\u0629",p.resolved,"#ecfdf5","#bbf7d0","#15803d")}
                    ${n("\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629",p.pending,"#fffbeb","#fde68a","#b45309")}
                    ${n("\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644",u+"%","#f5f3ff","#ddd6fe","#6d28d9")}
                </div>
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${e}">
                    <thead>${$(["#","\u0627\u0633\u0645 \u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A","\u0639\u0627\u0644\u064A\u0629","\u0645\u062A\u0648\u0633\u0637\u0629","\u0645\u0646\u062E\u0641\u0636\u0629","\u0645\u062D\u0644\u0648\u0644\u0629","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#b91c1c")}</thead>
                    <tbody>${v||`<tr><td colspan="9" style="padding:16px;text-align:center;color:#64748b;${e}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</td></tr>`}</tbody>
                </table>

                ${D("\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","#1e40af","#bfdbfe")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${e}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0648\u0642\u0639 / \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","% \u0645\u0646 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646","\u0623\u0639\u0644\u0649 \u0645\u0642\u0627\u0648\u0644"],"#1d4ed8")}</thead>
                    <tbody>${h||`<tr><td colspan="6" style="padding:16px;text-align:center;color:#64748b;${e}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0623\u0645\u0627\u0643\u0646</td></tr>`}</tbody>
                </table>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:8px;">
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#1d4ed8;margin:0 0 8px;${e}">\u062D\u0633\u0628 \u0627\u0644\u0645\u0648\u0642\u0639 (\u0623\u0639\u0644\u0649 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${e}">
                            <thead>${$(["\u0627\u0644\u0645\u0648\u0642\u0639","\u0627\u0644\u0639\u062F\u062F"],"#3b82f6")}</thead>
                            <tbody>${A||`<tr><td colspan="2" style="padding:12px;text-align:center;${e}">\u2014</td></tr>`}</tbody>
                        </table>
                    </div>
                    <div>
                        <h4 dir="rtl" style="font-size:13px;font-weight:700;color:#b45309;margin:0 0 8px;${e}">\u062D\u0633\u0628 \u0645\u0643\u0627\u0646 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0629 (\u0623\u0639\u0644\u0649 8)</h4>
                        <table dir="rtl" style="width:100%;border-collapse:collapse;${e}">
                            <thead>${$(["\u0627\u0644\u0645\u0643\u0627\u0646","\u0627\u0644\u0639\u062F\u062F"],"#d97706")}</thead>
                            <tbody>${y||`<tr><td colspan="2" style="padding:12px;text-align:center;${e}">\u2014</td></tr>`}</tbody>
                        </table>
                    </div>
                </div>

                ${w?`${D("\u0623\u0639\u0644\u0649 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0645\u062E\u0627\u0644\u0641\u0627\u062A","#9a3412","#fed7aa")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${e}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#c2410c")}</thead>
                    <tbody>${w}</tbody>
                </table>`:""}

                ${D("\u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644 \u0644\u0643\u0644 \u0645\u0642\u0627\u0648\u0644","#4338ca","#c7d2fe")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;margin-bottom:8px;${e}">
                    <thead>${$(["#","\u0627\u0644\u0645\u0642\u0627\u0648\u0644","\u0627\u0644\u062A\u0641\u0639\u064A\u0644","\u0646\u0648\u0639 \u0627\u0644\u062E\u062F\u0645\u0629","\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0642\u062F","\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A","\u0645\u062A\u0648\u0633\u0637","\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A","\u0639\u0627\u0644\u064A\u0629","\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0644"],"#4f46e5")}</thead>
                    <tbody>${C||`<tr><td colspan="10" style="padding:16px;text-align:center;color:#64748b;${e}">\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A</td></tr>`}</tbody>
                </table>

                ${k?`${D("\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621 (30 \u064A\u0648\u0645)","#0f766e","#99f6e4")}
                <table dir="rtl" style="width:100%;border-collapse:collapse;${e}">
                    <thead>${$(["\u0627\u0644\u062C\u0647\u0629","\u0627\u0644\u0623\u064A\u0627\u0645 \u0627\u0644\u0645\u062A\u0628\u0642\u064A\u0629","\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"],"#0d9488")}</thead>
                    <tbody>${k}</tbody>
                </table>`:""}
            </div>`},_ctrOpenAnalyticsPrintReport(t){try{const a=new Blob([t],{type:"text/html;charset=utf-8"}),e=URL.createObjectURL(a),r=window.open(e,"_blank");return r?(r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>URL.revokeObjectURL(e),1e3)},450)},Notification?.success?.("\u062C\u0627\u0631\u064A \u062A\u062D\u0636\u064A\u0631 \u062A\u0642\u0631\u064A\u0631 PDF \u0644\u0644\u0637\u0628\u0627\u0639\u0629..."),!0):(Notification?.error?.("\u064A\u0631\u062C\u0649 \u0627\u0644\u0633\u0645\u0627\u062D \u0644\u0644\u0646\u0648\u0627\u0641\u0630 \u0627\u0644\u0645\u0646\u0628\u062B\u0642\u0629 \u0644\u062A\u0635\u062F\u064A\u0631 PDF"),!1)}catch(a){return Utils.safeError("\u0641\u0634\u0644 \u0641\u062A\u062D \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644:",a),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A"),!1}},async updateContractorAnalyticsResults(){if(!document.getElementById("ctr-analytics-root"))return;const a=this._collectContractorAnalyticsSnapshot(),{filteredContractors:e,filteredApproved:r,evaluations:o,violations:i,analytics:s,expiringContracts:n}=a,c=document.getElementById("ctr-filter-results-count");c&&(c.textContent=a.resultsCountText);const l=document.getElementById("ctr-kpi-strip");if(l){const v=[{label:"\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",value:s.totalContractors,icon:"fas fa-users",color:"#3b82f6",bg:"#eff6ff",border:"#bfdbfe"},{label:"\u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0648\u0646",value:s.totalApproved,icon:"fas fa-check-circle",color:"#10b981",bg:"#ecfdf5",border:"#a7f3d0"},{label:"\u0646\u0634\u0637\u0648\u0646",value:s.activeContractors,icon:"fas fa-bolt",color:"#f97316",bg:"#fff7ed",border:"#fed7aa"},{label:"\u063A\u064A\u0631 \u0646\u0634\u0637",value:s.inactiveContractors||0,icon:"fas fa-ban",color:"#dc2626",bg:"#fef2f2",border:"#fecaca"},{label:"\u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A",value:s.totalEvaluations,icon:"fas fa-clipboard-check",color:"#eab308",bg:"#fefce8",border:"#fde047"},{label:"\u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",value:s.totalViolations,icon:"fas fa-exclamation-triangle",color:"#ef4444",bg:"#fef2f2",border:"#fecaca"},{label:"\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645",value:`${s.avgScore}%`,icon:"fas fa-star",color:"#6366f1",bg:"#eef2ff",border:"#c7d2fe"},{label:"\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A",value:`${s.violationResolutionRate}%`,icon:"fas fa-check-double",color:"#8b5cf6",bg:"#f5f3ff",border:"#ddd6fe"},{label:"\u0639\u0642\u0648\u062F \u0642\u0631\u064A\u0628\u0629 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",value:s.expiringSoon||0,icon:"fas fa-hourglass-half",color:"#0d9488",bg:"#f0fdfa",border:"#99f6e4"}];l.innerHTML=v.map(h=>`
                <div style="background:${h.bg};border:1px solid ${h.border};border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;">
                    <div style="width:38px;height:38px;background:${h.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="${h.icon}" style="color:#fff;font-size:15px;"></i>
                    </div>
                    <div>
                        <div style="font-size:1.3rem;font-weight:800;color:${h.color};line-height:1;">${h.value}</div>
                        <div style="font-size:0.7rem;color:#64748b;margin-top:2px;white-space:nowrap;">${h.label}</div>
                    </div>
                </div>`).join("")}if(await this.ensureContractorChartJSLoaded()&&typeof Chart<"u"){const v={\u0646\u0634\u0637:0,"\u063A\u064A\u0631 \u0646\u0634\u0637":0,"\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621":0,\u0645\u0646\u062A\u0647\u064A:0};e.forEach(D=>{const $=this._ctrGetContractorContractState(D);$==="expired"?v.\u0645\u0646\u062A\u0647\u064A++:$==="expiring"?v["\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"]++:this.isEntityEnabled(D)?v.\u0646\u0634\u0637++:v["\u063A\u064A\u0631 \u0646\u0634\u0637"]++});const h=Object.entries(v).filter(([,D])=>D>0);this._ctrDrawDoughnut("ctr-chart-status",h.map(D=>D[0]),h.map(D=>D[1]),["#10b981","#ef4444","#f59e0b","#94a3b8"]);const A=this._ctrGroupByField(i,D=>{const $=String(D.severity||"").trim();return["\u0639\u0627\u0644\u064A\u0629","high","\u062D\u0631\u062C\u0629"].includes($)?"\u0639\u0627\u0644\u064A\u0629":["\u0645\u062A\u0648\u0633\u0637\u0629","medium"].includes($)?"\u0645\u062A\u0648\u0633\u0637\u0629":["\u0645\u0646\u062E\u0641\u0636\u0629","low","\u0642\u0644\u064A\u0644\u0629","\u0645\u0646\u062E\u0636\u0629"].includes($)?"\u0645\u0646\u062E\u0641\u0636\u0629":$||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"});this._ctrDrawDoughnut("ctr-chart-severity",A.labels,A.data,["#ef4444","#f59e0b","#10b981","#94a3b8"]),this._ctrDrawTrend("ctr-chart-trend",i);const y={};e.forEach(D=>{const $=this.prepareContractorForAnalytics(D),b=this.getPreferredContractorAnalyticsKey($,D.id||D.contractorId),S=this.buildContractorAnalyticsMatchers($,b),I=this.dedupeContractorRecords(i.filter(S.violationBelongsToContractor),["isoCode","id"],["contractorId","contractorName","violationType","violationDate"]).length;if(I>0){const L=$.name||$.companyName||D.name||D.companyName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";y[L]=I}});const w=Object.entries(y).sort((D,$)=>$[1]-D[1]).slice(0,8);this._ctrDrawHBar("ctr-chart-top-violators",w.map(D=>D[0]),w.map(D=>D[1]),"rgba(245,158,11,0.8)");const C=this._ctrGroupByField(i,D=>String(D.violationLocation||D.location||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._ctrDrawHBar("ctr-chart-location",C.labels,C.data,"rgba(59,130,246,0.78)");const k=this._ctrGroupByField(i,D=>String(D.violationPlace||D.place||"").trim()||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F",8);this._ctrDrawHBar("ctr-chart-place",k.labels,k.data,"rgba(217,119,6,0.78)")}const u=document.getElementById("ctr-locations-analysis");u&&this.safeSetInnerHTML(u,this.renderContractorViolationsByLocationAnalysis(e,i));const f=document.getElementById("ctr-violations-analysis");f&&this.safeSetInnerHTML(f,this.renderContractorViolationsAnalysis(e,i));const d=document.getElementById("ctr-expiring-contracts");d&&this.safeSetInnerHTML(d,this.renderExpiringContractsAlert(n));const m=document.getElementById("ctr-detailed-analysis");m&&this.safeSetInnerHTML(m,this.renderDetailedContractorAnalysis(e,r,o,i))},exportContractorAnalyticsPDF(){const t=document.getElementById("ctr-export-pdf-btn"),a=t?t.innerHTML:"";t&&(t.disabled=!0,t.innerHTML='<i class="fas fa-spinner fa-spin"></i>'),(async()=>{try{typeof Loading<"u"&&Loading.show&&Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 PDF...");const r=this._collectContractorAnalyticsSnapshot(),o=this._buildCtrAnalyticsExportHtml_(r),i="CONTRACTORS-ANALYTICS-"+new Date().toISOString().slice(0,10),s="\u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646",n=new Date().toISOString(),c=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(i,s,o,!1,!0,{source:"ContractorsAnalytics",titleEn:"Contractors Analysis Report",titleAr:s,includeQRCode:!1,compactPdfFooter:!0,headerLayoutLtr:!0,footerLegendHtml:this._buildCtrAnalyticsExportLegend_(r)},n,n):'<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>'+s+"</title></head><body>"+o+"</body></html>",l=`Contractors-Analysis-${new Date().toISOString().slice(0,10)}.pdf`;await this._ctrDownloadAnalyticsPdf_(c,l)?Notification?.success?.("\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 PDF \u0628\u0646\u062C\u0627\u062D"):Notification?.error?.("\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 PDF \u2014 \u062A\u0645 \u0641\u062A\u062D \u0646\u0627\u0641\u0630\u0629 \u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0643\u0628\u062F\u064A\u0644")}catch(r){Utils.safeError("\u0641\u0634\u0644 \u062A\u0635\u062F\u064A\u0631 \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646:",r),Notification?.error?.("\u062A\u0639\u0630\u0631 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A: "+(r.message||""))}finally{typeof Loading<"u"&&Loading.hide&&Loading.hide(),t&&(t.disabled=!1,t.innerHTML=a)}})()},renderAnalyticsOverview(t){const a=Math.min(t.approvalRate,100),e=Math.min(t.activeRate,100),r=Math.min(t.violationResolutionRate,100),o=Math.min(t.avgScore,100),i=n=>n>=80?"text-green-600":n>=60?"text-yellow-600":"text-red-600",s=n=>n>=80?"bg-gradient-to-br from-green-50 to-green-100 border-green-300":n>=60?"bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300":"bg-gradient-to-br from-red-50 to-red-100 border-red-300";return`
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
                        <div class="progress-bar" style="width: ${a}%; --bar-start: #10b981; --bar-end: #34d399;"></div>
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
                        <div class="progress-bar" style="width: ${a}%; --bar-start: #6366f1; --bar-end: #818cf8;"></div>
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
                        <div class="progress-bar" style="width: ${e}%; --bar-start: #f97316; --bar-end: #fb923c;"></div>
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
        `},dedupeContractorRecords(t,a=[],e=[]){const r=[],o=new Set,i=new Set;return(Array.isArray(t)?t:[]).forEach(n=>{if(!n||typeof n!="object")return;const c=(Array.isArray(a)?a:[]).map(p=>String(n?.[p]||"").trim().toLowerCase()).find(Boolean);if(c){if(o.has(c))return;o.add(c),r.push(n);return}const l=(Array.isArray(e)?e:[]).map(p=>String(n?.[p]||"").trim().toLowerCase()).join("|");!l||i.has(l)||(i.add(l),r.push(n))}),r},_ctrAnalyticsActivationBadge(t){return this.isEntityEnabled(t)?'<span class="ctr-act-active"><i class="fas fa-circle" style="font-size:5px;"></i>\u0646\u0634\u0637</span>':'<span class="ctr-act-inactive"><i class="fas fa-circle" style="font-size:5px;"></i>\u063A\u064A\u0631 \u0646\u0634\u0637</span>'},_ctrAnalyticsResolutionBar(t){const a=Math.min(Math.max(Number(t)||0,0),100),e=a>=80?"#10b981":a>=50?"#f59e0b":"#ef4444",r=a>=80?"#15803d":a>=50?"#b45309":"#b91c1c";return`<div class="ctr-progress"><span style="width:${a}%;background:${e};"></span></div><span style="font-size:.72rem;font-weight:700;color:${r};">${a}%</span>`},_ctrAnalyticsViolationsEmptyPanel(){return`
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
            </div>`},renderContractorViolationsByLocationAnalysis(t,a){const e=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??""),r=Array.isArray(a)?a:[],o=Array.isArray(t)?t:[];if(!r.length)return`
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
                </div>`;const i={};r.forEach(p=>{const u=this._ctrGetViolationPlaceLabel(p);i[u]||(i[u]={violations:0,contractorCounts:{}});const f=i[u];f.violations++;let d=String(p.contractorName||"").trim();if(!d&&o.length)for(const m of o){const v=this.prepareContractorForAnalytics(m),h=this.getPreferredContractorAnalyticsKey(v,m.id||m.contractorId);if(this.buildContractorAnalyticsMatchers(v,h).violationBelongsToContractor(p)){d=v.name||v.companyName||m.name||m.companyName||"";break}}d&&(f.contractorCounts[d]=(f.contractorCounts[d]||0)+1)});const s=Object.entries(i).map(([p,u])=>{const f=Object.entries(u.contractorCounts).sort((d,m)=>m[1]-d[1])[0]||null;return{label:p,violations:u.violations,contractorsCount:Object.keys(u.contractorCounts).length,topContractor:f?{name:f[0],count:f[1]}:null}}).sort((p,u)=>u.violations-p.violations||u.contractorsCount-p.contractorsCount).slice(0,12),n=s.map((p,u)=>{const f=o.length>0?Math.round(p.contractorsCount/o.length*100):0,d=u<3?"#eff6ff":"#f8fafc",m=u<3?"#1d4ed8":"#64748b";return`
                <tr>
                    <td style="text-align:center;"><span class="ctr-rank" style="background:${d};color:${m};">${u+1}</span></td>
                    <td><strong style="color:#1e293b;font-size:.84rem;">${e(p.label)}</strong></td>
                    <td style="text-align:center;"><span style="font-weight:800;color:#dc2626;font-size:.95rem;">${p.violations}</span></td>
                    <td style="text-align:center;"><span style="font-weight:700;color:#4338ca;">${p.contractorsCount}</span></td>
                    <td style="text-align:center;"><span style="font-size:.78rem;font-weight:700;color:#64748b;">${f}%</span></td>
                    <td>${p.topContractor?.name?`<span style="font-size:.8rem;color:#334155;">${e(p.topContractor.name)}</span> <span class="ctr-sev-pill ctr-sev-high" style="margin-right:6px;">${p.topContractor.count||0}</span>`:'<span style="color:#cbd5e1;">\u2014</span>'}</td>
                </tr>`}).join(""),c=s.length,l=s.reduce((p,u)=>p+u.violations,0);return`
            <div class="ctr-panel">
                <div class="ctr-panel-header" style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 55%,#60a5fa 100%);">
                    <div style="display:flex;align-items:center;gap:12px;">
                        <div class="ctr-panel-header-icon"><i class="fas fa-map-marked-alt"></i></div>
                        <div>
                            <div style="font-size:1rem;font-weight:800;margin:0;">\u0623\u0643\u062B\u0631 \u0627\u0644\u0623\u0645\u0627\u0643\u0646 \u0645\u062E\u0627\u0644\u0641\u0629 \u0644\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646</div>
                            <div style="font-size:.74rem;opacity:.88;margin-top:2px;">\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0648\u0642\u0639/\u0627\u0644\u0645\u0643\u0627\u0646 \u0628\u0639\u062F\u062F \u0627\u0644\u0645\u0642\u0627\u0648\u0644\u064A\u0646 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u064A\u0646</div>
                        </div>
                    </div>
                    <span class="ctr-panel-badge">${c} \u0645\u0643\u0627\u0646 \u2022 ${l} \u0645\u062E\u0627\u0644\u0641\u0629</span>
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
                        <div class="val" style="color:#7c3aed;">${c}</div>
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
            </div>`},renderContractorViolationsAnalysis(t,a){const e=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??""),r=Array.isArray(t)&&t.length>0?t:this.getContractorsForAnalyticsList();if(!a||a.length===0)return this._ctrAnalyticsViolationsEmptyPanel();const o=this._getContractorViolationsAnalysisData_(r,a,10),i=o.rows;if(i.length===0)return this._ctrAnalyticsViolationsEmptyPanel();const s=p=>p.total>0?Math.round(p.resolved/p.total*100):0,n=o.summary||{total:0,high:0,resolved:0,pending:0},c=o.overallResolution||0,l=i.map((p,u)=>{const{name:f,stats:d}=p,m=s(d);return`
                <tr>
                    <td>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <span class="ctr-rank" style="background:${u===0?"#fee2e2":u===1?"#ffedd5":u===2?"#fef9c3":"#f1f5f9"};color:${u===0?"#b91c1c":u===1?"#c2410c":u===2?"#a16207":"#64748b"};">${u+1}</span>
                            <strong style="color:#1e293b;font-size:.84rem;">${e(f)}</strong>
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
                        <div class="val" style="color:#7c3aed;">${c}%</div>
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
                        <tbody>${l}</tbody>
                    </table>
                </div>
            </div>`},getExpiringContracts(t,a){const e=new Date,r=new Date(e.getTime()+720*60*60*1e3),o=[];return t.forEach(i=>{if(i.endDate){const s=new Date(i.endDate);s>=e&&s<=r&&o.push({id:i.id,name:i.name,type:"contractor",endDate:i.endDate,daysRemaining:Math.ceil((s-e)/(1e3*60*60*24))})}}),a.forEach(i=>{if(i.expiryDate){const s=new Date(i.expiryDate);s>=e&&s<=r&&o.push({id:i.id,name:i.companyName||i.name,type:"approved",endDate:i.expiryDate,daysRemaining:Math.ceil((s-e)/(1e3*60*60*24))})}}),o.sort((i,s)=>i.daysRemaining-s.daysRemaining)},renderExpiringContractsAlert(t){if(t.length===0)return"";const a=t.filter(s=>s.daysRemaining<=7),e=t.filter(s=>s.daysRemaining>7&&s.daysRemaining<=15),r=t.filter(s=>s.daysRemaining>15),o=s=>s<=7?'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border-2 border-red-300"><i class="fas fa-exclamation-circle ml-1"></i>\u062D\u0631\u062C</span>':s<=15?'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border-2 border-yellow-300"><i class="fas fa-exclamation-triangle ml-1"></i>\u062A\u062D\u0630\u064A\u0631</span>':'<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border-2 border-blue-300"><i class="fas fa-info-circle ml-1"></i>\u0639\u0627\u062F\u064A</span>',i=s=>s<=7?"badge-danger":s<=15?"badge-warning":"badge-info";return`
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
                            ${a.length>0?`<span class="badge badge-danger text-sm px-3 py-1">${a.length} \u062D\u0631\u062C</span>`:""}
                            ${e.length>0?`<span class="badge badge-warning text-sm px-3 py-1">${e.length} \u062A\u062D\u0630\u064A\u0631</span>`:""}
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
                                ${t.map((s,n)=>{const c=s.daysRemaining<=7,l=s.daysRemaining>7&&s.daysRemaining<=15;return`
                                    <tr class="hover:bg-yellow-50 transition-colors ${c?"bg-red-50":l?"bg-yellow-50":"bg-white"} ${n%2===0?"":"bg-opacity-50"}">
                                        <td class="px-6 py-4">
                                            <div class="flex items-center">
                                                <div class="flex-shrink-0 w-10 h-10 ${c?"bg-red-200":l?"bg-yellow-200":"bg-blue-200"} rounded-full flex items-center justify-center ml-3">
                                                    <i class="fas ${s.type==="contractor"?"fa-hammer":"fa-building"} ${c?"text-red-600":l?"text-yellow-600":"text-blue-600"}"></i>
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
        `},prepareContractorForAnalytics(t){return typeof Utils<"u"&&typeof Utils.sanitizeContractorIdentity=="function"?Utils.sanitizeContractorIdentity(t):t&&typeof t=="object"?{...t}:{}},getPreferredContractorAnalyticsKey(t,a=""){return typeof Utils<"u"&&typeof Utils.getPreferredContractorLookupKey=="function"?Utils.getPreferredContractorLookupKey(t,a):String(t?.code||t?.isoCode||t?.contractorCode||t?.contractorId||t?.id||a||"").trim()},resolveContractorForAnalytics(t,a=""){const e=p=>typeof Utils<"u"&&typeof Utils.normalizeContractorIdentityValue=="function"?Utils.normalizeContractorIdentityValue(p):String(p??"").trim().toLowerCase(),r=p=>typeof Utils<"u"&&typeof Utils.canonicalizeContractorName=="function"?Utils.canonicalizeContractorName(p):e(p),o=e(t),i=r(a),n=[...typeof this.getAllContractorsForModules=="function"?this.getAllContractorsForModules():[],...AppState.appData.approvedContractors||[],...AppState.appData.contractors||[]].filter(Boolean);let c=null,l=-1;return n.forEach(p=>{const u=this.prepareContractorForAnalytics(p);let f=0;if(o){const m=[u.code,u.isoCode,u.contractorCode,u.entityCode],v=[u.licenseNumber,u.contractNumber,u.approvedEntityId],h=[u.contractorId,u.id],A=[...Array.isArray(u.aliasIds)?u.aliasIds:[],...Array.isArray(u.identityIds)?u.identityIds:[],...Array.isArray(u.legacyIds)?u.legacyIds:[],...Array.isArray(u.altIds)?u.altIds:[]];m.some(y=>e(y)===o)?f=Math.max(f,100):v.some(y=>e(y)===o)?f=Math.max(f,80):h.some(y=>e(y)===o)?f=Math.max(f,50):A.some(y=>e(y)===o)&&(f=Math.max(f,40))}const d=r(u.name||u.companyName||u.contractorName||u.company||"");i&&d&&d===i&&(f+=o?25:90),f>l&&(l=f,c=u)}),l>0?c:null},buildContractorAnalyticsMatchers(t,a){if(typeof Utils<"u"&&typeof Utils.buildContractorIdentityMatcher=="function")return Utils.buildContractorIdentityMatcher(t,a);const e=y=>String(y??"").trim().toLowerCase(),r=y=>e(y),o=this.prepareContractorForAnalytics(t),i=String(o.name||o.companyName||o.contractorName||o.company||"").trim(),s=new Set,n=[o.code,o.isoCode,o.contractorCode,o.entityCode],c=[o.licenseNumber,o.contractNumber,o.approvedEntityId],l=[o.contractorId,o.id],p=[...Array.isArray(o.aliasIds)?o.aliasIds:[],...Array.isArray(o.identityIds)?o.identityIds:[],...Array.isArray(o.legacyIds)?o.legacyIds:[],...Array.isArray(o.altIds)?o.altIds:[]];[...n,...c,...l,...p].filter(Boolean).forEach(y=>s.add(e(y)));const u=new Set,f=new Set;[o.name,o.companyName,o.contractorName,o.company,o.entityName,o.externalName].filter(Boolean).map(y=>String(y).trim()).forEach(y=>{u.add(e(y)),f.add(r(y))});const m=y=>!y||typeof y!="object"?[]:[y.contractorId,y.code,y.isoCode,y.contractorCode,y.entityCode,y.licenseNumber,y.contractNumber,y.approvedEntityId].filter(w=>w!=null&&String(w).trim()!=="").map(w=>e(w)).filter(Boolean),v=y=>!y||typeof y!="object"?[]:["contractorName","companyName","company","contractorCompany","name","externalName","entityName","violatorCompany","contractor","requestingParty","authorizedParty"].map(C=>y[C]).filter(C=>C!=null&&String(C).trim()!=="").map(C=>String(C).replace(/\s+/g," ").trim()).filter(Boolean),h=y=>{if(y==null)return!1;const w=e(y);if(w&&u.has(w))return!0;const C=r(y);return!!(C&&f.has(C))},A=y=>!y||typeof y!="object"?!1:m(y).some(k=>s.has(k))?!0:v(y).some(h);return{normalize:e,idsSet:s,exactNameSet:u,canonicalNameSet:f,contractorName:i,matchesContractor:A,hasAnyRecordIds(y){return m(y).length>0},matchesNameValue:h,matchFieldsByName(y){if(!y||typeof y!="object")return null;const w=v(y);return w.length===0?null:w.find(h)||null},violationBelongsToContractor(y){if(!y||typeof y!="object")return!1;const w=e(y.personType);if((w==="employee"||w==="\u0645\u0648\u0638\u0641")&&!y.contractorName&&!y.contractorId&&!y.contractorCode&&!y.code&&!y.isoCode)return!1;const C=m(y);if(C.length>0&&C.some(D=>s.has(D)))return!0;const k=v(y);return k.length>0&&k.some(h)?!0:A(y)},evaluationBelongsToContractor(y){if(!y||typeof y!="object")return!1;const w=m(y);if(w.length>0&&w.some(k=>s.has(k)))return!0;const C=v(y);return C.length>0&&C.some(h)?!0:A(y)}}},renderDetailedContractorAnalysis(t,a,e,r){const o=p=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(String(p??"")):String(p??"");if(!t||!Array.isArray(t)||t.length===0)return`
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
                </div>`;const i=this.buildContractorDetailedStatsList(t,e,r),s={total:i.length,active:i.filter(p=>this.isEntityEnabled(p)).length,inactive:i.filter(p=>!this.isEntityEnabled(p)).length,withViolations:i.filter(p=>p.violationsCount>0).length,withEvaluations:i.filter(p=>p.evaluationsCount>0).length},n=p=>p>=80?"#15803d":p>=60?"#b45309":"#b91c1c",c=(p,u)=>p==="expired"?'<span class="ctr-sev-pill ctr-sev-high"><i class="fas fa-times-circle" style="font-size:9px;margin-left:3px;"></i>\u0645\u0646\u062A\u0647\u064A</span>':p==="expiring"?`<span class="ctr-sev-pill ctr-sev-med"><i class="fas fa-hourglass-half" style="font-size:9px;margin-left:3px;"></i>${u} \u064A\u0648\u0645</span>`:p==="active"?'<span class="ctr-sev-pill ctr-sev-low"><i class="fas fa-check-circle" style="font-size:9px;margin-left:3px;"></i>\u0646\u0634\u0637</span>':'<span class="ctr-sev-pill" style="background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0;">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>',l=i.map((p,u)=>{const f=encodeURIComponent(p.analyticsLookupKey||p.id||p.contractorId||""),d=encodeURIComponent(p.analyticsDisplayName||p.name||p.companyName||""),m=n(p.avgScore);return`
                <tr style="border-right:3px solid ${p.violationsCount>0?"#fecaca":p.evaluationsCount>0?"#bbf7d0":"#e2e8f0"};">
                    <td style="text-align:center;"><span class="ctr-rank" style="background:#eef2ff;color:#4338ca;">${u+1}</span></td>
                    <td>
                        <div style="min-width:0;">
                            <strong style="color:#1e293b;font-size:.84rem;display:block;margin-bottom:4px;">${o(p.name||p.companyName||"")}</strong>
                            ${this._ctrAnalyticsActivationBadge(p)}
                        </div>
                    </td>
                    <td style="text-align:center;color:#475569;font-size:.78rem;">${o((p.serviceType||p.entityType||"-").toString())}</td>
                    <td style="text-align:center;">${c(p.contractStatus,p.daysRemaining)}</td>
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
                        <button onclick="Contractors.viewContractorAnalytics(decodeURIComponent('${f}'), decodeURIComponent('${d}'))"
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
                        <tbody>${l}</tbody>
                    </table>
                </div>
            </div>`},async viewContractorAnalytics(t,a=""){let e=this.resolveContractorForAnalytics(t,a);if(e||(e=(AppState.appData.contractors||[]).find(g=>g.id===t||g.contractorId===t||g.code===t||g.isoCode===t)),e||(e=(AppState.appData.approvedContractors||[]).find(g=>g.id===t||g.contractorId===t||g.code===t||g.isoCode===t)),!e){Notification.error("\u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");return}e=this.prepareContractorForAnalytics(e);const r=this.getPreferredContractorAnalyticsKey(e,t||a),o=(e.name||e.companyName||"").trim(),i=this.buildContractorAnalyticsMatchers(e,r),s=i.matchesContractor,n=g=>{if(!g)return!1;if(s(g))return!0;if(i.hasAnyRecordIds(g))return!1;const x=String(g.requestingParty||"").replace(/\s+/g," ").trim(),E=String(g.authorizedParty||"").replace(/\s+/g," ").trim(),q=String(g.responsible||"").replace(/\s+/g," ").trim();return i.matchFieldsByName([x,E,q])},c=(g,x)=>{let E=x||(AppState.appData.contractorEvaluations||[]).filter(i.evaluationBelongsToContractor),q=g||(AppState.appData.violations||[]).filter(i.violationBelongsToContractor),_=0;if(E.length>0){const F=E.map(N=>parseFloat(N.finalScore)||parseFloat(N.score)||0).filter(N=>!isNaN(N)&&N>=0&&N<=100);if(F.length>0){const N=F.reduce((z,H)=>z+H,0);_=Math.round(N/F.length*100)/100}}const P=q.filter(F=>{const N=(F.severity||"").toString().trim();return N==="\u0639\u0627\u0644\u064A\u0629"||N==="high"||N==="\u062D\u0631\u062C\u0629"}).length,j=q.filter(F=>{const N=(F.status||"").toString().trim();return N==="\u0645\u062D\u0644\u0648\u0644"||N==="resolved"||N==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,B=q.length>0?Math.round(j/q.length*100):100,U=new Set(E.map(F=>F.id||F.evaluationId).filter(Boolean)),O=U.size>0?U.size:E.length;return{evaluations:E,violations:q,evaluationsCountDisplay:O,avgScore:_,highViolations:P,resolvedViolations:j,resolutionRate:B}};let l=c();const u=(AppState.appData.training||[]).filter(g=>{if(!g)return!1;if((g.contractorName||g.contractorId||g.contractorCode)&&s(g))return!0;let x=g.participants;if(typeof x=="string"&&x.trim())try{x=JSON.parse(x)}catch{x=null}return x&&Array.isArray(x)?x.some(E=>E&&(E.personType==="contractor"||E.type==="contractor"||E.contractorName||E.companyName||E.company)&&s(E)):!1}),d=(AppState.appData.contractorTrainings||[]).filter(g=>{if(!g)return!1;if(s(g))return!0;const x=String(g.contractorName||g.companyName||"").replace(/\s+/g," ").trim();return!i.hasAnyRecordIds(g)&&i.matchesNameValue(x)}),m=new Set;u.forEach(g=>{const x=g.id||String(g.startDate||"")+String(g.name||g.trainingType||"");x&&m.add(x)});let v=u.length;d.forEach(g=>{const x=g.id||String(g.date||"")+String(g.topic||g.trainingName||g.name||"");x&&!m.has(x)?(m.add(x),v+=1):x||(v+=1)});let A=(AppState.appData.ptw||[]).concat(Array.isArray(AppState.appData.ptwRegistry)?AppState.appData.ptwRegistry:[]).filter(n).length;const y=(AppState.appData.clinicVisits||[]).concat(Array.isArray(AppState.appData.clinicContractorVisits)?AppState.appData.clinicContractorVisits:[]),w=new Set;let k=y.filter(g=>{if(!g)return!1;const x=String(g.id||"").trim();return x?w.has(x)?!1:(w.add(x),!0):!0}).filter(g=>(g.personType==="contractor"||g.personType==="external"||g.contractorName)&&s(g)).length,$=(AppState.appData.injuries||[]).filter(g=>{if(!g||(g.personType||"").toString().toLowerCase()!=="contractor")return!1;if(s(g))return!0;const x=String(g.personName||g.employeeName||g.contractorName||"").trim();return!i.hasAnyRecordIds(g)&&i.matchesNameValue(x)}).length,b=(AppState.appData.incidents||[]).filter(g=>g?(g.personType==="contractor"||g.contractorName||g.affiliation==="contractor"||g.contractorId!=null&&g.contractorId!=="")&&s(g):!1).length,S=(AppState.appData.sickLeave||[]).filter(g=>(g.personType==="contractor"||g.contractorName)&&s(g)).length;const I=g=>g>=80?"text-green-600 bg-green-100":g>=60?"text-yellow-600 bg-yellow-100":"text-red-600 bg-red-100",L=g=>!Array.isArray(g)||g.length===0?`
                    <tr>
                        <td colspan="4" class="px-6 py-6 text-center text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0641\u0644\u0627\u062A\u0631</td>
                    </tr>
                `:g.map((x,E)=>{const q=(x.severity||"").toString().trim(),_=(x.status||"").toString().trim(),P=q==="\u0639\u0627\u0644\u064A\u0629"||q==="high"||q==="\u062D\u0631\u062C\u0629"?"badge-danger":q==="\u0645\u062A\u0648\u0633\u0637\u0629"||q==="medium"?"badge-warning":"badge-info",j=_==="\u0645\u062D\u0644\u0648\u0644"||_==="resolved"||_==="\u062A\u0645 \u0627\u0644\u062D\u0644"?"badge-success":"badge-warning";return`
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
                `}).join(""),M=(g,x,E)=>!Array.isArray(g)||g.length===0?`
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
                            <button type="button" class="btn-primary" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-color: #b91c1c;" onclick="Contractors.exportContractorViolationsReport('${encodeURIComponent(String(r||e.id||e.contractorId||""))}', '${encodeURIComponent(String(o||e.name||e.companyName||""))}')">
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
                                    ${x.map(q=>`<option value="${Utils.escapeHTML(q)}">${Utils.escapeHTML(q)}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062F\u0631\u062C\u0629</label>
                                <select id="contractor-violations-severity" class="form-input">
                                    <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u062F\u0631\u062C\u0627\u062A</option>
                                    ${E.map(q=>`<option value="${Utils.escapeHTML(q)}">${Utils.escapeHTML(q)}</option>`).join("")}
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
                                ${L(g)}
                            </tbody>
                        </table>
                    </div>
                </div>
            `,R=document.createElement("div");R.className="modal-overlay",R.innerHTML=`
            <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-chart-bar text-xl"></i>
                            </div>
                            <div>
                                <h2 class="modal-title text-xl font-bold flex items-center">
                                    \u062A\u062D\u0644\u064A\u0644 \u0645\u0641\u0635\u0644: ${Utils.escapeHTML(o||e.name||e.companyName||"")}
                                    <span id="live-loader-indicator" class="mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 animate-pulse">
                                        <i class="fas fa-sync fa-spin ml-1 text-xs"></i>
                                        \u062C\u0627\u0631\u064A \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A...
                                    </span>
                                </h2>
                                <p class="text-sm text-indigo-100 mt-1">${Utils.escapeHTML(e.serviceType||e.entityType||"")}</p>
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
                            <p class="text-3xl font-bold text-blue-700" id="evals-count-val">${l.evaluationsCountDisplay}</p>
                        </div>
                        <div class="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0639\u062F\u062F \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-red-700" id="viols-count-val">${l.violations.length}</p>
                        </div>
                        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-star text-3xl text-yellow-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645</p>
                            <p class="text-3xl font-bold ${I(l.avgScore).split(" ")[0]}" id="avg-score-val">${l.avgScore}%</p>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md">
                            <div class="flex items-center justify-between mb-2">
                                <i class="fas fa-check-double text-3xl text-green-500"></i>
                            </div>
                            <p class="text-sm text-gray-600 mb-1">\u0645\u0639\u062F\u0644 \u062D\u0644 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A</p>
                            <p class="text-3xl font-bold text-green-700" id="res-rate-val">${l.resolutionRate}%</p>
                        </div>
                    </div>

                    <!-- \u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629 -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</p>
                            <p class="text-2xl font-bold text-red-600" id="high-viols-val">${l.highViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u062D\u0644\u0648\u0644\u0629</p>
                            <p class="text-2xl font-bold text-green-600" id="resolved-viols-val">${l.resolvedViolations}</p>
                        </div>
                        <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                            <p class="text-sm text-gray-600 mb-2">\u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</p>
                            <p class="text-2xl font-bold text-orange-600" id="pending-viols-val">${l.violations.length-l.resolvedViolations}</p>
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
                            <p class="text-2xl font-bold text-cyan-700" id="permits-count-val">${A}</p>
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
                            <p class="text-2xl font-bold text-orange-700" id="incidents-count-val">${b}</p>
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
                        ${M(l.violations,Array.from(new Set(l.violations.map(g=>String(g?.violationType||"").trim()).filter(Boolean))),Array.from(new Set(l.violations.map(g=>String(g?.severity||"").trim()).filter(Boolean))))}
                    </div>
                </div>
            </div>
        `,document.body.appendChild(R);const T=g=>{const x=R.querySelector("#contractor-violations-search"),E=R.querySelector("#contractor-violations-person-type"),q=R.querySelector("#contractor-violations-type"),_=R.querySelector("#contractor-violations-severity"),P=R.querySelector("#contractor-violations-tbody"),j=R.querySelector("#contractor-violations-count");if(!P)return;const B=N=>String(N||"").trim().toLowerCase(),U=N=>{const z=B(N?.personType);return z||(N?.contractorName?"contractor":"employee")},O=N=>!N||typeof N!="object"?"":Object.values(N).map(z=>String(z||"")).join(" ").toLowerCase(),F=()=>{const N=B(x?.value),z=B(E?.value),H=B(q?.value),V=B(_?.value),K=g.filter(W=>{if(z){const G=U(W);if(z==="contractor"&&!(G==="contractor"||G==="supplier"||G==="external")||z==="employee"&&G!=="employee")return!1}return!(H&&B(W?.violationType)!==H||V&&B(W?.severity)!==V||N&&!O(W).includes(N))});P&&(P.innerHTML=L(K)),j&&(j.textContent=String(K.length))};[x,E,q,_].forEach(N=>{if(!N)return;const z=N.tagName==="SELECT"?"change":"input";N.addEventListener(z,F)})};l.violations.length>0&&T(l.violations),R.addEventListener("click",g=>{g.target===R&&R.remove()}),(async()=>{try{if(typeof GoogleIntegration<"u"&&GoogleIntegration.syncData&&AppState.googleConfig?.appsScript?.enabled){const x=!AppState.appData.contractorTrainings?.length,E=!AppState.appData.training?.length,q=(!AppState.appData.ptw||!AppState.appData.ptw.length)&&(!AppState.appData.ptwRegistry||!AppState.appData.ptwRegistry.length),_=!AppState.appData.violations?.length,P=!AppState.appData.contractorEvaluations?.length,j=!AppState.appData.clinicVisits?.length,B=!AppState.appData.injuries?.length;if(x||E||q||_||P||j||B){const U=[];x&&U.push("ContractorTrainings"),E&&U.push("Training"),q&&U.push("PTW","PTWRegistry"),_&&U.push("Violations"),P&&U.push("ContractorEvaluations"),j&&U.push("ClinicVisits","ClinicContractorVisits"),B&&U.push("Injuries","ClinicContractorInjuries"),U.length&&GoogleIntegration.syncData({sheets:[...new Set(U)],silent:!0,showLoader:!1,notifyOnSuccess:!1,notifyOnError:!1}).catch(O=>{typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0647\u0627\u062F\u0626\u0629 \u0641\u0634\u0644\u062A:",O)})}}let g=null;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&AppState.googleConfig?.appsScript?.enabled){const x=await GoogleIntegration.sendRequest({action:"getContractorDetailedAnalytics",data:{contractor:e,contractorId:r}});x&&x.success&&x.data&&(g=x.data)}if(g){const x=c(g.violations,g.evaluations);typeof g.avgScore=="number"&&(x.avgScore=g.avgScore),typeof g.highViolations=="number"&&(x.highViolations=g.highViolations),typeof g.resolvedViolations=="number"&&(x.resolvedViolations=g.resolvedViolations),typeof g.resolutionRate=="number"&&(x.resolutionRate=g.resolutionRate),typeof g.trainingsCount=="number"&&(v=g.trainingsCount),typeof g.ptwCount=="number"&&(A=g.ptwCount),typeof g.clinicVisitsCount=="number"&&(k=g.clinicVisitsCount),typeof g.injuriesCount=="number"&&($=g.injuriesCount),typeof g.incidentsCount=="number"&&(b=g.incidentsCount),typeof g.sickLeaveCount=="number"&&(S=g.sickLeaveCount);const E=R.querySelector("#evals-count-val");E&&(E.textContent=x.evaluationsCountDisplay);const q=R.querySelector("#viols-count-val");q&&(q.textContent=x.violations.length);const _=R.querySelector("#avg-score-val");_&&(_.textContent=`${x.avgScore}%`,_.className=`text-3xl font-bold ${I(x.avgScore).split(" ")[0]}`);const P=R.querySelector("#res-rate-val");P&&(P.textContent=`${x.resolutionRate}%`);const j=R.querySelector("#high-viols-val");j&&(j.textContent=x.highViolations);const B=R.querySelector("#resolved-viols-val");B&&(B.textContent=x.resolvedViolations);const U=R.querySelector("#pending-viols-val");U&&(U.textContent=x.violations.length-x.resolvedViolations);const O=R.querySelector("#trainings-count-val");O&&(O.textContent=v);const F=R.querySelector("#permits-count-val");F&&(F.textContent=A);const N=R.querySelector("#clinic-visits-count-val");N&&(N.textContent=k);const z=R.querySelector("#injuries-count-val");z&&(z.textContent=$);const H=R.querySelector("#incidents-count-val");H&&(H.textContent=b);const V=R.querySelector("#sick-leave-count-val");V&&(V.textContent=S);const K=R.querySelector("#violations-container-placeholder");if(K){const W=Array.from(new Set(x.violations.map(X=>String(X?.violationType||"").trim()).filter(Boolean))),G=Array.from(new Set(x.violations.map(X=>String(X?.severity||"").trim()).filter(Boolean)));K.innerHTML=M(x.violations,W,G),T(x.violations)}}}catch(g){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u062A\u0639\u0630\u0631 \u062A\u062D\u062F\u064A\u062B \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0648\u0644 \u0628\u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0646 \u0627\u0644\u062E\u0627\u062F\u0645:",g)}finally{const g=R.querySelector("#live-loader-indicator");g&&(g.style.transition="opacity 0.5s",g.style.opacity="0",setTimeout(()=>g.remove(),500))}})()},injectAntiShakeStyles(){const t="contractors-anti-shake-styles";if(!document.getElementById(t)){const o=document.createElement("style");o.id=t,o.textContent=`
            .contractors-tab-content {
                display: none;
            }
            .contractors-tab-content.active {
                display: block;
            }
        `,document.head.appendChild(o)}const a="contractors-identity-styles";if(!document.getElementById(a)){const o=document.createElement("style");o.id=a,o.textContent=`
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
            `,document.head.appendChild(o)}const e="approved-filters-bar-styles";if(document.getElementById(e))return;const r=document.createElement("style");r.id=e,r.textContent=`
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
        `,document.head.appendChild(r)},async exportContractorViolationsReport(t="",a=""){try{const e=decodeURIComponent(String(t||"")),r=decodeURIComponent(String(a||"")),o=this.buildContractorAnalyticsMatchers({id:e,contractorId:e,name:r,companyName:r},e),i=(AppState.appData.violations||[]).filter(o.violationBelongsToContractor);if(!i.length){Notification.warning("\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0645\u0633\u062C\u0644\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0642\u0627\u0648\u0644");return}const s=i.filter(v=>{const h=String(v.severity||"").trim();return h==="\u0639\u0627\u0644\u064A\u0629"||h==="high"||h==="\u062D\u0631\u062C\u0629"}).length,n=i.filter(v=>{const h=String(v.status||"").trim();return h==="\u0645\u062D\u0644\u0648\u0644"||h==="resolved"||h==="\u062A\u0645 \u0627\u0644\u062D\u0644"}).length,c=Math.max(0,i.length-n),l=i.length>0?Math.round(n/i.length*100):0;Loading.show("\u062C\u0627\u0631\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0645\u062E\u0627\u0644\u0641\u0627\u062A...");const p=i.map((v,h)=>`
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${h+1}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${v.violationDate?Utils.formatDate(v.violationDate):"-"}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.violationType||v.title||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.severity||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: center; font-size: 11px;">${Utils.escapeHTML(v.status||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(this._ctrGetViolationPlaceLabel(v)||"-")}</td>
                    <td style="padding: 10px 8px; border: 1px solid #E5E7EB; text-align: right; font-size: 11px;">${Utils.escapeHTML(v.description||v.details||v.notes||"-")}</td>
                </tr>
            `).join(""),u=`\u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${Utils.escapeHTML(r||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}`,f=`
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
                            <div style="font-size: 26px; font-weight: 700; color: #1E3A8A;">${l}%</div>
                        </div>
                        <div style="flex: 1 1 200px; padding: 14px; border-radius: 10px; background: #FFFBEB; border: 1px solid #FDE68A;">
                            <div style="font-size: 12px; color: #B45309; margin-bottom: 6px; font-weight: 600;">\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629</div>
                            <div style="font-size: 26px; font-weight: 700; color: #92400E;">${c}</div>
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
            `,d=`CON-VIOL-${String(e||r||"NA").substring(0,8)}-${new Date().toISOString().slice(0,10)}`,m=typeof FormHeader<"u"&&typeof FormHeader.generatePDFHTML=="function"?FormHeader.generatePDFHTML(d,u,f,!1,!0,{source:"ContractorViolations",contractorId:e,contractorName:r},new Date().toISOString(),new Date().toISOString()):`<html dir="rtl" lang="ar"><head><meta charset="UTF-8"><title>${u}</title></head><body>${f}</body></html>`;if(typeof FormHeader<"u"&&typeof FormHeader.generatePDF=="function")await FormHeader.generatePDF(m,`${u}.pdf`);else{const v=new Blob([m],{type:"text/html;charset=utf-8"}),h=URL.createObjectURL(v),A=document.createElement("a");A.href=h,A.download=`${u.replace(/\s+/g,"_")}.html`,document.body.appendChild(A),A.click(),document.body.removeChild(A),URL.revokeObjectURL(h)}Loading.hide(),Notification.success(`\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: ${r||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F"}`)}catch(e){Loading.hide(),Utils.safeError("\u062E\u0637\u0623 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644:",e),Notification.error("\u062A\u0639\u0630\u0631 \u0625\u0646\u0634\u0627\u0621 \u062A\u0642\u0631\u064A\u0631 \u0645\u062E\u0627\u0644\u0641\u0627\u062A \u0627\u0644\u0645\u0642\u0627\u0648\u0644: "+(e.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))}}};(function(){"use strict";try{typeof window<"u"&&typeof Contractors<"u"&&(window.Contractors=Contractors,window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS=APPROVED_ENTITY_STATUS_OPTIONS,window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS=APPROVED_ENTITY_TYPE_OPTIONS,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Contractors module loaded and available on window.Contractors"))}catch{if(typeof window<"u"&&typeof Contractors<"u")try{window.Contractors=Contractors,window.Contractors.APPROVED_ENTITY_STATUS_OPTIONS=APPROVED_ENTITY_STATUS_OPTIONS,window.Contractors.APPROVED_ENTITY_TYPE_OPTIONS=APPROVED_ENTITY_TYPE_OPTIONS}catch{}}})();
