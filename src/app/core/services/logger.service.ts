import { Injectable, Optional } from '@angular/core';

export enum LogLevel {
    OFF = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4,
    LOG = 5
}


const debug = 'debug';

const CONSOLE_DEBUG_METHOD = console[debug] ? debug : 'log';

const DEFAULT_LOGGER_OPTIONS: LoggerOptions = {
    level: LogLevel.LOG
}

export class LoggerOptions {
    level: LogLevel = LogLevel.WARN;
}


@Injectable({
    providedIn: 'root',
})
export class Logger {

    private currentLevel: LogLevel;
    public Level: any = LogLevel;

    constructor(@Optional() options: LoggerOptions) {
        const { level } = Object.assign({}, DEFAULT_LOGGER_OPTIONS, options);
        this.currentLevel = level;
    }

    log(message: string, ...optionalParams: any[]): void {
        if(this.isLogEnabled()) { console.log.apply(console, [message, ...optionalParams]); }
    }

    info(message: string, ...optionalParams: any[]): void {
        if(this.isInfoEnabled()) { console.info.apply(console, [message, ...optionalParams]); }
        // console.info(`[INFO] ${message}`, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]): void {
        if(this.isWarnEnabled()) { console.warn.apply(console, [message, ...optionalParams]); }
        // console.warn(`[WARN] ${message}`, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]): void {
        if(this.isErrorEnabled()) { console.error.apply(console, [message, ...optionalParams]); }
        // console.error(`[ERROR] ${message}`, ...optionalParams);
    }

    debug(message: string, ...optionalParams: any[]): void {
        // if (!environment.production) {
        if (!false) {
            if (this.isDebugEnabled()) {
                console[CONSOLE_DEBUG_METHOD].apply(console, [message, ...optionalParams]);
            }
            // console.debug(`[DEBUG] ${message}`, ...optionalParams);
        }
    }

    isErrorEnabled(): boolean {
        return this.currentLevel >= LogLevel.ERROR;
    }

    isWarnEnabled(): boolean {
        return this.currentLevel >= LogLevel.WARN;
    }

    isInfoEnabled(): boolean {
        return this.currentLevel >= LogLevel.INFO;
    }

    isDebugEnabled(): boolean {
        return this.currentLevel >= LogLevel.DEBUG;
    }

    isLogEnabled(): boolean {
        return this.currentLevel >= LogLevel.LOG;
    }   

}
