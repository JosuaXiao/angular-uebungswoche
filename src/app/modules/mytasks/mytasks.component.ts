import { Component, OnDestroy } from '@angular/core';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';
import { FlosUserService } from '../../services/flos-user.service';
@Component({
  selector: 'pit-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.scss',
})
export class MytasksComponent implements OnDestroy {
  tasks$ = this.kanbanService.selectData();

  loggedInUser$ = this.userService.selectLoggedInUser();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(
    private kanbanService: FlosKanbanService,
    private userService: FlosUserService
  ) {}

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
