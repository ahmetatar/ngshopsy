import {dateUtils} from '@core/utils';
import {SignInResult} from '../auth.contracts';
import {AuthActions} from './auth.actions';
import {authReducer, initialAuthState} from './auth.reducer';

describe('Auth Reducer Tests', () => {
  it('should be update auth state if signin successfuly', () => {
    dateUtils.now = jest.fn(() => 12345);
    const signInResult = {email: 'a@a.com', localId: '123', registered: true, refreshToken: '123456'} as SignInResult;
    const expected = {email: 'a@a.com', localId: '123', issued: 12345, messageMetadata: {}};

    const state = authReducer(initialAuthState, AuthActions.signInSuccess({result: signInResult}));

    expect(state).toEqual(expected);
  });
});
