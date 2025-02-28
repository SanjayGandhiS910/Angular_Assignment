import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DepartmentHttpService } from '../../../../Services/http/department.service';
import { Department } from '../../../../Services/Syntax/syntax.service';
import { CommonModule } from '@angular/common';
import { DepartmentListService } from '../../../../Services/provideservice/deptlist.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';

@Component({
  selector: 'app-departmentdetail',
  imports: [ButtonModule,CommonModule],
  templateUrl: './departmentdetail.component.html',
  styleUrl: './departmentdetail.component.css'
})
export class DepartmentdetailComponent implements OnInit{

  dept!: Department | undefined;
  id!: string;
  empDeptName: any[] = []
  deptCount: number[] = []

  constructor(private route: Router,private activedroute: ActivatedRoute,private deptData: DepartmentHttpService,
    private deptService: DepartmentListService,private empData: UserDetailsHttpService
  ){}

  ngOnInit(): void {
    this.getempData()
    this.activedroute.params.subscribe(d => this.id = d['id'])
    setTimeout(()=>{
      this.getData(this.id)
    },10)
  }

  goback(){
    this.route.navigate(['/hrportal/departmentlist'])
  }

  
  getempData(){
    this.empData.getUserData().subscribe( d => {
      this.empDeptName = d
    })
  }

  getData(id: string){
    this.deptData.getDepartmentData().subscribe( (d: Department[]) => {
      this.getCount(d)
      console.log(d)
      setTimeout(() => {
        this.dept = d.find(d => d.departmentid === id)
      }, 100);
    })
  }

  
  getCount(empData: any[]){
    this.deptCount = this.deptService.attendanceCount(this.empDeptName)
    for(let i in this.deptCount){
      empData[i].noofemployees = this.deptCount[i].toString()
    }
  }
}
