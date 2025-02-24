import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDetails } from "../userdata/users.service";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpForUserService{

    apiUrl: string = 'http://localhost:3100/images'

    constructor(private http: HttpClient){}

    uploadImage(file: string): Observable<any>{
        return this.http.post(this.apiUrl, { image: file });
    }

    isDeleteUserDetail(id: string): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }

    getImage(){
        return this.isGetData()
    }

    private isGetData(){
        return this.http.get<any>(this.apiUrl).pipe(map((data: any)=>{
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