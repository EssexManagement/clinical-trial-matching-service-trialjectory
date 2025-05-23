/**
 * Handles conversion of patient bundle data to a proper request for matching service apis.
 * Retrieves api response as promise to be used in conversion to fhir ResearchStudy
 */
import https from "https";
import { IncomingMessage } from "http";
import {
  ClinicalTrialsGovService,
  ServiceConfiguration,
  SearchSet,
  devCacheClientConstructor,
  DevCacheClientAbs,
  DevCacheClient
} from "@EssexManagement/clinical-trial-matching-service";
import * as fhir from 'fhir/r4';
import convertToResearchStudy from "./researchstudy-mapping";
import { TrialjectoryMappingLogic } from "./trialjectorymappinglogic";
import data from 'us-zips';
import ALLOWABLE_VALUES from '../data/allowable-values.json';

export interface QueryConfiguration extends ServiceConfiguration {
  endpoint?: string;
  auth_token?: string;
}

/**
 * Create a new matching function using the given configuration.
 *
 * @param configuration the configuration to use to configure the matcher
 * @param ctgService an optional ClinicalTrialsGovService which can be used to
 *     update the returned trials with additional information pulled from
 *     ClinicalTrials.gov
 */
export function createClinicalTrialLookup(
  configuration: QueryConfiguration,
  ctgService?: ClinicalTrialsGovService
): (patientBundle: fhir.Bundle) => Promise<SearchSet> {
  // Raise errors on missing configuration
  if (typeof configuration.endpoint !== "string") {
    throw new Error("Missing endpoint in configuration");
  }
  if (typeof configuration.auth_token !== "string") {
    throw new Error("Missing auth_token in configuration");
  }
  const endpoint = configuration.endpoint;
  return async function getMatchingClinicalTrials(
    patientBundle: fhir.Bundle
  ): Promise<SearchSet> {
    const query = new APIQuery(patientBundle);
    const devCacheClient = await devCacheClientConstructor();
    await devCacheClient.connect();
    // Create the query based on the patient bundle:
    // And send the query to the server - For now, the full patient bundle is the query
    let result: QueryResponse;
    try {
      result = await sendQuery(endpoint, query, devCacheClient);
    } finally {
      await devCacheClient.quit();
    }
    return convertResponseToSearchSet(result, ctgService);
  };
}

export default createClinicalTrialLookup;

// Generic type for the request data being sent to the server. Fill this out
// with a more complete type.
type QueryRequest = string;

/**
 * Generic type for the trials returned.
 */
export interface QueryTrial extends Record<string, unknown> {
  main_objectives: string[];
  treatment_administration_type: string[];
  nct_number: string;
  title: string;
  first_submitted: string;
  locations?: string;
  url: string;
  phases: string;
  enrollment: number;
  study_type: string;
  control_type: string;
  contact_name?: string;
  conatct_phone?: string;
  contact_email?: string;
  brief_summary: string;
  groups: string[];
  countries: string[];
  states: string[];
  cities: string[];
  closest_facility: TJFacility;
}

export interface TJFacility extends Record<string, string | number> {
  facility_name: string;
  facility_status: string;
  facility_country: string;
  facility_state: string;
  facility_city: string;
  facility_zip: string;
  lat: string;
  lng: string;
  formatted_address: string;
}

/**
 * Type guard to determine if an object is a valid QueryTrial.
 * @param o the object to determine if it is a QueryTrial
 */
export function isQueryTrial(o: unknown): o is QueryTrial {
  if (typeof o !== "object" || o === null) return false;
  const trial = o as QueryTrial;
  return (typeof trial.nct_number === "string" &&
      typeof trial.title === "string" &&
      typeof trial.first_submitted === "string" &&
      (!trial.location || typeof trial.locations === "string") &&
      typeof trial.url === "string" &&
      (typeof trial.phases === "string" || trial.phases === null) &&
      typeof trial.enrollment === "number" &&
      typeof trial.study_type === "string" &&
      (typeof trial.control_type === "string" || trial.control_type === null) &&
      (!trial.contact_name || typeof trial.contact_name === "string") &&
      (!trial.conatct_phone || typeof trial.conatct_phone === "string") &&
      (!trial.contact_email || typeof trial.contact_email === "string") &&
      typeof trial.brief_summary === "string" &&
      typeof trial.closest_facility === "object" &&
      Array.isArray(trial.main_objectives) &&
      Array.isArray(trial.treatment_administration_type) &&
      Array.isArray(trial.groups) &&
      Array.isArray(trial.countries) &&
      Array.isArray(trial.states) &&
      Array.isArray(trial.cities)
    );
}

// Generic type for the response data being received from the server.
export interface QueryResponse extends Record<string, unknown> {
  data: {
    trials: QueryTrial[];
    ids: string[];
  }
}

/**
 * Type guard to determine if an object is a valid QueryResponse.
 * @param o the object to determine if it is a QueryResponse
 */
export function isQueryResponse(o: unknown): o is QueryResponse {
  if (typeof o !== "object" || o === null) return false;

  // Note that the following DOES NOT check the array to make sure every object
  // within it is valid. Currently this is done later in the process. This
  // makes this type guard or the QueryResponse type sort of invalid. However,
  // the assumption is that a single unparsable trial should not cause the
  // entire response to be thrown away.
  const response = o as QueryResponse;
  return (
    typeof response.data == "object" &&
    response.data != null &&
    Array.isArray(response.data.trials) &&
    Array.isArray(response.data.ids)
  );
}

export interface QueryErrorResponse extends Record<string, unknown> {
  error: string;
}

/**
 * Type guard to determine if an object is a QueryErrorResponse.
 * @param o the object to determine if it is a QueryErrorResponse
 */
export function isQueryErrorResponse(o: unknown): o is QueryErrorResponse {
  if (typeof o !== "object" || o === null) return false;
  return typeof (o as QueryErrorResponse).error === "string";
}

/**
 * Convert a zipcode to lat/long
 *
 * Returns [lat, long]
 * @param zipCode
 */
export function convertZip(zipCode: string): string[] {
  const point = data[zipCode] || null;

  return point == null ? [null, null] : [point['latitude'].toString(), point['longitude'].toString()];
}

// API RESPONSE SECTION
export class APIError extends Error {
  public httpStatus: number; //Used by wrapping service to extract HttpErrors
  public result: IncomingMessage;
  public body: string;
  constructor(
    message: string, httpStatus: number, body: string
  ) {
    super(message);
    this.httpStatus = httpStatus;
    this.body = body;
  }
}

/**
 * This class represents a query, built based on values from within the patient
 * bundle.
 */
export class APIQuery {
  // The following example fields are defined by default within the matching UI
  /**
   * US zip code
   */
  // zipCode: string;
  /**
   * Latitude of zipCode
   */
  lat: string;
  /**
   * Longitude of zipCode
   */
  lng: string;
  /**
   * Distance in miles a user has indicated they're willing to travel
   */
  travelRadius: number;
  // /**
  //  * A FHIR ResearchStudy phase
  //  */
  // phase: string;
  // /**
  //  * A FHIR ResearchStudy status
  //  */
  // recruitmentStatus: string;
  // Additional fields which need to be extracted from the bundle to construct query
  biomarkers: string[];
  stage: number;
  cancerName: string;
  cancerType: string;
  cancerSubType: string;
  ecog: number;
  karnofsky: number;
  medications: string[];
  radiationProcedures: string[];
  surgicalProcedures: string[];
  metastasis: string[];
  age: number;
  /**
   * Create a new query object.
   * @param patientBundle the patient bundle to use for field values
   */
  constructor(patientBundle: fhir.Bundle) { // this goes through the patient bundle twice - should be revised

    for (const entry of patientBundle.entry) {
      if (!("resource" in entry)) {
        // Skip bad entries
        continue;
      }
      const resource = entry.resource;
      // Pull out search parameters
      if (resource.resourceType === "Parameters") {
        for (const parameter of resource.parameter) {
          if (parameter.name === "zipCode") {
            const zipCode = parameter.valueString;
            const [lat, lng] = convertZip(zipCode);
            this.lat = lat;
            this.lng = lng;
          } else if (parameter.name === "travelRadius") {
            this.travelRadius = parseFloat(parameter.valueString);
          }
        }
      }
    }

    const mappingLogic = new TrialjectoryMappingLogic(patientBundle);
    console.log(mappingLogic);
    this.biomarkers = mappingLogic.getTumorMarkerValues();
    this.stage = parseFloat(mappingLogic.getStageValues());
    this.cancerName = mappingLogic.getCancerName();
    this.cancerType = mappingLogic.getPrimaryCancerValues();
    this.cancerSubType = mappingLogic.getHistologyMorphologyValue();
    this.ecog = mappingLogic.getECOGScore();
    this.karnofsky = mappingLogic.getKarnofskyScore();
    this.medications = mappingLogic.getMedicationStatementValues();
    this.radiationProcedures = mappingLogic.getRadiationProcedureValues();
    this.surgicalProcedures = mappingLogic.getSurgicalProcedureValues();
    const metastasis = mappingLogic.getSecondaryCancerValues();
    this.metastasis = metastasis == null ? [] : [metastasis];
    this.age = mappingLogic.getAgeValue();
  }

  /**
   * Filters out allowable values based on the cancerName; cancerName is biggest truth
   * Because TJ is a bit weird on "empty" fields, explicitly return based on whether it's supposed to be
   *
   * @param cancerName: breast, lung, crc, brain, mm, prostate, or bladder
   * @param param: "cancerType", "cancerSubType", "biomarkers", "stage", "medications", "procedures"
   * @param value: mapped values to potentially send to query
   * @param isArray: isValue an array type
   *
   */
  filterAllowable(cancerName: string, param: string, value: string[]|string|number, isArray = false): string[]|string|number {
    if (!(cancerName in ALLOWABLE_VALUES)) {
      // Unable to find cancer name
      console.log(`Invalid cancer name ${cancerName}`);
      return null;
    }
    const cancerValues = ALLOWABLE_VALUES[cancerName as keyof(typeof ALLOWABLE_VALUES)];
    if (!(param in cancerValues)) {
      // Unable to find parameter name
      console.log(`Invalid parameter ${param} for cancer type ${cancerName}`);
      return null;
    }
    const allowable:(string[]|number[]) = cancerValues[param as keyof(typeof cancerValues)];
    console.log("Current value for ", param, ":", JSON.stringify(value));
    console.log("Allowed values for ", cancerName, "|", param, ": ", JSON.stringify(allowable));

    if (allowable == undefined) return isArray ? [] : null;

    if (isArray) {
      return (<string[]>value).filter(item => (<string[]>allowable).includes(item))
    } else {
      if (param == "stage" ) return (<number[]>allowable).includes(<number>value) ? value : null;

      return (<string[]>allowable).includes(<string>value) ? value : null;
    }
  }

  /**
   * Create the information sent to the server.
   * @return {string} the api query
   */
  toQuery(): QueryRequest {
    const query = {
      lat: this.lat,
      lng: this.lng,
      // FIXME: For now, overwrite the travelRadius to be null!! TJ can't handle distance yet.
      distance: null as number | null, // this.travelRadius,
      biomarkers: this.filterAllowable(this.cancerName, "biomarkers", this.biomarkers, true),
      stage: this.filterAllowable(this.cancerName, "stage", this.stage),
      cancerName: this.cancerName,
      cancerType: this.filterAllowable(this.cancerName, "cancerType", this.cancerType),
      cancerSubType: this.filterAllowable(this.cancerName, "cancerSubType", this.cancerSubType),
      ecog: this.ecog,
      karnofsky: this.karnofsky,
      medications: this.filterAllowable(this.cancerName, "medications", this.medications, true),
      procedures: this.filterAllowable(this.cancerName, "procedures", this.radiationProcedures.concat(this.surgicalProcedures), true),
      metastasis: this.metastasis,
      age: this.age,
    };

    if (query.lat == null || query.lng == null) {
      throw new APIError(
        "Invalid zip code -- could not be processed into latitude and longitude",
        400,
        "Invalid zip code -- could not be processed into latitude and longitude"
    );
    }

    return JSON.stringify(query);
  }

  toString(): string {
    // Note that if toQuery is no longer a string, this will no longer work
    return this.toQuery();
  }
}

/**
 * Convert a query response into a search set.
 *
 * @param response the response object
 * @param ctgService an optional ClinicalTrialsGovService which can be used to
 *     update the returned trials with additional information pulled from
 *     ClinicalTrials.gov
 */
export async function convertResponseToSearchSet(
  response: QueryResponse,
  ctgService?: ClinicalTrialsGovService
): Promise<SearchSet> {
  // Our final response
  let studies: fhir.ResearchStudy[] = [];
  // For generating IDs
  let id = 0;
  for (const trial of response.data.trials) {
    if (isQueryTrial(trial)) {
      studies.push(convertToResearchStudy(trial, id++));
    } else {
      // This trial could not be understood. It can be ignored if that should
      // happen or raised/logged as an error.
      console.error("Unable to parse trial from server: %o", trial);
    }
  }
  if (ctgService) {
    // If given a backup service, use it
    studies = await ctgService.updateResearchStudies(studies);
  }
  const ss = new SearchSet();
  for (const study of studies) {
    // If returned from TrialJectory, then the study has a match likelihood of 1
    ss.addEntry(study, 1);
  }
  return ss;
}

/**
 * Helper function to handle actually sending the query.
 *
 * @param endpoint the URL of the end point to send the query to
 * @param query the query to send
 */
async function sendQuery(
  endpoint: string,
  query: APIQuery,
  devCacheClient: DevCacheClientAbs
): Promise<QueryResponse> {
  const body = Buffer.from(query.toQuery(), "utf8"); //query.toQuery()
  console.log("QUERY", query.toQuery());

  if (devCacheClient instanceof DevCacheClient) {
    const key = endpoint + query.toQuery();
    const cached = await devCacheClient.get(key);
    if (cached) {
      console.log(
        `Matcher API response: Total = ${cached.data.ids.length}`
      );
      console.log(
        "Matched trials:",
        JSON.stringify(cached.data.ids),
        JSON.stringify(cached.data.trials[0]),
        JSON.stringify(cached.data.trials.at(-1))
      );
      return cached as QueryResponse;
    }
    const res = await httpRequest();
    await devCacheClient.set(key, res);
    return res;
  }

  function httpRequest(): Promise<QueryResponse> {
    return new Promise((resolve, reject) => {
      if (query.cancerName == null) {
        reject(
          new APIError(`Error from service: cancerName is null`, null, "")
        );
      }

      const request = https.request(
        endpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Content-Length": body.byteLength.toString(),
            "User-Agent": "Clinical-Trial-Matching-Wrapper",
          },
        },
        (result) => {
          let responseBody = "";
          result.on("data", (chunk) => {
            responseBody += chunk;
          });
          result.on("end", () => {
            console.log("Complete");
            if (result.statusCode === 200) {
              let json: unknown;
              try {
                json = JSON.parse(responseBody);
              } catch (ex) {
                reject(
                  new APIError(
                    "Unable to parse response as JSON",
                    500,
                    responseBody
                  )
                );
              }
              if (isQueryResponse(json)) {
                console.log(
                  `Matcher API response: Total = ${json.data.ids.length}`
                );
                console.log(
                  "Matched trials:",
                  JSON.stringify(json.data.ids),
                  JSON.stringify(json.data.trials[0]),
                  JSON.stringify(json.data.trials.at(-1))
                );
                resolve(json);
              } else if (isQueryErrorResponse(json)) {
                reject(
                  new APIError(
                    `Error from service: ${json.error}`,
                    500,
                    responseBody
                  )
                );
              } else {
                reject(new Error("Unable to parse response from server"));
              }
            } else {
              console.error(responseBody);
              reject(
                new APIError(
                  `Server returned ${result.statusCode} ${result.statusMessage}`,
                  500,
                  responseBody
                )
              );
            }
          });
        }
      );

      request.on("error", (error) => {
        console.error(error);
        reject(error);
      });

      request.write(body);
      request.end();
    });
  }

  return httpRequest();
}
