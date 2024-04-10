import { createFeatureSelector, createSelector } from '@ngrx/store';

import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';

import * as fromProducts from './products.reducer';

export const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>('products');

export const selectShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProducts = createSelector(
  selectProductsState,
  fromProducts.selectProducts
);

export const selectProductsEntities = createSelector(
  selectProductsState,
  fromProducts.selectProductsEntities
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const selectProductsError = createSelector(
  selectProductsState,
  (productsState) => productsState.error
);

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectProductsEntities,
  selectRouteParams,
  (products, { id }) => products[id]
);
