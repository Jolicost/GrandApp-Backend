import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReverseGeocodingService } from './reverse-geocoding.service';

describe('ReverseGeocodingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReverseGeocodingService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject(
        [ReverseGeocodingService],
        (service: ReverseGeocodingService) => {
            expect(service).toBeTruthy();
        }
    ));
});
