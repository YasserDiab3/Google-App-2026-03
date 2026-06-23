/**
 * Investigation RCA Wizard — معالج تحليل السبب الجذري
 * منهجيات: 5 Whys | ICAM | Fishbone 6M | ISO 45001 + حواجز
 */
const InvestigationRCA = {
    METHODS: {
        'five-whys': {
            id: 'five-whys',
            label: '5 Whys',
            reference: 'ISO 45001 / Toyota',
            steps: [
                { id: 'problem', title: 'تعريف المشكلة', hint: 'صف المشكلة أو الحادث بشكل واضح وموضوعي — ماذا حدث؟ أين؟ متى؟', fields: [{ id: 'problem', type: 'textarea', label: 'وصف المشكلة', required: true, rows: 4 }] },
                { id: 'why1', title: 'لماذا 1', hint: 'لماذا حدثت هذه المشكلة؟ ابحث عن السبب المباشر الأول.', fields: [{ id: 'why1', type: 'textarea', label: 'السبب المباشر الأول', required: true, rows: 3 }] },
                { id: 'why2', title: 'لماذا 2', hint: 'لماذا حدث السبب السابق؟ تعمّق مستوى واحد.', fields: [{ id: 'why2', type: 'textarea', label: 'السبب الثاني', required: true, rows: 3 }] },
                { id: 'why3', title: 'لماذا 3', hint: 'استمر في السؤال «لماذا» حتى تصل لسبب يمكن التحكم به.', fields: [{ id: 'why3', type: 'textarea', label: 'السبب الثالث', required: true, rows: 3 }] },
                { id: 'why4', title: 'لماذا 4', hint: 'هل ما زال السبب سطحياً؟ واصل التحليل.', fields: [{ id: 'why4', type: 'textarea', label: 'السبب الرابع (اختياري)', required: false, rows: 3 }] },
                { id: 'why5', title: 'لماذا 5', hint: 'السبب الجذري عادة عند مستوى نظام الإدارة أو الثقافة التنظيمية.', fields: [{ id: 'why5', type: 'textarea', label: 'السبب الخامس (اختياري)', required: false, rows: 3 }] },
                { id: 'rootCause', title: 'تأكيد السبب الجذري', hint: 'لخّص السبب الجذري النهائي وصنّفه.', fields: [
                    { id: 'rootCauseSummary', type: 'textarea', label: 'السبب الجذري المؤكد', required: true, rows: 4 },
                    { id: 'rootCauseCategory', type: 'select', label: 'تصنيف السبب', required: true, options: ['نظام إدارة', 'بشري / سلوك', 'تقني / معدات', 'بيئة عمل', 'إجراءات / تدريب', 'أخرى'] }
                ]}
            ]
        },
        icam: {
            id: 'icam',
            label: 'ICAM',
            reference: 'Incident Cause Analysis Method',
            steps: [
                { id: 'timeline', title: 'الخط الزمني للأحداث', hint: 'رتّب الأحداث زمنياً من ما سبق الحادث حتى وقوعه.', fields: [{ id: 'timeline', type: 'textarea', label: 'تسلسل الأحداث', required: true, rows: 6 }] },
                { id: 'barriers', title: 'الحواجز الفاشلة أو الغائبة', hint: 'ما الحواجز (فيزيائية، إدارية، إجرائية) التي كان يجب أن تمنع الحادث؟', fields: [{ id: 'failedBarriers', type: 'list', label: 'الحواجز', required: true, placeholder: 'مثال: حاجز واقٍ — غير موجود' }] },
                { id: 'contributing', title: 'العوامل المساهمة (PEESO)', hint: 'صنّف العوامل: أشخاص، معدات، بيئة، هيكل، منظمة.', fields: [
                    { id: 'people', type: 'list', label: 'أشخاص (People)', required: false, placeholder: 'عامل مساهم متعلق بالأشخاص' },
                    { id: 'equipment', type: 'list', label: 'معدات (Equipment)', required: false, placeholder: 'عامل مساهم متعلق بالمعدات' },
                    { id: 'environment', type: 'list', label: 'بيئة (Environment)', required: false, placeholder: 'عامل مساهم متعلق بالبيئة' },
                    { id: 'structure', type: 'list', label: 'هيكل (Structure)', required: false, placeholder: 'عامل مساهم متعلق بالهيكل' },
                    { id: 'organization', type: 'list', label: 'منظمة (Organization)', required: false, placeholder: 'عامل مساهم متعلق بالمنظمة' }
                ]},
                { id: 'rootCauses', title: 'الأسباب الجذرية', hint: 'حدد الأسباب الجذرية على مستوى نظام الإدارة — ليست أعراضاً.', fields: [
                    { id: 'rootCausesList', type: 'list', label: 'الأسباب الجذرية', required: true, placeholder: 'سبب جذري' },
                    { id: 'rootCauseSummary', type: 'textarea', label: 'ملخص السبب الجذري', required: true, rows: 4 },
                    { id: 'rootCauseCategory', type: 'select', label: 'تصنيف السبب', required: true, options: ['نظام إدارة', 'بشري / سلوك', 'تقني / معدات', 'بيئة عمل', 'إجراءات / تدريب', 'أخرى'] }
                ]}
            ]
        },
        fishbone: {
            id: 'fishbone',
            label: 'Fishbone / Ishikawa 6M',
            reference: 'تحليل سببي — 6M',
            steps: [
                { id: 'problem', title: 'المشكلة (رأس العظم)', hint: 'عرّف المشكلة أو تأثير الحادث بوضوح.', fields: [{ id: 'problem', type: 'textarea', label: 'وصف المشكلة', required: true, rows: 3 }] },
                { id: 'sixM', title: 'فروع 6M', hint: 'أدرج الأسباب المحتملة تحت كل فئة — فرع واحد على الأقل مطلوب.', fields: [
                    { id: 'man', type: 'list', label: 'Man — الإنسان', required: false, placeholder: 'سبب متعلق بالإنسان' },
                    { id: 'machine', type: 'list', label: 'Machine — الآلات', required: false, placeholder: 'سبب متعلق بالآلات' },
                    { id: 'method', type: 'list', label: 'Method — الطريقة', required: false, placeholder: 'سبب متعلق بالطريقة' },
                    { id: 'material', type: 'list', label: 'Material — المواد', required: false, placeholder: 'سبب متعلق بالمواد' },
                    { id: 'measurement', type: 'list', label: 'Measurement — القياس', required: false, placeholder: 'سبب متعلق بالقياس' },
                    { id: 'environment', type: 'list', label: 'Mother Nature — البيئة', required: false, placeholder: 'سبب متعلق بالبيئة' }
                ]},
                { id: 'primaryCause', title: 'اختيار السبب الرئيسي', hint: 'اختر السبب الأكثر احتمالاً من الفروع المدخلة.', fields: [{ id: 'primaryCause', type: 'textarea', label: 'السبب الرئيسي المختار', required: true, rows: 3 }] },
                { id: 'whys', title: 'تحليل 5 Whys على السبب الرئيسي', hint: 'طبّق 5 Whys على السبب الرئيسي للوصول للسبب الجذري.', fields: [
                    { id: 'why1', type: 'textarea', label: 'لماذا 1', required: true, rows: 2 },
                    { id: 'why2', type: 'textarea', label: 'لماذا 2', required: true, rows: 2 },
                    { id: 'why3', type: 'textarea', label: 'لماذا 3', required: true, rows: 2 }
                ]},
                { id: 'rootCause', title: 'السبب الجذري', hint: 'لخّص السبب الجذري النهائي.', fields: [
                    { id: 'rootCauseSummary', type: 'textarea', label: 'السبب الجذري المؤكد', required: true, rows: 4 },
                    { id: 'rootCauseCategory', type: 'select', label: 'تصنيف السبب', required: true, options: ['نظام إدارة', 'بشري / سلوك', 'تقني / معدات', 'بيئة عمل', 'إجراءات / تدريب', 'أخرى'] }
                ]}
            ]
        },
        'iso-barrier': {
            id: 'iso-barrier',
            label: 'ISO 45001 + تحليل الحواجز',
            reference: 'ISO 45001:2018 — بند 10.2',
            steps: [
                { id: 'facts', title: 'الوقائع الموضوعية', hint: 'ما الذي حدث فعلاً؟ بدون افتراضات أو لوم.', fields: [{ id: 'facts', type: 'textarea', label: 'الوقائع', required: true, rows: 5 }] },
                { id: 'immediate', title: 'السبب المباشر', hint: 'السلوك غير الآمن أو الوضع غير الآمن المباشر.', fields: [
                    { id: 'immediateCause', type: 'textarea', label: 'السبب المباشر', required: true, rows: 3 },
                    { id: 'unsafeAct', type: 'select', label: 'سلوك غير آمن؟', required: true, options: ['نعم', 'لا', 'غير محدد'] },
                    { id: 'unsafeCondition', type: 'select', label: 'وضع غير آمن؟', required: true, options: ['نعم', 'لا', 'غير محدد'] }
                ]},
                { id: 'barriers', title: 'تحليل الحواجز', hint: 'ما الحواجز التي فشلت أو كانت غائبة؟', fields: [{ id: 'failedBarriers', type: 'list', label: 'الحواجز الفاشلة/الغائبة', required: true, placeholder: 'وصف الحاجز' }] },
                { id: 'contributing', title: 'العوامل المساهمة', hint: 'عوامل ساعدت على وقوع الحادث دون أن تكون السبب المباشر.', fields: [{ id: 'contributingFactors', type: 'list', label: 'عوامل مساهمة', required: true, placeholder: 'عامل مساهم' }] },
                { id: 'whys', title: '5 Whys — التعمق', hint: 'اسأل «لماذا» على الأقل 3 مرات للوصول للسبب الجذري.', fields: [
                    { id: 'why1', type: 'textarea', label: 'لماذا 1', required: true, rows: 2 },
                    { id: 'why2', type: 'textarea', label: 'لماذا 2', required: true, rows: 2 },
                    { id: 'why3', type: 'textarea', label: 'لماذا 3', required: true, rows: 2 }
                ]},
                { id: 'managementGap', title: 'فجوة نظام الإدارة', hint: 'اربط السبب الجذري بفجوة في نظام إدارة السلامة والصحة المهنية.', fields: [
                    { id: 'managementGap', type: 'select', label: 'فجوة نظام الإدارة', required: true, options: ['تدريب', 'إجراءات وتعليمات', 'إشراف ومتابعة', 'صيانة ومعدات', 'تصميم هندسي', 'تواصل', 'تخطيط مخاطر', 'أخرى'] },
                    { id: 'rootCauseSummary', type: 'textarea', label: 'السبب الجذري المؤكد', required: true, rows: 4 },
                    { id: 'rootCauseCategory', type: 'select', label: 'تصنيف السبب', required: true, options: ['نظام إدارة', 'بشري / سلوك', 'تقني / معدات', 'بيئة عمل', 'إجراءات / تدريب', 'أخرى'] }
                ]}
            ]
        }
    },

    ROOT_CAUSE_CATEGORIES: ['نظام إدارة', 'بشري / سلوك', 'تقني / معدات', 'بيئة عمل', 'إجراءات / تدريب', 'أخرى'],

    _esc(v) {
        return (typeof Utils !== 'undefined' && Utils.escapeHTML)
            ? Utils.escapeHTML(String(v ?? ''))
            : String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    getMethodList() {
        return Object.values(this.METHODS).map(m => ({ id: m.id, label: m.label, reference: m.reference }));
    },

    _getState(container) {
        if (!container._rcaState) {
            container._rcaState = { method: '', currentStep: 0, stepsData: {}, startedAt: null };
        }
        return container._rcaState;
    },

    _getMethod(methodId) {
        return this.METHODS[methodId] || null;
    },

    _collectStepData(container, stepDef) {
        const data = {};
        (stepDef.fields || []).forEach(field => {
            if (field.type === 'list') {
                const items = [];
                container.querySelectorAll(`[data-rca-list="${field.id}"] .rca-list-input`).forEach(inp => {
                    const v = (inp.value || '').trim();
                    if (v) items.push(v);
                });
                data[field.id] = items;
            } else {
                const el = container.querySelector(`[data-rca-field="${field.id}"]`);
                data[field.id] = el ? (el.value || '').trim() : '';
            }
        });
        return data;
    },

    _mergeStepIntoState(state, stepId, stepData) {
        if (!state.stepsData[stepId]) state.stepsData[stepId] = {};
        Object.assign(state.stepsData[stepId], stepData);
    },

    validateStep(methodId, stepIndex, stepsData) {
        const method = this._getMethod(methodId);
        if (!method) return { valid: false, message: 'منهجية غير معروفة' };

        const step = method.steps[stepIndex];
        if (!step) return { valid: false, message: 'خطوة غير موجودة' };

        const stepData = stepsData[step.id] || {};

        for (const field of (step.fields || [])) {
            if (!field.required) continue;
            if (field.type === 'list') {
                const items = stepData[field.id];
                if (!Array.isArray(items) || items.length === 0) {
                    return { valid: false, message: `يرجى إدخال عنصر واحد على الأقل في: ${field.label}` };
                }
            } else {
                const val = stepData[field.id];
                if (!val || !String(val).trim()) {
                    return { valid: false, message: `يرجى إكمال الحقل: ${field.label}` };
                }
            }
        }

        if (methodId === 'fishbone' && step.id === 'sixM') {
            const branches = ['man', 'machine', 'method', 'material', 'measurement', 'environment'];
            const hasAny = branches.some(b => {
                const items = stepData[b];
                return Array.isArray(items) && items.length > 0;
            });
            if (!hasAny) {
                return { valid: false, message: 'يرجى إدخال سبب واحد على الأقل في فروع 6M' };
            }
        }

        if (methodId === 'icam' && step.id === 'contributing') {
            const cats = ['people', 'equipment', 'environment', 'structure', 'organization'];
            const hasAny = cats.some(c => {
                const items = stepData[c];
                return Array.isArray(items) && items.length > 0;
            });
            if (!hasAny) {
                return { valid: false, message: 'يرجى إدخال عامل مساهم واحد على الأقل (PEESO)' };
            }
        }

        return { valid: true };
    },

    suggestNextPrompt(methodId, stepIndex, priorAnswers) {
        const method = this._getMethod(methodId);
        if (!method || !method.steps[stepIndex]) return '';
        const step = method.steps[stepIndex];
        let hint = step.hint || '';

        if (methodId === 'five-whys' && stepIndex >= 1 && stepIndex <= 5) {
            const prevKey = stepIndex === 1 ? 'problem' : `why${stepIndex - 1}`;
            const prevStep = method.steps.find(s => s.id === (stepIndex === 1 ? 'problem' : `why${stepIndex - 1}`));
            const prevId = prevStep ? prevStep.fields[0].id : prevKey;
            const prevData = priorAnswers[prevStep?.id] || priorAnswers[stepIndex === 1 ? 'problem' : `why${stepIndex - 1}`] || {};
            const prevAnswer = prevData[prevId] || '';
            if (prevAnswer) {
                hint = `بناءً على: «${prevAnswer.substring(0, 80)}${prevAnswer.length > 80 ? '...' : ''}» — ${hint}`;
            }
        }

        return hint;
    },

    buildRootCauseSummary(rcaData) {
        if (!rcaData || !rcaData.stepsData) return '';

        const parts = [];
        const method = rcaData.method;
        const sd = rcaData.stepsData;

        if (rcaData.rootCauseSummary) return rcaData.rootCauseSummary;

        const findSummary = () => {
            for (const stepId of Object.keys(sd)) {
                if (sd[stepId].rootCauseSummary) return sd[stepId].rootCauseSummary;
            }
            return '';
        };

        const summary = findSummary();
        if (summary) return summary;

        if (method === 'five-whys') {
            const whys = ['why5', 'why4', 'why3', 'why2', 'why1'];
            for (const w of whys) {
                const val = sd[w]?.[`${w}`] || sd[w]?.why;
                if (val) { parts.push(val); break; }
            }
        } else if (method === 'icam') {
            const list = sd.rootCauses?.rootCausesList;
            if (Array.isArray(list) && list.length) parts.push(list.join('؛ '));
        } else if (method === 'fishbone') {
            const rc = sd.rootCause?.rootCauseSummary;
            if (rc) parts.push(rc);
            else if (sd.whys?.why3) parts.push(sd.whys.why3);
        } else if (method === 'iso-barrier') {
            const gap = sd.managementGap?.managementGap;
            const rc = sd.managementGap?.rootCauseSummary;
            if (rc) parts.push(rc);
            else if (gap) parts.push(`فجوة: ${gap}`);
        }

        return parts.join(' ') || '';
    },

    _extractContributingFactors(stepsData, methodId) {
        const factors = [];
        if (!stepsData) return factors;

        if (methodId === 'icam' && stepsData.contributing) {
            ['people', 'equipment', 'environment', 'structure', 'organization'].forEach(k => {
                const items = stepsData.contributing[k];
                if (Array.isArray(items)) factors.push(...items);
            });
        } else if (methodId === 'iso-barrier' && stepsData.contributing) {
            const items = stepsData.contributing.contributingFactors;
            if (Array.isArray(items)) factors.push(...items);
        }
        return factors;
    },

    _extractFailedBarriers(stepsData, methodId) {
        if (!stepsData) return [];
        if (methodId === 'icam' && stepsData.barriers?.failedBarriers) return stepsData.barriers.failedBarriers;
        if (methodId === 'iso-barrier' && stepsData.barriers?.failedBarriers) return stepsData.barriers.failedBarriers;
        return [];
    },

    _extractImmediateCauses(stepsData, methodId) {
        if (!stepsData) return [];
        if (methodId === 'iso-barrier' && stepsData.immediate?.immediateCause) {
            return [stepsData.immediate.immediateCause];
        }
        if (methodId === 'five-whys' && stepsData.why1?.why1) {
            return [stepsData.why1.why1];
        }
        return [];
    },

    collect(container) {
        if (!container) return null;

        const state = this._getState(container);
        const method = this._getMethod(state.method);
        if (!method) return null;

        const methodDef = method;
        const currentStepDef = methodDef.steps[state.currentStep];
        if (currentStepDef) {
            const stepData = this._collectStepData(container, currentStepDef);
            this._mergeStepIntoState(state, currentStepDef.id, stepData);
        }

        let rootCauseSummary = '';
        let rootCauseCategory = '';

        Object.values(state.stepsData).forEach(stepObj => {
            if (stepObj.rootCauseSummary) rootCauseSummary = stepObj.rootCauseSummary;
            if (stepObj.rootCauseCategory) rootCauseCategory = stepObj.rootCauseCategory;
        });

        const isLastStep = state.currentStep >= methodDef.steps.length - 1;
        const lastValidation = isLastStep
            ? this.validateStep(state.method, state.currentStep, state.stepsData)
            : { valid: false };

        const rca = {
            method: state.method,
            methodLabel: methodDef.label,
            status: (isLastStep && lastValidation.valid) ? 'complete' : 'in-progress',
            currentStep: state.currentStep,
            startedAt: state.startedAt || new Date().toISOString(),
            completedAt: (isLastStep && lastValidation.valid) ? new Date().toISOString() : null,
            stepsData: state.stepsData,
            rootCauseSummary: rootCauseSummary || this.buildRootCauseSummary({ method: state.method, stepsData: state.stepsData }),
            rootCauseCategory,
            contributingFactors: this._extractContributingFactors(state.stepsData, state.method),
            immediateCauses: this._extractImmediateCauses(state.stepsData, state.method),
            failedBarriers: this._extractFailedBarriers(state.stepsData, state.method)
        };

        return rca;
    },

    _renderListField(field, savedItems, canEdit) {
        const items = Array.isArray(savedItems) && savedItems.length ? savedItems : [''];
        const rows = items.map((item, i) => `
            <div class="rca-list-row flex gap-2 mb-2" style="display:flex;gap:8px;margin-bottom:8px;">
                <input type="text" class="form-input rca-list-input flex-1" value="${this._esc(item)}"
                    placeholder="${this._esc(field.placeholder || '')}" ${canEdit ? '' : 'disabled'}
                    style="flex:1;">
                ${canEdit ? `<button type="button" class="btn-icon btn-icon-danger rca-list-remove" title="حذف"><i class="fas fa-minus"></i></button>` : ''}
            </div>
        `).join('');

        return `
            <div data-rca-list="${field.id}" class="rca-list-field mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">${this._esc(field.label)}${field.required ? ' *' : ''}</label>
                <div class="rca-list-items">${rows}</div>
                ${canEdit ? `<button type="button" class="btn-secondary btn-sm rca-list-add" data-list-id="${field.id}" style="margin-top:6px;font-size:0.85rem;padding:6px 12px;"><i class="fas fa-plus ml-1"></i> إضافة</button>` : ''}
            </div>
        `;
    },

    _renderField(field, savedData, canEdit) {
        const val = savedData[field.id] ?? '';
        const disabled = canEdit ? '' : 'disabled';

        if (field.type === 'list') {
            return this._renderListField(field, val, canEdit);
        }
        if (field.type === 'select') {
            const opts = (field.options || []).map(o =>
                `<option value="${this._esc(o)}" ${val === o ? 'selected' : ''}>${this._esc(o)}</option>`
            ).join('');
            return `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">${this._esc(field.label)}${field.required ? ' *' : ''}</label>
                    <select data-rca-field="${field.id}" class="form-input" ${disabled}>
                        <option value="">اختر...</option>
                        ${opts}
                    </select>
                </div>
            `;
        }
        const rows = field.rows || 3;
        return `
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">${this._esc(field.label)}${field.required ? ' *' : ''}</label>
                <textarea data-rca-field="${field.id}" class="form-input" rows="${rows}" ${disabled}
                    placeholder="${this._esc(field.placeholder || '')}">${this._esc(val)}</textarea>
            </div>
        `;
    },

    _renderStepper(method, currentStep) {
        const steps = method.steps;
        const items = steps.map((s, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            const cls = done ? 'rca-step-done' : (active ? 'rca-step-active' : 'rca-step-pending');
            return `
                <div class="rca-step-item ${cls}" style="flex:1;text-align:center;position:relative;">
                    <div class="rca-step-circle" style="width:32px;height:32px;border-radius:50%;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;
                        background:${done ? '#7c3aed' : (active ? '#5b21b6' : '#e5e7eb')};color:${done || active ? '#fff' : '#6b7280'};">
                        ${done ? '<i class="fas fa-check" style="font-size:0.75rem;"></i>' : (i + 1)}
                    </div>
                    <div style="font-size:0.7rem;color:${active ? '#5b21b6' : '#6b7280'};font-weight:${active ? '700' : '500'};line-height:1.2;">${this._esc(s.title)}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="rca-stepper" style="display:flex;gap:4px;margin-bottom:20px;padding:12px;background:#faf5ff;border-radius:10px;border:1px solid #ddd6fe;">
                ${items}
            </div>
            <div style="text-align:center;font-size:0.85rem;color:#6b7280;margin-bottom:16px;">
                الخطوة ${currentStep + 1} من ${steps.length}
            </div>
        `;
    },

    _renderStepContent(method, stepIndex, stepsData, canEdit) {
        const step = method.steps[stepIndex];
        if (!step) return '';

        const saved = stepsData[step.id] || {};
        const hint = this.suggestNextPrompt(method.id, stepIndex, stepsData);

        const fieldsHtml = (step.fields || []).map(f => this._renderField(f, saved, canEdit)).join('');

        return `
            <div class="rca-step-content" data-rca-step="${step.id}">
                <h4 style="font-size:1.1rem;font-weight:700;color:#5b21b6;margin:0 0 8px;">${this._esc(step.title)}</h4>
                ${hint ? `<div class="rca-hint" style="background:#ede9fe;border:1px solid #c4b5fd;border-radius:8px;padding:12px;margin-bottom:16px;font-size:0.9rem;color:#4c1d95;"><i class="fas fa-lightbulb ml-2"></i>${this._esc(hint)}</div>` : ''}
                ${fieldsHtml}
            </div>
        `;
    },

    render(container, options = {}) {
        if (!container) return;

        const { savedRca = null, defaultDescription = '', canEdit = true } = options;
        const state = this._getState(container);

        if (savedRca) {
            state.method = savedRca.method || '';
            state.currentStep = typeof savedRca.currentStep === 'number' ? savedRca.currentStep : 0;
            state.stepsData = savedRca.stepsData ? JSON.parse(JSON.stringify(savedRca.stepsData)) : {};
            state.startedAt = savedRca.startedAt || null;
        }

        if (!state.startedAt && state.method) {
            state.startedAt = new Date().toISOString();
        }

        if (state.method === 'five-whys' && defaultDescription && !state.stepsData.problem?.problem) {
            if (!state.stepsData.problem) state.stepsData.problem = {};
            state.stepsData.problem.problem = defaultDescription;
        }
        if (state.method === 'fishbone' && defaultDescription && !state.stepsData.problem?.problem) {
            if (!state.stepsData.problem) state.stepsData.problem = {};
            state.stepsData.problem.problem = defaultDescription;
        }
        if (state.method === 'iso-barrier' && defaultDescription && !state.stepsData.facts?.facts) {
            if (!state.stepsData.facts) state.stepsData.facts = {};
            state.stepsData.facts.facts = defaultDescription;
        }

        const methodOptions = this.getMethodList().map(m =>
            `<option value="${m.id}" ${state.method === m.id ? 'selected' : ''}>${this._esc(m.label)} — ${this._esc(m.reference)}</option>`
        ).join('');

        const method = state.method ? this._getMethod(state.method) : null;
        const wizardHtml = method
            ? `${this._renderStepper(method, state.currentStep)}${this._renderStepContent(method, state.currentStep, state.stepsData, canEdit)}`
            : `<div class="text-center text-gray-500 py-8" style="padding:32px;color:#6b7280;"><i class="fas fa-route" style="font-size:2rem;margin-bottom:12px;display:block;color:#a78bfa;"></i>اختر منهجية التحليل لبدء المعالج المتسلسل</div>`;

        const navHtml = method ? `
            <div class="rca-nav flex justify-between gap-3 mt-4 pt-4" style="display:flex;justify-content:space-between;gap:12px;margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
                <button type="button" class="btn-secondary rca-btn-prev" ${state.currentStep === 0 ? 'disabled' : ''} ${canEdit ? '' : 'disabled'}>
                    <i class="fas fa-arrow-right ml-2"></i> السابق
                </button>
                ${state.currentStep < method.steps.length - 1 ? `
                    <button type="button" class="btn-primary rca-btn-next" ${canEdit ? '' : 'disabled'}>
                        التالي <i class="fas fa-arrow-left mr-2"></i>
                    </button>
                ` : `
                    <div class="rca-summary-preview" style="flex:1;text-align:left;font-size:0.85rem;color:#059669;padding:8px 12px;background:#ecfdf5;border-radius:8px;border:1px solid #a7f3d0;">
                        <i class="fas fa-check-circle ml-1"></i> آخر خطوة — أكمل الحقول ثم احفظ التحقيق
                    </div>
                `}
            </div>
        ` : '';

        container.innerHTML = `
            <style>
                .rca-wizard-wrap { direction: rtl; }
                .rca-method-select { border: 2px solid #7c3aed !important; font-weight: 600; }
            </style>
            <div class="rca-wizard-wrap">
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        <i class="fas fa-microscope ml-2" style="color:#7c3aed;"></i>
                        منهجية تحليل السبب الجذري
                    </label>
                    <select id="rca-method-select" class="form-input rca-method-select" ${canEdit ? '' : 'disabled'}>
                        <option value="">— اختر المنهجية —</option>
                        ${methodOptions}
                    </select>
                </div>
                <div id="rca-wizard-body">${wizardHtml}</div>
                ${navHtml}
            </div>
        `;
    },

    bindEvents(container, callbacks = {}) {
        if (!container) return;

        const self = this;
        const { canEdit = true, onUpdate } = callbacks;

        const rerender = () => {
            const state = self._getState(container);
            const descEl = document.getElementById('investigation-description');
            const defaultDescription = descEl ? descEl.value : '';
            self.render(container, { savedRca: {
                method: state.method,
                currentStep: state.currentStep,
                stepsData: state.stepsData,
                startedAt: state.startedAt
            }, defaultDescription, canEdit });
            self.bindEvents(container, callbacks);
            if (typeof onUpdate === 'function') onUpdate(self.collect(container));
        };

        const methodSelect = container.querySelector('#rca-method-select');
        if (methodSelect && canEdit) {
            methodSelect.addEventListener('change', (e) => {
                const newMethod = e.target.value;
                const state = self._getState(container);
                if (state.method && state.method !== newMethod && Object.keys(state.stepsData).length > 0) {
                    if (!confirm('تغيير المنهجية سيمسح البيانات المدخلة. هل تريد المتابعة؟')) {
                        e.target.value = state.method;
                        return;
                    }
                }
                state.method = newMethod;
                state.currentStep = 0;
                state.stepsData = {};
                state.startedAt = newMethod ? new Date().toISOString() : null;
                rerender();
            });
        }

        container.querySelectorAll('.rca-list-add').forEach(btn => {
            btn.addEventListener('click', () => {
                const listId = btn.getAttribute('data-list-id');
                const listWrap = container.querySelector(`[data-rca-list="${listId}"] .rca-list-items`);
                if (!listWrap) return;
                const row = document.createElement('div');
                row.className = 'rca-list-row flex gap-2 mb-2';
                row.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;';
                row.innerHTML = `
                    <input type="text" class="form-input rca-list-input flex-1" value="" style="flex:1;">
                    <button type="button" class="btn-icon btn-icon-danger rca-list-remove" title="حذف"><i class="fas fa-minus"></i></button>
                `;
                listWrap.appendChild(row);
                row.querySelector('.rca-list-remove').addEventListener('click', () => row.remove());
            });
        });

        container.querySelectorAll('.rca-list-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('.rca-list-row');
                const listWrap = btn.closest('.rca-list-items');
                if (row && listWrap && listWrap.querySelectorAll('.rca-list-row').length > 1) {
                    row.remove();
                } else if (row) {
                    row.querySelector('.rca-list-input').value = '';
                }
            });
        });

        const btnNext = container.querySelector('.rca-btn-next');
        if (btnNext && canEdit) {
            btnNext.addEventListener('click', () => {
                const state = self._getState(container);
                const method = self._getMethod(state.method);
                if (!method) return;

                const stepDef = method.steps[state.currentStep];
                const stepData = self._collectStepData(container, stepDef);
                self._mergeStepIntoState(state, stepDef.id, stepData);

                const validation = self.validateStep(state.method, state.currentStep, state.stepsData);
                if (!validation.valid) {
                    if (typeof Notification !== 'undefined') Notification.warning(validation.message);
                    else alert(validation.message);
                    return;
                }

                state.currentStep = Math.min(state.currentStep + 1, method.steps.length - 1);
                rerender();
            });
        }

        const btnPrev = container.querySelector('.rca-btn-prev');
        if (btnPrev && canEdit) {
            btnPrev.addEventListener('click', () => {
                const state = self._getState(container);
                const method = self._getMethod(state.method);
                if (!method || state.currentStep === 0) return;

                const stepDef = method.steps[state.currentStep];
                const stepData = self._collectStepData(container, stepDef);
                self._mergeStepIntoState(state, stepDef.id, stepData);

                state.currentStep = Math.max(0, state.currentStep - 1);
                rerender();
            });
        }
    },

    buildPrintSection(rca) {
        if (!rca || !rca.method) {
            return '';
        }

        const esc = (v) => this._esc(v);
        const methodLabel = rca.methodLabel || (this.METHODS[rca.method]?.label) || rca.method;
        const sd = rca.stepsData || {};

        let stepsHtml = '';
        const method = this.METHODS[rca.method];
        if (method) {
            method.steps.forEach(step => {
                const data = sd[step.id];
                if (!data) return;
                let fieldsContent = '';
                (step.fields || []).forEach(field => {
                    const val = data[field.id];
                    if (field.type === 'list' && Array.isArray(val) && val.length) {
                        fieldsContent += `<div style="margin-bottom:8px;"><strong>${esc(field.label)}:</strong><ul style="margin:4px 20px 0 0;padding:0;">${val.map(v => `<li>${esc(v)}</li>`).join('')}</ul></div>`;
                    } else if (val && field.type !== 'list') {
                        fieldsContent += `<div style="margin-bottom:8px;"><strong>${esc(field.label)}:</strong> ${esc(val)}</div>`;
                    }
                });
                if (fieldsContent) {
                    stepsHtml += `
                        <div style="margin-bottom:14px;padding:12px;background:#fff;border-radius:8px;border:1px solid #ddd6fe;">
                            <div style="font-weight:700;color:#5b21b6;margin-bottom:8px;">${esc(step.title)}</div>
                            ${fieldsContent}
                        </div>
                    `;
                }
            });
        }

        const summary = rca.rootCauseSummary || this.buildRootCauseSummary(rca);
        const category = rca.rootCauseCategory || '';

        return `
            <div class="inv-print-section inv-s-rca" style="background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%);border-color:#7c3aed;border-radius:12px;padding:20px 24px;margin-bottom:20px;border:2px solid #7c3aed;">
                <h3 style="font-size:18px;font-weight:700;margin:0 0 16px;padding-bottom:10px;border-bottom:3px solid #7c3aed;color:#5b21b6;">
                    5.5) تحليل السبب الجذري — ${esc(methodLabel)}
                </h3>
                <div style="margin-bottom:12px;font-size:0.9rem;color:#6b7280;">
                    الحالة: ${rca.status === 'complete' ? 'مكتمل' : 'قيد التنفيذ'}
                    ${category ? ` | التصنيف: ${esc(category)}` : ''}
                </div>
                ${summary ? `
                    <div style="margin-bottom:16px;padding:14px;background:#ecfdf5;border:2px solid #10b981;border-radius:8px;">
                        <div style="font-weight:700;color:#047857;margin-bottom:6px;">السبب الجذري</div>
                        <div>${esc(summary)}</div>
                    </div>
                ` : ''}
                ${stepsHtml}
            </div>
        `;
    }
};

if (typeof window !== 'undefined') {
    window.InvestigationRCA = InvestigationRCA;
}
