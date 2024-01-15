import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SocketService } from '../services/socket.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit  {
    images = [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3ltc3xlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGd5bXN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltc3xlbnwwfHwwfHx8MA%3D%3D"
    ];

    constructor(config: NgbCarouselConfig, private socketService: SocketService) {
      
      config.wrap = true;
      config.keyboard = false;
      config.pauseOnHover = false;
      config.animation = false;
    }

  ngOnInit(): void {
    // this.socketService.getMessage().subscribe(msg => {
    //   console.log(msg, 'socket server');
      
    // })
  }
}

