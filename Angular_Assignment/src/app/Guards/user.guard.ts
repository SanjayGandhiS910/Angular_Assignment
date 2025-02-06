import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserGuards implements CanActivate{

    login: AuthService = inject(AuthService);
    
    router: Router = inject(Router)
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    boolean | Observable<boolean> | Promise<boolean>{
        if(this.login.isCorrectUserName){
            return true
        }else{
            return false
        }
    }
}