import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { DepartmentDetails } from "../userdata/users.service";

@Injectable({
    providedIn: 'root'
})
export class HttpForSignup{

  user!: DepartmentDetails[];

    apiUrl: string = 'http://localhost:3000/users';

    constructor(private http: HttpClient){}

    getUser(){
        return this.isGetData()
    }

    private isGetData(){
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

    getDepartment(){
      return this.isgetDepartment()
    }

    private isgetDepartment(){
        return this.http.get('http://localhost:3000/departmentdetail').pipe(map((data: any)=>{
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