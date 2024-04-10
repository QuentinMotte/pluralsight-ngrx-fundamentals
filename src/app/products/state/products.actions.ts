import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ productId: number }>(),
  },
});

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Load Success': props<{ products: Product[] }>(),
    'Products Load Failure': props<{ message: string }>(),
    'Product Add Success': props<{ product: Product }>(),
    'Product Add Failure': props<{ message: string }>(),
    'Product Update Success': props<{ product: Product }>(),
    'Product Update Failure': props<{ message: string }>(),
    'Product Delete Success': props<{ productId: number }>(),
    'Product Delete Failure': props<{ message: string }>(),
  },
});
