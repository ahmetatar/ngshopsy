import {Route} from '@angular/router';
import {authGuardFn} from '@core/auth';
import {CampaignService} from '@features/campaigns';
import {campaignFeature, CampaignEffects} from '@features/campaigns/store';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campaigns',
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./pages/campaigns/campaign.routes').then(({CAMPAING_ROUTES}) => CAMPAING_ROUTES),
    canActivate: [authGuardFn],
    providers: [
      CampaignService, 
      provideState(campaignFeature), 
      provideEffects([CampaignEffects])
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(({LoginComponent}) => LoginComponent),
  },
];
