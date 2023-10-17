export interface ExchangeRateDto {
  id?: number;
  date: string;
  values: { abbreviation: string, value: number }[];
}
