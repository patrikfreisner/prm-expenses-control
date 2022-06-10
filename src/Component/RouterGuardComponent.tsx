import React, { useEffect } from 'react'

import { useLoginContext } from '../Context/LoginContext'

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router'
import MainPageComponent from './Main/MainPageComponent';
import { WorkspaceComponent } from './Workspace/WorkspaceComponent';
import ExpensesComponent from './Workspace/ExpensesControl/ExpensesComponent';
import { SavingsComponent } from './Workspace/SavingsControl/SavingsComponent';
import { LoginComponent } from './Authentication/Login/LoginComponent';
import { RegisterComponent } from './Authentication/Regiser/RegisterComponent';
import { RegisterProvider } from '../Context/RegisterContext';
import { ExpensesProvider } from '../Context/ExpensesContext';
import { EventHandlerContext } from '../Context/EventHandlerContext';

export const ApplicationRouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<PrivateOutlet />}>
                    <Route path='' element={<MainPageComponent />} >
                        <Route path='workspace' element={
                            <ExpensesProvider>
                                <EventHandlerContext>
                                    <WorkspaceComponent />
                                </EventHandlerContext>
                            </ExpensesProvider>
                        }>
                            <Route path='expenses' element={<ExpensesComponent />} />
                            <Route path='savings' element={<SavingsComponent />} />
                        </Route>
                    </Route>
                </Route>
                <Route path='' element={<NonAuthenticatedOutlet />}>
                    <Route path='login' element={<LoginComponent />} />
                    <Route path='register' element={
                        <RegisterProvider>
                            <RegisterComponent />
                        </RegisterProvider>
                    } />
                </Route>
                {/* Default Route */}
                <Route index element={<Navigate to={'/workspace/expenses'} />} />
                {/* No matching */}
                <Route path='*' element={<Navigate to={'/workspace/expenses'} />} />
            </Routes>
        </BrowserRouter>
    )
}


export const PrivateOutlet = () => {
    const { isAuthenticated, checkIsAuthenticated } = useLoginContext();

    useEffect(() => {
        checkIsAuthenticated(() => { });
    }, [isAuthenticated]);

    return isAuthenticated === true ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to={{ pathname: 'login' }} />
    )
}

export const NonAuthenticatedOutlet = () => {
    const { isAuthenticated, checkIsAuthenticated } = useLoginContext();

    useEffect(() => {
        checkIsAuthenticated(() => { });
    }, [isAuthenticated]);

    return isAuthenticated === false ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to={{ pathname: '/' }} />
    )
}
