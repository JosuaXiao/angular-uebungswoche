import { Subject } from "rxjs";

import { Component, OnDestroy, OnInit } from "@angular/core";

import { FlosKanbanService } from "../../services/flos-kanban.service";
import { FlosUserService } from "../../services/flos-user.service";
import { KanbanState } from "../../services/kanban-state";

@Component({
  selector: 'pit-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.scss',
})
export class MytasksComponent implements OnInit, OnDestroy {
  tasks$ = this.kanbanService.selector_data();

  loggedInUser$ = this.userService.selector_loggedIn();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(
    private kanbanService: FlosKanbanService,
    private userService: FlosUserService
  ) {}

  ngOnInit(): void {
    this.kanbanService.action_load();
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
