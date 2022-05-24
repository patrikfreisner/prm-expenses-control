import { Box, Button, Input, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import PrmFormBuilder from "../../PrimumComponents/FormBuilder/PrmFormBuilder"
import PrmFormInputText, { PrmFormMaskedInputText } from "../../PrimumComponents/FormBuilder/PrmFormInputText"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import NumberFormat from 'react-number-format';

import { Expense } from '../../../Class/ExpenseClasses'
import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  const [vle, setVle] = useState("");

  const [isFormLoading, setIsFormLoading] = useState(false);
  const { expensesValues, getUserExpenses } = useExpensesContext();
  const onSubmitHandler = (values: any) => {
    setIsFormLoading(true);
    setVle(JSON.stringify(values))
    setTimeout(() => {
      setIsFormLoading(false);
      console.log("Submitted!");
      console.log(values);
    }, 5000);
  }

  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
      </Grid> */}



      <Stack spacing={2} className="formBox">
        <Typography variant="h3" align="center">My new form</Typography>
        <PrmFormBuilder mode={"onBlur"} onSubmit={onSubmitHandler} defaultValues={{
          description: "Hello",
          value: "21321.00"
        }}>
          <PrmFormInputText className="formInput" name="description" rules={{ required: true }} />
          <PrmFormMaskedInputText className="formInput" name="value" rules={{ required: true }} />

          <Button variant="outlined" type="submit" disabled={isFormLoading}> Submit </Button>
        </PrmFormBuilder>
      </Stack>
      <div id="#th1">
        {vle}
      </div>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent