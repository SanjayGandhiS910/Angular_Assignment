import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { Department } from '../../../Services/Syntax/syntax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departmentlist',
  imports: [TableModule,InputTextModule],
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent implements OnInit{

  departmentData!: Department[];

  constructor(private dept: DepartmentHttpService, private route: Router){}

  ngOnInit(): void {
    this.getDepartmentData()
  }

  getDepartmentData(){
    this.dept.getDepartmentData().subscribe( data => 
      this.departmentData = data
    )
  }

  navigate(id: string){
    this.route.navigate(['/hrportal/departmentlist/' + id])
  }

}
