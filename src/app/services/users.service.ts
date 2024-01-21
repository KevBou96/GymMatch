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
      catchError( err => {
        throw err
      })
    )
  }
}
