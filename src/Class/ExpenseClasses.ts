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

export class ExpenseDateTime extends Date {
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

    public toString = (): string => {
        let month: string = (this.getMonth() + 1).toString();
        month = month.length == 1 ? "0" + month : month;
        return `${month}/${this.getFullYear()}`;
    }

    public toFilterString = (): string => {
        let month: string = (this.getMonth() + 1).toString();
        month = month.length == 1 ? "0" + month : month;
        return `${this.getFullYear()}#${month}#`;
    }
}

export class Expense extends DynamoDBObject {
    constructor(expense: { pk?: string, sk?: string, description?: string, value?: number, isPaid?: boolean, isRecurring?: boolean, isFixed?: boolean, recurringStart?: ExpenseDateTime, recurringEnd?: ExpenseDateTime, created_at?: Date, updated_at?: Date, category?: string }) {
        super(expense.pk, expense.sk, expense.created_at, expense.updated_at);
        this.description = expense.description || '';
        this.value = expense.value || 0;
        this.isRecurring = expense.isRecurring || false;
        this.isFixed = expense.isFixed || false;
        this.recurringStart = expense.isRecurring === true && !expense.recurringStart ? new ExpenseDateTime() : (new ExpenseDateTime(expense.recurringStart) || null);
        this.recurringEnd = expense.isRecurring === true && !expense.recurringEnd ? new ExpenseDateTime("2999-01-01 00:00:01") : (new ExpenseDateTime(expense.recurringEnd) || null);
        this.recurringCurrentDate = expense.isRecurring === true && expense.isFixed == false ? new ExpenseDateTime() : this.recurringStart;
        this.isPaid = expense.isPaid || false;
        this.category = expense.category || "";
    }

    description: string;
    value: number;
    isPaid: boolean;
    isRecurring: boolean;
    isFixed: boolean;
    recurringStart: ExpenseDateTime | null;
    recurringEnd: ExpenseDateTime | null;
    recurringCurrentDate: ExpenseDateTime;
    category: string;


    // Recurring Expenses functions
    getTotalInstallment(): number {
        if (this.isRecurring && this.recurringStart && this.recurringEnd) {
            let months: number = 0;
            months = (this.recurringEnd.getFullYear() - this.recurringStart.getFullYear()) * 12;
            months -= this.recurringStart.getMonth();
            months += this.recurringEnd.getMonth();
            return (months + 1);
        } else {
            return 0;
        }
    }

    getRemainingInstallment(): number {
        if (this.isRecurring && this.isFixed == false && this.recurringStart && this.recurringEnd) {
            // var _currentDate = new ExpenseDateTime();
            // _currentDate.setMonth(_currentDate.getMonth() + 1);
            var months;
            months = (this.recurringEnd.getFullYear() - this.recurringCurrentDate.getFullYear()) * 12;
            months -= this.recurringCurrentDate.getMonth();
            months += this.recurringEnd.getMonth();
            return months;
        } else {
            return 0;
        }
    }

    getExpenseFullValue(): number {
        if (this.isRecurring && this.isFixed === false) {
            return this.value * this.getTotalInstallment();
        } else {
            return this.value;
        }
    }

    getExpenseRemainingFullValue(): number {
        if (this.isRecurring && this.isFixed === false) {
            return this.value * this.getRemainingInstallment();
        } else {
            return this.value;
        }
    }

    getType(): string {
        if (this.isFixed == true) {
            return "FIXED_EXPENSE";
        } else if (this.isFixed == false && this.isRecurring == true) {
            return "RECURRING_EXPENSE";
        } else {
            return "VARIABLE_EXPENSE";
        }
    }

}

export class Month extends DynamoDBObject {
    constructor(month: {
        pk?: string, sk?: string, income?: number, expenseResume?: number, isClosedMonth?: boolean
    }) {
        super(month.pk, month.sk);
        this.pk = month?.pk || '';
        this.sk = month?.sk || '';
        this.income = month?.income || 0;
        this.expenseResume = month?.expenseResume || 0;
        this.isClosedMonth = month?.isClosedMonth || false;
    }
    income: number;
    expenseResume: number;
    isClosedMonth: boolean;

    getYear(): string {
        return this.sk.split('#')[1] || '';
    }

    getMonth(): string {
        return this.sk.split('#')[2] || '';
    }

    getDateObject(): ExpenseDateTime {
        let date = new ExpenseDateTime();
        date.setMonth(parseInt(this.getMonth()) - 1);
        date.setFullYear(parseInt(this.getYear()));
        return date;
    }

    setMonthStdKeys(month: string, year: string): void {
        month = month.length == 1 ? '0' + month : month;

        this.sk =
            "MONTH" +
            '#' +
            year +
            '#' +
            month
    }
}