import React from 'react'

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Slide, { SlideProps } from '@mui/material/Slide'

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EventIcon from '@mui/icons-material/Event';
import { Backdrop, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
                    ariaLabel="SpeedDial controlled open example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button onClick={handleCloseDialog}>Agree</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}

export default ExpenseSpeedDialComponent