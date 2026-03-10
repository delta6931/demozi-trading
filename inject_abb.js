const abbProducts = [
    { "id": "abb_rb_1", "name": "ABB IRB 1200 Industrial Robot", "brand": "ABB", "category": "Robotics", "description": "<p>Compact, flexible, and fast industrial robot for material handling and machine tending.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_rb_2", "name": "ABB IRB 6700 High Payload Robot", "brand": "ABB", "category": "Robotics", "description": "<p>High performance robot family in the 150-300 kg class. Lowest total cost of ownership.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_rb_3", "name": "ABB OmniCore V250XT Controller", "brand": "ABB", "category": "Robotics", "description": "<p>Next-generation robot controller delivering best-in-class motion control.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_drv_1", "name": "ABB ACS880 Industrial Drive", "brand": "ABB", "category": "Drives", "description": "<p>All-compatible drives designed to tackle any motor-driven application in any industry.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_drv_2", "name": "ABB ACS580 General Purpose Drive", "brand": "ABB", "category": "Drives", "description": "<p>Plug-in ready to control your compressors, conveyors, mixers, pumps and fans.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_drv_3", "name": "ABB ACS380 Machinery Drive", "brand": "ABB", "category": "Drives", "description": "<p>Compact machinery drives optimized for machine building with excellent motor control.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_mtr_1", "name": "ABB Baldor-Reliance Super-E Motor", "brand": "ABB", "category": "Motors", "description": "<p>NEMA Super-E Premium efficient motors designed for energy savings.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_mtr_2", "name": "ABB M2BAX Standard Process Motor", "brand": "ABB", "category": "Motors", "description": "<p>High efficiency low voltage AC motors for everyday industrial applications.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_mtr_3", "name": "ABB NXR High Voltage Rib Cooled Motor", "brand": "ABB", "category": "Motors", "description": "<p>Safe and reliable high voltage motor series for heavy industry applications.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_ctrl_1", "name": "ABB AC500 PLC", "brand": "ABB", "category": "Control Systems", "description": "<p>Scalable PLC offering high performance capability for complex machine systems.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_ctrl_2", "name": "ABB System 800xA DCS", "brand": "ABB", "category": "Control Systems", "description": "<p>Distributed Control System designed for large-scale automation and process control.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_ctrl_3", "name": "ABB AC800M Controller", "brand": "ABB", "category": "Control Systems", "description": "<p>Flexible, modular controller for System 800xA and Compact Product Suite.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_lv_1", "name": "ABB Tmax XT Molded Case Circuit Breaker", "brand": "ABB", "category": "Low Voltage", "description": "<p>Advanced MCCB offering high breaking capacity and advanced protection trip units.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_lv_2", "name": "ABB Emax 2 Air Circuit Breaker", "brand": "ABB", "category": "Low Voltage", "description": "<p>Smart air circuit breaker that manages power distribution and energy efficiency.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_lv_3", "name": "ABB AF Contactor", "brand": "ABB", "category": "Low Voltage", "description": "<p>Industrial contactor featuring electronic coil interface accepting wide voltage range.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_inst_1", "name": "ABB 266 Series Pressure Transmitter", "brand": "ABB", "category": "Instrumentation", "description": "<p>Smart pressure transmitter delivering accurate and reliable process measurement.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_inst_2", "name": "ABB ProcessMaster Electromagnetic Flowmeter", "brand": "ABB", "category": "Instrumentation", "description": "<p>Robust magnetic flowmeter designed for the challenging applications in process industries.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_inst_3", "name": "ABB LWT310 Guided Wave Radar", "brand": "ABB", "category": "Instrumentation", "description": "<p>Level measurement transmitter featuring advanced SignalIQ technology.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_ana_1", "name": "ABB Advance Optima Continuous Gas Analyzer", "brand": "ABB", "category": "Analyzers", "description": "<p>Modular gas analyzer system for monitoring process and emissions.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" },
    { "id": "abb_ana_2", "name": "ABB Endura AZ20 Oxygen Analyzer", "brand": "ABB", "category": "Analyzers", "description": "<p>In situ combustion gas analyzer for precise control of combustion efficiency.</p>", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/1200px-ABB_logo.svg.png" }
];

const fs = require('fs');
const jsFile = 'products-data.js';
let content = fs.readFileSync(jsFile, 'utf8');

// Find the last index of '];' and inject the new products
const endIndex = content.lastIndexOf('];');
if (endIndex !== -1) {
    let newItemsStr = abbProducts.map(p => JSON.stringify(p)).join(',\n    ');
    // Check if the array already has items, if so add a comma
    const hasItems = content.substring(0, endIndex).trim().endsWith('}');
    if (hasItems) {
        newItemsStr = ',\n    ' + newItemsStr;
    } else {
        newItemsStr = '\n    ' + newItemsStr;
    }

    // Inject at the end of the array but before the closing bracket
    const injectedContent = content.substring(0, endIndex) + newItemsStr + '\n' + content.substring(endIndex);
    fs.writeFileSync(jsFile, injectedContent, 'utf8');
    console.log("Successfully injected " + abbProducts.length + " ABB products.");
} else {
    console.error("Could not find the end of productsData array.");
}
