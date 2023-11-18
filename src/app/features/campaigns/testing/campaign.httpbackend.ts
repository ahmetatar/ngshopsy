import {HttpBackend} from '@angular/common/http';
import {Provider} from '@angular/core';
import {Rules, mockHttpBackendFactory} from '@core/http';

const RULES: Rules = [];

export const CampaignMockHttpBackend = mockHttpBackendFactory(RULES);
export const provideCampaignTestingBackend = (): Provider[] => {
  return [CampaignMockHttpBackend, {provide: HttpBackend, useExisting: CampaignMockHttpBackend}];
};
