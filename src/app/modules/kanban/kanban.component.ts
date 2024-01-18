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
  kanbanItems$ = this.kanbanService.selectData();

  isLoading$ = this.kanbanService.selectIsLoading();

  selected$ = this.kanbanService.selectCurrent();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(private kanbanService: FlosKanbanService) {}

  ngOnInit(): void {
    this.kanbanService.loadAction();
  }

  show(status: string, column: string): boolean {
    console.log('hallo');
    if (status === column) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }
}
