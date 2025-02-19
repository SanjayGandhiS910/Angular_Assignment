import { Component, OnInit } from '@angular/core';
import { EmployeetableComponent } from './employeetable/employeetable.component';
import { EmpolyeeHttp } from '../../../Services/http/employeehttp.service';
import { UserDetails } from '../../../Services/userdata/users.service';

@Component({
  selector: 'app-dashboard',
  imports: [EmployeetableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  userdata!: UserDetails[]

  constructor(private employeeData: EmpolyeeHttp){}

  ngOnInit(): void {
    this.employeeData.getUser().subscribe( data => {
      this.userdata = data
    })
  }
}
