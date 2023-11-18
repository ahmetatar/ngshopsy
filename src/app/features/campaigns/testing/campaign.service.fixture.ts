import {CampaignService} from '../campaign.service';

export class CampaignServiceFixture implements Readonly<CampaignService> {
  public getCampaigns: jest.Mock;
  public saveCampaign: jest.Mock;

  constructor() {
    this.getCampaigns = jest.fn();
    this.saveCampaign = jest.fn();
  }
}
