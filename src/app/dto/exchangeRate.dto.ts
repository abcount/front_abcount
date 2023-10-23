export interface ExchangeRateDto {
  id?: number;
  date: string;
  values: { abbreviation: string, value: number }[];
}

export interface ExchangeMoneyDto {
  exchangeMoneyId: number;
  companyId: number;
  moneyName: string;
  abbreviationName: string;
  isPrincipal: boolean;
}

export interface ExchangeRateCreate {
  moneyName: string;
  abbreviationName: string;
  currency: number;
}