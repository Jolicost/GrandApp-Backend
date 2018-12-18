import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { MessagesService } from '../messages/messages.service';

@Injectable({
    providedIn: 'root'
})
export class ReverseGeocodingService {
    googleMapUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

    constructor(private http: HttpClient, private messageService: MessagesService) {}

    convertToStreet(latitude, longitude): Observable<any> {
        const lat = latitude;
        const lng = longitude;
        return this.http.get<any>(
            `${this.googleMapUrl}?latlng=${lat},${lng}&key=AIzaSyDBNBmRlzQDTVzB07XLJbuusxIh84qXOOg`
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            if (error.status !== 200) {
                // TODO: send the error to remote logging infrastructure
                console.error(error);
                // TODO: better job of transforming error for user consumption
                // console.log(`${operation} failed: ${error.message}`);
                // Catch the status code and do some actions if it is a particular situation
                this.messageService.setMessage(error.error);
            }
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
