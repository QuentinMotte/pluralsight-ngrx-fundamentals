import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
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

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map(() => ProductsApiActions.productAddSuccess({ product })),
          catchError((error) =>
            of(ProductsApiActions.productAddFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductsApiActions.productUpdateSuccess({ product })),
          tap(() => ProductsPageActions.loadProducts()),
          tap(this.goToProductsPage),
          catchError((error) =>
            of(ProductsApiActions.productUpdateFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ productId }) =>
        this.productsService.delete(productId).pipe(
          map(() => ProductsApiActions.productDeleteSuccess({ productId })),
          catchError((error) =>
            of(ProductsApiActions.productDeleteFailure({ error }))
          )
        )
      )
    )
  );

  private goToProductsPage = () => this.router.navigate(['/products']);
}
