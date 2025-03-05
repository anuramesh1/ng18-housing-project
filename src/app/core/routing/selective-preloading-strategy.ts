import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    
    console.log('Inside Selective preload strategy');
    // Check if the route has a 'preload' data property set to true
    if (route.data && route.data['preload']) {
        console.log('Preloading route: ', route);
        return load(); // Preload the module
    } else {
        console.log('Not a Preloading route: ', route);
        return of(null); // Do not preload the module
    }
  }
}
