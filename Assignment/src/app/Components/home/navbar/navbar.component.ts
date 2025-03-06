import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DepartmentListService } from '../../../Services/provideservice/deptlist.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  url: string = 'images/adicon.webp';

  @Output() closeNavbar = new EventEmitter();
  user: boolean = false;
  username!: string | null;
  checked: boolean = false
  
  constructor(private emitData: DepartmentListService,
            private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')
    if(this.username === 'Admin'){
      this.user = true
    }
    sessionStorage.setItem('isLogin','false')
  }

  onToggle(){
    if(!this.checked){
      this.checked = true
      this.closeNavbar.emit(true)
      this.emitData.putData(true)
    }
    else{
      this.checked =false
      this.closeNavbar.emit(false)
      this.emitData.putData(false)
    }
  }

  goToLoginPage(){
    sessionStorage.setItem('isLogin','true')
    this.router.navigate(['/'])
  }
}
