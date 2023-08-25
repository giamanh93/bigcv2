export interface Account {
  accountId?: number;
  bank?: string;
  account?: string;
  accountName?: string;
  bankCode?: string;
  bankName?: string;
}

export interface Ship {
  expensesOtherId?: number;
  code?: string;
  name?: string;
  form?: number;
  amount?: number;
  ratio?: number;
}
