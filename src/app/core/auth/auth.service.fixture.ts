import {ReplaySubject} from 'rxjs';
import {AuthService} from './auth.service';
import {AuthState} from './store';

export class AuthServiceFixture implements Readonly<AuthService> {
  public user$: ReplaySubject<AuthState>;
  public isAuthenticated$: ReplaySubject<boolean>;
  public signIn$: jest.Mock;
  public signup$: jest.Mock;
  public signout: jest.Mock;

  constructor() {
    this.user$ = new ReplaySubject();
    this.isAuthenticated$ = new ReplaySubject();
    this.signIn$ = jest.fn();
    this.signup$ = jest.fn();
    this.signout = jest.fn();
  }
}
