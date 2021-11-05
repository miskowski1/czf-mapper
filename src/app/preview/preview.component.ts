import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromProducts from '../store/actions/product.actions';
import * as fromFiles from '../store/selectors/file.selectors';
import * as fromPrintData from '../store/selectors/printData.selector';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: [ './preview.component.scss' ]
})
export class PreviewComponent implements OnInit {

  @ViewChild('table') public table!: any;

  public data$!: Observable<any>;
  public displayedColumns$!: Observable<string[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(fromProducts.loadProducts());
    this.data$ = this.store.select(fromPrintData.selectAll).pipe(
      map(printData => printData.map(entry => {
        const { fileValues, ...rest } = entry;
        return {
          ...rest,
          ...Object.entries(fileValues || {}).reduce((acc: { [key: string]: number }, [ key, value ]) => {
            acc[key] = value;
            return acc;
          }, {})
        }
      }))
    );

    this.displayedColumns$ = this.store.select(fromFiles.selectFilesNames).pipe(
      map(filesNames => [ 'ean', 'name', ...filesNames, 'sum' ])
    );

  }

}
