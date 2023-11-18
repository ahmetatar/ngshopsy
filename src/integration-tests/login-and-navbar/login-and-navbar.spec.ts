import {fireEvent, render, screen} from '@testing-library/angular';
import {MockLoginAndLoginStatusContainer} from './mocks';
import {DEFAULT_TEST_PROVIDERS} from '../test-setup';
import {ComponentFixture, inject} from '@angular/core/testing';
import {Location} from '@angular/common';
import {provideAuthTestingBackend} from '@core/auth/testing';
import userEvent from '@testing-library/user-event';

describe('Login and Navbar Integation Tests', () => {
  let componentFixture: ComponentFixture<MockLoginAndLoginStatusContainer>;

  beforeEach(async () => {
    const {fixture} = await render(MockLoginAndLoginStatusContainer, {
      providers: [...DEFAULT_TEST_PROVIDERS, provideAuthTestingBackend()],
    });
    componentFixture = fixture;
  });

  it('should update login status in navigation bar if user is logged in', inject(
    [Location],
    async (location: Location) => {
      const userEvents = userEvent.setup();
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      const loginButton = screen.getByText('Submit Login');

      await userEvents.type(emailInput, 'testuser');
      await userEvents.type(passwordInput, '12345');
      fireEvent.click(loginButton);

      await componentFixture.whenStable();

      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(location.path()).toBe('/campaigns/campaign-list');
    },
  ));

  it('should display error message if login is failed', inject([Location], async (location: Location) => {
    const userEvents = userEvent.setup();
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Submit Login');

    await userEvents.type(emailInput, 'invalid-user');
    await userEvents.type(passwordInput, '00000');
    fireEvent.click(loginButton);

    await componentFixture.whenStable();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Authentication failed')).toBeInTheDocument();
    expect(location.path()).toBe('/login');
  }));
});
