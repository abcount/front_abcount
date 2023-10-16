export interface ExchangeRateDto {
  id?: number;
  date: string;
  values: { [currency: string]: number };
}
