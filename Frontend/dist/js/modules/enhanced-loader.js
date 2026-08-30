const EnhancedLoader={loadingState:{total:0,loaded:0,currentStep:"",startTime:null,errors:[]},elements:{overlay:null,progressBar:null,progressText:null,statusText:null,timeText:null,errorContainer:null},init(){this.createLoadingScreen(),this.loadingState.startTime=Date.now()},createLoadingScreen(){if(this.elements.overlay=document.getElementById("loading-overlay"),!this.elements.overlay)return;const e=this.elements.overlay.querySelector(".loading-spinner");e&&(e.innerHTML=`
                <i class="fas fa-spinner fa-spin text-5xl text-blue-600 mb-4"></i>
                <div class="loading-content" style="width: 100%; max-width: 500px;">
                    <p class="text-lg font-semibold text-gray-700 mb-4" id="loading-status-text">\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0638\u0627\u0645...</p>
                    
                    <!-- \u0634\u0631\u064A\u0637 \u0627\u0644\u062A\u0642\u062F\u0645 -->
                    <div class="progress-container" style="width: 100%; background: #e5e7eb; border-radius: 9999px; height: 8px; overflow: hidden; margin-bottom: 12px;">
                        <div id="loading-progress-bar" class="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3b82f6, #2563eb); transition: width 0.3s ease; border-radius: 9999px;"></div>
                    </div>
                    
                    <!-- \u0646\u0635 \u0627\u0644\u062A\u0642\u062F\u0645 -->
                    <div class="flex justify-between items-center text-sm text-gray-600 mb-3">
                        <span id="loading-progress-text">0%</span>
                        <span id="loading-time-text">0s</span>
                    </div>
                    
                    <!-- \u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 -->
                    <div class="current-step" style="text-align: center; font-size: 0.875rem; color: #6b7280; min-height: 20px;">
                        <span id="loading-current-step"></span>
                    </div>
                    
                    <!-- \u062D\u0627\u0648\u064A\u0629 \u0627\u0644\u0623\u062E\u0637\u0627\u0621 -->
                    <div id="loading-error-container" style="margin-top: 16px; display: none;">
                        <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p class="text-sm text-red-600 font-semibold mb-2">
                                <i class="fas fa-exclamation-triangle ml-1"></i>
                                \u062D\u062F\u062B\u062A \u0628\u0639\u0636 \u0627\u0644\u0645\u0634\u0627\u0643\u0644 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0645\u064A\u0644:
                            </p>
                            <ul id="loading-error-list" class="text-xs text-red-500 list-disc list-inside"></ul>
                        </div>
                    </div>
                </div>
            `),this.elements.progressBar=document.getElementById("loading-progress-bar"),this.elements.progressText=document.getElementById("loading-progress-text"),this.elements.statusText=document.getElementById("loading-status-text"),this.elements.timeText=document.getElementById("loading-time-text"),this.elements.currentStepText=document.getElementById("loading-current-step"),this.elements.errorContainer=document.getElementById("loading-error-container"),this.elements.errorList=document.getElementById("loading-error-list")},show(e=100){this.loadingState.total=e,this.loadingState.loaded=0,this.loadingState.startTime=Date.now(),this.loadingState.errors=[],this.updateProgress(),this.elements.overlay&&(this.elements.overlay.style.display="none",this.elements.overlay.style.visibility="hidden")},hide(){this.elements.overlay&&(this.elements.overlay.style.display="none")},updateProgress(e=null,t=null){e!==null&&(this.loadingState.loaded=Math.min(e,this.loadingState.total)),t!==null&&(this.loadingState.currentStep=t);const s=Math.round(this.loadingState.loaded/this.loadingState.total*100);if(this.elements.progressBar&&(this.elements.progressBar.style.width=`${s}%`),this.elements.progressText&&(this.elements.progressText.textContent=`${s}%`),this.elements.timeText&&this.loadingState.startTime){const i=Math.round((Date.now()-this.loadingState.startTime)/1e3);this.elements.timeText.textContent=`${i}s`}this.elements.currentStepText&&this.loadingState.currentStep&&(this.elements.currentStepText.innerHTML=`<i class="fas fa-sync fa-spin ml-1"></i> ${this.loadingState.currentStep}`)},setStatus(e){this.elements.statusText&&(this.elements.statusText.textContent=e)},increment(e=1,t=null){this.loadingState.loaded=Math.min(this.loadingState.loaded+e,this.loadingState.total),t&&(this.loadingState.currentStep=t),this.updateProgress()},addError(e){if(this.loadingState.errors.push(e),this.elements.errorContainer&&this.elements.errorList){this.elements.errorContainer.style.display="block";const t=document.createElement("li");t.textContent=e,t.className="mb-1",this.elements.errorList.appendChild(t)}},complete(e="\u062A\u0645 \u0627\u0644\u062A\u062D\u0645\u064A\u0644 \u0628\u0646\u062C\u0627\u062D!"){this.setStatus(e),this.updateProgress(this.loadingState.total,"\u2713 \u062A\u0645");const t=this.elements.overlay?.querySelector(".fa-spinner");t&&(t.className="fas fa-check-circle text-5xl text-green-600 mb-4"),setTimeout(()=>this.hide(),1e3)},fail(e="\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0645\u064A\u0644!"){this.setStatus(e);const t=this.elements.overlay?.querySelector(".fa-spinner");t&&(t.className="fas fa-times-circle text-5xl text-red-600 mb-4")},reset(){this.loadingState={total:0,loaded:0,currentStep:"",startTime:Date.now(),errors:[]},this.elements.errorContainer&&(this.elements.errorContainer.style.display="none"),this.elements.errorList&&(this.elements.errorList.innerHTML="")},getStats(){const e=this.loadingState.startTime?(Date.now()-this.loadingState.startTime)/1e3:0;return{percentage:Math.round(this.loadingState.loaded/this.loadingState.total*100),loaded:this.loadingState.loaded,total:this.loadingState.total,elapsed:e.toFixed(2),errors:this.loadingState.errors.length,currentStep:this.loadingState.currentStep}}};typeof window<"u"&&(window.EnhancedLoader=EnhancedLoader);
