import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';

@Component({
  selector: 'app-employeeattendanceform',
  standalone: false,
  templateUrl: './employeeattendanceform.component.html',
  styleUrl: './employeeattendanceform.component.css'
})
export class EmployeeattendanceformComponent implements OnInit{

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

  constructor(private empAttendance: EmployeeAttendanceHttpService,private employeeData: UserDetailsHttpService){}

  ngOnInit(): void {
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
    },200);
    this.available = [
      { name: true },
      { name: false}
    ]
  }

  // add new value in employee attendance table
  onSubmitForm(){
    let empNewData = this.EmployeeAttendanceForm.value
    let a = new Date(this.EmployeeAttendanceForm.controls['checkin'].value)
    let b = new Date(this.EmployeeAttendanceForm.controls['checkout'].value)
    if(a>b){
      alert("Check the check-in or check-out")
    }else{
      empNewData['departmentname'] = this.data
      this.empAttendance.newEmployeeAttendance(empNewData)
      this.closeForm.emit(false)
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

  // Edit the employee attendance data
  onEditForm(){
    let a = new Date(this.EmployeeAttendanceForm.controls['checkin'].value)
    let b = new Date(this.EmployeeAttendanceForm.controls['checkout'].value)
    if(!this.isEdit){
      if(a>b){
        alert('check the check in date')
      }else{
        let id = this.editData.id
        let formData = this.EmployeeAttendanceForm.value
        formData['departmentname'] = this.empDet.departmentname
        this.empAttendance.editEmployeeAttendance(id,formData)
        this.closeForm.emit(false)
      }
    }
    this.isEdit = false
  }
}
