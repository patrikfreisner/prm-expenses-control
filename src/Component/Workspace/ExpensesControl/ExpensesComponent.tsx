import { Grid } from "@mui/material"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  return (
    <>
      <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
        <ExpenseLaneComponent />
      </Grid>
    </>
  )
}

export default ExpensesComponent