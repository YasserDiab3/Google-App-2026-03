-- =============================================================================
-- مخزون مهمات الوقاية (PPE Stock) — اسم الجدول الصحيح: ppe_stock_items
-- =============================================================================
-- الخطأ "Could not find the table 'public.p_p_e_stock_items'" يحدث عندما يحوّل
-- الاسم من camelCase خطأ (مثل PPEStockItems → p_p_e_stock_items).
-- الحل الصحيح: استخدام الجدول ppe_stock_items في دالة Edge hse-api، أو إنشاء
-- الجدول أدناه ثم تعديل الكود ليشير إلى public.ppe_stock_items.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.ppe_stock_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id text NOT NULL,
    item_code text,
    item_name text,
    category text,
    min_threshold numeric DEFAULT 0,
    supplier text,
    stock_in numeric DEFAULT 0,
    stock_out numeric DEFAULT 0,
    balance numeric DEFAULT 0,
    last_update timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT ppe_stock_items_item_id_key UNIQUE (item_id)
);

CREATE INDEX IF NOT EXISTS idx_ppe_stock_items_item_code
    ON public.ppe_stock_items (lower(trim(item_code)));

CREATE INDEX IF NOT EXISTS idx_ppe_stock_items_item_name
    ON public.ppe_stock_items (lower(trim(item_name)));

COMMENT ON TABLE public.ppe_stock_items IS 'مخزون مهمات الوقاية — يتطابق مع إجراءات addOrUpdatePPEStockItem في الواجهة';

-- اختياري: إن كان لزاماً الإبقاء على مرجع قديم في كود لم يُحدَّث بعد، يمكن
-- إنشاء VIEW للقراءة فقط (لا يُنصح للكتابة عبر PostgREST):
-- CREATE OR REPLACE VIEW public.p_p_e_stock_items AS SELECT * FROM public.ppe_stock_items;
