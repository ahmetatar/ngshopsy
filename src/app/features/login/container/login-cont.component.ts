import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPresComponent} from '../presenter/login-pres.component';
import {LoginInfo} from '../contracts/login.contracts';
import {Store} from '@ngrx/store';
import {AuthActions, AuthState} from '@core/auth';

@Component({
  selector: 'ngs-login-cont',
  standalone: true,
  imports: [CommonModule, LoginPresComponent],
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
