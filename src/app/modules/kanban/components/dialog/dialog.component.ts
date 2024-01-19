import { Component, OnInit } from '@angular/core';
import { FlosKanbanService } from '../../../../services/flos-kanban.service';
import { KanbanItem } from '../../../../services/KanbanItem';

@Component({
  selector: 'pit-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  kanbanItems$ = this.kanbanService.selector_data();
  selected$ = this.kanbanService.selector_selected();
  constructor(private kanbanService: FlosKanbanService) {}

  item: KanbanItem | undefined;

  ngOnInit(): void {
    this.selected$.subscribe((selected) => console.log(selected));
    this.selected$.subscribe((selected) => (this.item = selected));
  }

  selectone(id: number) {
    this.kanbanService.action_select(id);
  }
}
