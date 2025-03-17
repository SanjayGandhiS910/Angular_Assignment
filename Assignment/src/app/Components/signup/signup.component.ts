import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SignupService } from '../../Services/http/signuphttp.service';
import { User } from '../../Services/Syntax/syntax.service';
import { AuthenticationService } from '../../Services/provideservice/authentication.service';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('SignupForm') SignupForm!: NgForm;
  userData!: User[];
  
  constructor(private userVal: SignupService,private user: AuthenticationService,private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.userVal.getUserData().subscribe( data => {
      this.userData = data
    })
  }

  addUser(){
    let username = this.SignupForm.controls['username'].value
    let password = this.SignupForm.controls['password'].value
    let cpassword = this.SignupForm.controls['confirmpassword'].value
    let msg = this.user.newUserName(username,password,cpassword,this.userData)
    if( msg !== undefined){
      this.messageService.add({ severity: 'error', summary: msg});
    }else{
      this.SignupForm.reset()
    }
    
  }
}

