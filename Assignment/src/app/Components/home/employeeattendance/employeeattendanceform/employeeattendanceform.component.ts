import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { EmployeeAttendanceService } from '../../../../Services/provideservice/emp-attendance.service';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-employeeattendanceform',
  standalone: false,
  templateUrl: './employeeattendanceform.component.html',
  styleUrl: './employeeattendanceform.component.css'
})
export class EmployeeattendanceformComponent implements OnInit,AfterViewInit{

  // to contain Employee Attendance form values
  @ViewChild('EmployeeAttendanceForm') EmployeeAttendanceForm!: NgForm;

  // get the employee id, department id, department name , employee detail value 
  @Input() empId!: string;
  @Input() deptId!: string;
  @Input() deptName!: string;
  @Input() empDet!: any;

  @Input() show!: boolean;
  @Input() isEdit!: boolean;
  @Input() editButtonShow!: boolean;

  // close the form
  @Output() closeForm = new EventEmitter();

  //form p-select values
  available!: any[];

  // to store departname 
  data!: string | undefined;

  // edit employee attendance detail
  editData!: any | undefined;

  // only for admin accesss
  username: boolean = true

  createdDate!: Date;
  modifiedDate!: Date;

  constructor(private empAttendance: EmployeeAttendanceHttpService,private employeeData: UserDetailsHttpService,
      private employeeAttendanceService: EmployeeAttendanceService,private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.createdDate = new Date();
    this.modifiedDate = new Date();
    let check = localStorage.getItem('username')
    if(check == 'Admin'){
      this.username = false
    }
    this.getValue()
    setTimeout(() => {
      if(this.empId){
        this.setValue()
      }else{
        this.setValues()
        this.setUpdateData()
      }
    },);
    this.available = [
      { name: true },
      { name: false}
    ]
  }

  ngAfterViewInit(): void {
    if(this.isEdit === undefined){
      console.log('new')
      setTimeout(() => {
        this.EmployeeAttendanceForm.form.patchValue({
          createdsource: "Admin",
          createdsourcetype: "Admin",
          createddate: this.createdDate,
          modifiedsource: "Admin",
          modifiedsourcetype: "Admin",
          modifieddate: this.modifiedDate
        })
      },);
    }
  }

  // patch the employee id and department id value in form
  setValue(){
    this.EmployeeAttendanceForm.form.patchValue({
      employeeid: this.empId,
      departmentid: this.deptId
    })
  }

  // get the department name
  getValue(){
    this.employeeData.getUserData().subscribe(d=>{
      this.data = d.find(d=> d.employeeid === this.empId)?.departmentname
    })
  }

  //patch the value to form
  setValues(){
    let date = new Date(this.empDet.date)
    let month = new Date(this.empDet.month)
    let cd = new Date(this.empDet.createddate)
    let md = new Date(this.empDet.modifieddate)
    let checkin = new Date(this.empDet.checkin)
    let checkout = new Date(this.empDet.checkout)
    this.EmployeeAttendanceForm.form.patchValue({
      employeeid: this.empDet.employeeid,
      departmentid: this.empDet.departmentid,
      month: month,
      date: date,
      available: this.empDet.available,
      checkin: checkin,
      checkout: checkout,
      attendancecount: this.empDet.attendancecount,
      createdsource: this.empDet.createdsource,
      createdsourcetype: this.empDet.createdsourcetype,
      createddate: cd,
      modifiedsource: this.empDet.modifiedsource,
      modifiedsourcetype: this.empDet.modifiedsourcetype,
      modifieddate: md
    })
  }

  // Close the form
  closeFormView(){
    this.closeForm.emit(false)
  }

  // get the employee attendance data
  setUpdateData(){
    let value = this.EmployeeAttendanceForm.controls['employeeid'].value
    this.empAttendance.getEmployeeAttendanceData().subscribe(d=>{
      this.editData = d.find(data=> data.employeeid === value)
    })
  }

  // add new value in employee attendance table
  onSubmitForm(){
    let empNewData = this.EmployeeAttendanceForm.value
    empNewData['departmentname'] = this.data
    empNewData['employeeid'] = this.empId
    empNewData['departmentid'] = this.deptId
    empNewData['createdsource'] = "Admin"
    empNewData['createdsourcetype'] = "Admin"
    empNewData['createddate'] = this.createdDate
    empNewData['modifiedsource'] = "Admin"
    empNewData['modifiedsourcetype'] = "Admin"
    empNewData['modifieddate'] = this.modifiedDate
    //   this.empAttendance.newEmployeeAttendance(empNewData)
    let close = this.employeeAttendanceService.addEmployeeAttendance(empNewData)
    if(close){
      this.closeForm.emit(false)
    }
  }

  // Edit the employee attendance data
  onEditForm(){
    if(!this.isEdit){
        let id = this.editData.id
        let formData = this.EmployeeAttendanceForm.value
        console.log(this.empDet.createsource)
        formData['employeeid'] = this.empDet.employeeid
        formData['departmentid'] = this.empDet.departmentid
        formData['departmentname'] = this.empDet.departmentname
        formData['createdsource'] = this.empDet.createdsource
        formData['createdsourcetype'] = this.empDet.createdsourcetype
        formData['createddate'] = this.empDet.createddate
        formData['modifiedsource'] = this.empDet.modifiedsource
        formData['modifiedsourcetype'] = this.empDet.modifiedsourcetype
        formData['modifieddate'] = new Date()
        let close = this.employeeAttendanceService.editEmployeeAttendance(id,formData)
        if(close){
          this.closeForm.emit(false)
        }
    }
    this.isEdit = false
  }
}
