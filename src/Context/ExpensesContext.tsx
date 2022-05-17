import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { Expense } from '../Class/ExpenseClasses';
import { FixedExpense } from '../Class/fixed-expense';
import { RecurringExpense } from '../Class/recurring-expense';
import { VariableExpense } from '../Class/variable-expense';
import { queryItems } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

interface ExpensesInterface {
    expensesValues: Array<Expense>,
    setExpensesValues: Function,
}
export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<any>());

    return (
        <ExpensesContext.Provider
            value={{
                expensesValues,
                setExpensesValues
            }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export const useExpensesContext = () => {
    const {
        expensesValues,
        setExpensesValues
    } = useContext<ExpensesInterface>(ExpensesContext);

    const { userData } = useLoginContext();

    function getUserExpenses(): Promise<AxiosResponse<any, any>> {
        const response = queryItems("PRMDB001", {
            KeyConditionExpression: '#pk = :pk',
            ExpressionAttributeNames: {
                "#pk": "pk"
            },
            ExpressionAttributeValues: {
                ":pk": "USER#" + userData.sub
            }
        });
        response.then((response) => {
            setExpensesValues(response.data.Items);
        });
        return response;
    }

    return {
        expensesValues,
        getUserExpenses
    };
}