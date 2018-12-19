import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserActivitiesService {
    activities = [
        {
            name: 'act1',
            description: 'descrip1',
            startDate: 'date1',
            endDate: 'date2',
            lat: 51.578428,
            lng: 7.809917,
            image: 'image1',
            participants: [
                {
                    id: 1,
                    name: 'par1',
                    age: '65',
                    email: 'asd@asd.com'
                },
                {
                    id: 2,
                    name: 'par2',
                    age: '75',
                    email: 'asd@as22d.com'
                }
            ],
            address: ''
        },
        {
            name: 'act2',
            description: 'descrip1',
            startDate: 'date3',
            endDate: 'date4',
            lat: 51.478448,
            lng: 7.809027,
            image: 'image2',
            participants: [],
            address: ''
        }
    ];

    constructor() {}

    getActivity(name, startDate, endDate): any {
        this.activities.forEach(element => {
            if (
                element.name === name &&
                element.startDate === startDate &&
                endDate === endDate
            ) {
                console.log(element);
                return element;
            }
        });
    }

    getActivities() {
        return this.activities;
    }

    addActivitiy(activity) {
        // console.log(activity);
        this.activities.push(activity);
    }

    editActivity(oldActivity, activity) {
        // console.log('new name', activity.name);
        // console.log('old name', oldActivity.name);
        this.activities.forEach(element => {
            if (
                element.name === oldActivity.name &&
                element.startDate === oldActivity.startDate &&
                element.endDate === oldActivity.endDate
            ) {
                element.name = activity.name;
                element.description = activity.description;
                element.startDate = activity.startDate;
                element.endDate = activity.endDate;
                element.lat = activity.lat;
                element.lng = activity.lng;
                element.image = activity.image;
                element.participants = activity.participants;
                element.address = activity.address;
            }
        });
        // console.log('activitats', this.activities);
    }

    deleteActivity(actToDelete) {
        for (let i = 0; i < this.activities.length; ++i) {
            if (
                this.activities[i].name === actToDelete.name &&
                this.activities[i].startDate === actToDelete.startDate &&
                this.activities[i].endDate === actToDelete.endDate
            ) {
                this.activities.splice(i, 1);
            }
        }
    }
}
