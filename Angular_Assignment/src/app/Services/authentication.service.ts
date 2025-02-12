import { Injectable } from "@angular/core";
import { UserDetailsService } from "../user.details";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{
    isCorrectUserName = true;
    user: any;
    username!: string;

    constructor(private users: UserDetailsService,private router: Router)
                {}


    logintoDashBoard(username: string, password: string){
        this.user = this.users.users.find( data =>
             data.username === username &&  data.password === password )
        if(this.user === undefined){
            this.isCorrectUserName = false
            return 'Wrong Credentials'
        }else{
            this.username = username;
            this.router.navigate(['/hrportal'])
            this.isCorrectUserName = true
            return
        }
    }

    signuptoDashBoard(username: string, password: string, confirmpassword: string){
        this.user = this.users.users.find( data =>
            data.username === username)
        if(this.user !== undefined){
            return 'User Name Already Exits'
        }else{
            this.router.navigate(['/dashboard']);
            return "SignUp Succussfully"
        }
    }

}