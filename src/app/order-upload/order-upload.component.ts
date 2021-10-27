import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-order-upload',
  templateUrl: './order-upload.component.html',
  styleUrls: [ './order-upload.component.scss' ]
})
export class OrderUploadComponent implements OnInit {

  @Output() public onFileUpload: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('orderUpload') public orderUploadInput!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onFileSelected(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);
      const sn = wb.SheetNames[0];
      const ws = wb.Sheets[sn];

      const data = XLSX.utils.sheet_to_json(ws, { header: [ 'no', 'name', 'ean', 'sth', 'amount', 'unit', 'price' ] });

      this.onFileUpload.emit({ name: target.files[0].name, data });
      this.orderUploadInput.nativeElement.value = '';
    }

    reader.readAsArrayBuffer(target.files[0]);
  }

}
