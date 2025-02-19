import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser";
import { AppRouteModule } from "./Modules/approute.module";
import { HttpClientModule } from "@angular/common/http";
//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { SignupComponent } from "./Components/signup/signup.component";
import { AuthenticationService } from "./Services/auth/authentication.service";

//PrimeNg
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { HomeModule } from "./Modules/home.module";
import { HomeRouteModule } from "./Modules/homeroute.module";

@NgModule({
    declarations:[
        AppComponent,
        LoginComponent,
        SignupComponent
    ],
    imports:[
        BrowserModule,
        HttpClientModule,
        HomeModule,
        AppRouteModule,
        HomeRouteModule,
        FormsModule,
        CardModule,
        ButtonModule,
        ToastModule,
        AvatarModule
    ],
    providers:[
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        MessageService,
        AuthenticationService
    ],
    bootstrap:[ AppComponent ]
})
export class AppModule{

}