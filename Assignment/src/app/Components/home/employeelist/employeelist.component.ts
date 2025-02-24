import { Component, OnInit } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { CommonModule } from '@angular/common';
import { EmployeelistformComponent } from './employeelistform/employeelistform.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employeelist',
  imports: [
    OverlayPanelModule,
    ButtonModule,
    CardModule,
    CommonModule,
    EmployeelistformComponent,
    DialogModule,
    ToastModule
  ],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{

  visible!: boolean;
  isVisible!: boolean;
  employeeData!: any[];
  emp!: any;
  username!: string | null;

  constructor(private empData: UserDetailsHttpService,private messageService: MessageService){}

  ngOnInit(): void {
    this.getData()
    this.username = localStorage.getItem('username')
  }

  getData(){
    this.empData.getUserData().subscribe(d => {
      this.employeeData = d
    })
  }

  openEditForm(userData: any){
    if(this.username === 'Admin'){
      this.isVisible = true
      this.emp = userData
    }else{
      this.messageService.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }

  openViewForm(userData: any){
    this.visible = true
    this.emp = userData
  }

  closeForm(bool: boolean){
    this.visible = bool;
    this.isVisible = bool;
    setTimeout(() => {
      this.getData()
    }, 100);
  }

  deleteEmpData(id: string){
    this.empData.deleteEmployeeList(id)
    setTimeout(() => {
      this.getData()
    }, 100);
  }
}
