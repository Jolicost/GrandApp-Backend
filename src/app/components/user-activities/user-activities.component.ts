import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { EntityService } from 'src/app/services/entity/entity.service';

@Component({
    selector: 'app-user-activities',
    templateUrl: './user-activities.component.html',
    styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
    actURL = 'https://grandapp.herokuapp.com/activities';
    users;

    constructor(
        private dialogService: DialogService,
        private activitiesService: ActivitiesService,
        private entityService: EntityService
    ) {}

    ngOnInit() {
        this.entityService.getAllUsersOfMyEntity().subscribe(res => {
            this.users = res;
        });
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }
}
