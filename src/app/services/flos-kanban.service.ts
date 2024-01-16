import { Injectable } from '@angular/core';
import { FlosDataService } from './flos-data.service';
import { KanbanItem } from '../data/data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlosKanbanService extends FlosDataService<KanbanItem> {
  constructor(private http: HttpClient) {
    super(http, 'http://localhost:3000/Task');
  }
}
