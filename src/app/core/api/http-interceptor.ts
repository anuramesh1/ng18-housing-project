import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthManager } from '../auth/auth-manager.service';
import { ApiResponse } from './api-response';
import { PageRedirector } from '../services/page-redirector.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    TIMEOUT_WARNING_MS = 10; // In minutes
    timeoutVariable: any;

    constructor(/*private pageRedirector: PageRedirector, */
        private authManager: AuthManager) {
        this.initTimeout();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clear the timeout for every new request
        clearTimeout(this.timeoutVariable)

        // If you need to bypass by hard-coding 
        const authToken = ''; // Your SSO login ID or bearer token.

        // Clone the request to add the new header. This could your SSO cookie name, or any othe auth header.
        let request = req.clone({
            headers: req.headers.set('Authorization', `Bearer YOUR_TOKEN_HERE`)
        });

        if(authToken) {
            req.clone({
                headers: req.headers.set('SSO_USER_NAME', authToken)
            });
            
        }

        // If there is any other client correlation headers you need, append them here
        if(this.authManager.getBasicUserInfo()) {
            request = req.clone({
                headers: req.headers.set('X-USER', this.authManager.getBasicUserInfo().userId)
            });
        }

        // Pass on the cloned request instead of the original request.
        // Handle the request
        return next.handle(request).pipe(

            // Handle the response
            map((response: HttpEvent<any>) => {

                if (response instanceof HttpResponse) {
                    // this.heartBeatService.heartBeat();
                    console.log("Response: " + response);
                    const that = this;
                    return response.clone<any>({
                        body: that.deserializeResponse(response.body)
                    });                       
                }
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                if(error instanceof HttpErrorResponse) {
                    console.log("Error: " + error);
                    this.checkForSpecialResponses(error);
                }
                // Handle the error
                console.error('Error occurred:', error);
                return throwError(new Error(error?.message));
            })
        );
    }

    deserializeResponse(response: any) {
        return new ApiResponse(response);
    }

    checkForSpecialResponses(response: HttpResponse<any> | HttpErrorResponse) {

        if(response.status === 504){
            // redirect to Application unavailable error
            // this.erorHandler.handleApplicationUnavailabeError();
        } else if (response.status === 302 || response.status === 0) {
            // Redirect to Single Sign On (SSO)
            //this.pageRedirector.redirectToUserTimeOut();
            return response;
        } else if (response instanceof HttpErrorResponse) {
            return this.handleHttpErrorResponse(response);
        } else {
            this.handleHttpResponse(response);
            return response;
        }
            
    }

    handleHttpResponse(response: HttpResponse<any> | HttpErrorResponse) {
        if (response instanceof HttpResponse) {
            switch (response.status) {
              case 200:
                console.log('Request was successful');
                break;
              case 201:
                console.log('Resource was created successfully');
                break;
              case 204:
                console.log('No content to return');
                break;
              default:
                console.log(`Unhandled successful status: ${response.status}`);
                break;
            }
        }
    }

    handleHttpErrorResponse(response: HttpErrorResponse) {
        if (response instanceof HttpErrorResponse) {
            switch (response.status) {
              case 400:
                console.log('Bad request');
                break;
              case 401:
                console.log('Unauthorized access');
                break;
              case 403:
                console.log('Forbidden access');
                break;
              case 404:
                console.log('Resource not found');
                break;
              case 500:
                console.log('Internal server error');
                break;
              default:
                console.log(`Unhandled error status: ${response.status}`);
                break;
            }
        }
    }

    initTimeout() {
        const that = this;
        this.timeoutVariable = setTimeout(function () {
            that.initTimeout();
        }, this.TIMEOUT_WARNING_MS * 60 * 1000);
    }

    timeout() {
        // Show a model to expire or extend
        // this.modalService.open('timeoutcomponent', {}););
        this.initTimeout();
    }
}
