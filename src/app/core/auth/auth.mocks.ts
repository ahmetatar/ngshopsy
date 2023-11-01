import {SignInRequest, SignInResult} from './auth.contracts';

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
