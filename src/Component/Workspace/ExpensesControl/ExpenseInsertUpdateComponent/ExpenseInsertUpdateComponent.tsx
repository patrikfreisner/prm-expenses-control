import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useForm, Validate } from "react-hook-form"
import { Expense, ExpenseDateTime } from "../../../../Class/ExpenseClasses"
import { useEventHandlerContext } from "../../../../Context/EventHandlerContext"
import { useExpensesContext } from "../../../../Context/ExpensesContext"
import { ControlledDatePicker } from "../../../PrimumComponents/FormBuilderV2/ControlledDatePicker"
import { ControlledNumericField } from "../../../PrimumComponents/FormBuilderV2/ControlledNumericField"
import { ControlledSwitch } from "../../../PrimumComponents/FormBuilderV2/ControlledSwitch"
import { ControlledTextField } from "../../../PrimumComponents/FormBuilderV2/ControlledTextField"
import CloseIcon from '@mui/icons-material/Close';

import "./ExpenseInsertUpdateStyle.css"
import NumberFormat from "react-number-format"
import { format } from "date-fns"

interface ExpenseInsertUpdateComponentParam {
    formInitialValue?: any,
    onSuccess?: Function,
    onFailed?: Function,
    onCancel?: Function
}
// DEFINE A METHOD TO FULLFILL OR EDIT 'PAID'
export const ExpenseInsertUpdateComponent = ({ formInitialValue, onSuccess, onFailed, onCancel, ...props }: ExpenseInsertUpdateComponentParam) => {
    const { createExpenses, updateExpenses } = useExpensesContext();
    const { addAlertEvent } = useEventHandlerContext();


    const [isFormLoading, setIsFormLoading] = useState(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const handleOpen = () => setShowConfirmationDialog(true);
    const handleClose = () => { setShowConfirmationDialog(false); }
    const [currentExpense, setCurrentExpense] = useState(new Expense({}));

    const _date: ExpenseDateTime = new ExpenseDateTime();
    let _maxDateRange: ExpenseDateTime = new ExpenseDateTime();
    _maxDateRange.setFullYear(_maxDateRange.getFullYear() + 4);

    let initialValues = formInitialValue || {
        description: "",
        value: "",
        isRecurring: false,
        isFixed: false,
        recurringStart: _date,
        recurringEnd: _date
    };

    const formController = useForm({
        defaultValues: initialValues,
        mode: "all"
    });

    const onSubmitHandler = (values: any) => {
        let expValues: Expense = new Expense(values);

        expValues.sk = expValues.recurringStart?.getFullYear() + "#" + (
            expValues.recurringStart ?
                expValues.recurringStart?.getMonth().toString().length > 1 ?
                    expValues.recurringStart?.getMonth() + 1 :
                    "0" + (expValues.recurringStart?.getMonth() + 1).toString()
                : 0) + "#" + expValues.getType() + "#" + new Date().getTime();

        if (expValues.isRecurring == false) {
            expValues.recurringStart = null;
            expValues.recurringEnd = null;

            confirmExpenseCreation(expValues);
        } else {
            setCurrentExpense(expValues);
            handleOpen();
        }
    }

    const confirmExpenseCreation = (expense: Expense) => {
        let expenseValue: Expense = expense || currentExpense;
        setIsFormLoading(true);
        createExpenses(expenseValue).then((response) => {
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

    const confirmExpenseUpdate = (expense: Expense) => {
        let expenseValue: Expense = expense || currentExpense;
        setIsFormLoading(true);
        updateExpenses(expenseValue).then((response) => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "EXPENSE-UPDATE-SUCCESS",
                message: "Despesa atualizada com sucesso!",
                type: "success"
            });
            if (onSuccess) onSuccess();
        }).catch(() => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "EXPENSE-UPDATE-FAILED",
                message: "Não foi possivel atualizar despesa!",
                type: "error"
            });
            if (onFailed) onFailed();
        });
    }

    const watchForIsRecurring = formController.watch("isRecurring");
    const watchForIsFixed = formController.watch("isFixed");
    const watchForRecurringStart = formController.watch("recurringStart");
    const watchForRecurringEnd = formController.watch("recurringEnd");

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
                                    <ControlledSwitch controller={formController} name="isFixed" rules={{}} />
                                }
                            />
                        </Grid>
                    </>}
                {watchForIsRecurring && !watchForIsFixed &&
                    <>
                        <Grid item xs={12} md={6} lg={6}>
                            <ControlledDatePicker
                                name={"recurringStart"}
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
                        {/* {!watchForIsFixed &&
                            <> */}
                        <Grid item xs={12} md={6} lg={6}>
                            <ControlledDatePicker
                                name="recurringEnd"
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
                        {/* </>} */}
                    </>}
                <Grid className="form-action-button-container" item xs={12} container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        {!formInitialValue
                            ?
                            <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Criar despesa </Button>
                            :
                            <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Atualizar despesa </Button>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button className="form-action-button" variant="outlined" color="error" onClick={() => { if (onCancel) onCancel(); }} disabled={isFormLoading}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={showConfirmationDialog}
                onClose={handleClose}
            >
                <DialogTitle align='left' sx={{ paddingRight: 6 }}>
                    <Typography variant="h5">Confirmar informações de despesa recorrente</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 10,
                            top: 13,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography> Descrição: {currentExpense.description}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography> Valor parc.:
                                <NumberFormat
                                    displayType="text"
                                    value={currentExpense.value}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography> Parcelas: {currentExpense.getTotalInstallment()}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography> Primeira parcela: {format(currentExpense.recurringStart || new Date(), "MM/yyyy")}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography> Ultima parcela: {format(currentExpense.recurringEnd || new Date(), "MM/yyyy")}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography> Total:
                                <NumberFormat
                                    displayType="text"
                                    value={currentExpense.getExpenseFullValue()}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {!formInitialValue
                                ?
                                <Button className="form-action-button" variant="outlined" onClick={() => {
                                    confirmExpenseCreation(currentExpense);
                                }} disabled={isFormLoading}> Criar </Button>
                                :
                                <Button className="form-action-button" variant="outlined" onClick={() => {
                                    confirmExpenseUpdate(currentExpense);
                                }} disabled={isFormLoading}> Atualizar </Button>}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button className="form-action-button" variant="outlined" color="error" onClick={() => {
                                handleClose();
                                setIsFormLoading(false);
                            }} disabled={isFormLoading}> Cancelar </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
