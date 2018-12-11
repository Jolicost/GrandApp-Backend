import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { EntityService } from 'src/app/services/entity/entity.service';

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
        private dialogService: DialogService,
        private entityService: EntityService
    ) {}

    ngOnInit() {
        this.userService
            .verify()
            .subscribe(userInfo => {
                this.userInfo = userInfo;
                this.entityId = userInfo._id;
                console.log('userInfo', this.userInfo);
                console.log('entityId', this.entityId);
                this.entityService
                    .getEntityInfo({ id: this.entityId })
                    .subscribe(entityInfo => {
                        this.entityInfo = entityInfo;
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
