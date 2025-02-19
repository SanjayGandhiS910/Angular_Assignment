import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { routes1 } from "../app.routes";

@NgModule({
    imports: [RouterModule.forRoot(routes1)],
    exports: [RouterModule]
})
export class AppRouteModule{}