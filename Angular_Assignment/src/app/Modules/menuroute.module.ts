import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { DashboardComponent } from "../Components/dashboard/dashboard.component";
import { UserGuards } from "../Guards/user.guard";
import { HomeComponent } from "../Components/home/home.component";

const routes: Routes = [
    {path:'home',component: HomeComponent},
    {path:'dashboard',component:DashboardComponent, canActivate: [UserGuards]}
] 

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports:[ RouterModule ]
})
export class MenuRouteModule{ }