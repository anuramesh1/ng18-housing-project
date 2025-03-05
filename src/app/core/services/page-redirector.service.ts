import { ErrorHandler, Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class PageRedirector {

    private static PAGES_ROOT = 'pages';
    private static readonly APPLICATION_UNAVAILABLE = 'application-unavailable.html';
    private static readonly APPLICATION_ERROR = 'application-error.html';
    private static readonly USER_PROFILE_ERROR = 'user-profile-error.html';
    private static readonly USER_TIME_OUT = 'user-time-out.html';
    private static readonly USER_NOT_AUTHORIZED = 'user-not-authorized.html';
    private static readonly INACTIVE_USER = 'inactive-user.html';
    private static readonly LOGOUT = 'log-out.html';


    constructor(private location: Location,
        private errorHandler: ErrorHandler
    ) {
        
    }
    redirectToApplicationUnavailable(url: string): Observable<boolean> {
        this.errorHandler.handleError(url + 'Unavailable');
        return of(true);
    }

    redirectToApplicationError(): Observable<boolean> {
        return this.redirect(PageRedirector.APPLICATION_ERROR);
    }

    redirectToUserProfileError(): Observable<boolean> {
        return this.redirect(PageRedirector.USER_PROFILE_ERROR);
    }

    redirectToUserTimeOut(): Observable<boolean> {
        return this.redirect(PageRedirector.USER_TIME_OUT);
    }   

    redirectToUserNotAuthorized(): Observable<boolean> {
        return this.redirect(PageRedirector.USER_NOT_AUTHORIZED);
    }   

    redirectToInactiveUser(): Observable<boolean> {
        return this.redirect(PageRedirector.INACTIVE_USER);
    }   

    redirectToLogOut(): Observable<boolean> {
        return this.redirect(PageRedirector.LOGOUT);
    }

    redirect(pageName: string): Observable<boolean> {
        const destURL = PageRedirector.PAGES_ROOT + '/' + pageName;
        window.location.href = destURL;
        return of(true).
            pipe(delay(1000));
    }

}
