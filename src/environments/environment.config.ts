import { LogLevel } from "src/app/core/services/logger.service";

export interface EnvironmentConfig {
    production: boolean;
    logLevel: LogLevel;
    envName: string;
    hmr: boolean;
    enableRouterTracing: boolean;
    msBooksAppBaseUrl: string;
    msHousingAppBaseUrl: string;
    version: string;
}