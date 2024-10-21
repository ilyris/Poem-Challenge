import { TestBed } from '@angular/core/testing';

import { SharedPoemStateService } from './shared-poem-state.service';

describe('SharedPoemStateService', () => {
  let service: SharedPoemStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPoemStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
