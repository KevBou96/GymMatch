import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouteConfigLoadEnd } from '@angular/router';
import { IPost } from 'src/app/interfaces/post.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { PostService } from 'src/app/services/post-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // injectables
  route = inject(ActivatedRoute);
  userService = inject(UsersService);
  postService = inject(PostService)

  // variables
  profileUser: IUser | null;
  user: IUser | null;
  areFriends = true;
  posts: IPost[];

  constructor() {}

  ngOnInit(): void {
    this.posts = []
    this.getProfileUser();
    this.userService.user.subscribe((user: IUser | null) => {
      this.user = user;      
    })
  }

  addFriend() {
    this.userService.addNewFriend(this.user?.userId, this.profileUser?.userId).subscribe({
      next: (value) => {
        this.areFriends = true;
        this.getPosts();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  removeFromFriends() {
    this.userService.deleteFromFriends(this.profileUser?.userId).subscribe({
      next: () => {
        this.areFriends = false;
        this.posts = []
      },
      error: err => {
        console.log(err);
        
      }
    })
    
  }

  getProfileUser() {
    let profileId: number;
    this.route.params.subscribe((params) => {
      profileId = params.userId;
      this.userService.getUserInfo(profileId).subscribe({
        next: (user: IUser) => {
          this.profileUser = user;
          if (this.profileUser.userId != this.user?.userId) {
            this.getAreFriends();
          } else {
            this.getPosts();
          }
        },
        error: err => {
          console.log(err);
        }
      })
    })
  }

  getAreFriends() {
    this.userService.areFriends(this.user?.userId, this.profileUser?.userId).subscribe({
      next: message => {
        if (message === 'FRIENDS') {
          this.areFriends = true;
          this.getPosts()
        } else {
          this.areFriends = false;
        }             
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getPosts() {
    this.postService.getUserPosts(this.profileUser?.userId).subscribe({
      next: posts => {
        console.log(posts);
        if (posts.lenght == 0) {
          this.posts = []
        } else {
          this.posts = posts.posts
        }   
      },
    error: err => {
      console.log(err);
      
    }
  })
  }
}
