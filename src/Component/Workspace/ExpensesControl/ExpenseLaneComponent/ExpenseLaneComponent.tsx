import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
    const { expensesValues } = useExpensesContext();

    const [laneTotalValue, setLaneTotalValue] = useState(0);
    const [expenseLaneList, setExpenseLaneList] = useState(Array<Expense>());

    useEffect(() => {
        setExpenseLaneList(expensesValues.filter((expense: Expense) => {
            if (expense.getType() == type) {
                let _sum = laneTotalValue + expense.value;
                setLaneTotalValue(_sum);
                return expense;
            }
        }));
    }, [expensesValues, expenseLaneList]);

    return (
        <>
            <Grid item xs={12} md={12} lg={4}>
                <Box>
                    <Typography variant={'h4'} textAlign={'center'}> {name} </Typography>
                    <Stack direction={'row'} justifyContent={'space-around'}>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Itens </Typography>
                            <Typography variant='h6' textAlign={'center'}> 2 </Typography>
                        </Box>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Total </Typography>
                            <Typography variant='h6' textAlign={'center'}>
                                <NumberFormat
                                    displayType="text"
                                    value={laneTotalValue}
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
                    {expenseLaneList && expenseLaneList.map((item: Expense) => {
                        if (item.getType() == type) {
                            return <ExpenseCardComponent key={item.pk + item.sk} expense={item} />;
                        }
                    })}
                </Stack>
            </Grid>
        </>
    )
}

export default ExpenseLaneComponent