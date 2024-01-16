import {
  Component,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../user/user.service';
import { DataService } from '../../data/data.service';
import { FlosKanbanService } from '../../services/flos-kanban.service';
import { KanbanItem } from '../../data/data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'pit-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit, OnDestroy {
  readonly $data: DataService = inject(DataService);

  items: KanbanItem[] = [];

  #ngUnsubscribe = new Subject<void>();

  constructor(private kanbanService: FlosKanbanService) {}

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

    setTimeout(() => {
      this.kanbanService.add({} as KanbanItem);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }
}
