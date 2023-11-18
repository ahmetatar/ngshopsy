import {Action, ActionReducer} from '@ngrx/store';

const INIT_STORE_ACTION = '@ngrx/store/init';
const UPDATE_REDUCER_ACTION = '@ngrx/store/update-reducers';

export const getHydrationMetaReducer = () => (reducer: ActionReducer<any>) => {
  return (state: any, action: Action) => {
    if (action.type === UPDATE_REDUCER_ACTION || action.type === INIT_STORE_ACTION) {
      const savedState = sessionStorage.getItem('@ngrx-store');
      if (savedState) {
        return JSON.parse(savedState);
      }
    }
    const nextState = reducer(state, action);
    sessionStorage.setItem('@ngrx-store', JSON.stringify(nextState));
    return nextState;
  };
};
