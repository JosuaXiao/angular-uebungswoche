import { Component, inject } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'pit-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-uebungswoche';

  readonly $user: UserService = inject(UserService);
}
