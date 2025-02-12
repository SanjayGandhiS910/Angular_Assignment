import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserDetailsService } from '../../../user.details';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-departmentlist',
  imports: [TableModule,InputTextModule],
  templateUrl: './departmentlist.component.html',
  styleUrl: './departmentlist.component.css'
})
export class DepartmentlistComponent {
  prodect!: { id: number; name: string; username: string; password: string; }[];
  
    constructor(private user: UserDetailsService ){}
  
    ngOnInit(): void {
      this.prodect = this.user.users
    }
}
