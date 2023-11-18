import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {Product, ProductApiActions, ProductState} from '@shared/modules/product';
import {selectProducts} from '@shared/modules/product/store';
import {take} from 'rxjs';

export const campaignInitialDataResolver: ResolveFn<Product[]> = () => {
  const store = inject(Store<ProductState>);

  store.dispatch(ProductApiActions.loadProducts());
  return store.pipe(
    select(selectProducts),
    take(1)
  );
};
