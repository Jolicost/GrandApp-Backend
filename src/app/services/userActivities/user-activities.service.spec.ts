import { TestBed, inject } from '@angular/core/testing';

import { UserActivitiesService } from './user-activities.service';

describe('UserActivitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActivitiesService]
    });
  });

  it('should be created', inject([UserActivitiesService], (service: UserActivitiesService) => {
    expect(service).toBeTruthy();
  }));
});
