import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DepartmentListService{

    bool = new BehaviorSubject(false)

    attendanceCount(emplist: any[]){
        let sd = emplist.filter( d => d.departmentname.name === "Software Development").length
        let ne = emplist.filter( d => d.departmentname.name === "Network Engineering").length
        let cs = emplist.filter( d => d.departmentname.name === "Cybersecurity").length
        let da = emplist.filter( d => d.departmentname.name === "Database Administration").length
        let sa = emplist.filter( d => d.departmentname.name === "System Administration").length
        let cc = emplist.filter( d => d.departmentname.name === "Cloud Computing").length
        let it = emplist.filter( d => d.departmentname.name === "IT Support").length
        let qa = emplist.filter( d => d.departmentname.name === "Quality Assurance").length
        let bi = emplist.filter( d => d.departmentname.name === "Business Intelligence").length
        let d = emplist.filter( d => d.departmentname.name === "DevOps").length

        return [sd,ne,cs,da,sa,cc,it,qa,bi,d]
    }

    getData(){
        return this.bool.asObservable()
    }

    putData(data: boolean){
        this.bool.next(data)
    }
}