import { Injectable } from "@angular/core";
import { UserDetailsHttpService } from "../http/userdetails.service";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class EmployeeListService{

    constructor(private employeeList: UserDetailsHttpService,private messageService: MessageService){}

    addEmployee(value: any): boolean | void{
        
        console.log(value)
        let currentDate = new Date()
        let dob = new Date(value.dob)
        let checkDob = currentDate.getFullYear() - dob.getFullYear();
        let doj = new Date(value.doj)
        let phoneNumberLength = value.phonenumber.length
        console.log(phoneNumberLength)

        if( checkDob <= 0 && currentDate < dob){
            this.messageService.add({ severity: 'error', summary: 'Date of birth cannot be in the future' });
        }else if ( checkDob < 18 ){
            this.messageService.add({ severity: 'error', summary: 'Employee must be at least 18 years old' });
        }else if( currentDate > doj){
            this.messageService.add({ severity: 'error', summary: 'Date of joining cannot be in the past' });
        }else if(phoneNumberLength == 0 || phoneNumberLength == 10){
            this.employeeList.newUser(value)
            return true;
        }

    }

    updateEmployee(id: any,value: any): boolean | void{

        let currentDate = new Date()
        let dob = new Date(value.dob)
        let checkDob = currentDate.getFullYear() - dob.getFullYear();
        let doj = new Date(value.doj)
        let phoneNumberLength = value.phonenumber.length

        if( checkDob <= 0 && currentDate < dob){
            this.messageService.add({ severity: 'error', summary: 'Date of birth cannot be in the future' });
        }else if ( checkDob < 18 ){
            this.messageService.add({ severity: 'error', summary: 'Employee must be at least 18 years old' });
        }else if(phoneNumberLength == 0 || phoneNumberLength == 10){
            this.employeeList.editEmployeeList(id,value)
            return true;
        }

    }
}