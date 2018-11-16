import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ActivitiesService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject(
        [ActivitiesService],
        (service: ActivitiesService) => {
            expect(service).toBeTruthy();
        }
    ));
});
