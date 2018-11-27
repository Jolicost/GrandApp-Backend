import { TestBed, inject } from '@angular/core/testing';

import { DadesentitatService } from './dadesentitat.service';

describe('DadesentitatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadesentitatService]
    });
  });

  it('should be created', inject([DadesentitatService], (service: DadesentitatService) => {
    expect(service).toBeTruthy();
  }));
});
