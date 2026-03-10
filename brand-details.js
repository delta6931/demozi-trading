// Supplemental rich data for top brands. 
// For brands not perfectly matched here, the system dynamically guesses their domain and generates a fallback description.

const brandDetails = {
    "siemens": { domain: "siemens.com", desc: "Siemens is a global powerhouse focusing on the areas of electrification, automation and digitalization, providing innovative solutions for the process and manufacturing industries." },
    "festo": { domain: "festo.com", desc: "Festo is a leading world-wide supplier of automation technology and the performance leader in industrial training and education programs." },
    "allen-bradley": { domain: "rockwellautomation.com", desc: "Allen-Bradley, a flagship brand of Rockwell Automation, provides robust industrial automation, motor control, and sensing solutions." },
    "yaskawa": { domain: "yaskawa.com", desc: "Yaskawa is a leading global manufacturer of factory automation products, including AC drives, servo motors, machine controllers, and industrial robotics." },
    "omron": { domain: "omron.com", desc: "Omron is a global leader in the field of automation based on its core technology of 'Sensing and Control + Think'." },
    "keyence": { domain: "keyence.com", desc: "Keyence is a leading supplier of advanced sensors, measuring systems, laser markers, microscopes, and machine vision systems worldwide." },
    "smc": { domain: "smcworld.com", desc: "SMC is the world's leading expert in pneumatics, providing cutting-edge automation solutions for incredibly diverse industries." },
    "wika": { domain: "wika.com", desc: "WIKA is a global market leader in pressure, temperature, and level measurement technology, setting standards in calibration." },
    "danfoss": { domain: "danfoss.com", desc: "Danfoss engineers advanced technologies that enable the world of tomorrow to do more with less, focused on energy efficiency and climate solutions." },
    "mitsubishi": { domain: "mitsubishielectric.com", desc: "Mitsubishi Electric is a recognized world leader in the manufacture, marketing and sales of advanced electrical and electronic equipment used in industrial automation." },
    "sick": { domain: "sick.com", desc: "SICK is one of the world's leading solutions providers for sensor-based applications in the industrial sector." },
    "wago": { domain: "wago.com", desc: "WAGO is a global leader in spring pressure connection technology and modular automation solutions." },
    "weidmuller": { domain: "weidmuller.com", desc: "Weidmüller is a leading provider of solutions for electrical connectivity, transmission, and conditioning of power, signals, and data in industrial environments." },
    "asam-beauty": { domain: "asambeauty.com", desc: "Asam Beauty is a leading German cosmetics brand offering high-quality, scientifically proven skincare and beauty products." },
    "tresan": { domain: "tresan.com", desc: "Tresan is renowned for its natural hair care products, utilizing rich herbal extracts to promote healthy vitality." },
    "bestcode": { domain: "bestcode.com", desc: "BestCode products print high-speed reliable marks and codes on industrial and consumer goods to ensure global traceability." },
    "topjet": { domain: "topjet.com.tr", desc: "TopJet provides innovative, high-performance inkjet printing solutions specifically tailored for industrial coding and marking." },
    "ifm-electronic": { domain: "ifm.com", desc: "ifm electronic is a global supplier of innovative sensors, networking, and control systems tailored to optimize industrial processes." },
    "pepperl-fuchs": { domain: "pepperl-fuchs.com", desc: "Pepperl+Fuchs is known by customers around the world as a pioneer and an innovator in electrical explosion protection and sensor technology." },
    "endress-hauser": { domain: "endress.com", desc: "Endress+Hauser is a global leader in measurement instrumentation, services and solutions for industrial process engineering." },
    "honeywell": { domain: "honeywell.com", desc: "Honeywell invents and manufactures technologies to address tough challenges linked to global macrotrends such as safety, security, and energy." },
    "phoenix-contact": { domain: "phoenixcontact.com", desc: "Phoenix Contact is a global market leader and innovator in the field of electrical engineering and automation." },
    "bosch-aventics": { domain: "aventics.com", desc: "AVENTICS (a brand of Emerson / Bosch) is one of the world’s leading product brands for pneumatic components and systems." },
    "sew-euro-drive": { domain: "sew-eurodrive.com", desc: "SEW-EURODRIVE is a leading company in the field of drive engineering, providing tailor-made motion solutions." },
    "turck": { domain: "turck.com", desc: "Turck is a global leader in industrial automation technology, providing sensors, connectivity, and fieldbus technology." },
    "beckhoff": { domain: "beckhoff.com", desc: "Beckhoff implements open automation systems based on PC Control technology." },
    "baumer": { domain: "baumer.com", desc: "The Baumer Group is an international leading manufacturer of sensors, encoders, measuring instruments and components for automated image processing." },
    "balluff": { domain: "balluff.com", desc: "Balluff stands for comprehensive systems expertise from a single source, providing top-quality sensor, identification and networking solutions." },
    "crouzet-crydom": { domain: "crouzet.com", desc: "Crouzet is an independent manufacturer of mechatronic components for demanding applications in Aerospace & Transportation, Energy, Building and Machinery Industry." },
    "pilz": { domain: "pilz.com", desc: "Pilz is a global technology leader in safe automation, offering products and solutions for human, machine, and environmental safety." },
};

window.brandDetails = brandDetails;
