import { Injectable } from '@angular/core';
import { FileImportMapping } from '@models/file-import.interface';
import { PrintData } from '@models/print-data.interface';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import * as PrintDataActions from '../actions/printData.actions';
import * as fromFiles from '../selectors/file.selectors';
import * as fromPrintData from '../selectors/printData.selector';
import * as fromProducts from '../selectors/product.selectors';

@Injectable()
export class PrintDataEffects {

  constructor(private actions$: Actions, private store: Store) {
  }

  initPrintData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrintDataActions.loadPrintData),
      concatLatestFrom(_ => this.store.select(fromProducts.selectAll)),
      map(([ action, products ]) => PrintDataActions.loadPrintDataSuccess({
        entities: products.map(product => ({
          ...product,
          sum: 0
        }))
      }))
    )
  );

  addPrintData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrintDataActions.addPrintData),
      concatLatestFrom(action => [ this.store.select(fromFiles.selectFile(action.fileName)), this.store.select(fromPrintData.selectEntities), this.store.select(fromFiles.selectFilesNames) ]),
      map(([ action, file, printDataEntities, fileNames ]) => {
        const mappingMap: Map<FileImportMapping, string> = new Map(file.mapping);
        const fileDataMap: Map<number, { name: string, amount: number }> = file.entries.reduce((acc, entry) => {
          if (!!entry[mappingMap.get('ean')!]) {
            acc.set(entry[mappingMap.get('ean')!], {
              name: entry[mappingMap.get('name')!],
              amount: entry[mappingMap.get('amount')!]
            })
          }
          return acc;
        }, new Map());
        const newPrintData: PrintData[] = Object.values(printDataEntities).map(entity => ({
          ...entity!,
          fileValues: {
            ...entity!.fileValues,
            [action.fileName]: fileDataMap.has(entity!.ean) ? fileDataMap.get(entity!.ean)!.amount : 0
          },
          sum: entity!.sum + (fileDataMap.has(entity!.ean) ? fileDataMap.get(entity!.ean)!.amount : 0)
        }));

        fileDataMap.forEach((data, ean) => {
          if (!printDataEntities.hasOwnProperty(ean)) {
            newPrintData.push({
              ean,
              name: data.name,
              sum: data.amount,
              fileValues: fileNames.reduce((acc, fileName) => ({
                ...acc,
                [fileName]: fileName === action.fileName ? data.amount : 0
              }), {})
            })
          }
        })

        return PrintDataActions.upsertPrintData({ entities: newPrintData });
      })
    )
  );

  updatePrintData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrintDataActions.updatePrintData),
      map(action => PrintDataActions.removePrintData({ fileName: action.filename, addAfter: true }))
    )
  );

  removePrintData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrintDataActions.removePrintData),
      concatLatestFrom(_ => [ this.store.select(fromPrintData.selectAll), this.store.select(fromProducts.selectEntities) ]),
      map(([ action, printData, products ]) => ({
        action,
        entities: printData.reduce((acc: PrintData[], entry: PrintData) => {
          const { [action.fileName]: removedFileAmount, ...rest } = entry.fileValues!;
          const newEntry = { ...entry, ...{ fileValues: rest, sum: entry.sum - removedFileAmount } }

          if (newEntry.sum > 0 || products.hasOwnProperty(newEntry.ean)) {
            acc.push(newEntry);
          }
          return acc;
        }, [])
      })),
      switchMap(({
                   action,
                   entities
                 }) => [ PrintDataActions.loadPrintDataSuccess({ entities }), ...(action.addAfter ? [ PrintDataActions.addPrintData({ fileName: action.fileName }) ] : []) ])
    )
  );

}
