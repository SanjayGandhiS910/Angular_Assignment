import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentDetails } from '../../../Services/userdata/users.service';
import { HttpForSignup } from '../../../Services/http/httpforSignup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departmentlist',
  imports: [TableModule,InputTextModule],
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit{

  userdata!: DepartmentDetails[]

  constructor(private data: HttpForSignup, private route: Router){}

  ngOnInit(): void {
    this.deptData()
  }

  deptData(){
    this.data.getDepartment().subscribe(d => {
      this.userdata = d
    })
  }

  navigate(id: string){
    this.route.navigate(['/hrportal/departmentlist/' + id])
  }
}
