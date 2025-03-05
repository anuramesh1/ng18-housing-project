import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

// Function to load config before bootstrap
export function loadAppConfig(appConfigService: AppConfigService) {
    return () => appConfigService.loadConfig();
}
export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
        provideToastr(),
        provideAnimations(),
        provideHttpClient()
        
    ]
};