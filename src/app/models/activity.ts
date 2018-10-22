import { User } from '../models/user';

export interface Activity {
    id: number;
    title: string;
    description: string;
    userId: number;
    rating: number;
    images: string[];
    lat: number;
    long: number;
    timestampStart: number;
    timestampEnd: number;
    participants: number[];
    address: string;
    activityType: any;
    capacity: number;
    price: number;
}
