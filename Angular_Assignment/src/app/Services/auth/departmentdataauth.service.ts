import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { DepartmentDetails } from "../userdata/users.service";
import { Observable } from "rxjs";
import { HttpForSignup } from "../http/httpforSignup.service";

@Injectable({
    providedIn: 'root'
})
export class DepartmentDataService{

    constructor(private dept: HttpForSignup){}

    deptData!: DepartmentDetails[]

    getDeptData(){
        this.dept.getDepartment()
    }
}