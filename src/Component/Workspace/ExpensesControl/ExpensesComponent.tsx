import React from "react"
import { EventHandlerComponent } from "../EventHandlerComponent/EventHandlerComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} />
        <ExpenseLaneComponent name={"Variavel"} />
        <ExpenseLaneComponent name={"Fixa"} />
      </Grid> */}
      <ExpenseSpeedDialComponent />
      <EventHandlerComponent />
    </>
  )
}

export default ExpensesComponent