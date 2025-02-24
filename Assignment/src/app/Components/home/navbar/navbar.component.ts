import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  url: string = 'images/adminicon.png';

  @Output() closeNavbar = new EventEmitter();
  user: boolean = false;
  username!: string | null;
  checked: boolean = false
  
  constructor(private confirmationService: ConfirmationService, 
              private messageService: MessageService,
            private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    if(this.username === 'Admin'){
      this.user = true
    }
    localStorage.setItem('isLogin','false')
  }

  onToggle(){
    if(!this.checked){
      this.checked = true
      this.closeNavbar.emit(true)
    }
    else{
      this.checked =false
      this.closeNavbar.emit(false)
    }
  }

  goToLoginPage(){
    localStorage.setItem('isLogin','true')
    this.router.navigate(['/'])
  }
}
