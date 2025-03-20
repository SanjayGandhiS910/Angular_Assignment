import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartmentHttpService } from '../../../../Services/http/department.service';

@Component({
  selector: 'app-deptdetil',
  standalone: false,
  templateUrl: './deptdetil.component.html',
  styleUrl: './deptdetil.component.css'
})
export class DeptdetilComponent implements OnInit{
  // dept property to store dept id
  @Input() deptId!: string

  // dept property to store no of employee
  @Input() noOfEmp!: number

  // Close Department Details Form
  @Output() closeDetail = new EventEmitter()

  // dept property to store department detail
  dept!: any;

  constructor(private deptData: DepartmentHttpService){}

  ngOnInit(): void {
    this.getData()
  }

  // get the department detail based on department id 
  getData(){
    this.deptData.getDepartmentData().subscribe( d => {
      this.dept = d.find( d => d.departmentname === this.deptId)
    })
  }

  // to close the department details form
  closeDeptDetail(){
    this.closeDetail.emit(false)
  }
}
