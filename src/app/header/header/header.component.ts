import { Component, Inject, OnInit, inject } from '@angular/core';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SocketService } from 'src/app/services/socket.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  socketService = inject(SocketService)
  isCollapsed = true;
  isUser = false;
  user: IUser | null;

  constructor( private userService: UsersService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user: IUser | null) => {
      if (user) {
        this.isUser = true;
        this.user = user;      
      }
    })
    // this.socketService.getNotification().subscribe((data: any) => {
    //   console.log(data);
    // })
    
  }
 
  logout() {
    this.isUser = false;
    this.authService.logOut();
  }
}
