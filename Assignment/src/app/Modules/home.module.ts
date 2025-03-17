import { NgModule } from "@angular/core";
import { HomeComponent } from "../Components/home/home.component";
import { HeaderComponent } from "../Components/home/header/header.component";
import { NavbarComponent } from "../Components/home/navbar/navbar.component";
import { HomeRouteModule } from "./homeroute.module";
import { DashboardComponent } from "../Components/home/dashboard/dashboard.component";
import { DashboardchartComponent } from "../Components/home/dashboard/dashboardchart/dashboardchart.component";
import { NoofemployeechartComponent } from "../Components/home/dashboard/noofemployeechart/noofemployeechart.component";
import { EmployeedetailsComponent } from "../Components/home/dashboard/employeedetails/employeedetails.component";
import { DeptdetilComponent } from "../Components/home/dashboard/deptdetil/deptdetil.component";
import { DepartmentlistComponent } from "../Components/home/departmentlist/departmentlist.component";
import { DepartmentdetailComponent } from "../Components/home/departmentlist/departmentdetail/departmentdetail.component";
import { EmployeeattendanceComponent } from "../Components/home/employeeattendance/employeeattendance.component";
import { EmployeeattendanceformComponent } from "../Components/home/employeeattendance/employeeattendanceform/employeeattendanceform.component";
import { LoadingComponent } from "../Components/home/shared-component/loading/loading.component";
import { EmployeelistformComponent } from "../Components/home/employeelist/employeelistform/employeelistform.component";
import { EmployeelistComponent } from "../Components/home/employeelist/employeelist.component";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { CommonModule } from "@angular/common";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { SelectButton } from 'primeng/selectbutton';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { PaginatorModule } from 'primeng/paginator';
import { Dialog } from 'primeng/dialog';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';

@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent,
        NavbarComponent,
        DashboardComponent,
        DashboardchartComponent,
        NoofemployeechartComponent,
        EmployeedetailsComponent,
        DeptdetilComponent,
        DepartmentlistComponent,
        DepartmentdetailComponent,
        EmployeeattendanceComponent,
        EmployeeattendanceformComponent,
        EmployeelistComponent,
        EmployeelistformComponent
    ],
    imports:[
        LoadingComponent,
        HomeRouteModule,
        FormsModule,
        CommonModule,
        ToggleButtonModule,
        ButtonModule,
        ConfirmDialog,
        ToastModule,
        OverlayPanelModule,
        TooltipModule,
        ChartModule,
        SelectButton,
        Button,
        TableModule,
        InputTextModule,
        InputGroupModule,
        Dialog,
        PaginatorModule,
        DialogModule,
        DatePickerModule,
        InputGroupAddonModule,
        FloatLabelModule,
        SelectModule,
        TextareaModule,
        CardModule,
        FileUploadModule,
        CalendarModule,
        MessageModule
    ],
    providers:[
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        ConfirmationService,
        MessageService
    ],
    exports:[HomeRouteModule]
})
export class HomeModule{

}