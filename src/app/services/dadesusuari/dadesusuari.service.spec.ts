import { TestBed, inject } from '@angular/core/testing';

import { DadesusuariService } from './dadesusuari.service';

describe('DadesusuariService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DadesusuariService]
    });
  });

  it('should be created', inject([DadesusuariService], (service: DadesusuariService) => {
    expect(service).toBeTruthy();
  }));
});
