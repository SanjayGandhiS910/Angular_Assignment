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
import { DepartmentListService } from '../../../Services/provideservice/deptlist.service';
import { LoadingComponent } from '../shared-component/loading/loading.component';

@Component({
  selector: 'app-employeelist',
  standalone: false,
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent implements OnInit{

  // to send the Form Heading value EmployeelistComponent to EmployeelistformComponent
  formHeading: string = '';

  //Before Fetching Data 
  isLoading: boolean = false;

  // Open or close editform based on the this value
  editFormVisible!: boolean;
  
  // Open or close viewform based on the this value
  viewVisible!: boolean;

  // Open or close add employee form based on the this value
  addFormVisible!: boolean;

  // to store employees details
  employeeData!: any[];
  temp!: any[];

  // to store employee detail
  emp!: any;

  // to store value which user login
  username!: string | null;

  // using this value to Define the card gap
  bool!: boolean;

  // get value from input
  @ViewChild('filter') filter!: ElementRef;

  constructor(private empData: UserDetailsHttpService,private messageService: MessageService,
          private confirmationService: ConfirmationService,private emitData: DepartmentListService){
            emitData.getData().subscribe(d => {
              this.bool = d
            })
          }

  ngOnInit(): void {
    this.getData()
    this.username = localStorage.getItem('username')
  }

  // get the employee details
  getData(){
    this.isLoading = true
    this.empData.getUserData().subscribe(d => {
      this.employeeData = d
      this.temp = d
      this.isLoading = false
    })
  }
  
  // open the Add Employee Form show
  openForm(){
    this.addFormVisible = true
  }

  // open the edit employee form
  openEditForm(userData: any){
    this.formHeading = "Edit User"
    if(this.username === 'Admin'){
      this.editFormVisible = true
      this.emp = userData
    }else{
      this.messageService.add({ severity: 'error', summary: "User Cannot able to add user"});
    }
  }

  //open the View employee form
  openViewForm(userData: any){
    this.formHeading = "View User"
    this.viewVisible = true
    this.emp = userData
  }

  //close the View and edit employee form
  closeForm(bool: boolean){
    this.editFormVisible = bool;
    this.viewVisible = bool;
    this.addFormVisible = bool;
    setTimeout(() => {
      this.getData()
    }, 100);
  }

  // Delete the employee detail
  deleteEmpData(id: string){
    this.empData.deleteEmployeeList(id)
    setTimeout(() => {
      this.getData()
    }, 100);
  }

  //Search for Employee Card Table based on Employee Name
  search(){
    let value = this.filter.nativeElement.value
    let l = value.length
    if(value === ''){
      this.employeeData = this.temp
    }else{
      this.employeeData = this.temp.filter(d => (d.firstname + " " + d.lastname).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
    }
  }

  //Delete confirmation popup
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
