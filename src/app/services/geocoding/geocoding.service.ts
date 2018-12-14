import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeocodingService {
    googleMapUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

    constructor(private http: HttpClient) {}

    getLatLong(address): Observable<any> {
        return this.http.get<any>(
            `${
                this.googleMapUrl
            }?address=${address}&key=AIzaSyDBNBmRlzQDTVzB07XLJbuusxIh84qXOOg`
        );
    }
}
