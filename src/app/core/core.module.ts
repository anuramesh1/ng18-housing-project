import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AuthManager } from './auth/auth-manager.service';
import { Logger, LoggerOptions } from './services/logger.service';
import { PageRedirector } from './services/page-redirector.service';
import { AppConfigService, AuthUserDataService } from './data-services';
import { ApiHttp, MyHttpInterceptor } from './api';
import { environmentConfig } from 'src/environments/environment';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { EnvironmentConfig } from 'src/environments/environment.config';
import { Notifier } from './services/notifier.service';

@NgModule({ 
    exports: [
        HttpClientModule // Export common modules here
    ], 
    imports: [HttpClientModule ], 
    providers: [
        AuthManager,
        Logger,
        Notifier,
        PageRedirector,
        ErrorHandler,
        ApiHttp,
        provideHttpClient(withInterceptorsFromDi()),
    ] 
})
export class CoreModule {

    static forRoot(environmentConfig: EnvironmentConfig) {
        return {
            ngModule: CoreModule,
            providers: [AuthUserDataService,
             //   PageRedirector,
                ApiHttp,
                // {
                //     provide: API_HTTP_CONFIGURATION,
                //     useValue: {
                //         msBooksAppUrl: environmentConfig.msBooksAppBaseUrl,
                //         msHouseAppUrl: environmentConfig.msHousingAppBaseUrl
                //     }
                // },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: MyHttpInterceptor,
                    multi: true
                },
                {
                    provide: LoggerOptions,
                    useValue: {
                        level: environmentConfig.logLevel
                    }
                },
                {
                    provide: ROUTER_CONFIGURATION,
                    useValue: {
                        enableTracing: environmentConfig.enableRouterTracing
                    }
                }
            ]
        };
    }


    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}
