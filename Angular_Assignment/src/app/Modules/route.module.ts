import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "../Components/login/login.component";
import { SignupComponent } from "../Components/signup/signup.component";

const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'home', loadChildren:()=> import('./menuroute.module')
        .then( route => route.MenuRouteModule)}
] 

@NgModule({
    imports:[ RouterModule.forRoot(routes) ],
    exports:[ RouterModule ]
})
export class AppRoutesModule{ }