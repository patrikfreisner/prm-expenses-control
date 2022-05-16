export abstract class Expense {
    constructor(expense: { pk?: string, sk?: string, description?: string, value?: number, isPaid?: boolean }) {
        this.pk = expense.pk || '';
        this.sk = expense.sk || '';
        this.description = expense.description || '';
        this.value = expense.value || 0;
        this.isPaid = expense.isPaid || false;
        this.created_at = new Date().getTime().toString();
    }
    pk: string;
    sk: string;
    description: string;
    value: number;
    isPaid: boolean;
    sys_class_name: string = 'expense';
    expenseRefPk!: string;
    expenseRefSk!: string;
    created_at: string;
    updated_at!: string;

    setExpenseKeys(userId: string, month: string, year: string): void {
        this.pk = "USER#" + userId;
        this.sk = year + "#" + month + "#" + this.sys_class_name + "#" + new Date().getTime();
    }
}
