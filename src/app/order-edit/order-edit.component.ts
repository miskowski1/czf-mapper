import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectFile } from '../store/selectors/file.selectors';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: [ './order-edit.component.scss' ]
})
export class OrderEditComponent implements OnInit, OnDestroy {

  public columns: string[] = [];
  public mappingForm!: FormGroup;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fileName: string }, private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.mappingForm = this.fb.group({
      ean: [ '' ],
      name: [ '' ],
      amount: [ '' ]
    });

    this.store.select(selectFile(this.data.fileName)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(file => {
      this.columns = Object.keys(file.entries[0]);
      this.mappingForm.patchValue(file.mapping.reduce((acc: any, [ key, val ]) => {
        acc[key] = val;
        return acc;
      }, {}));
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
