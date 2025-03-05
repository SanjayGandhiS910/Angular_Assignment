import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { Department } from '../../../Services/Syntax/syntax.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { DepartmentListService } from '../../../Services/provideservice/deptlist.service';

@Component({
  selector: 'app-departmentlist',
  imports: [TableModule,InputTextModule,CommonModule,InputGroupModule,ButtonModule],
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit{

  departmentData!: Department[];
  empDeptName: any[] = []
  deptCount: number[] = []
  temp!: Department[];
  arrlen!: number;
  array!: number[];
  arrbool!: boolean;
  @ViewChild('filter') filter!: ElementRef

  constructor(private dept: DepartmentHttpService, private route: Router, private empData: UserDetailsHttpService,
            private deptService: DepartmentListService
  ){}

  ngOnInit(): void {
    this.getDepartmentData()
    this.getempData()
    setTimeout(()=>{
      if(this.arrlen <= 5)
        this.arrbool = false
      else{
        this.arrbool = true
        this.array = [5,10,15]
      }
      this.getCount()
    },100)
  }

  getDepartmentData(){
    this.dept.getDepartmentData().subscribe( data => {
      this.departmentData = data
      this.temp = data
      this.arrlen = data.length
    })
  }

  getempData(){
    this.empData.getUserData().subscribe( d => {
      this.empDeptName = d
    })
  }

  navigate(id: string){
    this.route.navigate(['/hrportal/departmentlist/' + id])
  }

  search(){
    let value = this.filter.nativeElement.value
    let l = value.length
    if(value === ''){
      this.departmentData = this.temp
    }else{
      this.departmentData = this.temp.filter(d => d.departmentid.includes(value.toLocaleLowerCase()))
    }
  }

  getCount(){
    this.deptCount = this.deptService.attendanceCount(this.empDeptName)
    for(let i in this.deptCount){
      this.departmentData[i].noofemployees = this.deptCount[i].toString()
    }
  }

}
