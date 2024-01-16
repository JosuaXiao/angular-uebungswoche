import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class FlosDataService<T extends { id: number }>
  implements OnDestroy
{
  #cache = new BehaviorSubject<T[]>([]);

  #httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  #ngUnsubscribe = new Subject<void>();

  constructor(private httpClient: HttpClient, private baseUrl: string) {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.#ngUnsubscribe.next();
    this.#ngUnsubscribe.complete();
  }

  add(item: T) {
    this.httpClient
      .post<T>(this.baseUrl, item, this.#httpOptions)
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe({
        next: (value) => {
          this.#cache.next([...this.#cache.value, value]);
        },
      });
  }

  update(item: T) {
    this.httpClient
      .put<T>(this.baseUrl, item, this.#httpOptions)
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe({
        next: (value) => {
          const index = this.#cache.value.findIndex(
            (searchItem) => searchItem.id === item.id
          );
          const newArr = [...this.#cache.value];
          newArr[index] = value ?? item;
          this.#cache.next(newArr);
        },
      });
  }

  delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    this.httpClient
      .delete<T>(url, this.#httpOptions)
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe({
        next: () => {
          this.#cache.next([
            ...this.#cache.value.filter((item) => item.id !== id),
          ]);
        },
      });
  }

  refresh() {
    this.httpClient
      .get<T[]>(this.baseUrl)
      .pipe(takeUntil(this.#ngUnsubscribe))
      .subscribe({
        next: (value) => {
          this.#cache.next(value);
        },
      });
  }

  get() {
    return this.#cache.asObservable();
  }
}
