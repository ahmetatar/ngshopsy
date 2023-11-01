import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {mergeMap, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState, selectToken} from './store';

const EXCLUDED_REQ_URLS = ['signUp', 'signInWithPassword'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store<AuthState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(select(selectToken)).pipe(
      mergeMap((token) => {
        if (!EXCLUDED_REQ_URLS.find((url) => request.url.includes(url)) && !!token) {
          request = request.clone({setParams: {auth: token}});
        }
        return next.handle(request);
      }),
    );
  }
}
