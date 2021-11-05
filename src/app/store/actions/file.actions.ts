import { FileImport, FileImportMapping } from '@models/file-import.interface';
import { createAction, props } from '@ngrx/store';

export const loadFile = createAction(
  '[File] Load File',
  props<{ data: { file: File } }>()
);

export const loadFileSuccess = createAction(
  '[File] Load File Success',
  props<{ data: FileImport }>()
);

export const loadFileFailure = createAction(
  '[File] Load File Failure',
  props<{ error: string }>()
);

export const removeFile = createAction(
  '[File] Remove File',
  props<{ fileName: string }>()
);

export const updateFile = createAction(
  '[File] Update File',
  props<{ fileName: string, mapping: [ FileImportMapping, string ][] }>()
);

export const clearFiles = createAction(
  '[File] Clear Files'
);
