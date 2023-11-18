import {Product} from '@shared/modules/product';

export enum CampaignTypes {
  Sponsored = 'sponsored',
  Brands = 'brands',
  Display = 'display',
}

export enum MatchType {
  Broad,
  Phrase,
  Exact,
}

/**
 * Keyword entity
 */
export interface Keyword {
  keyword: string;
  bid: number;
  suggestedBid?: number;
  matchType: MatchType;
}

/**
 * AdGroup entity
 */
export interface AdGroup {
  name: string;
  products: number[];
  keywords: Keyword[];
}

/**
 * Aggregate root for Campaign
 */
export class Campaign {
  id?: string;
  name: string = '';
  budget: number = 1;
  startDate: string = '';
  endDate?: string;
  indefiniteCampaign?: boolean;
  archived?: boolean;
  campaignType: CampaignTypes = CampaignTypes.Sponsored;
  adGroups?: AdGroup[];
  status: 'dirty' | 'none' = 'dirty';

  constructor(init?: Partial<Campaign>) {
    Object.assign(this, init);
  }
}
