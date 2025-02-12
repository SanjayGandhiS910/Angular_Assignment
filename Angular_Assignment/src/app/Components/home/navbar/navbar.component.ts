import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  username!: string;

  constructor(private user: AuthenticationService){}

  ngOnInit(): void {
    this.username = this.user.username
    console.log(this.username)
  }
}
