import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { EmployeecardComponent } from './employeecard/employeecard.component';
import { EmpolyeeHttp } from '../../../Services/http/employeehttp.service';
import { UserDetails } from '../../../Services/userdata/users.service';

@Component({
  selector: 'app-employeelist',
  imports: [EmployeecardComponent, NgFor],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{
  userarray!: UserDetails[]
  constructor(private userdata: EmpolyeeHttp){}
  ngOnInit(): void {
    this.userdata.getUser().subscribe( data => {
      this.userarray = data
    })
  }
}
