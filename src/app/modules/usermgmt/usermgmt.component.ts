import { Component, OnInit } from '@angular/core';
import { FlosUserService } from '../../services/flos-user.service';
import { User } from '../../user/user';
@Component({
  selector: 'pit-usermgmt',
  templateUrl: './usermgmt.component.html',
  styleUrl: './usermgmt.component.scss',
})
export class UsermgmtComponent implements OnInit {
  $users = this.userService.selector_data();

  constructor(private userService: FlosUserService) {}

  ngOnInit(): void {
    this.userService.action_load();
  }

  // @HostListener('click')
  // triggerEvent() {
  //   console.log('click works');
  // }

  logIn(user: User) {
    this.userService.action_logIn(user);
  }
}
