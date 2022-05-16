export class MonthStandard {
  constructor(monthStd?: {
    pk?: string;
    sk?: string;
    income?: number;
    expenseResume?: number;
    isClosedMonth?: boolean;
  }) {
    this.pk = monthStd?.pk || '';
    this.sk = monthStd?.sk || '';
    this.income = monthStd?.income || 0;
    this.expenseResume = monthStd?.expenseResume || 0;
    this.isClosedMonth = monthStd?.isClosedMonth || false;
    this.year = this.sk ? this.sk.split('#')[1] : '';
    this.month = this.sk ? this.sk.split('#')[2] : '';
  }

  pk: string;
  sk: string; // month-standard#<year>#<month>#<timestamp>

  income: number;
  expenseResume: number;
  isClosedMonth: boolean;
  sys_class_name: string = 'month-standard';

  private year: string;
  private month: string;

  getYear(): string {
    return this.year;
  }

  getMonth(): string {
    return this.month;
  }

  getDateObject(): Date {
    let date = new Date();
    date.setMonth(parseInt(this.getMonth()) - 1);
    date.setFullYear(parseInt(this.getYear()));
    return date;
  }

  setMonthStdKeys(userId: string, month: string, year: string): void {
    this.pk = 'USER#' + userId;
    month = month.length == 1 ? '0' + month : month;

    this.sk =
      this.sys_class_name +
      '#' +
      year +
      '#' +
      month +
      '#';
  }
}
