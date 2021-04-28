import * as mcode from '../src/mcode';
import { Coding } from '../src/mcode';

describe('checkMedicationStatementFilterLogic-anastrozole', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // anastrozole medication filter
    ms.push({ system: 'RxNorm', code: '1157702', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test anastrozole medication filter.', () => {
      expect(medications[0]).toBe('anastrozole');
    });
  });
  describe('checkMedicationStatementFilterLogic-exemestane', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // exemestane medication filter
    ms.push({ system: 'RxNorm', code: '310261', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test exemestane medication filter.', () => {
        expect(medications[0]).toBe('exemestane');
    });
  });
  describe('checkMedicationStatementFilterLogic-letrozole', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // letrozole medication filter
    ms.push({ system: 'RxNorm', code: '372571', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test letrozole medication filter.', () => {
        expect(medications[0]).toBe('letrozole');
    });
  });
  describe('checkMedicationStatementFilterLogic-tamoxifen', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // tamoxifen medication filter
    ms.push({ system: 'RxNorm', code: '1184837', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test tamoxifen medication filter.', () => {
        expect(medications[0]).toBe('tamoxifen');
    });
  });
  describe('checkMedicationStatementFilterLogic-fulvestrant', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // fulvestrant medication filter
    ms.push({ system: 'RxNorm', code: '203870', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test fulvestrant medication filter.', () => {
        expect(medications[0]).toBe('fulvestrant');
    });
  });
  describe('checkMedicationStatementFilterLogic-toremifene', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // toremifene medication filter
    ms.push({ system: 'RxNorm', code: '727762', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test toremifene medication filter.', () => {
        expect(medications[0]).toBe('toremifene');
    });
  });
  describe('checkMedicationStatementFilterLogic-raloxifene_hcl', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // raloxifene_hcl medication filter
    ms.push({ system: 'RxNorm', code: '1490064', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test raloxifene_hcl medication filter.', () => {
        expect(medications[0]).toBe('raloxifene_hcl');
    });
  });
//   describe('checkMedicationStatementFilterLogic-trastuzumab', () => {
//     // TODO - Need feedback from Noam on trastuzumab.
//     // Initialize
//     let extractedMCODE = new mcode.ExtractedMCODE(null);
//     let ms: Coding[] = [] as Coding[];
//     // trastuzumab medication filter
//     ms.push({ system: 'RxNorm', code: 'XXXXX', display: 'N/A' } as Coding);
//     extractedMCODE.cancerRelatedMedicationStatement = ms;
//     let medications: string[] = extractedMCODE.getMedicationStatementValues();
//     it('Test trastuzumab medication filter.', () => {
//         expect(medications[0]).toBe('trastuzumab');
//     });
//   });
  describe('checkMedicationStatementFilterLogic-trastuzumab_hyaluronidase_conjugate', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // trastuzumab_hyaluronidase_conjugate medication filter
    ms.push({ system: 'RxNorm', code: '2119711', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test trastuzumab_hyaluronidase_conjugate medication filter.', () => {
        expect(medications[0]).toBe('trastuzumab_hyaluronidase_conjugate');
    });
  });
  describe('checkMedicationStatementFilterLogic-trastuzumab_deruxtecan_conjugate', () => {
    // NOTE: This medication does not have one of the mCODE Compliant Term Types. Has PIN and IN.
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // trastuzumab_deruxtecan_conjugate medication filter
    ms.push({ system: 'RxNorm', code: '2267582', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test trastuzumab_deruxtecan_conjugate medication filter.', () => {
        expect(medications[0]).toBe('trastuzumab_deruxtecan_conjugate');
    });
  });
  describe('checkMedicationStatementFilterLogic-pertuzumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // pertuzumab medication filter
    ms.push({ system: 'RxNorm', code: '1298952', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test xxx medication filter.', () => {
        expect(medications[0]).toBe('pertuzumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-lapatinib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // lapatinib medication filter
    ms.push({ system: 'RxNorm', code: '672151', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test lapatinib medication filter.', () => {
        expect(medications[0]).toBe('lapatinib');
    });
  });
  describe('checkMedicationStatementFilterLogic-pertuzumab_trastuzumab_hyaluronidase', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // pertuzumab_trastuzumab_hyaluronidase medication filter
    ms.push({ system: 'RxNorm', code: '2382607', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test pertuzumab_trastuzumab_hyaluronidase medication filter.', () => {
        expect(medications[0]).toBe('trastuzumab_hyaluronidase_conjugate');
        expect(medications[1]).toBe('pertuzumab_trastuzumab_hyaluronidase');
    });
  });
  describe('checkMedicationStatementFilterLogic-tucatinib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // tucatinib medication filter
    ms.push({ system: 'RxNorm', code: '2361286', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test tucatinib medication filter.', () => {
        expect(medications[0]).toBe('tucatinib');
    });
  });
  describe('checkMedicationStatementFilterLogic-neratinib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // neratinib medication filter
    ms.push({ system: 'RxNorm', code: '1940644', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test neratinib medication filter.', () => {
        expect(medications[0]).toBe('neratinib');
    });
  });
  describe('checkMedicationStatementFilterLogic-tdm1', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // tdm1 medication filter
    ms.push({ system: 'RxNorm', code: '1371049', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test tdm1 medication filter.', () => {
        expect(medications[0]).toBe('tdm1');
    });
  });
  describe('checkMedicationStatementFilterLogic-doxorubicin', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // doxorubicin medication filter
    ms.push({ system: 'RxNorm', code: '1799302', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test doxorubicin medication filter.', () => {
        expect(medications[0]).toBe('doxorubicin');
    });
  });
  describe('checkMedicationStatementFilterLogic-epirubicin', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // epirubicin medication filter
    ms.push({ system: 'RxNorm', code: '1732174', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test epirubicin medication filter.', () => {
        expect(medications[0]).toBe('epirubicin');
    });
  });
  describe('checkMedicationStatementFilterLogic-cyclophosphamide', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // cyclophosphamide medication filter
    ms.push({ system: 'RxNorm', code: '1734915', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test cyclophosphamide medication filter.', () => {
        expect(medications[0]).toBe('cyclophosphamide');
    });
  });
  describe('checkMedicationStatementFilterLogic-cisplatin', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // cisplatin medication filter
    ms.push({ system: 'RxNorm', code: '376433', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test cisplatin medication filter.', () => {
        expect(medications[0]).toBe('cisplatin');
    });
  });
  describe('checkMedicationStatementFilterLogic-carboplatin', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // carboplatin medication filter
    ms.push({ system: 'RxNorm', code: '93698', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test carboplatin medication filter.', () => {
        expect(medications[0]).toBe('carboplatin');
    });
  });
  describe('checkMedicationStatementFilterLogic-paclitaxel', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // paclitaxel medication filter
    ms.push({ system: 'RxNorm', code: '1165953', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test paclitaxel medication filter.', () => {
        expect(medications[0]).toBe('paclitaxel');
    });
  });
  describe('checkMedicationStatementFilterLogic-docetaxel', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // docetaxel medication filter
    ms.push({ system: 'RxNorm', code: '1093279', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test docetaxel medication filter.', () => {
        expect(medications[0]).toBe('docetaxel');
    });
  });
  describe('checkMedicationStatementFilterLogic-gemcitabine', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // gemcitabine medication filter
    ms.push({ system: 'RxNorm', code: '1720977', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test gemcitabine medication filter.', () => {
        expect(medications[0]).toBe('gemcitabine');
    });
  });
  describe('checkMedicationStatementFilterLogic-capecitabine', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // capecitabine medication filter
    ms.push({ system: 'RxNorm', code: '1158877', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test capecitabine medication filter.', () => {
        expect(medications[0]).toBe('capecitabine');
    });
  });
  describe('checkMedicationStatementFilterLogic-vinblastine_sulfate', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // vinblastine_sulfate medication filter
    ms.push({ system: 'RxNorm', code: '376857', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test vinblastine_sulfate medication filter.', () => {
        expect(medications[0]).toBe('vinblastine_sulfate');
    });
  });
  describe('checkMedicationStatementFilterLogic-sacituzumab_govitecan_hziy', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // sacituzumab_govitecan_hziy medication filter
    ms.push({ system: 'RxNorm', code: '2360533', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test sacituzumab_govitecan_hziy medication filter.', () => {
        expect(medications[0]).toBe('sacituzumab_govitecan_hziy');
    });
  });
  describe('checkMedicationStatementFilterLogic-methotrexate', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // methotrexate medication filter
    ms.push({ system: 'RxNorm', code: '1921593', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test methotrexate medication filter.', () => {
        expect(medications[0]).toBe('methotrexate');
    });
  });
  describe('checkMedicationStatementFilterLogic-fluorouracil', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // fluorouracil medication filter
    ms.push({ system: 'RxNorm', code: '105584', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test fluorouracil medication filter.', () => {
        expect(medications[0]).toBe('fluorouracil');
    });
  });
  describe('checkMedicationStatementFilterLogic-vinorelbine', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // xxx medication filter
    ms.push({ system: 'RxNorm', code: '1180490', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test vinorelbine medication filter.', () => {
        expect(medications[0]).toBe('vinorelbine');
    });
  });
//   describe('checkMedicationStatementFilterLogic-eribuline', () => {
//     // TODO - Need feedback from Noam on this Medication.
//     // Initialize
//     let extractedMCODE = new mcode.ExtractedMCODE(null);
//     let ms: Coding[] = [] as Coding[];
//     // eribuline medication filter
//     ms.push({ system: 'RxNorm', code: 'XXXXXX', display: 'N/A' } as Coding);
//     extractedMCODE.cancerRelatedMedicationStatement = ms;
//     let medications: string[] = extractedMCODE.getMedicationStatementValues();
//     it('Test eribuline medication filter.', () => {
//         expect(medications[0]).toBe('eribuline');
//     });
//   });
  describe('checkMedicationStatementFilterLogic-ixabepilone', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // ixabepilone medication filter
    ms.push({ system: 'RxNorm', code: '1726277', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test ixabepilone medication filter.', () => {
        expect(medications[0]).toBe('ixabepilone');
    });
  });
  describe('checkMedicationStatementFilterLogic-etoposide', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // etoposide medication filter
    ms.push({ system: 'RxNorm', code: '1734344', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test etoposide medication filter.', () => {
        expect(medications[0]).toBe('etoposide');
    });
  });
  describe('checkMedicationStatementFilterLogic-pemetrexed', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // pemetrexed medication filter
    ms.push({ system: 'RxNorm', code: '1728078', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test pemetrexed medication filter.', () => {
        expect(medications[0]).toBe('pemetrexed');
    });
  });
  describe('checkMedicationStatementFilterLogic-irinotecan', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // irinotecan medication filter
    ms.push({ system: 'RxNorm', code: '2284502', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test irinotecan medication filter.', () => {
        expect(medications[0]).toBe('irinotecan');
    });
  });
  describe('checkMedicationStatementFilterLogic-topotecan', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // topotecan medication filter
    ms.push({ system: 'RxNorm', code: '1172714', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test topotecan medication filter.', () => {
        expect(medications[0]).toBe('topotecan');
    });
  });
  describe('checkMedicationStatementFilterLogic-ifosfamide', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // ifosfamide medication filter
    ms.push({ system: 'RxNorm', code: '1791587', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test ifosfamide medication filter.', () => {
        expect(medications[0]).toBe('ifosfamide');
    });
  });
  describe('checkMedicationStatementFilterLogic-nivolumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // nivolumab medication filter
    ms.push({ system: 'RxNorm', code: '1597878', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test nivolumab medication filter.', () => {
        expect(medications[0]).toBe('nivolumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-avelumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // avelumab medication filter
    ms.push({ system: 'RxNorm', code: '1875540', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test avelumab medication filter.', () => {
        expect(medications[0]).toBe('avelumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-thiotepa', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // thiotepa medication filter
    ms.push({ system: 'RxNorm', code: '1919208', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test thiotepa medication filter.', () => {
        expect(medications[0]).toBe('thiotepa');
    });
  });
  describe('checkMedicationStatementFilterLogic-olaparib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // olaparib medication filter
    ms.push({ system: 'RxNorm', code: '1942483', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test olaparib medication filter.', () => {
        expect(medications[0]).toBe('olaparib');
    });
  });
  describe('checkMedicationStatementFilterLogic-talazoparib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // talazoparib medication filter
    ms.push({ system: 'RxNorm', code: '2099949', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test talazoparib medication filter.', () => {
        expect(medications[0]).toBe('talazoparib');
    });
  });
  describe('checkMedicationStatementFilterLogic-atezolizumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // atezolizumab medication filter
    ms.push({ system: 'RxNorm', code: '1792778', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test atezolizumab medication filter.', () => {
        expect(medications[0]).toBe('atezolizumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-pembrolizumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // pembrolizumab medication filter
    ms.push({ system: 'RxNorm', code: '1657747', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test pembrolizumab medication filter.', () => {
        expect(medications[0]).toBe('pembrolizumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-zoledronic_acid', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // zoledronic_acid medication filter
    ms.push({ system: 'RxNorm', code: '1114086', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test zoledronic_acid medication filter.', () => {
        expect(medications[0]).toBe('zoledronic_acid');
    });
  });
  describe('checkMedicationStatementFilterLogic-pamidronate', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // pamidronate medication filter
    ms.push({ system: 'RxNorm', code: '904918', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test pamidronate medication filter.', () => {
        expect(medications[0]).toBe('pamidronate');
    });
  });
  describe('checkMedicationStatementFilterLogic-denosumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // denosumab medication filter
    ms.push({ system: 'RxNorm', code: '993457', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test denosumab medication filter.', () => {
        expect(medications[0]).toBe('denosumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-bevacizumab', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // bevacizumab medication filter
    ms.push({ system: 'RxNorm', code: '1175674', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test bevacizumab medication filter.', () => {
        expect(medications[0]).toBe('bevacizumab');
    });
  });
  describe('checkMedicationStatementFilterLogic-everolimus', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // everolimus medication filter
    ms.push({ system: 'RxNorm', code: '1172066', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test everolimus medication filter.', () => {
        expect(medications[0]).toBe('everolimus');
    });
  });
//   describe('checkMedicationStatementFilterLogic-progestin', () => {
//     // TODO - Need feedback from Noam for this medication.
//     // Initialize
//     let extractedMCODE = new mcode.ExtractedMCODE(null);
//     let ms: Coding[] = [] as Coding[];
//     // progestin medication filter
//     ms.push({ system: 'RxNorm', code: 'XXXXX', display: 'N/A' } as Coding);
//     extractedMCODE.cancerRelatedMedicationStatement = ms;
//     let medications: string[] = extractedMCODE.getMedicationStatementValues();
//     it('Test progestin medication filter.', () => {
//         expect(medications[0]).toBe('progestin');
//     });
//   });
  describe('checkMedicationStatementFilterLogic-fluoxymesterone', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // fluoxymesterone medication filter
    ms.push({ system: 'RxNorm', code: '1175599', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test fluoxymesterone medication filter.', () => {
        expect(medications[0]).toBe('fluoxymesterone');
    });
  });
//   describe('checkMedicationStatementFilterLogic-high_dose_estrogen', () => {
//     // TODO - Need feedback from Noam for this medication.
//     // Initialize
//     let extractedMCODE = new mcode.ExtractedMCODE(null);
//     let ms: Coding[] = [] as Coding[];
//     // high_dose_estrogen medication filter
//     ms.push({ system: 'RxNorm', code: 'XXXXX', display: 'N/A' } as Coding);
//     extractedMCODE.cancerRelatedMedicationStatement = ms;
//     let medications: string[] = extractedMCODE.getMedicationStatementValues();
//     it('Test high_dose_estrogen medication filter.', () => {
//         expect(medications[0]).toBe('high_dose_estrogen');
//     });
//   });
  describe('checkMedicationStatementFilterLogic-palbociclib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // palbociclib medication filter
    ms.push({ system: 'RxNorm', code: '1601385', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test palbociclib medication filter.', () => {
        expect(medications[0]).toBe('palbociclib');
    });
  });
  describe('checkMedicationStatementFilterLogic-ribociclib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // ribociclib medication filter
    ms.push({ system: 'RxNorm', code: '1873987', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test ribociclib medication filter.', () => {
        expect(medications[0]).toBe('ribociclib');
    });
  });
  describe('checkMedicationStatementFilterLogic-abemaciclib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // abemaciclib medication filter
    ms.push({ system: 'RxNorm', code: '1946825', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test abemaciclib medication filter.', () => {
        expect(medications[0]).toBe('abemaciclib');
    });
  });
  describe('checkMedicationStatementFilterLogic-alpelisib', () => {
    // Initialize
    let extractedMCODE = new mcode.ExtractedMCODE(null);
    let ms: Coding[] = [] as Coding[];
    // alpelisib medication filter
    ms.push({ system: 'RxNorm', code: '2169317', display: 'N/A' } as Coding);
    extractedMCODE.cancerRelatedMedicationStatement = ms;
    let medications: string[] = extractedMCODE.getMedicationStatementValues();
    it('Test alpelisib medication filter.', () => {
        expect(medications[0]).toBe('alpelisib');
    });
  });

//       expect(medications[0]).toBe('fluorouracil');
//       expect(medications[0]).toBe('vinorelbine');
//       expect(medications[0]).toBe('eribuline');
//       expect(medications[0]).toBe('ixabepilone');
//       expect(medications[0]).toBe('etoposide');
//       expect(medications[0]).toBe('pemetrexed');
//       expect(medications[0]).toBe('irinotecan');
//       expect(medications[0]).toBe('topotecan');
//       expect(medications[0]).toBe('ifosfamide');
//       expect(medications[0]).toBe('nivolumab');
//       expect(medications[0]).toBe('avelumab');
//       expect(medications[0]).toBe('thiotepa');
//       expect(medications[0]).toBe('olaparib');
//       expect(medications[0]).toBe('talazoparib');
//       expect(medications[0]).toBe('atezolizumab');
//       expect(medications[0]).toBe('pembrolizumab');
//       expect(medications[0]).toBe('zoledronic_acid');
//       expect(medications[0]).toBe('pamidronate');
//       expect(medications[0]).toBe('denosumab');
//       expect(medications[0]).toBe('bevacizumab');
//       expect(medications[0]).toBe('everolimus');
//       expect(medications[0]).toBe('progestin');
//       expect(medications[0]).toBe('fluoxymesterone');
//       expect(medications[0]).toBe('high_dose_estrogen');
//       expect(medications[0]).toBe('palbociclib');
//       expect(medications[0]).toBe('ribociclib');
//       expect(medications[0]).toBe('abemaciclib');
//       expect(medications[0]).toBe('alpelisib');