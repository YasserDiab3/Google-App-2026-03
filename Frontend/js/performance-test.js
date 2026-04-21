/**
 * اختبار تحسينات تحميل البيانات الذكية
 * Smart Data Loading Performance Test
 */

(function() {
    'use strict';

    // اختبار التحسينات الجديدة
    const PerformanceTest = {
        /**
         * تشغيل اختبارات الأداء
         */
        async runTests() {
            console.log('🚀 بدء اختبار تحسينات تحميل البيانات الذكية...');

            try {
                // اختبار 1: Smart Cache
                await this.testSmartCache();

                // اختبار 2: تحميل البيانات حسب الصلاحيات
                await this.testPermissionBasedLoading();

                // اختبار 3: تحميل الموديولات الذكي
                await this.testSmartModuleLoading();

                console.log('✅ انتهت اختبارات الأداء بنجاح');

            } catch (error) {
                console.error('❌ فشل في اختبارات الأداء:', error);
            }
        },

        /**
         * اختبار Smart Cache
         */
        async testSmartCache() {
            console.log('📊 اختبار Smart Cache...');

            if (typeof SmartCache === 'undefined') {
                console.warn('⚠️ SmartCache غير متوفر، سيتم تجاوز اختبار Smart Cache');
                return;
            }

            // اختبار حفظ واسترجاع البيانات
            const testData = { test: 'data', timestamp: Date.now() };
            const testKey = 'test_key';
            const userPermissions = { canViewIncidents: true };

            // حفظ البيانات
            SmartCache.setCache(testKey, testData, userPermissions, 'user_specific');

            // استرجاع البيانات
            const retrieved = SmartCache.getCache(testKey, userPermissions, 'user_specific');

            if (!retrieved || retrieved.test !== 'data') {
                throw new Error('فشل في حفظ واسترجاع البيانات من Smart Cache');
            }

            console.log('✅ Smart Cache يعمل بشكل صحيح');
        },


        /**
         * اختبار تحميل البيانات حسب الصلاحيات
         */
        async testPermissionBasedLoading() {
            console.log('📊 اختبار تحميل البيانات حسب الصلاحيات...');

            if (typeof AppBootstrap === 'undefined' || typeof AppBootstrap.getRequiredDataForPermissions !== 'function') {
                console.warn('⚠️ AppBootstrap.getRequiredDataForPermissions غير متوفر - قد يكون في وضع إنتاج');
                return;
            }

            const testPermissions = {
                canViewIncidents: true,
                canViewContractors: true,
                canViewEmployees: false
            };

            const requiredData = AppBootstrap.getRequiredDataForPermissions(testPermissions);

            // التحقق من أن البيانات المطلوبة تطابق الصلاحيات
            const expectedData = ['incidents', 'nearmiss', 'approvedContractors', 'contractors'];
            const hasExpectedData = expectedData.every(data => requiredData.includes(data));

            if (!hasExpectedData) {
                throw new Error('تحميل البيانات حسب الصلاحيات لا يعمل بشكل صحيح');
            }

            console.log('✅ تحميل البيانات حسب الصلاحيات يعمل بشكل صحيح');
        },

        /**
         * اختبار تحميل الموديولات الذكي
         */
        async testSmartModuleLoading() {
            console.log('📊 اختبار تحميل الموديولات الذكي...');

            if (typeof getRequiredModulesForPermissions === 'undefined') {
                console.warn('⚠️ getRequiredModulesForPermissions غير متوفر - قد يكون في وضع إنتاج');
                return;
            }

            const testPermissions = {
                canViewIncidents: true,
                canViewContractors: true,
                canViewTraining: false
            };

            const requiredModules = getRequiredModulesForPermissions(testPermissions);

            // التحقق من أن الموديولات المطلوبة تطابق الصلاحيات
            const expectedModules = ['incidents', 'nearmiss', 'contractors', 'violations'];
            const hasExpectedModules = expectedModules.every(module => requiredModules.includes(module));

            if (!hasExpectedModules) {
                throw new Error('تحميل الموديولات الذكي لا يعمل بشكل صحيح');
            }

            console.log('✅ تحميل الموديولات الذكي يعمل بشكل صحيح');
        }
    };

    // تشغيل الاختبارات عند تحميل الصفحة (في وضع التطوير فقط)
    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const isDev = window.location.hostname === 'localhost' ||
                             window.location.hostname === '127.0.0.1' ||
                             window.location.search.includes('dev=true');

                if (isDev) {
                    PerformanceTest.runTests();
                }
            }, 3000); // انتظار 3 ثواني لتحميل النظام
        });
    }

    // تصدير للاستخدام اليدوي
    if (typeof window !== 'undefined') {
        window.PerformanceTest = PerformanceTest;
    }

    // دعم بيئة Node للاختبار عبر CLI
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PerformanceTest;
    }

    if (typeof window === 'undefined') {
        console.log('Node environment detected: running PerformanceTest in limited mode.');
        PerformanceTest.runTests();
    }

})();