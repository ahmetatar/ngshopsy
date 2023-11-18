import {TestBed, inject} from '@angular/core/testing';
import {DEFAULT_TEST_PROVIDERS} from '../test-setup';
import {Store} from '@ngrx/store';
import {AuthActions, AuthState} from '@core/auth';
import {CampaignService} from '@features/campaigns';
import {TEST_BACKEND_PROVIDERS} from './test-providers';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

describe('Authentication Tests', () => {
  describe('token validations', () => {
    /**
     * Token validation tests, validates the integration of the following application components;
     * - AuthStore
     *   - Effects
     *   - Reducers
     * - HydrationMetaReducer
     * - AuthService
     * - Auth Interceptor
     */
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [...DEFAULT_TEST_PROVIDERS, ...TEST_BACKEND_PROVIDERS, CampaignService],
      });
    });

    // Since there will be re-hydration between state test suites, signout action is dispatched each time.
    beforeEach(inject([Store], (store: Store) => store.dispatch(AuthActions.signOut())));

    it('should be placed auth token at the end of each request url', (done) => {
      inject([Store<AuthState>, CampaignService], (store: Store<AuthState>, campaignService: CampaignService) => {
        store.dispatch(
          AuthActions.signIn({
            email: 'testuser',
            password: '12345',
            returnSecureToken: true,
          }),
        );

        campaignService.getCampaigns().subscribe((campaigns) => {
          expect(campaigns).toBeTruthy();
          done();
        });
      })();
    });

    it('should not contain tokens request urls when not signed in', (done) => {
      inject([CampaignService], (campaignService: CampaignService) => {
        campaignService.getCampaigns().subscribe({
          error: (err) => {
            expect(err.error).toBe('unauthorized');
            done();
          },
        });
      })();
    });
  });

  describe('user authorization', () => {
    /**
     * User authorization tests, validates the integration of the following application components;
     * - Routing
     * - AuthGuard
     */
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [...DEFAULT_TEST_PROVIDERS],
      });
    });

    it('should be redirect to login page if user is not authenticated', (done) => {
      inject([Router, Location], (router: Router, location: Location) => {
        router.navigateByUrl('/campaigns');
        expect(location.path()).toBe('/login');
        done();
      })();
    });
  });
});
