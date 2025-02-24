import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adduserform',
  imports: [
    FormsModule,
    FileUploadModule,
    CommonModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    RadioButton,
    SelectModule,
    TextareaModule
  ],
  templateUrl: './adduserform.component.html',
  styleUrl: './adduserform.component.css'
})
export class AdduserformComponent implements OnInit{
  @ViewChild('AddUserForm') addUserForm!: NgForm;
  @Output() closeForm = new EventEmitter();

  url: string = "images/usericon.png"
  selectedFile!: File
  bloodGroup!: any[]
  department!: any[]
  position!: any[]
  empId!: any[] | undefined;

  constructor(private userData: UserDetailsHttpService){}

  ngOnInit(): void {
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
    this.getData()
  }

  getData(){
    this.userData.getUserData().subscribe(d=>{
      this.empId = d
    })
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
    let id = this.empId?.find( d => d.employeeid === this.addUserForm.controls['employeeid'].value)
    let l = (this.addUserForm.controls['phonenumber'].value).length
    if((this.selectedFile && !id) && ( l === 0 || l === 10) ) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        let addFormData = this.addUserForm.value
        addFormData['image'] = base64Image
        this.userData.newUser(addFormData)
        this.closeForm.emit(false)
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onCloseForm(){
    this.closeForm.emit(false)
  }

}
