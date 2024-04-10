import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
}

const initialState: ProductsState = {
  showProductCode: false,
  loading: false,
  products: [],
};

export const ProductsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductsPageActions.loadProducts, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(ProductsApiActions.productsLoadSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
      loading: false,
    };
  })
);
