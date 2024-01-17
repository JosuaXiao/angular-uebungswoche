import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';
@Component({
  selector: 'pit-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.scss',
})
export class MytasksComponent implements OnDestroy {
  items$ = this.kanbanService.get();

  KanbanState = KanbanState;

  #ngUnsubscribe = new Subject<void>();

  constructor(
    private kanbanService: FlosKanbanService,
    public userService: UserService //TODO keine services auf public
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
