import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFiles from '../reducers/file.reducer';

export const selectFeature = createFeatureSelector<fromFiles.State>(fromFiles.filesFeatureKey);

export const selectFilesNames = createSelector(
  selectFeature,
  state => state.names
)

export const selectFiles = createSelector(
  selectFeature,
  state => state.entities
)

export const selectFile = (fileName: string) =>
  createSelector(
    selectFeature,
    state => state.entities[fileName]
  )

export const selectFileMapping = (fileName: string) =>
  createSelector(
    selectFeature,
    state => state.entities[fileName].mapping
  )
