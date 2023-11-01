import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, of, tap} from 'rxjs';
import {AuthActions} from './auth.actions';
import {MessageType, UiMessagesService} from '@shared/components/ui-messages';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {SignInFailureResult} from '../auth.contracts';

@Injectable()
export class AuthEffects {
  /**
   * Initiates a firebase authentication process for the signin action.
   * When the request is successful, the loginSuccess action is dispatched.
   * This will be handled by the signInSuccess effect. If the request is not successful,
   * the signInFailure action is dispatched to update the UI error message.
   */
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap((payload) =>
        this.authService.signIn$(payload).pipe(
          map((signInResult) => AuthActions.signInSuccess({result: signInResult})),
          catchError((err: SignInFailureResult) => of(AuthActions.signInFailure({result: err}))),
        ),
      ),
    ),
  );

  /**
   * If the login process is fail, this action is dispatched and it pushes
   * error message
   */
  signInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInFailure),
        map((failure) => failure.result.message),
        tap((err) => {
          this.messageService.pushMessage('Authentication failed', err, MessageType.Error);
        }),
      ),
    {dispatch: false},
  );

  /**
   * If the login process is successful, this action is dispatched,
   * resulting in a redirect to the product page.
   */
  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => {
          this.messageService.clearMessages();
          this.router.navigateByUrl('/products');
        }),
      ),
    {dispatch: false},
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private messageService: UiMessagesService,
    private authService: AuthService,
  ) {}
}
