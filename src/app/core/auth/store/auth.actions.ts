import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {SignInRequest, SignInResult} from '../auth.contracts';
import {ApiError} from '@core/http';
import {createUiMessageActionMetadata} from '@store/app.state';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    SignIn: props<SignInRequest>(),
    'SignIn Success': props<{result: SignInResult}>(),
    'SignIn Failure': (err: ApiError) => ({
      ...err,
      ...createUiMessageActionMetadata('Authentication failed', err.message, 'danger'),
    }),
    SignOut: emptyProps(),
  },
});
