import { Component, inject } from '@angular/core';
import { UserService } from '../../user/user.service';
@Component({
  selector: 'pit-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent {
  constructor() {
    console.log(this.kek);
  }
  kek = inject(UserService);
  log() {
    console.log(this.kek);
  }
}
