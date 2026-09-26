import os
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

PROJECT_ROOT = r"D:\Apps\1.9.2026\ICAPP.V.7.09-2026"
SCREENSHOTS_DIR = os.path.join(PROJECT_ROOT, "screenshots")
LOGO_PATH = os.path.join(PROJECT_ROOT, "Frontend", "icons", "icapp-logo.png")

# Palette - Eco-Luxury & Corporate Sustainability
FOREST_DARK = RGBColor(13, 51, 43)     # #0D332B - Deep Executive Forest
FOREST_PINE = RGBColor(25, 88, 73)     # #195849 - Pine Accent
EMERALD_LEAF = RGBColor(36, 134, 111)  # #24866F - Brand Green
MINT_LIGHT = RGBColor(167, 243, 208)   # #A7F3D0 - Mint Soft
AQUA_WATER = RGBColor(25, 118, 185)    # #1976B9 - Water Blue
AQUA_BG = RGBColor(235, 248, 255)      # #EBF8FF
SOLAR_GOLD = RGBColor(183, 121, 5)     # #B77905 - Energy Gold
SOLAR_BG = RGBColor(254, 249, 235)     # #FEF9EB
GAS_ORANGE = RGBColor(196, 81, 36)     # #C45124 - Thermal Gas
GAS_BG = RGBColor(255, 245, 240)       # #FFF5F0
CIRCULAR_GREEN = RGBColor(37, 132, 84) # #258454 - Waste / Circular
CIRCULAR_BG = RGBColor(238, 252, 244)  # #EEFCF4
INK_SLATE = RGBColor(23, 50, 45)       # #17322D - Dark Text
MUTED_SAGE = RGBColor(96, 122, 115)    # #607A73 - Muted Text
CARD_WHITE = RGBColor(255, 255, 255)   # #FFFFFF
PAGE_BG = RGBColor(243, 248, 246)      # #F3F8F6 - Subtle Eco Mint
BORDER_SOFT = RGBColor(213, 229, 223)  # #D5E5DF

def add_sus_header_footer(slide, category_text, title_text, subtitle_text, slide_num, total_slides=14):
    # Background
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = PAGE_BG
    bg.line.fill.background()

    # Top Bar
    top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.15))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = FOREST_DARK
    top_bar.line.fill.background()

    # Accent Emerald Strip
    acc = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(1.15), Inches(13.333), Inches(0.04))
    acc.fill.solid()
    acc.fill.fore_color.rgb = EMERALD_LEAF
    acc.line.fill.background()

    # Category Pill (Left)
    cat_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.6), Inches(0.2), Inches(3.0), Inches(0.32))
    cat_box.fill.solid()
    cat_box.fill.fore_color.rgb = FOREST_PINE
    cat_box.line.color.rgb = EMERALD_LEAF
    cat_box.line.width = Pt(1)
    tf_c = cat_box.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category_text
    p_c.alignment = PP_ALIGN.CENTER
    p_c.font.size = Pt(10.5)
    p_c.font.bold = True
    p_c.font.color.rgb = MINT_LIGHT
    p_c.font.name = "Segoe UI"

    # Title & Subtitle Box
    title_box = slide.shapes.add_textbox(Inches(3.8), Inches(0.12), Inches(7.6), Inches(0.55))
    tf_t = title_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title_text
    p_t.alignment = PP_ALIGN.LEFT
    p_t.font.size = Pt(19)
    p_t.font.bold = True
    p_t.font.color.rgb = RGBColor(255, 255, 255)
    p_t.font.name = "Segoe UI"

    sub_box = slide.shapes.add_textbox(Inches(3.8), Inches(0.62), Inches(7.6), Inches(0.45))
    tf_s = sub_box.text_frame
    tf_s.word_wrap = True
    p_s = tf_s.paragraphs[0]
    p_s.text = subtitle_text
    p_s.alignment = PP_ALIGN.LEFT
    p_s.font.size = Pt(11)
    p_s.font.color.rgb = RGBColor(209, 231, 225)
    p_s.font.name = "Segoe UI"

    # Logo
    if os.path.exists(LOGO_PATH):
        try:
            slide.shapes.add_picture(LOGO_PATH, Inches(11.8), Inches(0.16), height=Inches(0.82))
        except Exception:
            pass

    # Footer
    f_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.05), Inches(13.333), Inches(0.02))
    f_line.fill.solid()
    f_line.fill.fore_color.rgb = BORDER_SOFT
    f_line.line.fill.background()

    footer_box = slide.shapes.add_textbox(Inches(0.6), Inches(7.08), Inches(12.133), Inches(0.35))
    tf_f = footer_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = f"ICAPP Corporate Sustainability & ESG Report  •  SafetyHub Environmental Platform  •  Slide {slide_num} of {total_slides}"
    p_f.alignment = PP_ALIGN.CENTER
    p_f.font.size = Pt(9.5)
    p_f.font.color.rgb = MUTED_SAGE
    p_f.font.name = "Segoe UI"

def add_split_slide(slide, image_filename, card_title, bullets, kpis_list, impact_badge, accent_color=EMERALD_LEAF):
    text_left = Inches(0.6)
    img_container_left = Inches(6.9)
    top_y = Inches(1.3)
    card_w = Inches(5.8)
    card_h = Inches(5.55)

    # 1. Text Card
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, text_left, top_y, card_w, card_h)
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_WHITE
    card.line.color.rgb = BORDER_SOFT
    card.line.width = Pt(1)

    # Card Banner
    banner = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, text_left, top_y, card_w, Inches(0.5))
    banner.fill.solid()
    banner.fill.fore_color.rgb = accent_color
    banner.line.fill.background()

    tb = slide.shapes.add_textbox(text_left + Inches(0.15), top_y + Inches(0.06), card_w - Inches(0.3), Inches(0.4))
    tf_tb = tb.text_frame
    p_tb = tf_tb.paragraphs[0]
    p_tb.text = card_title
    p_tb.alignment = PP_ALIGN.LEFT
    p_tb.font.size = Pt(13.5)
    p_tb.font.bold = True
    p_tb.font.color.rgb = RGBColor(255, 255, 255)
    p_tb.font.name = "Segoe UI"

    # Bullets
    bb = slide.shapes.add_textbox(text_left + Inches(0.2), top_y + Inches(0.6), card_w - Inches(0.4), Inches(4.25))
    tf_bb = bb.text_frame
    tf_bb.word_wrap = True
    for i, b in enumerate(bullets):
        p = tf_bb.paragraphs[0] if i == 0 else tf_bb.add_paragraph()
        p.text = f"• {b}"
        p.alignment = PP_ALIGN.LEFT
        p.font.size = Pt(11)
        p.font.name = "Segoe UI"
        p.font.color.rgb = INK_SLATE
        p.space_after = Pt(7)

    # Bottom Impact Badge
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, text_left + Inches(0.2), top_y + card_h - Inches(0.55), card_w - Inches(0.4), Inches(0.42))
    badge.fill.solid()
    badge.fill.fore_color.rgb = RGBColor(230, 247, 240)
    badge.line.color.rgb = EMERALD_LEAF
    badge.line.width = Pt(1)
    tf_badge = badge.text_frame
    tf_badge.word_wrap = True
    p_bg = tf_badge.paragraphs[0]
    p_bg.text = impact_badge
    p_bg.alignment = PP_ALIGN.CENTER
    p_bg.font.size = Pt(10.5)
    p_bg.font.bold = True
    p_bg.font.color.rgb = FOREST_DARK
    p_bg.font.name = "Segoe UI"

    # 2. Image Container
    img_card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, img_container_left, top_y, card_w, card_h)
    img_card.fill.solid()
    img_card.fill.fore_color.rgb = CARD_WHITE
    img_card.line.color.rgb = BORDER_SOFT
    img_card.line.width = Pt(1)

    # Image header strip
    img_header = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, img_container_left, top_y, card_w, Inches(0.38))
    img_header.fill.solid()
    img_header.fill.fore_color.rgb = FOREST_PINE
    img_header.line.fill.background()

    img_title_box = slide.shapes.add_textbox(img_container_left + Inches(0.15), top_y + Inches(0.04), card_w - Inches(0.3), Inches(0.3))
    tf_it = img_title_box.text_frame
    p_it = tf_it.paragraphs[0]
    p_it.text = "🌿 Live Environmental Platform Screenshot (SafetyHub)"
    p_it.alignment = PP_ALIGN.CENTER
    p_it.font.size = Pt(10)
    p_it.font.bold = True
    p_it.font.color.rgb = MINT_LIGHT
    p_it.font.name = "Segoe UI"

    # Add Image
    img_path = os.path.join(SCREENSHOTS_DIR, image_filename)
    if os.path.exists(img_path):
        try:
            img_w = Inches(5.5)
            img_h = Inches(3.45)
            img_x = img_container_left + Inches(0.15)
            img_y = top_y + Inches(0.48)
            slide.shapes.add_picture(img_path, img_x, img_y, width=img_w, height=img_h)
        except Exception as e:
            print(f"Error adding picture {img_path}: {e}")

    # Bottom KPIs Box
    kpi_y = top_y + Inches(4.02)
    kpi_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, img_container_left + Inches(0.15), kpi_y, card_w - Inches(0.3), Inches(1.38))
    kpi_box.fill.solid()
    kpi_box.fill.fore_color.rgb = RGBColor(245, 250, 248)
    kpi_box.line.color.rgb = BORDER_SOFT
    kpi_box.line.width = Pt(1)

    tf_k = kpi_box.text_frame
    tf_k.word_wrap = True
    tf_k.margin_left = tf_k.margin_right = tf_k.margin_top = tf_k.margin_bottom = Inches(0.08)

    k_title = tf_k.paragraphs[0]
    k_title.text = "📊 Key Verified Performance Metrics & Targets:"
    k_title.alignment = PP_ALIGN.LEFT
    k_title.font.size = Pt(10)
    k_title.font.bold = True
    k_title.font.color.rgb = FOREST_DARK
    k_title.font.name = "Segoe UI"
    k_title.space_after = Pt(2)

    for kpi in kpis_list:
        p_k = tf_k.add_paragraph()
        p_k.text = f"✔ {kpi}"
        p_k.alignment = PP_ALIGN.LEFT
        p_k.font.size = Pt(9.2)
        p_k.font.color.rgb = INK_SLATE
        p_k.font.name = "Segoe UI"

def generate_sustainability_presentation():
    print("Generating Standalone Executive Sustainability Report (EN)...")
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]
    TOTAL_SLIDES = 14

    # -------------------------------------------------------------
    # SLIDE 1: Cover
    # -------------------------------------------------------------
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = FOREST_DARK
    bg1.line.fill.background()

    acc1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3))
    acc1.fill.background()
    acc1.line.color.rgb = EMERALD_LEAF
    acc1.line.width = Pt(1.5)

    if os.path.exists(LOGO_PATH):
        try:
            s1.shapes.add_picture(LOGO_PATH, Inches(5.66), Inches(1.1), height=Inches(1.2))
        except Exception:
            pass

    t_box = s1.shapes.add_textbox(Inches(1.0), Inches(2.45), Inches(11.333), Inches(1.1))
    p1 = t_box.text_frame.paragraphs[0]
    p1.text = "ICAPP Environmental Sustainability & ESG"
    p1.alignment = PP_ALIGN.CENTER
    p1.font.size = Pt(38)
    p1.font.bold = True
    p1.font.color.rgb = RGBColor(255, 255, 255)
    p1.font.name = "Segoe UI"

    s_box = s1.shapes.add_textbox(Inches(1.0), Inches(3.55), Inches(11.333), Inches(0.6))
    ps1 = s_box.text_frame.paragraphs[0]
    ps1.text = "Executive ESG Stewardship, Resource Governance & Client Assurance Report 2026"
    ps1.alignment = PP_ALIGN.CENTER
    ps1.font.size = Pt(20)
    ps1.font.bold = True
    ps1.font.color.rgb = MINT_LIGHT
    ps1.font.name = "Segoe UI"

    s_box2 = s1.shapes.add_textbox(Inches(1.0), Inches(4.25), Inches(11.333), Inches(0.5))
    ps2 = s_box2.text_frame.paragraphs[0]
    ps2.text = "International Company for Agricultural Production & Processing (ICAPP) • Powered by SafetyHub"
    ps2.alignment = PP_ALIGN.CENTER
    ps2.font.size = Pt(14.5)
    ps2.font.color.rgb = RGBColor(213, 229, 223)
    ps2.font.name = "Segoe UI"

    badge_titles = [
        "🌿 ISO 14001:2015 & 50001",
        "💧 Water Stewardship Leader",
        "♻️ 13-Stream Circular Waste",
        "📈 Real-Time Digital Metering"
    ]
    bw = Inches(2.7)
    b_gap = Inches(0.25)
    start_bx = Inches(1.0)
    for i, b_text in enumerate(badge_titles):
        bx = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, start_bx + i * (bw + b_gap), Inches(5.1), bw, Inches(0.55))
        bx.fill.solid()
        bx.fill.fore_color.rgb = FOREST_PINE
        bx.line.color.rgb = EMERALD_LEAF
        bx.line.width = Pt(1)
        p_bx = bx.text_frame.paragraphs[0]
        p_bx.text = b_text
        p_bx.alignment = PP_ALIGN.CENTER
        p_bx.font.size = Pt(11)
        p_bx.font.bold = True
        p_bx.font.color.rgb = RGBColor(255, 255, 255)
        p_bx.font.name = "Segoe UI"

    f_box = s1.shapes.add_textbox(Inches(1.0), Inches(6.0), Inches(11.333), Inches(0.5))
    p_f1 = f_box.text_frame.paragraphs[0]
    p_f1.text = "Prepared for ICAPP Executive Leadership, International Retailers, & ESG Compliance Auditors © 2026"
    p_f1.alignment = PP_ALIGN.CENTER
    p_f1.font.size = Pt(11)
    p_f1.font.color.rgb = MUTED_SAGE
    p_f1.font.name = "Segoe UI"

    # -------------------------------------------------------------
    # SLIDE 2: Strategic ESG Alignment
    # -------------------------------------------------------------
    s2 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s2, "Strategic ESG Alignment", "Corporate Sustainability Vision & Global Benchmarks", "Driving agricultural excellence through decarbonization, circularity, and resource stewardship", 2, TOTAL_SLIDES)
    add_split_slide(s2, "sus_main_en.png", "Strategic ESG Pillars & Global Frameworks", [
        "Full alignment with UN Sustainable Development Goals: Clean Water (SDG 6), Affordable Energy (SDG 7), Responsible Consumption (SDG 12), and Climate Action (SDG 13).",
        "Compliance with EU Green Deal and European Deforestation & Due Diligence regulations for high-volume agricultural food exports.",
        "Science-based decarbonization pathways aimed at minimizing Scope 1 & 2 carbon footprints across farming and industrial food processing operations.",
        "100% paperless environmental governance integrated into the SafetyHub digital ecosystem.",
        "Transparent stakeholder disclosure providing verified third-party audit evidence for global retail clients."
    ], [
        "ISO 14001:2015 Environmental Management System certified.",
        "Zero-Waste-to-Landfill initiative covering agricultural by-products.",
        "Continuous 24/7 automated resource monitoring across processing plants."
    ], "Vision: Setting the national benchmark for sustainable agri-food manufacturing", accent_color=EMERALD_LEAF)

    # -------------------------------------------------------------
    # SLIDE 3: Digital Architecture
    # -------------------------------------------------------------
    s3 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s3, "Digital Architecture", "SafetyHub Digital Environmental Platform Architecture", "Enterprise cloud architecture ensuring automated sub-metering, variance detection, and auditability", 3, TOTAL_SLIDES)
    add_split_slide(s3, "sus_main_en.png", "Digital Platform Capabilities", [
        "Sub-metered data ingestion: Real-time logging of water intake, electrical power panels, and natural gas boiler feeds.",
        "Smart automated threshold alerts: Configured to flag any consumption spike exceeding 120% of normalized baseline.",
        "Standardized monthly limits governed by executive limits: Water (10,000 m³), Electricity (50,000 kWh), and Gas (30,000 m³).",
        "Centralized immutable audit logs preventing retroactive modification of environmental compliance records.",
        "Instant one-click ESG reporting exporting audit-grade PDF and Excel analytics for international buyer audits."
    ], [
        "Threshold alert trigger set at 1.2x (120%) of historical monthly average.",
        "Realtime sub-metering across production, sanitation, and utilities.",
        "Cloud-synchronized offline resilience for remote farm field monitoring."
    ], "Technology: Real-time data integrity replacing vulnerable paper logs", accent_color=FOREST_PINE)

    # -------------------------------------------------------------
    # SLIDE 4: Live Sustainability Dashboard
    # -------------------------------------------------------------
    s4 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s4, "Executive Dashboard", "Live Sustainability Executive Dashboard Overview", "High-level visual analytics providing executive visibility over plant utility efficiency", 4, TOTAL_SLIDES)
    add_split_slide(s4, "sus_main_en.png", "Executive Dashboard Command Center", [
        "Unified multi-utility radar tracking cumulative water, electrical power, and natural gas metrics on a single screen.",
        "Dynamic year-over-year comparative analysis evaluating efficiency gains against baseline targets.",
        "Live variance gauges displaying real-time consumption against predetermined monthly threshold limits.",
        "Direct integration with plant production output to calculate specific resource intensity per metric ton.",
        "Role-based environmental access granting executive directors instant insight into resource variances."
    ], [
        "Standard limits: Water 10,000 m³/mo, Electricity 50,000 kWh/mo, Gas 30,000 m³/mo.",
        "Dynamic real-time anomaly alerts for immediate engineering intervention.",
        "Historical trends archived for multi-year ESG sustainability comparative analysis."
    ], "Intelligence: Instant executive oversight enabling rapid anomaly intervention", accent_color=EMERALD_LEAF)

    # -------------------------------------------------------------
    # SLIDE 5: Industrial Water Stewardship
    # -------------------------------------------------------------
    s5 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s5, "Water Stewardship", "Industrial Water Stewardship & Conservation Strategy", "Responsible water management across produce washing, processing, and steam generation", 5, TOTAL_SLIDES)
    add_split_slide(s5, "sus_water.png", "Water Conservation Protocols", [
        "Multi-stage counter-current washing systems minimizing fresh water intake in agricultural processing.",
        "Closed-loop evaporative cooling towers with automated conductivity bleed-off control.",
        "Condensate recovery loops reclaiming over 85% of boiler steam condensate back to feedwater tanks.",
        "Advanced industrial effluent monitoring ensuring full compliance with national environmental discharge laws.",
        "Drip irrigation optimization for contract farming partners to reduce upstream agricultural water footprints."
    ], [
        "Targeted water consumption cap: <= 10,000 m³ per operating month.",
        "Water intensity tracking: m³ of water consumed per metric ton of packaged goods.",
        "Automated sub-meter tracking across primary, processing, and service loops."
    ], "Stewardship: Preserving precious water resources through circular recovery", accent_color=AQUA_WATER)

    # -------------------------------------------------------------
    # SLIDE 6: Water Metering Register
    # -------------------------------------------------------------
    s6 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s6, "Water Register", "Water Tracking Register & Sub-Meter Analytics", "Granular digital logging of primary utility inlets, treatment units, and processing lines", 6, TOTAL_SLIDES)
    add_split_slide(s6, "sus_water.png", "Water Registry Governance in SafetyHub", [
        "Digital logging of daily meter readings with photographic verification of physical dial gauges.",
        "Granular allocation dividing water consumption between processing lines, sanitation, boiler feeds, and landscape.",
        "Automated water mass-balance calculation identifying underground pipe leaks or pump inefficiencies.",
        "Integration of water treatment chemical logs ensuring optimum microbiological and mineral purity.",
        "Certified compliance records accessible during unannounced health and food safety customer audits."
    ], [
        "Continuous daily meter logging eliminating manual logbook errors.",
        "Automatic variance alerts flagging off-hours baseline water flow.",
        "Audit-ready documentation for GlobalG.A.P. and BRCGS certifications."
    ], "Verification: Transparent sub-meter accounting validating conservation KPIs", accent_color=AQUA_WATER)

    # -------------------------------------------------------------
    # SLIDE 7: Clean Energy Transition
    # -------------------------------------------------------------
    s7 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s7, "Clean Energy", "Energy Efficiency & Power Management Strategy", "Optimizing electrical consumption across cold storage, IQF freezers, and processing lines", 7, TOTAL_SLIDES)
    add_split_slide(s7, "sus_electricity.png", "Energy Decarbonization Initiatives", [
        "High-efficiency Variable Frequency Drives (VFDs) installed on heavy ammonia refrigeration compressors.",
        "100% LED industrial smart lighting deployment with motion sensors across warehousing and processing halls.",
        "Power factor correction capacitor banks maintaining plant electrical power factor above 0.96.",
        "Peak-load shaving algorithms scheduling energy-intensive blast freezing during off-peak grid hours.",
        "Feasibility roadmap for on-site 500 kWp rooftop solar photovoltaic (PV) clean energy generation."
    ], [
        "Standard monthly electrical consumption threshold: <= 50,000 kWh/mo.",
        "Specific Energy Consumption (SEC): kWh per ton of frozen/processed crop.",
        "Power factor optimization maintaining > 0.95 to eliminate grid surcharges."
    ], "Decarbonization: Slashing energy overheads while reducing Scope 2 emissions", accent_color=SOLAR_GOLD)

    # -------------------------------------------------------------
    # SLIDE 8: Power & Electricity Register
    # -------------------------------------------------------------
    s8 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s8, "Electricity Register", "Live Electrical Energy Tracking Register", "Detailed digital documentation of transformer panels, peak demands, and shift consumption", 8, TOTAL_SLIDES)
    add_split_slide(s8, "sus_electricity.png", "Electrical Registry Features in SafetyHub", [
        "Digital monitoring of main substation transformer feeds and sub-distribution panels.",
        "Shift-by-shift electrical tracking correlating energy spikes with specific product processing runs.",
        "Automated calculation of energy costs and carbon emission equivalents (tCO2e) based on national grid factors.",
        "Preventive thermal scanning integration logging electrical panel temperatures to prevent energy waste.",
        "Exportable historical consumption profiles submitted for ISO 50001 Energy Management audits."
    ], [
        "Automated conversion from kWh to Scope 2 GHG emissions (tCO2e).",
        "Shift variance tracking highlighting machine idle power wastage.",
        "Fully aligned with international industrial energy audit standards."
    ], "Optimization: Actionable power analytics preventing idle machine energy losses", accent_color=SOLAR_GOLD)

    # -------------------------------------------------------------
    # SLIDE 9: Natural Gas & Thermal Efficiency
    # -------------------------------------------------------------
    s9 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s9, "Thermal Energy", "Clean Thermal Energy & Natural Gas Optimization", "Maximizing boiler combustion efficiency and minimizing atmospheric flue gas emissions", 9, TOTAL_SLIDES)
    add_split_slide(s9, "sus_main_en.png", "Thermal Energy Governance", [
        "High-efficiency industrial steam boilers operating on clean-burning Natural Gas to minimize SOx and particulates.",
        "Automated combustion air-fuel ratio modulation maintaining flue gas oxygen at optimum levels.",
        "Thorough thermal insulation and steam trap maintenance protocols reducing radiant pipeline heat loss by 95%.",
        "Steam metering per production line monitoring blanching, pasteurization, and cleaning-in-place (CIP) stages.",
        "Quarterly third-party flue gas emissions testing validating full compliance with Law No. 4/1994 Environmental Standards."
    ], [
        "Monthly natural gas consumption ceiling: <= 30,000 m³/mo.",
        "Over 85% boiler thermal efficiency achieved through continuous tuning.",
        "Flue gas emissions (CO, NOx, SO2) verified below statutory thresholds."
    ], "Clean Fuel: Efficient steam generation with minimal atmospheric emissions", accent_color=GAS_ORANGE)

    # -------------------------------------------------------------
    # SLIDE 10: Circular Economy & Waste
    # -------------------------------------------------------------
    s10 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s10, "Circular Economy", "Circular Economy & Total Waste Governance", "Comprehensive zero-waste strategy turning organic agricultural by-products into high-value resources", 10, TOTAL_SLIDES)
    add_split_slide(s10, "sus_waste.png", "13-Stream Circular Waste Management", [
        "13 regulated waste streams categorized in SafetyHub: Agricultural organic, plastic, cardboard, scrap metal, and hazmat.",
        "100% recycling of organic vegetable trimmings and peels into certified animal feed and nutrient-rich bio-compost.",
        "Zero-landfill policy: Non-organic recyclables (HDPE, LDPE, cartons) baled and sold to certified industrial recyclers.",
        "Hazardous waste (empty chemical drums, used oils, medical clinic waste) segregated under licensed environmental custody.",
        "Digital chain-of-custody waste disposal manifests verified and signed by authorized recycling contractors."
    ], [
        "13 distinct waste classifications managed in WasteManagement_RegularWasteTyp.",
        "Over 92% waste diversion rate achieved away from municipal landfills.",
        "Licensed hazardous waste consignment notes archived for inspection."
    ], "Circularity: Transforming processing waste streams into sustainable value", accent_color=CIRCULAR_GREEN)

    # -------------------------------------------------------------
    # SLIDE 11: Live Waste Register
    # -------------------------------------------------------------
    s11 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s11, "Waste Register", "Waste Management Live Digital Register", "Transparent digital tracking of waste weights, disposal contractors, and revenue generation", 11, TOTAL_SLIDES)
    add_split_slide(s11, "sus_waste.png", "Waste Tracking Register in SafetyHub", [
        "Direct digital logging of every outgoing waste consignment with verified weighbridge slips.",
        "Contractor licensing verification ensuring all scrap and recycling partners hold valid Environmental Agency approvals.",
        "Tracking of recycling revenue generated from recyclable scrap cardboard and plastics.",
        "Traceable hazardous waste registers maintaining cradle-to-grave manifest numbers.",
        "Annual total waste generation reports automatically compiled for national environmental regulatory filings."
    ], [
        "Weighbridge-certified digital consignment recording in SafetyHub.",
        "Verification of contractor environmental license validity before gate release.",
        "Audit compliance ready for Sedex SMETA environmental pillar reviews."
    ], "Compliance: 100% traceable disposal manifests ensuring zero environmental liability", accent_color=CIRCULAR_GREEN)

    # -------------------------------------------------------------
    # SLIDE 12: Greenhouse Gas Accounting
    # -------------------------------------------------------------
    s12 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s12, "Carbon Footprint", "Greenhouse Gas (GHG) Accounting & Decarbonization", "Rigorous carbon measurement across Scope 1, 2, and 3 emissions aligned with GHG Protocol", 12, TOTAL_SLIDES)
    add_split_slide(s12, "sus_main_en.png", "Corporate GHG Emissions Accounting", [
        "Scope 1 (Direct Emissions): Combustion of natural gas in boilers, company vehicle fuels, and backup generators.",
        "Scope 2 (Indirect Emissions): Purchased grid electricity driving plant refrigeration and packaging automation.",
        "Scope 3 (Value Chain): Tracking raw crop transport logistics, packaging raw materials, and waste logistics.",
        "Carbon Intensity Index: Calculating kilograms of CO2 equivalent per kilogram of finished agricultural product.",
        "Decarbonization Roadmap: Aiming for 25% carbon intensity reduction by 2030 through solar PV and heat recovery."
    ], [
        "Direct calculation of Scope 1 & 2 carbon footprint metrics in SafetyHub.",
        "Aligned with GHG Protocol Corporate Standard and ISO 14064 principles.",
        "Provides European retail buyers with verified product carbon footprint data."
    ], "Climate Action: Measurable carbon reduction targets supporting global Net-Zero", accent_color=FOREST_PINE)

    # -------------------------------------------------------------
    # SLIDE 13: International Accreditations
    # -------------------------------------------------------------
    s13 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s13, "Compliance & Assurance", "International Accreditations & Client Environmental Assurance", "Certified compliance providing international buyers with uncompromised supply chain confidence", 13, TOTAL_SLIDES)
    add_split_slide(s13, "sus_main_en.png", "Global Certifications & Client Assurance", [
        "ISO 14001:2015: Certified Environmental Management System governing all industrial food processing operations.",
        "GlobalG.A.P. & Integrated Farm Assurance (IFA): Ensuring sustainable farming, soil conservation, and zero pesticide drift.",
        "Sedex SMETA 4-Pillar Certified: Validating environmental governance, labor safety, ethics, and human rights.",
        "BRCGS Food Safety & Packaging Standards: Ensuring hygienic and environmentally sustainable packaging operations.",
        "Client Environmental Transparency: Offering real-time compliance dashboards for auditing teams from top tier retailers."
    ], [
        "Verified compliance with 40 mandatory legal & statutory registers in SafetyHub.",
        "Zero environmental non-conformances across recent third-party audits.",
        "Continuous client assurance supporting agricultural exports to 30+ countries."
    ], "Assurance: Verified audit credentials delivering trusted partnership to global brands", accent_color=EMERALD_LEAF)

    # -------------------------------------------------------------
    # SLIDE 14: 2026-2030 Roadmap & Conclusion
    # -------------------------------------------------------------
    s14 = prs.slides.add_slide(blank_layout)
    add_sus_header_footer(s14, "Roadmap & Contacts", "2026-2030 Sustainability Targets & Executive Contacts", "A quantified roadmap delivering environmental stewardship, operational savings, and client value", 14, TOTAL_SLIDES)
    add_split_slide(s14, "sus_main_en.png", "Targets, Executive ROI & Inquiries", [
        "-20% Water Consumption Intensity per metric ton achieved by end of 2027.",
        "-15% Electricity Intensity through solar PV deployment and variable frequency drives.",
        "95%+ Solid Waste Diversion Rate maintaining circular organic bio-composting.",
        "Tangible Business ROI: Eliminating resource wastage, lowering utility overheads, and safeguarding export quotas.",
        "Dedicated ESG Leadership: Ready to support international client audits and joint decarbonization initiatives."
    ], [
        "Executive Leadership: Director of Environmental Sustainability & HSE.",
        "Direct Contact: Yasser.diab@icapp.com.eg | ICAPP Headquarters.",
        "Supported by SafetyHub Environmental Intelligence Engine (HSEHub360)."
    ], "Commitment: ICAPP — Sustaining the Earth, Nurturing the Future", accent_color=FOREST_DARK)

    out_sus = os.path.join(PROJECT_ROOT, "SafetyHub_ICAPP_Environmental_Sustainability_Executive_Report_EN.pptx")
    prs.save(out_sus)
    print(f"Standalone Sustainability Report saved: {out_sus} ({len(prs.slides)} slides)")

if __name__ == "__main__":
    generate_sustainability_presentation()
