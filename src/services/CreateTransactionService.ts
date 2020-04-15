import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransictionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: CreateTransictionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error('Erro');
    }
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
