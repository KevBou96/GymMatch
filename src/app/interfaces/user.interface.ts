export interface IUser {
    userId?: number,
    firstName: string,
    lastName: string,
    gender?: string,
    email: string,
    password: string,
    profileImg?: File,
    verified?: boolean,
    created_on?: Date
}

export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public created_on?: Date,
        public userId?: number,
    ) {}
    
}