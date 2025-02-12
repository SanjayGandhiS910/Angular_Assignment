import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('LoginForm') LoginForm!: NgForm;
  
  constructor(private messageService: MessageService,private user: AuthenticationService) {}

  toLogin(LoginForm: NgForm){
    let username = LoginForm.controls['username'].value
    let password = LoginForm.controls['password'].value
    let msg = this.user.logintoDashBoard(username,password)
    if(msg === 'Wrong Credentials'){
      this.showError(msg,'Invalid username or password')
    }
    this.LoginForm.reset()
  }

  showError(err: string,msg: string) {
    this.messageService.add({ severity: 'error', summary: err, detail: msg });
  }
}
