import { TestBed, inject } from '@angular/core/testing';

import { ReverseGeocodingService } from './reverse-geocoding.service';

describe('ReverseGeocodingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReverseGeocodingService]
    });
  });

  it('should be created', inject([ReverseGeocodingService], (service: ReverseGeocodingService) => {
    expect(service).toBeTruthy();
  }));
});
