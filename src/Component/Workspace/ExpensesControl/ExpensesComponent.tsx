import { Box, Grid, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Expense, ExpenseDateTime } from "../../../Class/ExpenseClasses"
import { useEventHandlerContext } from "../../../Context/EventHandlerContext"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"
import { MonthBreadcrumbComponent } from "./MonthBreadcrumbComponent/MonthBreadcrumbComponent"

const ExpensesComponent = () => {
  const { currentMonth, getUserExpenses, getUserMonths, loadUserExpenses, preProccessUserExpenses } = useExpensesContext();
  const { addAlertEvent } = useEventHandlerContext();

  // const [currentTab, setCurrentTab] = useState(0);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setCurrentTab(newValue);
  // };

  // let _month = new ExpenseDateTime();
  // _month.setMonth(_month.getMonth() - 2);

  // loadUserExpenses(_month).then(
  //   (data: any) => {
  //     let _data: Array<Expense> = preProccessUserExpenses(data);
  //   }
  // );

  useEffect(() => {
    getUserMonths(new ExpenseDateTime()).then(() => {
    }).catch(() => {
      addAlertEvent({
        name: "MONTHS_RETRIEVE",
        message: "Um problema ocorreu ao carregar suas informações (Mês atual e cadastrados), você está conectado a internet?",
        type: "error"
      });
    });
  }, [])

  useEffect(() => {
    getUserExpenses().catch(() => {
      addAlertEvent({
        name: "EXPENSES_RETRIEVE",
        message: "Um problema ocorreu ao carregar suas informações, você está conectado a internet?",
        type: "error"
      });
    });
  }, [currentMonth]);

  return (
    <>
      <Grid className="expensesLaneContainer" container spacing={2}>
        <MonthBreadcrumbComponent />
        <ExpenseLaneComponent name={"Recorrente"} type={"RECURRING_EXPENSE"} />
        <ExpenseLaneComponent name={"Variavel"} type={"VARIABLE_EXPENSE"} />
        <ExpenseLaneComponent name={"Fixa"} type={"FIXED_EXPENSE"} />
      </Grid>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent