import { Injectable, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  actURL = 'https://grandapp.herokuapp.com/activities';

  private activitySubject = new Subject<any>(); // 发送器，通知有变化
  activity$ = this.activitySubject.asObservable();    // 数据储存的地方， 可以被subscribe()然后就可以获取数据

  activities: Array<Activity> = [
    {
      id: 1,
      title: 'act1',
      description: 'descrip1',
      userId: 1,
      rating: 5,
      images: [],
      lat: 51.410448,
      long: 7.816027,
      timestampStart: 345,
      timestampEnd: 456,
      participants: [2, 3],
      address: 'Calle Navarra',
      activityType: 'd',
      capacity: 10,
      price: 10
    },
    {
      id: 2,
      title: 'act2',
      description: 'descrip2',
      userId: 2,
      rating: 5,
      images: [],
      lat: 51.478448,
      long: 7.809027,
      timestampStart: 1245,
      timestampEnd: 45556,
      participants: [1, 3],
      address: 'Calle Navarra2',
      activityType: '',
      capacity: 10,
      price: 10
    }
  ];

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {

  }

  getActivity(id): Observable<any> {
    return this.http.get<any>(`${this.actURL}/${id}`)
    .pipe(
      catchError(this.handleError<any>('getActivity')),
      tap(resp => console.log('getActivity', resp))
    );
  }

  getActivities(): Observable<any> {
    return this.http.get<any>(this.actURL)
    .pipe(
      catchError(this.handleError<any>('getActivities')),
      tap(resp => console.log('getActivities', resp))
    );
  }

  addActivitiy(activity): Observable<any> {
    console.log('estic a addActivity', activity);
    return this.http.post<any>(this.actURL, activity)
    .pipe(
      catchError(this.handleError<any>('addActivities')),
      tap(resp => console.log('addActivities', resp))
    );
  }

  editActivity(newActivity): Observable<any> {
    return this.http.put<any>(`${this.actURL}/${newActivity.id}`, newActivity)
    .pipe(
      catchError(this.handleError<any>('addActivities')),
      tap(resp => console.log('addActivities', resp))
    );
  }

  actDataChanged(mode) {
    this.activitySubject.next(mode);  // emit有变化，并且传送新的value
  }

  deleteActivity(idToDelete): Observable<any> {
    return this.http.delete<any>(`${this.actURL}/${idToDelete}`);
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
