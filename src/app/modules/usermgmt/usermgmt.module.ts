import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { UsermgmtRoutingModule } from "./usermgmt-routing.module";
import { UsermgmtComponent } from "./usermgmt.component";

@NgModule({
  declarations: [
    UsermgmtComponent
  ],
  imports: [
    CommonModule,
    UsermgmtRoutingModule
  ]
})
export class UsermgmtModule { }
