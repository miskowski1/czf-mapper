import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { IncludeFileComponent } from './include-file/include-file.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderUploadListComponent } from './order-upload-list/order-upload-list.component';
import { OrderUploadComponent } from './order-upload/order-upload.component';
import { PreviewComponent } from './preview/preview.component';
import { FileEffects } from './store/effects/file.effects';
import { PrintDataEffects } from './store/effects/printData.effects';
import { ProductEffects } from './store/effects/product.effects';
import * as fromFiles from './store/reducers/file.reducer';
import { reducer as printDataReducer } from './store/reducers/printData.reducer';
import { reducer as productReducer } from './store/reducers/product.reducer';
import { UniqueColumnPipe } from './order-edit/unique-column.pipe';
import { FileProductsAmountPipe } from './order-upload-list/file-products-amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IncludeFileComponent,
    OrderUploadListComponent,
    OrderUploadComponent,
    PreviewComponent,
    OrderEditComponent,
    UniqueColumnPipe,
    FileProductsAmountPipe
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ files: fromFiles.fileReducer, printData: printDataReducer, products: productReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ FileEffects, PrintDataEffects, ProductEffects ])
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
