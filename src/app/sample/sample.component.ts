import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Icircle } from '../interfaces/post.interface';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  
  circles: Icircle[] = []
  circleS: { [key: string]: string} = {
    'position': 'absolute',

  }

  

  ngOnInit(): void {
    
  }

  // printCircle() {
  //   for (let index = 0; index < this.circles.length; index++) {
  //     this.circleS.left = this.circles[index].clientX;
  //     this.circleS.top = this.circles[index].clientY;
  //   }
  // }

  placeCircle($event: MouseEvent) {
    let newCircle: Icircle = {
      clientX: $event.clientX + 'px',
      clientY: $event.clientY + 'px'
    }
    console.log(newCircle);
    
    this.circles = [...this.circles, newCircle]
    console.log(this.circles);
    this.circleS.left = newCircle.clientX;
    this.circleS.top = newCircle.clientY;
    // this.printCircle();
    // console.log($event);
    
  }
}
