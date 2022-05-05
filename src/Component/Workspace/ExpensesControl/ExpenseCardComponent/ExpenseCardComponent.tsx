import React, { useRef, useState } from 'react'

// Stylesheet
import "./ExpenseCardStyle.css"

// MUI Components
import { Box, Grow, IconButton, Paper, Portal, Stack, Typography } from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Interfaces configuration
interface PortalShowMoreDetailsInterface {
    showMore: boolean,
    container: React.MutableRefObject<null>
}

const PortalShowMoreDetailsComponent = ({ showMore, container }: PortalShowMoreDetailsInterface) => {
    return (
        <Portal container={container.current}>
            <Grow in={showMore}>
                <Box className="showMoreDetailsContainer"></Box>
            </Grow>
        </Portal>
    );
}

const ExpenseCardComponent = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const container = useRef(null);

    return (
        <>
            <Paper elevation={1}>
                <Box className='cardContainer'>
                    <Stack className="expenseHeaderContainer">
                        <Box>
                            <Typography variant='h6' style={{ userSelect: 'none' }} noWrap> NuBank contas de cartão de crdito </Typography>
                        </Box>
                        <Box>
                            <Typography variant='body1' style={{ userSelect: 'none' }}> R$ 1.450,00 </Typography>
                        </Box>
                    </Stack>
                    <Box className="cardIconsContainer">
                        <IconButton aria-label="Marcar como pago" sx={{ color: isPaid === true ? '#3ec400' : 'grey' }} size="large" onClick={() => {
                            setIsPaid(!isPaid);
                        }}>
                            <PaidIcon className="cardIcons" />
                        </IconButton>
                        <IconButton aria-label="Editar despesa" size="large" disabled={isPaid}>
                            <EditIcon className="cardIcons" />
                        </IconButton>
                        <IconButton aria-label="Mostrar mais detalhes" size="large" onClick={() => {
                            setShowMore(!showMore);
                        }}>
                            {
                                !showMore ?
                                    <ExpandMoreIcon className="cardIcons" />
                                    : <ExpandLessIcon className='cardIcons' />
                            }
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
            <Box ref={container} />
            {showMore ?
                <PortalShowMoreDetailsComponent showMore={showMore} container={container} />
                : null}
        </>

    )
}

export default ExpenseCardComponent