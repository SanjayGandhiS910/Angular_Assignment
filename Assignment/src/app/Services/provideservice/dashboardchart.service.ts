import { Injectable } from "@angular/core";
import { EmployeeAttendanceHttpService } from "../http/employeeattendance.service";

@Injectable({
    providedIn: "root"
})
export class DashboardchartService{

    arr1: any[] = []
    arr2: any[] = []

    constructor(private empAttendance: EmployeeAttendanceHttpService) {}

    getData(){
        this.empAttendance.getEmployeeAttendanceData().subscribe( d => {
          for(let a in d){
            this.arr1.push(Number(d[a].attendancecount))
            this.arr2.push(d[a].employeeid)
          }
        })
      }

      sendData(){
        this.getData()
        setTimeout(() => {
        }, 100);
      }

    
    
}