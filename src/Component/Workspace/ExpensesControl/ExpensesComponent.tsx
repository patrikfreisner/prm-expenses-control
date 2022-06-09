import { Alert, Box, Fade, Grid, IconButton, Slide, Snackbar } from "@mui/material"
import React, { ComponentType, ReactElement, useEffect, useState } from "react"
import { EventsEntry, useExpensesContext } from "../../../Context/ExpensesContext"
import { ExpenseInsertUpdateComponent } from "./ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"


import CloseIcon from '@mui/icons-material/Close';

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const { dialogAlerts, removeAlertEvent } = useExpensesContext();

  const removeEventItem = (eventName: EventsEntry) => {
    removeAlertEvent(eventName);
  };

  return (
    <>
      <div className="tstDivMain">
        {dialogAlerts.map((dialog) => {
          return (
            <Snackbar
              key={dialog.event_id}
              open={!!dialogAlerts}
              autoHideDuration={10000}
              TransitionComponent={(props) => (<Slide {...props} direction="up" />)}
              onClose={() => removeEventItem(dialog)}
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
      </div>
      {/* <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} />
        <ExpenseLaneComponent name={"Variavel"} />
        <ExpenseLaneComponent name={"Fixa"} />
      </Grid> */}
      <ExpenseSpeedDialComponent />
    </>
  )
}

export default ExpensesComponent