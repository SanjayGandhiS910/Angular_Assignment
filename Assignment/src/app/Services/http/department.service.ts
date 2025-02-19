import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Department } from "../Syntax/syntax.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DepartmentHttpService{

    apiUrl: string = 'http://localhost:3000/departmentdetail'

    constructor(private http: HttpClient){}

    getDepartmentData(){
        return this.isGetData()
    }

    private isGetData(){
        return this.http.get<Department[]>(this.apiUrl).pipe(map((data: Department[])=>{
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