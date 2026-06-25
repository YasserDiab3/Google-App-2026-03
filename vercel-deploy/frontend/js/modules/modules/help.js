/**
 * Help Module — دليل النظام التفاعلي
 */
const Help = {
    state: {
        activeCategory: 'all',
        searchQuery: '',
        expandedId: null
    },

    getCategories() {
        return [
            { id: 'all', label: 'الكل', icon: 'fa-border-all' },
            { id: 'overview', label: 'نظرة عامة', icon: 'fa-compass' },
            { id: 'getting-started', label: 'بدء الاستخدام', icon: 'fa-rocket' },
            { id: 'permissions', label: 'الصلاحيات', icon: 'fa-user-shield' },
            { id: 'modules', label: 'دليل الموديولات', icon: 'fa-th-large' },
            { id: 'reports', label: 'التقارير والتحليل', icon: 'fa-chart-line' },
            { id: 'technical', label: 'الدعم التقني', icon: 'fa-wrench' },
            { id: 'faq', label: 'أسئلة شائعة', icon: 'fa-circle-question' }
        ];
    },

    getModuleHelpDetails() {
        return {
            dashboard: {
                purpose: 'لوحة مركزية تعرض ملخصاً لأهم مؤشرات السلامة والصحة المهنية والبيئة.',
                features: ['إحصائيات الزيارات والحوادث والتصاريح', 'بطاقات KPI سريعة', 'ويدجت التقارير', 'تنبيهات ومهام معلقة'],
                workflow: ['افتح لوحة التحكم بعد تسجيل الدخول', 'راجع البطاقات الإحصائية', 'انقر على أي بطاقة للانتقال للموديول المرتبط'],
                tips: ['حدّث الصفحة بعد المزامنة لرؤية أحدث الأرقام', 'استخدمها كنقطة انطلاق يومية']
            },
            profile: {
                purpose: 'إدارة بياناتك الشخصية وكلمة المرور والمصادقة الثنائية.',
                features: ['تعديل الاسم والبيانات', 'تغيير كلمة المرور', 'تفعيل/تعطيل MFA (TOTP)', 'عرض دورك في النظام'],
                workflow: ['افتح «ملفي الشخصي» من القائمة', 'عدّل البيانات أو كلمة المرور', 'فعّل MFA من قسم الأمان إن طُلب منك'],
                tips: ['احفظ رموز الاسترداد بعد تفعيل MFA', 'الموديول متاح لكل مستخدم مسجّل']
            },
            users: {
                purpose: 'إدارة حسابات المستخدمين وصلاحياتهم (مدير النظام).',
                features: ['إضافة وتعديل المستخدمين', 'منح صلاحيات الموديولات', 'الصلاحيات التفصيلية داخل الموديول', 'تعيين الأدوار'],
                workflow: ['افتح إدارة المستخدمين', 'اختر مستخدماً أو أضف جديداً', 'حدّد الموديولات المسموحة واحفظ'],
                tips: ['امنح أقل صلاحيات لازمة', 'راجع الصلاحيات دورياً عند تغيير المهام'],
                permissionsNote: 'مخصص لمدير النظام أو من يُمنح صلاحية users صراحةً.'
            },
            'user-tasks': {
                purpose: 'متابعة المهام المسندة للمستخدمين وإنجازها.',
                features: ['قائمة مهام شخصية', 'حالات المهام', 'فلترة وبحث', 'ربط بالموديولات'],
                workflow: ['افتح مهام المستخدمين', 'راجع المهام المعلقة', 'حدّث الحالة عند الإنجاز'],
                tips: ['تحقق يومياً من المهام الجديدة']
            },
            employees: {
                purpose: 'قاعدة بيانات مركزية للموظفين تُستخدم في الموديولات الأخرى.',
                features: ['سجل الموظفين', 'الإدارات والأقسام', 'بحث سريع', 'تصدير البيانات'],
                workflow: ['أضف أو حدّث بيانات الموظف', 'اربط السجل بالزيارات والتدريب والحوادث'],
                tips: ['حافظ على دقة البريد والقسم لتقارير أفضل']
            },
            incidents: {
                purpose: 'تسجيل ومتابعة الحوادث والتحقيقات.',
                features: ['تسجيل حادث جديد', 'التحقيق وRCA', 'المرفقات', 'التقارير والإحصائيات'],
                workflow: ['سجّل الحادث فوراً', 'أكمل بيانات التحقيق', 'تابع الإجراءات التصحيحية'],
                tips: ['أرفق صوراً وشهوداً عند الإمكان', 'حدّث الحالة بانتظام']
            },
            nearmiss: {
                purpose: 'توثيق الحوادث الوشيكة والسلوكيات غير الآمنة قبل وقوع إصابة.',
                features: ['أنواع متعددة (وشيك، غير آمن، مقترح)', 'فلترة بالتاريخ والقسم', 'مرفقات', 'تصدير'],
                workflow: ['سجّل الملاحظة', 'صنّف النوع والموقع', 'احفظ وشارك الفريق'],
                tips: ['الإبلاغ المبكر يمنع حوادث حقيقية']
            },
            ptw: {
                purpose: 'إصدار ومتابعة تصاريح العمل عالية المخاطر.',
                features: ['نماذج تصريح متعددة', 'خريطة المواقع', 'سلسلة موافقات', 'طباعة وتصدير PDF'],
                workflow: ['أنشئ تصريحاً جديداً', 'أكمل بيانات العمل والمخاطر', 'احصل على الموافقات ثم ابدأ العمل'],
                tips: ['لا تبدأ العمل قبل اكتمال الموافقات', 'راجع صلاحية التصريح يومياً']
            },
            'issuing-authorities': {
                purpose: 'إدارة قائمة المصرّح لهم بالتوقيع على تصاريح العمل.',
                features: ['تعيين الموقّعين', 'ربط بالإدارات', 'صلاحيات التوقيع'],
                workflow: ['حدّد المصرّحين', 'اربطهم بتصاريح العمل المناسبة'],
                tips: ['حدّث القائمة عند تغيير المسؤوليات'],
                permissionsNote: 'للمدير أو من يُمنح صلاحية issuing-authorities.'
            },
            training: {
                purpose: 'إدارة برامج التدريب وسجلات الحضور والشهادات.',
                features: ['دورات تدريبية', 'سجل المتدربين', 'تقارير الإنجاز', 'تنبيهات انتهاء'],
                workflow: ['أنشئ دورة', 'سجّل الحضور', 'صدّر التقارير الدورية'],
                tips: ['اربط التدريب الإلزامي بالموظفين الجدد']
            },
            clinic: {
                purpose: 'إدارة العيادة الطبية: زيارات، أدوية، إجازات مرضية، وإصابات.',
                features: ['سجل التردد', 'مخزون الأدوية والصرف', 'الإجازات المرضية', 'تحليل البيانات والأدوية الأكثر استهلاكاً'],
                workflow: ['سجّل زيارة', 'صرف دواء إن لزم', 'أصدر إجازة أو سجّل إصابة', 'راجع التحليلات شهرياً'],
                tips: ['انتظر اكتمال تحميل سجل التردد قبل التبويبات الثانوية', 'راجع تنبيهات المخزون المنخفض']
            },
            'fire-equipment': {
                purpose: 'متابعة معدات الإطفاء والفحوصات والصيانة.',
                features: ['سجل المعدات', 'تواريخ الفحص', 'تنبيهات الانتهاء', 'تقارير الحالة'],
                workflow: ['أضف المعدات', 'سجّل الفحوص الدورية', 'عالج البنود المنتهية'],
                tips: ['فعّل التنبيهات قبل انتهاء الصلاحية']
            },
            'periodic-inspections': {
                purpose: 'جدولة وتنفيذ الفحوصات الدورية للمواقع والمعدات.',
                features: ['خطط فحص', 'قوائم تحقق', 'نتائج الفحص', 'متابعة الإجراءات'],
                workflow: ['أنشئ خطة فحص', 'نفّذ الزيارة', 'سجّل النتائج والملاحظات'],
                tips: ['وثّق الصور للملاحظات الحرجة']
            },
            ppe: {
                purpose: 'إدارة مهمات الوقاية الشخصية والتوزيع.',
                features: ['مخزون PPE', 'صرف للموظفين', 'تتبع الكميات', 'تقارير'],
                workflow: ['حدّث المخزون', 'سجّل الصرف', 'راجع الاستهلاك'],
                tips: ['اربط الصرف بقاعدة الموظفين']
            },
            violations: {
                purpose: 'تسجيل ومتابعة مخالفات السلامة.',
                features: ['سجل مخالفات', 'تصنيف بالخطورة', 'إجراءات تصحيحية', 'تقارير'],
                workflow: ['سجّل المخالفة', 'حدّد الإجراء', 'تابع الإغلاق'],
                tips: ['كن محدداً في الوصف والموقع']
            },
            contractors: {
                purpose: 'إدارة بيانات المقاولين وعمالهم وزياراتهم.',
                features: ['سجل المقاولين', 'العمال', 'التقييمات', 'ربط بالعيادة والتصاريح'],
                workflow: ['أضف مقاولاً', 'سجّل العمال', 'تابع الالتزام بالسلامة'],
                tips: ['حدّث بيانات العمال قبل الزيارات']
            },
            'behavior-monitoring': {
                purpose: 'مراقبة وتسجيل السلوكيات الآمنة وغير الآمنة.',
                features: ['ملاحظات سلوكية', 'تصنيف', 'إحصائيات', 'تقارير'],
                workflow: ['سجّل الملاحظة', 'صنّف السلوك', 'شارك مع الإدارة'],
                tips: ['ركّز على التحسين لا العقاب فقط']
            },
            'chemical-safety': {
                purpose: 'إدارة المواد الكيميائية وبطاقات السلامة MSDS.',
                features: ['سجل المواد', 'بطاقات البيانات', 'مواقع التخزين', 'تقييم المخاطر'],
                workflow: ['أضف مادة', 'أرفق MSDS', 'حدّد إجراءات الطوارئ'],
                tips: ['راجع التوافق مع مواقع التخزين']
            },
            'daily-observations': {
                purpose: 'تسجيل الملاحظات اليومية للسلامة في الموقع.',
                features: ['ملاحظات يومية', 'صور', 'متابعة الإغلاق', 'تحليلات'],
                workflow: ['سجّل ملاحظة', 'أرفق دليلاً', 'تابع حتى الإغلاق'],
                tips: ['الملاحظة اليومية أفضل من التقرير الشهري المتأخر']
            },
            'safety-calendar': {
                purpose: 'تقويم أحداث ومهام السلامة والتدريبات والفحوصات.',
                features: ['عرض شهري', 'تذكيرات', 'ربط بالأنشطة', 'تصدير'],
                workflow: ['أضف حدثاً', 'عيّن المسؤول', 'تابع التنفيذ'],
                tips: ['زامن التقويم مع خطط التدريب']
            },
            iso: {
                purpose: 'إدارة وثائق ومتطلبات نظام ISO للسلامة والجودة.',
                features: ['سجل الوثائق', 'الإجراءات', 'المراجعات', 'مؤشرات الامتثال'],
                workflow: ['أضف وثيقة', 'حدّد المراجعات', 'تابع التحديثات'],
                tips: ['احفظ إصدارات الوثائق بوضوح']
            },
            emergency: {
                purpose: 'إدارة تنبيهات وخطط الطوارئ والتنبيهات الفورية.',
                features: ['تنبيهات', 'خطط الطوارئ', 'جهات الاتصال', 'سجل التفعيل'],
                workflow: ['حدّث خطة الطوارئ', 'اختبر التنبيهات', 'وثّق التمارين'],
                tips: ['راجع أرقام الطوارئ ربع سنوياً']
            },
            'risk-assessment': {
                purpose: 'تقييم المخاطر وتحديد الضوابط قبل بدء الأعمال.',
                features: ['نماذج تقييم', 'مستويات الخطورة', 'إجراءات التحكم', 'مراجعة دورية'],
                workflow: ['حدّد النشاط', 'قيّم المخاطر', 'طبّق الضوابط', 'راجع عند التغيير'],
                tips: ['أعد التقييم عند تغيير العملية']
            },
            'sop-jha': {
                purpose: 'إجراءات التشغيل الآمنة وتحليل مخاطر المهام (JHA).',
                features: ['SOP', 'JHA', 'خطوات العمل', 'معدات الحماية المطلوبة'],
                workflow: ['أنشئ إجراءاً', 'حلّل خطوات المهمة', 'انشر للفريق الميداني'],
                tips: ['اجعل الإجراءات قصيرة وواضحة']
            },
            'legal-documents': {
                purpose: 'أرشفة الوثائق القانونية والتراخيص والشهادات الرسمية.',
                features: ['رفع وثائق', 'تواريخ الانتهاء', 'تنبيهات', 'بحث'],
                workflow: ['أضف وثيقة', 'حدّد تاريخ الانتهاء', 'تابع التجديد'],
                tips: ['فعّل تنبيهات قبل 30 يوماً من الانتهاء']
            },
            sustainability: {
                purpose: 'متابعة مبادرات الاستدامة والبيئة.',
                features: ['مؤشرات بيئية', 'مشاريع', 'تقارير', 'أهداف'],
                workflow: ['سجّل المبادرة', 'تابع المؤشرات', 'صدّر التقرير'],
                tips: ['اربط المؤشرات بأهداف سنوية']
            },
            'safety-budget': {
                purpose: 'تخطيط ميزانية السلامة وتتبع الإنفاق.',
                features: ['بنود الميزانية', 'مصروفات فعلية', 'مقارنة الخطة بالفعل', 'تقارير'],
                workflow: ['عرّف البنود', 'سجّل المصروفات', 'راجع الفروقات شهرياً'],
                tips: ['وثّق كل مصروف بمرجع']
            },
            'ai-assistant': {
                purpose: 'مساعد ذكي للإجابة عن أسئلة السلامة واستخدام النظام.',
                features: ['محادثة تفاعلية', 'اقتراحات', 'مساعدة سياقية'],
                workflow: ['افتح المساعد', 'اطرح سؤالك', 'طبّق الإرشادات'],
                tips: ['تحقق من الإجابات الحرجة مع مسئول السلامة']
            },
            'safety-performance-kpis': {
                purpose: 'مؤشرات أداء إدارة السلامة والصحة المهنية.',
                features: ['KPIs رئيسية', 'خطط سنوية', 'متابعة شهرية', 'لوحات عرض'],
                workflow: ['حدّد المؤشرات', 'أدخل القيم', 'راجع الاتجاهات'],
                tips: ['اربط KPI بالأهداف الاستراتيجية']
            },
            'kpi-annual-plan': {
                purpose: 'الخطة السنوية لتحقيق مؤشرات الأداء.',
                features: ['أهداف سنوية', 'توزيع شهري', 'متابعة الإنجاز'],
                workflow: ['عرّف الأهداف', 'وزّع على الأشهر', 'راجع شهرياً'],
                tips: ['جزء من موديول مؤشرات الأداء'],
                permissionsNote: 'يتبع صلاحية safety-performance-kpis.'
            },
            'hse-monitoring-plan': {
                purpose: 'خطة متابعة أنشطة HSE المجدولة.',
                features: ['أنشطة المتابعة', 'مسؤوليات', 'حالات التنفيذ'],
                workflow: ['أنشئ الخطة', 'عيّن المسؤولين', 'تابع التنفيذ'],
                tips: ['زامن مع تقويم السلامة'],
                permissionsNote: 'يتبع صلاحية safety-performance-kpis.'
            },
            'safety-health-management': {
                purpose: 'إدارة هيكل وفريق السلامة والصحة المهنية.',
                features: ['هيكل الإدارة', 'المسؤوليات', 'الاجتماعات', 'الخطط'],
                workflow: ['حدّث الهيكل', 'وثّق الاجتماعات', 'تابع القرارات'],
                tips: ['حدّث الفريق عند تغيير التعيينات']
            },
            settings: {
                purpose: 'إعدادات الشركة والنظام والتخصيص العام.',
                features: ['بيانات الشركة والشعار', 'الأقسام والمواقع', 'إعدادات النماذج', 'تفضيلات النظام'],
                workflow: ['افتح الإعدادات', 'عدّل القسم المطلوب', 'احفظ التغييرات'],
                tips: ['غيّر الإعدادات بحذر — تؤثر على كل الموديولات'],
                permissionsNote: 'للمدير أو من يُمنح صلاحية settings.'
            },
            'action-tracking': {
                purpose: 'سجل مركزي لمتابعة الإجراءات التصحيحية والوقائية.',
                features: ['إجراءات مفتوحة', 'مسؤول ومتابعة', 'تواريخ استحقاق', 'إغلاق وتحقق'],
                workflow: ['سجّل إجراءاً', 'عيّن مسؤولاً', 'تابع حتى الإغلاق'],
                tips: ['اربط الإجراء بالحادث أو الملاحظة المصدر']
            },
            'issue-tracking': {
                purpose: 'تتبع المشاكل التقنية والتشغيلية في النظام أو العمليات.',
                features: ['تسجيل مشكلة', 'أولوية وحالة', 'تعليقات', 'إغلاق'],
                workflow: ['أبلغ عن مشكلة', 'تابع الحالة', 'أكد الحل'],
                tips: ['أرفق لقطات شاشة للمشاكل التقنية']
            },
            'change-management': {
                purpose: 'إدارة التغييرات في العمليات والمعدات بشكل منضبط.',
                features: ['طلب تغيير', 'تقييم المخاطر', 'موافقات', 'تنفيذ ومتابعة'],
                workflow: ['قدّم طلب تغيير', 'قيّم المخاطر', 'نفّذ بعد الموافقة'],
                tips: ['لا تُنفّذ تغييرات حرجة دون موافقة']
            },
            reports: {
                purpose: 'تقارير مجمّعة عبر موديولات النظام.',
                features: ['تقارير جاهزة', 'فلترة بالفترة', 'تصدير Excel/PDF', 'إحصائيات'],
                workflow: ['اختر نوع التقرير', 'حدّد الفترة', 'صدّر أو اطبع'],
                tips: ['قد يُفتح من لوحة التحكم أو روابط الموديولات']
            },
            apptester: {
                purpose: 'أدوات اختبار داخلية للمطورين والمدير (تشخيص).',
                features: ['فحص الاتصال', 'اختبار API', 'تشخيص الأخطاء'],
                workflow: ['للاستخدام الفني فقط', 'لا تُغيّر بيانات إنتاج دون حذر'],
                tips: ['مخصص للمدير والدعم التقني'],
                permissionsNote: 'يظهر عادةً للمدير فقط.'
            }
        };
    },

    getStaticTopics() {
        return [
            {
                id: 'system-intro', categoryId: 'overview', moduleId: null,
                title: 'ما هو نظام HSE؟', icon: 'fa-shield-halved',
                summary: 'منصة متكاملة لإدارة السلامة والصحة المهنية والبيئة.',
                purpose: 'يجمع التصاريح والحوادث والتدريب والعيادة والتقارير في مكان واحد لجهتك المنظمة.',
                features: ['واجهة عربية', 'مزامنة مع Google Sheets', 'صلاحيات مرنة', 'يعمل على الويب والجوال'],
                workflow: ['سجّل الدخول', 'اختر الموديول من القائمة', 'نفّذ مهمتك', 'راجع التقارير'],
                tips: ['استخدم «المساعدة» دائماً عند الشك']
            },
            {
                id: 'navigation', categoryId: 'overview', moduleId: 'dashboard',
                title: 'التنقل في النظام', icon: 'fa-bars',
                summary: 'القائمة الجانبية بوابتك لكل الموديولات.',
                purpose: 'كل عنصر في القائمة يفتح موديولاً مستقلاً ببياناته ووظائفه.',
                features: ['قائمة جانبية ثابتة', 'إخفاء الموديولات غير المسموحة', 'لوحة تحكم كصفحة رئيسية'],
                workflow: ['انقر على اسم الموديول', 'انتظر تحميل البيانات', 'استخدم التبويبات داخل الموديول'],
                tips: ['الموديولات غير الظاهرة تحتاج صلاحية من المدير']
            },
            {
                id: 'login-guide', categoryId: 'getting-started', moduleId: null,
                title: 'تسجيل الدخول', icon: 'fa-sign-in-alt',
                summary: 'الدخول بالبريد وكلمة المرور المسجّلين لدى المدير.',
                purpose: 'الوصول الآمن لبيانات جهتك فقط.',
                features: ['بريد إلكتروني', 'كلمة مرور', 'تذكرني', 'استرجاع كلمة المرور'],
                workflow: ['أدخل البريد وكلمة المرور', 'فعّل تذكرني إن أردت', 'اضغط تسجيل الدخول'],
                tips: ['لا تشارك كلمة المرور', 'استخدم «نسيت كلمة المرور» عند الحاجة']
            },
            {
                id: 'mfa-guide', categoryId: 'getting-started', moduleId: 'profile',
                title: 'المصادقة الثنائية (MFA)', icon: 'fa-mobile-screen',
                summary: 'طبقة أمان إضافية برمز من تطبيق المصادقة.',
                purpose: 'يحمي حسابك حتى لو تسرّبت كلمة المرور.',
                features: ['TOTP', 'QR للتفعيل', 'رمز 6 أرقام عند الدخول', 'تعطيل من الملف الشخصي'],
                workflow: ['من الملف الشخصي فعّل MFA', 'امسح QR بتطبيق Google Authenticator أو مشابه', 'أدخل الرمز عند كل دخول'],
                tips: ['MFA يتطلب اتصالاً عند التفعيل والدخول', 'احفظ رموز الاسترداد']
            },
            {
                id: 'password-reset', categoryId: 'getting-started', moduleId: null,
                title: 'استرجاع كلمة المرور', icon: 'fa-key',
                summary: 'إعادة التعيين عبر البريد الإلكتروني.',
                purpose: 'استعادة الوصول دون تدخل المدير عند تفعيل البريد.',
                features: ['رابط إعادة تعيين', 'بريد آمن', 'انتهاء صلاحية الرابط'],
                workflow: ['من شاشة الدخول: نسيت كلمة المرور', 'أدخل بريدك', 'اتبع الرابط في البريد'],
                tips: ['تحقق من مجلد الرسائل غير المرغوبة']
            },
            {
                id: 'profile-guide', categoryId: 'getting-started', moduleId: 'profile',
                title: 'الملف الشخصي', icon: 'fa-user',
                summary: 'بياناتك وكلمة المرور والأمان.',
                purpose: 'تحديث معلوماتك الشخصية دون الحاجة للمدير.',
                features: ['تعديل البيانات', 'كلمة المرور', 'MFA'],
                workflow: ['افتح ملفي الشخصي', 'عدّل واحفظ'],
                tips: ['متاح لكل مستخدم مسجّل']
            },
            {
                id: 'roles', categoryId: 'permissions', moduleId: 'users',
                title: 'الأدوار في النظام', icon: 'fa-users-gear',
                summary: 'مدير نظام، مسئول سلامة، مستخدم، قراءة فقط.',
                purpose: 'كل دور يحدد نطاق الوصول الافتراضي قبل المنح اليدوي.',
                features: ['مدير النظام: صلاحية كاملة', 'مسئول سلامة: حسب المنح', 'مستخدم عادي: حسب المنح', 'قراءة فقط: عرض بدون تعديل'],
                workflow: ['المدير يعيّن الدور', 'يمنح موديولات إضافية', 'المستخدم يرى فقط المسموح'],
                tips: ['لا توجد صلاحيات افتراضية لغير المدير — يجب المنح صراحةً'],
                permissionsNote: 'إدارة الأدوار من موديول المستخدمين.'
            },
            {
                id: 'detailed-perms', categoryId: 'permissions', moduleId: 'users',
                title: 'الصلاحيات التفصيلية', icon: 'fa-list-check',
                summary: 'تحكم داخل الموديول (عرض، إضافة، تحليل...).',
                purpose: 'بعض الموديولات تدعم صلاحيات فرعية لكل تبويب أو وظيفة.',
                features: ['صلاحية الموديول ككل', 'صلاحيات تبويبات', 'منح من شاشة المستخدم'],
                workflow: ['افتح مستخدماً في إدارة المستخدمين', 'فعّل الموديول', 'حدّد الصلاحيات التفصيلية'],
                tips: ['مثال: العيادة — سجل تردد منفصل عن التحليل'],
                permissionsNote: 'للمدير فقط.'
            },
            {
                id: 'request-access', categoryId: 'permissions', moduleId: null,
                title: 'طلب صلاحية موديول', icon: 'fa-hand',
                summary: 'إذا لم ترَ موديولاً في القائمة.',
                purpose: 'الصلاحيات تُمنح من مدير النظام فقط.',
                features: ['تواصل مع المدير', 'اذكر الموديول المطلوب', 'انتظر التفعيل ثم أعد تسجيل الدخول'],
                workflow: ['حدد الموديول من هذا الدليل', 'راسل المدير', 'بعد المنح حدّث الصفحة'],
                tips: ['يمكنك قراءة شرح أي موديول هنا حتى بدون صلاحية']
            },
            {
                id: 'reports-overview', categoryId: 'reports', moduleId: 'reports',
                title: 'التقارير العامة', icon: 'fa-file-lines',
                summary: 'تقارير مجمّعة من عدة مصادر.',
                purpose: 'عرض وتحليل البيانات لفترات زمنية محددة.',
                features: ['فلترة تاريخ', 'تصدير', 'طباعة'],
                workflow: ['اختر التقرير', 'حدّد الفترة', 'صدّر'],
                tips: ['انتظر اكتمال المزامنة قبل التصدير']
            },
            {
                id: 'kpi-reports', categoryId: 'reports', moduleId: 'safety-performance-kpis',
                title: 'مؤشرات الأداء والخطط', icon: 'fa-gauge-high',
                summary: 'KPIs وخطط سنوية ومتابعة HSE.',
                purpose: 'قياس أداء برنامج السلامة.',
                features: ['مؤشرات شهرية', 'خطة KPI', 'خطة متابعة'],
                workflow: ['أدخل القيم', 'قارن بالهدف', 'اتخذ إجراء عند الانحراف'],
                tips: ['راجع مع الإدارة شهرياً']
            },
            {
                id: 'clinic-analytics', categoryId: 'reports', moduleId: 'clinic',
                title: 'تحليل بيانات العيادة', icon: 'fa-chart-pie',
                summary: 'تحليل الزيارات والأدوية المنصرفة.',
                purpose: 'دعم قرارات المخزون والصحة المهنية.',
                features: ['KPIs زيارات', 'أكثر الأدوية استهلاكاً', 'اتجاه شهري', 'تنبيه مخزون منخفض'],
                workflow: ['افتح العيادة → تحليل البيانات', 'طبّق الفلاتر', 'راجع الرسوم والجدول'],
                tips: ['التحليل يعتمد على الزيارات المفلترة']
            },
            {
                id: 'sync', categoryId: 'technical', moduleId: null,
                title: 'المزامنة مع الخادم', icon: 'fa-cloud-arrow-up',
                summary: 'رفع وجلب البيانات من Google Sheets عبر Apps Script.',
                purpose: 'مصدر الحقيقة المركزي لبيانات الجهة.',
                features: ['مزامنة تلقائية', 'مزامنة يدوية', 'حفظ محلي مؤقت'],
                workflow: ['اعمل عادياً — المزامنة في الخلفية', 'عند التأخير انتظر أو حدّث'],
                tips: ['لا تغلق المتصفح أثناء حفظ كبير']
            },
            {
                id: 'offline', categoryId: 'technical', moduleId: null,
                title: 'العمل دون اتصال', icon: 'fa-wifi',
                summary: 'بعض الوظائف تعمل محلياً ثم تُزامَن.',
                purpose: 'استمرارية العمل عند ضعف الشبكة.',
                features: ['تخزين محلي', 'قائمة انتظار', 'مزامنة عند العودة'],
                workflow: ['سجّل البيانات محلياً', 'عند الاتصال تُرفع تلقائياً'],
                tips: ['تسجيل الدخول وMFA يتطلبان اتصالاً']
            },
            {
                id: 'updates', categoryId: 'technical', moduleId: null,
                title: 'تحديثات النظام', icon: 'fa-arrows-rotate',
                summary: 'إشعار عند إصدار جديد.',
                purpose: 'الحصول على إصلاحات وميزات.',
                features: ['رقم إصدار في الشريط', 'إشعار تحديث', 'Service Worker'],
                workflow: ['عند الإشعار اضغط تحديث', 'أعد تحميل الصفحة'],
                tips: ['الإصدار الحالي يظهر أسفل القائمة وفي هذه الصفحة']
            },
            {
                id: 'security', categoryId: 'technical', moduleId: null,
                title: 'الأمان', icon: 'fa-lock',
                summary: 'حماية البيانات والجلسات.',
                purpose: 'ضمان سرية بيانات HSE.',
                features: ['HTTPS', 'جلسات آمنة', 'MFA', 'صلاحيات دقيقة'],
                workflow: ['استخدم كلمة مرور قوية', 'فعّل MFA', 'سجّل الخروج على الأجهزة المشتركة'],
                tips: ['لا تستخدم حسابك على أجهزة عامة بدون خروج']
            },
            {
                id: 'contact-admin', categoryId: 'technical', moduleId: null,
                title: 'التواصل مع الدعم', icon: 'fa-envelope',
                summary: 'عند مشكلة تقنية أو صلاحيات.',
                purpose: 'مدير النظام هو نقطة الاتصال الأولى.',
                features: ['بريد المدير', 'وصف المشكلة', 'لقطة شاشة'],
                workflow: ['صف المشكلة بوضوح', 'أرفق الخطوات', 'انتظر الرد'],
                tips: ['استخدم تتبع المشاكل إن وُجدت صلاحية']
            },
            {
                id: 'faq-no-module', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'لماذا لا أرى موديولاً في القائمة؟', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['الصلاحية لم تُمنح لك بعد', 'تواصل مع مدير النظام', 'أعد تحميل الصفحة بعد المنح'],
                workflow: [], tips: []
            },
            {
                id: 'faq-slow', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'النظام بطيء أو البيانات لا تظهر', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['تحقق من الاتصال', 'انتظر المزامنة (بعض الموديولات ثقيلة)', 'حدّث الصفحة', 'جرب متصفحاً محدّثاً'],
                workflow: [], tips: []
            },
            {
                id: 'faq-mfa-fail', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'رمز MFA غير صحيح', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['تأكد من وقت الجهاز', 'استخدم أحدث رمز', 'أعد مسح QR إن لزم من المدير', 'يتطلب اتصالاً'],
                workflow: [], tips: []
            },
            {
                id: 'faq-password', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'نسيت كلمة المرور', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['من شاشة الدخول: نسيت كلمة المرور', 'أدخل بريدك المسجّل', 'تحقق من البريد'],
                workflow: [], tips: []
            },
            {
                id: 'faq-export', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'فشل التصدير Excel أو PDF', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['انتظر اكتمال تحميل البيانات', 'قلّص نطاق التاريخ', 'اسمح بالنوافذ المنبثقة', 'جرّب متصفح Chrome'],
                workflow: [], tips: []
            },
            {
                id: 'faq-update', categoryId: 'faq', moduleId: null, isFaq: true,
                title: 'كيف أحدّث التطبيق؟', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['اضغط «تحديث» في إشعار الإصدار', 'أو Ctrl+F5 لإعادة تحميل كاملة', 'تحقق من رقم الإصدار أسفل القائمة'],
                workflow: [], tips: []
            },
            {
                id: 'faq-help-module', categoryId: 'faq', moduleId: 'help', isFaq: true,
                title: 'أين أجد شرحاً كاملاً للنظام؟', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['أنت هنا — موديول المساعدة', 'فوق الإعدادات في القائمة', 'متاح لكل مستخدم مسجّل', 'استخدم البحث للوصول السريع'],
                workflow: [], tips: []
            },
            {
                id: 'faq-clinic-meds', categoryId: 'faq', moduleId: 'clinic', isFaq: true,
                title: 'كيف أرى أكثر الأدوية استهلاكاً؟', icon: 'fa-question',
                summary: '', purpose: '',
                features: ['العيادة → تبويب تحليل البيانات', 'قسم تحليل الأدوية المنصرفة', 'جدول ورسوم بيانية', 'فلترة بالفترة'],
                workflow: [], tips: []
            }
        ];
    },

    buildModuleTopics() {
        const details = this.getModuleHelpDetails();
        const config = (typeof MODULE_PERMISSIONS_CONFIG !== 'undefined' && Array.isArray(MODULE_PERMISSIONS_CONFIG))
            ? MODULE_PERMISSIONS_CONFIG
            : [];
        const topics = [];
        const seen = new Set();

        config.forEach(mod => {
            if (seen.has(mod.key)) return;
            seen.add(mod.key);
            const d = details[mod.key] || {};
            topics.push({
                id: 'mod-' + mod.key,
                categoryId: 'modules',
                moduleId: mod.key,
                title: mod.label,
                icon: mod.icon || 'fa-cube',
                summary: d.purpose || `موديول ${mod.label} لإدارة بيانات السلامة والصحة المهنية.`,
                purpose: d.purpose || `إدارة ${mod.label} ضمن منظومة HSE.`,
                features: d.features || ['تسجيل البيانات', 'بحث وفلترة', 'تقارير', 'تصدير'],
                workflow: d.workflow || ['افتح الموديول', 'أضف أو عدّل السجلات', 'احفظ وراجع التقارير'],
                tips: d.tips || ['راجع الصلاحيات مع المدير إن لم يظهر الموديول'],
                permissionsNote: d.permissionsNote || (mod.adminOnly ? 'موديول محمي — للمدير أو بمنح صريح.' : 'يحتاج منح صلاحية من مدير النظام.'),
                keywords: [mod.label, mod.key].join(' ')
            });
        });

        ['profile', 'reports', 'apptester'].forEach(key => {
            if (seen.has(key)) return;
            seen.add(key);
            const labels = { profile: 'ملفي الشخصي', reports: 'التقارير', apptester: 'اختبار التطبيق' };
            const icons = { profile: 'fa-user', reports: 'fa-file-lines', apptester: 'fa-vial' };
            const d = details[key] || {};
            topics.push({
                id: 'mod-' + key,
                categoryId: 'modules',
                moduleId: key,
                title: labels[key],
                icon: icons[key],
                summary: d.purpose || '',
                purpose: d.purpose || '',
                features: d.features || [],
                workflow: d.workflow || [],
                tips: d.tips || [],
                permissionsNote: d.permissionsNote || '',
                keywords: labels[key] + ' ' + key
            });
        });

        return topics;
    },

    getAllTopics() {
        if (!this._allTopicsCache) {
            this._allTopicsCache = [...this.getStaticTopics(), ...this.buildModuleTopics()];
        }
        return this._allTopicsCache;
    },

    getAppVersion() {
        try {
            if (typeof window !== 'undefined' && window.appVersion) return String(window.appVersion);
            if (typeof AppState !== 'undefined' && AppState.appVersion) return String(AppState.appVersion);
        } catch (_e) {}
        return '—';
    },

    normalizeSearch(s) {
        return String(s || '').toLowerCase().trim();
    },

    topicMatchesSearch(topic, q) {
        if (!q) return true;
        const blob = [
            topic.title, topic.summary, topic.purpose,
            (topic.features || []).join(' '),
            (topic.workflow || []).join(' '),
            (topic.tips || []).join(' '),
            topic.keywords || ''
        ].join(' ').toLowerCase();
        return blob.includes(q);
    },

    getFilteredTopics() {
        const q = this.normalizeSearch(this.state.searchQuery);
        const cat = this.state.activeCategory;
        return this.getAllTopics().filter(t => {
            if (cat !== 'all' && t.categoryId !== cat) return false;
            return this.topicMatchesSearch(t, q);
        });
    },

    canOpenModule(moduleId) {
        if (!moduleId || moduleId === 'help') return false;
        if (typeof Permissions !== 'undefined' && typeof Permissions.hasAccess === 'function') {
            return Permissions.hasAccess(moduleId);
        }
        return false;
    },

    renderShell() {
        const version = this.getAppVersion();
        const cats = this.getCategories();
        return `
            <div class="help-module-root" style="max-width:1100px;margin:0 auto;padding:8px 4px 32px;">
                <div class="content-card" style="padding:24px 28px;margin-bottom:20px;background:linear-gradient(135deg,#f0fdfa 0%,#ecfeff 50%,#eff6ff 100%);border:1px solid #99f6e4;">
                    <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:16px;">
                        <div>
                            <h1 style="margin:0 0 8px;font-size:1.55rem;font-weight:800;color:#0f766e;display:flex;align-items:center;gap:10px;">
                                <i class="fas fa-circle-question"></i> دليل النظام — المساعدة
                            </h1>
                            <p style="margin:0;color:#475569;font-size:0.92rem;max-width:560px;line-height:1.6;">
                                مرجع شامل لاستخدام منظومة السلامة والصحة المهنية والبيئة: الموديولات، الصلاحيات، التقارير، والدعم التقني.
                            </p>
                        </div>
                        <span style="background:#0d9488;color:#fff;padding:6px 14px;border-radius:20px;font-size:0.78rem;font-weight:700;white-space:nowrap;">
                            <i class="fas fa-code-branch" style="margin-left:6px;"></i> الإصدار ${Utils.escapeHTML(version)}
                        </span>
                    </div>
                </div>

                <div class="content-card" style="padding:16px 18px;margin-bottom:16px;">
                    <div style="position:relative;">
                        <i class="fas fa-search" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#94a3b8;"></i>
                        <input type="search" id="help-search-input" placeholder="ابحث في الدليل... (مثال: عيادة، تصريح، MFA)"
                            style="width:100%;padding:12px 44px 12px 16px;border:1px solid #e2e8f0;border-radius:10px;font-size:0.9rem;outline:none;"
                            autocomplete="off" />
                    </div>
                    <div id="help-category-tabs" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
                        ${cats.map(c => `
                            <button type="button" class="help-cat-btn" data-cat="${c.id}"
                                style="padding:8px 14px;border-radius:20px;border:1px solid #e2e8f0;background:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;color:#475569;">
                                <i class="fas ${c.icon}" style="margin-left:6px;"></i>${Utils.escapeHTML(c.label)}
                            </button>`).join('')}
                    </div>
                </div>

                <div id="help-results-meta" style="font-size:0.8rem;color:#64748b;margin-bottom:10px;padding:0 4px;"></div>
                <div id="help-topics-list"></div>
            </div>`;
    },

    renderTopicCard(topic, index) {
        const isOpen = this.state.expandedId === topic.id;
        const hasModule = !!topic.moduleId;
        const canOpen = hasModule && this.canOpenModule(topic.moduleId);
        const isFaq = !!topic.isFaq;

        const renderList = (title, items, icon) => {
            if (!items || !items.length) return '';
            return `
                <div style="margin-top:12px;">
                    <div style="font-weight:700;font-size:0.82rem;color:#334155;margin-bottom:6px;">
                        <i class="fas ${icon}" style="margin-left:6px;color:#0d9488;"></i>${title}
                    </div>
                    <ul style="margin:0;padding-right:20px;color:#475569;font-size:0.84rem;line-height:1.7;">
                        ${items.map(li => `<li>${Utils.escapeHTML(li)}</li>`).join('')}
                    </ul>
                </div>`;
        };

        let body = '';
        if (isFaq) {
            body = renderList('الإجابة', topic.features, 'fa-check');
        } else {
            if (topic.summary) {
                body += `<p style="margin:0 0 8px;color:#64748b;font-size:0.86rem;">${Utils.escapeHTML(topic.summary)}</p>`;
            }
            if (topic.purpose) {
                body += `<p style="margin:0;color:#334155;font-size:0.86rem;"><strong>الغرض:</strong> ${Utils.escapeHTML(topic.purpose)}</p>`;
            }
            body += renderList('أهم الوظائف', topic.features, 'fa-star');
            body += renderList('خطوات الاستخدام', topic.workflow, 'fa-shoe-prints');
            body += renderList('نصائح', topic.tips, 'fa-lightbulb');
            if (topic.permissionsNote) {
                body += `<div style="margin-top:12px;padding:10px 12px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;font-size:0.82rem;color:#92400e;">
                    <i class="fas fa-shield-halved" style="margin-left:6px;"></i>${Utils.escapeHTML(topic.permissionsNote)}
                </div>`;
            }
        }

        const permBanner = hasModule && !canOpen ? `
            <div style="margin-top:10px;padding:8px 12px;background:#f1f5f9;border-radius:8px;font-size:0.8rem;color:#64748b;">
                <i class="fas fa-lock" style="margin-left:6px;"></i> يتطلب منح صلاحية «${Utils.escapeHTML(topic.title)}» من مدير النظام — يمكنك قراءة الشرح هنا.
            </div>` : '';

        const openBtn = canOpen ? `
            <button type="button" class="help-open-module-btn" data-module="${Utils.escapeHTML(topic.moduleId)}"
                style="margin-top:12px;padding:8px 16px;background:#0d9488;color:#fff;border:none;border-radius:8px;font-size:0.82rem;font-weight:600;cursor:pointer;">
                <i class="fas fa-external-link-alt" style="margin-left:6px;"></i> فتح الموديول
            </button>` : '';

        return `
            <div class="content-card help-topic-card" data-topic-id="${Utils.escapeHTML(topic.id)}"
                style="padding:0;margin-bottom:10px;overflow:hidden;border:1px solid ${isOpen ? '#99f6e4' : '#f1f5f9'};">
                <button type="button" class="help-topic-toggle" data-topic-id="${Utils.escapeHTML(topic.id)}"
                    style="width:100%;text-align:right;padding:14px 18px;background:${isOpen ? '#f0fdfa' : '#fff'};border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;">
                    <span style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
                        <span style="width:36px;height:36px;background:#ecfdf5;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                            <i class="fas ${topic.icon || 'fa-book'}" style="color:#0d9488;"></i>
                        </span>
                        <span style="font-weight:700;font-size:0.9rem;color:#134e4a;">${Utils.escapeHTML(topic.title)}</span>
                    </span>
                    <i class="fas fa-chevron-${isOpen ? 'up' : 'down'}" style="color:#94a3b8;flex-shrink:0;"></i>
                </button>
                ${isOpen ? `<div style="padding:0 18px 16px;border-top:1px solid #f1f5f9;">${body}${permBanner}${openBtn}</div>` : ''}
            </div>`;
    },

    renderTopics(section) {
        const listEl = section.querySelector('#help-topics-list');
        const metaEl = section.querySelector('#help-results-meta');
        if (!listEl) return;

        const topics = this.getFilteredTopics();
        if (metaEl) {
            metaEl.textContent = topics.length
                ? `عرض ${topics.length} موضوعاً`
                : 'لا توجد نتائج — جرّب كلمات أخرى أو اختر فئة «الكل»';
        }

        if (!topics.length) {
            listEl.innerHTML = `<div class="content-card" style="padding:32px;text-align:center;color:#94a3b8;">
                <i class="fas fa-search" style="font-size:2rem;margin-bottom:12px;"></i><br>لا توجد نتائج مطابقة
            </div>`;
            return;
        }

        listEl.innerHTML = topics.map((t, i) => this.renderTopicCard(t, i)).join('');
    },

    updateCategoryButtons(section) {
        section.querySelectorAll('.help-cat-btn').forEach(btn => {
            const active = btn.getAttribute('data-cat') === this.state.activeCategory;
            btn.style.background = active ? '#0d9488' : '#fff';
            btn.style.color = active ? '#fff' : '#475569';
            btn.style.borderColor = active ? '#0d9488' : '#e2e8f0';
        });
    },

    bindEvents(section) {
        const searchInput = section.querySelector('#help-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.state.searchQuery = searchInput.value;
                this.renderTopics(section);
            });
        }

        section.querySelector('#help-category-tabs')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.help-cat-btn');
            if (!btn) return;
            this.state.activeCategory = btn.getAttribute('data-cat') || 'all';
            this.updateCategoryButtons(section);
            this.renderTopics(section);
        });

        section.addEventListener('click', (e) => {
            const toggle = e.target.closest('.help-topic-toggle');
            if (toggle) {
                const id = toggle.getAttribute('data-topic-id');
                this.state.expandedId = this.state.expandedId === id ? null : id;
                this.renderTopics(section);
                return;
            }
            const openBtn = e.target.closest('.help-open-module-btn');
            if (openBtn) {
                const mod = openBtn.getAttribute('data-module');
                if (mod && typeof UI !== 'undefined' && typeof UI.showSection === 'function') {
                    UI.showSection(mod);
                }
            }
        });

        this.updateCategoryButtons(section);
    },

    async load() {
        const section = document.getElementById('help-section');
        if (!section) return;
        this.state.activeCategory = 'all';
        this.state.searchQuery = '';
        this.state.expandedId = null;
        section.innerHTML = this.renderShell();
        this.bindEvents(section);
        this.renderTopics(section);
    }
};

if (typeof window !== 'undefined') {
    window.Help = Help;
}
