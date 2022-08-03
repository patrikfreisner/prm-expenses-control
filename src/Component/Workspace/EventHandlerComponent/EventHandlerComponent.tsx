import React from 'react'
import { Alert, Box, Fade, Grid, Grow, IconButton, Slide, Snackbar } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import { EventsEntry, useEventHandlerContext } from '../../../Context/EventHandlerContext';

export const EventHandlerComponent = () => {
    const { dialogAlerts, removeAlertEvent } = useEventHandlerContext();

    const removeEventItem = (eventName: EventsEntry) => {
        removeAlertEvent(eventName);
    };
    return (
        <Box sx={{ position: 'absolute' }}>
            {dialogAlerts.map((dialog) => {
                return (
                    <Snackbar
                        key={dialog.event_id}
                        open={!!dialogAlerts}
                        autoHideDuration={8000}
                        onClose={(_, reason) => {
                            if (reason !== "clickaway") removeEventItem(dialog);
                        }}
                        TransitionComponent={(props) => (<Grow {...props} in={!!dialogAlerts}
                            {...(dialogAlerts ? { timeout: 700 } : {})} />)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert severity={dialog.type}
                            variant="filled"
                            // sx={{backgroundColor: }}
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    sx={{ p: 0.5 }}
                                    onClick={() => removeEventItem(dialog)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }>
                            {dialog.message}
                        </Alert>
                    </Snackbar>
                )
            })}
        </Box>
    )
}
