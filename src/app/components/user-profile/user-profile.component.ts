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
    userInfo;
    entityInfo;
    showEntityInfo = false;

    constructor(
        private userService: UserService,
        private dialogService: DialogService,
        private entityService: EntityService
    ) {
        this.userService.verify().subscribe(userInfo => {
            this.userInfo = userInfo;
            if (this.userInfo !== undefined) {
                this.entityId = userInfo.entity;
            }
            if (this.entityId !== undefined) {
                this.entityService
                    .getEntityInfo({ id: this.entityId })
                    .subscribe(res => {
                        console.log('ssss: ', res);
                        this.entityInfo = res;
                    });
            }
        });
    }

    ngOnInit() {
        this.userService.user$.subscribe(mode => {
            if (mode === 'myProfileChanged') {
                this.userService.verify().subscribe(userInfo => {
                    this.userInfo = userInfo;
                });
            }
        });
    }

    show() {
        this.showEntityInfo = !this.showEntityInfo;
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }
}
