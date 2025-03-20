import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { MessageService } from 'primeng/api';
import { EmployeeListService } from '../../../../Services/provideservice/employeelist.service';

@Component({
  selector: 'app-employeelistform',
  standalone: false,
  templateUrl: './employeelistform.component.html',
  styleUrl: './employeelistform.component.css'
})
export class EmployeelistformComponent implements OnInit,AfterViewInit{
  // to contain Employee Detail form values
  @ViewChild('userForm') editUserForm!: NgForm;

  // Form Heading
  @Input() formHeading: string = ''

  // which form is showing edit or view or add
  @Input() isEdit: boolean = false;
  @Input() isView: boolean = false;

  // to sore employee detail
  @Input() userData!: any

  // to close the form
  @Output() closeForm = new EventEmitter()

  //to fing which user is login
  username!: string | null;

  //bloodGroup select form value 
  bloodGroup!: any[]

  //department select form value 
  department!: any[]

  //position select form value 
  position!: any[]

  countries!: any[]

  states!: any[]

  // to store employee id
  id!: string | undefined;

  //to store the employee image url
  url: string = 'images/usersicon.png';

  // to store image form local file
  selectedFile!: File | null;

  // to store the employees Details
  empId!: any[] | undefined;

  // employee id exits popup will come 
  empIdExits: boolean = false

  createdDate!: Date;
  modifiedDate!: Date;

  constructor(private employeeList: UserDetailsHttpService,private empData: UserDetailsHttpService,private messageService: MessageService
      , private empService: EmployeeListService
  ){}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
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
      { name: "Software Engineer", short_name: "SE" },
      { name: "Frontend Developer", short_name: "FD" },
      { name: "Backend Developer", short_name: "BD" },
      { name: "Network Engineer", short_name: "NE" },
      { name: "Network Administrator", short_name: "NA" },
      { name: "Network Architect", short_name: "NA" },
      { name: "Security Analyst", short_name: "SA" },
      { name: "Security Engineer", short_name: "SE" },
      { name: "Penetration Tester", short_name: "PT" },
      { name: "Database Administrator", short_name: "DBA" },
      { name: "Database Developer", short_name: "DD" },
      { name: "Data Analyst", short_name: "DA" },
      { name: "System Administrator", short_name: "SA" },
      { name: "Linux Administrator", short_name: "LA" },
      { name: "Cloud Administrator", short_name: "CA" },
      { name: "Cloud Engineer", short_name: "CE" },
      { name: "Cloud Architect", short_name: "CA" },
      { name: "DevOps Engineer", short_name: "DE" },
      { name: "IT Support Specialist", short_name: "ITSS" },
      { name: "Helpdesk Technician", short_name: "HT" },
      { name: "Technical Support Specialist", short_name: "TSS" },
      { name: "BI Developer", short_name: "BID" },
      { name: "BI Analyst", short_name: "BIA" },
      { name: "BI Consultant", short_name: "BIC" },
      { name: "DevOps Engineer", short_name: "DE" },
      { name: "Site Reliability Engineer", short_name: "SRE" },
      { name: "Release Manager", short_name: "RM" }
    ]
    this.countries = [
      { name: "USA" },
      { name: "India" }
    ]
    this.states = [
      { name: "California" },
      { name: "Texas" },
      { name: "Florida" },
      { name: "New York" },
      { name: "Illinois" },
      { name: "Tamil Nadu" },
      { name: "Karnataka" },
      { name: "Andhra Pradesh" },
      { name: "Rajasthan" },
      { name: "West Bengal" }
    ]
    setTimeout(() => {
      if(this.isEdit || this.isView){
        this.getValue()
      }
    }, 100);
    if(this.isEdit || this.isView){
      this.id = this.userData.id
      if(this.userData.image)
        this.url = this.userData.image
    }
  }

  ngAfterViewInit(): void {
    this.createdDate = new Date();
    this.modifiedDate = new Date();
    if(this.formHeading === "Add User"){
      setTimeout(() => {
        this.editUserForm.form.patchValue({
          createdsource: "Admin",
          createdsourcetype: "Admin",
          createddate: this.createdDate,
          modifiedsource: "Admin",
          modifiedsourcetype: "Admin",
          modifieddate: this.modifiedDate,
        })
      },);
    }
  }

  //get the employees datails
  getData(){
    this.empData.getUserData().subscribe(d=>{
      this.empId = d
    })
  }

  //patch the value to form
  getValue(){
    this.selectedFile = this.userData.image
    let dob = new Date(this.userData.dob)
    let doj = new Date(this.userData.doj)
    let cd = new Date(this.userData.createddate)
    let md = new Date(this.userData.modifieddate)
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

  // click to close the form
  isCloseForm(){
    this.closeForm.emit(false)
  }

  // click to upload and show image in webpage
  selectFile(e: any): void{
    let a = e.target.files[0].type
    let b = e.target.files[0].size / (1024 * 1024)
    if( a == "image/jpeg" || a == "image/jpg" && b < 2){
      this.selectedFile = e.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = ((event: any)=>{
        this.url = event.target.result
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Invalid image format or file size exceeds 2MB limit' });
    }
  }

  // Add new employee 
  onSubmit(): void{
    let id = this.empId?.find( d => d.employeeid === this.editUserForm.controls['employeeid'].value)
    let addFormData = this.editUserForm.value
    addFormData['createdsource'] = "Admin"
    addFormData['createdsourcetype'] = "Admin"
    addFormData['createddate'] = this.createdDate
    addFormData['modifiedsource'] = "Admin"
    addFormData['modifiedsourcetype'] = "Admin"
    addFormData['modifieddate'] = this.modifiedDate
    if((this.selectedFile && !id)) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        addFormData['image'] = base64Image
      };
      reader.readAsDataURL(this.selectedFile);
    }else if(id){
      this.messageService.add({ severity: 'error', summary: 'Employee ID is already taken. Please provide a unique ID' });
    }else{
      let close = this.empService.addEmployee(addFormData)
      if(close){
        this.closeForm.emit(false)
      }
    }
  }
  
  // Edit the employee details
  updateEmp(){
    if(this.id !== undefined){
      let close;
      let formData = this.editUserForm.value
      formData['employeeid'] = this.userData.employeeid
      formData['createdsource'] = this.userData.createdsource
      formData['createdsourcetype'] = this.userData.createdsourcetype
      formData['createddate'] = this.userData.createddate
      formData['modifiedsource'] = this.userData.modifiedsource
      formData['modifiedsourcetype'] = this.userData.modifiedsourcetype
      formData['modifieddate'] = new Date()
      if(this.selectedFile && typeof this.selectedFile !== 'string'){
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          formData['image'] = base64Image
          close = this.empService.updateEmployee(this.id,formData)
          if(close){
            this.closeForm.emit(false)
          }
        };
        reader.readAsDataURL(this.selectedFile);
      }
      else if(this.selectedFile === null){
        close = this.empService.updateEmployee(this.id,formData)
      }
      else{
        formData['image'] = this.userData.image
        close = this.empService.updateEmployee(this.id,formData)
      }
      if(close){
        this.closeForm.emit(false)
      }
    }
  }

  // click edit button to change view form to edit form
  toEdit(){
    this.formHeading = "Edit User"
    this.isEdit = true
    this.isView = false
    setTimeout(() => {
      this.getValue()
    }, );
  }

  //remove image
  removeImage(){
    this.selectedFile = null
    this.url = 'images/usersicon.png'
  }

  showState(event: any){
    if(event.value.name === 'USA'){
      this.states = [
        { name: "California" },
        { name: "Texas" },
        { name: "Florida" },
        { name: "New York" },
        { name: "Illinois" }
      ]
    }else{
      this.states = [
        { name: "Tamil Nadu" },
        { name: "Karnataka" },
        { name: "Andhra Pradesh" },
        { name: "Rajasthan" },
        { name: "West Bengal" }
      ]
    }
  }

  showPosition(event: any){
    let department = event.value.name
    if( department === "Software Development"){
      this.position = [
        { name: "Software Engineer", short_name: "SE" },
        { name: "Frontend Developer", short_name: "FD" },
        { name: "Backend Developer", short_name: "BD" }
      ]
    }else if( department === "Network Engineering"){
      this.position = [
        { name: "Network Engineer", short_name: "NE" },
        { name: "Network Administrator", short_name: "NA" },
        { name: "Network Architect", short_name: "NA" }
      ]
    }else if( department === "Cybersecurity"){
      this.position = [
        { name: "Security Analyst", short_name: "SA" },
        { name: "Security Engineer", short_name: "SE" },
        { name: "Penetration Tester", short_name: "PT" }
      ]
    }else if( department === "Database Administration"){
      this.position = [
        { name: "Database Administrator", short_name: "DBA" },
        { name: "Database Developer", short_name: "DD" },
        { name: "Data Analyst", short_name: "DA" }
      ]
    }else if( department === "System Administration"){
      this.position = [
        { name: "System Administrator", short_name: "SA" },
        { name: "Linux Administrator", short_name: "LA" }
      ]
    }else if( department === "Cloud Computing"){
      this.position = [
        { name: "Cloud Administrator", short_name: "CA" },
        { name: "Cloud Engineer", short_name: "CE" },
        { name: "Cloud Architect", short_name: "CA" }
      ]
    }else if( department === "IT Support"){
      this.position = [
        { name: "IT Support Specialist", short_name: "ITSS" },
        { name: "Helpdesk Technician", short_name: "HT" },
        { name: "Technical Support Specialist", short_name: "TSS" }
      ]
    }else if( department === "Quality Assurance"){
      this.position = [
        { name: "Site Reliability Engineer", short_name: "SRE" },
        { name: "Release Manager", short_name: "RM" }
      ]
    }else if( department === "DevOps"){
      this.position = [
        { name: "DevOps Engineer", short_name: "DE" },
        { name: "DevOps Engineer", short_name: "DE" }
      ]
    }else{
      this.position = [
        { name: "BI Developer", short_name: "BID" },
        { name: "BI Analyst", short_name: "BIA" },
        { name: "BI Consultant", short_name: "BIC" }
      ]
    }
  }

}
