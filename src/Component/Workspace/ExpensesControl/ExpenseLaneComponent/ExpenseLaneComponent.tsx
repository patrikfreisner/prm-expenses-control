import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import ExpenseCardComponent from '../ExpenseCardComponent/ExpenseCardComponent'

// Style file
import './ExpenseLaneStyle.css'

function ExpenseLaneComponent() {
    return (
        <>
            <Grid item xs={12} md={12} lg={4}>
                <Box>
                    <Typography variant={'h4'} textAlign={'center'}> Recorrente </Typography>
                    <Stack direction={'row'} justifyContent={'space-around'}>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Itens </Typography>
                            <Typography variant='h6' textAlign={'center'}> 2 </Typography>
                        </Box>
                        <Box >
                            <Typography variant='h5' textAlign={'center'}> Total </Typography>
                            <Typography variant='h6' textAlign={'center'}> R$ 2.900,00 </Typography>
                        </Box>
                    </Stack>
                </Box>
                <Divider orientation='horizontal' sx={{ margin: 2 }} />
                <Stack spacing={0.5}>
                    <ExpenseCardComponent />
                    <ExpenseCardComponent />
                    <ExpenseCardComponent />
                    <ExpenseCardComponent />
                </Stack>
            </Grid>
        </>
    )
}

export default ExpenseLaneComponent