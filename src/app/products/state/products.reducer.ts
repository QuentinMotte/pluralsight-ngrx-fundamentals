import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  error: string;
}

const initialState: ProductsState = {
  showProductCode: false,
  loading: false,
  products: [],
  error: '',
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
  }),
  on(ProductsApiActions.productsLoadFailure, (state, { error }) => {
    return {
      ...state,
      products: [],
      loading: false,
      error,
    };
  }),
  on(ProductsPageActions.addProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(ProductsApiActions.productAddSuccess, (state, { product }) => {
    return {
      ...state,
      loading: false,
      products: [...state.products, product],
    };
  }),
  on(ProductsApiActions.productAddFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(ProductsPageActions.updateProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(ProductsApiActions.productUpdateSuccess, (state, { product }) => {
    const updatedProducts = state.products.map((p) =>
      p.id === product.id ? product : p
    );
    return {
      ...state,
      loading: false,
      products: updatedProducts,
    };
  }),
  on(ProductsApiActions.productUpdateFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(ProductsPageActions.deleteProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(ProductsApiActions.productDeleteSuccess, (state, { productId }) => {
    return {
      ...state,
      loading: false,
      products: state.products.filter((p) => p.id !== productId),
    };
  }),
  on(ProductsApiActions.productDeleteFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);
