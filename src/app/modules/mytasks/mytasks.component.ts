import { Component, inject } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { KanbanItem } from '../../services/KanbanItem';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { Subject, takeUntil } from 'rxjs';
import { KanbanState } from '../../services/kanban-state';
@Component({
  selector: 'pit-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.scss',
})
export class MytasksComponent {
  readonly $user: UserService = inject(UserService);

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
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }
}
