import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.state';
import {dateUtils} from '@core/utils';

/**
 * Feature selector to select auth store object
 */
export const selectAuth = createFeatureSelector<AuthState>('auth');

/**
 * Get authentication state of auth.
 */
export const isAuthenticated = createSelector(
  selectAuth,
  (auth) => !!auth && dateUtils.now() - auth.issued! < parseInt(auth.expiresIn!),
);

/**
 * Gets auth token
 */
export const selectToken = createSelector(selectAuth, (auth) => auth.idToken);

/**
 * Gets user informations from auth state
 */
export const selectUser = createSelector(
  selectAuth, 
  isAuthenticated, 
  (auth, isAuthenticated) => ({ email: auth.email, isAuthenticated}));