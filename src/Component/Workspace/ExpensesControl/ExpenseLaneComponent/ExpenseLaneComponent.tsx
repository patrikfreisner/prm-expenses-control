import { Grid, Stack } from '@mui/material'
import React from 'react'
import ExpenseCardComponent from '../ExpenseCardComponent/ExpenseCardComponent'

// Style file
import './ExpenseLaneStyle.css'

function ExpenseLaneComponent() {
    return (
        <>
            <Grid item xs={12} md={4}>
                <Stack spacing={0.5}>
                    <ExpenseCardComponent />
                    <ExpenseCardComponent />
                </Stack>
            </Grid>
        </>
    )
}

export default ExpenseLaneComponent