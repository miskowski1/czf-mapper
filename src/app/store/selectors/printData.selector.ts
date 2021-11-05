import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPrintData from '../reducers/printData.reducer';

export const selectFeature = createFeatureSelector<fromPrintData.State>(fromPrintData.printDataFeatureKey);

export const selectEntities = createSelector(
  selectFeature,
  fromPrintData.selectEntities
)

export const selectAll = createSelector(
  selectFeature,
  fromPrintData.selectAll
)
