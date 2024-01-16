import { TestBed } from '@angular/core/testing';

import { FlosKanbanService } from './flos-kanban.service';

describe('FlosKanbanService', () => {
  let service: FlosKanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlosKanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
