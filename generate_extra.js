const parts = [
  // Page 7 (O-Ring and Spacers)
  { name: "O-RING NOZZLE PLATE FOR NZ PRINTHEAD 48 DOT", desc: "O-RING GRUPPO UGELLI TESTA NZ 48 PUNTI", code: "10IDORI20502", price: "36,04", img: "img51.jpg" },
  { name: "SPACER BLOCK FOR NZ PRINTHEAD 16 DOT", desc: "DISTANZIALE TESTA NZ 16 PUNTI", code: "20MCDISNZ161", price: "12,22", img: "img52.jpg" },
  { name: "PLUNGER WITH RUBBER TIP AND SPRING FOR NZR PRINTHEAD", desc: "PERNO TESTA NZR COMPLETO DI MOLLA E GOMMINO", code: "30CMZAFI5000", price: "26,75", img: "img54.jpg" },
  { name: "SPRING FOR PLUNGER FOR NZ/NZ 2.0 PRINTHEAD", desc: "MOLLA PER PERNO TESTA NZ/NZ 2.0", code: "20CMMLCP0001", price: "5,41", img: "img58.jpg" },
  
  // Page 8
  { name: "SMALL RUBBER TIP FOR PLUNGER FOR NZ PRINTHEAD", desc: "GOMMINO PICCOLO PER PERNO TESTA NZ", code: "20IDGOMNZP01", price: "7,34", img: "img62.jpg" },
  { name: "SMALL RUBBER TIP FOR PLUNGER FOR NZR PRINTHEAD", desc: "GOMMINO PICCOLO PER PERNO TESTA NZR", code: "20IDGOMNZP02", price: "8,34", img: "img66.jpg" },
  { name: "STAINLESS STEEL SHORT TUBE FOR NZ PRINTHEAD", desc: "TUBETTO CORTO INOX TESTA NZ", code: "30MCTUBNZ001", price: "16,73", img: "img67.jpg" },
  { name: "STAINLESS STEEL LONG TUBE FOR FOR NZ PRINTHEAD", desc: "TUBETTO LUNGO INOX TESTA NZ", code: "30MCTUBNZ002", price: "18,02", img: "img69.jpg" },
  { name: "SOLENOID FOR PRINTHEAD NZ/NZP/NZ2.0", desc: "SOLENOIDE TESTA NZ/NZP/NZ2.0", code: "20EMACXX0006", price: "132,58", img: "img71.jpg" },
  { name: "STAINLESS STEEL NUT WITH WASHER FOR SOLENOID LOCKING", desc: "DADO INOX CON RONDELLA PER BLOCCAGGIO SOLENOIDE", code: "30IDGHIRON01", price: "8,40", img: "img73.jpg" },
  { name: "PURGE SWITCH WITH CABLE FOR NZ PRINTHEAD", desc: "PULSANTE SPURGO COMPLETO DI CAVI PER TESTA NZ", code: "20ELPULNZ001", price: "41,19", img: "img75.jpg" },
  { name: "5 PIN FEMALE BAYONET CONNECTOR WITH CABLE", desc: "CONNETTORE INNESTO A BAIONETTA 5 PIN F CABLATO", code: "20ELCON05F01", price: "36,04", img: "img76.jpg" },
  { name: "PLASTIC PASSING FITTING TUBE 4X2,5 FOR NZ PRINTHEAD INK INLET", desc: "RACCORDO IN PLASTICA PASSANTE TUBO 4X2,5 PER INGRESSO INCHIOSTRO TESTA NZ", code: "10IDRACP8301", price: "14,17", img: "img80.jpg" },

  // Page 9
  { name: "BLEED BUTTON FOR NZP/NZ2.0 HEAD", desc: "BOTTONE DI SPURGO PER TESTA NZP/NZ2.0", code: "20ELBOTNZ001", price: "49,28", img: "img82.jpg" },
  { name: "PURGE BUTTON FOR 7/16 DOTS NZP/NZR/NZ 2.0 PRINTHEAD", desc: "PULSANTE DI SPURGO PER TESTE 7/16 PUNTI NZP/NZR/NZ 2.0", code: "30EMITPS0014", price: "43,69", img: "img83.jpg" },
  { name: "PURGE BUTTON FOR 32 DOTS NZP/NZR/NZ 2.0 PRINTHEAD", desc: "PULSANTE DI SPURGO PER TESTA 32 PUNTI NZP/NZ 2.0", code: "30EMITPS0015", price: "43,69", img: "img85.jpg" },
  { name: "PHOTOCELL FEMALE CONNECTOR FOR NZP PRINTHEAD", desc: "CONNETTORE FOTOCELLULA F PER TESTA NZP", code: "30ELCONM8001", price: "41,46", img: "img87.jpg" },
  { name: "QUICK RELEASE PIPE CONNECTOR 6X4 MALE WITH CHECK VALVE FOR PRINTHEAD NZP/NZ2.0", desc: "CONNETTORE PER TUBO A SGANCIO RAPIDO 6X4 MASCHIO CON VALVOLA DI NON RITORNO PER TESTINA DI STAMPA NZP/NZ 2.0", code: "10RCRIRA0001", price: "29,74", img: "img89.jpg" },
  { name: "QUICK RELEASE PASSWALL CONNECTOR MALE 6X4 WITH CHECK VALVE FOR PRINTHEAD NZP/NZ2.0", desc: "CONNETTORE PASSAPARETE A SGANCIO RAPIDO MASCHIO 6X4 CON VALVOLA DI NON RITORNO PER TESTA DI STAMPA NZP/NZ 2.0", code: "10RCRIRA0002", price: "49,83", img: "img90.jpg" },
  { name: "QUICK RELEASE PASSWALL CONNECTOR FEMALE 6X4 WITH CHECK VALVE FOR PRINTHEAD NZP/NZ 2.0", desc: "CONNETTORE PASSAPARETE A SGANCIO RAPIDO FEMMINA 6X4 CON VALVOLA DI NON RITORNO PER TESTA DI STAMPA NZP/NZ 2.0", code: "10RCRIRA0006", price: "41,93", img: "img91.jpg" },
  { name: "QUICK RELEASE PIPE CONNECTOR 6X4 FEMALE WITH CHECK VALVE FOR PRINTHEAD NZP/NZ 2.0", desc: "CONNETTORE PER TUBO A SGANCIO RAPIDO 6X4 FEMMINA CON VALVOLA DI NON RITORNO PER TESTINA DI STAMPA NZP/NZ 2.0", code: "10RCRIRA0004", price: "30,94", img: "img92.jpg" },
  { name: "PRESSURE GAUGE 0-1 BAR FOR AIR REGULATOR", desc: "MANOMETRO 0-1 BAR PER REGOLATORE ARIA", code: "10IDMAN50011", price: "21,15", img: "img96.jpg" },

  // Page 10
  { name: "PRESSURE GAUGE 0-12 BAR FOR FILTER AIR REGULATOR", desc: "MANOMETRO 0-12 BAR PER FILTRO REGOLATORE ARIA", code: "10IDMAN50012", price: "21,15", img: "img97.jpg" },
  { name: "NEUTRAL PE PIPE DIAM 4X2,5MM", desc: "TUBO PE NEUTRO 4X2,5MM", code: "10IDTUBP4X22", price: "2,71", img: "img99.jpg" },
  { name: "25 PIN CONNECTOR FOR PRINTHEAD NZ/NZP/NZR/NZ 2.0", desc: "CONNETTORE 25 PIN PER TESTA NZ/NZP/NZR/NZ 2.0", code: "10RCCNVA0011", price: "8,50", img: "img100.jpg" },
  { name: "COVER SOLENOID FOR Z101 LITE", desc: "CARTER SOLENOIDI PER SERIE Z101 LITE", code: "50MCMOB101L9", price: "78,32", img: "img104.jpg" },
  { name: "SPACER BLOCK FOR Z101 LITE", desc: "DISTANZIALE UGELLI PER Z101 LITE", code: "20MCMOB101L9", price: "17,91", img: "img106.jpg" },
  { name: "COMPLETE SOLENOID FOR Z101 LITE", desc: "SOLENOIDE COMPLETO PER Z101 LITE", code: "20ELELTNZ003", price: "133,08", img: "img107.jpg" },
  { name: "CROSS CLAMP FOR TUBE SUPPORT DIAM. 30MM", desc: "MORSETTO A CROCE SUPPORTO TUBO DIAM. 30MM", code: "10CASTMT0001", price: "34,83", img: "img109.jpg" },
  { name: "FLANGE CLAMP FOR TUBE FIXING DIAM. 30MM", desc: "MORSETTO A FLANGIA FISSAGGIO TUBO DIAM.30MM", code: "10CASTMT0013", price: "29,79", img: "img111.jpg" },
  { name: "FLANGE CLAMP DIAM. 18MM", desc: "MORSETTO A FLANGIA DIAM. 18MM", code: "10CASTMT0015", price: "12,08", img: "img12.jpg" },

  // Page 11
  { name: "INTERNAL NZ PRINTHEAD BRACKET", desc: "KIT MORSETTO TESTA DI STAMPA NZ", code: "30MCKITNZ001", price: "56,27", img: "img127.jpg" },
  { name: "CONNECTING CABLE 3 MT. SORTING LINE - PRINTHEAD", desc: "CAVO ML. 3 CONNESSIONE LINEA DI SCELTA - TESTA DI STAMPA", code: "50ELCAV00017", price: "58,22", img: "img129.jpg" },
  { name: "NZ 7 AND 16 DOTS PRINTHEAD TILT BRACKET KIT", desc: "KIT STAFFA ROTAZIONE TESTA NZ STANDARD", code: "30CASTAF0023", price: "171,75", img: "img130.jpg" },
  { name: "CLIP FOR PHOTOCELL - PRINTHEAD NZ/NZP/NZR/NZ 2.0/GRAPHJET", desc: "CLIP FOTOCELLULA PER TESTA NZ/NZP/NZR/NZ 2.0/GRAPHJET", code: "20CASUMC0056", price: "5,41", img: "img14.jpg" },

  // Page 12
  { name: "INSERTING TOOL FOR SMALL RUBBER TIP", desc: "ATTREZZO PER INSERIMENTO GOMMINO PICCOLO", code: "30ACKITGOM01", price: "182,00", img: "img19.jpg" },
  { name: "INSERTING TOOL FOR LARGE RUBBER TIP - PRINTHEAD NZ2.0", desc: "ATTREZZO PER INSERIMENTO GOMMINO GRANDE", code: "30ACKITGOM02", price: "182,00", img: "img21.jpg" },
  { name: "CLEANING WIRE FOR NOZZLE PLATE (1 MT)", desc: "FILO ARMONICO PER PULIZIA UGELLI, ML. 1", code: "40ACKITFIL01", price: "9,00", img: "img22.jpg" },
  { name: "HOLDER FOR NOZZLE CLEANING WIRE", desc: "SUPPORTO A MANDRINO COMPLETO PER FILO ARMONICO", code: "30MCSUPKIT02", price: "44,24", img: "img24.jpg" },
  { name: "CRIMPING PLIERS FOR ARTICULATION CRIMP - PRINTHEAD NZ/NZP/NZR/NZ2.0/Z101", desc: "PINZA PER CRIMPATURA RONDELLA DI MOVIMENTO", code: "30VAATXX0021", price: "707,49", img: "img28.jpg" },
  { name: "EXTRACTOR FOR SOLENOID CONTACT PIN - PRINTHEAD NZ/NZP/NZR/NZ2.0", desc: "ESTRATTORE PER CONTATTI SOLENOIDE TESTA NZ/NZP/NZR/NZ2.0", code: "20VAATXX0022", price: "26,40", img: "img30.jpg" }
];

const fs = require('fs');
let data = fs.readFileSync('spare-parts-data.js', 'utf8');

// We simply map parts to object literals and push them
let codeToAppend = parts.map((p, i) =>     {
        "id": "sp_zanasi_extra_",
        "name": "",
        "brand": "ZANASI",
        "category": "Spare Parts",
        "description": "<p><br><strong>Code:</strong> <br><strong>Price:</strong>  €</p>",
        "imageUrl": "spare_parts_catalog/ilovepdf_images-extracted/"
    }).join(',\n');

// Find the last ] in spare-parts-data.js
let spliceIndex = data.lastIndexOf('];');
if (spliceIndex !== -1) {
    let newData = data.substring(0, spliceIndex) + ",\n" + codeToAppend + "\n];\n" + data.substring(spliceIndex + 2);
    fs.writeFileSync('spare-parts-data.js', newData);
    console.log("Successfully appended parts!");
} else {
    console.log("Error: could not find array end.");
}
