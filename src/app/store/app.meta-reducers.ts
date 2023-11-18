import {getHydrationMetaReducer} from '@core/store';
import {MetaReducer} from '@ngrx/store';

export const metaReducers: MetaReducer[] = [getHydrationMetaReducer()];
