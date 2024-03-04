import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/app/interfaces/post.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { PostService } from '../../services/post-service.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css']
})
export class CreatePostModalComponent implements OnInit {

  postForm: FormGroup;
  error: string = '';
  isLoading = false;
  file: File;
  isImage = false;
  user: IUser;

  constructor(private postService: PostService, private userService: UsersService, public dialogRef: MatDialogRef<CreatePostModalComponent>) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'content': new FormControl(null, [Validators.required]),
      'image': new FormControl(null)
    })
    this.userService.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
  }

  createPost() {
    this.isLoading = true;
    let title = this.postForm.value.title;
    let content = this.postForm.value.content;
    
    const newPost: IPost = {
      post_title: title,
      post_content: content,
      image: this.file,
      created_data: new Date(),
      first_name: this.user.firstName,
      last_name: this.user.lastName
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

  onChange(event: any) {
    console.log(event.target.files[0]);
    if (
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg' || 
        event.target.files[0].type === 'image/jpeg'
        ) {
            this.file = event.target.files[0];
            this.isImage = true;
            this.error = "";
          }
    else {
      this.error = 'File must be an image';
      this.isImage = false;
    }
  }

  closeModal() {
    this.dialogRef.close('closed')
  }
}
