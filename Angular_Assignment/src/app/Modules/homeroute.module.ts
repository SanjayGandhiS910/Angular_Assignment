import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes2 } from "../app.routes";

@NgModule({
    imports: [RouterModule.forChild(routes2)],
    exports: [RouterModule]
})
export class HomeRouteModule{}