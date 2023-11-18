import {AuthService} from '../auth.service';

export class AuthServiceFixture implements Readonly<AuthService> {
  public signIn$: jest.Mock;
  public signup$: jest.Mock;

  constructor() {
    this.signIn$ = jest.fn();
    this.signup$ = jest.fn();
  }
}
