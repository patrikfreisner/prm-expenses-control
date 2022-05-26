import { Box, Button, Grid, Input, Stack, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import { ControlledTextField } from "../../PrimumComponents/FormBuilderV2/ControlledTextField"
import { FormBuilder } from "../../PrimumComponents/FormBuilderV2/PrmFormBuilderV2"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const formController = useForm({
    defaultValues: {
      description: "hi",
      value: 123.00
    },
    mode: "all"
  });

  const [isFormLoading, setIsFormLoading] = useState(false);
  const onSubmitHandler = (values: any) => {
    setIsFormLoading(true);
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
      <Grid container spacing={2}>
        <Typography variant="h3" align="center">My new form</Typography>
        <Grid item xs={12}>
          <ControlledTextField controller={formController} name="description" rules={{ required: true }} label={"Hello"} />
        </Grid>
        <Grid item xs={12}>
          <ControlledTextField controller={formController} name="value" rules={{ required: true }} label={"Value 2"} />
        </Grid>
        <Grid item xs={12}>
          {/* <PrmFormMaskedInputText className="formInput" name="value" label={"Valor"} rules={{ required: true }} mask={{
              thousandSeparator: ".",
              decimalSeparator: ",",
              prefix: "R$ ",
              fixedDecimalScale: true,
              decimalScale: 2
            }} /> */}
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Submit </Button>
        </Grid>
      </Grid>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent