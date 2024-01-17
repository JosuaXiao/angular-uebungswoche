import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly users = signal<User[]>([]);

  readonly allFirstnames = computed(() => this.users().map((u) => u.firstname));

  readonly allLastnames = computed(() => this.users().map((u) => u.lastname));

  readonly ID = computed(() => this.users().map((u) => u.id));

  readonly selectedIndex = signal(-1);

  selectedUser: User | undefined;
  showedUser: string = '';
  firstname: string = '';
  lastname: string = '';

  // effects sind in NG17 noch nicht als Release zu interpretieren
  private eff = effect(() => {
    // mit untracked sorge ich dafür, dass ich nur den wert von selectedIndex bekomme aber ich auf Änderungen nicht reagiere
    console.log('users changed', this.users(), untracked(this.selectedIndex));
  });

  private readonly $http = inject(HttpClient);

  constructor() {
    this.updateUsers();
    console.log(this.selectedUser);
  }

  setUser(usrID: number) {
    this.getUser(usrID).then((user) => {
      this.selectedUser = user;
      this.showedUser = user.firstname + ' ' + user.lastname;
    });
  }

  async getUser(usrID: number) {
    const url = `http://localhost:3000/Benutzer?id=${usrID}`;
    const user = await lastValueFrom(this.$http.get<User[]>(url));
    return user[0];
  }

  addUser(newUser: User) {
    this.$http.post<User>('http://localhost:3000/Benutzer', newUser).subscribe({
      next: () => this.updateUsers(),
      error: (error) => console.log(error),
    });
  }

  private delUsrByID(usrID: number | string) {
    this.$http
      .delete<void>(`http://localhost:3000/Benutzer/${usrID}`)
      .subscribe({
        next: () => this.updateUsers(),
        error: (error) => console.log(error),
      });
  }

  delUserAt(index: number) {
    const users = this.users();
    if (users[index]) {
      this.delUsrByID(users[index].id!);
    }
  }

  delUser(user: User) {
    this.delUsrByID(user.id!);
  }

  updateUserAt(index: number, user: User) {
    this.$http
      .put<User>(
        `http://localhost:3000/Benutzer/${this.users()[index].id}`,
        user
      )
      .subscribe({
        next: () => this.updateUsers(),
        error: (error) => console.log(error),
      });
  }

  setAsSelected($index: number) {
    const { firstname, lastname } = this.users()[$index];
    if (this.firstname === firstname && this.lastname === lastname) {
      this.firstname = '';
      this.lastname = '';
      this.selectedIndex.set(-1);
    } else if (firstname && lastname) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.selectedIndex.set($index);
    }
  }

  private reset() {
    this.firstname = '';
    this.lastname = '';
    this.selectedIndex.set(-1);
  }

  private updateUsers() {
    this.$http.get<User[]>('http://localhost:3000/Benutzer').subscribe({
      next: (users) => {
        this.users.set(users);
        this.reset();
      },
      error: (error) => console.log(error),
    });
  }
}
