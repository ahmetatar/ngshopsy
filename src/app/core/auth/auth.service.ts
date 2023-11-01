import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {APP_CONFIG} from 'src/app/app.config';
import {AuthActions, AuthState} from './store';
import {selectAuth, isAuthenticated} from './store/auth.selectors';
import {SignInRequest, SignInResult} from './auth.contracts';

export type AuthOps = 'signUp' | 'signInWithPassword';

@Injectable()
export class AuthService {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly httpClient = inject(HttpClient);
  private readonly store = inject(Store<AuthState>);

  /**
   * Gets logged in user
   */
  public get user$() {
    return this.store.pipe(select(selectAuth));
  }

  /**
   * Gets whether the user is authenticated
   */
  public get isAuthenticated$() {
    return this.store.pipe(select(isAuthenticated));
  }

  /**
   * Sends authentication request to firebase auth rest api.
   *
   * @param signInReq user login informations
   */
  public signIn$(signInReq: SignInRequest) {
    return this.sendAuthenticationRequest$(signInReq, 'signInWithPassword');
  }

  /**
   * Sends signup request to firebase auth rest api
   *
   * @param signInReq user register informations
   */
  public signup$(signInReq: SignInRequest) {
    return this.sendAuthenticationRequest$(signInReq, 'signUp');
  }

  /**
   * Sends signout reguest
   */
  public signout() {
    this.store.dispatch(AuthActions.signOut());
  }

  /**
   * Sends signin or signup request to firebase rest api
   *
   * @param signInReq user login informations
   * @param ops operation type
   * @returns response
   */
  private sendAuthenticationRequest$(signInReq: SignInRequest, ops: AuthOps) {
    return this.httpClient.post<SignInResult>(
      `${this.appConfig.authBaseUrl}:${ops}`,
      {...signInReq, returnSecureToken: true},
      {params: this.getRequestParams()},
    );
  }

  /**
   * Initializes common request params
   *
   * @returns HttpParams
   */
  private getRequestParams() {
    return new HttpParams().set('key', this.appConfig.firebaseApiKey);
  }
}
