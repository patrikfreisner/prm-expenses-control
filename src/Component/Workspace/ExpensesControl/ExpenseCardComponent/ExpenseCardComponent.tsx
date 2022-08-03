import React, { useEffect, useRef, useState } from 'react'
import { Expense } from '../../../../Class/ExpenseClasses';

// Stylesheet
import "./ExpenseCardStyle.css"

// MUI Components
import { Box, Button, Dialog, DialogContent, DialogTitle, Grow, IconButton, Paper, Portal, Stack, Typography } from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import NumberFormat from 'react-number-format';
import { useExpensesContext } from '../../../../Context/ExpensesContext';
import { useEventHandlerContext } from '../../../../Context/EventHandlerContext';
import { ExpenseInsertUpdateComponent } from '../ExpenseInsertUpdateComponent/ExpenseInsertUpdateComponent';

// Interfaces configuration
interface PortalShowMoreDetailsInterface {
    showMore: boolean,
    container: React.MutableRefObject<null>,
    expense: Expense,
    isPaid: boolean
}

const PortalShowMoreDetailsComponent = ({ showMore, container, expense, isPaid }: PortalShowMoreDetailsInterface) => {
    const { addAlertEvent } = useEventHandlerContext();
    const { deleteExpense } = useExpensesContext();

    const deleteExpenseHandler = () => {
        deleteExpense(expense).then(() => {
            // TODO: SUCCESS
            addAlertEvent({
                event_id: expense.pk + expense.sk,
                name: expense.pk + expense.sk,
                message: "A despesa foi excluida com sucesso!",
                type: "success"
            });
        }).catch(() => {
            // TODO: ERROR
            addAlertEvent({
                event_id: expense.pk + expense.sk,
                name: expense.pk + expense.sk,
                message: "Houve um problema ao deletar o item " + expense.description + "!",
                type: "error"
            });
        });
    };

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
                            <Typography variant='body1'> Parcela atual: {expense.getTotalInstallment() - expense.getRemainingInstallment()}</Typography>
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
                            <Typography variant='body1'> Primeira parcela paga em {expense.recurringStart?.toString()}</Typography>
                            <Typography variant='body1'> Ultima parcela prevista para {expense.recurringEnd?.toString()}</Typography>
                        </Box>
                    }
                    <Box style={{ marginTop: 10, paddingBottom: 10 }}>
                        <Button variant='contained' color='error' onClick={() => {
                            if (isPaid === true) {
                                addAlertEvent({
                                    name: expense.pk + expense.sk,
                                    message: 'Você não pode deletar uma despesa já paga!',
                                    type: 'warning'
                                });
                            } else {
                                deleteExpenseHandler();
                            }
                        }}> Apagar despesa </Button>
                    </Box>
                </Box>
            </Grow>
        </Portal>
    );
}

interface ExpenseCardComponentParams {
    expense: Expense
}

const ExpenseCardComponent = ({ expense }: ExpenseCardComponentParams) => {

    const { addAlertEvent } = useEventHandlerContext();
    const { updateIsPaidExpenses } = useExpensesContext();

    const container = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const updateIsPaidOnExpenses = () => {
        setLoading(true);
        updateIsPaidExpenses(expense, !isPaid).then(() => {
            let messageText = "";

            if (!isPaid) {
                messageText = 'Item "' + expense.description + '" marcado como pago!';
            } else {
                messageText = 'Item "' + expense.description + '" marcado como NÃO pago!';
            }

            addAlertEvent({
                name: expense.pk + expense.sk,
                message: messageText,
                type: 'success'
            });
            setLoading(false);
            setIsPaid(!isPaid);
        }).catch(() => {
            addAlertEvent({
                name: expense.pk + expense.sk,
                message: 'Houve um problema ao alterar o item "' + expense.description + '"!',
                type: 'error'
            });
            setLoading(false);
        });
    }

    const openEditDialog = () => { setShowEditDialog(true); };
    const handleCloseEditDialog = () => { setShowEditDialog(false); };

    useEffect(() => {
        setIsPaid(expense.isPaid);
    }, []);

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
                            <Box></Box>
                            {expense.getType() === "RECURRING_EXPENSE" &&
                                <Typography variant='body2' style={{ userSelect: 'none' }}>
                                    {(expense.getTotalInstallment() - expense.getRemainingInstallment())} de {expense.getTotalInstallment()}
                                </Typography>
                            }
                        </Box>
                    </Stack>
                    <Box className="cardIconsContainer">
                        <IconButton aria-label="Marcar como pago" disabled={loading} sx={{ color: isPaid === true ? '#3ec400' : 'grey' }} size="large" onClick={() => {
                            updateIsPaidOnExpenses();
                        }}>
                            <PaidIcon className="cardIcons" />
                        </IconButton>
                        <IconButton aria-label="Editar despesa" size="large" onClick={openEditDialog} disabled={isPaid}>
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
            {showMore && <PortalShowMoreDetailsComponent showMore={showMore} container={container} expense={expense} isPaid={isPaid} />}
            <Dialog
                open={showEditDialog}
                onClose={handleCloseEditDialog}
            // keepMounted  // dialog still exists when focussed out; I've take it off because form doesn't unregister itself;
            >
                <DialogTitle align='left'>
                    Nova despesa
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseEditDialog}
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
                    <ExpenseInsertUpdateComponent formInitialValue={expense} onSuccess={handleCloseEditDialog} onFailed={handleCloseEditDialog} onCancel={handleCloseEditDialog} />
                </DialogContent>
            </Dialog>
        </>

    )
}

export default ExpenseCardComponent