import { Box, Grid } from "@mui/material"
import React, { useState } from "react"
import { ExpenseInsertUpdateComponent } from "./ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {


  return (
    <>
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