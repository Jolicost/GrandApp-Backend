import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { UserLocationService } from '../../services/userLocation/user-location.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { interval } from 'rxjs';

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
    emergencyUsers = [];
    usersOor;
    mess;
    constructor(
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
            this.entityService
                .getEmergencyContacts(this.entityid)
                .subscribe(emer => {
                    this.emergencyUsers = emer;
                    console.log(
                        'tinc un array de length ',
                        this.emergencyUsers.length
                    );
                    this.usersOor = this.emergencyUsers.length;
                    this.mess =
                        'There are ' + this.usersOor + ' users out of range';
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.mess
                    });
                    console.log('Tinc aquests usuaris perduts', this.usersOor);
                    console.log(this.mess);
                });
            const source = interval(1000 * 30);
            const subscribe = source.subscribe(val => {
                this.entityService
                    .getEmergencyContacts(this.entityid)
                    .subscribe(emer => {
                        this.emergencyUsers = emer;
                        console.log(
                            'tinc un array de length ',
                            this.emergencyUsers.length
                        );
                        this.usersOor = this.emergencyUsers.length;
                        this.mess =
                            'There are ' +
                            this.usersOor +
                            ' users out of range';
                        this.dialogService.openDialog({
                            mode: 'infoDialog',
                            obj: this.mess
                        });
                        console.log(
                            'Tinc aquests usuaris perduts',
                            this.usersOor
                        );
                        console.log(this.mess);
                    });
            });
        });
    }
    mapclicked($event) {
        // console.log($event);
    }
}
