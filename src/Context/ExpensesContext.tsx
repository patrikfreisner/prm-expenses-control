import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext } from 'react'
import { Expense } from '../Class/ExpenseClasses';
import { queryItems, createItem } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

const TABLE = "PRMDB001";

interface ExpensesInterface {
    expensesValues: Expense[],
    setExpensesValues: Function,
}

export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<Expense>());

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
            let expenseList: Array<Expense> = new Array<Expense>();
            response.data.Items.forEach((element: any) => {
                expenseList.push(new Expense(element));
            });

            setExpensesValues(expenseList);
        });
        return response;
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

    return {
        expensesValues,
        getUserExpenses,
        createExpenses,
    };
}