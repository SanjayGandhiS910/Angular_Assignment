import { Component, OnInit } from '@angular/core';
import { DashboardchartComponent } from './dashboardchart/dashboardchart.component';
import { NoofemployeechartComponent } from "./noofemployeechart/noofemployeechart.component";
import { CommonModule } from '@angular/common';
import { LoginAuthService } from '../../../Services/auth/loginauth.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
//   imports: [
//     CommonModule,
//     DashboardchartComponent,
//     NoofemployeechartComponent
// ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  username!: string | null;

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    sessionStorage.setItem('currentPath','hrportal/dashboard')
  }
}
