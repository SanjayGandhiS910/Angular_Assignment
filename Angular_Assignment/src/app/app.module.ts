import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BrowserModule } from "@angular/platform-browser";
import { LoginComponent } from "./Components/login/login.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
//PrimeNg Modules
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from "./Components/home/home.component";
import { AppRoutesModule } from "./Modules/route.module";
import { SignupComponent } from "./Components/signup/signup.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutesModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        Toast,
        Ripple
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