import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-user-activities',
    templateUrl: './user-activities.component.html',
    styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
    actURL = 'https://grandapp.herokuapp.com/activities';
    userActivities = [];

    constructor(
        private dialogService: DialogService,
        private activitiesService: ActivitiesService
    ) {}

    ngOnInit() {
        // this.userActivities = this.activitiesService.getActivities();
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }
}
