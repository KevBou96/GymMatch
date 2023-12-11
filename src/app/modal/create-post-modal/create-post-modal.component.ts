import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { IPost } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {

  postForm: FormGroup;
  error: string = '';
  isLoading = false;

  constructor(private postService: PostService, public dialogRef: MatDialogRef<CreatePostModalComponent>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required])
    })
  }

  createPost() {
    this.isLoading = true;
    let title = this.postForm.value.title;
    let content = this.postForm.value.content;
    const newPost: IPost = {
      post_title: title,
      post_content: content,
      imgurl: 'urlsample'
    }
    this.postService.createNewPost(newPost).subscribe({
      next: res => {
        this.isLoading = false;
        this.dialogRef.close('Success')
      },
      error: err => {
        this.isLoading = false;
        this.error = err.error.message;
      }
    })    
  }

  closeModal() {
    this.dialogRef.close('closed')
  }
}
