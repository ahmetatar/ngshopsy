import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {AuthState, isAuthenticated} from './store';
import {map, take} from 'rxjs';

/**
 * Returns whether the user is verified or not
 *
 * @returns if user authenticated true, otherwise false
 */
export const authGuardFn = () => {
  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.pipe(
    select(isAuthenticated),
    take(1),
    map((isAuth) => (!isAuth ? router.createUrlTree(['/login']) : true)),
  );
};
