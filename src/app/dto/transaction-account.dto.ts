export interface TransactionAccountDto {
    transactionAccountId: number;
    accountId: string;
    entityId: string;
    auxiliaryId: string;
    amountDebit: number;
    amountCredit: number;
    emitedDate: string;
    glosaDetail: string;
    documentCode: string;
}