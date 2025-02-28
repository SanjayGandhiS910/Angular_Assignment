import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeList } from '../../../../Services/Syntax/syntax.service';
import { CommonModule } from '@angular/common';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-employeelistform',
  imports: [
    FormsModule,
    FileUploadModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    RadioButton,
    SelectModule,
    TextareaModule,
    CommonModule,
    CalendarModule
  ],
  templateUrl: './employeelistform.component.html',
  styleUrl: './employeelistform.component.css'
})
export class EmployeelistformComponent implements OnInit{

  @ViewChild('UserForm') editUserForm!: NgForm;
  @Input() formHeading: string = ''
  @Input() isEdit: boolean = false;
  @Input() isView: boolean = false;
  @Input() userData!: EmployeeList
  @Output() closeForm = new EventEmitter()
  bloodGroup!: any[]
  department!: any[]
  position!: any[]
  id!: string | undefined;
  url: string = 'images/usericon.png';
  selectedFile!: File;
  empId!: any[] | undefined;

  constructor(private employeeList: UserDetailsHttpService,private empData: UserDetailsHttpService){}

  ngOnInit(): void {
    this.getData(); 
    this.bloodGroup =[
      {name: "O+"},
      {name: "O-"},
      {name: "A+"},
      {name: "A-"},
      {name: "B+"},
      {name: "B-"},
      {name: "AB+"},
      {name: "AB-"}
    ]
    this.department = [
        { name: "Software Development", short_name: "SD" },
        { name: "Network Engineering", short_name: "NE" },
        { name: "Cybersecurity", short_name: "Sec" },
        { name: "Database Administration", short_name: "DBA" },
        { name: "System Administration", short_name: "SysAdmin" },
        { name: "Cloud Computing", short_name: "Cloud" },
        { name: "IT Support", short_name: "IT Support" },
        { name: "Quality Assurance", short_name: "QA" },
        { name: "Business Intelligence", "short_name": "BI" },
        { name: "DevOps", short_name: "DevOps" }
    ]
    this.position = [
      { "name": "Software Engineer", "short_name": "SE" },
      { "name": "Frontend Developer", "short_name": "FD" },
      { "name": "Backend Developer", "short_name": "BD" },
      { "name": "Network Engineer", "short_name": "NE" },
      { "name": "Network Administrator", "short_name": "NA" },
      { "name": "Network Architect", "short_name": "NA" },
      { "name": "Security Analyst", "short_name": "SA" },
      { "name": "Security Engineer", "short_name": "SE" },
      { "name": "Penetration Tester", "short_name": "PT" },
      { "name": "Database Administrator", "short_name": "DBA" },
      { "name": "Database Developer", "short_name": "DD" },
      { "name": "Data Analyst", "short_name": "DA" },
      { "name": "System Administrator", "short_name": "SA" },
      { "name": "Linux Administrator", "short_name": "LA" },
      { "name": "Cloud Administrator", "short_name": "CA" },
      { "name": "Cloud Engineer", "short_name": "CE" },
      { "name": "Cloud Architect", "short_name": "CA" },
      { "name": "DevOps Engineer", "short_name": "DE" },
      { "name": "IT Support Specialist", "short_name": "ITSS" },
      { "name": "Helpdesk Technician", "short_name": "HT" },
      { "name": "Technical Support Specialist", "short_name": "TSS" },
      { "name": "BI Developer", "short_name": "BID" },
      { "name": "BI Analyst", "short_name": "BIA" },
      { "name": "BI Consultant", "short_name": "BIC" },
      { "name": "DevOps Engineer", "short_name": "DE" },
      { "name": "Site Reliability Engineer", "short_name": "SRE" },
      { "name": "Release Manager", "short_name": "RM" }
    ]
    setTimeout(() => {
      if(this.isEdit || this.isView){
        this.getValue()
      }
    }, 100);
    if(this.isEdit || this.isView){
      this.id = this.userData.id
      this.url = this.userData.image
    }
  }

  getData(){
    this.empData.getUserData().subscribe(d=>{
      this.empId = d
    })
  }

  getValue(){
    let dob = new Date(this.userData.dob)
    let doj = new Date(this.userData.doj)
    let cd = new Date(this.userData.createddate)
    let md: any = null;
    if(this.userData.modifieddate !== undefined)
      md = new Date(this.userData.modifieddate)
    this.editUserForm.form.patchValue({
      employeeid: this.userData.employeeid,
      firstname: this.userData.firstname,
      lastname: this.userData.lastname,
      gender: this.userData.gender,
      bloodgroup: this.userData.bloodgroup,
      email: this.userData.email,
      phonenumber: this.userData.phonenumber,
      dob: dob,
      doj: doj,
      departmentname: this.userData.departmentname,
      position: this.userData.position,
      createdsource: this.userData.createdsource,
      createdsourcetype: this.userData.createdsourcetype,
      createddate: cd,
      modifiedsource: this.userData.modifiedsource,
      modifiedsourcetype: this.userData.modifiedsourcetype,
      modifieddate: md,
      address: this.userData.address
    })
  }

  isCloseForm(){
    this.closeForm.emit(false)
  }

  updateEmp(){
    if(this.id !== undefined){
      let formData = this.editUserForm.value
      formData['createdsource'] = this.userData.createdsource
      formData['createdsourcetype'] = this.userData.createdsourcetype
      formData['createddate'] = this.userData.createddate
      formData['image'] = this.userData.image
      this.employeeList.editEmployeeList(this.id,formData)
      this.closeForm.emit(false)
    }
  }

  selectFile(e: any): void{
    this.selectedFile = e.target.files[0]
    let a = e.target.files[0].type
    if(a.match(/image\/*/)){
      console.log(this.selectedFile)
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = ((event: any)=>{
        this.url = event.target.result
      })
    }else{
      this.url = "images/usericon.png"
    }
  }

  onSubmit(): void{
    let id = this.empId?.find( d => d.employeeid === this.editUserForm.controls['employeeid'].value)
    let l = (this.editUserForm.controls['phonenumber'].value).length
    if((this.selectedFile && !id) && ( l === 0 || l === 10) ) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        let addFormData = this.editUserForm.value
        addFormData['image'] = base64Image
        this.empData.newUser(addFormData)
        this.closeForm.emit(false)
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
