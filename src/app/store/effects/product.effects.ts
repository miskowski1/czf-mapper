import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { FirebaseService } from '../../shared/firebase.service';
import * as PrintDataActions from '../actions/printData.actions';
import * as ProductEntityActions from '../actions/product.actions';
import { selectProductsTotal } from '../selectors/product.selectors';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private firebaseService: FirebaseService, private store: Store) {
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductEntityActions.loadProducts),
      concatLatestFrom(_ => this.store.select(selectProductsTotal)),
      mergeMap(([ action, productsTotal ]) =>
        iif(
          () => productsTotal === 0,
          this.firebaseService.loadProducts().pipe(
            switchMap(products => [ ProductEntityActions.loadProductsSuccess({ products }), PrintDataActions.loadPrintData() ])
          )
        )
      )
    )
  );

}
