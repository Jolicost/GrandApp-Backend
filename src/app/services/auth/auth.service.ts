import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessagesService } from '../../services/messages/messages.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new Subject<string>(); // 发送器，通知有变化
  user$ = this.user.asObservable();    // 数据储存的地方， 可以被subscribe()然后就可以获取数据

  private authrUrl = 'https://grandapp.herokuapp.com/login';
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    // private cookieService: CookieService,
    private router: Router,
    private messageService: MessagesService,
  ) { }

  changeUserStatus(value) {
    this.user.next(value);  // emit有变化，并且传送新的value
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // console.log('==>', token);
    if (token) {
      // Check whether the token is expired and return
      // true or false
       return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  login(user): Observable<any> {
    return this.http.post<any>(this.authrUrl, user, httpOptions)
    .pipe(
      catchError(this.handleError<any>('login')),
      tap(resp => console.log('loginResponse', resp))
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
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
