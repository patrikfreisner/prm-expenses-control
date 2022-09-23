import { Box, Breadcrumbs, Typography, Link, Grid, Divider, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpenseSpeedDialComponent from '../ExpenseSpeedDialComponent/ExpenseSpeedDialComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import './MonthBreadcrumbStyle.css'
import { deepOrange } from '@mui/material/colors';
import { ExpenseDateTime } from '../../../../Class/ExpenseClasses';

export const MonthBreadcrumbComponent = () => {

    const [month, setMonth] = useState(new ExpenseDateTime());

    /**
     * Criar pesquisa que colete dados de X tempo para trás e Y tempo para frente dos registro de mês do usuário;
     * Armazenar em uma context API;
     * Coletar dados a partir da context API;
     * 
     * 
     * Status Mês:
     *  - Não há registro | Cor: ?
     *  - Há registro | Cor: ?
     *  - Mês esta fechado | Cor: ?
     *  - Mês atual | Cor: ?
     */

    const createMonthList = (currentMonth: ExpenseDateTime, backward: number, forward: number): Array<any> => {
        console.log(currentMonth);
        let breadcrumbConfigData: Array<any> = [];
        /**
         * Input: CurrentMonth, backward, forward;
         * {
         *      label: "08",
         *      index: "-1",
         *      hasMonthCreated: false
         * },
         * {
         *      label: "09",
         *      index: "0",
         *      hasMonthCreated: true
         * },
         * {
         *      label: "10",
         *      index: "1",
         *      hasMonthCreated: false
         * }
         */
        for (let i in Array.from(Array(backward).keys())) {
            let index = parseInt(i) - backward;
            let _month = new ExpenseDateTime(currentMonth);
            _month.setMonth(_month.getMonth() - -index);
            breadcrumbConfigData.push({
                label: _month.toString(),
                index: index,
                hasMonthCreated: false
            });
        }

        breadcrumbConfigData.push({
            label: currentMonth.toString(),
            index: 0,
            hasMonthCreated: false
        });

        for (let i in Array.from(Array(forward).keys())) {
            let index = parseInt(i) + 1;
            let _month = new ExpenseDateTime(currentMonth);
            _month.setMonth(_month.getMonth() + index);
            breadcrumbConfigData.push({
                label: _month.toString(),
                index: index,
                hasMonthCreated: false
            });
        }

        return breadcrumbConfigData;
    }

    useEffect(() => {
        console.log(createMonthList(month, 4, 1));
    });

    return (
        <Grid className='outline-box'>
            <Grid className='breadcrumb-box' item xs={12}>
                <Breadcrumbs
                    maxItems={1}
                    itemsAfterCollapse={1}
                    itemsBeforeCollapse={3}
                // component={() => <h6>Hello</h6>}
                >
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                        06
                    </Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                        07
                    </Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                        08
                    </Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                        09
                    </Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                        10
                    </Avatar>
                </Breadcrumbs>
            </Grid>
            <Grid className='divider-box' item xs={12}>
                <Divider />
            </Grid>
            <Grid className='accordion-box' item xs={12}>
                <Typography variant='h6'>
                    Details
                </Typography>
            </Grid>
        </Grid>
    )
}
