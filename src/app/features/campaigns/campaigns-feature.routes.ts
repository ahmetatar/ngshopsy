import {Routes} from '@angular/router';
import {CampaignListContComponent} from './components/campaign-list';
import {
  CampaignAdGroupContComponent,
  CampaignDetailsContComponent,
  CampaignTypeSelectionContComponent,
} from './components';
import {CampaignKeywordContComponent} from './components/campaign-keywords';

export const CAMPAING_FEATURE_ROUTES: Routes = [
  {path: '', component: CampaignListContComponent},
  {path: 'create', component: CampaignTypeSelectionContComponent},
  {path: 'details', component: CampaignDetailsContComponent},
  {path: 'ad-group', component: CampaignAdGroupContComponent},
  {path: 'keywords', component: CampaignKeywordContComponent},
];
