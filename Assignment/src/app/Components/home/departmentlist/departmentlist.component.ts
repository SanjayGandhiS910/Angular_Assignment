import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { Department } from '../../../Services/Syntax/syntax.service';
import { Router } from '@angular/router';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { DepartmentListService } from '../../../Services/provideservice/deptlist.service';
import { SortEvent } from 'primeng/api';
import { LoginAuthService } from '../../../Services/auth/loginauth.service';

@Component({
  selector: 'app-departmentlist',
  standalone: false,
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit{

  @ViewChild('Table') tableSort!: any;

  deptId!: string;
  // departmentData property to store thr all department details 
  departmentData!: Department[];

  /// EmployeeName property to store thr all Employees details 
  empDeptName: any[] = []

  // deptCount to store the no of employee count
  deptCount: number[] = []
  temp!: Department[];

  // to store the department row length
  arrLength!: number;

  // to sotre the paginator array values
  array!: number[];

  // paginator show or not
  arrbool!: boolean;

  //Paginator Page number show or not
  icon: boolean = false;
  
  inputValue: string = ''

  constructor(private dept: DepartmentHttpService, private route: Router, private empData: UserDetailsHttpService,
            private deptService: DepartmentListService
  ){}

  ngOnInit(): void {
    this.getDepartmentData()
    this.getempData()
    sessionStorage.setItem('currentPath','hrportal/departmentlist')
    setTimeout(()=>{
      if(this.arrLength <= 5)
        this.arrbool = false
      else{
        this.arrbool = true
        this.array = [5,10,15]
      }
      this.getCount()
    },100)
  }

  //get the departments detail
  getDepartmentData(){
    this.dept.getDepartmentData().subscribe( data => {
      this.departmentData = data
      this.temp = data
      this.arrLength = data.length
    })
  }

  //get the employees details
  getempData(){
    this.empData.getUserData().subscribe( d => {
      this.empDeptName = d
    })
  }

  // click the table row to navigate  /hrportal/departmentlist/' + id
  navigate(id: string){
    this.deptId = id
    this.inputValue = ''
    this.tableSort.filterGlobal('', 'contains')
  }

  //Search for Department list Table
  search(){
    if(this.inputValue === ''){
      this.departmentData = this.temp
    }else{
      this.departmentData = this.temp.filter(d => d.departmentid.includes(this.inputValue.toLocaleLowerCase()))
    }
  }

  //get the no of employee count and add to departmentData
  getCount(){
    this.deptCount = this.deptService.attendanceCount(this.empDeptName)
    for(let i in this.deptCount){
      this.departmentData[i].noofemployees = this.deptCount[i].toString()
    }
  }

  // Hide the Paginator icon
  onPageChange(event: any) {
    if(event.rows >= this.arrLength)
      this.icon = true
    else
      this.icon = false
  }

  //get data form child component
  closeForm(value: boolean){
    this.deptId = ""
  }

  
}
