import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserDetailsService } from '../../../user.details';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule,HttpClientModule, InputTextModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  prodect!: { id: number; name: string; username: string; password: string; }[];

  constructor(private user: UserDetailsService ){}

  ngOnInit(): void {
    this.prodect = this.user.users
  }
}
