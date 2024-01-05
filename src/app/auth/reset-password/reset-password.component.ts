import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    
  emailForm: FormGroup;
  error: string;
  successMessage: string;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  resetPassword() {
    if (this.emailForm.invalid) {
      this.error = 'Missing form values';
      return
    }
    const email = this.emailForm.value.email;
    this.authService.forgotPassword(email).subscribe({
      next: res => {
        console.log(res);
        if (res) {
          this.successMessage = 'A reset password email has been sent to ' + email + ', please follow the email steps. (Link will expire in 1 hour)'
        }
      },
      error: err => {
        console.log(err);
        this.error = err.error.message;
      }
    })
  }
}

