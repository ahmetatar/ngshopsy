import {Action, ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {routerReducer} from '@ngrx/router-store';
import {messageReducer} from '@shared/components/ui-messages/store';

/**
 * Root app reducers
 */
export const appReducers: ActionReducerMap<AppState, Action> = {
  router: routerReducer,
  messages: messageReducer,
};
