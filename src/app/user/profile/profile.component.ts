import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouteConfigLoadEnd } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  route = inject(ActivatedRoute);
  userService = inject(UsersService)
  profileUser: IUser | null;
  user: IUser | null;
  areFriends = true;

  constructor() {}

  ngOnInit(): void {
    this.getProfileUser();
    this.userService.user.subscribe((user: IUser | null) => {
      this.user = user;      
    })
    
    
  }

  addFriend() {
    this.userService.addNewFriend(this.user?.userId, this.profileUser?.userId).subscribe({
      next: (value) => {
        this.areFriends = true;
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  removeFromFriends() {
    console.log('remove');
    
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
        } else {
          this.areFriends = false;
        }             
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
