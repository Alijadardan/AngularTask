import { TestBed } from '@angular/core/testing';

import { PWAServiceService } from './pwaservice.service';

describe('PWAServiceService', () => {
  let service: PWAServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PWAServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
