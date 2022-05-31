import { Button, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useForm, Validate } from "react-hook-form"
import { ControlledDatePicker } from "../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../PrimumComponents/FormBuilderV2/ControlledTextField"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const _date: Date = new Date();

  const formController = useForm({
    defaultValues: {
      description: "",
      value: "",
      isRecurring: false,
      recurring_start: _date,
      recurring_end: _date
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

  const validateMinDate: Validate<any> = () => {
    if (watchForRecurringStart < watchForRecurringEnd) return true;
    return false;
  }

  return (
    <>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent />
      </Grid> */}
      <Grid container spacing={2}>
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
        <Grid item xs={12} md={2} lg={2}>
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
            <Grid item xs={12} md={5} lg={5}>
              <ControlledDatePicker
                name={"recurring_start"}
                controller={formController}
                className="formInput"
                label="Inicio da recorrencia: "
                rules={{ required: true }}
                datePickerOptions={{
                  views: ["month", "year"]
                }}
              />
            </Grid>
            <Grid item xs={12} md={5} lg={5}>
              <ControlledDatePicker
                name={"recurring_end"}
                controller={formController}
                className="formInput"
                label="Fim da recorrencia: "
                datePickerOptions={{
                  minDate: watchForRecurringStart,
                  views: ["month", "year"]
                }}
                rules={{
                  required: true,
                  validate: validateMinDate
                }}
                messages={{
                  validate: watchForRecurringStart ? "Data não pode ser menor que " + (
                    (watchForRecurringStart.getMonth() + 1).toString().length == 1 ?
                      "0" + (watchForRecurringStart.getMonth() + 1) :
                      (watchForRecurringStart.getMonth() + 1)) + "/" + watchForRecurringStart.getFullYear() : ""
                }}
              />
            </Grid>
          </>}
        <Grid item xs={12}>
          <Button variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Criar despesa </Button>
        </Grid>
      </Grid>
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent