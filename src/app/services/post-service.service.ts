import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IPost, IPostResponseData } from '../interfaces/post.interface';
import { Subject, of, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: IPost[] = [];
  // postsChanged = new Subject<IPost[]>();
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>('http://localhost:8080/feed/posts', {observe: 'response'})
      .pipe(map((responseData: any) => {
        return responseData.body.posts
      }), catchError(errorResponse => {
        return throwError(errorResponse.error)
      }));
  }

  createNewPost(post: IPost) {
    return this.http.post<any>(
      'http://localhost:8080/feed/posts', 
      post,
      { observe: 'response'}
      ).pipe(
        map((res: any) => {
          if (res.status !== 201) {
            throw 'error'
          }
          return res.body;
        }), catchError(err => {
          throw err
        })
      )
  }
}
