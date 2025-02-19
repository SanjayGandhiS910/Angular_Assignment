import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '../../../../Services/userdata/users.service';

@Component({
  selector: 'app-employeecard',
  imports: [],
  templateUrl: './employeecard.component.html',
  styleUrl: './employeecard.component.css'
})
export class EmployeecardComponent implements OnInit{

  @Input() userdatearry!: UserDetails;

  ngOnInit(): void {
    console.log(this.userdatearry)
  }
}
