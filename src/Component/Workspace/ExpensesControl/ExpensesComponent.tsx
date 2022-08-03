import { Grid } from "@mui/material"
import React, { useEffect, useMemo } from "react"
import { useEventHandlerContext } from "../../../Context/EventHandlerContext"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { EventHandlerComponent } from "../EventHandlerComponent/EventHandlerComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const { getUserExpenses } = useExpensesContext();
  const { addAlertEvent } = useEventHandlerContext();

  useEffect(() => {
    getUserExpenses()
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        addAlertEvent({
          event_id: "EXPENSES_RETRIEVE",
          name: "EXPENSES_RETRIEVE",
          message: "Um problema ocorreu ao carregar suas informações, você está conectado a internet?",
          type: "error"
        });
      });
  }, []);

  return (
    <>
      <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} type={"RECURRING_EXPENSE"} />
        <ExpenseLaneComponent name={"Variavel"} type={"VARIABLE_EXPENSE"} />
        <ExpenseLaneComponent name={"Fixa"} type={"FIXED_EXPENSE"} />
      </Grid>
      <ExpenseSpeedDialComponent />
      <EventHandlerComponent />
    </>
  )
}

export default ExpensesComponent