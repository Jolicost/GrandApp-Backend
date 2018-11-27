import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessagesService } from '../messages/messages.service';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DadesusuariService {
  actURL = 'https://grandapp.herokuapp.com/verify';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  getDadesUser(): Observable<any> {
    return this.http.get<any>(this.actURL, httpOptions).pipe(
        catchError(this.handleError<any>('getDadesUser')),
        tap(resp => console.log('getDadesUserResponse', resp))
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
