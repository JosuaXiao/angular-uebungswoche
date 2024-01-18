import { Component } from '@angular/core';
import { FlosUserService } from './services/flos-user.service';
@Component({
  selector: 'pit-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loggedInUser$ = this.userService.selectLoggedInUser();

  constructor(private userService: FlosUserService) {}
}
