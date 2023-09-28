export interface AccountDto {
    isHidden: any;
    codeAccount: number;
    nameAccount: string;
    clasificator: boolean;
    level: number;
    report: boolean;
    moneyRub: boolean;
    childrenAccounts: AccountDto[];
}