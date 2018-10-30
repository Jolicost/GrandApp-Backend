import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private authrUrl = 'https://qtdas-admin.herokuapp.com/api/auth';
  constructor(
    private http: HttpClient,
    // public jwtHelper: JwtHelperService,
    // private cookieService: CookieService,
    // private router: Router,
    // private messageService: MessageService,
  ) { }

  // login(user): Observable<User> {
  //   return this.http.post<User>(this.authrUrl, user, httpOptions)
  //   .pipe(
  //     catchError(this.handleError<User>('login')),
  //     tap(resp => console.log('loginResponse', resp))
  //   );

  // }
}
