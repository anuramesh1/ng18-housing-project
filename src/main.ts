
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environmentConfig } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Enable production mode if in production environment
if (environmentConfig.production) {
    enableProdMode();
}

// Bootstrap the AppModule - Prior to Ng17
// platformBrowserDynamic().bootstrapModule(AppModule)
//     .catch(err => console.error(err));

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));
