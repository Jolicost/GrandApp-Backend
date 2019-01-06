import { Component, OnInit } from '@angular/core';
import { ReverseGeocodingService } from '../../services/reverseGeocoding/reverse-geocoding.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { UserLocationService } from '../../services/userLocation/user-location.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

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
        private reverseGeoService: ReverseGeocodingService,
        private activityService: ActivitiesService,
        private userLocationService: UserLocationService,
        private entityService: EntityService,
        private userService: UserService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.userService.verify().subscribe (resv => {
            this.entityid = resv.entity;
            // console.log('Id entity', this.entityid);
            this.entityService.getEntityInfo({id: this.entityid}).subscribe (rese => {
                this.initLat = rese.place.lat;
                // console.log('Tinc lat', this.initLat);
                this.initLong = rese.place.long;
                // console.log('Tinc long', this.initLong);
            });
            // console.log('Tinc id entitat', this.entityid);
            this.entityService.getEmergencyContacts(this.entityid).subscribe (emer => {
                this.emergencyUsers = emer;
                if (Object.keys(this.emergencyUsers).length > 0) {
                    this.zoom = 9;
                }
            });
            this.usersOor = Object.keys(this.emergencyUsers).length;
            this.mess = 'There are ' + this.usersOor + ' users out of range';
            console.log(this.mess);
            this.dialogService.openDialog({
                mode: 'infoDialog',
                obj: this.mess
            });
        });

        /*this.emergencyUsers.forEach(element => {
            const position = element;
            );
            this.reverseGeoService
                .convertToStreet(position.place.lat, position.place.long)
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
}
