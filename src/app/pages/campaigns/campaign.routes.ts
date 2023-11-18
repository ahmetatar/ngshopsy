import {Routes} from '@angular/router';
import {authGuardFn} from '@core/auth';
import {campaignInitialDataResolver} from '@features/campaigns';

export const CAMPAING_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../features/campaigns/campaigns-feature.routes').then((x) => x.CAMPAING_FEATURE_ROUTES),
    canActivate: [authGuardFn],
    resolve: {
      data: campaignInitialDataResolver,
    },
  },
];
