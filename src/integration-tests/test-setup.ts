import {AppEffects} from '@store/app.effects';
import {appReducers} from '@store/app.reducer';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {authInterceptorFn} from '@core/auth/auth.interceptor';
import {provideRouterStore} from '@ngrx/router-store';
import {APP_ROUTES} from 'src/app/app.routes';
import {provideRouter} from '@angular/router';
import {AuthEffects} from '@core/auth';
import {ProductEffects} from '@shared/modules/product';
import {provideSvgImage} from '@core/svg-utils';
import {metaReducers} from '@store/app.meta-reducers';

export const DEFAULT_TEST_PROVIDERS = [
  provideHttpClient(withInterceptors([authInterceptorFn])),
  provideStore(appReducers, {metaReducers}),
  provideEffects([AppEffects, AuthEffects, ProductEffects]),
  provideRouterStore(),
  provideRouter(APP_ROUTES),
  provideSvgImage({
    path: '../assets/images.json',
  }),
];
