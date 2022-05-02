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
import { RegisterContext, RegisterProvider } from '../Context/RegisterContext';

export const ApplicationRouterConfig = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<PrivateOutlet />}>
                    <Route path='' element={<MainPageComponent />} >
                        <Route path='workspace' element={<WorkspaceComponent />}>
                            <Route path='expenses' element={<ExpensesComponent />} />
                            <Route path='savings' element={<SavingsComponent />} />
                        </Route>
                        {/* <Route path='company' element={<CompanyAdministrationComponent />} /> */}
                    </Route>
                </Route>
                <Route path='login' element={<LoginComponent />} />
                <Route path='register' element={
                    <RegisterProvider>
                        <RegisterComponent />
                    </RegisterProvider>} />
                {/* Default Route */}
                <Route index element={<Navigate to={'/workspace/expenses'} />} />
                {/* No matching */}
                <Route path='*' element={<Navigate to={'/workspace/expenses'} />} />
            </Routes>
        </BrowserRouter>
    )
}


export const PrivateOutlet = () => {
    // let isAuthenticated = true;
    const { isAuthenticated, checkIsAuthenticated } = useLoginContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) checkIsAuthenticated((msg: any, response: boolean) => {
            if (response === true) navigate('/');
        });
    }, [checkIsAuthenticated, isAuthenticated, navigate]);

    return isAuthenticated === true ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to={{ pathname: 'login' }} />
    )
}