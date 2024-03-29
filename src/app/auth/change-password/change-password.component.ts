import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  error: string;
  passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
  token: string; 
  spinner = false;
  clicked = false;
  successMessage: string;

  constructor (
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
    this.route.params.subscribe((params: Params) => {
      this.token = params.token
      
    })
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.error = 'Missing Form Values';
      return
    }
    this.spinner = true;
    this.clicked = true;
    const password = this.resetPasswordForm.value.password;
    this.authService.postResetPassword(password, this.token).subscribe({
      next: res => {
        this.error = '';
        this.spinner = false;
        this.successMessage = "Your password has been reset, please login with you new password!"
        console.log(res);
      },
      error: err => {
        this.clicked = false;
        this.spinner = false;
        this.error = err.error.message;
        console.log(err);
      }
    })
  }
}
