import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';

@Injectable({
    providedIn: 'root'
})
export class UploadImagesService {
    url = 'https://grandapp.herokuapp.com/imagesJson';

    constructor(
        private http: HttpClient,
        private messageService: MessagesService
    ) {}

    upload(imageBase64) {
        return this.http.post<any>(this.url, { base64: imageBase64 }).pipe(
            catchError(this.handleError<any>('uploadImage')),
            tap(resp => console.log('uploadImage', resp))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            if (error.status !== 200) {
                // TODO: send the error to remote logging infrastructure
                // console.error(error);
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
