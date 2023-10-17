export interface ExchangeRateDto {
  id?: number;
  date: string;
  values: { abbrevation: string, value: number }[];
}
