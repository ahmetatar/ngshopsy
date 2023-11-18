import {HttpBackend, HttpRequest} from '@angular/common/http';
import {Provider} from '@angular/core';
import {complationWithError, mockHttpBackendFactory, success} from '@core/http';
import {INVALID_RESPONSE, SIGNIN_URL, SUCCESS_RESPONSE} from './auth.mocks';

/**
 * Authentication request-response rules
 */
const RULES = [
  {
    condition: (req: HttpRequest<any>) =>
      req.url === SIGNIN_URL && req.body.email === 'testuser' && req.body.password === '12345',
    then: success(SUCCESS_RESPONSE),
  },
  {
    condition: (req: HttpRequest<any>) =>
      req.url === SIGNIN_URL && req.body.email !== 'testuser' && req.body.password !== '12345',
    then: complationWithError(INVALID_RESPONSE, 400),
  },
];

/**
 * Authentication mock HttpBackend
 */
export const AuthMockHttpBackend = mockHttpBackendFactory(RULES);

export const provideAuthTestingBackend = (): Provider[] => {
  return [AuthMockHttpBackend, {provide: HttpBackend, useExisting: AuthMockHttpBackend}];
};
