import { TestBed } from '@angular/core/testing';

import { SweetalertssService } from './sweetalertss.service';

describe('SweetalertssService', () => {
  let service: SweetalertssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetalertssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
