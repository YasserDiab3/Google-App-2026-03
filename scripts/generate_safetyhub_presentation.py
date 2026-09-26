import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette Definitions
    NAVY_DARK = RGBColor(10, 37, 64)       # #0A2540 - Main Brand / Header
    NAVY_MID = RGBColor(24, 53, 88)        # #183558 - Deep Accent
    ROYAL_BLUE = RGBColor(30, 136, 229)    # #1E88E5 - Primary Accent
    LIGHT_BLUE = RGBColor(235, 244, 255)   # #EBF4FF - Soft Card Background
    SKY_BLUE = RGBColor(2, 132, 199)       # #0284C7 - Bright Blue
    EMERALD = RGBColor(16, 149, 116)       # #109574 - Success / Green
    EMERALD_BG = RGBColor(236, 253, 245)   # #ECFDF5 - Emerald soft bg
    AMBER = RGBColor(217, 119, 6)          # #D97706 - Warning / Amber
    AMBER_BG = RGBColor(254, 243, 199)     # #FEF3C7 - Amber soft bg
    CRIMSON = RGBColor(220, 38, 38)        # #DC2626 - Danger / Red
    CRIMSON_BG = RGBColor(254, 242, 242)   # #FEF2F2 - Red soft bg
    PURPLE = RGBColor(124, 58, 237)        # #7C3AED - AI / Innovation
    PURPLE_BG = RGBColor(245, 243, 255)    # #F5F3FF - Purple soft bg
    SLATE_DARK = RGBColor(15, 23, 42)      # #0F172A - Main Text
    SLATE_MUTED = RGBColor(100, 116, 139)  # #64748B - Muted Text
    CARD_BG = RGBColor(255, 255, 255)      # Pure White
    PAGE_BG = RGBColor(248, 250, 252)      # #F8FAFC - Very light slate
    BORDER_COLOR = RGBColor(226, 232, 240) # #E2E8F0 - Clean border

    LOGO_PATH = r"D:\Apps\1.9.2026\ICAPP.V.7.09-2026\Frontend\icons\icapp-logo.png"
    has_logo = os.path.exists(LOGO_PATH)

    def add_page_decorations(slide, category_text, title_text, subtitle_text, slide_num, total_slides=26):
        # 1. Background fill
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = PAGE_BG
        bg.line.fill.background()

        # 2. Top Header Bar
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.15))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = NAVY_DARK
        top_bar.line.fill.background()

        # Decorative subtle accent line under top bar
        accent_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.15), Inches(13.333), Inches(0.04))
        accent_line.fill.solid()
        accent_line.fill.fore_color.rgb = ROYAL_BLUE
        accent_line.line.fill.background()

        # Category Pill Badge (on the right side of header)
        cat_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(10.0), Inches(0.18), Inches(2.9), Inches(0.32))
        cat_box.fill.solid()
        cat_box.fill.fore_color.rgb = NAVY_MID
        cat_box.line.color.rgb = ROYAL_BLUE
        cat_box.line.width = Pt(1)
        tf_c = cat_box.text_frame
        tf_c.word_wrap = True
        p_c = tf_c.paragraphs[0]
        p_c.text = category_text
        p_c.alignment = PP_ALIGN.CENTER
        p_c.font.size = Pt(11)
        p_c.font.bold = True
        p_c.font.color.rgb = RGBColor(186, 230, 253)
        p_c.font.name = "Segoe UI"

        # Slide Main Title
        title_box = slide.shapes.add_textbox(Inches(3.2), Inches(0.15), Inches(6.6), Inches(0.55))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.font.size = Pt(20)
        p_t.font.bold = True
        p_t.font.color.rgb = RGBColor(255, 255, 255)
        p_t.font.name = "Segoe UI"

        # Slide Subtitle
        sub_box = slide.shapes.add_textbox(Inches(3.2), Inches(0.65), Inches(6.6), Inches(0.42))
        tf_s = sub_box.text_frame
        tf_s.word_wrap = True
        p_s = tf_s.paragraphs[0]
        p_s.text = subtitle_text
        p_s.alignment = PP_ALIGN.RIGHT
        p_s.font.size = Pt(11)
        p_s.font.color.rgb = RGBColor(203, 213, 225)
        p_s.font.name = "Segoe UI"

        # Logo on top left if available
        if has_logo:
            try:
                slide.shapes.add_picture(LOGO_PATH, Inches(0.5), Inches(0.16), height=Inches(0.82))
            except Exception:
                pass

        # 3. Footer Bar
        footer_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.05), Inches(13.333), Inches(0.02))
        footer_line.fill.solid()
        footer_line.fill.fore_color.rgb = BORDER_COLOR
        footer_line.line.fill.background()

        footer_box = slide.shapes.add_textbox(Inches(0.6), Inches(7.08), Inches(12.133), Inches(0.35))
        tf_f = footer_box.text_frame
        p_f = tf_f.paragraphs[0]
        p_f.text = f"SafetyHub | ICAPP  •  نظام إدارة السلامة والصحة المهنية والبيئة  •  شريحة {slide_num} من {total_slides}"
        p_f.alignment = PP_ALIGN.CENTER
        p_f.font.size = Pt(9.5)
        p_f.font.color.rgb = SLATE_MUTED
        p_f.font.name = "Segoe UI"

    def add_card(slide, left, top, width, height, title, items, badge_text="", accent_color=ROYAL_BLUE, bg_soft=CARD_BG):
        # Card container
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_soft
        card.line.color.rgb = BORDER_COLOR
        card.line.width = Pt(1)

        # Top colored accent banner for the card
        banner_height = Inches(0.48)
        banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, banner_height)
        banner.fill.solid()
        banner.fill.fore_color.rgb = accent_color
        banner.line.fill.background()

        # Banner Title
        title_box = slide.shapes.add_textbox(left + Inches(0.15), top + Inches(0.04), width - Inches(0.3), Inches(0.4))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title
        p_t.alignment = PP_ALIGN.RIGHT
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = RGBColor(255, 255, 255)
        p_t.font.name = "Segoe UI"

        # Content text frame
        content_top = top + banner_height + Inches(0.08)
        content_height = height - banner_height - (Inches(0.45) if badge_text else Inches(0.15))
        body_box = slide.shapes.add_textbox(left + Inches(0.15), content_top, width - Inches(0.3), content_height)
        tf_b = body_box.text_frame
        tf_b.word_wrap = True
        tf_b.margin_left = tf_b.margin_right = tf_b.margin_top = tf_b.margin_bottom = 0

        for i, item in enumerate(items):
            p = tf_b.paragraphs[0] if i == 0 else tf_b.add_paragraph()
            p.text = f"• {item}"
            p.alignment = PP_ALIGN.RIGHT
            p.font.size = Pt(10.5)
            p.font.name = "Segoe UI"
            p.font.color.rgb = SLATE_DARK
            p.space_after = Pt(4)

        # Bottom badge if provided
        if badge_text:
            badge_y = top + height - Inches(0.42)
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.2), badge_y, width - Inches(0.4), Inches(0.32))
            badge.fill.solid()
            badge.fill.fore_color.rgb = LIGHT_BLUE
            badge.line.color.rgb = ROYAL_BLUE
            badge.line.width = Pt(0.75)
            tf_bg = badge.text_frame
            tf_bg.word_wrap = True
            p_bg = tf_bg.paragraphs[0]
            p_bg.text = badge_text
            p_bg.alignment = PP_ALIGN.CENTER
            p_bg.font.size = Pt(9.5)
            p_bg.font.bold = True
            p_bg.font.color.rgb = NAVY_DARK
            p_bg.font.name = "Segoe UI"

    # =========================================================================
    # SLIDE 1: Title Slide (غلاف العرض التقديمي)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    # Dark Navy Background
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = NAVY_DARK
    bg1.line.fill.background()

    # Decorative geometric patterns
    acc1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3))
    acc1.fill.background()
    acc1.line.color.rgb = ROYAL_BLUE
    acc1.line.width = Pt(1.5)

    if has_logo:
        try:
            slide1.shapes.add_picture(LOGO_PATH, Inches(5.66), Inches(1.1), height=Inches(1.2))
        except Exception:
            pass

    # Main Title
    t_box = slide1.shapes.add_textbox(Inches(1.0), Inches(2.45), Inches(11.333), Inches(1.1))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "SafetyHub | ICAPP"
    p1.alignment = PP_ALIGN.CENTER
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(255, 255, 255)
    p1.font.name = "Segoe UI"

    # Subtitle 1
    s_box = slide1.shapes.add_textbox(Inches(1.0), Inches(3.55), Inches(11.333), Inches(0.6))
    tf_s = s_box.text_frame
    tf_s.word_wrap = True
    ps1 = tf_s.paragraphs[0]
    ps1.text = "المنظومة الرقمية الشاملة لإدارة السلامة والصحة المهنية والبيئة (HSE)"
    ps1.alignment = PP_ALIGN.CENTER
    ps1.font.size = Pt(21)
    ps1.font.bold = True
    ps1.font.color.rgb = RGBColor(125, 211, 252) # Light sky blue
    ps1.font.name = "Segoe UI"

    # Subtitle 2
    s_box2 = slide1.shapes.add_textbox(Inches(1.0), Inches(4.25), Inches(11.333), Inches(0.5))
    tf_s2 = s_box2.text_frame
    tf_s2.word_wrap = True
    ps2 = tf_s2.paragraphs[0]
    ps2.text = "الشركة العالمية للإنتاج والتصنيع الزراعي (ICAPP) • الإصدار المتطور 2026"
    ps2.alignment = PP_ALIGN.CENTER
    ps2.font.size = Pt(15)
    ps2.font.color.rgb = RGBColor(226, 232, 240)
    ps2.font.name = "Segoe UI"

    # Feature badges at the bottom of Title
    badge_titles = [
        "🛡️ صفر حوادث ووقاية استباقية",
        "⚡ عمل كامل بدون إنترنت (Offline)",
        "📋 25+ موديول ميداني وإداري",
        "🤖 مدعوم بالذكاء الاصطناعي Gemini"
    ]
    bw = Inches(2.7)
    b_gap = Inches(0.25)
    start_bx = Inches(1.0)
    for i, b_text in enumerate(badge_titles):
        bx = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, start_bx + i * (bw + b_gap), Inches(5.1), bw, Inches(0.55))
        bx.fill.solid()
        bx.fill.fore_color.rgb = NAVY_MID
        bx.line.color.rgb = ROYAL_BLUE
        bx.line.width = Pt(1)
        tf_bx = bx.text_frame
        tf_bx.word_wrap = True
        p_bx = tf_bx.paragraphs[0]
        p_bx.text = b_text
        p_bx.alignment = PP_ALIGN.CENTER
        p_bx.font.size = Pt(11)
        p_bx.font.bold = True
        p_bx.font.color.rgb = RGBColor(255, 255, 255)
        p_bx.font.name = "Segoe UI"

    # Title footer
    f_box = slide1.shapes.add_textbox(Inches(1.0), Inches(6.0), Inches(11.333), Inches(0.5))
    tf_f1 = f_box.text_frame
    p_f1 = tf_f1.paragraphs[0]
    p_f1.text = "إعداد وتطوير: فريق السلامة والصحة المهنية بالتعاون مع نظم المعلومات • All Rights Reserved © 2026"
    p_f1.alignment = PP_ALIGN.CENTER
    p_f1.font.size = Pt(11)
    p_f1.font.color.rgb = RGBColor(148, 163, 184)
    p_f1.font.name = "Segoe UI"

    # =========================================================================
    # SLIDE 2: الرؤية الاستراتيجية وأهداف النظام (Strategic Vision)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide2, "الرؤية والرسالة", "الرؤية الاستراتيجية وأهداف المنظومة الرقمية", "نحو تحول رقمي متكامل وثقافة وقائية مستدامة لحماية الأرواح والمنشآت", 2)

    add_card(slide2, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. ثقافة صفر حوادث (Zero Harm)", [
                 "التحول من رد الفعل بعد وقوع الحادث إلى الوقاية الاستباقية.",
                 "إشراك كافة المستويات الوظيفية من العامل وحتى الإدارة العليا.",
                 "تمكين المشرفين من رصد وتقييم المخاطر بشكل لحظي.",
                 "تعزيز ثقافة الإبلاغ الطوعي عن الحوادث الوشيكة دون خوف.",
                 "بناء سجل تراكمي يحمي سمعة المنشأة ويرسخ معايير السلامة."
             ], "الهدف: القضاء التام على الإصابات المقعدة", EMERALD, EMERALD_BG)

    add_card(slide2, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. التحول الرقمي الكامل (100% Paperless)", [
                 "التخلص الكامل من النماذج الورقية المعرضة للتلف والضياع.",
                 "إصدار وتوقيع تصاريح العمل إلكترونياً (e-PTW) بلحظات.",
                 "أرشفة مركزية سحابية لجميع السجلات الطبية والتفتيشية.",
                 "تتبع فوري ومؤتمت لكافة الإجراءات التصحيحية والوقائية.",
                 "تقليص الوقت الإداري بنسبة 85% وتوجيهه للعمل الميداني."
             ], "الميزة: سرعة فائقة ودقة بيانات بنسبة 100%", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide2, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الامتثال والحوكمة الرقابية", [
                 "الامتثال الصارم لمواصفات ISO 45001 و 14001 و 22000.",
                 "التوافق التام مع قانون العمل المصري والبيئة والدفاع المدني.",
                 "سجل تدقيق إلكتروني (Audit Trail) غير قابل للتلاعب.",
                 "جاهزية دائمة لزيارات التفتيش الداخلي والخارجي بنقرة زر.",
                 "تقارير تنفيذية دورية مدعومة بمؤشرات الأداء القياسية."
             ], "النتيجة: جاهزية تامة للاعتماد والمراجعات", AMBER, AMBER_BG)

    # =========================================================================
    # SLIDE 3: البنية المعمارية والتقنية (Architecture)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide3, "البنية التقنية", "البنية المعمارية للمنظومة والعمل دون إنترنت", "هيكلية سحابية هجينة تضمن استمرارية العمل الميداني بأعلى موثوقية وأمان", 3)

    add_card(slide3, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. واجهة المستخدم (Progressive Web App)", [
                 "واجهة عصرية تفاعلية مستجيبة (Responsive UI).",
                 "تعمل على جميع الأجهزة (هواتف، أجهزة لوحية، وحواسيب).",
                 "دعم كامل لتعدد اللغات (عربي / إنجليزي) واتجاه RTL.",
                 "دعم الوضع الليلي (Dark Mode) لراحة العين في المناوبات.",
                 "سهولة الاستخدام وسرعة استجابة لا تتعدى أجزاء من الثانية."
             ], "التقنية: Modern HTML5 / CSS3 / Vanilla JS", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide3, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. محرك العمل بلا اتصال (Offline-First)", [
                 "إمكانية إدخال كافة النماذج الميدانية في حال انقطاع الشبكة.",
                 "تخزين مشفر محلي بالمتصفح (IndexedDB & LocalStorage).",
                 "مزامنة ذكية تلقائية (Realtime Sync) فور عودة الاتصال.",
                 "آلية حل التعارض المتقدمة (Conflict Resolution).",
                 "عدم فقدان أي تقرير أو تصريح أو ملاحظة مسجلة ميدانياً."
             ], "الميزة الأهم: استمرارية العمل في المخازن والحقول", EMERALD, EMERALD_BG)

    add_card(slide3, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. البنية السحابية والذكاء الاصطناعي", [
                 "خوادم آمنة تعتمد على بيئة Google Apps Script Enterprise.",
                 "قواعد بيانات منظمة وسريعة على Google Sheets & SQL.",
                 "تكامل مباشر مع Google Gemini AI للتحليل والاستشارات.",
                 "تشفير البيانات أثناء النقل (TLS 1.3) وأثناء التخزين.",
                 "نسخ احتياطي آلي دوري واسترجاع فوري للكوارث."
             ], "الأمان: حماية سيبرانية وتشفير عالي المستوى", PURPLE, PURPLE_BG)

    # =========================================================================
    # SLIDE 4: تسجيل الدخول والأمان والمصادقة (Authentication & Access)
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide4, "الأمان والمصادقة", "بوابة تسجيل الدخول وإدارة الصلاحيات (RBAC)", "حماية مشددة لبيانات المنشأة مع سهولة الوصول للكوادر المصرح لها", 4)

    add_card(slide4, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. المصادقة الآمنة والمشفرة", [
                 "تسجيل الدخول بالبريد الإلكتروني المعتمد وكلمة المرور.",
                 "تشفير كلمات المرور باستخدام خوارزميات التشفير (SHA-256).",
                 "حماية ضد هجمات التخمين وحظر محاولات الدخول العشوائية.",
                 "تسجيل كامل لمحاولات الدخول الناجحة والفاشلة بالساعة والتاريخ.",
                 "إمكانية الدخول السريع برمز PIN للمستخدمين الميدانيين."
             ], "الحماية: تشفير تام وعدم تخزين كلمات المرور كنص", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide4, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. المصادقة الثنائية (2FA / MFA)", [
                 "دعم المصادقة الثنائية لجميع حسابات الإدارة والمشرفين.",
                 "توليد رموز مؤقتة (TOTP) عبر تطبيقات Google Authenticator.",
                 "منع الوصول غير المصرح به حتى في حال تسرب كلمة المرور.",
                 "إشعارات فورية عبر البريد عند رصد تسجيل دخول من جهاز جديد.",
                 "التحقق الإلزامي للمديرين وحسابات الاعتماد المالي وتصاريح العمل."
             ], "المعيار: Two-Factor Authentication معتمد", EMERALD, EMERALD_BG)

    add_card(slide4, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. التحكم بالوصول المبني على الأدوار (RBAC)", [
                 "أدوار محددة: مدير نظام، مسؤول سلامة، طبيب، مقاول، حارس بوابة.",
                 "صلاحيات تفصيلية (عرض، إضافة، تعديل، اعتماد، حذف).",
                 "عزل بيانات الأقسام الحساسة (مثل السجلات الطبية للموظفين).",
                 "إدارة انتهاء الجلسات الآلي عند عدم النشاط لضمان الأمان.",
                 "إمكانية تجميد الحسابات فور انتهاء العلاقة التعاقدية للموظف."
             ], "الحوكمة: صلاحيات دقيقة لكل مستخدم حسب دوره", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 5: لوحة التحكم التنفيذية (Executive Dashboard)
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide5, "لوحة القيادة", "لوحة التحكم التنفيذية والمؤشرات اللحظية (KPIs)", "رؤية شاملة ومباشرة لكافة مؤشرات السلامة بالمنشأة تدعم اتخاذ القرارات السليمة", 5)

    add_card(slide5, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. بطاقات الإحصاء اللحظية (Live KPIs)", [
                 "إجمالي ساعات العمل الآمنة بدون إصابات وقت ضائع (LTI).",
                 "عدد تصاريح العمل النشطة والمغلقة والمعلقة حالياً.",
                 "الحوادث وشبه الحوادث المسجلة خلال الشهر ومقارنتها بالعام السابق.",
                 "نسبة إغلاق الإجراءات التصحيحية والوقائية في موعدها (CAPA).",
                 "معدل تردد الإصابات (LTIFR) ومعدل شدة الإصابات (Severity Rate)."
             ], "المؤشرات: تحديث لحظي على مدار 24 ساعة", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide5, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. الرسوم البيانية التفاعلية", [
                 "مخططات اتجاهات الحوادث وتوزيعها الزمني والجغرافي بالموقع.",
                 "تحليل أكثر الأقسام تسجيلاً للملاحظات والسلوكيات غير الآمنة.",
                 "مخطط دائري لتوزيع تصاريح العمل حسب نوع النشاط والخطورة.",
                 "رسم بياني لزيارات العيادة الطبية ومعدلات الأمراض الموسمية.",
                 "تصدير التقارير والرسوم البيانية إلى PDF و Excel بضغطة زر."
             ], "التحليل: رسوم تفاعلية تكشف مواطن الخلل مبكراً", AMBER, AMBER_BG)

    add_card(slide5, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. شريط التنبيهات والإجراءات السريعة", [
                 "تنبيهات فورية عند تسجيل حادث جسيم أو تصريح عمل ساخن.",
                 "إشعارات قرب انتهاء صلاحية طفايات الحريق أو رخص المقاولين.",
                 "قائمة المهام اليومية المطلوبة من مسؤول السلامة بالمناوبة.",
                 "أزرار وصول سريع لفتح تصريح، تسجيل ملاحظة، أو طلب طوارئ.",
                 "لوحة الرسائل والإعلانات التوعوية الموجهة لفرق العمل."
             ], "الكفاءة: الوصول لأي وظيفة رئيسية خلال نقرة واحدة", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 6: المستخدمون، المهام، وقاعدة الموظفين (Users, Tasks & Employees)
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide6, "الهوية والكوادر", "إدارة المستخدمين، المهام، وسجل الموظفين الرقمي", "إدارة مركزية للكوادر البشرية ومتابعة دقيقة للمهام والمسؤوليات اليومية", 6)

    add_card(slide6, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. قاعدة بيانات الموظفين الرقمية", [
                 "سجل رقمي متكامل لكل عامل وموظف داخل المنشأة.",
                 "البيانات الأساسية: الاسم، الرقم القومي، القسم، المسمى الوظيفي.",
                 "سجل استلام مهمات الوقاية الشخصية وتاريخ الصرف والتجديد.",
                 "السجل التدريبي وشهادات التأهيل وتاريخ الفحوصات الطبية.",
                 "تتبع حالة اللياقة الصحية وموانع العمل في الأماكن المرتفعة."
             ], "التكامل: ربط مباشر مع العيادة ومهمات الوقاية", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide6, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. نظام إدارة مهام المستخدمين (Tasks)", [
                 "إسناد مهام السلامة المحددة لمسؤولي الأقسام والمشرفين.",
                 "تحديد تاريخ الاستحقاق ومستوى الأولوية (عادي، هام، طارئ).",
                 "إشعارات تلقائية عند تعيين مهمة جديدة أو اقتراب موعدها.",
                 "إمكانية إرفاق صور ومستندات تثبت إتمام المهمة بنجاح.",
                 "تقييم معدل التزام كل موظف بإنجاز مهام السلامة المسندة إليه."
             ], "المتابعة: إغلاق المهام الميدانية بدون تسويف", EMERALD, EMERALD_BG)

    add_card(slide6, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الملف الشخصي والتخصيص", [
                 "صفحة شخصية تتيح للمستخدم استعراض صلاحياته ومهامه.",
                 "تغيير كلمة المرور وتفعيل ميزة التحقق الثنائي بسهولة.",
                 "تخصيص لغة الواجهة ومظهر التطبيق حسب تفضيل المستخدم.",
                 "سجل النشاط الشخصي وتاريخ العمليات التي قام بها في النظام.",
                 "إمكانية التواصل المباشر مع فريق الدعم الفني ومدير النظام."
             ], "المرونة: تجربة استخدام شخصية تلبي متطلبات كل موظف", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 7: نظام تصاريح العمل الإلكترونية (e-PTW)
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide7, "العمليات الحرجة", "منظومة تصاريح العمل الإلكترونية (e-PTW)", "السيطرة الكاملة على الأعمال عالية الخطورة بمسار اعتماد رقمي صارم", 7)

    add_card(slide7, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. أنواع التصاريح المشمولة بالمنظومة", [
                 "تصريح العمل الساخن (Hot Work): لحام، قطع، وتوليد الشرر.",
                 "تصريح الأماكن المغلقة (Confined Space): خزانات، صوامع، بيارات.",
                 "تصريح العمل على ارتفاعات (Working at Height): سقالات، سلالم.",
                 "تصريح العزل الكهربائي والميكانيكي (LOTO System).",
                 "تصاريح الحفر، الرفع الثقيل، والأعمال الكيميائية الخاصة."
             ], "التغطية: حماية شاملة لجميع الأنشطة الخطرة", CRIMSON, CRIMSON_BG)

    add_card(slide7, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. متطلبات واشتراطات السلامة المسبقة", [
                 "فحص قياسات الغازات ونسبة الأكسجين بالأجهزة المعايرة.",
                 "التأكد من توفير طفايات الحريق وخراطيم المياه ومراقب الحريق.",
                 "التحقق من سلامة السقالات وربط أحزمة الأمان ثلاثية النقاط.",
                 "إرفاق تقييم المخاطر (JHA) الخاص بالنشاط المحدد.",
                 "فحص جاهزية طاقم العمل وتأهيلهم الطبي والتدريبي للمهمة."
             ], "الاشتراطات: لا تصريح بدون تطبيق كامل معايير الأمان", AMBER, AMBER_BG)

    add_card(slide7, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. دورة الاعتماد والإغلاق الرقمي", [
                 "مسار اعتماد ثلاثي: طالب التصريح -> المصدر الميداني -> معتمد السلامة.",
                 "توقيعات إلكترونية مسجلة بالتوقيت وموثقة بـ QR Code للتفتيش.",
                 "تحديد فترة الصلاحية بدقة وإمكانية التمديد لمرة واحدة بشروط.",
                 "الإغلاق النظامي بعد تنظيف الموقع والتأكد من خلوه من المخاطر.",
                 "أرشفة دائمة للتصاريح للرجوع إليها في أي مراجعات أو تحقيقات."
             ], "الحوكمة: دورة اعتماد رقمية تمنع العمل غير المرخص", ROYAL_BLUE, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 8: المصرح لهم بالتوقيع (Issuing Authorities)
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide8, "حوكمة التوقيع", "إدارة المصرح لهم بالتوقيع والاعتمادات الميدانية", "ضبط المسؤوليات وتأهيل الكوادر المخولة بإصدار تصاريح العمل", 8)

    add_card(slide8, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. معايير التأهيل والترخيص", [
                 "تسجيل واختيار المشرفين المؤهلين لإصدار تصاريح العمل.",
                 "اشتراط اجتياز الدورات التدريبية المتقدمة لسلامة العمليات.",
                 "التحقق من معرفتهم بمخاطر الموقع المحدد وإجراءات الطوارئ.",
                 "إصدار رخصة داخلية للموقع بصلاحية زمنية محددة.",
                 "إعادة تقييم سنوي لكفاءة الموقعين لضمان الالتزام المستمر."
             ], "التأهيل: لا توقيع إلا بعد التدريب والاعتماد الرسمي", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide8, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. مصفوفة الصلاحيات الموقعية", [
                 "تحديد نطاق مسؤولية كل موقع جغرافياً (مصنع، خط إنتاج، مخزن).",
                 "تحديد أنواع التصاريح المسموح لكل شخص توقيعها وإصدارها.",
                 "منع التوقيع خارج النطاق الجغرافي أو التخصصي المعتمد.",
                 "إمكانية تفويض الصلاحيات مؤقتاً أثناء الإجازات بموافقة رسمية.",
                 "سجل تدقيق كامل (Audit Trail) يوضح كل تصريح ومن قام باعتماده."
             ], "الدقة: حصر الصلاحيات حسب الموقع ونوع النشاط", NAVY_MID, LIGHT_BLUE)

    add_card(slide8, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الرقابة ومنع تضارب المصالح", [
                 "فصل حاسم بين منفذ العمل (Receiver) ومصدر التصريح (Issuer).",
                 "اشتراط موافقة أخصائي السلامة (HSE Approver) للأعمال الحرجة.",
                 "إلغاء فوري لصلاحية التوقيع في حال ارتكاب مخالفة جسيمة.",
                 "متابعة دورية لإحصائيات التصاريح الموقعة من كل مسؤول.",
                 "تقارير تقييم جودة اشتراطات الأمان المطبقة في كل تصريح."
             ], "النزاهة: منع الازدواجية وتطبيق أقصى معايير الرقابة", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 9: إدارة الحوادث والتحقيقات العميقة (Incidents & RCA)
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide9, "الحوادث والتحقيقات", "إدارة الحوادث وتحليل الأسباب الجذرية (RCA)", "منظومة تحقيق منهجية تمنع تكرار الحوادث وتؤسس لإجراءات تصحيحية دائمة", 9)

    add_card(slide9, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. الإبلاغ الفوري وتوثيق الحوادث", [
                 "إبلاغ لحظي فور وقوع الحادث مع تحديد الموقع الجغرافي الدقيق.",
                 "تصنيف الحادث: إصابة عمل، حادث مروري، حريق، تلف ممتلكات.",
                 "توثيق الأدلة الميدانية بالصور، الفيديو، وشهادات الشهود.",
                 "تحديد درجة الخطورة وتصنيف الإصابة (إسعافات أولية، LTI، إلخ).",
                 "إشعار فوري لمديري الإدارات العليا وفريق السلامة تلقائياً."
             ], "الاستجابة: سرعة إخطار وتوثيق رقمي للأدلة الميدانية", CRIMSON, CRIMSON_BG)

    add_card(slide9, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. أدوات التحليل الجذري المدمجة (RCA)", [
                 "تطبيق منهجية 'لماذا الخمسة' (5 Whys) للوصول للسبب الأساسي.",
                 "مخطط عظمة السمكة (Ishikawa Fishbone) لتحليل 6M.",
                 "تحليل العوامل: الإنسان، المعدة، المادة، الطريقة، البيئة، والإدارة.",
                 "التمييز الدقيق بين الأسباب المباشرة والأسباب الجذرية العميقة.",
                 "تقييم الفشل في حواجز الحماية (Barrier Analysis)."
             ], "المنهجية: أحدث أدوات التحليل المعتمدة عالمياً", AMBER, AMBER_BG)

    add_card(slide9, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. خطة الإجراءات التصحيحية (CAPA)", [
                 "صياغة إجراءات تصحيحية فورية وإجراءات وقائية مستقبلية.",
                 "تحديد مسؤول تنفيذي لكل إجراء وتاريخ محدد للإغلاق.",
                 "ربط الإجراءات بسجل المتابعة العام (ATR) للمنظومة.",
                 "عدم إغلاق ملف الحادث إلا بعد التحقق الميداني من فاعلية الحل.",
                 "نشر الدروس المستفادة (Safety Alerts) لمنع تكرار الحادث."
             ], "الأثر: معالجة الأسباب لمنع تكرار الحادث بنسبة 100%", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 10: الحوادث الوشيكة ومراقبة السلوكيات (Near-Miss & BBS)
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide10, "الوقاية الاستباقية", "إدارة الحوادث الوشيكة (Near-Miss) وبرنامج BBS", "استثمار الإشارات المبكرة وتعديل السلوكيات لبناء بيئة عمل خالية من الأخطاء", 10)

    add_card(slide10, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. نظام الإبلاغ عن الحوادث الوشيكة", [
                 "تبسيط شاشة الإبلاغ لتشجيع العمال على الإبلاغ دون قيود.",
                 "تسجيل الوقائع التي كادت تؤدي لإصابة أو خسائر في الأصول.",
                 "إمكانية الإبلاغ السري لحماية خصوصية الموظف.",
                 "تصنيف مستوى الخطر الكامن وتحديد الأولويات لمعالجته فوراً.",
                 "مكافأة وتشجيع الموظفين الأكثر إبلاغاً عن الحوادث الوشيكة."
             ], "المبدأ: كل 300 حادث وشيك يقابله حادث جسيم (هرم بيرد)", EMERALD, EMERALD_BG)

    add_card(slide10, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. مراقبة السلوكيات الميدانية (BBS)", [
                 "رصد وتوثيق السلوكيات الآمنة وغير الآمنة في بيئة العمل.",
                 "إجراء حوارات السلامة الإيجابية المباشرة مع العمال في الميدان.",
                 "تحديد الدوافع وراء السلوكيات الخاطئة (استعجال، نقص تدريب، إجهاد).",
                 "تعزيز وتكريم التصرفات الآمنة لتحفيز العاملين على تكرارها.",
                 "قياس مؤشر السلوك الآمن (Safe Behavior Index) شهرياً."
             ], "التطبيق: تعديل السلوك البشري من خلال الحوار والتحفيز", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide10, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. التحليل التنبؤي للاتجاهات", [
                 "تحليل المناطق الأكثر تكراراً للمواقف الخطرة والأخطاء السلوكية.",
                 "توجيه حملات التوعية والتدريب بناءً على بيانات الرصد الواقعية.",
                 "تنبؤ استباقي بمواقع الخطر قبل وقوع الإصابات الفعلية.",
                 "مقارنة معدلات التحسن السلوكي بين الأقسام المختلفة.",
                 "تقارير دورية ترفع للإدارة العليا توضح تقدم ثقافة السلامة."
             ], "الرؤية: تحويل الملاحظات البسيطة إلى دروع وقائية", PURPLE, PURPLE_BG)

    # =========================================================================
    # SLIDE 11: إدارة المقاولين وأمن البوابات (Contractors & Gate Security)
    # =========================================================================
    slide11 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide11, "الشركاء والمنشأة", "إدارة المقاولين، الزوار، وأمن البوابات", "حوكمة العمليات الخارجية والسيطرة على حركة الدخول والخروج بأعلى درجات الأمان", 11)

    add_card(slide11, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. التأهيل المسبق للمقاولين (Pre-qualification)", [
                 "التسجيل الرقمي لشركات المقاولات ووثائق التأمين المعتمدة.",
                 "فحص سجلات السلامة السابقة ونسبة الحوادث لدى المقاول.",
                 "اعتماد كفاءة الكوادر الفنية والمشرفين التابعين للمقاول.",
                 "التحقق من صلاحية شهادات فحص المعدات والآلات الموردة.",
                 "تصنيف المقاولين وتحديث القائمة المعتمدة دورياً."
             ], "التأهيل: لا عمل لأي مقاول دون اجتياز شروط السلامة", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide11, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. التقييم الميداني المستمر للمقاولين", [
                 "مراقبة التزام عمال المقاول بتعليمات ومهمات الوقاية اليومية.",
                 "تسجيل المخالفات وتطبيق الخصومات ولائحة الجزاءات تلقائياً.",
                 "إصدار بطاقة تقييم أداء أسبوعية وشهرية لكل شركة مقاولات.",
                 "ربط تقييم السلامة بمستحقات المقاولين وتجديد العقود.",
                 "إدراج المقاولين غير الملتزمين في القائمة السوداء (Blacklist)."
             ], "الرقابة: محاسبة دقيقة تضمن تطبيق نفس معايير المنشأة", AMBER, AMBER_BG)

    add_card(slide11, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. أمن البوابات والزوار (Gate Security)", [
                 "تسجيل رقمي لحركة دخول وخروج الزوار والمقاولين والشاحنات.",
                 "إصدار تصاريح دخول مؤقتة بالرقم القومي وتوليد بطاقة QR.",
                 "تسجيل بيانات فحص السائقين والشاحنات قبل السماح بالدخول.",
                 "ربط البوابات ببيانات تصاريح العمل السارية والمصرح بها.",
                 "إحصائيات فورية لعدد الأفراد المتواجدين داخل المنشأة لحظياً."
             ], "الأمن: سيطرة كاملة ومعرفة فورية بمن داخل الموقع في الطوارئ", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 12: العيادة الطبية والصحة المهنية (Clinic & Health)
    # =========================================================================
    slide12 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide12, "الصحة المهنية", "العيادة الطبية وبرامج الرقابة الصحية للعاملين", "رعاية صحية متكاملة وسجلات طبية رقمية تحافظ على لياقة وسلامة الموظفين", 12)

    add_card(slide12, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. السجل الطبي الرقمي الموحد", [
                 "ملف طبي إلكتروني لكل موظف وعامل مشفر بالكامل.",
                 "حفظ نتائج الفحوصات الطبية الابتدائية قبل التعيين.",
                 "توثيق فصيلة الدم، الحساسية، والأمراض المزمنة إن وجدت.",
                 "حماية خصوصية وسرية البيانات الطبية للمرضى طبقاً للقانون.",
                 "ربط السجل ببيانات الموظف وقسمه وطبيعة تعرضه المهني."
             ], "الخصوصية: بيانات طبية مشفرة ومحمية لا يطلع عليها إلا الطبيب", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide12, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. إدارة الزيارات اليومية والصيدلية", [
                 "تسجيل ترددات العيادة اليومية (Clinic Attendance) مع التشخيص.",
                 "إدارة صرف الأدوية والمستلزمات الطبية وتتبع رصيد الصيدلية.",
                 "تسجيل الإسعافات الأولية لحوادث وإصابات العمل فور وقوعها.",
                 "إدارة منح وتوثيق الإجازات المرضية والتوصيات بالراحة.",
                 "إصدار خطابات التحويل الخارجي للمستشفيات التخصصية المتعاقد معها."
             ], "الكفاءة: أتمتة كاملة للزيارات والعلاج وساعات العمل المفقودة", EMERALD, EMERALD_BG)

    add_card(slide12, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الفحوصات الدورية واللياقة المهنية", [
                 "جدولة الفحوصات الدورية للعاملين في البيئات الخاصة (أغذية، ضوضاء).",
                 "متابعة قياسات وظائف الرئة، فحص السمع، وتحاليل الدم الدورية.",
                 "التحقق من اللياقة للعمل في الأماكن المرتفعة والأماكن المغلقة.",
                 "برامج التوعية الصحية الموسمية (الإجهاد الحراري، الأوبئة).",
                 "تقارير دورية بمؤشرات الصحة العامة ومعدلات الغياب المرضي."
             ], "اللياقة: تأكد مستمر من قدرة العامل على أداء مهامه بأمان", AMBER, AMBER_BG)

    # =========================================================================
    # SLIDE 13: مكافحة الحرائق ومعدات الطوارئ (Fire Equipment)
    # =========================================================================
    slide13 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide13, "مكافحة الحرائق", "إدارة وفحص معدات الإطفاء وأنظمة الحريق", "جاهزية قصوى بنسبة 100% لكافة معدات الدفاع المدني ومكافحة الطوارئ", 13)

    add_card(slide13, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. الحصر الرقمي الشامل للمعدات", [
                 "سجل رقمي لكافة طفايات الحريق (بودرة، CO2، ماء، رغوة).",
                 "تتبع شبكات خراطيم الإطفاء، صناديق الحريق، ومحابس الإمداد.",
                 "حصر أنظمة الرشاشات التلقائية (Sprinklers) ومضخات الحريق.",
                 "توزيع المعدات على خريطة الموقع الجغرافية برقم تعريفي فريد.",
                 "تحديد النوع والسعة والموقع الدقيق لكل جهاز إطفاء."
             ], "الحصر: تغطية شاملة لكافة نقاط الإطفاء في المنشأة", CRIMSON, CRIMSON_BG)

    add_card(slide13, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. التفتيش الذكي عبر رموز QR Code", [
                 "فحص ميداني سريع عن طريق مسح رمز QR الملصق على الطفاية.",
                 "التحقق من: ضغط العداد، سلامة الصمام، خرطوم التفريغ، ونظافة الجهاز.",
                 "تسجيل نتيجة الفحص فورياً في النظام دون الحاجة لأوراق أو كروت.",
                 "تنبيه فوري عند رصد أي طفاية غير صالحة للاستبدال العاجل.",
                 "إرفاق صور توثيقية في حال وجود أي تلف أو إعاقة وصول للجهاز."
             ], "الميدان: تفتيش لا يتجاوز ثوانٍ معدودة يضمن كفاءة الجهاز", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide13, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. تنبيهات الصيانة وإعادة التعبئة", [
                 "تنبيهات تلقائية ذكية قبل موعد إعادة تعبئة الأسطوانات الدورية.",
                 "جدولة مواعيد الاختبارات الهيدروستاتيكية الدورية للأسطوانات.",
                 "سجل صيانة مضخات الحريق واختبارات التشغيل الأسبوعية للضغط.",
                 "سجل فحص كواشف الدخان والحرارة ولوحات الإنذار المركزية.",
                 "جاهزية كاملة وتوثيق معتمد للتفتيش من قبل الحماية المدنية."
             ], "الجاهزية: لا مفاجآت عند الطوارئ واختبارات دورية مؤتمتة", AMBER, AMBER_BG)

    # =========================================================================
    # SLIDE 14: الفحوصات والتفتيش الدوري (Periodic Inspections)
    # =========================================================================
    slide14 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide14, "التفتيش الدوري", "الفحوصات الدورية للمعدات والمنشآت", "صيانة وقائية وتفتيش مستمر على الأصول الإنشائية والميكانيكية والكهربائية", 14)

    add_card(slide14, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. نطاق الأصول والمعدات الخاضعة للفحص", [
                 "معدات الرفع الثقيل: الأوناش، الرافعات الشوكية، وحبال الرفع.",
                 "أوعية الضغط: الغلايات، ضواغط الهواء، وخزانات الغاز والوقود.",
                 "المنظومات الكهربائية: اللوحات الرئيسية والفرعية وشبكات التأريض.",
                 "السلالات الثابتة والمتحركة، السقالات، وأبواب الطوارئ والمخارج.",
                 "بيئة العمل: الإضاءة، الضوضاء، والتهوية الميكانيكية."
             ], "النطاق: تغطية كافة الأصول الحيوية ذات الخطورة التشغيلية", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide14, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. قوائم الفحص الذكية (Checklists)", [
                 "قوائم تفتيش معيارية مصممة وفق الأكواد العالمية (OSHA / ISO).",
                 "سهولة التعبئة مع أسئلة واضحة وخيارات محددة (مطابق / غير مطابق).",
                 "إلزامية إرفاق صورة العطل الميداني عند رصد أي ملاحظة سلبية.",
                 "حساب تلقائي لنسبة الامتثال والسلامة لكل جولة تفتيشية.",
                 "إمكانية تصميم وتعديل قوائم الفحص بما يلائم العمليات الجديدة."
             ], "المعايير: تفتيش موحد ودقيق يمنع الاجتهاد العشوائي", EMERALD, EMERALD_BG)

    add_card(slide14, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الجدولة الآلية وأوامر الإصلاح", [
                 "تقويم ذكي يوضح مواعيد التفتيش القادمة (أسبوعي، شهري، سنوي).",
                 "تنبيهات للمفتشين والمهندسين قبل حلول موعد الفحص بوقت كافٍ.",
                 "تحويل الملاحظات والعيوب تلقائياً إلى أوامر إصلاح فورية للصيانة.",
                 "متابعة إغلاق العيوب وتحديث حالة المعدة (جاهزة / محظورة).",
                 "سجل تاريخي لكل معدة يكشف الأعطال المتكررة ومصدرها."
             ], "المتابعة: ربط وثيق بين أخصائي السلامة وفريق الصيانة", AMBER, AMBER_BG)

    # =========================================================================
    # SLIDE 15: مهمات الوقاية الشخصية (PPE Management)
    # =========================================================================
    slide15 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide15, "مهمات الوقاية", "إدارة مهمات الوقاية الشخصية (PPE) والمخزون", "خط الدفاع الأخير لحماية العاملين مع حوكمة كاملة للصرف والاستهلاك", 15)

    add_card(slide15, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. مصفوفة تحديد مهمات الوقاية", [
                 "تحديد المهمات الإلزامية لكل قسم ووظيفة بناءً على تقييم المخاطر.",
                 "حماية الرأس: خوذات السلامة بالمواصفات المعتمدة (EN397).",
                 "حماية العين والوجه: نظارات حماية ودروع لحام ومواد كيميائية.",
                 "حماية الجهاز التنفسي: كمامات غبار، فلاتر غازات، وأجهزة تنفس.",
                 "حماية الأقدام والأيدي: أحذية سيفتي متخصصة وقفازات متنوعة."
             ], "المصفوفة: كل عامل يرتدي المهمات المناسبة تماماً لمهامه", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide15, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. نظام الصرف وسجل الموظف", [
                 "سجل استلام رقمي موثق لكل موظف بمهمات الوقاية الخاصة به.",
                 "تحديد العمر الافتراضي لكل مهمة (مثال: حذاء كل 6 أشهر).",
                 "منع الصرف المزدوج قبل انتهاء العمر الافتراضي إلا بأسباب تبرير.",
                 "توثيق تاريخ الصرف ورقم المقاس ونوع المهمة المستلمة.",
                 "توقيع الموظف إلكترونياً على استلام وتعهده بارتداء المهمات."
             ], "الحوكمة: سجل رقمي يمنع الهدر ويثبت استلام كل عامل لمهماته", EMERALD, EMERALD_BG)

    add_card(slide15, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. إدارة المخزون والتكاليف", [
                 "متابعة لحظية لرصيد مستودع مهمات الوقاية بالأنواع والمقاسات.",
                 "تنبيهات آلية عند وصول المخزون للحد الأدنى لإعادة الطلب.",
                 "تقارير استهلاك تفصيلية حسب الأقسام وخطوط الإنتاج والمقاولين.",
                 "مراقبة تكاليف الشراء وجودة الموردين ونسب التلف المبكر.",
                 "ضمان عدم توقف أي نشاط تشغيلي بسبب نفاد مهمات الوقاية."
             ], "المخزون: توافر مستمر للمهمات وترشيد للتكاليف والمصروفات", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 16: المخالفات والجزاءات (Safety Violations)
    # =========================================================================
    slide16 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide16, "الانضباط الميداني", "إدارة مخالفات السلامة ولائحة الجزاءات", "ترسيخ الالتزام وحماية العاملين من خلال تطبيق عادل وصارم لقواعد السلامة", 16)

    add_card(slide16, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. التوثيق الميداني للمخالفة", [
                 "رصد المخالفة وتوثيقها فوراً بالصورة والتوقيت والموقع.",
                 "تحديد نوع المخالفة: عدم ارتداء PPE، عمل بدون تصريح، سرعة زائدة.",
                 "تسجيل بيانات الموظف أو المقاول المخالف ورقمه الوظيفي.",
                 "إتاحة كتابة أقوال المخالف ومبرراته لضمان النزاهة.",
                 "إشعار فوري لمدير القسم التابع له المخالف لسرعة التدخل."
             ], "التوثيق: تسجيل مصور وقاطع يمنع الإنكار والجدل", CRIMSON, CRIMSON_BG)

    add_card(slide16, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. لائحة الجزاءات المتدرجة", [
                 "تطبيق سلم جزاءات تصاعدي عادل ومعتمد من إدارة الشركة:",
                 "المستوى 1: توجيه وتنبيه شفهي مسجل مع توعية بالمخاطر.",
                 "المستوى 2: لفت نظر كتابي وتعهد بعدم التكرار.",
                 "المستوى 3: إنذار رسمي أو إيقاف مؤقت عن العمل.",
                 "المستوى 4: جزاء مالي / استبعاد نهائي للمقاول غير الملتزم."
             ], "التدرج: التوعية أولاً والردع الحازم في حال الإصرار", AMBER, AMBER_BG)

    add_card(slide16, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. دورة المراجعة والاعتماد", [
                 "مسار اعتماد يبدأ من مسؤول السلامة حتى مدير إدارة السلامة والموارد البشرية.",
                 "إمكانية تقديم التماس وتظلم يتم فحصه بشفافية كاملة.",
                 "تحليل أكثر المخالفات تكراراً لتعديل الإجراءات أو تكثيف التدريب.",
                 "ربط سجل المخالفات بنظام تقييم الأداء السنوي للموظفين والمقاولين.",
                 "خفض واضح بنسبة المخالفات الميدانية بفضل الحزم والشفافية."
             ], "العدالة: مسار تدقيق إداري يحمي حقوق الجميع ويعزز الانضباط", ROYAL_BLUE, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 17: السلامة الكيميائية (Chemical Safety & HazMat)
    # =========================================================================
    slide17 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide17, "المواد الخطرة", "إدارة السلامة الكيميائية وصحائف الأمان (MSDS)", "حماية العاملين والبيئة من مخاطر المواد الكيميائية السامة والقابلة للاشتعال", 17)

    add_card(slide17, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. السجل المركزي للمواد الكيميائية", [
                 "حصر شامل لكافة الكيماويات المستخدمة بالمنشأة والمزارع والمصانع.",
                 "تسجيل الاسم التجاري والعلمي، ورقم CAS، ونوع المادة (حمض، قلوي، مذيب).",
                 "تحديد الكميات المخزونة والمستهلكة ومواقع التخزين المعتمدة.",
                 "الترميز اللوني والتحذيري وفق النظام العالمي المتوافق (GHS).",
                 "تحديد مهمات الوقاية المتخصصة للتعامل مع كل مادة بعينها."
             ], "الحصر: قاعدة بيانات دقيقة لكل لتر ومادة كيميائية في الموقع", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide17, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. صحائف بيانات سلامة المواد (MSDS/SDS)", [
                 "أرشفة رقمية لصحائف MSDS لجميع المواد متوفرة باللغتين.",
                 "سهولة الوصول السريع للصحيفة عبر الجوال أو باركود العبوة.",
                 "تعليمات الإسعافات الأولية الفورية عند الاستنشاق أو التلامس.",
                 "إجراءات إطفاء الحرائق الكيميائية ونوع الوسيط المناسب.",
                 "توجيهات التخلص الآمن بيئياً من العبوات الفارغة والمخلفات."
             ], "المعلومة: وصول فوري لإجراءات الطوارئ الطبية لكل مادة", AMBER, AMBER_BG)

    add_card(slide17, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. مصفوفة التوافق وخطة الانسكاب (Spill Control)", [
                 "مصفوفة التوافق الكيميائي لمنع تخزين المواد المتفاعلة معاً.",
                 "اشتراطات التخزين: التهوية، درجة الحرارة، وأحواض الاحتواء الثانوية.",
                 "خطة التعامل السريع مع الانسكابات الكيميائية (Spill Response).",
                 "التأكد من توفير أطقم مكافحة الانسكاب (Spill Kits) وجاهزيتها.",
                 "فحص دوري لسلامة أجهزة غسيل العيون ودش الطوارئ بالمخازن."
             ], "الوقاية: فصل كيميائي صارم واستعداد تام لاحتواء أي تسريب", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 18: الملاحظات اليومية وبوابة النماذج (Daily Observations & Forms Hub)
    # =========================================================================
    slide18 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide18, "النماذج الميدانية", "الملاحظات اليومية وبوابة النماذج السريعة (Forms Hub)", "تمكين المشرفين والموظفين من توثيق الملاحظات الميدانية بكل سهولة وسرعة", 18)

    add_card(slide18, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. تسجيل الملاحظات اليومية الميدانية", [
                 "أداة رصد سريعة للملاحظات والظروف غير الآمنة أثناء الجولات.",
                 "إدخال مباشر بالهاتف الذكي مع التقاط الصورة وتحديد الموقع.",
                 "تصنيف مستوى خطورة الملاحظة (منخفض، متوسط، مرتفع، حرج).",
                 "تحديد الإجراء المطلوب والشخص أو القسم المكلف بالإصلاح.",
                 "إشعار فوري للمسؤول لإصلاح الخلل ومتابعة حالة المعالجة."
             ], "الملاحظات: رصد ومعالجة لحظية تمنع تراكم الظروف الخطرة", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide18, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. بوابة النماذج السريعة (Forms Hub)", [
                 "بوابة مخصصة للهواتف المحمولة تتميز بواجهة فائقة السهولة.",
                 "تضم كافة النماذج الميدانية المعتمدة في مكان واحد منظم.",
                 "إمكانية العمل دون الحاجة لتسجيل دخول معقد للمشرف الميداني.",
                 "دعم إدخال النماذج بدون اتصال بالإنترنت وحفظها تلقائياً.",
                 "تصميم عصري بأزرار كبيرة وقوائم واضحة تناسب بيئة العمل."
             ], "المرونة: نموذج متكامل في جيب كل مشرف سلامة في المصنع", EMERALD, EMERALD_BG)

    add_card(slide18, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. لوحة متابعة وإغلاق الملاحظات", [
                 "استعراض كافة الملاحظات المفتوحة وقيد التنفيذ والمغلقة.",
                 "إلزام المسؤول بإرفاق صورة المعالجة بعد إتمام الإصلاح.",
                 "تحقق أخصائي السلامة من جودة الإجراء قبل إغلاق الملاحظة.",
                 "إحصائيات توضح أكثر الأقسام سرعة في تصحيح الملاحظات.",
                 "تقرير دوري للملاحظات المتأخرة يُرفع للمدير العام تلقائياً."
             ], "الإغلاق: دائرة تفتيش مغلقة تبدأ بالرصد وتنتهي بالتحقق", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 19: تقييم المخاطر وتعليمات التشغيل (Risk Assessment & SOP/JHA)
    # =========================================================================
    slide19 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide19, "إدارة المخاطر", "تقييم المخاطر، مصفوفة 5x5، وتعليمات SOP/JHA", "تحديد استباقي لكافة الأخطار وتطبيق هرم التحكم لمنع الخسائر البشرية والمادية", 19)

    add_card(slide19, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. مصفوفة تقييم المخاطر التفاعلية (5×5 Matrix)", [
                 "تقييم المخاطر بحساب احتمالية الحدوث (1-5) وشدة العواقب (1-5).",
                 "تصنيف الخطر: منخفض (أخضر)، متوسط (أصفر)، مرتفع (أحمر).",
                 "تقييم الخطر المبدئي (Initial Risk) قبل تطبيق ضوابط الأمان.",
                 "إعادة تقييم الخطر المتبقي (Residual Risk) بعد تطبيق الضوابط.",
                 "تحديث دوري لسجل المخاطر مع أي تعديل في خطوط الإنتاج."
             ], "المصفوفة: منهجية معتمدة تحدد أولويات التدخل الهندسي والإداري", CRIMSON, CRIMSON_BG)

    add_card(slide19, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. تحليل سلامة الوظائف (JHA / JSA)", [
                 "تفكيك كل مهمة وظيفية إلى خطوات تسلسلية تفصيلية.",
                 "تحديد المخاطر الكامنة في كل خطوة على حدة.",
                 "وضع إجراءات التحكم والوقاية الإلزامية لكل مرحلة من مراحل العمل.",
                 "ربط JHA المعتمد بتصاريح العمل الإلكترونية المناسبة تلقائياً.",
                 "تدريب العمال على خطوات JHA قبل بدء تنفيذ الأنشطة الحرجة."
             ], "التحليل: تشريح المهام لخطوات آمنة تضمن سلامة المنفذين", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide19, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. مكتبة إجراءات التشغيل القياسية (SOPs)", [
                 "أرشيف إلكتروني متكامل لإجراءات التشغيل الآمن لكافة الآلات.",
                 "إرشادات مصورة وواضحة توضح خطوات التشغيل وإيقاف الطوارئ.",
                 "تطبيق هرم التحكم: الإزالة -> الاستبدال -> التحكم الهندسي -> الإداري -> PPE.",
                 "إمكانية البحث السريع عن أي إجراء بالاسم أو القسم أو الماكينة.",
                 "مراجعة دورية واعتماد سنوي للإجراءات لمواكبة أحدث المعايير."
             ], "المرجع: دليل شامل ومتاح دائماً يضمن توحيد معايير التشغيل", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 20: الآيزو والامتثال التشريعي (ISO & Legal Compliance)
    # =========================================================================
    slide20 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide20, "الجودة والامتثال", "نظام الآيزو والامتثال للتشريعات والقوانين", "مطابقة كاملة للمعايير القياسية العالمية والقوانين المنظمة للسلامة والبيئة", 20)

    add_card(slide20, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. معايير أنظمة الإدارة المتكاملة (IMS)", [
                 "ISO 45001: نظام إدارة السلامة والصحة المهنية ومشاركة العاملين.",
                 "ISO 14001: نظام الإدارة البيئية وحماية الموارد والحد من التلوث.",
                 "ISO 22000: متطلبات سلامة الغذاء ونقاط التحكم الحرجة (HACCP).",
                 "توثيق أهداف وسياسات الجودة والسلامة ومؤشرات قياسها.",
                 "إدارة اجتماعات مراجعة الإدارة (Management Review) وحفظ قراراتها."
             ], "الاعتماد: متوافق تماماً مع متطلبات شهادات الآيزو الدولية", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide20, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. سجل القوانين والتشريعات المحلية (Legal Register)", [
                 "حصر شامل للقوانين: قانون العمل رقم 12، قانون البيئة رقم 4.",
                 "اشتراطات وتعليمات الدفاع المدني والحريق الرسمية المنظمة.",
                 "تقييم دوري لنسبة الامتثال الفعلي لكل مادة وفقرة قانونية.",
                 "تحديث تلقائي للسجل فور صدور أي قرارات وزارية أو تشريعات جديدة.",
                 "تجنب أي مخالفات قانونية أو غرامات صادرة عن الجهات الرقابية."
             ], "القانون: التزام كامل بالتشريعات الوطنية وتفادي أي مساءلات", AMBER, AMBER_BG)

    add_card(slide20, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. التدقيق الداخلي وحالات عدم المطابقة (Audit & NC)", [
                 "جدولة خطة التدقيق الداخلي السنوي على كافة الإدارات والمصانع.",
                 "تسجيل نتائج التدقيق وحالات عدم المطابقة الرئيسية والثانوية.",
                 "متابعة إغلاق الإجراءات التصحيحية المنبثقة عن التدقيق الداخلي.",
                 "أرشفة تقارير الجهات المانحة للشهادات وتتبع ملاحظاتها.",
                 "جاهزية مستمرة ومستندات موثقة تقلص زمن التدقيق الخارجي بنسبة 70%."
             ], "التدقيق: جاهزية دائمة بنقرة زر أمام لجان التفتيش والاعتماد", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 21: الاستدامة وإدارة التغيير والميزانية (Sustainability, MoC & Budget)
    # =========================================================================
    slide21 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide21, "الاستدامة والحوكمة", "الاستدامة البيئية، إدارة التغيير (MoC)، والميزانية", "أبعاد استراتيجية تدعم التنمية المستدامة، التحكم بالتغيير، وترشيد الإنفاق", 21)

    add_card(slide21, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. الاستدامة البيئية والبصمة الكربونية", [
                 "مراقبة استهلاك الطاقة، المياه، والوقود عبر خطوط الإنتاج.",
                 "سجل المخلفات الصلبة والسائلة وتتبع التخلص الآمن وإعادة التدوير.",
                 "قياس ومتابعة الانبعاثات الغازية وعوادم المداخن والغلايات.",
                 "مبادرات ترشيد استهلاك الموارد وحماية التنوع البيولوجي الزراعي.",
                 "تقارير استدامة بيئية دورية تدعم متطلبات التصدير للأسواق العالمية."
             ], "البيئة: الحفاظ على الموارد والحد من الانبعاثات الضارة", EMERALD, EMERALD_BG)

    add_card(slide21, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. إدارة التغييرات التشغيلية (MoC)", [
                 "دراسة أثر أي تعديل قبل تنفيذه (معدات جديدة، مواد، تعديل بالعمليات).",
                 "تقييم شامل للمخاطر الناجمة عن التغيير على السلامة والصحة.",
                 "مسار اعتماد إلزامي من قطاعات السلامة والإنتاج والصيانة.",
                 "تحديث وثائق التدريب وإجراءات التشغيل المصاحبة للتغيير.",
                 "منع الحوادث الكارثية الناتجة عن التعديلات العشوائية غير المدروسة."
             ], "التحكم: دراسة مسبقة لأي تغيير لمنع ظهور مخاطر غير متوقعة", AMBER, AMBER_BG)

    add_card(slide21, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. ميزانية السلامة والعائد الاستثماري (HSE Budget & ROI)", [
                 "تخطيط بنود ميزانية السلامة السنوية (مهمات، تدريب، صيانة إطفاء، أدوية).",
                 "تتبع ومقارنة المصروفات الفعلية مقابل التقديرات المعتمدة.",
                 "قياس العائد الاستثماري على السلامة من خلال منع توقف الإنتاج.",
                 "حساب الوفر المالي المتحقق من انخفاض الحوادث والتلفيات والتعويضات.",
                 "تبرير علمي ومالي لكافة استثمارات السلامة أمام الإدارة العليا."
             ], "المالية: إثبات أن السلامة استثمار رابح يحمي الأرباح والأصول", ROYAL_BLUE, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 22: التدريب والتأهيل المعرفي (Training Management)
    # =========================================================================
    slide22 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide22, "التدريب والتأهيل", "إدارة التدريب والسلامة المعرفية للكوادر", "بناء رأس المال البشري وثقافة الوعي من خلال تدريب مستمر ومقاس الفاعلية", 22)

    add_card(slide22, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. الخطة التدريبية ومصفوفة الكفاءة", [
                 "إعداد الخطة السنوية لتدريب العاملين والمقاولين بالشركة.",
                 "مصفوفة التدريب الإلزامية لكل تخصص ومستوى وظيفي.",
                 "برامج تدريبية متخصصة: مكافحة الحريق، الإسعافات الأولية، LOTO.",
                 "جلسات التوجيه والتعريف بالسلامة للعمال الجدد (Induction).",
                 "تحديد الاحتياجات التدريبية بناءً على نتائج تقارير الحوادث والتفتيش."
             ], "الخطة: منظومة تدريبية مجدولة تغطي كافة العاملين بالمصنع", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide22, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. توثيق السجلات وساعات التدريب", [
                 "تسجيل حضور المتدربين رقمياً مع صور الجلسات التدريبية.",
                 "حساب ساعات التدريب الفردية والتراكمية (Training Man-Hours).",
                 "إصدار شهادات التدريب الداخلية مزودة برمز تحقق QR Code.",
                 "تقييم فاعلية التدريب واختبارات قياس المعرفة قبل وبعد الدورة.",
                 "تنبيهات تلقائية قبل انتهاء صلاحية الشهادات لتجديد التدريب."
             ], "التوثيق: سجل دقيق لكل متدرب وساعات تدريب معتمدة", EMERALD, EMERALD_BG)

    add_card(slide22, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. حملات التوعية ورسائل السلامة (Toolbox Talks)", [
                 "مكتبة مدمجة لمحاضرات ما قبل العمل اليومية (Toolbox Talks - TBT).",
                 "مواضيع سريعة وموجهة تناسب المخاطر اليومية لفرق العمل.",
                 "توثيق حضور حوارات TBT الصباحية مع توقيعات المشرفين.",
                 "نشر بوسترات وملصقات توعوية دورية في شاشات ولوحات المصنع.",
                 "ترسيخ ثقافة السلامة كجزء لا يتجزأ من السلوك اليومي للعاملين."
             ], "التوعية: حوارات يومية موجزة تبقي السلامة حاضرة في الأذهان", NAVY_MID, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 23: مساعد الذكاء الاصطناعي (Gemini AI Assistant)
    # =========================================================================
    slide23 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide23, "الذكاء الاصطناعي", "مساعد الذكاء الاصطناعي التوليدي (Gemini AI)", "تسخير أحدث نماذج الذكاء الاصطناعي لرفع كفاءة التحليل ودعم القرار الفوري", 23)

    add_card(slide23, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. مستشار السلامة الذكي (Instant AI Advisor)", [
                 "مساعد محادثة تفاعلي مدعوم بنماذج Google Gemini المتقدمة.",
                 "إجابات فورية ودقيقة على الاستفسارات الفنية والقانونية باللغة العربية.",
                 "البحث السريع في معايير السلامة العالمية (OSHA / NFPA / ISO).",
                 "اقتراح مهمات الوقاية المناسبة للمواد الكيميائية المعقدة.",
                 "مساعدة أخصائي السلامة في مراجعة وتدقيق الإجراءات الميدانية."
             ], "المستشار: خبير سلامة افتراضي متاح على مدار الساعة", PURPLE, PURPLE_BG)

    add_card(slide23, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. التحليل الذكي لتقارير الحوادث", [
                 "قراءة نصوص تقارير الحوادث وتحليل ملابساتها تلقائياً.",
                 "استنباط وتصنيف الأسباب الجذرية المباشرة وغير المباشرة.",
                 "اقتراح خطط إجراءات تصحيحية (CAPA) واقعية ومتوافقة مع المعايير.",
                 "كشف الأنماط الخفية والعوامل المشتركة بين الحوادث المتفرقة.",
                 "تقليص زمن إعداد تقارير التحقيق العميقة بنسبة تفوق 75%."
             ], "التحليل: استخلاص الأسباب وخطط المعالجة بلمح البصر", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide23, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. توليد المحتوى والتقارير التنفيذية", [
                 "صياغة مسودات تقييم المخاطر (JHA) لأي وظيفة أو مهمة جديدة.",
                 "توليد سيناريوهات تجارب الإخلاء وخطط الطوارئ ومسودات SOP.",
                 "إنشاء ملخصات تنفيذية موجهة لمجلس الإدارة بأسلوب مهني رفيع.",
                 "ترجمة فورية للمصطلحات الفنية وصحائف الأمان الكيميائية.",
                 "أمان وتشفير كامل للبيانات لمنع تسرب أي معلومات داخلية."
             ], "الإنتاجية: توفير مئات الساعات في كتابة وتلخيص التقارير", EMERALD, EMERALD_BG)

    # =========================================================================
    # SLIDE 24: إدارة الطوارئ وتجارب الإخلاء (Emergency Response)
    # =========================================================================
    slide24 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide24, "الاستعداد للطوارئ", "إدارة خطط الطوارئ وتجارب الإخلاء الوهمية", "جاهزية ميدانية تامة وسرعة استجابة فائقة للتعامل مع أي حدث استثنائي", 24)

    add_card(slide24, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. خطط الطوارئ وسيناريوهات الأزمات", [
                 "خطط استجابة معتمدة لسيناريوهات: الحرائق، الانفجارات، والتسرب.",
                 "إجراءات التعامل مع الطوارئ الطبية والانهيارات الإنشائية.",
                 "تحديد خرائط ومسارات الإخلاء ومواقع مخارج الطوارئ المعتمدة.",
                 "تحديد نقاط التجمع الآمنة (Assembly Points) ووسائل الإشارة.",
                 "تحديث دوري لبيانات الاتصال بجهات الطوارئ الخارجية (دفاع مدني، إسعاف)."
             ], "الخطط: سيناريوهات محددة وواضحة تمنع الارتباك أثناء الأزمات", CRIMSON, CRIMSON_BG)

    add_card(slide24, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. توثيق تجارب الإخلاء الوهمية (Drills)", [
                 "جدولة وتنفيذ تجارب الإخلاء الدورية لجميع المباني والمصانع.",
                 "قياس زمن الإخلاء الفعلي ومقارنته بالزمن المعياري المستهدف.",
                 "حصر أعداد العاملين في نقاط التجمع والتأكد من خلو المباني.",
                 "تقييم أداء فرق الطوارئ وسرعة إطلاق الإنذار والتوجيه.",
                 "توثيق نقاط القوة وفرص التحسين المستخلصة من كل تجربة إخلاء."
             ], "التجارب: تدريب عملي دوري يضمن سرعة النجاة في اللحظات الحرجة", AMBER, AMBER_BG)

    add_card(slide24, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. فريق التدخل السريع (ERT)", [
                 "تشكيل وهيكلة فريق الاستجابة الأولية من مختلف الأقسام والمناوبات.",
                 "تدريب متقدم لأعضاء الفريق على الإطفاء والإسعاف والإنقاذ.",
                 "توزيع الأدوار: قائد الإخلاء، مسؤولو التجميع، ومقدمو الإسعاف.",
                 "سجل فحص وتحديث أدوات ومهمات فرق التدخل السريع.",
                 "إمكانية إطلاق إنذار الطوارئ وإشعار أعضاء الفريق عبر النظام فوراً."
             ], "الفريق: كوادر مدربة تقود عمليات الإنقاذ بثقة واحترافية", ROYAL_BLUE, LIGHT_BLUE)

    # =========================================================================
    # SLIDE 25: سجل متابعة الإجراءات وحوكمة الإغلاق (ATR & CAPA)
    # =========================================================================
    slide25 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide25, "متابعة الإجراءات", "سجل متابعة الإجراءات وحوكمة الإغلاق (ATR)", "السجل المركزي الموحد الذي يضمن تنفيذ وتتبع كافة التوصيات والإجراءات التصحيحية", 25)

    add_card(slide25, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. السجل المركزي الشامل (Master Register)", [
                 "تجميع كافة الإجراءات التصحيحية من جميع الموديولات في سجل موحد.",
                 "مصادر الإجراءات: التحقيقات، الملاحظات، الفحوصات، وتدقيق الآيزو.",
                 "تحديد مسؤول تنفيذي لكل إجراء وتاريخ محدد لإنهائه.",
                 "تصنيف أولوية الإجراء: عاجل جداً، حرج، متوسط، روتيني.",
                 "منع ضياع أي توصية أو إجراء تصحيحي وضمان الرقابة الصارمة."
             ], "التجميع: مظلة موحدة تراقب كافة التوصيات الصادرة في المنشأة", ROYAL_BLUE, LIGHT_BLUE)

    add_card(slide25, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. تتبع الحالات ومؤشر الإغلاق في الموعد", [
                 "تصنيف الحالات: مفتوح (Open)، قيد التنفيذ (In-Progress)، مغلق (Closed).",
                 "مؤشر الإغلاق في الموعد المحدد (On-Time Closure Rate).",
                 "تنبيهات استباقية بالبريد الإلكتروني قبل حلول موعد الاستحقاق.",
                 "نظام تصعيد هرمي آلي للمهام المتأخرة يصل للمدير العام.",
                 "إلزام المسؤول بإرفاق الأدلة الميدانية والصور عند طلب الإغلاق."
             ], "المؤشر: مقياس دقيق لالتزام الإدارات بتنفيذ اشتراطات السلامة", EMERALD, EMERALD_BG)

    add_card(slide25, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. التحقق والمطابقة النهائية", [
                 "لا يغلق الإجراء في النظام إلا بعد مراجعة واعتماد أخصائي السلامة.",
                 "فحص ميداني للتأكد من أن الحل المطبق قضى على الخطر نهائياً.",
                 "تقييم فاعلية الإجراء بعد مرور فترة زمنية لمنع الانتكاس.",
                 "تقارير دورية ترفع لمجلس الإدارة بنسب إنجاز كل إدارة.",
                 "تحويل الإجراءات الناجحة إلى ممارسات عمل قياسية معممة."
             ], "التحقق: جودة الإغلاق وليس مجرد استيفاء ورقي شكلي", AMBER, AMBER_BG)

    # =========================================================================
    # SLIDE 26: ملخص القيمة المضافة وخاتمة العرض (Summary & Path Forward)
    # =========================================================================
    slide26 = prs.slides.add_slide(blank_layout)
    add_page_decorations(slide26, "الخاتمة والأثر", "ملخص الأثر التنفيذي والقيمة المضافة لمنظومة SafetyHub", "ثمار التحول الرقمي في حماية الأرواح، خفض التكاليف، واستدامة التميز التشغيلي", 26)

    add_card(slide26, Inches(9.0), Inches(1.4), Inches(3.8), Inches(5.3),
             "1. العوائد والمكتسبات التشغيلية", [
                 "خفض معدلات الحوادث والإصابات المقعدة بنسبة قياسية.",
                 "توفير أكثر من 85% من أوقات التوثيق والأعمال الورقية الميدانية.",
                 "تسريع دورات اعتماد تصاريح العمل من ساعات إلى دقائق معدودة.",
                 "حوكمة تامة لعمليات المقاولين وأمن البوابات والزوار.",
                 "جاهزية مستمرة بنسبة 100% لكافة تدقيقات وتفتيشات الآيزو والدفاع المدني."
             ], "الأثر: كفاءة تشغيلية غير مسبوقة وثقافة سلامة راسخة", EMERALD, EMERALD_BG)

    add_card(slide26, Inches(4.8), Inches(1.4), Inches(3.8), Inches(5.3),
             "2. الركائز المستقبلية والتطوير المستمر", [
                 "التكامل المباشر مع كاميرات المراقبة الذكية لرصد عدم ارتداء PPE.",
                 "توسيع نماذج التنبؤ بالمخاطر عبر الذكاء الاصطناعي التوليدي.",
                 "إطلاق تطبيقات الهواتف الذكية المخصصة (Native iOS & Android).",
                 "ربط المنظومة بالأجهزة القابلة للارتداء (IoT Sensors) للعمال.",
                 "التحديث المستمر لمواكبة أحدث المعايير الهندسية والبيئية العالمية."
             ], "المستقبل: ابتكار مستمر وتوظيف دائم لأحدث التقنيات", PURPLE, PURPLE_BG)

    add_card(slide26, Inches(0.6), Inches(1.4), Inches(3.8), Inches(5.3),
             "3. الدعم الفني وقنوات التواصل", [
                 "نظام دعم فني مباشر ومتابعة مستمرة لأي استفسارات أو تطويرات.",
                 "فريق السلامة والصحة المهنية — شركة ICAPP.",
                 "مدير المنظومة: م. ياسر دياب (Yasser Diab).",
                 "البريد الإلكتروني: Yasser.diab@icapp.com.eg",
                 "تواصل مباشر عبر Microsoft Teams ودعم فني متاح دائماً.",
                 "نظام SafetyHub | ICAPP — صُمم وطُوّر لسلامة أغلى ما نملك: الإنسان."
             ], "التواصل: شراكة دائمة لدعم السلامة والتميز في العمل", ROYAL_BLUE, LIGHT_BLUE)

    # Save presentation
    output_path = r"D:\Apps\1.9.2026\ICAPP.V.7.09-2026\SafetyHub_ICAPP_Comprehensive_Presentation.pptx"
    prs.save(output_path)
    print(f"SUCCESS: Presentation successfully generated at: {output_path}")
    print(f"Total Slides Created: {len(prs.slides)}")

if __name__ == "__main__":
    create_presentation()
