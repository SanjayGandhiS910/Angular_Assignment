import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EmployeedetailsComponent } from '../employeedetails/employeedetails.component';

@Component({
  selector: 'app-dashboardchart',
  imports: [
    EmployeedetailsComponent,
    ChartModule,
    SelectButton,
    FormsModule,
    CommonModule,
    OverlayPanelModule,
    Button,
    TooltipModule
  ],
  templateUrl: './dashboardchart.component.html',
  styleUrl: './dashboardchart.component.css'
})
export class DashboardchartComponent implements OnInit{
  data!: any;
  options!: any;
  stateOptions: any[] = [{ label: 'Bar', value: 'bar' },{ label: 'Line', value: 'line' }];
  value: 'bar' | 'line' | undefined = 'bar';
  extand: boolean = false;
  attendanceArray: number[] = []
  empIdArray: string[] = []
  bgColor: string[] = []
  showDeatil!: boolean;
  empID!: string;

  constructor(private cd: ChangeDetectorRef,private empAttendance: EmployeeAttendanceHttpService) {}

   ngOnInit(): void {
    this.getData()
    setTimeout(()=>{
        this.chartValue()
    },100)
   }

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
                backgroundColor: 'rgba(93, 127, 134, 0.71)',
                // borderWidth: 1
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

   getData(){
    this.empAttendance.getEmployeeAttendanceData().subscribe( d => {
      for(let a in d){
        this.attendanceArray.push(Number(d[a].attendancecount))
        this.empIdArray.push(d[a].employeeid)
      }
    })
  }
  
  toExpand(){
    this.extand = true
  }

  closeExpand(){
    this.extand = false
  }

  onClickEvent(data: any){
    const {index} = data.element;
    if (data) {
      this.empID = this.data.labels[index]
      this.showDeatil = true
    }
  }

  openDeatil(data: boolean){
    this.showDeatil = data
  }
}
