import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {ProductApiActions, ProductState} from '@shared/modules/product';
import {selectProducts} from '@shared/modules/product/store';
import {filter, of, switchMap, take} from 'rxjs';

/**
 * Loads products before campaign component loads
 *
 * @returns products
 */
export const campaignInitialDataResolver: ResolveFn<boolean> = () => {
  const store = inject(Store<ProductState>);

  store.dispatch(ProductApiActions.loadProducts());
  
  return store.pipe(
    select(selectProducts),
    filter((products) => !!products),
    take(1),
    switchMap(() => of(true)),
  );
};
