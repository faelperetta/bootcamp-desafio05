/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface TransactionDTO {
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

    private getTotalByType(type: string) {
        const totalTransactionsByType = this.transactions
            .filter(transaction => transaction.type === type)
            .reduce(
                (previousValue, currentValue) => {
                    const value = {
                        value: previousValue.value + currentValue.value,
                        type: previousValue.type,
                        id: '0',
                        title: '',
                    };

                    return value;
                },
                {
                    value: 0,
                    type: 'income',
                    title: '',
                    id: '0',
                },
            );

        return totalTransactionsByType.value;
    }

    public getBalance(): Balance {
        const totalOfIncome = this.getTotalByType('income');
        const totalOfOutcome = this.getTotalByType('outcome');
        return {
            income: totalOfIncome,
            outcome: totalOfOutcome,
            total: totalOfIncome - totalOfOutcome,
        };
    }

    public create({ title, value, type }: TransactionDTO): Transaction {
        const transaction = new Transaction({ title, value, type });
        this.transactions.push(transaction);
        return transaction;
    }
}

export default TransactionsRepository;
