import {fireEvent, render, screen} from '@testing-library/angular';
import {NavigationContComponent} from './navigation-cont.component';
import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {MockBaseComponent} from '@core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthActions, AuthState, selectUser} from '@core/auth';
import {MemoizedSelector} from '@ngrx/store';

describe('NavigatorContComponent', () => {
  let componentFixture: ComponentFixture<NavigationContComponent>;
  let store: MockStore<AuthState>;
  let userSelector: MemoizedSelector<any, {email: string | undefined; isAuthenticated: boolean}>;

  beforeEach(async () => {
    const {fixture} = await render(NavigationContComponent, {
      providers: [provideMockStore()],
      routes: [
        {
          path: 'login',
          component: MockBaseComponent,
        },
      ],
    });
    componentFixture = fixture;
    store = TestBed.inject(MockStore);
    userSelector = store.overrideSelector(selectUser, {email: '', isAuthenticated: false});
  });

  it('should visible login and signup button if user is not authenticated', () => {
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
  });

  it('should only visible logout button if user is authenticated', inject([MockStore], (store: MockStore) => {
    userSelector.setResult({email: '', isAuthenticated: true});
    store.refreshState();
    componentFixture.detectChanges();

    expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  }));

  it('should navigate to login page', inject([MockStore], (store: MockStore) => {
    store.dispatch = jest.fn();
    fireEvent.click(screen.getByTestId('logout-button'));

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signOut());
  }));
});
