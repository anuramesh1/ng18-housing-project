import { EnvironmentConfig } from "./environment.config";
import { LoggerOptions } from "src/app/core/services/logger.service";
import { LogLevel } from "src/app/core/services/logger.service";

export const environmentConfig: EnvironmentConfig = {
    production: false,
    logLevel: LogLevel.LOG,
    envName: 'local',
    hmr: false,
    enableRouterTracing: false,
    msBooksAppBaseUrl: '/books',
   // msHousingAppBaseUrl: '/housing', // If the APIs are deployed with /housing as baseURL in Springboot
    msHousingAppBaseUrl: 'http://localhost:3000', // If you are testing using the static data in db.json, start json-server in port 3000.
    version: '1.0.0'
}