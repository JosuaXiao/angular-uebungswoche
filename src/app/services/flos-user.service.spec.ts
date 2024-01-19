import { TestBed } from "@angular/core/testing";

import { FlosUserService } from "./flos-user.service";

describe('FlosUserService', () => {
  let service: FlosUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlosUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
