import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DepartmentListService } from '../../../../Services/provideservice/deptlist.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noofemployeechart',
  standalone: false,
  templateUrl: './noofemployeechart.component.html',
  styleUrl: './noofemployeechart.component.css'
})
export class NoofemployeechartComponent implements OnInit{
  // Chart Values
  data!: any;
  options!: any;

  //  SelectButton Values
  stateOptions: any[] = [{ label: 'Pie', value: 'pie' },{ label: 'Doughnut', value: 'doughnut' }];
  value: 'pie' | 'doughnut' | undefined = 'pie';

  // Expand Chart 
  extand: boolean = false;

  // Array For Attendance Count and EmployeeId and chart backgrounnd colour
  noOfEmployeeArray: number[] = []
  deptIdArray: string[] = ['Software Development','Network Engineering','Cybersecurity','Database Administration','System Administration'
                  ,'Cloud Computing','IT Support','Quality Assurance','Business Intelligence','DevOps']
  bgColor: string[] = []

  // Department Details Form 
  showDeatil!: boolean;
  
  // Using deptID Property to store Emplyoee Id
  deptID!: string;

  // Using noOfEmp Property to store Emplyoee Id
  noOfEmp!: number

  constructor(private cd: ChangeDetectorRef, private empData: UserDetailsHttpService, private deptService: DepartmentListService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmpData()
    setTimeout(()=>{
        this.chartValue()
    },200)
  }

  //Chart Values
  chartValue(){
    this.data = {
      labels: this.deptIdArray,
      datasets: [
          {
              data: this.noOfEmployeeArray,
              backgroundColor: ['rgba(201, 201, 201, 0.71)','rgba(255, 215, 215, 0.71)','rgba(208, 178, 255, 0.71)'
                ,'rgba(179, 255, 231, 0.71)','hsla(209, 100.00%, 84.90%, 0.71)','rgba(215, 251, 97, 0.71)','rgba(183, 255, 210, 0.71)'
                ,'rgba(248, 255, 181, 0.71)','rgba(255, 186, 249, 0.71)','rgba(255, 177, 198, 0.71)'
              ],
              hoverBackgroundColor: ['rgba(128, 128, 128, 0.50)','rgba(251, 97, 97, 0.50)','rgba(81, 33, 157, 0.50)'
                ,'rgba(97, 251, 202, 0.50)','rgba(33, 97, 157, 0.50)','rgba(215, 251, 97, 0.50)','rgba(0, 156, 57, 0.50)'
                ,'rgba(175, 193, 21, 0.50)','rgba(157, 33, 147, 0.50)','rgba(202, 2, 55, 0.5)'
              ]
          }
      ]
    };

    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: 'rgb(0, 0, 0)'
                }
            }
        }
    };
    this.cd.markForCheck()
  }

  //Get the noOfEmployeeArray Values
  getEmpData(){
    this.empData.getUserData().subscribe( d => {
      this.noOfEmployeeArray = this.deptService.attendanceCount(d)
    })
  }

  //To Expand The DashBoard Chart
  toExpand(){
    this.extand = true
  }

  //To Close the expanded DashBoard Chart
  closeExpand(){
    this.extand = false
  }

  //Show The Details Based on the Employee Id
  onClickEvent(data: any){
    const {index} = data.element;
    if (data) {
      this.deptID = this.data.labels[index]
      this.noOfEmp = this.data.datasets[0].data[index]
      this.showDeatil = true
    }
  }

  //Send the data from NoofemployeechartComponent to DeptdetilComponent
  closeDetail(event: any){
    this.showDeatil = event
  }
}
