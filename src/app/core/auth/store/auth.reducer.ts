import {createReducer, on} from '@ngrx/store';
import {AuthState} from './auth.state';
import {AuthActions} from './auth.actions';

export const authFeatureKey = 'auth';
export const initialAuthState: AuthState = {};

/**
 * Authentication reducer
 */
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.signInSuccess, (state, action) => ({...state, ...action.result})),
  on(AuthActions.signOut, AuthActions.signInFailure, () => ({})),
);
