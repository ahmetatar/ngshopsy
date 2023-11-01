import {HttpHandler, HttpRequest} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';
import {AuthInterceptor} from './auth.interceptor';
import {selectToken} from './store';

describe('AuthInterceptor', () => {
  let mockStore: MockStore;
  let authInterceptor: AuthInterceptor;

  const next = {
    handle: jest.fn(() => new Observable((subs) => subs.complete())),
  } as HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, provideMockStore()],
    });
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    authInterceptor = TestBed.inject(AuthInterceptor);
    mockStore.overrideSelector(selectToken, '12345abc');
  });

  it('should be add auth key to url parameters', () => {
    const request = new HttpRequest('GET', 'http://firebase.fakedb.com:products.json', null);
    const expected = request.clone({setParams: {auth: '12345abc'}});
    const result = authInterceptor.intercept(request, next);

    result.subscribe();
    expect(next.handle).toHaveBeenCalledWith(expected);
  });

  it('should be add auth param if the url is not one of the filtered urls', () => {
    const request = new HttpRequest('GET', 'http://firebase.fakedb.com:signUp', null);
    const result = authInterceptor.intercept(request, next);

    result.subscribe();
    expect(next.handle).toHaveBeenCalledWith(request);
  });
});
