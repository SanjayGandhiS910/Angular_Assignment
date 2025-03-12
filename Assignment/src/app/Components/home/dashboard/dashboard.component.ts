import { Component, OnInit } from '@angular/core';
import { DashboardchartComponent } from './dashboardchart/dashboardchart.component';
import { NoofemployeechartComponent } from "./noofemployeechart/noofemployeechart.component";
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';

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
