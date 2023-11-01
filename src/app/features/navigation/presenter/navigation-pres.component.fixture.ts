import {DebugElement} from '@angular/core';
import {ComponentBaseFixture} from '@core/testing';

export class NavigationPresComponentFixture extends ComponentBaseFixture {
  protected readonly TITLE = '.navbar-brand';
  protected readonly LOGIN_BUTTON = '.navigation-actions .login-button';
  protected readonly LOGOUT_BUTTON = '.navigation-actions .logout-button';
  protected readonly SIGNUP = '.navigation-actions .signup-button';
  protected readonly USER = '.user';

  constructor(element: DebugElement) {
    super(element);
  }

  /**
   * Gets title of navbar
   * 
   * @returns string | undefined
   */
  public getTitle = async () => (await this.getElement(this.TITLE))?.innerText;

  /**
   * Gets authenticated user email text
   * 
   * @returns string | undefined
   */
  public getUserText = async () => (await this.getElement(this.USER))?.innerText;

  /**
   * Gets login button DOM element
   * 
   * @returns Promise<HMLElement | null>
   */
  public getLoginButton = () => this.getElement(this.LOGIN_BUTTON);

  /**
   * Gets logout button DOM element
   * 
   * @returns Promise<HMLElement | null>
   */
  public getLogoutButton = () => this.getElement(this.LOGOUT_BUTTON);

  /**
   * Gets signup button DOM element
   * 
   * @returns
   */
  public getSignupButton = () => this.getElement(this.SIGNUP);
}
