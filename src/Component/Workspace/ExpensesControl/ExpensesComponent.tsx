import { Divider, Grid } from "@mui/material"
import ExpenseCardComponent from "./ExpenseCardComponent/ExpenseCardComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  return (
    <>
      <Grid container spacing={2}>
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
      </Grid>
    </>
  )
}

export default ExpensesComponent