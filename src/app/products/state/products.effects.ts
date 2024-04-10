import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      switchMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsApiActions.productsLoadSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsApiActions.productsLoadFailure({ error }))
          )
        )
      )
    )
  );
}
