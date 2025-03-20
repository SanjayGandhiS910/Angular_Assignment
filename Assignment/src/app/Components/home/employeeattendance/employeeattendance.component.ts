import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeAttendanceHttpService } from '../../../Services/http/employeeattendance.service';
import { Department, EmployeeAttendance, EmployeeList } from '../../../Services/Syntax/syntax.service';
import { MessageService } from 'primeng/api';
import { DepartmentHttpService } from '../../../Services/http/department.service';
import { UserDetailsHttpService } from '../../../Services/http/userdetails.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-employeeattendance',
  standalone: false,
  templateUrl: './employeeattendance.component.html',
  styleUrl: './employeeattendance.component.css',
  providers: [ConfirmationService]
})
export class EmployeeattendanceComponent implements OnInit{
  inputValue: string = ''

  @ViewChild('dt2') tableSort!: any;
  // to store the Employee Attendance Details
  empAttendance!: EmployeeAttendance[];
  empData!: EmployeeAttendance[]

  // to store the Employees Details
  empList!: EmployeeList[];

  // to store the Department Details
  deptList!: Department[];

  // for Verfication form
  visible: boolean = false;

  // for Employee Attendance Form 
  isVisible: boolean = false

  // send the department id and employee id to EmployeeattendanceformComponent
  deptId: string = ''
  empId: string = ''

  // for update employee attendance form 
  empDet: boolean = false

  // for edit employee attendance form
  isEditIcon!: boolean;

  // to store the Employee detail
  emp!: any

  // to store which user login
  username!: string | null

  // to store employee attendance array length
  arrlen!: number;

  // paginator array
  array!: number[];

  // for paginator icons
  icon: boolean = false;
  arrbool!: boolean;


  constructor(private employeeattendance: EmployeeAttendanceHttpService,
        private messageService: MessageService,
        private employeelist: UserDetailsHttpService,
        private departmentlist: DepartmentHttpService,
        private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.getAllValue()
    this.username = localStorage.getItem('username')
    sessionStorage.setItem('currentPath','hrportal/employeeattendance')
    setTimeout(()=>{
      if(this.arrlen <= 5)
        this.arrbool = false
      else{
        this.arrbool = true
        this.array = [5,10,15]
      }
    },100)
  }

  // get the employee attendance , employee list , department list values
  getAllValue(){
    this.employeeattendance.getEmployeeAttendanceData().subscribe( d =>{
      this.empAttendance = d
      this.empData = d
      this.arrlen = d.length
    })
    this.employeelist.getUserData().subscribe( d => {
      this.empList = d
    })
    this.departmentlist.getDepartmentData().subscribe( d => {
      this.deptList = d
    })
  }

  // close the verification form
  closeDialog(){
    this.visible = false
  }

  // open the verification form
  showDialog() {
    this.visible = true;
    this.empId = ''
    this.deptId = ''
    this.inputValue = ''
    this.tableSort.filterGlobal('', 'contains')
  }

  // after verification successful navigate to add Employee Attendance form
  navigateToEmpList(){
    let id = this.empData.find( d => d.employeeid === this.empId)
    let deptName1: any = this.empList.find( d => d.employeeid === this.empId)?.departmentname
    let d = deptName1.name
    let deptName2 = this.deptList.find( d => d.departmentid === this.deptId)?.departmentname
    if( d === deptName2 && !id){
      this.visible = false
      this.isVisible = true
    }else if(id){
      this.messageService.add({ severity: 'error', summary: "EmployeeId Alreadey Exits"});
    }else{
      this.messageService.add({ severity: 'error', summary: "Invalid EmployeeId or DepartmentId"});
    }
  }

  // Click Table row to open the view employee attendance form
  empAtt(user: any){
    this.inputValue = ''
    this.tableSort.filterGlobal('', 'contains')
    this.emp = user
    this.empDet = true
    this.isEditIcon = true
  }

  // Click edit icon to open the edit employee attendance form
  editIcon(user: any){
    this.inputValue = ''
    this.tableSort.filterGlobal('', 'contains')
    this.emp = user
    this.empDet = true
    this.isEditIcon = false
  }

  //Search for Department list Table
  search(){
    if(this.inputValue === ''){
      this.empAttendance = this.empData
    }else{
      this.empAttendance = this.empData.filter(d => d.employeeid.includes(this.inputValue))
    }
  }

  // delete employee attendance
  deleteEmpAttendanceData(id: string){
    this.employeeattendance.deleteEmployeeAttendance(id)
    setTimeout(() => {
      this.getAllValue()
    }, 100);
  }

  // Click Table delete icon to open the Confirm Popup 
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
            this.deleteEmpAttendanceData(id)
        }
    });
  }

  // close the add, update, view employee attendace form
  closeForm(s: boolean){
    this.isVisible = s
    this.empDet = s
    setTimeout(() => {
      this.getAllValue()
    }, 100);
  }

  // Hide the Paginator icon
  onPageChange(event: any) {
    if(event.rows >= this.arrlen)
      this.icon = true
    else
      this.icon = false
  }

}
