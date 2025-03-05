import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class User {

    public id: number;
    public userId: string;
    public email: string;
    public readOnly: boolean;
    public firstName: string;
    public lastName: string;

    constructor(public data:any) {
        this.id = data.id;
        this.userId = data.userId;
        this.email = data.email;
        this.readOnly = data.readOnly;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
    }

    // To be implemented
    hasFunction() {
        return true;
    }

    // To be implemented
    hasRole() {
        return true;
    }
}




@Injectable({
  providedIn: 'root'
})
export class AuthManager {

    constructor() {}


    isAuthenticated(): Promise<boolean> {
        // logic to check if user is authenticated
        const isAuthenticated = true; // logic to check if user is authenticated
        return Promise.resolve(isAuthenticated);
    }

    getBasicUserInfo(): any {
        const user = {id: 1, userId: 'Anu', email: 'Anu@Mylucky.com', readOnly: false, firstName: 'Anu', lastName: 'Ramesh'}; 
        //localStorage.getItem('user');
        if (user) {
           return new User(user);
        }
        return Promise.resolve(null);
    }

    isUserReadOnly(): boolean {
        return false;
    }


}
