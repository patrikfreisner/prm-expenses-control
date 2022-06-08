import { AxiosResponse } from 'axios';
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'
import { Expense } from '../Class/ExpenseClasses';
import { queryItems, createItem } from '../Services/InvokeAWS/InvokeBaseDynamoDBAPI';
import { useLoginContext } from './LoginContext';

const TABLE = "PRMDB001";


export interface EventEntryParams {
    event_id?: string,
    name: string,
    message: string,
    type: "success" | "error" | "info"
}

interface ExpensesInterface {
    expensesValues: Array<Expense>,
    setExpensesValues: Function,
    dialogAlerts: Array<EventEntryParams>,
    setDialogAlerts: Function
}


export const ExpensesContext = createContext(new Object() as ExpensesInterface)
ExpensesContext.displayName = 'ExpensesContext'

export const ExpensesProvider = ({ children }: any) => {
    const [expensesValues, setExpensesValues] = useState(new Array<Expense>());
    const [dialogAlerts, setDialogAlerts] = useState(new Array<EventEntryParams>());

    return (
        <ExpensesContext.Provider
            value={{
                expensesValues,
                setExpensesValues,
                dialogAlerts,
                setDialogAlerts
            }}>
            {children}
        </ExpensesContext.Provider>
    );
}

export const useExpensesContext = () => {
    const {
        expensesValues,
        setExpensesValues,
        dialogAlerts,
        setDialogAlerts
    } = useContext<ExpensesInterface>(ExpensesContext);

    const { userData } = useLoginContext();

    function defineNewAlertEvent(alertValue: EventEntryParams): void {
        alertValue.event_id = "EVENT#" + alertValue.name + "#" + new Date().getTime();
        setDialogAlerts(...dialogAlerts, alertValue);
    }

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
            }
        });

        return response;
    }

    return {
        expensesValues,
        getUserExpenses,
        createExpenses,
        dialogAlerts,
        defineNewAlertEvent
    };
}