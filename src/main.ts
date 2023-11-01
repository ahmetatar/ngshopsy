import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {appRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {provideStore} from '@ngrx/store';
import {appReducers} from './app/store/app.reducer';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import {isDevMode} from '@angular/core';
import {provideSvgImage} from '@core/svg-utils';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects([]),
    provideRouterStore(),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
    ),
    provideSvgImage({
      path: 'assets/images.json',
    }),
  ],
}).catch((err) => console.error(err));
