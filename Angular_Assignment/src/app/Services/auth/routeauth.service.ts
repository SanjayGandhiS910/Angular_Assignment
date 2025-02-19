import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class RouteAuthService implements CanActivate{

    constructor(private auth: AuthenticationService){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.auth.isCorrectUserName){
            return true;
        }else{
            return false;
        }
    }
}