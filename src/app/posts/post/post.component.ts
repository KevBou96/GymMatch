import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { IPost, IPostResponseData } from 'src/app/interfaces/post.interface';
import { Subscription, catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from 'src/app/modal/create-post-modal/create-post-modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  constructor(
    private postService: PostService,
    private matDialog: MatDialog
    ) {}
  


  ngOnInit(): void {
  }

  getPosts() {
    this.postService.getPosts()
    .subscribe((posts: IPost[]) => {
      console.log(posts);
      this.posts = posts;
    }, err => {
      console.log(err);
    }) 
  }

  openCreatePostModal() {
    this.matDialog.open(CreatePostModalComponent, {
      panelClass:'bg-color',
    })
  }

  ngOnDestroy(): void {
  }
}
