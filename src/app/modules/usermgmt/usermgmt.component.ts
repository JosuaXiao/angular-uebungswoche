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
} from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'pit-usermgmt',
  templateUrl: './usermgmt.component.html',
  styleUrl: './usermgmt.component.scss',
})
export class UsermgmtComponent {
  readonly $user: UserService = inject(UserService);
}
