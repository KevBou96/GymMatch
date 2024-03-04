import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreatePostModalComponent } from './create-post-modal.component';
import { SocketService } from '../../services/socket.service';

describe('CreatePostModalComponent', () => {
  let component: CreatePostModalComponent;
  let fixture: ComponentFixture<CreatePostModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SocketService],
      declarations: [CreatePostModalComponent]
    });
   

  });

  it('test', () => {
    expect(1).toBe(1);
  });
});
