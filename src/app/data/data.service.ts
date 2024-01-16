import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import { KanbanItem } from './data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly data = signal<KanbanItem[]>([]);

  readonly allDescriptions = computed(() =>
    this.data().map((u) => u.Description)
  );

  readonly allTitles = computed(() => this.data().map((u) => u.Title));

  readonly allassinged = computed(() => this.data().map((u) => u.assigned));

  readonly allPrios = computed(() => this.data().map((u) => u.prio));

  readonly allStates = computed(() => this.data().map((u) => u.status));

  readonly allDueDates = computed(() => this.data().map((u) => u.tobeDone));

  readonly selectedIndex = signal(-1);

  Description: string = '';
  Title: string = '';
  assigned: string = '';
  prio: string = '';
  status: string = '';
  tobeDone: Date | undefined = undefined;

  // effects sind in NG17 noch nicht als Release zu interpretieren
  private eff = effect(() => {
    // mit untracked sorge ich dafür, dass ich nur den wert von selectedIndex bekomme aber ich auf Änderungen nicht reagiere
    console.log('users changed', this.data(), untracked(this.selectedIndex));
  });

  private readonly $http = inject(HttpClient);

  constructor() {
    this.updateData();
  }

  addData(newTask: KanbanItem) {
    this.$http
      .post<KanbanItem>('http://localhost:3000/Task', newTask)
      .subscribe({
        next: () => this.updateData(),
        error: (error) => console.log(error),
      });
  }

  private delTskByID(tskID: number | string) {
    this.$http.delete<void>(`http://localhost:3000/Task/${tskID}`).subscribe({
      next: () => this.updateData(),
      error: (error) => console.log(error),
    });
  }

  delDataAt(index: number) {
    const users = this.data();
    if (users[index]) {
      this.delTskByID(users[index].id!);
    }
  }

  delUser(data: KanbanItem) {
    this.delTskByID(data.id!);
  }

  updateDataAt(index: number, data: KanbanItem) {
    this.$http
      .put<KanbanItem>(
        `http://localhost:3000/Task/${this.data()[index].id}`,
        data
      )
      .subscribe({
        next: () => this.updateData(),
        error: (error) => console.log(error),
      });
  }

  setAsSelected($index: number) {
    const { Title, Description, assigned, prio, status, tobeDone } =
      this.data()[$index];
    if (this.Title === Title) {
      this.Title = '';
      this.Description = '';
      this.assigned = '';
      this.prio = '';
      this.status = '';
      this.tobeDone = undefined;
      this.selectedIndex.set(-1);
    } else if (Title) {
      this.Title = Title;
      this.Description = Description;
      this.assigned = assigned;
      this.prio = prio;
      this.status = status;
      this.tobeDone = tobeDone;
      this.selectedIndex.set($index);
    }
  }

  private reset() {
    this.Title = '';
    this.Description = '';
    this.assigned = '';
    this.prio = '';
    this.status = '';
    this.tobeDone = undefined;
    this.selectedIndex.set(-1);
  }

  private updateData() {
    this.$http.get<KanbanItem[]>('http://localhost:3000/Task').subscribe({
      next: (data) => {
        this.data.set(data);
        this.reset();
      },
      error: (error) => console.log(error),
    });
  }
}
