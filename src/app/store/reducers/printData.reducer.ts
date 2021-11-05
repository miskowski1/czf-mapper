import { PrintData } from '@models/print-data.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as PrintDataActions from '../actions/printData.actions';

export const printDataFeatureKey = 'printData';

export interface State extends EntityState<PrintData> {
  // additional entities state properties
}

export const adapter: EntityAdapter<PrintData> = createEntityAdapter<PrintData>({
  selectId: (printData: PrintData) => printData.ean
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(PrintDataActions.loadPrintDataSuccess,
    (state, action) => adapter.setAll(action.entities, state)
  ),
  on(PrintDataActions.upsertPrintData,
    (state, action) => adapter.upsertMany(action.entities, state)
  ),
  on(PrintDataActions.clearPrintData,
    state => adapter.removeAll(state)
  )
  // on(ProductActions.addProduct,
  //   (state, action) => adapter.addOne(action.product, state)
  // ),
  // on(ProductActions.upsertProduct,
  //   (state, action) => adapter.upsertOne(action.product, state)
  // ),
  // on(ProductActions.addProducts,
  //   (state, action) => adapter.addMany(action.products, state)
  // ),
  // on(ProductActions.upsertProducts,
  //   (state, action) => adapter.upsertMany(action.products, state)
  // ),
  // on(ProductActions.updateProduct,
  //   (state, action) => adapter.updateOne(action.product, state)
  // ),
  // on(ProductActions.updateProducts,
  //   (state, action) => adapter.updateMany(action.products, state)
  // ),
  // on(ProductActions.deleteProduct,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(ProductActions.deleteProducts,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(ProductActions.loadProductsSuccess,
  //   (state, action) => adapter.setAll(action.products, state)
  // ),
  // on(ProductActions.clearProducts,
  //   state => adapter.removeAll(state)
  // ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
