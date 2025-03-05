import { APP_INITIALIZER, Provider, Injectable } from "@angular/core";
import { AuthManager } from "./core/auth/auth-manager.service";
import { Logger } from "./core/services/logger.service";
import { PageRedirector } from "./core/services/page-redirector.service";
import { AppConfigService } from "./app-config.service";


export function appInitializerUserFactory(authManager: AuthManager, logger: Logger, pageRedirector: PageRedirector, configService:AppConfigService) {
    return () => {
        console.log("Inside App Initilaizer");
        return new AppInitializer(authManager, logger/*, pageRedirector*/, configService).loadUserProfile();
    }
}

// export function appInitializerEnvFactory(authManager: AuthManager, logger: Logger, pageRedirector: PageRedirector) {
//     return () => {
//         return new AppInitializer(authManager, logger, pageRedirector).getEnvironment()
//     }
// }

// export function appInitializerRefDataFactory(authManager: AuthManager, logger: Logger, pageRedirector: PageRedirector) {
//     return () => {
//         return new AppInitializer(authManager, logger, pageRedirector).getReferenceData();
//     }
// }

@Injectable({
    providedIn: 'root'
})
export class AppInitializer {

    constructor(private authmanager: AuthManager,
        private logger: Logger/*,
        private pageRedirector: PageRedirector*/,
        private configService: AppConfigService
    ) { }

    loadUserProfile(): Promise<boolean | any> {
        try {
            this.configService.loadConfig(); 
        } catch (error) {
            console.log(error);
        }
    
        console.log("The Host URL read from config file is: ", this.configService.apiBaseUrl);
        const authManagerPromise = Promise.resolve(true); 
        /*this
            .authmanager
            .isAuthenticated()
            .then(isAuthenticated => {
                if (!isAuthenticated) {
                   // this.pageRedirector.redirectToLogOut();
                    return false;
                } else {
                    return true; 
                }
                // return this
                //     .authmanager
                //     .getBasicUserInfo()
                //     .then((userInfo) => {
                //         if (!userInfo) {
                //             this.pageRedirector.redirectToUserProfileError();
                //             return false;
                //         }
                //     });
            }); */
        return authManagerPromise;
    }
}