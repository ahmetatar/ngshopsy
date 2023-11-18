import {createEntityAdapter} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';
import {CampaignActions, CampaignApiActions} from './campaign.actions';
import {prepareAsEntity} from '@core/store';
import {createUiMessageActionMetadata} from '@store/app.state';
import {MessageType} from '@shared/modules/ui-messages';
import {Campaign} from '../campaigns.model';

/** Gets campaign entity adapter */
export const campaignStateAdapter = createEntityAdapter<Campaign>();

/** Campaign select id function */
export const selectId = (campaign: Campaign) => campaign.id || '';

/** Gets initial state for campaigns */
export const campaignInitialState = campaignStateAdapter.getInitialState({
  selectId,
});

/** Default campaign selectors */
export const {
  selectAll: selectAllCampaigns,
  selectEntities: selectCampaignEntities,
  selectIds: selectCampaignsIds,
  selectTotal: selectTotalCampaign,
} = campaignStateAdapter.getSelectors();

export const campaignFeature = createFeature({
  name: 'campaigns',
  reducer: createReducer(
    campaignInitialState,
    on(CampaignActions.setAdGroup, CampaignActions.setKeywords, CampaignActions.setCampaignDetails, (state, action) => {
      return campaignStateAdapter.updateOne({id: action.campaign.id!, changes: action.campaign}, state);
    }),
    on(CampaignActions.setCampaignType, (state, action) => {
      return campaignStateAdapter.upsertOne(
        prepareAsEntity('cm', new Campaign({id: action.id, campaignType: action.campaignType})),
        state,
      );
    }),
    on(CampaignApiActions.campaignCreated, (state, action) => {
      return campaignStateAdapter.updateOne(
        {
          id: action.id,
          changes: {
            status: 'none',
          },
        },
        state,
      );
    }),
    on(CampaignApiActions.campaignsLoaded, (state, action) => {
      return campaignStateAdapter.upsertMany(action.campaigns, state);
    }),
    on(CampaignApiActions.campaignsLoadError, (state, action) => ({
      ...state,
      ...createUiMessageActionMetadata('Campaign not loaded', action.message, MessageType.Error),
    })),
    on(CampaignApiActions.campaignCreatingError, (state, action) => ({
      ...state,
      ...createUiMessageActionMetadata('Campaign creation failed', action.message, MessageType.Error),
    })),
  ),
});
