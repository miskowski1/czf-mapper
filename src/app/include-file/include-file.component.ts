import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { MapperInterface } from '../models/mapper.interface';

@Component({
  selector: 'app-include-file',
  templateUrl: './include-file.component.html',
  styleUrls: [ './include-file.component.scss' ]
})
export class IncludeFileComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<IncludeFileComponent>, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {

  }

  public onFileSelected(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);
      const sn = wb.SheetNames[0];
      const ws = wb.Sheets[sn];

      const data = XLSX.utils.sheet_to_json(ws);

      const result = data.reduce((acc: MapperInterface[], row: any) => {
        const keys = Object.keys(row);

        if (Number.isInteger(+row[keys[0]])) {
          acc.push({ ean: +row[keys[0]], name: row[keys[1]] })
        }

        return acc;
      }, []);
      const batch = this.firestore.firestore.batch();

      result.forEach(mapper => {
        const itemRef = this.firestore.collection('mappers').doc(`${ mapper.ean }`).ref;
        batch.set(itemRef, mapper);
      });

      batch.commit().then(_ => {
        this.dialogRef.close(true);
      });

    }
    reader.readAsArrayBuffer(target.files[0]);
  }

}
