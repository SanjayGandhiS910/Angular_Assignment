import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DepartmentDetails, EmployeeAttendance } from '../../../Services/userdata/users.service';

@Component({
  selector: 'app-employeeattendance',
  imports: [TableModule,InputTextModule],
  templateUrl: './employeeattendance.component.html',
  styleUrl: './employeeattendance.component.css'
})
export class EmployeeattendanceComponent {
  userdata!: EmployeeAttendance[]
}
