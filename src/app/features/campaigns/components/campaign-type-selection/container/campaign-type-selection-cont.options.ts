import {InjectionToken} from '@angular/core';
import {CampaignType} from '../sub-components/campaign-type/campaign-type.model';

export interface CampaignTypeSelectionOptions {
  /**
   * Determines whether the message component is closed by the user
   */
  campaignTypes: CampaignType[];
}

export const CAMPAIGN_TYPES_OPTIONS = new InjectionToken<CampaignTypeSelectionOptions>('Default campaign type options');
