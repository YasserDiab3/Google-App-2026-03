/**
 * Google Apps Script for HSE System - PPE Module
 * 
 * موديول معدات الحماية الشخصية - النسخة المحسنة
 */

/**
 * ============================================
 * معدات الحماية الشخصية (PPE)
 * ============================================
 */

/**
 * إضافة معدات الحماية الشخصية (PPE)
 */
function addPPEToSheet(ppeData) {
    try {
        if (!ppeData) {
            return { success: false, message: 'بيانات المعدات غير موجودة' };
        }

        const sheetName = 'PPE';

        // إضافة حقول تلقائية
        if (!ppeData.id) {
            ppeData.id = generateSequentialId('PPE', sheetName);
        }
        if (!ppeData.createdAt) {
            ppeData.createdAt = new Date();
        }
        if (!ppeData.updatedAt) {
            ppeData.updatedAt = new Date();
        }
        if (!ppeData.status) {
            ppeData.status = 'مستلم';
        }

        const result = appendToSheet(sheetName, ppeData);

        // ✅ FIX: عند تسجيل استلام جديد لمهمات الوقاية، نخصم الكمية من المخزون تلقائياً
        // (نسجل transaction بـ action='OUT' → addPPETransaction يحدث PPE_Stock atomically)
        if (result && result.success) {
            try {
                applyPPEReceiptStockDeduction_(ppeData);
            } catch (deductErr) {
                Logger.log('⚠️ addPPEToSheet: تعذر خصم المخزون (الاستلام محفوظ): ' + deductErr.toString());
                // لا نُفشل الاستلام — السجل محفوظ والمخزون يمكن تصحيحه يدوياً لاحقاً
            }
        }

        return result;
    } catch (error) {
        Logger.log('Error in addPPEToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المعدات: ' + error.toString() };
    }
}

/**
 * ✅ خصم كمية الاستلام من PPE_Stock تلقائياً عند تسجيل استلام جديد.
 * يُطابق نوع المعدّة (equipmentType) باسم الصنف في المخزون (itemName)،
 * ويُسجل transaction بـ action='OUT' في PPE_Transactions ليتم تحديث المخزون atomically.
 *
 * @param {Object} ppeData - بيانات الاستلام (يجب أن تحوي equipmentType و quantity)
 * @returns {{success: boolean, message: string, matched?: boolean, itemId?: string}}
 */
function applyPPEReceiptStockDeduction_(ppeData) {
    try {
        if (!ppeData) return { success: false, message: 'لا توجد بيانات' };
        var equipmentType = String(ppeData.equipmentType || '').trim();
        var quantity = parseFloat(ppeData.quantity);
        if (!equipmentType) return { success: false, message: 'نوع المعدّة غير محدد' };
        if (!isFinite(quantity) || quantity <= 0) {
            return { success: false, message: 'كمية الاستلام غير صالحة' };
        }

        var spreadsheetId = getSpreadsheetId();
        var stockItems = readFromSheet('PPE_Stock', spreadsheetId);
        if (!Array.isArray(stockItems) || stockItems.length === 0) {
            Logger.log('⚠️ applyPPEReceiptStockDeduction_: PPE_Stock فارغ — تم تخطي الخصم');
            return { success: false, matched: false, message: 'لا توجد أصناف في المخزون' };
        }

        // 1) مطابقة دقيقة بالاسم
        var normalize = function (s) { return String(s || '').trim().toLowerCase(); };
        var typeLower = normalize(equipmentType);
        var matched = stockItems.find(function (item) {
            if (!item) return false;
            return normalize(item.itemName || item.name || item.equipmentType) === typeLower;
        });

        // 2) مطابقة بـ itemCode أو equipmentType إن وُجد على الاستلام
        if (!matched) {
            var receiptItemId = String(ppeData.itemId || '').trim();
            var receiptItemCode = String(ppeData.itemCode || '').trim();
            if (receiptItemId || receiptItemCode) {
                matched = stockItems.find(function (item) {
                    if (!item) return false;
                    return (receiptItemId && String(item.itemId || '').trim() === receiptItemId) ||
                           (receiptItemCode && String(item.itemCode || '').trim() === receiptItemCode);
                });
            }
        }

        // 3) مطابقة جزئية كملاذ أخير (احتواء)
        if (!matched && typeLower.length >= 3) {
            matched = stockItems.find(function (item) {
                if (!item) return false;
                var n = normalize(item.itemName || item.name);
                return n && (n.indexOf(typeLower) !== -1 || typeLower.indexOf(n) !== -1);
            });
        }

        if (!matched || !matched.itemId) {
            Logger.log('⚠️ applyPPEReceiptStockDeduction_: لم يُعثر على صنف مطابق في المخزون لـ "' +
                equipmentType + '" — لا خصم. تأكد من وجود الصنف في PPE_Stock باسم مطابق.');
            return { success: false, matched: false, message: 'الصنف غير موجود في المخزون: ' + equipmentType };
        }

        // ✅ تسجيل transaction بـ action='OUT' — addPPETransaction سيحدث الرصيد atomically
        var transactionData = {
            itemId: String(matched.itemId).trim(),
            itemName: matched.itemName || matched.name || equipmentType,
            action: 'OUT',
            quantity: quantity,
            date: ppeData.receiptDate ? new Date(ppeData.receiptDate) : new Date(),
            notes: 'صرف تلقائي عند تسجيل استلام: ' + (ppeData.employeeName || 'موظف') +
                   (ppeData.receiptNumber ? ' (إيصال: ' + ppeData.receiptNumber + ')' : ''),
            relatedReceiptId: ppeData.id || '',
            createdBy: ppeData.createdBy || 'النظام',
            source: 'auto-receipt'
        };

        var txResult = addPPETransaction(transactionData);
        if (txResult && txResult.success) {
            Logger.log('✅ applyPPEReceiptStockDeduction_: خصم ' + quantity + ' من "' +
                (matched.itemName || matched.name) + '" (itemId: ' + matched.itemId + ')');
            return { success: true, matched: true, itemId: matched.itemId };
        } else {
            Logger.log('⚠️ applyPPEReceiptStockDeduction_: فشل تسجيل transaction: ' +
                (txResult && txResult.message ? txResult.message : 'unknown'));
            return { success: false, matched: true, itemId: matched.itemId, message: 'فشل تسجيل الحركة' };
        }
    } catch (error) {
        Logger.log('❌ applyPPEReceiptStockDeduction_ error: ' + error.toString());
        return { success: false, message: 'خطأ: ' + error.toString() };
    }
}

/**
 * تحديث معدات الحماية الشخصية
 */
function updatePPE(ppeId, updateData) {
    try {
        if (!ppeId) {
            return { success: false, message: 'معرف المعدات غير محدد' };
        }

        const sheetName = 'PPE';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const ppeIndex = data.findIndex(p => p.id === ppeId);

        if (ppeIndex === -1) {
            return { success: false, message: 'المعدات غير موجودة' };
        }

        // ✅ FIX: حفظ الـ snapshot القديم لحساب delta المخزون لاحقاً
        const oldRecord = Object.assign({}, data[ppeIndex]);

        updateData.updatedAt = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[ppeIndex][key] = updateData[key];
            }
        }

        const saveResult = saveToSheet(sheetName, data, spreadsheetId);

        // ✅ FIX: إذا تغيّر equipmentType أو quantity، نُطبّق delta على المخزون
        // (نُعيد الكمية القديمة ثم نخصم الكمية الجديدة عبر transactions)
        if (saveResult && saveResult.success) {
            try {
                var oldType = String(oldRecord.equipmentType || '').trim();
                var oldQty = parseFloat(oldRecord.quantity) || 0;
                var newType = String(data[ppeIndex].equipmentType || '').trim();
                var newQty = parseFloat(data[ppeIndex].quantity) || 0;
                var typeChanged = oldType && newType && oldType !== newType;
                var qtyChanged = oldQty !== newQty;

                if (typeChanged || qtyChanged) {
                    // أعد الكمية القديمة (IN) ثم اخصم الكمية الجديدة (OUT)
                    if (oldType && oldQty > 0) {
                        applyPPEReceiptStockRefund_(oldRecord);
                    }
                    if (newType && newQty > 0) {
                        applyPPEReceiptStockDeduction_(data[ppeIndex]);
                    }
                }
            } catch (deltaErr) {
                Logger.log('⚠️ updatePPE: تعذر تطبيق delta المخزون: ' + deltaErr.toString());
            }
        }

        return saveResult;
    } catch (error) {
        Logger.log('Error updating PPE: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المعدات: ' + error.toString() };
    }
}

/**
 * حذف استلام مهمات الوقاية
 */
function deletePPE(ppeId) {
    try {
        if (!ppeId) {
            return { success: false, message: 'معرف الاستلام غير محدد' };
        }
        
        const sheetName = 'PPE';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود الاستلام قبل الحذف
        const data = readFromSheet(sheetName, spreadsheetId);
        const ppeItem = data.find(p => p.id === ppeId);
        
        if (!ppeItem) {
            return { success: false, message: 'الاستلام غير موجود' };
        }
        
        // ✅ حذف الاستلام باستخدام deleteRowById
        const deleteResult = deleteRowById(sheetName, ppeId, spreadsheetId);

        if (!deleteResult.success) {
            return deleteResult;
        }

        // ✅ FIX: عند حذف استلام، نُعيد الكمية للمخزون (إنشاء transaction بـ action='IN')
        try {
            applyPPEReceiptStockRefund_(ppeItem);
        } catch (refundErr) {
            Logger.log('⚠️ deletePPE: تعذر إعادة الكمية للمخزون: ' + refundErr.toString());
        }

        return { success: true, message: 'تم حذف الاستلام بنجاح' };
    } catch (error) {
        Logger.log('Error in deletePPE: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الاستلام: ' + error.toString() };
    }
}

/**
 * ✅ إعادة كمية الاستلام للمخزون عند حذفه (action='IN').
 * يستخدم نفس منطق المطابقة في applyPPEReceiptStockDeduction_.
 *
 * @param {Object} ppeData - بيانات الاستلام المحذوف
 * @returns {{success: boolean, message: string}}
 */
function applyPPEReceiptStockRefund_(ppeData) {
    try {
        if (!ppeData) return { success: false, message: 'لا توجد بيانات' };
        var equipmentType = String(ppeData.equipmentType || '').trim();
        var quantity = parseFloat(ppeData.quantity);
        if (!equipmentType) return { success: false, message: 'نوع المعدّة غير محدد' };
        if (!isFinite(quantity) || quantity <= 0) {
            return { success: false, message: 'كمية الاستلام غير صالحة' };
        }

        var spreadsheetId = getSpreadsheetId();
        var stockItems = readFromSheet('PPE_Stock', spreadsheetId);
        if (!Array.isArray(stockItems) || stockItems.length === 0) {
            return { success: false, message: 'لا توجد أصناف في المخزون' };
        }

        var normalize = function (s) { return String(s || '').trim().toLowerCase(); };
        var typeLower = normalize(equipmentType);

        var matched = stockItems.find(function (item) {
            if (!item) return false;
            return normalize(item.itemName || item.name || item.equipmentType) === typeLower;
        });
        if (!matched) {
            var rid = String(ppeData.itemId || '').trim();
            var rcode = String(ppeData.itemCode || '').trim();
            if (rid || rcode) {
                matched = stockItems.find(function (item) {
                    if (!item) return false;
                    return (rid && String(item.itemId || '').trim() === rid) ||
                           (rcode && String(item.itemCode || '').trim() === rcode);
                });
            }
        }
        if (!matched && typeLower.length >= 3) {
            matched = stockItems.find(function (item) {
                if (!item) return false;
                var n = normalize(item.itemName || item.name);
                return n && (n.indexOf(typeLower) !== -1 || typeLower.indexOf(n) !== -1);
            });
        }
        if (!matched || !matched.itemId) {
            Logger.log('⚠️ applyPPEReceiptStockRefund_: لم يُعثر على صنف مطابق — لا إعادة');
            return { success: false, message: 'الصنف غير موجود في المخزون' };
        }

        var transactionData = {
            itemId: String(matched.itemId).trim(),
            itemName: matched.itemName || matched.name || equipmentType,
            action: 'IN',
            quantity: quantity,
            date: new Date(),
            notes: 'إعادة تلقائية بسبب حذف استلام رقم: ' + (ppeData.receiptNumber || ppeData.id || ''),
            createdBy: 'النظام',
            source: 'auto-receipt-delete'
        };

        var txResult = addPPETransaction(transactionData);
        if (txResult && txResult.success) {
            Logger.log('✅ applyPPEReceiptStockRefund_: إعادة ' + quantity + ' إلى "' +
                (matched.itemName || matched.name) + '"');
            return { success: true };
        }
        return { success: false, message: (txResult && txResult.message) || 'فشل تسجيل الإعادة' };
    } catch (error) {
        Logger.log('❌ applyPPEReceiptStockRefund_ error: ' + error.toString());
        return { success: false, message: error.toString() };
    }
}

/**
 * الحصول على جميع معدات الحماية الشخصية
 */
function getAllPPE(filters = {}) {
    try {
        const sheetName = 'PPE';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.employeeCode) {
            data = data.filter(p => p.employeeCode === filters.employeeCode);
        }
        if (filters.equipmentType) {
            data = data.filter(p => p.equipmentType === filters.equipmentType);
        }
        if (filters.status) {
            data = data.filter(p => p.status === filters.status);
        }
        if (filters.startDate) {
            data = data.filter(p => {
                if (!p.receiptDate) return false;
                return new Date(p.receiptDate) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(p => {
                if (!p.receiptDate) return false;
                return new Date(p.receiptDate) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب تاريخ الاستلام
        data.sort((a, b) => {
            const dateA = new Date(a.receiptDate || a.createdAt || 0);
            const dateB = new Date(b.receiptDate || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all PPE: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المعدات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * مصفوفة معدات الحماية الشخصية (PPE Matrix)
 * ============================================
 */

/**
 * إضافة مصفوفة معدات الحماية الشخصية
 */
function addPPEMatrixToSheet(matrixData) {
    try {
        if (!matrixData) {
            return { success: false, message: 'بيانات المصفوفة غير موجودة' };
        }
        
        const sheetName = 'PPEMatrix';
        
        // إضافة حقول تلقائية
        if (!matrixData.id) {
            matrixData.id = generateSequentialId('PPM', sheetName);
        }
        if (!matrixData.createdAt) {
            matrixData.createdAt = new Date();
        }
        if (!matrixData.updatedAt) {
            matrixData.updatedAt = new Date();
        }
        if (!matrixData.lastUpdated) {
            matrixData.lastUpdated = new Date();
        }
        
        return appendToSheet(sheetName, matrixData);
    } catch (error) {
        Logger.log('Error in addPPEMatrixToSheet: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة المصفوفة: ' + error.toString() };
    }
}

/**
 * تحديث مصفوفة معدات الحماية الشخصية
 */
function updatePPEMatrix(employeeId, updateData) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'PPEMatrix';
        const spreadsheetId = getSpreadsheetId();
        const data = readFromSheet(sheetName, spreadsheetId);
        const matrixIndex = data.findIndex(m => m.employeeId === employeeId);
        
        if (matrixIndex === -1) {
            return { success: false, message: 'مصفوفة المعدات غير موجودة' };
        }
        
        updateData.updatedAt = new Date();
        updateData.lastUpdated = new Date();
        for (var key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                data[matrixIndex][key] = updateData[key];
            }
        }
        
        return saveToSheet(sheetName, data, spreadsheetId);
    } catch (error) {
        Logger.log('Error updating PPE matrix: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء تحديث المصفوفة: ' + error.toString() };
    }
}

/**
 * الحصول على مصفوفة معدات الحماية الشخصية لموظف
 */
function getPPEMatrix(employeeId) {
    try {
        if (!employeeId) {
            return { success: false, message: 'معرف الموظف غير محدد' };
        }
        
        const sheetName = 'PPEMatrix';
        const data = readFromSheet(sheetName, getSpreadsheetId());
        const matrix = data.find(m => m.employeeId === employeeId);
        
        if (!matrix) {
            return { success: false, message: 'مصفوفة المعدات غير موجودة' };
        }
        
        return { success: true, data: matrix };
    } catch (error) {
        Logger.log('Error getting PPE matrix: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المصفوفة: ' + error.toString() };
    }
}

/**
 * الحصول على جميع مصفوفات معدات الحماية الشخصية
 */
function getAllPPEMatrices(filters = {}) {
    try {
        const sheetName = 'PPEMatrix';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.department) {
            data = data.filter(m => m.department === filters.department);
        }
        if (filters.position) {
            data = data.filter(m => m.position === filters.position);
        }
        
        // ترتيب حسب آخر تحديث
        data.sort((a, b) => {
            const dateA = new Date(a.lastUpdated || a.updatedAt || a.createdAt || 0);
            const dateB = new Date(b.lastUpdated || b.updatedAt || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all PPE matrices: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المصفوفات: ' + error.toString(), data: [] };
    }
}

/**
 * ============================================
 * إدارة مخزون مهمات الوقاية (PPE Stock Control)
 * ============================================
 */

/**
 * حساب الرصيد التلقائي من الحركات
 */
function calculateStockBalance(itemId) {
    try {
        const sheetName = 'PPE_Transactions';
        let transactions = readFromSheet(sheetName, getSpreadsheetId());
        
        // تصفية الحركات للصنف المحدد
        transactions = transactions.filter(t => t.itemId === itemId);
        
        let balance = 0;
        transactions.forEach(transaction => {
            if (transaction.action === 'IN') {
                balance += parseFloat(transaction.quantity || 0);
            } else if (transaction.action === 'OUT') {
                balance -= parseFloat(transaction.quantity || 0);
            }
        });
        
        return balance;
    } catch (error) {
        Logger.log('Error calculating stock balance: ' + error.toString());
        return 0;
    }
}

/**
 * تطبيع معرف الصنف للمقارنة بين الشيت (رقم/نص) والواجهة (نص).
 */
function normalizePPEStockItemId_(id) {
    return String(id == null ? '' : id).trim();
}

/**
 * البحث عن فهرس الصنف في نتيجة readFromSheet بمطابقة آمنة لـ itemId.
 */
function findPPEStockIndexByItemId_(rows, itemId) {
    var want = normalizePPEStockItemId_(itemId);
    if (!want) return -1;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!row) continue;
        if (normalizePPEStockItemId_(row.itemId) === want) return i;
    }
    return -1;
}

/**
 * إضافة/تحديث صنف في المخزون
 */
function addOrUpdatePPEStockItem(stockData) {
    try {
        if (!stockData) {
            return { success: false, message: 'بيانات المخزون غير موجودة' };
        }
        
        const sheetName = 'PPE_Stock';
        const spreadsheetId = getSpreadsheetId();
        let data = readFromSheet(sheetName, spreadsheetId);
        
        // التحقق من وجود الصنف (مقارنة آمنة — تجنب اعتبار التعديل «إضافة» بسبب اختلاف نوع itemId)
        const itemIndex = findPPEStockIndexByItemId_(data, stockData.itemId);
        
        if (itemIndex === -1) {
            // إضافة جديد
            // ✅ التحقق من عدم تكرار كود الصنف
            if (stockData.itemCode) {
                const existingItem = data.find(item => 
                    item.itemCode && 
                    String(item.itemCode).trim().toLowerCase() === String(stockData.itemCode).trim().toLowerCase()
                );
                if (existingItem) {
                    return { 
                        success: false, 
                        message: 'كود الصنف موجود بالفعل. يرجى استخدام كود آخر.' 
                    };
                }
            }
            
            // ✅ التحقق من عدم تكرار اسم الصنف
            if (stockData.itemName) {
                const existingItemByName = data.find(item => 
                    item.itemName && 
                    String(item.itemName).trim().toLowerCase() === String(stockData.itemName).trim().toLowerCase()
                );
                if (existingItemByName) {
                    return { 
                        success: false, 
                        message: 'اسم الصنف موجود بالفعل. يرجى استخدام اسم آخر.' 
                    };
                }
            }
            
            if (!stockData.itemId) {
                stockData.itemId = generateSequentialId('PPS', sheetName);
            }
            if (!stockData.createdAt) {
                stockData.createdAt = new Date();
            }
            if (!stockData.updatedAt) {
                stockData.updatedAt = new Date();
            }
            if (!stockData.lastUpdate) {
                stockData.lastUpdate = new Date();
            }
            
            // حساب الرصيد التلقائي
            stockData.balance = calculateStockBalance(stockData.itemId);
            
            return appendToSheet(sheetName, stockData);
        } else {
            // تحديث موجود
            // ✅ التحقق من عدم تكرار كود الصنف عند التحديث (إذا تم تغييره)
            if (stockData.itemCode) {
                const existingItem = data.find((item, index) => 
                    index !== itemIndex && // استثناء الصنف الحالي
                    item.itemCode && 
                    String(item.itemCode).trim().toLowerCase() === String(stockData.itemCode).trim().toLowerCase()
                );
                if (existingItem) {
                    return { 
                        success: false, 
                        message: 'كود الصنف موجود بالفعل في صنف آخر. يرجى استخدام كود آخر.' 
                    };
                }
            }
            
            // ✅ التحقق من عدم تكرار اسم الصنف عند التحديث (إذا تم تغييره)
            if (stockData.itemName) {
                const existingItemByName = data.find((item, index) => 
                    index !== itemIndex && // استثناء الصنف الحالي
                    item.itemName && 
                    String(item.itemName).trim().toLowerCase() === String(stockData.itemName).trim().toLowerCase()
                );
                if (existingItemByName) {
                    return { 
                        success: false, 
                        message: 'اسم الصنف موجود بالفعل في صنف آخر. يرجى استخدام اسم آخر.' 
                    };
                }
            }
            
            stockData.updatedAt = new Date();
            stockData.lastUpdate = new Date();
            
            // حساب الرصيد التلقائي من الحركات
            stockData.balance = calculateStockBalance(stockData.itemId);
            
            // ✅ دمج التحديثات داخل السجل الحالي مع الإبقاء على الحقول غير الواردة
            const existing = data[itemIndex] || {};
            for (var key in stockData) {
                if (stockData.hasOwnProperty(key) && key !== 'itemId') {
                    existing[key] = stockData[key];
                }
            }
            existing.itemId = normalizePPEStockItemId_(stockData.itemId);
            
            try {
                var ssHdr = SpreadsheetApp.openById(spreadsheetId);
                var shHdr = ssHdr.getSheetByName(sheetName);
                if (shHdr) {
                    ensureSheetHeaders(shHdr, sheetName, existing);
                }
            } catch (hdrErr) {
                Logger.log('ensureSheetHeaders(PPE_Stock) قبل التحديث: ' + hdrErr.toString());
            }
            
            // ✅ تحديث صف واحد عبر الدالة المشتركة (دمج كامل الحقول ثم كتابة الصف)
            // لا نستخدم saveToSheet(مصفوفة كاملة) لأن upsert الافتراضي يعتمد عمود "id" وليس itemId.
            var updRes = updatePPEStockByItemId_(existing.itemId, existing, spreadsheetId);
            if (updRes && updRes.success) {
                return { success: true, message: 'تم تحديث الصنف بنجاح' };
            }
            return {
                success: false,
                message: (updRes && updRes.message) ? updRes.message : 'فشل تحديث الصنف في ورقة المخزون'
            };
        }
    } catch (error) {
        Logger.log('Error in addOrUpdatePPEStockItem: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة/تحديث المخزون: ' + error.toString() };
    }
}

/**
 * الحصول على جميع أصناف المخزون
 * ✅ محسّن: قراءة الحركات مرة واحدة فقط بدلاً من N مرة
 */
function getAllPPEStockItems(filters = {}) {
    try {
        const sheetName = 'PPE_Stock';
        const __tStart = Date.now();
        const __spreadsheetId = getSpreadsheetId();
        let data = readSheetRowsNoCache_(sheetName, __spreadsheetId);
        const __readMs = Date.now() - __tStart;

        // ✅ تحسين الأداء: لا نعيد حساب الأرصدة من جميع الحركات في كل طلب.
        // جدول PPE_Stock يتم تحديثه لحظياً عند إضافة/تعديل الحركات، لذا نكتفي
        // بتطبيع القيم الرقمية المخزنة مباشرة.
        const __normStart = Date.now();
        data = data.map(item => {
            const stockIn = parseFloat(item.stock_IN || 0) || 0;
            const stockOut = parseFloat(item.stock_OUT || 0) || 0;
            const balance = (item.balance !== undefined && item.balance !== null && item.balance !== '')
                ? (parseFloat(item.balance) || 0)
                : (stockIn - stockOut);

            item.stock_IN = stockIn;
            item.stock_OUT = stockOut;
            item.balance = balance;
            return item;
        });
        const __normalizeMs = Date.now() - __normStart;

        // تطبيق الفلاتر
        if (filters.category) {
            data = data.filter(item => item.category === filters.category);
        }
        if (filters.supplier) {
            data = data.filter(item => item.supplier === filters.supplier);
        }
        if (filters.lowStock) {
            data = data.filter(item => {
                const balance = parseFloat(item.balance || 0);
                const minThreshold = parseFloat(item.minThreshold || 0);
                return balance < minThreshold;
            });
        }
        
        // ترتيب حسب اسم الصنف
        data.sort((a, b) => {
            const nameA = (a.itemName || '').toLowerCase();
            const nameB = (b.itemName || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        Logger.log('[getAllPPEStockItems] timings ms: readSheet=' + __readMs + ', normalizePostRead=' + __normalizeMs +
            ', total=' + (Date.now() - __tStart) + ', rows=' + data.length);

        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all PPE stock items: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المخزون: ' + error.toString(), data: [] };
    }
}

/**
 * قراءة صفوف ورقة مباشرة بدون CacheService
 * تُستخدم للحالات التي تحتاج بيانات لحظية مثل شاشة مخزون PPE.
 */
function readSheetRowsNoCache_(sheetName, spreadsheetId) {
    try {
        const finalSpreadsheetId = spreadsheetId || getSpreadsheetId();
        if (!finalSpreadsheetId || !sheetName) return [];
        const ss = SpreadsheetApp.openById(finalSpreadsheetId);
        const sheet = ss.getSheetByName(sheetName);
        if (!sheet) return [];
        var lastRow = sheet.getLastRow();
        var lastCol = sheet.getLastColumn();
        if (lastRow <= 1 || lastCol === 0) return [];
        var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
        if (!values || values.length <= 1) return [];

        const headers = values[0].map(function (h) {
            return h === undefined || h === null ? '' : String(h).trim();
        });
        if (!headers.some(function (h) { return h; })) return [];

        const rows = values.slice(1);
        const out = [];
        rows.forEach(function (row) {
            const obj = {};
            let hasAny = false;
            headers.forEach(function (header, idx) {
                if (!header) return;
                const val = row[idx];
                if (val !== '' && val !== null && val !== undefined) hasAny = true;
                obj[header] = (val === null || val === undefined) ? '' : val;
            });
            if (hasAny) out.push(obj);
        });
        return out;
    } catch (error) {
        Logger.log('Error in readSheetRowsNoCache_(' + sheetName + '): ' + error.toString());
        return [];
    }
}

/**
 * الحصول على أصناف المخزون المنخفضة
 */
function getLowStockItems() {
    try {
        const result = getAllPPEStockItems({ lowStock: true });
        return result;
    } catch (error) {
        Logger.log('Error getting low stock items: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة المخزون المنخفض: ' + error.toString(), data: [] };
    }
}

/**
 * إضافة حركة جديدة (وارد/منصرف)
 */
function addPPETransaction(transactionData) {
    try {
        if (!transactionData) {
            return { success: false, message: 'بيانات الحركة غير موجودة' };
        }
        
        const sheetName = 'PPE_Transactions';
        
        // إضافة حقول تلقائية
        if (!transactionData.id) {
            transactionData.id = generateSequentialId('PPT', sheetName);
        }
        if (!transactionData.date) {
            transactionData.date = new Date();
        }
        if (!transactionData.createdAt) {
            transactionData.createdAt = new Date();
        }
        if (!transactionData.updatedAt) {
            transactionData.updatedAt = new Date();
        }
        
        // إضافة الحركة
        const result = appendToSheet(sheetName, transactionData);
        
        if (result.success) {
            // تحديث الصنف المستهدف فقط (itemId) لتجنب تكرار جميع صفوف المخزون.
            const spreadsheetId = getSpreadsheetId();
            const transactions = readFromSheet('PPE_Transactions', spreadsheetId);
            const itemTransactions = transactions.filter(t => t.itemId === transactionData.itemId);

            let stockIn = 0;
            let stockOut = 0;
            itemTransactions.forEach(t => {
                if (t.action === 'IN') {
                    stockIn += parseFloat(t.quantity || 0);
                } else if (t.action === 'OUT') {
                    stockOut += parseFloat(t.quantity || 0);
                }
            });

            const updateRes = updatePPEStockByItemId_(transactionData.itemId, {
                stock_IN: stockIn,
                stock_OUT: stockOut,
                balance: stockIn - stockOut,
                lastUpdate: new Date(),
                updatedAt: new Date()
            }, spreadsheetId);

            if (!updateRes || !updateRes.success) {
                Logger.log('addPPETransaction: failed to update PPE_Stock for itemId=' + transactionData.itemId + ' => ' + (updateRes && updateRes.message ? updateRes.message : 'unknown'));
            }
        }
        
        return result;
    } catch (error) {
        Logger.log('Error in addPPETransaction: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء إضافة الحركة: ' + error.toString() };
    }
}

/**
 * تحديث صف واحد في PPE_Stock عبر itemId (بدون إعادة حفظ كل البيانات).
 */
function updatePPEStockByItemId_(itemId, patch, spreadsheetId) {
    try {
        const targetItemId = String(itemId || '').trim();
        if (!targetItemId) {
            return { success: false, message: 'itemId غير صالح للتحديث' };
        }
        const ssId = spreadsheetId || getSpreadsheetId();
        const spreadsheet = SpreadsheetApp.openById(ssId);
        const sheet = spreadsheet.getSheetByName('PPE_Stock');
        if (!sheet) {
            return { success: false, message: 'ورقة PPE_Stock غير موجودة' };
        }

        const lastRow = sheet.getLastRow();
        const lastCol = sheet.getLastColumn();
        if (lastRow < 2 || lastCol < 1) {
            return { success: false, message: 'لا توجد بيانات في PPE_Stock' };
        }

        const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h || '').trim());
        const itemIdColIndex = headers.indexOf('itemId');
        if (itemIdColIndex === -1) {
            return { success: false, message: 'عمود itemId غير موجود في PPE_Stock' };
        }

        const idValues = sheet.getRange(2, itemIdColIndex + 1, lastRow, itemIdColIndex + 1).getValues();
        let targetRow = -1;
        for (let i = 0; i < idValues.length; i++) {
            if (String(idValues[i][0] || '').trim() === targetItemId) {
                targetRow = i + 2;
                break;
            }
        }
        if (targetRow === -1) {
            return { success: false, message: 'الصنف غير موجود في PPE_Stock: ' + targetItemId };
        }

        const currentRow = sheet.getRange(targetRow, 1, 1, lastCol).getValues()[0];
        Object.keys(patch || {}).forEach((key) => {
            const col = headers.indexOf(key);
            if (col !== -1) {
                currentRow[col] = patch[key];
            }
        });
        sheet.getRange(targetRow, 1, 1, lastCol).setValues([currentRow]);
        SpreadsheetApp.flush();

        if (typeof invalidateHseSheetCaches_ === 'function') {
            invalidateHseSheetCaches_('PPE_Stock');
        }
        return { success: true };
    } catch (error) {
        Logger.log('updatePPEStockByItemId_: ' + error.toString());
        return { success: false, message: error.toString() };
    }
}

/**
 * حذف صنف من المخزون
 */
function deletePPEStockItem(itemId) {
    try {
        if (!itemId) {
            return { success: false, message: 'معرف الصنف غير محدد' };
        }
        
        const sheetName = 'PPE_Stock';
        const spreadsheetId = getSpreadsheetId();
        
        // التحقق من وجود الصنف قبل الحذف
        const data = readFromSheet(sheetName, spreadsheetId);
        const stockItem = data.find(item => item.itemId === itemId);
        
        if (!stockItem) {
            return { success: false, message: 'الصنف غير موجود' };
        }
        
        // ✅ التحقق من وجود حركات مرتبطة بالصنف
        const transactions = readFromSheet('PPE_Transactions', spreadsheetId);
        const itemTransactions = transactions.filter(t => t.itemId === itemId);
        
        if (itemTransactions.length > 0) {
            return { 
                success: false, 
                message: 'لا يمكن حذف الصنف لأنه يحتوي على ' + itemTransactions.length + ' حركة مسجلة. يرجى حذف الحركات أولاً أو إلغاء تفعيل الصنف بدلاً من حذفه.' 
            };
        }
        
        // ✅ حذف الصنف باستخدام deleteRowByField (لأن PPE_Stock يستخدم itemId وليس id)
        const deleteResult = deleteRowByField(sheetName, 'itemId', itemId, spreadsheetId);
        
        if (!deleteResult.success) {
            return deleteResult;
        }
        
        return { success: true, message: 'تم حذف الصنف بنجاح' };
    } catch (error) {
        Logger.log('Error in deletePPEStockItem: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء حذف الصنف: ' + error.toString() };
    }
}

/**
 * الحصول على جميع الحركات
 */
function getAllPPETransactions(filters = {}) {
    try {
        const sheetName = 'PPE_Transactions';
        let data = readFromSheet(sheetName, getSpreadsheetId());
        
        // تطبيق الفلاتر
        if (filters.itemId) {
            data = data.filter(t => t.itemId === filters.itemId);
        }
        if (filters.action) {
            data = data.filter(t => t.action === filters.action);
        }
        if (filters.startDate) {
            data = data.filter(t => {
                if (!t.date) return false;
                return new Date(t.date) >= new Date(filters.startDate);
            });
        }
        if (filters.endDate) {
            data = data.filter(t => {
                if (!t.date) return false;
                return new Date(t.date) <= new Date(filters.endDate);
            });
        }
        
        // ترتيب حسب التاريخ
        data.sort((a, b) => {
            const dateA = new Date(a.date || a.createdAt || 0);
            const dateB = new Date(b.date || b.createdAt || 0);
            return dateB - dateA;
        });
        
        return { success: true, data: data, count: data.length };
    } catch (error) {
        Logger.log('Error getting all PPE transactions: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة الحركات: ' + error.toString(), data: [] };
    }
}

/**
 * الحصول على قائمة أصناف مهمات الوقاية للمنسدلة
 */
function getPPEItemsList() {
    try {
        // ✅ نسخة سريعة: لا نحسب أرصدة المخزون ولا نقرأ جميع الحركات
        // نقرأ أسماء الأصناف مباشرة من PPE_Stock + الأنواع التاريخية من PPE
        const stockSheet = 'PPE_Stock';
        const ppeSheet = 'PPE';
        const stockData = readFromSheet(stockSheet, getSpreadsheetId()) || [];
        let ppeData = [];
        try {
            ppeData = readFromSheet(ppeSheet, getSpreadsheetId()) || [];
        } catch (error) {
            Logger.log('Note: Could not read PPE sheet for items list: ' + error.toString());
        }

        const items = [];
        const seenNames = {};

        stockData.forEach(item => {
            const itemName = String(item.itemName || '').trim();
            if (!itemName || seenNames[itemName]) return;
            seenNames[itemName] = true;
            items.push({
                itemId: item.itemId || null,
                itemCode: item.itemCode || '',
                itemName: itemName,
                category: item.category || ''
            });
        });

        ppeData.forEach(item => {
            const type = String(item.equipmentType || '').trim();
            if (!type || seenNames[type]) return;
            seenNames[type] = true;
            items.push({
                itemId: null,
                itemCode: '',
                itemName: type,
                category: ''
            });
        });

        // ترتيب سريع بالاسم
        items.sort((a, b) => String(a.itemName || '').localeCompare(String(b.itemName || ''), 'ar'));
        return { success: true, data: items };
    } catch (error) {
        Logger.log('Error getting PPE items list: ' + error.toString());
        return { success: false, message: 'حدث خطأ أثناء قراءة قائمة الأصناف: ' + error.toString(), data: [] };
    }
}

