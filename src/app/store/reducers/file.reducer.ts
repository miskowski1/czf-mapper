import { FileImport } from '@models/file-import.interface';
import { createReducer, on } from '@ngrx/store';
import * as FileActions from '../actions/file.actions';

export const filesFeatureKey = 'files';

export interface State {
  names: string[],
  entities: Record<string, FileImport>
}

export const initialState: State = {
  names: [],
  entities: {}
};

export const fileReducer = createReducer(
  initialState,
  on(FileActions.loadFileSuccess, (state, action) => ({
    ...state, ...{
      names: [ ...state.names, action.data.name ],
      entities: {
        ...state.entities, ...{
          [action.data.name]: {
            name: action.data.name,
            mapping: action.data.mapping,
            entries: action.data.entries
          }
        }
      }
    }
  })),
  on(FileActions.removeFile, (state, action) => {
    const { [action.fileName]: remove, ...rest } = state.entities;

    return {
      ...state, ...{
        names: [ ...state.names.filter(fileName => fileName !== action.fileName) ],
        entities: rest
      }
    };
  }),
  on(FileActions.updateFile, (state, action) => ({
    ...state, ...{
      entities: {
        ...state.entities, ...{
          [action.fileName]: { ...state.entities[action.fileName], mapping: action.mapping }
        }
      }
    }
  })),
  on(FileActions.clearFiles, (state, action) => ({
    ...state, initialState
  }))
);

