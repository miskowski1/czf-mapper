import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
  }

  public loadFile<T>(file: File): Observable<T[]> {
    const reader: FileReader = new FileReader();

    reader.readAsArrayBuffer(file);

    return new Observable(observer => {
      reader.onload = (e: any) => {
        const ab: ArrayBuffer = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(ab);
        const sn = wb.SheetNames[0];
        const ws = wb.Sheets[sn];

        const data = XLSX.utils.sheet_to_json<T>(ws, { header: 'A' });

        observer.next(data);
        observer.complete();
      }
    });
  }

  public generateFileFromTable(table: any): void {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws);

    /* save to file */
    XLSX.writeFile(wb, `report-${ new Date().toLocaleDateString() }.xlsx`);
  }
}
