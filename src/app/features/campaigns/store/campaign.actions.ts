import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ApiError} from '@core/http';
import {createUiMessageActionMetadata} from '@store/app.state';
import {MessageType} from '@shared/modules/ui-messages';
import {AdGroup, Campaign, CampaignTypes} from '../campaigns.model';

export const CampaignActions = createActionGroup({
  source: 'Campaigns',
  events: {
    'Set Campaign Type': props<{campaignType: CampaignTypes}>(),
    'Set Campaign Details': props<{id: string; entity: Campaign}>(),
    'Set Ad Group': props<{id: string; entity: AdGroup}>(),
  },
});

export const CampaignApiActions = createActionGroup({
  source: 'Campaigns API',
  events: {
    'Load Campaigns': emptyProps(),
    'Campaigns Loaded': props<{campaigns: Campaign[]}>(),
    'Campaigns Load Error': (err: ApiError) => ({
      ...err,
      ...createUiMessageActionMetadata('Campaigns could not be loaded', err.message, MessageType.Error),
    }),
    'Create Campaign': props<{campaign: Campaign}>(),
    'Campaign Created': emptyProps(),
    'Campaign Creating Error': (err: ApiError) => ({
      ...err,
      ...createUiMessageActionMetadata('Error while creating campaign', err.message, MessageType.Error),
    }),
  },
});
