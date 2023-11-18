import {defaultAppConfig} from 'src/app/app.config';
import {SignInRequest, SignInResult} from '../auth.contracts';

export const mockSignInReq: SignInRequest = {
  email: 'a@a.com',
  password: '1234',
  returnSecureToken: false,
};

export const mockSignInResult: SignInResult = {
  email: 'a@a.com',
  expiresIn: '3600',
  idToken: '12345',
  localId: '12345',
  refreshToken: '12345',
  registered: true,
};

export const SIGNIN_URL = `${defaultAppConfig.authBaseUrl}:signInWithPassword`;

export const INVALID_RESPONSE = {
  error: {
    code: 400,
    message: 'INVALID_PASSWORD',
    errors: [
      {
        message: 'INVALID_PASSWORD',
        domain: 'global',
        reason: 'invalid',
      },
    ],
  },
};

export const SUCCESS_RESPONSE = {
  kind: 'identitytoolkit#VerifyPasswordResponse',
  localId: 'Kx8wEkHWs9eNZ6GlGhw1KcqdQk22',
  email: 'testuser@amadeus.com',
  displayName: '',
  idToken: 'FAKE-TOKEN',
  registered: true,
  refreshToken: 'FAKE-REFRESH-TOKEN',
  expiresIn: '3600',
};
