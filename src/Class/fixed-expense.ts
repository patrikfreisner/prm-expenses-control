import { Expense } from './expense';

export class FixedExpense extends Expense {
  constructor(fixedExpense: {
    pk?: string;
    sk?: string;
    description?: string;
    value?: number;
  }) {
    super(fixedExpense);
  }
  sys_class_name: string = 'fixed_expense';
}
