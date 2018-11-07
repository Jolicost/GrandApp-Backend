import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  actURL = 'urllogin';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) { }

  login(username, password): Observable<any> {
    const loginUsr: any = {
        username: username,
        password: password
      };
    // post these details to Api server return user info if correct
    return this.http.post<any>(this.actURL, loginUsr)
    .pipe(
      catchError(this.handleError<any>('createClassification')),
      tap(resp => console.log('createClassification', resp))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
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
