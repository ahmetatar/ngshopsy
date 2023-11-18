import {Action, ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {routerReducer} from '@ngrx/router-store';
import {authReducer} from '@core/auth';
import {productFeature} from '@shared/modules/product';
import {messageReducer} from '@shared/modules/ui-messages';

/**
 * Root app reducers
 */
export const appReducers: ActionReducerMap<AppState, Action> = {
  auth: authReducer,
  router: routerReducer,
  messages: messageReducer,
  products: productFeature.reducer,
};
