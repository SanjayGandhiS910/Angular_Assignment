import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { EmployeeAttendanceHttpService } from '../../../../Services/http/employeeattendance.service';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardchart',
  imports: [
    ChartModule,
    SelectButton,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dashboardchart.component.html',
  styleUrl: './dashboardchart.component.css'
})
export class DashboardchartComponent implements OnInit{
  data!: any;
  options!: any;
  stateOptions: any[] = [{ label: 'Bar', value: 'bar' },{ label: 'Line', value: 'line' }];
  value: 'bar' | 'line' | undefined = 'bar';
  @Input() attendanceArray: number[] = []
  @Input() empIdArray: string[] = []
  bgColor: string[] = []
  constructor(private cd: ChangeDetectorRef,private empAttendance: EmployeeAttendanceHttpService) {}
   ngOnInit(): void {
    this.getData()
    setTimeout(()=>{
        this.chartValue()
        for(let i in this.attendanceArray){
            let bg = 'rgba('+ this.attendanceArray[i]  +','+ this.attendanceArray[i] * Number(i)*Number(i) +','+ this.attendanceArray[i] * Number(i)*Number(i)*Number(i)  +', 0.7)'
            this.bgColor.push(bg)
        }
    },100)
   }

   chartValue(){
    this.data = {
        labels: this.empIdArray,
        datasets: [
            {
                label: 'Employee Attendance Count',
                data: this.attendanceArray,
                fill: false,
                tension: 0.4,
                borderColor: 'rgba(41, 41, 41, 0.71)',
                backgroundColor: this.bgColor,
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
      console.log(this.attendanceArray)
      console.log(this.empIdArray)
    })
  }
}
