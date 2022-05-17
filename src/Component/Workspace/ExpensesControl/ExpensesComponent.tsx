import { Grid } from "@mui/material"
import { useEffect } from "react"
import { isJSDocMemberName } from "typescript"
import { FixedExpense } from "../../../Class/fixed-expense"
import { RecurringExpense } from "../../../Class/recurring-expense"
import { VariableExpense } from "../../../Class/variable-expense"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { useLoginContext } from "../../../Context/LoginContext"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  const { expensesValues, variableExpenses, fixedExpenses, recurringExpenses, getUserExpenses } = useExpensesContext();

  const clk = () => {
    getUserExpenses().then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <button onClick={clk}>Get Expenses</button>
      <div style={{ color: "blue" }}>
        {JSON.stringify(expensesValues)}
      </div>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
      </Grid> */}
    </>
  )
}

export default ExpensesComponent