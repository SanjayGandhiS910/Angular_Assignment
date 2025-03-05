import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { CommonModule } from '@angular/common';
import { EmployeelistformComponent } from './employeelistform/employeelistform.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputGroupModule } from 'primeng/inputgroup';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-employeelist',
  imports: [
    OverlayPanelModule,
    ButtonModule,
    CardModule,
    CommonModule,
    EmployeelistformComponent,
    DialogModule,
    ToastModule,
    InputGroupModule
],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{

  formHeading: string = '';
  editFormVisible!: boolean;
  viewVisible!: boolean;
  addFormVisible!: boolean;
  employeeData!: any[];
  temp!: any[];
  emp!: any;
  username!: string | null;
  @ViewChild('filter') filter!: ElementRef;

  constructor(private empData: UserDetailsHttpService,private messageService: MessageService,
          private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.getData()
    this.username = localStorage.getItem('username')
  }

  getData(){
    this.empData.getUserData().subscribe(d => {
      this.employeeData = d
      this.temp = d
    })
  }

  openEditForm(userData: any){
    this.formHeading = "Edit User"
    if(this.username === 'Admin'){
      this.editFormVisible = true
      this.emp = userData
    }else{
      this.messageService.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }

  openViewForm(userData: any){
    this.formHeading = "View User"
    this.viewVisible = true
    this.emp = userData
  }

  closeForm(bool: boolean){
    this.editFormVisible = bool;
    this.viewVisible = bool;
    this.addFormVisible = bool;
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

  search(){
    let value = this.filter.nativeElement.value
    let l = value.length
    if(value === ''){
      this.employeeData = this.temp
    }else{
      this.employeeData = this.temp.filter(d => (d.firstname + " " + d.lastname).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }
  }

  openForm(){
    let username = localStorage.getItem('username')
    this.formHeading = "Add User"
    if(username === 'Admin'){
      this.addFormVisible = true
    }else{
      this.messageService.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }

  confirm(event: Event,id: string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.deleteEmpData(id)
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
  }
}
