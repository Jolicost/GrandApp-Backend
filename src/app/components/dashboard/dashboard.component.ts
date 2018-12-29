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
    totalCon;
    totalUser;
    totalAct;
    totalAchievements;
    entityId;
    entityStatsTypeAct = {};
    entityStatsHours = {};
    entityStatsAchievementsPerName = {};
    entityStatsAchievementsPerType = {};

    entityTypeActKeys = [];
    entityTypeActValues = [];
    entityHoursActKeys = [];
    entityHoursActValues = [];
    entityAchievementsPerNameKeys = [];
    entityAchievementsPerNameValues = [];
    entityAchievementsPerTypeKeys = [];
    entityAchievementsPerTypeValues = [];

    allBorderColors = [
        'rgba(183, 28, 28, 1)',
        'rgba(136, 14, 79, 1)',
        'rgba(74, 20, 140, 1)',
        'rgba(26, 35, 126, 1)',
        'rgba(13, 71, 161, 1)',
        'rgba(0, 96, 100, 1)',
        'rgba(0, 77, 64, 1)',
        'rgba(27, 94, 32, 1)',
        'rgba(130, 119, 23, 1)',
        'rgba(245, 127, 23, 1)',
        'rgba(230, 81, 0, 1)',
        'rgba(62, 39, 35, 1)'
    ];
    allBackgroundColors = [
        'rgba(183, 28, 28, 0.2)',
        'rgba(136, 14, 79, 0.2)',
        'rgba(74, 20, 140, 0.2)',
        'rgba(26, 35, 126, 0.2)',
        'rgba(13, 71, 161, 0.2)',
        'rgba(0, 96, 100, 0.2)',
        'rgba(0, 77, 64, 0.2)',
        'rgba(27, 94, 32, 0.2)',
        'rgba(130, 119, 23, 0.2)',
        'rgba(245, 127, 23, 0.2)',
        'rgba(230, 81, 0, 0.2)',
        'rgba(62, 39, 35, 0.2)'
    ];
    size1;
    constructor(
        private userService: UserService,
        private actService: ActivitiesService,
        private entityService: EntityService
    ) {}

    ngOnInit() {
        if (
            localStorage.getItem('token') !== undefined ||
            localStorage.getItem('token') !== null
        ) {
            this.userService.verify().subscribe(userInfo => {
                this.entityId = userInfo.entity;
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
                        this.size1 = this.entityTypeActKeys.length;
                        const borderColorsPick = [];
                        const backgroundColorsPick = [];
                        for (let i = 0; i < this.size1; i++) {
                            borderColorsPick[i] = this.allBorderColors[i];
                            backgroundColorsPick[i] = this.allBackgroundColors[
                                i
                            ];
                            // console.log('Border Pick tenim', borderColorsPick[i]);
                            // console.log('Back Pick tenim', borderColorsPick[i]);
                        }
                        this.chart = new Chart('myChart', {
                            type: 'bar',
                            data: {
                                labels: this.entityTypeActKeys,
                                datasets: [
                                    {
                                        label: '# of Activities per Theme',
                                        data: this.entityTypeActValues,
                                        backgroundColor: backgroundColorsPick,
                                        borderColor: borderColorsPick,
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
                                        label: '# Activities per hour',
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
                        this.entityService
                            .getEntityStatisticsUsers(this.entityId)
                            .subscribe(users => {
                                this.totalUser = users.nRegisteredUsers;
                                // console.log('que tinc a Total Users', this.totalUser);
                            });
                        this.entityService
                            .getTotalConnections(this.entityId)
                            .subscribe(con => {
                                this.totalCon = con.nConnections;
                            });
                        this.entityService.getEntityStatisticsAchievements(this.entityId).subscribe(achievements => {
                            this.totalAchievements = achievements.nAchievements;
                            this.entityStatsAchievementsPerName = achievements.achievementsPerName;
                            this.entityStatsAchievementsPerType = achievements.achievementsPerType;
                            this.entityAchievementsPerNameKeys = Object.keys(this.entityStatsAchievementsPerName);
                            this.entityAchievementsPerNameValues = Object.values(this.entityStatsAchievementsPerName);
                            this.entityAchievementsPerTypeKeys = Object.keys(this.entityStatsAchievementsPerType);
                            this.entityAchievementsPerTypeValues = Object.values(this.entityStatsAchievementsPerType);
                            this.chart = new Chart('myChart3', {
                                type: 'bar',
                                data: {
                                    labels: this.entityAchievementsPerNameKeys,
                                    datasets: [
                                        {
                                            label: '# Achievements per name',
                                            data: this.entityAchievementsPerNameValues,
                                            backgroundColor: backgroundColorsPick,
                                            borderColor: borderColorsPick,
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
                            this.chart = new Chart('myChart4', {
                                type: 'bar',
                                data: {
                                    labels: this.entityAchievementsPerTypeKeys,
                                    datasets: [
                                        {
                                            label: '# Achievements per type',
                                            data: this.entityAchievementsPerTypeValues,
                                            backgroundColor: backgroundColorsPick,
                                            borderColor: borderColorsPick,
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
            });
        }
    }
}
