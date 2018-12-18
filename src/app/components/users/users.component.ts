import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { UserLocationService } from '../../services/userLocation/user-location.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
     // google maps zoom level
     zoom = 13;
     // initial center position for the map
    initLat: number;
    initLong: number;
    usersOfActivity = [];
    activity;
    activities;
    entityid;
    locationsOfUser = [];

    constructor(
        private reverseGeoService: ReverseGeocodingService,
        private activityService: ActivitiesService,
        private userLocationService: UserLocationService,
        private entityService: EntityService,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.userService.verify().subscribe (resv => {
            this.entityid = resv.entity;
            console.log('Id entity', this.entityid);
            this.entityService.getEntityInfo({id: this.entityid}).subscribe (rese => {
                this.initLat = rese.place.lat;
                console.log('Tinc lat', this.initLat);
                this.initLong = rese.place.long;
                console.log('Tinc long', this.initLong);
            });
        });

        /*this.activityService.getActivities().subscribe(res => {
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
                    // aixo retorna el nom complert en paraules de l'adreça on esta l'individu
                });
            this.locationsOfUser.push(position);
        });
        console.log('locationsOfUser: ', this.locationsOfUser);
        */
    }
    mapclicked($event) {
        // console.log($event);
    }

    filterByActivity(event) {
        const activityName = event.target.value;
    }
}
