/**
 * HSE Field Technical Compliance & Risk Reference Guide
 * الدليل الفني الميداني لمعايير السلامة وتصنيف المخاطر لمراقبي وفنيي ICAPP
 * v1.0 — 2026-09-26
 *
 * مصمم خصيصاً لمراقبي وفنيي السلامة كمرجع تدقيق سريع وغير معطل (Zero-Dependency & Standalone):
 * - مصفوفة حسم مستويات الخطورة (Risk Level Matrix).
 * - الاشتراطات الفنية لبنود المرور اليومي (طفايات، لوحات، مخارج طوارئ).
 * - المعايير الحرجة لتصاريح العمل (LOTO, Hot Work, Confined Space, Working at Height).
 * - حدود التخزين والترتيب الصناعي 5S.
 * - إمكانية نسخ نص المعيار الفني ولصقه مباشرة داخل تقرير الملاحظة.
 */
(() => {
    'use strict';

    if (typeof window === 'undefined') return;

    // منع التكرار في حال استدعاء الملف أكثر من مرة
    if (window.HseTechnicalGuideInitialized) return;
    window.HseTechnicalGuideInitialized = true;

    try {
        /**
         * ── قاعدة البيانات الفنية لمعايير السلامة الميدانية ───────
         */
        const TECHNICAL_STANDARDS = [
            // ── 1. مصفوفة الخطورة ──
            {
                id: 'risk_high',
                category: 'risk_matrix',
                categoryLabelAr: 'مصفوفة الخطورة',
                categoryLabelEn: 'Risk Matrix',
                badge: 'خطر عالي (HIGH)',
                badgeClass: 'badge-danger',
                titleAr: 'المخاطر العالية والحرجة (High / Critical Hazards)',
                titleEn: 'High & Critical Risk Criteria',
                refStd: 'OSHA 1910 / ISO 45001 Sec 6.1.2',
                criteriaAr: [
                    'أي حالة أو سلوك يهدد بـ (وفاة، بتر أطراف، عجز دائم، حريق وشيك، تسمم غازي، انهيار هيكلي).',
                    'صلاحية الإيقاف الإلزامية: يلتزم المراقب بتفعيل (Stop Work Authority) وإيقاف العمل فوراً دون انتظار.',
                    'أمثلة ICAPP: لحام بدون تصريح معتمد بجوار كرتون أو خطوط أمونيا، عمل على ارتفاع > 1.8م بدون حزام باراشوت، تشغيل معدة معطلة الحمايات الميكانيكية، دخول مكان مغلق بدون قياس غازات.'
                ],
                recommendedActionAr: 'إيقاف فوري للعمل + عزل مصدر الخطر في الحال + إشعار مدير السلامة ورئيس الوردية.'
            },
            {
                id: 'risk_medium',
                category: 'risk_matrix',
                categoryLabelAr: 'مصفوفة الخطورة',
                categoryLabelEn: 'Risk Matrix',
                badge: 'خطر متوسط (MEDIUM)',
                badgeClass: 'badge-warning',
                titleAr: 'المخاطر المتوسطة (Medium Risk Criteria)',
                titleEn: 'Medium Risk Hazards',
                refStd: 'ISO 45001 Risk Scoring',
                criteriaAr: [
                    'حالة أو سلوك قد يؤدي إلى إصابة تستدعي علاجاً طبياً أو هدر مادي دون خطر مباشر على الحياة.',
                    'لا يستوجب بالضرورة إيقاف كامل للخط إلا إذا لم يمكن تطويق الخطر، مع تحديد مهلة قصيرة للإصلاح خلال الوردية.',
                    'أمثلة ICAPP: تلف عزل جزئي بكابل محمي، نقص مهمة وقاية ثانوية (سدادة أذن في عنبر صاخب)، تكديس كراتين على بالته بشكل مائل قليلاً لا يهدد بسقوط مفاجئ، تسريب مياه بسيط في ممر جانبي.'
                ],
                recommendedActionAr: 'إشعار مشرف القسم الفوري + وضع علامة تحذيرية + مهلة تصحيح محددة ومتابعة الإغلاق.'
            },
            {
                id: 'risk_low',
                category: 'risk_matrix',
                categoryLabelAr: 'مصفوفة الخطورة',
                categoryLabelEn: 'Risk Matrix',
                badge: 'خطر منخفض (LOW)',
                badgeClass: 'badge-info',
                titleAr: 'المخاطر المنخفضة وفرص التحسين (Low Risk / Improvement)',
                titleEn: 'Low Risk Criteria',
                refStd: '5S & General Housekeeping',
                criteriaAr: [
                    'انحراف بسيط عن المعايير لا يمثل تهديداً جسدياً مباشراً، أو فرصة تحسين تنظيمية.',
                    'أمثلة ICAPP: بطاقة فحص طفاية اقترب موعد تجديدها، إضاءة خافتة بممر فرعي غير رئيسي، ملصق إرشادي تالف، عدم إعادة أداة يدوية لمكانها المخصص بعد نهاية العمل.'
                ],
                recommendedActionAr: 'تسجيل في سجل الملاحظات للمتابعة في دورة التحسين المستمر دون تعطيل العمليات.'
            },

            // ── 2. التفتيش والمرور اليومي ──
            {
                id: 'fire_extinguishers',
                category: 'inspection',
                categoryLabelAr: 'تفتيش المرور اليومي',
                categoryLabelEn: 'Daily Tour Checks',
                badge: 'NFPA 10 / OSHA 1910.157',
                badgeClass: 'badge-danger',
                titleAr: 'معايير فحص طفايات الحريق في المرور الميداني',
                titleEn: 'Portable Fire Extinguishers Field Audit',
                refStd: 'NFPA 10 / OSHA 1910.157',
                criteriaAr: [
                    'مؤشر الضغط: يجب أن يكون المؤشر تماماً داخل النطاق الأخضر (Green Zone 10-14 bar).',
                    'الأمان والختم: مسمار/تيلة الأمان (Safety Pin) سليمة ومثبتة بالقفل البلاستيكي/الرصاصي غير المكسور.',
                    'الارتفاع عن الأرض: الطفايات حتى وزن 18 كجم (40 رطلاً) يكون مقبض الحمل على ارتفاع أقصاه 1.5 متر من الأرض. الطفايات الأثقل من 18 كجم على ارتفاع أقصاه 1.0 متر، ولا تقل المسافة السفلية عن 10 سم عن الأرضية.',
                    'الخلو والحرم: يُحظر نهائياً وضع أي عوائق أو باليتات أمام الطفاية لمسافة لا تقل عن 1 متر مربع (3 أقدام).',
                    'البطاقة الشهرية: التحقق من التوقيع والتاريخ لآخر فحص شهري سارٍ.'
                ],
                recommendedActionAr: 'أي طفاية ضغطها منخفض أو مقطوعة التيلة تُستبدل فوراً من مخزن الطوارئ ويُرسل إشعار لورشة الإطفاء.'
            },
            {
                id: 'electrical_panels',
                category: 'inspection',
                categoryLabelAr: 'تفتيش المرور اليومي',
                categoryLabelEn: 'Daily Tour Checks',
                badge: 'OSHA 1910.303(g)',
                badgeClass: 'badge-warning',
                titleAr: 'معايير لوحات وتمديدات الكهرباء الصناعية',
                titleEn: 'Electrical Panels & Sub-Distribution Safety',
                refStd: 'OSHA 1910.303 / NFPA 70',
                criteriaAr: [
                    'مساحة الخلو الإلزامية: مسافة خالية تماماً لا تقل عن 90 سم (3 أقدام) أمام اللوحة الكهربائية، وبعرض 75 سم أو عرض اللوحة أيهما أكبر.',
                    'غلق الأبواب: أبواب اللوحات مغلقة ومحكمة لمنع دخول الغبار وبخار الماء (IP Protection)، وممنوع تخزين أي أوراق أو عِدد داخلها.',
                    'فتحات الـ Knockouts: سد جميع الفتحات غير المستخدمة بأغطية معتمدة لمنع خروج الشرر أو ملامسة الأجزاء الحية.',
                    'تأريض اللوحة: سلك التأريض الرئيسي موصل بإحكام وبدون أي تراخٍ أو تآكل.'
                ],
                recommendedActionAr: 'إزالة أي باليتات أو عوائق أمام اللوحة فوراً، والإبلاغ عن أي أسلاك أو فتحات مكشوفة لفني الصيانة.'
            },
            {
                id: 'emergency_exits',
                category: 'inspection',
                categoryLabelAr: 'تفتيش المرور اليومي',
                categoryLabelEn: 'Daily Tour Checks',
                badge: 'OSHA 1910.36 / 37',
                badgeClass: 'badge-danger',
                titleAr: 'مسارات ومخارج الطوارئ وعلامات الهروب',
                titleEn: 'Means of Egress & Emergency Exits',
                refStd: 'OSHA 1910.36 / NFPA 101',
                criteriaAr: [
                    'العرض الأدنى: عرض مسار الهروب لا يقل عن 71 سم (28 بوصة) في أي نقطة، وممنوع تضييقه بالصناديق أو المنتجات.',
                    'سهولة الفتح: أبواب الطوارئ تفتح في اتجاه الهروب (للخارج) بمجرد الضغط على الكالون الهلاسي (Panic Bar)، وممنوع منعاً باتاً قفلها بمفتاح أثناء ساعات العمل.',
                    'لوحات الإرشاد (EXIT): مضيئة على مدار الساعة وتعمل بالبطارية الاحتياطية عند انقطاع التيار الكهربائي.',
                    'الإضاءة الطارئة: فحص كشافات الطوارئ والتأكد من توجيهها نحو السلالم والمخارج.'
                ],
                recommendedActionAr: 'فتح أي مخرج مغلق في التو واللحظة، وتوجيه مخالفة حرجة لأي قسم يغلق مخرج طوارئ.'
            },

            // ── 3. عزل الطاقة LOTO ──
            {
                id: 'loto_protocol',
                category: 'loto',
                categoryLabelAr: 'عزل الطاقة LOTO',
                categoryLabelEn: 'Lockout / Tagout',
                badge: 'OSHA 1910.147',
                badgeClass: 'badge-danger',
                titleAr: 'الخطوات الإلزامية لبروتوكول عزل وتأمين مصادر الطاقة',
                titleEn: 'Control of Hazardous Energy (LOTO)',
                refStd: 'OSHA 29 CFR 1910.147',
                criteriaAr: [
                    'الخطوة 1 - الإشعار: إبلاغ جميع العاملين المتأثرين في خط الإنتاج قبل البدء.',
                    'الخطوة 2 - الإيقاف: إيقاف الماكينة أو الخط بالطريقة التشغيلية الطبيعية (Stop Button).',
                    'الخطوة 3 - العزل: فصل قواطع التيار، محابس البخار، صمامات الهواء المضغوط، وخطوط السوائل.',
                    'الخطوة 4 - القفل والبطاقة: كل فني يركب قفله الشخصي الأحمر مع بطاقة بياناته (اسم، قسم، هاتف، تاريخ) على هاسب التجميع (Hasps).',
                    'الخطوة 5 - تصفير الطاقة المتبقية (Zero Energy State): تفريغ الهواء المضغوط، تنفيس البخار، إفراغ المكثفات الكهربائية، وتثبيت الأجزاء الميكانيكية المرفوعة بكتل أمان.',
                    'الخطوة 6 - التحقق بالاختبار (Verification): محاولة تشغيل المعدة من لوحة التشغيل للتأكد 100% من عدم استجابتها قبل لمس أي جزء داخلي.'
                ],
                recommendedActionAr: 'يُحظر تماماً نزع قفل أي فني آخر. لا يتم فك القفل إلا بواسطة صاحبه بعد اكتمال الصيانة وسحب العمال.'
            },

            // ── 4. تصاريح العمل PTW ──
            {
                id: 'ptw_hot_work',
                category: 'ptw',
                categoryLabelAr: 'تصاريح العمل PTW',
                categoryLabelEn: 'Permit To Work',
                badge: 'NFPA 51B / OSHA 1910.252',
                badgeClass: 'badge-warning',
                titleAr: 'اشتراطات تصريح الأعمال الساخنة (Hot Work)',
                titleEn: 'Hot Work Safety Requirements',
                refStd: 'NFPA 51B / OSHA 1910.252',
                criteriaAr: [
                    'دائرة الأمان (11 متراً / 35 قدماً): تطهير محيط 11 متراً حول نقطة اللحام أو الصاروخ من أي مواد قابلة للاشتعال (كرتون، أخشاب، مذيبات، أكياس بلاستيك)، أو تغطيتها ببطانيات مقاومة للحريق (Fire Blankets).',
                    'سد الفتحات الأرضية: تغطية فتحات الصرف والمجاري لمنع تسرب الشرر أو الغازات القابلة للاشتعال.',
                    'مراقب الحريق المخصص (Fire Watch): تواجد مراقب حريق مدرب متفرغ يحمل طفاية حريق بودرة/CO2 سارية طوال فترة العمل.',
                    'مراقبة ما بعد انتهاء العمل: التزام مراقب الحريق بالبقاء في الموقع لمدة 30 دقيقة على الأقل بعد انتهاء اللحام لرصد أي جمرات كامنة أو دخان خفي.'
                ],
                recommendedActionAr: 'إيقاف العمل فوراً وسحب التصريح إذا غادر مراقب الحريق مكانه أو لم تتوافر طفاية سارية بجواره.'
            },
            {
                id: 'ptw_confined_space',
                category: 'ptw',
                categoryLabelAr: 'تصاريح العمل PTW',
                categoryLabelEn: 'Permit To Work',
                badge: 'OSHA 1910.146',
                badgeClass: 'badge-danger',
                titleAr: 'اشتراطات دخول الأماكن المغلقة (Confined Space Entry)',
                titleEn: 'Permit-Required Confined Spaces',
                refStd: 'OSHA 29 CFR 1910.146',
                criteriaAr: [
                    'قياس الغازات الإلزامي قبل الدخول: نسبة الأكسجين O2 بين (19.5% - 23.5%)، الغازات القابلة للاشتعال LEL أقل من 10%، غاز أول أكسيد الكربون CO أقل من 25 ppm، غاز كبريتيد الهيدروجين H2S أقل من 10 ppm.',
                    'التهوية الإيجابية المستمرة: تشغيل شفاط/مروحة تهوية ميكانيكية طوال فترة تواجد الأفراد بالداخل.',
                    'المراقب الخارجي (Standby Attendant): وجود مراقب مؤهل على فتحة الدخول على اتصال مستمر بالفني بالداخل، وممنوع دخوله خلفه نهائياً تحت أي ظرف.',
                    'وسائل الإنقاذ دون دخول: ارتداء حزام باراشوت موصل بونش إنقاذ ثلاثي القوائم (Tripod & Winch) للانتشال الفوري عند الطوارئ.'
                ],
                recommendedActionAr: 'ممنوع الدخول بدون تصريح موقع ومحضر فحص غازات معتمد مسجل فيه القراءات بالساعة والتاريخ.'
            },
            {
                id: 'ptw_working_at_height',
                category: 'ptw',
                categoryLabelAr: 'تصاريح العمل PTW',
                categoryLabelEn: 'Permit To Work',
                badge: 'OSHA 1926 Subpart M',
                badgeClass: 'badge-danger',
                titleAr: 'اشتراطات العمل على ارتفاعات وحماية السقوط',
                titleEn: 'Fall Protection & Working at Heights',
                refStd: 'OSHA 1926 Subpart M',
                criteriaAr: [
                    'حد الإلزام: أي عمل على ارتفاع 1.8 متر (6 أقدام) فأكثر يستلزم نظام حماية كامل ضد السقوط.',
                    'مهمات الحماية: ارتداء حزام باراشوت كامل للجسم (Full Body Harness) مزود بحبل تثبيت ممتص للصدمات (Shock Absorbing Lanyard) بنقطة تثبيت مزدوجة (Double Lanyard 100% Tie-Off).',
                    'نقطة التثبيت (Anchor Point): يجب أن تتحمل قوة شد لا تقل عن 5000 رطل (2270 كجم / 22.2 kN) لكل عامل.',
                    'السقالات المعتمدة: وجود بطاقة فحص خضراء معتمدة (Scafftag) سارية، وتوافر حاجز علوي بارتفاع 107 سم وحاجز وسطي 53 سم وحافة سفلية لحجز المعدات (Toeboard 10 سم).'
                ],
                recommendedActionAr: 'يُحظر العمل على السقالات التي تحمل كارت أحمر أو غير المكتملة الدربزينات، ويُمنع الوقوف على البراميل أو الصناديق.'
            },

            // ── 5. التخزين والترتيب 5S ──
            {
                id: 'storage_stacking_5s',
                category: 'storage',
                categoryLabelAr: 'التخزين والترتيب 5S',
                categoryLabelEn: 'Housekeeping & Stacking',
                badge: 'OSHA 1910.176 / 5S',
                badgeClass: 'badge-info',
                titleAr: 'معايير رص وتكديس الباليتات والترتيب الصناعي',
                titleEn: 'Pallet Stacking & Warehouse Housekeeping',
                refStd: 'OSHA 1910.176 / NFPA 13',
                criteriaAr: [
                    'نسبة الارتفاع للقاعدة: أقصى ارتفاع آمن لرص الباليتات غير المربوطة يعادل 3 أضعاف عرض القاعدة (نسبة 3:1).',
                    'المسافة أسفل رشاشات الحريق (Sprinklers): ترك مسافة خالية لا تقل عن 45 سم (18 بوصة) أسفل رشاشات الحريق، و 90 سم (36 بوصة) في حالات التخزين عالي الكثافة لضمان توزيع مياه الإطفاء.',
                    'سلامة الباليتات: استبعاد أي باليته خشبية بها كسور أو تشققات أو مسامير بارزة لتفادي انهيار الرصات أثناء الرفع بالفوركلفت.',
                    'خطوط السير والممرات: الممرات المحددة بالأصفر مخصصة للمشاة والمعدات ويحظر تماماً وضع أي منتج أو كرتون أو سلة نفايات داخلها ولو مؤقتاً.'
                ],
                recommendedActionAr: 'إعادة ترتيب أي رصة مائلة فوراً وخفض ارتفاعها، وتوجيه إنذار بعدم التخزين العشوائي.'
            },

            // ── 6. مهمات الوقاية PPE ──
            {
                id: 'ppe_technical_standards',
                category: 'ppe',
                categoryLabelAr: 'مهمات الوقاية PPE',
                categoryLabelEn: 'PPE Standards',
                badge: 'ANSI / EN Standards',
                badgeClass: 'badge-info',
                titleAr: 'المواصفات الفنية المعتمدة لمهمات الوقاية الشخصية بـ ICAPP',
                titleEn: 'Personal Protective Equipment Technical Specifications',
                refStd: 'ANSI Z87.1 / Z89.1 / EN ISO 20345',
                criteriaAr: [
                    'حذاء الأمان (Safety Shoes): نعل مقاوم للانزلاق بدرجة (SRC)، ومقدمة فولاذية أو مركبة تتحمل صدمة 200 جول، وخاصية العزل الحراري/البرودة (CI) الخاصة بعمال ثلاجات التجميد (-18°C).',
                    'حماية الرأس (Safety Helmet): متوافقة مع معيار ANSI Z89.1 Type 1 Class E/G مع حزام ذقن إلزامي عند العمل على ارتفاعات.',
                    'حماية العين والوجه: نظارات حماية معتمدة ANSI Z87.1 للأعمال العادية، وقناع شفاف كامل (Face Shield) عند صب الكيماويات أو أعمال الصاروخ، وقناع عتامة متغيرة للحام.',
                    'حماية السمع: سدادات أو أغطية أذن معتمدة تخفض مستوى الضوضاء (NRR 25+) في أي قسم يتجاوز 85 ديسيبل (عنابر التعبئة والضواغط).'
                ],
                recommendedActionAr: 'استبعاد وتغيير أي مهمة وقاية تالفة فوراً، وممنوع السماح بدخول أي عامل لبيئة العمل بدون مهماته الأساسية.'
            }
        ];

        /**
         * ── دوال إنشاء واجهة الدليل الفني ───────
         */
        let guideModalEl = null;
        let floatingBtnEl = null;
        let activeCategory = 'all';

        function checkFeatureFlag() {
            if (typeof window.HseFeatureFlags !== 'undefined' && typeof window.HseFeatureFlags.isEnabled === 'function') {
                return window.HseFeatureFlags.isEnabled('glossary_overlay');
            }
            return true; // متاح افتراضياً
        }

        function createFloatingButton() {
            if (document.getElementById('hseTgFloatingBtn')) return;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'hseTgFloatingBtn';
            btn.className = 'hse-tg-float-btn';
            btn.setAttribute('aria-label', 'الدليل الفني لمعايير السلامة وتصنيف المخاطر');
            btn.title = 'الدليل الفني للمراقب وفني السلامة (Ctrl + G)';

            btn.innerHTML = `
                <div class="hse-tg-float-icon">
                    <i class="fas fa-book-bookmark"></i>
                </div>
                <div class="hse-tg-float-text">
                    <span class="hse-tg-float-main">دليل المراقب الفني</span>
                    <span class="hse-tg-float-sub">معايير وتصنيف المخاطر</span>
                </div>
            `;

            btn.onclick = (e) => {
                e.preventDefault();
                openGuideModal();
            };

            document.body.appendChild(btn);
            floatingBtnEl = btn;

            // تحديث حالة الظهور طبقاً للـ Feature Flag
            updateVisibility();
        }

        function updateVisibility() {
            const enabled = checkFeatureFlag();
            if (floatingBtnEl) {
                floatingBtnEl.style.display = enabled ? 'inline-flex' : 'none';
            }
            if (!enabled && guideModalEl && guideModalEl.classList.contains('is-open')) {
                closeGuideModal();
            }
        }

        function createGuideModal() {
            if (document.getElementById('hseTgModalBackdrop')) {
                return document.getElementById('hseTgModalBackdrop');
            }

            const backdrop = document.createElement('div');
            backdrop.id = 'hseTgModalBackdrop';
            backdrop.className = 'hse-tg-modal-backdrop';

            backdrop.innerHTML = `
                <div class="hse-tg-modal-dialog" role="dialog" aria-modal="true">
                    <!-- Modal Header -->
                    <div class="hse-tg-modal-header">
                        <div class="hse-tg-header-info">
                            <div class="hse-tg-header-badge">
                                <i class="fas fa-shield-halved"></i> ICAPP HSE TECHNICAL STANDARDS
                            </div>
                            <h3 class="hse-tg-header-title">
                                <i class="fas fa-book-bookmark text-amber-500"></i>
                                الدليل الفني لمراقبي وفنيي السلامة الميدانية
                            </h3>
                            <p class="hse-tg-header-subtitle">
                                المرجع الميداني المعتمد لحسم مستويات الخطورة، وتدقيق بنود المرور، وتصاريح العمل طبقاً لمعايير OSHA و ISO 45001.
                            </p>
                        </div>
                        <button type="button" class="hse-tg-close-btn" id="hseTgCloseBtn" title="إغلاق">&times;</button>
                    </div>

                    <!-- Search & Filter Controls -->
                    <div class="hse-tg-controls-bar">
                        <div class="hse-tg-search-wrapper">
                            <i class="fas fa-search hse-tg-search-icon"></i>
                            <input type="text" id="hseTgSearchInput" class="hse-tg-search-input" placeholder="ابحث في المعايير (مثال: طفايات، LOTO، لحام، 11 متر، خطر عالي، 5S)..." autocomplete="off" />
                            <button type="button" id="hseTgClearSearchBtn" class="hse-tg-clear-btn" style="display:none;" title="مسح">&times;</button>
                        </div>

                        <div class="hse-tg-tabs-scroll">
                            <div class="hse-tg-tabs-list" id="hseTgTabsList">
                                <button type="button" class="hse-tg-tab-btn is-active" data-cat="all">
                                    <i class="fas fa-list-check"></i> الكل (${TECHNICAL_STANDARDS.length})
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="risk_matrix">
                                    <i class="fas fa-triangle-exclamation"></i> مصفوفة الخطورة
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="inspection">
                                    <i class="fas fa-clipboard-check"></i> المرور اليومي
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="loto">
                                    <i class="fas fa-lock"></i> عزل الطاقة (LOTO)
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="ptw">
                                    <i class="fas fa-file-signature"></i> تصاريح العمل (PTW)
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="storage">
                                    <i class="fas fa-cubes-stacked"></i> التخزين و 5S
                                </button>
                                <button type="button" class="hse-tg-tab-btn" data-cat="ppe">
                                    <i class="fas fa-helmet-safety"></i> مهمات الوقاية (PPE)
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Standards Cards Body -->
                    <div class="hse-tg-modal-body" id="hseTgCardsContainer">
                        <!-- Dynamic Cards Injected Here -->
                    </div>

                    <!-- Modal Footer -->
                    <div class="hse-tg-modal-footer">
                        <div class="hse-tg-footer-note">
                            <i class="fas fa-info-circle text-blue-500"></i>
                            <span>اضغط على <b>«نسخ المعيار»</b> لنقل النص والاشتراطات مباشرة داخل تقرير الملاحظة اليومية.</span>
                        </div>
                        <button type="button" class="hse-tg-done-btn" id="hseTgDoneBtn">
                            <i class="fas fa-check"></i> إغلاق
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(backdrop);
            guideModalEl = backdrop;

            // ربط الأحداث
            setupModalEvents(backdrop);
            return backdrop;
        }

        function setupModalEvents(modal) {
            const closeBtn = modal.querySelector('#hseTgCloseBtn');
            const doneBtn = modal.querySelector('#hseTgDoneBtn');
            const searchInput = modal.querySelector('#hseTgSearchInput');
            const clearBtn = modal.querySelector('#hseTgClearSearchBtn');
            const tabsList = modal.querySelector('#hseTgTabsList');

            if (closeBtn) closeBtn.onclick = closeGuideModal;
            if (doneBtn) doneBtn.onclick = closeGuideModal;

            modal.onclick = (e) => {
                if (e.target === modal) closeGuideModal();
            };

            // البحث المباشر
            if (searchInput) {
                searchInput.oninput = () => {
                    const q = searchInput.value.trim().toLowerCase();
                    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';
                    if (q && activeCategory !== 'all') {
                        activeCategory = 'all';
                        if (tabsList) {
                            tabsList.querySelectorAll('.hse-tg-tab-btn').forEach(b => {
                                if (b.getAttribute('data-cat') === 'all') b.classList.add('is-active');
                                else b.classList.remove('is-active');
                            });
                        }
                    }
                    renderStandardsCards(q, activeCategory);
                };
            }

            if (clearBtn) {
                clearBtn.onclick = () => {
                    if (searchInput) {
                        searchInput.value = '';
                        searchInput.focus();
                    }
                    clearBtn.style.display = 'none';
                    renderStandardsCards('', activeCategory);
                };
            }

            // تبديل التبويبات
            if (tabsList) {
                tabsList.onclick = (e) => {
                    const tabBtn = e.target.closest('.hse-tg-tab-btn');
                    if (!tabBtn) return;

                    tabsList.querySelectorAll('.hse-tg-tab-btn').forEach(b => b.classList.remove('is-active'));
                    tabBtn.classList.add('is-active');

                    activeCategory = tabBtn.getAttribute('data-cat') || 'all';
                    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
                    renderStandardsCards(q, activeCategory);
                };
            }
        }

        function renderStandardsCards(query = '', category = 'all') {
            const container = document.getElementById('hseTgCardsContainer');
            if (!container) return;

            const q = (query || '').toLowerCase().trim();

            const filtered = TECHNICAL_STANDARDS.filter(item => {
                const matchCat = (category === 'all' || item.category === category);
                if (!matchCat) return false;

                if (!q) return true;

                const textToSearch = [
                    item.titleAr,
                    item.titleEn,
                    item.refStd,
                    item.badge,
                    item.recommendedActionAr,
                    ...(item.criteriaAr || [])
                ].join(' ').toLowerCase();

                return textToSearch.includes(q);
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="hse-tg-empty-state">
                        <i class="fas fa-search-minus"></i>
                        <h4>لم يتم العثور على معيار مطابق للبحث</h4>
                        <p>جرّب البحث بكلمات عامة مثل (لحام، طفاية، لوتو، كهرباء، ارتفاع، خطورة).</p>
                    </div>
                `;
                return;
            }

            let html = '';
            filtered.forEach(item => {
                const criteriaItems = (item.criteriaAr || []).map(c => `
                    <li><i class="fas fa-circle-check"></i> <span>${escapeHtml(c)}</span></li>
                `).join('');

                const textToCopy = `[معيار السلامة المعتمد: ${item.titleAr} (${item.refStd})]\n- الاشتراطات: ${item.criteriaAr.join(' | ')}\n- الإجراء المطلوب: ${item.recommendedActionAr}`;

                html += `
                    <div class="hse-tg-card" id="tgCard_${item.id}">
                        <div class="hse-tg-card-header">
                            <div class="hse-tg-card-title-group">
                                <span class="hse-tg-badge ${item.badgeClass || ''}">${escapeHtml(item.badge)}</span>
                                <h4 class="hse-tg-card-title">${escapeHtml(item.titleAr)}</h4>
                                <span class="hse-tg-card-subtitle">${escapeHtml(item.titleEn)} • <b>${escapeHtml(item.refStd)}</b></span>
                            </div>
                            <button type="button" class="hse-tg-copy-btn" onclick="HseTechnicalGuide.copyStandardText('${item.id}', this)" title="نسخ نص المعيار الفني">
                                <i class="fas fa-copy"></i> <span>نسخ المعيار</span>
                            </button>
                        </div>

                        <div class="hse-tg-card-body">
                            <div class="hse-tg-section-label">
                                <i class="fas fa-list-check text-blue-500"></i> الاشتراطات الفنية الميدانية ومعايير المطابقة:
                            </div>
                            <ul class="hse-tg-criteria-list">
                                ${criteriaItems}
                            </ul>

                            <div class="hse-tg-action-box">
                                <div class="hse-tg-action-label">
                                    <i class="fas fa-bolt-lightning text-amber-500"></i> الإجراء الميداني الفوري الموصى به:
                                </div>
                                <p class="hse-tg-action-text">${escapeHtml(item.recommendedActionAr)}</p>
                            </div>
                        </div>

                        <!-- Hidden data for copy -->
                        <textarea id="tgText_${item.id}" style="display:none;" readonly>${escapeHtml(textToCopy)}</textarea>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        function copyStandardText(standardId, btnElement) {
            const textarea = document.getElementById(`tgText_${standardId}`);
            if (!textarea) return;

            const text = textarea.value;

            // نسخ للحافظة
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopiedFeedback(btnElement);
                }).catch(() => {
                    fallbackCopy(textarea, btnElement);
                });
            } else {
                fallbackCopy(textarea, btnElement);
            }
        }

        function fallbackCopy(textarea, btnElement) {
            textarea.style.display = 'block';
            textarea.select();
            try {
                document.execCommand('copy');
                showCopiedFeedback(btnElement);
            } catch (_e) {
                // ignore
            }
            textarea.style.display = 'none';
        }

        function showCopiedFeedback(btnElement) {
            if (!btnElement) return;
            const originalHtml = btnElement.innerHTML;
            btnElement.classList.add('is-copied');
            btnElement.innerHTML = `<i class="fas fa-check"></i> <span>تم النسخ!</span>`;

            setTimeout(() => {
                btnElement.classList.remove('is-copied');
                btnElement.innerHTML = originalHtml;
            }, 1800);
        }

        function openGuideModal(filterCategory = null, searchQuery = null) {
            injectStyles();
            const modal = createGuideModal();

            if (filterCategory) {
                activeCategory = filterCategory;
                const tabsList = modal.querySelector('#hseTgTabsList');
                if (tabsList) {
                    tabsList.querySelectorAll('.hse-tg-tab-btn').forEach(b => {
                        if (b.getAttribute('data-cat') === filterCategory) {
                            b.classList.add('is-active');
                        } else {
                            b.classList.remove('is-active');
                        }
                    });
                }
            }

            const searchInput = modal.querySelector('#hseTgSearchInput');
            if (searchQuery && searchInput) {
                searchInput.value = searchQuery;
                const clearBtn = modal.querySelector('#hseTgClearSearchBtn');
                if (clearBtn) clearBtn.style.display = 'block';
            }

            const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
            renderStandardsCards(q, activeCategory);

            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';

            if (searchInput && !searchQuery) {
                setTimeout(() => searchInput.focus(), 150);
            }
        }

        function closeGuideModal() {
            if (guideModalEl) {
                guideModalEl.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        }

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        /**
         * ── أنماط CSS المدمجة والمعزولة تماماً ───────
         */
        function injectStyles() {
            if (document.getElementById('hseTechnicalGuideStyles')) return;

            const css = `
                /* ═══════════ HSE Technical Guide Styles ═══════════ */
                .hse-tg-float-btn {
                    position: fixed;
                    bottom: 22px;
                    left: 22px;
                    z-index: 99998;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, #1e293b, #0f172a);
                    color: #ffffff;
                    border: 1.5px solid rgba(59, 130, 246, 0.4);
                    border-radius: 50px;
                    padding: 8px 16px 8px 14px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
                    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.35), 0 0 15px rgba(59, 130, 246, 0.2);
                    cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                    direction: rtl;
                }
                .hse-tg-float-btn:hover {
                    transform: translateY(-2px) scale(1.02);
                    border-color: #3b82f6;
                    box-shadow: 0 14px 28px -4px rgba(15, 23, 42, 0.45), 0 0 20px rgba(59, 130, 246, 0.35);
                    background: linear-gradient(135deg, #1e3a8a, #0f172a);
                }
                .hse-tg-float-icon {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
                }
                .hse-tg-float-text {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    line-height: 1.25;
                }
                .hse-tg-float-main {
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: -0.2px;
                    color: #f8fafc;
                }
                .hse-tg-float-sub {
                    font-size: 10px;
                    color: #94a3b8;
                    font-weight: 600;
                }

                @media (max-width: 640px) {
                    .hse-tg-float-btn {
                        bottom: 16px;
                        left: 14px;
                        padding: 8px 12px;
                    }
                    .hse-tg-float-sub {
                        display: none;
                    }
                }

                /* Backdrop & Modal */
                .hse-tg-modal-backdrop {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(15, 23, 42, 0.78);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 16px;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.25s ease, visibility 0.25s ease;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Arabic', sans-serif;
                    direction: rtl;
                }
                .hse-tg-modal-backdrop.is-open {
                    opacity: 1;
                    visibility: visible;
                }
                .hse-tg-modal-dialog {
                    background: #ffffff;
                    color: #0f172a;
                    border-radius: 20px;
                    width: 100%;
                    max-width: 860px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    overflow: hidden;
                    transform: scale(0.96);
                    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .hse-tg-modal-backdrop.is-open .hse-tg-modal-dialog {
                    transform: scale(1);
                }

                /* Header */
                .hse-tg-modal-header {
                    padding: 18px 24px;
                    background: linear-gradient(135deg, #0f172a, #1e293b);
                    color: #ffffff;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .hse-tg-header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: 800;
                    background: rgba(59, 130, 246, 0.2);
                    color: #60a5fa;
                    padding: 3px 10px;
                    border-radius: 50px;
                    border: 1px solid rgba(96, 165, 250, 0.3);
                    margin-bottom: 6px;
                }
                .hse-tg-header-title {
                    font-size: 1.15rem;
                    font-weight: 800;
                    margin: 0 0 4px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .hse-tg-header-subtitle {
                    font-size: 12px;
                    color: #94a3b8;
                    margin: 0;
                    line-height: 1.4;
                }
                .hse-tg-close-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    color: #e2e8f0;
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    font-size: 22px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s ease;
                }
                .hse-tg-close-btn:hover {
                    background: #ef4444;
                    color: #ffffff;
                    border-color: #ef4444;
                }

                /* Controls bar */
                .hse-tg-controls-bar {
                    padding: 14px 20px;
                    background: #f8fafc;
                    border-bottom: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .hse-tg-search-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .hse-tg-search-icon {
                    position: absolute;
                    right: 14px;
                    color: #64748b;
                    font-size: 14px;
                }
                .hse-tg-search-input {
                    width: 100%;
                    padding: 10px 42px 10px 36px;
                    background: #ffffff;
                    border: 1.5px solid #cbd5e1;
                    border-radius: 12px;
                    font-size: 13.5px;
                    color: #0f172a;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }
                .hse-tg-search-input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
                }
                .hse-tg-clear-btn {
                    position: absolute;
                    left: 12px;
                    background: transparent;
                    border: none;
                    font-size: 18px;
                    color: #94a3b8;
                    cursor: pointer;
                }

                /* Tabs */
                .hse-tg-tabs-scroll {
                    overflow-x: auto;
                    scrollbar-width: thin;
                    padding-bottom: 2px;
                }
                .hse-tg-tabs-list {
                    display: flex;
                    gap: 8px;
                    white-space: nowrap;
                }
                .hse-tg-tab-btn {
                    background: #ffffff;
                    border: 1px solid #cbd5e1;
                    color: #475569;
                    font-size: 12.5px;
                    font-weight: 700;
                    padding: 6px 14px;
                    border-radius: 50px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: all 0.15s ease;
                }
                .hse-tg-tab-btn:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                    border-color: #94a3b8;
                }
                .hse-tg-tab-btn.is-active {
                    background: #2563eb;
                    color: #ffffff;
                    border-color: #2563eb;
                    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
                }

                /* Cards Container */
                .hse-tg-modal-body {
                    padding: 16px 20px;
                    overflow-y: auto;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    background: #f8fafc;
                }
                .hse-tg-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 16px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    transition: transform 0.15s, box-shadow 0.15s;
                }
                .hse-tg-card:hover {
                    border-color: #cbd5e1;
                    box-shadow: 0 4px 12px -2px rgba(0,0,0,0.08);
                }
                .hse-tg-card-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 12px;
                    margin-bottom: 12px;
                    padding-bottom: 10px;
                    border-bottom: 1px dashed #e2e8f0;
                }
                .hse-tg-card-title-group {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .hse-tg-card-title {
                    font-size: 14.5px;
                    font-weight: 800;
                    color: #0f172a;
                    margin: 0;
                }
                .hse-tg-card-subtitle {
                    font-size: 11.5px;
                    color: #64748b;
                }
                .hse-tg-badge {
                    display: inline-block;
                    font-size: 10.5px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 6px;
                    margin-bottom: 4px;
                    width: fit-content;
                }
                .hse-tg-badge.badge-danger {
                    background: #fee2e2;
                    color: #b91c1c;
                    border: 1px solid #fca5a5;
                }
                .hse-tg-badge.badge-warning {
                    background: #fef3c7;
                    color: #b45309;
                    border: 1px solid #fcd34d;
                }
                .hse-tg-badge.badge-info {
                    background: #e0f2fe;
                    color: #0369a1;
                    border: 1px solid #7dd3fc;
                }

                .hse-tg-copy-btn {
                    background: #f1f5f9;
                    border: 1px solid #cbd5e1;
                    color: #334155;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 6px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                    transition: all 0.15s ease;
                }
                .hse-tg-copy-btn:hover {
                    background: #e2e8f0;
                    color: #0f172a;
                }
                .hse-tg-copy-btn.is-copied {
                    background: #10b981;
                    color: #ffffff;
                    border-color: #10b981;
                }

                .hse-tg-section-label {
                    font-size: 12.5px;
                    font-weight: 800;
                    color: #334155;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-criteria-list {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 12px 0;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .hse-tg-criteria-list li {
                    font-size: 13px;
                    color: #1e293b;
                    line-height: 1.5;
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                }
                .hse-tg-criteria-list li i {
                    color: #10b981;
                    margin-top: 3px;
                    font-size: 13px;
                    flex-shrink: 0;
                }

                .hse-tg-action-box {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-right: 4px solid #f59e0b;
                    border-radius: 8px;
                    padding: 10px 14px;
                }
                .hse-tg-action-label {
                    font-size: 12px;
                    font-weight: 800;
                    color: #b45309;
                    margin-bottom: 3px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-action-text {
                    font-size: 12.5px;
                    font-weight: 600;
                    color: #334155;
                    margin: 0;
                    line-height: 1.4;
                }

                .hse-tg-empty-state {
                    text-align: center;
                    padding: 40px 20px;
                    color: #94a3b8;
                }
                .hse-tg-empty-state i {
                    font-size: 2.5rem;
                    margin-bottom: 12px;
                    opacity: 0.6;
                }
                .hse-tg-empty-state h4 {
                    font-size: 15px;
                    font-weight: 800;
                    color: #475569;
                    margin: 0 0 6px 0;
                }
                .hse-tg-empty-state p {
                    font-size: 13px;
                    margin: 0;
                }

                /* Footer */
                .hse-tg-modal-footer {
                    padding: 12px 20px;
                    background: #ffffff;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                .hse-tg-footer-note {
                    font-size: 12px;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .hse-tg-done-btn {
                    background: #0f172a;
                    color: #ffffff;
                    border: none;
                    border-radius: 10px;
                    padding: 8px 18px;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    transition: background 0.15s ease;
                }
                .hse-tg-done-btn:hover {
                    background: #1e293b;
                }

                /* Dark Theme Support */
                body.theme-dark .hse-tg-modal-dialog,
                body.dark-mode .hse-tg-modal-dialog,
                [data-theme="dark"] .hse-tg-modal-dialog {
                    background: #0f172a;
                    color: #f8fafc;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-controls-bar,
                body.dark-mode .hse-tg-controls-bar,
                [data-theme="dark"] .hse-tg-controls-bar {
                    background: #1e293b;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-search-input,
                body.dark-mode .hse-tg-search-input,
                [data-theme="dark"] .hse-tg-search-input {
                    background: #0f172a;
                    border-color: #475569;
                    color: #f8fafc;
                }
                body.theme-dark .hse-tg-tab-btn,
                body.dark-mode .hse-tg-tab-btn,
                [data-theme="dark"] .hse-tg-tab-btn {
                    background: #0f172a;
                    border-color: #475569;
                    color: #cbd5e1;
                }
                body.theme-dark .hse-tg-modal-body,
                body.dark-mode .hse-tg-modal-body,
                [data-theme="dark"] .hse-tg-modal-body {
                    background: #090d16;
                }
                body.theme-dark .hse-tg-card,
                body.dark-mode .hse-tg-card,
                [data-theme="dark"] .hse-tg-card {
                    background: #0f172a;
                    border-color: #1e293b;
                }
                body.theme-dark .hse-tg-card-title,
                body.dark-mode .hse-tg-card-title,
                [data-theme="dark"] .hse-tg-card-title {
                    color: #f8fafc;
                }
                body.theme-dark .hse-tg-criteria-list li,
                body.dark-mode .hse-tg-criteria-list li,
                [data-theme="dark"] .hse-tg-criteria-list li {
                    color: #cbd5e1;
                }
                body.theme-dark .hse-tg-action-box,
                body.dark-mode .hse-tg-action-box,
                [data-theme="dark"] .hse-tg-action-box {
                    background: #1e293b;
                    border-color: #334155;
                }
                body.theme-dark .hse-tg-action-text,
                body.dark-mode .hse-tg-action-text,
                [data-theme="dark"] .hse-tg-action-text {
                    color: #e2e8f0;
                }
                body.theme-dark .hse-tg-modal-footer,
                body.dark-mode .hse-tg-modal-footer,
                [data-theme="dark"] .hse-tg-modal-footer {
                    background: #0f172a;
                    border-color: #334155;
                }
            `;

            const style = document.createElement('style');
            style.id = 'hseTechnicalGuideStyles';
            style.textContent = css;
            document.head.appendChild(style);
        }

        /**
         * إعداد الاختصار والمستمعات
         */
        function setupShortcuts() {
            window.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
                    e.preventDefault();
                    if (guideModalEl && guideModalEl.classList.contains('is-open')) {
                        closeGuideModal();
                    } else {
                        openGuideModal();
                    }
                }
            });

            // الاستماع لتغيير الـ Feature Flag
            if (window.HseFeatureFlags && typeof window.HseFeatureFlags.subscribe === 'function') {
                window.HseFeatureFlags.subscribe('glossary_overlay', (_enabled) => {
                    updateVisibility();
                });
            }
        }

        // التهيئة الآمنة بعد اكتمال الـ DOM
        function init() {
            try {
                injectStyles();
                createFloatingButton();
                setupShortcuts();
            } catch (err) {
                console.warn('[HSE Technical Guide] Initialized safely with note:', err);
            }
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        // واجهة الـ API العامة
        const api = {
            open: openGuideModal,
            close: closeGuideModal,
            copyStandardText: copyStandardText,
            getStandards: () => [...TECHNICAL_STANDARDS]
        };

        window.HseTechnicalGuide = api;
        window.HseGlossary = api;
        window.HSE_GUIDE = api;

    } catch (criticalErr) {
        console.warn('[HSE Technical Guide] Safe fallback, isolated error:', criticalErr);
    }
})();
