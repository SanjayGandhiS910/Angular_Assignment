import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

//Components
import { DashboardComponent } from "../Components/dashboard/dashboard.component";
import { HeaderComponent } from "../Components/header/header.component";
import { MenubarComponent } from "../Components/menubar/menubar.component";
import { HomeComponent } from "../Components/home/home.component";

//PrimeNg Modules
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuRouteModule } from "./menuroute.module";

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        MenubarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MenuRouteModule,
        CardModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        Toast,
        Ripple,
        DrawerModule,
        AvatarModule,
        AvatarGroupModule
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
    exports: [ MenuRouteModule]
})
export class HomeModule{}