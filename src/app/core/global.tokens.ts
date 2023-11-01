import {InjectionToken} from '@angular/core';

/**
 * Provides global window object as injectable token
 */
export const GLOBAL_WINDOW_PROVIDER_TOKEN = new InjectionToken<Window>('Global window token', {
  factory: () => global.window,
});
