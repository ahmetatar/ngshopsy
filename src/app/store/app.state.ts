import {RouterState} from '@ngrx/router-store';
import {UiMessageState} from '../shared/components/ui-messages/store';

/**
 * Root app state
 */
export interface AppState {
  router: RouterState;
  messages: UiMessageState;
}
