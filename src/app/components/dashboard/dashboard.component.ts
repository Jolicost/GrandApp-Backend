import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/services/user/user.service';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { EntityService } from 'src/app/services/entity/entity.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    chart = [];
    totalUser;
    totalAct;
    entityId;
    entityStatsTypeAct = {};
    entityStatsHours = {};
    entityTypeActKeys = [];
    entityTypeActValues = [];
    entityHoursActKeys = [];
    entityHoursActValues = [];
    constructor(
        private userService: UserService,
        private actService: ActivitiesService,
        private entityService: EntityService
    ) {}

    ngOnInit() {
        this.userService.verify().subscribe(userInfo => {
            this.entityId = userInfo._id;
            this.entityService
                .getEntityStatisticsActivities(this.entityId)
                .subscribe(entityInfo => {
                    this.entityStatsTypeAct = entityInfo.types;
                    this.entityStatsHours = entityInfo.hours;
                    this.entityTypeActKeys = Object.keys(
                        this.entityStatsTypeAct
                    );
                    this.entityTypeActValues = Object.values(
                        this.entityStatsTypeAct
                    );
                    this.entityHoursActKeys = Object.keys(
                        this.entityStatsHours
                    );
                    this.entityHoursActValues = Object.values(
                        this.entityStatsHours
                    );
                    this.totalAct = entityInfo.nActivities;
                    this.chart = new Chart('myChart', {
                        type: 'bar',
                        data: {
                            labels: this.entityTypeActKeys,
                            datasets: [
                                {
                                    label: '# of Activities per Theme',
                                    data: this.entityTypeActValues,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)'
                                    ],
                                    borderColor: ['rgba(255,99,132,1)'],
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                ]
                            }
                        }
                    });
                    this.chart = new Chart('myChart2', {
                        type: 'line',
                        data: {
                            labels: this.entityHoursActKeys,
                            datasets: [
                                {
                                    label: '# Activities per day',
                                    data: this.entityHoursActValues,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)'
                                    ],
                                    borderColor: ['rgba(255,99,132,1)'],
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                ]
                            }
                        }
                    });
                });
        });
        this.entityService
            .getEntityStatisticsUsers(this.entityId)
            .subscribe(users => {
                this.totalUser = users.nRegisteredUsers;
                // console.log('que tinc a Total Users', this.totalUser);
            });
    }
}
