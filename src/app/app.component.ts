import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gym-match';
  text: string = ''


  pressedButton() {
    this.text = 'nice'
    console.log(this.text);
  
  }
}
