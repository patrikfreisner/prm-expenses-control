import { AxiosResponse } from 'axios';
import { setMonth } from 'date-fns';
import React, { createContext, useState, useContext } from 'react'
import { Expense, ExpenseDateTime, Month } from '../Class/ExpenseClasses';
import { queryItems, createItem, updateItem, deleteItem } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

const TABLE = "PRMDB001";

interface ExpensesInterface {
    expensesValues: Expense[],
    setExpensesValues: Function,
    monthValues: Month[],
    setMonthValues: Function,
    currentMonth: Month,
    setCurrentMonth: Function
}

export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<Expense>());
    const [monthValues, setMonthValues] = useState(new Array<Month>());
    // Validate to set "currentMonth" as "Month" class;
    const [currentMonth, setCurrentMonth] = useState(new Month({}));

    return (
        <ExpensesContext.Provider
            value={{
                expensesValues,
                setExpensesValues,
                monthValues,
                setMonthValues,
                currentMonth,
                setCurrentMonth
            }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export const useExpensesContext = () => {
    const {
        expensesValues,
        setExpensesValues,
        monthValues,
        setMonthValues,
        currentMonth,
        setCurrentMonth
    } = useContext<ExpensesInterface>(ExpensesContext);

    const { userData } = useLoginContext();


    // //
    // Data Collection
    // //
    function getUserExpenses(refMonth?: ExpenseDateTime, avoidContext?: boolean): Promise<AxiosResponse<Expense, any>> {
        let _refMonth: ExpenseDateTime = refMonth || currentMonth.getDateObject();
        let _avoidContext: boolean = avoidContext || false;


        const response = queryItems(TABLE, {
            KeyConditionExpression: '#pk = :pk and begins_with(#sk, :sk)',
            ExpressionAttributeNames: {
                "#pk": "pk",
                "#sk": "sk"
            },
            ExpressionAttributeValues: {
                ":pk": "USER#" + userData.sub,
                ":sk": _refMonth.toFilterString()
            }
        });
        response.then((response) => {
            let expenseList: Array<Expense> = new Array<Expense>();
            response.data.Items.forEach((element: any) => {
                expenseList.push(new Expense(element));
            });

            if (!_avoidContext) setExpensesValues(expenseList);
        });

        return response;
    }

    function getUserMonths(currentDateMonth: ExpenseDateTime, avoidDefineCurrentMonth?: boolean): Promise<AxiosResponse<Month, any>> {
        avoidDefineCurrentMonth = avoidDefineCurrentMonth || false;
        currentDateMonth = currentMonth.getDateObject();

        const response = queryItems(TABLE, {
            KeyConditionExpression: '#pk = :pk and begins_with(#sk, :sk)',
            ExpressionAttributeNames: {
                "#pk": "pk",
                "#sk": "sk"
            },
            ExpressionAttributeValues: {
                ":pk": "USER#" + userData.sub,
                ":sk": "MONTH#" + currentDateMonth.getFullYear()
            }
        });
        response.then((response) => {
            let monthList: Array<Month> = new Array<Month>();
            response.data.Items.forEach((element: any) => {
                let _month: Month = new Month(element);
                if (!avoidDefineCurrentMonth && _month.getDateObject().toString() == new ExpenseDateTime().toString()) setCurrentMonth(_month);
                monthList.push(_month);
            });

            setMonthValues(monthList);
        });
        return response;
    }

    function createExpenses(values: Expense): Promise<AxiosResponse<Expense, any>> {
        values.pk = "USER#" + userData.sub;
        const response = createItem(TABLE, {
            Item: values,
            Expected: {
                "pk": {
                    Exists: false
                },
                "sk": {
                    Exists: false
                }
            },
            ReturnValues: 'ALL_OLD'
        });
        response.then((data) => {
            if (data.config.data) setExpensesValues([...expensesValues, new Expense(JSON.parse(data.config.data).Item)]);
        });

        return response;
    }

    function createMonth(values: Month): Promise<AxiosResponse<Month, any>> {
        values.pk = "USER#" + userData.sub;
        const response = createItem(TABLE, {
            Item: values,
            Expected: {
                "pk": {
                    Exists: false
                },
                "sk": {
                    Exists: false
                }
            },
            ReturnValues: 'ALL_OLD'
        });
        response.then((data) => {
            if (data.config.data) setMonthValues(new Month(JSON.parse(data.config.data).Item));
        });

        return response;
    }

    function updateExpenses(values: Expense): Promise<AxiosResponse<any, any>> {
        const response = createItem(TABLE, {
            Item: values,
            Expected: {
                "pk": {
                    Exists: true,
                    Value: values.pk
                },
                "sk": {
                    Exists: true,
                    Value: values.sk
                }
            },
            ReturnValues: 'NONE'
        });
        response.then(() => {
            let _tempExp: Expense[] = [];
            expensesValues.forEach((currentExpense: Expense) => {
                if (currentExpense.sk !== values.sk) {
                    _tempExp.push(currentExpense);
                } else {
                    _tempExp.push(values);
                }
            })
            setExpensesValues([..._tempExp, values]);
            console.log(expensesValues);
        });

        return response;
    }

    function updateMonth(values: Month): Promise<AxiosResponse<Month, any>> {
        const response = createItem(TABLE, {
            Item: values,
            Expected: {
                "pk": {
                    Exists: true,
                    Value: values.pk
                },
                "sk": {
                    Exists: true,
                    Value: values.sk
                }
            },
            ReturnValues: 'NONE'
        });
        response.then(() => {
            let _tempExp: Month[] = [];
            monthValues.forEach((_month: Month) => {
                if (_month.sk !== values.sk) {
                    _tempExp.push(_month);
                } else {
                    _tempExp.push(values);
                }
            })
            setMonthValues([..._tempExp, values]);
            console.log(monthValues);
        });

        return response;
    }

    function updateIsPaidExpenses(expense: Expense, isPaid: boolean): Promise<AxiosResponse<any, any>> {
        const response = updateItem(TABLE, {
            Key: {
                pk: expense.pk,
                sk: expense.sk
            },
            ExpressionAttributeValues: {
                ':isPaid': isPaid
            },
            UpdateExpression: 'SET isPaid = :isPaid',
            ReturnValues: 'ALL_NEW'
        });

        return response;
    }

    function deleteExpense(deleteExpense: Expense): Promise<AxiosResponse<any, any>> {
        const response = deleteItem(TABLE, deleteExpense.pk, deleteExpense.sk);
        response.then(() => {
            setExpensesValues(expensesValues.filter((currentExpense: Expense) => {
                return currentExpense !== deleteExpense;
            }))
        });
        return response;
    }

    function deleteMonth(deleteMonth: Month): Promise<AxiosResponse<any, any>> {
        const response = deleteItem(TABLE, deleteMonth.pk, deleteMonth.sk);
        response.then(() => {
            setExpensesValues(monthValues.filter((_month: Month) => {
                return _month !== deleteMonth;
            }))
        });
        return response;
    }

    // //
    // Services and Data manipulation
    // //
    function loadUserExpenses(refMonth: ExpenseDateTime): Promise<AxiosResponse<Expense, any>> {
        return getUserExpenses(refMonth, true);
    }

    function preProccessUserExpenses(responseData: AxiosResponse<any, any>): Array<Expense> {
        let _expenseList: Array<Expense> = new Array<Expense>();
        responseData.data.Items.forEach((element: any) => {
            _expenseList.push(new Expense(element));
        });
        return _expenseList;
    }

    function hasLastMonth(): boolean {
        let currentMonthPos: number = monthValues.indexOf(currentMonth);
        currentMonthPos = currentMonthPos - 1;

        if (currentMonthPos >= 0) return false;
        return monthValues[currentMonthPos].hasMonthCreated();
    }

    return {
        expensesValues,
        monthValues,
        currentMonth,
        setCurrentMonth,
        getUserExpenses,
        getUserMonths,
        createExpenses,
        createMonth,
        updateExpenses,
        updateMonth,
        updateIsPaidExpenses,
        deleteExpense,
        deleteMonth,
        loadUserExpenses,
        preProccessUserExpenses,
        hasLastMonth,
    };
}