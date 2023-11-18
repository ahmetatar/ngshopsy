import {createReducer, on} from '@ngrx/store';
import {AuthState} from './auth.state';
import {AuthActions} from './auth.actions';
import {dateUtils} from '@core/utils';

export const authFeatureKey = 'auth';
export const initialAuthState: AuthState = {};

/**
 * Authentication reducer
 */
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.signInSuccess, (state, {result}) => {
    const {registered, refreshToken, ...rest} = result;
    return {...state, ...rest, issued: dateUtils.now(), messageMetadata: {}};
  }),
  on(AuthActions.signOut, () => {
    return {};
  }),
  on(AuthActions.signInFailure, (state, action) => ({...state, ...action})),
);
