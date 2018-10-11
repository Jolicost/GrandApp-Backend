import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  iniLat = 51.678418;
  iniLng = 7.809007;

  markers = [
    {
      name: 'name1',
      description: 'descrip1',
      lat: 51.578428,
      lng: 7.809917,
      address: ''
    },
    {
      name: 'name2',
      description: 'descrip2',
      lat: 51.478448,
      lng: 7.809027,
      address: ''
    },
    {
      name: 'name3',
      description: 'descrip3',
      lat: 51.628438,
      lng: 7.609027,
      address: ''
    }
  ];

  address = [];
  constructor(
    private reverseGeoService: ReverseGeocodingService
  ) { }

  ngOnInit() {
    this.markers.forEach(element => {
      this.reverseGeoService.convertToStreet(element.lat, element.lng)
        .subscribe(res => {
          element.address = res.results[0].formatted_address;
        });
    });

  }
  mapclicked($event) {
    console.log($event);
  }
}
