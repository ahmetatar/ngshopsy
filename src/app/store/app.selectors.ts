import {createFeatureSelector} from '@ngrx/store';
import {getRouterSelectors, RouterReducerState} from '@ngrx/router-store';

/** Feature selector for router state */
export const selectRouterState = createFeatureSelector<RouterReducerState>('router');

/** Default router selectors */
export const {
  selectRouteParams,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectUrl,
  selectCurrentRoute,
  selectRouteParam,
  selectRouteDataParam,
  selectFragment,
} = getRouterSelectors(selectRouterState);
