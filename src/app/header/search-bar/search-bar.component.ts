import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
 import { IFriend } from 'src/app/interfaces/user.interface';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText = "";
  users: IFriend[];
  timeout: any;

  constructor(private userService: UsersService, private router: Router ) {}
  
  onKeySearch(event: any) {
    if (this.searchText === "") {
      this.users = [];
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (event.keyCode != 13) {
        if (this.searchText === "") {
          this.users = []
          return
        }
        this.searchFriends()
      }
    }, 1000)
  }

  searchFriends() {
    this.userService.getSearchFriends(this.searchText).subscribe({
      next: (users: IFriend[]) => {
        this.users = users;
      },
      error: err => {
        console.log(err);  
      }
    })
  }

  goToUserProfile(userId: number | undefined) {
    if (userId) {
      this.users = [];
      this.searchText = "";
      this.router.navigate(['main/user', userId])
    }
    else {
      return
    }
  }

}
