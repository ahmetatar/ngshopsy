import {DebugElement} from '@angular/core';
import {ComponentBaseFixture} from '@core/testing';

export class CampaignTypeComponentFixture extends ComponentBaseFixture {
  protected readonly TITLE = '.card-title';
  protected readonly TEXT = '.card-text';
  protected readonly CARD_BUTTON = '.card-body btn-primary';
  private debugElement: DebugElement;

  constructor(debugElm: DebugElement) {
    super(debugElm);
    this.debugElement = debugElm;
  }

  /**
   * Gets title of card
   *
   * @returns string | undefined
   */
  public getTitle = async () => (await this.getElement(this.TITLE))?.innerText;

  /**
   * Gets card body text
   *
   * @returns string | undefined
   */
  public getText = async () => (await this.getElement(this.TEXT))?.innerText;

  /**
   * Send click event to card button
   */
  public clickCard() {
    const clickEvent = new Event('click');
    (this.debugElement.nativeElement as HTMLAnchorElement).dispatchEvent(clickEvent);
  }
}
