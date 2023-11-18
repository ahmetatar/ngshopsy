import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {APP_ROUTES} from './app/app.routes';
import {provideStore} from '@ngrx/store';
import {appReducers} from './app/store/app.reducer';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import {isDevMode} from '@angular/core';
import {provideSvgImage} from '@core/svg-utils';
import {authInterceptorFn} from '@core/auth/auth.interceptor';
import {AppEffects} from '@store/app.effects';
import {AuthEffects} from '@core/auth';
import {DefaultLayoutComponent} from '@layouts/default-layout';
import {ProductEffects} from '@shared/modules/product';
import {loggingInterceptorFn} from '@core/logging';
import {metaReducers} from '@store/app.meta-reducers';

bootstrapApplication(DefaultLayoutComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptorFn, loggingInterceptorFn])),
    provideStore(appReducers, {metaReducers}),
    provideEffects(AppEffects, AuthEffects, ProductEffects),
    provideRouterStore(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideRouter(APP_ROUTES),
    provideSvgImage({
      path: '/assets/images.json',
    }),
  ],
}).catch((err) => console.log(err));
