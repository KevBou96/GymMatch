import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private token = localStorage.getItem('auth-token');
  user = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) { }


  getSearchFriends(searchText: string) {
    return this.http.get<any>('http://localhost:8080/user/search-friends/' + searchText,
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.token
      }),
      observe: 'response'
    }
    ).pipe(
      map((responseData: any) => {
        return responseData.body.users.map((item: any) => {
          return { userId: item.user_id, firstName: item.first_name, lastName: item.last_name }
        });
      }),
      catchError(err => {
        throw err
      })
    )
  }

  getUserInfo(userId: number) {
    return this.http.get<any>('http://localhost:8080/user/get-user/' + userId, 
    {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.token
      }),
      observe: 'response'
    }).pipe(
      map((responseData: any) => {
        const userObj = {
          userId: responseData.body.user.user_id,
          email: responseData.body.user.email,
          firstName: responseData.body.user.first_name,
          lastName: responseData.body.user.last_name,
          created_on: responseData.body.user.created_on
        }
        return userObj
      }),
      catchError(err => {
        throw err
      })
    )
  }

  areFriends(userId: number | undefined, friendId: number | undefined) {
    const body = {
      userId,
      friendId
    }
    return this.http.post<any>('http://localhost:8080/user/check-if-friends', 
      body,
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      }).pipe(
        map((responseData: any) => {
          return responseData.body.message
        }),
        catchError(err => {
          throw err
        })
      )
  }

  addNewFriend(userId: number | undefined, friendId: number | undefined) {
    const body = {
      userId,
      friendId
    }
    console.log(body);
    
    return this.http.post<any>('http://localhost:8080/user/add-friend',
      body,
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      }).pipe(
        map((responseData: any) => {
          console.log(responseData);
          return responseData.body
        }),
        catchError(err => {
          throw err
        })
      )
  }
}
