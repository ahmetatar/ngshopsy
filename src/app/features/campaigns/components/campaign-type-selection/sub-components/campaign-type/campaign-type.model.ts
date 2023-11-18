import {CampaignTypes} from '@features/campaigns';

/**
 * CampaignType type defination
 */
export interface CampaignType {
  /** Card title */
  title: string;

  /** Card text */
  text: string;

  /** Card image */
  image: string;

  /** Card navigation button */
  button: CardButton;
}

/**
 * Card button details
 */
export interface CardButton {
  /** Campaign type key */
  campaignType: CampaignTypes;

  /** Button text */
  text: string;

  /** Navigation url */
  url: string;
}
