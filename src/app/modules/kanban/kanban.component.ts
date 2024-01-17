import { Component, OnDestroy } from '@angular/core';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';

@Component({
  selector: 'pit-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnDestroy {
  items$ = this.kanbanService.get();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(private kanbanService: FlosKanbanService) {}

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
