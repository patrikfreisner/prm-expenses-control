import { Grid } from "@mui/material"
import React, { useEffect, useMemo } from "react"
import { Expense } from "../../../Class/ExpenseClasses"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { EventHandlerComponent } from "../EventHandlerComponent/EventHandlerComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const { getUserExpenses, expensesValues } = useExpensesContext();

  useEffect(() => {
    getUserExpenses()
      .then((response) => {
        console.log(response);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} />
        <ExpenseLaneComponent name={"Variavel"} />
        <ExpenseLaneComponent name={"Fixa"} />
      </Grid> */}
      {expensesValues && expensesValues.map((item: Expense) => {
        return (
          <div key={item.pk + "_" + item.sk}>
            <p> Description: {item.description}</p>
            <p> Value: {item.getExpenseFullValue()}</p>
            <p> Category: {item.category}</p>
          </div>
        )
      })}
      <ExpenseSpeedDialComponent />
      <EventHandlerComponent />
    </>
  )
}

export default ExpensesComponent