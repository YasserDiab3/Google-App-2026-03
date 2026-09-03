(function(){"use strict";const q={ClinicVisits:9e4,ClinicContractorVisits:9e4,PTW:9e4,PTWRegistry:6e4,Training:6e4,Employees:9e4,UserActivityLog:45e3,DailyObservations:6e4,Incidents:45e3,Violations:45e3,ActionTrackingRegister:45e3,PeriodicInspectionRecords:45e3,BehaviorMonitoring:45e3},O=25e3,k=["UserActivityLog"],F=["ClinicVisits","ClinicContractorVisits","Training","Employees","ExternalWorkforceMonthly","PTW","PTWRegistry","DailyObservations"],l={_progressHidden:!1,_totalSheets:0,_progressWatchdog:null,_completedSheets:0,_sheetTimeout(e){return q[e]||O},_startProgressWatchdog(e){this._clearProgressWatchdog(),this._progressWatchdog=setTimeout(()=>{Utils.safeWarn("\u23F1\uFE0F \u0625\u064A\u0642\u0627\u0641 \u0645\u0624\u0634\u0631 \u0627\u0644\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u0639\u062F \u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0642\u0635\u0648\u0649"),this.removeProgressIndicator()},e||18e4)},_clearProgressWatchdog(){this._progressWatchdog&&(clearTimeout(this._progressWatchdog),this._progressWatchdog=null)},createProgressIndicator(e){this.removeProgressIndicator(),this._progressHidden=!1,this._totalSheets=e;const i=document.createElement("div");i.id="sync-progress-indicator",i.style.cssText=`
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10001;
                text-align: center;
                min-width: 350px;
                direction: rtl;
            `,i.innerHTML=`
                <div style="margin-bottom: 20px;">
                    <i class="fas fa-sync fa-spin" style="font-size: 36px; color: #3B82F6;"></i>
                </div>
                <div style="font-size: 18px; font-weight: 600; margin-bottom: 15px; color: #1F2937;">
                    \u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A  Database loaded.
                </div>
                <div style="margin-bottom: 15px;">
                    <div style="background: #E5E7EB; height: 8px; border-radius: 4px; overflow: hidden;">
                        <div id="sync-progress-bar" style="background: #3B82F6; height: 100%; width: 0%; transition: width 0.3s;"></div>
                    </div>
                </div>
                <div id="sync-progress-text" style="color: #6B7280; font-size: 14px;">
                    0 \u0645\u0646 ${e} (0%)
                </div>
                <div style="margin-top: 15px; color: #9CA3AF; font-size: 12px;">
                    \u064A\u0631\u062C\u0649 \u0639\u062F\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0645\u062A\u0635\u0641\u062D \u0623\u0648 \u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629
                </div>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #E5E7EB;">
                    <button type="button" id="sync-progress-hide-btn" style="
                        background: #F3F4F6;
                        color: #4B5563;
                        border: 1px solid #D1D5DB;
                        padding: 8px 16px;
                        border-radius: 8px;
                        font-size: 14px;
                        cursor: pointer;
                        font-family: inherit;
                    " title="\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0646\u0627\u0641\u0630\u0629 \u0645\u0639 \u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0641\u064A \u0627\u0644\u062E\u0644\u0641\u064A\u0629">\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0646\u0627\u0641\u0630\u0629</button>
                </div>
            `,document.body.appendChild(i);const c=document.getElementById("sync-progress-hide-btn");return c&&c.addEventListener("click",()=>this.hideProgressIndicator()),i},hideProgressIndicator(){const e=document.getElementById("sync-progress-indicator");e&&(e.style.display="none",this._progressHidden=!0,this._createFloatingBottomBar())},showProgressIndicator(){const e=document.getElementById("sync-progress-indicator");e&&(e.style.display="",this._progressHidden=!1),this._removeFloatingShowButton()},_createFloatingBottomBar(){this._removeFloatingShowButton();const e=document.createElement("div");e.id="sync-progress-floating",e.className="sync-progress-floating-bar",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),e.innerHTML=`
                <button type="button" id="sync-floating-show-btn" class="sync-floating-circle" title="\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644 - \u0627\u0636\u063A\u0637 \u0644\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                    <i class="fas fa-sync fa-spin" aria-hidden="true"></i>
                    <span id="sync-floating-percent" class="sync-floating-percent">0%</span>
                </button>
            `,document.body.appendChild(e);const i=document.getElementById("sync-floating-show-btn");i&&i.addEventListener("click",()=>this.showProgressIndicator()),this._updateFloatingProgress(0,this._totalSheets||1)},_updateFloatingProgress(e,i,c){const r=i?Math.round(e/i*100):0,f=document.getElementById("sync-floating-percent");f&&(f.textContent=r+"%");const u=document.getElementById("sync-floating-show-btn");if(u){const m=c?` \u2014 ${c}`:"";u.title=`\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644 ${r}%${m} - \u0627\u0636\u063A\u0637 \u0644\u0625\u0638\u0647\u0627\u0631 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644`}},_removeFloatingShowButton(){const e=document.getElementById("sync-progress-floating");e&&e.parentNode&&e.parentNode.removeChild(e)},updateProgress(e,i,c){const r=i?Math.round(e/i*100):0,f=document.getElementById("sync-progress-bar"),u=document.getElementById("sync-progress-text");if(f&&(f.style.width=`${r}%`),u){const m=c?` \u2014 ${c}`:"";u.textContent=`${e} \u0645\u0646 ${i} (${r}%)${m}`}this._progressHidden&&this._updateFloatingProgress(e,i,c)},removeProgressIndicator(){this._progressHidden=!1,this._clearProgressWatchdog(),this._removeFloatingShowButton();const e=document.getElementById("sync-progress-indicator");e&&e.parentNode&&e.parentNode.removeChild(e)},async processBatch(e,i,c,r,f){const u=await Promise.allSettled(e.map(d=>i(d,this._sheetTimeout(d)).then(E=>(typeof f=="function"&&f(d),{sheetName:d,data:E,success:!0})).catch(E=>(typeof f=="function"&&f(d),{sheetName:d,error:E,success:!1}))));let m=0;const p=[];return u.forEach((d,E)=>{let o,g,a,P;d.status==="fulfilled"?{sheetName:o,data:g,error:a,success:P}=d.value:(o=e[E],a=d.reason?.message||d.reason||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641",P=!1);const h=typeof GoogleIntegration<"u"&&typeof GoogleIntegration.applyResourceConsumptionSheetSyncResult=="function"?GoogleIntegration.applyResourceConsumptionSheetSyncResult(o,{data:g,error:a,success:P}):null;if(h&&h.handled){h.failed?(p.push(o),r&&Utils.safeWarn(`\u26A0 \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${o}:`,a?.message||a)):h.syncedRecords>0?(m++,r&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${h.syncedRecords} \u0633\u062C\u0644 \u0645\u0646 ${o}`)):r&&Utils.safeLog(`\u2705 ${o} \u0641\u0627\u0631\u063A\u0629 (\u062A\u0645 \u0627\u0644\u062A\u062E\u0637\u064A \u0628\u0634\u0643\u0644 \u0622\u0645\u0646)`);return}const n=c[o];if(!n){r&&Utils.safeWarn(`\u26A0 \u0644\u0645 \u064A\u062A\u0645 \u062A\u0639\u064A\u064A\u0646 \u0645\u0641\u062A\u0627\u062D \u0644\u0640 \u0648\u0631\u0642\u0629 \u0627\u0644\u0639\u0645\u0644 ${o}`);return}if(!P||a){p.push(o),r&&Utils.safeWarn(`\u26A0 \u0641\u0634\u0644 \u062A\u062D\u0645\u064A\u0644 ${o}:`,a?.message||a);return}if(Array.isArray(g)){const I=Array.isArray(AppState.appData[n])?AppState.appData[n]:[],s=g.length===0&&I.length>0,v=s?I:g;s||(AppState.appData[n]=g),v.length>0?(m++,r&&Utils.safeLog(`\u2705 \u062A\u0645 \u062A\u062D\u0645\u064A\u0644 ${v.length} \u0633\u062C\u0644 \u0645\u0646 ${o}`)):r&&Utils.safeLog(`\u2705 ${o} \u0641\u0627\u0631\u063A\u0629 (\u062A\u0645 \u0627\u0644\u062A\u062E\u0637\u064A \u0628\u0634\u0643\u0644 \u0622\u0645\u0646)`)}else{const I=AppState.appData[n]||[];I.length>0?r&&Utils.safeLog(`\u26A0\uFE0F ${o} \u0644\u0645 \u062A\u064F\u0631\u062C\u0639 array - \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 (${I.length} \u0633\u062C\u0644)`):(AppState.appData[n]=[],r&&Utils.safeLog(`\u2705 ${o} \u0641\u0627\u0631\u063A\u0629 \u0648\u062A\u0637\u0628\u064A\u0642 \u0628\u0640 array \u0641\u0627\u0631\u063A \u0643\u0642\u064A\u0645\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629 \u0622\u0645\u0646\u0629`))}}),{syncedInBatch:m,failedInBatch:p}}};window.SyncImprovements=l,document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){if(typeof GoogleIntegration<"u"&&GoogleIntegration.syncData){const e=GoogleIntegration.syncData;typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2139\uFE0F sync-improvements: \u0627\u0644\u0625\u0628\u0642\u0627\u0621 \u0639\u0644\u0649 syncData \u0627\u0644\u0623\u0635\u0644\u064A (batch=12) \u2014 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0627\u0633\u062A\u0628\u062F\u0627\u0644 \u0627\u0644\u0628\u0637\u064A\u0621");return}},2e3)})})();
