import { NgModule } from "@angular/core";
import { HomeComponent } from "../Components/home/home.component";
import { HeaderComponent } from "../Components/home/header/header.component";
import { NavbarComponent } from "../Components/home/navbar/navbar.component";
import { HomeRouteModule } from "./homeroute.module";

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

@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent,
        NavbarComponent
    ],
    imports:[
        HomeRouteModule,
        FormsModule,
        CommonModule,
        ToggleButtonModule,
        ButtonModule,
        ConfirmDialog,
        ToastModule,
        OverlayPanelModule
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