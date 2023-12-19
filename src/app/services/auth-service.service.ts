import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IPost, IPostResponseData } from '../interfaces/post.interface';
import { IUser } from '../interfaces/user.interface';
import { Subject, of, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  signUpUser(user: IUser) {
    return this.http.post(
      'http://localhost:8080/auth/signup',
      user,
      {
       observe: 'response',
      }).pipe(
        map((responseData: any) => {
          console.log(responseData);
          return responseData.body
        }), catchError(err => {
          throw err
        })
        )
  }

  loginUser(email: string, password: string) {
    const body = {
      email,
      password
    };
    return this.http.post(
      'http://localhost:8080/auth/signup',
      body,
      {
        observe: 'response'
      }
    ).pipe(
      map((responseData: any) => {
        console.log(responseData);
        return responseData.body
      }), catchError(err => {
        throw err
      })
    )
  }
}
