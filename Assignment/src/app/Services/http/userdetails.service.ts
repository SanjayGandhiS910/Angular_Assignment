import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EmployeeList, User } from "../Syntax/syntax.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserDetailsHttpService{

    apiUrl: string = 'http://localhost:3000/usersdetails'

    constructor(private http: HttpClient){}

    newUser(newuser: any){
        return this.http.post(this.apiUrl,newuser).subscribe(d=>{
        })
    }

    editEmployeeList(id: string | undefined,editEmployeeList: EmployeeList){
        this.http.put(this.apiUrl+'/'+id,editEmployeeList).subscribe(res=> console.log('Success'))
    }
    
    deleteEmployeeList(id: string){
        this.http.delete(this.apiUrl+'/'+id).subscribe()
    }

    getUserData(){
        return this.isGetData()
    }

    private isGetData(){
        return this.http.get<EmployeeList[]>(this.apiUrl).pipe(map((data: EmployeeList[])=>{
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