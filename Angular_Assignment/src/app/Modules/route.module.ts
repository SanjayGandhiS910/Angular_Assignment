import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { HomeComponent } from "../Components/home/home.component";
import { LoginComponent } from "../Components/login/login.component";
import { SignupComponent } from "../Components/signup/signup.component";
import { UserGuards } from "../Guards/user.guard";

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'home',component:HomeComponent, canActivate: [UserGuards]},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
] 

@NgModule({
    imports:[ RouterModule.forRoot(routes) ],
    exports:[ RouterModule ]
})
export class AppRoutesModule{ }