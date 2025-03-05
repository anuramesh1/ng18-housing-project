import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthManager } from '../auth/auth-manager.service';
import { ApiResponse } from './api-response';

@Injectable()
export class LoaderInterceptor /* implements HttpInterceptor*/ {
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //     // Pass on the cloned request instead of the original request.
    // }
    
}
