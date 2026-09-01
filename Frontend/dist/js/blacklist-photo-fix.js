function convertBase64ToUrl(e){return e?e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")?e:e.length>100?"data:image/jpeg;base64,"+e:null:null}function renderBlacklistCardsFixed(e){return e.map(t=>{const s=convertBase64ToUrl(t.photo);return`
            <div class="card">
                <div class="relative z-10">
                    <div class="p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center gap-3">
                                ${s?`
                                    <img src="${Utils.escapeHTML(s)}" alt="\u0635\u0648\u0631\u0629"
                                        data-photo-url="${Utils.escapeHTML(s)}"
                                        class="w-16 h-16 rounded-full object-cover border-2 border-red-200 dark:border-red-800 cursor-pointer shadow-sm"
                                        onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)"
                                        title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629"
                                        onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800\\'><i class=\\'fas fa-user text-red-500 dark:text-red-400 text-2xl\\'></i></div>';">
                                `:`
                                    <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200 dark:border-red-800">
                                        <i class="fas fa-user text-red-500 dark:text-red-400 text-2xl"></i>
                                    </div>
                                `}
                                <div>
                                    <h3 class="font-bold text-gray-800 dark:text-gray-100 text-lg">${Utils.escapeHTML(t.fullName||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</h3>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">#${t.serialNumber||"-"}</p>
                                </div>
                            </div>
                            <!-- \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0648\u0627\u0644\u062D\u0630\u0641 -->
                        </div>
                        <!-- \u0628\u0642\u064A\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A -->
                    </div>
                </div>
            </div>
        `}).join("")}function renderBlacklistTableFixed(e){return`
        <table class="data-table">
            <thead>
                <tr>
                    <th>\u0645</th>
                    <th>\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0646\u0639</th>
                    <th>\u0627\u0644\u0645\u0635\u0646\u0639</th>
                    <th>\u0627\u0644\u0645\u0648\u0642\u0639</th>
                    <th>\u0627\u0644\u0627\u0633\u0645 \u0631\u0628\u0627\u0639\u064A</th>
                    <th>\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629</th>
                    <th>\u0627\u0644\u0648\u0638\u064A\u0641\u0629</th>
                    <th>\u0627\u0644\u0634\u0631\u0643\u0629 - \u0627\u0644\u0645\u0642\u0627\u0648\u0644</th>
                    <th>\u0627\u0644\u0625\u062F\u0627\u0631\u0629</th>
                    <th>\u0627\u0644\u0642\u0627\u0626\u0645 \u0628\u0627\u0644\u0645\u0646\u0639</th>
                    <th>\u0645\u062D\u0631\u0631 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</th>
                    <th>\u0627\u0644\u0635\u0648\u0631\u0629</th>
                    <th>\u0633\u0628\u0628 \u0627\u0644\u0645\u0646\u0639</th>
                    <th>\u0645\u0644\u0627\u062D\u0638\u0627\u062A</th>
                    <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                </tr>
            </thead>
            <tbody>
                ${e.map(t=>{const s=convertBase64ToUrl(t.photo);return`
                        <tr>
                            <td>${t.serialNumber||"-"}</td>
                            <td>${t.banDate?Utils.formatDate(t.banDate):"-"}</td>
                            <td>${Utils.escapeHTML(t.factory||"-")}</td>
                            <td>${Utils.escapeHTML(t.location||"-")}</td>
                            <td>${Utils.escapeHTML(t.fullName||"-")}</td>
                            <td>${Utils.escapeHTML(t.idNumber||"-")}</td>
                            <td>${Utils.escapeHTML(t.job||"-")}</td>
                            <td>${Utils.escapeHTML(t.contractor||"-")}</td>
                            <td>${Utils.escapeHTML(t.department||"-")}</td>
                            <td>${Utils.escapeHTML(t.bannedBy||"-")}</td>
                            <td>${Utils.escapeHTML(t.editor||"-")}</td>
                            <td>
                                ${s?`<img src="${Utils.escapeHTML(s)}" alt="\u0635\u0648\u0631\u0629" 
                                        data-photo-url="${Utils.escapeHTML(s)}"
                                        class="w-12 h-12 object-cover rounded cursor-pointer"
                                        onclick="Violations.viewBlacklistPhoto(this.dataset.photoUrl)" 
                                        title="\u0627\u0646\u0642\u0631 \u0644\u0639\u0631\u0636 \u0627\u0644\u0635\u0648\u0631\u0629"
                                        onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629%3C/text%3E%3C/svg%3E';">`:"-"}
                            </td>
                            <td class="max-w-xs truncate" title="${Utils.escapeHTML(t.banReason||"")}">
                                ${Utils.escapeHTML((t.banReason||"-").substring(0,50))}${(t.banReason||"").length>50?"...":""}
                            </td>
                            <td class="max-w-xs truncate" title="${Utils.escapeHTML(t.notes||"")}">
                                ${Utils.escapeHTML((t.notes||"-").substring(0,30))}${(t.notes||"").length>30?"...":""}
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <button onclick="Violations.viewBlacklistDetails('${t.id}')" class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                    <button onclick="Violations.editBlacklistRecord('${t.id}')" class="btn-icon btn-icon-warning" title="\u062A\u0639\u062F\u064A\u0644">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="Violations.deleteBlacklistRecord('${t.id}')" class="btn-icon btn-icon-danger" title="\u062D\u0630\u0641">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `}).join("")}
            </tbody>
        </table>
    `}function debugBlacklistPhotos(){if(!AppState.appData||!AppState.appData.blacklistRegister)return;AppState.appData.blacklistRegister.slice(0,5).forEach((t,s)=>{t.photo&&(t.photo.startsWith("data:")||t.photo.startsWith("http"))})}async function migrateBlacklistPhotosToDrive(){if(!AppState.appData||!AppState.appData.blacklistRegister)return;const e=AppState.appData.blacklistRegister;let t=0,s=0;for(let a=0;a<e.length;a++){const l=e[a];if(l.photo&&l.photo.startsWith("data:")){try{const o=await GoogleIntegration.uploadFileToDrive(l.photo,`blacklist_${l.id}_${Date.now()}.jpg`,"image/jpeg","Blacklist_Register");if(o&&o.success){const i=o.directLink||o.shareableLink;l.photo=i,t++}else s++}catch{s++}await new Promise(o=>setTimeout(o,500))}}t>0&&typeof window.DataManager<"u"&&window.DataManager.save&&await window.DataManager.save()}function loadBlacklistDataAsyncWithDebug(){setTimeout(()=>{debugBlacklistPhotos()},1e3)}
