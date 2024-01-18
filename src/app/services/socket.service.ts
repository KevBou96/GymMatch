import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor( public socket: Socket) { }

  getPost () {
    return this.socket.fromEvent<any>('posts').pipe(map(data => {
      return data.post
    }));
  }

  getMessage() {
    return this.socket.fromEvent<any>('msg')
  };

  sendMessage(msg: string) {
    this.socket.emit('msg', msg);
  }
}
