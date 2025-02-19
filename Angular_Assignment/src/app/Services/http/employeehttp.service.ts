import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class EmpolyeeHttp{

    apiUrl: string = 'http://localhost:3000/userdetails';
    
    constructor(private http: HttpClient){}
    
    getUser(){
        return this.isGetUserData()
    }
    
    private isGetUserData(){
        return this.http.get(this.apiUrl).pipe(map((data: any)=>{
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