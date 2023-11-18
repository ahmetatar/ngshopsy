import {HttpRequest} from '@angular/common/http';
import {AuthMockHttpBackend} from '@core/auth/testing';
import {
  Rules,
  complationWithError,
  mockHttpBackendFactory,
  provideComposedTestingBackend,
  success,
  withBackends,
} from '@core/http';

const CAMPAIGN_RULES: Rules = [
  {
    condition: (req: HttpRequest<any>) => req.urlWithParams.includes('auth=FAKE-TOKEN'),
    then: success([
      {id: 1, name: 'Campaign 1'},
      {id: 2, name: 'Campaign 2'},
    ]),
  },
  {
    condition: (req: HttpRequest<any>) => !req.urlWithParams.includes('auth=FAKE-TOKEN'),
    then: complationWithError('unauthorized'),
  },
];

export const TEST_BACKEND_PROVIDERS = provideComposedTestingBackend(
  withBackends(AuthMockHttpBackend, mockHttpBackendFactory(CAMPAIGN_RULES)),
);
