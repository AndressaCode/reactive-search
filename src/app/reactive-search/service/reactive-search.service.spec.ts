import { TestBed } from '@angular/core/testing';

import { ReactiveSearchService } from './reactive-search.service';

describe('ReactiveSearchService', () => {
  let service: ReactiveSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
