import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.state';

/**
 * Feature selector to select auth store object
 */
export const selectAuth = createFeatureSelector<AuthState>('auth');

/**
 * Get authentication state of auth.
 */
export const isAuthenticated = createSelector(selectAuth, (auth) => !!auth && !!auth.localId); // TODO calculate expiration

/**
 * Gets auth token
 */
export const selectToken = createSelector(selectAuth, (auth) => auth.idToken);
