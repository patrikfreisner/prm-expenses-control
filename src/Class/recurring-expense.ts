import { Expense } from './expense';

export class RecurringExpense extends Expense {
  constructor(recurringExpense: {
    pk?: string;
    sk?: string;
    description?: string;
    value?: number;
    start_month?: string;
    start_year?: string;
    installment?: number;
  }) {
    super(recurringExpense);
    this.start_month = recurringExpense.start_month || '';
    this.start_year = recurringExpense.start_year || '';
    this.installment = recurringExpense.installment || 1;
    this.isTotalAmmountPaid = false;
  }

  start_month: string;
  start_year: string;
  installment: number;
  isTotalAmmountPaid: boolean;
  originRecurringPk: string = '';
  originRecurringSk: string = '';
  sys_class_name: string = 'recurring_expense';

  // getCurrentInstallment(year?: string, month?: string, futureDate?: Date): number {
  //   var initDate = this._getStartDate();
  //   var currentDate: Date;
  //   if (year && month) {
  //     currentDate = this._getDateByYearMonth(year, month);
  //   } else {
  //     currentDate = futureDate || new Date();
  //   }

  //   var months;
  //   months = (currentDate.getFullYear() - initDate.getFullYear()) * 12;
  //   months -= initDate.getMonth();
  //   months += currentDate.getMonth() + 1;
  //   months = months <= 0 ? 0 : months;
  //   return months;
  // }

  // getEndDateOfRecurringExpense(): Date {
  //   var initDate = new Date();
  //   initDate = this._clearHourMinuteSeconds(initDate);
  //   initDate.setFullYear(parseInt(this.start_year));
  //   initDate.setMonth(parseInt(this.start_month) + this.installment);
  //   return initDate;
  // }

  // getTotalPrice(): number {
  //   return this.value * this.installment;
  // }

  // isExpensePaid(year?: string, month?: string, futureDate?: Date): boolean {
  //   let closed: boolean = false;

  //   if (this.getCurrentInstallment(year, month, futureDate) > this.installment) {
  //     closed = true;
  //   } else if (
  //     this._getCurrentDate().getTime() >=
  //     this.getEndDateOfRecurringExpense().getTime()
  //   ) {
  //     closed = true;
  //   } else {
  //     closed = false;
  //   }

  //   return closed;
  // }

  // setExpenseKeys(userId: string, month?: string, year?: string): void {
  //   let _pk = "";
  //   let _sk = "";
  //   if (this.start_month && this.start_year) {
  //     _pk = 'USER#' + userId;
  //     if (month && year) {
  //       _sk = parseInt(year) >= parseInt(this.start_year) ? year : this.start_year;
  //       _sk += "#";
  //       _sk += parseInt(month) >= parseInt(this.start_month) ? month : this.start_month;
  //       _sk += "#";
  //       _sk += this.sys_class_name;
  //       _sk += "#";
  //       _sk += new Date().getTime();
  //     } else {
  //       _sk = this.start_month + "#" + this.start_year + "#" + new Date().getTime();
  //     }
  //   } else {
  //     throw "setExpenseKeys() throw ERROR: Mandatory fields are not defined, please check if start_month && start_year are defined!";
  //   }

  //   this.pk = _pk;
  //   this.sk = _sk;
  // }

  // private _getDateByYearMonth(year: string, month: string): Date {
  //   var initDate = new Date();
  //   initDate = this._clearHourMinuteSeconds(initDate);
  //   initDate.setFullYear(parseInt(year));
  //   initDate.setMonth(parseInt(month));
  //   return initDate;
  // }

  // private _getStartDate(): Date {
  //   var initDate = new Date();
  //   initDate = this._clearHourMinuteSeconds(initDate);
  //   initDate.setFullYear(parseInt(this.start_year));
  //   initDate.setMonth(parseInt(this.start_month));
  //   return initDate;
  // }

  // private _getCurrentDate(): Date {
  //   var currentDate = new Date();
  //   currentDate = this._clearHourMinuteSeconds(currentDate);
  //   return currentDate;
  // }

  // private _clearHourMinuteSeconds(date: Date): Date {
  //   date.setHours(0);
  //   date.setMinutes(0);
  //   date.setSeconds(1);
  //   return date;
  // }
}