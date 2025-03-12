import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';

@Component({
  selector: 'app-employeedetails',
  imports: [
    ButtonModule,
    CommonModule
  ],
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent implements OnInit{
  empDetail!: any;
  url!: string;
  @Output() showEmpDetail = new EventEmitter();
  @Input() employeeID!: string;

  constructor(private empDetails: UserDetailsHttpService){}

  ngOnInit(): void {
    this.getEmpData()
  }

  getEmpData(){
    this.empDetails.getUserData().subscribe(d => {
      this.empDetail = d.find( d => d.employeeid === this.employeeID)
      this.url = this.empDetail.image
    })
  }

  closeDetail(){
    this.showEmpDetail.emit(false)
  }
}
