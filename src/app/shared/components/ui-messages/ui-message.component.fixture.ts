import {DebugElement} from '@angular/core';
import {ComponentBaseFixture} from '@core/testing';

export class UiMessageComponentFixture extends ComponentBaseFixture {
  protected readonly ALERT_CONTAINER = '.alert';
  protected readonly ALERT_HEADING = '.alert-heading';
  protected readonly ALERT_TEXT = 'mb-0.p';
  protected readonly CLOSE_BUTTON = '.btn-class';

  constructor(element: DebugElement) {
    super(element);
  }

  /**
   * Gets header text of alert
   * @returns header inner text
   */
  public async getHeaderText() {
    return (await this.getElement(this.ALERT_HEADING))?.innerText;
  }

  /**
   * Gets message text of alert
   * @returns text of message content
   */
  public async getText() {
    return (await this.getElement(this.ALERT_TEXT))?.innerText;
  }

  /**
   * Returns whether the element is visible
   * @returns visibilty status
   */
  public async isVisible() {
    return !!(await this.getElement(this.ALERT_CONTAINER));
  }

  /**
   * Returns whether the close button element is visible
   * @returns visibilty status
   */
  public async isDismissible() {
    return (await this.getElement(this.CLOSE_BUTTON))?.innerText;
  }
}
