import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { UserLocationService } from '../../services/userLocation/user-location.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-allusers',
    templateUrl: './allusers.component.html',
    styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {
    // google maps zoom level
    zoom = 13;
    // initial center position for the map
    initLat: number;
    initLong: number;
    entityid;
    locationsOfUser = [];
    allUsers = [];

    constructor(
        private reverseGeoService: ReverseGeocodingService,
        private activityService: ActivitiesService,
        private userLocationService: UserLocationService,
        private entityService: EntityService,
        private userService: UserService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.userService.verify().subscribe(resv => {
            this.entityid = resv.entity;
            // console.log('Id entity', this.entityid);
            this.entityService
                .getEntityInfo({ id: this.entityid })
                .subscribe(rese => {
                    this.initLat = rese.place.lat;
                    // console.log('Tinc lat', this.initLat);
                    this.initLong = rese.place.long;
                    // console.log('Tinc long', this.initLong);
                });
            // console.log('Tinc id entitat', this.entityid);
            this.entityService.getAllUsersOfMyEntity().subscribe(emer => {
                this.allUsers = emer;
                console.log('tinc un array de length ', this.allUsers.length);
            });

            const source = interval(1000 * 30);
            const subscribe = source.subscribe(val => {
                this.entityService.getAllUsersOfMyEntity().subscribe(emer => {
                    this.allUsers = emer;
                    console.log(
                        'tinc un array de length ',
                        this.allUsers.length
                    );
                });
            });
        });
    }
    mapclicked($event) {
        // console.log($event);
    }
}
