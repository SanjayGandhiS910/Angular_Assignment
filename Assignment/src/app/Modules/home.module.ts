import { NgModule } from "@angular/core";
import { HomeComponent } from "../Components/home/home.component";
import { HeaderComponent } from "../Components/home/header/header.component";
import { NavbarComponent } from "../Components/home/navbar/navbar.component";
import { HomeRouteModule } from "./homeroute.module";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent,
        NavbarComponent
    ],
    imports:[
        HomeRouteModule
    ],
    providers:[
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ],
    exports:[HomeRouteModule]
})
export class HomeModule{

}