export enum CampaignTypes {
  Sponsored = 'sponsored',
  Brands = 'brands',
  Display = 'display',
}

export enum MatchType {
  Broad = 1,
  Phrase = 2,
  Exact = 3,
}

/**
 * Keyword entity
 */
export interface Keyword {
  keyword: string | null;
  bid: number | null;
  suggestedBid?: number;
  matchType: MatchType | null;
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
  status: 'dirty' | 'none' | undefined = 'dirty';

  constructor(init?: Partial<Campaign>) {
    Object.assign(this, init);
  }
}
