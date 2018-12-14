import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    verifyURL = 'https://grandapp.herokuapp.com/verify';
    userURL = 'https://grandapp.herokuapp.com/entity/users';

    constructor(
        private http: HttpClient,
        private messageService: MessagesService
    ) {}

    verify(): Observable<any> {
        return this.http.get<any>(this.verifyURL, httpOptions).pipe(
            catchError(this.handleError<any>('verify')),
            tap(resp => console.log('verify', resp))
        );
    }

    getUserInfo(id): Observable<any> {
        return this.http.get<any>(`${this.userURL}/${id}`, httpOptions).pipe(
            catchError(this.handleError<any>('getUserInfo')),
            tap(resp => console.log('getUserInfo', resp))
        );
    }

    updateUserInfo(newUser, userID): Observable<any> {
        return this.http
            .put<any>(`${this.userURL}/${userID}`, newUser, httpOptions)
            .pipe(
                catchError(this.handleError<any>('updateUserInfo')),
                tap(resp => console.log('updateUserInfo', resp))
            );
    }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(this.userURL, httpOptions).pipe(
            catchError(this.handleError<any>('getAllUser')),
            tap(resp => console.log('getAllUser', resp))
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
