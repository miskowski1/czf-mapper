export interface PrintData {
  ean: number;
  name: string;
  sum: number;
  fileValues?: {
    [key: string]: number
  },
}
