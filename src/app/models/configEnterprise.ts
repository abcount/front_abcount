export interface Enterprise {
    id: number
    enterpriseName: string;
    dicCategory: string;
    nit: string;
    enterpriseLocation: string;
    contactMail: string;
    contactName: string;
    subsidiaries: Subsidiary[];
    openingDate: string;
  }
  
  export interface Subsidiary {
    name: string;
    address: string;
    areas: string[];
  }
  
  export interface CurrencyConfig {
    principalCurrency: number;
    currencyList: Currency[];
  }
  
  export interface Currency {
    moneyName: string;
    abbreviationName: string;
    currency: number;
  }
  
  export interface AccountablePlan {
    accountCode: string;
    nameAccount: string;
    moneyRub: boolean;
    report: boolean;
    classificator: boolean;
    level: number;
    childrenAccounts: AccountablePlan[];
  }
  
  export interface RootObject {
    enterprise: Enterprise;
    currencyConfig: CurrencyConfig;
    accountablePlan: AccountablePlan[];
  }
  