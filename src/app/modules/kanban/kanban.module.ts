import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DialogComponent } from "./components/dialog/dialog.component";
import { KanbanItemComponent } from "./components/kanban-item/kanban-item.component";
import { KanbanRoutingModule } from "./kanban-routing.module";
import { KanbanComponent } from "./kanban.component";

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
