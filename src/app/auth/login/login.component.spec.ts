
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockProvider, MockService } from 'ng-mocks';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

const mockResponse = {
    "message": "login success",
    "token": "dgasjkhhdkjsahdjkashdkjhaskjdhaskjdhaskjdhakj"
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthServiceService;
    let userService: UsersService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [LoginComponent],
            providers: [AuthServiceService]
        }).compileComponents();
        authService = TestBed.inject(AuthServiceService);
        userService = TestBed.inject(UsersService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(LoginComponent);
        fixture.detectChanges();
        
    });

    afterEach(() => {
        httpTestingController.verify();
    })

    it('Should create login component', () => {
        
        component = fixture.componentInstance;
        expect(component).toBeTruthy();
    })

    it('should create User Service', () => {
        expect(authService).toBeTruthy()
    })

    it('Should log out user', () => {
        authService.logOut();
        let result = userService.user.value;
        expect(result).toBeNull();
    })
})