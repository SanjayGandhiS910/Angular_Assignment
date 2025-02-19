import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpForSignup } from '../../../../Services/http/httpforSignup.service';
import { DepartmentDetails } from '../../../../Services/userdata/users.service';

interface City{
  name: string, code: string
}
@Component({
  selector: 'app-departmentdetail',
  imports: [FormsModule,FileUploadModule,HttpClientModule,ButtonModule,DatePickerModule
    ,InputTextModule,InputGroupModule,InputGroupAddonModule,FloatLabelModule,
    TextareaModule],
  templateUrl: './departmentdetail.component.html',
  styleUrl: './departmentdetail.component.css'
})
export class DepartmentdetailComponent implements OnInit{

  @ViewChild('AddEmplyeeForm') addEmploteeDate!: NgForm;

  ingredient!: string;

  dept!: DepartmentDetails | undefined;

  id!: string;
  constructor(private activeroute: ActivatedRoute, private http: HttpForSignup,private route: Router){}

  ngOnInit(): void {
    this.activeroute.params.subscribe( d => {
      this.id = d['id']
    })
  }

  refresh(){
    this.http.getDepartment().subscribe((d: DepartmentDetails[]) => {
      this.dept = d.find( (data: DepartmentDetails) => data.departmentid === this.id)
    })
    console.log(this.dept)
    this.addEmploteeDate.form.patchValue({
      departmentid: this.dept?.departmentid,
      departmentname: this.dept?.departmentname,
      noofemployees: this.dept?.noofemployees,
      managerid: this.dept?.managerid,
      createdsource: this.dept?.createdsource,
      createdsourcetype: this.dept?.createdsourcetype,
      createddate: this.dept?.createddate,
      modifiedsource: this.dept?.modifiedsource,
      modifiedsourcetype: this.dept?.modifiedsourcetype,
      modifieddate: this.dept?.modifieddate
    })
  }
  goback(){
    this.route.navigate(['/hrportal/departmentlist'])
  }
}


