import {TestBed, inject} from '@angular/core/testing';
import {Router, UrlTree} from '@angular/router';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {isAuthenticated} from './store';
import {authGuardFn} from './auth.guard';

describe('AuthGuard tests', () => {
  const mockRouter = {createUrlTree: jest.fn()};

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideMockStore(), {provide: Router, useValue: mockRouter}],
    }),
  );

  it('should return true if user is authenticated', inject([MockStore], (mockStore: MockStore) => {
    mockStore.overrideSelector(isAuthenticated, true);

    TestBed.runInInjectionContext(() => {
      authGuardFn().subscribe((result) => {
        expect(result).not.toBeInstanceOf(UrlTree);
        expect(result).toBe(true);
      });
    });
  }));

  it('should return UrlTree instance if user is not authenticated', inject([MockStore], (mockStore: MockStore) => {
    mockStore.overrideSelector(isAuthenticated, false);

    TestBed.runInInjectionContext(() => {
      authGuardFn().subscribe((result) => {
        expect(result).toBeInstanceOf(UrlTree);
        result instanceof UrlTree && expect(result.root.toString()).toBe('/login');
      });
    });
  }));
});
