export interface TransactionAccountDto {
    transactionAccountId?: number;
    accountId: number;
    entityId: number | null;
    auxiliaryId: number | null;
    amountDebit: number;
    amountCredit: number;
    emitedDate: string | null;
    glosaDetail: string;
    documentCode: string | null;
}