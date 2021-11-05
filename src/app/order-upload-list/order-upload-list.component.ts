import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileImport, FileImportMapping } from '@models/file-import.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import * as FileActions from '../store/actions/file.actions';
import * as fromFiles from '../store/selectors/file.selectors'

@Component({
  selector: 'app-order-upload-list',
  templateUrl: './order-upload-list.component.html',
  styleUrls: [ './order-upload-list.component.scss' ]
})
export class OrderUploadListComponent implements OnInit {

  public files$!: Observable<FileImport[]>;

  constructor(private dialog: MatDialog, private store: Store) {
  }

  ngOnInit(): void {
    this.files$ = this.store.select(fromFiles.selectFiles).pipe(
      map(entities => Object.values(entities))
    );
  }

  public editFile(fileName: string): void {
    const dialogRef = this.dialog.open(OrderEditComponent, { data: { fileName }, height: '60vh', width: '50vw' });

    dialogRef.afterClosed().subscribe((mapping: Record<FileImportMapping, string>) => {
      if (!!mapping) {
        this.store.dispatch(FileActions.updateFile({
          fileName,
          mapping: [ [ 'ean', mapping.ean ], [ 'name', mapping.name ], [ 'amount', mapping.amount ] ]
        }));
      }
    });
  }

  public removeFile(fileName: string): void {
    this.store.dispatch(FileActions.removeFile({ fileName }));
  }

}
