import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from '../reducers/product.reducer';

export const selectFeature = createFeatureSelector<fromProducts.State>(fromProducts.productsFeatureKey);

export const selectProductsTotal = createSelector(
  selectFeature,
  fromProducts.selectTotal
)

export const selectAll = createSelector(
  selectFeature,
  fromProducts.selectAll
)

export const selectEntities = createSelector(
  selectFeature,
  fromProducts.selectEntities
)
