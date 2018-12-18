import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';
import { Router } from '@angular/router';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    activities: Array<Activity> = [];

    constructor(
        private dialogService: DialogService,
        private activitiesService: ActivitiesService,
        private router: Router
    ) {
        this.activitiesService.getActivities().subscribe(res => {
            this.activities = res;
        });
    }
    ngOnInit() {
        this.activitiesService.activity$.subscribe(activityTable => {
            this.activitiesService.getActivities().subscribe(res => {
                this.activities = res;
            });
        });
    }

    timeConverter(UNIX_timestamp) {
        const a = new Date(UNIX_timestamp * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }

    showDetails(id) {
        this.router.navigate(['/activities', id]);
    }
}
