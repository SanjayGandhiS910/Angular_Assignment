import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../Services/auth/authentication.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('SignupForm') SignupForm!: NgForm;
  
  constructor(private messageService: MessageService,private router: Router,
    private user: AuthenticationService
  ) {}

  onSignUp(SignupForm: NgForm){
    let username = SignupForm.controls['username'].value
    let password = SignupForm.controls['password'].value
    let cpassword = SignupForm.controls['confirmpassword'].value

    if(password !== cpassword){
      this.showError('Password','Password do not match');
    }else{
      let msg = this.user.signuptoDashBoard(username,password,cpassword)
      // if(msg === 'User Name Already Exits'){
      //   this.showError('User Name','User Name Already  Exists');
      // }
    }

    this.SignupForm.reset()
  }

  showError(err: string,msg: string) {
    this.messageService.add({ severity: 'error', summary: err, detail: msg });
  }
}
