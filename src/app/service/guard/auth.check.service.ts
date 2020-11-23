import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Injectable({ providedIn: 'root' })
export class AuthCheck implements CanActivate {
   public token: any;
    constructor( public router: Router, public _service:AppService) 
    {  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let getLocalToken = localStorage.getItem('email');
        
        if(getLocalToken)  {
            this.router.navigateByUrl('/user-list');
            return false;           
        }
        // else {
        //     this.router.navigateByUrl('/sign-in');
        //     return false;           
        // }
        return true;        
    }
}