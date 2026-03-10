import json
import io

existing = [
    { "id": "ac-motoren", "name": "AC-MOTOREN", "category": "industrial" },
    { "id": "aeco", "name": "AECO", "category": "industrial" },
    { "id": "allen-bradley", "name": "ALLEN-BRADLEY", "category": "industrial" },
    { "id": "asam-beauty", "name": "ASAM BEAUTY", "category": "cosmetics" },
    { "id": "ascon-technologic", "name": "ASCON-TECHNOLOGIC", "category": "industrial" },
    { "id": "balluff", "name": "BALLUFF", "category": "industrial" },
    { "id": "baumer", "name": "BAUMER", "category": "industrial" },
    { "id": "beckhoff", "name": "BECKHOFF", "category": "industrial" },
    { "id": "belimo", "name": "BELIMO", "category": "industrial" },
    { "id": "benedict-jager", "name": "BENEDICT-JAGER", "category": "industrial" },
    { "id": "bernstein", "name": "BERNSTEIN", "category": "industrial" },
    { "id": "bestcode", "name": "BESTCODE", "category": "industrial" },
    { "id": "bimaks-chemical", "name": "BIMAKS CHEMICAL", "category": "industrial" },
    { "id": "camlogic", "name": "CAMLOGIC", "category": "industrial" },
    { "id": "danfoss", "name": "DANFOSS", "category": "industrial" },
    { "id": "datalogic-datasensor", "name": "DATALOGIC-DATASENSOR", "category": "industrial" },
    { "id": "di-soric", "name": "DI-SORIC", "category": "industrial" },
    { "id": "ebmpapst", "name": "EBMPAPST", "category": "industrial" },
    { "id": "elap", "name": "ELAP", "category": "industrial" },
    { "id": "elcis", "name": "ELCIS", "category": "industrial" },
    { "id": "elobau", "name": "ELOBAU", "category": "industrial" },
    { "id": "eltra", "name": "ELTRA", "category": "industrial" },
    { "id": "emas-group", "name": "EMAS-GROUP", "category": "industrial" },
    { "id": "endress-hauser", "name": "ENDRESS-HAUSER", "category": "industrial" },
    { "id": "epa", "name": "EPA", "category": "industrial" },
    { "id": "epe", "name": "EPE", "category": "industrial" },
    { "id": "euchner", "name": "EUCHNER", "category": "industrial" },
    { "id": "festo", "name": "FESTO", "category": "industrial" },
    { "id": "finder", "name": "FINDER", "category": "industrial" },
    { "id": "fluke", "name": "FLUKE", "category": "industrial" },
    { "id": "gardner-denver", "name": "GARDNER-DENVER", "category": "industrial" },
    { "id": "gefran", "name": "GEFRAN", "category": "industrial" },
    { "id": "heidenhain", "name": "HEIDENHAIN", "category": "industrial" },
    { "id": "hengstler", "name": "HENGSTLER", "category": "industrial" },
    { "id": "hohner", "name": "HOHNER", "category": "industrial" },
    { "id": "honeywell", "name": "HONEYWELL", "category": "industrial" },
    { "id": "idec", "name": "IDEC", "category": "industrial" },
    { "id": "ifm-electronic", "name": "IFM-ELECTRONIC", "category": "industrial" },
    { "id": "ipf-electronic", "name": "IPF-ELECTRONIC", "category": "industrial" },
    { "id": "jumo", "name": "JUMO", "category": "industrial" },
    { "id": "keyence", "name": "KEYENCE", "category": "industrial" },
    { "id": "krauterhof", "name": "KRAUTERHOF", "category": "cosmetics" },
    { "id": "phoenix-contact", "name": "PHOENIX CONTACT", "category": "industrial" },
    { "id": "sew-euro-drive", "name": "SEW EURO DRIVE", "category": "industrial" },
    { "id": "siemens", "name": "SIEMENS", "category": "industrial" },
    { "id": "topjet", "name": "TOPJET", "category": "industrial" },
    { "id": "tresan", "name": "TRESAN", "category": "cosmetics" }
]

new_raw = '''
TER
TR ELECTRONİC
TWK
TURCK
UNİT
TRİDONİC
TORK
VACON
VİCKERS
VUOTOTECNİCA
VAHLE
VEM
VİSHAY-TEDEA
WAMPFLER
WEİDMÜLLER
WELLER
WENGLOR
WÖHNER
WALDMANN
TDK LAMBDA
WERMA
WAGO
WACHENDORFF
YASKAWA
WEİNTEK
YASKAWA
TECHTOP
ZİEHL ABEGG
REXNORD
RİTTAL
ROBERT SHAW
ROSENBERG
ROSS
ROTECH MOTOR
ROTEX
ROTORK
SANYO DENKİ
SEMİKRON
ST MİCROELECTRONİCS
SPEDER MOTİON
SAUTER
SCHMERSAL
SCHRACK
STEUTE
SUNON
SCHALTBAU
SCHURTER
SCHAFFNER
STAUBLI
STAHL
STÖBER
STROMAG
SCALDALAI
SIKO
ROTRONİC
ROPEX
SCHUHMANN
DURAVİS
ATOS
SCHUNK
SERVOMECH
SELET
SUN HYDRAULİCS
SEİPEE MOTOR
SEİKOM
SERVOSTAR
SEW
SİEMENS
SENOTEC
SENSOPART
SENSORTECHNİK
SEKO
SMC
WİKA
SAİA BURGESS
VON ROHR ARMATUREN
SCHLEGEL
NOVATECH
MAİER
MARELLİ
MARZOCCHİ
MARZORATI
MAYR
MEANWELL
MESAN
METALWORK
MINIMOTOR
MINUZZI
MİCHELL İNSTRUMENTS
MİCRO DETECTORS
MİCROSONİC
MİTSUBİSHİ
MİTUTOYO
MOLEX
MOLLET
MONİTRAN
MOTOROLA
MOTOVARİO
MOTRONA
MOXA
MTS TEMPOSONIC
MUCCO
NİDEC
NİVELCO
NMB FAN
NORGREN
NOVOTECHNİK
NÖDİNG
OMRON
ORDEL
ORIENTAL MOTOR
ORİON FAN
PARKER
PCE
PENNY&GILES
PEPPERL FUCHS
PHOENİX CONTACT
PILZ
PİZZATO
PNEUMAX
PR ELECTRONİCS
PROPORTİON AİR
PROVAL
PULS
PULSOTRONİC
RAFİ
RECHNER
REER
FSG
FUJİ
GEFRAN
GEMO
GEMÜ
GEORG FISCHER
GESSMANN
GESTRA
GRUNDFOS
HARTİNG
HAWE
HBM
HEİDENHAİN
HELİCAL
HELMHOLZ
HELUKABEL
HENGSTLER
HOERBİGER
HOHNER
HONEYWELL
HONGFA
HONSBERG
HUBA CONTROL
IMI SENSÖR
INFRANOR
ISISO
İDEC
İFM
İGUS
İLX
JUMO
KELLER
KEYENCE
KİEPE
KLASCHKA
KLN ULTRASCHALL
KONTAL
KROM SCHRODER
KRONENBERG
KÜBLER
KVM EXTENDER
KYTOLA
LANBAO
LEİNE LİNDE
LİKA
LS
LUMBERG
MAC
MAG
MAHR
COGNEX
CONEC
CONTEXT
CONTRİNEX
COSTECH
CROUZET(CRYDOM)
DANFOSS
DANOTHERM
DATALOGİC
Dİ-SORİC
DOLD
DR FİSCHER
DROPSA
DUNGS
DYNİSCO
EAE
EAO
EATON
EBARA
EBMPAPST
ECOFIT
ELAP
ELCİS
ELEKTRAMOTOR
ELOBAU
ELTRA
EMERSON FİSCHER
EMG
EMOD MOTOREN
ENDRESS HAUSER
ERO ELECTRONİC
ESA AUTOMATİON
ETA
EUCHNER
EUROFLEX
EUROGİ
EUROMOTORS
EUROTECH
EUROTHERM
FANTİNİ COSMİ
FENAC
FESTO
FİFE-TİDLAND
FİNDER
FİNE TEK
FİNMOTOR
FLENDER
FLİNTEC
FLUKE
FOTEK
AC-MOTOREN
AECO
AC MOTOREN
ADAMS RİTE
AECO
AEG
ALLEN BRADLEY
AMI ELEKTRONIK
AMPHENOL
ANDERSON
APEX
APRIMATIC
ASCON
ASHCROFT
ASM SENSOR
ATEK
AUTONİCS
AVİTEQ
AYVAZ
BALLUFF
BARKSDALE
BAUMER
BAUMULLER
BECKHOFF
BEDOK
BEI SENSORS
BELİMO
BENTLY NEVADA
BERNSTEIN
BLOCK
BOSCH AVENTİCS
BRAHMA
BRİNKMANN PUMPS
BRÜEL&KJAER
BTI
BUSSMANN
BÜHLER MOTOR
CABUR
CAMLOGİC
CAMOZZİ
CARCO
CAREL
CARLO GAVAZZİ
CARPANELLİ
CASTEL
CAVOTEC
CELDUC
CİRCUTOR
CKD
COFI
AECO
AC-MOTOREN
'''

brands_dict = {}

def normalize_name(name):
    return name.strip().replace('İ', 'I').replace('ı', 'i').replace('Ö', 'O').replace('Ü', 'U').upper()

for b in existing:
    brands_dict[normalize_name(b['name'])] = b

import re
def make_id(name):
    s = name.replace('İ', 'i').replace('ı', 'i').replace('Ü', 'u').replace('Ö', 'o').lower()
    return re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-')

for line in new_raw.split('\n'):
    line = line.strip()
    if not line:
        continue
    norm = normalize_name(line)
    if norm not in brands_dict:
        norm_no_dash = norm.replace('-', ' ')
        existing_norms_no_dash = [n.replace('-', ' ') for n in brands_dict.keys()]
        if norm_no_dash in existing_norms_no_dash:
            continue
            
        brands_dict[norm] = {
            "id": make_id(line),
            "name": line,
            "category": "industrial" 
        }

sorted_brands = sorted(brands_dict.values(), key=lambda x: normalize_name(x['name']))

js_str = "// Centralized database for all Brand Partners\n\nconst brandsData = [\n"
for i, b in enumerate(sorted_brands):
    comma = "," if i < len(sorted_brands) - 1 else ""
    js_str += f'    {{ id: "{b["id"]}", name: "{b["name"]}", category: "{b["category"]}" }}{comma}\n'
js_str += "];\n\n// Provide data globally\nwindow.brandsData = brandsData;\n"

with io.open('brands-data.js', 'w', encoding='utf-8') as f:
    f.write(js_str)

print(f"Total brands written: {len(sorted_brands)}")
