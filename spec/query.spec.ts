/**
 * This provides an example of how to test the query to ensure it produces
 * results.
 */

import { Bundle, BundleEntry } from "fhir/r4";
import {
  ClinicalTrialsGovService,
  ResearchStudy,
  SearchSet,
} from "@EssexManagement/clinical-trial-matching-service";
import createClinicalTrialLookup, {
  convertResponseToSearchSet,
  isQueryTrial,
  isQueryResponse,
  isQueryErrorResponse,
  APIQuery,
  QueryResponse,
  QueryTrial,
} from "../src/query";
import nock from "nock";
import convertToResearchStudy from "../src/researchstudy-mapping";

describe("createClinicalTrialLookup()", () => {
  it("creates a function if configured properly", () => {
    expect(
      typeof createClinicalTrialLookup({
        endpoint: "http://www.example.com/",
        auth_token: "token",
      })
    ).toEqual("function");
  });

  // This test just makes sure an error is properly raised for invalid
  // configurations
  it("raises an error if configuration is missing", () => {
    expect(() => {
      createClinicalTrialLookup({});
    }).toThrowError("Missing endpoint in configuration");
    expect(() => {
      createClinicalTrialLookup({ endpoint: "http://www.example.com/" });
    }).toThrowError("Missing auth_token in configuration");
  });
});

describe("isQueryTrial()", () => {
  it("returns false for non-trial objects", () => {
    expect(isQueryTrial(null)).toBeFalse();
    expect(isQueryTrial(true)).toBeFalse();
    expect(isQueryTrial("string")).toBeFalse();
    expect(isQueryTrial(42)).toBeFalse();
    expect(isQueryTrial({ invalid: true })).toBeFalse();
  });

  it("returns true on a matching object", () => {
    expect(
      isQueryTrial({
        main_objectives: ["Extend overall survival"],
        treatment_administration_type: [
          "IV infusion",
          "Oral Treatment (by mouth)",
        ],
        nct_number: "NCT03371017",
        title:
          "A Study of the Efficacy and Safety of Atezolizumab Plus Chemotherapy for Patients With Early Relapsing Recurrent Triple-Negative Breast Cancer",
        first_submitted: "2017-12-07",
        url: "https://clinicaltrials.gov/ct2/show/record/NCT03371017",
        phases: "Phase 3",
        enrollment: 540,
        study_type: "Interventional",
        control_type: "Placebo",
        contact_name:
          "Reference Study ID Number: MO39193 www.roche.com/about_roche/roche_worldwide.htm",
        conatct_phone: "888-662-6728 (U.S. and Canada)",
        contact_email: "global-roche-genentech-trials@gene.com",
        brief_summary:
          "This study will evaluate the efficacy and safety of atezolizumab plus chemotherapy compared with placebo plus chemotherapy in patients with inoperable recurrent triple-negative breast cancer (TNBC).",
        groups: ["Chemotherapy", "Immunotherapy"],
        countries: ["United States"],
        states: [
          "Georgia",
          "Tennessee",
          "Missouri",
          "Florida",
          "Pennsylvania",
          "Virginia",
          "New Jersey",
        ],
        cities: [
          "Marietta",
          "Nashville",
          "Kansas City",
          "Fort Myers",
          "Saint Petersburg",
          "Harrisburg",
          "Falls Church",
          "Paramus",
          "Pittsburgh",
        ],
        closest_facility: {
          facility_name: "Northwest Georgia Oncology Centers PC - Marietta",
          facility_status: "Active, not recruiting",
          facility_country: "United States",
          facility_state: "Georgia",
          facility_city: "Marietta",
          facility_zip: "30060",
          lat: "33.948815",
          lng: "-84.537945",
          formatted_address: "Marietta, GA 30060, USA",
        },
      })
    ).toBeTrue();
  });
});

describe("isQueryResponse()", () => {
  it("returns false for non-response objects", () => {
    expect(isQueryResponse(null)).toBeFalse();
    expect(isQueryResponse(true)).toBeFalse();
    expect(isQueryResponse("string")).toBeFalse();
    expect(isQueryResponse(42)).toBeFalse();
    expect(isQueryResponse({ invalid: true })).toBeFalse();
  });

  it("returns true on a matching object", () => {
    expect(isQueryResponse({ data: { trials: [], ids: [] } })).toBeTrue();
    expect(
      isQueryResponse({ data: { trials: [{ name: "Trial" }], ids: [] } })
    ).toBeTrue();
    // Currently this is true. It may make sense to make it false, but for now,
    // a single invalid trial does not invalidate the array.
    expect(
      isQueryResponse({ data: { trials: [{ invalid: true }], ids: [] } })
    ).toBeTrue();
  });
});

describe("isQueryErrorResponse()", () => {
  it("returns false for non-response objects", () => {
    expect(isQueryErrorResponse(null)).toBeFalse();
    expect(isQueryErrorResponse(true)).toBeFalse();
    expect(isQueryErrorResponse("string")).toBeFalse();
    expect(isQueryErrorResponse(42)).toBeFalse();
    expect(isQueryErrorResponse({ invalid: true })).toBeFalse();
  });

  it("returns true on a matching object", () => {
    expect(isQueryErrorResponse({ error: "oops" })).toBeTrue();
  });
});

describe("APIQuery", () => {
  it("extracts passed properties", () => {
    const query = new APIQuery({
      resourceType: "Bundle",
      type: "collection",
      entry: [
        {
          resource: {
            resourceType: "Parameters",
            parameter: [
              {
                name: "zipCode",
                valueString: "01730",
              },
              {
                name: "travelRadius",
                valueString: "25",
              },
              {
                name: "phase",
                valueString: "phase-1",
              },
              {
                name: "recruitmentStatus",
                valueString: "approved",
              },
            ],
          },
        },
      ],
    });
    expect(query.lat).toEqual("42.499332");
    expect(query.lng).toEqual("-71.281901");
    expect(query.travelRadius).toEqual(25);
  });

  it("converts the query to a string", () => {
    const query = new APIQuery({
        resourceType: "Bundle",
        type: "collection",
        entry: [
          {
            resource: {
              resourceType: "Parameters",
              parameter: [
                {
                  name: "zipCode",
                  valueString: "01730",
                },
                {
                  name: "travelRadius",
                  valueString: "25",
                },
                {
                  name: "phase",
                  valueString: "phase-1",
                },
                {
                  name: "recruitmentStatus",
                  valueString: "approved",
                },
              ],
            },
          },
          {
            resource: {
              resourceType: 'Patient',
              id: 'fglscNH3Ke3tYmWe-UQEu',
              gender: 'female',
              birthDate: '1968',
            },
            fullUrl: 'urn:uuid:fglscNH3Ke3tYmWe-UQEu',
          },
          {
            resource: {
              resourceType: 'Condition',
              meta: {
                profile: ['http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-primary-cancer-condition'],
              },
              subject: {
                reference: 'urn:uuid:fglscNH3Ke3tYmWe-UQEu',
                type: 'Patient',
              },
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '408643008',
                    display: 'Infiltrating duct carcinoma of breast (disorder)',
                  },
                ],
              },
              category: [
                {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '64572001',
                    },
                  ],
                },
              ],
            },
          },
          {
            resource: {
              resourceType: 'MedicationStatement',
              subject: {
                reference: 'urn:uuid:fglscNH3Ke3tYmWe-UQEu',
                type: 'Patient',
              },
              status: 'completed',
              medicationCodeableConcept: {
                coding: [
                  {
                    system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
                    code: '258494',
                    display: 'exemestane',
                  },
                ],
              },
              meta: {
                profile: ['http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-cancer-related-medication-statement'],
              },
              effectiveDateTime: '2023-05-04T19:41:59.078Z',
            },
          },
        ]}).toString()
    expect(query).toEqual(
      '{"lat":"42.499332","lng":"-71.281901","distance":null,"biomarkers":[],"stage":null,"cancerName":"breast","cancerType":"breast_cancer","cancerSubType":"invasive_carcinoma","ecog":null,"karnofsky":null,"medications":["exemestane"],"procedures":[],"metastasis":[],"age":null}'
    );
  });

  it("ignores unknown parameters", () => {
    // Passing in this case is simply "not raising an exception"
    new APIQuery({
      resourceType: "Bundle",
      type: "collection",
      entry: [
        {
          resource: {
            resourceType: "Parameters",
            parameter: [
              {
                name: "unknown",
                valueString: "invalid",
              },
            ],
          },
        },
      ],
    });
  });

  it("ignores invalid entries", () => {
    // Passing in this case is simply "not raising an exception"
    const bundle: Bundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: [],
    };
    // Force an invalid entry in
    bundle.entry?.push({ invalid: true } as unknown as BundleEntry);
    new APIQuery(bundle);
    // Passing is not raising an exception
  });
});

describe("convertResponseToSearchSet()", () => {
  it("converts trials", () => {
    return expectAsync(
      convertResponseToSearchSet({
        data: {
          trials: [
            {
              main_objectives: ["Extend overall survival"],
              treatment_administration_type: [
                "IV infusion",
                "Oral Treatment (by mouth)",
              ],
              nct_number: "NCT03371017",
              title:
                "A Study of the Efficacy and Safety of Atezolizumab Plus Chemotherapy for Patients With Early Relapsing Recurrent Triple-Negative Breast Cancer",
              first_submitted: "2017-12-07",
              url: "https://clinicaltrials.gov/ct2/show/record/NCT03371017",
              phases: "Phase 3",
              enrollment: 540,
              study_type: "Interventional",
              control_type: "Placebo",
              contact_name:
                "Reference Study ID Number: MO39193 www.roche.com/about_roche/roche_worldwide.htm",
              conatct_phone: "888-662-6728 (U.S. and Canada)",
              contact_email: "global-roche-genentech-trials@gene.com",
              brief_summary:
                "This study will evaluate the efficacy and safety of atezolizumab plus chemotherapy compared with placebo plus chemotherapy in patients with inoperable recurrent triple-negative breast cancer (TNBC).",
              groups: ["Chemotherapy", "Immunotherapy"],
              countries: ["United States"],
              states: [
                "Georgia",
                "Tennessee",
                "Missouri",
                "Florida",
                "Pennsylvania",
                "Virginia",
                "New Jersey",
              ],
              cities: [
                "Marietta",
                "Nashville",
                "Kansas City",
                "Fort Myers",
                "Saint Petersburg",
                "Harrisburg",
                "Falls Church",
                "Paramus",
                "Pittsburgh",
              ],
              closest_facility: {
                facility_name:
                  "Northwest Georgia Oncology Centers PC - Marietta",
                facility_status: "Active, not recruiting",
                facility_country: "United States",
                facility_state: "Georgia",
                facility_city: "Marietta",
                facility_zip: "30060",
                lat: "33.948815",
                lng: "-84.537945",
                formatted_address: "Marietta, GA 30060, USA",
              },
            },
          ],
          ids: []
        },
      }).then((searchSet) => {
        expect(searchSet.entry.length).toEqual(1);
        expect(searchSet.entry[0].resource).toBeInstanceOf(ResearchStudy);
        expect((searchSet.entry[0].resource as ResearchStudy).title).toEqual(
          "A Study of the Efficacy and Safety of Atezolizumab Plus Chemotherapy for Patients With Early Relapsing Recurrent Triple-Negative Breast Cancer"
        );
      })
    ).toBeResolved();
  });

  it("skips invalid trials", () => {
    const response: QueryResponse = {
      data: { trials: [], ids: [] },
    };
    // Push on an invalid object
    response.data.trials.push({
      invalidObject: true,
    } as unknown as QueryTrial);
    return expectAsync(convertResponseToSearchSet(response)).toBeResolved();
  });

  it("uses the backup service if provided", async () => {
    // Note that we don't initialize the backup service so no files are created
    const backupService = new ClinicalTrialsGovService("temp");
    // Instead we install a spy that takes over "updating" the research studies
    // by doing nothing
    const spy = spyOn(backupService, "updateResearchStudies").and.callFake(
      (studies) => {
        return Promise.resolve(studies);
      }
    );
    await expectAsync(
      convertResponseToSearchSet(
        {
          data: {
            trials: [
              {
                main_objectives: ["Extend overall survival"],
                treatment_administration_type: [
                  "IV infusion",
                  "Oral Treatment (by mouth)",
                ],
                nct_number: "NCT03371017",
                title:
                  "A Study of the Efficacy and Safety of Atezolizumab Plus Chemotherapy for Patients With Early Relapsing Recurrent Triple-Negative Breast Cancer",
                first_submitted: "2017-12-07",
                url: "https://clinicaltrials.gov/ct2/show/record/NCT03371017",
                phases: "Phase 3",
                enrollment: 540,
                study_type: "Interventional",
                control_type: "Placebo",
                contact_name:
                  "Reference Study ID Number: MO39193 www.roche.com/about_roche/roche_worldwide.htm",
                conatct_phone: "888-662-6728 (U.S. and Canada)",
                contact_email: "global-roche-genentech-trials@gene.com",
                brief_summary:
                  "This study will evaluate the efficacy and safety of atezolizumab plus chemotherapy compared with placebo plus chemotherapy in patients with inoperable recurrent triple-negative breast cancer (TNBC).",
                groups: ["Chemotherapy", "Immunotherapy"],
                countries: ["United States"],
                states: [
                  "Georgia",
                  "Tennessee",
                  "Missouri",
                  "Florida",
                  "Pennsylvania",
                  "Virginia",
                  "New Jersey",
                ],
                cities: [
                  "Marietta",
                  "Nashville",
                  "Kansas City",
                  "Fort Myers",
                  "Saint Petersburg",
                  "Harrisburg",
                  "Falls Church",
                  "Paramus",
                  "Pittsburgh",
                ],
                closest_facility: {
                  facility_name:
                    "Northwest Georgia Oncology Centers PC - Marietta",
                  facility_status: "Active, not recruiting",
                  facility_country: "United States",
                  facility_state: "Georgia",
                  facility_city: "Marietta",
                  facility_zip: "30060",
                  lat: "33.948815",
                  lng: "-84.537945",
                  formatted_address: "Marietta, GA 30060, USA",
                },
              },
            ],
            ids: ["NCT03371017"]
          },
        },
        backupService
      )
    ).toBeResolved();
    expect(spy).toHaveBeenCalled();
  });
});

describe("ClinicalTrialLookup", () => {
  // A valid patient bundle for the matcher, passed to ensure a query is generated
  const patientBundle: Bundle = {
    resourceType: "Bundle",
    type: "batch",
    entry: [
      {
        resource: {
          resourceType: "Parameters",
          parameter: [
            {
              name: "zipCode",
              valueString: "01730",
            },
          ],
        },
      },
      {
        resource: {
          resourceType: "Condition",
          subject: {},
          meta: {
            profile: [
              "http://hl7.org/fhir/us/mcode/StructureDefinition/mcode-primary-cancer-condition",
            ],
          },
          clinicalStatus: {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-clinical",
                code: "active",
              },
            ],
          },
          verificationStatus: {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                code: "confirmed",
              },
            ],
          },
          category: [
            {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "64572001",
                  display: "Disease (disorder)",
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: "http://snomed.info/sct",
                code: "254837009",
                display: "Malignant neoplasm of breast (disorder)",
              },
            ],
            text: "Malignant neoplasm of breast (disorder)",
          },
        },
      },
    ],
  };
  let matcher: (patientBundle: Bundle) => Promise<SearchSet>;
  let scope: nock.Scope;
  let mockRequest: nock.Interceptor;
  beforeEach(() => {
    // Create the matcher here. This creates a new instance each test so that
    // each test can adjust it as necessary without worrying about interfering
    // with other tests.
    matcher = createClinicalTrialLookup({
      endpoint: "https://www.example.com/endpoint",
      auth_token: "test_token",
    });
    // Create the interceptor for the mock request here as it's the same for
    // each test
    scope = nock("https://www.example.com");
    mockRequest = scope.post("/endpoint");
    process.env.NODE_ENV = "test";
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
  });
  afterEach(() => {
    // Expect the endpoint to have been hit in these tests
    expect(nock.isDone())
      .withContext("All expected requests have been sent")
      .toBeTrue();
  });

  it("generates a request", () => {
    mockRequest.reply(200, { data: { trials: [], ids: [] } });
    return expectAsync(matcher(patientBundle)).toBeResolved();
  });

  it("rejects with an error if an error is returned by the server", () => {
    // Simulate an error response
    mockRequest.reply(200, { error: "Test error" });
    return expectAsync(matcher(patientBundle)).toBeRejectedWithError(
      "Error from service: Test error"
    );
  });

  it("rejects with an error if an HTTP error is returned by the server", () => {
    // Simulate an error response
    mockRequest.reply(500, "Internal Server Error");
    return expectAsync(matcher(patientBundle)).toBeRejectedWithError(
      /^Server returned 500/
    );
  });

  it("rejects with an error if the response is invalid", () => {
    // Simulate a valid response with something that can't be parsed as JSON
    mockRequest.reply(200, { missingAllKnownKeys: true });
    return expectAsync(matcher(patientBundle)).toBeRejectedWithError(
      "Unable to parse response from server"
    );
  });

  it("rejects with an error if the response is not JSON", () => {
    // Simulate a valid response with something that can't be parsed as JSON
    mockRequest.reply(200, "A string that isn't JSON");
    return expectAsync(matcher(patientBundle)).toBeRejectedWithError(
      "Unable to parse response as JSON"
    );
  });

  it("rejects with an error if the request fails", () => {
    // Simulate a valid response with something that can't be parsed as JSON
    mockRequest.replyWithError("Test error");
    return expectAsync(matcher(patientBundle)).toBeRejectedWithError(
      "Test error"
    );
  });
});

describe("Blank fields in Research Study", () => {
  it("All Relevant Fields Blank", () => {
    const trial: Partial<QueryTrial> = {
      main_objectives: undefined,
      treatment_administration_type: [
        "IV infusion",
        "Oral Treatment (by mouth)",
      ],
      nct_number: undefined,
      title: undefined,
      first_submitted: "2017-12-07",
      url: "https://clinicaltrials.gov/ct2/show/record/NCT03371017",
      phases: undefined,
      enrollment: 540,
      study_type: undefined,
      control_type: "Placebo",
      contact_name: undefined,
      conatct_phone: "888-662-6728 (U.S. and Canada)",
      contact_email: "global-roche-genentech-trials@gene.com",
      brief_summary: undefined,
      groups: undefined,
      countries: undefined,
      states: [
        "Georgia",
        "Tennessee",
        "Missouri",
        "Florida",
        "Pennsylvania",
        "Virginia",
        "New Jersey",
      ],
      cities: [
        "Marietta",
        "Nashville",
        "Kansas City",
        "Fort Myers",
        "Saint Petersburg",
        "Harrisburg",
        "Falls Church",
        "Paramus",
        "Pittsburgh",
      ],
      closest_facility: undefined,
    };
    const researchStudy = convertToResearchStudy(trial as QueryTrial, 0);
    expect(researchStudy.title).toBe(undefined);
    expect(researchStudy.identifier).toBe(undefined);
    expect(researchStudy.phase).toBe(undefined);
    expect(researchStudy.location).toBe(undefined);
    expect(researchStudy.description).toBe(undefined);
    expect(researchStudy.objective).toBe(undefined);
    expect(researchStudy.keyword).toBe(undefined);
    expect(researchStudy.category).toBe(undefined);
  });

  it("Facility Name Field Blank", () => {
    const trial: QueryTrial = {
      main_objectives: ["Extend overall survival"],
      treatment_administration_type: [
        "IV infusion",
        "Oral Treatment (by mouth)",
      ],
      nct_number: "NCT03371017",
      title:
        "A Study of the Efficacy and Safety of Atezolizumab Plus Chemotherapy for Patients With Early Relapsing Recurrent Triple-Negative Breast Cancer",
      first_submitted: "2017-12-07",
      url: "https://clinicaltrials.gov/ct2/show/record/NCT03371017",
      phases: "Phase 3",
      enrollment: 540,
      study_type: "Interventional",
      control_type: "Placebo",
      contact_name:
        "Reference Study ID Number: MO39193 www.roche.com/about_roche/roche_worldwide.htm",
      conatct_phone: "888-662-6728 (U.S. and Canada)",
      contact_email: "global-roche-genentech-trials@gene.com",
      brief_summary:
        "This study will evaluate the efficacy and safety of atezolizumab plus chemotherapy compared with placebo plus chemotherapy in patients with inoperable recurrent triple-negative breast cancer (TNBC).",
      groups: ["Chemotherapy", "Immunotherapy"],
      countries: ["United States"],
      states: [
        "Georgia",
        "Tennessee",
        "Missouri",
        "Florida",
        "Pennsylvania",
        "Virginia",
        "New Jersey",
      ],
      cities: [
        "Marietta",
        "Nashville",
        "Kansas City",
        "Fort Myers",
        "Saint Petersburg",
        "Harrisburg",
        "Falls Church",
        "Paramus",
        "Pittsburgh",
      ],
      closest_facility: {
        facility_name: "",
        facility_status: "Active, not recruiting",
        facility_country: "United States",
        facility_state: "Georgia",
        facility_city: "Marietta",
        facility_zip: "30060",
        lat: "33.948815",
        lng: "-84.537945",
        formatted_address: "Marietta, GA 30060, USA",
      },
    };
    const researchStudy = convertToResearchStudy(trial, 0);
    expect(researchStudy.identifier?.[0].value).toBe("NCT03371017");
    expect(researchStudy.site).toBe(undefined);
  });
});
