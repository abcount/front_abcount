export interface AccountDto {
    isHidden: any;
    accountCode: number;
    nameAccount: string;
    clasificator: boolean;
    level: number;
    report: boolean;
    moneyRub: boolean;
    childrenAccounts: AccountDto[];
}