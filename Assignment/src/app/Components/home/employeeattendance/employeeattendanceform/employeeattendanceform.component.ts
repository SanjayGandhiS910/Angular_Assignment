import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-employeeattendanceform',
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    DatePickerModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    SelectModule,
    TextareaModule
  ],
  templateUrl: './employeeattendanceform.component.html',
  styleUrl: './employeeattendanceform.component.css'
})
export class EmployeeattendanceformComponent implements OnDestroy{

  @ViewChild('EmployeeAttendanceForm') EmployeeAttendanceForm!: NgForm;

  ngOnDestroy(): void {
    
    console.log(222)
  }
}
