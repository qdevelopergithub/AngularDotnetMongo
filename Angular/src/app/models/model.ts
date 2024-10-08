export interface Post {
    id: number;
    title: string;
    comments: Comment[];
}

export interface Comment {
    id: number;
    description: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
    username: string;
}

export interface Address {
    street: string;
    suite: string;
    'city': string;
    'zipcode': string;
    geo: Geo;
}

interface Geo {
    'lat': string;
    'lng': string;
}

export interface AuthResposeData {
    status: number,
    success: boolean,
    message: string,
    token: string,
    userId: string,
    email: string,
    surveyDataFilled: boolean
}

 