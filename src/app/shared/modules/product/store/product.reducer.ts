import {createEntityAdapter} from '@ngrx/entity';
import {createFeature, createReducer, on} from '@ngrx/store';
import {ProductApiActions} from './product.actions';
import {createUiMessageActionMetadata} from '@store/app.state';
import {MessageType} from '@shared/modules/ui-messages';
import {Product} from '../product.model';

/**
 * Gets campaign entity adapter
 */
export const productStateAdapter = createEntityAdapter<Product>();

/** Gets initial state for campaigns */
export const productInitialState = productStateAdapter.getInitialState();

/** Default product selectors */
export const {
  selectAll: selectAllProducts,
  selectEntities: selectProductEntities,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts,
} = productStateAdapter.getSelectors();

export const productFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    productInitialState,
    on(ProductApiActions.loadProductsSuccess, (state, action) => {
      return productStateAdapter.addMany(action.products, state);
    }),
    on(ProductApiActions.loadProductsError, (state, action) => ({
      ...state,
      ...createUiMessageActionMetadata('Products load failed', action.error, MessageType.Error),
    })),
  ),
});
