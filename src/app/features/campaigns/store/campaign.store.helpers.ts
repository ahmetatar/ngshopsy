import {select} from '@ngrx/store';
import {filter, pipe, take} from 'rxjs';
import {selectEditingCampaign} from './campaign.selectors';
import {Campaign} from '../campaigns.model';

/**
 * Pipeable operator to select updating campaign
 */
export const selectActiveCampaign = pipe(
  select(selectEditingCampaign),
  filter((campaign): campaign is Campaign => !!campaign),
  take(1),
);
