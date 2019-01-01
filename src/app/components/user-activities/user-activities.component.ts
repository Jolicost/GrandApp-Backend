import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { EntityService } from 'src/app/services/entity/entity.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-user-activities',
    templateUrl: './user-activities.component.html',
    styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
    actURL = 'https://grandapp.herokuapp.com/activities';
    users;
    totalUsers;
    loopTimes;
    searchedName = '';

    constructor(
        private dialogService: DialogService,
        private entityService: EntityService,
        private messageService: MessagesService,
        private router: Router
    ) {}

    ngOnInit() {
        // auto reaload the users content
        const source = interval(1000 * 30);
        const subscribe = source.subscribe(val => {
            this.getFilteredUsers(this.entityService.getCurrentPageNumber());
        });

        this.entityService.countTotalUsers().subscribe(totalUser => {
            this.totalUsers = totalUser.count;
            this.entityService.setTotalUsers(totalUser.count);
            this.getFilteredUsers(0);
        });
    }

    setPageSize(event) {
        const numPerPage = event.target.value;
        this.entityService.setCurrentPageSize(numPerPage);
        this.getFilteredUsers(0);
    }

    getFilteredUsers(pageNumber) {
        // console.log('pagenumber = ', pageNumber);
        this.entityService.setCurrentPageNumber(pageNumber);
        this.entityService
            .getUsersByParams(
                this.entityService.getCurrentPageNumber() * this.entityService.getCurrentPageSize(),
                this.entityService.getCurrentPageSize()
            )
            .subscribe(res => {
                if (this.messageService.getExists()) {
                    this.dialogService.openDialog({
                        mode: 'infoDialog',
                        obj: this.messageService.getMessage()
                    });
                    this.messageService.setMessage(null);
                } else {
                    const totalPage = Math.ceil(
                        Number(this.totalUsers) /
                            this.entityService.getCurrentPageSize()
                    );
                    console.log('totalUser: ', this.totalUsers);
                    this.entityService.setTotalUsers(this.totalUsers);
                    this.loopTimes = Array(totalPage)
                        .fill(0)
                        .map((x, i) => i);
                    this.users = res;
                }
            });
    }

    onKey(event) {
        this.searchedName = event.target.value;
        if (this.searchedName === '') {
            this.entityService.countTotalUsers().subscribe(totalUser => {
                this.totalUsers = totalUser.count;
                this.entityService.setTotalUsers(totalUser.count);
                this.getFilteredUsers(0);
            });
        }
    }

    search() {
        this.entityService.searchUserByCompleteName(this.searchedName).subscribe(res => {
            this.users = res;
            this.totalUsers = res.length;
            const totalPage = Math.ceil(
                Number(this.totalUsers) /
                    this.entityService.getCurrentPageSize()
            );
            this.entityService.setTotalUsers(this.totalUsers);
            this.loopTimes = Array(totalPage)
                .fill(0)
                .map((x, i) => i);
        });
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }

    showDetails(id) {
        this.router.navigate(['/users', id]);
    }
}
