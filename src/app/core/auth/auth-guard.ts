import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthManager } from './auth-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard /*implements CanActivateFn*/ {

    constructor(private authService: AuthManager, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
        });
    }
}