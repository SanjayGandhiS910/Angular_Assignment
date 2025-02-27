import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './Components/home/dashboard/dashboard.component';
import { EmployeelistComponent } from './Components/home/employeelist/employeelist.component';
import { DepartmentlistComponent } from './Components/home/departmentlist/departmentlist.component';
import { HomeComponent } from './Components/home/home.component';
import { RouteAuthService } from './Services/auth/routeauth.service';
import { EmployeeattendanceComponent } from './Components/home/employeeattendance/employeeattendance.component';
import { DepartmentdetailComponent } from './Components/home/departmentlist/departmentdetail/departmentdetail.component';

export const routes1: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'hrportal',
        loadChildren: ()=>import('./Modules/homeroute.module')
            .then((path)=>path.HomeRouteModule)
    }
];

export const routes2: Routes = [
    {
        path: 'hrportal',
        component: HomeComponent,
        canActivate: [ RouteAuthService ],
        children:[
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'employeelist',
                component: EmployeelistComponent
            },
            {
                path: 'employeeattendance',
                component: EmployeeattendanceComponent
            },
            {
                path: 'departmentlist',
                component: DepartmentlistComponent
            }
            ,
            {
                path: 'departmentlist/:id',
                component: DepartmentdetailComponent
            }
        ]
    }
];
