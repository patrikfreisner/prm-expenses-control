import React, { useRef, useState } from 'react'
import { Expense } from '../../../../Class/ExpenseClasses';

// Stylesheet
import "./ExpenseCardStyle.css"

// MUI Components
import { Box, Grow, IconButton, Paper, Portal, Stack, Typography } from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NumberFormat from 'react-number-format';

// Interfaces configuration
interface PortalShowMoreDetailsInterface {
    showMore: boolean,
    container: React.MutableRefObject<null>,
    expense: Expense
}

const PortalShowMoreDetailsComponent = ({ showMore, container, expense }: PortalShowMoreDetailsInterface) => {
    return (
        <Portal container={container.current}>
            <Grow in={showMore}>
                <Box className="showMoreDetailsContainer">
                    <Typography variant='h6'> <b>{expense.description}</b> </Typography>
                    <Typography variant='body1'>
                        Valor:&nbsp;
                        <b><NumberFormat
                            displayType="text"
                            value={expense.value}
                            thousandSeparator="."
                            decimalSeparator=","
                            prefix="R$ "
                            isNumericString={true}
                            fixedDecimalScale={true}
                            decimalScale={2} /></b>
                    </Typography>
                    {expense.getType() === "RECURRING_EXPENSE" &&
                        <Box>
                            <hr style={{ width: "50%" }} />
                            <Typography variant='body1'> <b>Resumo da sua despesa</b> </Typography>
                            <Typography variant='body1'> Parcelas restantes: {expense.getRemainingInstallment()}</Typography>
                            <Typography variant='body1'> Valor restante:
                                <NumberFormat
                                    displayType="text"
                                    value={expense.getExpenseRemainingFullValue()}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                            <hr style={{ width: "50%" }} />
                            <Typography variant='body1'> <b>Detalhes adicionais</b> </Typography>
                            <Typography variant='body1'> Valor parcelado em {expense.getTotalInstallment()} vezes.</Typography>
                            <Typography variant='body1'> Valor total da despesa:&nbsp;
                                <NumberFormat
                                    displayType="text"
                                    value={expense.getExpenseFullValue()}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                            <Typography variant='body1'> Inicio em {expense.recurringStart?.toString()}</Typography>
                            <Typography variant='body1'> Fim previsto para {expense.recurringEnd?.toString()}</Typography>
                        </Box>
                    }
                </Box>
            </Grow>
        </Portal>
    );
}

interface ExpenseCardComponentParams {
    expense: Expense
}

const ExpenseCardComponent = ({ expense }: ExpenseCardComponentParams) => {
    const [isPaid, setIsPaid] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const container = useRef(null);

    return (
        <>
            <Paper elevation={1}>
                <Box className='cardContainer'>
                    <Stack className="expenseHeaderContainer">
                        <Box>
                            <Typography variant='h6' style={{ userSelect: 'none' }} noWrap> {expense.description} </Typography>
                        </Box>
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='body1' style={{ userSelect: 'none' }}>
                                <NumberFormat
                                    displayType="text"
                                    value={expense.value}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    isNumericString={true}
                                    fixedDecimalScale={true}
                                    decimalScale={2} />
                            </Typography>
                            |
                            <Typography variant='body1' style={{ userSelect: 'none' }}>
                                {(expense.getTotalInstallment() - expense.getRemainingInstallment())} de {expense.getTotalInstallment()}
                            </Typography>
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
            {showMore && <PortalShowMoreDetailsComponent showMore={showMore} container={container} expense={expense} />}
        </>

    )
}

export default ExpenseCardComponent