import React from 'react'
import { Outlet } from 'react-router'

export const WorkspaceComponent = () => {
    return (
        <>
            <div>WorkspaceComponent</div>
            <Outlet />
        </>
    )
}
