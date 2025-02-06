import { inject, Injectable } from "@angular/core";
import { UserDetailsService } from "../practice";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService{
    isCorrectUserName = true;
    user: any;
    users: UserDetailsService = inject(UserDetailsService);
    router: Router = inject(Router)


    logintoHome(username: string, password: string){
        this.user = this.users.users.find( data =>
             data.username === username &&  data.password === password )
        if(this.user === undefined){
            this.isCorrectUserName = false
            return 'Wrong Credentials'
        }else{
            this.router.navigate(['/home'])
            this.isCorrectUserName = true
            return
        }
    }

    signuptoHome(username: string, password: string, confirmpassword: string){
        this.user = this.users.users.find( data =>
            data.username === username)
        if(this.user !== undefined){
            return 'User Name Already Exits'
        }else{
            this.router.navigate(['/home']);
            return "SignUp Succussfully"
        }
    }

}