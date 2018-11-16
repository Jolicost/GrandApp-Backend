import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from '../../services/messages/messages.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authrUrl = 'https://grandapp.herokuapp.com/login';

  private user = new Subject<any>();
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    // public jwtHelper: JwtHelperService,
    // private cookieService: CookieService,
    private router: Router,
    private messageService: MessagesService,
  ) { }
  userStatus(mode) {
    this.user.next(mode);  // emit有变化，并且传送新的value
  }

  login(user): Observable<any> {
    return this.http.post<any>(this.authrUrl, user, httpOptions)
    .pipe(
      catchError(this.handleError<any>('login')),
      tap(resp => console.log('loginResponse', resp))
    );
  }
  removeToken() {
    return localStorage.removeItem('token');
  }

  private handleError<T> (operation = 'operation', result?: T) {
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
