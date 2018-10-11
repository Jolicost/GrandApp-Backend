import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;

  markers = [
    {
      name: 'name1',
      description: 'descrip1',
      lat: 51.578428,
      lng: 7.809917
    },
    {
      name: 'name2',
      description: 'descrip2',
      lat: 51.478448,
      lng: 7.809027
    },
    {
      name: 'name3',
      description: 'descrip3',
      lat: 51.628438,
      lng: 7.609027
    }
  ];
  constructor() { }

  ngOnInit() {

  }
  mapclicked($event) {
    console.log($event);
  }
}
