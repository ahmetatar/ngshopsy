import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {AuthService} from './auth.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {defaultAppConfig} from 'src/app/app.config';
import {mockSignInReq, mockSignInResult} from './auth.mocks';

describe('AuthService tests', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService, provideMockStore(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be send signIn request to firebase auth api', () => {
    const expectedUrl = `${defaultAppConfig.authBaseUrl}:signInWithPassword?key=${defaultAppConfig.firebaseApiKey}`;

    service.signIn$(mockSignInReq).subscribe((result) => {
      expect(result).toEqual(mockSignInResult);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockSignInResult);
  });

  it('should be send signUp request to firebase auth api', () => {
    const expectedUrl = `${defaultAppConfig.authBaseUrl}:signUp?key=${defaultAppConfig.firebaseApiKey}`;

    service.signup$(mockSignInReq).subscribe((result) => {
      expect(result).toEqual(mockSignInResult);
    });

    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockSignInResult);
  });
});
