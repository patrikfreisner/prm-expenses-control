import { Button, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ControlledDatePicker } from "../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../PrimumComponents/FormBuilderV2/ControlledTextField"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {

  const formController = useForm({
    defaultValues: {
      description: "Desc",
      value: 123.98,
      isRecurring: false,
      recurring_start: new Date(),
      recurring_end: new Date()
    },
    mode: "all"
  });


  const [isFormLoading, setIsFormLoading] = useState(false);
  const onSubmitHandler = (values: any) => {
    setIsFormLoading(true);
    setTimeout(() => {
      setIsFormLoading(false);
      console.log(values);
    }, 500);
  }

  const watchForIsRecurring = formController.watch("isRecurring");
  const watchForRecurringStart = formController.watch("recurring_start");
  const watchForRecurringEnd = formController.watch("recurring_end");

  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
      </Grid> */}
      <Grid container spacing={2}>
        <Typography variant="h3" align="center">My new form</Typography>
        <Grid item xs={12}>
          <ControlledTextField className="formInput" label={"Descrição"} controller={formController} name="description" rules={{ required: true }} />
        </Grid>
        <Grid item xs={12}>
          <ControlledNumericField
            className="formInput"
            label={"Valor"}
            controller={formController}
            name={"value"}
            rules={{ required: true }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label={"Recorrente?"}
            labelPlacement={"start"}
            control={
              <ControlledSwitch controller={formController} name="isRecurring" rules={{}} />
            }
          />
        </Grid>
        {watchForIsRecurring &&
          <>
            <Grid item xs={12} md={6}>
              <ControlledDatePicker
                className="formInput"
                label={"Inicio da recorrencia: "}
                controller={formController}
                name={"recurring_start"}
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledDatePicker
                className="formInput"
                label={"Fim da recorrencia: "}
                datePickerOptions={{
                  minDate: watchForRecurringStart
                }}
                controller={formController}
                name={"recurring_end"}
                rules={{ required: true }}
              />
            </Grid>
          </>}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Submit </Button>
        </Grid>
      </Grid>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent