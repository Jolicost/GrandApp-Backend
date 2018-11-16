import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserLocationService {
    locations = [
        {
            userID: '1',
            lat: 51.575428,
            lng: 7.39917,
            address: ''
        },
        {
            userID: '2',
            lat: 51.576428,
            lng: 7.738917,
            address: ''
        },
        {
            userID: '3',
            lat: 51.573428,
            lng: 7.839317,
            address: ''
        },
        {
            userID: '4',
            lat: 51.575788,
            lng: 7.837917,
            address: ''
        }
    ];

    constructor() {}

    getUserLocation(id) {
        const lat = this.locations.find(user => user.userID == id).lat;
        const lng = this.locations.find(user => user.userID == id).lng;
        return { lat, lng };
    }
}
