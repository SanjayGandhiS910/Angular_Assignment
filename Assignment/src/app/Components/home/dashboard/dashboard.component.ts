import { Component, OnInit } from '@angular/core';
import { DashboardtableComponent } from './dashbordtable/dashbordtable.component';
import { DashboardchartComponent } from './dashboardchart/dashboardchart.component';
import { EmployeeAttendanceHttpService } from '../../../Services/http/employeeattendance.service';
import { NoofemployeechartComponent } from "./noofemployeechart/noofemployeechart.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    // DashboardtableComponent,
    DashboardchartComponent,
    NoofemployeechartComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
}
