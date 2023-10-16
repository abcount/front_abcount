export interface TransactionAccountDto {
    transactionAccountId?: number;
    accountId: number;
    entityId: number | null;
    auxiliaryId: number | null;
    amountDebit: string;
    amountCredit: string;
    emitedDate: string | null;
    glosaDetail: string;
    documentCode: string | null;
}