import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, of, tap} from 'rxjs';
import {AuthActions} from './auth.actions';
import {UiMessagesService} from '@shared/modules/ui-messages';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class AuthEffects {
  /**
   * Initiates a firebase authentication process for the signin action.
   */
  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap((payload) =>
        this.authService.signIn$(payload).pipe(
          map((signInResult) => AuthActions.signInSuccess({result: signInResult})),
          tap(() => {
            //this.messageService.clearMessages();
            //this.router.navigateByUrl('/campaigns');
          }),
          catchError((response: HttpErrorResponse) => of(AuthActions.signInFailure(response.error.error))),
        ),
      ),
    );
  });

  signout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() => this.router.navigateByUrl('/login')),
      ),
    {dispatch: false},
  );

  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly messageService: UiMessagesService,
    private readonly authService: AuthService,
  ) {}
}
