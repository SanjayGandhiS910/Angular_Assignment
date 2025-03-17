import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DepartmentHttpService } from '../../../../Services/http/department.service';
import { Department } from '../../../../Services/Syntax/syntax.service';
import { CommonModule } from '@angular/common';
import { DepartmentListService } from '../../../../Services/provideservice/deptlist.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { LoadingComponent } from '../../shared-component/loading/loading.component';

@Component({
  selector: 'app-departmentdetail',
  standalone: false,
  templateUrl: './departmentdetail.component.html',
  styleUrl: './departmentdetail.component.css'
})
export class DepartmentdetailComponent implements OnInit{

  // to store the department details
  dept!: Department | undefined;

  // to store the department id
  id!: string;

  // to store the emplyoees detail
  empDeptName: any[] = []

  // to store the no of employee count
  deptCount: number[] = []

  //before fetch the data loading component show based on this property
  isLoading: boolean = false

  constructor(private route: Router,private activedroute: ActivatedRoute,private deptData: DepartmentHttpService,
    private deptService: DepartmentListService,private empData: UserDetailsHttpService
  ){}

  ngOnInit(): void {
    this.isLoading = true
    this.getempData()
    this.activedroute.params.subscribe(d => this.id = d['id'])
    setTimeout(()=>{
      this.getData(this.id)
    },1000)
  }

  // go back to /hrportal/departmentlist
  goback(){
    this.route.navigate(['/hrportal/departmentlist'])
  }

  // get the employees detail 
  getempData(){
    this.empData.getUserData().subscribe( d => {
      this.empDeptName = d
    })
  }

  //add to the dept value
  getData(id: string){
    this.deptData.getDepartmentData().subscribe( (d: Department[]) => {
      this.getCount(d)
      setTimeout(() => {
        this.dept = d.find(d => d.departmentid === id)
        this.isLoading = false
      }, 100);
    })
  }

  //get the no of employee count
  getCount(empData: any[]){
    this.deptCount = this.deptService.attendanceCount(this.empDeptName)
    for(let i in this.deptCount){
      empData[i].noofemployees = this.deptCount[i].toString()
    }
  }
}
