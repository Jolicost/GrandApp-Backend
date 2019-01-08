import { Injectable, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesService {
    actURL = 'https://grandapp.herokuapp.com/entity/activities';
    entityURL = 'https://grandapp.herokuapp.com/entity';
    totalActivities;
    currentPagesize = 5; // default pagesize is 5
    currentPageNumber = 1; // default pageNumber is 1
    httpOptions;
    private activitySubject = new Subject<any>(); // 发送器，通知有变化
    activity$ = this.activitySubject.asObservable(); // 数据储存的地方， 可以被subscribe()然后就可以获取数据

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

    setTotalActivities(total) {
        this.totalActivities = total;
    }
    getTotaluActivities() {
        return this.totalActivities;
    }

    searchActByTitle(title): Observable<any> {
        return this.http.get<any>(`${this.actURL}?title=${title}`, this.httpOptions).pipe(
            catchError(this.handleError<any>('searchActByTitle')),
            tap(resp => console.log('searchActByTitle', resp))
        );
    }

    countTotalActivities(): Observable<any> {
        return this.http
            .get<any>(`${this.entityURL}/count/activities`, this.httpOptions)
            .pipe(
                catchError(this.handleError<any>('countTotalActivities')),
                tap(resp => console.log('countTotalActivities', resp))
            );
    }

    getActivity(id): Observable<any> {
        return this.http.get<any>(`${this.actURL}/${id}`, this.httpOptions).pipe(
            catchError(this.handleError<any>('getActivity')),
            tap(resp => console.log('getActivity', resp))
        );
    }

    getActivities(): Observable<any> {
        return this.http.get<any>(this.actURL, this.httpOptions).pipe(
            catchError(this.handleError<any>('getActivities')),
            tap(resp => console.log('getActivities', resp))
        );
    }

    getActivitiesByParams(pageNumber, numberPerPage): Observable<any> {
        return this.http
            .get<any>(
                `${this.actURL}?skip=${pageNumber}&limit=${numberPerPage}`,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('getActivitiesByParams')),
                tap(resp => console.log('getActivitiesByParams', resp))
            );
    }

    addActivitiy(activity): Observable<any> {
        return this.http.post<any>(this.actURL, activity, this.httpOptions).pipe(
            catchError(this.handleError<any>('addActivities')),
            tap(resp => console.log('addActivities', resp))
        );
    }

    editActivity(newActivity): Observable<any> {
        return this.http
            .put<any>(
                `${this.actURL}/${newActivity.id}`,
                newActivity,
                this.httpOptions
            )
            .pipe(
                catchError(this.handleError<any>('editActivities')),
                tap(resp => console.log('editActivities', resp))
            );
    }

    actDataChanged(mode) {
        this.activitySubject.next(mode); // emit有变化，并且传送新的value
    }

    deleteActivity(idToDelete): Observable<any> {
        return this.http.delete<any>(
            `${this.actURL}/${idToDelete}`,
            this.httpOptions
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
