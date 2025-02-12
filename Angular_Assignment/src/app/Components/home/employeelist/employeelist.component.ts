import { Component } from '@angular/core';
import { EmployeecardComponent } from './employeecard/employeecard.component';

@Component({
  selector: 'app-employeelist',
  imports: [EmployeecardComponent],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {

}
