import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { UserLocationService } from '../../services/userLocation/user-location.service';
import { EntityService } from '../../services/entity/entity.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    iniLat;
    iniLng;
    usersOfActivity = [];
    activity;
    activities;

    locationsOfUser = [];

    constructor(
        private reverseGeoService: ReverseGeocodingService,
        private activityService: ActivitiesService,
        private userLocationService: UserLocationService,
    ) {}

    ngOnInit() {
        this.activityService.getActivities().subscribe(res => {
            this.activities = res;
            this.activity = res[0];
            console.log('activity', this.activity);
            this.usersOfActivity = this.activity.participants;
            console.log('usersOfActivity: ', this.usersOfActivity);
        });

        this.usersOfActivity.forEach(element => {
            const position = this.userLocationService.getUserLocation(
                element.id
            );
            this.reverseGeoService
                .convertToStreet(position.lat, position.lng)
                .subscribe(res => {
                    position['address'] = res.results[0].formatted_address;
                });
            this.locationsOfUser.push(position);
        });

        console.log('locationsOfUser: ', this.locationsOfUser);
    }
    mapclicked($event) {
        // console.log($event);
    }

    filterByActivity(event) {
        const activityName = event.target.value;
    }
}
