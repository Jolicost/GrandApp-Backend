import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReverseGeocodingService {
    googleMapUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

    constructor(private http: HttpClient) {}

    convertToStreet(latitude, longitude): Observable<any> {
        const lat = latitude;
        const lng = longitude;
        return this.http.get<any>(
            `${this.googleMapUrl}?latlng=${lat},${lng}&key=AIzaSyDBNBmRlzQDTVzB07XLJbuusxIh84qXOOg`
        );
    }
}
