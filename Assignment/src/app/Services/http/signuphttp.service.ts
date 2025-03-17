import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../Syntax/syntax.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SignupService{

    apiUrl: string = 'http://localhost:3000/user'

    constructor(private http: HttpClient){}

    newUser(newuser: User){
        this.http.post(this.apiUrl,newuser).subscribe(d=>{
        })
    }

    getUserData(){
        return this.isGetData()
    }

    private isGetData(){
        return this.http.get<User[]>(this.apiUrl).pipe(map((data: User[])=>{
            let val = []
            for(let key in data){
                if(data.hasOwnProperty(key)){
                    val.push({...data[key]})
                }
            }
            return val
        }))
    }
}