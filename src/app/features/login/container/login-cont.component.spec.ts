import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {LoginContComponent} from './login-cont.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthActions} from '@core/auth';
import {MockLoginPresComponent} from '../presenter/login-pres.component.mock';
import {LoginPresComponent} from '../presenter/login-pres.component';

describe('LoginContComponent', () => {
  let component: LoginContComponent;
  let fixture: ComponentFixture<LoginContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginContComponent],
      providers: [provideMockStore()],
    })
      .overrideComponent(LoginContComponent, {
        remove: {imports: [LoginPresComponent]},
        add: {imports: [MockLoginPresComponent]},
      })
      .compileComponents();

    fixture = TestBed.createComponent(LoginContComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch signin action when login requested', inject([MockStore], (store: MockStore) => {
    const loginData = {
      email: 'ahmetatar@gmail.com',
      password: '12345',
      isRemember: false,
    };
    store.dispatch = jest.fn();
    component.onLoginSubmitted(loginData);

    const {email, password} = loginData;
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signIn({email, password, returnSecureToken: true}));
  }));
});
