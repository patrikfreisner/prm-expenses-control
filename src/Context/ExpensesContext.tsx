import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react'
import { FixedExpense } from '../Class/fixed-expense';
import { RecurringExpense } from '../Class/recurring-expense';
import { VariableExpense } from '../Class/variable-expense';
import { queryItems } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

interface ExpensesInterface {
    expensesValues: any[],
    setExpensesValues: Function,
    variableExpenses: Array<VariableExpense>,
    setVariableExpenses: Function,
    recurringExpenses: Array<RecurringExpense>,
    setRecurringExpenses: Function,
    fixedExpenses: Array<FixedExpense>,
    setFixedExpenses: Function
}
export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<any>());
    const [variableExpenses, setVariableExpenses] = useState(new Array<VariableExpense>());
    const [recurringExpenses, setRecurringExpenses] = useState(new Array<RecurringExpense>());
    const [fixedExpenses, setFixedExpenses] = useState(new Array<FixedExpense>());

    return (
        <ExpensesContext.Provider
            value={{
                expensesValues,
                setExpensesValues,
                variableExpenses,
                setVariableExpenses,
                recurringExpenses,
                setRecurringExpenses,
                fixedExpenses,
                setFixedExpenses
            }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export const useExpensesContext = () => {
    const {
        expensesValues,
        setExpensesValues,
        variableExpenses,
        setVariableExpenses,
        recurringExpenses,
        setRecurringExpenses,
        fixedExpenses,
        setFixedExpenses
    } = useContext<ExpensesInterface>(ExpensesContext);

    useEffect(() => {
        classifyUserExpenses();
    }, [expensesValues]);

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

    function classifyUserExpenses() {
        if (!expensesValues) {
            setVariableExpenses([]);
            setFixedExpenses([]);
            setRecurringExpenses([]);
            return;
        };

        expensesValues.forEach((expItem: any) => {
            if (expItem.sys_class_name === "variable_expense") {
                setVariableExpenses([...variableExpenses, expItem]);
            } else if (expItem.sys_class_name === "fixed_expense") {
                setFixedExpenses([...fixedExpenses, expItem]);
            } else if (expItem.sys_class_name === "recurring_expense") {
                setRecurringExpenses([...recurringExpenses, expItem]);
            }
        });
    }

    return {
        expensesValues,
        variableExpenses,
        recurringExpenses,
        fixedExpenses,
        getUserExpenses
    };
}