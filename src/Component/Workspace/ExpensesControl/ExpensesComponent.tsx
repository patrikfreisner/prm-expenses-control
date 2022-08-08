import { Box, Grid, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useEventHandlerContext } from "../../../Context/EventHandlerContext"
import { useExpensesContext } from "../../../Context/ExpensesContext"
import ExpenseLaneComponent from "./ExpenseLaneComponent/ExpenseLaneComponent"
import ExpenseSpeedDialComponent from "./ExpenseSpeedDialComponent/ExpenseSpeedDialComponent"

import "./ExpensesStyle.css"

const ExpensesComponent = () => {
  const { getUserExpenses } = useExpensesContext();
  const { addAlertEvent } = useEventHandlerContext();

  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    getUserExpenses().catch(() => {
      addAlertEvent({
        event_id: "EXPENSES_RETRIEVE",
        name: "EXPENSES_RETRIEVE",
        message: "Um problema ocorreu ao carregar suas informações, você está conectado a internet?",
        type: "error"
      });
    });
  }, []);

  return (
    <>
      <Grid className="expensesLaneContainer" container spacing={2}>
        <ExpenseLaneComponent name={"Recorrente"} type={"RECURRING_EXPENSE"} />
        <ExpenseLaneComponent name={"Variavel"} type={"VARIABLE_EXPENSE"} />
        <ExpenseLaneComponent name={"Fixa"} type={"FIXED_EXPENSE"} />
      </Grid>
      <ExpenseSpeedDialComponent />
      <Box style={{ position: "fixed", bottom: 0, left: 0, backgroundColor: "#e2e2e2", maxWidth: "100vw" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
          <Tab label="Item Six" />
          <Tab label="Item Seven" />
        </Tabs>
      </Box>
    </>
  )
}

export default ExpensesComponent