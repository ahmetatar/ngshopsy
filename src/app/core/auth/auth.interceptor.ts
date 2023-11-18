import {HttpRequest, HttpHandlerFn} from '@angular/common/http';
import {mergeMap, take} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState, selectToken} from './store';
import {inject} from '@angular/core';

const EXCLUDED_REQ_URLS = ['signUp', 'signInWithPassword', 'images.json'];

/**
 * Authentication interceptor for every outcoming request.
 * It will be set token as a query parameter
 *
 * @param req current request
 * @param next handler
 * @returns http event
 */
export const authInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const store = inject(Store<AuthState>);
  return store.pipe(
    select(selectToken),
    take(1),
    mergeMap((token) => {
      if (!EXCLUDED_REQ_URLS.find((url) => req.url.includes(url)) && !!token) {
        req = req.clone({setParams: {auth: token}});
      }
      return next(req);
    }),
  );
};
