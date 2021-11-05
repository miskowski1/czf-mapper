import { PrintData } from '@models/print-data.interface';
import { createAction, props } from '@ngrx/store';

export const loadPrintData = createAction(
  '[Print Data] Init Print Data'
);

export const loadPrintDataSuccess = createAction(
  '[Print Data] Init Print Data Success',
  props<{ entities: PrintData[] }>()
);

export const addPrintData = createAction(
  '[Print Data] Add Print Data',
  props<{ fileName: string }>()
);

export const removePrintData = createAction(
  '[Print Data] Remove Print Data',
  props<{ fileName: string, addAfter?: boolean }>()
);

export const updatePrintData = createAction(
  '[Print Data] Update Print Data',
  props<{ filename: string }>()
);

export const upsertPrintData = createAction(
  '[Print Data] Update Print Data Success',
  props<{ entities: PrintData[] }>()
);

export const clearPrintData = createAction(
  '[Print Data] Clear Print Data'
)
