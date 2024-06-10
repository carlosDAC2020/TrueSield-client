import { TestBed } from '@angular/core/testing';

import { ApiFnkService } from './api-fnk.service';

describe('ApiFnkService', () => {
  let service: ApiFnkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFnkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
