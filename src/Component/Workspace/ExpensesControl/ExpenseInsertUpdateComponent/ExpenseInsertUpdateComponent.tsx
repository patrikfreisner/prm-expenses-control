import { Button, FormControlLabel, Grid, TextField, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useForm, Validate } from "react-hook-form"
import { ExpenseDateTime } from "../../../../Class/ExpenseClasses"
import { ControlledDatePicker } from "../../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../../PrimumComponents/FormBuilderV2/ControlledTextField"

import "./ExpenseInsertUpdateStyle.css"

export const ExpenseInsertUpdateComponent = () => {
    const _date: ExpenseDateTime = new ExpenseDateTime();
    let _maxDateRange: ExpenseDateTime = new ExpenseDateTime();
    _maxDateRange.setFullYear(_maxDateRange.getFullYear() + 1);

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
        if (watchForRecurringStart <= watchForRecurringEnd) return true;
        return false;
    }

    return (
        <>
            <Grid className="main-form-container" container spacing={2}>
                <Grid item xs={12}>
                    <ControlledTextField
                        className="formInput"
                        label={"Descrição"}
                        controller={formController}
                        name="description"
                        rules={{ required: true }}
                        autoComplete="false" />
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
                        autoComplete="false"
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
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
                        <Grid item xs={12} md={6} lg={6}>
                            <ControlledDatePicker
                                name={"recurring_start"}
                                controller={formController}
                                className="formInput"
                                label="Inicio da recorrencia: "
                                rules={{ required: true }}
                                datePickerOptions={{
                                    views: ["month", "year"],
                                    disabled: true
                                }}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <ControlledDatePicker
                                name={"recurring_end"}
                                controller={formController}
                                className="formInput"
                                label="Fim da recorrencia: "
                                datePickerOptions={{
                                    minDate: watchForRecurringStart,
                                    maxDate: _maxDateRange,
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
                <Grid className="form-action-button-container" item xs={12}>
                    <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Criar despesa </Button>
                </Grid>
            </Grid>
        </>
    )
}
