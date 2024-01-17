import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { KanbanItem } from '../../services/KanbanItem';
import { Subject, takeUntil } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';
import { User } from '../../user/user';

@Component({
  selector: 'pit-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  user: User[] = [];
  items$ = this.kanbanService.get();

  items: KanbanItem[] = [];

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
  ngOnInit(): void {
    this.kanbanService
      .get()
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe({
        next: (value) => {
          this.items = value;
          console.log(this.items);
        },
      });
    // setTimeout(() => {
    //   this.kanbanService.add({} as KanbanItem);
    // }, 1000);
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }
}
