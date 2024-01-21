import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
 import { IFriend } from 'src/app/interfaces/user.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText = "";
  users: IFriend[];
  timeout: any;

  constructor(private userService: UsersService) {}
  
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
    console.log(this.searchText);
    this.userService.getSearchFriends(this.searchText).subscribe({
      next: (users: IFriend[]) => {
        this.users = users;
      },
      error: err => {
        console.log(err);  
      }
    })
  }

  addFriend(user_id: number | undefined) {
    if (user_id) {
      console.log(user_id);
    }
    else {
      return
    }
  }

}
