import { Component, OnInit } from '@angular/core';
import { DashboardtableComponent } from './dashbordtable/dashbordtable.component';
import { DashboardchartComponent } from './dashboardchart/dashboardchart.component';
import { EmployeeAttendanceHttpService } from '../../../Services/http/employeeattendance.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    // DashboardtableComponent,
    DashboardchartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
}
