import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from './product.state';
import {selectAllProducts} from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');
export const selectProducts = createSelector(selectProductState, selectAllProducts);
