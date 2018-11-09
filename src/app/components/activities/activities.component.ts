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

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }

    showDetails(id) {
        console.log('id: ', id);
        this.router.navigate(['/activity', id]);
    }
}
