/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable array-callback-return */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, next) => {
      if (next.type === 'income') return total + next.value;
      return total;
    }, 0);

    const outcome = this.transactions.reduce((total, next) => {
      if (next.type === 'outcome') return total + next.value;
      return total;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
