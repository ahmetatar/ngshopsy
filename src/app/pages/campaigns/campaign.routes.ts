import {Routes} from '@angular/router';
import {campaignFeature, campaignInitialDataResolver} from '@features/campaigns';
import {CampaignEffects} from '@features/campaigns/store/campaign.effects';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';

export const CAMPAING_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../features/campaigns/campaigns-feature.routes').then((x) => x.CAMPAING_FEATURE_ROUTES),
    providers: [
      provideState(campaignFeature), 
      provideEffects([CampaignEffects])
    ],
    resolve: {
      data: campaignInitialDataResolver
    }
  },
];
