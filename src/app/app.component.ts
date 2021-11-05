import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IncludeFileComponent } from './include-file/include-file.component';
import { PreviewComponent } from './preview/preview.component';
import { FileService } from './shared/file.service';
import { clearFiles } from './store/actions/file.actions';
import { clearPrintData } from './store/actions/printData.actions';
import { clearProducts, loadProducts } from './store/actions/product.actions';
import { selectFilesNames } from './store/selectors/file.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'czf-mapper';
  public hasFiles$!: Observable<boolean>;

  @ViewChild(PreviewComponent) private previewComponent!: PreviewComponent;

  constructor(public dialog: MatDialog, private fileService: FileService, private snackBar: MatSnackBar, private store: Store) {
  }

  public ngOnInit(): void {
    this.hasFiles$ = this.store.select(selectFilesNames).pipe(
      map(fileNames => fileNames.length > 0)
    )
  }

  public generateReport(): void {
    this.fileService.generateFileFromTable(this.previewComponent.table._elementRef.nativeElement);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(IncludeFileComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Plik wgrany prawidłowo');
        this.store.dispatch(clearFiles());
        this.store.dispatch(clearPrintData());
        this.store.dispatch(clearProducts());
        this.store.dispatch(loadProducts());
      }
    });
  }
}
