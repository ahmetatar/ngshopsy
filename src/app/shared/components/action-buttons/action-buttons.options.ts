import {InjectionToken} from '@angular/core';
import {Button} from './action-buttons.model';

export interface ActionButtonsOptions {
  /**
   * Determines how the buttons are sorted
   */
  useStack: boolean;
}

export const ACTION_CONTINUE = 'continue';
export const ACTION_CANCEL = 'cancel';

export const DEFAULT_ACTION_BUTTONS: Button[] = [
  {
    name: ACTION_CONTINUE,
    title: 'Continue',
    cssClass: 'btn-primary',
    type: 'submit',
  },
  {
    name: ACTION_CANCEL,
    title: 'Cancel',
    cssClass: 'btn-secondary',
    type: 'button',
  },
];

export const DEFAULT_ACTION_BUTTONS_OPTIONS: ActionButtonsOptions = {
  useStack: true,
};

export const ACTION_BUTTONS = new InjectionToken<Button[]>('Default Buttons', {
  providedIn: 'root',
  factory: () => DEFAULT_ACTION_BUTTONS,
});

export const ACTION_BUTTONS_OPTIONS = new InjectionToken<ActionButtonsOptions>('Action button options', {
  providedIn: 'root',
  factory: () => DEFAULT_ACTION_BUTTONS_OPTIONS,
});
