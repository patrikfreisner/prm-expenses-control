import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import AppBarComponent from './AppBar/AppBarComponent'

export const WorkspaceComponent = () => {
    return (
        <>
            <AppBarComponent />
            <Outlet />
        </>
    )
}
