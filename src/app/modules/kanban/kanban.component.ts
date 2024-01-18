import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';

@Component({
  selector: 'pit-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  kanbanItems$ = this.kanbanService.selector_data();

  isLoading$ = this.kanbanService.selector_isLoading();

  selected$ = this.kanbanService.selector_selected();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(private kanbanService: FlosKanbanService) {}

  dialog: boolean = false; //this.selected$ === undefined;

  ngOnInit(): void {
    this.kanbanService.action_load();

    const state$ = this.kanbanService.selector_state();
    state$.subscribe((state) => console.log(state));
  }

  show(status: string, column: string): boolean {
    if (status === column) {
      return true;
    } else {
      return false;
    }
  }

  select(id: number) {
    this.kanbanService.action_select(id);
    this.dialog = true;
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }
}
