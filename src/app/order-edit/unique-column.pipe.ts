import { Pipe, PipeTransform } from '@angular/core';
import { FileImportMapping } from '@models/file-import.interface';

@Pipe({
  name: 'uniqueColumn'
})
export class UniqueColumnPipe implements PipeTransform {

  transform(optionValue: string, formValue: Record<FileImportMapping, string>): boolean {
    return Object.values(formValue).includes(optionValue);
  }

}
