import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PostComponent } from './posts/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { changePasswordGuardGuard } from './auth/change-password-guard.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'posts', component: PostComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'change-password/:token', component: ChangePasswordComponent, canActivate: [changePasswordGuardGuard]}  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
