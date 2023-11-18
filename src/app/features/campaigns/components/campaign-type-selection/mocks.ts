import {CampaignTypes} from '@features/campaigns/campaigns.model';
import {CardButton} from './sub-components/campaign-type';

const button: CardButton = {
  campaignType: CampaignTypes.Sponsored,
  text: 'Continue',
  url: '',
};

export const mockCampaignTypes = {
  campaignTypes: [
    {
      title: 'Sponsored Products',
      campaignType: CampaignTypes.Sponsored,
      text: 'Promote products to shoppers actively searching with related keywords or viewing similar products on NgShopsy',
      image: 'sponsored-products',
      button: {
        ...button,
        url: '/campaigns/sponsored/details',
      },
    },
    {
      title: 'Sponsored Brands',
      campaignType: CampaignTypes.Brands,
      text: 'Help shoppers discover your brand and products on NgShopsy with rich, engaging creatives',
      image: 'sponsored-brands',
      button: {
        ...button,
        url: '/campaigns/brands/details',
      },
    },
    {
      title: 'Sponsored Display',
      campaignType: CampaignTypes.Display,
      text: 'Grow your business by reaching relavent audiences on and off NgShopsy',
      image: 'sponsored-display',
      button: {
        ...button,
        url: '/campaigns/display/details',
      },
    },
  ],
};
