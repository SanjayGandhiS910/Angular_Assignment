import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';

@Component({
  selector: 'app-dashboardchart',
  standalone: false,
  templateUrl: './dashboardchart.component.html',
  styleUrl: './dashboardchart.component.css'
})
export class DashboardchartComponent implements OnInit{

  // Chart Values
  data!: any;
  options!: any;

  //  SelectButton Values
  stateOptions: any[] = [{ label: 'Bar', value: 'bar' },{ label: 'Line', value: 'line' }];
  value: 'bar' | 'line' | undefined = 'bar';

  // Expand Chart 
  expand: boolean = false;

  // Array For Attendance Count and EmployeeId 
  attendanceArray: number[] = []
  empIdArray: string[] = []

  // Employee Details Form 
  showDeatil!: boolean;

  // Using empId Property to store Emplyoee Id
  empId!: string;

  //Before Fetching Data 
  isLoading: boolean = false

  constructor(private cd: ChangeDetectorRef,private empAttendance: EmployeeAttendanceHttpService) {}

  ngOnInit(): void {
    this.getData()
    setTimeout(()=>{
        this.chartValue()
    },100)
  }

  //Chart Values
  chartValue(){
    this.data = {
        labels: this.empIdArray,
        datasets: [
            {
                label: 'Employee Attendance Count',
                data: [...this.attendanceArray,300],
                fill: false,
                tension: 0.4,
                borderColor: 'rgba(128, 128, 128, 0.71)',
                backgroundColor: 'rgba(93, 127, 134, 0.71)'
            }
        ]
    };
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: 'rgb(39, 39, 39)'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: 'rgb(0, 0, 0)'
              },
              grid: {
                  color: 'rgb(116, 116, 116)',
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: 'rgb(0, 0, 0)'
              },
              grid: {
                  color: 'rgb(111, 111, 111)',
                  drawBorder: false
              }
          }
      }
    };
    this.cd.markForCheck();
  }

  //Get the attendanceArray, empIdArray Values
  getData(){
    this.isLoading = true
    this.empAttendance.getEmployeeAttendanceData().subscribe( d => {
      for(let a in d){
        this.attendanceArray.push(Number(d[a].attendancecount))
        this.empIdArray.push(d[a].employeeid)
      }
      this.isLoading = false
    })
  }
  
  //To Expand The DashBoard Chart
  toExpand(){
    this.expand = true
  }

  //To Close the expanded DashBoard Chart
  closeExpand(){
    this.expand = false
  }

  //Show The Details Based on the Employee Id
  onClickEvent(data: any){
    const {index} = data.element;
    if (data) {
      this.empId = this.data.labels[index]
      this.showDeatil = true
    }
  }
  //Send the data from dashboard component to emplyoeedetails component
  openDeatil(data: boolean){
    this.showDeatil = data
  }
}