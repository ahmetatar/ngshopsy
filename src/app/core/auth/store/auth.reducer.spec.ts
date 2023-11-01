import {SignInResult} from '../auth.contracts';
import {AuthActions} from './auth.actions';
import {authReducer, initialAuthState} from './auth.reducer';

describe('Auth Reducer Tests', () => {
  it('should be update auth state if signin successfuly', () => {
    const signInResult = {email: 'a@a.com', localId: '123'} as SignInResult;
    const state = authReducer(initialAuthState, AuthActions.signInSuccess({result: signInResult}));
    expect(state).toEqual(signInResult);
  });
});
