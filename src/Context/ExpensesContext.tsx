import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { Expense } from '../Class/ExpenseClasses';
import { queryItems, createItem } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

const TABLE = "PRMDB001";

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

    function getUserExpenses(): Promise<AxiosResponse<Expense, any>> {
        const response = queryItems(TABLE, {
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

    function createExpenses(values: Partial<Expense>): Promise<AxiosResponse<any, any>> {
        const response = createItem(TABLE, {
            Item: {
                ...values,
                pk: "",
                sk: ""
            }
        });

        return response;
    }

    return {
        expensesValues,
        getUserExpenses
    };
}