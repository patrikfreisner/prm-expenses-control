import { Box, Breadcrumbs, Typography, Link, Grid, Divider, Avatar, Backdrop, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';

import './MonthBreadcrumbStyle.css'
import { deepOrange, blue, grey, green } from '@mui/material/colors';
import { ExpenseDateTime, Month } from '../../../../Class/ExpenseClasses';
import { useExpensesContext } from '../../../../Context/ExpensesContext';
import { MonthInsertUpdateComponent } from '../MonthInsertUpdateComponent/MonthInsertUpdateComponent';

export const MonthBreadcrumbComponent = () => {

    const { monthValues, currentMonth, setCurrentMonth } = useExpensesContext();
    const [month, setMonth] = useState(new Array<Month>());
    const [currentTabIndex, setcurrentTabIndex] = useState(Number);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showMonthDialog, setShowMonthDialog] = useState(false);

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

            if (_month.getFullYear() == currentMonth.getDateObject().getFullYear()) {
                let _monthObj: Month = new Month({ sk: "MONTH#" + _month.toFilterString() });
                createdMonthList.push(_monthObj);
            }
        }

        if (!currentTabIndex) setcurrentTabIndex(createdMonthList.length);
        createdMonthList.push(currentMonth);

        for (let i in Array.from(Array(forward).keys())) {
            let index = parseInt(i) + 1;
            let _month = new ExpenseDateTime(currentMonth.getDateObject());
            _month.setMonth(_month.getMonth() + index);

            let _monthObj: Month = new Month({ sk: "MONTH#" + _month.toFilterString() });
            if (_month.getFullYear() == currentMonth.getDateObject().getFullYear()) {
                createdMonthList.push(_monthObj);
            }
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

    const handleCreateMonth = () => {
        handleMonthDialogOpen();
    };

    const handleMonthDialogOpen = () => setShowMonthDialog(true);
    const handleMonthDialogClose = () => { setShowMonthDialog(false); setShowBackdrop(false); };

    return (
        <Grid className='outline-box'>
            <Backdrop open={showBackdrop} />
            <Grid item xs={12} style={{ display: "flex", justifyContent: 'space-evenly', alignItems: 'center' }}>
                {currentMonth.getDateObject().getMonth() == 0 &&
                    <>
                        <Avatar key={currentMonth.pk + currentMonth.sk + "0"}
                            sx={{ bgcolor: blue[700], flexGrow: 1 }}
                            onClick={() => {
                                var _month = currentMonth.getDateObject();
                                _month.setMonth(currentMonth.getDateObject().getMonth() - 1);
                                handleChangeMonth(new Month({ sk: "MONTH#" + _month.toFilterString() }), 0)
                            }}
                            variant="square">
                            {currentMonth.getDateObject().getFullYear() - 1}
                        </Avatar>
                        <ArrowBackIosNewIcon />
                    </>
                }

                <Avatar key={currentMonth.pk + currentMonth.sk}
                    sx={{ bgcolor: blue[700], flexGrow: 1 }}
                    variant="square">
                    {currentMonth.getDateObject().getFullYear()}
                </Avatar>

                {currentMonth.getDateObject().getMonth() == 11 &&
                    <>
                        <ArrowForwardIosIcon />
                        <Avatar key={currentMonth.pk + currentMonth.sk + "1"}
                            sx={{ bgcolor: blue[700], flexGrow: 1 }}
                            onClick={() => {
                                var _month = currentMonth.getDateObject();
                                _month.setMonth(currentMonth.getDateObject().getMonth() + 1);
                                handleChangeMonth(new Month({ sk: "MONTH#" + _month.toFilterString() }), 0)
                            }}
                            variant="square">
                            {currentMonth.getDateObject().getFullYear() + 1}
                        </Avatar>
                    </>
                }
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
                                onClick={() => {
                                    if (item.hasMonthCreated()) {
                                        handleChangeMonth(item, index);
                                    } else {
                                        handleCreateMonth();
                                    }
                                }}>
                                {item.getDateObject().getFormatedMonth()}
                            </Avatar>
                        );
                    })}
                </Breadcrumbs>
            </Grid>
            <Dialog
                open={showMonthDialog}
                onClose={handleMonthDialogClose}
            >
                <DialogTitle align='left'>
                    Novo mês
                    <IconButton
                        aria-label="close"
                        onClick={handleMonthDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <MonthInsertUpdateComponent onSuccess={handleMonthDialogClose} onFailed={handleMonthDialogClose} onCancel={handleMonthDialogClose} />
                </DialogContent>
            </Dialog>
        </Grid>
    )
}
