import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IPost, IPostResponseData } from '../interfaces/post.interface';
import { Subject, of, throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from "rxjs/operators";
import { UsersService } from './users.service';
import { IUser } from '../interfaces/user.interface';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: IPost[] = [];
  postChanged = new Subject<IPost[]>();
  private token = localStorage.getItem('auth-token');
  constructor(private http: HttpClient, private userService: UsersService, private socketService: SocketService) {};


  getPosts() {
    return this.http.get<any>(
      'http://localhost:8080/feed/posts', 
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      }
      ).pipe(
        map((responseData: any) => {
          if (responseData.status !== 200) {
            throw 'error'
          }
          return responseData.body.posts;
        }), tap((posts: IPost[]) => {    
          this.posts = posts;
        })
        , catchError(err => {
        throw err
      })
    );
  }

  getUserPosts(userId: number | undefined) {
    return this.http.get<any>('http://localhost:8080/feed/posts/' + userId, {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer ' + this.token
      }),
      observe: 'response'
    }).pipe(
      map((responseData: any) => {
        return responseData.body
      }),
      catchError(err => {
        throw err
      })
    )
  }

  createNewPost(post: IPost) {
    const formData = new FormData();
    this.userService.user.subscribe((user: any) => {
      formData.append("user_id", user.userId);
    })
    formData.append("post_title", post.post_title);
    formData.append("post_content", post.post_content);
    formData.append("image", post.image);
    formData.append("first_name", post.first_name);
    formData.append("last_name", post.last_name);
    return this.http.post<any>(
      'http://localhost:8080/feed/post', 
      formData,
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      },
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

  getPost(post_id: number | undefined) {
    return this.http.get<any>(
      "http://localhost:8080/feed/post/" + post_id,
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      },
    ).pipe(
      map((responseData: any) => {
        if (responseData.status !== 200) {
          throw 'error'
        }
        return responseData.body.post;
      }), catchError(err => {
        throw err
      })
    )
  }

  deletePost(post_id: number) {
    return this.http.delete<any>(
      'http://localhost:8080/feed/post/' + post_id,
      {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer ' + this.token
        }),
        observe: 'response'
      },
      ).pipe(
        map((res: any) => {
          if (res.status !== 201) {
            throw 'error'
          }
          return res.body
        }), catchError(err => {
          throw err
        })
      )
  }

  addPost(post: IPost) {
    this.posts.push(post);
    this.postChanged.next(this.posts.slice());
  }

  deletePostLocal(index: number) {
    this.posts.splice(index, 1);
    this.postChanged.next(this.posts.slice())
  }
}
