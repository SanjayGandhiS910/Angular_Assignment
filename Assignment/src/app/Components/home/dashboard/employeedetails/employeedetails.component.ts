import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';

@Component({
  selector: 'app-employeedetails',
  standalone: false,
  templateUrl: './employeedetails.component.html',
  styleUrl: './employeedetails.component.css'
})
export class EmployeedetailsComponent implements OnInit{

  // empDetail property to store Employee Detail
  empDetail!: any;

  // url property to store Employee Photo url
  url!: string;

  // To close the Form
  @Output() showEmpDetail = new EventEmitter();

  // To get The Employee Id
  @Input() employeeId!: string;

  constructor(private empDetails: UserDetailsHttpService){}

  ngOnInit(): void {
    this.getEmpData()
  }

  // get the Employee Detail based on emplyee id
  getEmpData(){
    this.empDetails.getUserData().subscribe(d => {
      this.empDetail = d.find( d => d.employeeid === this.employeeId)
      this.url = this.empDetail.image
    })
  }

  // To close the Form
  closeDetail(){
    this.showEmpDetail.emit(false)
  }
}
