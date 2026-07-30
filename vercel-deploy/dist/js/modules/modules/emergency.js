const Emergency={state:{filters:{search:"",severity:"",status:"active",channel:"",team:"",onlyUnacknowledged:!1},autoRefreshInterval:null,autoRefreshMs:6e4,lastCheckedAlerts:new Set,notificationCheckInterval:null},async load(){this._languageChangeListenerAdded||(document.addEventListener("language-changed",()=>{this.load()}),this._languageChangeListenerAdded=!0);try{const e=Emergency,t=document.getElementById("emergency-section");if(!t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0642\u0633\u0645 emergency-section \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F!");return}if(typeof AppState>"u"){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("AppState \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631!");return}if(typeof Utils>"u")return;e.clearAutoRefresh();const a=s=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(s):String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");t.innerHTML=`
                <div class="section-header">
                    <div class="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h1 class="section-title">
                                <i class="fas fa-exclamation-triangle ml-3"></i>
                                \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0648\u0627\u0644\u0637\u0648\u0627\u0631\u0626
                            </h1>
                            <p class="section-subtitle">\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A\u060C \u0641\u0631\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629\u060C \u0648\u062E\u0637\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 \u0641\u064A \u0644\u0648\u062D\u0629 \u0648\u0627\u062D\u062F\u0629</p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button id="add-plan-btn" class="btn-secondary">
                                <i class="fas fa-file-alt ml-2"></i>
                                \u0625\u0636\u0627\u0641\u0629 \u062E\u0637\u0629 \u0637\u0648\u0627\u0631\u0626
                            </button>
                            <button id="add-alert-btn" class="btn-primary">
                                <i class="fas fa-bell ml-2"></i>
                                \u0625\u0637\u0644\u0627\u0642 \u062A\u0646\u0628\u064A\u0647
                            </button>
                        </div>
                    </div>
                </div>

                <!-- \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u0628\u0648\u064A\u0628\u0627\u062A -->
                <div class="tabs-container mt-6">
                    <div class="tabs-nav" style="flex-wrap: nowrap; overflow-x: auto; overflow-y: visible; min-width: 0; width: 100%; max-width: 100%; box-sizing: border-box;">
                        <button class="tab-btn active" data-tab="alerts" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-bell"></i>
                            \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A
                        </button>
                        <button class="tab-btn" data-tab="plans" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-file-medical-alt"></i>
                            \u062E\u0637\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626
                        </button>
                        <button class="tab-btn" data-tab="factory-map" style="flex-shrink: 0; min-width: fit-content; white-space: nowrap; width: auto; max-width: none;">
                            <i class="fas fa-map"></i>
                            \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639
                        </button>
                    </div>

                    <!-- \u062A\u0628\u0648\u064A\u0628 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A -->
                    <div id="tab-alerts" class="tab-content active">
                        <div id="emergency-summary" class="mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"></div>
                        
                        <div class="content-card mb-6">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-filter ml-2"></i>
                                    \u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629
                                </h2>
                            </div>
                            <div class="card-body">
                                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0628\u062D\u062B</label>
                                        <input type="text" id="emergency-search" class="form-input" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u060C \u0627\u0644\u0645\u0646\u0637\u0642\u0629\u060C \u0623\u0648 \u0627\u0644\u0634\u062E\u0635 \u0627\u0644\u0645\u0633\u0624\u0648\u0644">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                                        <select id="emergency-filter-severity" class="form-input">
                                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A</option>
                                            <option value="\u0639\u0627\u0644\u064A\u0629">\u0639\u0627\u0644\u064A\u0629</option>
                                            <option value="\u0645\u062A\u0648\u0633\u0637\u0629">\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                            <option value="\u0645\u0646\u062E\u0641\u0636\u0629">\u0645\u0646\u062E\u0641\u0636\u0629</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                                        <select id="emergency-filter-status" class="form-input">
                                            <option value="active">\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0646\u0634\u0637\u0629</option>
                                            <option value="open">\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u0641\u062A\u0648\u062D\u0629</option>
                                            <option value="closed">\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u063A\u0644\u0642\u0629</option>
                                            <option value="all">\u0643\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0642\u0646\u0627\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644</label>
                                        <select id="emergency-filter-channel" class="form-input">
                                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0642\u0646\u0648\u0627\u062A</option>
                                            ${(AppState.emergencyChannels||[]).map(s=>`
                                                <option value="${a(s)}">${a(s)}</option>
                                            `).join("")}
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold text-gray-600 mb-2">\u0641\u0631\u064A\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629</label>
                                        <select id="emergency-filter-team" class="form-input">
                                            <option value="">\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0631\u0642</option>
                                            ${(AppState.emergencyTeams||[]).map(s=>`
                                                <option value="${a(s)}">${a(s)}</option>
                                            `).join("")}
                                        </select>
                                    </div>
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="emergency-filter-unack" class="rounded border-gray-300 text-blue-600">
                                    <label for="emergency-filter-unack" class="text-sm text-gray-700">\u0639\u0631\u0636 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629 \u0641\u0642\u0637</label>
                                </div>
                            </div>
                            <div class="flex items-center justify-between flex-wrap gap-3 mt-4 pt-4 border-t">
                                <div class="flex items-center gap-2">
                                    <input type="checkbox" id="emergency-auto-refresh" class="rounded border-gray-300 text-blue-600" checked>
                                    <label for="emergency-auto-refresh" class="text-sm text-gray-700">
                                        \u062A\u062D\u062F\u064A\u062B \u062A\u0644\u0642\u0627\u0626\u064A \u0643\u0644 ${Math.floor(e.state.autoRefreshMs/1e3)} \u062B\u0627\u0646\u064A\u0629
                                    </label>
                                </div>
                                <button id="emergency-refresh-btn" class="btn-secondary">
                                    <i class="fas fa-sync ml-2"></i>
                                    \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0622\u0646
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div class="xl:col-span-2 content-card">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-broadcast-tower ml-2"></i>
                                    \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A
                                </h2>
                            </div>
                            <div class="card-body" id="emergency-alerts-board"></div>
                        </div>
                        <div class="content-card">
                            <div class="card-header">
                                <h2 class="card-title">
                                    <i class="fas fa-history ml-2"></i>
                                    \u0622\u062E\u0631 \u0627\u0644\u0623\u0646\u0634\u0637\u0629
                                </h2>
                            </div>
                            <div class="card-body" id="emergency-timeline-board"></div>
                        </div>
                    </div>
                </div>

                <!-- \u062A\u0628\u0648\u064A\u0628 \u062E\u0637\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 -->
                <div id="tab-plans" class="tab-content">
                    <div class="content-card">
                        <div class="card-header">
                            <div class="flex items-center justify-between">
                                <h2 class="card-title">
                                    <i class="fas fa-file-medical-alt ml-2"></i>
                                    \u062E\u0637\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626
                                </h2>
                                <button id="add-plan-tab-btn" class="btn-primary">
                                    <i class="fas fa-plus ml-2"></i>
                                    \u0625\u0636\u0627\u0641\u0629 \u062E\u0637\u0629 \u062C\u062F\u064A\u062F\u0629
                                </button>
                            </div>
                        </div>
                        <div class="card-body" id="emergency-plans-board"></div>
                    </div>
                </div>

                <!-- \u062A\u0628\u0648\u064A\u0628 \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 -->
                <div id="tab-factory-map" class="tab-content">
                    <div id="fm-shell" class="fm-shell">
                        <div class="fm-toolbar">
                            <div class="fm-toolbar-brand">
                                <div class="fm-toolbar-icon"><i class="fas fa-map-marked-alt"></i></div>
                                <div>
                                    <h2 class="fm-toolbar-title">\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629</h2>
                                    <p class="fm-toolbar-sub" id="fm-plan-meta">\u0627\u062E\u062A\u0631 \u0645\u062E\u0637\u0637\u0627\u064B \u0644\u0639\u0631\u0636 \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                                </div>
                            </div>
                            <div class="fm-toolbar-actions">
                                <select id="fm-factory-filter" class="form-input fm-factory-filter" title="\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0635\u0646\u0639">
                                    <option value="">\u0643\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>
                                </select>
                                <select id="fm-floor-select" class="form-input fm-floor-select" title="\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062E\u0637\u0637">
                                    <option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0637\u0637 \u2014</option>
                                </select>
                                <div class="fm-toolbar-btn-group">
                                    <button id="fm-edit-floor-btn" class="btn-secondary btn-sm hidden" title="\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u062E\u0637\u0637">
                                        <i class="fas fa-pen"></i><span>\u062A\u0639\u062F\u064A\u0644</span>
                                    </button>
                                    <button id="fm-delete-floor-btn" class="btn-secondary btn-sm fm-btn-danger hidden" title="\u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0637\u0637">
                                        <i class="fas fa-trash"></i><span>\u062D\u0630\u0641</span>
                                    </button>
                                    <button id="fm-admin-toggle" class="btn-secondary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0648\u062A\u0639\u062F\u064A\u0644 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629">
                                        <i class="fas fa-tools"></i><span>\u0648\u0636\u0639 \u0627\u0644\u0625\u062F\u0627\u0631\u0629</span>
                                    </button>
                                    <button id="fm-add-floor-btn" class="btn-primary btn-sm" title="\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0637\u0637 \u0637\u0627\u0628\u0642 \u062C\u062F\u064A\u062F">
                                        <i class="fas fa-plus"></i><span>\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0637\u0637</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="fm-workspace">
                            <div class="fm-map-stage">
                                <div class="fm-viewport-bar hidden" id="fm-viewport-bar">
                                    <div class="fm-viewport-bar-right">
                                        <span class="fm-badge" id="fm-items-count"><i class="fas fa-map-pin"></i> 0 \u0639\u0646\u0635\u0631</span>
                                        <span class="fm-badge fm-badge-muted" id="fm-zoom-label">100%</span>
                                    </div>
                                    <div class="fm-viewport-controls">
                                        <button type="button" class="fm-ctrl-btn fm-ctrl-btn-accent hidden" id="fm-qr-btn" title="\u0631\u0645\u0632 QR \u0644\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629">
                                            <i class="fas fa-qrcode"></i><span>QR</span>
                                        </button>
                                        <button type="button" class="fm-ctrl-btn hidden" id="fm-export-png-btn" title="\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 PNG">
                                            <i class="fas fa-file-image"></i><span>\u062A\u0635\u062F\u064A\u0631</span>
                                        </button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-out" title="\u062A\u0635\u063A\u064A\u0631"><i class="fas fa-search-minus"></i></button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-reset" title="\u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0644\u0634\u0627\u0634\u0629"><i class="fas fa-compress-arrows-alt"></i></button>
                                        <button type="button" class="fm-ctrl-btn" id="fm-zoom-in" title="\u062A\u0643\u0628\u064A\u0631"><i class="fas fa-search-plus"></i></button>
                                        <button type="button" class="fm-ctrl-btn fm-ctrl-btn-primary" id="fm-fullscreen-btn" title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629">
                                            <i class="fas fa-expand"></i><span>\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="fm-map-container" id="fm-map-container">
                                    <div class="fm-map-placeholder" id="fm-map-placeholder">
                                        <div class="fm-placeholder-card">
                                            <div class="fm-placeholder-icon"><i class="fas fa-map-marked-alt"></i></div>
                                            <h3>\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u062E\u0637\u0637 \u0645\u0639\u0631\u0648\u0636</h3>
                                            <p>\u0627\u062E\u062A\u0631 \u0645\u062E\u0637\u0637\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0623\u0648 \u0623\u0636\u0641 \u0645\u062E\u0637\u0637 \u0637\u0627\u0628\u0642 \u062C\u062F\u064A\u062F \u0644\u0628\u062F\u0621 \u0648\u0636\u0639 \u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0633\u0644\u0627\u0645\u0629</p>
                                            <button type="button" class="btn-primary btn-sm" onclick="Emergency.showFloorPlanForm()">
                                                <i class="fas fa-plus ml-1"></i>\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0644 \u0645\u062E\u0637\u0637
                                            </button>
                                        </div>
                                    </div>
                                    <div class="fm-map-wrapper hidden" id="fm-map-wrapper">
                                        <div class="fm-viewport" id="fm-viewport">
                                            <div class="fm-viewport-inner" id="fm-viewport-inner">
                                                <div class="fm-map-canvas" id="fm-map-canvas">
                                                    <img id="fm-map-image" class="fm-map-image" data-fm-map-image="1" src="" alt="\u0645\u062E\u0637\u0637 \u0627\u0644\u0637\u0627\u0628\u0642">
                                                    <div id="fm-map-items-layer" class="fm-map-items-layer"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <aside class="fm-legend-sidebar hidden" id="fm-legend-sidebar">
                                <div class="fm-legend-title"><i class="fas fa-info-circle"></i> \u062F\u0644\u064A\u0644 \u0627\u0644\u0631\u0645\u0648\u0632</div>
                                <div class="fm-legend-items" id="fm-legend-items"></div>
                            </aside>
                        </div>

                        <div class="fm-admin-panel hidden" id="fm-admin-panel">
                            <div class="fm-admin-header">
                                <h3><i class="fas fa-tools"></i> \u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u2014 \u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0627\u0635\u0631 \u0644\u0644\u062E\u0631\u064A\u0637\u0629</h3>
                                <button id="fm-admin-close" class="btn-secondary btn-sm">\u0625\u063A\u0644\u0627\u0642</button>
                            </div>
                            <div class="fm-admin-body">
                            <div class="fm-admin-tools">
                                <button class="fm-add-item-btn" data-type="fire_extinguisher" style="background:#ef4444;">
                                    <i class="fas fa-fire-extinguisher"></i> \u0645\u0637\u0641\u0623\u0629 \u062D\u0631\u064A\u0642
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_hose" style="background:#dc2626;">
                                    <i class="fas fa-fire"></i> \u062E\u0631\u0637\u0648\u0645 \u062D\u0631\u064A\u0642
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_alarm" style="background:#f97316;">
                                    <i class="fas fa-bell"></i> \u0625\u0646\u0630\u0627\u0631 \u062D\u0631\u064A\u0642
                                </button>
                                <button class="fm-add-item-btn" data-type="emergency_exit" style="background:#22c55e;">
                                    <i class="fas fa-door-open"></i> \u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626
                                </button>
                                <button class="fm-add-item-btn" data-type="escape_route" style="background:#16a34a;">
                                    <i class="fas fa-arrow-right"></i> \u0637\u0631\u064A\u0642 \u0647\u0631\u0648\u0628
                                </button>
                                <button class="fm-add-item-btn" data-type="assembly_point" style="background:#3b82f6;">
                                    <i class="fas fa-users"></i> \u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639
                                </button>
                                <button class="fm-add-item-btn" data-type="first_aid" style="background:#ec4899;">
                                    <i class="fas fa-medkit"></i> \u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629
                                </button>
                                <button class="fm-add-item-btn" data-type="hazmat" style="background:#a855f7;">
                                    <i class="fas fa-skull-crossbones"></i> \u0645\u0648\u0627\u062F \u062E\u0637\u0631\u0629
                                </button>
                                <button class="fm-add-item-btn" data-type="evacuation_chair" style="background:#06b6d4;">
                                    <i class="fas fa-wheelchair"></i> \u0643\u0631\u0633\u064A \u0625\u062E\u0644\u0627\u0621
                                </button>
                                <button class="fm-add-item-btn" data-type="fire_panel" style="background:#64748b;">
                                    <i class="fas fa-server"></i> \u0644\u0648\u062D\u0629 \u0625\u0637\u0641\u0627\u0621
                                </button>
                            </div>
                            <p class="fm-admin-hint"><i class="fas fa-mouse-pointer"></i> \u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0639\u0646\u0635\u0631 \u062B\u0645 \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u0625\u0636\u0627\u0641\u062A\u0647. \u064A\u0645\u0643\u0646\u0643 \u0633\u062D\u0628 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u0648\u062C\u0648\u062F\u0629 \u0644\u062A\u0639\u062F\u064A\u0644 \u0645\u0648\u0642\u0639\u0647\u0627.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            `,e.setupTabsNavigation(),e.setupEventListeners(),typeof e.renderAll=="function"?e.renderAll():typeof Utils<"u"&&Utils.safeError&&Utils.safeError("Emergency.renderAll \u063A\u064A\u0631 \u0645\u0639\u0631\u0651\u0641\u0629 \u0623\u0648 \u0644\u064A\u0633\u062A \u062F\u0627\u0644\u0629",e),typeof e.setupAutoRefresh=="function"&&e.setupAutoRefresh(),typeof e._fmCheckQrEntry=="function"&&e._fmCheckQrEntry()}catch(e){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u274C \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062F\u064A\u0648\u0644 \u0627\u0644\u0637\u0648\u0627\u0631\u0626:",e);const t=document.getElementById("emergency-section");t&&(t.innerHTML=`
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A</p>
                                <button onclick="Emergency.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629
                                </button>
                            </div>
                        </div>
                    </div>
                `)}},setupTabsNavigation(){const e=document.querySelectorAll("#emergency-section .tab-btn"),t=document.querySelectorAll("#emergency-section .tab-content");if(e.forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-tab");e.forEach(o=>o.classList.remove("active")),t.forEach(o=>o.classList.remove("active")),s.classList.add("active");const n=document.getElementById(`tab-${i}`);n&&n.classList.add("active"),i==="alerts"?(this.renderSummary(),this.renderAlertsBoard(),this.renderTimelineBoard()):i==="plans"?this.renderPlansBoard():i==="factory-map"&&this.initFactoryMapTab()})}),!document.querySelector("#emergency-section .tab-content.active")){const s=e[0];s&&s.click()}},clearAutoRefresh(){Emergency.state.autoRefreshInterval&&(clearInterval(Emergency.state.autoRefreshInterval),Emergency.state.autoRefreshInterval=null)},setupAutoRefresh(){const e=Emergency,t=document.getElementById("emergency-auto-refresh");(!t||t.checked)&&(e.state.autoRefreshInterval=setInterval(()=>{e.renderAll(),e.checkForNewAlerts()},e.state.autoRefreshMs),e.checkForNewAlerts())},checkForNewAlerts(){const e=this.getAlerts(),t=new Set;e.forEach(a=>{if(!(!a||!a.id)&&(t.add(a.id),!this.state.lastCheckedAlerts.has(a.id)&&a.status!=="\u0645\u063A\u0644\u0642"&&!a.acknowledgedAt)){const s=a.severity==="\u0639\u0627\u0644\u064A\u0629";if((a.createdAt?(new Date-new Date(a.createdAt))/(1e3*60):0)<=5){const n={title:s?"\u{1F6A8} \u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626 \u062D\u0631\u062C":"\u26A0\uFE0F \u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626 \u062C\u062F\u064A\u062F",message:a.title,description:a.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641 \u0645\u062A\u0627\u062D",priority:s?"critical":"high",persistent:s,sound:!0,actions:[{label:"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",primary:!0,onClick:()=>{this.viewAlert(a.id)}},...a.status==="\u0646\u0634\u0637"&&!a.acknowledgedAt?[{label:"\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647",primary:!1,onClick:()=>{this.acknowledgeAlert(a.id)}}]:[],{label:"\u0625\u063A\u0644\u0627\u0642",onClick:()=>{}}],onClick:()=>{this.viewAlert(a.id)}};s?Notification.emergency(n):Notification.show(n)}}}),this.state.lastCheckedAlerts=t},getAlerts(){return(Array.isArray(AppState.appData.emergencyAlerts)?AppState.appData.emergencyAlerts:[]).filter(t=>t&&typeof t=="object"&&t.id&&t.title&&t.title.trim()!==""&&t.description&&t.description.trim()!=="").map(t=>this.ensureAlertStructure(t)).filter(t=>t&&t.id)},getPlans(){return(Array.isArray(AppState.appData.emergencyPlans)?AppState.appData.emergencyPlans:[]).map(t=>this.ensurePlanStructure(t))},ensureAlertStructure(e){if(!e||typeof e!="object"||!e.id||!e.title||!e.description)return null;const t={...e};return t.timeline=Array.isArray(t.timeline)?t.timeline:[],t.assignedTeams=Array.isArray(t.assignedTeams)?t.assignedTeams:[],t.channels=Array.isArray(t.channels)?t.channels:[],t.impactArea=t.impactArea||"",t.responseInstructions=t.responseInstructions||"",t.requiresEvacuation=t.requiresEvacuation===!0,t.autoEscalateMinutes=Number(t.autoEscalateMinutes||0),t.createdBy=t.createdBy||this.getCurrentUserSummary(t.createdBy),t.severity=t.severity||"\u0645\u062A\u0648\u0633\u0637\u0629",t.status=t.status||"\u0646\u0634\u0637",t.createdAt=t.createdAt||t.date||new Date().toISOString(),t.updatedAt=t.updatedAt||new Date().toISOString(),t},ensurePlanStructure(e){return e?(e.ownerTeam=e.ownerTeam||"",e.contactPerson=e.contactPerson||"",e.contactPhone=e.contactPhone||"",e.lastTested=e.lastTested||"",e.updatedAt=e.updatedAt||e.createdAt||new Date().toISOString(),e):{}},getCurrentUserSummary(e=null){return e&&typeof e=="object"?e:AppState.currentUser?{id:AppState.currentUser.id||"",name:AppState.currentUser.name||"",email:AppState.currentUser.email||"",role:AppState.currentUser.role||""}:{name:"\u0646\u0638\u0627\u0645",email:"",role:""}},setupEventListeners(){setTimeout(()=>{const e=document.getElementById("add-alert-btn"),t=document.getElementById("add-plan-btn"),a=document.getElementById("add-plan-tab-btn");e&&e.addEventListener("click",()=>{Emergency.showAlertForm();const c=document.querySelector('#emergency-section .tab-btn[data-tab="alerts"]');c&&c.click()}),t&&t.addEventListener("click",()=>{Emergency.showPlanForm();const c=document.querySelector('#emergency-section .tab-btn[data-tab="plans"]');c&&c.click()}),a&&a.addEventListener("click",()=>Emergency.showPlanForm());const s=document.getElementById("emergency-search");s&&s.addEventListener("input",c=>{Emergency.state.filters.search=c.target.value.trim(),Emergency.renderAll()});const i=document.getElementById("emergency-filter-severity");i&&i.addEventListener("change",c=>{Emergency.state.filters.severity=c.target.value,Emergency.renderAll()});const n=document.getElementById("emergency-filter-status");n&&n.addEventListener("change",c=>{Emergency.state.filters.status=c.target.value,Emergency.renderAll()});const o=document.getElementById("emergency-filter-channel");o&&o.addEventListener("change",c=>{Emergency.state.filters.channel=c.target.value,Emergency.renderAll()});const r=document.getElementById("emergency-filter-team");r&&r.addEventListener("change",c=>{Emergency.state.filters.team=c.target.value,Emergency.renderAll()});const d=document.getElementById("emergency-filter-unack");d&&d.addEventListener("change",c=>{Emergency.state.filters.onlyUnacknowledged=c.target.checked,Emergency.renderAll()});const l=document.getElementById("emergency-refresh-btn");l&&l.addEventListener("click",()=>Emergency.renderAll());const m=document.getElementById("emergency-auto-refresh");m&&m.addEventListener("change",()=>{Emergency.clearAutoRefresh(),Emergency.setupAutoRefresh()})},100)},renderAll(){const e=this,t=()=>{typeof NotificationsManager<"u"&&NotificationsManager.updateBadge()},a=typeof requestAnimationFrame=="function"?s=>{requestAnimationFrame(s)}:s=>{setTimeout(s,0)};a(()=>{e.renderSummary();const s=document.querySelector("#emergency-section .tab-btn.active");a(()=>{if(s){const i=s.getAttribute("data-tab");i==="alerts"?(e.renderAlertsBoard(),a(()=>{e.renderTimelineBoard(),t()})):(i==="plans"&&e.renderPlansBoard(),t())}else e.renderAlertsBoard(),a(()=>{e.renderTimelineBoard(),a(()=>{e.renderPlansBoard(),t()})})})})},renderTimelineBoard(){const e=document.getElementById("emergency-timeline-board");if(!e)return;const t=this.buildTimeline().slice(0,12);if(t.length===0){e.innerHTML=`
                <div class="text-center text-gray-500 text-sm py-4">
                    \u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0646\u0634\u0637\u0629 \u062D\u062F\u064A\u062B\u0629
                </div>
            `;return}e.innerHTML=`
            <div class="space-y-4">
                ${t.map(a=>`
                    <div class="timeline-entry border-l-4 pl-4 ${this.getTimelineColor(a.type)}">
                        <div class="flex items-center justify-between">
                            <div class="font-semibold text-gray-800">${Utils.escapeHTML(a.title)}</div>
                            <div class="text-xs text-gray-500">${Utils.formatDateTime(a.timestamp)}</div>
                        </div>
                        <div class="text-sm text-gray-600 mt-1">${Utils.escapeHTML(a.description||"")}</div>
                        <div class="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <span><i class="fas fa-user ml-1"></i>${Utils.escapeHTML(a.actor||"\u0627\u0644\u0646\u0638\u0627\u0645")}</span>
                            <span><i class="fas fa-bolt ml-1"></i>${Utils.escapeHTML(a.severity||"")}</span>
                            <button class="text-blue-600 hover:text-blue-800" onclick="Emergency.viewAlert('${Utils.escapeAttr(a.alertId)}')">\u0639\u0631\u0636 \u0627\u0644\u062A\u0646\u0628\u064A\u0647</button>
                        </div>
                    </div>
                `).join("")}
            </div>
        `},getTimelineColor(e){switch(e){case"created":return"border-blue-400";case"acknowledged":return"border-green-400";case"resolved":return"border-teal-400";case"escalated":return"border-red-400";default:return"border-gray-300"}},buildTimeline(){const e=this.getAlerts(),t=[];return e.forEach(a=>{const s=a.severity||"",i=a.title||"\u062A\u0646\u0628\u064A\u0647",n=a.createdBy?.name||"\u0627\u0644\u0646\u0638\u0627\u0645";t.push({id:`${a.id}-created`,alertId:a.id,timestamp:a.createdAt||a.date||new Date().toISOString(),type:"created",title:`${i} \u2022 \u0625\u0646\u0634\u0627\u0621`,description:a.description||"",actor:n,severity:s}),(a.timeline||[]).forEach(o=>{t.push({id:o.id||Utils.generateId("TIMELINE"),alertId:a.id,timestamp:o.timestamp||new Date().toISOString(),type:o.type||"update",title:`${i} \u2022 ${o.label||"\u062A\u062D\u062F\u064A\u062B"}`,description:o.description||"",actor:o.actor?.name||o.actor||"\u0627\u0644\u0646\u0638\u0627\u0645",severity:s})})}),t.sort((a,s)=>new Date(s.timestamp)-new Date(a.timestamp))},renderPlansBoard(){const e=document.getElementById("emergency-plans-board");if(!e)return;const t=this.getPlans();if(t.length===0){e.innerHTML=`
                <div class="empty-state py-8 text-center">
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062E\u0637\u0637 \u0637\u0648\u0627\u0631\u0626 \u0645\u0633\u062C\u0644\u0629 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646</p>
                    <button class="btn-primary mt-3" onclick="Emergency.showPlanForm()">
                        <i class="fas fa-plus ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u062E\u0637\u0629 \u0637\u0648\u0627\u0631\u0626
                    </button>
                </div>
            `;return}e.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u062E\u0637\u0629</th>
                            <th>\u0627\u0644\u0646\u0648\u0639</th>
                            <th>\u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0645\u0633\u0624\u0648\u0644</th>
                            <th>\u0622\u062E\u0631 \u0627\u062E\u062A\u0628\u0627\u0631</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>`
                            <tr>
                                <td>
                                    <div class="font-semibold text-gray-900">${Utils.escapeHTML(a.name||"")}</div>
                                    <div class="text-xs text-gray-500 mt-1">${Utils.escapeHTML(a.description||"").substring(0,80)}${a.description&&a.description.length>80?"...":""}</div>
                                </td>
                                <td>
                                    <span class="badge badge-secondary">${Utils.escapeHTML(a.type||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</span>
                                </td>
                                <td>
                                    <div class="text-sm text-gray-800">${Utils.escapeHTML(a.ownerTeam||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>
                                    ${a.contactPerson?`<div class="text-xs text-gray-500">${Utils.escapeHTML(a.contactPerson)} \u2022 ${Utils.escapeHTML(a.contactPhone||"")}</div>`:""}
                                </td>
                                <td>${a.lastTested?Utils.formatDate(a.lastTested):'<span class="text-xs text-gray-400">\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631</span>'}</td>
                                <td>
                                    <div class="flex gap-2">
                                        <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Emergency.viewPlan('${Utils.escapeAttr(a.id)}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button class="btn-icon btn-icon-primary" title="\u062A\u0639\u062F\u064A\u0644" onclick="Emergency.showPlanForm(${JSON.stringify(a).replace(/"/g,"&quot;")})">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `},buildTimelineEntry(e,t,a){return{id:Utils.generateId("ALOG"),type:e,label:this.getTimelineLabel(e),description:a,actor:this.getCurrentUserSummary(),timestamp:new Date().toISOString(),severity:t.severity}},getTimelineLabel(e){switch(e){case"created":return"\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0646\u0628\u064A\u0647";case"acknowledged":return"\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F";case"resolved":return"\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642";case"escalated":return"\u062A\u0645 \u0627\u0644\u062A\u0635\u0639\u064A\u062F";default:return"\u062A\u062D\u062F\u064A\u062B"}},getFilteredAlerts(){const e=this.getAlerts(),t=this.state.filters,a=t.search.toLowerCase(),s=new Date;return e.filter(i=>!i||!i.id||!i.title||!(!a||[i.title,i.description,i.impactArea,(i.assignedTeams||[]).join(" "),(i.channels||[]).join(" "),i.severity,i.status].some(o=>(o||"").toString().toLowerCase().includes(a)))||t.severity&&i.severity!==t.severity||t.channel&&!(i.channels||[]).includes(t.channel)||t.team&&!(i.assignedTeams||[]).includes(t.team)||t.onlyUnacknowledged&&i.acknowledgedAt?!1:t.status==="active"?i.status!=="\u0645\u063A\u0644\u0642":t.status==="open"?i.status==="\u0646\u0634\u0637"||i.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":t.status==="closed"?i.status==="\u0645\u063A\u0644\u0642":(t.status==="all",!0)).sort((i,n)=>new Date(n.createdAt||n.date||0)-new Date(i.createdAt||i.date||0)).map(i=>{const n={...i};if(n.isEscalated=!1,!n.acknowledgedAt&&n.autoEscalateMinutes>0){const o=new Date(n.createdAt||n.date||s);(s-o)/(1e3*60)>=n.autoEscalateMinutes&&(n.isEscalated=!0)}return n})},renderSummary(){const e=document.getElementById("emergency-summary");if(!e)return;const a=this.getAlerts().filter(o=>o.status!=="\u0645\u063A\u0644\u0642"),s=a.filter(o=>o.severity==="\u0639\u0627\u0644\u064A\u0629"),i=a.filter(o=>!o.acknowledgedAt),n=a.filter(o=>{if(!o.autoEscalateMinutes||o.acknowledgedAt)return!1;const r=new Date(o.createdAt||o.date||new Date);return(new Date-r)/(1e3*60)>=o.autoEscalateMinutes});e.innerHTML=`
            <div class="summary-card">
                <div class="summary-card-icon bg-red-100 text-red-600">
                    <i class="fas fa-bolt"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0646\u0634\u0637\u0629</p>
                    <p class="summary-card-value">${a.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-yellow-100 text-yellow-600">
                    <i class="fas fa-exclamation"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u062E\u0637\u0648\u0631\u0629 \u0639\u0627\u0644\u064A\u0629</p>
                    <p class="summary-card-value">${s.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-blue-100 text-blue-600">
                    <i class="fas fa-user-clock"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</p>
                    <p class="summary-card-value">${i.length}</p>
                </div>
            </div>
            <div class="summary-card">
                <div class="summary-card-icon bg-purple-100 text-purple-600">
                    <i class="fas fa-arrow-up"></i>
                </div>
                <div>
                    <p class="summary-card-label">\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u062A\u0635\u0627\u0639\u062F\u0629</p>
                    <p class="summary-card-value">${n.length}</p>
                </div>
            </div>
        `},renderAlertsBoard(){const e=document.getElementById("emergency-alerts-board");if(!e)return;const t=this.getFilteredAlerts();if(t.length===0){e.innerHTML=`
                <div class="empty-state py-10 text-center">
                    <i class="fas fa-check-circle text-4xl text-green-400 mb-3"></i>
                    <p class="text-gray-500">\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0639\u0648\u0627\u0645\u0644 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629</p>
                </div>
            `;return}e.innerHTML=`
            <div class="table-wrapper" style="overflow-x: auto;">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>\u0627\u0644\u062A\u0646\u0628\u064A\u0647</th>
                            <th>\u0627\u0644\u062E\u0637\u0648\u0631\u0629</th>
                            <th>\u0627\u0644\u0642\u0646\u0648\u0627\u062A</th>
                            <th>\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629</th>
                            <th>\u0641\u0631\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629</th>
                            <th>\u0627\u0644\u062D\u0627\u0644\u0629</th>
                            <th>\u0627\u0644\u0645\u062F\u0629</th>
                            <th>\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${t.map(a=>this.renderAlertRow(a)).join("")}
                    </tbody>
                </table>
            </div>
        `},renderAlertRow(e){const t=e.severity==="\u0639\u0627\u0644\u064A\u0629"?"badge-danger":e.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"badge-warning":"badge-info",a=e.status==="\u0645\u063A\u0644\u0642"?"badge-success":e.status==="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"?"badge-warning":"badge-danger",s=(e.assignedTeams||[]).map(g=>`
            <span class="badge badge-info">${Utils.escapeHTML(g)}</span>
        `).join(""),i=(e.channels||[]).map(g=>`
            <span class="badge badge-secondary">${Utils.escapeHTML(g)}</span>
        `).join(""),n=new Date(e.createdAt||e.date||new Date),o=Math.floor((new Date-n)/(1e3*60)),r=Math.floor(o/60),d=o%60,l=r>0?`${r} \u0633 ${d} \u062F`:`${d} \u062F`,m=e.acknowledgedAt?`<span class="text-xs text-gray-500">\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F ${Utils.formatDateTime(e.acknowledgedAt)}</span>`:'<span class="text-xs text-red-500">\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F</span>',c=e.isEscalated?'<span class="badge badge-danger ml-2"><i class="fas fa-arrow-up ml-1"></i>\u0645\u062A\u0635\u0627\u0639\u062F</span>':"";return`
            <tr>
                <td>
                    <div class="font-semibold text-gray-900 flex items-center gap-2">
                        ${Utils.escapeHTML(e.title||"")}
                        ${e.requiresEvacuation?'<span class="badge badge-danger">\u0625\u062E\u0644\u0627\u0621</span>':""}
                        ${c}
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                        ${Utils.escapeHTML(e.description||"").substring(0,140)}${e.description&&e.description.length>140?"...":""}
                    </div>
                    <div class="text-xs text-gray-400 mt-1">
                        \u0623\u064F\u0637\u0644\u0642 \u0628\u0648\u0627\u0633\u0637\u0629 ${Utils.escapeHTML(e.createdBy?.name||"\u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641")} \u0641\u064A ${Utils.formatDateTime(e.createdAt||e.date)}
                    </div>
                </td>
                <td>
                    <span class="badge ${t}">${e.severity||"-"}</span>
                </td>
                <td>
                    <div class="flex flex-wrap gap-1">${i||'<span class="text-xs text-gray-400">\u063A\u064A\u0631 \u0645\u062D\u062F\u062F</span>'}</div>
                </td>
                <td>
                    <div class="text-sm text-gray-800">${Utils.escapeHTML(e.impactArea||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}</div>
                </td>
                <td>
                    <div class="flex flex-wrap gap-1">${s||'<span class="text-xs text-gray-400">\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u0639\u064A\u064A\u0646</span>'}</div>
                </td>
                <td>
                    <div class="flex flex-col gap-1">
                        <span class="badge ${a}">${e.status||"\u0646\u0634\u0637"}</span>
                        ${m}
                    </div>
                </td>
                <td>
                    <div class="text-sm text-gray-800">${l}</div>
                    ${e.autoEscalateMinutes?`<div class="text-xs text-gray-500">\u0627\u0644\u062A\u0635\u0639\u064A\u062F \u0628\u0639\u062F ${e.autoEscalateMinutes} \u062F</div>`:""}
                </td>
                <td>
                    <div class="flex flex-wrap gap-2">
                        <button class="btn-icon btn-icon-info" title="\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644" onclick="Emergency.viewAlert('${Utils.escapeAttr(e.id)}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${e.acknowledgedAt?"":`
                            <button class="btn-icon btn-icon-success" title="\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647" onclick="Emergency.acknowledgeAlert('${Utils.escapeAttr(e.id)}')">
                                <i class="fas fa-check"></i>
                            </button>
                        `}
                        ${e.status!=="\u0645\u063A\u0644\u0642"?`
                            <button class="btn-icon btn-icon-primary" title="\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647" onclick="Emergency.resolveAlert('${Utils.escapeAttr(e.id)}')">
                                <i class="fas fa-flag-checkered"></i>
                            </button>
                        `:""}
                    </div>
                </td>
            </tr>
        `},async showAlertForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647":"\u0625\u0636\u0627\u0641\u0629 \u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="alert-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 *</label>
                            <input type="text" id="alert-title" required class="form-input" 
                                value="${Utils.escapeHTML(e?.title||"")}" placeholder="\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062A\u0646\u0628\u064A\u0647">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="alert-description" required class="form-input" rows="4" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u0644\u062A\u0646\u0628\u064A\u0647">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062E\u0637\u0648\u0631\u0629 *</label>
                                <select id="alert-severity" required class="form-input">
                                    <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u062E\u0637\u0648\u0631\u0629</option>
                                    <option value="\u0639\u0627\u0644\u064A\u0629" ${e?.severity==="\u0639\u0627\u0644\u064A\u0629"?"selected":""}>\u0639\u0627\u0644\u064A\u0629</option>
                                    <option value="\u0645\u062A\u0648\u0633\u0637\u0629" ${e?.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"selected":""}>\u0645\u062A\u0648\u0633\u0637\u0629</option>
                                    <option value="\u0645\u0646\u062E\u0636\u0629" ${e?.severity==="\u0645\u0646\u062E\u0636\u0629"?"selected":""}>\u0645\u0646\u062E\u0636\u0629</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062D\u0627\u0644\u0629 *</label>
                                <select id="alert-status" required class="form-input">
                                    <option value="\u0646\u0634\u0637" ${e?.status==="\u0646\u0634\u0637"?"selected":""}>\u0646\u0634\u0637</option>
                                    <option value="\u0645\u063A\u0644\u0642" ${e?.status==="\u0645\u063A\u0644\u0642"?"selected":""}>\u0645\u063A\u0644\u0642</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u062A\u0627\u0631\u064A\u062E *</label>
                            <input type="date" id="alert-date" required class="form-input" 
                                value="${e?.date?new Date(e.date).toISOString().split("T")[0]:new Date().toISOString().split("T")[0]}">
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">\u062D\u0641\u0638</button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),document.getElementById("alert-form").addEventListener("submit",s=>{s.preventDefault(),this.handleAlertSubmit(e?.id,t)}),t.addEventListener("click",s=>{s.target===t&&t.remove()})},async showPlanForm(e=null){const t=document.createElement("div");t.className="modal-overlay",t.innerHTML=`
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2 class="modal-title">${e?"\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062E\u0637\u0629":"\u0625\u0636\u0627\u0641\u0629 \u062E\u0637\u0629 \u0637\u0648\u0627\u0631\u0626"}</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="plan-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0633\u0645 \u0627\u0644\u062E\u0637\u0629 *</label>
                            <input type="text" id="plan-name" required class="form-input" 
                                value="${Utils.escapeHTML(e?.name||"")}" placeholder="\u0627\u0633\u0645 \u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0646\u0648\u0639 *</label>
                            <select id="plan-type" required class="form-input">
                                <option value="">\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639</option>
                                <option value="\u062D\u0631\u064A\u0642" ${e?.type==="\u062D\u0631\u064A\u0642"?"selected":""}>\u062D\u0631\u064A\u0642</option>
                                <option value="\u0632\u0644\u0632\u0627\u0644" ${e?.type==="\u0632\u0644\u0632\u0627\u0644"?"selected":""}>\u0632\u0644\u0632\u0627\u0644</option>
                                <option value="\u064A\u0636\u0627\u0646\u0627\u062A" ${e?.type==="\u064A\u0636\u0627\u0646\u0627\u062A"?"selected":""}>\u064A\u0636\u0627\u0646\u0627\u062A</option>
                                <option value="\u062D\u0627\u062F\u062B \u0643\u064A\u0645\u064A\u0627\u0626\u064A" ${e?.type==="\u062D\u0627\u062F\u062B \u0643\u064A\u0645\u064A\u0627\u0626\u064A"?"selected":""}>\u062D\u0627\u062F\u062B \u0643\u064A\u0645\u064A\u0627\u0626\u064A</option>
                                <option value="\u0623\u062E\u0631\u0649" ${e?.type==="\u0623\u062E\u0631\u0649"?"selected":""}>\u0623\u062E\u0631\u0649</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">\u0627\u0644\u0648\u0635\u0641 *</label>
                            <textarea id="plan-description" required class="form-input" rows="6" 
                                placeholder="\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A \u0644\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626">${Utils.escapeHTML(e?.description||"")}</textarea>
                        </div>
                        <div class="flex items-center justify-end gap-3 pt-4 border-t">
                            <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary">\u062D\u0641\u0638</button>
                        </div>
                    </form>
                </div>
            </div>
        `,document.body.appendChild(t),document.getElementById("plan-form").addEventListener("submit",s=>{s.preventDefault(),this.handlePlanSubmit(e?.id,t)}),t.addEventListener("click",s=>{s.target===t&&t.remove()})},async handleAlertSubmit(e,t){const a=document.getElementById("alert-title"),s=document.getElementById("alert-description"),i=document.getElementById("alert-severity"),n=document.getElementById("alert-status"),o=document.getElementById("alert-date");if(!a||!s||!i||!n||!o){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const r={id:e||Utils.generateId("ALERT"),title:a.value.trim(),description:s.value.trim(),severity:i.value,status:n.value,date:new Date(o.value).toISOString(),createdAt:e?AppState.appData.emergencyAlerts.find(d=>d.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const d=AppState.appData.emergencyAlerts.findIndex(l=>l.id===e);d!==-1&&(AppState.appData.emergencyAlerts[d]=r),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0646\u062C\u0627\u062D",{title:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0628\u064A\u0647",description:`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0646\u0628\u064A\u0647 "${r.title}" \u0628\u0646\u062C\u0627\u062D`})}else{AppState.appData.emergencyAlerts.push(r),await this.sendAlertEmail(r);const d=r.severity==="\u0639\u0627\u0644\u064A\u0629",l={title:"\u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626 \u062C\u062F\u064A\u062F",message:r.title,description:r.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641",priority:d?"critical":"high",persistent:d,sound:!0,actions:[{label:"\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",primary:!0,onClick:()=>{this.viewAlert(r.id)}},{label:"\u0625\u063A\u0644\u0627\u0642",onClick:()=>{}}],onClick:()=>{this.viewAlert(r.id)}};d?Notification.emergency(l):Notification.show(l)}typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("EmergencyAlerts",AppState.appData.emergencyAlerts),Loading.hide(),t.remove(),this.load()}catch(d){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+d.message,{title:"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",description:d.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639"})}},async sendAlertEmail(e){const t=AppState.notificationEmails||[];if(t.length===0){Utils.safeLog("\u26A0 \u0644\u0627 \u062A\u0648\u062C\u062F \u0625\u064A\u0645\u064A\u0644\u0627\u062A \u0644\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0641\u064A \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A");return}try{const a=`\u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626: ${e.title}`,s=`
                <h2>\u062A\u0646\u0628\u064A\u0647 \u0637\u0648\u0627\u0631\u0626</h2>
                <p><strong>\u0627\u0644\u0639\u0646\u0648\u0627\u0646:</strong> ${e.title}</p>
                <p><strong>\u0627\u0644\u0648\u0635\u0641:</strong> ${e.description}</p>
                <p><strong>\u0627\u0644\u062E\u0637\u0648\u0631\u0629:</strong> ${e.severity}</p>
                <p><strong>\u0627\u0644\u062A\u0627\u0631\u064A\u062E:</strong> ${Utils.formatDate(e.date)}</p>
            `;Utils.safeLog("\u{1F4E7} \u0625\u0631\u0633\u0627\u0644 \u0625\u064A\u0645\u064A\u0644 \u0644\u0644\u062A\u0646\u0628\u064A\u0647:",{to:t,subject:a,body:s}),Notification.success(`\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0625\u0644\u0649 ${t.length} \u0625\u064A\u0645\u064A\u0644`,{title:"\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A",description:`\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0625\u0644\u0649 ${t.length} \u0639\u0646\u0648\u0627\u0646 \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A`})}catch(a){Utils.safeError(" \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0645\u064A\u0644:",a),Notification.warning("\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0644\u0643\u0646 \u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0645\u064A\u0644",{title:"\u062A\u062D\u0630\u064A\u0631",description:"\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0646\u062C\u0627\u062D \u0648\u0644\u0643\u0646 \u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0625\u064A\u0645\u064A\u0644\u0627\u062A"})}},async handlePlanSubmit(e,t){const a=document.getElementById("plan-name"),s=document.getElementById("plan-type"),i=document.getElementById("plan-description");if(!a||!s||!i){Notification.error("\u0628\u0639\u0636 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u064A\u0631\u062C\u0649 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.");return}const n={id:e||Utils.generateId("PLAN"),name:a.value.trim(),type:s.value,description:i.value.trim(),createdAt:e?AppState.appData.emergencyPlans.find(o=>o.id===e)?.createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};Loading.show();try{if(e){const o=AppState.appData.emergencyPlans.findIndex(r=>r.id===e);o!==-1&&(AppState.appData.emergencyPlans[o]=n),Notification.success("\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0637\u0629 \u0628\u0646\u062C\u0627\u062D",{title:"\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0637\u0629",description:`\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062E\u0637\u0629 "${n.name}" \u0628\u0646\u062C\u0627\u062D`})}else AppState.appData.emergencyPlans.push(n),Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062E\u0637\u0629 \u0628\u0646\u062C\u0627\u062D",{title:"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062E\u0637\u0629",description:`\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062E\u0637\u0629 "${n.name}" \u0628\u0646\u062C\u0627\u062D`});typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A"),await GoogleIntegration.autoSave("EmergencyPlans",AppState.appData.emergencyPlans),Loading.hide(),t.remove(),this.load()}catch(o){Loading.hide(),Notification.error("\u062D\u062F\u062B \u062E\u0637\u0623: "+o.message,{title:"\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0629",description:o.message||"\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639"})}},async acknowledgeAlert(e){const t=Array.isArray(AppState.appData.emergencyAlerts)?[...AppState.appData.emergencyAlerts]:[],a=t.findIndex(i=>i.id===e);if(a===-1){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F",{title:"\u062E\u0637\u0623",description:"\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"});return}const s=this.ensureAlertStructure({...t[a]});if(s.acknowledgedAt){Notification.info("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0647\u0630\u0627 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0645\u0633\u0628\u0642\u0627\u064B",{title:"\u062A\u0646\u0628\u064A\u0647 \u0645\u0639\u062A\u0645\u062F",description:"\u0647\u0630\u0627 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F\u0647 \u0645\u0633\u0628\u0642\u0627\u064B"});return}s.acknowledgedAt=new Date().toISOString(),s.acknowledgedBy=this.getCurrentUserSummary(),s.status==="\u0646\u0634\u0637"&&(s.status="\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629"),s.timeline=s.timeline||[],s.timeline.push(this.buildTimelineEntry("acknowledged",s,"\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0645\u0646 \u0642\u0628\u0644 \u0641\u0631\u064A\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629")),s.updatedAt=new Date().toISOString(),t[a]=s,AppState.appData.emergencyAlerts=t,Notification.success("\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647",{title:"\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647",description:`\u062A\u0645 \u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647 "${s.title}" \u0628\u0646\u062C\u0627\u062D`,actions:[{label:"\u0639\u0631\u0636 \u0627\u0644\u062A\u0646\u0628\u064A\u0647",primary:!1,onClick:()=>{this.viewAlert(s.id)}}]}),typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("EmergencyAlerts",AppState.appData.emergencyAlerts)}catch(i){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0639\u062F \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F:",i)}this.renderAll()},async resolveAlert(e){const t=Array.isArray(AppState.appData.emergencyAlerts)?[...AppState.appData.emergencyAlerts]:[],a=t.findIndex(i=>i.id===e);if(a===-1){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F",{title:"\u062E\u0637\u0623",description:"\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"});return}const s=this.ensureAlertStructure({...t[a]});if(s.status==="\u0645\u063A\u0644\u0642"){Notification.info("\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0645\u063A\u0644\u0642 \u0628\u0627\u0644\u0641\u0639\u0644");return}s.status="\u0645\u063A\u0644\u0642",s.resolvedAt=new Date().toISOString(),s.resolvedBy=this.getCurrentUserSummary(),s.timeline=s.timeline||[],s.timeline.push(this.buildTimelineEntry("resolved",s,"\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0632\u0648\u0627\u0644 \u0627\u0644\u062D\u0627\u0644\u0629")),s.updatedAt=new Date().toISOString(),t[a]=s,AppState.appData.emergencyAlerts=t,typeof window.DataManager<"u"&&window.DataManager.save?window.DataManager.save():Utils.safeWarn("\u26A0\uFE0F DataManager \u063A\u064A\u0631 \u0645\u062A\u0627\u062D - \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A");try{await GoogleIntegration.autoSave("EmergencyAlerts",AppState.appData.emergencyAlerts)}catch(i){Utils.safeWarn("\u26A0 \u0641\u0634\u0644 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0628\u0639\u062F \u0627\u0644\u0625\u063A\u0644\u0627\u0642:",i)}Notification.success("\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647",{title:"\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647",description:`\u062A\u0645 \u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 "${s.title}" \u0628\u0646\u062C\u0627\u062D`,actions:[{label:"\u0639\u0631\u0636 \u0627\u0644\u062A\u0646\u0628\u064A\u0647",primary:!1,onClick:()=>{this.viewAlert(s.id)}}]}),this.renderAll()},async viewAlert(e){const t=this.getAlerts().find(u=>u.id===e);if(!t){Notification.error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F",{title:"\u062E\u0637\u0623",description:"\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u0627\u0644\u0645\u062D\u062F\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"});return}const a=this.ensureAlertStructure(t);if(!a){Notification.error("\u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D",{title:"\u062E\u0637\u0623",description:"\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u0646\u0628\u064A\u0647 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629"});return}const s=document.createElement("div");s.className="modal-overlay",s.style.zIndex="10000";const i={\u0639\u0627\u0644\u064A\u0629:"text-red-600 bg-red-50 border-red-200",\u0645\u062A\u0648\u0633\u0637\u0629:"text-yellow-600 bg-yellow-50 border-yellow-200",\u0645\u0646\u062E\u0641\u0636\u0629:"text-blue-600 bg-blue-50 border-blue-200"},n={\u0646\u0634\u0637:"bg-red-100 text-red-800","\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629":"bg-yellow-100 text-yellow-800",\u0645\u063A\u0644\u0642:"bg-green-100 text-green-800"},o=i[a.severity]||i.\u0645\u062A\u0648\u0633\u0637\u0629,r=n[a.status]||n.\u0646\u0634\u0637,d=new Date(a.createdAt||a.date||new Date),l=a.updatedAt?new Date(a.updatedAt):null,m=a.acknowledgedAt?new Date(a.acknowledgedAt):null,c=a.resolvedAt?new Date(a.resolvedAt):null;s.innerHTML=`
            <div class="modal-content" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header" style="border-bottom: 2px solid var(--border-color);">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-3">
                            <div class="p-3 rounded-lg ${o}">
                                <i class="fas fa-exclamation-triangle text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="modal-title" style="margin: 0;">${Utils.escapeHTML(a.title||"\u062A\u0646\u0628\u064A\u0647")}</h2>
                                <p class="text-sm text-gray-500 mt-1">
                                    ${a.requiresEvacuation?'<span class="badge badge-danger">\u0625\u062E\u0644\u0627\u0621 \u0645\u0637\u0644\u0648\u0628</span>':""}
                                    ${a.isEscalated?'<span class="badge badge-danger ml-2"><i class="fas fa-arrow-up ml-1"></i>\u0645\u062A\u0635\u0627\u0639\u062F</span>':""}
                                </p>
                            </div>
                        </div>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body" style="padding: 1.5rem;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">\u0627\u0644\u062E\u0637\u0648\u0631\u0629</label>
                            <span class="badge ${a.severity==="\u0639\u0627\u0644\u064A\u0629"?"badge-danger":a.severity==="\u0645\u062A\u0648\u0633\u0637\u0629"?"badge-warning":"badge-info"} text-lg px-3 py-1">
                                ${Utils.escapeHTML(a.severity||"\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")}
                            </span>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">\u0627\u0644\u062D\u0627\u0644\u0629</label>
                            <span class="badge ${r} text-lg px-3 py-1">
                                ${Utils.escapeHTML(a.status||"\u0646\u0634\u0637")}
                            </span>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621</label>
                            <p class="text-gray-800 font-medium">${Utils.formatDateTime(a.createdAt||a.date)}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <label class="text-xs font-semibold text-gray-600 mb-1 block">\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B</label>
                            <p class="text-gray-800 font-medium">${l?Utils.formatDateTime(l):"\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062A\u062D\u062F\u064A\u062B"}</p>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-align-right ml-2"></i>\u0627\u0644\u0648\u0635\u0641 \u0627\u0644\u062A\u0641\u0635\u064A\u0644\u064A
                        </label>
                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">${Utils.escapeHTML(a.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641")}</p>
                        </div>
                    </div>
                    
                    ${a.impactArea?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-map-marker-alt ml-2"></i>\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0645\u062A\u0623\u062B\u0631\u0629
                            </label>
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p class="text-blue-800">${Utils.escapeHTML(a.impactArea)}</p>
                            </div>
                        </div>
                    `:""}
                    
                    ${(a.channels||[]).length>0?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-broadcast-tower ml-2"></i>\u0642\u0646\u0648\u0627\u062A \u0627\u0644\u0625\u0631\u0633\u0627\u0644
                            </label>
                            <div class="flex flex-wrap gap-2">
                                ${a.channels.map(u=>`
                                    <span class="badge badge-secondary">${Utils.escapeHTML(u)}</span>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    ${(a.assignedTeams||[]).length>0?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-users ml-2"></i>\u0641\u0631\u0642 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629
                            </label>
                            <div class="flex flex-wrap gap-2">
                                ${a.assignedTeams.map(u=>`
                                    <span class="badge badge-info">${Utils.escapeHTML(u)}</span>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    ${a.responseInstructions?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-clipboard-list ml-2"></i>\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629
                            </label>
                            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <p class="text-yellow-800 leading-relaxed whitespace-pre-wrap">${Utils.escapeHTML(a.responseInstructions)}</p>
                            </div>
                        </div>
                    `:""}
                    
                    <div class="mb-6">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                            <i class="fas fa-user ml-2"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u0646\u0634\u0627\u0621
                        </label>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-gray-800">
                                <strong>\u0623\u064F\u0637\u0644\u0642 \u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(a.createdBy?.name||"\u0627\u0644\u0646\u0638\u0627\u0645")}
                                ${a.createdBy?.email?`<br><strong>\u0627\u0644\u0628\u0631\u064A\u062F:</strong> ${Utils.escapeHTML(a.createdBy.email)}`:""}
                                ${a.createdBy?.role?`<br><strong>\u0627\u0644\u062F\u0648\u0631:</strong> ${Utils.escapeHTML(a.createdBy.role)}`:""}
                            </p>
                        </div>
                    </div>
                    
                    ${m?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-check-circle ml-2"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F
                            </label>
                            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p class="text-green-800">
                                    <strong>\u062A\u0645 \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0641\u064A:</strong> ${Utils.formatDateTime(m)}
                                    ${a.acknowledgedBy?.name?`<br><strong>\u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(a.acknowledgedBy.name)}`:""}
                                </p>
                            </div>
                        </div>
                    `:""}
                    
                    ${c?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-flag-checkered ml-2"></i>\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0625\u063A\u0644\u0627\u0642
                            </label>
                            <div class="bg-teal-50 p-4 rounded-lg border border-teal-200">
                                <p class="text-teal-800">
                                    <strong>\u062A\u0645 \u0627\u0644\u0625\u063A\u0644\u0627\u0642 \u0641\u064A:</strong> ${Utils.formatDateTime(c)}
                                    ${a.resolvedBy?.name?`<br><strong>\u0628\u0648\u0627\u0633\u0637\u0629:</strong> ${Utils.escapeHTML(a.resolvedBy.name)}`:""}
                                </p>
                            </div>
                        </div>
                    `:""}
                    
                    ${(a.timeline||[]).length>0?`
                        <div class="mb-6">
                            <label class="block text-sm font-semibold text-gray-700 mb-3">
                                <i class="fas fa-history ml-2"></i>\u0633\u062C\u0644 \u0627\u0644\u0623\u0646\u0634\u0637\u0629
                            </label>
                            <div class="space-y-3">
                                ${a.timeline.map(u=>`
                                    <div class="border-l-4 pl-4 ${this.getTimelineColor(u.type)}">
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="font-semibold text-gray-800">${Utils.escapeHTML(u.label||u.type||"\u062A\u062D\u062F\u064A\u062B")}</span>
                                            <span class="text-xs text-gray-500">${Utils.formatDateTime(u.timestamp)}</span>
                                        </div>
                                        ${u.description?`<p class="text-sm text-gray-600">${Utils.escapeHTML(u.description)}</p>`:""}
                                        ${u.actor?.name?`<p class="text-xs text-gray-500 mt-1"><i class="fas fa-user ml-1"></i>${Utils.escapeHTML(u.actor.name)}</p>`:""}
                                    </div>
                                `).join("")}
                            </div>
                        </div>
                    `:""}
                    
                    <div class="flex items-center justify-end gap-3 pt-4 border-t">
                        ${a.acknowledgedAt?"":`
                            <button class="btn-secondary" onclick="Emergency.acknowledgeAlert('${a.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-check ml-2"></i>\u0627\u0639\u062A\u0645\u0627\u062F \u0627\u0644\u062A\u0646\u0628\u064A\u0647
                            </button>
                        `}
                        ${a.status!=="\u0645\u063A\u0644\u0642"?`
                            <button class="btn-primary" onclick="Emergency.resolveAlert('${a.id}'); this.closest('.modal-overlay').remove();">
                                <i class="fas fa-flag-checkered ml-2"></i>\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647
                            </button>
                        `:""}
                        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times ml-2"></i>\u0625\u063A\u0644\u0627\u0642
                        </button>
                    </div>
                </div>
            </div>
        `,document.body.appendChild(s),s.addEventListener("click",u=>{u.target===s&&s.remove()});const g=u=>{u.key==="Escape"&&(s.remove(),document.removeEventListener("keydown",g))};document.addEventListener("keydown",g)},async viewPlan(e){const t=AppState.appData.emergencyPlans.find(a=>a.id===e);t&&Notification.info(`\u0627\u0644\u062E\u0637\u0629: ${t.name}`,{title:"\u062E\u0637\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626",description:t.description||"\u0644\u0627 \u064A\u0648\u062C\u062F \u0648\u0635\u0641"})},cleanup(){try{typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u{1F9F9} \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Emergency module..."),this.clearAutoRefresh(),typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 \u062A\u0645 \u062A\u0646\u0638\u064A\u0641 \u0645\u0648\u0627\u0631\u062F Emergency module")}catch(e){typeof Utils<"u"&&Utils.safeWarn&&Utils.safeWarn("\u26A0\uFE0F \u062E\u0637\u0623 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 Emergency module:",e)}},_fmState:{currentPlanId:null,items:[],adminMode:!1,addingType:null,dragItem:null,floorPlans:[],factoryFilter:"",zoom:1,fullscreen:!1,pendingDeepLink:null,customStampImages:{},planImageCache:{}},_fmStampRadius:24,FM_FRAME_PRESETS:{room:{label:"\u063A\u0631\u0641\u0629",icon:"fa-door-closed",w:220,h:160},hall:{label:"\u0642\u0627\u0639\u0629",icon:"fa-warehouse",w:420,h:260},corridor:{label:"\u0645\u0645\u0631",icon:"fa-arrows-alt-h",w:360,h:70},office:{label:"\u0645\u0643\u062A\u0628",icon:"fa-briefcase",w:180,h:140},door:{label:"\u0628\u0627\u0628",icon:"fa-door-open",w:70,h:24},zone:{label:"\u0645\u0646\u0637\u0642\u0629",icon:"fa-border-all",w:300,h:200}},FM_ITEM_TYPES:{fire_extinguisher:{label:"\u0645\u0637\u0641\u0623\u0629 \u062D\u0631\u064A\u0642",icon:"fa-fire-extinguisher",color:"#ef4444"},fire_hose:{label:"\u062E\u0631\u0637\u0648\u0645 \u062D\u0631\u064A\u0642",icon:"fa-fire",color:"#dc2626"},fire_alarm:{label:"\u0625\u0646\u0630\u0627\u0631 \u062D\u0631\u064A\u0642",icon:"fa-bell",color:"#f97316"},emergency_exit:{label:"\u0645\u062E\u0631\u062C \u0637\u0648\u0627\u0631\u0626",icon:"fa-door-open",color:"#22c55e"},escape_route:{label:"\u0637\u0631\u064A\u0642 \u0647\u0631\u0648\u0628",icon:"fa-arrow-right",color:"#16a34a"},assembly_point:{label:"\u0646\u0642\u0637\u0629 \u062A\u062C\u0645\u0639",icon:"fa-users",color:"#3b82f6"},first_aid:{label:"\u0625\u0633\u0639\u0627\u0641\u0627\u062A \u0623\u0648\u0644\u064A\u0629",icon:"fa-medkit",color:"#ec4899"},hazmat:{label:"\u0645\u0648\u0627\u062F \u062E\u0637\u0631\u0629",icon:"fa-skull-crossbones",color:"#a855f7"},evacuation_chair:{label:"\u0643\u0631\u0633\u064A \u0625\u062E\u0644\u0627\u0621",icon:"fa-wheelchair",color:"#06b6d4"},fire_panel:{label:"\u0644\u0648\u062D\u0629 \u0625\u0637\u0641\u0627\u0621",icon:"fa-server",color:"#64748b"}},initFactoryMapTab(){const e=this._fmState.pendingDeepLink;this._fmEnsureFormSettings().then(()=>(this.refreshSiteDropdowns(),this.loadFloorPlans(e?.planId||this._fmState.currentPlanId||""))).then(()=>{e&&this._fmHandlePendingDeepLink()}),this._bindFactoryMapEvents(),this._renderLegend()},async _fmEnsureFormSettings(){if(typeof Permissions<"u"&&typeof Permissions.ensureFormSettingsState=="function")try{await Permissions.ensureFormSettingsState()}catch{}},getSiteOptions(){try{return typeof Permissions<"u"&&Permissions.formSettingsState?.sites?Permissions.formSettingsState.sites.map(e=>({id:e.id,name:e.name})):Array.isArray(AppState.appData?.observationSites)&&AppState.appData.observationSites.length>0?AppState.appData.observationSites.map(e=>({id:e.id||e.siteId||"",name:e.name||e.title||e.label||"\u0645\u0648\u0642\u0639 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F"})):[]}catch{return[]}},getPlaceOptions(e){try{if(!e)return[];const t=String(e);if(typeof Permissions<"u"&&Permissions.formSettingsState?.sites){const a=Permissions.formSettingsState.sites.find(s=>String(s.id)===t);if(a&&Array.isArray(a.places))return a.places.map(s=>({id:s.id,name:s.name}))}if(Array.isArray(AppState.appData?.observationSites)){const a=AppState.appData.observationSites.find(s=>String(s.id||s.siteId)===t);if(a)return(Array.isArray(a.places)?a.places:Array.isArray(a.locations)?a.locations:Array.isArray(a.children)?a.children:Array.isArray(a.areas)?a.areas:[]).map((i,n)=>({id:i.id||i.placeId||i.value||`PLACE_${n}`,name:i.name||i.placeName||i.title||i.label||i.locationName||`\u0645\u0643\u0627\u0646 ${n+1}`}))}return[]}catch{return[]}},_fmPlanMatchesFactory(e,t){if(!t)return!0;const a=String(t).trim();if(!a)return!0;const s=String(e?.factoryId||e?.factory||"").trim(),i=String(e?.factoryName||"").trim();if(s===a||i===a)return!0;const o=this.getSiteOptions().find(r=>String(r.id)===a);if(o){const r=String(o.name||"").trim();if(r&&(i===r||s===r))return!0}return!1},_fmNormalizeFloorPlan(e){if(!e||typeof e!="object")return e;const t={...e},a=this.getSiteOptions(),s=String(t.factory||"").trim(),i=String(t.factoryId||"").trim(),n=String(t.factoryName||"").trim();if(!i&&s){const o=a.find(d=>String(d.id)===s),r=a.find(d=>String(d.name)===s);o?(t.factoryId=o.id,t.factory=o.id,n||(t.factoryName=o.name)):r&&(t.factoryId=r.id,t.factory=r.id,t.factoryName=r.name)}else if(i){if(t.factoryId=i,(!s||s===n)&&(t.factory=i),!n){const o=a.find(r=>String(r.id)===i);o&&(t.factoryName=o.name)}}else if(n){const o=a.find(r=>String(r.name)===n);o&&(t.factoryId=o.id,t.factory=o.id)}return t.imageDriveId&&(t.imageDriveId=String(t.imageDriveId).trim()),t},_fmInvalidateFloorPlansCache(){try{typeof GoogleIntegration<"u"&&(typeof GoogleIntegration.clearCache=="function"&&GoogleIntegration.clearCache("getAllEmergencyFloorPlans"),typeof GoogleIntegration.invalidateReadFromSheetCacheForSheets=="function"&&GoogleIntegration.invalidateReadFromSheetCacheForSheets("EmergencyFloorPlans")),localStorage.removeItem("hse_local_getAllEmergencyFloorPlans"),this._fmState.planImageCache={}}catch{}},_fmBuildSubLocationOptionsHtml(e,t,a){const s=this.getPlaceOptions(e),i=r=>typeof Utils<"u"&&Utils.escapeAttr?Utils.escapeAttr(r):String(r??""),n=r=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(r):String(r??""),o=t||s.find(r=>r.name===a)?.id||"";return s.length?'<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0637\u0627\u0628\u0642 / \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A \u2014</option>'+s.map(r=>`<option value="${i(r.id)}" data-name="${i(r.name)}" ${String(r.id)===String(o)?"selected":""}>${n(r.name)}</option>`).join(""):'<option value="">\u2014 \u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0648\u0627\u0642\u0639 \u0641\u0631\u0639\u064A\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0635\u0646\u0639 \u2014</option>'},_fmRefreshSubLocationDropdown(e,t,a){const s=document.getElementById("fm-floor-level");s&&(s.innerHTML=this._fmBuildSubLocationOptionsHtml(e,t,a))},_fmBindFactoryCascade(e,t){const a=document.getElementById("fm-floor-factory");if(!a||a.dataset.fmCascadeBound)return;const s=()=>{this._fmRefreshSubLocationDropdown(a.value,e,t)};a.addEventListener("change",()=>{e="",t="",this._fmRefreshSubLocationDropdown(a.value,"","")}),a.dataset.fmCascadeBound="1",s()},refreshSiteDropdowns(){try{const e=this.getSiteOptions(),t=r=>typeof Utils<"u"&&Utils.escapeAttr?Utils.escapeAttr(r):String(r??""),a=r=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(r):String(r??""),s='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 \u2014</option>'+e.map(r=>`<option value="${t(r.id)}" data-name="${t(r.name)}">${a(r.name)}</option>`).join(""),i='<option value="">\u0643\u0644 \u0627\u0644\u0645\u0635\u0627\u0646\u0639</option>'+e.map(r=>`<option value="${t(r.id)}">${a(r.name)}</option>`).join(""),n=document.getElementById("fm-floor-factory");if(n){const r=n.value;n.innerHTML=s,r&&(n.value=r)}const o=document.getElementById("fm-factory-filter");if(o){const r=o.value||this._fmState.factoryFilter||"";o.innerHTML=i,r&&(o.value=r)}}catch{}},_fmBuildFactorySelectHtml(e,t){const a=this.getSiteOptions(),s=e||a.find(o=>o.name===t)?.id||"",i=o=>typeof Utils<"u"&&Utils.escapeAttr?Utils.escapeAttr(o):String(o??""),n=o=>typeof Utils<"u"&&Utils.escapeHTML?Utils.escapeHTML(o):String(o??"");return'<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0635\u0646\u0639 \u2014</option>'+a.map(o=>`<option value="${i(o.id)}" data-name="${i(o.name)}" ${String(o.id)===String(s)?"selected":""}>${n(o.name)}</option>`).join("")},_fmBuildFrameToolbarHtml(){return Object.entries(this.FM_FRAME_PRESETS).map(([e,t])=>`
            <button type="button" class="fm-frame-btn" data-frame="${e}" title="\u0625\u062F\u0631\u0627\u062C \u0625\u0637\u0627\u0631: ${Utils.escapeHTML(t.label)}">
                <i class="fas ${Utils.escapeAttr(t.icon)}"></i>
                <span>${Utils.escapeHTML(t.label)}</span>
            </button>
        `).join("")},_fmInsertFramePreset(e){const t=this.FM_FRAME_PRESETS[e],a=document.getElementById("fm-sketch-canvas");if(!t||!a)return;this._fmInitCanvasLayers(a);const s=document.getElementById("fm-draw-color")?.value||"#1e293b",i=parseInt(document.getElementById("fm-draw-width")?.value,10)||4,n=t.w,o=t.h;let r=Math.round((a.width-n)/2),d=Math.round((a.height-o)/2);const l=this._fmFindFreePosition(a,"frame",-1,r,d,n,o);r=l.x,d=l.y,a._fmFrames.push({id:"fr_"+Date.now(),presetKey:e,x:r,y:d,w:n,h:o,color:s,width:i}),a._fmSelected={kind:"frame",index:a._fmFrames.length-1},this._fmRedrawSketchCanvas(a),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u062F\u0631\u0627\u062C \u0625\u0637\u0627\u0631 "+t.label+" \u2014 \u0627\u0633\u062D\u0628\u0647 \u0644\u0644\u0646\u0642\u0644")},_fmBindFrameToolbar(){const e=document.getElementById("fm-frame-toolbar");!e||e.dataset.fmBound||(e.addEventListener("click",t=>{const a=t.target.closest(".fm-frame-btn");a&&this._fmInsertFramePreset(a.dataset.frame)}),e.dataset.fmBound="1")},_fmParseListResponse(e){return Array.isArray(e)?e:!e||typeof e!="object"?[]:Array.isArray(e.data)?e.data:e.data&&Array.isArray(e.data.data)?e.data.data:e.success!==!1&&e.data&&Array.isArray(e.data)?e.data:[]},_fmUpdatePlanMeta(){const e=document.getElementById("fm-plan-meta"),t=document.getElementById("fm-items-count"),a=this._fmState.floorPlans.find(s=>String(s.id)===String(this._fmState.currentPlanId||""));if(e){const s=a?.subLocationName||a?.floor||"";e.textContent=a?`${a.name||"\u0645\u062E\u0637\u0637"}${a.factoryName?" \xB7 "+a.factoryName:""}${s?" \u2014 "+s:""}`:"\u0627\u062E\u062A\u0631 \u0645\u062E\u0637\u0637\u0627\u064B \u0644\u0639\u0631\u0636 \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629"}if(t){const s=this._fmState.items.length;t.innerHTML=`<i class="fas fa-map-pin"></i> ${s} \u0639\u0646\u0635\u0631`}},_fmApplyZoom(){const e=document.getElementById("fm-viewport-inner"),t=document.getElementById("fm-zoom-label"),a=this._fmState.zoom||1;e&&(e.style.transform=`scale(${a})`,e.style.transformOrigin="top center"),t&&(t.textContent=Math.round(a*100)+"%")},_fmSetZoom(e){this._fmState.zoom=Math.max(.35,Math.min(2.5,e)),this._fmApplyZoom()},_fmResetZoom(){this._fmState.zoom=1,this._fmApplyZoom();const e=document.getElementById("fm-viewport");e&&(e.scrollTop=0)},toggleFactoryMapFullscreen(){const e=document.getElementById("fm-shell"),t=document.getElementById("fm-fullscreen-btn");if(!e)return;const a=!this._fmState.fullscreen;this._fmState.fullscreen=a,e.classList.toggle("fm-fullscreen-active",a),document.body.classList.toggle("fm-body-fullscreen",a),t&&(t.innerHTML=a?'<i class="fas fa-compress"></i><span>\u062E\u0631\u0648\u062C</span>':'<i class="fas fa-expand"></i><span>\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span>',t.title=a?"\u0627\u0644\u062E\u0631\u0648\u062C \u0645\u0646 \u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629":"\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629"),a&&e.requestFullscreen?e.requestFullscreen().catch(()=>{}):!a&&document.fullscreenElement&&document.exitFullscreen&&document.exitFullscreen().catch(()=>{})},_fmOnFullscreenChange(){const e=document.getElementById("fm-shell");if(!!!(document.fullscreenElement&&e&&document.fullscreenElement===e)&&this._fmState.fullscreen){this._fmState.fullscreen=!1,e?.classList.remove("fm-fullscreen-active"),document.body.classList.remove("fm-body-fullscreen");const a=document.getElementById("fm-fullscreen-btn");a&&(a.innerHTML='<i class="fas fa-expand"></i><span>\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629</span>',a.title="\u0645\u0644\u0621 \u0627\u0644\u0634\u0627\u0634\u0629")}},_fmCompressCanvasDataUrl(e,t,a){if(!e)return"";const s=t||1400;let i=e.width,n=e.height;i>s&&(n=Math.round(n*(s/i)),i=s);const o=document.createElement("canvas");o.width=i,o.height=n;const r=o.getContext("2d");return r.fillStyle="#ffffff",r.fillRect(0,0,i,n),r.drawImage(e,0,0,i,n),o.toDataURL("image/jpeg",a||.85)},_bindFactoryMapEvents(){const e=document.getElementById("fm-floor-select"),t=document.getElementById("fm-admin-toggle"),a=document.getElementById("fm-admin-close"),s=document.getElementById("fm-add-floor-btn");e&&!e.dataset.fmBound&&(e.addEventListener("change",()=>{const u=e.value,y=document.getElementById("fm-edit-floor-btn"),b=document.getElementById("fm-delete-floor-btn"),v=document.getElementById("fm-viewport-bar"),S=document.getElementById("fm-legend-sidebar");u?(this.loadMapItems(u),y&&y.classList.remove("hidden"),b&&b.classList.remove("hidden"),v&&v.classList.remove("hidden"),S&&S.classList.remove("hidden")):(document.getElementById("fm-map-placeholder")?.classList.remove("hidden"),document.getElementById("fm-map-wrapper")?.classList.add("hidden"),y&&y.classList.add("hidden"),b&&b.classList.add("hidden"),v&&v.classList.add("hidden"),S&&S.classList.add("hidden"),this._fmState.currentPlanId=null,this._fmState.items=[],this._fmUpdatePlanMeta())}),e.dataset.fmBound="1");const i=document.getElementById("fm-zoom-in"),n=document.getElementById("fm-zoom-out"),o=document.getElementById("fm-zoom-reset"),r=document.getElementById("fm-fullscreen-btn");i&&!i.dataset.fmBound&&(i.addEventListener("click",()=>this._fmSetZoom((this._fmState.zoom||1)+.15)),i.dataset.fmBound="1"),n&&!n.dataset.fmBound&&(n.addEventListener("click",()=>this._fmSetZoom((this._fmState.zoom||1)-.15)),n.dataset.fmBound="1"),o&&!o.dataset.fmBound&&(o.addEventListener("click",()=>this._fmResetZoom()),o.dataset.fmBound="1"),r&&!r.dataset.fmBound&&(r.addEventListener("click",()=>this.toggleFactoryMapFullscreen()),r.dataset.fmBound="1"),document.body.dataset.fmFsBound||(document.addEventListener("fullscreenchange",()=>this._fmOnFullscreenChange()),document.addEventListener("keydown",u=>{if(u.key==="Escape"){if(document.getElementById("fm-floor-modal")){this._closeFloorPlanModal();return}this._fmState.fullscreen&&this.toggleFactoryMapFullscreen()}}),document.body.dataset.fmFsBound="1"),t&&!t.dataset.fmBound&&(t.addEventListener("click",()=>this.toggleAdminMode()),t.dataset.fmBound="1"),a&&!a.dataset.fmBound&&(a.addEventListener("click",()=>{this._fmState.adminMode&&this.toggleAdminMode()}),a.dataset.fmBound="1"),s&&!s.dataset.fmBound&&(s.addEventListener("click",()=>this.showFloorPlanForm()),s.dataset.fmBound="1");const d=document.getElementById("fm-factory-filter");d&&!d.dataset.fmBound&&(d.addEventListener("change",()=>{this._fmState.factoryFilter=d.value||"",this.loadFloorPlans(this._fmState.currentPlanId||"")}),d.dataset.fmBound="1");const l=document.getElementById("fm-export-png-btn");l&&!l.dataset.fmBound&&(l.addEventListener("click",()=>this._fmExportCurrentMapPng()),l.dataset.fmBound="1");const m=document.getElementById("fm-qr-btn");m&&!m.dataset.fmBound&&(m.addEventListener("click",()=>this._fmShowMapQrPanel()),m.dataset.fmBound="1");const c=document.getElementById("fm-edit-floor-btn");c&&!c.dataset.fmBound&&(c.addEventListener("click",()=>{const u=e?.value;u&&this.showFloorPlanForm(u)}),c.dataset.fmBound="1");const g=document.getElementById("fm-delete-floor-btn");g&&!g.dataset.fmBound&&(g.addEventListener("click",()=>{const u=e?.value;u&&this.deleteFloorPlan(u)}),g.dataset.fmBound="1"),document.querySelectorAll(".fm-add-item-btn").forEach(u=>{u.dataset.fmBound||(u.addEventListener("click",()=>{const y=u.dataset.type;this._fmState.addingType===y?(this._fmState.addingType=null,document.querySelectorAll(".fm-add-item-btn").forEach(b=>b.classList.remove("active"))):(this._fmState.addingType=y,document.querySelectorAll(".fm-add-item-btn").forEach(b=>b.classList.remove("active")),u.classList.add("active"))}),u.dataset.fmBound="1")})},async loadFloorPlans(e,t){const a=document.getElementById("fm-floor-select");if(!a)return[];if(typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest)return[];try{this._fmInvalidateFloorPlansCache();const s=await GoogleIntegration.sendRequest({action:"getAllEmergencyFloorPlans",data:{skipCache:!0}}),i=this._fmParseListResponse(s).map(l=>this._fmNormalizeFloorPlan(l)).filter(l=>l&&String(l.isActive||"true")!=="false").sort((l,m)=>(parseInt(l.sortOrder,10)||0)-(parseInt(m.sortOrder,10)||0));this._fmState.floorPlans=i;const n=String(e||this._fmState.currentPlanId||""),o=n?i.find(l=>String(l.id)===n):null;if(o&&t?.syncFactoryFilter!==!1){const l=o.factoryId||o.factory||"";if(l){this._fmState.factoryFilter=String(l);const m=document.getElementById("fm-factory-filter");m&&(m.value=String(l))}}const r=document.getElementById("fm-factory-filter")?.value||this._fmState.factoryFilter||"";let d=r?i.filter(l=>this._fmPlanMatchesFactory(l,r)):i.slice();if(r&&d.length===0&&i.length>0){const l=document.getElementById("fm-factory-filter");l&&(l.value=""),this._fmState.factoryFilter="",d=i.slice(),typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0623\u062E\u0641\u062A \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u2014 \u062A\u0645 \u0639\u0631\u0636 \u0643\u0644 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629")}return o&&!d.some(l=>String(l.id)===n)&&(d=[o,...d]),a.innerHTML='<option value="">\u2014 \u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062E\u0637\u0637 \u2014</option>'+d.map(l=>{const m=l.factoryName||l.factory||"",c=l.subLocationName||l.floor||"";return`<option value="${Utils.escapeAttr(l.id)}">${Utils.escapeHTML(l.name||"\u0645\u062E\u0637\u0637")}${m?" \xB7 "+Utils.escapeHTML(m):""}${c?" \u2014 "+Utils.escapeHTML(c):""}</option>`}).join(""),n&&i.some(l=>String(l.id)===n)&&(a.value=n,this._fmState.currentPlanId=n,this.loadMapItems(n),document.getElementById("fm-edit-floor-btn")?.classList.remove("hidden"),document.getElementById("fm-delete-floor-btn")?.classList.remove("hidden"),document.getElementById("fm-viewport-bar")?.classList.remove("hidden"),document.getElementById("fm-legend-sidebar")?.classList.remove("hidden")),i}catch{return typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0645\u062E\u0637\u0637\u0627\u062A \u0627\u0644\u0637\u0648\u0627\u0631\u0626"),this._fmState.floorPlans||[]}},_closeFloorPlanModal(){const e=document.getElementById("fm-floor-modal");e&&e.remove(),document.body.classList.remove("fm-floor-modal-open")},_fmBuildStampToolbarHtml(){const e=Object.entries(this.FM_ITEM_TYPES).map(([a,s])=>`
            <button type="button" class="fm-stamp-btn" data-stamp="${a}" title="${Utils.escapeHTML(s.label)}" style="--stamp-color:${s.color};">
                <i class="fas ${Utils.escapeAttr(s.icon)}"></i>
                <span>${Utils.escapeHTML(s.label)}</span>
            </button>
        `).join(""),t=Object.entries(this._fmState.customStampImages||{}).map(([a,s])=>`
            <button type="button" class="fm-stamp-btn fm-stamp-btn-custom" data-stamp="${Utils.escapeAttr(a)}" title="\u0623\u064A\u0642\u0648\u0646\u0629 \u0645\u0633\u062A\u0648\u0631\u062F\u0629" style="--stamp-color:#0ea5e9;">
                <img src="${Utils.escapeAttr(s)}" alt="" class="fm-stamp-thumb">
                <span>\u0645\u062E\u0635\u0635</span>
            </button>
        `).join("");return e+t},_fmGenerateQrToken(){return"QR-"+Date.now().toString(36)+Math.random().toString(36).slice(2,10)},_fmGetGasScriptUrl(){let e=String(AppState?.googleConfig?.appsScript?.scriptUrl||"").trim();return e?(e.indexOf("script.google.com/macros/s/")!==-1&&(e=e.replace(/\/dev(\?|#|$)/,"/exec$1")),e):""},_fmBuildMapQrUrl(e){if(!e||!e.id)return"";const t=this._fmGetGasScriptUrl(),a=e.qrToken||"";if(t){const i=t.includes("?")?"&":"?";return`${t}${i}action=publicEmergencyMap&planId=${encodeURIComponent(e.id)}&token=${encodeURIComponent(a)}`}const s=new URL(window.location.origin+window.location.pathname);return s.searchParams.set("section","emergency"),s.searchParams.set("factoryMap",e.id),a&&s.searchParams.set("qr",a),s.hash="emergency",s.toString()},_fmCheckQrEntry(){try{const e=new URLSearchParams(window.location.search),t=e.get("factoryMap");if(!t||e.get("section")!=="emergency")return;this._fmState.pendingDeepLink={planId:t,qr:e.get("qr")||""},typeof UI<"u"&&UI.showSection&&setTimeout(()=>{UI.showSection("emergency");const a=document.querySelector('#emergency-section .tab-btn[data-tab="factory-map"]');a&&a.click()},400)}catch{}},_fmHandlePendingDeepLink(){const e=this._fmState.pendingDeepLink;if(!e?.planId)return;const t=this._fmState.floorPlans.find(s=>String(s.id)===String(e.planId));if(!t){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0627\u0644\u0645\u062E\u0637\u0637 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0639\u0628\u0631 QR \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F"),this._fmState.pendingDeepLink=null;return}if(e.qr&&t.qrToken&&e.qr!==t.qrToken){typeof Notification<"u"&&Notification.error&&Notification.error("\u0631\u0645\u0632 QR \u063A\u064A\u0631 \u0635\u0627\u0644\u062D \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u062E\u0637\u0637"),this._fmState.pendingDeepLink=null;return}const a=document.getElementById("fm-floor-select");a&&(a.value=t.id,a.dispatchEvent(new Event("change"))),typeof Notification<"u"&&Notification.info&&Notification.info("\u062A\u0645 \u0641\u062A\u062D \u0645\u062E\u0637\u0637 \u0627\u0644\u0637\u0648\u0627\u0631\u0626: "+(t.name||t.id)),this._fmState.pendingDeepLink=null},_fmInitCanvasLayers(e){e._fmStamps||(e._fmStamps=[]),e._fmFrames||(e._fmFrames=[]),e._fmCustomImages||(e._fmCustomImages={}),e._fmSelected||(e._fmSelected=null)},_fmObjectGap(){return 10},_fmStampHitRadius(){return this._fmStampRadius+6},_fmClampRect(e,t,a,s,i,n){const o=Math.max(0,Math.min(e,i-a)),r=Math.max(0,Math.min(t,n-s));return{x:o,y:r}},_fmRectsOverlap(e,t,a){const s=a||0;return!(e.x+e.w+s<=t.x||t.x+t.w+s<=e.x||e.y+e.h+s<=t.y||t.y+t.h+s<=e.y)},_fmCircleRectOverlap(e,t,a,s,i){const n=i||0,o=Math.max(s.x-n,Math.min(e,s.x+s.w+n)),r=Math.max(s.y-n,Math.min(t,s.y+s.h+n)),d=e-o,l=t-r;return d*d+l*l<=(a+n)*(a+n)},_fmGetFrameRect(e){return{x:e.x,y:e.y,w:e.w,h:e.h}},_fmWouldOverlap(e,t,a,s,i,n,o){const r=this._fmObjectGap(),d=e._fmStamps||[],l=e._fmFrames||[],m=this._fmStampHitRadius(),c=n>0&&o>0?{x:s,y:i,w:n,h:o}:null,g=c?null:{cx:s,cy:i,r:m};for(let u=0;u<l.length;u++){if(t==="frame"&&u===a)continue;const y=this._fmGetFrameRect(l[u]);if(c){if(this._fmRectsOverlap(c,y,r))return!0}else if(this._fmCircleRectOverlap(g.cx,g.cy,g.r,y,r))return!0}for(let u=0;u<d.length;u++){if(t==="stamp"&&u===a)continue;const y=d[u];if(c){if(this._fmCircleRectOverlap(y.x,y.y,m,c,r))return!0}else{const b=s-y.x,v=i-y.y;if(b*b+v*v<=(m*2+r)*(m*2+r))return!0}}return!1},_fmFindFreePosition(e,t,a,s,i,n,o){const r=this._fmObjectGap(),d=e.width,l=e.height,m=n||0,c=o||0,g=(y,b)=>{if(m&&c){const v=this._fmClampRect(y,b,m,c,d,l);return{x:v.x,y:v.y}}return{x:Math.max(r,Math.min(y,d-r)),y:Math.max(r,Math.min(b,l-r))}};if(!this._fmWouldOverlap(e,t,a,s,i,m,c))return g(s,i);const u=[0,12,24,36,48,64,80,100,130,160,200];for(let y=1;y<u.length;y++){const b=u[y];for(let v=0;v<16;v++){const S=v/16*Math.PI*2,k=s+Math.cos(S)*b,A=i+Math.sin(S)*b,I=g(k,A);if(!this._fmWouldOverlap(e,t,a,I.x,I.y,m,c))return I}}return g(s,i)},_fmDrawFrameOnCanvas(e,t,a){const i=(this.FM_FRAME_PRESETS[t.presetKey]||{}).label||"";e.save(),e.strokeStyle=t.color||"#1e293b",e.lineWidth=t.width||4,e.strokeRect(t.x,t.y,t.w,t.h),e.fillStyle=(t.color||"#1e293b")+"18",e.fillRect(t.x,t.y,t.w,t.h),i&&(e.font="bold 11px Tahoma, Arial, sans-serif",e.fillStyle=t.color||"#1e293b",e.textAlign="left",e.textBaseline="top",e.fillText(i,t.x+6,t.y+4)),a&&(e.setLineDash([6,4]),e.strokeStyle="#2563eb",e.lineWidth=2,e.strokeRect(t.x-3,t.y-3,t.w+6,t.h+6),e.setLineDash([])),e.restore()},_fmRedrawSketchCanvas(e){const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),e._fmBaseSnapshot&&t.putImageData(e._fmBaseSnapshot,0,0);const a=e._fmSelected;(e._fmFrames||[]).forEach((s,i)=>{this._fmDrawFrameOnCanvas(t,s,a&&a.kind==="frame"&&a.index===i)}),(e._fmStamps||[]).forEach((s,i)=>{this._fmDrawStampOnCanvas(t,s.type,s.x,s.y,s.customImage),a&&a.kind==="stamp"&&a.index===i&&(t.save(),t.beginPath(),t.arc(s.x,s.y,this._fmStampRadius+8,0,Math.PI*2),t.setLineDash([5,4]),t.strokeStyle="#2563eb",t.lineWidth=2,t.stroke(),t.setLineDash([]),t.restore())})},_fmHitTestFrame(e,t,a){const s=e._fmFrames||[];for(let i=s.length-1;i>=0;i--){const n=s[i];if(t>=n.x&&t<=n.x+n.w&&a>=n.y&&a<=n.y+n.h)return i}return-1},_fmHitTestStamp(e,t,a){const s=this._fmStampHitRadius(),i=e._fmStamps||[];for(let n=i.length-1;n>=0;n--){const o=i[n],r=t-o.x,d=a-o.y;if(r*r+d*d<=s*s)return n}return-1},_fmHitTestTopObject(e,t,a){const s=this._fmHitTestFrame(e,t,a);if(s>=0)return{kind:"frame",index:s};const i=this._fmHitTestStamp(e,t,a);return i>=0?{kind:"stamp",index:i}:null},_fmUpdateCanvasCursor(e,t){!e||!t||(t.tool==="move"?e.style.cursor=e._fmDragState?.active?"grabbing":"grab":t.tool==="eraser"?e.style.cursor="cell":t.tool==="stamp"?e.style.cursor="copy":e.style.cursor="crosshair")},_fmEraseBaseAt(e,t,a,s){if(!e._fmBaseSnapshot)return;const i=e._fmBaseSnapshot.data,n=e.width,o=e.height,r=Math.max(s,12),d=r*r,l=Math.max(0,Math.floor(t-r)),m=Math.min(n-1,Math.ceil(t+r)),c=Math.max(0,Math.floor(a-r)),g=Math.min(o-1,Math.ceil(a+r));for(let u=c;u<=g;u++)for(let y=l;y<=m;y++){const b=y-t,v=u-a;if(b*b+v*v>d)continue;const S=(u*n+y)*4;i[S]=255,i[S+1]=255,i[S+2]=255,i[S+3]=0}},_fmSerializeCanvasStamps(e){return JSON.stringify({stamps:(e._fmStamps||[]).map(t=>({type:t.type,x:t.x,y:t.y})),frames:(e._fmFrames||[]).map(t=>({presetKey:t.presetKey,x:t.x,y:t.y,w:t.w,h:t.h,color:t.color,width:t.width}))})},_fmGetExportBranding(){return{companyName:String(AppState?.companySettings?.name||AppState?.companyName||"").trim(),companySecondaryName:String(AppState?.companySettings?.secondaryName||"").trim(),logoUrl:String(AppState?.companyLogo||AppState?.companySettings?.logo||"").trim(),formVersion:String(AppState?.companySettings?.formVersion||"1.0").trim(),formCode:String(AppState?.companySettings?.factoryMapFormCode||"HSE-FM-MAP-01").trim()}},_fmDrawRoundedRect(e,t,a,s,i,n){const o=Math.max(0,Math.min(n,s/2,i/2));e.beginPath(),e.moveTo(t+o,a),e.arcTo(t+s,a,t+s,a+i,o),e.arcTo(t+s,a+i,t,a+i,o),e.arcTo(t,a+i,t,a,o),e.arcTo(t,a,t+s,a,o),e.closePath()},_fmCanvasSetFont(e,t,a,s){e.font=`${a||"normal"} ${t}px Tahoma, 'Segoe UI', Arial, sans-serif`,s&&(e.fillStyle=s)},_fmCanvasFitFontSize(e,t,a,s,i){let n=s;for(;n>8;){if(this._fmCanvasSetFont(e,n,i),e.measureText(t).width<=a)return n;n-=1}return n},_fmCanvasDrawWrappedLines(e,t,a,s,i,n,o,r){const d=String(t||"").split(/\s+/).filter(Boolean),l=[];let m="";d.forEach(g=>{const u=m?`${m} ${g}`:g;e.measureText(u).width>i&&m?(l.push(m),m=g):m=u}),m&&l.push(m);const c=l.slice(0,r||l.length);return l.length>c.length&&(c[c.length-1]=c[c.length-1].slice(0,-1)+"\u2026"),e.textAlign=o||"right",c.forEach((g,u)=>e.fillText(g,a,s+u*n)),c.length},_fmGetExportDocumentMeta(e){const t=this._fmGetExportBranding(),a=new Date,s=e?.subLocationName||e?.floor||"",i=`${e?.name||"\u0645\u062E\u0637\u0637"}${e?.factoryName?" \xB7 "+e.factoryName:""}${s?" \u2014 "+s:""}`;return{...t,planTitle:i,planRef:String(e?.id||"\u2014"),exportDate:a.toLocaleDateString("ar-EG",{year:"numeric",month:"long",day:"numeric"}),exportTime:a.toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"}),exportDateTime:a.toLocaleString("ar-EG",{hour:"2-digit",minute:"2-digit",year:"numeric",month:"long",day:"numeric"})}},async _fmDrawExportHeader(e,t,a,s,i){const n=this._fmGetExportDocumentMeta(s),o=18,r=150,d=250;e.fillStyle="#ffffff",e.fillRect(0,0,t,a),e.fillStyle="#003865",e.fillRect(0,a-3,t,3),e.fillStyle="#dc2626",e.fillRect(0,a-6,t,2);const l=o,m=14,c=r-8,g=a-28;if(e.fillStyle="#f8fafc",this._fmDrawRoundedRect(e,l,m,c,g,12),e.fill(),e.strokeStyle="#dbeafe",e.lineWidth=1.5,e.stroke(),i){const D=c-20,U=g-20,M=Math.min(D/i.width,U/i.height,1),T=i.width*M,F=i.height*M;e.drawImage(i,l+(c-T)/2,m+(g-F)/2,T,F)}else{this._fmCanvasSetFont(e,22,"bold","#003865"),e.textAlign="center";const L=(n.companyName||"HS").trim().slice(0,2).toUpperCase();e.fillText(L,l+c/2,m+g/2+8)}const u=r+(t-r-d)/2,y=t-r-d-o*2;this._fmCanvasSetFont(e,22,"bold","#003865"),e.textAlign="center";const b=this._fmCanvasFitFontSize(e,"\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2014 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626",y,22,"bold");this._fmCanvasSetFont(e,b,"bold","#003865"),e.fillText("\u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u2014 \u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0627\u0644\u0637\u0648\u0627\u0631\u0626",u,34),this._fmCanvasSetFont(e,12,"600","#1e40af"),e.fillText("Interactive Factory Emergency Response Map",u,52),this._fmCanvasSetFont(e,12,"normal","#64748b");const v=this._fmCanvasFitFontSize(e,n.planTitle,y,12,"normal");this._fmCanvasSetFont(e,v,"normal","#64748b"),e.fillText(n.planTitle,u,70);const S=Math.min(280,y),k=24,A=u-S/2,I=82;e.fillStyle="#eff6ff",this._fmDrawRoundedRect(e,A,I,S,k,12),e.fill(),e.strokeStyle="#93c5fd",e.lineWidth=1,e.stroke(),this._fmCanvasSetFont(e,11,"bold","#1d4ed8"),e.textAlign="center",e.fillText(`\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C: ${n.formCode}  |  \u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ${n.formVersion}`,u,I+16);const p=t-o,f=d-10,h=t-o-f,E=14,_=a-28;e.fillStyle="#f8fafc",this._fmDrawRoundedRect(e,h,E,f,_,10),e.fill(),e.strokeStyle="#e2e8f0",e.lineWidth=1,e.stroke();let w=E+22;const x=f-20;e.textAlign="right",this._fmCanvasSetFont(e,10,"bold","#64748b"),e.fillText("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0648\u062B\u064A\u0642\u0629",p-10,w),w+=18,this._fmCanvasSetFont(e,11,"bold","#0f172a");const B=this._fmCanvasFitFontSize(e,n.companyName||"\u2014",x,11,"bold");this._fmCanvasSetFont(e,B,"bold","#0f172a");const C=this._fmCanvasDrawWrappedLines(e,n.companyName||"\u2014",p-10,w,x,14,"right",2);w+=C*14+6,n.companySecondaryName&&(this._fmCanvasSetFont(e,10,"normal","#64748b"),this._fmCanvasDrawWrappedLines(e,n.companySecondaryName,p-10,w,x,13,"right",2))},_fmDrawExportFooter(e,t,a,s,i){const n=this._fmGetExportDocumentMeta(this._fmState.floorPlans.find(h=>h.id===this._fmState.currentPlanId)||{}),o=18,r=i?108:0,d=t-o*2-(i?r+10:0);e.fillStyle="#ffffff",e.fillRect(0,a,t,s),e.fillStyle="#e0e7ff",e.fillRect(0,a,t,2);const l=a+8,m=s-16;e.fillStyle="#f8fbff",this._fmDrawRoundedRect(e,o,l,t-o*2,m,10),e.fill(),e.strokeStyle="rgba(59, 130, 246, 0.25)",e.lineWidth=1.5,e.stroke();const c=d/3,g=o+c*.5,u=o+c*1.5,y=o+c*2.5,b=l+16,v=l+32,S=c-28;this._fmCanvasSetFont(e,10,"bold","#64748b"),e.textAlign="center",e.fillText("\u0643\u0648\u062F \u0627\u0644\u0646\u0645\u0648\u0630\u062C",g,b),this._fmCanvasSetFont(e,12,"bold","#003865");const k=this._fmCanvasFitFontSize(e,n.formCode,S,12,"bold");this._fmCanvasSetFont(e,k,"bold","#003865"),e.fillText(n.formCode,g,v),this._fmCanvasSetFont(e,10,"bold","#64748b"),e.fillText("\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0635\u062F\u064A\u0631",u,b),this._fmCanvasSetFont(e,10,"bold","#0f172a");const A=this._fmCanvasFitFontSize(e,n.exportDate,S,10,"bold");this._fmCanvasSetFont(e,A,"bold","#0f172a"),e.fillText(n.exportDate,u,v),this._fmCanvasSetFont(e,9,"600","#475569"),e.fillText(n.exportTime,u,v+13),this._fmCanvasSetFont(e,10,"bold","#64748b"),e.fillText("\u0631\u0642\u0645 \u0627\u0644\u0625\u0635\u062F\u0627\u0631",y,b),this._fmCanvasSetFont(e,12,"bold","#1d4ed8"),e.fillText(`Rev. ${n.formVersion}`,y,v),e.strokeStyle="#dbeafe",e.lineWidth=1,e.beginPath(),e.moveTo(o+c,l+8),e.lineTo(o+c,l+m-28),e.moveTo(o+c*2,l+8),e.lineTo(o+c*2,l+m-28),e.stroke();const I=l+m-24;e.strokeStyle="#e2e8f0",e.lineWidth=1,e.beginPath(),e.moveTo(o+12,I),e.lineTo(o+d-6,I),e.stroke(),this._fmCanvasSetFont(e,9,"bold","#003865"),e.textAlign="center";const p=this._fmCanvasFitFontSize(e,n.companyName||"SafetyHub | ICAPP",d-24,9,"bold");this._fmCanvasSetFont(e,p,"bold","#003865"),e.fillText(n.companyName||"SafetyHub | ICAPP",o+d/2,l+m-14),this._fmCanvasSetFont(e,8,"normal","#94a3b8");const f=this._fmCanvasFitFontSize(e,"\u0633\u0631\u064A \u2014 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062F\u0627\u062E\u0644\u064A | \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",d-24,8,"normal");if(this._fmCanvasSetFont(e,f,"normal","#94a3b8"),e.fillText("\u0633\u0631\u064A \u2014 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062F\u0627\u062E\u0644\u064A | \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0633\u0644\u0627\u0645\u0629 \u0648\u0627\u0644\u0635\u062D\u0629 \u0627\u0644\u0645\u0647\u0646\u064A\u0629 \u0648\u0627\u0644\u0628\u064A\u0626\u0629",o+d/2,l+m-3),i){const _=r,w=102,x=t-o-_+4,B=a+10+(m-w)/2;e.fillStyle="#ffffff",this._fmDrawRoundedRect(e,x,B,_,w,10),e.fill(),e.strokeStyle="#bfdbfe",e.lineWidth=1.5,e.stroke(),e.drawImage(i,x+(_-72)/2,B+8,72,72),e.fillStyle="#003865",e.font="bold 9px Tahoma, Arial, sans-serif",e.textAlign="center",e.fillText("\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0637\u0648\u0627\u0631\u0626",x+_/2,B+w-8)}},_fmDrawExportMapFrame(e,t,a,s,i){e.fillStyle="#f1f5f9",e.fillRect(t,a,s,i),e.strokeStyle="#cbd5e1",e.lineWidth=2,e.strokeRect(t+1,a+1,s-2,i-2)},_fmLoadImageElement(e){return new Promise(t=>{if(!e){t(null);return}const a=new Image;a.crossOrigin="anonymous",a.onload=()=>t(a),a.onerror=()=>t(null),a.src=e})},async _fmFetchPlanImageDataUrl(e,t){const a=String(e||"").trim();if(!a)return"";const s=String(t||a);if(this._fmState.planImageCache?.[s])return this._fmState.planImageCache[s];if(a.startsWith("data:"))return this._fmState.planImageCache[s]=a,a;if(typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest)try{const n=await GoogleIntegration.sendRequest({action:"getDriveImageDataUrl",data:{fileIdOrUrl:a}});if(n?.success&&n.dataUrl)return this._fmState.planImageCache[s]=n.dataUrl,n.dataUrl}catch{}const i=this._fmBuildPlanImageFallbacks_(a);for(let n=0;n<i.length;n++){const o=await this._fmLoadImageElement(i[n]);if(o)try{const r=document.createElement("canvas");r.width=o.naturalWidth||1200,r.height=o.naturalHeight||800,r.getContext("2d").drawImage(o,0,0);const l=r.toDataURL("image/jpeg",.9);return this._fmState.planImageCache[s]=l,l}catch{return this._fmState.planImageCache[s]=i[n],i[n]}}return""},_fmExtractDriveFileId_(e){const t=String(e||"").trim();if(!t)return"";if(typeof Utils<"u"&&typeof Utils.extractDriveFileId=="function")return Utils.extractDriveFileId(t)||t;const a=t.match(/[?&]id=([a-zA-Z0-9_-]+)/i)||t.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i)||t.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i)||t.match(/\/thumbnail\?id=([a-zA-Z0-9_-]+)/i);return a?String(a[1]||"").trim():t},_fmResolvePlanImageSrc(e){if(!e)return"";const t=String(e).trim();if(!t)return"";if(t.startsWith("data:"))return t;if(t.startsWith("http"))return typeof Utils<"u"&&typeof Utils.normalizeGoogleDriveImageUrl=="function"&&Utils.normalizeGoogleDriveImageUrl(t)||t;const a=this._fmExtractDriveFileId_(t);return a?`https://lh3.googleusercontent.com/d/${a}=w2000`:""},_fmShowMapImageError(e){if(!e)return;const t=e.closest("#fm-map-canvas");e.removeAttribute("src"),e.alt="\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0637\u0637",e.classList.add("fm-map-image-error");let a=t?.querySelector(".fm-map-image-error-banner");!a&&t&&(a=document.createElement("div"),a.className="fm-map-image-error-banner",a.innerHTML='<i class="fas fa-image"></i><span>\u062A\u0639\u0630\u0631 \u062A\u062D\u0645\u064A\u0644 \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0645\u0646 Drive \u2014 \u062C\u0631\u0651\u0628 \u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0645\u062E\u0637\u0637 \u0648\u0625\u0639\u0627\u062F\u0629 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629</span>',t.appendChild(a))},_fmClearMapImageError(e){if(!e)return;e.classList.remove("fm-map-image-error"),e.closest("#fm-map-canvas")?.querySelector(".fm-map-image-error-banner")?.remove()},async _fmFetchDriveImageViaProxy(e,t){if(!e||!t||typeof GoogleIntegration>"u"||!GoogleIntegration.sendRequest){this._fmShowMapImageError(e);return}try{const a=await GoogleIntegration.sendRequest({action:"getDriveImageDataUrl",data:{fileIdOrUrl:t}});if(a?.success&&a.dataUrl){this._fmClearMapImageError(e),e.src=a.dataUrl;return}}catch{}this._fmShowMapImageError(e)},_fmBuildPlanImageFallbacks_(e){const t=String(e||"").trim();if(!t)return[];if(t.startsWith("data:"))return[t];const a=this._fmExtractDriveFileId_(t);return[this._fmResolvePlanImageSrc(t),t.startsWith("http")?t:"",a?`https://lh3.googleusercontent.com/d/${a}=w2000`:"",a&&typeof window<"u"&&typeof window.__googleDriveDirectUrlFromId=="function"?window.__googleDriveDirectUrlFromId(a):"",a?`https://drive.google.com/uc?export=view&id=${a}`:"",a&&typeof window<"u"&&typeof window.__googleDrivePreviewUrlFromId=="function"?window.__googleDrivePreviewUrlFromId(a):"",a?`https://drive.google.com/thumbnail?id=${a}&sz=w2000`:""].filter((i,n,o)=>i&&o.indexOf(i)===n)},async _fmApplyMapImageSrc(e,t,a){if(!e)return;if(e.setAttribute("data-fm-map-image","1"),this._fmClearMapImageError(e),!t){e.removeAttribute("src"),e.alt="\u0644\u0627 \u062A\u0648\u062C\u062F \u0635\u0648\u0631\u0629 \u0644\u0644\u0645\u062E\u0637\u0637",this._fmShowMapImageError(e);return}e.alt="\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062E\u0637\u0637...";const s=await this._fmFetchPlanImageDataUrl(t,a);if(!s){this._fmShowMapImageError(e);return}e.onload=()=>{e.onerror=null,e.alt="\u0645\u062E\u0637\u0637 \u0627\u0644\u0637\u0627\u0628\u0642",this._fmClearMapImageError(e)},e.onerror=()=>{e.onerror=null,this._fmShowMapImageError(e)},e.src=s},async _fmUploadFloorPlanImageToDrive(e,t){if(!e)return"";const a=String(e);if(!a.startsWith("data:image"))return a;if(!window.GoogleIntegration||typeof GoogleIntegration.uploadFileToDrive!="function")throw new Error("\u062E\u062F\u0645\u0629 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629");const s=String(t||"floor_plan").replace(/[^\w\u0600-\u06FF.-]+/g,"_").slice(0,40),i=await GoogleIntegration.uploadFileToDrive(a,`${s}_${Date.now()}.jpg`,"image/jpeg","EmergencyFloorPlans");if(!i?.success||!i.fileId)throw new Error(i?.message||"\u0641\u0634\u0644 \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u062E\u0637\u0637 \u0625\u0644\u0649 Drive");return i.directLink||i.shareableLink||i.fileId},_fmRestoreCanvasStamps(e,t){if(t)try{const a=typeof t=="string"?JSON.parse(t):t;e._fmStamps=Array.isArray(a.stamps)?a.stamps:Array.isArray(a)?a:[],e._fmFrames=Array.isArray(a.frames)?a.frames.map((s,i)=>({id:s.id||"fr_"+i,presetKey:s.presetKey||"room",x:s.x,y:s.y,w:s.w,h:s.h,color:s.color||"#1e293b",width:s.width||4})):[],e._fmCustomImages=a.customImages||{},Object.assign(this._fmState.customStampImages,e._fmCustomImages)}catch{e._fmStamps=[],e._fmFrames=[]}},_fmImportCustomStamp(e){if(!e||!e.type.startsWith("image/")){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629 \u0644\u0644\u0623\u064A\u0642\u0648\u0646\u0629");return}if(e.size>2097152){typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0643\u0628\u064A\u0631 (\u0627\u0644\u062D\u062F 2MB)");return}const t=new FileReader;t.onload=a=>{const s=a.target.result,i="custom_"+Date.now();this._fmState.customStampImages[i]=s;const n=document.getElementById("fm-sketch-canvas");n&&(n._fmCustomImages=n._fmCustomImages||{}),n&&(n._fmCustomImages[i]=s);const o=document.querySelector(".fm-stamp-toolbar-items");o&&(o.innerHTML=this._fmBuildStampToolbarHtml()),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u2014 \u0627\u0646\u0642\u0631 \u0639\u0644\u064A\u0647\u0627 \u062B\u0645 \u0639\u0644\u0649 \u0627\u0644\u0631\u0633\u0645")},t.readAsDataURL(e)},async _fmExportCurrentMapPng(){const e=this._fmState.floorPlans.find(v=>v.id===this._fmState.currentPlanId);if(!e){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0627\u062E\u062A\u0631 \u0645\u062E\u0637\u0637\u0627\u064B \u0623\u0648\u0644\u0627\u064B");return}const t=parseInt(e.imageWidth,10)||1200,a=parseInt(e.imageHeight,10)||800,s=118,i=104,n=t,o=s,r=s+a,d=r+i,l=document.createElement("canvas");l.width=n,l.height=d;const m=l.getContext("2d");m.fillStyle="#ffffff",m.fillRect(0,0,n,d);const c=this._fmGetExportBranding();let g=null;if(c.logoUrl){const v=c.logoUrl.startsWith("data:")?c.logoUrl:await this._fmFetchPlanImageDataUrl(c.logoUrl,"logo_"+c.logoUrl.slice(0,24));g=await this._fmLoadImageElement(v||c.logoUrl)}await this._fmDrawExportHeader(m,n,s,e,g),this._fmDrawExportMapFrame(m,0,o,t,a);const u=await this._fmFetchPlanImageDataUrl(e.imageDriveId||"",e.id);if(u){const v=await this._fmLoadImageElement(u);v&&m.drawImage(v,0,o,t,a)}(this._fmState.items||[]).forEach(v=>{const S=parseFloat(v.x)*t,k=parseFloat(v.y)*a+o;this._fmDrawStampOnCanvas(m,v.itemType,S,k)});const y=this._fmBuildMapQrUrl(e);let b=null;y&&typeof QRCode<"u"&&QRCode.generate&&(b=await this._fmLoadImageElement(QRCode.generate(y,96))),this._fmDrawExportFooter(m,n,r,i,b),this._fmDownloadCanvasPng(l,(e.name||"\u062E\u0631\u064A\u0637\u0629")+".png")},_fmDownloadCanvasPng(e,t){const a=document.createElement("a");a.download=t.replace(/[^\w\u0600-\u06FF.\-]+/g,"_"),a.href=e.toDataURL("image/png"),a.click(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629")},_fmShowMapQrPanel(){const e=this._fmState.floorPlans.find(n=>n.id===this._fmState.currentPlanId);if(!e){typeof Notification<"u"&&Notification.warning&&Notification.warning("\u0627\u062E\u062A\u0631 \u0645\u062E\u0637\u0637\u0627\u064B \u0623\u0648\u0644\u0627\u064B");return}const t=this._fmBuildMapQrUrl(e),a=typeof QRCode<"u"&&QRCode.generate?QRCode.generate(t,220):"",s=`
            <div class="modal-overlay active fm-qr-modal-overlay" id="fm-qr-modal" role="dialog">
                <div class="modal-content fm-qr-modal">
                    <div class="fm-modal-header-fixed lr-modal-header">
                        <h3><i class="fas fa-qrcode" style="color:#dc2626;"></i> \u0631\u0645\u0632 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629 \u0644\u0644\u0637\u0648\u0627\u0631\u0626</h3>
                        <button type="button" class="modal-close" id="fm-qr-modal-close"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body fm-qr-body">
                        <p class="fm-qr-plan-name">${Utils.escapeHTML(e.name||"")}${e.floor?" \u2014 "+Utils.escapeHTML(e.floor):""}</p>
                        <div class="fm-qr-card">
                            ${a?`<img src="${a}" alt="QR" class="fm-qr-image">`:"<p>\u062A\u0639\u0630\u0631 \u062A\u0648\u0644\u064A\u062F QR</p>"}
                        </div>
                        <p class="fm-qr-hint">\u0627\u0645\u0633\u062D \u0627\u0644\u0631\u0645\u0632 \u0644\u0641\u062A\u062D \u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 <strong>\u0628\u062F\u0648\u0646 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644</strong> \u2014 \u0633\u062A\u0638\u0647\u0631 \u0646\u0642\u0637\u0629 <strong>\xAB\u0623\u0646\u062A \u0647\u0646\u0627\xBB</strong> \u0639\u0644\u0649 \u0627\u0644\u0645\u062E\u0637\u0637</p>
                        <div class="fm-qr-link-box">
                            <input type="text" class="form-input" id="fm-qr-link-input" readonly value="${Utils.escapeAttr(t)}">
                            <button type="button" class="btn-secondary btn-sm" id="fm-qr-copy-btn"><i class="fas fa-copy"></i> \u0646\u0633\u062E</button>
                        </div>
                    </div>
                    <div class="modal-footer fm-modal-footer-fixed">
                        <button type="button" class="btn-secondary" id="fm-qr-export-btn"><i class="fas fa-file-image ml-1"></i>\u062A\u0635\u062F\u064A\u0631 \u0627\u0644\u062E\u0631\u064A\u0637\u0629</button>
                        <button type="button" class="btn-primary" id="fm-qr-close-btn">\u0625\u063A\u0644\u0627\u0642</button>
                    </div>
                </div>
            </div>`;document.getElementById("fm-qr-modal")?.remove(),document.body.insertAdjacentHTML("beforeend",s);const i=()=>document.getElementById("fm-qr-modal")?.remove();document.getElementById("fm-qr-modal-close")?.addEventListener("click",i),document.getElementById("fm-qr-close-btn")?.addEventListener("click",i),document.getElementById("fm-qr-export-btn")?.addEventListener("click",()=>this._fmExportCurrentMapPng()),document.getElementById("fm-qr-copy-btn")?.addEventListener("click",()=>{const n=document.getElementById("fm-qr-link-input");n&&(n.select(),navigator.clipboard?.writeText(n.value).then(()=>{typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637")}).catch(()=>{}))})},async showFloorPlanForm(e){try{await this._fmEnsureFormSettings(),this._fmState.fullscreen&&this.toggleFactoryMapFullscreen();const t=this._fmState.floorPlans.find(g=>String(g.id)===String(e||"")),a=(g,u)=>t&&t[g]!=null?t[g]:u||"",s=g=>typeof Utils<"u"&&Utils.escapeAttr?Utils.escapeAttr(g):String(g??""),i=!!a("imageDriveId"),n=a("factoryId")||a("factory")||document.getElementById("fm-factory-filter")?.value||"",o=a("subLocationId")||"",r=a("subLocationName")||a("floor")||"",d=this._fmBuildFactorySelectHtml(n,a("factoryName")),l=this._fmBuildSubLocationOptionsHtml(n,o,r),m=`
            <div class="modal-overlay active fm-floor-modal-overlay fm-floor-modal-fullscreen" id="fm-floor-modal" role="dialog" aria-modal="true">
                <div class="modal-content fm-modal-improved fm-modal-fullscreen fm-plan-form-pro">
                    <div class="fm-plan-form-header">
                        <div class="fm-plan-form-header-text">
                            <span class="fm-plan-form-kicker"><i class="fas fa-industry"></i> \u062E\u0631\u064A\u0637\u0629 \u0627\u0644\u0645\u0635\u0646\u0639 \xB7 \u0627\u0644\u0637\u0648\u0627\u0631\u0626</span>
                            <h3>${e?"\u062A\u0639\u062F\u064A\u0644 \u0645\u062E\u0637\u0637 \u0627\u0644\u0637\u0627\u0628\u0642":"\u0625\u0636\u0627\u0641\u0629 \u0645\u062E\u0637\u0637 \u0637\u0627\u0628\u0642 \u062C\u062F\u064A\u062F"}</h3>
                            <p>\u0627\u0631\u0633\u0645 \u0627\u0644\u0645\u062E\u0637\u0637 \u0623\u0648 \u0627\u0631\u0641\u0639 \u0635\u0648\u0631\u0629\u060C \u062B\u0645 \u0623\u0636\u0641 \u0625\u0637\u0627\u0631\u0627\u062A \u0627\u0644\u063A\u0631\u0641 \u0648\u0627\u0644\u0631\u0645\u0648\u0632</p>
                        </div>
                        <button type="button" class="modal-close" id="fm-floor-modal-close" aria-label="\u0625\u063A\u0644\u0627\u0642"><i class="fas fa-times"></i></button>
                    </div>
                    <form id="fm-floor-form" class="fm-floor-form-flex" onsubmit="return Emergency.handleFloorPlanSubmit(event)">
                        <input type="hidden" id="fm-floor-edit-id" value="${s(e||"")}">
                        <div class="fm-modal-body-scroll modal-body">
                            <div class="fm-plan-meta-card">
                                <div class="fm-plan-meta-grid">
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-tag"></i> \u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0637\u0637 <span class="text-red-500">*</span></label>
                                        <input type="text" id="fm-floor-name" class="form-input" value="${s(a("name"))}" required placeholder="\u0645\u062B\u0627\u0644: \u0645\u062E\u0637\u0637 \u0627\u0644\u0637\u0627\u0628\u0642 \u0627\u0644\u0623\u0631\u0636\u064A" autofocus>
                                    </div>
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-industry"></i> \u0627\u0644\u0645\u0635\u0646\u0639 <span class="text-red-500">*</span></label>
                                        <select id="fm-floor-factory" class="form-input" required>${d}</select>
                                    </div>
                                    <div class="form-group fm-plan-field">
                                        <label class="form-label"><i class="fas fa-layer-group"></i> \u0627\u0644\u0637\u0627\u0628\u0642 / \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0641\u0631\u0639\u064A</label>
                                        <select id="fm-floor-level" class="form-input">${l}</select>
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-sort-numeric-down"></i> \u0627\u0644\u062A\u0631\u062A\u064A\u0628</label>
                                        <input type="number" id="fm-floor-sort" class="form-input" value="${s(a("sortOrder","1"))}" min="0">
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-arrows-alt-h"></i> \u0627\u0644\u0639\u0631\u0636</label>
                                        <input type="number" id="fm-floor-width" class="form-input" value="${s(a("imageWidth",1600))}" min="400">
                                    </div>
                                    <div class="form-group fm-plan-field fm-plan-field-sm">
                                        <label class="form-label"><i class="fas fa-arrows-alt-v"></i> \u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639</label>
                                        <input type="number" id="fm-floor-height" class="form-input" value="${s(a("imageHeight",900))}" min="300">
                                    </div>
                                </div>
                            </div>
                            <div class="fm-source-tabs-bar">
                                <div class="fm-source-tabs">
                                    <button type="button" class="fm-source-tab active" data-mode="draw" onclick="Emergency._fmSwitchSource('draw')"><i class="fas fa-pen-fancy"></i> \u0631\u0633\u0645 \u064A\u062F\u0648\u064A</button>
                                    <button type="button" class="fm-source-tab" data-mode="upload" onclick="Emergency._fmSwitchSource('upload')"><i class="fas fa-cloud-upload-alt"></i> \u0631\u0641\u0639 \u0635\u0648\u0631\u0629</button>
                                </div>
                            </div>
                            <div id="fm-source-draw" class="fm-source-pane fm-sketch-stage">
                                <div class="fm-canvas-toolbar">
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-tool active" data-tool="pen" title="\u0642\u0644\u0645"><i class="fas fa-pen"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="move" title="\u062A\u062D\u0631\u064A\u0643 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0648\u0627\u0644\u0625\u0637\u0627\u0631\u0627\u062A"><i class="fas fa-arrows-alt"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="rect" title="\u0645\u0633\u062A\u0637\u064A\u0644 / \u0625\u0637\u0627\u0631"><i class="fas fa-vector-square"></i></button>
                                        <button type="button" class="fm-draw-tool" data-tool="eraser" title="\u0645\u0645\u062D\u0627\u0629"><i class="fas fa-eraser"></i></button>
                                    </div>
                                    <div class="fm-tool-group">
                                        <label class="fm-tool-label">\u0627\u0644\u0644\u0648\u0646</label>
                                        <input type="color" id="fm-draw-color" value="#1e293b" title="\u0627\u0644\u0644\u0648\u0646">
                                    </div>
                                    <div class="fm-tool-group">
                                        <label class="fm-tool-label">\u0627\u0644\u0633\u0645\u0627\u0643\u0629</label>
                                        <select id="fm-draw-width" title="\u0633\u0645\u0627\u0643\u0629 \u0627\u0644\u062E\u0637">
                                            <option value="2">2</option>
                                            <option value="4" selected>4</option>
                                            <option value="6">6</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div class="fm-tool-group fm-sketch-zoom-controls">
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-out" title="\u062A\u0635\u063A\u064A\u0631"><i class="fas fa-search-minus"></i></button>
                                        <span class="fm-sketch-zoom-label" id="fm-sketch-zoom-label">100%</span>
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-in" title="\u062A\u0643\u0628\u064A\u0631"><i class="fas fa-search-plus"></i></button>
                                        <button type="button" class="fm-draw-tool" id="fm-sketch-zoom-fit" title="\u0645\u0644\u0627\u0621\u0645\u0629 \u0627\u0644\u0634\u0627\u0634\u0629"><i class="fas fa-compress-arrows-alt"></i></button>
                                    </div>
                                    <div class="fm-tool-group">
                                        <button type="button" class="fm-draw-action" onclick="Emergency._fmClearCanvasTarget()" title="\u0645\u0633\u062D \u0627\u0644\u0639\u0646\u0635\u0631 \u0627\u0644\u0645\u062D\u062F\u062F \u0641\u0642\u0637 (\u0623\u064A\u0642\u0648\u0646\u0629 \u0623\u0648 \u0625\u0637\u0627\u0631)"><i class="fas fa-eraser"></i> \u0645\u0633\u062D \u0627\u0644\u0645\u062D\u062F\u062F</button>
                                        <button type="button" class="fm-draw-action fm-draw-action-muted" onclick="Emergency._fmClearCanvas(true)" title="\u0645\u0633\u062D \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645 \u0641\u0642\u0637 \u2014 \u0644\u0627 \u064A\u0645\u0633\u062D \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C"><i class="fas fa-trash-alt"></i> \u0645\u0633\u062D \u0627\u0644\u0644\u0648\u062D\u0629</button>
                                        <button type="button" class="fm-draw-action" onclick="Emergency._fmApplyCanvasSizeFromInputs()" title="\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0623\u0628\u0639\u0627\u062F"><i class="fas fa-expand-arrows-alt"></i> \u0627\u0644\u0623\u0628\u0639\u0627\u062F</button>
                                    </div>
                                </div>
                                <div class="fm-frame-toolbar" id="fm-frame-toolbar">
                                    <span class="fm-frame-toolbar-label"><i class="fas fa-border-all"></i> \u0625\u0637\u0627\u0631\u0627\u062A \u062C\u0627\u0647\u0632\u0629:</span>
                                    <div class="fm-frame-toolbar-items">${this._fmBuildFrameToolbarHtml()}</div>
                                </div>
                                <div class="fm-stamp-toolbar fm-stamp-toolbar-compact">
                                    <div class="fm-stamp-toolbar-head">
                                        <span class="fm-stamp-toolbar-label"><i class="fas fa-map-pin"></i> \u0631\u0645\u0648\u0632 \u0627\u0644\u0633\u0644\u0627\u0645\u0629:</span>
                                        <label class="btn-secondary btn-sm fm-import-stamp-btn" title="\u0627\u0633\u062A\u064A\u0631\u0627\u062F \u0623\u064A\u0642\u0648\u0646\u0629 \u0645\u062E\u0635\u0635\u0629">
                                            <i class="fas fa-file-import"></i> \u0627\u0633\u062A\u064A\u0631\u0627\u062F
                                            <input type="file" id="fm-import-stamp-input" accept="image/*" hidden>
                                        </label>
                                    </div>
                                    <div class="fm-stamp-toolbar-items">${this._fmBuildStampToolbarHtml()}</div>
                                </div>
                                <div class="fm-sketch-viewport" id="fm-sketch-viewport">
                                    <div class="fm-sketch-zoom-inner" id="fm-sketch-zoom-inner">
                                        <div class="fm-canvas-wrap">
                                            <canvas id="fm-sketch-canvas" width="1600" height="900" tabindex="-1"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div class="fm-canvas-hint">
                                    <i class="fas fa-info-circle"></i> \u0627\u0633\u062D\u0628 \u0644\u0631\u0633\u0645 <strong>\u0645\u0633\u062A\u0637\u064A\u0644/\u0625\u0637\u0627\u0631</strong>\u060C \u0623\u0648 \u0627\u0633\u062A\u062E\u062F\u0645 \u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u062A\u0643\u0628\u064A\u0631 \u0623\u0639\u0644\u0649 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0631\u0633\u0645.
                                </div>
                                ${i?'<div class="fm-canvas-warning"><i class="fas fa-exclamation-triangle"></i> \u064A\u0648\u062C\u062F \u0631\u0633\u0645 \u0633\u0627\u0628\u0642 \u2014 \u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u062C\u062F\u064A\u062F \u0633\u064A\u062D\u0644 \u0645\u062D\u0644\u0647.</div>':""}
                            </div>
                            <div id="fm-source-upload" class="fm-source-pane" style="display:none;margin-top:4px;">
                                <div class="fm-upload-area" id="fm-upload-area">
                                    <input type="file" id="fm-file-input" accept="image/*" style="display:none;">
                                    <div class="fm-upload-dropzone" id="fm-upload-dropzone">
                                        <i class="fas fa-cloud-upload-alt"></i>
                                        <p>\u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0645\u0646 \u062C\u0647\u0627\u0632\u0643</p>
                                        <span>\u0623\u0648 \u0627\u0633\u062D\u0628 \u0648\u0623\u0641\u0644\u062A \u0627\u0644\u0635\u0648\u0631\u0629 \u0647\u0646\u0627</span>
                                        <button type="button" class="btn-sm btn-primary" style="margin-top:8px;" onclick="document.getElementById('fm-file-input').click()">\u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629</button>
                                    </div>
                                    <div class="fm-upload-preview" id="fm-upload-preview" style="display:none;">
                                        <img id="fm-upload-img" src="" alt="\u0645\u0639\u0627\u064A\u0646\u0629">
                                        <div class="fm-upload-actions">
                                            <button type="button" class="btn-icon btn-sm" onclick="Emergency._fmRemoveUploadedImage()" title="\u0625\u0632\u0627\u0644\u0629"><i class="fas fa-times"></i></button>
                                        </div>
                                    </div>
                                    <input type="hidden" id="fm-floor-image" value="${s(a("imageDriveId"))}">
                                    <p class="fm-field-hint" id="fm-upload-hint">${a("imageDriveId")?"\u0627\u0644\u0635\u0648\u0631\u0629 \u0645\u0648\u062C\u0648\u062F\u0629 \u0645\u0633\u0628\u0642\u0627\u064B.":"\u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0645\u0646 \u062C\u0647\u0627\u0632\u0643 \u0644\u0639\u0631\u0636\u0647\u0627 \u0643\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0637\u0637."}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer fm-modal-footer-fixed">
                            <button type="button" class="btn-secondary" id="fm-floor-modal-cancel">\u0625\u0644\u063A\u0627\u0621</button>
                            <button type="submit" class="btn-primary"><i class="fas fa-save ml-2"></i>${e?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637"}</button>
                        </div>
                    </form>
                </div>
            </div>`;this._closeFloorPlanModal(),document.body.insertAdjacentHTML("beforeend",m),document.body.classList.add("fm-floor-modal-open"),this._fmBindFloorPlanModal(),this.refreshSiteDropdowns();const c=n;if(c){const g=document.getElementById("fm-floor-factory");g&&(g.value=c)}this._fmBindFactoryCascade(o,r),this._fmBindFrameToolbar(),this._fmInitCanvas(),this._fmInitSketchZoom(),this._fmInitUpload()}catch(t){typeof Utils<"u"&&Utils.safeError&&Utils.safeError("\u0641\u0634\u0644 \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0645\u062E\u0637\u0637:",t),typeof Notification<"u"&&Notification.error&&Notification.error("\u062A\u0639\u0630\u0631 \u0641\u062A\u062D \u0646\u0645\u0648\u0630\u062C \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637")}},_fmBindFloorPlanModal(){const e=document.getElementById("fm-floor-modal");e&&(e.addEventListener("click",t=>{t.target===e&&this._closeFloorPlanModal()}),e.querySelector("#fm-floor-modal-close")?.addEventListener("click",()=>this._closeFloorPlanModal()),e.querySelector("#fm-floor-modal-cancel")?.addEventListener("click",()=>this._closeFloorPlanModal()),setTimeout(()=>document.getElementById("fm-floor-name")?.focus(),50))},_fmSwitchSource(e){document.querySelectorAll(".fm-source-tab").forEach(t=>t.classList.toggle("active",t.dataset.mode===e)),document.getElementById("fm-source-draw").style.display=e==="draw"?"block":"none",document.getElementById("fm-source-upload").style.display=e==="upload"?"block":"none"},_fmInitUpload(){const e=document.getElementById("fm-file-input"),t=document.getElementById("fm-upload-dropzone"),a=document.getElementById("fm-upload-preview"),s=document.getElementById("fm-upload-img"),i=document.getElementById("fm-floor-image"),n=document.getElementById("fm-upload-hint");!e||e.dataset.fmBound||(e.addEventListener("change",()=>this._fmHandleFile(e.files[0])),t.addEventListener("dragover",o=>{o.preventDefault(),t.style.borderColor="#2563eb"}),t.addEventListener("dragleave",()=>{t.style.borderColor="#cbd5e1"}),t.addEventListener("drop",o=>{o.preventDefault(),t.style.borderColor="#cbd5e1",this._fmHandleFile(o.dataTransfer.files[0])}),t.addEventListener("click",()=>e.click()),e.dataset.fmBound="1",i&&i.value&&i.value.startsWith("data:")&&(s.src=i.value,t.style.display="none",a.style.display="flex",n&&(n.textContent="\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0631\u0641\u0648\u0639\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.")))},_fmHandleFile(e){if(!e)return;if(!e.type.startsWith("image/")){typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0644\u0641 \u0635\u0648\u0631\u0629 \u0641\u0642\u0637");return}if(e.size>10485760){typeof Notification<"u"&&Notification.error&&Notification.error("\u062D\u062C\u0645 \u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064A\u0631 \u062C\u062F\u0627\u064B (\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 10MB)");return}const t=new FileReader;t.onload=a=>{const s=a.target.result,i=document.getElementById("fm-upload-img"),n=document.getElementById("fm-upload-dropzone"),o=document.getElementById("fm-upload-preview"),r=document.getElementById("fm-floor-image"),d=document.getElementById("fm-upload-hint");i&&(i.src=s),n&&(n.style.display="none"),o&&(o.style.display="flex"),r&&(r.value=s),d&&(d.textContent="\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0646\u062C\u0627\u062D.")},t.readAsDataURL(e)},_fmRemoveUploadedImage(){const e=document.getElementById("fm-upload-img"),t=document.getElementById("fm-upload-dropzone"),a=document.getElementById("fm-upload-preview"),s=document.getElementById("fm-floor-image"),i=document.getElementById("fm-file-input"),n=document.getElementById("fm-upload-hint");e&&(e.src=""),t&&(t.style.display="block"),a&&(a.style.display="none"),s&&(s.value=""),i&&(i.value=""),n&&(n.textContent="\u0627\u062E\u062A\u0631 \u0635\u0648\u0631\u0629 \u0645\u0646 \u062C\u0647\u0627\u0632\u0643 \u0644\u0639\u0631\u0636\u0647\u0627 \u0643\u062E\u0644\u0641\u064A\u0629 \u0644\u0644\u0645\u062E\u0637\u0637.")},_fmDrawStampOnCanvas(e,t,a,s,i){const n=this._fmStampRadius,o=i||t&&String(t).startsWith("custom_")&&this._fmState.customStampImages[t]||"";if(e.save(),e.beginPath(),e.arc(a,s,n,0,Math.PI*2),o){const r=new Image;r.src=o,r.complete&&r.naturalWidth?(e.save(),e.clip(),e.drawImage(r,a-n,s-n,n*2,n*2),e.restore()):(e.fillStyle="#0ea5e9",e.fill())}else{const r=this.FM_ITEM_TYPES[t]||{color:"#64748b",label:"?"},d={fire_extinguisher:"\u{1F9EF}",fire_hose:"\u{1F525}",fire_alarm:"\u{1F514}",emergency_exit:"\u{1F6AA}",escape_route:"\u27A1\uFE0F",assembly_point:"\u{1F465}",first_aid:"\u2795",hazmat:"\u2623\uFE0F",evacuation_chair:"\u267F",fire_panel:"\u{1F5A5}\uFE0F"};e.fillStyle=r.color,e.fill(),e.font='18px "Segoe UI Emoji", "Apple Color Emoji", Tahoma, sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText(d[t]||"\u25CF",a,s+1)}e.beginPath(),e.arc(a,s,n,0,Math.PI*2),e.strokeStyle="#ffffff",e.lineWidth=3,e.stroke(),e.strokeStyle="rgba(15,23,42,0.25)",e.lineWidth=1,e.stroke(),e.restore()},_fmInitSketchZoom(){const e=document.getElementById("fm-sketch-zoom-inner"),t=document.getElementById("fm-sketch-viewport");if(!e)return;this._fmState.sketchZoom||(this._fmState.sketchZoom=1),this._fmApplySketchZoom(this._fmState.sketchZoom);const a=(s,i)=>{const n=document.getElementById(s);n&&!n.dataset.fmBound&&(n.addEventListener("click",i),n.dataset.fmBound="1")};a("fm-sketch-zoom-in",()=>this._fmSetSketchZoom((this._fmState.sketchZoom||1)+.1)),a("fm-sketch-zoom-out",()=>this._fmSetSketchZoom((this._fmState.sketchZoom||1)-.1)),a("fm-sketch-zoom-fit",()=>this._fmFitSketchZoom()),t&&!t.dataset.fmWheelBound&&(t.addEventListener("wheel",s=>{if(!s.ctrlKey)return;s.preventDefault();const i=s.deltaY>0?-.08:.08;this._fmSetSketchZoom((this._fmState.sketchZoom||1)+i)},{passive:!1}),t.dataset.fmWheelBound="1"),setTimeout(()=>this._fmFitSketchZoom(),80)},_fmApplySketchZoom(e){const t=document.getElementById("fm-sketch-zoom-inner"),a=document.getElementById("fm-sketch-zoom-label"),s=Math.max(.25,Math.min(3,e||1));this._fmState.sketchZoom=s,t&&(t.style.transform=`scale(${s})`),a&&(a.textContent=Math.round(s*100)+"%")},_fmSetSketchZoom(e){this._fmApplySketchZoom(e)},_fmFitSketchZoom(){const e=document.getElementById("fm-sketch-viewport"),t=document.getElementById("fm-sketch-canvas");if(!e||!t)return;const a=24,s=Math.max(200,e.clientWidth-a),i=Math.max(200,e.clientHeight-a),n=s/t.width,o=i/t.height;this._fmApplySketchZoom(Math.min(n,o,1.5))},_fmApplyCanvasSizeFromInputs(){const e=document.getElementById("fm-sketch-canvas");if(!e)return;const t=Math.max(400,parseInt(document.getElementById("fm-floor-width")?.value,10)||1600),a=Math.max(300,parseInt(document.getElementById("fm-floor-height")?.value,10)||900),s=e.width,i=e.height;if(t===s&&a===i){this._fmFitSketchZoom();return}const n=document.createElement("canvas");n.width=t,n.height=a;const o=n.getContext("2d");if(o.fillStyle="#ffffff",o.fillRect(0,0,t,a),e._fmBaseSnapshot){const d=document.createElement("canvas");d.width=s,d.height=i,d.getContext("2d").putImageData(e._fmBaseSnapshot,0,0),o.drawImage(d,0,0,t,a)}else o.drawImage(e,0,0,t,a);e.width=t,e.height=a;const r=e.getContext("2d");if(r.drawImage(n,0,0),e._fmBaseSnapshot=r.getImageData(0,0,t,a),e._snapshot=e._fmBaseSnapshot,e._fmStamps&&s&&i){const d=t/s,l=a/i;e._fmStamps=e._fmStamps.map(m=>({...m,x:m.x*d,y:m.y*l}))}if(e._fmFrames&&s&&i){const d=t/s,l=a/i;e._fmFrames=e._fmFrames.map(m=>({...m,x:m.x*d,y:m.y*l,w:m.w*d,h:m.h*l}))}this._fmRedrawSketchCanvas(e),this._fmFitSketchZoom(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062A\u0637\u0628\u064A\u0642 \u0623\u0628\u0639\u0627\u062F \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645")},_fmDrawRectPreview(e,t,a,s,i,n,o){const r=Math.min(t,s),d=Math.min(a,i),l=Math.abs(s-t),m=Math.abs(i-a);e.strokeStyle=n,e.lineWidth=o,e.strokeRect(r,d,l,m),e.fillStyle=n+"20",e.fillRect(r,d,l,m)},_fmCommitRectToBase(e,t,a,s,i,n,o){const r=Math.min(t,s),d=Math.min(a,i),l=Math.abs(s-t),m=Math.abs(i-a);if(l<2&&m<2)return;const c=document.createElement("canvas");c.width=e.width,c.height=e.height;const g=c.getContext("2d");e._fmBaseSnapshot&&g.putImageData(e._fmBaseSnapshot,0,0),g.strokeStyle=n,g.lineWidth=o,g.strokeRect(r,d,l,m),g.fillStyle=n+"20",g.fillRect(r,d,l,m),e._fmBaseSnapshot=g.getImageData(0,0,e.width,e.height),e._snapshot=e._fmBaseSnapshot},_fmRestoreCanvasImage_(e,t,a,s){const i=this._fmResolvePlanImageSrc(a);if(!i){s&&s();return}const n=new Image;i.startsWith("data:")||(n.crossOrigin="anonymous"),n.onload=()=>{t.clearRect(0,0,e.width,e.height),t.drawImage(n,0,0,e.width,e.height),e._fmBaseSnapshot=t.getImageData(0,0,e.width,e.height),e._snapshot=e._fmBaseSnapshot,this._fmRedrawSketchCanvas(e),s&&s()},n.onerror=()=>{s&&s()},n.src=i},_fmInitCanvas(){const e=document.getElementById("fm-sketch-canvas");if(!e)return;const t=e.getContext("2d"),a={x:0,y:0,endX:0,endY:0,drawing:!1};let s=!1,i,n;const o=e._fmToolState||{tool:"pen",color:"#1e293b",width:4,stampType:null};e._fmToolState=o,e._fmDragState=e._fmDragState||{active:!1,kind:null,index:-1,offsetX:0,offsetY:0},this._fmInitCanvasLayers(e);const r=()=>{t.fillStyle="#ffffff",t.fillRect(0,0,e.width,e.height),e._fmBaseSnapshot=t.getImageData(0,0,e.width,e.height),e._snapshot=e._fmBaseSnapshot,e._fmStamps=[],e._fmFrames=[],e._fmSelected=null,this._fmRedrawSketchCanvas(e)},d=Math.max(400,parseInt(document.getElementById("fm-floor-width")?.value,10)||1600),l=Math.max(300,parseInt(document.getElementById("fm-floor-height")?.value,10)||900);(e.width!==d||e.height!==l)&&(e.width=d,e.height=l);const m=document.getElementById("fm-floor-edit-id")?.value;if(m){const p=this._fmState.floorPlans.find(f=>String(f.id)===String(m));p?.drawStampsJson&&this._fmRestoreCanvasStamps(e,p.drawStampsJson),p?.imageDriveId?this._fmRestoreCanvasImage_(e,t,p.imageDriveId,()=>{p?.drawStampsJson&&this._fmRedrawSketchCanvas(e)}):r()}else r();const c=p=>{const f=e.getBoundingClientRect(),h=e.width/f.width,E=e.height/f.height,_=p.touches?p.touches[0].clientX:p.clientX,w=p.touches?p.touches[0].clientY:p.clientY;return{x:(_-f.left)*h,y:(w-f.top)*E}},g=(p,f)=>{const h=e._fmDragState;if(h.active=!0,h.kind=p.kind,h.index=p.index,e._fmSelected={kind:p.kind,index:p.index},p.kind==="frame"){const E=e._fmFrames[p.index];h.offsetX=f.x-E.x,h.offsetY=f.y-E.y}else{const E=e._fmStamps[p.index];h.offsetX=f.x-E.x,h.offsetY=f.y-E.y}this._fmUpdateCanvasCursor(e,o)},u=()=>{const p=e._fmDragState;if(p.active){if(p.kind==="frame"&&e._fmFrames[p.index]){const f=e._fmFrames[p.index],h=this._fmFindFreePosition(e,"frame",p.index,f.x,f.y,f.w,f.h);f.x=h.x,f.y=h.y}else if(p.kind==="stamp"&&e._fmStamps[p.index]){const f=e._fmStamps[p.index],h=this._fmFindFreePosition(e,"stamp",p.index,f.x,f.y,0,0);f.x=h.x,f.y=h.y}p.active=!1,p.kind=null,p.index=-1,this._fmUpdateCanvasCursor(e,o),this._fmRedrawSketchCanvas(e)}},y=p=>{p.preventDefault(),p.stopPropagation();const f=c(p),h=this._fmHitTestTopObject(e,f.x,f.y);if(o.tool==="move"||o.tool==="stamp"&&h){if(h){g(h,f);return}if(o.tool==="move"){e._fmSelected=null,this._fmRedrawSketchCanvas(e);return}}if(o.tool==="stamp"&&o.stampType){const E=o.stampType.startsWith("custom_")&&e._fmCustomImages?e._fmCustomImages[o.stampType]:"",_=this._fmFindFreePosition(e,"stamp",-1,f.x,f.y,0,0);e._fmStamps.push({type:o.stampType,x:_.x,y:_.y,customImage:E}),e._fmSelected={kind:"stamp",index:e._fmStamps.length-1},this._fmRedrawSketchCanvas(e);return}if(o.tool==="eraser"){const E=this._fmHitTestFrame(e,f.x,f.y);if(E>=0){e._fmFrames.splice(E,1),e._fmSelected=null,this._fmRedrawSketchCanvas(e);return}const _=this._fmHitTestStamp(e,f.x,f.y);if(_>=0){e._fmStamps.splice(_,1),e._fmSelected=null,this._fmRedrawSketchCanvas(e);return}this._fmEraseBaseAt(e,f.x,f.y,o.width*3),this._fmRedrawSketchCanvas(e),s=!0,i=f.x,n=f.y;return}o.tool!=="move"&&(s=!0,i=f.x,n=f.y,o.tool==="rect"?(a.x=f.x,a.y=f.y,a.endX=f.x,a.endY=f.y,a.drawing=!0):(t.beginPath(),t.moveTo(f.x,f.y)))},b=p=>{p.preventDefault();const f=c(p),h=e._fmDragState;if(h.active){if(h.kind==="frame"&&e._fmFrames[h.index]){const w=e._fmFrames[h.index],x=this._fmClampRect(f.x-h.offsetX,f.y-h.offsetY,w.w,w.h,e.width,e.height);w.x=x.x,w.y=x.y}else if(h.kind==="stamp"&&e._fmStamps[h.index]){const w=e._fmStamps[h.index],x=this._fmObjectGap();w.x=Math.max(x,Math.min(f.x-h.offsetX,e.width-x)),w.y=Math.max(x,Math.min(f.y-h.offsetY,e.height-x))}this._fmRedrawSketchCanvas(e);return}if(!s)return;if(o.tool==="eraser"){const w=this._fmHitTestFrame(e,f.x,f.y);if(w>=0)e._fmFrames.splice(w,1);else{const x=this._fmHitTestStamp(e,f.x,f.y);x>=0?e._fmStamps.splice(x,1):(this._fmEraseBaseAt(e,f.x,f.y,o.width*3),this._fmEraseBaseAt(e,i,n,o.width*3))}this._fmRedrawSketchCanvas(e),i=f.x,n=f.y;return}if(o.tool==="rect"){if(!a.drawing)return;a.endX=f.x,a.endY=f.y,this._fmRedrawSketchCanvas(e),this._fmDrawRectPreview(t,a.x,a.y,a.endX,a.endY,o.color,o.width);return}if(!e._fmBaseSnapshot)return;const E=document.createElement("canvas");E.width=e.width,E.height=e.height;const _=E.getContext("2d");_.putImageData(e._fmBaseSnapshot,0,0),_.strokeStyle=o.color,_.lineWidth=o.width,_.lineCap="round",_.lineJoin="round",_.beginPath(),_.moveTo(i,n),_.lineTo(f.x,f.y),_.stroke(),e._fmBaseSnapshot=_.getImageData(0,0,e.width,e.height),this._fmRedrawSketchCanvas(e),i=f.x,n=f.y},v=()=>{if(e._fmDragState?.active){u();return}o.tool==="rect"&&a.drawing&&(this._fmCommitRectToBase(e,a.x,a.y,a.endX,a.endY,o.color,o.width),a.drawing=!1,this._fmRedrawSketchCanvas(e)),s=!1,(o.tool==="pen"||o.tool==="eraser")&&(e._snapshot=e._fmBaseSnapshot)};e._fmEventsBound||(e.addEventListener("mousedown",y),e.addEventListener("mousemove",b),e.addEventListener("mouseup",v),e.addEventListener("mouseleave",v),e.addEventListener("touchstart",y,{passive:!1}),e.addEventListener("touchmove",b,{passive:!1}),e.addEventListener("touchend",v),e._fmEventsBound=!0),e._fmToolsBound||(document.querySelectorAll(".fm-draw-tool[data-tool]").forEach(p=>{p.addEventListener("click",()=>{document.querySelectorAll(".fm-draw-tool[data-tool]").forEach(f=>f.classList.remove("active")),document.querySelectorAll(".fm-stamp-btn").forEach(f=>f.classList.remove("active")),p.classList.add("active"),o.tool=p.dataset.tool,o.stampType=null,this._fmUpdateCanvasCursor(e,o)})}),e._fmToolsBound=!0),this._fmUpdateCanvasCursor(e,o);const S=document.querySelector(".fm-stamp-toolbar");S&&!S.dataset.fmDelegBound&&(S.addEventListener("click",p=>{const f=p.target.closest(".fm-stamp-btn");f&&(document.querySelectorAll(".fm-stamp-btn").forEach(h=>h.classList.remove("active")),document.querySelectorAll(".fm-draw-tool").forEach(h=>h.classList.remove("active")),f.classList.add("active"),o.tool="stamp",o.stampType=f.dataset.stamp,this._fmUpdateCanvasCursor(e,o))}),S.dataset.fmDelegBound="1");const k=document.getElementById("fm-draw-color");k&&k.addEventListener("input",p=>{o.color=p.target.value});const A=document.getElementById("fm-draw-width");A&&A.addEventListener("change",p=>{o.width=parseInt(p.target.value,10)||4});const I=document.getElementById("fm-import-stamp-input");I&&!I.dataset.fmBound&&(I.addEventListener("change",()=>{this._fmImportCustomStamp(I.files[0]),I.value=""}),I.dataset.fmBound="1")},_fmClearCanvasTarget(){const e=document.getElementById("fm-sketch-canvas");if(!e)return;const t=e._fmSelected;if(t?.kind==="stamp"&&e._fmStamps?.[t.index]){e._fmStamps.splice(t.index,1),e._fmSelected=null,this._fmRedrawSketchCanvas(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0645\u0633\u062D \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629");return}if(t?.kind==="frame"&&e._fmFrames?.[t.index]){e._fmFrames.splice(t.index,1),e._fmSelected=null,this._fmRedrawSketchCanvas(e),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0645\u0633\u062D \u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0645\u062D\u062F\u062F");return}typeof Notification<"u"&&Notification.warning&&Notification.warning("\u062D\u062F\u062F \u0623\u064A\u0642\u0648\u0646\u0629 \u0623\u0648 \u0625\u0637\u0627\u0631\u0627\u064B \u0628\u0623\u062F\u0627\u0629 \u0627\u0644\u062A\u062D\u0631\u064A\u0643 \u062B\u0645 \u0627\u0636\u063A\u0637 \u0645\u0633\u062D \u0627\u0644\u0645\u062D\u062F\u062F")},_fmClearCanvas(e){if(e&&!window.confirm("\u0645\u0633\u062D \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645 \u0628\u0627\u0644\u0643\u0627\u0645\u0644\u061F \u0644\u0646 \u062A\u064F\u0645\u0633\u062D \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C (\u0627\u0644\u0627\u0633\u0645\u060C \u0627\u0644\u0645\u0635\u0646\u0639\u060C \u0627\u0644\u0645\u0648\u0642\u0639)."))return;const t=document.getElementById("fm-sketch-canvas");if(!t)return;const a=t.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,t.width,t.height),t._fmStamps=[],t._fmFrames=[],t._fmSelected=null,t._fmBaseSnapshot=a.getImageData(0,0,t.width,t.height),t._snapshot=t._fmBaseSnapshot,this._fmRedrawSketchCanvas(t),typeof Notification<"u"&&Notification.info&&Notification.info("\u062A\u0645 \u0645\u0633\u062D \u0644\u0648\u062D\u0629 \u0627\u0644\u0631\u0633\u0645")},async handleFloorPlanSubmit(e){e.preventDefault();const t=document.getElementById("fm-floor-edit-id")?.value,a=document.getElementById("fm-floor-name")?.value?.trim(),i=document.getElementById("fm-floor-modal")?.querySelector('button[type="submit"]');if(!a)return typeof Notification<"u"&&Notification.error&&Notification.error("\u0627\u0633\u0645 \u0627\u0644\u0645\u062E\u0637\u0637 \u0645\u0637\u0644\u0648\u0628"),!1;let n=document.getElementById("fm-floor-image")?.value?.trim()||"";const o=document.getElementById("fm-source-draw"),r=document.getElementById("fm-source-upload"),d=o&&o.style.display!=="none",l=r&&r.style.display!=="none";let m="";if(d){const p=document.getElementById("fm-sketch-canvas");p&&(this._fmRedrawSketchCanvas(p),m=this._fmSerializeCanvasStamps(p),p.getContext("2d").getImageData(0,0,p.width,p.height).data.some(_=>_!==0)&&(n=this._fmCompressCanvasDataUrl(p,1200,.78)))}else if(l&&n&&n.startsWith("data:image")){const p=document.getElementById("fm-upload-img");if(p&&p.complete&&p.naturalWidth){const f=document.createElement("canvas");f.width=p.naturalWidth,f.height=p.naturalHeight,f.getContext("2d").drawImage(p,0,0),n=this._fmCompressCanvasDataUrl(f,1200,.78)}}const c=t?this._fmState.floorPlans.find(p=>String(p.id)===String(t)):null;if(!n&&c?.imageDriveId&&(n=c.imageDriveId),!t&&!n)return typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0631\u0633\u0645 \u0627\u0644\u0645\u062E\u0637\u0637 \u0623\u0648 \u0631\u0641\u0639 \u0635\u0648\u0631\u0629 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638"),i&&(i.disabled=!1,i.innerHTML='<i class="fas fa-save ml-2"></i>\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637'),!1;const g=document.getElementById("fm-floor-factory"),u=g?.value?.trim()||"",y=g?.selectedOptions?.[0],b=y?.dataset?.name||y?.textContent?.trim()||"";if(!u)return typeof Notification<"u"&&Notification.error&&Notification.error("\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0635\u0646\u0639"),i&&(i.disabled=!1,i.innerHTML='<i class="fas fa-save ml-2"></i>'+(t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637")),!1;const v=document.getElementById("fm-floor-level"),S=v?.value?.trim()||"",k=v?.selectedOptions?.[0],A=k?.dataset?.name||k?.textContent?.trim()||"",I={name:a,floor:A||"",subLocationId:S,subLocationName:A,factory:u,factoryId:u,factoryName:b,imageDriveId:n,imageWidth:parseInt(document.getElementById("fm-floor-width")?.value)||1200,imageHeight:parseInt(document.getElementById("fm-floor-height")?.value)||800,sortOrder:parseInt(document.getElementById("fm-floor-sort")?.value)||1,isActive:"true",qrToken:c?.qrToken||this._fmGenerateQrToken(),qrAnchorX:c?.qrAnchorX??.5,qrAnchorY:c?.qrAnchorY??.85,geoNwLat:c?.geoNwLat??"",geoNwLng:c?.geoNwLng??"",geoSeLat:c?.geoSeLat??"",geoSeLng:c?.geoSeLng??"",drawStampsJson:m||c?.drawStampsJson||""};i&&(i.disabled=!0,i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638...');try{if(!window.GoogleIntegration||typeof GoogleIntegration.sendRequest!="function")return typeof Notification<"u"&&Notification.error&&Notification.error("\u062E\u062F\u0645\u0629 \u0627\u0644\u062A\u0643\u0627\u0645\u0644 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631\u0629"),i&&(i.disabled=!1,i.innerHTML='<i class="fas fa-save ml-2"></i>'+(t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637")),!1;n&&String(n).startsWith("data:image")&&(i&&(i.innerHTML='<i class="fas fa-spinner fa-spin ml-2"></i>\u062C\u0627\u0631\u064A \u0631\u0641\u0639 \u0627\u0644\u0635\u0648\u0631\u0629...'),n=await this._fmUploadFloorPlanImageToDrive(n,a),I.imageDriveId=n);let p=t||"";if(t){const h=await GoogleIntegration.sendRequest({action:"updateEmergencyFloorPlan",data:{planId:t,updateData:I}});if(h&&h.success===!1)throw new Error(h.message||"\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u062F\u064A\u062B")}else{const h=await GoogleIntegration.sendRequest({action:"addEmergencyFloorPlan",data:I});if(h&&h.success===!1)throw new Error(h.message||"\u0641\u0634\u0644 \u0627\u0644\u0625\u0636\u0627\u0641\u0629");p=h?.data?.id||h?.data?.data?.id||h?.id||p}this._fmInvalidateFloorPlansCache(),typeof Notification<"u"&&Notification.success&&Notification.success(t?"\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0637\u0637":"\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637"),this._closeFloorPlanModal();const f=String(p||t||"");if(f){this._fmState.factoryFilter=String(u);const h=document.getElementById("fm-factory-filter");h&&(h.value=String(u))}await this.loadFloorPlans(f,{syncFactoryFilter:!0})}catch(p){const f=p?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641";return typeof Notification<"u"&&Notification.error&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0641\u0638: "+f),i&&(i.disabled=!1,i.innerHTML='<i class="fas fa-save ml-2"></i>'+(t?"\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A":"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u062E\u0637\u0637")),!1}return!1},loadMapItems(e){this._fmState.currentPlanId=e;const t=this._fmState.floorPlans.find(i=>String(i.id)===String(e));if(!t)return;document.getElementById("fm-map-placeholder")?.classList.add("hidden"),document.getElementById("fm-map-wrapper")?.classList.remove("hidden"),document.getElementById("fm-viewport-bar")?.classList.remove("hidden"),document.getElementById("fm-legend-sidebar")?.classList.remove("hidden"),document.getElementById("fm-export-png-btn")?.classList.remove("hidden"),document.getElementById("fm-qr-btn")?.classList.remove("hidden"),this._fmResetZoom();const a=document.getElementById("fm-map-canvas"),s=document.getElementById("fm-map-image");this._fmApplyMapImageSrc(s,t.imageDriveId||"",t.id),s&&(s.style.width=(t.imageWidth||1200)+"px",s.style.height=(t.imageHeight||800)+"px"),a&&(a.style.width=(t.imageWidth||1200)+"px",a.style.height=(t.imageHeight||800)+"px"),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"getAllEmergencyMapItems",data:{filters:{floorPlanId:e}}}).then(i=>{this._fmState.items=this._fmParseListResponse(i),this.renderMapItems(),this._renderLegend(),this._fmUpdatePlanMeta()}).catch(()=>{this._fmState.items=[],this._fmUpdatePlanMeta()}),this._fmUpdatePlanMeta()},renderMapItems(){const e=document.getElementById("fm-map-items-layer");e&&(e.innerHTML="",this._fmState.items.forEach(t=>{const a=this.FM_ITEM_TYPES[t.itemType]||{label:t.itemType,icon:"fa-question-circle",color:"#6b7280"},s=document.createElement("div");s.className="fm-marker"+(this._fmState.adminMode?" fm-marker-draggable":""),s.dataset.itemId=t.id,s.title=`${a.label}: ${t.label||""}`,s.style.left=parseFloat(t.x)*100+"%",s.style.top=parseFloat(t.y)*100+"%",s.style.background=a.color,s.innerHTML=`<i class="fas ${Utils.escapeAttr(a.icon)}"></i>`,s.addEventListener("click",i=>{i.stopPropagation(),this._fmState.adminMode||this._showMapItemTooltip(t,s)}),this._fmState.adminMode&&this._makeMarkerDraggable(s,t),e.appendChild(s)}),this._fmUpdatePlanMeta())},_showMapItemTooltip(e,t){const a=this.FM_ITEM_TYPES[e.itemType]||{label:e.itemType,icon:"fa-question-circle",color:"#6b7280"},s=document.getElementById("fm-tooltip");s&&s.remove();const i=document.createElement("div");i.id="fm-tooltip",i.className="fm-tooltip",i.innerHTML=`
            <div class="fm-tip-header" style="background:${Utils.escapeAttr(a.color)};">
                <i class="fas ${Utils.escapeAttr(a.icon)}"></i> ${Utils.escapeHTML(a.label)}
            </div>
            <div class="fm-tip-body">
                <p><strong>${Utils.escapeHTML(e.label||"\u2014")}</strong></p>
                <p>\u0627\u0644\u062D\u0627\u0644\u0629: ${Utils.escapeHTML(e.status==="maintenance"?"\u0635\u064A\u0627\u0646\u0629":e.status==="inactive"?"\u063A\u064A\u0631 \u0641\u0639\u0627\u0644":"\u0641\u0639\u0627\u0644")}</p>
                ${e.notes?`<p>${Utils.escapeHTML(e.notes)}</p>`:""}
                <div class="fm-tip-actions">
                    ${this._fmState.adminMode?`<button class="btn-icon btn-sm text-red-600" onclick="Emergency.deleteMapItem('${Utils.escapeAttr(e.id)}')" title="\u062D\u0630\u0641"><i class="fas fa-trash"></i></button>`:""}
                </div>
            </div>`,document.body.appendChild(i);const n=t.getBoundingClientRect();i.style.left=Math.min(n.left+n.width/2-i.offsetWidth/2,window.innerWidth-i.offsetWidth-10)+"px",i.style.top=n.top-i.offsetHeight-10+"px",document.addEventListener("click",function o(){i.remove(),document.removeEventListener("click",o)})},_makeMarkerDraggable(e,t){let a,s,i,n,o=!1;e.addEventListener("mousedown",r=>{if(r.button!==0)return;r.preventDefault(),o=!0;const d=document.getElementById("fm-map-canvas").getBoundingClientRect();a=r.clientX,s=r.clientY,i=parseFloat(t.x),n=parseFloat(t.y);const l=c=>{if(!o)return;const g=(c.clientX-a)/d.width,u=(c.clientY-s)/d.height,y=Math.max(0,Math.min(1,i+g)),b=Math.max(0,Math.min(1,n+u));t.x=y,t.y=b,e.style.left=y*100+"%",e.style.top=b*100+"%"},m=()=>{o=!1,document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",m),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"updateEmergencyMapItem",data:{itemId:t.id,updateData:{x:t.x,y:t.y}}}).catch(()=>{})};document.addEventListener("mousemove",l),document.addEventListener("mouseup",m)})},toggleAdminMode(){this._fmState.adminMode=!this._fmState.adminMode;const e=document.getElementById("fm-admin-panel"),t=document.getElementById("fm-admin-toggle");e&&e.classList.toggle("hidden",!this._fmState.adminMode),t&&t.classList.toggle("btn-primary",this._fmState.adminMode),t&&t.classList.toggle("btn-secondary",!this._fmState.adminMode),this.renderMapItems();const a=document.getElementById("fm-map-canvas");a&&(this._fmState.adminMode?a.addEventListener("click",this._fmCanvasClickHandler=s=>{if(!this._fmState.addingType)return;const i=a.getBoundingClientRect(),n=(s.clientX-i.left)/i.width,o=(s.clientY-i.top)/i.height;this._addMapItemAt(this._fmState.addingType,n,o)}):(this._fmCanvasClickHandler&&(a.removeEventListener("click",this._fmCanvasClickHandler),this._fmCanvasClickHandler=null),this._fmState.addingType=null,document.querySelectorAll(".fm-add-item-btn").forEach(s=>s.classList.remove("active"))))},_addMapItemAt(e,t,a){if(!this._fmState.currentPlanId)return;const s=this._fmState.items,i=s.filter(d=>d.itemType===e).length+1,n=this.FM_ITEM_TYPES[e]||{label:e,icon:"fa-question",color:"#6b7280"},o="MI-TEMP-"+Date.now(),r={id:o,floorPlanId:this._fmState.currentPlanId,itemType:e,label:n.label+" "+i,x:t,y:a,status:"active",notes:""};s.push(r),this.renderMapItems(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 "+n.label),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"addEmergencyMapItem",data:{floorPlanId:this._fmState.currentPlanId,itemType:e,label:n.label+" "+i,x:t,y:a,status:"active"}}).then(d=>{if(d&&d.success&&d.data&&d.data.id){const l=s.findIndex(m=>m.id===o);l>=0&&(s[l].id=d.data.id)}}).catch(()=>{})},deleteMapItem(e){confirm("\u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631 \u0645\u0646 \u0627\u0644\u062E\u0631\u064A\u0637\u0629\u061F")&&(this._fmState.items=this._fmState.items.filter(t=>t.id!==e),this.renderMapItems(),typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&GoogleIntegration.sendRequest({action:"deleteEmergencyMapItem",data:{itemId:e}}).catch(()=>{}))},deleteFloorPlan(e){if(!e)return;const a=this._fmState.floorPlans.find(i=>String(i.id)===String(e))?.name||"\u0647\u0630\u0627 \u0627\u0644\u0645\u062E\u0637\u0637";if(!confirm(`\u062D\u0630\u0641 "${a}" \u0646\u0647\u0627\u0626\u064A\u0627\u064B\u061F \u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u062C\u0645\u064A\u0639 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0647.`))return;Loading.show("\u062C\u0627\u0631\u064A \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0637\u0637...");const s=[];typeof GoogleIntegration<"u"&&GoogleIntegration.sendRequest&&(this._fmState.items.filter(n=>n.floorPlanId===e).forEach(n=>{s.push(GoogleIntegration.sendRequest({action:"deleteEmergencyMapItem",data:{itemId:n.id}}).catch(()=>{}))}),s.push(GoogleIntegration.sendRequest({action:"deleteEmergencyFloorPlan",data:{planId:e}}).then(n=>{if(n&&n.success===!1)throw new Error(n.message||"\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641")}).catch(n=>{throw n}))),Promise.all(s).then(async()=>{Loading.hide(),this._fmInvalidateFloorPlansCache(),typeof Notification<"u"&&Notification.success&&Notification.success("\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u062E\u0637\u0637"),this._fmState.floorPlans=this._fmState.floorPlans.filter(n=>String(n.id)!==String(e)),this._fmState.items=this._fmState.items.filter(n=>n.floorPlanId!==e),await this.loadFloorPlans("");const i=document.getElementById("fm-floor-select");i&&(i.value=""),document.getElementById("fm-map-placeholder")?.classList.remove("hidden"),document.getElementById("fm-map-wrapper")?.classList.add("hidden"),document.getElementById("fm-edit-floor-btn")?.classList.add("hidden"),document.getElementById("fm-delete-floor-btn")?.classList.add("hidden"),document.getElementById("fm-viewport-bar")?.classList.add("hidden"),document.getElementById("fm-legend-sidebar")?.classList.add("hidden"),this._fmState.currentPlanId=null,this._fmUpdatePlanMeta()}).catch(i=>{Loading.hide(),typeof Notification<"u"&&Notification.error&&Notification.error("\u0641\u0634\u0644 \u0627\u0644\u062D\u0630\u0641: "+(i?.message||"\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"))})},_renderLegend(){const e=document.getElementById("fm-legend-items");e&&(e.innerHTML="",Object.entries(this.FM_ITEM_TYPES).forEach(([t,a])=>{const s=document.createElement("div");s.className="fm-legend-item",s.innerHTML=`<span class="fm-legend-icon" style="background:${a.color};"><i class="fas ${a.icon}"></i></span><span class="fm-legend-label">${a.label}</span>`,e.appendChild(s)}))}};Object.keys(Emergency).forEach(e=>{typeof Emergency[e]=="function"&&(Emergency[e]=Emergency[e].bind(Emergency))}),(function(){"use strict";try{typeof window<"u"&&typeof Emergency<"u"&&(window.Emergency=Emergency,typeof AppState<"u"&&AppState.debugMode&&typeof Utils<"u"&&Utils.safeLog&&Utils.safeLog("\u2705 Emergency module loaded and available on window.Emergency"))}catch{if(typeof window<"u"&&typeof Emergency<"u")try{window.Emergency=Emergency}catch{}}})();
