import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './posts/post/post.component';
import { CreatePostModalComponent } from './modal/create-post-modal/create-post-modal.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { MainComponent } from './user/main/main.component';

import { ReactiveFormsModule } from '@angular/forms';

// socket io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// angular material imports 
import { MatDialogModule} from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { EditProfileComponent } from './modal/edit-profile/edit-profile.component';
import { SocketService } from './services/socket.service';




const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    PostComponent,
    CreatePostModalComponent,
    LoadingSpinnerComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ProfileComponent,
    SettingsComponent,
    MainComponent,
    SearchBarComponent,
    FilterPipe,
    EditProfileComponent,
  ],
  imports: [
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    CommonModule,
    NgbCarousel,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
