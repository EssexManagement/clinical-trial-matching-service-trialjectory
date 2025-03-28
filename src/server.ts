// This stub handles starting the server.

import createClinicalTrialLookup, { QueryConfiguration } from "./query";
import ClinicalTrialMatchingService, {
  configFromEnv,
  createClinicalTrialsGovService,
  devCacheActive,
} from "@EssexManagement/clinical-trial-matching-service";
import * as dotenv from "dotenv-flow";

/**
 * Exports a function to start the server. This is also the main entry point -
 * when this script is executed directly, this function is called and any errors
 * logged.
 *
 * If a configuration is given, it will be used instead of a default
 * configuration loaded via dotenv-flow. That is, instead of using configuration
 * present in environment variables and .env files, only the keys given in the
 * object will be consulted.
 *
 * @param configuration an optional configuration object which, if present, will
 *     completely replace the default configuration that would be loaded via
 *     dotenv-flow
 */
export default async function startServer(
  configuration?: QueryConfiguration
): Promise<ClinicalTrialMatchingService> {
  // Use dotenv-flow to load local configuration from .env files
  dotenv.config({
    // The environment variable to use to set the environment
    node_env: process.env.NODE_ENV,
    // The default environment to use if none is set
    default_node_env: "development",
  });

  if (!configuration) {
    configuration = configFromEnv("MATCHING_SERVICE_");
  }

  if (await devCacheActive()) {
    console.log("Dev cache is up and running.");
  }

  // Create a ClinicalTrialsGovService. It takes a path to a SQLite database to
  // store its cache.
  const ctgService = await createClinicalTrialsGovService(
    process.env.CTGOV_CACHE_FILE
  );
  const getMatchingClinicalTrials = createClinicalTrialLookup(
    configuration,
    ctgService
  );
  const service = new ClinicalTrialMatchingService(
    getMatchingClinicalTrials,
    configuration
  );
  await service.listen();
  return service;
}
