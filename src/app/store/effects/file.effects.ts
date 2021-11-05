import { Injectable } from '@angular/core';
import { FileImport, FileImportMapping } from '@models/file-import.interface';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { FileService } from '../../shared/file.service';
import * as FileActions from '../actions/file.actions';
import * as PrintDataActions from '../actions/printData.actions';
import * as fromFiles from '../selectors/file.selectors';

@Injectable()
export class FileEffects {

  private defaultMapping: Map<FileImportMapping, string> = new Map([ [ 'ean', 'C' ], [ 'name', 'B' ], [ 'amount', 'E' ] ]);

  constructor(private actions$: Actions, private fileService: FileService, private store: Store) {
  }

  loadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.loadFile),
      concatLatestFrom(_ => this.store.select(fromFiles.selectFilesNames)),
      mergeMap(([ action, fileNames ]) =>
        iif(() =>
            fileNames.includes(action.data.file.name),
          of(FileActions.loadFileFailure({ error: 'Nazwa pliku musi być unikalna' })),
          this.fileService.loadFile<Record<string, string | number>>(action.data.file).pipe(
            map(data => (<FileImport>{
              name: action.data.file.name,
              mapping: Array.from(this.defaultMapping),
              entries: data
            })),
            switchMap(data => [ FileActions.loadFileSuccess({ data }), PrintDataActions.addPrintData({ fileName: data.name }) ])
          )
        )
      )
    )
  );

  removeFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.removeFile),
      map(action => PrintDataActions.removePrintData({ fileName: action.fileName }))
    )
  );

  updateFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.updateFile),
      map(action => PrintDataActions.updatePrintData({ filename: action.fileName }))
    )
  );

}
