import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    entityId;
    userInfo = {};
    entitiesInfo = <any>[];
    entityInfo = {};
    showEntityInfo = false;

    constructor(
        private userService: UserService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.userService
            .verify(localStorage.getItem('token'))
            .subscribe(userInfo => {
                this.entityId = userInfo.entity;
                this.userInfo = userInfo;

                this.userService
                    .getInfoEntitie({ id: this.entityId })
                    .subscribe(entityInfo => {
                        this.entitiesInfo = entityInfo;
                        this.entitiesInfo.forEach(element => {
                            if (element._id === this.entityId) {
                                this.entityInfo = element;
                            }
                        });
                    });
            });
    }

    show() {
        this.showEntityInfo = !this.showEntityInfo;
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }
}
