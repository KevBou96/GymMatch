import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText: any;
  datas = [
    "jose",
    "mike",
    "pedro",
    "marc",
    "mendez"
  ]

  constructor(private userService: UsersService) {}


 
}
