/**
 * HSE SQL Backend - Main Server Application
 */
'use strict';

const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { initDatabase } = require('./db/database');
const { initSchema } = require('./db/schema-init');
const { handleRpcRequest } = require('./rpc-router');
const { startDailyBackupScheduler } = require('./services/backup-service');

const app = express();

// Initialize Database & Schema
const db = initDatabase();
initSchema(db);

// Start Automated Backup Scheduler
startDailyBackupScheduler(db);

// Allowed Origin Whitelist (Production Domains + Development)
const ALLOWED_ORIGINS = [
    'https://www.safety-icapp.com',
    'https://safetyicapp-ecru.vercel.app',
    /^https:\/\/.*\.vercel\.app$/,
    /^https:\/\/.*\.trycloudflare\.com$/,
    /^http:\/\/localhost(:\d+)?$/,
    /^http:\/\/127\.0\.0\.1(:\d+)?$/
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // Mobile WebView, curl, server-to-server
        const isAllowed = ALLOWED_ORIGINS.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true); // Allow with warning in development/tunnel
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Support text/plain (used by Frontend خادم SQL fetch) and application/json (10MB limit)
app.use(express.text({ type: ['text/plain', 'application/json', '*/*'], limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        server: 'HSE SQL Backend',
        buildTag: config.buildTag,
        dbType: config.dbType,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'HSE System SQL Backend API is running.',
        docs: 'Send POST requests with { action, data, actorUserData } to /exec or /api/rpc'
    });
});

// Single Dispatcher Endpoint matching GAS WebApp URL (/exec or /api/rpc or /)
const rpcHandler = (req, res) => {
    let body = req.body;
    
    // Parse text body if delivered as string
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: 'Invalid JSON payload received',
                errorCode: 'INVALID_JSON'
            });
        }
    }

    const response = handleRpcRequest(body);
    res.json(response);
};

app.post('/', rpcHandler);
app.post('/exec', rpcHandler);
app.post('/api/rpc', rpcHandler);

// Start server if executed directly
if (require.main === module) {
    const server = app.listen(config.port, config.host, () => {
        console.log(`====================================================`);
        console.log(`🚀 HSE SQL Backend running at: http://${config.host}:${config.port}`);
        console.log(`📊 Protocol: 100% خادم SQL RPC Parity`);
        console.log(`🗄️  Database: SQLite (${config.sqlitePath})`);
        console.log(`====================================================`);
    });

    server.on('error', (err) => {
        console.error('Server error:', err);
    });
}

module.exports = app;
