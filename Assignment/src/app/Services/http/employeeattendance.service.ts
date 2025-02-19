import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeAttendance } from "../Syntax/syntax.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeAttendanceHttpService{

    apiUrl: string = 'http://localhost:3000/employeeattendance'

    constructor(private http: HttpClient){}

    getEmployeeAttendanceData(){
        return this.isGetData()
    }

    private isGetData(){
        return this.http.get<EmployeeAttendance[]>(this.apiUrl).pipe(map((data: EmployeeAttendance[])=>{
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