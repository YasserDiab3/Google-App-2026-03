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

    PRINT_THEMES: {
        'five-whys': { accent: '#1d4ed8', light: '#eff6ff', border: '#93c5fd', badge: '#1e40af' },
        icam: { accent: '#c2410c', light: '#fff7ed', border: '#fdba74', badge: '#9a3412' },
        fishbone: { accent: '#0f766e', light: '#f0fdfa', border: '#5eead4', badge: '#115e59' },
        'iso-barrier': { accent: '#4338ca', light: '#eef2ff', border: '#a5b4fc', badge: '#3730a3' }
    },

    getPrintStyles() {
        return `
            .rca-print-section { border-radius: 12px; padding: 20px 24px; margin-bottom: 20px; border: 2px solid; page-break-inside: avoid; }
            .rca-print-section h3 { font-size: 18px; font-weight: 700; margin: 0 0 14px; padding-bottom: 10px; border-bottom: 3px solid; }
            .rca-print-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
            .rca-print-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #fff; }
            .rca-print-badge-outline { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid; background: #fff; }
            .rca-root-box { padding: 16px 18px; border-radius: 10px; border: 2px solid #10b981; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); margin-bottom: 18px; }
            .rca-root-box .rca-root-title { font-weight: 800; color: #047857; margin-bottom: 8px; font-size: 14px; }
            .rca-root-box .rca-root-text { white-space: pre-wrap; line-height: 1.75; font-size: 13px; color: #064e3b; }
            .rca-block { background: #fff; border-radius: 10px; padding: 14px 16px; margin-bottom: 14px; border: 1px solid #e5e7eb; }
            .rca-block-title { font-weight: 700; font-size: 13px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
            .rca-block-num { width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #fff; flex-shrink: 0; }
            .rca-text-panel { white-space: pre-wrap; line-height: 1.7; font-size: 13px; color: #374151; padding: 10px 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; }
            .rca-list-print { margin: 0; padding: 0 18px 0 0; list-style: disc; }
            .rca-list-print li { margin-bottom: 6px; line-height: 1.6; font-size: 13px; }
            .rca-why-chain { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
            .rca-why-node { position: relative; padding: 12px 14px; border-radius: 10px; border: 2px solid; background: #fff; margin-bottom: 4px; }
            .rca-why-node .rca-why-label { font-size: 11px; font-weight: 800; text-transform: uppercase; margin-bottom: 6px; letter-spacing: 0.03em; }
            .rca-why-node .rca-why-text { font-size: 13px; line-height: 1.65; white-space: pre-wrap; }
            .rca-why-arrow { text-align: center; color: #9ca3af; font-size: 18px; line-height: 1; margin: 2px 0 6px; }
            .rca-why-node.rca-why-root { border-width: 3px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); }
            .rca-peeso-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
            .rca-peeso-col { border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb; background: #fff; }
            .rca-peeso-head { padding: 8px 10px; font-size: 11px; font-weight: 800; color: #fff; text-align: center; }
            .rca-peeso-body { padding: 10px; min-height: 60px; font-size: 12px; }
            .rca-peeso-body ul { margin: 0; padding: 0 14px 0 0; }
            .rca-peeso-body li { margin-bottom: 4px; line-height: 1.5; }
            .rca-fishbone-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
            .rca-fishbone-branch { border-radius: 10px; padding: 12px; border: 2px solid; background: #fff; }
            .rca-fishbone-branch-title { font-weight: 800; font-size: 12px; margin-bottom: 8px; }
            .rca-fishbone-problem { grid-column: 1 / -1; text-align: center; padding: 16px; border-radius: 12px; border: 3px solid; font-weight: 800; font-size: 14px; background: #fff; }
            .rca-flow { display: flex; flex-direction: column; gap: 0; }
            .rca-flow-step { display: flex; align-items: flex-start; gap: 12px; }
            .rca-flow-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: #fff; flex-shrink: 0; }
            .rca-flow-body { flex: 1; padding-bottom: 16px; border-right: 3px solid #e5e7eb; padding-right: 16px; margin-right: 17px; }
            .rca-flow-step:last-child .rca-flow-body { border-right: none; padding-bottom: 0; }
            .rca-flow-step-title { font-weight: 700; font-size: 13px; margin-bottom: 6px; }
            .rca-barrier-tags { display: flex; flex-wrap: wrap; gap: 8px; }
            .rca-barrier-tag { padding: 8px 12px; border-radius: 8px; font-size: 12px; border: 1px dashed; background: #fff; line-height: 1.5; }
            .rca-kv-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 8px; }
            .rca-kv { padding: 8px 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 12px; }
            .rca-kv strong { display: block; font-size: 11px; color: #6b7280; margin-bottom: 4px; }
            @media print {
                .rca-print-section { box-shadow: none !important; }
                .rca-peeso-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }
        `;
    },

    _printRootCauseBox(summary, category, esc) {
        if (!summary) return '';
        return `
            <div class="rca-root-box">
                <div class="rca-root-title">&#9670; السبب الجذري المؤكد${category ? ` — ${esc(category)}` : ''}</div>
                <div class="rca-root-text">${esc(summary)}</div>
            </div>
        `;
    },

    _printSectionHeader(methodLabel, reference, rca, theme, esc) {
        const status = rca.status === 'complete' ? 'مكتمل' : 'قيد التنفيذ';
        const statusBg = rca.status === 'complete' ? '#059669' : '#d97706';
        return `
            <h3 style="color:${theme.accent};border-color:${theme.accent};">
                5.5) تحليل السبب الجذري — ${esc(methodLabel)}
            </h3>
            <div class="rca-print-meta">
                <span class="rca-print-badge" style="background:${theme.badge};">${esc(methodLabel)}</span>
                <span class="rca-print-badge-outline" style="border-color:${theme.border};color:${theme.accent};">${esc(reference)}</span>
                <span class="rca-print-badge" style="background:${statusBg};">${esc(status)}</span>
            </div>
        `;
    },

    _printWhyChain(nodes, theme, esc, rootSummary) {
        const items = nodes.filter(n => n.text);
        if (!items.length && !rootSummary) return '';

        let html = '<div class="rca-why-chain">';
        items.forEach((node, i) => {
            if (i > 0) html += '<div class="rca-why-arrow">&#8595;</div>';
            const isLast = i === items.length - 1 && !rootSummary;
            html += `
                <div class="rca-why-node${isLast ? ' rca-why-root' : ''}" style="border-color:${isLast ? '#10b981' : theme.border};">
                    <div class="rca-why-label" style="color:${theme.accent};">${esc(node.label)}</div>
                    <div class="rca-why-text">${esc(node.text)}</div>
                </div>
            `;
        });
        if (rootSummary && items.length) html += '<div class="rca-why-arrow">&#8595;</div>';
        html += '</div>';
        return html;
    },

    _buildPrintFiveWhys(sd, rca, esc, theme) {
        const problem = sd.problem?.problem || '';
        const whys = [
            { label: 'المشكلة / الحادث', text: problem },
            { label: 'لماذا 1 — السبب المباشر', text: sd.why1?.why1 },
            { label: 'لماذا 2', text: sd.why2?.why2 },
            { label: 'لماذا 3', text: sd.why3?.why3 },
            { label: 'لماذا 4', text: sd.why4?.why4 },
            { label: 'لماذا 5', text: sd.why5?.why5 }
        ].filter(w => w.text);

        const summary = rca.rootCauseSummary || sd.rootCause?.rootCauseSummary || this.buildRootCauseSummary(rca);
        const category = rca.rootCauseCategory || sd.rootCause?.rootCauseCategory || '';

        return `
            <div class="rca-block">
                <div class="rca-block-title">
                    <span class="rca-block-num" style="background:${theme.accent};">&#8635;</span>
                    سلسلة التحليل — 5 Whys
                </div>
                ${this._printWhyChain(whys, theme, esc)}
            </div>
            ${this._printRootCauseBox(summary, category, esc)}
        `;
    },

    _buildPrintIcam(sd, rca, esc, theme) {
        const peesoCols = [
            { key: 'people', label: 'أشخاص', color: '#2563eb' },
            { key: 'equipment', label: 'معدات', color: '#7c3aed' },
            { key: 'environment', label: 'بيئة', color: '#059669' },
            { key: 'structure', label: 'هيكل', color: '#d97706' },
            { key: 'organization', label: 'منظمة', color: '#dc2626' }
        ];

        const peesoHtml = peesoCols.map(col => {
            const items = sd.contributing?.[col.key];
            const list = Array.isArray(items) && items.length
                ? `<ul>${items.map(v => `<li>${esc(v)}</li>`).join('')}</ul>`
                : '<span style="color:#9ca3af;font-size:11px;">—</span>';
            return `
                <div class="rca-peeso-col">
                    <div class="rca-peeso-head" style="background:${col.color};">${esc(col.label)}</div>
                    <div class="rca-peeso-body">${list}</div>
                </div>
            `;
        }).join('');

        const barriers = sd.barriers?.failedBarriers || rca.failedBarriers || [];
        const barriersHtml = barriers.length
            ? `<div class="rca-barrier-tags">${barriers.map(b =>
                `<span class="rca-barrier-tag" style="border-color:${theme.border};color:${theme.accent};">&#9888; ${esc(b)}</span>`
            ).join('')}</div>`
            : '<span style="color:#9ca3af;">—</span>';

        const rootList = sd.rootCauses?.rootCausesList || [];
        const summary = rca.rootCauseSummary || sd.rootCauses?.rootCauseSummary || this.buildRootCauseSummary(rca);
        const category = rca.rootCauseCategory || sd.rootCauses?.rootCauseCategory || '';

        return `
            ${sd.timeline?.timeline ? `
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">1</span>الخط الزمني للأحداث</div>
                <div class="rca-text-panel">${esc(sd.timeline.timeline)}</div>
            </div>` : ''}
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">2</span>الحواجز الفاشلة / الغائبة</div>
                ${barriersHtml}
            </div>
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">3</span>العوامل المساهمة — PEESO</div>
                <div class="rca-peeso-grid">${peesoHtml}</div>
            </div>
            ${rootList.length ? `
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">4</span>قائمة الأسباب الجذرية</div>
                <ul class="rca-list-print">${rootList.map(r => `<li>${esc(r)}</li>`).join('')}</ul>
            </div>` : ''}
            ${this._printRootCauseBox(summary, category, esc)}
        `;
    },

    _buildPrintFishbone(sd, rca, esc, theme) {
        const branches = [
            { key: 'man', label: 'Man — الإنسان', color: '#2563eb' },
            { key: 'machine', label: 'Machine — الآلات', color: '#7c3aed' },
            { key: 'method', label: 'Method — الطريقة', color: '#0891b2' },
            { key: 'material', label: 'Material — المواد', color: '#d97706' },
            { key: 'measurement', label: 'Measurement — القياس', color: '#db2777' },
            { key: 'environment', label: 'Environment — البيئة', color: '#059669' }
        ];

        const problem = sd.problem?.problem || '';
        const sixM = sd.sixM || {};

        const branchHtml = branches.map(b => {
            const items = sixM[b.key];
            const list = Array.isArray(items) && items.length
                ? `<ul class="rca-list-print" style="padding-right:14px;">${items.map(v => `<li>${esc(v)}</li>`).join('')}</ul>`
                : '<span style="color:#9ca3af;font-size:11px;">لا توجد أسباب</span>';
            return `
                <div class="rca-fishbone-branch" style="border-color:${b.color};">
                    <div class="rca-fishbone-branch-title" style="color:${b.color};">${esc(b.label)}</div>
                    ${list}
                </div>
            `;
        }).join('');

        const whys = [
            { label: 'لماذا 1', text: sd.whys?.why1 },
            { label: 'لماذا 2', text: sd.whys?.why2 },
            { label: 'لماذا 3', text: sd.whys?.why3 }
        ];

        const summary = rca.rootCauseSummary || sd.rootCause?.rootCauseSummary || this.buildRootCauseSummary(rca);
        const category = rca.rootCauseCategory || sd.rootCause?.rootCauseCategory || '';

        return `
            ${problem ? `
            <div class="rca-fishbone-problem" style="border-color:${theme.accent};color:${theme.accent};margin-bottom:14px;">
                &#9670; المشكلة: ${esc(problem)}
            </div>` : ''}
            <div class="rca-fishbone-wrap">${branchHtml}</div>
            ${sd.primaryCause?.primaryCause ? `
            <div class="rca-block" style="border:2px solid ${theme.accent};">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">&#9733;</span>السبب الرئيسي المختار</div>
                <div class="rca-text-panel">${esc(sd.primaryCause.primaryCause)}</div>
            </div>` : ''}
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">5W</span>تحليل 5 Whys على السبب الرئيسي</div>
                ${this._printWhyChain(whys, theme, esc)}
            </div>
            ${this._printRootCauseBox(summary, category, esc)}
        `;
    },

    _buildPrintIsoBarrier(sd, rca, esc, theme) {
        const steps = [
            {
                num: '1', title: 'الوقائع الموضوعية', body: sd.facts?.facts
                    ? `<div class="rca-text-panel">${esc(sd.facts.facts)}</div>` : ''
            },
            {
                num: '2', title: 'السبب المباشر', body: sd.immediate?.immediateCause ? `
                    <div class="rca-text-panel">${esc(sd.immediate.immediateCause)}</div>
                    <div class="rca-kv-row">
                        <div class="rca-kv"><strong>سلوك غير آمن</strong>${esc(sd.immediate.unsafeAct || '—')}</div>
                        <div class="rca-kv"><strong>وضع غير آمن</strong>${esc(sd.immediate.unsafeCondition || '—')}</div>
                    </div>` : ''
            },
            {
                num: '3', title: 'الحواجز الفاشلة / الغائبة',
                body: (sd.barriers?.failedBarriers || []).length
                    ? `<div class="rca-barrier-tags">${sd.barriers.failedBarriers.map(b =>
                        `<span class="rca-barrier-tag" style="border-color:${theme.border};color:${theme.accent};">&#9888; ${esc(b)}</span>`
                    ).join('')}</div>` : ''
            },
            {
                num: '4', title: 'العوامل المساهمة',
                body: (sd.contributing?.contributingFactors || []).length
                    ? `<ul class="rca-list-print">${sd.contributing.contributingFactors.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''
            },
            {
                num: '5', title: '5 Whys — التعمق',
                body: this._printWhyChain([
                    { label: 'لماذا 1', text: sd.whys?.why1 },
                    { label: 'لماذا 2', text: sd.whys?.why2 },
                    { label: 'لماذا 3', text: sd.whys?.why3 }
                ], theme, esc)
            },
            {
                num: '6', title: 'فجوة نظام الإدارة (ISO 45001)',
                body: sd.managementGap?.managementGap
                    ? `<div class="rca-kv" style="margin-top:0;border:2px solid ${theme.accent};background:${theme.light};"><strong>نوع الفجوة</strong>${esc(sd.managementGap.managementGap)}</div>` : ''
            }
        ].filter(s => s.body);

        const flowHtml = steps.map(s => `
            <div class="rca-flow-step">
                <div class="rca-flow-icon" style="background:${theme.accent};">${s.num}</div>
                <div class="rca-flow-body">
                    <div class="rca-flow-step-title" style="color:${theme.accent};">${esc(s.title)}</div>
                    ${s.body}
                </div>
            </div>
        `).join('');

        const summary = rca.rootCauseSummary || sd.managementGap?.rootCauseSummary || this.buildRootCauseSummary(rca);
        const category = rca.rootCauseCategory || sd.managementGap?.rootCauseCategory || '';

        return `
            <div class="rca-block">
                <div class="rca-block-title"><span class="rca-block-num" style="background:${theme.accent};">ISO</span>مسار التحليل — ISO 45001 + الحواجز</div>
                <div class="rca-flow">${flowHtml}</div>
            </div>
            ${this._printRootCauseBox(summary, category, esc)}
        `;
    },

    buildPrintSection(rca) {
        if (!rca || !rca.method) return '';

        const esc = (v) => this._esc(v);
        const method = this.METHODS[rca.method];
        if (!method) return '';

        const methodLabel = rca.methodLabel || method.label;
        const reference = method.reference || '';
        const theme = this.PRINT_THEMES[rca.method] || this.PRINT_THEMES['five-whys'];
        const sd = rca.stepsData || {};

        const builders = {
            'five-whys': () => this._buildPrintFiveWhys(sd, rca, esc, theme),
            icam: () => this._buildPrintIcam(sd, rca, esc, theme),
            fishbone: () => this._buildPrintFishbone(sd, rca, esc, theme),
            'iso-barrier': () => this._buildPrintIsoBarrier(sd, rca, esc, theme)
        };

        const bodyHtml = (builders[rca.method] || builders['five-whys'])();

        return `
            <div class="inv-print-section rca-print-section inv-s-rca" style="background:linear-gradient(135deg,${theme.light} 0%,#fff 100%);border-color:${theme.accent};">
                ${this._printSectionHeader(methodLabel, reference, rca, theme, esc)}
                ${bodyHtml}
            </div>
        `;
    }
};

if (typeof window !== 'undefined') {
    window.InvestigationRCA = InvestigationRCA;
}
