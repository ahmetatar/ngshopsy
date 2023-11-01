import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export abstract class ComponentBaseFixture {
  constructor(private debugElm: DebugElement) {}

  /**
   * Returns nativeElement of queried element
   *
   * @param selector element selector
   * @returns nativeElement
   */
  protected getElement<T = HTMLElement>(selector: string): Promise<T | HTMLElement | null> {
    const element = this.debugElm.query(By.css(selector));
    return Promise.resolve(element ? (element.nativeElement as T) : null);
  }

  /**
   * Returns nativeElement list of queried element
   *
   * @param selector element selector
   * @returns nativeElement list
   */
  protected getElementAll<T = HTMLElement>(selector: string): Promise<T[] | HTMLElement[] | null> {
    const elements = this.debugElm.queryAll(By.css(selector));
    return Promise.resolve(elements ? elements.map((el) => el.nativeElement as T) : null);
  }

  /**
   * Returns the given attribute value of the element
   *
   * @param attr quelified name
   * @param element to control the attribute
   * @returns attribute value
   */
  protected getAttributeValue(element: HTMLElement, attr: string): Promise<string | null> {
    return Promise.resolve(element.getAttribute(attr));
  }
}
