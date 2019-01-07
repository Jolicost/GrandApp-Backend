import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';


@Injectable({
    providedIn: 'root'
})
export class EntityService {
    entitiesURL = 'https://grandapp.herokuapp.com/entity/entities';
    entitiesUsers = 'https://grandapp.herokuapp.com/entity/users';
    entityURL = 'https://grandapp.herokuapp.com/entity';
    totalUsers;
    currentPagesize = 5; // default pagesize is 5
    currentPageNumber = 1; // default pageNumber is 1
    httpOptions;

    constructor(
        private http: HttpClient,
        private messageService: MessagesService
    ) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            })
        };
    }

    setCurrentPageSize(num) {
        this.currentPagesize = num;
    }
    getCurrentPageSize() {
        return this.currentPagesize;
    }
    setCurrentPageNumber(num) {
        this.currentPageNumber = num;
    }
    getCurrentPageNumber() {
        return this.currentPageNumber;
    }

    setTotalUsers(total) {
        this.totalUsers = total;
    }
    getTotaluUsers() {
        return this.totalUsers;
    }

    countTotalUsers(): Observable<any> {
        return this.http
            .get<any>(`${this.entityURL}/count/users`, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('countTotalUsers')),
                tap(resp => console.log('countTotalUsers', resp))
            );
    }

    getEntities(): Observable<any> {
        return this.http.get<any>(this.entitiesURL, this.httpOptions).pipe(
            catchError(this.handleError<any>('getEntities')),
            tap(resp => console.log('getEntities', resp))
        );
    }

    getEntityInfo(entitiyId): Observable<any> {
        return this.http
            .get<any>(`${this.entitiesURL}/${entitiyId.id}`, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('getEntityInfo')),
                tap(resp => console.log('getEntityInfo', resp))
            );
    }
    getEntityStatisticsActivities(entitiyId): Observable<any> {
        console.log('service entityID: ', entitiyId);
        return this.http
            .get<any>(
                `${this.entitiesURL}/${entitiyId}/statistics/activities`,
                this.httpOptions
            )
            .pipe(
                catchError(
                    this.handleError<any>('getEntityStatisticsActivities')
                ),
                tap(resp => console.log('getEntityStatisticsActivities', resp))
            );
    }
    getEntityStatisticsUsers(entitiyId): Observable<any> {
        return this.http
            .get<any>(
                `${this.entitiesURL}/${entitiyId}/statistics/users`,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('getEntityStatisticsUsers')),
                tap(resp => console.log('getEntityStatisticsUsers', resp))
            );
    }

    getEntityStatisticsAchievements(entitiyId): Observable<any> {
        return this.http
            .get<any>(
                `${this.entitiesURL}/${entitiyId}/statistics/achievements`,
                this.httpOptions
            )
            .pipe(
                catchError(
                    this.handleError<any>('getEntityStatisticsAchievements')
                ),
                tap(resp =>
                    console.log('getEntityStatisticsAchievements', resp)
                )
            );
    }

    getTotalConnections(entitiyId): Observable<any> {
        return this.http
            .get<any>(
                `${this.entitiesURL}/${entitiyId}/statistics/connections`,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('getTotalConnections')),
                tap(resp => console.log('getTotalConnections(', resp))
            );
    }

    getAllUsersOfMyEntity(): Observable<any> {
        return this.http.get<any>(`${this.entitiesUsers}`, this.httpOptions).pipe(
            catchError(this.handleError<any>('getAllUsersOfMyEntity')),
            tap(resp => console.log('getAllUsersOfMyEntity(', resp))
        );
    }

    getEmergencyContacts(entitiyId): Observable<any> {
        return this.http
            .get<any>(`${this.entitiesURL}/${entitiyId}/emergency`, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('getEntitySos')),
                tap(resp => console.log('getEntitySos', resp))
            );
    }

    addEmergencyContact(uid, newContact): Observable<any> {
        console.log('uid: ', uid);
        console.log('newContact: ', newContact);
        return this.http
            .post<any>(
                `${this.entitiesUsers}/${uid}/emergency`,
                newContact,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('addEmergencyContact')),
                tap(resp => console.log('addEmergencyContact', resp))
            );
    }

    getUsersByParams(pageNumber, numberPerPage): Observable<any> {
        return this.http
            .get<any>(
                `${this.entitiesUsers}?skip=${pageNumber}&limit=${numberPerPage}`,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('getUsersByParams')),
                tap(resp => console.log('getUsersByParams', resp))
            );
    }

    searchUserByCompleteName(name): Observable<any> {
        return this.http
            .get<any>(`${this.entitiesUsers}?completeName=${name}`, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('searchUserByCompleteName')),
                tap(resp => console.log('searchUserByCompleteName', resp))
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
