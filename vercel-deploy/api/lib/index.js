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

const app = express();

// Initialize Database & Schema
const db = initDatabase();
initSchema(db);

// CORS configuration (supports all origins for dev/production)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Support text/plain (used by Frontend Google Apps Script fetch) and application/json
app.use(express.text({ type: ['text/plain', 'application/json', '*/*'], limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

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
        console.log(`📊 Protocol: 100% Google Apps Script RPC Parity`);
        console.log(`🗄️  Database: SQLite (${config.sqlitePath})`);
        console.log(`====================================================`);
    });

    server.on('error', (err) => {
        console.error('Server error:', err);
    });
}

module.exports = app;
