import { Injectable, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
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
export class ActivitiesService {
    actURL = 'https://grandapp.herokuapp.com/entity/activities';

    private activitySubject = new Subject<any>(); // 发送器，通知有变化
    activity$ = this.activitySubject.asObservable(); // 数据储存的地方， 可以被subscribe()然后就可以获取数据

    constructor(
        private http: HttpClient,
        private messageService: MessagesService
    ) {}

    getActivity(id): Observable<any> {
        return this.http.get<any>(`${this.actURL}/${id}`, httpOptions).pipe(
            catchError(this.handleError<any>('getActivity')),
            tap(resp => console.log('getActivity', resp))
        );
    }

    getActivityByParams(pageNumber, numberPerPage): Observable<any> {
        return this.http.get<any>(`${this.actURL}/${id}`, httpOptions).pipe(
            catchError(this.handleError<any>('getActivityByParams')),
            tap(resp => console.log('getActivityByParams', resp))
        );
    }

    getActivities(): Observable<any> {
        return this.http.get<any>(this.actURL, httpOptions).pipe(
            catchError(this.handleError<any>('getActivities')),
            tap(resp => console.log('getActivities', resp))
        );
    }

    addActivitiy(activity): Observable<any> {
        return this.http.post<any>(this.actURL, activity, httpOptions).pipe(
            catchError(this.handleError<any>('addActivities')),
            tap(resp => console.log('addActivities', resp))
        );
    }

    editActivity(newActivity): Observable<any> {
        return this.http
            .put<any>(
                `${this.actURL}/${newActivity.id}`,
                newActivity,
                httpOptions
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
            httpOptions
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
