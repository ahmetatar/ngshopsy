import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Product} from '../product.model';

export const ProductApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{products: Product[]}>(),
    'Load Products Error': props<{error: string}>(),
  },
});
