import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
  error: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      termsAndCon: new FormControl (null, [Validators.requiredTrue])
    });
  }


  createUser() {
    if (this.signUpForm.invalid) {
      this.error = 'Missing form fields';
      return
    }
    console.log(this.signUpForm.get('termsAndCon'));
    const firstName = this.signUpForm.value.firstName;
    const lastName = this.signUpForm.value.lastName;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password
    let user: IUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }
    this.authService.signUpUser(user).subscribe({
      next: res => {
        console.log(res);
        this.router.navigate(['login']).then(() => {
          console.log('sent to login');
        }) 
      },
      error: err => {
        console.log(err);
        
        this.error = err.error.message
      }
    })
    console.log(user);
  }

}
