export class DynamoDBObject {
    constructor(pk?: string, sk?: string, created_at?: Date, updated_at?: Date) {
        this.pk = pk || "";
        this.sk = sk || "";
        this.created_at = created_at || new Date();
        this.updated_at = updated_at && updated_at >= new Date() ? updated_at : new Date();
    }
    pk: string;
    sk: string;
    created_at: Date;
    updated_at: Date;
}

class ExpenseDateTime extends Date {
    constructor(date?: string | Date | number) {
        if (date) {
            if (typeof date == "string") {
                let _date = new Date(date)
                _date.setDate(1);
                _date.setHours(0);
                _date.setMinutes(0);
                _date.setSeconds(1);
                _date.setMinutes(0);
            } else if (typeof date == "number") {
                let _date = new Date(date);
                _date.setDate(1);
                _date.setHours(0);
                _date.setMinutes(0);
                _date.setSeconds(1);
                _date.setMinutes(0);
            } else {
                date.setDate(1);
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(1);
                date.setMinutes(0);
            }
        } else {
            date = new Date();
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(1);
            date.setMinutes(0);
        }
        super(<Date>date);
    }
}

export class Expense extends DynamoDBObject {
    constructor(expense: { pk?: string, sk?: string, description?: string, value?: number, isPaid?: boolean, isRecurring?: boolean, recurringStart?: ExpenseDateTime, recurringEnd?: ExpenseDateTime, created_at?: Date, updated_at?: Date, category?: string }) {
        super(expense.pk, expense.sk, expense.created_at, expense.updated_at);
        this.description = expense.description || '';
        this.value = expense.value || 0;
        this.isRecurring = expense.isRecurring || false;
        this.recurringStart = expense.isRecurring === true && !expense.recurringStart ? new ExpenseDateTime() : (new ExpenseDateTime(expense.recurringStart) || null);
        this.recurringEnd = expense.isRecurring === true && !expense.recurringEnd ? new ExpenseDateTime("2999-01-01 00:00:01") : (new ExpenseDateTime(expense.recurringEnd) || null);
        this.isPaid = expense.isPaid || false;
        this.category = expense.category || "";
    }

    description: string;
    value: number;
    isPaid: boolean;
    isRecurring: boolean;
    recurringStart: ExpenseDateTime | null;
    recurringEnd: ExpenseDateTime | null;
    category: string;


    // Recurring Expenses functions
    getTotalInstallment(): number {
        if (this.isRecurring && this.recurringStart && this.recurringEnd) {
            var months;
            months = (this.recurringEnd.getFullYear() - this.recurringStart.getFullYear()) * 12;
            months -= this.recurringStart.getMonth();
            months += this.recurringEnd.getMonth();
            return months <= 0 ? 0 : months;
        } else {
            return 0;
        }
    }

    getRemainingInstallment(): number {
        if (this.isRecurring && this.recurringStart && this.recurringEnd) {
            var _currentDate = new ExpenseDateTime();
            _currentDate.setMonth(_currentDate.getMonth() + 1);
            var months;
            months = (this.recurringEnd.getFullYear() - _currentDate.getFullYear()) * 12;
            months -= _currentDate.getMonth();
            months += this.recurringEnd.getMonth();
            return months <= 0 ? 0 : months;
        } else {
            return 0;
        }
    }

    getExpenseFullValue(): number {
        if (this.isRecurring) {
            return this.value * this.getTotalInstallment();
        } else {
            return this.value;
        }
    }

    getExpenseRemainingFullValue(): number {
        if (this.isRecurring) {
            return this.value * this.getRemainingInstallment();
        } else {
            return this.value;
        }
    }

}