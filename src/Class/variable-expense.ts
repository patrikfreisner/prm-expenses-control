import { Expense } from "./expense";

export class VariableExpense extends Expense {
    constructor(variableExpense: {pk?: string, sk?: string, description?: string, value: number}) {
        super(variableExpense);
    }

    sys_class_name: string = 'variable_expense';

}
