import { Injectable } from "@angular/core";
import { User } from "../Syntax/syntax.service";
import { MessageService } from 'primeng/api';
import { SignupService } from "../http/signuphttp.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{

    constructor(private messageService: MessageService, private user: SignupService,private router: Router){}

    checkUsernameandPassword(username: string, password: string, userData: User[]){
        let check = userData.find( data => 
            data.username === username && data.password === password 
        )
        if( check === undefined){
            this.messageService.add({ severity: 'error', summary: "Invalid Username or Password"});
        }else{
            localStorage.setItem('username',username)
            this.router.navigate(['hrportal/dashboard'])
        }
    }

    newUserName(username: string, password: string, cpassword: string, userData: User[]){
        let check = userData.find( data => 
            data.username === username
        )
        if(password !== cpassword){
            return "Password do not match";
        }else if(check !== undefined){
            return "User Name Already Exits";
        }else{
            let newUser: User = {
                username: username,
                password: password
            }
            this.user.newUser(newUser)
            this.router.navigate(['hrportal/dashboard'])
            return
        }
    }
}