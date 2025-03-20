import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginAuthService implements CanActivate{

    constructor(private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Observable<boolean> | Promise<boolean>{
        if(sessionStorage.getItem('isLogin') === null || sessionStorage.getItem('isLogin') === 'true'){
            return true
        }
        else if(sessionStorage.getItem('isLogin') === 'false'){
            let path = sessionStorage.getItem('currentPath');
            this.router.navigateByUrl(path!)
            return true
        }else{
            return false
        }
    }

}