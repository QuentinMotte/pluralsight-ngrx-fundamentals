import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  error: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: false,
  loading: false,
  error: '',
});

export const ProductsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
      ...state,
      loading: true,
      error: '',
    })
  ),
  on(ProductsApiActions.productsLoadSuccess, (state, action) =>
    adapter.setAll(action.products, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsApiActions.productsLoadFailure, (state, { error }) =>
    adapter.setAll([], {
      ...state,
      loading: false,
      error,
    })
  ),
  on(ProductsPageActions.addProduct, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
    };
  }),
  on(ProductsApiActions.productAddSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
    })
  ),
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
  on(ProductsApiActions.productUpdateSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
    })
  ),
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
  on(ProductsApiActions.productDeleteSuccess, (state, { productId }) =>
    adapter.removeOne(productId, {
      ...state,
      loading: false,
    })
  ),
  on(ProductsApiActions.productDeleteFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProducts = selectAll;
export const selectProductsEntities = selectEntities;
