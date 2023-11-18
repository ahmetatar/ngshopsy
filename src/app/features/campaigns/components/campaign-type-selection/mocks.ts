import {CampaignTypes} from '@features/campaigns/campaigns.model';
import {CardButton} from './sub-components/campaign-type';

const button: CardButton = {
  campaignType: CampaignTypes.Sponsored,
  text: 'Select',
  url: '../details',
};

export const mockCampaignTypes = {
  campaignTypes: [
    {
      title: 'Sponsored Products',
      text: 'Promote products to shoppers actively searching with related keywords or viewing similar products on NgShopsy',
      image: 'sponsored-products',
      button: {
        ...button,
      },
    },
    {
      title: 'Sponsored Brands',
      text: 'Help shoppers discover your brand and products on NgShopsy with rich, engaging creatives',
      image: 'sponsored-brands',
      button: {
        ...button,
        campaignType: CampaignTypes.Brands,
      },
    },
    {
      title: 'Sponsored Display',
      text: 'Grow your business by reaching relavent audiences on and off NgShopsy',
      image: 'sponsored-display',
      button: {
        ...button,
        campaignType: CampaignTypes.Display,
      },
    },
  ],
};
