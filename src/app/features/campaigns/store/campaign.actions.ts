import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {ApiError} from '@core/http';
import {createUiMessageActionMetadata} from '@store/app.state';
import {MessageType} from '@shared/modules/ui-messages';
import {Campaign, CampaignTypes} from '../campaigns.model';

export const CampaignActions = createActionGroup({
  source: 'Campaigns',
  events: {
    'Set Campaign Type': props<{id?: string; campaignType: CampaignTypes}>(),
    'Set Campaign Details': props<{campaign: Campaign}>(),
    'Set Ad Group': props<{campaign: Campaign}>(),
    'Set Keywords': props<{campaign: Campaign}>(),
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
    'Create Campaign': emptyProps(),
    'Campaign Created': props<{id: string}>(),
    'Campaign Creating Error': (err: ApiError) => ({
      ...err,
      ...createUiMessageActionMetadata('Error while creating campaign', err.message, MessageType.Error),
    }),
  },
});
