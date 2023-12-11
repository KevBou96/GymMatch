import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { IPost, IPostResponseData } from 'src/app/interfaces/post.interface';
import { Subscription, catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from 'src/app/modal/create-post-modal/create-post-modal.component';
import { LoginComponent } from 'src/app/auth/login/login.component';

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
    this.postService.getPosts().subscribe({
      next: res => {
        this.posts = res;
        console.log(res);
        
      },
      error: err => {
        console.log(err);
      }
    })

  }

  openCreatePostModal() {
   let dialogRef = this.matDialog.open(CreatePostModalComponent, {
      panelClass:'bg-color',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    })
  }

  getPost() {
    this.postService.getPost('1').subscribe({
      next: post => {
        console.log(post);
      },
      error: err => {
        console.log(err);
      }
    })
  }

 
  ngOnDestroy(): void {
  }
}
