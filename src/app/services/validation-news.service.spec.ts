import { TestBed } from '@angular/core/testing';

import { ValidationNewsService } from './validation-news.service';

describe('ValidationNewsService', () => {
  let service: ValidationNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
