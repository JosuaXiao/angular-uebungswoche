import { BehaviorSubject, lastValueFrom, map } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface State<T> {
  isLoading: boolean;
  data: T[];
  currentId?: number;
}

@Injectable({
  providedIn: 'root',
})
export abstract class FlosDataService<T extends { id: number }> {
  #store = new BehaviorSubject<State<T>>({
    isLoading: false,
    data: [],
  });

  #httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient, private baseUrl: string) {}

  // #region Actions

  addAction(item: T) {
    this.#store.next({
      ...this.#getCurrentState(),
      isLoading: true,
    });

    lastValueFrom(
      this.httpClient.post<T>(this.baseUrl, item, this.#httpOptions)
    ).then((value) => {
      const state = this.#getCurrentState();
      this.#store.next({
        ...state,
        data: [...state.data, value],
        isLoading: false,
      });
    });
  }

  updateAction(item: T) {
    this.#store.next({
      ...this.#getCurrentState(),
      isLoading: true,
    });

    lastValueFrom(
      this.httpClient.put<T>(this.baseUrl, item, this.#httpOptions)
    ).then((value) => {
      const state = this.#getCurrentState();
      const index = state.data.findIndex(
        (searchItem) => searchItem.id === item.id
      );
      this.#store.next({
        ...state,
        data: Object.assign([], state.data, { [index]: value ?? item }),
        isLoading: false,
      });
    });
  }

  deleteAction(id: number) {
    this.#store.next({
      ...this.#getCurrentState(),
      isLoading: true,
    });

    const url = `${this.baseUrl}/${id}`;
    lastValueFrom(this.httpClient.delete<T>(url, this.#httpOptions)).then(
      () => {
        const state = this.#getCurrentState();
        this.#store.next({
          ...state,
          data: state.data.filter((item) => item.id !== id),
          isLoading: false,
          currentId: state.currentId === id ? undefined : state.currentId,
        });
      }
    );
  }

  loadAction() {
    this.#store.next({
      ...this.#getCurrentState(),
      isLoading: true,
    });

    lastValueFrom(this.httpClient.get<T[]>(this.baseUrl)).then((data) => {
      const state = this.#getCurrentState();
      this.#store.next({
        ...state,
        data,
        isLoading: false,
      });
    });
  }

  setCurrentAction(currentId?: number) {
    const state = this.#getCurrentState();
    this.#store.next({
      ...state,
      currentId,
    });
  }

  // #endregion Actions

  // #region Selectors

  selectState() {
    return this.#store.asObservable();
  }

  selectData() {
    return this.#store.pipe(map((state) => state.data));
  }

  selectCurrent() {
    return this.#store.pipe(
      map((state) =>
        state.data.find((dataItem) => dataItem.id === state.currentId)
      )
    );
  }

  selectIsLoading() {
    return this.#store.pipe(map((state) => state.isLoading));
  }

  // #endregion Selectors

  #getCurrentState() {
    return this.#store.value;
  }
}
