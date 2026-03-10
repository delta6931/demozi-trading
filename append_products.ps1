$file = "products-data.js"
$content = Get-Content $file -Raw -Encoding UTF8

$target = @"
    { "id": "abb_ana_2", "name": "ABB Endura AZ20 Oxygen Analyzer", "brand": "ABB", "category": "Analyzers", "description": "<p>In situ combustion gas analyzer for precise control of combustion efficiency.</p>", "imageUrl": "assets/placeholder.jpg" }
];

window.productsData = productsData;
"@

$replacement = @"
    { "id": "abb_ana_2", "name": "ABB Endura AZ20 Oxygen Analyzer", "brand": "ABB", "category": "Analyzers", "description": "<p>In situ combustion gas analyzer for precise control of combustion efficiency.</p>", "imageUrl": "assets/placeholder.jpg" },
    { "id": "ab_plc_1", "name": "Allen Bradley ControlLogix 5580 Controller", "brand": "Allen Bradley", "category": "Controllers", "description": "<p>High performance multi-discipline control for discrete, motion, process and safety applications.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "ab_drv_1", "name": "Allen Bradley PowerFlex 525 AC Drive", "brand": "Allen Bradley", "category": "Drives", "description": "<p>Compact AC drive ideal for machines with simple system integration.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "ab_hmi_1", "name": "Allen Bradley PanelView Plus 7 Performance", "brand": "Allen Bradley", "category": "HMI", "description": "<p>Graphic terminal for visualization and machine control.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "fox_tx_1", "name": "Foxboro IGP10 Absolute Pressure Transmitter", "brand": "Foxboro", "category": "Instrumentation", "description": "<p>Intelligent two-wire transmitter provides precise, reliable measurement of absolute pressure.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "fox_tx_2", "name": "Foxboro IDP10 Differential Pressure Transmitter", "brand": "Foxboro", "category": "Instrumentation", "description": "<p>High performance d/p Cell transmitter.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "hon_ctrl_1", "name": "Honeywell Experion PKS C300 Controller", "brand": "Honeywell", "category": "Automation", "description": "<p>Advanced process controller providing robust and deterministic control.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "hon_tx_1", "name": "Honeywell ST 3000 Smart Pressure Transmitter", "brand": "Honeywell", "category": "Instrumentation", "description": "<p>Smart absolute pressure transmitter for precise tracking of process variables.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "rm_flow_1", "name": "Rosemount 8700 Magnetic Flow Meter", "brand": "Rosemount", "category": "Instrumentation", "description": "<p>Magnetic flowmeter offering advanced diagnostics and reliable flow measurement.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "rm_press_1", "name": "Rosemount 3051S Series of Instrumentation", "brand": "Rosemount", "category": "Instrumentation", "description": "<p>Scalable pressure, flow, and level measurement solutions tailored to your process.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "eh_flow_1", "name": "Endress+Hauser Promass 83F Coriolis Mass Flowmeter", "brand": "Endress+Hauser", "category": "Instrumentation", "description": "<p>Highly accurate measurement of mass flow, density, temperature and viscosity.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "eh_level_1", "name": "Endress+Hauser Micropilot FMR50 Radar Level Transmitter", "brand": "Endress+Hauser", "category": "Instrumentation", "description": "<p>Non-contact radar for continuous level measurement in liquids.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "bn_vib_1", "name": "Bently Nevada 3500 Machinery Protection System", "brand": "Bentley Nevada", "category": "Monitoring", "description": "<p>Continuous, online monitoring system for machinery protection and condition monitoring.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "bn_sens_1", "name": "Bently Nevada 3300 XL 8mm Proximity Transducer System", "brand": "Bentley Nevada", "category": "Sensors", "description": "<p>Standard for measuring vibration, position, and speed on fluid-film bearing machines.</p>", "imageUrl": "assets/placeholder.jpg"},
    { "id": "ov_ctrl_1", "name": "Ovation OCR400 Controller", "brand": "Ovation", "category": "Automation", "description": "<p>High-performance controller for the Ovation expert control system by Emerson.</p>", "imageUrl": "assets/placeholder.jpg"}
];

window.productsData = productsData;
"@

$content = $content.Replace($target, $replacement)
Set-Content $file -Value $content -Encoding UTF8
Write-Host "Success"
