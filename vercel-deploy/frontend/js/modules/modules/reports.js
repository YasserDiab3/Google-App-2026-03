/**
 * Reports Module
 * تم استخراجه من app-modules.js
 * دعم كامل للغتين: العربية والإنجليزية (عرض فقط، البيانات الأساسية لا تتغير)
 */
const Reports = {
    _languageChangeBound: false,

    /**
     * الحصول على اللغة الحالية
     */
    getCurrentLanguage() {
        try {
            return localStorage.getItem('language') || (typeof AppState !== 'undefined' && AppState.currentLanguage) || 'ar';
        } catch (e) {
            return 'ar';
        }
    },

    /**
     * الحصول على الترجمات حسب اللغة الحالية (عناوين وواجهة فقط، لا يغيّر البيانات المخزنة)
     */
    getTranslations() {
        const lang = this.getCurrentLanguage();
        const translations = {
            ar: {
                'title': 'التقارير',
                'subtitle': 'إنشاء وتصدير التقارير المختلفة',
                'card.period': 'تقرير شهري / سنوي',
                'card.periodDesc': 'إنشاء تقرير إحصائي للفترة (شهرياً أو سنوياً) يشمل التصاريح والملاحظات والحوادث والزيارات الطبية والتدريب والمخالفات',
                'card.incidents': 'تقرير الحوادث',
                'card.incidentsDesc': 'إنشاء تقرير شامل عن جميع الحوادث المسجلة',
                'card.training': 'تقرير التدريب',
                'card.trainingDesc': 'إنشاء تقرير عن برامج التدريب والمشاركين',
                'card.full': 'التقرير الشامل',
                'card.fullDesc': 'إنشاء تقرير شامل لجميع بيانات النظام',
                'btn.generate': 'إنشاء التقرير',
                'error.load': 'حدث خطأ أثناء تحميل البيانات',
                'btn.retry': 'إعادة المحاولة',
                'msg.noData': 'البيانات غير متوفرة. يرجى تحديث الصفحة',
                'msg.incidentsInvalid': 'بيانات الحوادث غير صحيحة',
                'msg.trainingInvalid': 'بيانات التدريب غير صحيحة',
                'msg.unknownReport': 'نوع التقرير غير معروف',
                'msg.allowPopups': 'يرجى السماح للنوافذ المنبثقة لعرض التقرير',
                'msg.invalidPeriodInput': 'صيغة الفترة غير صحيحة. يرجى المحاولة مرة أخرى.',
                'msg.periodCancelled': 'تم إلغاء اختيار الفترة.',
                'report.incidents': 'تقرير الحوادث',
                'report.training': 'تقرير التدريب',
                'report.full': 'التقرير الشامل',
                'report.periodSummary': 'التقرير الإحصائي للفترة',
                'report.totalIncidents': 'إجمالي الحوادث',
                'report.createdDate': 'تاريخ الإنشاء',
                'report.isoCode': 'كود ISO',
                'report.date': 'التاريخ',
                'report.location': 'الموقع',
                'report.severity': 'الخطورة',
                'report.status': 'الحالة',
                'report.description': 'الوصف',
                'report.totalPrograms': 'إجمالي برامج التدريب',
                'report.programName': 'اسم البرنامج',
                'report.trainer': 'المدرب',
                'report.participantsCount': 'عدد المشاركين',
                'report.generalStats': 'الإحصائيات العامة',
                'report.basicStats': 'الإحصائيات الأساسية',
                'report.type': 'النوع',
                'report.total': 'الإجمالي',
                'report.incidentsRow': 'الحوادث',
                'report.nearmiss': 'الحوادث الوشيكة',
                'report.observations': 'الملاحظات',
                'report.ptw': 'تصاريح العمل',
                'report.trainingPrograms': 'برامج التدريب',
                'report.violations': 'المخالفات',
                'report.clinicVisits': 'الزيارات الطبية',
                'report.trainingSection': 'بند التدريب',
                'report.indicator': 'المؤشر',
                'report.value': 'القيمة',
                'report.traineesCount': 'عدد المتدربين',
                'report.avgTrainingHoursEmployees': 'متوسط ساعات التدريب للموظفين',
                'report.totalTrainingHoursEmployees': 'إجمالي ساعات التدريب لجميع الموظفين',
                'report.hour': 'ساعة',
                'report.trainingContractors': 'بند التدريب - المقاولين',
                'report.traineesContractors': 'عدد المتدربين للمقاولين',
                'report.avgTrainingContractors': 'متوسط ساعات التدريب للمقاولين',
                'report.totalTrainingContractors': 'إجمالي ساعات التدريب لجميع المقاولين',
                'report.violationsSection': 'بند المخالفات',
                'report.employeeViolations': 'عدد المخالفات للموظفين',
                'report.contractorViolations': 'عدد المخالفات للمقاولين',
                'report.violationsByType': 'المخالفات حسب النوع',
                'report.violationType': 'نوع المخالفة',
                'report.violationsCount': 'عدد المخالفات',
                'report.violationsByDept': 'المخالفات حسب الإدارة',
                'report.department': 'الإدارة',
                'report.period': 'الفترة',
                'report.periodTypeMonthly': 'تقرير شهري',
                'report.periodTypeYearly': 'تقرير سنوي',
                'report.employeeTrainingPrograms': 'عدد برامج التدريب للموظفين',
                'report.employeeTrainingTopics': 'عدد الموضوعات التدريبية للموظفين',
                'report.contractorTrainingPrograms': 'عدد برامج تدريب المقاولين',
                'report.contractorTrainingTopics': 'عدد الموضوعات التدريبية للمقاولين',
                'report.monthlySafety': 'تقرير السلامة الشهري',
                'report.monthlySafetyTitle': 'تقرير السلامة الشهري',
                'report.hseSection': 'مؤشرات السلامة والصحة المهنية (HSE)',
                'report.hse.lti': 'حوادث توقف العمل (LTI)',
                'report.hse.recordables': 'الحوادث القابلة للتسجيل (Recordables)',
                'report.hse.injuries': 'إجمالي الإصابات',
                'report.hse.fatalities': 'الوفيات',
                'report.hse.daysLost': 'أيام العمل الضائعة',
                'report.hse.manHours': 'ساعات العمل',
                'report.hse.trir': 'TRIR',
                'report.hse.afr': 'AFR',
                'report.hse.far': 'FAR',
                'report.hse.fr': 'FR (LTIR)',
                'report.hse.sr': 'SR',
                'report.hse.ir': 'IR',
                'msg.adminOnlyReport': 'تصدير تقرير السلامة الشهري متاح لمدير النظام فقط',
                'msg.invalidMonthYear': 'يرجى اختيار شهر وسنة صالحين'
            },
            en: {
                'title': 'Reports',
                'subtitle': 'Create and export various reports',
                'card.period': 'Monthly / Yearly Report',
                'card.periodDesc': 'Generate a statistical report for a specific period (monthly or yearly) including permits, observations, incidents, clinic visits, training and violations',
                'card.incidents': 'Incidents Report',
                'card.incidentsDesc': 'Generate a comprehensive report of all recorded incidents',
                'card.training': 'Training Report',
                'card.trainingDesc': 'Generate a report on training programs and participants',
                'card.full': 'Comprehensive Report',
                'card.fullDesc': 'Generate a comprehensive report of all system data',
                'btn.generate': 'Generate Report',
                'error.load': 'An error occurred while loading data',
                'btn.retry': 'Retry',
                'msg.noData': 'Data not available. Please refresh the page',
                'msg.incidentsInvalid': 'Invalid incidents data',
                'msg.trainingInvalid': 'Invalid training data',
                'msg.unknownReport': 'Unknown report type',
                'msg.allowPopups': 'Please allow pop-ups to view the report',
                'msg.invalidPeriodInput': 'Invalid period format. Please try again.',
                'msg.periodCancelled': 'Period selection was cancelled.',
                'report.incidents': 'Incidents Report',
                'report.training': 'Training Report',
                'report.full': 'Comprehensive Report',
                'report.periodSummary': 'Period Summary Report',
                'report.totalIncidents': 'Total Incidents',
                'report.createdDate': 'Creation Date',
                'report.isoCode': 'ISO Code',
                'report.date': 'Date',
                'report.location': 'Location',
                'report.severity': 'Severity',
                'report.status': 'Status',
                'report.description': 'Description',
                'report.totalPrograms': 'Total Training Programs',
                'report.programName': 'Program Name',
                'report.trainer': 'Trainer',
                'report.participantsCount': 'Participants Count',
                'report.generalStats': 'General Statistics',
                'report.basicStats': 'Basic Statistics',
                'report.type': 'Type',
                'report.total': 'Total',
                'report.incidentsRow': 'Incidents',
                'report.nearmiss': 'Near Miss',
                'report.observations': 'Observations',
                'report.ptw': 'Work Permits',
                'report.trainingPrograms': 'Training Programs',
                'report.violations': 'Violations',
                'report.clinicVisits': 'Clinic Visits',
                'report.trainingSection': 'Training Section',
                'report.indicator': 'Indicator',
                'report.value': 'Value',
                'report.traineesCount': 'Trainees Count',
                'report.avgTrainingHoursEmployees': 'Average Training Hours (Employees)',
                'report.totalTrainingHoursEmployees': 'Total Training Hours (Employees)',
                'report.hour': 'hour',
                'report.trainingContractors': 'Training Section - Contractors',
                'report.traineesContractors': 'Trainees Count (Contractors)',
                'report.avgTrainingContractors': 'Average Training Hours (Contractors)',
                'report.totalTrainingContractors': 'Total Training Hours (Contractors)',
                'report.violationsSection': 'Violations Section',
                'report.employeeViolations': 'Employee Violations Count',
                'report.contractorViolations': 'Contractor Violations Count',
                'report.violationsByType': 'Violations by Type',
                'report.violationType': 'Violation Type',
                'report.violationsCount': 'Violations Count',
                'report.violationsByDept': 'Violations by Department',
                'report.department': 'Department',
                'report.period': 'Period',
                'report.periodTypeMonthly': 'Monthly Report',
                'report.periodTypeYearly': 'Yearly Report',
                'report.employeeTrainingPrograms': 'Employee Training Programs',
                'report.employeeTrainingTopics': 'Employee Training Topics',
                'report.contractorTrainingPrograms': 'Contractor Training Programs',
                'report.contractorTrainingTopics': 'Contractor Training Topics',
                'report.monthlySafety': 'Monthly Safety Report',
                'report.monthlySafetyTitle': 'Monthly Safety Report',
                'report.hseSection': 'Health & Safety (HSE) Indicators',
                'report.hse.lti': 'Lost Time Incidents (LTI)',
                'report.hse.recordables': 'Recordable Incidents',
                'report.hse.injuries': 'Total Injuries',
                'report.hse.fatalities': 'Fatalities',
                'report.hse.daysLost': 'Days Lost',
                'report.hse.manHours': 'Man-Hours Worked',
                'report.hse.trir': 'TRIR',
                'report.hse.afr': 'AFR',
                'report.hse.far': 'FAR',
                'report.hse.fr': 'FR (LTIR)',
                'report.hse.sr': 'SR',
                'report.hse.ir': 'IR',
                'msg.adminOnlyReport': 'Monthly safety report export is available to system administrators only',
                'msg.invalidMonthYear': 'Please select a valid month and year'
            }
        };
        return {
            t: (key) => (translations[lang] && translations[lang][key]) ? translations[lang][key] : key,
            lang
        };
    },

    /**
     * تحميل الموديول (واجهة حسب لغة المستخدم، البيانات لا تتغير)
     */
    async load() {
        const section = document.getElementById('reports-section');
        if (!section) return;

        if (typeof AppState === 'undefined') {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('AppState غير متوفر!');
            } else {
                console.error('AppState غير متوفر!');
            }
            return;
        }

        const { t } = this.getTranslations();

        if (!this._languageChangeBound) {
            this._languageChangeBound = true;
            document.addEventListener('language-changed', () => {
                if (document.getElementById('reports-section') && document.getElementById('reports-section').innerHTML) {
                    Reports.load();
                }
            });
        }

        try {
            section.innerHTML = `
            <div class="section-header">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="section-title">
                            <i class="fas fa-file-alt ml-3"></i>
                            ${t('title')}
                        </h1>
                        <p class="section-subtitle">${t('subtitle')}</p>
                    </div>
                </div>
            </div>

            <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-exclamation-triangle ml-2"></i>
                            ${t('card.incidents')}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t('card.incidentsDesc')}</p>
                        <button onclick="Reports.generateAndExport('incidents')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t('btn.generate')}
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-graduation-cap ml-2"></i>
                            ${t('card.training')}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t('card.trainingDesc')}</p>
                        <button onclick="Reports.generateAndExport('training')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t('btn.generate')}
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-calendar-alt ml-2"></i>
                            ${t('card.period')}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t('card.periodDesc')}</p>
                        <button onclick="Reports.generateAndExport('period')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t('btn.generate')}
                        </button>
                    </div>
                </div>

                <div class="content-card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-line ml-2"></i>
                            ${t('card.full')}
                        </h3>
                    </div>
                    <div class="card-body">
                        <p class="text-gray-600 mb-4">${t('card.fullDesc')}</p>
                        <button onclick="Reports.generateAndExport('full')" class="btn-primary w-full">
                            <i class="fas fa-file-pdf ml-2"></i>
                            ${t('btn.generate')}
                        </button>
                    </div>
                </div>
            </div>
        `;
        } catch (error) {
            if (typeof Utils !== 'undefined' && Utils.safeError) {
                Utils.safeError('❌ خطأ في تحميل مديول التقارير:', error);
            } else {
                console.error('❌ خطأ في تحميل مديول التقارير:', error);
            }
            if (section) {
                const { t: tErr } = this.getTranslations();
                section.innerHTML = `
                    <div class="content-card">
                        <div class="card-body">
                            <div class="empty-state">
                                <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
                                <p class="text-gray-500 mb-4">${tErr('error.load')}</p>
                                <button onclick="Reports.load()" class="btn-primary">
                                    <i class="fas fa-redo ml-2"></i>
                                    ${tErr('btn.retry')}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    },

    /**
     * التأكد من تحميل بيانات التدريب (موظفين + مقاولين) قبل التقرير الشامل
     * لأنها قد لا تكون محمّلة إذا لم يفتح المستخدم صفحة التدريب
     */
    async ensureTrainingDataForReport() {
        if (!AppState.appData) return;
        const needContractor = !Array.isArray(AppState.appData.contractorTrainings) || AppState.appData.contractorTrainings.length === 0;
        const needAttendance = !Array.isArray(AppState.appData.trainingAttendance);
        const needTraining = !Array.isArray(AppState.appData.training);
        if (!needContractor && !needAttendance && !needTraining) return;
        if (typeof GoogleIntegration === 'undefined' || typeof GoogleIntegration.sendRequest !== 'function') return;
        if (!AppState.googleConfig?.appsScript?.enabled || !AppState.googleConfig?.appsScript?.scriptUrl) return;
        try {
            const req = (action) => Promise.resolve(GoogleIntegration.sendRequest({ action, data: {} }))
                .then(r => (r && r.success && Array.isArray(r.data) ? r.data : []))
                .catch(() => []);
            const [contractorData, attendanceData, trainingData] = await Promise.all([
                needContractor ? req('getAllContractorTrainings') : Promise.resolve(AppState.appData.contractorTrainings || []),
                needAttendance ? req('getAllTrainingAttendance') : Promise.resolve(AppState.appData.trainingAttendance || []),
                needTraining ? req('getAllTrainings') : Promise.resolve(AppState.appData.training || [])
            ]);
            if (needContractor && Array.isArray(contractorData)) AppState.appData.contractorTrainings = contractorData;
            if (needAttendance && Array.isArray(attendanceData)) AppState.appData.trainingAttendance = attendanceData;
            if (needTraining && Array.isArray(trainingData)) AppState.appData.training = trainingData;
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('تحميل بيانات التدريب للتقرير:', e);
        }
    },

    _filterArrayByDateRange(array, dateFields, startDate, endDate) {
        if (!Array.isArray(array) || !startDate || !endDate) return Array.isArray(array) ? array.slice() : [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return array.slice();
        }
        return array.filter(item => {
            if (!item || typeof item !== 'object') return false;
            let value = null;
            for (let i = 0; i < dateFields.length; i++) {
                const field = dateFields[i];
                if (item[field]) {
                    value = item[field];
                    break;
                }
            }
            if (!value) return false;
            const d = value instanceof Date ? value : new Date(value);
            if (isNaN(d.getTime())) return false;
            return d >= start && d <= end;
        });
    },

    async _askForPeriod() {
        const { t, lang } = this.getTranslations();
        try {
            const typePrompt = lang === 'ar'
                ? 'اختر نوع الفترة:\n1- شهري\n2- سنوي'
                : 'Choose period type:\n1- Monthly\n2- Yearly';
            const typeInput = window.prompt(typePrompt, '1');
            if (typeInput === null) {
                if (typeof Notification !== 'undefined' && Notification.info) {
                    Notification.info(t('msg.periodCancelled'));
                }
                return null;
            }
            const trimmedType = String(typeInput).trim();
            const isYearly = trimmedType === '2';

            if (!isYearly) {
                const monthPrompt = lang === 'ar'
                    ? 'أدخل السنة والشهر بصيغة YYYY-MM (مثال: 2026-02)'
                    : 'Enter year-month in format YYYY-MM (e.g. 2026-02)';
                const monthInput = window.prompt(monthPrompt);
                if (monthInput === null) {
                    if (typeof Notification !== 'undefined' && Notification.info) {
                        Notification.info(t('msg.periodCancelled'));
                    }
                    return null;
                }
                const match = /^(\d{4})-(\d{1,2})$/.exec(String(monthInput).trim());
                if (!match) {
                    if (typeof Notification !== 'undefined' && Notification.error) {
                        Notification.error(t('msg.invalidPeriodInput'));
                    }
                    return null;
                }
                const year = parseInt(match[1], 10);
                const month = parseInt(match[2], 10);
                if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
                    if (typeof Notification !== 'undefined' && Notification.error) {
                        Notification.error(t('msg.invalidPeriodInput'));
                    }
                    return null;
                }
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0);
                const label = `${year}-${month.toString().padStart(2, '0')}`;
                return {
                    type: 'monthly',
                    year,
                    month,
                    startDate,
                    endDate,
                    label
                };
            } else {
                const nowYear = new Date().getFullYear();
                const yearPrompt = lang === 'ar'
                    ? 'أدخل السنة بصيغة YYYY (مثال: 2026)'
                    : 'Enter year in format YYYY (e.g. 2026)';
                const yearInput = window.prompt(yearPrompt, String(nowYear));
                if (yearInput === null) {
                    if (typeof Notification !== 'undefined' && Notification.info) {
                        Notification.info(t('msg.periodCancelled'));
                    }
                    return null;
                }
                const year = parseInt(String(yearInput).trim(), 10);
                if (!Number.isFinite(year)) {
                    if (typeof Notification !== 'undefined' && Notification.error) {
                        Notification.error(t('msg.invalidPeriodInput'));
                    }
                    return null;
                }
                const startDate = new Date(year, 0, 1);
                const endDate = new Date(year, 11, 31);
                const label = String(year);
                return {
                    type: 'yearly',
                    year,
                    startDate,
                    endDate,
                    label
                };
            }
        } catch (e) {
            if (typeof Utils !== 'undefined' && Utils.safeWarn) {
                Utils.safeWarn('Error in _askForPeriod:', e);
            }
            return null;
        }
    },

    buildMonthlyPeriod(year, month) {
        const y = parseInt(year, 10);
        const m = parseInt(month, 10);
        if (!Number.isFinite(y) || !Number.isFinite(m) || m < 1 || m > 12) {
            return null;
        }
        const startDate = new Date(y, m - 1, 1);
        const endDate = new Date(y, m, 0, 23, 59, 59, 999);
        return {
            type: 'monthly',
            year: y,
            month: m,
            startDate,
            endDate,
            label: `${y}-${String(m).padStart(2, '0')}`
        };
    },

    _formatHseRate(value, decimals) {
        if (typeof HseMetrics !== 'undefined' && typeof HseMetrics.formatRateDisplay === 'function') {
            return HseMetrics.formatRateDisplay(value, decimals);
        }
        const n = parseFloat(value);
        if (!Number.isFinite(n)) return '0';
        return n.toFixed(decimals);
    },

    getMonthlySafetyStrings(lang) {
        const isAr = lang !== 'en';
        const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthNamesAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        return {
            dir: isAr ? 'rtl' : 'ltr',
            lang: isAr ? 'ar' : 'en',
            monthNames: isAr ? monthNamesAr : monthNamesEn,
            title: isAr ? 'تقرير السلامة الشهري' : 'Monthly Safety Report',
            generatedOn: isAr ? 'تاريخ الإنشاء' : 'Generated On',
            projectSite: isAr ? 'المشروع / الموقع' : 'Project / Site',
            reportingMonth: isAr ? 'شهر التقرير' : 'Reporting Month',
            preparedBy: isAr ? 'أُعد بواسطة' : 'Prepared By',
            client: isAr ? 'العميل' : 'Client',
            location: isAr ? 'الموقع' : 'Location',
            manHoursMonth: isAr ? 'ساعات العمل (الشهر)' : 'MAN-HOURS (MONTH)',
            recordables: isAr ? 'الحوادث القابلة للتسجيل (TRC)' : 'RECORDABLES (TRC)',
            trir: isAr ? 'TRIR (لكل 200 ألف)' : 'TRIR (PER 200K)',
            afr: isAr ? 'AFR (لكل مليون)' : 'AFR (PER 1M)',
            fr: isAr ? 'FR (LTI لكل مليون)' : 'FR (LTI PER 1M)',
            sr: isAr ? 'SR (الشدة لكل مليون)' : 'SR (SEVERITY PER 1M)',
            hseActivities: isAr ? 'أنشطة HSE (الأعداد)' : 'HSE Activities (Counts)',
            activity: isAr ? 'النشاط' : 'Activity',
            count: isAr ? 'العدد' : 'Count',
            trainingsConducted: isAr ? 'التدريبات المنفذة' : 'Trainings Conducted',
            participantsTrained: isAr ? 'المتدربون' : 'Participants Trained',
            auditsInspections: isAr ? 'التدقيق / الفحوصات' : 'Audits / Inspections',
            ptwsIssued: isAr ? 'تصاريح العمل الصادرة' : 'PTWs Issued',
            observations: isAr ? 'الملاحظات / بطاقات التوقف' : 'Observations / STOP Cards',
            toolboxTalks: isAr ? 'اجتماعات السلامة القصيرة' : 'Toolbox Talks (Count)',
            manpowerStatus: isAr ? 'الوضع الشهري للقوى العاملة' : 'Monthly Status of Manpower',
            metric: isAr ? 'المؤشر' : 'Metric',
            thisMonth: isAr ? 'هذا الشهر' : 'This Month',
            cumulative: isAr ? 'تراكمي' : 'Cumulative',
            manpowerAvg: isAr ? 'متوسط القوى العاملة' : 'Manpower (Avg.)',
            totalManDays: isAr ? 'إجمالي أيام العمل' : 'Total Man-days',
            totalManHours: isAr ? 'إجمالي ساعات العمل' : 'Total Man-hours',
            accidentReport: isAr ? 'تقرير الحوادث الشهري' : 'Monthly Accident Report',
            description: isAr ? 'الوصف' : 'Description',
            totalAccidents: isAr ? 'إجمالي عدد الحوادث' : 'Total Number of Accidents',
            reportableAccidents: isAr ? 'أ) حوادث قابلة للتبليغ' : 'a) Reportable Accidents',
            minorAccidents: isAr ? 'ب) حوادث بسيطة' : 'b) Minor Accidents',
            firstAidCases: isAr ? 'ج) إسعافات أولية' : 'c) First-aid cases',
            nearMiss: isAr ? 'د) حوادث وشيكة' : 'd) Near Miss Incidents',
            manDaysLost: isAr ? 'أيام العمل الضائعة بسبب الحوادث' : 'Man-days lost due to accidents',
            hseEvents: isAr ? 'أحداث وسجلات HSE' : 'HSE Events & Logs',
            hseCommittee: isAr ? 'اجتماع لجنة السلامة' : 'HSE Committee Meeting',
            hseWalks: isAr ? 'جولات السلامة' : 'HSE Walks',
            hseInduction: isAr ? 'تدريب تعريفي HSE' : 'HSE Induction Training',
            toolboxTraining: isAr ? 'تدريب اجتماع السلامة القصير' : 'Toolbox Talk Training',
            hseTraining: isAr ? 'تدريب HSE' : 'HSE Training',
            date: isAr ? 'التاريخ' : 'Date',
            withWhom: isAr ? 'مع (من)' : 'With (Whom)',
            persons: isAr ? 'عدد الأشخاص' : 'No. of Persons',
            topic: isAr ? 'الموضوع' : 'Topic',
            participants: isAr ? 'المشاركون' : 'Participants',
            hseMom: isAr ? 'محضر اجتماع السلامة (MOM)' : 'HSE Meeting (MOM)',
            discussionPoints: isAr ? 'نقاط النقاش' : 'Discussion Points',
            status: isAr ? 'الحالة' : 'Status',
            highlights: isAr ? 'أبرز الإنجازات / المبادرات' : 'Key Highlights / Initiatives',
            concerns: isAr ? 'المخاوف / الإجراءات' : 'Concerns / Actions',
            authorization: isAr ? 'الاعتماد' : 'Authorization',
            preparedBySign: isAr ? 'أُعد بواسطة' : 'Prepared by',
            reviewedBy: isAr ? 'راجعه' : 'Reviewed by',
            siteFacility: isAr ? 'المصنع / الموقع' : 'Factory / Site',
            allSites: isAr ? 'جميع المواقع' : 'All Sites',
            dash: '—',
            open: isAr ? 'مفتوح' : 'Open'
        };
    },

    _msrFmtNum(v) {
        const n = Number(v);
        if (!Number.isFinite(n)) return '0';
        return n.toLocaleString('en-US');
    },

    _msrFmtRate(v, d) {
        if (typeof HseMetrics !== 'undefined' && HseMetrics.formatRateDisplay) {
            return HseMetrics.formatRateDisplay(v, d);
        }
        return this._formatHseRate(v, d);
    },

    _msrFmtDate(value, lang) {
        if (!value) return '—';
        const d = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(d.getTime())) return '—';
        return d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-GB');
    },

    _msrInRange(item, dateFields, start, end) {
        return this._filterArrayByDateRange([item], dateFields, start, end).length > 0;
    },

    getMonthlySafetySites() {
        const defaults = [
            { id: 'factory-1', nameAr: 'مصنع 1', nameEn: 'Factory 1' },
            { id: 'factory-2', nameAr: 'مصنع 2', nameEn: 'Factory 2' },
            { id: 'warehouse-1', nameAr: 'المخازن', nameEn: 'Warehouses' }
        ];
        if (typeof DailyObservations !== 'undefined' && typeof DailyObservations.getAllSites === 'function') {
            const sites = DailyObservations.getAllSites();
            return defaults.map((def) => {
                const found = sites.find((s) => String(s.id || '').trim() === def.id);
                const name = String(found?.name || def.nameAr || '').trim();
                return {
                    id: def.id,
                    nameAr: def.id === 'warehouse-1' ? 'المخازن' : (name || def.nameAr),
                    nameEn: def.nameEn
                };
            });
        }
        return defaults;
    },

    getMonthlySafetySiteById(siteId) {
        const id = String(siteId || '').trim();
        if (!id) return null;
        return this.getMonthlySafetySites().find((s) => s.id === id) || null;
    },

    getMonthlySafetySiteLabel(site, lang) {
        if (!site) return '';
        return lang === 'en' ? (site.nameEn || site.nameAr) : (site.nameAr || site.nameEn);
    },

    _msrSiteMatchTokens(site) {
        const tokens = new Set();
        if (!site) return tokens;
        const push = (v) => {
            const x = String(v || '').trim().toLowerCase();
            if (x) tokens.add(x);
        };
        push(site.id);
        push(site.nameAr);
        push(site.nameEn);
        if (site.id === 'factory-1') {
            push('مصنع 1');
            push('factory 1');
            push('factory-1');
        }
        if (site.id === 'factory-2') {
            push('مصنع 2');
            push('factory 2');
            push('factory-2');
        }
        if (site.id === 'warehouse-1' || String(site.id).includes('warehouse') || String(site.nameAr).includes('مخزن')) {
            push('warehouse-1');
            push('warehouse');
            push('warehouses');
            push('مخزن 1');
            push('المخازن');
            push('مخازن');
        }
        return tokens;
    },

    _msrRecordMatchesSite(record, site) {
        if (!site || !record) return false;
        const tokens = this._msrSiteMatchTokens(site);
        const fields = [
            record.siteId,
            record.factoryId,
            record.factory,
            record.site,
            record.plant,
            record.locationId,
            record.plantId
        ];
        for (let i = 0; i < fields.length; i += 1) {
            const val = String(fields[i] || '').trim().toLowerCase();
            if (val && tokens.has(val)) return true;
        }
        const textFields = [
            record.siteName,
            record.factoryName,
            record.location,
            record.plantName,
            record.branch,
            record.department,
            record.area
        ];
        for (let j = 0; j < textFields.length; j += 1) {
            const text = String(textFields[j] || '').trim().toLowerCase();
            if (!text) continue;
            for (const token of tokens) {
                if (text === token || text.includes(token)) return true;
            }
        }
        return false;
    },

    filterAppDataForMonthlySafetySite(data, siteId) {
        const site = this.getMonthlySafetySiteById(siteId);
        if (!site || !data) return data;
        const pick = (key) => {
            const arr = data[key];
            return Array.isArray(arr) ? arr.filter((row) => this._msrRecordMatchesSite(row, site)) : arr;
        };
        return {
            ...data,
            incidents: pick('incidents'),
            nearmiss: pick('nearmiss'),
            ptw: pick('ptw'),
            dailyObservations: pick('dailyObservations'),
            training: pick('training'),
            contractorTrainings: pick('contractorTrainings'),
            trainingAttendance: pick('trainingAttendance'),
            violations: pick('violations'),
            clinicVisits: pick('clinicVisits'),
            safetyMeetings: pick('safetyMeetings'),
            inspectionTours: pick('inspectionTours'),
            periodicInspections: pick('periodicInspections'),
            incidentRegistry: pick('incidentRegistry'),
            dailySafetyCheckList: pick('dailySafetyCheckList')
        };
    },

    renderMonthlySafetySiteOptions(lang = 'ar') {
        return this.getMonthlySafetySites().map((site) => {
            const label = this.getMonthlySafetySiteLabel(site, lang);
            return `<option value="${Utils.escapeHTML(site.id)}">${Utils.escapeHTML(label)}</option>`;
        }).join('');
    },

    collectMonthlySafetyReportModel(data, period, siteId = null) {
        const scopedData = siteId ? this.filterAppDataForMonthlySafetySite(data, siteId) : data;
        const site = siteId ? this.getMonthlySafetySiteById(siteId) : null;
        const year = period.year;
        const monthIdx = period.month - 1;
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const yearStart = new Date(year, 0, 1);

        const mult = (typeof HseMetrics !== 'undefined' && HseMetrics.loadMultipliers)
            ? HseMetrics.loadMultipliers()
            : { TRIR: 200000, AFR: 1000000, FR: 1000000, SR: 1000000 };

        const monthTotals = (typeof HseMetrics !== 'undefined' && HseMetrics.aggregatePeriod)
            ? HseMetrics.aggregatePeriod(start, end, scopedData)
            : { recordables: 0, injuries: 0, fatalities: 0, lti: 0, daysLost: 0, manHours: 0, totalIncidents: 0 };

        const cumTotals = (typeof HseMetrics !== 'undefined' && HseMetrics.aggregatePeriod)
            ? HseMetrics.aggregatePeriod(yearStart, end, scopedData)
            : { ...monthTotals };

        const monthRates = (typeof HseMetrics !== 'undefined' && HseMetrics.computeRates)
            ? HseMetrics.computeRates(monthTotals, mult)
            : {};

        const monthlyBase = (typeof HseMetrics !== 'undefined' && HseMetrics.buildMonthlyBase)
            ? HseMetrics.buildMonthlyBase(year, scopedData)
            : null;

        const firstAidMonth = monthlyBase ? (monthlyBase.firstAid[monthIdx] || 0) : 0;
        const nltiMonth = monthlyBase ? (monthlyBase.nlti[monthIdx] || 0) : 0;
        const firstAidCum = monthlyBase && HseMetrics.sumSlice
            ? HseMetrics.sumSlice(monthlyBase.firstAid, monthIdx) : firstAidMonth;
        const nltiCum = monthlyBase && HseMetrics.sumSlice
            ? HseMetrics.sumSlice(monthlyBase.nlti, monthIdx) : nltiMonth;

        const nearmissAll = Array.isArray(scopedData.nearmiss) ? scopedData.nearmiss : [];
        const nearmissMonth = this._filterArrayByDateRange(nearmissAll, ['date', 'createdAt'], start, end).length;
        const nearmissCum = this._filterArrayByDateRange(nearmissAll, ['date', 'createdAt'], yearStart, end).length;

        const training = this._filterArrayByDateRange(scopedData.training || [], ['startDate', 'date', 'createdAt'], start, end);
        const contractorTrainings = this._filterArrayByDateRange(scopedData.contractorTrainings || [], ['date', 'trainingDate', 'startDate', 'createdAt'], start, end);
        const allTraining = training.concat(contractorTrainings);
        const participantsTrained = allTraining.reduce((sum, t) => {
            const n = typeof Training !== 'undefined' && Training.getParticipantsCount
                ? Training.getParticipantsCount(t)
                : (Number(t.participantsCount) || (t.participants || []).length || Number(t.traineesCount) || 0);
            return sum + (Number.isFinite(n) ? n : 0);
        }, 0);

        const inspections = this._filterArrayByDateRange(
            (scopedData.periodicInspections || []).concat(scopedData.inspectionTours || []),
            ['date', 'inspectionDate', 'createdAt', 'startDate'],
            start,
            end
        ).length;

        const ptwCount = this._filterArrayByDateRange(scopedData.ptw || [], ['startDate', 'date', 'createdAt'], start, end).length;
        const obsCount = this._filterArrayByDateRange(scopedData.dailyObservations || [], ['date', 'createdAt'], start, end).length;

        const meetings = this._filterArrayByDateRange(scopedData.safetyMeetings || [], ['date', 'meetingDate', 'createdAt'], start, end);
        const toolboxCount = meetings.filter((m) => {
            const text = `${m.type || ''} ${m.title || ''} ${m.name || ''}`.toLowerCase();
            return text.includes('toolbox') || text.includes('السلامة القصير') || text.includes('توولبوكس');
        }).length || allTraining.filter((t) => String(t.name || t.programName || '').toLowerCase().includes('toolbox')).length;

        const workCfg = (typeof HseMetrics !== 'undefined' && HseMetrics.getWorkConfig)
            ? HseMetrics.getWorkConfig()
            : { workDaysPerMonth: 22, hoursPerDay: 8 };
        const manpowerAvg = monthlyBase ? (monthlyBase.employeeCounts[monthIdx] || 0) : 0;
        const manDaysMonth = Math.round(manpowerAvg * (workCfg.workDaysPerMonth || 22));
        let manDaysCum = 0;
        let manpowerCumAvg = 0;
        if (monthlyBase) {
            for (let i = 0; i <= monthIdx; i += 1) {
                manDaysCum += Math.round((monthlyBase.employeeCounts[i] || 0) * (workCfg.workDaysPerMonth || 22));
            }
            manpowerCumAvg = monthIdx >= 0
                ? Math.round(HseMetrics.sumSlice(monthlyBase.employeeCounts, monthIdx) / (monthIdx + 1))
                : 0;
        }

        const trainingRows = allTraining.slice(0, 12).map((t) => ({
            date: t.startDate || t.date || t.createdAt,
            topic: t.name || t.programName || t.topic || '—',
            participants: typeof Training !== 'undefined' && Training.getParticipantsCount
                ? Training.getParticipantsCount(t)
                : (t.participantsCount || (t.participants || []).length || t.traineesCount || '—')
        }));

        const walkRows = this._filterArrayByDateRange(scopedData.inspectionTours || [], ['date', 'createdAt', 'startDate'], start, end)
            .slice(0, 6)
            .map((w) => ({
                date: w.date || w.startDate || w.createdAt,
                withWhom: w.inspectorName || w.conductedBy || w.leader || '—'
            }));

        const committeeMeetings = meetings.filter((m) => {
            const text = `${m.type || ''} ${m.title || ''}`.toLowerCase();
            return text.includes('committee') || text.includes('لجنة');
        });
        const momRows = (committeeMeetings.length ? committeeMeetings : meetings).slice(0, 5).map((m) => ({
            date: m.date || m.meetingDate || m.createdAt,
            points: m.notes || m.discussion || m.agenda || m.summary || '—',
            status: m.status || 'Open'
        }));

        const company = AppState?.companySettings || {};
        const userName = AppState?.currentUser?.name || AppState?.currentUser?.displayName || '';

        return {
            generatedAt: new Date(),
            siteId: siteId || null,
            site,
            projectSite: company.name || company.secondaryName || '—',
            client: company.secondaryName || company.name || '—',
            location: company.address || '—',
            preparedBy: userName || '—',
            monthTotals,
            cumTotals,
            monthRates,
            kpi: {
                manHours: monthTotals.manHours,
                recordables: monthTotals.recordables,
                trir: monthRates.trir,
                afr: monthRates.afr,
                fr: monthRates.fr,
                sr: monthRates.sr
            },
            activities: {
                trainings: allTraining.length,
                participants: participantsTrained,
                inspections,
                ptw: ptwCount,
                observations: obsCount,
                toolbox: toolboxCount
            },
            manpower: {
                avgMonth: manpowerAvg,
                avgCum: manpowerCumAvg,
                manDaysMonth,
                manDaysCum,
                manHoursMonth: monthTotals.manHours,
                manHoursCum: cumTotals.manHours
            },
            accidents: {
                reportableMonth: monthTotals.recordables,
                reportableCum: cumTotals.recordables,
                minorMonth: nltiMonth,
                minorCum: nltiCum,
                firstAidMonth,
                firstAidCum,
                nearMissMonth: nearmissMonth,
                nearMissCum: nearmissCum,
                daysLostMonth: monthTotals.daysLost,
                daysLostCum: cumTotals.daysLost,
                totalMonth: monthTotals.totalIncidents + nearmissMonth,
                totalCum: cumTotals.totalIncidents + nearmissCum
            },
            committeeDate: committeeMeetings[0]?.date || committeeMeetings[0]?.meetingDate || null,
            walkRows,
            inductionRows: trainingRows.slice(0, 4).map((r) => ({ date: r.date, persons: r.participants })),
            toolboxRows: trainingRows.filter((r) => String(r.topic).toLowerCase().includes('toolbox')).slice(0, 4),
            trainingRows,
            momRows,
            highlights: (company.monthlySafetyHighlights || '').trim() || '—',
            concerns: (company.monthlySafetyConcerns || '').trim() || '—'
        };
    },

    _getMonthlySafetyReportStyles(lang) {
        const isAr = lang !== 'en';
        const edgePad = isAr ? 'padding-right:16px;border-right:4px solid #003865' : 'padding-left:16px;border-left:4px solid #003865';
        return `<style>
.msr-report{color:#1f2937;line-height:1.55}
.msr-report[dir="ltr"] .section-title{${edgePad};border-right:none}
.msr-report .section-title{margin:22px 0 12px;font-size:16px;font-weight:700;color:#003865;${edgePad}}
.msr-report .msr-intro{margin-bottom:22px;padding:16px 20px;font-size:13px;line-height:1.8}
.msr-report .msr-intro-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px 18px}
.msr-report .msr-intro-item{display:flex;flex-direction:column;gap:3px}
.msr-report .msr-intro-label{font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:.04em}
.msr-report .msr-intro-value{font-size:13px;font-weight:600;color:#0f172a}
.msr-report .summary-grid{margin-bottom:22px;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.msr-report .summary-card{padding:14px 16px;border-radius:14px;box-shadow:0 12px 28px rgba(15,23,42,.1)}
.msr-report .summary-card .summary-label{font-size:10px;letter-spacing:.05em;text-transform:uppercase;margin-bottom:4px}
.msr-report .summary-card .summary-value{font-size:22px;font-weight:800}
.msr-report .msr-kpi-blue{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #93c5fd}
.msr-report .msr-kpi-blue .summary-label{color:#1d4ed8}
.msr-report .msr-kpi-blue .summary-value{color:#1e3a8a}
.msr-report .msr-kpi-warn{background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1px solid #fcd34d}
.msr-report .msr-kpi-warn .summary-label{color:#b45309}
.msr-report .msr-kpi-warn .summary-value{color:#92400e}
.msr-report .msr-kpi-green{background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:1px solid #6ee7b7}
.msr-report .msr-kpi-green .summary-label{color:#047857}
.msr-report .msr-kpi-green .summary-value{color:#065f46}
.msr-report .report-table{margin-bottom:18px;border-radius:14px;box-shadow:0 14px 32px rgba(15,23,42,.1);font-size:12px}
.msr-report .report-table thead th{padding:11px 14px;font-size:12px;background:linear-gradient(135deg,#003865,#1e40af)}
.msr-report .report-table tbody td{padding:10px 14px;font-size:12px}
.msr-report .report-table tbody tr:nth-child(even) td{background:#f8fafc}
.msr-report .msr-row-total td{background:linear-gradient(90deg,#eff6ff,#dbeafe)!important;font-weight:700;color:#1e40af}
.msr-report .msr-row-danger td{background:#fef2f2!important;color:#991b1b}
.msr-report .msr-row-warn td{background:#fffbeb!important;color:#92400e}
.msr-report .msr-row-info td{background:#f0f9ff!important;color:#0369a1}
.msr-report .msr-num{text-align:center;direction:ltr;font-weight:700;font-variant-numeric:tabular-nums}
.msr-report .msr-sub{display:block;font-size:11px;color:#64748b;margin-top:2px}
.msr-report .msr-subsection{margin:14px 0 8px;padding:8px 12px;background:linear-gradient(90deg,rgba(0,56,101,.08),rgba(30,64,175,.04));border-radius:10px;font-size:12px;font-weight:700;color:#003865}
.msr-report .msr-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:18px 0}
.msr-report .msr-note-card{border-radius:14px;padding:14px 16px;font-size:12px;line-height:1.7;min-height:88px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 8px 20px rgba(15,23,42,.06)}
.msr-report .msr-note-card h4{margin:0 0 10px;font-size:13px;font-weight:800}
.msr-report .msr-note-high{border-${isAr ? 'right' : 'left'}:4px solid #2563eb;background:linear-gradient(135deg,#eff6ff,#f8fafc)}
.msr-report .msr-note-high h4{color:#1d4ed8}
.msr-report .msr-note-concern{border-${isAr ? 'right' : 'left'}:4px solid #dc2626;background:linear-gradient(135deg,#fef2f2,#fff)}
.msr-report .msr-note-concern h4{color:#b91c1c}
.msr-report .msr-badge{display:inline-block;padding:3px 10px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.02em}
.msr-report .msr-badge-open{background:#fef3c7;color:#b45309;border:1px solid #fcd34d}
.msr-report .msr-badge-closed{background:#d1fae5;color:#047857;border:1px solid #6ee7b7}
.msr-report .msr-badge-progress{background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd}
.msr-report .msr-auth-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:4px 0 8px}
.msr-report .msr-auth-box{border:1px solid #cbd5e1;border-radius:12px;padding:14px;background:#f8fafc}
.msr-report .msr-auth-box strong{display:block;font-size:12px;color:#003865;margin-bottom:28px}
.msr-report .msr-auth-line{border-top:2px dotted #94a3b8;margin-top:8px;padding-top:6px;font-size:11px;color:#94a3b8;text-align:center}
.msr-report .msr-dash{color:#cbd5e1}
.msr-report .msr-empty td{color:#94a3b8;font-style:italic;text-align:center}
@media print{
.msr-report .summary-card,.msr-report .report-table thead th,.msr-report .msr-row-total td,.msr-report .msr-row-danger td,.msr-report .msr-row-warn td,.msr-report .msr-row-info td{
-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
}
</style>`;
    },

    _msrStatusBadge(status, lang) {
        const raw = String(status || '').trim().toLowerCase();
        let cls = 'msr-badge-progress';
        if (/closed|مغلق|منته|done|complete/.test(raw)) cls = 'msr-badge-closed';
        else if (/open|مفتوح|pending|قيد/.test(raw)) cls = 'msr-badge-open';
        return `<span class="msr-badge ${cls}">${Utils.escapeHTML(status || (lang === 'en' ? 'Open' : 'مفتوح'))}</span>`;
    },

    _msrKpiCard(label, value, variant = 'blue') {
        const esc = (v) => Utils.escapeHTML(v == null ? '' : String(v));
        return `<div class="summary-card msr-kpi-${variant}">
            <span class="summary-label">${esc(label)}</span>
            <span class="summary-value" dir="ltr">${esc(value)}</span>
        </div>`;
    },

    _msrTableRow(cells, rowClass = '') {
        const cls = rowClass ? ` class="${rowClass}"` : '';
        return `<tr${cls}>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`;
    },

    _msrEmptyRow(cols, dash) {
        return this._msrTableRow(new Array(cols).fill(`<span class="msr-dash">${dash}</span>`), 'msr-empty');
    },

    buildMonthlySafetyReportHtml(data, period, lang = 'ar', siteId = null) {
        const s = this.getMonthlySafetyStrings(lang);
        const m = this.collectMonthlySafetyReportModel(data, period, siteId);
        const esc = (v) => Utils.escapeHTML(v == null ? '' : String(v));
        const monthLabel = `${s.monthNames[period.month - 1] || ''} ${period.year}`;
        const site = m.site || this.getMonthlySafetySiteById(siteId);
        const siteLabel = site ? this.getMonthlySafetySiteLabel(site, lang) : s.allSites;
        const num = (v) => `<span class="msr-num">${esc(this._msrFmtNum(v))}</span>`;

        const content = `
${this._getMonthlySafetyReportStyles(lang)}
<div class="msr-report" id="monthly-safety-report-root" dir="${s.dir}">
  <div class="msr-intro permit-intro">
    <div class="msr-intro-grid">
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.reportingMonth)}</span><span class="msr-intro-value">${esc(monthLabel)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.siteFacility)}</span><span class="msr-intro-value">${esc(siteLabel)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.preparedBy)}</span><span class="msr-intro-value">${esc(m.preparedBy)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.projectSite)}</span><span class="msr-intro-value">${esc(m.projectSite)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.client)}</span><span class="msr-intro-value">${esc(m.client)}</span></div>
      <div class="msr-intro-item"><span class="msr-intro-label">${esc(s.location)}</span><span class="msr-intro-value">${esc(m.location)}</span></div>
    </div>
  </div>

  <div class="summary-grid">
    ${this._msrKpiCard(s.manHoursMonth, this._msrFmtNum(m.kpi.manHours), 'blue')}
    ${this._msrKpiCard(s.recordables, this._msrFmtNum(m.kpi.recordables), 'warn')}
    ${this._msrKpiCard(s.trir, this._msrFmtRate(m.kpi.trir, 2), 'green')}
    ${this._msrKpiCard(s.afr, this._msrFmtRate(m.kpi.afr, 2), 'green')}
    ${this._msrKpiCard(s.fr, this._msrFmtRate(m.kpi.fr, 2), 'green')}
    ${this._msrKpiCard(s.sr, this._msrFmtRate(m.kpi.sr, 2), 'green')}
  </div>

  <h3 class="section-title">${esc(s.hseActivities)}</h3>
  <table class="report-table">
    <thead><tr><th>${esc(s.activity)}</th><th style="text-align:center">${esc(s.count)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([esc(s.trainingsConducted), num(m.activities.trainings)])}
      ${this._msrTableRow([esc(s.participantsTrained), num(m.activities.participants)])}
      ${this._msrTableRow([esc(s.auditsInspections), num(m.activities.inspections)])}
      ${this._msrTableRow([esc(s.ptwsIssued), num(m.activities.ptw)])}
      ${this._msrTableRow([esc(s.observations), num(m.activities.observations)])}
      ${this._msrTableRow([esc(s.toolboxTalks), num(m.activities.toolbox)])}
    </tbody>
  </table>

  <h3 class="section-title">${esc(s.manpowerStatus)}</h3>
  <table class="report-table">
    <thead><tr><th>${esc(s.metric)}</th><th style="text-align:center">${esc(s.thisMonth)}</th><th style="text-align:center">${esc(s.cumulative)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([esc(s.manpowerAvg), num(m.manpower.avgMonth), num(m.manpower.avgCum)])}
      ${this._msrTableRow([esc(s.totalManDays), num(m.manpower.manDaysMonth), num(m.manpower.manDaysCum)])}
      ${this._msrTableRow([`<strong>${esc(s.totalManHours)}</strong>`, num(m.manpower.manHoursMonth), num(m.manpower.manHoursCum)], 'msr-row-total')}
    </tbody>
  </table>

  <h3 class="section-title">${esc(s.accidentReport)}</h3>
  <table class="report-table">
    <thead><tr><th>${esc(s.description)}</th><th style="text-align:center">${esc(s.thisMonth)}</th><th style="text-align:center">${esc(s.cumulative)}</th></tr></thead>
    <tbody>
      ${this._msrTableRow([`<strong>${esc(s.totalAccidents)}</strong>`, num(m.accidents.totalMonth), num(m.accidents.totalCum)], 'msr-row-total')}
      ${this._msrTableRow([`<span>${esc(s.reportableAccidents)}</span>`, num(m.accidents.reportableMonth), num(m.accidents.reportableCum)], 'msr-row-danger')}
      ${this._msrTableRow([`<span>${esc(s.minorAccidents)}</span>`, num(m.accidents.minorMonth), num(m.accidents.minorCum)], 'msr-row-warn')}
      ${this._msrTableRow([`<span>${esc(s.firstAidCases)}</span>`, num(m.accidents.firstAidMonth), num(m.accidents.firstAidCum)], 'msr-row-warn')}
      ${this._msrTableRow([`<span>${esc(s.nearMiss)}</span>`, num(m.accidents.nearMissMonth), num(m.accidents.nearMissCum)], 'msr-row-info')}
      ${this._msrTableRow([esc(s.manDaysLost), num(m.accidents.daysLostMonth), num(m.accidents.daysLostCum)])}
    </tbody>
  </table>

  <h3 class="section-title">${esc(s.hseEvents)}</h3>
  <div class="msr-subsection">${esc(s.hseCommittee)} — ${esc(s.date)}: ${esc(this._msrFmtDate(m.committeeDate, lang))}</div>
  <table class="report-table">
    <thead><tr><th>${esc(s.hseWalks)} — ${esc(s.date)}</th><th>${esc(s.withWhom)}</th></tr></thead>
    <tbody>${m.walkRows.length ? m.walkRows.map((r) => this._msrTableRow([esc(this._msrFmtDate(r.date, lang)), esc(r.withWhom)])).join('') : this._msrEmptyRow(2, s.dash)}</tbody>
  </table>
  <div class="msr-subsection">${esc(s.hseInduction)}</div>
  <table class="report-table">
    <thead><tr><th>${esc(s.date)}</th><th style="text-align:center">${esc(s.persons)}</th></tr></thead>
    <tbody>${m.inductionRows.length ? m.inductionRows.map((r) => this._msrTableRow([esc(this._msrFmtDate(r.date, lang)), `<span class="msr-num">${esc(r.persons)}</span>`])).join('') : this._msrEmptyRow(2, s.dash)}</tbody>
  </table>
  <div class="msr-subsection">${esc(s.toolboxTraining)}</div>
  <table class="report-table">
    <thead><tr><th>${esc(s.date)}</th><th>${esc(s.topic)}</th><th style="text-align:center">${esc(s.participants)}</th></tr></thead>
    <tbody>${m.toolboxRows.length ? m.toolboxRows.map((r) => this._msrTableRow([esc(this._msrFmtDate(r.date, lang)), esc(r.topic), `<span class="msr-num">${esc(r.participants)}</span>`])).join('') : this._msrEmptyRow(3, s.dash)}</tbody>
  </table>
  <div class="msr-subsection">${esc(s.hseTraining)}</div>
  <table class="report-table">
    <thead><tr><th>${esc(s.date)}</th><th>${esc(s.topic)}</th><th style="text-align:center">${esc(s.participants)}</th></tr></thead>
    <tbody>${m.trainingRows.length ? m.trainingRows.map((r) => this._msrTableRow([esc(this._msrFmtDate(r.date, lang)), esc(r.topic), `<span class="msr-num">${esc(r.participants)}</span>`])).join('') : this._msrEmptyRow(3, s.dash)}</tbody>
  </table>

  <h3 class="section-title">${esc(s.hseMom)}</h3>
  <table class="report-table">
    <thead><tr><th>${esc(s.date)}</th><th>${esc(s.discussionPoints)}</th><th style="text-align:center">${esc(s.status)}</th></tr></thead>
    <tbody>${m.momRows.length ? m.momRows.map((r) => this._msrTableRow([
        esc(this._msrFmtDate(r.date, lang)),
        esc(r.points),
        this._msrStatusBadge(r.status || s.open, lang)
    ])).join('') : this._msrEmptyRow(3, s.dash)}</tbody>
  </table>

  <div class="msr-grid-2">
    <div class="msr-note-card msr-note-high"><h4>${esc(s.highlights)}</h4><div>${esc(m.highlights)}</div></div>
    <div class="msr-note-card msr-note-concern"><h4>${esc(s.concerns)}</h4><div>${esc(m.concerns)}</div></div>
  </div>

  <h3 class="section-title">${esc(s.authorization)}</h3>
  <div class="msr-auth-grid">
    <div class="msr-auth-box"><strong>${esc(s.preparedBySign)}</strong><div class="msr-auth-line">${s.dash}</div></div>
    <div class="msr-auth-box"><strong>${esc(s.reviewedBy)}</strong><div class="msr-auth-line">${s.dash}</div></div>
  </div>
</div>`;

        const formCode = `MSR-${period.label}-${siteId || 'ALL'}`;
        const title = site ? `${s.title} — ${siteLabel}` : s.title;
        const pdfMeta = {
            source: 'MonthlySafetyReport',
            titleEn: site ? `Monthly Safety Report — ${site.nameEn || siteLabel}` : 'Monthly Safety Report',
            titleAr: site ? `تقرير السلامة الشهري — ${site.nameAr || siteLabel}` : 'تقرير السلامة الشهري',
            includeQRCode: false,
            compactPdfFooter: true,
            headerLayoutLtr: lang === 'en',
            ReportingMonth: monthLabel,
            Site: siteLabel,
            'شهر التقرير': monthLabel,
            'الموقع': siteLabel,
            'أُعد بواسطة': m.preparedBy
        };

        if (typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML) {
            return FormHeader.generatePDFHTML(
                formCode,
                title,
                content,
                false,
                false,
                pdfMeta,
                new Date().toISOString(),
                new Date().toISOString()
            );
        }

        return `<!DOCTYPE html><html lang="${s.lang}" dir="${s.dir}"><head><meta charset="UTF-8"><title>${esc(title)}</title></head><body>${content}</body></html>`;
    },

    async ensureMonthlySafetyPdfLibs() {
        if (typeof html2canvas !== 'undefined' && Utils?.PdfExport?.getJsPdfConstructor?.()) {
            return true;
        }
        const loadScript = (src) => new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
        if (typeof html2canvas === 'undefined') {
            await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
        }
        if (!Utils?.PdfExport?.getJsPdfConstructor?.()) {
            await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
        }
        return typeof html2canvas !== 'undefined' && !!Utils?.PdfExport?.getJsPdfConstructor?.();
    },

    async _msrPreparePdfHtml(html, lang) {
        let prepared = String(html || '');
        const colorFix = `<style id="msr-pdf-color-fix">*{ -webkit-print-color-adjust:exact!important; print-color-adjust:exact!important; }</style>`;
        if (prepared.includes('</head>')) {
            prepared = prepared.replace('</head>', `${colorFix}</head>`);
        }
        if (lang === 'ar' && prepared.includes('</head>')) {
            const fontFix = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet">
<style id="msr-arabic-font-fix">html,body,.report-wrapper,.report-wrapper *{font-family:'Cairo','Tahoma','Segoe UI',sans-serif!important}</style>`;
            prepared = prepared.replace('</head>', `${fontFix}</head>`);
        }
        return prepared;
    },

    async _msrWaitPdfFonts(doc) {
        if (!doc?.fonts?.load) return;
        try {
            await Promise.all([
                doc.fonts.load("400 12px Cairo"),
                doc.fonts.load("700 16px Cairo")
            ]);
            await doc.fonts.ready;
        } catch (_e) { /* ignore */ }
    },

    async _msrCaptureReportCanvas(root) {
        const base = {
            backgroundColor: '#ffffff',
            logging: false,
            scrollX: 0,
            scrollY: 0,
            windowWidth: Math.max(root.scrollWidth, 900),
            windowHeight: Math.max(root.scrollHeight, 1),
            onclone: (clonedDoc) => {
                const style = clonedDoc.createElement('style');
                style.textContent = '*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}';
                clonedDoc.head.appendChild(style);
            }
        };
        const scale = Utils.PdfExport.getOptimalCaptureScale(root.scrollWidth, root.scrollHeight, 1.5);
        const attempts = [
            { ...base, scale, useCORS: true, allowTaint: false },
            { ...base, scale, useCORS: true, allowTaint: true },
            { ...base, scale: Math.min(scale, 1.3), useCORS: false, allowTaint: true }
        ];
        let lastError = null;
        for (let i = 0; i < attempts.length; i += 1) {
            try {
                const canvas = await html2canvas(root, attempts[i]);
                if (canvas?.width > 0 && canvas?.height > 0) return canvas;
            } catch (err) {
                lastError = err;
            }
        }
        if (lastError) throw lastError;
        return null;
    },

    async downloadMonthlySafetyReport(period, lang = 'ar', siteId = null) {
        const { t } = this.getTranslations();
        if (!period) {
            Notification.error(t('msg.invalidMonthYear'));
            return false;
        }
        if (typeof AppState === 'undefined' || !AppState.appData) {
            Notification.error(t('msg.noData'));
            return false;
        }

        await this.ensureTrainingDataForReport();
        const html = await this._msrPreparePdfHtml(
            this.buildMonthlySafetyReportHtml(AppState.appData, period, lang, siteId),
            lang
        );
        const siteSuffix = siteId ? `_${siteId}` : '';
        const fileName = `Monthly_Safety_Report_${period.label}${siteSuffix}_${lang}.pdf`;

        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.cssText = 'position:fixed;left:-100000px;top:0;width:900px;height:1400px;border:0;visibility:hidden;';
        document.body.appendChild(iframe);

        try {
            const okLibs = await this.ensureMonthlySafetyPdfLibs();
            if (!okLibs) {
                Notification.error(t('msg.allowPopups'));
                return false;
            }

            iframe.srcdoc = html;
            await new Promise((resolve) => {
                iframe.onload = resolve;
                iframe.onerror = resolve;
                setTimeout(resolve, 5000);
            });

            const iDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iDoc) return false;

            await this._msrWaitPdfFonts(iDoc);

            await Promise.all(Array.from(iDoc.images || []).map((img) => new Promise((resolve) => {
                if (img.complete) return resolve();
                img.onload = resolve;
                img.onerror = resolve;
                setTimeout(resolve, 3000);
            })));

            const root = iDoc.querySelector('.report-wrapper') || iDoc.getElementById('monthly-safety-report-root') || iDoc.body;
            const canvas = await this._msrCaptureReportCanvas(root);
            if (!canvas) return false;

            const pdf = Utils.PdfExport.createPdf({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            if (!pdf) return false;
            Utils.PdfExport.appendCanvasAsPdfPages(pdf, canvas, { marginMm: 8 });
            Utils.PdfExport.savePdf(pdf, fileName);
            return true;
        } catch (err) {
            if (typeof Utils !== 'undefined' && Utils.safeError) Utils.safeError('downloadMonthlySafetyReport:', err);
            Notification.error((err && err.message) || 'فشل تحميل التقرير');
            return false;
        } finally {
            iframe.remove();
        }
    },

    async generateAndExport(type, options = {}) {
        let printWindow = null;
        try {
            const { t } = this.getTranslations();

            if (typeof AppState === 'undefined' || !AppState.appData) {
                Notification.error(t('msg.noData'));
                return;
            }

            // فتح النافذة فوراً عند نقرة المستخدم لتجنب منع المتصفح للنوافذ المنبثقة (قبل أي await)
            printWindow = window.open('', '_blank');
            if (!printWindow) {
                Notification.error(t('msg.allowPopups'));
                return;
            }
            printWindow.document.write('<html dir="rtl"><body style="font-family: Arial; padding: 20px; text-align: center;"><p>جاري تحضير التقرير...</p></body></html>');
            printWindow.document.close();

            if (type === 'full' || type === 'period') {
                await this.ensureTrainingDataForReport();
            }

            const data = AppState.appData;
            let title = '';
            let content = '';
            let formCode = `REPORT-${String(type).toUpperCase()}-${new Date().toISOString().slice(0, 10)}`;
            let pdfMeta = { version: AppState?.companySettings?.formVersion || '1.0' };

            switch (type) {
                case 'incidents':
                    title = t('report.incidents');
                    const incidentsData = data.incidents || [];
                    if (!Array.isArray(incidentsData)) {
                        Notification.error(t('msg.incidentsInvalid'));
                        if (printWindow) printWindow.close();
                        return;
                    }
                    content = this.generateIncidentsReport(incidentsData);
                    break;
                case 'training':
                    title = t('report.training');
                    const trainingData = data.training || [];
                    if (!Array.isArray(trainingData)) {
                        Notification.error(t('msg.trainingInvalid'));
                        if (printWindow) printWindow.close();
                        return;
                    }
                    content = this.generateTrainingReport(trainingData);
                    break;
                case 'period': {
                    const period = options.period || await this._askForPeriod();
                    if (!period) {
                        if (printWindow) printWindow.close();
                        return;
                    }
                    title = `${t('report.periodSummary')} - ${period.label}`;
                    content = this.generatePeriodSummaryReport(data, period);
                    break;
                }
                case 'full':
                    title = t('report.full');
                    content = this.generateFullReport(data);
                    break;
                default:
                    if (printWindow) printWindow.close();
                    throw new Error(t('msg.unknownReport'));
            }

            const htmlContent = typeof FormHeader !== 'undefined' && FormHeader.generatePDFHTML
                ? FormHeader.generatePDFHTML(formCode, title, content, false, true, pdfMeta, new Date().toISOString(), new Date().toISOString())
                : `<html><body>${content}</body></html>`;

            printWindow.document.open();
            printWindow.document.write(htmlContent);
            printWindow.document.close();

            setTimeout(() => {
                try {
                    printWindow.print();
                } catch (e) {
                    if (typeof Utils !== 'undefined' && Utils.safeWarn) Utils.safeWarn('طباعة التقرير:', e);
                }
            }, 300);
        } catch (err) {
            if (printWindow && typeof printWindow.close === 'function') printWindow.close();
            const msg = (typeof Notification !== 'undefined' && Notification.error)
                ? (err && err.message) || 'حدث خطأ عند استخراج التقرير'
                : (err && err.message) || 'حدث خطأ عند استخراج التقرير';
            if (typeof Notification !== 'undefined' && Notification.error) {
                Notification.error(msg);
            } else {
                console.error('Reports.generateAndExport:', err);
            }
        }
    },

    generateIncidentsReport(incidents) {
        const { t, lang } = this.getTranslations();
        const dateLocale = lang === 'ar' ? 'ar-SA' : 'en-GB';
        return `
            <div class="section-title">${t('report.totalIncidents')}: ${incidents.length}</div>
            <p style="margin-bottom: 20px; color: #666;">${t('report.createdDate')}: ${new Date().toLocaleDateString(dateLocale)}</p>
            <table>
                <thead>
                    <tr>
                        <th>${t('report.isoCode')}</th>
                        <th>${t('report.date')}</th>
                        <th>${t('report.location')}</th>
                        <th>${t('report.severity')}</th>
                        <th>${t('report.status')}</th>
                        <th>${t('report.description')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${incidents.map(incident => `
                        <tr>
                            <td>${Utils.escapeHTML(incident.isoCode || '')}</td>
                            <td>${incident.date ? Utils.formatDate(incident.date) : ''}</td>
                            <td>${Utils.escapeHTML(incident.location || '')}</td>
                            <td>${Utils.escapeHTML(incident.severity || '')}</td>
                            <td>${Utils.escapeHTML(incident.status || '')}</td>
                            <td>${Utils.escapeHTML((incident.description || '').substring(0, 100))}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    generatePeriodSummaryReport(data, period) {
        const { t, lang } = this.getTranslations();
        const dateLocale = lang === 'ar' ? 'ar-SA' : 'en-GB';
        const startDate = period && period.startDate ? new Date(period.startDate) : null;
        const endDate = period && period.endDate ? new Date(period.endDate) : null;

        const incidents = this._filterArrayByDateRange(data.incidents || [], ['date', 'incidentDate', 'createdAt'], startDate, endDate);
        const nearmiss = this._filterArrayByDateRange(data.nearmiss || [], ['date', 'createdAt'], startDate, endDate);
        const ptw = this._filterArrayByDateRange(data.ptw || [], ['startDate', 'date', 'createdAt', 'endDate'], startDate, endDate);
        const observations = this._filterArrayByDateRange(data.dailyObservations || [], ['date', 'createdAt'], startDate, endDate);
        const clinicVisits = this._filterArrayByDateRange(data.clinicVisits || [], ['visitDate', 'date', 'createdAt'], startDate, endDate);

        const trainingAll = data.training || [];
        const trainingAttendanceAll = data.trainingAttendance || [];
        const contractorTrainingsAll = data.contractorTrainings || [];

        const training = this._filterArrayByDateRange(trainingAll, ['startDate', 'date', 'createdAt'], startDate, endDate);
        const trainingAttendance = this._filterArrayByDateRange(trainingAttendanceAll, ['date', 'attendanceDate', 'createdAt'], startDate, endDate);
        const contractorTrainings = this._filterArrayByDateRange(contractorTrainingsAll, ['date', 'trainingDate', 'startDate', 'createdAt'], startDate, endDate);

        const violationsAll = data.violations || [];
        const violations = this._filterArrayByDateRange(violationsAll, ['date', 'violationDate', 'createdAt'], startDate, endDate);

        // تدريب الموظفين
        const allParticipants = [];
        let totalTrainingHoursEmployees = 0;
        const uniqueEmployeeCodes = new Set();

        trainingAttendance.forEach(record => {
            if (record.employeeCode) uniqueEmployeeCodes.add(String(record.employeeCode).trim());
        });

        training.forEach(t => {
            if (t.participants && Array.isArray(t.participants)) {
                t.participants.forEach(p => {
                    const code = p.code || p.employeeNumber;
                    if (code && !allParticipants.find(ap => (ap.code || ap.employeeNumber) === code)) {
                        allParticipants.push(p);
                    }
                });
            }
            if (t.hours) {
                totalTrainingHoursEmployees += Number(parseFloat(t.hours)) || 0;
            } else if (t.duration) {
                totalTrainingHoursEmployees += Number(parseFloat(t.duration)) || 0;
            } else if (t.startTime && t.endTime) {
                try {
                    const start = new Date(`2000-01-01 ${t.startTime}`);
                    const end = new Date(`2000-01-01 ${t.endTime}`);
                    const diff = (end - start) / (1000 * 60 * 60);
                    totalTrainingHoursEmployees += Number.isFinite(diff) ? diff : 0;
                } catch (e) { /* ignore */ }
            }
        });

        const attendanceHours = trainingAttendance.reduce((sum, r) => {
            const h = parseFloat(r.totalHours);
            return sum + (Number.isFinite(h) ? h : 0);
        }, 0);
        if (attendanceHours > 0) {
            totalTrainingHoursEmployees = attendanceHours;
        }

        const countFromParticipants = allParticipants.length;
        const countFromTraining = typeof Training !== 'undefined' && Training.getParticipantsCount
            ? training.reduce((acc, t) => acc + Training.getParticipantsCount(t), 0)
            : training.reduce((acc, t) => {
                const n = Number(t.participantsCount) || 0;
                return acc + (Number.isFinite(n) ? n : 0);
            }, 0);
        const uniqueTrainees = uniqueEmployeeCodes.size > 0
            ? uniqueEmployeeCodes.size
            : (countFromParticipants > 0 ? countFromParticipants : countFromTraining);
        const avgTrainingHours = uniqueTrainees > 0
            ? (Number(totalTrainingHoursEmployees) / Number(uniqueTrainees)).toFixed(2)
            : '0.00';

        // عدد البرامج والموضوعات - الموظفين
        const employeeTrainingPrograms = training.length;
        const employeeTopicsSet = new Set();
        training.forEach(t => {
            const name = (t.name || t.programName || '').toString().trim();
            if (name) employeeTopicsSet.add(name);
        });
        const employeeTrainingTopics = employeeTopicsSet.size || employeeTrainingPrograms;

        // تدريب المقاولين
        const contractorTraineesCount = contractorTrainings.reduce((sum, t) => {
            const n = Number(t.traineesCount || t.attendees || 0);
            return sum + (Number.isFinite(n) ? n : 0);
        }, 0);
        const contractorTotalHours = contractorTrainings.reduce((sum, t) => {
            const h = parseFloat(t.totalHours || t.trainingHours || 0);
            return sum + (Number.isFinite(h) ? h : 0);
        }, 0);
        const contractorAvgHours = contractorTraineesCount > 0
            ? (contractorTotalHours / contractorTraineesCount).toFixed(2)
            : '0.00';

        const contractorTrainingPrograms = contractorTrainings.length;
        const contractorTopicsSet = new Set();
        contractorTrainings.forEach(t => {
            const name = (t.name || t.trainingName || t.topic || '').toString().trim();
            if (name) contractorTopicsSet.add(name);
        });
        const contractorTrainingTopics = contractorTopicsSet.size || contractorTrainingPrograms;

        // إحصائيات المخالفات
        const employeeViolations = violations.filter(v => v.violationType === 'موظفين' || v.category === 'موظفين' || (!v.contractorName && v.employeeName));
        const contractorViolations = violations.filter(v => v.violationType === 'مقاولين' || v.category === 'مقاولين' || v.contractorName);
        const violationsByDepartment = {};
        const violationsByType = {};

        violations.forEach(v => {
            const dept = v.department || v.employeeDepartment || 'غير محدد';
            violationsByDepartment[dept] = (violationsByDepartment[dept] || 0) + 1;
            const vType = (v.violationType || 'غير محدد').trim() || 'غير محدد';
            violationsByType[vType] = (violationsByType[vType] || 0) + 1;
        });

        const violationsByDeptHTML = Object.keys(violationsByDepartment).map(dept =>
            `<tr><td>${Utils.escapeHTML(dept)}</td><td>${violationsByDepartment[dept]}</td></tr>`
        ).join('');
        const violationsByTypeHTML = Object.keys(violationsByType).map(type =>
            `<tr><td>${Utils.escapeHTML(type)}</td><td>${violationsByType[type]}</td></tr>`
        ).join('');

        const hourLabel = t('report.hour');
        const periodTypeLabel = period.type === 'yearly' ? t('report.periodTypeYearly') : t('report.periodTypeMonthly');
        const periodRangeLabel = (startDate && endDate)
            ? `${startDate.toLocaleDateString(dateLocale)} - ${endDate.toLocaleDateString(dateLocale)}`
            : period.label;

        return `
            <div class="section-title">${t('report.periodSummary')}</div>
            <p style="margin-bottom: 10px; color: #666;">
                ${t('report.period')}: ${Utils.escapeHTML(periodRangeLabel)} (${Utils.escapeHTML(periodTypeLabel)})
            </p>
            <p style="margin-bottom: 20px; color: #666;">
                ${t('report.createdDate')}: ${new Date().toLocaleDateString(dateLocale)}
            </p>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.basicStats')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.type')}</th>
                        <th>${t('report.total')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.ptw')}</td>
                        <td>${ptw.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.observations')}</td>
                        <td>${observations.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.incidentsRow')}</td>
                        <td>${incidents.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.nearmiss')}</td>
                        <td>${nearmiss.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.clinicVisits')}</td>
                        <td>${clinicVisits.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.trainingPrograms')}</td>
                        <td>${training.length + contractorTrainings.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.violations')}</td>
                        <td>${violations.length}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.trainingSection')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.employeeTrainingPrograms')}</td>
                        <td>${employeeTrainingPrograms}</td>
                    </tr>
                    <tr>
                        <td>${t('report.employeeTrainingTopics')}</td>
                        <td>${employeeTrainingTopics}</td>
                    </tr>
                    <tr>
                        <td>${t('report.traineesCount')}</td>
                        <td>${uniqueTrainees}</td>
                    </tr>
                    <tr>
                        <td>${t('report.avgTrainingHoursEmployees')}</td>
                        <td>${avgTrainingHours} ${hourLabel}</td>
                    </tr>
                    <tr>
                        <td>${t('report.totalTrainingHoursEmployees')}</td>
                        <td>${Number(totalTrainingHoursEmployees).toFixed(2)} ${hourLabel}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.trainingContractors')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.contractorTrainingPrograms')}</td>
                        <td>${contractorTrainingPrograms}</td>
                    </tr>
                    <tr>
                        <td>${t('report.contractorTrainingTopics')}</td>
                        <td>${contractorTrainingTopics}</td>
                    </tr>
                    <tr>
                        <td>${t('report.traineesContractors')}</td>
                        <td>${contractorTraineesCount}</td>
                    </tr>
                    <tr>
                        <td>${t('report.avgTrainingContractors')}</td>
                        <td>${contractorAvgHours} ${hourLabel}</td>
                    </tr>
                    <tr>
                        <td>${t('report.totalTrainingContractors')}</td>
                        <td>${Number(contractorTotalHours).toFixed(2)} ${hourLabel}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsSection')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.employeeViolations')}</td>
                        <td>${employeeViolations.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.contractorViolations')}</td>
                        <td>${contractorViolations.length}</td>
                    </tr>
                </tbody>
            </table>

            ${violationsByTypeHTML ? `
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsByType')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.violationType')}</th>
                        <th>${t('report.violationsCount')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${violationsByTypeHTML}
                </tbody>
            </table>
            ` : ''}

            ${violationsByDeptHTML ? `
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsByDept')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.department')}</th>
                        <th>${t('report.violationsCount')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${violationsByDeptHTML}
                </tbody>
            </table>
            ` : ''}
        `;
    },

    generateTrainingReport(training) {
        const { t, lang } = this.getTranslations();
        const dateLocale = lang === 'ar' ? 'ar-SA' : 'en-GB';
        return `
            <div class="section-title">${t('report.totalPrograms')}: ${training.length}</div>
            <p style="margin-bottom: 20px; color: #666;">${t('report.createdDate')}: ${new Date().toLocaleDateString(dateLocale)}</p>
            <table>
                <thead>
                    <tr>
                        <th>${t('report.programName')}</th>
                        <th>${t('report.date')}</th>
                        <th>${t('report.trainer')}</th>
                        <th>${t('report.participantsCount')}</th>
                        <th>${t('report.status')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${training.map(tr => `
                        <tr>
                            <td>${Utils.escapeHTML(tr.name || '')}</td>
                            <td>${tr.startDate ? Utils.formatDate(tr.startDate) : ''}</td>
                            <td>${Utils.escapeHTML(tr.trainer || '')}</td>
                            <td>${typeof Training !== 'undefined' && Training.getParticipantsCount ? Training.getParticipantsCount(tr) : (tr.participants?.length || tr.participantsCount || 0)}</td>
                            <td>${Utils.escapeHTML(tr.status || '')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    generateFullReport(data) {
        // حساب إحصائيات التدريب للموظفين
        const training = data.training || [];
        const trainingAttendance = data.trainingAttendance || [];
        const contractorTrainings = data.contractorTrainings || [];
        const allParticipants = [];
        let totalTrainingHoursEmployees = 0;

        // عدد المتدربين الفريدين من سجلات الحضور (أدق مصدر)
        const uniqueEmployeeCodes = new Set();
        trainingAttendance.forEach(record => {
            if (record.employeeCode) uniqueEmployeeCodes.add(String(record.employeeCode).trim());
        });

        training.forEach(t => {
            if (t.participants && Array.isArray(t.participants)) {
                t.participants.forEach(p => {
                    const code = p.code || p.employeeNumber;
                    if (code && !allParticipants.find(ap => (ap.code || ap.employeeNumber) === code)) {
                        allParticipants.push(p);
                    }
                });
            }
            // حساب ساعات التدريب من برامج التدريب (إذا لم تُستخدم trainingAttendance)
            if (t.hours) {
                totalTrainingHoursEmployees += Number(parseFloat(t.hours)) || 0;
            } else if (t.duration) {
                totalTrainingHoursEmployees += Number(parseFloat(t.duration)) || 0;
            } else if (t.startTime && t.endTime) {
                try {
                    const start = new Date(`2000-01-01 ${t.startTime}`);
                    const end = new Date(`2000-01-01 ${t.endTime}`);
                    const diff = (end - start) / (1000 * 60 * 60);
                    totalTrainingHoursEmployees += Number.isFinite(diff) ? diff : 0;
                } catch (e) { /* تجاهل */ }
            }
        });

        // ساعات التدريب من سجلات الحضور (مصدر أساسي عند التوفر)
        const attendanceHours = trainingAttendance.reduce((sum, r) => {
            const h = parseFloat(r.totalHours);
            return sum + (Number.isFinite(h) ? h : 0);
        }, 0);
        if (attendanceHours > 0) {
            totalTrainingHoursEmployees = attendanceHours;
        }

        // عدد المتدربين: أولوية لسجلات الحضور ثم للمشاركين الفريدين ثم لمجموع participantsCount (كأرقام دائماً)
        const countFromParticipants = allParticipants.length;
        const countFromTraining = typeof Training !== 'undefined' && Training.getParticipantsCount
            ? training.reduce((acc, t) => acc + Training.getParticipantsCount(t), 0)
            : training.reduce((acc, t) => {
                const n = Number(t.participantsCount) || 0;
                return acc + (Number.isFinite(n) ? n : 0);
            }, 0);
        const uniqueTrainees = uniqueEmployeeCodes.size > 0
            ? uniqueEmployeeCodes.size
            : (countFromParticipants > 0 ? countFromParticipants : countFromTraining);
        const avgTrainingHours = uniqueTrainees > 0
            ? (Number(totalTrainingHoursEmployees) / Number(uniqueTrainees)).toFixed(2)
            : '0.00';

        // حساب إحصائيات التدريب للمقاولين
        const contractorTraineesCount = contractorTrainings.reduce((sum, t) => {
            const n = Number(t.traineesCount || t.attendees || 0);
            return sum + (Number.isFinite(n) ? n : 0);
        }, 0);
        const contractorTotalHours = contractorTrainings.reduce((sum, t) => {
            const h = parseFloat(t.totalHours || t.trainingHours || 0);
            return sum + (Number.isFinite(h) ? h : 0);
        }, 0);
        const contractorAvgHours = contractorTraineesCount > 0
            ? (contractorTotalHours / contractorTraineesCount).toFixed(2)
            : '0.00';

        // حساب إحصائيات المخالات
        const violations = data.violations || [];
        const employeeViolations = violations.filter(v => v.violationType === 'موظفين' || v.category === 'موظفين' || (!v.contractorName && v.employeeName));
        const contractorViolations = violations.filter(v => v.violationType === 'مقاولين' || v.category === 'مقاولين' || v.contractorName);
        const violationsByDepartment = {};
        const violationsByType = {};

        violations.forEach(v => {
            const dept = v.department || v.employeeDepartment || 'غير محدد';
            violationsByDepartment[dept] = (violationsByDepartment[dept] || 0) + 1;
            const vType = (v.violationType || 'غير محدد').trim() || 'غير محدد';
            violationsByType[vType] = (violationsByType[vType] || 0) + 1;
        });

        const violationsByDeptHTML = Object.keys(violationsByDepartment).map(dept =>
            `<tr><td>${Utils.escapeHTML(dept)}</td><td>${violationsByDepartment[dept]}</td></tr>`
        ).join('');
        const violationsByTypeHTML = Object.keys(violationsByType).map(type =>
            `<tr><td>${Utils.escapeHTML(type)}</td><td>${violationsByType[type]}</td></tr>`
        ).join('');

        const { t, lang } = this.getTranslations();
        const dateLocale = lang === 'ar' ? 'ar-SA' : 'en-GB';
        const hourLabel = t('report.hour');

        return `
            <div class="section-title">${t('report.generalStats')}</div>
            <p style="margin-bottom: 20px; color: #666;">${t('report.createdDate')}: ${new Date().toLocaleDateString(dateLocale)}</p>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.basicStats')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.type')}</th>
                        <th>${t('report.total')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.incidentsRow')}</td>
                        <td>${(data.incidents || []).length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.nearmiss')}</td>
                        <td>${(data.nearmiss || []).length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.ptw')}</td>
                        <td>${(data.ptw || []).length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.trainingPrograms')}</td>
                        <td>${training.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.violations')}</td>
                        <td>${violations.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.clinicVisits')}</td>
                        <td>${(data.clinicVisits || []).length}</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.trainingSection')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.traineesCount')}</td>
                        <td>${uniqueTrainees}</td>
                    </tr>
                    <tr>
                        <td>${t('report.avgTrainingHoursEmployees')}</td>
                        <td>${avgTrainingHours} ${hourLabel}</td>
                    </tr>
                    <tr>
                        <td>${t('report.totalTrainingHoursEmployees')}</td>
                        <td>${Number(totalTrainingHoursEmployees).toFixed(2)} ${hourLabel}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.trainingContractors')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.traineesContractors')}</td>
                        <td>${contractorTraineesCount}</td>
                    </tr>
                    <tr>
                        <td>${t('report.avgTrainingContractors')}</td>
                        <td>${contractorAvgHours} ${hourLabel}</td>
                    </tr>
                    <tr>
                        <td>${t('report.totalTrainingContractors')}</td>
                        <td>${Number(contractorTotalHours).toFixed(2)} ${hourLabel}</td>
                    </tr>
                </tbody>
            </table>
            
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsSection')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.indicator')}</th>
                        <th>${t('report.value')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${t('report.employeeViolations')}</td>
                        <td>${employeeViolations.length}</td>
                    </tr>
                    <tr>
                        <td>${t('report.contractorViolations')}</td>
                        <td>${contractorViolations.length}</td>
                    </tr>
                </tbody>
            </table>
            
            ${violationsByTypeHTML ? `
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsByType')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.violationType')}</th>
                        <th>${t('report.violationsCount')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${violationsByTypeHTML}
                </tbody>
            </table>
            ` : ''}
            
            ${violationsByDeptHTML ? `
            <h3 style="margin-top: 30px; margin-bottom: 15px; font-weight: bold; color: #333;">${t('report.violationsByDept')}</h3>
            <table style="margin-bottom: 30px;">
                <thead>
                    <tr>
                        <th>${t('report.department')}</th>
                        <th>${t('report.violationsCount')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${violationsByDeptHTML}
                </tbody>
            </table>
            ` : ''}
        `;
    }
};

// ===== Export module to global scope =====
// تصدير الموديول إلى window فوراً لضمان توافره
(function () {
    'use strict';
    try {
        if (typeof window !== 'undefined' && typeof Reports !== 'undefined') {
            window.Reports = Reports;
            
            // إشعار عند تحميل الموديول بنجاح
            if (typeof AppState !== 'undefined' && AppState.debugMode && typeof Utils !== 'undefined' && Utils.safeLog) {
                Utils.safeLog('✅ Reports module loaded and available on window.Reports');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في تصدير Reports:', error);
        // محاولة التصدير مرة أخرى حتى في حالة الخطأ
        if (typeof window !== 'undefined' && typeof Reports !== 'undefined') {
            try {
                window.Reports = Reports;
            } catch (e) {
                console.error('❌ فشل تصدير Reports:', e);
            }
        }
    }
})();