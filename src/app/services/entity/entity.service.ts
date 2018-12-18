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
export class EntityService {
    entitiesURL = 'https://grandapp.herokuapp.com/entity/entities';
    entitiesURL2 = 'https://grandapp.herokuapp.com/entity/users';

    constructor(
        private http: HttpClient,
        private messageService: MessagesService
    ) {}

    getEntities(): Observable<any> {
        return this.http.get<any>(this.entitiesURL, httpOptions).pipe(
            catchError(this.handleError<any>('getEntities')),
            tap(resp => console.log('getEntities', resp))
        );
    }

    getEntityInfo(entitiyId): Observable<any> {
        return this.http.get<any>(`${this.entitiesURL}/${entitiyId.id}`, httpOptions).pipe(
            catchError(this.handleError<any>('getEntityInfo')),
            tap(resp => console.log('getEntityInfo', resp))
        );
    }
    getEntityStatisticsActivities(entitiyId): Observable<any> {
        return this.http.get<any>(`${this.entitiesURL}/${entitiyId}/statistics/activities`, httpOptions).pipe(
            catchError(this.handleError<any>('getEntityStatisticsActivities')),
            tap(resp => console.log('getEntityStatisticsActivities', resp))
        );
    }
    getEntityStatisticsUsers(entitiyId): Observable<any> {
        return this.http.get<any>(`${this.entitiesURL}/${entitiyId}/statistics/users`, httpOptions).pipe(
            catchError(this.handleError<any>('getEntityStatisticsUsers')),
            tap(resp => console.log('getEntityStatisticsUsers', resp))
        );
    }

    getTotalConnections(entitiyId): Observable<any> {
        return this.http.get<any>(`${this.entitiesURL}/${entitiyId}/statistics/connections`, httpOptions).pipe(
            catchError(this.handleError<any>('getTotalConnections')),
            tap(resp => console.log('getTotalConnections(', resp))
        );
    }

    getAllUsersOfMyEntity(): Observable<any> {
        return this.http.get<any>(`${this.entitiesURL2}`, httpOptions).pipe(
            catchError(this.handleError<any>('getAllUsersOfMyEntity')),
            tap(resp => console.log('getAllUsersOfMyEntity(', resp))
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
