import {InjectionToken} from '@angular/core';

export interface UiMessageOptions {
  /**
   * Determines whether the message component is closed by the user
   */
  dismissible: boolean;
}

export const DEFAULT_UI_MESSAGE_OPTIONS: UiMessageOptions = {
  dismissible: false,
};

export const UI_MESSAGE_OPTIONS = new InjectionToken<UiMessageOptions>('Default UI message options');
