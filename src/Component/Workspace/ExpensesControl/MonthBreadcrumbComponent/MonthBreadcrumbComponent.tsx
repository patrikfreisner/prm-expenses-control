import { Box, Breadcrumbs, Typography, Link, Grid, Divider, Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpenseSpeedDialComponent from '../ExpenseSpeedDialComponent/ExpenseSpeedDialComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import './MonthBreadcrumbStyle.css'
import { deepOrange, blue, grey, green } from '@mui/material/colors';
import { ExpenseDateTime, Month } from '../../../../Class/ExpenseClasses';
import { useExpensesContext } from '../../../../Context/ExpensesContext';

export const MonthBreadcrumbComponent = () => {

    const { monthValues, currentMonth, setCurrentMonth } = useExpensesContext();
    const [month, setMonth] = useState(new Array<Month>());
    const [currentTabIndex, setcurrentTabIndex] = useState(Number);

    useEffect(() => {
        if (currentMonth.getDateObject().getMonth() === 0) {
            createMonthList(1, 4);
        } else if (currentMonth.getDateObject().getMonth() === 11) {
            createMonthList(4, 1);
        } else {
            if (!currentTabIndex) {
                createMonthList(3, 1);
            } else if (currentTabIndex === 4) {
                createMonthList(currentTabIndex - 1, 1);
            } else {
                createMonthList(currentTabIndex, 4 - currentTabIndex);
            }
        }
    }, [monthValues, currentMonth, currentTabIndex]);

    const createMonthList = (backward: number, forward: number) => {
        let createdMonthList: Array<Month> = [];

        for (let i in Array.from(Array(backward).keys())) {
            let index = parseInt(i) - backward;
            let _month = new ExpenseDateTime(currentMonth.getDateObject());
            _month.setMonth(_month.getMonth() - -index);

            // if (_month.getFullYear() == currentMonth.getDateObject().getFullYear()) {
            let _monthObj: Month = new Month({ sk: "MONTH#" + _month.toFilterString() });
            createdMonthList.push(_monthObj);
            // }
        }

        if (!currentTabIndex) setcurrentTabIndex(createdMonthList.length);
        createdMonthList.push(currentMonth);

        for (let i in Array.from(Array(forward).keys())) {
            let index = parseInt(i) + 1;
            let _month = new ExpenseDateTime(currentMonth.getDateObject());
            _month.setMonth(_month.getMonth() + index);

            let _monthObj: Month = new Month({ sk: "MONTH#" + _month.toFilterString() });
            // if (_month.getFullYear() == currentMonth.getDateObject().getFullYear()) {
            createdMonthList.push(_monthObj);
            // }
        }

        createdMonthList = createdMonthList.map((item: Month) => {
            let _month: Array<Month> = monthValues.filter((result: Month) => result.getDateObject().toFilterString() == item.getDateObject().toFilterString());
            return _month.length > 0 ? _month[0] : item;
        });

        setMonth(createdMonthList);
    }

    const handleChangeMonth = (_month: Month, index: number) => {
        setcurrentTabIndex(index);
        setCurrentMonth(_month);
    }

    const handleSquareColor = (item: Month) => {
        if (item.getDateObject().toString() == currentMonth.getDateObject().toString()) {
            return blue[700];
        } else if (item.isClosedMonth == true) {
            return green[700];
        } else if (item.hasMonthCreated() && item.getDateObject().toString() != currentMonth.getDateObject().toString()) {
            return deepOrange[500];
        } else {
            return grey[500];
        }
    }

    return (
        <Grid className='outline-box'>
            <Grid item xs={12}>
                <Avatar key={currentMonth.pk + currentMonth.sk}
                    sx={{ bgcolor: blue[700], width: "100%" }}
                    variant="square">
                    {currentMonth.getDateObject().getFullYear()}
                </Avatar>
            </Grid>
            <Grid className='breadcrumb-box' item xs={12}>
                <Breadcrumbs
                    itemsAfterCollapse={3}
                    itemsBeforeCollapse={3}
                // maxItems={5}
                >
                    {month.map((item: Month, index: number) => {
                        return (
                            <Avatar key={item.pk + item.sk}
                                sx={{ bgcolor: handleSquareColor(item) }}
                                variant="square"
                                onClick={() => handleChangeMonth(item, index)}>
                                {item.getDateObject().getFormatedMonth()}
                            </Avatar>
                        );
                    })}
                </Breadcrumbs>
            </Grid>
        </Grid>
    )
}
