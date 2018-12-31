import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { interval } from 'rxjs';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
    activities: Array<Activity> = [];
    loopTimes;
    totalActivities;

    constructor(
        private dialogService: DialogService,
        private activitiesService: ActivitiesService,
        private router: Router,
        private messageService: MessagesService
    ) {
    }
    ngOnInit() {
        // auto reaload the activities content
        const source = interval(1000 * 30);
        const subscribe = source.subscribe(val => {
            this.getFilteredActivities(this.activitiesService.getCurrentPageNumber());
        });

        this.activitiesService.countTotalActivities().subscribe(totalActivities => {
            this.totalActivities = totalActivities.count;
            this.activitiesService.setTotalActivities(totalActivities.count);
        });
        this.getFilteredActivities(0);
        this.activitiesService.activity$.subscribe(mode => {
            console.log('MODE: ', mode);
            if (mode === 'added') {
                this.getFilteredActivities(0);
            } else if (mode === 'updated') {
                this.getFilteredActivities(this.activitiesService.getCurrentPageNumber());
            }
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

    setPageSize(event) {
        const numPerPage = event.target.value;
        this.activitiesService.setCurrentPageSize(numPerPage);
        this.getFilteredActivities(0);
    }

    getFilteredActivities(pageNumber) {
        // console.log('pagenumber = ', pageNumber);
        // console.log('currentpage = ', this.activitiesService.getCurrentPageNumber());
        // console.log('currentpagesize = ', this.activitiesService.getCurrentPageSize());
        this.activitiesService.setCurrentPageNumber(pageNumber);
        this.activitiesService
            .getActivitiesByParams(
                this.activitiesService.getCurrentPageNumber() * this.activitiesService.getCurrentPageSize(),
                this.activitiesService.getCurrentPageSize()
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
                        Number(this.totalActivities) /
                            this.activitiesService.getCurrentPageSize()
                    );
                    this.activitiesService.setTotalActivities(this.totalActivities);
                    this.loopTimes = Array(totalPage)
                        .fill(0)
                        .map((x, i) => i);
                    this.activities = res;
                }
            });
    }

    openModal(mode) {
        this.dialogService.openDialog(mode);
    }

    showDetails(id) {
        this.router.navigate(['/activities', id]);
    }
}
