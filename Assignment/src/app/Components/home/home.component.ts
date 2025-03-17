import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  closeNav: boolean = false;

  closeNavbar(bool: boolean){
    this.closeNav = bool
  }
}
