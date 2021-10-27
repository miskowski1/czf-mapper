import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { MapperInterface } from '../models/mapper.interface';

@Component({
  selector: 'app-order-upload-list',
  templateUrl: './order-upload-list.component.html',
  styleUrls: [ './order-upload-list.component.scss' ]
})
export class OrderUploadListComponent implements OnInit {

  public files$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public hasFiles$: Observable<boolean>;

  constructor(private firestore: AngularFirestore, private snackBar: MatSnackBar) {
    this.hasFiles$ = this.files$.pipe(
      map(files => files.length > 0)
    );
  }

  ngOnInit(): void {
  }

  public addFile(event: any): void {
    const files = [...this.files$.getValue()];
    if (files.find(_file => _file.name === event.name)) {
      this.snackBar.open('Nazwa pliku musi być unikalna', undefined, { panelClass: 'warn' });
      return;
    }
    this.files$.next([ ...this.files$.getValue(), event ]);

    this.snackBar.open('Zamówienie dodane pomyślnie');
  }

  public removeFile(id: string): void {
    this.files$.next(this.files$.getValue().filter((file: any) => file.id !== id));

    this.snackBar.open('Zamówienie usunięte pomyślnie');
  }

  public generateReport(): void {
    this.firestore.collection<MapperInterface>('mappers').valueChanges().pipe(
      withLatestFrom(this.files$)
    ).subscribe(([ mappers, files ]) => {
      const data = files.reduce((acc: Map<number, Map<string, number>>, file: { name: string, data: { ean: number, amount: number }[] }) => {
        file.data.forEach(data => {
          if (!data.ean) {
            return;
          }
          if (acc.has(data.ean)) {
            acc.set(data.ean, acc.get(data.ean)!.set(file.name, data.amount));
            acc.set(data.ean, acc.get(data.ean)!.set('sum', (acc.get(data.ean)!.get('sum')! + data.amount)));
          } else {
            acc.set(data.ean, new Map<string, number>([ [ file.name, data.amount ], [ 'sum', data.amount ] ]))
          }
        });
        return acc;
      }, new Map());

      mappers.forEach((mapper: any) => {
        if (!data.has(mapper.ean)) {
          files.forEach((file: any) => {
            mapper[file.name] = 0;
          });
          mapper['sum'] = 0;
        } else {
          data.get(mapper.ean).forEach((value: any, key: any) => {
            mapper[key] = value
          })
        }
      });

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(mappers, { header: [ 'ean', 'name', ...files.map((f: any) => f.name), 'sum' ] });
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `report-${ new Date().toLocaleDateString() }.xlsx`);
    });
  }

}
