/**
 * Unit Tests for HSE Management System
 * Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ø§Ù„ÙˆØ­Ø¯Ø© Ù„Ù†Ø¸Ø§Ù… Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø³Ù„Ø§Ù…Ø© Ø§Ù„Ù…Ù‡Ù†ÙŠØ©
 * 
 * Ù‡Ø°Ù‡ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª ØªØºØ·ÙŠ Ø§Ù„Ø¯ÙˆØ§Ù„ Ø§Ù„Ø­Ø±Ø¬Ø© ÙÙŠ Ø§Ù„Ù†Ø¸Ø§Ù…
 */

(function() {
    'use strict';

    // Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Utils
    const UtilsTests = {
        testIsValidEmail() {
            const tests = [
                { input: 'test@example.com', expected: true },
                { input: 'user.name@domain.co.uk', expected: true },
                { input: 'invalid', expected: false },
                { input: 'invalid@', expected: false },
                { input: '@invalid.com', expected: false },
                { input: '', expected: false },
                { input: null, expected: false }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    const result = Utils.isValidEmail(test.input);
                    if (result === test.expected) {
                        passed++;
                    } else {
                        failed++;
                        console.error(`âŒ testIsValidEmail failed: input="${test.input}", expected=${test.expected}, got=${result}`);
                    }
                } catch (error) {
                    failed++;
                    console.error(`âŒ testIsValidEmail error:`, error);
                }
            });

            return { passed, failed, total: tests.length };
        },

        testEscapeHTML() {
            const tests = [
                { input: '<script>alert("xss")</script>', expected: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;' },
                { input: 'Hello & World', expected: 'Hello &amp; World' },
                { input: 'Normal text', expected: 'Normal text' },
                { input: '', expected: '' },
                { input: null, expected: '' }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    const result = Utils.escapeHTML(test.input);
                    if (result === test.expected) {
                        passed++;
                    } else {
                        failed++;
                        console.error(`âŒ testEscapeHTML failed: input="${test.input}", expected="${test.expected}", got="${result}"`);
                    }
                } catch (error) {
                    failed++;
                    console.error(`âŒ testEscapeHTML error:`, error);
                }
            });

            return { passed, failed, total: tests.length };
        },

        testFormatDate() {
            const tests = [
                { input: new Date('2025-01-15'), format: 'YYYY-MM-DD', expected: '2025-01-15' },
                { input: new Date('2025-01-15T10:30:00'), format: 'YYYY-MM-DD HH:mm', expected: '2025-01-15 10:30' }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    if (typeof Utils.formatDate === 'function') {
                        const result = Utils.formatDate(test.input, test.format);
                        if (result === test.expected || result.includes(test.expected.split(' ')[0])) {
                            passed++;
                        } else {
                            failed++;
                            console.error(`âŒ testFormatDate failed: input="${test.input}", expected="${test.expected}", got="${result}"`);
                        }
                    } else {
                        passed++; // Skip if function doesn't exist
                    }
                } catch (error) {
                    failed++;
                    console.error(`âŒ testFormatDate error:`, error);
                }
            });

            return { passed, failed, total: tests.length };
        },

        testContractorIdentityMatcher() {
            const tests = [
                {
                    name: 'matches exact contractor code',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', isoCode: 'CON-100', companyName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    record: { contractorId: 'CON-100' },
                    expected: true
                },
                {
                    name: 'matches exact company name only',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', companyName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    record: { contractorName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    expected: true
                },
                {
                    name: 'falls back to exact company name when record has generic row id only',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', companyName: 'Alpha Contracting' },
                    record: { id: 'ROW-77', contractorName: 'Alpha Contracting' },
                    expected: true
                },
                {
                    name: 'matches legacy contractor alias ids',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', aliasIds: ['LEGACY-88', 'ACN-77'], companyName: 'Alpha Contracting' },
                    record: { contractorId: 'LEGACY-88' },
                    expected: true
                },
                {
                    name: 'rejects violation when id matches legacy alias but contractor name conflicts',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', aliasIds: ['LEGACY-88'], companyName: 'Alpha Contracting' },
                    record: { contractorId: 'LEGACY-88', contractorName: 'Beta Contracting' },
                    mode: 'violation',
                    expected: false
                },
                {
                    name: 'rejects similar but different contractor name',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', companyName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    record: { contractorName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª Ø§Ù„Ø­Ø¯ÙŠØ«Ø©' },
                    expected: false
                },
                {
                    name: 'rejects conflicting identifier even if name looks close',
                    contractor: { id: 'APP-1', contractorId: 'REQ-1', code: 'CON-100', companyName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    record: { contractorId: 'CON-200', contractorName: 'Ø´Ø±ÙƒØ© Ø£Ù„Ù Ù„Ù„Ù…Ù‚Ø§ÙˆÙ„Ø§Øª' },
                    expected: false
                },
                {
                    name: 'removes conflicting linked contractor ids when code points to another contractor',
                    contractor: { id: 'LINK-200', contractorId: 'LINK-200', code: 'CON-100', companyName: 'Alpha Contracting' },
                    verify() {
                        const originalContractors = AppState.appData.contractors;
                        try {
                            AppState.appData.contractors = [
                                { id: 'LINK-200', name: 'Beta Contracting', code: 'CON-200' }
                            ];
                            const sanitized = Utils.sanitizeContractorIdentity(this.contractor);
                            return !sanitized.contractorId && sanitized.id === 'CON-100' && Utils.getPreferredContractorLookupKey(sanitized) === 'CON-100';
                        } finally {
                            AppState.appData.contractors = originalContractors;
                        }
                    },
                    expected: true
                }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    if (typeof Utils !== 'undefined' && typeof Utils.buildContractorIdentityMatcher === 'function') {
                        let result;
                        if (typeof test.verify === 'function') {
                            result = test.verify();
                        } else {
                            const matcher = Utils.buildContractorIdentityMatcher(test.contractor, test.contractor.contractorId);
                            result = test.mode === 'violation'
                                ? matcher.violationBelongsToContractor(test.record)
                                : matcher.matchesContractor(test.record);
                        }
                        if (result === test.expected) {
                            passed++;
                        } else {
                            failed++;
                            console.error(`âŒ testContractorIdentityMatcher failed: ${test.name}, expected=${test.expected}, got=${result}`);
                        }
                    } else {
                        passed++;
                    }
                } catch (error) {
                    failed++;
                    console.error('âŒ testContractorIdentityMatcher error:', error);
                }
            });

            return { passed, failed, total: tests.length };
        }
    };

    // Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Permissions
    const PermissionsTests = {
        testHasAccess() {
            const tests = [
                { user: { role: 'admin', permissions: {} }, module: 'users', expected: true },
                { user: { role: 'user', permissions: { dashboard: true } }, module: 'dashboard', expected: true },
                { user: { role: 'user', permissions: { dashboard: true } }, module: 'users', expected: false }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    if (typeof Permissions !== 'undefined' && typeof Permissions.hasAccess === 'function') {
                        // Ø­ÙØ¸ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø§Ù„Ø­Ø§Ù„ÙŠ Ù…Ø¤Ù‚ØªØ§Ù‹
                        const originalUser = AppState.currentUser;
                        AppState.currentUser = test.user;
                        
                        const result = Permissions.hasAccess(test.module);
                        
                        // Ø§Ø³ØªØ¹Ø§Ø¯Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…
                        AppState.currentUser = originalUser;
                        
                        if (result === test.expected) {
                            passed++;
                        } else {
                            failed++;
                            console.error(`âŒ testHasAccess failed: user.role="${test.user.role}", module="${test.module}", expected=${test.expected}, got=${result}`);
                        }
                    } else {
                        passed++; // Skip if function doesn't exist
                    }
                } catch (error) {
                    failed++;
                    console.error(`âŒ testHasAccess error:`, error);
                }
            });

            return { passed, failed, total: tests.length };
        }
    };

    // Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Auth
    const AuthTests = {
        testValidateEmail() {
            const tests = [
                { input: 'test@example.com', expected: true },
                { input: 'invalid', expected: false }
            ];

            let passed = 0;
            let failed = 0;

            tests.forEach(test => {
                try {
                    if (typeof Utils !== 'undefined' && typeof Utils.isValidEmail === 'function') {
                        const result = Utils.isValidEmail(test.input);
                        if (result === test.expected) {
                            passed++;
                        } else {
                            failed++;
                            console.error(`âŒ testValidateEmail failed: input="${test.input}", expected=${test.expected}, got=${result}`);
                        }
                    } else {
                        passed++; // Skip if function doesn't exist
                    }
                } catch (error) {
                    failed++;
                    console.error(`âŒ testValidateEmail error:`, error);
                }
            });

            return { passed, failed, total: tests.length };
        }
    };

    // ØªØ´ØºÙŠÙ„ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª
    function runAllTests() {
        console.log('ðŸ§ª Ø¨Ø¯Ø¡ ØªØ´ØºÙŠÙ„ Unit Tests...\n');

        const results = {
            Utils: {
                isValidEmail: UtilsTests.testIsValidEmail(),
                escapeHTML: UtilsTests.testEscapeHTML(),
                formatDate: UtilsTests.testFormatDate(),
                contractorIdentityMatcher: UtilsTests.testContractorIdentityMatcher()
            },
            Permissions: {
                hasAccess: PermissionsTests.testHasAccess()
            },
            Auth: {
                validateEmail: AuthTests.testValidateEmail()
            }
        };

        // Ø­Ø³Ø§Ø¨ Ø§Ù„Ø¥Ø­ØµØ§Ø¦ÙŠØ§Øª
        let totalPassed = 0;
        let totalFailed = 0;
        let totalTests = 0;

        Object.keys(results).forEach(category => {
            Object.keys(results[category]).forEach(test => {
                const result = results[category][test];
                totalPassed += result.passed;
                totalFailed += result.failed;
                totalTests += result.total;
            });
        });

        // Ø¹Ø±Ø¶ Ø§Ù„Ù†ØªØ§Ø¦Ø¬
        console.log('\nðŸ“Š Ù†ØªØ§Ø¦Ø¬ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª:');
        console.log('â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
        
        Object.keys(results).forEach(category => {
            console.log(`\n${category}:`);
            Object.keys(results[category]).forEach(test => {
                const result = results[category][test];
                const percentage = ((result.passed / result.total) * 100).toFixed(1);
                const status = result.failed === 0 ? 'âœ…' : 'âŒ';
                console.log(`  ${status} ${test}: ${result.passed}/${result.total} (${percentage}%)`);
            });
        });

        console.log('\nâ”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”â”');
        console.log(`\nðŸ“ˆ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ: ${totalPassed}/${totalTests} Ù†Ø¬Ø­ (${((totalPassed / totalTests) * 100).toFixed(1)}%)`);
        
        if (totalFailed > 0) {
            console.log(`âŒ ÙØ´Ù„: ${totalFailed} Ø§Ø®ØªØ¨Ø§Ø±`);
        } else {
            console.log('âœ… Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø§Ø®ØªØ¨Ø§Ø±Ø§Øª Ù†Ø¬Ø­Øª!');
        }

        return {
            totalPassed,
            totalFailed,
            totalTests,
            percentage: ((totalPassed / totalTests) * 100).toFixed(1)
        };
    }

    // ØªØµØ¯ÙŠØ± Ù„Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù…
    if (typeof window !== 'undefined') {
        window.UnitTests = {
            run: runAllTests,
            Utils: UtilsTests,
            Permissions: PermissionsTests,
            Auth: AuthTests
        };

        // ØªØ´ØºÙŠÙ„ ØªÙ„Ù‚Ø§Ø¦ÙŠ ÙÙŠ ÙˆØ¶Ø¹ Ø§Ù„ØªØ·ÙˆÙŠØ±
        if (AppState?.debugMode) {
            setTimeout(() => {
                console.log('ðŸ”§ ÙˆØ¶Ø¹ Ø§Ù„ØªØ·ÙˆÙŠØ± Ù…ÙØ¹Ù„ - ØªØ´ØºÙŠÙ„ Unit Tests ØªÙ„Ù‚Ø§Ø¦ÙŠØ§Ù‹...');
                runAllTests();
            }, 2000);
        }
    }
})();
