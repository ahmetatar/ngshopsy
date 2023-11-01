import {Action} from '@ngrx/store';
import {merge} from 'lodash-es';

export const INIT_STORE_ACTION = '@ngrx/store/init';
export const UPDATE_REDUCER_ACTION = '@ngrx/store/update-reducers';

/**
 * Persist or rehydrate current state with session storage
 *
 * @param key feature state key
 * @param state next state returned reducer
 * @param action dispatched action
 * @param allowedActions action list where state is allowed to be hydrated
 * @returns next state
 */
export function syncState<T = unknown>(key: string, state: T, action: Action, allowedActions?: Action[]) {
  if (action.type === UPDATE_REDUCER_ACTION || action.type === INIT_STORE_ACTION) {
    const data = sessionStorage.getItem(key);
    if (data) {
      const savedState = JSON.parse(data);
      return merge(state, savedState);
    }
    return state;
  }

  if (allowedActions) {
    if (allowedActions?.some((allowedAction) => allowedAction.type === action.type)) {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  } else {
    sessionStorage.setItem(key, JSON.stringify(state));
  }

  return state;
}
