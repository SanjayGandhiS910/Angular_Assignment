import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { EmployeeAttendanceHttpService } from '../../../Services/http/employeeattendance.service';
import { Department, EmployeeAttendance, EmployeeList } from '../../../Services/Syntax/syntax.service';
import { FormsModule } from '@angular/forms';
import { EmployeeattendanceformComponent } from './employeeattendanceform/employeeattendanceform.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule, NgIf } from '@angular/common';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

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
    ConfirmDialog,
    EmployeeattendanceformComponent,
    NgIf,
    CommonModule
  ],
  templateUrl: './employeeattendance.component.html',
  styleUrl: './employeeattendance.component.css',
  providers: [ConfirmationService]
})
export class EmployeeattendanceComponent implements OnInit{

  empAttendance!: EmployeeAttendance[];
  empList!: EmployeeList[];
  deptList!: Department[];
  empData!: EmployeeAttendance[]
  visible: boolean = false;
  isVisible: boolean = false
  deptId: string = ''
  empId: string = ''
  empDet: boolean = false
  id!: string | null
  emp!: any
  username!: string | null
  arrlen!: number;
  array!: number[];
  arrbool!: boolean;
  isEditIcon!: boolean;

  @ViewChild('filter') filter!: ElementRef

  constructor(private employeeattendance: EmployeeAttendanceHttpService,
        private messageService: MessageService,
        private employeelist: UserDetailsHttpService,
        private departmentlist: DepartmentHttpService,
        private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.getAllValue()
    this.username = localStorage.getItem('username')
    setTimeout(()=>{
      if(this.arrlen <= 5)
        this.arrbool = false
      else{
        this.arrbool = true
        this.array = [5,10,15]
      }
    },100)
  }

  getAllValue(){
    this.employeeattendance.getEmployeeAttendanceData().subscribe( d =>{
      this.empAttendance = d
      this.empData = d
      this.arrlen = d.length
    })
    this.employeelist.getUserData().subscribe( d => {
      this.empList = d
    })
    this.departmentlist.getDepartmentData().subscribe( d => {
      this.deptList = d
    })
  }

  closeDialog(){
    this.visible = false
  }

  showDialog() {  
    let username = localStorage.getItem('username')
    if(username === 'Admin'){
      this.visible = true;
      this.empId = ''
      this.deptId = ''
    }else{
      this.messageService.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }

  navigateToEmpList(){
    let id = this.empData.find( d => d.employeeid === this.empId)
    let deptName1: any = this.empList.find( d => d.employeeid === this.empId)?.departmentname
    let d = deptName1.name
    let deptName2 = this.deptList.find( d => d.departmentid === this.deptId)?.departmentname
    if( d === deptName2 && !id){
      this.visible = false
      this.isVisible = true
    }else if(id){
      this.messageService.add({ severity: 'error', summary: "EmployeeId Alreadey Exits"});
    }else{
      this.messageService.add({ severity: 'error', summary: "Invalid EmployeeId or DepartmentId"});
    }
  }

  empAtt(user: any){
    this.emp = user
    this.empDet = true
    this.isEditIcon = true
  }

  editIcon(user: any){
    this.emp = user
    this.empDet = true
    this.isEditIcon = false
  }

  search(){
    let value = this.filter.nativeElement.value
    let l = value.length
    if(value === ''){
      this.empAttendance = this.empData
    }else{
      this.empAttendance = this.empData.filter(d => d.employeeid.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }
  }

  deleteEmpAttendanceData(id: string){
    if( this.username === 'Admin'){
      this.employeeattendance.deleteEmployeeAttendance(id)
    }else{
      this.messageService.add({ severity: 'error', summary: "User can't add data"});
    }
    setTimeout(() => {
      this.getAllValue()
    }, 100);
  }

  confirm(event: Event,id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.deleteEmpAttendanceData(id)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
  }

  closeForm(s: boolean){
    this.isVisible = s
    this.empDet = s
    setTimeout(() => {
      this.getAllValue()
    }, 100);
  }

}
