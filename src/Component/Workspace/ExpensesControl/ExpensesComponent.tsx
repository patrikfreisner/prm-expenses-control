import { Grid } from "@mui/material"
import { useEffect } from "react"
import { FixedExpense } from "../../../Class/fixed-expense"
import { RecurringExpense } from "../../../Class/recurring-expense"
import { VariableExpense } from "../../../Class/variable-expense"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { useLoginContext } from "../../../Context/LoginContext"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  const { variableExpenses, fixedExpenses, recurringExpenses, getUserExpenses } = useExpensesContext();

  const clk = () => {
    getUserExpenses().then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <button onClick={clk}>Get Expenses</button>
      <div style={{ color: "blue" }}>
        {variableExpenses.map((item: VariableExpense) => {
          return <p key={item.pk + item.sk + item.sys_class_name}> {item.sys_class_name} - {item.description} </p>
        })}
      </div>
      <div style={{ color: "orange" }}>
        {fixedExpenses.map((item: FixedExpense) => {
          return <p key={item.pk + item.sk + item.sys_class_name}> {item.sys_class_name} - {item.description} </p>
        })}
      </div>
      <div style={{ color: "red" }}>
        {recurringExpenses.map((item: RecurringExpense) => {
          return <p key={item.pk + item.sk + item.sys_class_name}> {item.sys_class_name} - {item.description} </p>
        })}
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