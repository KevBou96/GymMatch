import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  error: string;
  spinner = false;
  clicked = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.error = 'Missing form values';
      return
    }
    this.spinner = true;
    this.clicked = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.loginUser(email, password).subscribe({
      next: res => {
        const token = res.token;
        localStorage.setItem('auth-token', token);
        console.log(res);
        this.spinner = false;
        this.router.navigate(['posts'])
      },
      error: err => {
        this.error = err.error.message
        this.clicked = false;
        this.spinner = false;
      }
    })
  }
}
