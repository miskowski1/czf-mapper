export type FileImportMapping = 'ean' | 'name' | 'amount';

export interface FileImport {
  name: string
  mapping: [ FileImportMapping, string ][]
  entries: Record<string, string | number>[]
}
