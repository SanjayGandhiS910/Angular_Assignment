import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { AdduserformComponent } from './adduserform/adduserform.component';
import { CommonModule, NgIf } from '@angular/common';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
    AdduserformComponent,
    NgIf,
    CommonModule,
    ToastModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  employeeData!: any[];
  temp!: any[];
  visible: boolean = false
  user!: boolean | null;
  arrlen!: number;
  array!: number[];
  arrbool!: boolean;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private empData: UserDetailsHttpService, private message: MessageService){}

  ngOnInit(): void {
    this.getData()
    this.user = localStorage.getItem('username') === 'Admin'
    setTimeout(()=>{
      if(this.arrlen <= 5)
        this.arrbool = false
      else if(this.arrlen > 5 && this.arrlen < 10){
        this.arrbool = true
        this.array = [5]
      }
      else if(this.arrlen >= 10 && this.arrlen < 15){
        this.arrbool = true
        this.array = [5,10]
      }else{
        this.arrbool = true
        this.array = [5,10,15]
      }
    },100)
  }

  getData(){
    this.empData.getUserData().subscribe(d=>{
      this.employeeData = d
      this.temp = d
      this.arrlen = d.length
    })
  }

  search(){
    let value = this.filter.nativeElement.value
    let l = value.length
    if(value === ''){
      this.employeeData = this.temp
    }else{
      this.employeeData = this.temp.filter(d => d.employeeid.slice(0,l).toLocaleLowerCase() == value.toLocaleLowerCase())
    }
  }

  isCloseForm(d: boolean){
    this.visible = d
    setTimeout(() => {
      this.getData()
    }, 100);
  }

  openForm(){
    let username = localStorage.getItem('username')
    if(username === 'Admin'){
      this.visible = true
    }else{
      this.message.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }
}
