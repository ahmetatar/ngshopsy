import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CampaignState} from './campaign.state';
import {selectAllCampaigns} from './campaign.reducer';

/**
 * Feature selector to select auth store object
 */
export const selectCampaignState = createFeatureSelector<CampaignState>('campaigns');

/**
 * Selector factory to create selector to select campaign by given id.
 * @note A new instance of the selector is created each time Factory is called.
 * This means we give up the benefit of memoization. If the selector is expensive, use it to add a memoization layer:
 * https://www.npmjs.com/package/lodash.memoize
 *
 * @param id campaign id
 * @returns campaign
 */
export const selectCampaign = (id: string) => createSelector(selectCampaignState, (state) => state.entities[id]);

/** Selects all campaigns */
export const selectCampaigns = createSelector(selectCampaignState, selectAllCampaigns);

/** Selects editing campaign */
export const selectEditingCampaign = createSelector(selectCampaigns, (campaigns) =>
  campaigns.find((campaign) => campaign.status === 'dirty'),
);