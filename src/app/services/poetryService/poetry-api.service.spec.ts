import { TestBed } from '@angular/core/testing';

import { PoetryApiService } from './poetry-api.service';

describe('PoetryApiService', () => {
  let service: PoetryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoetryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
