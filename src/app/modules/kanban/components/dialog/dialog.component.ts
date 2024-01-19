import { Subject, takeUntil } from "rxjs";

import { Component, OnDestroy, OnInit } from "@angular/core";

import { FlosKanbanService } from "../../../../services/flos-kanban.service";
import { KanbanItem } from "../../../../services/KanbanItem";

@Component({
  selector: 'pit-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnDestroy {
  kanbanItems$ = this.kanbanService.selector_data();
  selected$ = this.kanbanService.selector_selected();
  constructor(private kanbanService: FlosKanbanService) {}

  item: KanbanItem | undefined;
  #ngUnsubscribe = new Subject<void>();

  ngOnInit(): void {
    this.selected$
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe((selected) => {
        console.log(selected);
        this.item = selected;
      });
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }

  selectone(id: number) {
    this.kanbanService.action_select(id);
  }
}
