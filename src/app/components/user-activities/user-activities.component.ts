import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

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
        private entityService: EntityService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.entityService.getAllUsersOfMyEntity().subscribe(res => {
            this.users = res;
        });
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }

    showDetails(id) {
        this.router.navigate(['/users', id]);
    }
}
