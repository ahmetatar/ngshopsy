import {HttpRequest} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectToken} from './store';
import {authInterceptorFn} from './auth.interceptor';

describe('AuthInterceptor', () => {
  let mockStore: MockStore;
  const nextFn = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectToken, '12345abc');
  });

  it('should be add auth key to url parameters', () => {
    const request = new HttpRequest('GET', 'http://firebase.fakedb.com:products.json', null);
    const expected = request.clone({setParams: {auth: '12345abc'}});

    TestBed.runInInjectionContext(() => {
      const result = authInterceptorFn(request, nextFn);
      result.subscribe();

      expect(nextFn).toHaveBeenCalledWith(expected);
    });
  });

  it('should be add auth param if the url is not one of the filtered urls', () => {
    const request = new HttpRequest('GET', 'http://firebase.fakedb.com:signUp', null);
    TestBed.runInInjectionContext(() => {
      const result = authInterceptorFn(request, nextFn);
      result.subscribe();

      expect(nextFn).toHaveBeenCalledWith(request);
    });
  });
});
