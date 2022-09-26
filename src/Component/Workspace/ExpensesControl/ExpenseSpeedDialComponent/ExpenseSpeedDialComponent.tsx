import React, { useState } from 'react'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { ExpenseInsertUpdateComponent } from '../ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent';
import { useEventHandlerContext } from '../../../../Context/EventHandlerContext';

import './ExpenseSpeedDialStyle.css';
import { MonthInsertUpdateComponent } from '../MonthInsertUpdateComponent/MonthInsertUpdateComponent';

const ExpenseSpeedDialComponent = () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showExpenseDialog, setShowExpenseDialog] = useState(false);
    const [showMonthDialog, setShowMonthDialog] = useState(false);

    const handleExpenseDialogOpen = () => setShowExpenseDialog(true);
    const handleExpenseDialogClose = () => { setShowExpenseDialog(false); setShowBackdrop(false); };

    const handleMonthDialogOpen = () => setShowMonthDialog(true);
    const handleMonthDialogClose = () => { setShowMonthDialog(false); setShowBackdrop(false); };

    const actions = [
        {
            icon: <NoteAddIcon />,
            name: 'Nova despesa',
            handlerAction: handleExpenseDialogOpen
        },
        {
            icon: <EventIcon />,
            name: 'Iniciar novo Mês',
            handlerAction: handleMonthDialogOpen
        },
    ];

    return (
        <>
            <Box>
                <Backdrop open={showBackdrop} />
                <SpeedDial
                    ariaLabel="Componente para cadastrar novas despesas"
                    sx={{ position: 'fixed', bottom: 45, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={() => { setShowBackdrop(false) }}
                    onOpen={() => { setShowBackdrop(true) }}
                    open={showBackdrop}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.handlerAction}
                        />
                    ))}
                </SpeedDial>
            </Box>
            <Dialog
                open={showExpenseDialog}
                onClose={handleExpenseDialogClose}
            >
                <DialogTitle align='left'>
                    Nova despesa
                    <IconButton
                        aria-label="close"
                        onClick={handleExpenseDialogClose}
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
                    <ExpenseInsertUpdateComponent onSuccess={handleExpenseDialogClose} onFailed={handleExpenseDialogClose} onCancel={handleExpenseDialogClose} />
                </DialogContent>
            </Dialog>
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
        </>

    );
}

export default ExpenseSpeedDialComponent