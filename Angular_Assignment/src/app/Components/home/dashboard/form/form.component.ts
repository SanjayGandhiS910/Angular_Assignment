import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButton } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

interface City{
  name: string, code: string
}
@Component({
  selector: 'app-form',
  imports: [FormsModule,FileUploadModule,HttpClientModule,ButtonModule,DatePickerModule
    ,InputTextModule,InputGroupModule,InputGroupAddonModule,FloatLabelModule,RadioButton,
    SelectModule,TextareaModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Output() closeForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('AddEmplyeeForm') addEmploteeDate!: NgForm;

  ingredient!: string;

  value1: City | undefined;

    value2: City | undefined;

    value3: City | undefined;

    cities!: City[];

    ngOnInit(): void {
      this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];
    }

    isCloseForm(){
      console.log(this.closeForm)
      this.closeForm.emit(false)
    }

    onSumbit(form: NgForm){
      console.log(form.value)
      form.reset()
    }
}
