import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginAuthService implements CanActivate{

    constructor(){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Observable<boolean> | Promise<boolean>{
        if(sessionStorage.getItem('isLogin') === null || sessionStorage.getItem('isLogin') === 'true'){
            return true
        }else{
            return false
        }
    }

}