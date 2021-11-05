import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileProductsAmount'
})
export class FileProductsAmountPipe implements PipeTransform {

  transform(fileEntries: Record<string, string | number>[]): string {
    const fileEntriesAmount: number = fileEntries.reduce((acc, entry) => {
      if (Object.values(entry).some(val => !!val)) {
        acc++;
      }
      return acc;
    }, 0);

    let returnText: string;

    switch (true) {
      case (fileEntriesAmount === 1):
        returnText = 'produkt';
        break;
      case (fileEntriesAmount < 5):
        returnText = 'produkty';
        break;
      default:
        returnText = 'produktów';
        break;
    }

    return `${ fileEntriesAmount } ${ returnText }`;
  }

}
