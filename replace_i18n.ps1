$file = "C:\Users\garbarking\.gemini\antigravity\scratch\demozi\i18n.js"

$newEnBlock = @"
    en: {
        nav_about: "About Us",
        nav_divisions: "Our Expertise",
        nav_industrial: "Industrial Sensors",
        nav_cosmetics: "Factory Automation",
        nav_logistics: "Safety Solutions",
        nav_partners: "Partners",
        nav_products: "Products",
        nav_contact: "Contact Us",
        full_catalog: "Full Catalog",
        spare_parts: "Spare Parts",
        hero_title: "Demozi Company",
        search_label: "Search Catalog:",
        search_placeholder: "e.g. AECO FT13-CF NPN...",

        hero_badge: "Supplying the Middle East",
        hero_title_1: "Your Trusted",
        hero_title_2: "Automation & Sensor",
        hero_title_3: "Provider",
        hero_subtitle: "Delivering high-performance industrial components, proximity probes, and intelligent sensors from world-renowned brands.",
        hero_btn_industrial: "Explore Catalog",
        hero_btn_cosmetics: "Contact Sales",

        about_title: "Who We Are",
        about_p1: "Demozi is a specialized supplier of premier industrial automation components, ensuring factories and manufacturing plants operate at maximum efficiency. Based in the Middle East, our technical team works closely with engineers to source critical parts.",
        about_p2: "We focus entirely on high-quality sensors, vibration monitoring, cables, and process intelligence tools to keep your production lines moving without interruption.",
        stat_1_val: "400+",
        stat_1_text: "Products in Stock",
        stat_2_val: "Fast",
        stat_2_text: "Regional Delivery",
        stat_3_val: "Premium",
        stat_3_text: "Global Brands",

        div_title: "Our Product Focus",
        div_subtitle: "Specialized expertise providing top-tier industrial components.",

        div_ind_title: "Inductive & Photoelectric Sensors",
        div_ind_desc: "We supply a vast array of high-precision sensors for object detection across varying manufacturing environments, relying on brands like IFM and SICK.",
        div_ind_f1: "Inductive Sensors",
        div_ind_f2: "Reflector Photoelectrics",
        div_ind_f3: "Contrast Sensors",

        div_cos_title: "Vibration & Proximity Monitoring",
        div_cos_desc: "Protect your heavy machinery with our extensive selection of piezoelectric accelerometers, proximity probes, and condition monitoring modules from Parker Meggitt.",
        div_cos_f1: "Proximity Probes (TQ series)",
        div_cos_f2: "Piezoelectric Sensors",
        div_cos_f3: "VM600 Monitoring Racks",

        div_log_title: "Signal Conditioners & Accessories",
        div_log_desc: "Ensure clean data transmission and reliable power delivery with our industrial networking supplies, high-temperature cables, and junction boxes.",
        div_log_f1: "Signal Conditioners",
        div_log_f2: "Extension Cables",
        div_log_f3: "Mounting Adaptors",

        contact_title: "Contact Us",
        contact_subtitle: "Reach out to our offices for technical support or sales inquiries.",
        contact_form_legend: "Send a Message",
        contact_name: "Name:",
        contact_email: "Email:",
        contact_message: "Message:",
        contact_submit: "Submit",
        contact_info_title: "Office Information",
        contact_hq: "Headquarters:",
        contact_branch: "Regional Office:",
        contact_address_ist: "Istanbul, Turkey",
        contact_address_irq: "Baghdad road, Kirkuk, Iraq, 36001",
        contact_phone: "Phone:",
        footer_text: "© 2026 Demozi Company. All rights reserved.",

        brands_page_title: "Demozi | Our Brand Partners",
        brands_heading_main: "Our Brand Partners",
        brands_subtitle: "We are proud to distribute and work alongside the following industry-leading global brands in factory automation."
    },
"@

$content = Get-Content -Raw -Path $file
$modifiedContent = $content -replace 'en:\s*\{[\s\S]*?(?=^\s*tr: \{)m', $newEnBlock
Set-Content -Path $file -Value $modifiedContent -Encoding UTF8
