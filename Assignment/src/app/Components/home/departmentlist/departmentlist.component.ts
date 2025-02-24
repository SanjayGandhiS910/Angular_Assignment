import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { Department } from '../../../Services/Syntax/syntax.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-departmentlist',
  imports: [TableModule,InputTextModule,CommonModule],
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit{

  departmentData!: Department[];
  arrlen!: number;
  array!: number[];
  arrbool!: boolean;

  constructor(private dept: DepartmentHttpService, private route: Router){}

  ngOnInit(): void {
    this.getDepartmentData()
    setTimeout(()=>{
      if(this.arrlen <= 5)
        this.arrbool = false
      else if(this.arrlen > 5 && this.arrlen < 10){
        this.arrbool = true
        this.array = [5]
      }
      else if(this.arrlen >= 10 && this.arrlen < 15){
        this.arrbool = true
        this.array = [5,10]
      }else{
        this.arrbool = true
        this.array = [5,10,15]
      }
    },100)
  }

  getDepartmentData(){
    this.dept.getDepartmentData().subscribe( data => {
      this.departmentData = data
      this.arrlen = data.length
    })
  }

  navigate(id: string){
    this.route.navigate(['/hrportal/departmentlist/' + id])
  }

}
