import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./Components/login/login.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from "primeng/api";
import { SignupComponent } from "./Components/signup/signup.component";
import { AppRouteModule } from "./Modules/approute.module";
import { HomeModule } from "./Modules/home.module";
import { PasswordModule } from 'primeng/password';
import { PageNotFoundComponent } from "./Components/page-not-found/page-not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppRouteModule,
        HomeModule,
        ToastModule,
        CardModule,
        ButtonModule,
        PasswordModule
    ],
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule{}