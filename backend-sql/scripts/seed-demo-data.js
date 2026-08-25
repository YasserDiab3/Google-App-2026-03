/**
 * Seed Demo Data Script for local testing and verification
 */
'use strict';

const crypto = require('crypto');
const { getDatabase } = require('../src/db/database');
const { initSchema } = require('../src/db/schema-init');

function sha256(str) {
    return crypto.createHash('sha256').update(String(str || '')).digest('hex');
}

function runSeed() {
    console.log('🌱 Starting database seeding...');
    const db = getDatabase();
    initSchema(db);

    const now = new Date().toISOString();

    // 1. Users
    db.saveToSheet('Users', [
        {
            id: 'USR_ADMIN_01',
            name: 'مدير النظام (Admin)',
            email: 'admin@system.local',
            passwordHash: sha256('admin123'),
            role: 'admin',
            department: 'الإدارة العامة والسلامة',
            employeeCode: 'EMP001',
            active: 'true',
            permissions: JSON.stringify(['all']),
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'USR_DOC_01',
            name: 'د. أحمد محمود (طبيب العيادة)',
            email: 'doctor@system.local',
            passwordHash: sha256('doctor123'),
            role: 'doctor',
            department: 'العيادة الطبية',
            employeeCode: 'EMP002',
            active: 'true',
            permissions: JSON.stringify(['clinic']),
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'USR_ENG_01',
            name: 'م. سامح إبراهيم (أخصائي السلامة)',
            email: 'safety@system.local',
            passwordHash: sha256('safety123'),
            role: 'safety_officer',
            department: 'السلامة والصحة المهنية',
            employeeCode: 'EMP003',
            active: 'true',
            permissions: JSON.stringify(['safety', 'ptw', 'incidents']),
            createdAt: now,
            updatedAt: now
        }
    ]);

    // 2. Medications
    db.saveToSheet('Medications', [
        {
            id: 'MED_01',
            name: 'بانادول Panadol 500mg',
            type: 'مسكن وخافض حرارة',
            usage: 'أقراص',
            quantityAdded: '500',
            remainingQuantity: '450',
            location: 'صيدلية العيادة - رف A',
            expiryDate: '2027-12-31',
            status: 'متاح',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'MED_02',
            name: 'أوجمنتين Augmentin 1g',
            type: 'مضاد حيوي',
            usage: 'أقراص',
            quantityAdded: '200',
            remainingQuantity: '180',
            location: 'صيدلية العيادة - رف B',
            expiryDate: '2026-11-30',
            status: 'متاح',
            createdAt: now,
            updatedAt: now
        },
        {
            id: 'MED_03',
            name: 'شاش معقم وضمادات Sterile Gauze',
            type: 'إسعافات أولية',
            usage: 'موضعي',
            quantityAdded: '300',
            remainingQuantity: '290',
            location: 'غرفة الإسعاف',
            expiryDate: '2028-01-01',
            status: 'متاح',
            createdAt: now,
            updatedAt: now
        }
    ]);

    // 3. Employees
    db.saveToSheet('Employees', [
        {
            employeeNumber: 'EMP1001',
            id: 'EMP1001',
            name: 'محمود علي حسن',
            department: 'الإنتاج',
            job: 'فني تشغيل خطوط',
            nationalId: '29001011234567',
            phone: '01012345678',
            status: 'active',
            createdAt: now,
            updatedAt: now
        },
        {
            employeeNumber: 'EMP1002',
            id: 'EMP1002',
            name: 'كريم عبد العزيز',
            department: 'الصيانة الميكانيكية',
            job: 'فني صيانة هيدروليك',
            nationalId: '29205051234567',
            phone: '01123456789',
            status: 'active',
            createdAt: now,
            updatedAt: now
        }
    ]);

    // 4. Approved Contractors
    db.saveToSheet('ApprovedContractors', [
        {
            id: 'CON_01',
            code: 'CON-001',
            companyName: 'شركة النيل للخدمات الهندسية',
            serviceType: 'أعمال مدنية وعزل',
            licenseNumber: 'LIC-7788',
            status: 'approved',
            approvalDate: '2026-01-10',
            expiryDate: '2027-01-10',
            isActive: 'true',
            createdAt: now,
            updatedAt: now
        }
    ]);

    // 5. Incidents
    db.saveToSheet('Incidents', [
        {
            id: 'INC_2026_001',
            title: 'انزلاق بسيط أثناء فحص خط التعبئة',
            location: 'صالة الإنتاج رقم 2',
            date: '2026-08-20',
            severity: 'بسيط (Minor)',
            incidentType: 'انزلاق / تعثر',
            employeeName: 'محمود علي حسن',
            employeeCode: 'EMP1001',
            status: 'مغلق',
            actionsTaken: 'تم وضع علامات تحذيرية وتنظيف بقعة الزيت',
            createdAt: now,
            updatedAt: now
        }
    ]);

    // 6. Clinic Visits
    db.saveToSheet('ClinicVisits', [
        {
            id: 'CLN_2026_001',
            personType: 'employee',
            employeeCode: 'EMP1001',
            employeeName: 'محمود علي حسن',
            employeeDepartment: 'الإنتاج',
            visitDate: '2026-08-20 10:30',
            reason: 'صداع خفيف وإرهاق',
            diagnosis: 'إجهاد عضلي بسيط',
            treatment: 'راحة 30 دقيقة وتناول سوائل',
            medicationsDispensed: 'بانادول Panadol 500mg',
            medicationsDispensedQty: '2',
            createdAt: now,
            updatedAt: now
        }
    ]);

    console.log('✅ Seeding completed successfully! 6 core tables populated.');
}

if (require.main === module) {
    runSeed();
}

module.exports = { runSeed };
