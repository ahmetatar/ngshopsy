import {select} from '@ngrx/store';
import {filter, pipe, take} from 'rxjs';
import {selectUpdatingCampaignId} from './campaign.selectors';

/**
 * Pipeable operator to select updating campaign id
 */
export const selectActiveCampaignId = pipe(
  select(selectUpdatingCampaignId),
  filter((id): id is string => !!id),
  take(1),
);
