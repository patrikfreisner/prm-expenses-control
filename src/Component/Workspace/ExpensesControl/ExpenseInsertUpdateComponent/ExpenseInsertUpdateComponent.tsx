import { jsx } from "@emotion/react"
import { Alert, Button, FormControlLabel, Grid, TextField, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useForm, Validate } from "react-hook-form"
import { JsxEmit } from "typescript"
import { Expense, ExpenseDateTime } from "../../../../Class/ExpenseClasses"
import { useExpensesContext } from "../../../../Context/ExpensesContext"
import { ControlledDatePicker } from "../../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../../PrimumComponents/FormBuilderV2/ControlledTextField"

import "./ExpenseInsertUpdateStyle.css"

interface ExpenseInsertUpdateComponentParam {
    formInitialValue?: any
}

export const ExpenseInsertUpdateComponent = ({ formInitialValue, ...props }: ExpenseInsertUpdateComponentParam) => {
    const { createExpenses, defineNewAlertEvent } = useExpensesContext();

    const _date: ExpenseDateTime = new ExpenseDateTime();
    let _maxDateRange: ExpenseDateTime = new ExpenseDateTime();
    _maxDateRange.setFullYear(_maxDateRange.getFullYear() + 1);

    let initialValues = formInitialValue || {
        description: "",
        value: "",
        isRecurring: false,
        isFixed: false,
        recurring_start: _date,
        recurring_end: _date
    };

    const formController = useForm({
        defaultValues: initialValues,
        mode: "all"
    });


    const [isFormLoading, setIsFormLoading] = useState(false);
    const onSubmitHandler = (values: any) => {
        setIsFormLoading(true);
        let expValues = new Expense(values);

        expValues.sk = expValues.recurringStart?.getFullYear() + "#" + (
            expValues.recurringStart ?
                expValues.recurringStart?.getMonth().toString().length > 1 ?
                    expValues.recurringStart?.getMonth() + 1 :
                    "0" + (expValues.recurringStart?.getMonth() + 1).toString()
                : 0) + "#" + expValues.getType() + "#" + new Date().getTime();

        if (expValues.isRecurring == false) {
            expValues.recurringStart = null;
            expValues.recurringEnd = null;
        }

        defineNewAlertEvent({
            name: "myNewName",
            message: "bla bla bla bla texto texto texto",
            type: "success"
        });

        // createExpenses(expValues).then((response) => {
        //     setIsFormLoading(false);
        //     alert("Created successfully!");
        //     console.log(response);
        // }).catch((err) => {
        //     setIsFormLoading(false);
        //     alert("An error ocurred!");
        //     console.warn(err);
        // });
    }

    const watchForIsRecurring = formController.watch("isRecurring");
    const watchForIsFixed = formController.watch("isFixed");
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
                <Grid item xs={12} md={6} lg={6}>
                    <FormControlLabel
                        label={"Recorrente?"}
                        labelPlacement={"top"}
                        control={
                            <ControlledSwitch controller={formController} name="isRecurring" rules={{}} />
                        }
                    />
                </Grid>
                {watchForIsRecurring &&
                    <>
                        <Grid item xs={12} md={6} lg={6}>
                            <FormControlLabel
                                label={"Desp. Fixa?"}
                                labelPlacement={"top"}
                                control={
                                    <Tooltip title="Despesas fixas são recorrencias sem data limite, como contas de luz, agua e outros afins!">
                                        <ControlledSwitch controller={formController} name="isFixed" rules={{}} />
                                    </Tooltip>
                                }
                            />
                        </Grid>
                    </>}
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
                        {!watchForIsFixed &&
                            <>
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
                    </>}
                <Grid className="form-action-button-container" item xs={12}>
                    <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Criar despesa </Button>
                </Grid>
            </Grid>
        </>
    )
}
