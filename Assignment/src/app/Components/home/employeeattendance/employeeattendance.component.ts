import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { EmployeeAttendanceHttpService } from '../../../Services/http/employeeattendance.service';
import { EmployeeAttendance } from '../../../Services/Syntax/syntax.service';
import { FormsModule } from '@angular/forms';
import { EmployeeattendanceformComponent } from './employeeattendanceform/employeeattendanceform.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employeeattendance',
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    Dialog,
    ToastModule,
    FormsModule,
    EmployeeattendanceformComponent,
    NgIf
  ],
  templateUrl: './employeeattendance.component.html',
  styleUrl: './employeeattendance.component.css'
})
export class EmployeeattendanceComponent implements OnInit{

  empAttendance!: EmployeeAttendance[];
  visible: boolean = false;
  deptId: string = ''
  empId: string = ''
  isVisible: boolean = false
  empDet: boolean = false

  constructor(private employeeattendance: EmployeeAttendanceHttpService,private messageService: MessageService){}

  ngOnInit(): void {
    this.getEmpAttendance()
  }

  getEmpAttendance(){
    this.employeeattendance.getEmployeeAttendanceData().subscribe( d => 
      this.empAttendance = d
    )
  }

  closeDialog(){
    this.visible = false
  }

  showDialog() {
      this.visible = true;
      this.empId = ''
      this.deptId = ''
  }

  navigateToEmpList(){
    let check = this.empAttendance.find(d => d.employeeid === this.empId && d.departmentid === this.deptId)
    if(check === undefined){
      this.visible = false
      this.empId = ''
      this.deptId = ''
      this.messageService.add({ severity: 'error', summary: "Invalid EmployeeId or DepartmentId"});
    }else{
      this.visible = false
      this.isVisible = true
      this.empId = ''
      this.deptId = ''
    }
  }

  
  isCloseForm(close: boolean){
    this.isVisible = close
  }

  empAtt(){
    this.empDet = true
  }

}
