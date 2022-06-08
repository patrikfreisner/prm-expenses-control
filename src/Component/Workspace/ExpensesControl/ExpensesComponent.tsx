import { Box, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { EventEntryParams, useExpensesContext } from "../../../Context/ExpensesContext"
import { ExpenseInsertUpdateComponent } from "./ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const { dialogAlerts } = useExpensesContext();

  return (
    <>
      <div className="tstDivMain">
        {dialogAlerts.map((dialog) => {
          return (
            <p key={dialog.event_id}>
              <span>{dialog.name}</span>
              <span>{dialog.message}</span>
              <span>{dialog.type}</span>
            </p>
          )
        })}
      </div>
      <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} />
        <ExpenseLaneComponent name={"Variavel"} />
        <ExpenseLaneComponent name={"Fixa"} />
      </Grid>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent