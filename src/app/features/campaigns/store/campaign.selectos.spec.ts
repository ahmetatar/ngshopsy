import {Campaign} from '../campaigns.model';
import {selectEditingCampaign} from './campaign.selectors';

describe('Campaign selectors tests', () => {
  it('should work', () => {
    const campaigns = [
      {name: 'Test campaign 1', status: 'dirty'},
      {name: 'Test campaign 2', status: 'none'},
    ];

    const result = selectEditingCampaign.projector(campaigns as Campaign[]);
    expect(result?.name).toBe('Test campaign 1');
  });
});
