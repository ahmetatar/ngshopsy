import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {LoginPresComponent} from '../presenter/login-pres.component';
import {LoginInfo} from '../contracts';
import {Store} from '@ngrx/store';
import {AuthActions, AuthState} from '@core/auth';

@Component({
  selector: 'ngs-login-cont',
  standalone: true,
  imports: [LoginPresComponent],
  template: `<ngs-login-pres (loginSubmitted)="onLoginSubmitted($event)" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContComponent {
  private store = inject(Store<AuthState>);

  /**
   * Event for login request
   *
   * @param login login info
   */
  onLoginSubmitted(login: LoginInfo) {
    const {email, password} = login;
    this.store.dispatch(AuthActions.signIn({email, password, returnSecureToken: true}));
  }
}
