import {Routes} from '@angular/router';
import {CampaignListContComponent} from './components/campaign-list';

export const CAMPAING_FEATURE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campaign-list',
  },
  {
    path: 'campaign-list',
    component: CampaignListContComponent,
  },
];
