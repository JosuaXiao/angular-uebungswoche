import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';
import { FlosUserService } from '../../services/flos-user.service';
@Component({
  selector: 'pit-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.scss',
})
export class MytasksComponent implements OnInit, OnDestroy {
  tasks$ = this.kanbanService.selectData();

  loggedInUser$ = this.userService.selectLoggedInUser();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(
    private kanbanService: FlosKanbanService,
    private userService: FlosUserService
  ) {}

  ngOnInit(): void {
    this.kanbanService.loadAction();
    // this.tasks$.subscribe((tasks) => console.log(tasks));
  }

  show(status: string, column: string): boolean {
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
