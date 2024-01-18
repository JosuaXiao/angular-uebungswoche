import { Component, HostListener, OnInit } from '@angular/core';
import { FlosUserService } from '../../services/flos-user.service';
import { User } from '../../user/user';
@Component({
  selector: 'pit-usermgmt',
  templateUrl: './usermgmt.component.html',
  styleUrl: './usermgmt.component.scss',
})
export class UsermgmtComponent implements OnInit {
  $users = this.userService.selectData();

  constructor(private userService: FlosUserService) {}

  ngOnInit(): void {
    this.userService.loadAction();
  }

  // @HostListener('click')
  // triggerEvent() {
  //   console.log('click works');
  // }

  logIn(user: User) {
    this.userService.logInAction(user);
  }
}
