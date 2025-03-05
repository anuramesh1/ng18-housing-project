import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MyHttpInterceptor } from './core/api/http-interceptor';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppInitializer, appInitializerUserFactory } from './app-init.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { environmentConfig } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';;
import { SelectivePreloadStrategy } from './core/routing/selective-preloading-strategy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { CustomersModule } from './features/customers/customers.module';
import { BooksModule } from './features/books/books.module';
import { HousesModule } from './features/houses/houses.module';
import { AppConfigService } from './app-config.service';


/** Please Note this AppModule and AppRoutingModule are not used in this example
 * Instead AppComponent is a standalone component and its routing is defined in app.routes.ts
 */
@NgModule({
    declarations: [
        // AppComponent
    ],
    imports: [
        /*AppRoutingModule,*/
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        CoreModule.forRoot(environmentConfig),
        // RouterModule.forRoot([], { preloadingStrategy: SelectivePreloadStrategy }),
        RouterModule,
        CustomersModule,
        BooksModule,
        HousesModule
        /*DataModule.forRoot(environmentConfig)
        LayoutModule,*/
    ],
    providers: [
        AppInitializer,
        SelectivePreloadStrategy,
        {
            provide: APP_INITIALIZER, useFactory: appInitializerUserFactory, deps: [AppInitializer, AppConfigService], multi: true
        },
        /*,
        {
            provide: APP_INITIALIZER, useFactory: appInitializerEnvFactory, multi: true
        },
        {
            provide: APP_INITIALIZER, useFactory: appInitializerRefDataFactory, multi: true
        }*/
        /*, appInitializerProvider,
        LoaderService*/
        {
            provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ],
    bootstrap: [] //Bootstrap your Angular app
})
export class AppModule { }
