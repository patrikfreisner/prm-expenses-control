import { Button, FormControlLabel, Grid, TextField, Tooltip, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useForm, Validate } from "react-hook-form"
import { Expense, ExpenseDateTime } from "../../../../Class/ExpenseClasses"
import { useEventHandlerContext } from "../../../../Context/EventHandlerContext"
import { useExpensesContext } from "../../../../Context/ExpensesContext"
import { ControlledDatePicker } from "../../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../../PrimumComponents/FormBuilderV2/ControlledTextField"

import "./ExpenseInsertUpdateStyle.css"

interface ExpenseInsertUpdateComponentParam {
    formInitialValue?: any,
    onSuccess?: Function,
    onFailed?: Function,
    onCancel?: Function
}
// DEFINE A METHOD TO FULLFILL OR EDIT 'PAID'
export const ExpenseInsertUpdateComponent = ({ formInitialValue, onSuccess, onFailed, onCancel, ...props }: ExpenseInsertUpdateComponentParam) => {
    const { createExpenses } = useExpensesContext();
    const { addAlertEvent } = useEventHandlerContext();

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

        createExpenses(expValues).then((response) => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "EXPENSE-CREATION-SUCCESS",
                message: "Despesa cadastrada com sucesso!",
                type: "success"
            });
            if (onSuccess) onSuccess();
        }).catch(() => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "EXPENSE-CREATION-FAILED",
                message: "Não foi possivel cadastrar despesa!",
                type: "error"
            });
            if (onFailed) onFailed();
        });
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
                <Grid className="form-action-button-container" item xs={12} container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Criar despesa </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button className="form-action-button" variant="outlined" color="error" onClick={() => { if (onCancel) onCancel(); }} disabled={isFormLoading}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
