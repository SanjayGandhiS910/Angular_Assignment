import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DepartmentListService } from '../../../../Services/provideservice/deptlist.service';
import { UserDetailsHttpService } from '../../../../Services/http/userdetails.service';
import { DeptdetilComponent } from "../deptdetil/deptdetil.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-noofemployeechart',
  imports: [
    ChartModule,
    FormsModule,
    CommonModule,
    OverlayPanelModule,
    Button,
    TooltipModule,
    DeptdetilComponent,
    SelectButton
],
  templateUrl: './noofemployeechart.component.html',
  styleUrl: './noofemployeechart.component.css'
})
export class NoofemployeechartComponent implements OnInit{
  data!: any;
  options!: any;
  stateOptions: any[] = [{ label: 'Pie', value: 'pie' },{ label: 'Doughnut', value: 'doughnut' }];
  value: 'pie' | 'doughnut' | undefined = 'pie';
  extand: boolean = false;
  noofemployeeArray: number[] = []
  deptIdArray: string[] = ['001','002','003','004','005','006','007','008','009','010']
  bgColor: string[] = []
  deptID!: string;
  noofemp!: number
  showDeatil!: boolean;

  constructor(private cd: ChangeDetectorRef, private empData: UserDetailsHttpService, private deptService: DepartmentListService,
              private router: Router
  ) {}

   ngOnInit(): void {
    this.getEmpData()
    setTimeout(()=>{
        this.chartValue()
    },100)
   }

  chartValue(){
    this.data = {
      labels: this.deptIdArray,
      datasets: [
          {
              data: this.noofemployeeArray,
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

  getEmpData(){
    this.empData.getUserData().subscribe( d => {
      this.noofemployeeArray = this.deptService.attendanceCount(d)
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
      this.deptID = this.data.labels[index]
      this.noofemp = this.data.datasets[0].data[index]
      console.log(typeof this.noofemp)
      console.log(this.deptID)
      this.showDeatil = true
    }
  }

  closeDetail(event: any){
    this.showDeatil = event
  }
}
