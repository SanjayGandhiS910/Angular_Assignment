import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { EmployeeAttendanceHttpService } from "../http/employeeattendance.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeAttendanceService{

    constructor(private messageService: MessageService,private empAttendance: EmployeeAttendanceHttpService){}

    addEmployeeAttendance(value: any): boolean | void{
        let currentDate = new Date()
        let month = new Date(value.month)
        let date = new Date(value.date)
        let checkIn = new Date(value.checkin)
        let checkOut = new Date(value.checkout)

        if( month.getMonth() + 1 !== currentDate.getMonth()){
            this.messageService.add({ severity: 'error', summary: 'The selected month is invalid' });
        }else if( date > currentDate ){
            this.messageService.add({ severity: 'error', summary: 'The date cannot be in the future' });
        }else if( checkIn > checkOut ){
            this.messageService.add({ severity: 'error', summary: 'Please make sure the check-in date is before the check-out date' });
        }else if(value.attendancecount < 0 ){
            this.messageService.add({ severity: 'error', summary: 'Negative values are not allowed. Please enter a valid number' });
        }else{
            this.empAttendance.newEmployeeAttendance(value)
            return true
        }
    }

    editEmployeeAttendance(id: any,value: any): boolean | void{
        let currentDate = new Date()
        let month = new Date(value.month)
        let date = new Date(value.date)
        let checkIn = new Date(value.checkin)
        let checkOut = new Date(value.checkout)

        if( month.getMonth() + 1 !== currentDate.getMonth()){
            this.messageService.add({ severity: 'error', summary: 'The selected month is invalid' });
        }else if( date > currentDate ){
            this.messageService.add({ severity: 'error', summary: 'The date cannot be in the future' });
        }else if( checkIn > checkOut ){
            this.messageService.add({ severity: 'error', summary: 'Please make sure the check-in date is before the check-out date' });
        }else if(value.attendancecount < 0 ){
            this.messageService.add({ severity: 'error', summary: 'Negative values are not allowed. Please enter a valid number' });
        }else{
            this.empAttendance.editEmployeeAttendance(id,value)
            return true
        }
    }
}