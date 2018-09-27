import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities = [
    {
      name: 'act1',
      description: 'descrip1',
      startDate: 'date1',
      endDate: 'date2',
      location: 'localtion'
    },
    {
      name: 'act2',
      description: 'descrip1',
      startDate: 'date1',
      endDate: 'date2',
      location: 'localtion'
    },
    {
      name: 'act3',
      description: 'descrip1',
      startDate: 'date1',
      endDate: 'date2',
      location: 'localtion'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  addActivity() {

  }

  updateActivity() {

  }

  deleteActivity() {

  }
}
