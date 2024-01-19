import { BehaviorSubject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { User } from "../user/user";
import { FlosDataService } from "./flos-data.service";

@Injectable({
  providedIn: 'root',
})
export class FlosUserService extends FlosDataService<User> {
  #loggedInUser = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {
    super(http, 'http://localhost:3000/Benutzer');
  }

  action_logIn(user?: User) {
    this.#loggedInUser.next(user);
  }

  selector_loggedIn() {
    return this.#loggedInUser.asObservable();
  }
}
