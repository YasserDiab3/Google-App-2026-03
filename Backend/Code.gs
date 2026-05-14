/**
 * Google Apps Script for HSE System - Main Entry Point
 * 
 * هذا هو الملف الرئيسي الذي يتعامل مع جميع الطلبات
 */

/**
 * ============================================
 * معالجة طلبات POST
 * ============================================
 */
function doPost(e) {
    // بصمة نسخة واضحة لتأكيد أن الطلب وصل للنسخة الصحيحة
    var BUILD_TAG = 'HSE_WEBAPP_BUILD_2026-05-14_refactored_v1';
    Logger.log('🚀 [DOPOST] ===== doPost تم استدعاؤها =====');
    Logger.log('🏷️ [DOPOST] BUILD_TAG: ' + BUILD_TAG);
    
    try {
        // التحقق من صحة المعاملات
        if (!e) {
            Logger.log('Error: No event object (e) received in doPost');
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'No event object received',
                errorCode: 'NO_EVENT'
            })));
        }

        if (!e.postData || !e.postData.contents) {
            Logger.log('Warning: No postData received');
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'No data received in request body',
                errorCode: 'NO_DATA'
            })));
        }

        // تحليل JSON
        var postData;
        try {
            postData = JSON.parse(e.postData.contents);
        } catch (parseError) {
            Logger.log('Error parsing JSON: ' + parseError.toString());
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'Invalid JSON format',
                errorCode: 'JSON_PARSE_ERROR'
            })));
        }

        var action = postData.action;
        var rawPayload = postData.data || postData;
        var payload = (typeof sanitizeRequestObject === 'function') ? sanitizeRequestObject(rawPayload, 0) : rawPayload;
        var actorUserData = (postData && postData.userData) || (payload && payload.userData) || (payload && payload.user) || null;
        var spreadsheetId = getSpreadsheetId();

        if (!action) {
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: false,
                message: 'Action is missing',
                errorCode: 'ACTION_MISSING'
            })));
        }

        Logger.log('Dispatcher: Processing action: ' + action);
        var result = { success: false, message: '' };

        try {
            if (typeof ActionHandlers !== 'undefined' && ActionHandlers.hasOwnProperty(action)) {
                Logger.log('Dispatcher: Routing to handler for: ' + action);
                result = ActionHandlers[action](payload, postData, action, actorUserData, spreadsheetId);
            } else {
                if (typeof handleUnrecognizedAction === 'function') {
                    result = handleUnrecognizedAction(action);
                } else {
                    result = {
                        success: false,
                        message: 'الإجراء "' + action + '" غير مدعوم.',
                        errorCode: 'ACTION_NOT_RECOGNIZED'
                    };
                }
            }
        } catch (handlerError) {
            Logger.log('❌ Error in handler: ' + handlerError.toString());
            result = {
                success: false,
                message: 'Error executing action: ' + handlerError.toString(),
                errorCode: 'HANDLER_ERROR'
            };
        }

        const output = ContentService.createTextOutput(JSON.stringify(result));
        output.setMimeType(ContentService.MimeType.JSON);
        return setCorsHeaders(output);

    } catch (error) {
        Logger.log('Fatal Error in doPost: ' + error.toString());
        return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'Internal server error: ' + error.toString(),
            errorCode: 'FATAL_ERROR'
        })));
    }
}

/**
 * ============================================
 * معالجة طلبات GET
 * ============================================
 */
function doGet(e) {
    try {
        if (!e || !e.parameter || !e.parameter.action) {
            return ContentService.createTextOutput(JSON.stringify({
                success: true,
                status: 'active',
                message: 'HSE System Backend is running'
            })).setMimeType(ContentService.MimeType.JSON);
        }

        var action = e.parameter.action;
        var sheetName = e.parameter.sheetName;
        var spreadsheetId = e.parameter.spreadsheetId || getSpreadsheetId();

        if (action === 'getData' && sheetName) {
            var data = readFromSheet(sheetName, spreadsheetId);
            return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
                success: true,
                data: data
            })));
        }

        // ... cases for publicProfileCard etc can be added back if needed,
        // but keeping it lean for stability first.
        
        return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'GET action not supported or missing parameters'
        })));

    } catch (error) {
        return setCorsHeaders(ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'Error in doGet: ' + error.toString()
        })));
    }
}

function doOptions(e) {
    var output = ContentService.createTextOutput('{}');
    output.setMimeType(ContentService.MimeType.JSON);
    return setCorsHeaders(output);
}
