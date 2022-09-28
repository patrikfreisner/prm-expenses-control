import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import NumberFormat from 'react-number-format';
import { Expense } from '../../../../Class/ExpenseClasses';
import { useExpensesContext } from '../../../../Context/ExpensesContext';
import ExpenseCardComponent from '../ExpenseCardComponent/ExpenseCardComponent'

// Style file
import './ExpenseLaneStyle.css'

interface ExpenseLaneComponentParams {
    name: string;
    type: string;
}

function ExpenseLaneComponent({ name, type }: ExpenseLaneComponentParams) {
    const { currentMonth, expensesValues } = useExpensesContext();

    const [currentLaneExpenses, setCurrentLaneExpenses] = useState(Array<Expense>());
    const [expenseTotalValue, setExpenseTotalValue] = useState(0);

    useEffect(() => {
        setCurrentLaneExpenses(expensesValues.filter((item: Expense) => {
            if (item.getType() === type) {
                return item;
            }
        }));

        setExpenseTotalValue(currentLaneExpenses.reduce((count: number, expense: Expense) => {
            // We used "+" before values to make Typescript sum instead of concatenate
            return +count + +expense.value;
        }, 0));
    }, [expensesValues]);

    return (
        <>
            <Grid item xs={12} md={12} lg={4}>
                <Box>
                    <Typography variant={'h4'} textAlign={'center'}> {name} </Typography>
                    <Stack direction={'row'} justifyContent={'space-around'}>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Itens </Typography>
                            <Typography variant='h6' textAlign={'center'}> {currentLaneExpenses.length} </Typography>
                        </Box>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Total </Typography>
                            <Typography variant='h6' textAlign={'center'}>
                                <NumberFormat
                                    displayType="text"
                                    value={expenseTotalValue}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Divider orientation='horizontal' sx={{ margin: 2 }} />
                <Stack spacing={0.5}>
                    {currentLaneExpenses && currentLaneExpenses.map((item: Expense) => {
                        return <ExpenseCardComponent key={item.pk + item.sk} expense={item} />;
                    })}
                </Stack>
            </Grid>
        </>
    )
}

export default ExpenseLaneComponent