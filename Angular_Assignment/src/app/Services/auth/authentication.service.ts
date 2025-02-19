import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpForSignup } from "../http/httpforSignup.service";
import { User } from "../userdata/users.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService{
    isCorrectUserName = true;
    userArray!: User[];
    user!: User | undefined;
    username!: string;

    constructor(private users: HttpForSignup,private router: Router)
                {
                    this.users.getUser().subscribe(data => {
                        this.userArray = data
                    })
                }


    logintoDashBoard(username: string, password: string){
        this.user = this.userArray.find(d => 
            d.username === username && d.password === password)
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
        // this.user = this.users.users.find( data =>
        //     data.username === username)
        // if(this.user !== undefined){
        //     return 'User Name Already Exits'
        // }else{
        //     this.router.navigate(['/dashboard']);
        //     return "SignUp Succussfully"
        // }
    }

}