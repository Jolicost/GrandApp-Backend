import { TestBed, inject } from '@angular/core/testing';

import { UserLocationService } from './user-location.service';

describe('UserLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocationService]
    });
  });

  it('should be created', inject([UserLocationService], (service: UserLocationService) => {
    expect(service).toBeTruthy();
  }));
});
