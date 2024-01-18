import { Injectable } from '@angular/core';
import { FlosDataService } from './flos-data.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlosUserService extends FlosDataService<User> {
  #loggedInUser = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    super(http, 'http://localhost:3000/Benutzer');
  }

  logInAction(user?: User) {
    this.#loggedInUser.next(user);
  }

  selectLoggedInUser() {
    return this.#loggedInUser.asObservable();
  }
}
