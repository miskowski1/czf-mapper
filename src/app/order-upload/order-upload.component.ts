import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileService } from '../shared/file.service';
import * as FileActions from '../store/actions/file.actions';
import { selectFiles } from '../store/selectors/file.selectors';

@Component({
  selector: 'app-order-upload',
  templateUrl: './order-upload.component.html',
  styleUrls: [ './order-upload.component.scss' ]
})
export class OrderUploadComponent implements OnInit {

  @ViewChild('orderUpload') public orderUploadInput!: ElementRef;

  constructor(private actions$: Actions, private snackBar: MatSnackBar, private store: Store) {
  }

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(FileActions.loadFileSuccess)
    ).subscribe(_ => {
      this.snackBar.open('Zamówienie dodane pomyślnie');
      this.orderUploadInput.nativeElement.value = '';
    });

    this.actions$.pipe(
      ofType(FileActions.loadFileFailure)
    ).subscribe(action => {
      this.snackBar.open(action.error, undefined, { panelClass: 'warn' });
      this.orderUploadInput.nativeElement.value = '';
    })
  }

  public onFileSelected(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;

    this.store.dispatch(FileActions.loadFile({
      data: {
        file: target.files[0]
      }
    }));
  }

}
