import { Button, FormControlLabel, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ExpenseDateTime, Month } from '../../../../Class/ExpenseClasses';
import { useEventHandlerContext } from '../../../../Context/EventHandlerContext';
import { useExpensesContext } from '../../../../Context/ExpensesContext';
import { ControlledDatePicker } from '../../../PrimumComponents/FormBuilderV2/ControlledDatePicker';
import { ControlledNumericField } from '../../../PrimumComponents/FormBuilderV2/ControlledNumericField';
import { ControlledSwitch } from '../../../PrimumComponents/FormBuilderV2/ControlledSwitch';
import { ControlledTextField } from '../../../PrimumComponents/FormBuilderV2/ControlledTextField';

import "./MonthInsertUpdateStyle.css"

interface MonthInsertUpdateComponentParam {
    formInitialValue?: any,
    onSuccess?: Function,
    onFailed?: Function,
    onCancel?: Function
}

export const MonthInsertUpdateComponent = ({ formInitialValue, onSuccess, onFailed, onCancel, ...props }: MonthInsertUpdateComponentParam) => {
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [monthDateRef, setMonthDateRef] = useState(new ExpenseDateTime());
    const { createMonth } = useExpensesContext();
    const { addAlertEvent } = useEventHandlerContext();

    useEffect(() => {
        let _month: ExpenseDateTime = new ExpenseDateTime();
        _month.setMonth(_month.getMonth() + 1);
        setMonthDateRef(_month);
    }, []);

    let initialValues = formInitialValue || {
        income: "",
        expenseResume: "",
        isClosedMonth: ""
    };

    const formController = useForm({
        defaultValues: initialValues,
        mode: "all"
    });

    const onSubmitHandler = (values: any) => {
        let _month: Month = new Month(values);
        setIsFormLoading(true);

        if (!formInitialValue) {
            _month.setMonthStdKeys(monthDateRef.getMonth().toString(), monthDateRef.getFullYear().toString());
        }

        createMonth(_month).then(() => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "MONTH-CREATION-SUCCESS",
                message: "Mês criado com sucesso!!",
                type: "success"
            });
            if (onSuccess) onSuccess();
        }).catch(() => {
            setIsFormLoading(false);
            addAlertEvent({
                name: "MONTH-CREATION-FAILED",
                message: "Não foi possivel criar novo mês!",
                type: "error"
            });
            if (onFailed) onFailed();
        });
    }

    return (
        <>
            <Grid className="main-form-container" container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='body2'> Você irá criar o registro para {monthDateRef.toString()}! </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ControlledNumericField
                        className="formInput"
                        label={"Entradas"}
                        controller={formController}
                        name="income"
                        rules={{ required: true }}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        autoComplete="false"
                    />
                </Grid>
                {formInitialValue &&
                    <>
                        <Grid item xs={12}>
                            <ControlledNumericField
                                className="formInput"
                                label={"Resumo das despesas"}
                                controller={formController}
                                name="expenseResume"
                                rules={{}}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                autoComplete="false"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <FormControlLabel
                                label={"Mês está fechado?"}
                                labelPlacement={"top"}
                                control={
                                    <ControlledSwitch controller={formController} name="isClosedMonth" rules={{}} />
                                }
                            />
                        </Grid>
                    </>
                }
                <Grid className="form-action-button-container" item xs={12} container columnSpacing={2} rowSpacing={1}>
                    <Grid item xs={12} md={6}>
                        {!formInitialValue
                            ?
                            <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Começar um novo mês </Button>
                            :
                            <Button className="form-action-button" variant="outlined" onClick={formController.handleSubmit(onSubmitHandler)} disabled={isFormLoading}> Atualizar mês </Button>}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button className="form-action-button" variant="outlined" color="error" onClick={() => { if (onCancel) onCancel(); }} disabled={isFormLoading}> Cancelar </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
