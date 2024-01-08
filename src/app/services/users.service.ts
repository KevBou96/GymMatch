import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  user = new BehaviorSubject<IUser | null>(null);

  constructor() { }
}
