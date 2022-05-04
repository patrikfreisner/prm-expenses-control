import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpensesComponent = () => {

  return (
    <>
      <Paper elevation={1}>
        <Box sx={{ backgroundColor: "#e2e2e2", borderRadius: 1, display: "flex", alignContent: "space-around", justifyContent: "space-between" }}>
          <Stack sx={{ padding: 1, width: "50vw" }}>
            <Box>
              <Typography> NuBank </Typography>
            </Box>
            <Box className="dddsadsa">
              <Typography> R$ 1.450,00 </Typography>
            </Box>
          </Stack>
          <Box sx={{ width: "50vw", display: "flex", justifyContent: "space-around", alignContent: "space-around" }}>
            <PaidIcon />
            <EditIcon />
            <ExpandMoreIcon />
          </Box>
        </Box>
      </Paper>
      <div>ExpensesComponent</div>
    </>
  )
}

export default ExpensesComponent