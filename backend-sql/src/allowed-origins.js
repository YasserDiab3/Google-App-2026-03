'use strict';

/** نطاقات هذا المشروع فقط — ممنوع icapphub وأي Vercel أجنبي */
const ALLOWED_ORIGIN_LIST = [
    'https://www.safety-icapp.com',
    'https://safety-icapp.com',
    'https://safetyicapp-ecru.vercel.app'
];

function isDevOrigin(origin) {
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(String(origin || ''));
}

function isAllowedOrigin(origin) {
    const o = String(origin || '').trim();
    if (!o) return true;
    if (ALLOWED_ORIGIN_LIST.indexOf(o) !== -1) return true;
    if (isDevOrigin(o)) return true;
    return false;
}

function applyRestrictiveCors(req, res) {
    const origin = req.headers && (req.headers.origin || req.headers.Origin);
    if (origin && isAllowedOrigin(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN_LIST[0]);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');
}

module.exports = {
    ALLOWED_ORIGIN_LIST,
    isAllowedOrigin,
    applyRestrictiveCors
};
