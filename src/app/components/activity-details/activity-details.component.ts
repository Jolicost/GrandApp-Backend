import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Activity } from 'src/app/models/activity';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReverseGeocodingService } from 'src/app/services/reverseGeocoding/reverse-geocoding.service';

@Component({
    selector: 'app-activity-details',
    templateUrl: './activity-details.component.html',
    styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit, OnDestroy {
    id: number;
    private sub: any;
    activitySelected: Activity;
    usersID = <any>[];
    participants = <any>[];
    completeStreetName;
    iniLat;
    iniLng;
    zoom = 16;

    constructor(
        private activatedRoute: ActivatedRoute,
        private activitiesServices: ActivitiesService,
        private router: Router,
        private userService: UserService,
        private reverseGeocodingService: ReverseGeocodingService
    ) {}

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.activitiesServices.getActivity(this.id).subscribe(act => {
            this.activitySelected = act;
            this.iniLat = this.activitySelected.lat;
            this.iniLng = this.activitySelected.long;
            this.usersID = act.participants;
            this.usersID.forEach(userID => {
                this.userService.getUserInfo(userID).subscribe(res => {
                    this.participants.push({
                        email: res.email,
                        name: res.completeName
                    });
                });
                // console.log('participants name:', this.participants);
            });
            // show the street name with the lat and long
            this.reverseGeocodingService
                .convertToStreet(
                    this.activitySelected.lat,
                    this.activitySelected.long
                )
                .subscribe(res => {
                    this.completeStreetName = res.results[0].formatted_address;
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    goBack() {
        this.router.navigate(['/activities']);
    }

    timeConverter(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time =
            date +
            ' ' +
            month +
            ' ' +
            year +
            ' ' +
            hour +
            ':' +
            min +
            ':' +
            sec;
        return time;
    }
}
