/**
 * Generates help-content-en.js from embedded English translations.
 * Run: node tools/build-help-content-en.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '../Frontend/js/modules/modules/help-content-en.js');

const mod = (purpose, accessPath, features, workflow, extra = {}) => ({
    purpose,
    accessPath,
    features,
    workflow,
    commonTasks: extra.commonTasks || [],
    tips: extra.tips || [],
    permissionsNote: extra.permissionsNote || ''
});

const HELP_CONTENT_EN = {
    defaultIntro: 'A comprehensive reference for using the HSE platform: detailed guides for every module, usage policy & liability, Q&A, and quick search.',
    categories: [
        { id: 'all', label: 'All', icon: 'fa-border-all' },
        { id: 'overview', label: 'Overview', icon: 'fa-compass' },
        { id: 'getting-started', label: 'Getting Started', icon: 'fa-rocket' },
        { id: 'permissions', label: 'Permissions', icon: 'fa-user-shield' },
        { id: 'modules', label: 'Module Guide', icon: 'fa-th-large' },
        { id: 'reports', label: 'Reports & Analytics', icon: 'fa-chart-line' },
        { id: 'technical', label: 'Technical Support', icon: 'fa-wrench' },
        { id: 'policy', label: 'Usage Policy & Liability', icon: 'fa-scale-balanced' },
        { id: 'faq', label: 'Questions & Answers (Q&A)', icon: 'fa-comments' }
    ],
    modLabels: {
        profile: 'My Profile',
        reports: 'Reports',
        apptester: 'App Tester',
        help: 'Help & Support Center'
    },
    navLabels: {
        dashboard: 'Dashboard',
        users: 'User Management',
        'user-tasks': 'User Tasks',
        employees: 'Employees Database',
        incidents: 'Incidents',
        nearmiss: 'Near Miss',
        ptw: 'Work Permits',
        training: 'Training',
        clinic: 'Medical Clinic',
        'fire-equipment': 'Fire Equipment',
        'periodic-inspections': 'Periodic Inspections',
        ppe: 'PPE',
        violations: 'Violations',
        contractors: 'Contractors',
        'behavior-monitoring': 'Behavior Monitoring',
        'chemical-safety': 'Chemical Safety',
        'daily-observations': 'Daily Observations',
        'safety-calendar': 'Safety Calendar',
        iso: 'ISO System',
        emergency: 'Emergency Alerts',
        'risk-assessment': 'Risk Assessment',
        'sop-jha': 'Safety Instructions SOP-JHA',
        'legal-documents': 'Legal Documents',
        sustainability: 'Environmental Sustainability',
        'safety-budget': 'Safety Budget',
        'ai-assistant': 'AI Assistant',
        'safety-performance-kpis': 'Safety Performance Indicators',
        'kpi-annual-plan': 'Annual KPI Plan',
        'hse-monitoring-plan': 'HSE Monitoring Plan',
        'safety-health-management': 'Safety & Health Management',
        settings: 'Settings',
        'action-tracking': 'Action Tracking Log',
        'issue-tracking': 'Issue Tracking',
        'change-management': 'Change Management',
        'issuing-authorities': 'PTW Signing Authorities'
    },
    qaItems: [
        { id: 'faq-no-module', question: "Why can't I see a module in the sidebar?", answer: 'Permissions are granted by the system admin only. If a module is not enabled for you, it will not appear. Contact your admin with the module name, then reload the page after access is granted.', keywords: 'permission module sidebar hidden' },
        { id: 'faq-slow', question: 'The system is slow or data is not showing', answer: 'Check your internet connection first. Some modules (e.g. clinic and visit log) need time to load — wait until loading completes without closing the page. Try refresh (F5) or an updated browser.', keywords: 'slow loading data' },
        { id: 'faq-mfa-fail', question: 'Two-factor authentication (MFA) code is incorrect', answer: 'Ensure your device time is set automatically. Use the latest code from your authenticator app (changes every 30 seconds). MFA setup and login require internet. If the problem persists, ask your admin to reset MFA from User Management.', moduleId: 'profile', keywords: 'MFA TOTP code authentication' },
        { id: 'faq-password', question: 'I forgot my password — what should I do?', answer: 'On the login screen click «Forgot password?», enter your registered email, then follow the reset link. Check spam/junk if the email does not arrive.', keywords: 'password reset recovery' },
        { id: 'faq-export', question: 'Excel or PDF export failed', answer: 'Wait until data finishes loading on screen. Narrow the date range or filters. Allow pop-ups in the browser. Retry after loading completes.', keywords: 'export excel pdf' },
        { id: 'faq-update', question: 'How do I update the app to the latest version?', answer: 'When an update notification appears, click «Update». Or perform a hard reload (Ctrl+F5). The current version appears at the bottom of the sidebar and at the top of this Help page.', keywords: 'update version' },
        { id: 'faq-help-module', question: 'Where can I find a full guide to the system?', answer: 'You are in the right place — the Help module above Settings in the menu. It includes guides for all modules, Q&A, and quick search. Available to every logged-in user.', moduleId: 'help', keywords: 'guide help documentation' },
        { id: 'faq-clinic-meds', question: 'How do I see the most consumed medications in the clinic?', answer: 'Open Medical Clinic → Data Analytics tab → «Medication usage & dispensing analysis». You will find charts and a table of top medications with period filters.', moduleId: 'clinic', keywords: 'clinic medication consumption analytics' },
        { id: 'faq-ptw-approve', question: 'How do I issue a work permit (PTW) and get approvals?', answer: 'From Work Permits create a new permit, complete work details, hazards, and location, then send it through the approval chain. Do not start field work before signatures are complete and the permit is valid.', moduleId: 'ptw', keywords: 'PTW permit approval' },
        { id: 'faq-employees-add', question: 'How do I add a new employee to the database?', answer: 'Open «Employees Database» from the menu (requires permission). Click Add Employee, enter basic data (name, department, email...), and save. The record is used in clinic, training, and incidents.', moduleId: 'employees', keywords: 'employee add register' },
        { id: 'faq-read-only', question: 'What does «Read only» role mean?', answer: 'You can view data in granted modules without add, edit, or delete. If you need write access, ask the system admin to change your role or permissions.', keywords: 'read only permission' },
        { id: 'faq-detailed-perm', question: 'What is the difference between module and detailed permissions?', answer: 'Module permission lets you enter the module. Detailed permission controls what inside (e.g. view visit log without clinic analytics). The admin sets these per user in User Management.', moduleId: 'users', keywords: 'detailed permission tab' },
        { id: 'faq-sync-fail', question: 'Data save failed or an error appeared', answer: 'Check internet connection. Wait a minute and retry. Do not save repeatedly to avoid duplicates. If it persists, note the error text and contact your admin or use Issue Tracking if you have access.', keywords: 'save error connection' },
        { id: 'faq-incident-report', question: 'When do I record an incident vs a near miss?', answer: 'Near Miss: an event that almost happened with no injury. Incident: actually occurred (injury, damage, loss). Record near misses immediately upon observation and incidents as soon as they happen with maximum detail.', moduleId: 'incidents', keywords: 'incident near miss' },
        { id: 'faq-training-cert', question: 'How do I track employee training and certificate expiry?', answer: 'From Training: create courses, record attendance, and review reports and alerts. Link trainees to employee records for accurate reporting.', moduleId: 'training', keywords: 'training certificate' },
        { id: 'faq-fire-inspection', question: 'How do I track fire extinguisher inspections and expiry?', answer: 'In Fire Equipment register each unit with inspection and expiry dates. Enable periodic follow-up and review alerts before expiry.', moduleId: 'fire-equipment', keywords: 'extinguisher fire inspection' },
        { id: 'faq-change-password', question: 'How do I change my password after login?', answer: 'Open «My Profile» → Password section → enter current and new password and save. Use a strong unique password.', moduleId: 'profile', keywords: 'change password' },
        { id: 'faq-contact', question: 'Who do I contact if I cannot find an answer here?', answer: 'The system admin is the first contact for permissions and technical issues. Describe the problem, reproduction steps, and attach a screenshot. Use Issue Tracking if you have permission.', keywords: 'support contact admin' },
        { id: 'faq-clinic-visit', question: 'How do I record a clinic visit for an employee?', answer: 'Open «Medical Clinic» → «Visit Log» tab → «Add Visit». Select the employee, enter reason, diagnosis, and treatment, then save. If medication is dispensed, enable dispensing and set quantity.', moduleId: 'clinic', keywords: 'clinic visit register' },
        { id: 'faq-violation', question: 'How do I record a safety violation?', answer: 'From Violations click Add Violation, set location, department, type and severity, describe clearly, attach photos if any, and save. Follow corrective action until closure from the same record or Action Tracking Log.', moduleId: 'violations', keywords: 'violation safety record' },
        { id: 'faq-ppe-issue', question: 'How do I issue PPE to an employee?', answer: 'Open PPE → Issuing or Inventory tab → select employee, equipment type, and quantity → save. Ensure the employee exists in Employees Database.', moduleId: 'ppe', keywords: 'PPE issue dispensing' },
        { id: 'faq-policy', question: 'Where is the usage policy and disclaimer?', answer: 'In this module select «Usage Policy & Liability» at the top. It includes terms of use, user responsibility, data confidentiality, and system liability limits. Read before daily use.', moduleId: 'help', keywords: 'policy liability terms' }
    ],
    staticTopics: [
        { id: 'system-intro', categoryId: 'overview', moduleId: null, title: 'What is the HSE system?', icon: 'fa-shield-halved', summary: 'An integrated platform for occupational health, safety, and environment management.', purpose: 'Brings permits, incidents, training, clinic, and reports together in one place for your organization.', features: ['Bilingual interface', 'Centralized data storage & sync', 'Flexible permissions', 'Works on web and mobile'], workflow: ['Log in', 'Choose a module from the menu', 'Complete your task', 'Review reports'], tips: ['Use Help whenever you are unsure'] },
        { id: 'navigation', categoryId: 'overview', moduleId: 'dashboard', title: 'Navigating the system', icon: 'fa-bars', summary: 'The sidebar is your gateway to all modules.', purpose: 'Each menu item opens an independent module with its own data and functions.', features: ['Fixed sidebar', 'Hidden modules when not permitted', 'Dashboard as home page'], workflow: ['Click a module name', 'Wait for data to load', 'Use tabs inside the module'], tips: ['Modules not shown require admin permission'] },
        { id: 'login-guide', categoryId: 'getting-started', moduleId: null, title: 'Logging in', icon: 'fa-sign-in-alt', summary: 'Access with email and password registered by your admin.', purpose: 'Secure access to your organization\'s data only.', features: ['Email', 'Password', 'Remember me', 'Password recovery'], workflow: ['Enter email and password', 'Enable remember me if desired', 'Click Log in'], tips: ['Never share your password', 'Use «Forgot password» when needed'] },
        { id: 'mfa-guide', categoryId: 'getting-started', moduleId: 'profile', title: 'Two-factor authentication (MFA)', icon: 'fa-mobile-screen', summary: 'Extra security layer with a code from an authenticator app.', purpose: 'Protects your account even if your password is compromised.', features: ['TOTP', 'QR setup', '6-digit code at login', 'Disable from profile'], workflow: ['From My Profile enable MFA', 'Scan QR with Google Authenticator or similar', 'Enter code at each login'], tips: ['MFA requires connection at setup and login', 'Save recovery codes'] },
        { id: 'password-reset', categoryId: 'getting-started', moduleId: null, title: 'Password recovery', icon: 'fa-key', summary: 'Reset via email.', purpose: 'Regain access without admin when email is configured.', features: ['Reset link', 'Secure email', 'Link expiry'], workflow: ['From login: Forgot password', 'Enter your email', 'Follow the link in email'], tips: ['Check spam/junk folder'] },
        { id: 'profile-guide', categoryId: 'getting-started', moduleId: 'profile', title: 'My Profile', icon: 'fa-user', summary: 'Your data, password, and security.', purpose: 'Update personal information without admin help.', features: ['Edit profile data', 'Password change', 'MFA'], workflow: ['Open My Profile', 'Edit and save'], tips: ['Available to every logged-in user'] },
        { id: 'roles', categoryId: 'permissions', moduleId: 'users', title: 'System roles', icon: 'fa-users-gear', summary: 'System admin, safety officer, user, read only.', purpose: 'Each role sets default access scope before manual grants.', features: ['System admin: full access', 'Safety officer: as granted', 'Standard user: as granted', 'Read only: view without edit'], workflow: ['Admin assigns role', 'Grants additional modules', 'User sees only what is allowed'], tips: ['No default permissions for non-admin — explicit grant required'], permissionsNote: 'Role management is in the Users module.' },
        { id: 'detailed-perms', categoryId: 'permissions', moduleId: 'users', title: 'Detailed permissions', icon: 'fa-list-check', summary: 'Control inside a module (view, add, analytics...).', purpose: 'Some modules support sub-permissions per tab or function.', features: ['Whole module access', 'Tab-level permissions', 'Granted from user screen'], workflow: ['Open a user in User Management', 'Enable the module', 'Set detailed permissions'], tips: ['Example: clinic — visit log separate from analytics'], permissionsNote: 'For admin only.' },
        { id: 'request-access', categoryId: 'permissions', moduleId: null, title: 'Requesting module access', icon: 'fa-hand', summary: 'If you do not see a module in the menu.', purpose: 'Permissions are granted by the system admin only.', features: ['Contact admin', 'Name the module needed', 'Reload after activation'], workflow: ['Identify the module in this guide', 'Contact admin', 'Refresh after grant'], tips: ['You can read any module guide here without access'] },
        { id: 'reports-overview', categoryId: 'reports', moduleId: 'reports', title: 'General reports', icon: 'fa-file-lines', summary: 'Aggregated reports from multiple sources.', purpose: 'View and analyze data for selected periods.', features: ['Date filters', 'Export', 'Print'], workflow: ['Choose report', 'Set period', 'Export'], tips: ['Wait for data to load before export'] },
        { id: 'kpi-reports', categoryId: 'reports', moduleId: 'safety-performance-kpis', title: 'KPIs and plans', icon: 'fa-gauge-high', summary: 'KPIs, annual plans, and HSE monitoring.', purpose: 'Measure safety program performance.', features: ['Monthly indicators', 'KPI plan', 'HSE monitoring plan'], workflow: ['Enter values', 'Compare to target', 'Act on variance'], tips: ['Review monthly with management'] },
        { id: 'clinic-analytics', categoryId: 'reports', moduleId: 'clinic', title: 'Clinic data analytics', icon: 'fa-chart-pie', summary: 'Analysis of visits and dispensed medications.', purpose: 'Support inventory and occupational health decisions.', features: ['Visit KPIs', 'Top medications', 'Monthly trend', 'Low stock alerts'], workflow: ['Open Clinic → Data Analytics', 'Apply filters', 'Review charts and table'], tips: ['Analytics depends on filtered visits'] },
        { id: 'sync', categoryId: 'technical', moduleId: null, title: 'Online save and sync', icon: 'fa-cloud-arrow-up', summary: 'Upload and fetch data securely when connected.', purpose: 'Share data between users and ensure continuity.', features: ['Auto-save when online', 'Background refresh', 'Local cache when needed'], workflow: ['Work normally — save is automatic when online', 'If delayed, wait for load or refresh'], tips: ['Do not close browser while saving large records'] },
        { id: 'offline', categoryId: 'technical', moduleId: null, title: 'Working offline', icon: 'fa-wifi', summary: 'Some functions work locally then sync when back online.', purpose: 'Continuity during weak connectivity.', features: ['Local cache', 'Save queue', 'Auto sync on reconnect'], workflow: ['Record data while working', 'Changes save automatically when online'], tips: ['Login and MFA require connection'] },
        { id: 'updates', categoryId: 'technical', moduleId: null, title: 'System updates', icon: 'fa-arrows-rotate', summary: 'Notification when a new release is available.', purpose: 'Get fixes and new features.', features: ['Version in sidebar', 'Update notification', 'UI auto-update'], workflow: ['When notified click Update', 'Reload the page'], tips: ['Current version shown in sidebar and this page'] },
        { id: 'security', categoryId: 'technical', moduleId: null, title: 'Security', icon: 'fa-lock', summary: 'Protecting data and sessions.', purpose: 'Ensure confidentiality of HSE data.', features: ['HTTPS', 'Secure sessions', 'MFA', 'Fine-grained permissions'], workflow: ['Use strong password', 'Enable MFA', 'Log out on shared devices'], tips: ['Do not use your account on public devices without logging out'] },
        { id: 'contact-admin', categoryId: 'technical', moduleId: null, title: 'Contacting support', icon: 'fa-envelope', summary: 'For technical or permission issues.', purpose: 'System admin is the primary contact.', features: ['Admin email', 'Problem description', 'Screenshot'], workflow: ['Describe clearly', 'Include steps', 'Wait for response'], tips: ['Use Issue Tracking if you have permission'] }
    ],
    policyTopics: [
        { id: 'policy-intro', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'Introduction — acceptance of use', icon: 'fa-file-contract', summary: 'By using the system you agree to the following terms.', purpose: 'This section defines general rules for using your organization\'s HSE platform.', features: ['The system supports safety programs — not a substitute for regulations or adopted standards', 'Use the account only for authorized professional purposes', 'Misuse, hacking attempts, or unauthorized data access are prohibited', 'Policy may be updated — review this section periodically'], workflow: ['Read all policy sections before intensive use', 'If you disagree contact admin to deactivate your account', 'Continued use means acceptance of the version shown here'], tips: ['Review all six sections after major app updates'] },
        { id: 'policy-user-responsibility', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'User responsibility', icon: 'fa-user-check', summary: 'What is expected when using the system.', purpose: 'Every user is responsible for their actions and data accuracy.', features: ['Protect login credentials — do not share email, password, or MFA code', 'Log out on shared devices', 'Enter accurate complete data (incidents, visits, permits...) — professional and legal duty', 'Report suspicious access or sensitive data errors immediately', 'Do not enter unnecessary personal data or data violating privacy policy'], workflow: ['Verify data before save', 'Review record after entry', 'Correct errors promptly or request correction'], tips: ['Read-only users are also responsible for confidentiality of what they view'] },
        { id: 'policy-data-privacy', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'Data confidentiality & privacy', icon: 'fa-user-secret', summary: 'Protecting employee and operational information.', purpose: 'HSE data is sensitive and subject to organizational and legal policies.', features: ['Data is for your organization — no sharing outside authorized scope', 'Permissions are per user — unauthorized access is prohibited', 'Export or copy for personal/commercial use is prohibited', 'Medical and injury records have additional professional confidentiality', 'Treat screenshots and prints as confidential documents'], workflow: ['Request permission before new module access', 'Store reports only in approved locations', 'Report potential leaks immediately'], tips: ['MFA strengthens account protection — enable from My Profile'] },
        { id: 'policy-acceptable-use', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'Acceptable & prohibited use', icon: 'fa-ban', summary: 'What is allowed and explicitly forbidden.', purpose: 'Ensure the system serves safety without abuse or data risk.', features: ['Allowed: record safety data, reports, follow-up, training, permits within your permissions', 'Allowed: request additional permissions through official channels', 'Prohibited: using another\'s account or letting others use yours', 'Prohibited: hacking, deliberate false data, or deleting records without permission', 'Prohibited: political, personal abuse, or harassment via the system', 'Prohibited: republishing organization data on public platforms without approval'], workflow: ['Use for professional purpose only', 'When unsure ask admin or safety officer', 'Violations may lead to account suspension per policy'], tips: ['Records may be used in investigations and audits — accuracy matters'] },
        { id: 'policy-disclaimer', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'Disclaimer & system limits', icon: 'fa-triangle-exclamation', summary: 'What the system or provider is not liable for.', purpose: 'Clarify limits of the technical tool vs legal/professional obligations.', features: ['System helps organize records and reports — field decisions remain with authorized specialists', 'Does not replace local regulations, OSHA/ISO or standards your organization adopts', 'AI assistant (if any) gives general guidance — verify before field application', 'Outages or sync delays may occur — maintain emergency paper/alternate procedures', 'No implied guarantee of error-free operation — report faults via Issue Tracking', 'Your organization is responsible for data accuracy and official permits/approvals'], workflow: ['Rely on approved field procedures', 'Use system as record and follow-up not sole decision source', 'Review critical reports with safety management before legal action'], tips: ['In emergencies follow approved emergency plan — do not wait for the system'] },
        { id: 'policy-ip-updates', categoryId: 'policy', moduleId: null, isPolicy: true, title: 'Intellectual property & policy updates', icon: 'fa-copyright', summary: 'System rights and terms updates.', purpose: 'Protect software rights and policy update process.', features: ['Software, UI, and guide are IP protected — no copy or redistribution without permission', 'Your organization logo and data remain yours — system not used to publish them publicly', 'Usage policy may update with releases — version here is the reference', 'Last review aligns with app version shown at top of this page', 'Legal inquiries go to your organization\'s management'], workflow: ['Review this section after major updates', 'Inform your team of material changes', 'For legal questions contact your organization'], tips: ['Current version: see app version at top of Help page'] }
    ],
    moduleDetails: {
        dashboard: mod('Central hub summarizing key HSE indicators — your daily starting point.', ['Sidebar ← «Dashboard» (usually first)', 'Opens after login if permitted'], ['KPI cards: clinic visits, incidents, permits, violations', 'Quick trend charts', 'Shortcuts to main modules', 'Alerts and pending tasks', 'Reports widget'], ['Log in and wait for cards to load', 'Review red/alert items first', 'Click any card for detail module', 'Use time filters if available', 'Review daily at shift start'], { commonTasks: [{ task: 'Monitor today\'s status', steps: ['Open dashboard', 'Review incident, permit, clinic cards', 'Click card with abnormal number'] }, { task: 'Quick report navigation', steps: ['From card click «View details» or module name', 'Opens module on relevant tab'] }], tips: ['Numbers update after data loads — wait briefly', 'Cards reflect your permissions only', 'Refresh if numbers stay zero despite data'] }),
        help: mod('Support center — interactive guide for all modules and policies.', ['Sidebar ← «Help» (above Settings)', 'Available to every logged-in user without extra permission'], ['Detailed guide per module', 'Quick search', 'Q&A', 'Usage policy & liability', 'Open module button'], ['Open Help from menu', 'Search or choose category', 'Expand topic for steps', 'Click «Open module» if permitted'], { tips: ['Read any module guide without access permission', 'Review Usage Policy before daily work'] }),
        profile: mod('Manage personal data, password, and two-factor authentication.', ['Sidebar ← «My Profile»', 'Available to every logged-in user'], ['Edit name and data', 'Change password', 'Enable/disable MFA (TOTP)', 'View role and general permissions'], ['Open My Profile', 'Edit allowed fields', 'For password: enter current and new', 'For MFA: follow QR wizard and save recovery codes', 'Save changes'], { commonTasks: [{ task: 'Enable MFA', steps: ['My Profile ← Security', 'Click Enable MFA', 'Scan QR with authenticator app', 'Enter code to confirm'] }, { task: 'Change password', steps: ['My Profile ← Password', 'Enter current and new twice', 'Save'] }], tips: ['Store MFA recovery codes safely', 'Never share your password'] }),
        users: mod('Manage user accounts and permissions — for admin or delegate.', ['Sidebar ← «User Management»', 'Shown to system admin or users with users permission'], ['Add, edit, delete users', 'Assign role (admin, safety officer, user, read only)', 'Grant/revoke module permissions', 'Detailed in-module permissions', 'Reset MFA and password'], ['Open User Management', 'Search user or click Add', 'Enter email, name, role', 'Enable required modules', 'Expand modules with detailed permissions', 'Save and ask user to re-login'], { commonTasks: [{ task: 'Grant module permission', steps: ['Select user', 'Toggle module switch', 'Save', 'Ask user to refresh'] }, { task: 'Read-only tab permission', steps: ['Enable module first', 'Open Detailed Permissions', 'Select view without add/edit', 'Save'] }], tips: ['Grant minimum necessary (least privilege)', 'Review permissions when role changes'], permissionsNote: 'For system admin or users with users permission.' }),
        'user-tasks': mod('Track tasks assigned to you or your team.', ['Sidebar ← «User Tasks»'], ['Personal and team task lists', 'Statuses: new, in progress, completed', 'Filter by date and assignee', 'Link to source modules'], ['Open User Tasks', 'Review pending (red/new)', 'Open task and read details', 'Update status when starting/finishing', 'Add comment if needed'], { commonTasks: [{ task: 'Complete assigned task', steps: ['Open task from list', 'Perform in linked module', 'Return and set status to completed'] }], tips: ['Review tasks each morning', 'Overdue tasks need priority'] }),
        employees: mod('Central employee registry — foundation for clinic, training, incidents, and PPE.', ['Sidebar ← «Employees Database»'], ['Add/edit employee data', 'Departments, sections, positions', 'Search by name or ID', 'Excel export', 'Summary cards and stats'], ['Open Employees Database', 'Click Add or search existing', 'Complete name, department, email, employee ID, hire date', 'Save — employee appears in dropdowns', 'Update on transfer or resignation'], { commonTasks: [{ task: 'Add new employee', steps: ['Add employee', 'Fill required fields', 'Save', 'Verify in clinic/training'] }, { task: 'Export registry', steps: ['Apply filters if needed', 'Click Export Excel', 'Wait for download'] }], tips: ['Correct email needed for password recovery', 'Keep department names consistent'] }),
        incidents: mod('Record and follow up actual incidents, investigations, and corrective actions.', ['Sidebar ← «Incidents»', 'Or Dashboard ← Incidents card'], ['New incident (injury, damage, environmental...)', 'Location, witnesses, attachments', 'Investigation and root cause (RCA)', 'Action follow-up', 'Reports, stats, analytics'], ['On incident: open Incidents immediately', 'Click Register New Incident', 'Enter date, time, location, injured parties', 'Describe event and injury type', 'Attach photos and medical reports', 'Save and start investigation', 'Record corrective actions and close'], { commonTasks: [{ task: 'Record injury incident', steps: ['New incident', 'Type: injury', 'Link employee from registry', 'Complete investigation later'] }, { task: 'Export incident report', steps: ['Reports/Analytics tab', 'Set period', 'Export PDF or Excel'] }], tips: ['Record immediately — delay weakens investigation', 'Near misses go in Near Miss module not here'] }),
        nearmiss: mod('Document near misses and unsafe behaviors before injury occurs.', ['Sidebar ← «Near Miss»'], ['Types: near miss, unsafe behavior, improvement suggestion', 'Location, department, description', 'Attachments and photos', 'Filter and export', 'Statistics'], ['On observation: open Near Miss', 'Click Add', 'Classify type', 'Set location and detailed description', 'Attach photo if possible', 'Save for preventive analysis'], { commonTasks: [{ task: 'Report near miss', steps: ['Add record', 'Type: near miss', 'Describe what almost happened', 'Save'] }], tips: ['Early reporting prevents real incidents', 'Encourage team to report without fear'] }),
        ptw: mod('Issue and track high-risk work permits (hot work, height, confined space...).', ['Sidebar ← «Work Permits»'], ['Permit forms by work type', 'Hazard identification and controls', 'Work location map', 'Approval chain and signatures', 'Print and PDF export', 'Validity and closure tracking'], ['Click New Permit', 'Choose work type (hot, electrical, height...)', 'Set location, team, duration', 'Assess hazards, controls, PPE', 'Send for approvals', 'After signatures: print permit', 'Do not start before final approval', 'Close after work ends'], { commonTasks: [{ task: 'Create hot work permit', steps: ['New permit ← hot work', 'Location and responsible person', 'Fire watch procedures', 'Send for approval'] }, { task: 'Follow pending permits', steps: ['Filter awaiting approval', 'Review late approvers', 'Remind via tasks if needed'] }], tips: ['Expired permit = stop work', 'Link signatories from Signing Authorities module'] }),
        'issuing-authorities': mod('Manage who is authorized to sign work permits.', ['Sidebar ← «PTW Signing Authorities»', 'Admin or explicit grant'], ['Assign signatories and order', 'Link to departments and permit types', 'Enable/disable signing'], ['Open signatory list', 'Add or edit responsible person', 'Set allowed permit types', 'Save — appears in PTW approval chain'], { tips: ['Update when responsibilities change', 'Do not leave disabled signatory on active permits'], permissionsNote: 'For admin or users with issuing-authorities permission.' }),
        training: mod('Manage training programs, attendance, certificates, and compliance.', ['Sidebar ← «Training»'], ['Create courses and programs', 'Register trainees and attendance', 'Certificates and expiry dates', 'Contractor training', 'Completion reports and alerts'], ['Create new course (name, type, date, trainer)', 'Register trainees from employees or contractors', 'Record attendance on training day', 'Issue certificates or update completion', 'Review reports for expiring courses'], { commonTasks: [{ task: 'Record course attendance', steps: ['Open course', 'Attendance tab', 'Mark attendees', 'Save'] }, { task: 'Track expired certificates', steps: ['Training reports', 'Filter expired/expiring', 'Schedule retraining'] }], tips: ['Link trainees to employee records', 'Mandatory training for new hires'] }),
        clinic: mod('Clinic management: visits, medications, sick leave, injuries, analytics.', ['Sidebar ← «Medical Clinic»'], ['Visit log', 'Medication stock and dispensing', 'Sick leave', 'Injury log', 'Data analytics and top medications', 'Staff attendance tab'], ['Open clinic — wait for visit log first', 'New visit: Visit Log ← Add', 'Select employee, diagnosis, treatment', 'Dispense: enable and select drug/quantity', 'Sick leave: dedicated tab', 'Monthly: review Data Analytics'], { commonTasks: [{ task: 'Visit with medication', steps: ['Visit Log ← Add', 'Select employee', 'Diagnosis and treatment', 'Dispense ← quantity', 'Save'] }, { task: 'Medication consumption analysis', steps: ['Data Analytics', 'Dispensed medications section', 'Set period', 'Review chart and table'] }], tips: ['Do not open secondary tabs before visit log loads', 'Review low stock alerts', 'Analytics may need separate tab permission'] }),
        'fire-equipment': mod('Track fire equipment, inspections, and expiry dates.', ['Sidebar ← «Fire Equipment»'], ['Extinguishers, hoses, etc.', 'Installation locations', 'Inspection and expiry dates', 'Maintenance alerts', 'Status reports'], ['Add equipment (type, number, location)', 'Record last inspection and expiry', 'Update on periodic inspection', 'Review red alerts weekly', 'Remove expired from service'], { commonTasks: [{ task: 'Periodic extinguisher check', steps: ['Search by location or number', 'Open record', 'Update inspection date', 'Save'] }], tips: ['Enable alert 30 days before expiry', 'Document with photos when needed'] }),
        'periodic-inspections': mod('Schedule and perform periodic site and equipment inspections.', ['Sidebar ← «Periodic Inspections»'], ['Inspection plans', 'Checklists', 'Results and notes', 'Corrective action follow-up', 'Reports'], ['Create plan (equipment/site, frequency)', 'On due date perform inspection', 'Complete checklist', 'Record notes and photos', 'Open corrective action for critical findings'], { tips: ['Critical finding = immediate action', 'Link to safety calendar'] }),
        ppe: mod('Manage PPE inventory and issuance to employees.', ['Sidebar ← «PPE»'], ['Stock items and quantities', 'Issue to employees', 'Consumption tracking', 'Minimum stock alerts', 'Reports'], ['Update stock on receipt', 'To issue: select employee, item, quantity', 'Save — deducts from stock', 'Review monthly reports', 'Reorder when low'], { commonTasks: [{ task: 'Issue helmet to employee', steps: ['New issue', 'Select employee', 'Item: helmet', 'Quantity', 'Save'] }], tips: ['Employee must exist in Employees Database', 'Document for audit'] }),
        violations: mod('Record and follow safety violations and corrective actions.', ['Sidebar ← «Violations»'], ['Violation log', 'Classification by severity and type', 'Corrective actions and due dates', 'Attachments', 'Reports and analytics'], ['Click Add Violation', 'Location, department, violator, description', 'Set severity', 'Define action, owner, due date', 'Follow until closure', 'Export periodic report'], { tips: ['Be specific in description', 'Link to central Action Tracking'] }),
        contractors: mod('Manage contractors, workers, visits, and compliance.', ['Sidebar ← «Contractors»'], ['Contractor companies', 'Contractor workers', 'Assessments and visits', 'Link to clinic and PTW', 'Reports'], ['Add contractor (name, activity, contact)', 'Register workers', 'Update worker data before visits', 'Record assessments', 'Link clinic visits as contractor type'], { tips: ['Updated worker data = accurate reports', 'Mandatory contractor training in Training module'] }),
        'behavior-monitoring': mod('Monitor and record safe and unsafe behaviors on site.', ['Sidebar ← «Behavior Monitoring»'], ['Behavior observations', 'Safe/unsafe classification', 'Location and department', 'Statistics and trends', 'Reports'], ['Record observation immediately', 'Classify behavior', 'Location and description', 'Share with supervision', 'Review monthly statistics'], { tips: ['Focus on improvement and awareness', 'Document safe behavior too'] }),
        'chemical-safety': mod('Manage chemicals and safety data sheets (MSDS/SDS).', ['Sidebar ← «Chemical Safety»'], ['Chemical registry', 'SDS sheets', 'Storage locations', 'Risk assessment', 'Emergency procedures'], ['Add chemical (name, CAS, hazard)', 'Attach SDS', 'Set storage location and quantities', 'Review storage compatibility', 'Update on new batch'], { tips: ['SDS mandatory per chemical', 'Review incompatible co-storage'] }),
        'daily-observations': mod('Record daily safety observations on site.', ['Sidebar ← «Daily Observations»'], ['Daily observations', 'Photos and attachments', 'Closure follow-up', 'Analytics and charts', 'Export'], ['Add daily observation', 'Location, description, severity', 'Attach photo', 'Assign closure owner', 'Follow until closed', 'Review analytics weekly'], { tips: ['Daily observation beats late monthly report'] }),
        'safety-calendar': mod('Calendar of safety events: training, inspections, meetings, emergencies.', ['Sidebar ← «Safety Calendar»'], ['Monthly/weekly view', 'Events and tasks', 'Reminders', 'Activity links', 'Export'], ['Add event (type, date, owner)', 'Link to training or inspection if needed', 'Track execution', 'Update status after completion'], { tips: ['Align with HSE monitoring plan', 'Review in weekly safety meeting'] }),
        iso: mod('Manage ISO system documents and requirements.', ['Sidebar ← «ISO System»'], ['Document and procedure registry', 'Versions and reviews', 'Compliance indicators', 'Audit log', 'Reports'], ['Add document (code, title, version)', 'Set next review date', 'Document audit results', 'Update version on change'], { tips: ['Do not delete old versions — archive', 'Link documents to operational modules'] }),
        emergency: mod('Manage emergency alerts, plans, and contacts.', ['Sidebar ← «Emergency Alerts»'], ['Send alerts', 'Emergency plans', 'Emergency contacts', 'Activation and drill log'], ['Update emergency plan annually', 'Review contact numbers', 'Test alerts in drill', 'Document drill results'], { tips: ['Emergency numbers visible to field team', 'Periodic drills mandatory'] }),
        'risk-assessment': mod('Assess risks and define controls before work starts.', ['Sidebar ← «Risk Assessment»'], ['Assessment forms (JSA/TRA)', 'Likelihood and severity matrix', 'Control measures', 'Periodic review', 'Export'], ['Define activity or task', 'Identify hazards per step', 'Rate level (low/medium/high)', 'Define controls', 'Approve and share with team', 'Reassess when process changes'], { tips: ['Assess before work not after', 'Link to high-risk PTW'] }),
        'sop-jha': mod('Safe operating procedures (SOP) and job hazard analysis (JHA).', ['Sidebar ← «Safety Instructions SOP-JHA»'], ['SOP library', 'Step-by-step JHA', 'Required PPE', 'Versions and approvals'], ['Create SOP or JHA', 'Break task into steps', 'Hazards and controls per step', 'Approve and publish', 'Train team on procedure'], { tips: ['Short clear procedure beats long document', 'Review annually'] }),
        'legal-documents': mod('Archive legal documents, licenses, and official certificates.', ['Sidebar ← «Legal Documents»'], ['Upload documents', 'Issue and expiry dates', 'Renewal alerts', 'Search and classification', 'Change log'], ['Add document (type, authority, dates)', 'Attach file', 'Enable pre-expiry alert', 'Renew and update record'], { tips: ['Alert 30 days before expiry', 'Keep PDF copy'] }),
        sustainability: mod('Track sustainability initiatives and environmental indicators.', ['Sidebar ← «Environmental Sustainability»'], ['Environmental indicators (energy, water, waste...)', 'Sustainability projects', 'Annual targets', 'Reports'], ['Define indicators and targets', 'Record periodic readings', 'Compare to target', 'Export report to management'], { tips: ['Link indicators to strategic goals'] }),
        'safety-budget': mod('Plan safety budget and track actual spending.', ['Sidebar ← «Safety Budget»'], ['Budget line items', 'Actual expenses', 'Plan vs actual', 'Variance reports'], ['Define annual budget lines', 'Record each expense with reference/invoice', 'Review variances monthly', 'Adjust plan with approval'], { tips: ['Every expense with documented reference', 'Link to safety projects'] }),
        'ai-assistant': mod('AI assistant for safety questions and system usage.', ['Sidebar ← «AI Assistant»'], ['Interactive chat', 'Context suggestions', 'Procedure help'], ['Open assistant', 'Ask clearly', 'Apply guidance', 'Verify critical answers with safety officer'], { tips: ['Assistant supports decisions — not a substitute for professional judgment', 'Do not enter highly sensitive data in chat'] }),
        'safety-performance-kpis': mod('HSE management performance indicators (KPIs).', ['Sidebar ← «Safety Performance Indicators»'], ['Key KPIs', 'Monthly value entry', 'Target comparison', 'Dashboards and charts', 'Tabs: annual plan and HSE monitoring'], ['Define approved indicators', 'Enter monthly values on time', 'Review variances', 'Discuss in management meeting', 'Update plan when needed'], { tips: ['Few clear KPIs beat many unmeasurable ones', 'Link to incidents and training in practice'] }),
        'kpi-annual-plan': mod('Annual plan to achieve KPIs — tab within Safety Performance Indicators.', ['Safety KPIs ← «Annual Plan» tab'], ['Annual target per KPI', 'Monthly distribution', 'Achievement tracking'], ['Define annual targets', 'Distribute monthly', 'Review monthly vs actual'], { tips: ['Part of Safety Performance Indicators module'], permissionsNote: 'Follows safety-performance-kpis permission.' }),
        'hse-monitoring-plan': mod('Scheduled HSE activity monitoring plan (training, inspection, audit...).', ['Safety KPIs ← «HSE Monitoring Plan» tab'], ['Monitoring activity list', 'Owner and date', 'Execution status'], ['Create plan activity', 'Assign owner and date', 'Update status on completion', 'Review overdue weekly'], { tips: ['Sync with Safety Calendar'], permissionsNote: 'Follows safety-performance-kpis permission.' }),
        'safety-health-management': mod('Manage safety & health team structure and meetings.', ['Sidebar ← «Safety & Health Management»'], ['Management structure and committees', 'Responsibilities and appointments', 'Meeting minutes', 'Plans and decisions'], ['Update org structure', 'Document committee meetings', 'Record decisions and tasks', 'Follow execution'], { tips: ['Update team on appointment changes', 'Meeting minutes are auditable'] }),
        settings: mod('Company and system settings including Help content.', ['Sidebar ← «Settings» (bottom of menu)'], ['Company data and logo', 'Departments and sites', 'Form settings', 'Help content (Q&A)', 'System preferences'], ['Open Settings', 'Choose tab', 'Edit and save', 'Verify impact on modules'], { commonTasks: [{ task: 'Edit Help Q&A', steps: ['Settings ← Help Content', 'Add/edit questions', 'Enable custom content', 'Save'] }], tips: ['Changes affect all users', 'Backup Q&A before major edits'], permissionsNote: 'For admin or users with settings permission.' }),
        'action-tracking': mod('Central log for corrective and preventive actions from all sources.', ['Sidebar ← «Action Tracking Log»'], ['Open and closed actions', 'Owner and due date', 'Source (incident, observation, audit...)', 'Closure and verification'], ['Review open actions', 'Open and update progress', 'Add comments', 'Close after effectiveness check'], { tips: ['Overdue action = recurring risk', 'Always link to source'] }),
        'issue-tracking': mod('Track technical and operational system issues.', ['Sidebar ← «Issue Tracking»'], ['Report issue', 'Priority and status', 'Comments and follow-up', 'Closure and resolution'], ['Report issue (description, steps, screenshot)', 'Track status', 'Work with support', 'Confirm on closure'], { tips: ['Accurate description speeds resolution', 'Include version from sidebar bottom'] }),
        'change-management': mod('Manage controlled changes to processes and equipment (MOC).', ['Sidebar ← «Change Management»'], ['Change request', 'Risk assessment', 'Multi-level approvals', 'Implementation and follow-up', 'Change closure'], ['Submit change request', 'Describe change and reason', 'Assess risks', 'Obtain approvals', 'Implement after approval', 'Verify and close'], { tips: ['Critical change without approval = violation', 'Link to risk assessment'] }),
        reports: mod('Aggregated reports across system modules.', ['From dashboard or report links in modules', 'May appear as Reports module per setup'], ['Multi-source ready reports', 'Period filters', 'Excel/PDF export', 'Visual statistics'], ['Choose report type', 'Set period and filters', 'Wait for load', 'Export or print'], { tips: ['Data must finish loading before export'] }),
        apptester: mod('Internal testing and diagnostics (admin and technical support).', ['Sidebar ← «App Tester» (usually admin)'], ['Connection check', 'API request tests', 'Error diagnostics'], ['Technical use only', 'Do not change production data carelessly'], { tips: ['For admin and technical support'], permissionsNote: 'Usually admin only.' })
    }
};

// Serialize with function support for ui helpers
const uiFns = {
    qaExpandHint: (n) => `${n} questions — expand any question below for the full answer`,
    qaSearchResults: (n) => `${n} Q&A results`,
    showAllQa: (n) => `Show all questions (${n})`,
    permBanner: (title) => `Requires «${title}» permission from the system admin — you can still read the guide here.`,
    metaFaqCount: (n) => (n ? `${n} Q&A questions` : 'No results'),
    metaTopics: (n) => (n ? `Showing ${n} topics` : 'No results — try other keywords or select «All»'),
    modSummaryFallback: (label) => `${label} module for managing HSE data.`,
    modPurposeFallback: (label) => `Manage ${label} within the HSE platform.`
};

HELP_CONTENT_EN.ui = {
    pageTitle: 'System Guide — Help',
    version: 'Version',
    searchPlaceholder: 'Search the guide... (e.g. clinic, permit, MFA)',
    qaTitle: 'Questions & Answers (Q&A)',
    qBadge: 'Q',
    aBadge: 'A',
    purpose: 'Purpose:',
    accessPath: 'How to access the module',
    features: 'Key features',
    workflow: 'Usage steps',
    commonTasks: 'Common tasks — step by step',
    tips: 'Tips',
    extraDetails: 'Additional details',
    policyTerms: 'Terms & conditions',
    policyObligations: 'Obligations & guidance',
    policyNotes: 'Notes',
    openModule: 'Open module',
    metaUseQa: 'Use «Show all questions» or choose another category above',
    metaPolicy: '6 sections — Usage Policy & Liability (not Q&A)',
    noResults: 'No matching results',
    policyHeaderTitle: 'Usage Policy & Liability',
    policyHeaderDesc: 'Six regulatory sections — click any section for details. This tab is for policy terms only, not Q&A.',
    downloadPdf: 'Download PDF',
    pdfLoading: 'Preparing PDF file...',
    pdfSuccess: 'Usage policy downloaded as PDF',
    pdfFail: 'PDF download failed — check your connection and try again',
    pdfError: 'Failed to create policy file:',
    pdfDocType: 'Official document — HSE',
    pdfTitle: 'Usage Policy & Liability',
    pdfIntro: 'A regulatory document with six sections defining terms of use, user responsibilities, data confidentiality, acceptable use, and liability disclaimer.',
    pdfAppVersion: 'App version:',
    pdfExportDate: 'Export date:',
    pdfTermsTitle: 'Terms & conditions',
    pdfObligationsTitle: 'Obligations & guidance',
    pdfNotesTitle: 'Notes',
    pdfFooterSummary: 'Document summary',
    pdfFooterType: 'Type:',
    pdfFooterTypeVal: 'Usage Policy & Liability',
    pdfFooterSections: 'Sections:',
    pdfFileName: 'usage-policy-liability',
    qaQuickHint: 'Quick answers — click a question for details',
    modDefaultFeatures: ['Record data', 'Search & filter', 'Reports', 'Export'],
    modDefaultWorkflow: ['Open the module', 'Add or edit records', 'Save and review reports'],
    modDefaultTips: ['Check permissions with your admin if the module is hidden'],
    modPermAdmin: 'Protected module — for admin or explicit grant only.',
    modPermGrant: 'Requires permission grant from the system administrator.',
    ...uiFns
};

const header = `/**
 * Help Module — English content bundle
 * Auto-generated by tools/build-help-content-en.mjs — do not edit by hand; regenerate instead.
 */
window.HELP_CONTENT_EN = `;

const body = JSON.stringify(HELP_CONTENT_EN, (key, val) => {
    if (typeof val === 'function') return val.toString();
    return val;
}, 2);

// Restore functions in ui object
let output = header + body.replace(
    /"(qaExpandHint|qaSearchResults|showAllQa|permBanner|metaFaqCount|metaTopics|modSummaryFallback|modPurposeFallback)":\s*"(function[^"]+)"/g,
    ''
);

// Simpler: append functions after JSON parse at runtime
const fileContent = `/**
 * Help Module — English content bundle
 */
(function () {
    const data = ${JSON.stringify({ ...HELP_CONTENT_EN, ui: { ...HELP_CONTENT_EN.ui } }, null, 2).replace(/"ui": \{[\s\S]*?\n  \}/, '"ui": null')};
    data.ui = ${JSON.stringify(HELP_CONTENT_EN.ui, (k, v) => typeof v === 'function' ? undefined : v, 2)};
    Object.assign(data.ui, {
        qaExpandHint: (n) => n + ' questions — expand any question below for the full answer',
        qaSearchResults: (n) => n + ' Q&A results',
        showAllQa: (n) => 'Show all questions (' + n + ')',
        permBanner: (title) => 'Requires «' + title + '» permission from the system admin — you can still read the guide here.',
        metaFaqCount: (n) => n ? n + ' Q&A questions' : 'No results',
        metaTopics: (n) => n ? 'Showing ' + n + ' topics' : 'No results — try other keywords or select «All»',
        modSummaryFallback: (label) => label + ' module for managing HSE data.',
        modPurposeFallback: (label) => 'Manage ' + label + ' within the HSE platform.'
    });
    window.HELP_CONTENT_EN = data;
})();
`;

fs.writeFileSync(outPath, fileContent, 'utf8');
console.log('Wrote', outPath, 'bytes:', fs.statSync(outPath).size);
