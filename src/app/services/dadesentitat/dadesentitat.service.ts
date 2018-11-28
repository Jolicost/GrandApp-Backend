import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadesentitatService {
  actURL = 'https://grandapp.herokuapp.com/entities';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  getDataEntity(id): Observable<any> {
    console.log('estic agafant entitat');
    return this.http.get<any>(`${this.actURL}/${id}`).pipe(
        catchError(this.handleError<any>('getDataEntity')),
        tap(resp => console.log('getDataEntity', resp))
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
