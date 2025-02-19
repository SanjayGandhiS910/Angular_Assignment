import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { UserDetailsService } from '../../../../user.details';
import { ButtonModule } from 'primeng/button';
import { InputGroup } from 'primeng/inputgroup';
import { FormComponent } from '../form/form.component';
import { UserDetails } from '../../../../Services/userdata/users.service';

@Component({
  selector: 'app-employeetable',
  imports: [TableModule,HttpClientModule, InputTextModule,ButtonModule
    ,InputGroup,FormComponent,NgIf
  ],
  templateUrl: './employeetable.component.html',
  styleUrl: './employeetable.component.css'
})
export class EmployeetableComponent{

  @Input() userdata!: UserDetails[];

  openForm: boolean = false;

  isOpenForm(){
    this.openForm = true
  }

  isCloseForm(close: boolean){
    this.openForm = close
  }
}
