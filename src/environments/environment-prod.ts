import { EnvironmentConfig } from "./environment.config";
import { LogLevel } from "src/app/core/services/logger.service";

export const environmentConfig: EnvironmentConfig = {
    production: true,
    logLevel: LogLevel.INFO,
    envName: 'PROD',
    hmr: false,
    enableRouterTracing: true,
    msBooksAppBaseUrl: '/books', // If this is deployed in separate port, change it here
    msHousingAppBaseUrl: '/housing',
    version: '1.0.0'
}