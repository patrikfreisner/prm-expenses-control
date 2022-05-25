import { Box, Button, Grid, Input, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { FormBuilder, PRMInputMark } from "../../PrimumComponents/FormBuilderV2/PrmFormBuilderV2"
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
      <FormBuilder onSubmit={onSubmitHandler} defaultValues={{}} mode={"all"}>
        {/* <TextField label="blablabla" defaultValue={"10102000"} /> */}
        {/* <TextField {...PRMInputMark} label="Gonna be a blast!" defaultValue={"Hellou????"} /> */}
        <Box>
          <TextField {...PRMInputMark} label="Gonna be a blast otherwise!" defaultValue={"Hellou3????"} />
        </Box>
      </FormBuilder>

      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
      </Grid> */}
      {/* <Grid container spacing={2}>
        <Typography variant="h3" align="center">My new form</Typography>
        <PrmFormBuilder mode={"onBlur"} onSubmit={onSubmitHandler} defaultValues={{
          description: "Parcela do carro",
          value: "21321.00"
        }}>
          <Grid item xs={12}>
            <PrmFormInputText className="formInput" name="description" label={"Descrição"} rules={{ required: true }} />
          </Grid>
          <Grid item xs={12}>
            <PrmFormMaskedInputText className="formInput" name="value" label={"Valor"} rules={{ required: true }} mask={{
              thousandSeparator: ".",
              decimalSeparator: ",",
              prefix: "R$ ",
              fixedDecimalScale: true,
              decimalScale: 2
            }} />
          </Grid>

          <Button variant="outlined" type="submit" disabled={isFormLoading}> Submit </Button>
        </PrmFormBuilder>
      </Grid> */}
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent