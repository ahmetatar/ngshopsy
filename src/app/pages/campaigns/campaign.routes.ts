import {Routes} from '@angular/router';
import {authGuardFn} from '@core/auth';
import {campaignFeature, campaignInitialDataResolver} from '@features/campaigns';
import {CampaignEffects} from '@features/campaigns/store/campaign.effects';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';

export const CAMPAING_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../features/campaigns/campaigns-feature.routes').then((x) => x.CAMPAING_FEATURE_ROUTES),
    canActivate: [authGuardFn],
    providers: [provideState(campaignFeature), provideEffects([CampaignEffects])],
    resolve: {
      data: campaignInitialDataResolver,
    },
  },
];
