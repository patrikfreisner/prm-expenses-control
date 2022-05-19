import { Grid, TextField } from "@mui/material"
import { useEffect } from "react"
import { isJSDocMemberName } from "typescript"
import { FixedExpense } from "../../../Class/fixed-expense"
import { RecurringExpense } from "../../../Class/recurring-expense"
import { VariableExpense } from "../../../Class/variable-expense"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { useLoginContext } from "../../../Context/LoginContext"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  const { expensesValues, getUserExpenses } = useExpensesContext();

  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
      </Grid> */}
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent