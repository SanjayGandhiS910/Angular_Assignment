import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDetails } from "../userdata/users.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpForUserService{

    apiUrl: string = ''

    constructor(private http: HttpClient){}

    isAddUserForm(data: UserDetails){
        return this.http.post(this.apiUrl,data)
    }

    isDeleteUserDetail(id: string): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
    }
}