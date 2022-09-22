import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext } from 'react'
import { Expense, ExpenseDateTime } from '../Class/ExpenseClasses';
import { queryItems, createItem, updateItem, deleteItem } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

const TABLE = "PRMDB001";

interface ExpensesInterface {
    expensesValues: Expense[],
    setExpensesValues: Function,
    currentMonth: ExpenseDateTime,
    setCurrentMonth: Function
}

export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<Expense>());
    const [currentMonth, setCurrentMonth] = useState(new ExpenseDateTime());

    return (
        <ExpensesContext.Provider
            value={{
                expensesValues,
                setExpensesValues,
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
        currentMonth,
        setCurrentMonth
    } = useContext<ExpensesInterface>(ExpensesContext);

    const { userData } = useLoginContext();

    function getUserExpenses(refMonth?: ExpenseDateTime, avoidContext?: boolean): Promise<AxiosResponse<Expense, any>> {
        let _refMonth: ExpenseDateTime = refMonth || currentMonth;
        let _avoidContext: boolean = avoidContext || true;

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

    function loadUserExpenses(refMonth: ExpenseDateTime): Promise<AxiosResponse<Expense, any>> {
        return getUserExpenses(refMonth, false);
    }

    function preProccessUserExpenses(responseData: AxiosResponse<any, any>): Array<Expense> {
        let _expenseList: Array<Expense> = new Array<Expense>();
        responseData.data.Items.forEach((element: any) => {
            _expenseList.push(new Expense(element));
        });
        return _expenseList;
    }

    function createExpenses(values: Expense): Promise<AxiosResponse<any, any>> {
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
            // setExpensesValues([...expensesValues, values]);
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
        // No need to update current!
        // response.then((data) => {
        //     if (data.data.Attributes) setExpensesValues([...expensesValues, new Expense(data.data.Attributes)]);
        // });

        return response;
    }

    function deleteExpense(_deleteExpense: Expense): Promise<AxiosResponse<any, any>> {
        const response = deleteItem(TABLE, _deleteExpense.pk, _deleteExpense.sk);
        response.then(() => {
            setExpensesValues(expensesValues.filter((currentExpense: Expense) => {
                return currentExpense !== _deleteExpense;
            }))
        });
        return response;
    }

    return {
        expensesValues,
        getUserExpenses,
        createExpenses,
        updateExpenses,
        updateIsPaidExpenses,
        deleteExpense,
        loadUserExpenses,
        preProccessUserExpenses
    };
}