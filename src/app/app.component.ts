import { Component } from '@angular/core';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';

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
