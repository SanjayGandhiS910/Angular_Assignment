import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DepartmentHttpService } from '../../../../Services/http/department.service';
import { Department } from '../../../../Services/Syntax/syntax.service';

@Component({
  selector: 'app-departmentdetail',
  imports: [ButtonModule],
  templateUrl: './departmentdetail.component.html',
  styleUrl: './departmentdetail.component.css'
})
export class DepartmentdetailComponent implements OnInit{

  dept!: Department | undefined;
  id!: string;

  constructor(private route: Router,private activedroute: ActivatedRoute,private deptData: DepartmentHttpService){}

  ngOnInit(): void {
    this.activedroute.params.subscribe(d => this.id = d['id'])
    this.getData(this.id)
  }

  goback(){
    this.route.navigate(['/hrportal/departmentlist'])
  }

  getData(id: string){
    this.deptData.getDepartmentData().subscribe( (d: Department[]) => {
      this.dept = d.find(d => d.departmentid === id)
    })
  }
}
