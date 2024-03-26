import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post-service.service';
import { IPost, IPostResponseData } from 'src/app/interfaces/post.interface';
import { Subscription, catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from 'src/app/modal/create-post-modal/create-post-modal.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  posts: IPost[];
  singlePost: IPost;
  postObs: Subscription;
  viewPost = false;
  likes: number = 0;
  dislikes: number = 0;
  commentsCount: number = 0;

  constructor(
    private postService: PostService,
    private matDialog: MatDialog,
    private socketService: SocketService,
    ) {}
  


  ngOnInit(): void {
    this.getPosts();
    this.postObs = this.postService.postChanged.subscribe((posts: IPost[]) => {
      this.posts = posts;
    })
    this.socketService.getPost().subscribe((post: IPost) => {
      this.posts.unshift(post)
    })
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: res => {
        console.log(res);
        
        this.posts = res;
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

  getPost(post_id: number) {
    this.postService.getPost(post_id).subscribe({
      next: post => {
        console.log(post);
        
        this.viewPost = true;
        this.singlePost = post;
        this.singlePost.imgurl = 'http://localhost:8080/' + post.imgurl;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  deletePost(post_id: number, index: number) {  
    this.postService.deletePost(post_id).subscribe({
      next: res => {
        this.postService.deletePostLocal(index);
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.postObs.unsubscribe()
  }

  likePost() {
    console.log('liked');
    this.likes += 1
  }

  dislikePost() {
    this.dislikes += 1;
    console.log('disliked');
  }

  openComments() {
    console.log('comments opened');
    
  }
}


// background-color: #f3f2f1;