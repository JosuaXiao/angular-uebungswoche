import { Component, Input } from '@angular/core';
import { KanbanItem } from '../../../../services/KanbanItem';

@Component({
  selector: 'pit-kanban-item',
  templateUrl: './kanban-item.component.html',
  styleUrl: './kanban-item.component.scss',
})
export class KanbanItemComponent {
  @Input({ required: true }) item!: KanbanItem;
}
