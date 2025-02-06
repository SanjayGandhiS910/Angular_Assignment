import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class UserDetailsService{
    users = [
        {id: 1, name: 'John Smith', username: 'js', password: '12345'},
        {id: 2, name: 'Merry Jane', username: 'mj', password: '12345'},
        {id: 3, name: 'Mark Vought', username: 'mv', password: '12345'},
        {id: 4, name: 'Sarah King', username: 'sk', password: '12345'}
    ]

}