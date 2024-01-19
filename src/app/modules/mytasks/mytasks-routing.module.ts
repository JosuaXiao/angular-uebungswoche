import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MytasksComponent } from "./mytasks.component";

const routes: Routes = [{ path: '', component: MytasksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MytasksRoutingModule { }
