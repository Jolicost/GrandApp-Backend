import { Injectable, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  actURL = 'https://grandapp.herokuapp.com/activities';

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
    private http: HttpClient
  ) {

  }

  getActivity(title, timestampStart, timestampEnd): any {
    this.activities.forEach(element => {
      if (element.title === title && element.timestampStart === timestampStart && timestampEnd === timestampEnd) {
        // console.log(element);
        return element;
      }
    });
  }

  getActivities(): Observable<any> {
    return this.http.get<any>(this.actURL);
    // return this.activities;
  }

  addActivitiy(activity) {
    // console.log(activity);
    this.activities.push(activity);
  }

  editActivity(oldActivity, activity) {
    // console.log('new title', activity.title);
    // console.log('old title', oldActivity.title);
    this.activities.forEach(element => {
        if (element.title === oldActivity.title && element.timestampStart === oldActivity.timestampStart
          && element.timestampEnd === oldActivity.timestampEnd) {
          element.title = activity.title;
          element.description = activity.description;
          element.timestampStart = activity.timestampStart;
          element.timestampEnd = activity.timestampEnd;
          element.lat = activity.lat;
          element.long = activity.long;
          element.images = activity.images;
          element.participants = activity.participants;
          element.address = activity.address;
        }
    });
    // console.log('activitats', this.activities);
  }

  deleteActivity(actToDelete) {
    for (let i = 0; i < this.activities.length; ++i) {
      if (this.activities[i].title === actToDelete.title && this.activities[i].timestampStart === actToDelete.timestampStart
        && this.activities[i].timestampEnd === actToDelete.timestampEnd) {
          this.activities.splice(i, 1);
      }
    }
  }
}
