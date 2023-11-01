import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {SignInFailureResult, SignInRequest, SignInResult} from '../auth.contracts';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    SignIn: props<SignInRequest>(),
    'SignIn Success': props<{result: SignInResult}>(),
    'SignIn Failure': props<{result: SignInFailureResult}>(),
    SignOut: emptyProps(),
  },
});
