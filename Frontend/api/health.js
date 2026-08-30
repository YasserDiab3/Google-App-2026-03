/**
 * Vercel Serverless Health Check Endpoint (/api/health)
 */
'use strict';

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
        status: 'ok',
        platform: 'Vercel Serverless',
        service: 'HSE API',
        timestamp: new Date().toISOString()
    });
};
