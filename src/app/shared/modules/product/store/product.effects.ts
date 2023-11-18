import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {ProductApiActions} from './product.actions';
import {ProductService} from '../product.service';

@Injectable()
export class ProductEffects {
  /**
   * Persists created campaign
   */
  persist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductApiActions.loadProducts),
      exhaustMap(() =>
        this.productService.loadProducts().pipe(
          map((products) => ProductApiActions.loadProductsSuccess({products})),
          catchError((error) => of(ProductApiActions.loadProductsError({error}))),
        ),
      ),
    ),
  );

  constructor(
    private productService: ProductService,
    private actions$: Actions,
  ) {}
}
