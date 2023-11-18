import {fireEvent, render, screen} from '@testing-library/angular';
import {LoginContComponent} from './login-cont.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {inject} from '@angular/core/testing';
import {AuthActions, AuthService, AuthServiceFixture} from '@core/auth';
import {provideTestingSvgImage} from '@core/svg-utils/testing';
import userEvent from '@testing-library/user-event';

describe('LoginContComponent', () => {
  beforeEach(
    async () =>
      await render(LoginContComponent, {
        providers: [
          provideMockStore(), 
          provideTestingSvgImage(), 
          {provide: AuthService, useClass: AuthServiceFixture}
        ],
      }),
  );

  it('should login', inject([MockStore], async (store: MockStore) => {
    const user = userEvent.setup();
    store.dispatch = jest.fn();

    const emailControl = screen.getByTestId('email-field');
    const passwordControl = screen.getByTestId('password-field');
    const submitButton = screen.getByRole('button');
    const form = screen.getByRole('form');

    await user.type(emailControl, 'testuser');
    await user.type(passwordControl, 'password1234');
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.signIn({email: 'testuser', password: 'password1234', returnSecureToken: true}),
    );
  }));
});
