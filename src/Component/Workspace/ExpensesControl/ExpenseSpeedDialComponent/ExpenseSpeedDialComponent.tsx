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

const ExpenseSpeedDialComponent = () => {
    const { addAlertEvent } = useEventHandlerContext();

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseAction = () => setOpenDialog(true);
    const handleCloseDialog = () => { setOpenDialog(false); setOpen(false); };

    const actions = [
        {
            icon: <NoteAddIcon />,
            name: 'Nova despesa',
            handlerAction: handleCloseAction
        },
        {
            icon: <EventIcon />,
            name: 'Iniciar novo Mês',
            handlerAction: () => {
                addAlertEvent({
                    name: "TESTE",
                    message: "tes tes tes te te te",
                    type: 'info'
                })
            }
        },
    ];

    return (
        <>
            <Box>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="Componente para cadastrar novas despesas"
                    sx={{ position: 'fixed', bottom: 45, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
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
                open={openDialog}
                onClose={handleCloseDialog}
            // keepMounted  // dialog still exists when focussed out; I've take it off because form doesn't unregister itself;
            >
                <DialogTitle align='left'>
                    Nova despesa
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
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
                    <ExpenseInsertUpdateComponent onSuccess={handleCloseDialog} onFailed={handleCloseDialog} onCancel={handleCloseDialog} />
                </DialogContent>
            </Dialog>
        </>

    );
}

export default ExpenseSpeedDialComponent