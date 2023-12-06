import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService) {}


  ngOnInit(): void {}

  getPosts() {
    this.postService.getPosts().subscribe((data) => {
      console.log(data);
      
    })
  }

}
