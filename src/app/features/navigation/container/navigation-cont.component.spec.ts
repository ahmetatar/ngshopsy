import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationContComponent} from './navigation-cont.component';
import {AuthService, isAuthenticated, selectAuth} from '@core/auth';
import {MockStore} from '@ngrx/store/testing';

describe('NavigatorContComponent', () => {
  let component: NavigationContComponent;
  let fixture: ComponentFixture<NavigationContComponent>;

  const mockRouter = {
    navigate: jest.fn(),
  };

  const mockAuthService = {
    signin$: jest.fn(),
    signout: jest.fn(),
  };

  beforeEach(async () => {
    TestBed.overrideComponent(NavigationContComponent, {
      add: {
        providers: [{provide: AuthService, useValue: mockAuthService}],
      },
    });

    fixture = TestBed.createComponent(NavigationContComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectAuth, {email: 'test@test.com'});
    mockStore.overrideSelector(isAuthenticated, true);
  });

  it('should create navigation model if user is authenticated', (done) => {
    fixture.detectChanges();
    component.navigationModel$.subscribe((model) => {
      expect(model).toBeTruthy();
      expect(model.email).toBe('test@test.com');
      expect(model.isAuthenticated).toBe(true);
      done();
    });
  });

  it('should call navigate with logout route and signout user', () => {
    component.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
    expect(mockAuthService.signout).toHaveBeenCalled();
  });
});
