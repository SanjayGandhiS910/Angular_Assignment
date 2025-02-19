import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../Services/http/signuphttp.service';
import { User } from '../../Services/Syntax/syntax.service';
import { AuthenticationService } from '../../Services/provideservice/authentication.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  @ViewChild('LoginForm') LoginForm!: NgForm;
  userData!: User[];
  
  constructor(private userVal: SignupService,private user: AuthenticationService) {}

  ngOnInit(): void {
    this.userVal.getUserData().subscribe( data => {
      this.userData = data
    })
  }

  toLogin(){
    let username = this.LoginForm.controls['username'].value
    let password = this.LoginForm.controls['password'].value
    this.user.checkUsernameandPassword(username,password,this.userData)
    this.LoginForm.reset()
  }
}
