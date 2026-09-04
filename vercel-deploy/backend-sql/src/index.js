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
const { isAllowedOrigin } = require('./allowed-origins');

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (isAllowedOrigin(origin)) return callback(null, true);
        callback(new Error('CORS: origin not allowed for this project'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Support text/plain (used by Frontend Google Apps Script fetch) and application/json (10MB limit)
app.use(express.text({ type: ['text/plain', 'application/json', '*/*'], limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint
app.get('/health', (req, res) => {
    let dbEngine = config.dbType || 'unknown';
    let persistent = config.dbType === 'oracle' || !!(config.turso && config.turso.enabled);
    try {
        const { getDatabase } = require('./db/database');
        const db = getDatabase();
        if (db && db.engineType) dbEngine = db.engineType;
        if (db && typeof db.persistent === 'boolean') persistent = db.persistent;
        else if (dbEngine === 'oracle' || dbEngine === 'libsql-turso') persistent = true;
    } catch (_e) { /* keep config fallback */ }
    res.json({
        status: 'ok',
        server: 'HSE SQL Backend',
        buildTag: config.buildTag,
        dbType: config.dbType,
        dbEngine,
        persistent,
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
const rpcHandler = async (req, res) => {
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

    const response = await handleRpcRequest(body);
    res.json(response);
};

app.post('/', rpcHandler);
app.post('/exec', rpcHandler);
app.post('/api/rpc', rpcHandler);

// Start server if executed directly
if (require.main === module) {
    const server = app.listen(config.port, config.host, () => {
        const dbLabel = config.dbType === 'oracle'
            ? `Oracle (${config.oracle.connectString || 'ADB'})`
            : (config.turso && config.turso.enabled)
                ? `Turso (${config.turso.url})`
                : `SQLite (${config.sqlitePath})`;
        console.log(`====================================================`);
        console.log(`🚀 HSE SQL Backend running at: http://${config.host}:${config.port}`);
        console.log(`📊 Protocol: 100% Google Apps Script RPC Parity`);
        console.log(`🗄️  Database: ${dbLabel}`);
        console.log(`====================================================`);
    });

    server.on('error', (err) => {
        console.error('Server error:', err);
    });
}

module.exports = app;
