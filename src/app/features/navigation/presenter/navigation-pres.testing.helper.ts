import {NavigationPresComponentFixture} from './navigation-pres.component.fixture';

/**
 * Return expected condition of buttons for anonymous users
 *
 * @param fixture navigation pres component fixture
 * @returns expected condition
 */
export async function isVisibleLoginAndSignupButtonsForAnonymousUsers(fixture: NavigationPresComponentFixture) {
  const loginButton = await fixture.getLoginButton();
  const logoutButton = await fixture.getLogoutButton();
  const signupButton = await fixture.getSignupButton();

  return loginButton && !logoutButton && signupButton;
}

/**
 * Return expected condition of buttons for authenticated users
 *
 * @param fixture navigation pres component fixture
 * @returns expected condition
 */
export async function isVisibleOnlyLogoutButtonIfUserIsAuthenticated(fixture: NavigationPresComponentFixture) {
  const loginButton = await fixture.getLoginButton();
  const logoutButton = await fixture.getLogoutButton();
  const signupButton = await fixture.getSignupButton();

  return !loginButton && logoutButton && !signupButton;
}
