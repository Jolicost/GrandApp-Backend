import { User } from '../models/user';

export interface Activity {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    images: string;
    lat: number;
    lng: number;
    participants: User[];
    address: string;
    stats: string;
    points: string;
}
