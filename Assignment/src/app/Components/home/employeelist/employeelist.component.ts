import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DepartmentListService } from '../../../Services/provideservice/deptlist.service';

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

  //input value
  inputValue: string = ''

  constructor(private empData: UserDetailsHttpService,private messageService: MessageService,
          private confirmationService: ConfirmationService,private emitData: DepartmentListService){
            emitData.getData().subscribe(d => {
              this.bool = d
            })
          }

  ngOnInit(): void {
    this.getData()
    this.username = localStorage.getItem('username')
    sessionStorage.setItem('currentPath','hrportal/employeelist')
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
    this.inputValue = ""
    this.formHeading = "Add User"
    this.addFormVisible = true
  }

  // open the edit employee form
  openEditForm(userData: any){
    this.inputValue = ""
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
    this.inputValue = ""
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
    if(this.inputValue === ''){
      this.employeeData = this.temp
    }else{
      this.employeeData = this.temp.filter(d => (d.firstname + " " + d.lastname).toLocaleLowerCase().includes(this.inputValue.toLocaleLowerCase()))
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
    });
  }
}
