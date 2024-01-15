import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MytasksRoutingModule } from './mytasks-routing.module';
import { MytasksComponent } from './mytasks.component';


@NgModule({
  declarations: [
    MytasksComponent
  ],
  imports: [
    CommonModule,
    MytasksRoutingModule
  ]
})
export class MytasksModule { }
