import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DepartmentHttpService } from '../../../../Services/http/department.service';

@Component({
  selector: 'app-deptdetil',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './deptdetil.component.html',
  styleUrl: './deptdetil.component.css'
})
export class DeptdetilComponent implements OnInit{
  @Input() deptID!: string
  @Input() noofemp!: number
  @Output() closeDetail = new EventEmitter()
  dept!: any;

  constructor(private deptData: DepartmentHttpService){}

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.deptData.getDepartmentData().subscribe( d => {
      this.dept = d.find( d => d.departmentid === this.deptID)
    })
  }

  closeDeptDetail(){
    this.closeDetail.emit(false)
  }
}
