import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

//Components
import { AppComponent } from "./app.component";
import { LoginComponent } from "./Components/login/login.component";
import { SignupComponent } from "./Components/signup/signup.component";

//PrimeNg Modules
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppRoutesModule } from "./Modules/route.module";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuRouteModule } from "./Modules/menuroute.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent
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
        Ripple,
        DrawerModule,
        AvatarModule,
        AvatarGroupModule,
        MenuRouteModule
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