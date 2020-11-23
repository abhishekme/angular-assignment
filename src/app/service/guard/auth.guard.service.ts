import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    public token: any;
    constructor( public router: Router) 
    { 
       
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let getLocalToken = localStorage.getItem('email');
        this.token = (getLocalToken != null) ? getLocalToken : '';
        if (this.token == '' || this.token == null)  {
            this.router.navigate(['/sign-in']);
            return false;
        }
        return true;
    }
}