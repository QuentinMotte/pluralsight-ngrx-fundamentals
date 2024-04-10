import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectProductsTotal = createSelector(
  selectProductsState,
  (productsState) => sumProducts(productsState.products)
);

export const selectProductsError = createSelector(
  selectProductsState,
  (productsState) => productsState.error
);
