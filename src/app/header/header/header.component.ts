import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;
  user: IUser | null;

  constructor( private userService: UsersService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user: IUser | null) => {
      this.user = user;
    })
  }
 


  logout() {
    this.authService.logOut();
  }
}
