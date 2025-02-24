import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';
import { CommonModule, formatDate } from '@angular/common';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-employeeattendanceform',
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    SelectModule,
    TextareaModule,
    CommonModule,
    CalendarModule
  ],
  templateUrl: './employeeattendanceform.component.html',
  styleUrl: './employeeattendanceform.component.css'
})
export class EmployeeattendanceformComponent implements OnInit{

  @ViewChild('EmployeeAttendanceForm') EmployeeAttendanceForm!: NgForm;
  @Input() empId!: string;
  @Input() deptId!: string;
  @Input() show!: boolean;
  @Input() deptName!: string;
  @Input() empDet!: any;
  @Input() isEdit!: boolean;
  @Input() editButtonShow!: boolean;
  @Output() closeForm = new EventEmitter();
  available!: any[];
  data!: string | undefined;
  editData!: any | undefined;
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
  onSubmitForm(){
    let empNewData = this.EmployeeAttendanceForm.value
    empNewData['departmentname'] = this.data
    this.empAttendance.newEmployeeAttendance(empNewData)
    this.closeForm.emit(false)
  }

  setValue(){
    this.EmployeeAttendanceForm.form.patchValue({
      employeeid: this.empId,
      departmentid: this.deptId
    })
  }

  getValue(){
    this.employeeData.getUserData().subscribe(d=>{
      this.data = d.find(d=> d.employeeid === this.empId)?.departmentname
    })
  }

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

  closeFormView(){
    this.closeForm.emit(false)
  }

  setUpdateData(){
    let value = this.EmployeeAttendanceForm.controls['employeeid'].value
    this.empAttendance.getEmployeeAttendanceData().subscribe(d=>{
      this.editData = d.find(data=> data.employeeid === value)
    })
  }

  onEditForm(){
    if(!this.isEdit){
      let id = this.editData.id
      let formData = this.EmployeeAttendanceForm.value
      formData['departmentname'] = this.empDet.departmentname
      this.empAttendance.editEmployeeAttendance(id,formData)
      this.closeForm.emit(false)
    }
    this.isEdit = false
  }
}
