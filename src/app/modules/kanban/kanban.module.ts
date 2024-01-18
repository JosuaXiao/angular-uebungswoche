import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { KanbanItemComponent } from './components/kanban-item/kanban-item.component';
import { DialogComponent } from './components/dialog/dialog.component';


@NgModule({
  declarations: [
    KanbanComponent,
    KanbanItemComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
