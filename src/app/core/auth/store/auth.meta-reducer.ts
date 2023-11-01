import {Action, ActionReducer} from '@ngrx/store';
import {AuthActions} from './auth.actions';
import {AuthState} from './auth.state';
import {authFeatureKey} from './auth.reducer';
import {syncState} from '../../store/sync-adapter';

const ALLOWED_ACTIONS = [AuthActions.signInSuccess, AuthActions.signInFailure, AuthActions.signOut];

/**
 * Sync auth state with session storage
 *
 * @param reducer executing reducer
 * @returns next state
 */
export function authSyncReducer(reducer: ActionReducer<AuthState, Action>) {
  return (state: AuthState, action: Action) => {
    const nextState = reducer(state, action);
    return syncState(authFeatureKey, nextState, action, ALLOWED_ACTIONS);
  };
}
