import React from 'react'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Slide, { SlideProps } from '@mui/material/Slide'

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import { ExpenseInsertUpdateComponent } from '../ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent';

const actions = [
    { icon: <NoteAddIcon />, name: 'Nova despesa' },
    { icon: <EventIcon />, name: 'Iniciar novo Mês' },
];

const ExpenseSpeedDialComponent = () => {
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); };
    const handleCloseAction = () => setOpenDialog(true);
    const handleCloseDialog = () => { setOpenDialog(false); setOpen(false) };

    return (
        <>
            <Box>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="Componente para cadastrar novas despesas"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
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
                            onClick={handleCloseAction}
                        />
                    ))}
                </SpeedDial>
            </Box>
            <Dialog
                open={openDialog}
                keepMounted
                onClose={handleCloseDialog}
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
                    <ExpenseInsertUpdateComponent />
                </DialogContent>
            </Dialog>
        </>

    );
}

export default ExpenseSpeedDialComponent