import { Component } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { ProductsService } from '../products.service';
import { Store } from '@ngrx/store';
import {
  ProductsApiActions,
  ProductsPageActions,
} from '../state/products.actions';
import {
  selectProducts,
  selectProductsLoading,
  selectShowProductCode,
  selectProductsTotal,
  selectProductsError,
} from '../state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectShowProductCode);
  errorMessage$ = this.store.select(selectProductsError);

  constructor(private store: Store) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.store.dispatch(ProductsPageActions.loadProducts());
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
