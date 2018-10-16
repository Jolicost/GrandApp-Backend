import { Injectable, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  activities = [
    {
      name: 'act1',
      description: 'descrip1',
      startDate: 'date1',
      endDate: 'date2',
      lat: 51.578428,
      lng: 7.809917,
      image: 'image1',
      participants: [
        {
          id: 1,
          name: 'par1',
          age: '65',
          email: 'asd@asd.com'
        },
        {
          id: 2,
          name: 'par2',
          age: '75',
          email: 'asd@as22d.com'
        }
      ],
      address: ''
    },
    {
      name: 'act2',
      description: 'descrip1',
      startDate: 'date1',
      endDate: 'date2',
      lat: 51.478448,
      lng: 7.809027,
      image: 'image2',
      participants: [],
      address: ''
    }
  ];

  constructor() {

  }

  getActivity(name, startDate, endDate): any {
    this.activities.forEach(element => {
      if (element.name === name && element.startDate === startDate && endDate === endDate) {
        console.log(element);
        return element;
      }
    });
  }

  getActivities() {
    return this.activities;
  }
}
