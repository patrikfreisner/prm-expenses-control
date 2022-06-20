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
            <hr></hr>
            <p> Description: {item.description}</p>
            <p> Value: {item.value}</p>
            <p> Category: {item.getType()}</p>
            {item.getType() === "RECURRING_EXPENSE" &&
              <div style={{ paddingLeft: 20 }}>
                <p> Start time: {item.recurringStart?.toLocaleDateString()}</p>
                <p> Current time: {item.recurringCurrentDate.toLocaleDateString()}</p>
                <p> End time: {item.recurringEnd?.toLocaleDateString()}</p>
                <p> Remaining Installment: {item.getRemainingInstallment()}</p>
                <p> Remaining Value: {item.getExpenseRemainingFullValue()}</p>
                <p> Remaining Full Value: {item.getExpenseRemainingFullValue()}</p>
                <p> Total Installment: {item.getTotalInstallment()}</p>
                <p> Expense total value: {item.getExpenseFullValue()}</p>
              </div>
            }
          </div>
        )
      })}
      <ExpenseSpeedDialComponent />
      <EventHandlerComponent />
    </>
  )
}

export default ExpensesComponent