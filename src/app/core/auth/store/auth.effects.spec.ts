import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Router} from '@angular/router';
import {provideMockActions} from '@ngrx/effects/testing';
import {of, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {AuthEffects} from './auth.effects';
import {ActionsSubject} from '@ngrx/store';
import {UiMessagesService, UiMessagesServiceFixture} from '@shared/modules/ui-messages';
import {AuthServiceFixture} from '../testing';

describe('Auth Effects Tests', () => {
  const actions$ = new ActionsSubject();
  const mockRouter = {navigateByUrl: jest.fn()};
  const authServiceFixture = new AuthServiceFixture();
  const uiMessageServiceFixture = new UiMessagesServiceFixture();
  let authEffects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: UiMessagesService, useValue: uiMessageServiceFixture},
        {provide: AuthService, useValue: authServiceFixture},
        AuthEffects,
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });

    authEffects = TestBed.inject(AuthEffects);
  });

  afterAll(() => jest.clearAllMocks());

  it('should be return success action if signin request is successfully', () => {
    const signInRequestAction = {
      email: 'testuser@test.com',
      password: '123456',
      returnSecureToken: true,
      type: '[Auth] SignIn',
    };

    actions$.next(signInRequestAction);
    authServiceFixture.signIn$.mockReturnValue(of({idToken: 'test'}));

    authEffects.signIn$.subscribe((resultAction) => {
      expect(resultAction).toEqual(
        expect.objectContaining({
          type: '[Auth] SignIn Success',
          result: {idToken: 'test'},
        }),
      );

      expect(uiMessageServiceFixture.clearMessages).toHaveBeenCalled();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/campaigns');
    });

    expect(authServiceFixture.signIn$).toHaveBeenCalledWith(signInRequestAction);
  });

  it('should be return failure action if signin request return any error', () => {
    actions$.next({type: '[Auth] SignIn'});
    authServiceFixture.signIn$.mockReturnValue(
      throwError(() => ({code: '1453', message: 'An error occured', error: 'any error'})),
    );

    authEffects.signIn$.subscribe((action) => {
      expect(action).toEqual(
        expect.objectContaining({
          result: {
            error: 'any error',
            code: '1453',
            message: 'An error occured',
          },
          type: '[Auth] SignIn Failure',
        }),
      );
    });
  });
});
