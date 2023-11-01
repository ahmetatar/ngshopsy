import {InjectionToken} from '@angular/core';
import {CampaignType, CardButton} from '../sub-components/campaign-type/campaign-type.contracts';

export interface CampaignTypeSelectionOptions {
  /**
   * Determines whether the message component is closed by the user
   */
  campaignTypes: CampaignType[];
}

const button: CardButton = {
  text: 'Continue',
  url: '',
};

export const DEFAULT_CAMPAIGN_TYPES_OPTIONS: CampaignTypeSelectionOptions = {
  campaignTypes: [
    {
      title: 'Sponsored Products',
      text: 'Promote products to shoppers actively searching with related keywords or viewing similar products on NgShopsy',
      image: 'sponsored-products',
      button,
    },
    {
      title: 'Sponsored Brands',
      text: 'Help shoppers discover your brand and products on NgShopsy with rich, engaging creatives',
      image: 'sponsored-brands',
      button,
    },
    {
      title: 'Sponsored Display',
      text: 'Grow your business by reaching relavent audiences on and off NgShopsy',
      image: 'sponsored-display',
      button,
    },
  ],
};

export const CAMPAIGN_TYPES_OPTIONS = new InjectionToken<CampaignTypeSelectionOptions>('Default campaign type options');
