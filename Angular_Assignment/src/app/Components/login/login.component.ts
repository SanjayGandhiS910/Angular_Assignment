import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  @ViewChild('LoginForm') LoginForm!: NgForm;
  user: AuthService = inject(AuthService)
  
  constructor(private messageService: MessageService) {}

  toLogin(LoginForm: NgForm){
    let username = LoginForm.controls['username'].value
    let password = LoginForm.controls['password'].value
    let msg = this.user.logintoHome(username,password)
    if(msg === 'Wrong Credentials'){
      this.showError(msg,'Invalid username or password')
    }
    this.LoginForm.reset()
  }

  showError(err: string,msg: string) {
    this.messageService.add({ severity: 'error', summary: err, detail: msg });
  }
}

